<template>
  <div>
      <ul class="add-content">
          <li>
            <div class="first"><i>*</i>上级</div>
            <div class="last">
              <select v-model="childId" >
                <option :value="0" >作为一级菜单</option>
                <template v-for="item in list">
                  <option :value="item.id" :parentid="item.parentid">{{item.title}}</option>
                  <template v-for="(child,index) in item.children">
                      <option :value="child.id" :parentid="child.parentid"  v-if="index==item.children.length-1"> └{{child.title}}</option>
                      <option :value="child.id" :parentid="child.parentid"  v-else> ├{{child.title}}</option>
                      <template v-for="(children,ind) in child.children">
                          <option :value="children.id" :parentid="children.parentid"  v-if="ind==child.children.length-1"> │ └{{children.title}}</option>
                          <option :value="children.id" :parentid="children.parentid"  v-else> │ ├{{children.title}}</option> 
                      </template> 
                  </template>
                </template>
              </select>
            </div>
          </li>
          <li>
            <div class="first"><i>*</i>菜单名称</div>
            <div class="last"><input v-model="menu.title" placeholder="20字以内" type="text"  maxlength="20" :class="{'border-red':check.title}"></div>
          </li>
          <li>
            <div class="first"><i>*</i>菜单路由</div>
            <div class="last"><input v-model="menu.webrouter" :class="{'border-red':check.webrouter}"  type="text"   ></div>
          </li>
          <li>
            <div class="first"><i>*</i>菜单标识</div>
            <div class="last"><input v-model="menu.name" :class="{'border-red':check.name}"   type="text"   ></div>
          </li>
          <li>
            <div class="first"><i></i>菜单描述</div>
            <div class="last"><input  v-model="menu.remark" :class="{'border-red':check.remark}" placeholder="20字以内" type="text"  maxlength="20"></div>
          </li>
          <li>
            <div class="first"><i>*</i>菜单类型</div>
            <div class="last">
              <select v-model="type">
                <option value="1">菜单</option>
                <option value="2">操作</option>
              </select>
            </div>
          </li>
          <li>
            <div class="first"><i>*</i>菜单状态</div>
            <div class="last">
              <select v-model="status">
                <option value="1">菜单（启用）</option>
                <option value="0">菜单（禁用）</option>
              </select>
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
          <button @click="confirm()">添加</button>
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
        title:"",
        webrouter:"",
        remark:"",
        name:""
     },
      check:{
        title:false,
        webrouter:false,
        remark:false,
        name:false
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
      type:1
    }
  },
  mounted(){
    this.getList();
  },
  computed:{
   
  },
  methods:{
     getList(){
       this.$api.get("/menu",{
          
        },su=>{
          if(su.status==200){
           this.list = su.data;
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
      this.status = 1;
      for(let key in this.check){
        this.check[key] = false;
      }
    },
    confirm(){
      if(!this.isajax){
        return
      }
      
     this.initCheck();
      if(!this.menu.title){
        this.isarr = true;
        this.arrtit = "请填写菜单名称";
        this.check.title = true;
        return
      }
      if(!this.menu.webrouter){
        this.isarr = true;
        this.arrtit = "请填写菜单路由";
        this.check.webrouter = true;
        return
      }
      if(!this.menu.name){
        this.isarr = true;
        this.arrtit = "请填写菜单标识";
        this.check.name = true;
        return
      }
      let obj = {
        url:"/Menuadd",
        data:{
          parentid:this.childId,
          name:this.menu.name,
          title:this.menu.title,
          type:this.type,
          status:this.status,
          remark:this.menu.remark,
          webrouter:this.menu.webrouter
        }
      }
       this.isajax = false;
        this.$api.post(obj.url,obj.data,su=>{
                     this.isajax = true;
                    if(su.status==200){
                      this.success = true;
                      this.suinfo = su.info;
                      this.getList();
                      this.addmenu = false;
                      setTimeout(()=>{
                        this.$router.push({path:"/menu/set"})
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
      width: 80px;
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
</style>