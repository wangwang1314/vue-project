<template>
   <div class="de-box">
     <div class="go-back" @click="goback">&lt;&lt; 返回</div>
     <p class="tit-p">机构经营资质审核</p>
     <p class="title-info">机构基本信息</p>
     <div class="tab-class">
      <table>
        <tr>
          <td>机构编号：</td>
          <td>{{data.agency_number}}</td>
        </tr>
         <tr>
          <td>机构名称：</td>
          <td>{{data.name}}</td>
        </tr>
        <tr>
          <td>营业执照号：</td>
          <td>{{data.license_number}}</td>
        </tr>
        <tr>
          <td>联系人：</td>
          <td>{{data.contact_name}}</td>
        </tr>
        <tr>
          <td>联系电话：</td>
          <td>{{data.contact_phone}}</td>
        </tr>
        <tr>
          <td>场馆电话：</td>
          <td>{{data.venue_phone}}</td>
        </tr>
         <tr>
          <td>邮箱：</td>
          <td>{{data.email}}</td>
        </tr>
         <tr>
          <td>邮政编码：</td>
          <td>{{data.postcode}}</td>
        </tr>
         <tr>
          <td>所在地址：</td>
          <td>{{data.agency_address}}</td>
        </tr>
         <tr>
          <td>机构法人：</td>
          <td>{{data.legal_name}}</td>
        </tr>
         <tr>
          <td>法人证件：</td>
          <td>
            <span v-if="data.legal_cardtype==1">身份证</span>
            <span v-else-if="data.legal_cardtype==2">护照</span>
            <span v-else-if="data.legal_cardtype==3">军官证</span>
            <span v-else-if="data.legal_cardtype==4">武警证</span>
          </td>
        </tr>
          <tr>
          <td>证件号码：</td>
          <td>{{data.legal_idcard}}</td>
        </tr>
          <tr>
          <td>法人地址：</td>
          <td>{{data.legal_address}}</td>
        </tr>
      </table>
     </div>
     <p class="title-info">资质审核</p>
     <div class="tab-class">
       <table>
        <tr>
          <td>管理项目：</td>
          <td>{{data.categoryname}}</td>
        </tr>
         <tr>
          <td>场馆类型：</td>
          <td>
            <select v-model="data.venue_type">
              <option value="1">培训中心</option>
              <option value="2">考核中心</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>资质等级：</td>
          <td>
            <select v-model="data.quality_level">
              <option value="1">初级</option>
              <option value="2">中级</option>
              <option value="3">高级</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>场地数：</td>
          <td>{{data.site_num}}</td>
        </tr>
        <tr>
          <td>场馆状态：</td>
          <td>
            <span v-if="data.status==0">草稿</span>
            <span v-else-if="data.status==1">待审核</span>
            <span v-else-if="data.status==2">待发证</span>
            <span v-else-if="data.status==3">运营</span>
            <span v-else-if="data.status==4">暂停</span>
            <span v-else-if="data.status==5">整改</span>
            <span v-else-if="data.status==6">年审</span>
            <span v-else-if="data.status==7">年审冻结</span>
            <span v-else-if="data.status==8">注销</span>
            <span v-else-if="data.status==9">驳回</span>
          </td>
        </tr>
        <tr>
          <td>服务评级：</td>
          <td>
              <select name="star_leval" v-model="starLeval" id="">
                <option value="1">1星</option>
                <option value="2">2星</option>
                <option value="3">3星</option>
                <option value="4">4星</option>
                <option value="5">5星</option>
              </select>
          </td>
        </tr>
         <tr>
          <td>安全指标：</td>
          <td>
             <select v-model="data.safety_indicators">
              <option value="0">不达标</option>
              <option value="1">达标</option>
              <option value="2">一般</option>
            </select>
          </td>
        </tr>
         <tr>
          <td>照明指标：</td>
          <td>
            <select v-model="data.lighting_index">
              <option value="0">不达标</option>
              <option value="1">达标</option>
              <option value="2">一般</option>
            </select>
          </td>
        </tr>
         <tr>
          <td>视频监控指标：</td>
          <td>
            <select v-model="data.monitoring_index">
              <option value="0">不达标</option>
              <option value="1">达标</option>
              <option value="2">一般</option>
            </select>
          </td>
        </tr>
         <tr>
          <td>考官名册：</td>
          <td class="tab-btncla">
            {{data.trainer_roster}}
          </td>
        </tr>
         <tr>
          <td>场馆描述：</td>
          <td>{{data.description}}</td>
        </tr>
      </table>
     </div>
     <p class="title-info">审核认定信息</p>
     <div class="tab-class">
       <table>
        <tr>
          <td>申请时间：</td>
          <td>{{time(data.addtime)}}</td>
        </tr>
        <tr>
          <td>现场审核人：</td>
          <td>{{data.field_auditor}}</td>
        </tr>
        <tr>
          <td>认定机构：</td>
          <td>{{data.verify_organ}}</td>
        </tr>
        <tr>
          <td>认定时间：</td>
          <td>{{data.cognizance_time}}</td>
        </tr>
        <tr>
          <td>经营期限：</td>
          <td>{{data.term}}</td>
        </tr>
      </table>
     </div>
     <p class="title-info">其它附加信息</p>
      <div class="tab-class">
       <table class="width-146 show-img">
        <tr>
          <td>剩余租约时间：</td>
          <td>{{data.month}}月</td>
        </tr>
         <td>营业执行照片：</td>
                    <td><img :src="item" v-for="item in splitFn(data.license_img)"></td>
                  </tr>
                  <tr>
                    <td>法人身份证照片：</td>
                    <td><img :src="item" v-for="item in splitFn(data.idcard_img)"></td>
                  </tr>
                  <tr>
                    <td>消防验收照片：</td>
                    <td><img :src="item" v-for="item in splitFn(data.fire_img)"></td>
                  </tr>
                  <tr>
                    <td>安全验收照片：</td>
                    <td><img :src="item" v-for="item in splitFn(data.place_check_img)"></td>
                  </tr>
                  <tr>
                    <td>场地使用证明照片：</td>
                    <td><img :src="item" v-for="item in splitFn(data.place_use_img)"></td>
                  </tr>
                  <tr>
                    <td>场地保险合同照片：</td>
                    <td><img :src="item" v-for="item in splitFn(data.place_insure_img)"></td>
                  </tr>
                  <tr>
                    <td>培训师证件照片：</td>
                    <td><img :src="item" v-for="item in splitFn(data.trainer_idcard_img)"></td>
                  </tr>
                  <tr>
                    <td>场馆照片：</td>
                    <td v-if="data.venue_img"><img :src="item" v-for="item in splitFn(data.venue_img)"></td> 
                  </tr>
      </table>
     </div>
     <div class="hr"></div>
     <div class="ex-btnbox" v-show="data.status==1">
       <button class="color"  @click="check">审核通过</button>
       <button class="color" @click="notcheck">审核不通过</button>
       <button @click="cancel">机构注销</button>
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
              <textarea placeholder="400字以内" maxlength="400" class="textareas" v-model="result">
                
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
        starLeval:1,
        title:"审核不通过",
        result:""
    }
  },
  mounted(){
      this.id = this.$route.params.id;
      this.getList();
  },
  methods:{
    time(val){
       var date = new Date(val*1000);
      return  date.getFullYear()+"-"+((date.getMonth()+1)>9?(date.getMonth()+1):'0'+(date.getMonth()+1))+"-"+((date.getDate())>9?(date.getDate()):'0'+(date.getDate()));
    },
    goback(){
      this.$router.push({path:"/organizational/list"});
    },
    getList(){
      this.$api.post("/organedetail",{
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
    check(){

    },
    splitFn(val){
      if(!val){
        return ""
      }
      return val.split(",");
    },
    notcheck(){
      this.isarr = false;
      this.title = "审核不通过";
      this.addmenu = true;
    },
    cancel(){
      this.isarr = false;
      this.title = "机构注销";
      this.addmenu = true;
    },
    confirm(val){
      this.isarr = false;
      if(!this.result){
        this.isarr = true;
        this.arrtit = "请填写原因";
        return;
      }
      this.$api.post("/organexamine",{
       id:this.id,
       result:this.result,
       status:val
      },su=>{
        if(su.status==200){
          this.success = true;
          this.suinfo = su.info;
          this.addmenu = false;
          setTimeout(()=>{
             this.$router.push({path:"/organizational/list"});
          },1000)
        }else{
          this.isarr = true;
          this.arrtit = su.info;
        }
      },err=>{
          this.fail = true;
          this.failinfo = err.info;
      },{token:sessionStorage.getItem("token")})
    },
    check(){
       this.$api.post("/organexamine",{
       id:this.id,
       status:2,
       quality_level:this.data.quality_level,
       star_level:this.starLeval,
       safety_indicators:this.data.safety_indicators,
       lighting_index:this.data.lighting_index,
       monitoring_index:this.data.monitoring_index
      },su=>{
        if(su.status==200){
          this.success = true;
          this.suinfo = su.info;
          setTimeout(()=>{
             this.$router.push({path:"/organizational/list"});
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

.show-img img{
      margin-right:20px;
    }
</style>
