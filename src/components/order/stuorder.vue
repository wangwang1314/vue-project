<template>
   <div class="li-class">
     <div class="head">
       <span>发证时间：</span>
  
        <el-date-picker
          v-model="dates"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="timestamp">
        </el-date-picker>

  
      <span style="margin-left:71px;">机构：</span>
      <input type="text" name="" class="input-cla" v-model="audits">
      <span>考核等级：</span>
       <el-select v-model="status" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
     
      <button class="search-cla" @click="searchFn">搜索</button>
     </div>
     <p class="total">共 <span>{{total}}</span> 条数据</p>
       <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="order"
          label="订单编码"
          width="170">
        </el-table-column>
        <el-table-column
          prop="name"
          label="活动机构"
          width="120">
        </el-table-column>
        <el-table-column
          prop="examtime"
          label="活动时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="number"
          label="学员编号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="realname"
          label="学员姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="dan"
          label="考核段位"
          width="120">
        </el-table-column>
        <el-table-column
          prop="originalprice"
          label="应付金额(元)"
          width="120">
        </el-table-column>
        <el-table-column
          prop="realprice"
          label="实付金额(元)"
          width="120">
        </el-table-column>
        <el-table-column
          prop="paytype"
          label="支付方式"
          width="120">
        </el-table-column>
        <el-table-column
          prop="paytime"
          label="支付时间"
          width="120">
        </el-table-column>
        <el-table-column
          label="订单状态"
          width="120">
          <template slot-scope="scope">
              <span v-if="scope.row.status==0">待付款</span>
              <span v-else-if="scope.row.status==1">已支付</span>
              <span v-else-if="scope.row.status==2">待退款</span>
              <span v-else-if="scope.row.status==3">已退款</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button @click="detailFn(scope)" type="primary" plain>订单详情</el-button>
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
        dates:"",//起止日期
        starttime:"",
        endtime:"",
        audits:"",
        status:"",
        options: [{
          value: '1',
          label: '初级'
        }, {
          value: '2',
          label: '中级'
        }, {
          value: '3',
          label: '高级'
        }]


    }
  },
  mounted(){
    this.type = sessionStorage.getItem("type_pro");
    this.getList(this.page,this.pagesize,this.starttime,this.endtime,this.audits,this.status);
  },
  methods:{
    handleSizeChange(val){
      this.pagesize = val;
      this.getList(this.page,this.pagesize,this.starttime,this.endtime,this.audits,this.status);
    },
    handleCurrentChange(val){
     this.getList(val,this.pagesize,this.starttime,this.endtime,this.audits,this.status);
       
    },
    getList(page,pagesize,starttime,endtime,audits,status){
      if(starttime){
        starttime = parseInt(starttime/1000);
      }else{
        starttime = 0;
      }
       if(endtime){
        endtime = parseInt(endtime/1000);
      }else{
        endtime = 0;
      }
      if(status){
        status = parseInt(status);
      }
      this.$api.post("/order",{
        page:page,
        pagesize:pagesize,
        begin_time:starttime,
        end_time:endtime,
        name:audits,
        grade:status
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
    searchFn(){
       if(!this.dates){
           this.starttime = "";
           this.endtime = "";
       }else{
          this.starttime = parseInt(this.dates[0]);
          this.endtime = parseInt(this.dates[1]);
       }
     
       this.getList(this.page,this.pagesize,this.starttime,this.endtime,this.audits,this.status);

    },
    detailFn(val){
      this.$router.push({path:"/order/studetail/"+val.row.id})
    },
    exFn(val){
      this.$router.push({path:"/activity/atvapproval/"+val.row.id})
    },
    starFn(val){
       this.$router.push({path:"/activity/studetail/"+val.row.id})
    },
    verification(val){
        this.$router.push({path:"/activity/distribution/"+val.row.id})
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
  line-height: 60px;
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
<style lang="scss">
  thead th .cell{
    text-align: center;
  }
</style>

