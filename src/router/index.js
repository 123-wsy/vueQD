import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login";
import Home from "../views/Home";
import ArtList from "../views/art/ArtList";
import ArtPublish from "../views/art/ArtPublish";
import Column from "../views/column/Column";
import Data from "../views/data/Data";
import User from "../views/user/User";

Vue.use(VueRouter)

//写路由
const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    hidden:true
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    hidden:true
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta:{
      isFirst: false,
      a:'文章管理',
      icon:'el-icon-document',
      roles:['ROLE_admin','ROLE_user','ROLE_dba']
    },
    children:[
      {
        path: '/ArtList',
        name: 'artList',
        component: ArtList,
        meta:{
          a:'文章列表',
          roles:['ROLE_admin','ROLE_user','ROLE_dba']
        }
      },
      {
        path: '/ArtPublish',
        name: 'artPublish',
        component: ArtPublish,
        meta:{
          a:'发布文章',
          roles:['ROLE_admin','ROLE_user','ROLE_dba']
        }
      }
    ]
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta:{
      isFirst:true
    },
    children:[
      {
        path: '/Column',
        name: 'column',
        component: Column,
        meta:{
          a:'栏目列表',
          icon:'el-icon-s-order',
          roles:['ROLE_admin','ROLE_dba']
        }
      },
      {
        path: '/Data',
        name: 'data',
        component: Data,
        meta:{
          a:'数据统计',
          icon:'el-icon-s-data',
          roles:['ROLE_admin','ROLE_dba']
        }
      },
      {
        path: '/User',
        name: 'user',
        component: User,
        meta:{
          a:'用户列表',
          icon:'el-icon-s-custom',
          roles:['ROLE_admin','ROLE_dba']
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
