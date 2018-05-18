<template>
  <div>
      <table class="list-table">
        <thead>
          <tr>
            <td>ID</td>
            <td>名称</td>
            <td>是否主导航</td>
            <td>描述</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          <template v-for ="item in list">
              <tr>
                <td >
                 {{item.id}}
                </td>
                <td>{{item.name}}</td>
                <td>
                  <span v-if="item.is_main==1">是</span>
                  <span v-else>否</span>
                </td>
                <td>{{item.remark}}</td>
                <td width="450">  
                  <span class="forbid" >
                    <button class="edit" @click="addmenuFn(item.id)">菜单管理</button>
                    <button class="edit" @click="editFn(item.id)">编辑</button>
                    <button class="edit" @click="delFn(item.id)">删除</button>
                  </span>
                </td>
              </tr>
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
          编辑导航
        </span>
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
      remark:"",
      istitle:"",
      chose:true,
      isajax:true
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
    editFn(val){
      this.addmenu = true;
      //console.log(val);
      this.choseid = val;
      this.initCheck(1);
      this.getMenu(val);
    },
    getList(){
       this.$api.get("/nav",{
          
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
        url:"/navedit",
        data:{
          id:this.choseid,
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
                      this.addmenu = false;
                      this.getList();
                    }else{
                      this.isarr = true;
                      this.arrtit = su.info;
                    }
        },err=>{
            this.isajax = true;
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
        this.$confirm('确定要删除导航吗？', '', {     
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: ''
              }).then(() => {
                     this.$api.post("/navdel",{
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
         this.$api.post("/navdetail",{
              id:val
           },su=>{
              if(su.status==200){
                this.remark = su.data.remark;
                this.chose = su.data.is_main;
                this.title = su.data.name;

              }
            },err=>{
                this.fail = true;
                this.failinfo = su.info;
            },{token:sessionStorage.getItem("token")})  
    },
    addmenuFn(id){
      this.$router.push({path:"/navigation/navmenu/"+id})
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