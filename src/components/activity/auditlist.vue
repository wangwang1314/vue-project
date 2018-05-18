<template>
   <div class="li-class">
     <div class="head">
       <span>日期：</span>
  
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
      <span>活动状态：</span>
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
          prop="id"
          label="活动编码"
          width="150">
        </el-table-column>
        <el-table-column
          prop="activitytime"
          label="活动时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="contacts"
          label="联系人"
          width="120">
        </el-table-column>
        <el-table-column
          prop="contact_number"
          label="联系电话"
          width="120">
        </el-table-column>
        <el-table-column
          prop="places"
          label="名额"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="级别"
          width="120">
        </el-table-column>
        <el-table-column
          prop="addtime"
          label="申请时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="mechanism"
          label="审核机构"
          width="120">
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="审核人"
          width="120">
        </el-table-column>
        <el-table-column
          prop="time"
          label="审核时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="statusname"
          label="活动状态"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="600">
          <template slot-scope="scope">
          <el-button @click="detailFn(scope)" type="primary" plain>活动详情</el-button> 
            <el-button type="primary"  v-if="scope.row.statusname=='待审核'"  @click="exFn(scope)" plain>活动审批</el-button>
   <!--          <el-button type="primary"  @click="starFn(scope)" plain>报名详情</el-button> -->
          <!--   <el-button type="primary"  @click="verification(scope)" plain>场次详情</el-button>    -->
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
          label: '待审核状态'
        }, {
          value: '2',
          label: '驳回'
        }, {
          value: '3',
          label: '通过'
        }, {
          value: '4',
          label: '下架'
        }, {
          value: '5',
          label: '活动到期'
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
        starttime = parseInt(starttime);
      }else{
        starttime = 0;
      }
       if(endtime){
        endtime = parseInt(endtime);
      }else{
        endtime = 0;
      }
      if(status){
        status = parseInt(status);
      }
      this.$api.post("/activitylist",{
        page:page,
        pagesize:pagesize,
        starttime:starttime,
        endtime:endtime,
        audits:audits,
        status:status
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
          this.starttime = parseInt(this.dates[0])/1000;
          this.endtime = parseInt(this.dates[1])/1000;
       }
     
       this.getList(this.page,this.pagesize,this.starttime,this.endtime,this.audits,this.status);

    },
    detailFn(val){
      this.$router.push({path:"/activity/exdetail/"+val.row.id})
    },
    exFn(val){
      this.$router.push({path:"/activity/exapproval/"+val.row.id})
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

