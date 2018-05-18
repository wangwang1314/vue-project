<template>
   <div class="li-class">
     <div class="head">
      <span>培训师编号：</span>
      <input type="text" name="" class="input-cla" v-model="trainer_number">
      <span>姓名：</span>
      <input type="text" name="" class="input-cla" v-model="name">
      <span>考官资格：</span>
      <el-select v-model="star_slevel" placeholder="请选择" class="width-90">
        <el-option value="all"  label="请选择"></el-option>
        <el-option value="0"  label="无"></el-option>
        <el-option value="1"  label="一级"></el-option>
        <el-option value="2" label="二级"></el-option>
        <el-option value="3" label="高级"></el-option>
      </el-select>
      <span>挂靠机构：</span>
      <input type="text" name="" class="input-cla" v-model="dock_organ">
      <button class="search-cla" @click="getList">搜索</button>
     </div>
     <p class="total">共 <span>{{total}}</span> 条数据</p>
       <el-table
        :data="tableData"
        border
        class="tab-class"
        style="width: 100%">
        <el-table-column
          fixed
          prop="trainer_number"
          label="培训师编号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="120">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系电话"
          width="120">
        </el-table-column>
        <el-table-column
          prop="education"
          label="文化程度"
          width="120">
        </el-table-column>
        <el-table-column
          prop="star_level"
          label="服务星级"
          width="120">
        </el-table-column>
        <el-table-column
          prop="star_slevel"
          label="考官资格"
          width="120">
        </el-table-column>
        <el-table-column
          prop="valid_time"
          label="资质期限"
          width="120">
        </el-table-column>
        <el-table-column
          prop="approve_time"
          label="年审时间"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="800"
          v-if="type==0"
          >
          <template slot-scope="scope">
            <el-button @click="detailFn(scope)" type="primary" plain>查看详情</el-button>
            <el-button type="primary" v-if="scope.row.checkstatus==1"  @click="exFn(scope)" plain>资质审核</el-button>
            <el-button type="primary" v-if="scope.row.starstatus==1" @click="starFn(scope)" plain>星级管理</el-button>
            <el-button type="primary" v-if="scope.row.cstarstatus==1"  @click="starchange(scope)" plain>星级审核</el-button>
            <el-button type="primary" v-if="scope.row.annualstatus==1"  @click="verification(scope)" plain>年审管理</el-button>   
            <el-button type="primary" v-if="scope.row.examinerstatus==1" @click="change(scope)" plain>考官审核</el-button>
            <el-button type="primary" v-if="scope.row.examinersstatus==1"  @click="tearchchange(scope)" plain>考官复核</el-button>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="170"
          v-if="type!=0"
          >
          <template slot-scope="scope">
            <el-button @click="detailFn(scope)" type="primary" plain>查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:40px;" class="block-box" >
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
        value: '',
        tableData: [],
        page:1,
        pagesize:20,
        success:false,
        suinfo:"",
        fail:false,
        failinfo:"",
        name:"",
        venue_type:"",
        quality_level:"",
        status:"",
        total:0,
        trainer_number:"",
        star_slevel:"all",
        dock_organ:"",
        type:""

    }
  },
  mounted(){
    this.type = sessionStorage.getItem("type_pro");
    this.getList();
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
    getList(){
      this.$api.post("/teachersindex",{
        page:this.page,
        pagesize:this.pagesize,
        name:this.name,
        trainer_number:this.trainer_number,
        star_slevel:this.star_slevel,
        dock_organ:this.dock_organ
      },su=>{
        if(su.status==200){
          this.tableData = su.data.list;
          this.total = su.data.total;
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
    detailFn(val){
      this.$router.push({path:"/teacher/teacherdetail/"+val.row.id})
    },
    exFn(val){
      this.$router.push({path:"/teacher/teacherexa/"+val.row.id})
    },
    change(val){
      this.$router.push({path:"/teacher/teachermanexa/"+val.row.id})
    },
    starFn(val){
      this.$router.push({path:"/teacher/teacherstarm/"+val.row.id})
    },
    verification(val){
      this.$router.push({path:"/teacher/teacherverification/"+val.row.id})
    },
    starchange(val){
      this.$router.push({path:"/teacher/teacherstarc/"+val.row.id})
    },
    tearchchange(val){
      this.$router.push({path:"/teacher/teachermanc/"+val.row.id})
    }
  },
  watch:{
      success:'dalogFn',
      fail:'dalogFn'
  }
}
</script>


<style lang='scss' scoped>

 .li-class{
   padding:20px;
 }
 .head{
  line-height: 40px;
  text-align: left;
  font-size: 14px;
  color: RGBA(128, 128, 128, 1);
  .input-cla{
    width:200px;
    height:36px; 
    border-radius: 2px;
    border: 1px solid RGBA(204, 204, 204, 1);
    padding:0;
    box-sizing:border-box;
    margin-right: 59px;
    text-indent: 10px;
  }
  .width-200{
    width: 200px;
    height: 36px;
    margin-right: 59px;
  }
  .width-90{
    width: 90px;
    height: 36px;
    margin-right: 59px;
  }
 }
 .search-cla{
   width:106px;
  height:36px; 
  background:RGBA(31, 165, 255, 1);
  border-radius: 2px ;
  color: #fff;
  outline: none;
  border: 1px solid RGBA(31, 165, 255, 1);
  cursor: pointer;
 }
 .total{
  font-size:12px;
  color:rgba(128,128,128,1);
  text-align: left;
  margin: 30px 0 21px 0;
  span{
    color: RGBA(26, 26, 26, 1);
  }
 }
</style>
<style lang="scss">
  .li-class .el-table thead th>.cell{
    text-align: center;
  }
</style>

