<template> 
  <div class="navm-class">
    <div class="navm-btn" @click="goRouter()">&lt;&lt; 返回</div>
    <div class="header">主导航菜单管理</div>
       <ul class="nav-ul" >
          <li @click="nav=1" :class="{'router-link-active':nav==1}">导航菜单</li>
          <li @click="addmenuFn(0)"  :class="{'router-link-active':nav==2}">添加菜单</li>
        </ul>
        <div v-show="nav==1">
          <div class="sort" @click="sortFn">更新排序</div>

          <table class="list-table">
            <thead>
              <tr>
                <td width="100">排序</td>
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
                      <input type="" name="" v-model="item.list_order" @input="sortvalFn(item)" maxlength="3">
                    </td>
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>
                      <span v-if="item.status==1" style="color:RGBA(77, 77, 77, 1)">显示</span>
                      <span v-else style="color:RGBA(204, 204, 204, 1)">隐藏</span>
                    </td>
                    <td width="450">  
                      <span class="forbid" >
                        <button class="edit" @click="addmenuFn(item.id)">添加子菜单</button>
                        <button class="edit" @click="editFn(item.id)">编辑</button>
                        <button class="edit" @click="delFn(item.id)">删除</button>
                      </span>
                    </td>
                  </tr>
                  <template v-for="child in item.children" >
                    <tr v-show="item.check">
                      <td class="first-level text-20">
                        <i :class="{'chose':child.check,'opa':child.children.length<=0}" @click="choseFn(child)"></i>
                        <input type="" name="" v-model="child.list_order" @input="sortvalFn(child)" maxlength="3">
                      </td>
                      <td>{{child.id}}</td>
                      <td>{{child.name}}</td>
                      <td>
                        <span v-if="child.status==1" style="color:RGBA(77, 77, 77, 1)">显示</span>
                        <span v-else style="color:RGBA(204, 204, 204, 1)">隐藏</span>
                      </td>
                      <td width="450">  
                        <span class="forbid" >
                          <button class="edit" @click="addmenuFn(child.id)">添加子菜单</button>
                          <button class="edit" @click="editFn(child.id)">编辑</button>
                          <button class="edit" @click="delFn(child.id)">删除</button>
                        </span>
                      </td>
                    </tr>
                    <template v-for="children in child.children" >
                        <tr v-show="child.check&&item.check">
                          <td class="th-level">
                            <i >|</i>
                            <input type="" name=""  v-model="children.list_order" @input="sortvalFn(children)" maxlength="3">
                          </td>
                          <td>{{children.id}}</td>
                          <td>{{children.name}}</td>
                          <td>
                            <span v-if="children.status==1" style="color:RGBA(77, 77, 77, 1)">显示</span>
                            <span v-else style="color:RGBA(204, 204, 204, 1)">隐藏</span>
                          </td>
                          <td width="450">  
                            <span class="forbid" >
                              <button class="edit" @click="addmenuFn(children.id)">添加子菜单</button>
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
        </div>
        
        <div v-show="nav==2">
           <ul class="add-content">
              <li>
                <div class="first"><i>*</i>上级</div>
                <div class="last">
                  <select v-model="childId" >
                    <option :value="0" >作为一级菜单</option>
                    <template v-for="item in list">
                      <option :value="item.id" :parentid="item.parentid">{{item.name}}</option>
                      <template v-for="(child,index) in item.children">
                          <option :value="child.id" :parentid="child.parentid"  v-if="index==item.children.length-1"> └{{child.name}}</option>
                          <option :value="child.id" :parentid="child.parentid"  v-else> ├{{child.name}}</option>
                          <template v-for="(children,ind) in child.children">
                              <option :value="children.id" :parentid="children.parentid"  v-if="ind==child.children.length-1"> │ └{{children.name}}</option>
                              <option :value="children.id" :parentid="children.parentid"  v-else> │ ├{{children.name}}</option> 
                          </template> 
                      </template>
                    </template>
                  </select>
                </div>
              </li>
              <li>
                <div class="first"><i>*</i>菜单名称</div>
                <div class="last"><input v-model="menu.name" placeholder="20字以内" type="text"  maxlength="20" :class="{'border-red':check.name}"></div>
              </li>
              <li>
                <div class="first"><i>*</i>地址</div>
                <div class="last"><input v-model="menu.href" :class="{'border-red':check.href}"  type="text"   ></div>
              </li>
               <li>
                <div class="first"><i>*</i>标识</div>
                <div class="last"><input v-model="menu.controller" :class="{'border-red':check.controller}"  type="text"   ></div>
              </li>
              <li>
                <div class="first"><i>*</i>打开方式</div>
                <div class="last">
                  <select v-model="target">
                    <option value="1">当前页面打开</option>
                    <option value="0">新窗口打开</option>
                  </select>
                </div>
              </li>
              <li>
                <div class="first"><i></i>菜单排序</div>
                <div class="last"><input  v-model="menu.list_order" :class="{'border-red':check.list_order}" placeholder="20字以内" type="text"  maxlength="3" @input="inputFn(menu.list_order)"></div>
              </li>
              <li>
                <div class="first"><i>*</i>菜单状态</div>
                <div class="last">
                  <select v-model="status">
                    <option value="1">菜单（显示）</option>
                    <option value="0">菜单（隐藏）</option>
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
                <button @click="confirm">保存</button>
                <button @click="initCheck(1)">取消</button>
            </div>
        </div>
        
      
           <el-dialog
  
            :visible.sync="addmenu"
            width="630px"
            class="box-shadow"
            >
              <span slot="title" class="tit-class">
                编辑菜单
              </span>
               <ul class="add-content">
                  <li>
                    <div class="first"><i>*</i>上级</div>
                    <div class="last">
                      <select v-model="childId" >
                        <option :value="0" >作为一级菜单</option>
                        <template v-for="item in list">
                          <option :value="item.id" :parentid="item.parentid">{{item.name}}</option>
                          <template v-for="(child,index) in item.children">
                              <option :value="child.id" :parentid="child.parentid"  v-if="index==item.children.length-1"> └{{child.name}}</option>
                              <option :value="child.id" :parentid="child.parentid"  v-else> ├{{child.name}}</option>
                              <template v-for="(children,ind) in child.children">
                                  <option :value="children.id" :parentid="children.parentid"  v-if="ind==child.children.length-1"> │ └{{children.name}}</option>
                                  <option :value="children.id" :parentid="children.parentid"  v-else> │ ├{{children.name}}</option> 
                              </template> 
                          </template>
                        </template>
                      </select>
                    </div>
                  </li>
                  <li>
                    <div class="first"><i>*</i>菜单名称</div>
                    <div class="last"><input v-model="menu.name" placeholder="20字以内" type="text"  maxlength="20" :class="{'border-red':check.name}"></div>
                  </li>
                  <li>
                    <div class="first"><i>*</i>地址</div>
                    <div class="last"><input v-model="menu.href" :class="{'border-red':check.href}"  type="text"   ></div>
                  </li>
                   <li>
                    <div class="first"><i>*</i>标识</div>
                    <div class="last"><input v-model="menu.controller" :class="{'border-red':check.controller}"  type="text"   ></div>
                  </li>
                  <li>
                    <div class="first"><i>*</i>打开方式</div>
                    <div class="last">
                      <select v-model="target">
                        <option :value="1">当前页面打开</option>
                        <option :value="0">新窗口打开</option>
                      </select>
                    </div>
                  </li>
                  <li>
                    <div class="first"><i></i>菜单排序</div>
                    <div class="last"><input  v-model="menu.list_order" :class="{'border-red':check.list_order}" placeholder="20字以内" type="text"  maxlength="3" @input="inputFn(menu.list_order)"></div>
                  </li>
                  <li>
                    <div class="first"><i>*</i>菜单状态</div>
                    <div class="last">
                      <select v-model="status">
                        <option :value="1">菜单（显示）</option>
                        <option :value="0">菜单（隐藏）</option>
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
                <el-button type="primary"  @click="editconfirm">确 定</el-button>
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
        success:false,
        suinfo:"",
        fail:false,
        failinfo:"",
        id:"",
        list:[],
        nav:1,
        childId:0,
        menu:{
            name:"",
            list_order:"",
            href:"",
            controller:""
        },
        check:{
            name:"",
            list_order:"",
            href:"",
            controller:""
        },
        status:1,
        target:1,
        isarr:false,
        arrtit:"",
        addmenu:false,
        initId:""
    }
  },
  watch:{
      success:'dalogFn',
      fail:'dalogFn'
  },
  mounted(){
      this.id = this.$route.params.id;
      this.getList();
  },
  computed:{
   
  },
  methods:{
    addmenuFn(val){
      this.childId =val;
      this.nav =2;
    },
    choseFn(val){
        if(!val.check){
          this.$set(val,"check",true)
        }else{
          this.$set(val,"check",false)
        }  
    },
    getList(){
       this.$api.post("/navmenu",{
          id:this.id
        },su=>{
          if(su.status==200){
           this.list = su.data;
          }
        },err=>{
            this.fail = true;
            this.failinfo = su.info;
        },{token:sessionStorage.getItem("token")})  
    },
    inputFn(val){
        if(!val||val==0){
          return
        }
       if(parseInt(val)){
            this.menu.list_order = parseInt(val)
        }else{
          this.menu.list_order = ""
        }
        
    },
    sortvalFn(obj){
        let val = obj.list_order;
        if(!val||val==0){
          return
        }
       if(parseInt(val)){
            obj.list_order = parseInt(val)
        }else{
          obj.list_order = ""
        }
        
    },
     delFn(val){
        this.$confirm('确定要删除菜单？', '', {     
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: ''
              }).then(() => {
                     this.$api.post("/navdelmenu",{
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
    initCheck(val){
      this.isarr = false;
     
      for(let key in this.check){
        this.check[key] = false;
      }
      if(val){
         for(let key in this.menu){
          this.menu[key] = "";
        }
         this.status = 1;
         this.childId = 0;
      }
    },
    goRouter(){
      this.$router.push({path:"/navigation/allnav"})
    },
    editFn(val){
      this.addmenu = true;
      this.initId = val;
      this.$api.post("/detailmenu",{id:val},su=>{

                    if(su.status==200){
                      this.childId = su.data.parent_id;
                      this.menu.name = su.data.name;
                      this.menu.controller = su.data.controller;
                      this.menu.href = su.data.href;
                      this.menu.list_order = su.data.list_order;
                      this.status = su.data.status;
                      this.target = su.data.target;
                    }else{
                      this.isarr = true;
                      this.arrtit = su.info;
                    }
        },err=>{
            this.fail = true;
            this.failinfo = su.info;
        },{token:sessionStorage.getItem("token")}) 
    },
    //新增导航栏函数
    confirm(){
      this.initCheck();
      if(!this.menu.name){
        this.isarr = true;
        this.arrtit = "请填写菜单名称";
        this.check.name = true;
        return
      }
      if(!this.menu.href){
        this.isarr = true;
        this.arrtit = "请填写地址";
        this.check.href = true;
        return
      }
      if(!this.menu.controller){
        this.isarr = true;
        this.arrtit = "请填写标识";
        this.check.controller = true;
        return
      }
      if(!this.menu.list_order){
        this.isarr = true;
        this.arrtit = "请填写菜单排序";
        this.check.list_order = true;
        return
      }
     // console.log(this.status)
      let obj = {
        url:"/navaddmenu",
        data:{
          nav_id:this.id,
          parent_id:this.childId,
          name:this.menu.name,
          status:this.status?1:0,
          list_order:this.menu.list_order,
          target:this.target?1:0,
          href:this.menu.href,
          controller:this.menu.controller

        }
      }
        this.$api.post(obj.url,obj.data,su=>{

                    if(su.status==200){
                      this.success = true;
                      this.suinfo = su.info;
                      this.nav = 1;
                      this.initCheck(1);
                      this.getList();
                    }else{
                      this.isarr = true;
                      this.arrtit = su.info;
                    }
        },err=>{
            this.fail = true;
            this.failinfo = su.info;
        },{token:sessionStorage.getItem("token")}) 
    },
    //编辑导航栏函数
    dalogFn(){
       setTimeout(()=>{
        this.success = false;
        this.fail = false;
      },1500)
    },
    editconfirm(){

       this.initCheck();
      if(!this.menu.name){
        this.isarr = true;
        this.arrtit = "请填写菜单名称";
        this.check.name = true;
        return
      }
      if(!this.menu.href){
        this.isarr = true;
        this.arrtit = "请填写地址";
        this.check.href = true;
        return
      }
      if(!this.menu.controller){
        this.isarr = true;
        this.arrtit = "请填写标识";
        this.check.controller = true;
        return
      }
      if(!this.menu.list_order){
        this.isarr = true;
        this.arrtit = "请填写菜单排序";
        this.check.list_order = true;
        return
      }
     // console.log(this.status)
      let obj = {
        url:"/naveditmenu",
        data:{
          id:this.initId,
          nav_id:this.id,
          parent_id:this.childId,
          name:this.menu.name,
          status:this.status?1:0,
          list_order:this.menu.list_order,
          target:this.target?1:0,
          href:this.menu.href,
          controller:this.menu.controller

        }
      }
        this.$api.post(obj.url,obj.data,su=>{

                    if(su.status==200){
                      this.success = true;
                      this.suinfo = su.info;
                      this.nav = 1;
                      this.initCheck(1);
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
    //排序函数
    sortFn(){
        let data = {order_list:[]};
        // this.list.forEach((val,ind)=>{
        //   data.order_list.push();
        // })
        console.log(this.list)
        for(let val of this.list){
          if(val.list_order===""){
              this.fail = true;
              this.failinfo = "请填写排序";
              return
          }else{
            data.order_list.push({
              id:val.id,
              list_order:val.list_order
            });
          }
        }
        this.$api.post("/ordermenu",data,su=>{

                    if(su.status==200){
                      this.success = true;
                      this.suinfo = su.info;
                      this.getList();
                    }else{
                      this.isarr = true;
                      this.arrtit = su.info;
                    }
        },err=>{
            this.fail = true;
            this.failinfo = su.info;
        },{token:sessionStorage.getItem("token")}) 
    }


  }
}
</script>


<style lang='scss' scoped>
  .navm-class{
    text-align: left;
  }
  .navm-btn{
    width:116px;
    height:36px; 
    border-radius: 2px;
    color:RGBA(55, 142, 239, 1);
    font-size: 14px;
    border:1px solid RGBA(55, 142, 239, 1);
    line-height: 36px;
    text-align: center; 
  }
  .header{
    height:40px; 
    background:rgba(228,239,252,1);
    border-radius: 2px; 
    text-indent: 26px;
    font-size: 14px;
    color: #000;
    line-height: 40px;
    margin: 26px 0 30px 0;
  }
    .nav-ul{
        height: 36px;
        border-bottom:2px solid #e6e6e6;
    }
    .nav-ul li{
        width: 120px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        float: left;
        font-size: 14px;
        color: #4D4D4D;
        cursor: pointer;
    }
    .nav-ul li.router-link-active{
        border-bottom:2px solid #378EEF;
        color: #378EEF;
    }
    .sort{
      width: 106px;
      height: 36px;
      background-color: RGBA(55, 142, 239, 1);
      color: #fff;
      margin: 30px 0 30px 0;
      font-size: 14px;
      line-height: 36px;
      text-align: center;
    }


  .list-table{
    white-space: nowrap;
    width: 100%;
    border: 1px solid RGBA(230, 230, 230, 1);
    text-align: center;
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

   .add-content{
      text-align: left;
      margin: 30px;
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
     button{
      width: 106px;
      height: 36px;
      padding: 0;
      outline: none;
      background: #fff;
      color:  RGBA(55, 142, 239, 1);
      border:1px solid RGBA(55, 142, 239, 1);
      margin-left: 50px;
      cursor: pointer;
     }
     button:first-child{
      background: RGBA(55, 142, 239, 1);
      color: #fff;
      border:1px solid RGBA(55, 142, 239, 1);
      margin-left: 200px;
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
</style>