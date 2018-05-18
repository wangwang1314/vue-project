<template>
   <div class="de-box">
     <div class="go-back" @click="goback">&lt;&lt; 返回</div>
     <p class="tit-p">考官资质等级变更审核</p>
     <p class="title-info">申请人基本信息</p>
     <div class="tab-class">
      <table>
        <tr>
          <td>培训师编号：</td>
          <td>{{data.trainer_number}}</td>
        </tr>
         <tr>
          <td>培训师姓名：</td>
          <td>{{data.name}}</td>
        </tr>
        <tr>
          <td>性别：</td>
          <td>{{data.sex}}</td>
        </tr>
        <tr>
          <td>证件类型：</td>
          <td>{{data.card_type}} <span style="margin-left:40px;">{{data.idcard}}</span></td>
        </tr>
        <tr>
          <td>出生日期：</td>
          <td>{{data.birthday}}</td>
        </tr>
        <tr>
          <td>文化程度：</td>
          <td>{{data.education}}</td>
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
          <td>注册时间：</td>
          <td>{{data.addtime}}</td>
        </tr>
         <tr>
          <td>段位证书编号：</td>
          <td>{{data.segment_code}}</td>
        </tr>
        <tr>
          <td>段位证书等级：</td>
          <td>{{data.segment_grade}} 级</td>
        </tr>
      </table>
     </div>
     <p class="title-info">考官资质申请</p>
     <div class="tab-class">
       <table>
        <tr>
          <td>段位考官资格：</td>
          <td>原有星级 （{{data.star_slevel}} 星）
            <span style="margin-left:40px;">
              调整为 
              <span style="color:#FF9B4B">{{data.apply_stars}}</span>
            </span>
          </td>
        </tr>
         <tr>
          <td>申请理由：</td>
          <td>
           <p >{{data.description}}</p>
          </td>
        </tr>
      </table>
     </div>
    <p class="title-info">省级机构审核意见</p>
    <div class="tab-class">
      <table>
        <tr>
          <td>审批结果：</td>
          <td> 
            <p>
              <span v-if="data.is_agree==1">同意</span>
              <span v-else>不同意</span>
            </p>
          </td>
        </tr>
        <tr>
          <td>审批意见：</td>
          <td>{{data.description}}</td>
        </tr>
        <tr>
          <td>审批机构：</td>
          <td>
            {{data.verify_organ}}
          </td>
        </tr>
        <tr>
          <td>审批时间：</td>
          <td>
            {{data.approve_time}}
          </td>
        </tr>
        <tr>
          <td>审批人：</td>
          <td>
            {{data.approve_names}}
          </td>
        </tr>
      </table>
    </div> 
    <p class="title-info">星级变更</p>
    <div class="tab-class">
      <table>
        <tr>
          <td>
            审核结果：
          </td>
          <td>
            <el-radio v-model="agree" label="1">同意</el-radio>
            <el-radio v-model="agree" label="0">不同意</el-radio>
          </td>
        </tr>
        <tr>
          <td>
           审核机构：
          </td>
          <td>
            {{data.verify_organs}}
          </td>
        </tr>
        <tr>
          <td>
           审核人：
          </td>
          <td>
            {{data.approve_names}}
          </td>
        </tr>
         <tr>
          <td>
           审批意见：
          </td>
          <td>
            <textarea v-model="result" placeholder="请输入意见"></textarea>
          </td>
        </tr>
      </table>
    </div> 
     <div class="hr"></div>
     <div class="ex-btnbox" >
       <button class="color"  @click="confirm">确认</button>
       <button  @click="cancel">取消</button>
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
              <el-button type="primary"   @click="confirm(8)">确 定</el-button>
              <el-button @click="addmenu=false">取 消</el-button>
            </span>
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
        title:"审核不通过",
        result:"",
        star:1,
        agree:"1"
    }
  },
  mounted(){
      this.id = this.$route.params.id;
      this.getList();
  },
  methods:{
    iptFn(){
      if(this.data.valid_time==0){
        return;
      }
      if(parseInt(this.data.valid_time)){
        this.data.valid_time = parseInt(this.data.valid_time)
      }else{
        this.data.valid_time = ""
      }
    },
    goback(){
      this.$router.push({path:"/teacher/teacherlist"});
    },
    getList(){
      this.$api.post("/cexaminermessage",{
       id:this.id
      },su=>{
        if(su.status==200){
         // su.data.coach_type=su.data.coach_type.toString();
          this.data = su.data;
          //this.total = su.data.total;
        }
      },err=>{
          this.fail = true;
          this.failinfo = su.info;
      },{token:sessionStorage.getItem("token")})
    },
    confirm(val){
     // this.isarr = false;
      if(!this.result){
        //this.isarr = true;
        //this.arrtit = "请填写原因";
        this.$message({
          message: '请填写审批意见',
          type: 'warning'
        });
        return
      }
      this.$api.post("/cexaminercheck",{
       id:this.id,
       apply_star:this.data.apply_star,
       is_agree:this.agree,
       aid:this.data.aid,
       description:this.result
      },su=>{
        if(su.status==200){
          this.success = true;
          this.suinfo = su.info;
          this.addmenu = false;
          setTimeout(()=>{
             this.$router.push({path:"/teacher/teacherlist"});
          },1000)
        }else{
          this.isarr = true;
          this.arrtit = su.info;
        }
      },err=>{
          this.fail = true;
          this.failinfo = su.info;
      },{token:sessionStorage.getItem("token")})
    },
     dalogFn(){
      setTimeout(()=>{
        this.success = false;
        this.fail = false;
      },1500)
    },
    cancel(){
      this.getList();
      this.agree = "1";
      this.result = "";
      //this.star = 1;
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
        width: 116px;
        background:rgba(250,250,250,1);
        color:rgba(153,153,153,1);
        text-align: right;
        vertical-align: top;
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
        textarea{
         width:559px;
         height:120px; 
         background:rgba(255,255,255,1);
         border-radius: 2px ;
         border: 1px solid RGBA(204, 204, 204, 1);
         position: relative;
         top:15px;
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
</style>
