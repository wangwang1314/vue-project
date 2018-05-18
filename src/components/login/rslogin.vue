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
         <p class="rs-tip">找回密码</p>
         <p class="rs-tit">
           <i>重置登录密码</i>
         </p>
         <p class="rs-info">请输入忘记密码的手机号，凭验证码重置密码。</p>
          <div class="ipt-content" >
            <ul>
              <li>
                <div class="first">手机号码</div>
                <div class="last">
                  <span class="phone" :class="{'border-red':check.isphone}">+86</span>
                  <input class="phone-ipt" :class="{'border-red':check.isphone}" type="" name="" placeholder="请输入手机号" v-model="phone"  maxlength="11">
                </div>
              </li>
              <li>
                <div class="first">短信验证码</div>
                <div class="last">
                  <input type="" name="" class="getcheck" :class="{'border-red':check.hascheck}" placeholder="请输入收到的验证码" v-model="code">
                 <!--  <el-button type="primary" @click="getcode" :class="{'isajax':!isajax}" class="getcode-class">{{tip}}</el-button> -->
                 <button class="get-code" @click="getMsg()" :class="{'ajaxtip':!isajax}">{{tip}}</button>
                </div>
              </li>
              <li>
                <div class="first">新密码</div>
                <div class="last">
                  <input type="password" name="" :class="{'border-red':check.newpass}"  placeholder="密码6-16位" v-model="newpass" maxlength="16">
                </div>
              </li>
              <li>
                <div class="first">重复新密码</div>
                <div class="last">
                  <input type="password" name="" :class="{'border-red':check.oldpass}" placeholder="密码6-16位" v-model="oldpass" @keyup.enter="submitFn" maxlength="16">
                </div>
              </li>
            </ul>
             <div class="warn-in">
               <el-alert
               :title="arrtit"
               type="warning"
               show-icon v-show="isarrinfo" >
             </el-alert>
            </div> 
            <div class="sub-cla-box" ><el-button type="primary"  round @click="submitFn">提交</el-button></div>
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
            hascheck:false,
            isphone:false,
            newpass:false,
            oldpass:false
          },
      phone:"",
      newpass:"",
      oldpass:"",
      remb:false,
      isarrinfo:false,
      arrtit:"",
      tip:"点击获取",
      isajax:true,
      code:"",
      down:60
    }
  },
  mounted(){
    this.getPic();
    // console.log(md5("123456"))
  },
  methods:{
    initarr(){
      this.check.hascheck = false;
      this.check.isphone = false;
      this.check.newpass = false;
      this.check.oldpass = false;
      this.isarrinfo = false;
    },
    submitFn(){
      this.initarr();
      //console.log(111);
      if(!this.phone){
        this.check.isphone = true;
        this.arrtit = "请输入手机号";
        this.isarrinfo = true;
        return
      }
      let reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
      if(!reg.test(this.phone)){
        this.check.isphone = true;
        this.isarrinfo = true;
        this.arrtit ='请输入正确的手机号';
        return;
      }
       if(!this.code){
        this.check.hascheck = true;
        this.isarrinfo = true;
        this.arrtit ='请输入短信验证码';
        return;
      }
      if(!this.newpass){
        this.check.newpass = true;
        this.isarrinfo = true;
        this.arrtit ='请输入密码';
        return;
      }
      if(/\s/g.test(this.newpass)){
        this.check.newpass = true;
        this.isarrinfo = true;
        this.arrtit ='密码中不能含有空格';
        return
      }
      if(!this.oldpass){
        this.check.oldpass = true;
        this.isarrinfo = true;
        this.arrtit ='请重复密码';
        return;
      }
      if(this.newpass!==this.oldpass){
        this.check.oldpass = true;
        this.isarrinfo = true;
        this.arrtit ='两次密码输入不一致，请重新输入';
        return
      }
      let pass = md5(this.newpass);
       this.$api.post("/smsChangepword",{
        account:this.phone,
        password:pass,
        sms:this.code
      },su=>{
        if(su.status==200){
          this.$router.push({path:"/login"})
        }else{
          this.isarrinfo = true;
          this.arrtit =su.info;
        }
      },err=>{
          this.isarrinfo = true;
          this.arrtit =su.info;
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

    },
    getMsg(){
        if(!this.isajax){
            return;
        }
         this.initarr();
      //console.log(111);
        if(!this.phone){
          this.check.isphone = true;
          this.arrtit = "请输入手机号";
          this.isarrinfo = true;
          return
        }
        let reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
        if(!reg.test(this.phone)){
          this.check.isphone = true;
          this.isarrinfo = true;
          this.arrtit ='请输入正确的手机号';
          return;
        }
        this.$api.post("/sendsms",{
         mobile:this.phone,
         type:3
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
  min-height: 900px;
  min-width: 698px;
  position: relative;
  .bg-box{
    height: 698px;
    width: 628px;
    margin:-349px  0 0 -314px;
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
        width: 628px;
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
  margin:40px 42px 46px 40px;
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
}
.red-bo input{
  border-color:red;
}


  .ipt-content ul{
    margin-top: 25px;
  }
  .ipt-content li{
    height: 58px;
  }
  .ipt-content li .first{
    float: left;
    width: 80px;
    height:12px; 
    font-size:14px;
    height: 38px;
    color:rgba(26,26,26,1);
    line-height:38px;
    text-align: right;
  }
  .ipt-content li .last{
    float: left;
    height: 38px;
    line-height:38px;
    margin-left: 19px;
  }
  .ipt-content li .last input{
    height: 34px;
    border:1px solid #ccc;
    border-width: 1px;
    padding:0;
    margin:0;
    text-indent: 15px;
    width: 442px;
    border-radius: 4px;
    outline: none;
  }


  .ipt-content li .last .phone-ipt{
    float: left;
    width: 382px;
    border-radius: 0 4px 4px 0;
  }
  .ipt-content li .last .getcheck{
    width: 334px;
    margin-right: 8px;
  }
  .tip-re{
    width:208px;
    height:38px; 
    font-size:12px;
    display: inline-block;
    color:rgba(248,76,76,1);
    line-height:38px;
    margin-left: 5px;
  }
  .ipt-content li .last .focus{
    border-color: #409EFF;
  }
  .ipt-content li .last .border-red{
    border-color: rgba(248,76,76,1);
  }
  .phone{
    height: 34px;
    border:1px solid #ccc;
    width: 76px;
    border-right: none;
    display:block;
    float: left;
    border-radius: 4px 0 0 4px;
    text-align: center;
    line-height: 34px;
  }
   .ipt-content li .last .phone-ipt{
    float: left;
    width: 365px;
    border-radius: 0 4px 4px 0;
  }

  .sub-cla-box{
  text-align: center;
  margin-top: 20px;
    button.el-button.is-round{
      font-size: 18px;
      width: 382px;
      height: 50px;
      border-radius: 30px;
    }
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
  margin-top: 2px;
  border-radius: 2px; 
}
.rs-tip{
  font-size:16px;
  font-weight: bold;
  color:rgba(77,77,77,1);
  line-height:38px;
  text-align: left;
  text-indent: 17px;
}
.rs-tit{
  width: 221px;
  height: 46px;
  display: inline-block;
  background:url(../../assets/images/rs-tit.png) center no-repeat;
  background-size: cover;
  color: RGBA(255, 255, 255, 1);
  font-size:22px;
  line-height: 46px;
  letter-spacing: 4px;
}
.rs-info{
  color: RGBA(77, 77, 77, 1);
  font-size: 14px;
  margin-top: 13px;
}
</style>





