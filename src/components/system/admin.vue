<template>
   <div class="view-content">
      <div class="header" >
        <span>用户名：</span>
        <input type="" name="" v-model="name" style="width:198px;">
        <span style="margin-left:80px;">邮箱：</span>
        <input type="" name="" v-model="titemail" style="width:286px;">
        <button class="search-btn" @click="getList">搜索</button>
        <button class="add-adm" @click="addFn">添加管理员</button>
      </div>
      <table class="list-table">
        <thead>
          <tr>
            <td>ID</td>
            <td>用户名</td>
            <td>省级类别</td>
            <td>运动种类</td>
            <td>邮箱</td>
            <td>状态</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>

          <tr v-for="item in tablist">
            <td>{{item.id}}</td>
            <td>{{item.nickname}}</td>
            <td>{{item.title}}</td>
            <td>{{item.category}}</td>
            <td>{{item.email}}</td>
            <td>
              <span class="open" v-if="item.islock==0">启用</span>
              <span class="close" v-else>禁用</span>
            </td>
            <td width="450">
              <span class="forbid" v-if="item.id!=1">
                <button class="setting" @click="editFn(item.id)">编辑</button>
                <button class="edit" @click="lock(item.id)" v-if="item.islock==0">拉黑</button>
                <button  v-else>拉黑</button>
                <button class="edit" @click="reset(item.id)">重置密码</button>
              </span>
              <span class="forbid" v-else>
                <button >编辑</button>
                <button >拉黑</button>
                <button >重置密码</button>
              </span>
            </td>
          </tr>
       
        </tbody>
      </table>


      <el-dialog
  
      :visible.sync="addman"
      width="630px"
      class="box-shadow"
      >
        <span slot="title" class="tit-class">
          {{title}}
        </span>
        <ul class="add-content">
          <li>
            <div class="first"><i>*</i>用户名</div>
            <div class="last"><input placeholder="50字以内" type="text" :class="{'border-red':check.manName}"  maxlength="50" v-model="manName"></div>
          </li>
          <li>
            <div class="first"><i>*</i>账号</div>
            <div class="last"><input :class="{'border-red':check.phone}"  type="text"  maxlength="11" v-model="phone"></div>
          </li>
          <li v-if="title!=='编辑'">
            <div class="first"><i>*</i>密码</div>
            <div class="last"><input  type="password"   :class="{'border-red':check.pass}"  v-model="pass"></div>
          </li>
          <li>
            <div class="first"><i>*</i>邮箱</div>
            <div class="last"><input  type="text"  maxlength="50" :class="{'border-red':check.email}" v-model="email"></div>
          </li>
          <li>
            <div class="first"><i>*</i>运动种类</div>
            <div class="last">
              <select v-model="movementid" :disabled="category">
                <template v-for="item in movement">
                  <option :value="item.typeid">{{item.typename}}</option>
                </template>
              </select>
            </div>
          </li>
          <li>
            <div class="first"><i>*</i>省级列表</div>
            <div class="last">
              <select v-model="provinceid" :disabled="prodis">
                <template v-for="item in province">
                  <option :value="item.area_id">{{item.title}}</option>
                </template>
              </select>
            </div>
          </li>
          <li>
            <div class="first"><i></i>角色</div>
            <div class="last list-content scrollbar">
              <div class="man-div" v-for="item in list" @click="choseFn(item.id)">
                <i :class="{'chose':choseArr.indexOf(item.id)!=-1}"></i>
                {{item.title}}
              </div>
       
            
            </div>
          </li>
        </ul>
        <div style="height:40px;">
          <el-alert
                 :title="arrtit"
                 type="warning"
                 show-icon v-show="isarr" >
          </el-alert> 
        </div>  
        <span slot="footer" class="dialog-footer">  
          <el-button type="primary" @click="confirmFn" >确 定</el-button>
          <el-button @click="cancelFn">取 消</el-button>
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
    <div style="margin-top:40px;" class="block" >
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="page"
            :page-sizes="[20,50,100]"
            :page-size="20"
            layout="prev, pager, next, sizes"
            :total="total">
          </el-pagination>
    </div>
   </div>
</template>
<script>
import md5 from 'js-md5';
export default {
  data () {
    return {
        total:0,
        addman:false,
        title:"",
        ischose:true,
        setting:false,
        manName:"",
        manDes:"",
        isarr:false,
        email:"",
        arrtit:"",
        phone:"",
        pass:"",
        success:false,
        suinfo:"",
        fail:false,
        failinfo:"",
        list:[],
        choseArr:[],
        check:{
          manName:false,
          phone:false,
          pass:false,
          email:false
        },
        page:1,
        pagesize:20,
        name:"",
        titemail:"",
        tablist:[],
        choseid:"",
        movement:[],
        province:[],
        provinceid:0,
        movementid:0,
        prodis:false,
        category:false

    }
  },
  mounted(){
    this.getList();

    this.jugeFn()
  },
  computed:{
   
  },
  watch:{
      success:'dalogFn',
      fail:'dalogFn'
  },
  methods:{
    handleSizeChange(val){
      this.pagesize = val;
      this.getList();
    },
    handleCurrentChange(val){
      this.page = val;
      this.getList();
    },
    lock(val){
        this.$confirm('确定要拉黑该用户？', '', {     
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: ''
              }).then(() => {
                this.$api.post("/lock",{
                 id:val
                },su=>{
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
              }).catch(()=>{
               
              });
    },
    reset(val){
        this.$confirm('确定要重置密码？', '', {     
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: ''
              }).then(() => {
                this.$api.post("/resetpword",{
                 id:val
                },su=>{

                  if(su.status==200){
                    this.success = true;
                    this.suinfo = su.info;
                  }else{
                    this.isarr = true;
                    this.arrtit = su.info;
                  }
      },err=>{
          this.fail = true;
          this.failinfo = su.info;
      },{token:sessionStorage.getItem("token")}) 
              }).catch(()=>{
               
              });
    },
    delFn(val){
        this.$confirm('确定要删除该角色？', '', {     
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: ''
              }).then(() => {
                
              }).catch(()=>{
               
              });
    },
    addFn(){
      this.title = "添加管理员";
      this.addman = true;
      this.initCheck(1);
      this.getUseList();
      this.getprovince();
      this.getmovement();
    },
    editconfirmFn(){

    },
    cancelFn(){
      this.addman = false;
      this.setting = false;
    },
    editFn(val){
      this.choseid = val;
      this.title = "编辑";
      this.addman = true;
      this.initCheck();
      this.getDetail();
      this.getUseList();
      this.getprovince();
      this.getmovement();
    },
    setFn(){
      this.setting = true;
    },
    confirmFn(){
      this.initCheck();
      if(!this.manName){
        this.isarr = true;
        this.arrtit = "请输入用户名";
        this.check.manName = true;
        return
      }
      if(!this.phone){
        this.isarr = true;
        this.arrtit = "请输入账号";
        this.check.phone = true;
        return
      }
      let reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/;
      if(!reg.test(this.phone)){
        this.isarr = true;
        this.arrtit ='请输入正确的手机号';
        this.check.phone = true;
        return;
      }
   
      if(this.title!=="编辑"&&!this.pass){
        this.isarr = true;
        this.arrtit = "请输入密码";
        this.check.pass = true;
        return
      }
      let reg2 =/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
   
       if(!this.email){
          this.isarr = true;
          this.arrtit = "请输入邮箱";
          this.check.email = true;
          return
        }
        if(!reg2.test(this.email)){
          this.isarr = true;
          this.arrtit = "请输入正确的邮箱";
          this.check.email = true;
          return
        }
        let obj;
        if(this.title!=="编辑"){
          obj = {
            url:"/manageadd",
            data:{
                account:this.phone,
                password:md5(this.pass),
                nickname:this.manName,
                email:this.email,
                group_id:this.choseArr.toString(),
                type:this.provinceid,
                category:this.movementid
            }
          }
        }else{
          obj = {
            url:"/manageedit",
            data:{
                id:this.choseid,
                account:this.phone,
                nickname:this.manName,
                email:this.email,
                group_id:this.choseArr.toString(),
                type:this.provinceid,
                category:this.movementid
            }
          }
        }
      this.$api.post(obj.url,obj.data,su=>{

        if(su.status==200){
          this.addman = false;
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

    },
    initCheck(val){
      this.isarr = false;
      for(let key in this.check){
        this.check[key] = false;
      }
      if(val){
        this.manName = "";
        this.phone = "";
        this.pass = "";
        this.email = "";
        this.choseArr = [];
        //this.movementid = 0;
        if(sessionStorage.getItem("type_pro")){
          this.provinceid = sessionStorage.getItem("type_pro");
        }else{
          this.provinceid = 0;
        }

        if(sessionStorage.getItem("category")){
          this.movementid = sessionStorage.getItem("category");
        }else{
          this.movementid = 0;
        }
        
      }
    },
    getUseList(){
        this.$api.post("/group",{
          page:0
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
    choseFn(val){
      if(this.choseArr.indexOf(val)==-1){
        this.choseArr.push(val);
      }else{
        let index = this.choseArr.indexOf(val);
        this.choseArr.splice(index,1);
      }
      return false;
    },
    getList(){
      this.$api.post("/manageindex",{
        page:this.page,
        pagesize:this.pagesize,
        name:this.name,
        email:this.titemail
      },su=>{
        if(su.status==200){
          this.tablist = su.data.list;
          this.total =su.data.total;
        }else{
          this.isarr = true;
          this.arrtit = su.info;
        }
      },err=>{
          this.fail = true;
          this.failinfo = su.info;
      },{token:sessionStorage.getItem("token")})
    },
    getDetail(){
       this.$api.post("/managedetail",{
        id:this.choseid
      },su=>{
        if(su.status==200){
          this.manName = su.data.nickname;
          this.email = su.data.email;
          this.phone = su.data.account;
          this.choseArr = su.data.group;
          this.provinceid = su.data.type;
          this.movementid = su.data.category;
        }
      },err=>{
          this.fail = true;
          this.failinfo = su.info;
      },{token:sessionStorage.getItem("token")})
    },
    getprovince(){
       this.$api.get("/getprovince",{
    
      },su=>{
        if(su.status==200){
          this.province =  su.data;
        }
      },err=>{
          this.fail = true;
          this.failinfo = su.info;
      },{token:sessionStorage.getItem("token")})
    },
    getmovement(){
       this.$api.get("/getmovement",{
    
      },su=>{
        if(su.status==200){
          this.movement =  su.data;
        }
      },err=>{
          this.fail = true;
          this.failinfo = su.info;
      },{token:sessionStorage.getItem("token")})
    },
    jugeFn(){
      let pro = sessionStorage.getItem("type_pro");
      if(pro!=0){
          this.prodis = true;
          this.provinceid = pro;
      }
      let can = sessionStorage.getItem("category");
      if(can!=0){
          this.category = true;
          this.movementid = pro;
      }
    }
  }
}
</script>


<style lang='scss' scoped>
   .view-content{
     padding:29px 48px 32px 32px;
   }
   .addman{
    width:116px;
    height:36px; 
    background:rgba(255,255,255,1);
    border-radius: 2px ;
    border: 1px solid RGBA(55, 142, 239, 1);
    color: RGBA(55, 142, 239, 1);
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
   .open{
      color: RGBA(77, 77, 77, 1);
   }
   .close{
      color: RGBA(204, 204, 204, 1);
   }
   .forbid{
      button{
        border: 1px solid RGBA(204, 204, 204, 1);
        background-color: #fff;
        font-size: 12px;
        width: 68px;
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
   .tit-class{
    float: left;
   }
   .add-content{
      text-align: left;
      li{
        margin-bottom: 30px;
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
      input,select{
        width: 420px;
        height: 34px;
        border:1px solid RGBA(204, 204, 204, 1);
        border-radius: 2px;
        box-sizing:border-box;
        text-indent: 5px;
      }
      select:disabled{
        background: #eaeaea;
      }
      input.border-red{
        border-color: red;
      }
      textarea{
        width: 420px;
        height: 86px;
        border: 1px solid RGBA(204, 204, 204, 1);
        box-sizing:border-box;
        text-indent: 5px;
      }
     }
   } 
   .mar-ri{
      margin-right:25px; 
   }
   .chose-ipt{
      span{
        cursor: pointer;
      }
      i{
        display: inline-block;
        width: 16px;
        height: 16px;
        background:url("../../assets/images/unselect.png") center no-repeat;
        background-size: cover;
        position: relative;
        top:3px;
      }
      .chose{
        background:url("../../assets/images/select.png") center no-repeat;
        background-size: cover;
      }
   }
   .header{
     height: 36px;
     line-height: 36px;
     margin-bottom: 30px;
     text-align: left;
     color: RGBA(128, 128, 128, 1);
     font-size: 14px;
     input{
       border: 1px solid RGBA(204, 204, 204, 1);
       outline: none;
       height: 36px;
       box-sizing:border-box;
       border-radius: 2px;
     }
   }
   .search-btn{
     margin-left: 80px;
     width: 106px;
     height: 36px;
     line-height: 36px;
     background-color: RGBA(31, 165, 255, 1);
     color: #fff;
     outline: none;
     border: none;
     cursor: pointer;
   }
   .add-adm{
    width: 116px;
    height: 36px;
    border: 1px solid RGBA(55, 142, 239, 1);
    line-height: 36px;
    color: RGBA(55, 142, 239, 1);
    outline: none;
    background: #fff;
    margin-left: 50px;
    cursor: pointer;
   }
   .list-content{
    width:420px;
    border: 1px solid RGBA(204, 204, 204, 1);
    box-sizing:border-box;
    height: 210px;
    overflow: auto;
   }
   .man-div{
    display: inline-block;
    width: 134px;
    text-indent: 8px;
    line-height: 40px;
    overflow:hidden;
    white-space: nowrap;
    cursor: pointer;
    text-overflow:ellipsis;
    i{
      display: inline-block;
      width: 16px;
      height: 16px;
      border:1px solid RGBA(204, 204, 204, 1);
      position: relative;
      top:3px;
      box-sizing:border-box;
    }
    i.chose{
      background: url("../../assets/images/choseed.png") center no-repeat;
      background-size: cover;
      border:none;
    }
   }

.scrollbar::-webkit-scrollbar {
    background-color: #fff!important;
    width: 5px;
    height: 5px;
}
.scrollbar::-webkit-scrollbar-button {
    height: 5px;
    background-color: #fff;
}
.scrollbar::-webkit-scrollbar-thumb {
    background-color: #babec1;
    width: 5px!important;
    border-radius: 2px 2px 2px 2px;
    height: 5px;
}
</style>
<style lang="scss">
  .box-shadow .el-dialog__footer{
    box-shadow: 0 0 4px 1px rgba(0,0,0,.2)
  }
</style>