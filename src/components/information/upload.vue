<template>
  <div>
      <ul class="add-content">
          <li>
            <div class="first"><i>*</i>视频</div>
            <div class="last">
              <input type="text" name="" v-model="menu.video" >
              <div  class="el-upload__mp">只能上传mp4文件</div>
              <div class="progress" v-show="isshow"><p :style="{'width':width+'%'}"></p></div>
              <el-upload
                class="upload-demo"
                action="http://upload-z0.qiniu.com"
                :on-change="handleChange"
                :on-success="handleAvatarSuccess"
                :show-file-list="false"
                :data="data"
                :on-progress = "progress"
                :before-upload="beforeAvatarUpload"
                >
                <el-button  type="primary">点击上传</el-button>
                <!-- <button>点击上传</button> -->
              </el-upload>
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
       video:""
     },
      check:{
       id:"",
       video:""
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
      width:0,
      data:{
        key:"",
        token:""
      },
      isshow:false
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
          type:3
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

    handleChange(file, fileList) {
        
    },
    beforeAvatarUpload(file){

      let that = this;
      return new Promise(
        function(resolve, reject) {
            let data = (new Date()).getTime();
            let arr = file.name.split(".");
            let type = arr[arr.length-1];
            if(type!="mp4"&&type!="MP4"){
              that.$message({
                message: '上传视频的格式必须为MP4',
                type: 'warning'
              });
              // this.$message('上传视频的格式必须为MP4');
                 reject();
                 return
            }
            let key = data+"."+type;
            that.data.key = key;
            that.$api.post("/uptoken",{key:key},su=>{
                    if(su.status==1){
                       that.data.token = su.data;

                       resolve();
                    }else{
                       reject();
                    }
            },err=>{
                       reject();
            },{token:sessionStorage.getItem("token")})
        }
        );
    },
     handleAvatarSuccess(val,file,filelist){
      this.menu.video = "http://images.harfax.com/"+val.key;
    },
    progress(event, file, filelist){
      this.isshow = true;
      if(event.percent==100){
        this.isshow = false;
      }
      this.width = event.percent;
      //console.log(event,file,filelist)
    },
    confirm(){
      this.initCheck();
      if(!this.menu.video){
        this.isarr = true;
        this.arrtit = "请上传视频";
        return
      }
      let pat = /https?:\/\/[a-z0-9_.:]+\/[-a-z0-9_:@&?=+,.!/~*%$]*(\.(MP4|mp4))?/;
      //console.log(pat.test(this.menu.video),"ssss");
      if(!pat.test(this.menu.video)){
        this.isarr = true;
        this.arrtit = "请填写正确的视频url";
        return
      }
      this.$api.post("/editvideo",this.menu,su=>{
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
      width: 80px;
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
  .el-upload__mp{
    color: #4d4d4d;
    font-size: 12px;
  }
  .progress{
    height: 4px;
    background: #ccc;
    border-radius: 2px;
    margin-bottom: 10px;
    p{
      background:#79e50f;
      height: 4px;
      border-radius: 2px;
    }
  }
</style>