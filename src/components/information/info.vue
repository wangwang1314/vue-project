<template>
  <div>
      <ul class="add-content">
          <li>
            <div class="first"><i>*</i>网站中文名</div>
            <div class="last"><input v-model="menu.name"  type="text"   :class="{'border-red':check.name}"></div>
          </li>
          <li>
            <div class="first"><i>*</i>网站英文名</div>
            <div class="last"><input v-model="menu.ename" :class="{'border-red':check.ename}"  type="text"  placeholder="30字以内"  maxlength="30"></div>
          </li>
          <li>
            <div class="first"><i>*</i>等级标准</div>
            <div class="last"><input v-model="menu.standard" :class="{'border-red':check.standard}"  type="text"   ></div>
          </li>
          <li>
            <div class="first"><i>*</i>网站左边logo</div>
            <div class="last">
              <el-upload
                class="avatar-uploader"
                action="http://upload-z0.qiniu.com"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :data="data"
                :before-upload="beforeAvatarUpload">
                <img v-if="menu.logo" :src="menu.logo" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </li>
          <li>
            <div class="first"><i>*</i>网站右边logo</div>
            <div class="last">
               <el-upload
                class="avatar-uploader"
                action="http://upload-z0.qiniu.com"
                :show-file-list="false"
                :on-success="handleAvatarSuccess1"
                :data="data"
                :before-upload="beforeAvatarUpload">
                <img v-if="menu.rlogo" :src="menu.rlogo" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </li>
          <li>
            <div class="first"><i>*</i>网站微信图片</div>
            <div class="last">
              <el-upload
                class="avatar-uploader"
                action="http://upload-z0.qiniu.com"
                :show-file-list="false"
                :on-success="handleAvatarSuccess2"
                :data="data"
                :before-upload="beforeAvatarUpload">
                <img v-if="menu.weixin" :src="menu.weixin" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </li>
          <li>
            <div class="first"><i>*</i>在线客服</div>
            <div class="last"><input v-model="menu.online_service" :class="{'border-red':check.online_service}"  type="text"   ></div>
          </li>
          <li>
            <div class="first"><i>*</i>版权信息</div>
            <div class="last"><input v-model="menu.copyright" :class="{'border-red':check.copyright}"  type="text"   ></div>
          </li>
          <li>
            <div class="first"><i>*</i>备案号</div>
            <div class="last"><input v-model="menu.record" :class="{'border-red':check.record}"  type="text"   ></div>
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
        name:"",
        ename:"",
        standard:"",
        logo:"",
        rlogo:"",
        weixin:"",
        online_service:"",
        copyright:"",
        record:""
     },
      check:{
        name:false,
        ename:false,
        standard:false,
        logo:false,
        rlogo:false,
        weixin:false,
        online_service:false,
        copyright:false,
        record:false
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
          type:1
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
   beforeAvatarUpload(file){

      let that = this;
      return new Promise(
        function(resolve, reject) {
            let data = (new Date()).getTime();
            let arr = file.name.split(".");
            let key = data+"."+arr[arr.length-1];
            that.data.key = key;
            that.$api.post("/uptoken",{key:key},su=>{
                    if(su.status==1){
                       that.data.token = su.data;

                       resolve(true);
                    }else{
                       reject(false);
                    }
            },err=>{
                       reject(false);
            },{token:sessionStorage.getItem("token")})
        }
        );
    },
    handleAvatarSuccess(val,file,filelist){
      this.menu.logo = "http://images.harfax.com/"+val.key;
    },
    handleAvatarSuccess1(val,file,filelist){
      this.menu.rlogo = "http://images.harfax.com/"+val.key;
    },
    handleAvatarSuccess2(val,file,filelist){
      this.menu.weixin = "http://images.harfax.com/"+val.key;
    },
    confirm(){
      this.initCheck();
      if(!this.menu.name){
        this.isarr = true;
        this.arrtit = "请填写网站中文名";
        this.check.name = true;
        return
      }
      if(!this.menu.ename){
        this.isarr = true;
        this.arrtit = "请填写网站英文名";
        this.check.ename = true;
        return
      }
      if(!this.menu.standard){
        this.isarr = true;
        this.arrtit = "请填写等级标准";
        this.check.standard = true;
        return
      }
       if(!this.menu.logo){
        this.isarr = true;
        this.arrtit = "请上传网站左边logo";
        return
      }
      if(!this.menu.rlogo){
        this.isarr = true;
        this.arrtit = "请上传网站右边logo";
        return
      }
      if(!this.menu.weixin){
        this.isarr = true;
        this.arrtit = "请上传网站微信图片";
        return
      }
      if(!this.menu.online_service){
        this.isarr = true;
        this.arrtit = "请填写在线客服";
        this.check.online_service = true;
        return
      }
      if(!this.menu.copyright){
        this.isarr = true;
        this.arrtit = "请填写版权信息";
        this.check.copyright = true;
        return
      }
       if(!this.menu.record){
        this.isarr = true;
        this.arrtit = "请填写备案号";
        this.check.record = true;
        return
      }
      this.$api.post("/systemedit",this.menu,su=>{
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