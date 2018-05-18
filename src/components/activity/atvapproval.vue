<template>
   <div class="de-box">
     <div class="go-back" @click="goback">&lt;&lt; 返回</div>
     <p class="tit-p">段位考核活动审批</p>
     <p class="title-info">活动基本信息</p>
     <div class="tab-class">
      <table>
        <tr>
          <td>机构编号：</td>
          <td>{{data.id}}</td>
        </tr>
         <tr>
          <td>组织机构：</td>
          <td>{{data.name}}</td>
        </tr>
        <tr>
          <td>活动时间：</td>
          <td>{{data.activitytime}}</td>
        </tr>
        <tr>
          <td>考核时间：</td>
          <td><b class="fw">上午</b>{{data.start_morning}}-{{data.end_morning}} <span style="margin:0 10px;">/</span>  <b class="fw">下午</b>{{data.start_afternoon}}-{{data.end_afternoon}}</td>
        </tr>
        <tr>
          <td>名额：</td>
          <td>{{data.places}}</td>
        </tr>
        <tr>
          <td>活动联系人：</td>
          <td>{{data.contacts}}</td>
        </tr>
         <tr>
          <td>联系电话：</td>
          <td>{{data.contact_number}}</td>
        </tr>
        <tr>
          <td>活动描述 </td>
          <td>{{data.describe}}</td>
        </tr>
        <tr v-for="item in data.gradelist">
          <td> 考核等级：</td>
          <td>
            {{item.name}} <span class="lelval">规定费用(<em>{{item.price}}</em>)</span> <span class="lelval">折扣(<em>{{item.discount}}</em>)</span> <span class="lelval">折后费用(<em>{{item.dprice}} </em>)</span>
            </td>
        </tr>
     
         <tr>
          <td>申请时间： </td>
          <td>{{data.addtime}}</td>
        </tr>
         <tr>
          <td>审核机构：</td>
          <td>{{data.mechanism}}</td>
        </tr>
         <tr>
          <td>审核结果： </td>
          <td>
             <input type="radio" value="2" v-model="isagree" name="isagree">驳回
             <input type="radio" value="3" v-model="isagree"name="isagree" checked="checked">同意
             
          </td>
        </tr>
         <tr>
          <td>审批意见： </td>
          <td>
            <textarea name="" id="" v-model="exinfo" cols="30" rows="10" placeholder="请输入意见" class="opinion"></textarea>
          </td>
        </tr>
         <tr>
          <td> 指派主考官：</td>
          <td>
            <select name="" id="" v-model="mainExaminer">
              <option value="">请选择</option>
              <option :value="item.id" v-for="item in examiner">{{item.name}}</option>
            </select>
          </td>
        </tr>
        <tr>
          <td> 指派副考官：</td>
          <td>
             <select name="" id="" v-model="secExaminer">
              <option value="">请选择</option>
              <option :value="item.id" v-for="item in examiner">{{item.name}}</option>
            </select>
          </td>
        </tr>

      </table>
     </div>
     <div class="hr"></div>
     <div class="ex-btnbox" >
       <button class="color"  @click="examination">确认</button>
     </div>
 
       <!-- 操作成功 -->
      <el-dialog  width="340px" top="50vh"  :visible.sync="success" 
        :modal="false" 
        :show-close="false"
        class="res-dialog nopadding">
          <p class="success-bg"></p>
          <i class="suc-icon"></i>
          <p class="res-text">{{suinfo}}</p>
        
      </el-dialog>

      <el-dialog  width="340px" top="50vh" :visible.sync="fail" 
        :modal="false"
        :show-close="false"
        class="res-dialog nopadding">
        
          <p class="failure-bg"></p>
          <i class="fail-icon"></i>
          <p class="res-text">{{failinfo}}</p>
        
      </el-dialog>

     
  
    </div> 
</template>
<script>
export default {
  data () {
    return {
        id:"",
        data:{},
        success:false,
        suinfo:"",
        fail:false,
        failinfo:"",
        addmenu:false,
        arrtit:"",
        isarr:false,
        result:"",
        examiner:[],
        mainExaminer:"",//主考官
        secExaminer:"",//副考官
        isagree:3, //是否同意
        exinfo:"",//意见
    }
  },
  mounted(){
      this.id = this.$route.params.id;
      this.examinerlist();
      this.getList();
  },
  methods:{
    goback(){
      this.$router.push({path:"/activity/list"});
    },
    //获取考官列表
    examinerlist(){
      this.$api.get("/examinerlist",{},su=>{
          if(su.status==200){
             this.examiner = su.data;
             if(this.examiner.length>0){
                   this.mainExaminer = this.examiner[0].id;
             }
          
          }else{
             this.fail = true;
             this.failinfo = su.info;
          }
      },err=>{
          this.fail = true;
          this.failinfo = err.info;
      },{token:sessionStorage.getItem("token")}) 
    },

    //审批
    examination(){
       if(!this.exinfo){
          this.fail = true;
          this.failinfo = "审核意见不能为空";
          return
       }

       if(!this.mainExaminer){
          this.fail = true;
          this.failinfo = "请选择主考官";
          return
       }
       this.$api.post("/toexamine",{
          id:this.id,
          status:this.isagree,
          info:this.exinfo,
          mainid:this.mainExaminer,
          viceid:this.secExaminer
       },su=>{
        console.log(su);
        if(su.status==200){
          this.success = true;
          this.suinfo = su.info;
          setTimeout(()=>{
                   this.$router.push({path:"/activity/list"});
          },1000)
        }else{
          this.fail = true;
          this.failinfo = su.info
        }
       },err=>{

          this.fail = true;
          this.failinfo = err.info;

       },{token:sessionStorage.getItem("token")})

    },
    //获取详情
    getList(){
      this.$api.post("/activitydetail",{
       id:this.id
      },su=>{
        if(su.status==200){
          this.data = su.data;
        }else{
          this.fail = true;
          this.failinfo = su.info;
        }
      },err=>{
          this.fail = true;
          this.failinfo = err.info;
      },{token:sessionStorage.getItem("token")})
    },

   
     dalogFn(){
      setTimeout(()=>{
        this.success = false;
        this.fail = false;
      },1500)
    },
    check(){

    },
    notcheck(){

    }
  },
   watch:{
      success:'dalogFn',
      fail:'dalogFn'
  },
}
</script>


<style lang='scss' scoped>
  .de-box{
    padding: 30px;
    text-align: left;
  }
  .go-back{
    width:116px;
    height:36px; 
    background:rgba(255,255,255,1);
    border-radius: 2px;
    font-size:14px;
    color:rgba(55,142,239,1);
    line-height: 36px;
    text-align: center;
    border: 1px solid RGBA(55, 142, 239, 1);
    cursor: pointer;
    margin-bottom: 26px;
  }
  .tit-p{
    font-size:14px;
    color:rgba(0,0,0,1);
    line-height:38px;
    height:40px;
    text-align: left; 
    background:rgba(228,239,252,1);
    border-radius: 2px; 
    padding-left: 26px;
  }
  .title-info{
    font-size:16px;
    color:rgba(26,26,26,1);
    font-weight: bold;
    padding-left: 12px;
    border-left: 4px solid RGBA(55, 142, 239, 1);
    margin: 30px 0 0 27px;
  }
   .tab-class{
    margin: 10px 0 0 40px;
    table{
      font-size: 14px;
      td{
        line-height: 40px;
      }
      td:first-child{
        width: 102px;
        background:rgba(250,250,250,1);
        color:rgba(153,153,153,1);
        text-align: right;
      }
      td:nth-child(2){
        color:rgba(77,77,77,1);
        padding-left: 14px;
        text-align: left;
        width: 561px;
        select{
          width: 146px;
          height: 34px;
        }
      }
      .tab-btncla{
        button{
          width:93px;
          height:28px; 
          background:rgba(255,233,166,1);
          border-radius: 6px;
          border: none;
          background: RGBA(255, 233, 166, 1);
          margin-right: 21px;
          font-size:14px;
          color:rgba(77,77,77,1); 
          outline: none;
        }
      }
    }
    table.width-180{
      td:first-child{
        width: 180px;
      }
    }
    table.width-146{
      td:first-child{
        width: 146px;
        vertical-align:middle;
        
      }
      img{
          width: 120px;
          height: 80px;
      }
    }
  }
  .hr{
    height:2px; 
    background:rgba(230,230,230,1);
    margin:70px 0 20px 0;
  }
  .ex-btnbox{
    button{
      width:100px;
      height:34px; 
      background:rgba(255,255,255,1);
      border-radius: 2px;
      font-size:14px;
      color:rgba(77,77,77,1);
      border: 1px solid RGBA(153, 153, 153, 1);
      line-height: 34px;
      outline: none;
      box-sizing:border-box;
      margin-left: 18px;
      padding:0;
      cursor: pointer;
    }
    button.color{
      background: RGBA(31, 165, 255, 1);
      color: #fff;
      border-color: RGBA(31, 165, 255, 1);
    }
  }
  .list-cont{
    textarea{
      width:419px;
      height:86px; 
      border-radius: 2px;
      padding: 5px;
      box-sizing:border-box;
      border:1px solid #ccc;
    }
  }
  .dialog-footer{
    position: relative;
    .warn-in{
      position: absolute;
      width: 220px;
    }
  }
  .red{
    color: red;
    margin-right: 5px;
  }
  .box-shadow .el-dialog__body{
    padding: 9px 20px;
  }
  .fw{
    font-weight:bold;
    margin-right:10px;
  }
  .lelval{
    margin:0 20px;
  }
    .lelval em{
       color:#FF9B4B;
       padding:0 5px;
    }

    .opinion{
       width:559px;
       height:120px;
    }
</style>
