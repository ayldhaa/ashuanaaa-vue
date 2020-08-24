import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Menu from '@/components/Menu'
import TestCustomerShow from '@/components/Customer/TestShows'
import RoleCheck from '@/components/Customer/CustomerRoleCheck'

Vue.use(Router)

const routepush = Router.prototype.push;

// 修改push方法
Router.prototype.push = function(path){
  return routepush.call(this,path).catch(err=>{});
};


export default new Router({
  routes: [
    {
      path: '/',
      name: '员工管理',
      component: Menu,
      redirect: "/Login",
      children: [
        {
          path: '/CustomerShow',
          name: '员工测试',
          component: TestCustomerShow,
        },
        {
          path: '/RoleCheck',
          component: RoleCheck
        }
      ]
    },
    {
      path: '/Login',
      component: Login
    },
    {
      path: '/Menu',
      component: Menu
    }
  ]
})
