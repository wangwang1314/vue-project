<template>
   <common>
     <div slot="main" class="content-div">
       
        <router-view></router-view>
     </div>
   </common>
</template>
<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
   // console.log(this.$route.path.split("/"))
  },
  computed:{
   
  }
}
</script>


<style lang='scss' scoped>
  .content-div{
    background-color:#fff;
    min-height: 620px;
  }
</style>
