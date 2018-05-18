<template>
   <div class="de-box">
     <div class="go-back" @click="goback">&lt;&lt; 返回</div>
     <p class="tit-p">新闻审批预览</p>
     
     <div class="cont-new">
       <h3>{{title}}</h3>
       <p class="autor">
           <span>作者：{{author}}</span>
           <span>发布时间：{{addtime}}</span>
       </p>
       <div class="sec-conts" v-html="content">
           
       </div>
     </div>
     <div class="hr"></div>
     <div class="ex-btnbox" v-show='sta==2'>
       <button class="color"  @click="examination(3)">同意</button>
       <button class="color"  @click="addmenu=true">不同意</button>
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
                不同意
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
              <el-button type="primary"   @click="examination(4)">确 定</el-button>
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
        sta:'',
        success:false,
        suinfo:"",
        fail:false,
        failinfo:"",
        addmenu:false,
        arrtit:"",
        isarr:false,
        result:"",
        title:"",
        author:"",
        addtime:"",
        content:"",
    
        isagree:3, //是否同意
        exinfo:"",//意见
    }
  },
  mounted(){
      this.id = this.$route.params.id;
      this.sta = this.$route.params.sta;
   
      this.getList();
  },
  methods:{
    goback(){
      this.$router.push({path:"/news/list"});
    },
    //审批
    examination(v){
       if(v==4){
         if(!this.result){
          this.fail = true;
          this.failinfo = "审核意见不能为空";
          return
         }
       }

       if(v==3){
         this.exinfo = "";
       }else{
         this.exinfo =this.result;
       }

       this.$api.post("/newaudit",{
          id:this.id,
          status:v,
          description:this.exinfo,
        
       },su=>{
        console.log(su);
        if(su.status==200){
          this.success = true;
          this.suinfo = su.info;
          setTimeout(()=>{
                   this.$router.push({path:"/news/list"});
          },1000)
        }else{
          this.fail = true;
          this.failinfo = su.info
        }
       },err=>{

          this.fail = true;
          this.failinfo = err.info;

       },{token:sessionStorage.getItem("token")})

    },
    //获取详情
    getList(){
      this.$api.post("/newdetail",{
       id:this.id
      },su=>{
        if(su.status==200){
              this.title = su.data.title,
              this.author = su.data.author,
              this.addtime = su.data.addtime,
              this.content = su.data.content
           
        }else{
          this.fail = true;
          this.failinfo = su.info;
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
    },
    check(){

    },
    notcheck(){

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

    .opinion{
       width:559px;
       height:120px;
    }

    .cont-new h3{
      text-align:center;
      font-size:18px;
      color:#1A1A1A;
      margin:45px 0 37px 0;
    }
    .cont-new .autor{
        text-align:center;
        margin-bottom:43px;
    }
     .cont-new .autor span{
        text-align:center;
        font-size:14px;
        color:#999999;
        margin-right:107px;

     }
     .sec-conts{
      width:835px;
      margin:0px auto 91px;
     }
</style>
