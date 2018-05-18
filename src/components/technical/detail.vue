<template>
   <div class="de-box">
     <div class="go-back" @click="goback">&lt;&lt; 返回</div>
     <p class="tit-p">机构详情</p>
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
                  <td>联系地址：</td>
                  <td>{{data.address}}</td>
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
                  <td>有效时间：</td>
                  <td>{{data.valid_time}}</td>
                </tr>
              </table>
            </div>
           
          </el-tab-pane>
          <el-tab-pane label="活动主持记录" name="second">
                 <div>
                  <table v-if="activeName=='second'" class="list-table">
                    <thead>
                    <tr>
                        <td>活动ID</td>
                        <td>发起机构</td>
                        <td>活动时间</td>
                        <td>参与身份</td>
                        <td>是否执行</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in data.list">
                        <td>{{item.season}}</td>
                        <td>{{item.allow_oran}}</td>
                        <td>{{item.activity_time}}</td>
                        <td>{{item.join_type}} </td>
                        <td>
                            {{item.type}}
                        </td>
                      </tr>
                    </tbody>
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
      data:{},
      url:"/tecdetail"
    }
  },
  mounted(){
      this.id = this.$route.params.id;
      this.getList();
  },
  methods:{
     handleClick(tab, event) {
        if(this.activeName=="first"){
        	   this.url = "/tecdetail" 
        }else if(this.activeName=="second"){
             this.url = "/tecaist"
        }
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
</style>
