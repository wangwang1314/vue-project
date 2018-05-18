<template>
     <div id="news">
     	<div class="search-new">
     		
     
     	标题：<el-input v-model="titles"  placeholder="请输入内容"></el-input>
     	<span class="mg30">资讯类型：</span>
		  <el-select v-model="typeitem" placeholder="请选择">
                        <el-option
                          v-for="item in newtype"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
        <span class="mg30">作者：</span><el-input v-model="authors" placeholder="请输入内容"></el-input>
 
		 <span class="mg30">时间：</span>
		
        <el-date-picker
          v-model="dates"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="timestamp">
        </el-date-picker>
		
             <el-button type="primary" @click="searchFn">搜索</el-button>
            
       	</div>

       	<div class="addnews">
       		  <el-button type="primary" @click="addnew">新增资讯</el-button>
       	</div>
       	<div class="newlist">
       		 <el-table
    :data="tableData4"
    style="width: 100%"
     >
    <el-table-column
      fixed
      prop="id"
      label="ID"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="资讯类型"
      width="200">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="300">
    </el-table-column>
    <el-table-column
      prop="addtime"
      label="发布时间"
      width="250">
    </el-table-column>
    <el-table-column
      prop="author"
      label="作者"
      width="250">
    </el-table-column>
    <el-table-column
      label="发布区域"
      width="300">
       <template slot-scope="scope">
           <span>{{scope.row.province}}{{scope.row.city}}{{scope.row.area}}</span>
      </template>
    </el-table-column>
     <el-table-column
      label="状态"
      width="120">
        <template slot-scope="scope">
        	<span v-if="scope.row.status==1">草稿</span>
        	<span v-if="scope.row.status==2">待审核</span>
        	<span v-if="scope.row.status==3">已发表</span>
        	<span v-if="scope.row.status==4">审核未通过</span>
        </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="400">
      <template slot-scope="scope">
       

        <el-button
          class="btn-bt"
          @click="presee(scope.row.id,1)"
          size="small">
          预览
        </el-button>
        <el-button
          class="btn-bt"
          v-show="scope.row.status!==2 &&　scope.row.status==1"
          @click="toEdite(scope.row.id,1)"
          size="small">
          编辑
        </el-button>

        <el-button
          class="btn-bt"
          v-show="scope.row.status == 2"
          @click="toEdite(scope.row.id,2)"
          size="small">
          编辑
        </el-button>
         
         <el-button
          class="btn-bt"
          v-show="scope.row.status == 2"
          @click="presee(scope.row.id,2)"
          size="small">
          审核
        </el-button>
         <el-button
          class="btn-bt"
          @click="deleteRow(scope.row.id)"
          size="small">
          删除
        </el-button>
        <el-button type="primary" size="small"  v-if="scope.row.istop==0 && scope.row.status ==3"  @click="recommend(scope.row.id)">推荐</el-button>
        <el-button
          v-if="scope.row.istop>0 && scope.row.status ==3"
          type="primary"
          class="btn-bt"
          plain
          @click="recommend(scope.row.id)"
          size="small">
          取消推荐
        </el-button>
      </template>
    </el-table-column>
  </el-table>
       	</div>

  <div class="block" style="text-align:center;margin-top:30px;">

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-sizes="[20, 50, 100]"
      :page-size="pagecount"
      layout="prev, pager, next,sizes"
      :total="pageTotal">
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
      success:false,
      fail:false,
      suinfo:"",
      failinfo:"",
      msg: 'Welcome to Your Vue.js App',
      page:1,
      pagecount:20,
      pageTotal:0,
      title:'',
      titles:"",//标题
      typeid:0,
      author:"",
      authors:"",
      status:0,
      starttime:0,
      endtime:0,
      page:1,
      pagecount:20,
      newtype:'',
      typeitem:"",
      tableData4: [],
      value: '',
      dates:"",
      starttime:"",
      endtime:""
    }
  },
  methods:{
  	handleSizeChange(val) {
  		this.getNewslist(this.titles,this.typeitem,this.authors,this.status,this.starttime,this.endtime,this.page,val);
        console.log(`每页 ${val} 条`);
     },
      handleCurrentChange(val) {
        this.getNewslist(this.titles,this.typeitem,this.authors,this.status,this.starttime,this.endtime,val,pagecount);
        console.log(`当前页: ${val}`);
    },
    deleteRow(index, rows) {
        rows.splice(index, 1);
      },
    newtypeFn(){
      this.$api.post("/newstype",{},su=>{
             if(su.status==200){
              console.log(su.data);
              this.newtype = su.data;

             }
      },err=>{

      },{token:sessionStorage.getItem("token")})
    }, 
    //添加新闻
    addnew(){
    	this.$router.push("/news/addnew");
    },
    //获取列表
    getNewslist(title,typeid,author,status,starttime,endtime,page,pagecount){
    	 this.$api.post("/newslist",{
    	 	title:title,
    	 	typeid:typeid,
            author:author,
            status:status,
            starttime:starttime,
            endtime:endtime,
            page:page,
            pagecount:pagecount
    	 },su=>{
             console.log(su);
             if(su.status==200){
             	 this.tableData4 = su.data.list;
             	 this.pageTotal = su.data.total;
             	 console.log( this.tableData4);
             }else{
             	  this.fail = true;
                  this.failinfo = su.info;
             }
    	 },err=>{
                  this.fail = true;
                  this.failinfo = err.info;
    	 },{token:sessionStorage.getItem("token")})
        
    },
    presee(id,v){
    	if(v==1){
    		this.$router.push({name:'examine',params:{
                id:id,
                sta:1
    		}})
    	}else{
    		this.$router.push({name:'examine',params:{
    			id:id,
    			sta:2
    			
    		}})
    	}
    },
   //删除
   deleteRow(id){
   	   this.$api.post("/newdel",{id:id},su=>{
   	   	  if(su.status == 200){
   	   	  	  this.getNewslist(this.titles,this.typeitem,this.authors,this.status,this.starttime,this.endtime,this.page,this.pagecount);
   	   	  }
   	   },err=>{

   	   },{token:sessionStorage.getItem("token")})
   },
   toEdite(v,sta){
   	   this.$router.push({name:"editenew",params:{id:v,sta:sta}})
   } ,
   //是否推荐
   recommend(v){
   	  console.log(v);
   	  this.$api.post("/newrecommend",{id:v},su=>{
   	  	 if(su.status == 200){
   	  	 	 this.getNewslist(this.titles,this.typeitem,this.authors,this.status,this.starttime,this.endtime,this.page,this.pagecount);
   	  	 	   this.success = true;
               this.suinfo = su.info;
   	  	 	}else{
                this.fail = true;
                this.failinfo = su.info;
   	  	 	}

   	  },err=>{
           this.fail = true;
           this.failinfo = err.info;
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

      this.getNewslist(this.titles,this.typeitem,this.authors,this.status,this.starttime,this.endtime,this.page,this.pagecount);
    },

  },
  mounted(){
  	this.newtypeFn();
  	 this.getNewslist(this.titles,this.typeitem,this.authors,this.status,this.starttime,this.endtime,this.page,this.pagecount);
  },
  computed:{
   
  },
  watch:{
      success:'dalogFn',
      fail:'dalogFn'
  }
}
</script>


<style lang='scss' scoped>
 #news{
 	text-align: left;
 	padding:20px ;
 }
 .mg30{
 	margin-left:20px;
 }
 .addnews{
 	margin-top:20px;
 }
  #news .el-input{
  	width: 200px;
  }
  .search-new{
  	min-width: 1200px;
  }
  .newlist{
  	border-top:1px solid #eaeaea;
  	margin-top:30px;
  }

  .btn-bt{
  	float:right;
  	margin-left:10px;
  }

 
</style>
<style>
	 .newlist .el-table td,.newlist .el-table th{
  	text-align:center !important;
  }
</style>
