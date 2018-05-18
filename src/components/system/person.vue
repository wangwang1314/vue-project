<template>
   <div class="view-content">
      <div class="addman" @click="addFn">添加角色</div>
      <table class="list-table">
        <thead>
          <tr>
            <td>ID</td>
            <td>角色名称</td>
            <td>角色概述</td>
            <td>状态</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tablist">
            <td>{{item.id}}</td>
            <td>{{item.title}}</td>
            <td>{{item.describe}}</td>
            <td>
              <span class="open" v-if="item.status==1">启用</span>
              <span class="close" v-else>禁用</span>
            </td>
            <td width="450">
             
              <span class="forbid" >
                <button class="setting" @click="setFn(item.id)">权限设置</button>
                <button class="edit" @click="editFn(item.id)">编辑</button>
                <button class="edit" @click="delFn(item.id)">删除</button>
              </span>
            </td>
          </tr>
          <!-- <tr>
            <td>ss</td>
            <td>ss</td>
            <td>ss</td>
            <td>ss</td>
            <td>
             <span class="forbid">
                <button class="setting">权限设置</button>
                <button class="edit">编辑</button>
                <button class="edit">删除</button>
              </span>
            </td>
          </tr> -->
        </tbody>
      </table>
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
            <div class="first"><i>*</i>角色名称</div>
            <div class="last"><input :class="{'border-red':check.name}" placeholder="50字以内" type="text"  maxlength="50" v-model="manName"></div>
          </li>
          <li>
            <div class="first"><i></i>角色概述</div>
            <div class="last">
              <textarea placeholder="100字以内" :class="{'border-red':check.des}" maxlength="100" v-model="manDes"></textarea>
            </div>
          </li>
          <li>
            <div class="first"><i></i>状态</div>
            <div class="last chose-ipt">
              <span class="mar-ri" @click="ischose=true">
                <i :class="{'chose':ischose}"></i> 开启
              </span>
              <span @click="ischose=false">
                <i :class="{'chose':!ischose}"></i> 禁用
              </span>
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
          <el-button type="primary" @click="confirmFn" >确 定</el-button>
          <el-button @click="cancelFn">取 消</el-button>
        </span>
      </el-dialog>



       <el-dialog
  
      :visible.sync="setting"
      width="630px"
      class="box-shadow"
      >
        <span slot="title" style="float:left;">权限设置</span>
         <el-tree
          :data="data2"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :default-checked-keys="defaultid"
          :props="defaultProps">
        </el-tree>
   
        <span slot="footer" class="dialog-footer">  
          <el-button type="primary" @click="editconfirmFn" >确 定</el-button>
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
   </div>
</template>
<script>
export default {
  data () {
    return {
        total:0,
        page:1,
        pagesize:20,
        addman:false,
        title:"",
        ischose:true,
        setting:false,
        manName:"",
        manDes:"",
        isarr:false,
        arrtit:"",
        success:false,
        suinfo:"",
        fail:false,
        failinfo:"",
        tablist:[],
        choseid:"",
        check:{
          des:false,
          name:false
        },
        data2:[],
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        defaultid:[]
    }
  },
  mounted(){
    this.getList();
  },
  watch:{
      success:'dalogFn',
      fail:'dalogFn'
  },
  computed:{
   
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
    dalogFn(){
      setTimeout(()=>{
        this.success = false;
        this.fail = false;
      },1500)
    },
    delFn(val){
        this.$confirm('确定要删除该角色？', '', {     
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: ''
              }).then(() => {
                     this.$api.post("/groupdel",{
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
    addFn(){
      this.title = "添加角色";
      this.addman = true;
      this.initMan();
    },
    editconfirmFn(){
      let rules = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());
      this.$api.post("/authorization",{
        id:this.choseid,
        rules:rules.toString()
      },su=>{
        if(su.status==200){
         this.setting = false;
         this.success = true;
         this.suinfo = su.info;
        }
      },err=>{
          this.fail = true;
          this.failinfo = su.info;
      },{token:sessionStorage.getItem("token")})  
        // console.log(this.$refs.tree.getCheckedKeys(),this.$refs.tree.getHalfCheckedKeys());
    },
    cancelFn(){
      this.addman = false;
      this.setting = false;
    },
    editFn(val){
      this.initMan();
      this.title = "编辑";
      this.addman = true;
      this.choseid = val;
      this.$api.post("/groupdetail",{
        id:val
      },su=>{
        if(su.status==200){
          this.manName = su.data.title;
          this.manDes =su.data.describe;
          this.ischose =su.data.status;
         // this.total =su.data.total;
        }
      },err=>{
          this.fail = true;
          this.failinfo = su.info;
      },{token:sessionStorage.getItem("token")})    
    },
    setFn(val){
      this.choseid = val;
      this.setting = true;

      //所有权限菜单
      this.$api.post("/rules",{
        id:val
      },su=>{
        if(su.status==200){
          this.defaultid = su.data;
          this.getSet();
        }
      },err=>{
          this.fail = true;
          this.failinfo = su.info;
      },{token:sessionStorage.getItem("token")}) 

     

    },
    confirmFn(){
      if(!this.manName){
        this.isarr = true;
        this.check.name = true;
        this.arrtit = "请输入角色名称";
        return
      }
      let status = 0;
      if(this.ischose){
         status = 1
      }
      if(this.title=="添加角色"){
        this.$api.post("/groupadd",{
          title:this.manName,
          status:status,
          describe:this.manDes
        },su=>{
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
      }else{
        this.$api.post("/groupedit",{
          id:this.choseid,
          title:this.manName,
          status:status,
          describe:this.manDes
        },su=>{
          if(su.status==200){
            this.addman = false;
            this.success = true;
            this.suinfo = su.info;
            this.getList();
          }
        },err=>{
            this.fail = true;
            this.failinfo = su.info;
        },{token:sessionStorage.getItem("token")})
      }
      
    },
    getList(){
      this.$api.post("/group",{
        page:this.page,
        pagesize:this.pagesize
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
    initMan(){
      this.manName ="";
      this.manDes = "";
      this.ischose = true;
      this.isarr = false;
      this.check.name = false;
      this.check.des = false;
    },
    getSet(val){
       //已选菜单
      
      this.$api.get("/menu",{
      },su=>{
        if(su.status==200){
          this.data2 = su.data;
          //this.getSet(val);
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
      input{
        width: 420px;
        height: 34px;
        border:1px solid RGBA(204, 204, 204, 1);
        border-radius: 2px;
        box-sizing:border-box;
      }
      textarea{
        width: 420px;
        height: 86px;
        border: 1px solid RGBA(204, 204, 204, 1);
        box-sizing:border-box;
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

   .add-content .last .border-red{
     border-color: red;
   }
</style>
