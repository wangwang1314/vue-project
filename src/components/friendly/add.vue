<template>
    <div class="edit-cont">
     <table>
         <tr>
           <td>
            <span class="ms-write"><i style="color:red;margin-right:5px;">*</i>标题</span>
          </td>
           <td>
             <input type="text" v-model="name" placeholder="标题">
           </td>
         </tr>
         <tr>
           <td>
            <span class="ms-write"><i style="color:red;margin-right:5px;">*</i>链接</span>
          </td>
           <td>
             <input type="text"  v-model="url" placeholder="请输入链接">
           </td>
         </tr>
     </table>
     <div class="con-box">
       <button @click="confirm">确定</button>
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
      isajax:true,
      name:"",
      url:"",
      success:false,
      suinfo:"",
      fail:false,
      failinfo:"",
    }
  },
  methods:{
    dalogFn(){
       setTimeout(()=>{
          this.success = false;
          this.fail = false;
        },1500)
    },
    confirm(){
      if(!this.isajax){
        return
      }
      if(!this.name){
        this.$alert("请填写标题","", {
          confirmButtonText: '知道了',
        });
        return
      }
      if(!this.url){
        this.$alert("请填写链接地址","", {
          confirmButtonText: '知道了',
        });
        return
      }
      let pat = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
      if(!pat.test(this.url)){
        this.$alert("链接地址格式错误","", {
          confirmButtonText: '知道了',
        });
        return
      }
      this.isajax = false;
      this.$api.post('/friendLinkadd',{
        name:this.name,
        url:this.url
      },su=>{
            //console.log(su)
            if(su.status==200){
                 this.success = true;
                 this.suinfo = su.info;
                 this.isajax = true;
                 setTimeout(()=>{
                    this.$router.push({path:"/friendly/list"})
                 },1500)
                 
            }
         },err=>{
             this.fail = true;
             this.failinfo = su.info;
             this.isajax = true;
      },{token:sessionStorage.getItem("token")})
    }
  },
  mounted(){
   // console.log(this.$route.path.split("/"))
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
    .con-box{
      width: 515px;
      text-align: center;
      margin-top: 30px;
      button{
        width:130px;
        height:40px; 
        background:rgba(55,142,239,1);
        border-radius: 2px;
        border:none; 
        outline: none;
        color: #fff;
      }
    }
</style>