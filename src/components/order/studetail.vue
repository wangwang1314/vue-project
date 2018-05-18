<template>
   <div class="de-box">
     <div class="go-back" @click="goback">&lt;&lt; 返回</div>
     <p class="tit-p">学员参与段位考核活动订单详情</p>
     <p class="title-info">订单基本信息</p>
     <div class="tab-class">
      <table>
        <tr>
          <td>订单编号：</td>
          <td>{{data.order}}</td>
        </tr>
         <tr>
          <td>活动组织机构：</td>
          <td>{{data.name}}</td>
        </tr>
        <tr>
          <td>活动时间：</td>
          <td>{{data.examtime}}</td>
        </tr>
        <tr>
          <td>学员编号：</td>
          <td>{{data.number}}</td>
        </tr>
        <tr>
          <td>学员姓名：</td>
          <td>{{data.realname}}</td>
        </tr>
        <tr>
          <td>考核段位：</td>
          <td>{{data.dan}}级</td>
        </tr>
         
      </table>
     </div>
      <p class="title-info">订单支付详情</p>
     <div class="tab-class">
      <table>
        <tr>
          <td>段位考核费用：</td>
          <td class="count">
            <span>额定考核费用（<i>{{data.originalprice}}</i>）</span>
            <span>折扣（<i>{{data.rate}}</i>）</span>
            <span>实付（<i>{{data.realprice}}</i>）</span>
          </td>
        </tr>
       <!--   <tr>
          <td>附加服务费用：</td>
          <td>{{data.name}}</td>
        </tr> -->
        <tr>
          <td width=132>实际支付订单金额：</td>
          <td class="red">
            ￥{{data.realprice}}
          </td>
        </tr>
        <tr >
          <td>支付时间：</td>
          <td >{{data.paytime}}</td>
        </tr>
       <!--  <tr>
          <td>支付人：</td>
          <td>{{data.places}}</td>
        </tr> -->
        <tr>
          <td>支付方式：</td>
          <td>{{data.paytype}}</td>
        </tr>
        <!--  <tr>
          <td>支付账号：</td>
          <td>{{data.contacts}}</td>
        </tr> -->
      </table>
     </div>
     
  
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
        result:""
    }
  },
  mounted(){
      this.id = this.$route.params.id;
      this.getList();
  },
  methods:{
    goback(){
      this.$router.push({path:"/order/stulist"});
    },
    getList(){
      this.$api.post("/orderdetail",{
       id:this.id
      },su=>{
        if(su.status==200){
          this.data = su.data;
        }
      },err=>{
          this.fail = true;
          this.failinfo = err.info;
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
        width: 132px;
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
  .fw{
    font-weight:bold;
    margin-right:10px;
  }
  .lelval{
    margin:0 20px;
  }
    .lelval em{
       color:#FF9B4B;
       padding:0 5px;
    }
    .tab-class table td:nth-child(2).red{
      color: #FF4F4F;
    }
    .tab-class table td:nth-child(2).count{
      span{
        margin-right: 56px;
        i{
          color: #FF9B4B;
        }
      }
    }
</style>
