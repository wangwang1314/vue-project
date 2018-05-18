<template>
  <div>
    <div class="addman" @click="refresh">更新排序</div>
      <table class="list-table">
        <thead>
          <tr>
            <td>排序</td>
            <td>ID</td>
            <td>菜单名称</td>
            <td>状态</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          <template v-for ="item in list">
              <tr>
                <td class="first-level">
                  <i :class="{'chose':item.check,'opa':item.children.length<=0}" @click="choseFn(item)"></i>
                  <input type="" name="">
                </td>
                <td>{{item.id}}</td>
                <td>{{item.title}}</td>
                <td>
                  <span v-if="item.status==1" style="color:RGBA(77, 77, 77, 1)">显示</span>
                  <span v-else style="color:RGBA(204, 204, 204, 1)">隐藏</span>
                </td>
                <td width="450">  
                  <span class="forbid" >
                    <button class="edit" @click="addmenuFn(item)">添加子菜单</button>
                    <button class="edit" @click="editFn(item.id)">编辑</button>
                    <button class="edit" @click="delFn(item.id)">删除</button>
                  </span>
                </td>
              </tr>
              <template v-for="child in item.children" >
                <tr v-show="item.check">
                  <td class="first-level text-20">
                    <i :class="{'chose':child.check,'opa':child.children.length<=0}" @click="choseFn(child)"></i>
                    <input type="" name="">
                  </td>
                  <td>{{child.id}}</td>
                  <td>{{child.title}}</td>
                  <td>
                    <span v-if="child.status==1" style="color:RGBA(77, 77, 77, 1)">显示</span>
                    <span v-else style="color:RGBA(204, 204, 204, 1)">隐藏</span>
                  </td>
                  <td width="450">  
                    <span class="forbid" >
                      <button class="edit" @click="addmenuFn(child)">添加子菜单</button>
                      <button class="edit" @click="editFn(child.id)">编辑</button>
                      <button class="edit" @click="delFn(child.id)">删除</button>
                    </span>
                  </td>
                </tr>
                <template v-for="children in child.children" >
                    <tr v-show="child.check&&item.check">
                      <td class="th-level">
                        <i >|</i>
                        <input type="" name="">
                      </td>
                      <td>{{children.id}}</td>
                      <td>{{children.title}}</td>
                      <td>
                        <span v-if="children.status==1" style="color:RGBA(77, 77, 77, 1)">显示</span>
                        <span v-else style="color:RGBA(204, 204, 204, 1)">隐藏</span>
                      </td>
                      <td width="450">  
                        <span class="forbid" >
                          <button class="edit" @click="addmenuFn(children)">添加子菜单</button>
                          <button class="edit" @click="editFn(children.id)">编辑</button>
                          <button class="edit" @click="delFn(children.id)">删除</button>
                        </span>
                      </td>
                    </tr>
                </template>
              </template>
          </template>
          
         
           
        </tbody>
      </table>


    <!--添加子菜单-->
     <el-dialog
  
      :visible.sync="addmenu"
      width="630px"
      class="box-shadow"
      >
        <span slot="title" class="tit-class">
          {{title}}
        </span>
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
        <span slot="footer" class="dialog-footer">  
          <el-button type="primary"  @click="confirm">确 定</el-button>
          <el-button @click="addmenu=false">取 消</el-button>
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
      addmenu:false,
      title:"添加子菜单",
      arrtit:"",
      isarr:false,
      success:false,
      suinfo:"",
      fail:false,
      failinfo:"",
      list:[],
      childId:1,
      choseid:0,
      status:1,
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
      type:1
    }
  },
  mounted(){
    this.getList();
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
    refresh(){

    },
    addmenuFn(val){
      this.addmenu = true;
      this.title = "添加子菜单";
      //console.log(val);
      this.childId = val.id;
       this.initCheck(1);
    },
    editFn(val){
      this.addmenu = true;
      this.title = "编辑";
      //console.log(val);
      this.choseid = val;
      this.initCheck(1);
      this.getMenu(val);
    },
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
    choseFn(val){
        if(!val.check){
          this.$set(val,"check",true)
        }else{
          this.$set(val,"check",false)
        }  
    },
    confirm(){
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
     // console.log(this.status)
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
      if(this.title=="编辑"){
         obj = {
          url:"/menuedit",
          data:{
            id:this.choseid,
            parentid:this.childId,
            name:this.menu.name,
            title:this.menu.title,
            type:this.type,
            status:this.status,
            remark:this.menu.remark,
            webrouter:this.menu.webrouter
          }
        }
      }
        this.$api.post(obj.url,obj.data,su=>{

                    if(su.status==200){
                      this.success = true;
                      this.suinfo = su.info;
                      this.getList();
                      this.addmenu = false;
                    }else{
                      this.isarr = true;
                      this.arrtit = su.info;
                    }
        },err=>{
            this.fail = true;
            this.failinfo = su.info;
        },{token:sessionStorage.getItem("token")}) 
    },
    initCheck(val){
      this.isarr = false;
      //this.status = 1;
      for(let key in this.check){
        this.check[key] = false;
      }
      if(val){
         for(let key in this.menu){
          this.menu[key] = "";
        }
      }
    },
    delFn(val){
        this.$confirm('确定要删除菜单？', '', {     
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: ''
              }).then(() => {
                     this.$api.post("/menudel",{
                        id:val
                     },su=>{
                        if(su.status==200){
                        // this.setting = false;
                         this.success = true;
                         this.suinfo = su.info;
                         this.getList();
                        }
                      },err=>{
                          this.fail = true;
                          this.failinfo = su.info;
                      },{token:sessionStorage.getItem("token")})  
              }).catch(()=>{
               
              });
    },
    getMenu(val){
         this.$api.post("/menudetail",{
              id:val
           },su=>{
              if(su.status==200){
              // this.setting = false;
               // this.success = true;
               // this.suinfo = su.info;
               // this.getList();
               this.menu.name = su.data.name;
               this.menu.title = su.data.title;
               this.menu.remark = su.data.remark;
               this.menu.webrouter = su.data.webrouter;
               this.status = su.data.status;
               this.childId =  su.data.parentid;
                this.type = su.data.type;
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
   .addman{
    width:106px;
    height:36px; 
    background:RGBA(31, 165, 255, 1);
    border-radius: 2px ;
    border: none;
    color: #fff;
    line-height: 36px;
    font-size: 14px;
    margin-bottom: 30px;
   }
   .list-table{
    white-space: nowrap;
    width: 100%;
    border: 1px solid RGBA(230, 230, 230, 1);
    thead{
      height: 60px;
      line-height: 60px;
      color: RGBA(26, 26, 26, 1);
      font-size: 14px;
      background-color: RGBA(237, 237, 237, 1);
      td{
        padding: 0 5px 0 5px;
      }
    }
    tbody{
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      color: RGBA(77, 77, 77, 1);
      tr{
        border-bottom:1px solid RGBA(230, 230, 230, 1);
      }
    }
   }

    .forbid{
      button{
        border: 1px solid RGBA(204, 204, 204, 1);
        background-color: #fff;
        font-size: 12px;
        width: 78px;
        height: 26px;
        box-sizing:border-box;
        border-radius: 2px;
        color: RGBA(204, 204, 204, 1);
        outline: none;
        cursor: pointer;
        margin-right: 29px;
      }
      button:last-child{
        margin-right:0;
      }
      .setting{
        border: 1px solid RGBA(31, 165, 255, 1);
        background-color: RGBA(31, 165, 255, 1);
        color: #fff;
      }
      .edit{
        border: 1px solid RGBA(31, 165, 255, 1);
        color: RGBA(31, 165, 255, 1);
      }
   }
   .first-level{
      text-indent: 10px;
      text-align: left;
      i{
        display: inline-block;
        width: 12px;
        height: 12px;
        background: url(../../assets/images/trans.png) center no-repeat;
        background-size: 20px 20px;
        cursor: pointer;
        margin-right: 5px;
      }
      i.chose{
         transform:rotate(90deg)
      }
      i.opa{
        opacity: 0;
      }
      input{
        outline: none;
        text-indent: 5px;
        height: 26px;
        width: 60px;
        padding: 0;
        box-sizing:border-box;
        border-radius: 2px;
        border: 1px solid RGBA(204, 204, 204, 1);
      }
   }
   .text-20{
      text-indent: 30px;
   }
   .th-level{
      text-indent: 50px;
      text-align: left;
      i{
        margin-right: 3px;
      }
      color: RGBA(167, 167, 167, 1);
      input{
        outline: none;
        text-indent: 5px;
        height: 26px;
        width: 60px;
        padding: 0;
        box-sizing:border-box;
        border-radius: 2px;
        border: 1px solid RGBA(204, 204, 204, 1);
      }
   }
   .tit-class{
    float: left;
   }

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

</style>