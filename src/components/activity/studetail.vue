<template>
   <div class="de-box">
     <div class="go-back" @click="goback">&lt;&lt; 返回</div>
     <p class="tit-p">段位考核活动学员报名详情</p>
     <div class="errol-dt">
          活动编号：<span></span>
          考核时间：<span></span>
     </div>
     <div class="mar-top">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="" name="first">
               <div>
                  <table v-if="activeName=='first'" class="list-table">
                  	<thead>
	              		<tr>
	                      <td>学员编号</td>
	                      <td>学员姓名</td>
	                      <td>报考等级</td>
	                      <td>场次</td>
                        <td>报名人</td>
	                      <td>报名时间</td>
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
                        <td></td>
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
      this.$router.push({path:"/activity/list"})
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

   .errol-dt{
    text-align:left;
    position: relative;
    top:30px;
    font-size:14px;
    color:#4D4D4D;

   }
   .errol-dt span{
     margin:0 89px 0 26px;
   }
</style>
