<template>
  <div>
       <button class="update" @click="updataOrder" :disabled="bannerList.length==0">更新排序</button>
       <table class="ban-list">
        <thead>
          <tr>
           <th>排序</th>
           <th>ID</th>
           <th>菜单名称</th>
           <th>链接地址</th>
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
         {{item.url}}
       </td>
      <td>
        <em v-if="item.disable==1">显示</em>
        <em v-else class="visble" >隐藏</em>
      </td>
      <td>
       <span @click="open3(item.id,0)" class="has-edit" v-if="item.disable==1">隐藏</span>
       <span @click="open3(item.id,1)" class="has-edit" v-else>显示</span>
       <span class="has-edit" @click="editeBanner(item.id)">编辑</span>
       <span @click="open2(item.id)" class="has-edit">删除</span>
     </td>
    </tr>


    </tbody>

    </table>
   

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
            <span class="ms-write">标题</span>
          </td>
           <td>
             <input type="text" v-model="name" placeholder="标题">
           </td>
         </tr>
         <tr>
           <td>
            <span class="ms-write">链接</span>
          </td>
           <td>
             <input type="text"  v-model="url" placeholder="请输入链接">
           </td>
         </tr>
     </table>
    
  </div>
  <span slot="footer" class="dialog-footer">

    <el-button type="primary" @click="addBanner()">保存</el-button>

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
      addimgList:[],
      name:"",
      url:""



    }
  },
  mounted(){
    this.initBannerlist();
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
         this.$api.post("/friendLink",{},su=>{
           //console.log(su);
           if(su.status == 200){
              this.bannerList = su.data;
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
        this.$confirm('确定要删除该友情链接？', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
            type: 'warning'
    
        }).then(() => {
           this.$api.post("/friendLinkdel",{id:val},su=>{
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
        let str = "";
        if(dis==1){
          str = "显示"
        }else{
          str = "隐藏"
        }
        this.$confirm('是否'+str+'友情链接？', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        
        }).then(() => {
          this.$api.post("/friendLinktoggle",{id:val,disable:dis},su=>{
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

         this.$api.post('/friendLinkorder',arr,su=>{
            //console.log(su)
            if(su.status==200){
                 this.success = true;
                 this.suinfo = su.info;
                 this.initBannerlist();
            }
         },err=>{
             this.fail = true;
             this.failinfo = su.info;
         },{token:sessionStorage.getItem("token")})
          


      },
      addBanner(){
          if(!this.name){
             this.alerts("请填写名称",'')
             return
           }     
          if(!this.url){
              this.alerts("请填写友情链接地址",'')
              return
           }
            this.$api.post('/friendLinkedit',{
              id:this.id,
              name:this.name,
              url:this.url
            },su=>{
            //console.log(su);
            if(su.status==200){
              this.dialogVisible = false;
              this.initBannerlist();
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
         this.$api.post('/friendLinkdetail',{id:v},su=>{
            //console.log(su);
            if(su.status==200){
               this.id = su.data.id;
               this.name = su.data.name;
               this.url = su.data.url;
            }
         },err=>{
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