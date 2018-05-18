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
     
    }
  },
  mounted(){
  // console.log("sssss")
   this.goFn()
   
  },
  methods:{
    goFn(){
      
    }
  },
  computed:{
    ...mapState({
      childList:"childList"
    })
  },
  watch:{
    "$route":'goFn'
  }
}
</script>


<style lang='scss' scoped>
  .content-div{
    background-color:#fff;
    min-width: 1127px;
  }
   .nav-ul{
        height: 36px;
        border-bottom:2px solid #e6e6e6;
    }
    .nav-ul li{
        width: 120px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        float: left;
        font-size: 14px;
        color: #4D4D4D;
        cursor: pointer;
    }
    .nav-ul li.router-link-active{
        border-bottom:2px solid #378EEF;
        color: #378EEF;
    }
</style>