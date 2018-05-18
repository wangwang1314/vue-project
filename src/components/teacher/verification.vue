<template>
   <div class="de-box">
     <div class="go-back" @click="goback">&lt;&lt; 返回</div>
     <p class="tit-p">年审管理</p>
     <p class="title-info">培训师基本信息</p>
     <div class="tab-class">
      <table>
        <tr>
          <td>培训师编号：</td>
          <td>{{data.trainer_number}}</td>
        </tr>
         <tr>
          <td>培训师姓名：</td>
          <td>{{data.name}}</td>
        </tr>
        <tr>
          <td>性别：</td>
          <td>{{data.sex}}</td>
        </tr>
        <tr>
          <td>证件类型：</td>
          <td>{{data.card_type}} <span style="margin-left:40px;">{{data.idcard}}</span></td>
        </tr>
        <tr>
          <td>出生日期：</td>
          <td>{{data.birthday}}</td>
        </tr>
        <tr>
          <td>文化程度：</td>
          <td>{{data.education}}</td>
        </tr>
        <tr>
          <td>手机号码：</td>
          <td>{{data.phone}}</td>
        </tr>
        <tr>
          <td>联系地址：</td>
          <td>{{data.province}}{{data.city}}{{data.area}}{{data.address}}</td>
        </tr>
         <tr>
          <td>邮箱：</td>
          <td>{{data.email}}</td>
        </tr>
         <tr>
          <td>注册时间：</td>
          <td>{{data.addtime}}</td>
        </tr>
      </table>
     </div>
     <p class="title-info">培训师资质信息</p>
     <table class="tab-color">
     	<tr>
     		<td>评价星级：</td>
     		<td width="200">{{data.star_level}} 级</td>
     		<td>段位考官资格：</td>
     		<td width="100">{{data.star_slevel}} 级</td>
     	</tr>
     	<tr>
     		<td>培训师资格证书编号：</td>
     		<td>{{data.trainer_code}}</td>
     		<td>段位证书等级：</td>
     		<td>{{data.segment_grade}}</td>
     	</tr>
     	<tr>
     		<td colspan="4" style="text-align:center">
     			<button @click="changeFn">
     				<i></i>调整
     			</button>
     		</td>
     	</tr>
     </table>
     <div class="tab-class">
       <table>
        
        <tr>
          <td>审批机构：</td>
          <td>{{data.verify_organ}}</td>
        </tr>
        <tr>
          <td>审批人：</td>
          <td>
            {{data.approve_name}}
          </td>
        </tr>
        <tr>
         <td>有效期限：</td>
          <td><input type="text" name="" style="width:60px;" @input="iptFn" v-model="data.valid_time"> 年</td>
        </tr>
      </table>
     </div>
  	 <div class="hr"></div>
     <div class="ex-btnbox" >
       <button class="color"  @click="confirm(2)">年审合格</button>
       <button class="color" @click="notcheck">年审不合格</button>
       <button  @click="cancheck">取消资格</button>
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
          :visible.sync="change"
          width="630px"
          class="box-shadow"
          >
            <span slot="title" class="tit-class">
              培训师资质变更
            </span>
          	<table class="dialog-tab">
          		<tr>
          			<td>评价星级</td>
          			<td>
          				<select v-model="data.star_level">
          					  <option value="1">一星</option>
				              <option value="2">二星</option>
				              <option value="3">三星</option>
				              <option value="4">四星</option>
				              <option value="5">五星</option>
          				</select>
          			</td>
          		</tr>
          		<tr>
          			<td>段位考官资格</td>
          			<td>
          				<select v-model="data.star_slevel">
			              <option value="1">一级</option>
			              <option value="2">二级</option>
			              <option value="3">高级</option>
			            </select>
          			</td>
          		</tr>
          		<tr>
          			<td>培训师资格证书号</td>
          			<td>
          				<input type="text" name="" v-model="data.trainer_code">
          			</td>
          		</tr>
          		<tr>
          			<td>段位证书等级</td>
          			<td>
          				<input type="text" name="" @click="iptFn" v-model="data.segment_grade">
          			</td>
          		</tr>
          		<tr>
          			<td>段位考核活动主考官资格</td>
          			<td>
          				<el-radio v-model="data.coach_type" label="1">有</el-radio>
            			<el-radio v-model="data.coach_type" label="0">无</el-radio>
          			</td>
          		</tr>
          		<tr>
          			<td>调整原因</td>
          			<td>
          				<textarea placeholder="400字以内" v-model="res"></textarea>
          			</td>
          		</tr>
          	</table> 
            <span slot="footer" class="dialog-footer" >
              <div class="warn-in">
              <el-alert
                       :title="arrtit"
                       type="warning"
                       show-icon v-show="isarr" >
              </el-alert>
              </div>  
              <el-button type="primary"   @click="changecon()">确 定</el-button>
              <el-button @click="cancelcon">取 消</el-button>
            </span>
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
              <el-button type="primary"  v-show="title=='年审不合格'"   @click="confirm(3)">确定</el-button>
              <el-button type="primary" v-show="title=='取消资格'"  @click="confirm(4)">确定</el-button>
              <el-button @click="addmenu=false">取消</el-button>
            </span>
          </el-dialog>
    </div> 
</template>
<script>
export default {
  data () {
    return {
        id:"",
        data:{},
        success:false,
        suinfo:"",
        fail:false,
        failinfo:"",
        addmenu:false,
        arrtit:"",
        isarr:false,
        title:"",
        result:"",
        star:1,
        change:false,
        res:""
    }
  },
  mounted(){
      this.id = this.$route.params.id;
      this.getList();
  },
  methods:{
    iptFn(){
      if(this.data.segment_grade==0){
        return;
      }
      if(parseInt(this.data.segment_grade)){
        this.data.segment_grade = parseInt(this.data.segment_grade)
      }else{
        this.data.segment_grade = ""
      }
    },
    goback(){
      this.$router.push({path:"/teacher/teacherlist"});
    },
    getList(){
      this.$api.post("/qualymessage",{
       id:this.id
      },su=>{
        if(su.status==200){
         su.data.coach_type=su.data.coach_type.toString();
          this.data = su.data;
          //this.total = su.data.total;
        }
      },err=>{
          this.fail = true;
          this.failinfo = su.info;
      },{token:sessionStorage.getItem("token")})
    },
    confirm(val){
      this.isarr = false;
      if(val!=2&&!this.result){
        this.isarr = true;
        this.arrtit = "请填写原因";
        return
      }
      this.$api.post("/annualedit",{
       id:this.id,
       star_level:this.data.star_level,
       star_slevel:this.data.star_slevel,
       trainer_code:this.data.trainer_code,
       segment_grade:this.data.segment_grade,
       coach_type:this.data.coach_type,
       reson:this.res,
       verify_organ:this.data.verify_organ,
       approve_name:this.data.approve_name,
       valid_time:this.data.valid_time,
       status:val,
       description:this.result
      },su=>{
        if(su.status==200){
          this.success = true;
          this.suinfo = su.info;
          this.addmenu = false;
          setTimeout(()=>{
             this.$router.push({path:"/teacher/teacherlist"});
          },1000)
        }else{
          this.isarr = true;
          this.arrtit = su.info;
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
    cancel(){
    	this.result = "";
    	this.star = 1;
    },
    changeFn(){
    	this.change = true;
    },
    changecon(){
    	this.isarr = false;
    	if(!this.data.trainer_code){
    		this.isarr = true;
    		this.arrtit = "资格证书号不能为空";
    		return
    	}
    	if(!this.data.segment_grade){
    		this.isarr = true;
    		this.arrtit = "段位证书等级不能为空";
    		return
    	}
    	if(!this.res){
    		this.isarr = true;
    		this.arrtit = "调整原因不能为空";
    		return
    	}
    	this.change = false;
    },
    cancelcon(){
    	this.isarr = false;
    	this.getList();
    	this.change = false;
    },
    notcheck(){
    	this.title = "年审不合格";
    	this.addmenu = true;
    	this.result = "";
    	this.isarr = false;
    },
    cancheck(){
    	this.title = "取消资格";
    	this.addmenu = true;
    	this.result = "";
    	this.isarr = false;
    }
  },
   watch:{
      success:'dalogFn',
      fail:'dalogFn'
  },
}
</script>


<style lang='scss' scoped>
  .de-box{
    padding: 30px;
    text-align: left;
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
  .title-info{
    font-size:16px;
    color:rgba(26,26,26,1);
    font-weight: bold;
    padding-left: 12px;
    border-left: 4px solid RGBA(55, 142, 239, 1);
    margin: 30px 0 0 27px;
  }
   .tab-class{
    margin: 10px 0 0 40px;
    table{
      font-size: 14px;
      td{
        line-height: 40px;
      }
      td:first-child{
        width: 116px;
        background:rgba(250,250,250,1);
        color:rgba(153,153,153,1);
        text-align: right;
        vertical-align: top;
      }
      td:nth-child(2){
        color:rgba(77,77,77,1);
        padding-left: 14px;
        text-align: left;
        width: 561px;
        select{
          width: 146px;
          height: 34px;
        }
        textarea{
         width:559px;
         height:120px; 
         background:rgba(255,255,255,1);
         border-radius: 2px ;
         border: 1px solid RGBA(204, 204, 204, 1);
         position: relative;
         top:15px;
        }
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
  .hr{
    height:2px; 
    background:rgba(230,230,230,1);
    margin:70px 0 20px 0;
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
  .list-cont{
    textarea{
      width:419px;
      height:86px; 
      border-radius: 2px;
      padding: 5px;
      box-sizing:border-box;
      border:1px solid #ccc;
    }
  }
  .dialog-footer{
    position: relative;
    .warn-in{
      position: absolute;
      width: 220px;
    }
  }
  .red{
    color: red;
    margin-right: 5px;
  }
  .box-shadow .el-dialog__body{
    padding: 9px 20px;
  }
  .tab-color{
  	background: RGBA(250, 250, 250, 1);
  	text-align: center;
  	width:688px;
	height:150px;
	margin: 10px 0 20px 40px;
	font-size: 12px;
	color: RGBA(77, 77, 77, 1);
	td{
		line-height: 50px;
	}
	td:nth-child(2n-1){
		text-align: right;
	}
	td:nth-child(2n){
		text-align: left;
	}
	button{
		background: RGBA(31, 165, 255, 1);
		width:120px;
		height:34px;
		color: #fff;
		border: 1px solid RGBA(31, 165, 255, 1);
		outline: none;
		cursor: pointer;

		i{
			display: inline-block;
			height: 18px;
			width: 18px;
			background: url(../../assets/images/edit-slow.png);
			margin-right: 10px;
			position: relative;
			top:3px;
		} 
	} 
  }
  .dialog-tab{
  	td{
  		line-height: 50px;
  	}
  	td:first-child{
  		width: 165px;
  		vertical-align: top;
  		text-align: right;
  	}
  	td:last-child{
  		padding-left: 5px;
  		select{
  			width:146px;
			height:34px; 
  		}
  		input{
  			width:250px;
			height:34px;
			padding: 0; 
  		}
  		textarea{
  			width:420px;
			height:86px; 
			border-radius: 2px;
			position: relative;
			top:18px;
  		}
  	}
  }
</style>
