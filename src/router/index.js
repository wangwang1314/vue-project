import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Login from '@/components/login/login'
import Rslogin from '@/components/login/rslogin'


import Userman from '@/components/system/userman'
import Admin from '@/components/system/admin'
import Person from '@/components/system/person'
import Menu from '@/components/menu/index'
import Menuset from '@/components/menu/set'
import Menuadd from '@/components/menu/add'
import Menuall from '@/components/menu/all'

//导航栏设置
import Navigation from '@/components/navigation/index'
import Addnav from '@/components/navigation/addnav'
import Allnav from '@/components/navigation/allnav'
import Navmenu from '@/components/navigation/navmenu'

//banner设置
import Banner from '@/components/banner/index'
import Addban from '@/components/banner/addban'
import Allban from '@/components/banner/allban'
import Banmenu from '@/components/banner/banmenu'

//机构设置
import Organizational from '@/components/organizational/index'
import Organdetail from '@/components/organizational/detail'
import Organlist from '@/components/organizational/list'
import Organexamine from '@/components/organizational/examine'
import Organchangeex from '@/components/organizational/changeex'
import Issuing from '@/components/organizational/issuing'

//网站信息
import Information from '@/components/information/index'
import Inforbase from '@/components/information/info'
import Inforset from '@/components/information/set'
import Inforupload from '@/components/information/upload'

//友情链接
import Friendly from '@/components/friendly/index'
import Friendlyadd from '@/components/friendly/add'
import Friendlylist from '@/components/friendly/list'

//师资管理
import Teacher from '@/components/teacher/index'
import Teacherlist from '@/components/teacher/list'
import Teacherverification from '@/components/teacher/verification'
import Teacherdetail from '@/components/teacher/detail'
import Teacherexa from '@/components/teacher/exa'
import Teachermanexa from '@/components/teacher/manexa'
import Teacherstarm from '@/components/teacher/starm'
import Teacherstarc from '@/components/teacher/starchange'
import Teachermanc from '@/components/teacher/manchange'

//技术委员会
import Technical from '@/components/technical/index'
import TechnicalList from '@/components/technical/menberlist'
import Tncdetail from '@/components/technical/detail'
import Annual from '@/components/technical/annual'
import Addmenber from '@/components/technical/addmenber'
import Trainerdetail from '@/components/technical/trainerdetail'

//机构管理
import Activity from '@/components/activity/index'
import Activitylist from '@/components/activity/activitylist'
import Auditlist from '@/components/activity/auditlist'
import Detail from '@/components/activity/detail'
import Studetail from '@/components/activity/studetail'
import Atvapproval from '@/components/activity/atvapproval'
import Distribution from '@/components/activity/distribution'
import Exapproval from '@/components/activity/exapproval'
import Exdetail from '@/components/activity/exdetail'



//订单管理
import Order from '@/components/order/index'
import Stuorder from '@/components/order/stuorder'
import Orderstudetail from '@/components/order/studetail'
import Traorder from '@/components/order/traorder'
import Tradetail  from '@/components/order/tradetail'


//资讯管理

import News from '@/components/news/index'
import Newslist from '@/components/news/newslist'
import Addnew from '@/components/news/addnew'
import Examine from '@/components/news/examine'
import Editenew from '@/components/news/editenew'



Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/rslogin',
      name:'rslogin',
      component:Rslogin
    },
    {
      path:'/organizational',
      name:"organizational",
      component:Organizational,
      children:[
        {
          path:"/organizational/detail/:id",
          name:"organdetail",
          component:Organdetail
        },
        {
           path:"list",
          name:"organlist",
          component:Organlist
        },
        {
           path:"/organizational/examine/:id",
          name:"Organexamine",
          component:Organexamine
        },
        {
          path:"/organizational/changeex/:id",
          name:"Organchangeex",
          component:Organchangeex
        },{
          path:"/organizational/issuing/:id",
          name:"Issuing",
          component:Issuing
        }
      ] 
    },
    {
      path:'/teacher',
      name:"teacher",
      component:Teacher,
      children:[
        {
          path:"teacherlist",
          name:"teacherlist",
          component:Teacherlist
        },
        {
          path:"/teacher/teacherdetail/:id",
          name:"teacherdetail",
          component:Teacherdetail
        },
        {
          path:"/teacher/teacherstarm/:id",
          name:"teacherstarm",
          component:Teacherstarm
        },
         {
          path:"/teacher/teachermanexa/:id",
          name:"teachermanexa",
          component:Teachermanexa
        },
        {
          path:"/teacher/teacherverification/:id",
          name:"teacherverification",
          component:Teacherverification
        },
        {
          path:"/teacher/teacherexa/:id",
          name:"teacherexa",
          component:Teacherexa
        },
        {
          path:"/teacher/teacherstarc/:id",
          name:"teacherstarc",
          component:Teacherstarc
        },
        {
          path:"/teacher/teachermanc/:id",
          name:"teachermanc",
          component:Teachermanc
        }
      ] 
    },
    {
      path:'/system/userman',
      name:"userman",
      component:Userman,
      children:[
        {
          path:"admin",
          name:"userAdmin",
          component:Admin
        },
        {
          path:"person",
          name:"userPerson",
          component:Person
        },
      ] 
    },
    {
      path:'/menu',
      name:"menu",
      component:Menu,
      children:[
        {
          path:"set",
          name:"menuset",
          component:Menuset
        },
        {
          path:"add",
          name:"menuadd",
          component:Menuadd
        },
        {
          path:"all",
          name:"menuall",
          component:Menuall
        },
      ] 
    },
    {
      path:'/information',
      name:"information",
      component:Information,
      children:[
        {
          path:"inforset",
          name:"inforset",
          component:Inforset
        },
        {
          path:"inforbase",
          name:"inforbase",
          component:Inforbase
        },
        {
          path:"inforupload",
          name:"inforupload",
          component:Inforupload
        },
      ] 
    },
    {
      path:'/friendly',
      name:"friendly",
      component:Friendly,
      children:[
        {
          path:"list",
          name:"list",
          component:Friendlylist
        },
        {
          path:"add",
          name:"add",
          component:Friendlyadd
        },
      ] 
    },
    {
      path:'/navigation',
      name:"navigation",
      component:Navigation,
      children:[
        {
          path:"addnav",
          name:"addnav",
          component:Addnav
        },
        {
          path:"allnav",
          name:"allnav",
          component:Allnav
        },
        {
          path:"/navigation/navmenu/:id",
          name:"navmenu",
          component:Navmenu
        }
      ] 
    },
    {
      path:'/banner',
      name:"banner",
      component:Banner,
      children:[
        {
          path:"addban",
          name:"addban",
          component:Addban
        },
        {
          path:"allban",
          name:"allban",
          component:Allban
        },
        {
          path:"/banner/banmenu/:id",
          name:"banmenu",
          component:Banmenu
        }
      ] 
    },
    {
      path:'/technical',
      name:"Technical",
      component:Technical,
      children:[
        {
          path:'list',
          name:"list",
          component:TechnicalList
        },
        {
          path:'/technical/detail/:id',
          name:"tncdetail",
          component:Tncdetail

        },
        {
          path:"/technical/annual/:id",
          name:"annual",
          component:Annual
        },{
          path:"addmenber",
          name:"addmenber",
          component:Addmenber
        },{
          path:"trainerdetail/:id",
          name:"trainerdetail",
          component:Trainerdetail
        }
      ]
    },
    {
      path:"/activity",
      name:"activity",
      component:Activity,
      children:[
         {
          path:"list",
          name:"list",
          component:Activitylist
         },
         {
           path:"auditlist",
           name:"auditlist",
           component:Auditlist
         },
         {
               path:"/activity/detail/:id",
               name:"detail",
               component:Detail
        },
         {
               path:"/activity/exdetail/:id",
               name:"exdetail",
               component:Exdetail
        },
         {
               path:"/activity/exapproval/:id",
               name:"exapproval",
               component:Exapproval
        },
        {
               path:"/activity/studetail/:id",
               name:"studetail",
               component:Studetail
        },
        {
               path:"/activity/atvapproval/:id",
               name:"atvapproval",
               component:Atvapproval
        },
        {
               path:"/activity/distribution/:id",
               name:"distribution",
               component:Distribution
        }
       
         

      ]
    },
    {
        
       path:"/order",
       name:"order",
       component:Order,
       children:[
          {
            path:"/order/stulist",
            name:"stulist",
            component:Stuorder
          },
           {
            path:"/order/studetail/:id",
            name:"studetail",
            component:Orderstudetail
          },
           {
            path:"/order/traorder",
            name:"traorder",
            component:Traorder
          },
          {
            path:"/order/tradetail/:id",
            name:"tradetail",
            component:Tradetail
          }

       ]
    },
    {
      path:"/news",
      name:"news",
      component:News,
      children:[
        {
          path:"list",
          name:"newlist",
          component:Newslist
        },
        {
          path:"/news/addnew",
          name:"addnew",
          component:Addnew
        },
        {
           path:"/news/examine/:id/:sta",
           name:"examine",
           component:Examine
        },
        {
           path:"/news/editenew/:id/:sta",
           name:"editenew",
           component: Editenew
        }
       
      ]
    },
    {
      path:"*",
      redirect:"home"
    }  
  ]
})
