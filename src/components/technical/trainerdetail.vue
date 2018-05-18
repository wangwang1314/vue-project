<template>
   <div class="de-box">
     <div class="go-back" @click="goback">&lt;&lt; 返回</div>
     <p class="tit-p">考官信息</p>
     <p class="title-info">基本信息</p>
     <div class="tab-class">
    <img class="mb-img" src="../../assets/images/login-logo.png" height="200" width="173" alt="">
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
          <td>{{data.card_type}} <span class="other-say">{{data.idcard}}</span></td>
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
          <td>{{data.address}}</td>
        </tr>
         <tr>
          <td>邮箱：</td>
          <td>{{data.email}}</td>
        </tr>
         <tr>
          <td>注册时间：</td>
          <td>{{data.addtime}}</td>
        </tr>
         
      </table>
     </div>
     <p class="title-info">专业技术基础</p>
     <div class="tab-class">
       <table class="width-146">
        <tr>
          <td>乒乓球专业证书级别：</td>
          <td>{{data.segment_grade}}</td>
        </tr>
         <tr>
          <td>专业竞技比赛成绩：</td>
          <td>
              <span class="other-say">{{data.race_rank}}</span>
          </td>
        </tr>
        <tr>
          <td>毕业院校：</td>
          <td>
             {{data.school}}
          </td>
        </tr>
        <tr>
          <td>所学专业：：</td>
          <td>{{data.profession}}</td>
        </tr>
        <tr>
          <td>教练经历：</td>
          <td>
             {{data.trainer_experience}}
          </td>
        </tr>
        
      </table>
     </div>
     <p class="title-info">专业资格信息</p>
      <div class="tab-class">
       <table class="width-160">
        <tr>
          <td>参加段位标准培训时间：</td>
          <td>{{data.trainer_time}}</td>
        </tr>
        <tr>
          <td>培训地点：</td>
          <td>{{data.trainer_address}}</td>
        </tr>
         <tr>
          <td>培训机构：</td>
          <td>{{data.trainer_organ}}</td>
        </tr>
         <tr>
          <td>考核成绩：</td>
          <td>{{data.trainer_score}}</td>
        </tr>
         <tr>
          <td>段位证书编号：</td>
          <td>{{data.segment_code}}</td>
        </tr>
         <tr>
          <td>段位证书等级：</td>
          <td>{{data.segment_grade}}</td>
        </tr>
         <tr>
          <td>考核活动主考官资格：</td>
          <td>
            <span v-if="data.coach_type==1">有</span>
            <span v-else-if="data.coach_type==0">无</span>
          </td>
        </tr>
         <tr>
          <td>评价星级：</td>
          <td>{{data.star_level}}</td>
        </tr>
         <tr>
          <td>段位考官资格：</td>
          <td>{{data.star_slevel}}</td>
        </tr>
         <tr>
          <td>培训师资格证书号：</td>
          <td>{{data.trainer_code}}</td>
        </tr>
         <tr>
          <td>审批机构：</td>
          <td>{{data.verify_organ}}</td>
        </tr>
         <tr>
          <td>审批时间：</td>
          <td>{{data.approve_time}}</td>
        </tr>
         <tr>
          <td>审批人：</td>
          <td>{{data.approve_name}}</td>
        </tr>
         <tr>
          <td>有效期限：</td>
          <td>{{data.valid_time}}</td>
        </tr>

       
      </table>
     </div>
     <div class="hr"></div>
     <div class="ex-btnbox" >
       <button class="color"  @click="check(0)">赋予国家级成员</button>
       <button class="color"  @click="check(1)">赋予省级成员</button>
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
        title:"赋予国家级成员",
        result:"",
        super_level:0
    }
  },
  mounted(){
      this.id = this.$route.params.id;
      this.getList();
  },
  methods:{
    goback(){
      this.$router.push({path:"/technical/addmenber"});
    },
    getList(){
      this.$api.post("/teexaminerdetail",{
       id:this.id
      },su=>{
        if(su.status==200){
          this.data = su.data;
          //this.total = su.data.total;
        }
      },err=>{
          this.fail = true;
          this.failinfo = su.info;
      },{token:sessionStorage.getItem("token")})
    },
    cancel(){
      this.isarr = false;
      this.title = "机构注销";
      this.addmenu = true;
    },
    check(v){
      this.super_level = v;
      if(v==0){
         this.title = "确定赋予国家级成员？";
      }else{
         this.title = "确定赋予省级成员？";
      }
       this.$confirm(this.title, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
       
        }).then(() => {
            this.$api.post("/teaddMember",{
               tid:this.id,
               super_level:v
            },su=>{
              console.log(su);
              if(su.status==200){
                this.$message({
                  type: 'success',
                  message: '添加成功'
                });          
              }else{

                this.$message({
                  type: 'error',
                  message: su.info
                });    

              }
            },err=>{
               this.$message({
                  type: 'error',
                  message: err.info
                });          
            },{token:sessionStorage.getItem("token")})
          
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '已取消'
          });          
        });
  
    },
     dalogFn(){
      setTimeout(()=>{
        this.success = false;
        this.fail = false;
      },1500)
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
    position:relative;
    margin: 10px 0 0 40px;
    table{
      font-size: 14px;
      td{
        line-height: 40px;
        padding:8px 0;
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

     table.width-160{
      td:first-child{
        width: 160px;
        vertical-align:middle;
        
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
      width:120px;
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


  .mb-img{
     position:absolute;
     width:100px;
     height:100px;
     left:500px;
     top:0;
   }
</style>
