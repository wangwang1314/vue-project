<template>
  <div class="bg-content">
    <div class="bg-box">
      <img class="img-tit" src="../../assets/images/login-logo.png">
      <div class="bottom">
        <div class="user">
          <ul class="top-b">
            <li></li>
            <li></li>
            <li></li>
            <li></li>  
          </ul>
          <ul class="tit-log">
            <li :class="{'chose':!ischose}" @click="ischoseFn(false)">密码登录</li>
            <li :class="{'chose':ischose}" @click="ischoseFn(true)">短信验证码登录</li>
          </ul>
          <div class="ipt-content" >
            <div  class="el-input el-input--prefix" :class="{'red-bo':check.isphone}">
              <input autocomplete="off" placeholder="请输入手机号" type="text" rows="2"  class="el-input__inner" v-model="telnum" maxlength="11">
              <span class="el-input__prefix">
                <i 
                class="el-input__icon telico"></i>
              </span>
            <!--   <i class="info-arr" >请输入正确的手机号</i> -->
            </div>
            <div class="el-input el-input--prefix mar-22" :class="{'red-bo':check.ispass}" v-show="!ischose">
              <input  placeholder="请输入密码" type="password" rows="2" validateevent="true" class="el-input__inner" v-model="password"   autocomplete="new-password">
              <span class="el-input__prefix"><i  class="el-input__icon pswico"></i></span>
              <!-- <i class="info-arr" >请输入密码</i> -->
            </div>
            <div class="yanzheng" v-show="ischose">
              <div class="el-input el-input--prefix mar-22 width-270" :class="{'red-bo':check.isverific}">
                <input  placeholder="输入验证码" type="text" rows="2" validateevent="true" class="el-input__inner" v-model="message"   autocomplete="new-password" @keyup.enter="submitcodeFn">
               
               <!--  <i class="info-arr" >验证码错误，请重新输入</i> -->
              </div>
              <button class="get-code" @click="getMsg()" :class="{'ajaxtip':!isajax}">{{tip}}</button>
            </div>
            <div class="yanzheng" v-show="!ischose">
              <div class="el-input el-input--prefix mar-22 width-270" :class="{'red-bo':check.isverific}">
                <input  placeholder="图形验证码" type="text" rows="2" validateevent="true" class="el-input__inner" v-model="verification"   autocomplete="new-password" @keyup.enter="submitFn">
               
               <!--  <i class="info-arr" >验证码错误，请重新输入</i> -->
              </div>
              <img class="yz-img" @click="getPic" :src="imgurl">
            </div>
            <p class="remb">
              <span class="zz" @click="remb=!remb" v-show="!ischose"><i :class="{'chose':remb}"></i>记住账户</span>
              <!-- <span class="wj">忘记密码</span> -->
              <router-link tag="span" to="rslogin" class="wj">忘记密码</router-link>
            </p>
            <div class="warn-in">
               <el-alert
               :title="arrtit"
               type="warning"
               show-icon v-show="isarrinfo" >
             </el-alert>
            </div>   
            <div class="sub-cla-box" v-show="!ischose"><el-button type="primary"  round @click="submitFn">登录</el-button></div>
             <div class="sub-cla-box" v-show="ischose"><el-button type="primary"  round @click="submitcodeFn">登录</el-button></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import md5 from 'js-md5';
export default {
  data () {
    return {
      ischose:false,
      check:{      
            ispass:false,
            isphone:false,
            isverific:false
          },
      telnum:"",
      password:"",
      remb:false,
      isarrinfo:false,
      arrtit:"",
      verification:"",
      imgurl:"",
      message:"",
      isajax:true,
      down:60,
      tip:'点击获取',
    }
  },
  mounted(){
    this.getPic();
    this.telnum = localStorage.getItem("rsuser")?localStorage.getItem("rsuser"):"";
     //console.log(md5("123456"))
  },
  methods:{
    ischoseFn(val){
      this.ischose = val;
      this.initarr();
    },
    initarr(){
      this.check.ispass = false;
      this.check.isphone = false;
      this.check.isverific = false;
      this.isarrinfo = false;
    },
    submitFn(){
      this.initarr();
      //console.log(111);
      if(!this.telnum){
        this.check.isphone = true;
        this.arrtit = "请输入手机号";
        this.isarrinfo = true;
        return
      }
      let reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
      if(!reg.test(this.telnum)){
        this.check.isphone = true;
        this.isarrinfo = true;
        this.arrtit ='请输入正确的手机号';
        return;
      }
      if(!this.password){
        this.check.ispass = true;
        this.isarrinfo = true;
        this.arrtit ='请输入密码';
        return;
      }
       if(!this.verification){
        this.check.isverific = true;
        this.isarrinfo = true;
        this.arrtit ='请输入验证码';
        return;
      }
      let pass = md5(this.password);
       this.$api.post("/Login",{
        account:this.telnum,
        password:pass,
        captcha:this.verification
      },su=>{
        if(su.status==200){
          if(this.remb){
              localStorage.setItem("rsuser",this.telnum); 
          }else{
              localStorage.removeItem("rsuser"); 
          } 
          sessionStorage.setItem("token",su.data);
          this.$store.state.list = [];
          this.$store.state.data = {};
          this.$store.state.system = {}; 
          this.$router.push({path:"/home"})       
        }else{
          this.isarrinfo = true;
          this.arrtit =su.info;
          this.getPic();
        }
      },err=>{

      },{})

    }, 
    getPic(){
      this.$api.get("/verify",{},su=>{
        this.imgurl = window.URL.createObjectURL(su);    
      },err=>{},{},'blob')
    },
    keyupFn(val){
        for(let key in this.check){
          this.check[key] = false
        }
        if(parseInt(val)){
          this.telnum = parseInt(val)
        }else{
          this.telnum = ""
        }
        
    },
    submitcodeFn(){
        this.initarr();
        if(!this.telnum){
          this.check.isphone = true;
          this.arrtit = "请输入手机号";
          this.isarrinfo = true;
          return
        }
        let reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
        if(!reg.test(this.telnum)){
          this.check.isphone = true;
          this.isarrinfo = true;
          this.arrtit ='请输入正确的手机号';
          return;
        }
        if(!this.message){
          this.isarrinfo = true;
          this.arrtit ='请输入短信验证码';
          return;
        }

         this.$api.post("/smslogin",{
         account:this.telnum,
         sms:this.message
        },su=>{
          if(su.status==200){
               sessionStorage.setItem("token",su.data);
               this.$router.push({path:"/home"});
               this.$store.state.list = [];
               this.$store.state.data = {};
               this.$store.state.system = {}; 
          }else{
            this.isarrinfo = true;
            this.arrtit =su.info;
            this.getPic();
          }
        },err=>{

        },{})

    },
    getMsg(){
        if(!this.isajax){
            return;
        }
         this.initarr();
      //console.log(111);
        if(!this.telnum){
          this.check.isphone = true;
          this.arrtit = "请输入手机号";
          this.isarrinfo = true;
          return
        }
        let reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
        if(!reg.test(this.telnum)){
          this.check.isphone = true;
          this.isarrinfo = true;
          this.arrtit ='请输入正确的手机号';
          return;
        }
        this.$api.post("/sendsms",{
         mobile:this.telnum,
         type:2
        },su=>{
          if(su.status==200){
                this.isajax = false;
                this.tip = '重新获取('+this.down+'s)';
                this.time = setInterval(r=>{
                  this.down--;
                  this.tip = '重新获取('+((this.down<10)?'0'+this.down:this.down)+'s)';
                  if(this.down<=0){
                    clearInterval(this.time);
                    this.isajax = true;
                    this.tip = '点击获取';
                    this.down = 60;
                  }
                },1000)  
          }else{
            this.isarrinfo = true;
            this.arrtit =su.info;
          }
        },err=>{
          this.isarrinfo = true;
          this.arrtit =su.info;
        },{})
    }
  },
  watch:{
      telnum:'keyupFn'
  }
}
</script>


<style lang='scss' scoped>
.bg-content{
  height: 100vh;
  background: url("../../assets/images/bg-login.png") center no-repeat;
  background-size: cover;
  min-height: 720px;
  min-width: 698px;
  position: relative;
  .bg-box{
    height: 698px;
    width: 462px;
    margin:-349px  0 0 -231px;
    position: absolute;
    top:50%;
    left:50%;
    text-align: center;
    .img-tit{
      margin-bottom: 14px;
    }
    .bottom{
      .user{
        display: inline-block;
        width: 462px;
    
        background:#fff;
        box-shadow: rgba(0, 0, 0, 0.6) 0 13px 46px;
        .tit-log{
          overflow: hidden;
          margin-left: 40px;
          li{
            width: 191px;
            float: left;
            height: 64px;
            font-size:18px;
            color: rgba(77, 77, 77, 1);
            line-height: 70px;
            box-sizing: bordr-box;

          }
          li.chose{
            color: RGBA(31, 165, 255, 1);
            border-bottom: 2px solid RGBA(31, 165, 255, 1);
          }
        }
        .top-b{
          overflow: hidden;

          li{
            height: 6px;
            width: 25%;
            float: left;
          }

          li:first-child{     
           background: rgba(214,38,62,1);   

         }
         li:nth-child(2){     
           background:rgba(12,120,189,1);

         }
         li:nth-child(3){     
           background:rgba(36,4,29,1);

         }
         li:nth-child(4){     
          background:rgba(14,146,80,1);

        }
        li:nth-child(5){     
         background:rgba(238, 174, 32, 1);

       }
     }


   }
 }
}

}


.el-input--prefix .el-input__inner{
  height:38px;
}
.err-border{
  border:1px solid red;
}
.pswico,.telico{
  display: inline-block;
  width: 20px;
  height:20px;
  position: relative;
  top:8px;
}
.telico{
  background:url("../../assets/images/person-login.png") center center no-repeat;
  background-size:20px auto; 
}
.pswico{
  background:url("../../assets/images/pass-login.png") center center no-repeat;
  background-size:20px auto; 
}
.ipt-content{
  margin:48px 40px 55px 40px;
}
.mar-22{
  margin-top: 22px;
}
.info-arr{
  position:absolute;
  right:10px;
  top:4px;
  font-size:12px;
  color:RGBA(248, 76, 76, 1);
  background-color: #fff;
  height: 30px;
  line-height: 28px;
  text-indent: 3px;
}
.yanzheng{
  overflow: hidden;
  text-align: left;
}
.width-270{
  width: 270px;
 
  input{
     padding-left: 14px;
  }
}
.yz-img{
  width: 100px;
  height: 38px;
  float: right;
  margin-top: 21px;
  cursor: pointer;
}
.remb{
  font-size: 14px;
  overflow: hidden;
  text-align: left;
  height: 25px;
  margin-top: 34px;
  .zz{
      color: RGBA(26, 26, 26, 1);
     i{
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 1px solid RGBA(204, 204, 204, 1);
        border-radius: 2px;
        margin-right: 12px;
        position: relative;
        top:3px;
        box-sizing: border-box;
      }
      i.chose{
        background: url('../../assets/images/choseed.png') center no-repeat;
        background-size: cover;
        border: none;
      }
  }
 .wj{
    color: RGBA(153, 153, 153, 1);
    float: right;
    margin-top: 3px;
    cursor: pointer;
 }
 .wj:hover{
    color: RGBA(31, 165, 255, 1);
 }
}

.sub-cla-box{
  text-align: center;
    button.el-button.is-round{
      font-size: 18px;
      width: 382px;
      height: 50px;
      border-radius: 30px;
    }
}
.warn-in{
    height: 38px;
    margin-top: 10px;
}
.red-bo input{
  border-color:red;
}

.get-code{
  float: right;
  height: 38px;
  width: 100px;
  background-color:RGBA(201, 227, 255, 1);
  color: RGBA(26, 26, 26, 1);
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  cursor: pointer;
  margin-top: 22px; 
  border-radius: 2px;
}
.ajaxtip{
  background-color: #eee;
}
</style>
<style lang="scss">
.el-alert--warning{
  background-color:white;
  color:RGBA(248, 76, 76, 1);
  font-size: 12px;
}
.el-alert__closebtn{
  display: none
}
.el-alert{
  padding:10px 0;
}

</style>
