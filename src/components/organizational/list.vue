<template>
   <div class="li-class">
     <div class="head">
       <span>机构名称：</span>
       <input type="text" name="" class="input-cla" v-model="name">
       <span>类型：</span>
        <el-select v-model="venue_type" placeholder="请选择" class="width-200">
          <el-option value="" label="请选择"></el-option>
          <el-option value="1" label="培训中心"></el-option>
          <el-option value="2" label="考核中心"></el-option>
        </el-select>
        <span>机构等级：</span>
        <el-select v-model="quality_level" placeholder="请选择" class="width-90">
          <el-option value=""  label="请选择"></el-option>
          <el-option value="1"  label="初级"></el-option>
          <el-option value="2" label="中级"></el-option>
          <el-option value="3" label="高级"></el-option>
        </el-select>
         <span>状态：</span>
        <el-select v-model="status" placeholder="请选择" class="width-90">
          <el-option value="" label="请选择"></el-option>
          <el-option value="1" label="待审核"></el-option>
          <el-option value="2" label="待发证"></el-option>
          <el-option value="3" label="运营"></el-option>
          <el-option value="4" label="暂停"></el-option>
          <el-option value="5" label="整改"></el-option>
          <el-option value="6" label="年审"></el-option>
          <el-option value="7" label="年审冻结"></el-option>
          <el-option value="8" label="注销"></el-option>
        </el-select>
        <button class="search-cla" @click="getList">搜索</button>
     </div>
     <p class="total">共 <span>{{total}}</span> 条数据</p>
       <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="id"
          label="机构ID"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="机构名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="categoryname"
          label="项目"
          width="120">
        </el-table-column>
        <el-table-column
          prop="venue_type"
          label="机构类型"
          width="120">
        </el-table-column>
        <el-table-column
          prop="quality_level"
          label="考核等级"
          width="120">
        </el-table-column>
        <el-table-column
          prop="site_num"
          label="场地数"
          width="120">
        </el-table-column>
        <el-table-column
          prop="contact_name"
          label="联系人"
          width="120">
        </el-table-column>
        <el-table-column
          prop="contact_phone"
          label="联系电话"
          width="120">
        </el-table-column>
        <el-table-column
          prop="statusname"
          label="状态"
          width="120">
        </el-table-column>
        <el-table-column
          prop="verify_organ"
          label="认定机构"
          width="120">
        </el-table-column>
        <el-table-column
          prop="cognizance_time"
          label="认定时间"
          width="120">
        </el-table-column>
         <el-table-column
          prop="star_level"
          label="评级"
          width="120">
        </el-table-column>
         <el-table-column
          prop="addtime"
          label="登记时间"
          width="120">
        </el-table-column>
         <el-table-column
          prop="term_operation"
          label="年审时间"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="400">
          <template slot-scope="scope">
            <el-button @click="detailFn(scope)"  type="primary"  v-if="scope.row.status == 1 || scope.row.status >3"  plain>查看详情</el-button>
            <el-button type="primary" v-if="type==0"  v-show="scope.row.status == 2"  @click="exFn(scope)" plain>审核发证</el-button> 
            <el-button type="primary"  @click="exFner(scope)"  plain>资质审核</el-button>  
            <el-button type="primary" @click="change(scope)" v-show="scope.row.status ==3"  plain>运营管理</el-button>
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
        total:0
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
      this.$api.post("/organindex",{
        page:this.page,
        pagesize:this.pagesize,
        name:this.name,
        venue_type:this.venue_type,
        quality_level:this.quality_level,
        status:this.status
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
      //console.log(val.row.id)
      this.$router.push({path:"/organizational/detail/"+val.row.id})
    },
    exFn(val){
      this.$router.push({path:"/organizational/issuing/"+val.row.id})
    },
    exFner(val){
      this.$router.push({path:"/organizational/examine/"+val.row.id})
    },
    change(val){
       this.$router.push({path:"/organizational/changeex/"+val.row.id})
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
