<template>
   <div class="de-box">
     <div class="go-back" @click="goback">&lt;&lt; 返回</div>
     <p class="tit-p">机构详情</p>
     <div class="mar-top">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="机构基本信息" name="first">
            <div class="tab-class">
              <table>
                <tr>
                  <td>机构编号：</td>
                  <td>{{data.base.agency_number}}</td>
                </tr>
                 <tr>
                  <td>机构名称：</td>
                  <td>{{data.base.name}}</td>
                </tr>
                <tr>
                  <td>营业执照号：</td>
                  <td>{{data.base.license_number}}</td>
                </tr>
                <tr>
                  <td>联系人：</td>
                  <td>{{data.base.contact_name}}</td>
                </tr>
                <tr>
                  <td>联系电话：</td>
                  <td>{{data.base.contact_phone}}</td>
                </tr>
                <tr>
                  <td>场馆电话：</td>
                  <td>{{data.base.venue_phone}}</td>
                </tr>
                <tr>
                  <td>邮箱：</td>
                  <td>{{data.base.email}}</td>
                </tr>
                <tr>
                  <td>邮政编码：</td>
                  <td>{{data.base.postcode}}</td>
                </tr>
                 <tr>
                  <td>所在地址：</td>
                  <td>{{data.base.agency_address}}</td>
                </tr>
                 <tr>
                  <td>机构法人：</td>
                  <td>{{data.base.legal_name}}</td>
                </tr>
                 <tr>
                  <td>法人证件：</td>
                  <td>{{data.base.legal_cardtype}}</td>
                </tr>
                 <tr>
                  <td>证件号码：</td>
                  <td>{{data.base.legal_idcard}}</td>
                </tr>
                 <tr>
                  <td>法人地址：</td>
                  <td>{{data.base.legal_address}}</td>
                </tr>
              </table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="项目资质信息" name="second">
                  <div class="tab-class">
                    <table class="width-180">
                      <tr>
                        <td >管理项目：</td>
                        <td>{{data.credentials.categoryname}}</td>
                      </tr>
                       <tr>
                        <td>场馆类型：</td>
                        <td>{{data.credentials.venue_type}}</td>
                      </tr>
                      <tr>
                        <td>资质等级：</td>
                        <td>{{data.credentials.quality_level}}</td>
                      </tr>
                      <tr>
                        <td>场地数：</td>
                        <td>{{data.credentials.site_num}}</td>
                      </tr>
                      <tr>
                        <td>场馆状态：</td>
                        <td>{{data.credentials.status}}</td>
                      </tr>
                      <tr>
                        <td>服务评级：</td>
                        <td>{{data.credentials.service_rating}}</td>
                      </tr>
                      <tr>
                        <td>培训资格证号：</td>
                        <td>{{data.credentials.certified}}</td>
                      </tr>
                      <!-- <tr>
                        <td>段位考核资格授权书号：</td>
                        <td>{{data.credentials.authorization}}</td>
                      </tr> -->
                       <tr>
                        <td>安全指标：</td>
                        <td>{{data.credentials.safety_indicators}}</td>
                      </tr>
                       <tr>
                        <td>照明指标：</td>
                        <td>{{data.credentials.lighting_index}}</td>
                      </tr>
                       <tr>
                        <td>视频监控指标：</td>
                        <td>{{data.credentials.monitoring_index}}</td>
                      </tr>
                      <!--  <tr>
                        <td>证件号码：</td>
                        <td>010101001</td>
                      </tr> -->
                       <tr>
                        <td>考官名册：</td>
                        <td class="tab-btncla">
                         <!--  <template v-for="item in getsplit()">
                            <button>欧阳路路</button>
                          </template> -->
                          {{data.credentials.trainer_roster}}
                        </td>
                      </tr>
                       <tr>
                        <td>场馆描述：</td>
                        <td>{{data.credentials.description}}</td>
                      </tr>
                    </table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="审核认定信息" name="third">
               <div class="tab-class">
                  <table>
                    <tr>
                      <td>申请时间：</td>
                      <td>{{data.cognizance.addtime}}</td>
                    </tr>
                     <tr>
                      <td>现场审核人：</td>
                      <td>{{data.cognizance.field_auditor}}</td>
                    </tr>
                    <tr>
                      <td>认定机构：</td>
                      <td>{{data.cognizance.verify_organ}}</td>
                    </tr>
                    <tr>
                      <td>认定时间：</td>
                      <td>{{data.cognizance.cognizance_time}}</td>
                    </tr>
                    <tr>
                      <td>经营期限：</td>
                      <td>{{data.cognizance.term}}</td>
                    </tr>
                    <tr>
                      <td>年审时间：</td>
                      <td>{{data.cognizance.term_operation}}</td>
                    </tr>
                  </table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="其它附加信息" name="fourth">
                <div class="tab-class">
                  <table class="width-146 show-img">
                    <tr>
                      <td>剩余租约时间：</td>
                      <td>{{data.additional.month}}</td>
                    </tr>
                     <tr>
                  <td>营业执行照片：</td>
                    <td><img :src="item" v-for="item in splitFn(data.additional.license_img)"></td>
                  </tr>
                  <tr>
                    <td>法人身份证照片：</td>
                    <td><img :src="item" v-for="item in splitFn(data.additional.idcard_img)"></td>
                  </tr>
                  <tr>
                    <td>消防验收照片：</td>
                    <td><img :src="item" v-for="item in splitFn(data.additional.fire_img)"></td>
                  </tr>
                  <tr>
                    <td>安全验收照片：</td>
                    <td><img :src="item" v-for="item in splitFn(data.additional.place_check_img)"></td>
                  </tr>
                  <tr>
                    <td>场地使用证明照片：</td>
                    <td><img :src="item" v-for="item in splitFn(data.additional.place_use_img)"></td>
                  </tr>
                  <tr>
                    <td>场地保险合同照片：</td>
                    <td><img :src="item" v-for="item in splitFn(data.additional.place_insure_img)"></td>
                  </tr>
                  <tr>
                    <td>培训师证件照片：</td>
                    <td><img :src="item" v-for="item in splitFn(data.additional.trainer_idcard_img)"></td>
                  </tr>
                  <tr>
                    <td>场馆照片：</td>
                    <td v-if="data.additional.venue_img"><img :src="item" v-for="item in splitFn(data.additional.venue_img)"></td> 
                  </tr>
                  </table>
                </div>
            </el-tab-pane>
          </el-tabs>
      </div>
   </div>
</template>
<script>
export default {
  data () {
    return {
      id:"",
      activeName:"first",
      imgarr1:[],
        imgarr2:[],
        imgarr3:[],
        imgarr4:[],
        imgarr5:[],
        imgarr6:[],
        imgarr7:[],
        imgarr8:[],
      data:{}
    }
  },
  mounted(){
      this.id = this.$route.params.id;
      this.getList();
  },
  methods:{
     handleClick(tab, event) {
        
     },
     goback(){
      this.$router.push({path:"/organizational/list"})
     },
     splitFn(val){
        return val.split(",");
     },
     getList(){
      this.$api.post("/organdetail",{
        id:this.id
      },su=>{
        if(su.status==200){
          this.data = su.data;

          // this.imgarr1 = su.data.additional.license_img.split(",");
          // this.imgarr2 = su.data.additional.idcard_img.split(",");
          // this.imgarr3 = su.data.additional.fire_img.split(",");
          // this.imgarr4 = su.data.additional.place_check_img.split(",");
          // this.imgarr5 = su.data.additional.place_use_img.split(",");
          // this.imgarr6 = su.data.additional.place_insure_img.split(",");
          // this.imgarr7 = su.data.additional.trainer_idcard_img.split(",");
          // this.imgarr8 = su.data.additional.venue_img.split(",");
        }
      },err=>{
        
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

   .show-img img{
      margin-right:20px;
    }
</style>
