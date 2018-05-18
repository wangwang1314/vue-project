<template> 
  <div>
    <el-container class="container-warp">
   <el-aside width="200px">
    <div class="slider-lt">
      <img src="../../assets/images/slider-logo.png">
    </div>
    <ul class="slider-ul">
      <!-- <router-link to="/organizational" tag="li">机构管理</router-link>
      <router-link to="/teacher" tag="li">师资管理</router-link>
      <router-link to="/menu" tag="li">菜单管理</router-link>     --> 
      <template v-for="item in list">
          <li @click="choseFn(item)" :class="{'router-link-active':item.webrouter==manRouter}">{{item.title}}</li>
      </template>
    </ul>
  </el-aside>
  <el-container>
    <el-header>
      <div class="nav-tit">
        <span class="tit">{{navList.remark}}</span>
        <div class="super-adm">
          <div class="admin-img">
            <img :src="data.avatar" alt="">
          </div> 
          <div class="admin-name">
            <div class="adm-le">
              <p>{{system.greetings}}</p> 
              <p>{{data.nickname}} (<span>{{data.account}}</span>)</p>
            </div> 
            <a class="adm-ri" @click="exit">退出</a>
          </div>
        </div>
      </div>
      <ul class="nav-class">
        <template v-for="item in navList.children">
          <li @click="getchild(item)"><router-link :to="item.webrouter" tag="a" >{{item.title}}</router-link></li>
        </template>
      </ul>
    </el-header>
    <el-main>
      <slot name="main"></slot>
    </el-main>
  </el-container>
</el-container>
  </div>
  

</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      navList:[],
      manRouter:"",
      time:""
    }
  },
  methods:{
     routerFn(){
      // console.log(this.$route.path,this.$route.path.split("/"))
       let path = this.$route.path;
       let arr = path.split("/");
       if(arr.length<2){
          return
       }
       this.manRouter = arr[1];
       for(let val of this.$store.state.list){
         // console.log(val);
          if(val.webrouter===arr[1]){
            this.navList = val;
            if(val.children.length>0){
              for(let item of val.children){
                  if(path.indexOf(item.webrouter)!=-1){
                    this.$store.state.childList = item.children;
                  }
              }
            }
          }
       }
    },
    getList(){
       this.$api.get("/main",{
          
        },su=>{
          if(su.status==200){
           this.$store.state.list = su.data;
           this.routerFn();
          }
        },err=>{
           
        },{token:sessionStorage.getItem("token")})  
    },
    choseFn(item){
      //点击切换路由
      this.navList = item;
      this.manRouter = item.webrouter;
     // console.log(item);
      let routers = "";
      if(item.children.length>0){
        routers = item.children[0].webrouter;
        let children = item.children[0].children;
        if(children.length>0){
           routers = children[0].webrouter;
           this.$store.state.childList = children;
        }
      }
      this.$router.push({path:routers})
    },
    getchild(val){
      //console.log(val,"dsd");
      this.$store.state.childList = val.children;
      if(val.children.length>0){
        this.$router.push({path:val.children[0].webrouter})
      }
    },
    //获取用户信息
    getInfo(){
      this.$api.get("/info",{
          
      },su=>{
        if(su.status==200){
           this.$store.state.data = su.data;
           sessionStorage.setItem("type_pro",su.data.type);
           sessionStorage.setItem("category",su.data.category);
        }
      },err=>{
         
      },{token:sessionStorage.getItem("token")})  
    },
    exit(){

      this.$confirm('确定要退出吗？', '', {     
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: ''
              }).then(() => {
                     this.$api.get("/logout",{
                        },su=>{
                          if(su.status==200){
                            
                          }
                        },err=>{
                           
                        },{token:sessionStorage.getItem("token")})
                     sessionStorage.removeItem("token");
                      this.$router.push({path:"/login"})
                      
              }).catch(()=>{
               
              });
     
    },
    getSystem(){
      this.$api.get("/systeminfo",{
      },su=>{
        if(su.status==200){
          this.$store.state.system = su.data;
          //this.time = su.data.greetings;
        }
      },err=>{
          this.fail = true;
          this.failinfo = su.info;
      },{token:sessionStorage.getItem("token")})
    }
  },
  mounted(){
    if(this.$store.state.list.length<=0){
      this.getList();
    }else{
      this.routerFn();
    }
    if(JSON.stringify(this.$store.state.data)=="{}"){
      this.getInfo();
    }
    if(JSON.stringify(this.$store.state.system)=="{}"){   
      this.getSystem();
    }
  },
  watch:{
   
  },
  computed:{
    ...mapState({
      childList:"childList",
      list:"list",
      data:"data",
      system:"system"
    })
  }
}
</script>
<style lang='scss'>
.container-warp.el-container{
  height:100vh;
}
.container-warp {
  .el-header{
    text-align: left;
    background-color: #fff;
    height: 138px!important;
    border-bottom: 2px solid #e6e6e6;
  }
  .el-aside {
    width:240px;
    background:rgba(47,50,58,1);
    color:#fff;
  }
  .el-main {
    background-color: #EEEEEE;
    color: #333;
    text-align: center;
  }

  .slider-lt{
    height:74px; 
    background:rgba(29,37,44,1);
    text-align:center;
    line-height:90px;
    padding-top:16px;
    
  }
  .slider-ul{
    li{
      height:50px;
      line-height:50px;
      font-size:14px;
      text-indent:40px;
      text-align:left;
    }
    li.router-link-active{
      background-color: RGBA(31, 165, 255, 1);
    }
  }
}

.nav-tit {
    font-size: 20px;
    color: #000;
    height: 90px;
    line-height: 90px;
    position: relative;
    .tit{
      font-weight: bold;
    }
}
.super-adm {
    position: absolute;
    width: 310px;
    height: 52px;
    right: 18px;
    bottom: 0;
}
.admin-img {
    float: left;
    width: 52px;
    height: 52px;
  img {
    width: 52px;
    height: 52px;
    border-radius: 50%;
  }
}
.adm-le {
    width: 222px;
    float: left;
}
.adm-ri {
    float: left;
    width: 30px;
    height: 24px;
    font-weight: 700;
    color: #378eef;
    margin-top: 14px;
    cursor: pointer;
}
.adm-le p, .adm-ri {
    font-size: 14px;
    line-height: 1;
}
.adm-le p {
    color: #2f323a;
    margin-top: 8px;
    text-indent: 10px;
}
.nav-class {
    overflow: hidden;
    li {
        width: 120px;
        height: 50px;
        float: left;
        color: #4d4d4d;
        font-size: 14px;
        a.router-link-active {
          background: #eee;
          color: #1a1a1a;
          font-weight: bold;
        }
         a {
          display: block;
          height: 50px;
          line-height: 50px;
          text-align: center;
          text-decoration: none;
          color: #4d4d4d;
      }
    }

}
</style>