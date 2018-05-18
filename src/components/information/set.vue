<template>
  <div>
      <ul class="add-content">
          <li>
            <div class="first"><i>*</i>SEO标题</div>
            <div class="last"><input v-model="menu.title"  type="text" maxlength="30" placeholder="30字以内" :class="{'border-red':check.title}"></div>
          </li>
          <li>
            <div class="first"><i>*</i>SEO关键字</div>
            <div class="last"><input v-model="menu.keyword" :class="{'border-red':check.ename}" placeholder="250字以内" maxlength="250"  type="text"   ></div>
          </li>
          <li>
            <div class="first"><i>*</i>SEO描述</div>
            <div class="last">
              <textarea v-model="menu.description" maxlength="300" placeholder="300字以内">
                
              </textarea>
            </div>
          </li>
        </ul>
        <div class="warn-in">
          <el-alert
                 :title="arrtit"
                 type="warning"
                 show-icon v-show="isarr" >
          </el-alert>
        </div> 
        <div class="btn-box">
          <button @click="confirm()">保存</button>
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
  </div>
</template>
<script>
export default {
  data () {
    return {
     childId:0,
     menu:{
       id:"",
       title:"",
       keyword:"",
       description:""
     },
      check:{
       id:"",
       title:"",
       keyword:"",
       description:""
     },
      status:1,
      list:[],
      success:false,
      suinfo:"",
      fail:false,
      failinfo:"",
      isarr:false,
      arrtit:"",
      isajax:true,
      type:1,
      imageUrl:"",
      data:{
        key:"",
        token:""
      }
    }
  },
  mounted(){
    this.getList();
  },
  computed:{
   
  },
  methods:{
     getList(){
       this.$api.post("/system",{
          type:2
        },su=>{
          if(su.status==200){
           this.menu = su.data;
          }
        },err=>{
            this.fail = true;
            this.failinfo = su.info;
        },{token:sessionStorage.getItem("token")})  
    },
    dalogFn(){
       setTimeout(()=>{
        this.success = false;
        this.fail = false;
      },1500)
    },
    initCheck(val){
      this.isarr = false;
      for(let key in this.check){
        this.check[key] = false;
      }
    },
    confirm(){
      this.initCheck();
      if(!this.menu.title){
        this.isarr = true;
        this.arrtit = "请填写SEO标题";
        this.check.title = true;
        return
      }
      if(!this.menu.keyword){
        this.isarr = true;
        this.arrtit = "请填写SEO关键字";
        this.check.keyword = true;
        return
      }
      if(!this.menu.description){
        this.isarr = true;
        this.arrtit = "请填写SEO描述";
        this.check.description = true;
        return
      }
     
      this.$api.post("/editseo",this.menu,su=>{
                     this.isajax = true;
                    if(su.status==200){
                      this.success = true;
                      this.suinfo = su.info;
                    }else{
                      this.isarr = true;
                      this.arrtit = su.info;
                    }
        },err=>{
            this.isajax = true;
            this.fail = true;
            this.failinfo = su.info;
        },{token:sessionStorage.getItem("token")}) 
    }
  },
  watch:{
      success:'dalogFn',
      fail:'dalogFn'
  }
}
</script>


<style lang='scss' scoped>
  .add-content{
      font-size: 14px;
      text-align: left;
      li{
        margin-bottom: 30px;
        line-height: 34px;
      }
     .first{
      text-align: right;
      i{
        display: inline-block;
        width: 12px;
        height: 12px;
        color: red;
        margin-right: 5px;
      }
      display: inline-block;
      width: 120px;
      vertical-align: top;
     }
     .last{
      display: inline-block;
      padding-left: 20px;
      input{
        width: 420px;
        height: 34px;
        border:1px solid RGBA(204, 204, 204, 1);
        border-radius: 2px;
        box-sizing:border-box;
        text-indent: 5px;
      }
      input.border-red{
        border-color: red;
      }
      textarea{
        width: 420px;
        height: 86px;
        border: 1px solid RGBA(204, 204, 204, 1);
        box-sizing:border-box;
      }
      select{
        width: 420px;
        height: 34px;
        font-size: 14px;
        color: RGBA(153, 153, 153, 1);
      }
     }
   }
   .btn-box{
      width: 550px;
      height: 50px;
      button{
        width:130px;
        height:40px; 
        background:rgba(55,142,239,1);
        border-radius: 2px;
        border: none;
        outline: none;
        cursor: pointer;
        color: #fff; 
      }
   }
   .warn-in{
    margin-bottom: 50px;
    height: 36px;
   }
</style>
<style lang="scss">
   .last .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .last .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .last .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .last .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>