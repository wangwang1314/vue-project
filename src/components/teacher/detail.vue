<template>
   <div class="de-box">
     <div class="go-back" @click="goback">&lt;&lt; 返回</div>
     <p class="tit-p">机构详情</p>
     <div class="mar-top">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="first">
            <div class="tab-class">
              <table v-if="activeName=='first'">
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
                  <td>{{data.card_type}}    <span style="margin-left:40px;">{{data.idcard}}</span></td>
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
          </el-tab-pane>
          <el-tab-pane label="专业资格信息" name="second">
                  <div class="tab-class">
                    <table class="width-180" v-if="activeName=='second'">
                      <tr>
                        <td >乒乓球专业证书级别：</td>
                        <td>{{data.certy_grade}}</td>
                      </tr>
                      <tr>
                        <td >专业竞技比赛成绩：</td>
                        <td>{{data.race_name}} <span style="margin-left:10px;">第<i style="color:red;">{{data.race_rank}}</i>名</span></td>
                      </tr>
                      <tr>
                        <td >毕业院校：</td>
                        <td>{{data.school}}</td>
                      </tr>
                      <tr>
                        <td >所学专业：</td>
                        <td>{{data.profession}}</td>
                      </tr>
                      <tr>
                        <td >教练经历：</td>
                        <td>{{data.trainer_experience}}</td>
                      </tr>
                       <tr>
                        <td >参加段位标准培训时间：</td>
                        <td>{{data.trainer_time}}</td>
                      </tr>
                      <tr>
                        <td >培训地点：</td>
                        <td>{{data.trainer_address}}</td>
                      </tr>
                      <tr>
                        <td >培训机构：</td>
                        <td>{{data.trainer_organ}}</td>
                      </tr>
                      <tr>
                        <td >考核成绩：</td>
                        <td>{{data.trainer_score}}</td>
                      </tr>
                       <tr>
                        <td >段位证书编号：</td>
                        <td>{{data.segment_code}}</td>
                      </tr>
                      <tr>
                        <td >段位证书等级：</td>
                        <td>{{data.segment_grade}} 级</td>
                      </tr>
                      <tr>
                        <td >活动主持资格：</td>
                        <td>{{data.coach_type}}</td>
                      </tr>
                       <tr>
                        <td >评价星级：</td>
                        <td>{{data.star_level}}</td>
                      </tr>
                      <tr>
                        <td >段位考官资格：</td>
                        <td>{{data.star_slevel}}</td>
                      </tr>
                       <tr>
                        <td >培训师资格证书号：</td>
                        <td>{{data.trainer_code}}</td>
                      </tr>
                      <tr>
                        <td >审批机构：</td>
                        <td>{{data.verify_organ}}</td>
                      </tr>
                      <tr>
                        <td >审批时间：</td>
                        <td>{{data.approve_time}}</td>
                      </tr>
                      <tr>
                        <td >审批人：</td>
                        <td>{{data.approve_name}}</td>
                      </tr>
                      <tr>
                        <td >有效期限：</td>
                        <td>{{data.valid_time}}年</td>
                      </tr>
                    </table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="资格年审信息" name="third">
               <div>
                  <table v-if="activeName=='third'" class="list-table">
                  	<thead>
	              		<tr>
	                      <td>年审时间</td>
	                      <td>年审机构</td>
	                      <td>年审结果</td>
	                      <td>核准期限</td>
	                      <td>不通过原因</td>
	                    </tr>
                  	</thead>
                   	<tbody>
                   		<tr v-for="item in data.list">
	                      <td>{{item.addtime}}</td>
	                      <td>{{item.verify_organ}}</td>
	                      <td>{{item.status}}</td>
	                      <td>{{item.valid_time}} 年</td>
	                      <td >
                           <el-popover
                              placement="bottom"
                              width="200"
                              trigger="hover"
                              :content="item.description">
                              <el-button type="text" slot="reference">{{item.description}}</el-button>
                            </el-popover>
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
      url:"/tbasedetail"
    }
  },
  mounted(){
      this.id = this.$route.params.id;
      this.getList();
  },
  methods:{
     handleClick(tab, event) {
        if(this.activeName=="first"){
        	this.url = "/tbasedetail";
        }else if(this.activeName=="second"){
        	this.url = "/tprodetail";
        }else if(this.activeName=="third"){
        	this.url = "/annuallist";
        }
        this.getList();
     },
     goback(){
      this.$router.push({path:"/teacher/teacherlist"})
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
</style>
