<template>
  <div>
   
     <div class="backlist">
          <a href=""><<返回</a>
     </div>
     <h3 class="tit">
        管理【首页Banner】页面
     </h3>

 <template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="Banner页面列表" name="first">
       <button class="update" @click="updataOrder" :disabled="bannerList.length==0">更新排序</button>


<table class="ban-list">
  <thead>
        <tr>
     <th>排序</th>
     <th>ID</th>
     <th>Banner标题</th>
     <th>描述</th>
     <th>链接</th>
     <th>图片</th>
     <th>状态</th>
     <th>操作</th>
   </tr>
  </thead>
  <tbody>
    <tr v-for="(item,ind) in bannerList">
     <td>
        <input type="text" v-model="item.sort">
     </td>
     <td>
       {{item.id}}
     </td>
     <td>
       {{item.name}}
     </td>
     <td>
       {{item.description}}
     </td>
     <td>
       {{item.url}}
     </td>
     <td>
        <img :src="item.pic" alt="">
     </td>
     <td>
        <em v-if="item.display==1">显示</em>
        <em v-else class="visble" >隐藏</em>
     </td>
     <td>
         <span class="has-edit" @click="editeBanner(item.id)">编辑</span>
         <span @click="open2(item.id)" class="has-edit">删除</span>
         <span @click="open3(item.id,0)" class="has-edit" v-if="item.display==1">隐藏</span>
         <span @click="open3(item.id,1)" class="has-edit" v-else>显示</span>
     </td>
   </tr>

  
  </tbody>
   
</table>
    </el-tab-pane>
    <el-tab-pane label="添加Banner页面" name="second">
       <table class="addbanner">
            <tr>
              <td>
                <span class="ms-write">
                  缩略图
                </span>
              </td>
              <td>
            <el-upload

              action="http://upload-z0.qiniu.com"
              :limit = "1"
              list-type="picture-card"
              ref="upload1"
              :on-change="handlePictureCardPreview"
              :on-success="imgSuccess"
              :auto-upload="false"
              :on-remove="handleRemove"
              :data="postData"
              :file-list="addimgList"
              >
              <div class="cover-upload" v-if="imageUrl!==''"></div>
              <i class="el-icon-plus" v-if="imageUrl==''"></i>
            </el-upload>
              </td>
            </tr>
            <tr>
               <td>
                   <span class="ms-write">标题</span>
               </td>
               <td>
                 <input type="text" v-model="imgTatal" >
               </td>
            </tr>
            <tr>
              <td>
                <span class="ms-write">
                  链接
                </span>
              </td>
              <td>
                  <input type="text"  v-model="imglink">
              </td>
            </tr>
            <tr>
               <td>
                 <span>
                    描述
                 </span>
               </td>
               <td>
                  <textarea name="" id="" v-model="discriTion" cols="30" rows="10"></textarea>
               </td>
            </tr>
        
            <tr>
              <td></td>
              <td>
                <button @click="addBanner(0)" class="comf">确定</button>
                <button class="cancels">取消</button>
              </td>
            </tr>
       </table>
    </el-tab-pane>
  
  </el-tabs>
</template>

  <!--   编辑 -->
  <el-dialog
  title="编辑"
  class="edits"
  :visible.sync="dialogVisible"
  width="630px"
  :before-close="handleClose">
  <div class="edit-cont">
     <table>
         <tr>
           <td>
             <span class="ms-write">缩略图</span>
           </td>
           <td>
             <el-upload
              action="http://upload-z0.qiniu.com"
              :limit = "1"
              list-type="picture-card"
              ref="upload"
              :on-change="handlePictureCardPreview"
              :on-success="imgSuccess"
              :auto-upload="false"
              :on-remove="handleRemove"
              :data="postData"
              :file-list="imgarr"
              >
               <div class="cover-upload" v-if="imageUrl!==''"></div>
              <i class="el-icon-plus" v-if="imageUrl==''"></i>
            </el-upload>
           </td>
         </tr>
         <tr>
           <td>
            <span class="ms-write">标题</span>
          </td>
           <td>
             <input type="text" v-model="imgTatal" placeholder="首页">
           </td>
         </tr>
         <tr>
           <td>
            <span class="ms-write">链接</span>
          </td>
           <td>
             <input type="text"  v-model="imglink" placeholder="请输入链接">
           </td>
         </tr>
          <tr>
           <td>
            <span>描述</span>
          </td>
           <td>
              <textarea name="" id="" cols="30" rows="10" v-model="discriTion" placeholder="请输入描述"></textarea>
           </td>
         </tr>
          </tr>
          

     </table>
    
  </div>
  <span slot="footer" class="dialog-footer">

    <el-button type="primary" @click="addBanner(1,eid)">保存</el-button>

    <el-button @click="dialogVisible = false">取 消</el-button>
   
  </span>
</el-dialog>

    
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
     title:"",
     istitle:false,
      status:1,
      list:[],
      success:false,
      suinfo:"",
      fail:false,
      failinfo:"",
      isarr:false,
      arrtit:"",
      isajax:true,
      chose:true,
      remark:"",
      idname:"",
      activeName: 'first',
      bannerList:[],
      dialogVisible:false,
      dialogImageUrl: '',
      imageUrl:'',
      imgVisible: false,
      imgTatal:"",
      imglink:"",
      discriTion:"",
      bannerText:"",
      postData: {
       token: '',
       key:''
      },
      imageUrl:"",
      uploadCover:false,
      imgarr:[],
      eid:0,
      addimgList:[]



    }
  },
  mounted(){
    this.initBannerlist();
    console.log(this.$route.params.id)
  },
  computed:{
   
  },
  methods:{
    dalogFn(){
       setTimeout(()=>{
        this.success = false;
        this.fail = false;
      },1500)
    },
     handleClick(tab, event) {
        console.log(tab, event);
        this.imgarr=[];
        this.addimgList = [];
        this.imgTatal = '';
        this.imglink ='';
        this.discriTion='';
        this.imageUrl = '';

      },
      //初始化列表

      initBannerlist(){ 
         this.$api.post("/ad",{type_id:this.$route.params.id},su=>{
           console.log(su);
           if(su.status == 200){
              this.bannerList = su.data.list;
           }else{
              this.fail = true;
              this.failinfo = su.info;
           }
         },err=>{
           console.log(err);
         },{token:sessionStorage.getItem("token")})

      },
      //删除
       open2(val) {
        this.$confirm('确定要删除该banner？', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
            type: 'warning'
    
        }).then(() => {
           this.$api.post("/addel",{id:val},su=>{
               if(su.status ==200){
                    this.success = true;
                    this.suinfo = su.info;
                    this.initBannerlist();
               }else{
                 this.fail = true;
                 this.failinfo = su.info;
               }
               console.log(su);
           },err=>{

           },{token:sessionStorage.getItem("token")})
          
        }).catch(() => {
           
        });
      },
      //隐藏
       open3(val,dis) {
        
        this.$confirm('是否隐藏该Banner？', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        
        }).then(() => {
          this.$api.post("/adtoggle",{id:val,display:dis},su=>{
                if(su.status ==200){
                    this.success = true;
                    this.suinfo = su.info;
                    this.initBannerlist();
               }else{
                 this.fail = true;
                 this.failinfo = su.info;
               }
               console.log(su);
           },err=>{

           },{token:sessionStorage.getItem("token")})
          
        }).catch(() => {
           
        });
      },
      handleClose(){
        this.addimgList = [];
        this.imgarr=[];
        this.imgTatal = '';
        this.imglink ='';
        this.discriTion='';
        this.imageUrl = '';
        this.dialogVisible=false;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.postData.token = '';
        this.postData.key = '';
        this.imageUrl ='';
        this.uploadCover = false;
      },
      handlePictureCardPreview(file) {

       // this.uploadCover = true;
      /*  this.dialogImageUrl = file.url;
        this.imgVisible = true;*/
        var d = new Date();
        file.name = d.getTime()+file.name;
        this.getToken(file.name);
      },
      imgSuccess(res,file){
       this.imageUrl = "http://images.harfax.com/"+res.key;
      }
      ,
      getToken(imgName){
           this.$api.post("/uptoken",{key:imgName},su=>{
               console.log(su);
               if(su.status ==1 ){
               // this.uploadCover = true;
                 this.postData.token = su.data;
                 this.postData.key = imgName;
                 this.submitUpload();
               }
           },err=>{

           },{token:sessionStorage.getItem("token")})

      },
      submitUpload(){
         
        this.$refs.upload1.submit();
        this.$refs.upload.submit();

      },

      //添加banner
     addBanner(v,id){
    

       if(!this.imageUrl){
         this.alerts("请上传banner图",'')
         return
       }
       
      if(!this.imgTatal){
          this.alerts("请填写标题",'')
          return
       }
       if(!this.imglink){
          this.alerts("请填写链接",'')
          return
       }

       var dJson={
          name:this.imgTatal,
          type_id:parseInt(this.$route.params.id),
          pic:this.imageUrl,
          url:this.imglink,
          description:this.discriTion,
          id:id

       }

      var urls ='' ;
      if(v==1){
        urls = '/adedit';
      }else{
        urls = '/adadd';
      }
      
      this.$api.post(urls,dJson,su=>{
        console.log(su);
        if(su.status==200){
           this.success = true;
           this.suinfo = su.info;
           this.addimgList=[];
           this.imgTatal ='';
           this.imglink ="";
           this.discriTion = "";
           this.imageUrl = '';
            if(v==1){
               this.dialogVisible=false;
            }
            this.initBannerlist();
        }

      },err=>{
         this.fail = true;
         this.failinfo = su.info;

      },{token:sessionStorage.getItem("token")})

   


     },
     //弹框
      alerts(text,tit) {
        this.$alert(text, tit, {
          confirmButtonText: '知道了',
        });
      },
      updataOrder(){
         var arr = [];
         this.bannerList.forEach((el,ind)=>{
             arr.push({'id':el.id,'sort':el.sort});
         })

         this.$api.post('/adorder',arr,su=>{
            console.log(su)
            if(su.status==200){
                 this.success = true;
                 this.suinfo = su.info;
            }
         },err=>{
             this.fail = true;
             this.failinfo = su.info;
         },{token:sessionStorage.getItem("token")})
          


      },

      editeBanner(v){
         this.dialogVisible=true;
         this.eid = v ;
         this.imgarr = [];
         this.$api.post('/addetail',{id:v},su=>{
            console.log(su);
            if(su.status=200){
                this.imageUrl = su.data.pic;
                this.imgarr.push({'name':su.data.name,'url':su.data.pic});
                this.imgTatal =su.data.name;
                this.imglink = su.data.url;
                this.discriTion =su.data.description;

            }
         },err=>{
              this.fail = true;
              this.failinfo = su.info;
         },{token:sessionStorage.getItem("token")})

      }



 /*   confirm(){
      this.isarr = false;
      this.istitle = false;
      if(!this.isajax){
        return
      }
      
      if(!this.title){
        this.isarr = true;
        this.arrtit = "请填写Banner名称";
        this.istitle = true;
        return
      }
      let obj = {
        url:"/ad",
        data:{
          type_id:this.$route.params.id
        }
      }
       this.isajax = false;
        this.$api.post(obj.url,obj.data,su=>{
                     this.isajax = true;
                    if(su.status==200){
                      this.success = true;
                      this.suinfo = su.info;
                      setTimeout(()=>{
                        this.$router.push({path:"/banner/allban"})
                      },1000)
                    }else{
                      this.isarr = true;
                      this.arrtit = su.info;
                    }
        },err=>{
            this.isajax = true;
            this.fail = true;
            this.failinfo = su.info;
        },{token:sessionStorage.getItem("token")}) 
    }*/
  },
  watch:{
      success:'dalogFn',
      fail:'dalogFn'
  }
}
</script>


<style lang='scss' scoped>
  .add-content{
      text-align: left;
      font-size: 14px;
      li{
        margin-bottom: 30px;
        line-height: 34px;
      }
     .first{
      i{
        display: inline-block;
        width: 12px;
        height: 12px;
        color: red;
      }
      display: inline-block;
      width: 100px;
      vertical-align: top;
     }
     .last{
      display: inline-block;
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
        height: 238px;
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
      width: 505px;
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
   .chose-box{
    margin-right: 30px;
    i{
      display: inline-block;
      width: 16px;
      height: 16px;
      background: url(../../assets/images/nav-unselect.png);
      margin-right: 5px;
      position: relative;
      top:3px;
    }
    i.chose{
       background: url(../../assets/images/nav-select.png);
    }
   }

   .backlist{
    
     text-align:left;
     a{
      display:inline-block;
      width:114px;
      height:34px;
      border:1px solid #378EEF;
      color:#378EEF;
      line-height:34px;
      text-align:center;
      border-radius:2px;
      text-decoration: none;
     }
   }

   .tit{
    height:40px;
    background-color:#E4EFFC;
    border-radius:2px;
    font-size:14px;
    color:#000000;
    text-indent:27px;
    line-height:40px;
    margin-top:26px;
    text-align:left;
    margin-bottom:20px;

   }
   .update{
     width:104px;
     height:34px;
     border:1px solid #5194E1;
     background-color:#1472B1;
     color:white;
     font-size:14px;
     border-radius:2px;
    float:left;
    margin-top:15px;
    margin-bottom:30px;
    cursor:pointer;

   }
   .ban-list{
    width:100%;
    margin-top:30px;
    th{
      background-color:#EDEDED;
      font-size:14px;
      color:#1A1A1A;
      height:60px;
      line-height:60px;
    }

    tbody{
      td{
        padding:8px 0;
        text-align:center;
        vertical-align:middle;
        font-size:12px;
        .has-edit:hover{
          background-color:#1FA5FF !important;
          color:white !important;
        }
        input{
          width:58px;
          height:24px;
          border:1px solid #CCCCCC;
          text-align:center;
          font-size:12px; 
          color:#4D4D4D;
          border-radius:2px;
        }
        .visble{
          color:#CCCCCC;
          font-size:12px;
        }
        img{
          width:160px;
          height:50px;

        }
        span{
          display:inline-block;
          width:66px;
          height:24px;
          border:1px solid #1FA5FF;
          text-align:center;
          color:#1FA5FF;
          border-radius:2px;
          line-height:24px;
          cursor:pointer;
          margin-left:10px;
        
        }
      
      }
    }

   }

   .addbanner{
       td{
         padding:10px 0;
       }
   }
   .addbanner td:nth-child(1){
      width:100px;
      text-align:right;
      padding-right:20px;
      vertical-align:top;
   }
      .addbanner td:nth-child(1) span{
          position:relative;
          top:10px;
          font-size:14px;
          color:#4D4D4D;
      }

    .addbanner td:nth-child(2){
      text-align:left;
    }
    .addbanner td:nth-child(2) input{
       width:417px;
       height:32px;
       border:1px solid #CCCCCC;
       text-indent:11px;
       color:#4D4D4D;
       font-size:14px;
       border-radius:2px;
    }
     .addbanner td:nth-child(2)  textarea{
        width:397px;
        height:86px;
        border:1 solid #CCCCCC;
        padding:10px;

     }
      .addbanner td:nth-child(2) img{
        display:inline-block;
        width:156px;
        height:86px;
        border:1px solid #ccc;
      } 

      .edit-cont{
          padding-bottom: 30px;
       }
      .edit-cont td{
        padding:15px 0;
      }
      .edit-cont td:nth-child(1){
        width:78px;
        text-align:right;
        padding-right:18px;
        vertical-align:top;

      }
      .edit-cont td:nth-child(1) span{
        position:relative;
        top:7px;
      }
      .edit-cont td input{
        width:417px;
        height:32px;
        border:1px solid #CCCCCC;
        text-indent:10px;

      }
       .edit-cont td textarea{
        width:417px;
        height:86px;
        padding:10px 0;
        border:1px solid #CCCCCC;
        text-indent:10px;
        border-radius:4px;
      }
    .edit-cont td:nth-child(2){
      text-align:left;
    }
    .edit-cont td:nth-child(2) img{
        display:inline-block;
        width:156px;
        height:86px;
        border:1px solid #ccc;
    }

  .avatar {
    width: 178px;
    height: 178px;
    display: none;
  }

  .comf{
    width:104px;
    height:34px;
    background-color:#378EEF;
    color:white;
    font-size:14px;
    margin-left:87px;
    border:1px solid #5194E1;
     border-radius:4px;
     cursor:pointer;
  }
  .cancels{
    width:104px;
    height:34px;
    background-color:white;
    color:#378EEF;
    font-size:14px;
    margin-left:87px;
    border:1px solid #5194E1;
    border-radius:4px;
    cursor:pointer;
  }

  .ms-write:before{
    content:"*";
    color:#F84C4C;
    position:relative;
    left:-5px;

  }
.cover-upload{
  display:inline-block;
  width:148px;
  height:148px;
 background-color:white;
 position:relative;
 top:-1px;
 left:-1px;

}

  
</style>
<style>
    .edits .el-dialog__header{
       text-align:left !important;
    }
</style>