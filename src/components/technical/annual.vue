<template>
   <div class="de-box">
     <div class="go-back" @click="goback">&lt;&lt; 返回</div>
     <p class="tit-p">年审管理</p>
     <div class="mar-top">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="first">
            <div class="tab-class">
              <img class="mb-img" src="../../assets/images/login-logo.png" height="200" width="173" alt="">
              <table v-if="activeName=='first'">
                <tr>
                  <td>成员编号：</td>
                  <td>{{data.trainer_number}}</td>
                </tr>
                 <tr>
                  <td>成员姓名：</td>
                  <td>{{data.name}}</td>
                </tr>
                 <tr>
                  <td>性别：</td>
                  <td>{{data.sex}}</td>
                </tr>
                <tr>
                  <td>证件类型：</td>
                  <td>{{data.card_type}}    <span style="margin-left:40px;">{{data.idcard}}</span></td>
                </tr>
                <tr>
                  <td>出生日期：</td>
                  <td>{{data.birthday}}</td>
                </tr>
                 <tr>
                  <td>手机号码：</td>
                  <td>{{data.phone}}</td>
                </tr>
                 <tr>
                  <td>联系地址：</td>
                  <td>{{data.province}}{{data.city}}{{data.area}}{{data.address}}</td>
                </tr>
                 <tr>
                  <td>邮箱：</td>
                  <td>{{data.email}}</td>
                </tr>
                 <tr>
                  <td>登记时间：</td>
                  <td>{{data.addtime}}</td>
                </tr>
                <tr>
                  <td>归属区域：</td>
                  <td>{{data.provinces}}</td>
                </tr>
              
                <tr>
                  <td>考官等级：</td>
                  <td>{{data.star_slevel}}</td>
                </tr>
                <tr>
                  <td>管理级别：</td>
                  <td>{{data.super_level}}</td>
                </tr>
                <tr>
                  <td>当前状态：</td>
                  <td>{{data.status}}</td>
                </tr>
                <tr>
                  <td>审批机构：</td>
                  <td>{{data.verify_organ}}</td>
                </tr>
                  <tr>
                  <td>审批人：</td>
                  <td>{{data.approve_name}}</td>
                </tr>
                 <tr>
                  <td>审批时间：</td>
                  <td>{{data.approve_time}}</td>
                </tr>
                 <tr>
                  <td>有效期限：</td>
                  <td>{{data.valid_time}}</td>
                </tr>
              </table>
            </div>
            <div class="annual-cont">
                 <button @click="confirm(3)">年审合格</button>
                 <button @click="noQualified">年审不合格</button>
              
            </div>
           
          </el-tab-pane>
       
          </el-tabs>
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

       <el-dialog
          :visible.sync="addmenu"
          width="460px"
          class="box-shadow"
          >
            <span slot="title" class="tit-class">
              {{title}}
            </span>
            <div class="list-cont">
              <p><span class="red">*</span>原因</p>
              <textarea placeholder="400字以内" maxlength="400" v-model="result">
                
              </textarea>
            </div>  
            <span slot="footer" class="dialog-footer" >
              <div class="warn-in">
              <el-alert
                       :title="arrtit"
                       type="warning"
                       show-icon v-show="isarr" >
              </el-alert>
              </div>  
              <el-button type="primary" v-show="title=='年审不合格'"  @click="confirm(4)">确 定</el-button>
              <el-button @click="addmenu=false">取 消</el-button>
            </span>
          </el-dialog>

   </div>
</template>
<script>
export default {
  data () {
    return {
      success:false,
      suinfo:"",
      fail:false,
      failinfo:"",
      title:"年审不合格",
      result:"",
      addmenu:false,
      arrtit:"",
      isarr:false,
      id:"",
      activeName:"first",
      data:{},
      url:"/tecdetail",
      smDate:{}
    }
  },
  mounted(){
      this.id = this.$route.params.id;
      this.getList();
  },
  methods:{
     handleClick(tab, event) {
       this.getList();
     },
     goback(){
      this.$router.push({path:"/technical/list"})
     },
     getList(){
      this.$api.post(this.url,{
        id:this.id
      },su=>{
        if(su.status==200){
          this.data = su.data;
        }
      },err=>{
        
      },{token:sessionStorage.getItem("token")})
     },
     noQualified(){
        this.isarr = false;
        this.arrtit = "";
        this.addmenu = true;
        this.result = "";
     },
     confirm(v){

        if(v==3){ 
        this.smDate = {
          teid:this.id,
          type:v

        }
        }else if(v==4){
          if(!this.result){
            this.isarr = true;
            this.arrtit = "请填写原因";
            return;
          }
         this.smDate = {
             teid:this.id,
             type:v,
             description:this.result
          }
            
        }
        this.$api.post('/teexamined',this.smDate,su=>{
            if(su.status==200){
              this.success = true;
              this.suinfo =su.info;
              this.addmenu = false;
              setTimeout(()=>{
                   this.$router.push({path:"/technical/list"});
              },1000)
            
            }else{
          
              this.isarr = true;
              this.arrtit = su.info;
              this.fail = true;
              this.failinfo = su.info;
            }
        },err=>{
             this.fail = true;
             this.failinfo = err.info;

        },{token:sessionStorage.getItem("token")})

     }
  }
}
</script>


<style lang='scss' scoped>
  .de-box{
    padding: 30px;
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
  .mar-top{
    margin-top: 20px;
  }
  .tab-class{
    margin: 5px 0 0 26px;
    table{
      font-size: 14px;
      td{
        line-height: 30px;
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


  .list-table{
    white-space: nowrap;
    width: 100%;
    border: 1px solid RGBA(230, 230, 230, 1);
    thead{
      height: 60px;
      line-height: 60px;
      color: RGBA(26, 26, 26, 1);
      font-size: 14px;
      background-color: RGBA(237, 237, 237, 1);
      td{
        padding: 0 5px 0 5px;
      }
    }
    tbody{
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      color: RGBA(77, 77, 77, 1);
      tr{
        border-bottom:1px solid RGBA(230, 230, 230, 1);
      }
    }
   }
  .tab-class{
      position: relative;
    }
   .mb-img{
     position:absolute;
     width:100px;
     height:100px;
     left:500px;
     top:0;
   }
   .tab-class td{
    padding:5px 0;
   }

   .annual-cont{
     padding-top:20px;
     border-top:1px solid #E6E6E6;
     margin-top:70px;
     text-align:left;
   }
   .annual-cont button{
      width:100px;
      height:34px;
      font-size:14px;
      box-sizing:border-box;
      border-radius:2px;
      margin-left:18px;
      cursor:pointer;
   }
   .annual-cont button:nth-child(1){
    background-color:#1FA5FF;
    color:white;
    border:none;
   }
  .annual-cont button:nth-child(2){
    background-color:#51B7FB;
    color:white;
     border:none;
   }
    .annual-cont button:nth-child(3){
        color:#4D4D4D;
        border:1px solid #999999;
        background-color:white;
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
    p{
      text-align:left;
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
</style>
<style>
  .el-dialog__header{
    text-align: left;
  }
</style>
