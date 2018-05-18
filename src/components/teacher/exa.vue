<template>
   <div class="de-box">
     <div class="go-back" @click="goback">&lt;&lt; 返回</div>
     <p class="tit-p">资质审核</p>
     <p class="title-info">基本信息</p>
     <div class="tab-class">
      <table>
        <tr>
          <td>培训师编号：</td>
          <td>{{data.agency_number}}</td>
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
      </table>
     </div>
     <p class="title-info">专业资格信息</p>
     <div class="tab-class">
       <table>
        <tr>
          <td>乒乓球专业证书级别：</td>
          <td>{{data.certy_grade}} 级</td>
        </tr>
         <tr>
          <td>专业竞技比赛成绩：</td>
          <td>
            {{data.race_name}}<span style="margin-left:40px;">第<i style="color:RGBA(255, 155, 75, 1)"> {{data.race_rank}} </i>名</span>
          </td>
        </tr>
        <tr>
          <td>毕业院校：</td>
          <td>
            {{data.school}}
          </td>
        </tr>
        <tr>
          <td>所学专业：</td>
          <td>{{data.profession}}</td>
        </tr>
        <tr>
          <td>教练经历：</td>
          <td>
            {{data.trainer_experience}}
          </td>
        </tr>
        <tr>
          <td>评价星级：</td>
          <td>
          	<select v-model="data.star_level">
              <option value="1">一星</option>
              <option value="2">二星</option>
              <option value="3">三星</option>
              <option value="4">四星</option>
              <option value="5">五星</option>
            </select>
          </td>
        </tr>
         <!-- <tr>
          <td>段位考官资格：</td>
          <td>
             <select v-model="data.star_slevel">
              <option value="1">一级</option>
              <option value="2">二级</option>
              <option value="3">高级</option>
            </select>
          </td>
        </tr> -->
         <tr>
          <td>参加段位标准培训时间：</td>
          <td>
            {{data.trainer_time}}
          </td>
        </tr>
         <tr>
          <td>培训地点：</td>
          <td>
            {{data.trainer_address}}
          </td>
        </tr>
         <tr>
          <td>培训机构：</td>
          <td >
            {{data.trainer_organ}}
          </td>
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
          <td>{{data.segment_grade}} 级</td>
        </tr>
       <!--  <tr>
          <td>考核活动主考官资格：</td>
          <td>
            <el-radio v-model="data.coach_type" label="1">有</el-radio>
            <el-radio v-model="data.coach_type" label="0">无</el-radio>
          </td>
        </tr> -->
        <tr>
          <td>审批机构：</td>
          <td>{{data.verify_organ}}</td>
        </tr>
       <!--  <tr>
          <td>审批时间：</td>
          <td>{{data.description}}</td>
        </tr> -->
        <tr>
          <td>审批人：</td>
          <td>{{data.approve_name}}</td>
        </tr>
        <tr>
          <td>有效期限：</td>
          <td><input type="text" name="" style="width:60px;" @input="iptFn" v-model="data.valid_time"> 年</td>
        </tr>
      </table>
     </div>
  	 <div class="hr"></div>
     <div class="ex-btnbox" >
       <button class="color"  @click="check">审核通过</button>
       <button class="color" @click="notcheck">审核不通过</button>
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
              <el-button type="primary" v-show="title=='审核不通过'"  @click="confirm(9)">确 定</el-button>
              <el-button type="primary" v-show="title=='机构注销'"  @click="confirm(8)">确 定</el-button>
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
        result:""
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
      this.$api.post("/qualymessage",{
       id:this.id
      },su=>{
        if(su.status==200){
          su.data.coach_type=su.data.coach_type.toString();
          this.data = su.data;
          //this.total = su.data.total;
        }
      },err=>{
          this.fail = true;
          this.failinfo = su.info;
      },{token:sessionStorage.getItem("token")})
    },
    notcheck(){
      if(!this.initcheck()){
        return
      }
      this.isarr = false;
      this.title = "审核不通过";
      this.addmenu = true;

    },
    initcheck(){
      if(!this.data.star_level){
        this.$message({
          message: '请选择评价星级',
          type: 'warning'
        });
        return false;
      }
      // if(!this.data.star_slevel){
      //   this.$message({
      //     message: '请选择段位考官资格',
      //     type: 'warning'
      //   });
      //   return false;
      // }
      // if(!this.data.valid_time||this.data.valid_time<=0){
      //   this.$message({
      //     message: '有效期限必须大于0',
      //     type: 'warning'
      //   });
      //   return false;
      // }
      return true;
    },
    confirm(val){
      this.isarr = false;
      if(!this.result){
        this.isarr = true;
        this.arrtit = "请填写原因";
        return
      }
      this.$api.post("/checkqualy",{
       id:this.id,
       status:3,
       star_level:this.data.star_level,
       star_slevel:this.data.star_slevel,
       coach_type:this.data.coach_type,
       description:this.result,
       valid_time:this.data.valid_time
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
    check(){
      if(!this.initcheck()){
        return
      }
       this.$api.post("/checkqualy",{
       id:this.id,
       status:2,
       star_level:this.data.star_level,
       star_slevel:this.data.star_slevel,
       coach_type:this.data.coach_type,
       description:this.result,
       valid_time:this.data.valid_time
      },su=>{
        if(su.status==200){
          this.success = true;
          this.suinfo = su.info;
          setTimeout(()=>{
             this.$router.push({path:"/teacher/teacherlist"});
          },1000)
        }else{
          // this.isarr = true;
          // this.arrtit = su.info;
          this.fail = true;
          this.failinfo = su.info;
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
        width: 160px;
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
</style>
