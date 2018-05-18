<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>
import './assets/css/reset.css';
export default {
  name: 'App'
}
</script>

<style >
html,body{
  margin:0;
}
#app {
  font-family: '微软雅黑','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.el-button--small{
    float: right;
    margin-left: 20px;
}
.el-alert--warning{
  background-color:white;
  color:RGBA(248, 76, 76, 1);
  font-size: 12px;
}
.el-alert__closebtn{
  display: none
}
.el-alert{
  padding:10px 0;
}


.res-dialog .success-bg{height: 8px; background-color: #5CB85C;}
.suc-icon{display: block; width:26px; height:26px; background: url(./assets/images/suc-icon.png) no-repeat center;margin: 0 auto;margin-top: 10px;margin-bottom: 9px;}
.res-dialog .res-text{text-align: center;font-size: 14px; padding-bottom: 15px;}
.res-dialog .failure-bg{height: 8px; background-color: #F84C4C;}
.res-dialog .fail-icon{display: block; width:26px; height:26px; background: url(./assets/images/fail-icon.png) no-repeat center;margin: 0 auto;margin-top: 10px;margin-bottom: 9px;}

.nopadding .el-dialog__header{padding:0 !important;}
.nopadding .el-dialog__body{padding:0 !important;}
.borderred input{border:none!important;border-radius: 6px;} 
.content-div{
  background-color: #fff;
  min-height: 760px;
}

.box-shadow .el-dialog__footer{
    box-shadow: 0 0 4px 1px rgba(0,0,0,.2)
}

</style>
