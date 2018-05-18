<template>
  <div>
      <ul class="add-content">
          <li>
            <div class="first"><i>*</i>名称</div>
            <div class="last"><input v-model="title" placeholder="20字以内" type="text"  maxlength="20" :class="{'border-red':istitle}"></div>
          </li>
          <li>
            <div class="first"><i></i>备注</div>
            <div class="last">
              <textarea v-model="remark">
              
              </textarea>
            </div>
          </li>
          <li>
            <div class="first"><i></i>是否主菜单</div>
            <div class="last">
              <span class="chose-box" @click="chose=true"><i :class="{'chose':chose}"></i>是</span>
              <span class="chose-box" @click="chose=false"><i :class="{'chose':!chose}"></i>否</span>
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
      remark:""
    }
  },
  mounted(){

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
    confirm(){
      this.isarr = false;
      this.istitle = false;
      if(!this.isajax){
        return
      }
      
      if(!this.title){
        this.isarr = true;
        this.arrtit = "请填写导航名称";
        this.istitle = true;
        return
      }
      let obj = {
        url:"/navadd",
        data:{
          is_main:this.chose?1:0,
          name:this.title,
          remark:this.remark
        }
      }
       this.isajax = false;
        this.$api.post(obj.url,obj.data,su=>{
                     this.isajax = true;
                    if(su.status==200){
                      this.success = true;
                      this.suinfo = su.info;
                      setTimeout(()=>{
                        this.$router.push({path:"/navigation/allnav"})
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
</style>