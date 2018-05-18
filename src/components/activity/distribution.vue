<template>
  <div class="al-con">
    <div class="go-back" @click="goback"><< 返回</div>  
    <p class="al-title">段位考核活动场次分配详情</p>
    <ul class="al-list">
        <li class="al-item">
          <span class="item-text">活动编码：</span>
          <span class="item-val">01010100112345</span>
        </li>
        <li class="al-item">
          <span class="item-text">活动时间：</span>
          <span class="item-val">2018-5-20</span>
        </li>
        <li class="al-item">
          <span class="item-text">总考官：</span>
          <span class="item-val">于继杰</span>
        </li>
        <li class="al-item">
          <span class="item-text">副总考官：</span>
          <span class="item-val">于继杰2</span>
        </li>
    </ul>
    <div class="assess-con">
        <p class="ass-title">
          <i></i>
          <span>考核时段</span>
          <span>9:00-10:00</span>
        </p>
        <ul class="ass-list">
          <li class="ass-item">
           
            <table>
              <tr>
                 <td>级别</td>
                 <td>初级</td>
              </tr>
              <tr>
                 <td>主考官</td>
                 <td>杨建平</td>
              </tr>
              <tr>
                 <td>副考官</td>
                 <td>黄淮海</td>
              </tr>
               <tr>
                 <td>考生</td>
                 <td>
                     <div class="stu-cont topnav_box">
                         <span>1 <em>周雁南</em></span>
                         <span>1 <em>周雁南</em></span>
                         <span>1 <em>周雁南</em></span>
                         <span>1 <em>周雁南</em></span>
                         <span>1 <em>周雁南</em></span>
                         <span>1 <em>周雁南</em></span>
                     </div>
                 </td>
              </tr>
               <span class="platform">1号台</span>
            </table>
            <span></span>
          </li>
            <li class="ass-item">
           
            <table>
              <tr>
                 <td>级别</td>
                 <td>初级</td>
              </tr>
              <tr>
                 <td>主考官</td>
                 <td>杨建平</td>
              </tr>
              <tr>
                 <td>副考官</td>
                 <td>黄淮海</td>
              </tr>
               <tr>
                 <td>考生</td>
                 <td>
                     <div class="stu-cont topnav_box">
                         <span>1 <em>周雁南</em></span>
                         <span>1 <em>周雁南</em></span>
                         <span>1 <em>周雁南</em></span>
                         <span>1 <em>周雁南</em></span>
                        
                     </div>
                 </td>
              </tr>
               <span class="platform">1号台</span>
            </table>
            <span></span>
          </li>
            <li class="ass-item">
           
            <table>
              <tr>
                 <td>级别</td>
                 <td>初级</td>
              </tr>
              <tr>
                 <td>主考官</td>
                 <td>杨建平</td>
              </tr>
              <tr>
                 <td>副考官</td>
                 <td>黄淮海</td>
              </tr>
               <tr>
                 <td>考生</td>
                 <td>
                     <div class="stu-cont topnav_box">
                         <span>1 <em>周雁南</em></span>
                         <span>1 <em>周雁南</em></span>
                         <span>1 <em>周雁南</em></span>
                         <span>1 <em>周雁南</em></span>
                         <span>1 <em>周雁南</em></span>
                         <span>1 <em>周雁南</em></span>
                     </div>
                 </td>
              </tr>
               <span class="platform">1号台</span>
            </table>
            <span></span>
          </li>
            <li class="ass-item">
           
            <table>
              <tr>
                 <td>级别</td>
                 <td>初级</td>
              </tr>
              <tr>
                 <td>主考官</td>
                 <td>杨建平</td>
              </tr>
              <tr>
                 <td>副考官</td>
                 <td>黄淮海</td>
              </tr>
               <tr>
                 <td>考生</td>
                 <td>
                     <div class="stu-cont topnav_box">
                         <span>1 <em>周雁南</em></span>
                         <span>1 <em>周雁南</em></span>
                         <span>1 <em>周雁南</em></span>
                         <span>1 <em>周雁南</em></span>
                         <span>1 <em>周雁南</em></span>
                         <span>1 <em>周雁南</em></span>
                     </div>
                 </td>
              </tr>
               <span class="platform">1号台</span>
            </table>
            <span></span>
          </li>


        </ul>

        
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
     
    }
  },
  mounted(){
    
  },
  computed:{
   
  },
  methods: {
      goback(){
         this.$router.push({path:"/activity/activitybase"})
      }

  }

}
</script>


<style lang='scss' scoped>
  .pd-t10{
    padding-top:10px; 
  }
  .db-in{
    display: inline-block;
  }
  .pd-b10{
    padding-bottom:10px; 
  }
  .al-con{
    padding: 32px 32px 50px 32px;
    overflow:hidden;
    text-align:left;
  }
  .go-back{
    width:116px;
    height:36px; 
    background:rgba(255,255,255,1);
    border-radius: 2px ;
    border: 1px solid RGBA(55, 142, 239, 1);
    box-sizing:border-box;
    font-size: 14px;
    text-align: center;
    line-height: 36px;
    color: RGBA(55, 142, 239, 1);
  }
  .al-title{
    width: calc(100% - 26px);
    height:40px; 
    background:rgba(228,239,252,1);
    border-radius: 2px;
    line-height:40px;
    padding-left:26px;
    margin-top:26px;
    font-size:14px;
    font-family:MicrosoftYaHei;
    color:rgba(0,0,0,1); 
  }
  .al-list{
    margin:36px 0 0 26px;
    .al-item{
      line-height:38px;
    }
    .item-text{
      display: inline-block;
      width:88px;
      font-size:14px;
      color:rgba(77,77,77,1);
      text-align:right;
      background-color:#F2F2F2;
    }
    .item-val{
      margin-left:14px;
      font-size:14px;
      color:rgba(26,26,26,1);
    }
  }
  .assess-con{
      margin-top:36px;
      .ass-title{
        line-height:38px;
        i{
          @extend .db-in;
          width:4px;
          height:16px;
          background:rgba(55,142,239,1); 
          vertical-align: middle;
          margin-right:12px;
        }
        span{
          font-size:16px;
          font-weight:bold;
          color:rgba(26,26,26,1);
        }
      }
      .ass-list{
        margin-top:20px;
        margin-left:28px;
        line-height:38px; 
        .ass-item{
          float:left;
          width:434px;
          border:1px solid #ccc;
          border-radius: 4px;
          background-color:white;
          margin-right:60px;
          margin-bottom:24px;
          span.item-val:nth-of-type(1){
            width: 200px;
          }
      
        }
        .item-key{
          @extend .db-in;
          width: 60px;
          font-size:14px;
          color:rgba(77,77,77,1);
          line-height:36px;
          text-align:right;
          background-color:#F2F2F2;
          padding-right:20px; 
          border-radius: 4px;
        }
        .val-box{
          @extend .db-in;
          width: calc(100% - 85px);
          background-color:#fff;
        }
        .item-val{
          @extend .db-in;
          width: calc(100% - 85px);
          background-color:#fff;
          text-indent:12px;
          min-height:38px;
          line-height:38px;
          text-align:left;
        }
        .stu{
          vertical-align: top;
        }
        .stuname{
          @extend .db-in;
          height:28px; 
          background:rgba(255,245,230,1);
          border-radius: 4px;
          text-align:center;
          line-height:28px;
          font-size:14px;
          padding: 0 27px 0 12px;
          margin-left:12px;
        }
       
      }
  }
  .ass-item{
    height:200px;
    background-color:white;
    position:relative;
    tr:nth-child(4) td{
      vertical-align:top;
      height:69px;
    }
     td{
      font-size:14px;
      color:#4D4D4D;
      line-height:14px;
    }
    td:nth-child(1){
     background-color:#F2F2F2;
     padding:10px 20px;
     width:44px;
     text-align:right;
    }
     td:nth-child(2){
      text-indent:21px;
     }
     tr:nth-child(4) td:nth-child(2){
       text-indent:0;
     }

    tr:nth-child(1) td{
      padding-top:20px;
     }
    tr:nth-child(1) td:nth-child(1){
      border-top:1px solid #ccc
     }
     .stu-cont{
       width:340px;
       height:78px;
       overflow:auto;
       position:relative;
       top:5px;
       padding-left:8px;
       box-sizing:border-box;
       span{
         float:left;
         display:inline-block;
         width:93px;
         height:28px;
         line-height:28px;
         background-color:#FFF5E6;
         border-radius:4px;
         text-indent:12px;
         margin-left:13px;
         margin-bottom:11px;

       }
     }

  
  }

 .platform{
    position:absolute;
    right:0;
    top:20px;
    width: 96px;
    line-height: 28px;
    text-align: center;
    background-color: #1687F0;
    border-radius: 26px 0 0 0 !important;
    font-size: 14px;
    color: #fff;     
}

 .topnav_box::-webkit-scrollbar    //滚动条整体部分
{  
    width: 5px;  
    height:10px;     
    background-color:#b5b1b1;

}  

.topnav_box::-webkit-scrollbar {/*滚动条整体样式*/
            width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 6px;
        }

 .topnav_box::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
 }
.topnav_box::-webkit-scrollbar-track {/*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 5px !important;
      background: white;
}       


  
  
</style>

</style>
