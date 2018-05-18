<template>
   <common>
     <div slot="main" class="content-div">
       <ul class="nav-ul" v-show="childList.length>0">
           <!--  <router-link to="/system/userman/person"  tag="li" >角色管理</router-link>
            <router-link to="/system/userman/admin" tag="li">管理员</router-link> -->
            <template v-for="item in childList">
                <router-link :to="item.webrouter"  tag="li" >{{item.title}}</router-link>
            </template>
        </ul>
        <router-view></router-view>
     </div>
   </common>
</template>
<script>
import { mapState } from 'vuex'
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
    ...mapState({
      childList:"childList"
    })
  }
}
</script>


<style lang='scss' scoped>
  .content-div{
    background-color:#fff;
    padding: 29px 48px 32px 32px;
  }
</style>