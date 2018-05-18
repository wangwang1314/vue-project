<template>
   <div class="de-box">
     <div class="go-back" @click="goback">&lt;&lt; 返回</div>
     <p class="tit-p">机构审核发证</p>
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
             <span v-if="data.legal_cardtype==2">护照</span>
             <span v-if="data.legal_cardtype==3">军官证</span>
             <span v-if="data.legal_cardtype==4">武警证</span>
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
     <p class="title-info">资质审核信息</p>
     <div class="tab-class">
       <table>
        <tr>
          <td>管理项目：</td>
          <td>{{data.categoryname}}</td>
        </tr>
         <tr>
          <td>场馆类型：</td>
          <td>
             <span v-if="data.venue_type==1">
                培训中心
             </span>
              <span v-if="data.venue_type==2">
                  考核中心
             </span>
          </td>
        </tr>
        <tr>
          <td>资质等级：</td>
          <td>
       
            <span v-if="data.quality_level==1">初级</span>
            <span v-if="data.quality_level==2">中级</span>
            <span v-if="data.quality_level==3">高级</span>
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
            <span v-if="data.status==1">待审核</span>
            <span v-if="data.status==2">待发证</span>
            <span v-if="data.status==3">运营</span>
            <span v-if="data.status==4">暂停</span>
            <span v-if="data.status==5">整改</span>
            <span v-if="data.status==6">年审</span>
            <span v-if="data.status==7">年审冻结</span>
            <span v-if="data.status==8">注销</span>
            <span v-if="data.status==9">驳回</span>
          
          </td>
        </tr>
        <!-- <tr>
          <td>服务评级：</td>
          <td>
            {{data.service_rating}}
          </td>
        </tr> -->
         <tr>
          <td>安全指标：</td>
          <td>
            
             <span v-if="data.safety_indicators ==0">不达标</span>
             <span v-if="data.safety_indicators ==1">达标</span>
             <span v-if="data.safety_indicators ==2">一般</span>
          </td>
        </tr>
         <tr>
          <td>照明指标：</td>
          <td>
         
             <span v-if="data.lighting_index==0">不达标</span>
             <span v-if="data.lighting_index==1">达标</span>
             <span v-if="data.lighting_index==2">一般</span>
          </td>
        </tr>
         <tr>
          <td>视频监控指标：</td>
          <td>
    
            <span v-if="data.monitoring_index==0">不达标</span>
             <span v-if="data.monitoring_index==1">达标</span>
             <span v-if="data.monitoring_index==2">一般</span>
          </td>
        </tr>
         <tr>
          <td>考官名册：</td>
          <td class="tab-btncla">
            <span  class="ocolor" v-for="item in mcList">
                {{item}}
            </span>
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
          <td>{{data.addtime}}</td>
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
          <td>{{data.term}}年</td>
        </tr>
          <tr>
          <td>年审时间：</td>
          <td>{{data.term_operation}}</td>
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
        <tr>
          <td>营业执行照片：</td>
          <td><img :src="item" v-for="item in imgarr1"></td>
        </tr>
        <tr>
          <td>法人身份证照片：</td>
          <td><img :src="item" v-for="item in imgarr2"></td>
        </tr>
        <tr>
          <td>消防验收照片：</td>
          <td><img :src="item" v-for="item in imgarr3"></td>
        </tr>
        <tr>
          <td>安全验收照片：</td>
          <td><img :src="item" v-for="item in imgarr4"></td>
        </tr>
        <tr>
          <td>场地使用证明照片：</td>
          <td><img :src="item" v-for="item in imgarr5"></td>
        </tr>
        <tr>
          <td>场地保险合同照片：</td>
          <td><img :src="item" v-for="item in imgarr6"></td>
        </tr>
        <tr>
          <td>培训师证件照片：</td>
          <td><img :src="item" v-for="item in imgarr7"></td>
        </tr>
        <tr>
          <td>场馆照片：</td>
          <td><img :src="item" v-for="item in imgarr8"></td>
        </tr>
      </table>
     </div>
     <div class="hr"></div>
     <div class="ex-btnbox">
       <button class="color" v-if="data.venue_type==1"  @click="check(1)">培训机构授权书</button>
       <button class="color" v-if="data.venue_type==2" @click="check(2)">考核机构授权书</button>
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
          width="973px"
          class="box-shadow"
          >
            <span slot="title" class="tit-class">
              {{title}}
            </span>
            <div class="zs-cont">
              <div class="px-zs">
                 <p>授予<span>{{zsdata.name}}</span></p>
                 <p>为全国大众乒乓球段位制<span>{{zsdata.certtype}}</span>指定机构</p>
                 <p>授权区域<span>{{zsdata.province}}{{zsdata.city}}</span></p>
              </div>

              <div class="ft-info">
                 <p><span>授权期限：</span>{{zsdata.addtime}}至{{zsdata.term_operation}}</p>
                 <p><span>编号：</span>{{zsdata.agency_number}}</p>
              <!--    <p><span>网址：</span>{{zsdata.}}</p> -->
                 <p><span>地址：</span>{{zsdata.province}}{{zsdata.city}}{{zsdata.agency_address}}
</p>
              </div>
            </div>
            </span>
             <div class="footer-btn">
                   <el-button type="primary"   @click="confirm(zsdata.certtype)">确认授权</el-button>
                   <el-button @click="addmenu=false">取 消</el-button>
              </div>
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
        title:"",
        result:"",
        mcList:[],
        zsdata:[],
        imgarr1:[],
        imgarr2:[],
        imgarr3:[],
        imgarr4:[],
        imgarr5:[],
        imgarr6:[],
        imgarr7:[],
        imgarr8:[]

    }
  },
  mounted(){
      this.id = this.$route.params.id;
      this.getList();
  },
  methods:{
    goback(){
      this.$router.push({path:"/organizational/list"});
    },
    getList(){
      this.$api.post("/organedetail",{
       id:this.id
      },su=>{
        if(su.status==200){
          this.data = su.data;
          this.imgarr1 = su.data.license_img.split(",");
          this.imgarr2 = su.data.idcard_img.split(",");
          this.imgarr3 = su.data.fire_img.split(",");
          this.imgarr4 = su.data.place_check_img.split(",");
          this.imgarr5 = su.data.place_use_img.split(",");
          this.imgarr6 = su.data.place_insure_img.split(",");
          this.imgarr7 = su.data.trainer_idcard_img.split(",");
          this.imgarr8 = su.data.venue_img.split(",");
          this.mcList = su.data.trainer_roster.split(",");
          console.log(this.mcList)
         /* this.mcList = this.data.trainer_roster.splite(',');
          console.log(this.mcList);*/
          //this.total = su.data.total;
        }
      },err=>{
          this.fail = true;
          this.failinfo = su.info;
      },{token:sessionStorage.getItem("token")})
    },
    check(v){
       var data = {};
       if(v==1){
          this.title = "培训机构授权书";
          data = {
            id:this.id,
            certtype:1
          }
       }else if(v==2){
           this.title = "考核机构授权书";
           data = {
            id:this.id,
            certtype:2
          }
       }

       this.$api.post("/issdetail",data,su=>{
          console.log(su);
          if(su.status==200){
            this.zsdata = su.data;
            this.addmenu = true;
          }else{
            this.fail = true;
            this.failinfo = su.info;
          }

       },err=>{

       },{token:sessionStorage.getItem("token")})

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
   confirm(v){
        var data = {};
        if(v=="培训"){
           data = {
            id:this.id,
            certtype:1
           }
        }else if(v=="考核"){
          data = {
            id:this.id,
            certtype:1
           }
        }

       this.$api.post("/issuing",data,su=>{
             console.log(su)
             if(su.status==200){
                this.success = true;
                this.suinfo = su.info;
                this.addmenu = false;
                setTimeout(()=>{
                   this.$router.push({path:"/organizational/list"});
                },1000)
             }else{

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
      width:140px;
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
  .ocolor{
     padding:5px 10px;
     background-color: #FFE9A6;
     margin-right:10px;
     border-radius:3px;
  }

  .zs-cont{
    width:665px;
    height:940px;
    background:url(../../assets/images/sqbook.png) 0 0  no-repeat;
    margin:0px auto 64px;
  }
  .footer-btn{
    height:74px;
    line-height:74px;
    border-top: 1px solid #ccc;
    text-align:right;
  }
  .px-zs{
    width:454px;
    margin:0px auto;
    position:absolute;
    top:500px;
    left:50%;
    margin-left:-227px;
    font-size:20px;
    color:#231815;
    font-family: "SimHei";
  }
  .px-zs p{
    margin-bottom:20px;
  }
  .px-zs span{
    display: inline-block;
    border-bottom: 1px solid #999;
  }
   .px-zs p:nth-child(1) span{
    text-indent: 20px;
    width:385px;
   } 
   .px-zs p:nth-child(2) span{
      width:120px;
      text-align:center;
      margin:0 2px;
   }
    .px-zs p:nth-child(3) span{
       width:340px;
       text-indent: 10px;
       margin-left:5px;
    }

    .ft-info{
      width:330px;
      position:absolute;
      top:800px;
      left:260px;
      font-size:16px !important;
      color:#221815;
      font-family:"SimHei";
    }
     .ft-info p{
      line-height:20px; 
      font-size:14px;
     }
    .ft-info span{
      
    }

    .show-img img{
      margin-right:20px;
    }
</style>
