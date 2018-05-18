<template>
     <div id="news">
         <div class="cont-tb">
             <table>
                 <tr>
                    <td><span>发布区域：</span></td>
                    <td>
                      <el-select  placeholder="请选择" v-model="prov"    @change="getarea(1,prov)">
                        <el-option
                      
                          v-for="item in province"
                          :key="item.area_id"
                          :label="item.title"
                          :value="item.area_id">
                        </el-option>
                      </el-select>
                       <el-select v-if="city.length>0" v-model="citys" @change="getarea(2,citys)"  placeholder="请选择">
                        <el-option
                          v-for="item in city"
                          :key="item.area_id"
                          :label="item.title"
                          :value="item.area_id">
                        </el-option>
                      </el-select>
                       <el-select  v-model="areas" v-if="area.length>0" placeholder="请选择">
                        <el-option
                          v-for="item in area"
                          :key="item.area_id"
                          :label="item.title"
                          :value="item.area_id">
                        </el-option>
                      </el-select>
                      
                    </td>
                 </tr>
                   <tr>
                    <td><span>资讯类型：</span></td>
                    <td>
                        <el-select v-model="typeitem" placeholder="请选择">
                        <el-option
                          v-for="item in newtype"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </td>
                 </tr>
                   <tr>
                    <td><span>资讯标题：</span></td>
                    <td>
                     <el-input v-model="newtit" maxlength="50" placeholder="请输入内容"></el-input>
                    </td>
                 </tr>
                   <tr>
                    <td><span>作者：</span></td>
                    <td>
                       <el-input  v-model="autorName" maxlength="30" placeholder="请输入内容"></el-input>
                    </td>
                 </tr>
                   <tr>
                    <td style="vertical-align:top"><span>描述：</span></td>
                    <td>
                        <textarea maxlength="100" v-model="discritionTxt" placeholder="最多100个字" name="description" id="discrition" cols="30" rows="10"></textarea>
                    </td>
                 </tr>
                   <tr>
                    <td style="vertical-align:top"> <span>缩略图片：</span>
                      <br/><br/>
                      <span>(254*162)</span>
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
                    <td><span>资讯内容：</span></td>
                    <td>
                           <div class="components-container">
                            <div class="editor-container">
                              <UE v-if="mou" :defaultMsg=defaultMsg :config=config :datevalue=contenttext ref="ue" ></UE>
                            </div>
                          </div>
                      
                    </td>
                 </tr>
                  <tr>
                    <td> </td>
                    <td>
                       <el-button type="primary" @click="comfirmRelease(1)" v-show="sta==1">存为草稿</el-button>   
                       <el-button type="primary" @click="comfirmRelease(2)">提交审核</el-button>   
                    </td>
                 </tr>
             </table>
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
import UE from '../ue/ue.vue';

export default {
  components: {UE},
  data () {
    return {
      defaultMsg: '',
      postData: {
       token: '',
       key:''
      },
      imageUrl:"",
      uploadCover:false,
      imgarr:[],
      eid:0,
      id:0,
      sta:0,
      success:false,
      suinfo:"",
      fail:false,
      failinfo:"",
      addimgList:[],
       contenttext:"",
        config: {
          initialFrameWidth: 1000,
          initialFrameHeight: 350,
          scaleEnabled:true,
          autoHeightEnabled: false
        },
    
        province: [],
        city:[],
        area:[],
        newtit:'',
        prov:"",
        citys:"",
        areas:"",
        newtype:[],
        typeitem:"",
        autorName:"",
        discritionTxt:"",
        mou:false
    }
   
  },
  mounted(){
    this.id = this.$route.params.id;
    this.sta = this.$route.params.sta;
    this.getprovince();
    this.newtypeFn();
    this.getList();
   
   
  },
  destroyed(){

  },
  methods:{
    //获取富文本信息
    getUEContent() {
        console.log(this.$refs.ue.getUEContent());
      /* this.contenttext = this.$refs.ue.getUEContent();
        console.log(contenttext)*/
       },
    //获取省份
    getprovince(){
      this.city = [];
      this.area = [];
      this.prov = "";
      this.citys= "";
      this.areas ="";
      this.$api.get('/getprovince',{},su=>{
         console.log(su);
         if(su.status==200){
            this.province = su.data;
         }
      },err=>{
           
      },{token:sessionStorage.getItem("token")})
    },
    //获取其它区域
    getarea(type,v){
      if(type==1){
          this.city = [];
          this.area = [];
          this.citys= "";
          this.areas ="";
      }else if(type==2){
           this.area = [];
           this.areas ="";
      }
    
       this.$api.post("/getareas",{area_id:v},su=>{
        if(su.status==200){
           if(type==1){
             this.city = su.data;
           }else{
            this.area = su.data;
        
           }
        }

       },err=>{

       },{token:sessionStorage.getItem("token")})
    },  
    newtypeFn(){
      this.$api.post("/newstype",{},su=>{
             if(su.status==200){
              console.log(su.data);
              this.newtype = su.data;

             }
      },err=>{

      },{token:sessionStorage.getItem("token")})
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
        this.postData.token = '';
        this.postData.key = '';
        this.imageUrl ='';
        this.uploadCover = false;
      },
     handleClick(tab, event) {
        console.log(tab, event);
        this.imgarr=[];
        this.addimgList = [];
        this.imageUrl = '';

      },
    handlePictureCardPreview(file) {
      var d = new Date();
      file.name = d.getTime()+file.name;
      this.getToken(file.name);
      },
      imgSuccess(res,file){
       this.imageUrl = "http://images.harfax.com/"+res.key;
      } ,
      getToken(imgName){
           this.$api.post("/uptoken",{key:imgName},su=>{
               console.log(su);
               if(su.status ==1 ){
                 this.postData.token = su.data;
                 this.postData.key = imgName;
                 this.submitUpload();
               }
           },err=>{

           },{token:sessionStorage.getItem("token")})

      },
      submitUpload(){ 
        this.$refs.upload.submit();
      },
      //获取新闻详情
        getList(){
          this.$api.post("/newdetail",{
           id:this.id
          },su=>{
            if(su.status==200){
              console.log(su);
                this.prov = su.data.province;
                this.getarea(1,this.prov);
                this.citys = su.data.city;
                this.getarea(2,this.citys);
              
                this.areas = su.data.area; 
              
             
                this.typeitem = su.data.typeid;
                this.newtit = su.data.title;
                this.autorName =  su.data.author;
                this.discritionTxt = su.data.description;
                if(su.data.img){
                    this.imgarr.push({'name':'','url':su.data.img});
                    this.imageUrl = su.data.img;
                }else{
                     this.imgarr = [];
                     this.imageUrl = "";
                }
               
                this.contenttext = su.data.content;
                this.mou = true;
          

            }else{
              this.fail = true;
              this.failinfo = su.info;
            }
          },err=>{
              this.fail = true;
              this.failinfo = err.info;
          },{token:sessionStorage.getItem("token")})
        },
       
      // 确认发布
      comfirmRelease(v){
        //提交审核
       if(v==2){

        if(!this.areas){
           this.alerts("请选择发布区域",'');
           return
        }
        if(!this.typeitem){
            this.alerts("请选择资讯类型",'');
            return
        }
        if(!this.newtit){
            this.alerts("请输入资讯标题",'');
            return
        }
        if(!this.autorName){
           this.alerts("请输入作者名称",'');
           return
        }

        if(!this.discritionTxt){
           this.alerts("请输入文章描述",'');
           return
        }

       if(!this.imageUrl){
         this.alerts("请上传缩略图",'')
         return
       }

       
       this.contenttext = this.$refs.ue.getUEContent();
       if(!this.contenttext){
         this.alerts("文章内容不能为空",'')
         return
       }
      }
      this.contenttext = this.$refs.ue.getUEContent();
      
       
       this.$api.post("/newedit",{
         id:this.id,
         province:this.prov,
         city:this.citys,
         area:this.areas,
         typeid:this.typeitem,
         title:this.newtit,
         author:this.autorName,
         content:this.contenttext,
         status:v,
         description:this.discritionTxt,
         img:this.imageUrl
       },su=>{
           console.log(su);
           if(su.status == 200){
           if(v==2){
               this.suinfo = su.info;
           }else{
               this.suinfo = "保存成功";
           }
              setTimeout(()=>{
                   this.$router.push({path:"/news/list"});
              },1000)
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
    //弹框
    alerts(text,tit) {
        this.$alert(text, tit, {
          confirmButtonText: '知道了',
        });
      },

  },
  computed:{
   
  },
   watch:{
      success:'dalogFn',
      fail:'dalogFn'
  }
}
</script>

<style lang='scss' scoped>

  .cont-tb{
    padding:20px;
  }
  .cont-tb td{
    padding: 10px 0;
  }
  .cont-tb td:nth-child(1){
    width: 100px;
    text-align: right;
    padding-right: 10px;
    font-size:16px;
    background-color:#FAFAFA

  }
   .cont-tb td:nth-child(1) span{
      font-size:14px !important;
  }
   .cont-tb td:nth-child(2){
    text-align:left;
    padding-left:10px;
   }

  .cont-tb .el-input{
     width:312px;
  }

   .info{
    border-radius: 10px;
    line-height: 20px;
    padding: 10px;
    margin: 10px;
    background-color: #ffffff;
  }
  .components-container{
    width:100%
  }
  #discrition{
    display: inline-block;
    width:600px;
    height:150px;
    border:1px solid #ccc;
    padding:10px;
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
