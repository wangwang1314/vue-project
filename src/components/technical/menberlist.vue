<template>
	<div class="mb-cont">
		<div class="search-cont">
			  <span>姓名：</span><el-input v-model="name" class="name_tx" placeholder="请输入内容"></el-input>
			  <span>归属区域：</span>
			  <template>
			  <el-select v-model="provice" placeholder="无" class="area-select">
			    <el-option
			      v-for="item in ownerArea"
			      :key="item.area_id"
			      :label="item.title"
			      :value="item.area_id">
			    </el-option>
			  </el-select>
			</template>

		   <button class="search-btn" @click="seachSubmit">搜索</button>
		   <button class="add-mb" @click="addmenber">+ 新增成员</button>
		</div>

		<p class="data-tt">共<span>{{total}}</span>条数据</p>
		<div class="cont-tab">
			 <template>
		  <el-table
		    :data="tableData"
		    border
		    style="width: 100%">
		    <el-table-column
		      fixed
		      prop="id"
		      label="ID"
		      width="150">
		    </el-table-column>
		    <el-table-column
		      prop="name"
		      label="考官资格ID"
		      width="120">
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
		      prop="province"
		      label="归属区域"
		      width="120">
		    </el-table-column>
		     <el-table-column
		      prop="super_level"
		      label="管理级别"
		      width="120">
		    </el-table-column>
		     <el-table-column
		      prop="status"
		      label="状态"
		      width="120">
		    </el-table-column>
		     <el-table-column
		      prop="valid_time"
		      label="有效期限"
		      width="120">
		    </el-table-column>
		    </el-table-column>
		    <el-table-column
		      fixed="right"
		      label="操作"
		      width="360"
		     >
		      <template slot-scope="scope">

		        <el-button @click="detailFn(scope)" type="primary" plain>查看详情</el-button>
	           <!--  <el-button type="primary" v-if="scoper.row.status=='有效'"  @click="exFn(scope)" plain>取消资格</el-button> -->
	            <el-button type="primary"  v-if="scope.row.status == '无效'"  @click="exFn(scope)" plain>恢复资格</el-button>
	             <el-button type="primary"  v-if="scope.row.status == '有效'"  @click="exFn(scope)" plain>取消资格</el-button>
	            <el-button type="primary"  @click="starFn(scope)" plain>年审管理</el-button>
	           
		      </template>
		    </el-table-column>
		  </el-table>
		</template>
		</div>

		 <div class="block">
	    <el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page.sync="currentPage2"
	      :page-sizes="[20, 50, 100]"
	      :page-size="pagesize"
	      layout="prev, pager, next,sizes"
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

       <el-dialog
          :visible.sync="addmenu"
          width="460px"
          class="box-shadow"
          >
            <span slot="title" class="tit-class">
              {{title}}
            </span>
            <div class="list-cont">
              <p><span class="red">*</span>原因</p>
              <textarea placeholder="400字以内" maxlength="400" v-model="result">
                
              </textarea>
            </div>  
            <span slot="footer" class="dialog-footer" >
              <div class="warn-in">
              <el-alert
                       :title="arrtit"
                       type="warning"
                       show-icon v-show="isarr" >
              </el-alert>
              </div>  
              <el-button type="primary" v-show="title=='取消资格'"  @click="confirm(1)">确 定</el-button>
               <el-button type="primary" v-show="title=='恢复资格'"  @click="confirm(2)">确 定</el-button>
              <el-button @click="addmenu=false">取 消</el-button>
            </span>
          </el-dialog>
		
	</div>
</template>
<script>
	export default{
		data(){
          return {
             name:'',
             currentPage2: 5,
                page:1,
                pagesize:20,
                total:0,
		        tableData: [],
		        provice:'',
		        ownerArea:[],
		        success:false,
			    suinfo:"",
			    fail:false,
			    failinfo:"",
			    title:"",
			    result:"",
			    addmenu:false,
			    arrtit:"",
			    isarr:false,
			    rowId:0

           }
		},
		mounted(){
		   this.getProvice();
           this.getList(this.page,this.pagesize,this.name,this.provice);
		},
		methods:{
			clirow(row){
			   console.log(row);
			},
			handleSizeChange(val) {
			   this.pagesize = val;
		       this.getList(this.page,val,this.name,this.provice);
		    },
		    handleCurrentChange(val) {
		    	this.page = val;
		        this.getList(val,this.pagesize,this.name,this.provice);
		    },
		    seachSubmit(){
		      this.getList(1,this.pagesize,this.name,this.provice);
		    },
		    detailFn(val){
		      this.$router.push({path:"/technical/detail/"+val.row.id})
		    },
		    starFn(val){
		       this.$router.push({path:"/technical/annual/"+val.row.id})
		    },
		    addmenber(){
		    	this.$router.push({path:"/technical/addmenber"}) 
		    },
		    exFn(v){
               console.log(v.row.status);
               this.rowId = v.row.id;
               if(v.row.status == "有效"){
                  this.title = "取消资格"
               }else{
               	  this.title = "恢复资格"
               }
                this.isarr = false;
		        this.arrtit = "";
		        this.addmenu = true;
		        this.result = "";
		    },
		    confirm(v){
		    	 if(!this.result){
		            this.isarr = true;
		            this.arrtit = "请填写原因";
		            return;
		         }

		         this.$api.post("/teeditstatus",{
                   teid:this.rowId,
                   type:v,
                   description:this.result
		         },su=>{
		         	 if(su.status==200){
		              this.success = true;
		              this.suinfo =su.info;
		              this.getList(this.page,this.pagesize,this.name,this.provice);
		              this.addmenu = false;
		            
		            }else{
		              this.isarr = true;
		              this.arrtit = su.info;
		            }

		         },err=>{
                    this.fail = true;
                    this.failinfo = err.info;
		         },{token:sessionStorage.getItem("token")})

		    },
		    getProvice(){
                this.$api.get("/getprovince",{},su=>{
		        if(su.status==200){
		           su.data.forEach((el,ind)=>{
		           	  if(!el.area_id==0){
                         this.ownerArea.push(el); 
		           	  }
		           })
		           console.log( this.ownerArea);
		        }else{
                   this.fail = true;
		          this.failinfo = su.info;
		        }
		      },err=>{
		          this.fail = true;
		          this.failinfo = err.info;
		      },{token:sessionStorage.getItem("token")})
		    },
		    getList(page,pagesize,name,provice){
		      this.$api.post("/technology",{
		        page:page,
		        pagesize:pagesize,
		        name:name,
		        province:provice
		      },su=>{
		        if(su.status==200){
		          this.tableData = su.data.list;
		          this.total = su.data.total;
		        }else{
		          this.fail = true;
		          this.failinfo = su.info;
		        }
		      },err=>{
		          this.fail = true;
		          this.failinfo = err.info;
		      },{token:sessionStorage.getItem("token")})
		    }

		}
	}
</script>
<style scoped>
    .mb-cont{
    	text-align: left;
		padding:16px 26px;
    }
	
    .search-cont span{
    	font-size: 14px;
    	color:#808080;
    }
    .name_tx{
    	width: auto;
    	margin-right: 60px;
    	height: 36px;
    }
    .search-btn{
	    width: 106px;
	    height:36px;
	    border:1px solid #5194E1;
	    background-color: #1472B1;
	    color:white;
	    font-size:14px;
	    border-radius: 2px;
	    cursor: pointer;
	    margin: 0 44px 0 72px;

    }
    .add-mb{
         width: 106px;
		 height:36px;
		 border:1px solid #5194E1;
		 background-color: #1FA5FF;
		 color:white;
		 font-size:14px;
		 border-radius: 2px;
		 cursor: pointer;
    }
    .data-tt{
    	font-size: 12px;
    	color:#808080;
    	text-align: left;
    	margin:30px 0 21px 0;

    }
    .data-tt span{
    	color:#1A1A1A;
    	font-weight: bold;
    }
    .cont-tab{
    	padding-bottom: 40px;
    } 
    .block{
    	text-align: center;
    }
 .ex-btnbox{
    button{
      width:100px;
      height:34px; 
      background:rgba(255,255,255,1);
      border-radius: 2px;
      font-size:14px;
      color:rgba(77,77,77,1);
      border: 1px solid RGBA(153, 153, 153, 1);
      line-height: 34px;
      outline: none;
      box-sizing:border-box;
      margin-left: 18px;
      padding:0;
      cursor: pointer;
    }
    button.color{
      background: RGBA(31, 165, 255, 1);
      color: #fff;
      border-color: RGBA(31, 165, 255, 1);
    }
  }
  .list-cont textarea{
     width:419px;
      height:86px; 
      border-radius: 2px;
      padding: 5px;
      box-sizing:border-box;
      border:1px solid #ccc;
  }
  .list-cont{
    p{
      text-align:left;
    }
  }
  
  .dialog-footer{
    position: relative;
   
  }
  .dialog-footer  .warn-in{
      position: absolute;
      width: 220px;
    }
  .red{
    color: red;
    margin-right: 5px;
  }
  .box-shadow .el-dialog__body{
    padding: 9px 20px;
  }   
</style>
<style>
  .el-dialog__header{
    text-align: left;
  }
	.name_tx .el-input__inner{
		height:36px;
	}
	.area-select .el-input__inner{
		height:36px;
	}
</style>