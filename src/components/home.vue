<template>
   <common>
     <div slot="main" class="content-div">
        <ul class="show-sys">
          <li>
            <span>操作系统:</span>
            {{data.OS}}
          </li>
          <li>
            <span>web服务器:</span>
            {{data.SERVER}}
          </li>
          <li>
            <span>PHP版本:</span>
            {{data.VERSION}}
          </li>
           <li>
            <span>PHP运行方式:</span>
            {{data.OPERATION}}
          </li>
          <li>
            <span>MySQL版本:</span>
            {{data.MYSQL}}
          </li>
          <li>
            <span>最大上传文件:</span>
            {{data.MAX_SIZE}}
          </li>
          <li>
            <span>PHP最大执行时长:</span>
            {{data.TIME_LIMIT}}
          </li>
          <li>
            <span>环境最大剩余空间:</span>
            {{data.SPACE_SIZE}}
          </li>
        </ul>


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
   </common>
</template>
<script>
import {mapState} from "vuex"
export default {
  data () {
    return {
      success:false,
      suinfo:"",
      fail:false,
      failinfo:"",
    }
  },
  mounted(){
    //this.getSystem();
  },
  methods:{
    
  },
  computed:{
    ...mapState({
      data:"system"
    })
    
  }
}
</script>


<style lang='scss' scoped>
  .show-sys{
    text-align: left;
    font-size: 14px;
    padding-top:26px;
    margin:0px 0 0 35px;
    li{
      line-height: 40px;
      span{
        display: inline-block;
        height: 40px;
        background-color: RGBA(250, 250, 250, 1);
        width: 130px;
        text-align: right;
        padding-right: 8px;
        margin-right: 14px;
      }
    }
  }
</style>
