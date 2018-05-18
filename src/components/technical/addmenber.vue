<template>
   <div class="de-box">
     <div class="go-back" @click="goback">&lt;&lt; 返回</div>
     <p class="tit-p">添加技术委员会成员</p>
     <div class="mar-top">

         <div class="search-cont">
        <span>考官资格编号：</span><el-input v-model="trainer_number" class="name_tx" placeholder="请输入内容"></el-input>
        <span>考官姓名：</span><el-input v-model="name" class="name_tx" placeholder="请输入内容"></el-input>
        <button class="search-btn" @click="searcFn">搜索</button>
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
          prop="organ_name"
          label="挂靠机构"
          width="300">
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
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="360"
         >
          <template slot-scope="scope">

             <el-button @click="detailFn(scope)" type="primary" plain>查看详情</el-button>
              <el-button type="primary"   @click="exFn(scope)" plain>国家级成员</el-button>
              <el-button type="primary"  @click="starFn(scope)" plain>省级成员</el-button>
             
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
    
      
      </div>

   </div>
</template>
<script>
export default {
  data () {
    return {
      id:"",
      activeName:"first",
      data:{},
      page:1,
      pagesize:20,
      total:0,
      trainer_number:"",
      name:"",
      success:false,
      suinfo:"",
      fail:false,
      failinfo:"",
      title:"",
      result:"",
      addmenu:false,
      arrtit:"",
      isarr:false,
      currentPage2: 5,
      tableData: []
        
     
    }
  },
  mounted(){
      this.getList(this.page,this.pagesize,this.trainer_number,this.name);
  },
  methods:{
     handleClick(tab, event) {
        if(this.activeName=="first"){
          
        }else if(this.activeName=="second"){

        }
       // this.getList();
     },
     goback(){
      this.$router.push({path:"/technical/list"})
     },
      handleSizeChange(val) {
         this.pagesize = val;
         this.getList(this.page,val,this.trainer_number,this.name);
        },
      handleCurrentChange(val) {
          this.page = val;
          this.getList(val,this.pagesize,this.trainer_number,this.name);
      },
      detailFn(val){
          this.$router.push({path:"/technical/trainerdetail/"+val.row.id});
      },
      searcFn(){
        this.getList(1,this.pagesize,this.trainer_number,this.name);
      },
      getList(page,pagesize,trainer_number,name){
          this.$api.post("/tetrainerList",{
            page:page,
            pagecount:pagesize,
            trainer_number:trainer_number,
            name:name
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
      },
      //设置国家成员
      
      saveBecome(id,v){
         this.$api.post("/teaddMember",{
            tid:id,
            super_level:v
         },su=>{
             console.log(su);
              if(su.status==200){
                this.getList(this.page,this.pagesize,this.trainer_number,this.name);
                this.$message({
                  type: 'success',
                  message: '添加成功'
                });          
              }else{
                this.$message({ 
                  type: 'error',
                  message: su.info
                });    

              }
         },err=>{
             this.$message({
                  type: 'error',
                  message: err.info
               });          
         },{token:sessionStorage.getItem("token")})

      },
    exFn(d){
       this.saveBecome(d.row.id,0)
    },
    starFn(d){
      this.saveBecome(d.row.id,1)
    }

  }
}
</script>


<style lang='scss' scoped>
  .de-box{
    padding: 30px;
  }
  .go-back{
    width:116px;
    height:36px; 
    background:rgba(255,255,255,1);
    border-radius: 2px;
    font-size:14px;
    color:rgba(55,142,239,1);
    line-height: 36px;
    text-align: center;
    border: 1px solid RGBA(55, 142, 239, 1);
    cursor: pointer;
    margin-bottom: 26px;
  }
  .tit-p{
    font-size:14px;
    color:rgba(0,0,0,1);
    line-height:38px;
    height:40px;
    text-align: left; 
    background:rgba(228,239,252,1);
    border-radius: 2px; 
    padding-left: 26px;
  }
  .mar-top{
    margin-top: 20px;
  }
  .tab-class{
    margin: 5px 0 0 26px;
    table{
      font-size: 14px;
      td{
        line-height: 30px;
      }
      td:first-child{
        width: 102px;
        background:rgba(250,250,250,1);
        color:rgba(153,153,153,1);
        text-align: right;
      }
      td:nth-child(2){
        color:rgba(77,77,77,1);
        padding-left: 14px;
        text-align: left;
        width: 561px;
      }
      .tab-btncla{
        button{
          width:93px;
          height:28px; 
          background:rgba(255,233,166,1);
          border-radius: 6px;
          border: none;
          background: RGBA(255, 233, 166, 1);
          margin-right: 21px;
          font-size:14px;
          color:rgba(77,77,77,1); 
          outline: none;
        }
      }
    }
    table.width-180{
      td:first-child{
        width: 180px;
      }
    }
    table.width-146{
      td:first-child{
        width: 146px;
        vertical-align:middle;
        
      }
      img{
          width: 120px;
          height: 80px;
      }
    }
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
  .tab-class{
      position: relative;
    }
   .mb-img{
     position:absolute;
     width:100px;
     height:100px;
     left:500px;
     top:0;
   }
   .tab-class td{
    padding:5px 0;
   }


   .annual-cont{
     padding-top:20px;
     border-top:1px solid #E6E6E6;
     margin-top:70px;
     text-align:left;
   }
   .annual-cont button{
      width:100px;
      height:34px;
      font-size:14px;
      box-sizing:border-box;
      border-radius:2px;
      margin-left:18px;
      cursor:pointer;
   }
   .annual-cont button:nth-child(1){
    background-color:#1FA5FF;
    color:white;
    border:none;
   }
  .annual-cont button:nth-child(2){
    background-color:#51B7FB;
    color:white;
     border:none;
   }
    .annual-cont button:nth-child(3){
        color:#4D4D4D;
        border:1px solid #999999;
        background-color:white;
     }
   .mb-cont{
      text-align: left;
      padding:16px 26px;
    }
    .search-cont{
      text-align:left;
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
</style>
<style>
  .name_tx .el-input__inner{
    height:36px;
  }
  .area-select .el-input__inner{
    height:36px;
  }
</style>
