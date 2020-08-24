<script src="../router/index.js"></script>
<template>
  <div>
    <el-container>

      <el-header>
        <el-dropdown trigger="click" style="margin-top: 10px; margin-left: 1700px;">
          <el-avatar :size="40" shape="square" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"></el-avatar>
          <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom"></i>
            </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="Person">个人信息</el-dropdown-item>
            <el-dropdown-item command="EditPwd">修改密码</el-dropdown-item>
            <el-dropdown-item command="Login">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>



<!--Menu?Cname=chenli-->
      </el-header>
    </el-container>

    <el-container style="height: 720px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">

        <el-menu router>
          <!--表面绑v-for会出现key错误 所以要声明key key就为遍历名称-->
          <!--获取菜单名-->
          <el-submenu v-for="(a,index) in Parent" v-if="a.crid ==RoleId" :key="index" :index="index+''">
            <!--获取一级菜单-->
            <template slot="title"><i class="el-icon-message"></i>{{a.customermodule.mname}}</template>
            <!-- &lt;!&ndash;获取二级菜单&ndash;&gt;-->
            <el-menu-item v-for="(item2,index2) in Children" :key="index2" :index2="index2+''" :index="item2.gnames" v-if="a.mid ==item2.mid">{{item2.gname}}</el-menu-item>


          </el-submenu>
        </el-menu>





      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>

    </el-container>
    <el-footer></el-footer>

  </div>
</template>

<script>
  import axios from 'axios'

  var thisLoginOkMsg =sessionStorage.getItem("token");

  export default {

    data(){
      return{
        Parent: [],
        Children: [],
        RoleId: "",
        ChildrenMid: "",
      }
    },
    created()
    {
      const thisV =this;
      this.GetThisName();
      this.GetLoginOkParent();
      this.GetLoginOKChild();
    },methods:{
      /*获取登陆信息  查询登录人的详细信息*/
      GetThisName:function () {
        var thisName =window.sessionStorage.getItem("Cname");
        const thisV =this;
        if(thisName !=null)
        {
           /*this.$http.post("/GetLoginOkMsg/Cname="+thisName+"?token="+thisLoginOkMsg+"").then(function (response) {
             console.log("获取相应:",response);
           })*/
           this.$http.post("/Cu/GetLoginOkMsg/"+thisName+"").then(function (response) {
             console.log("获取人员信息",response);

               thisV.RoleId =response[0].customerrolemodule.crid;

           })
        }
      },
      /*获取登录人的一级节点*/
      GetLoginOkParent:function () {
        const thisV =this;
        this.$http.post("/Cu/showCustomerrolemodule").then(function (response) {
          thisV.Parent =response;
        })
      },
      /*获取登陆人的二级节点*/
      GetLoginOKChild:function () {
        const thisV =this;
        this.$http.post("Cu/showCustomerfun").then(function (response) {
          console.log("二级菜单:",response)
          thisV.Children =response;
        })
      }
    }
  }


</script>

<style scoped>

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

</style>
