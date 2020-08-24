<script src="../router/index.js"></script>
<template>
    <div>
    <!--  用户名:<input type="text" v-model="tid"><br>
      密码:<input type="text" v-model="ttel">
      <button @click="Login()">登陆</button>-->


      <el-form label-width="100px" label-suffix="：" ref="fm">

        <el-form-item label="用户名">
          <el-input v-model="tid"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input show-password  v-model="ttel"></el-input>
        </el-form-item>

        <el-button type="primary" @click="Login()">登录</el-button>
        <el-button type="primary">取消</el-button>

      </el-form>



    </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data(){
      return{
        tid: "",
        ttel: "",
      }
    },methods:{
      Login:function () {
        var storage =window.sessionStorage;
        const thisV =this;
        this.$http.post("login?username="+thisV.tid+"&password="+thisV.ttel).then(function (response) {
            console.log(response);
            if(response !=500)
            {
              thisV.$http.post("/Cu/GetLoginOkMsg/"+thisV.tid+"").then(function (response) {
                console.log("登录后人员信息:",response[0].cstatus);
                if(response[0].cstatus ==1)
                {
                  console.log("开始获取名称:"+thisV.tid);
                  storage.setItem("token",response);
                  storage.setItem("Cname",thisV.tid);
                  thisV.$router.push({
                    path: "/Menu",
                    query: {
                      "Cname": thisV.tid
                    }
                  })
                }else
                {
                  /*判断如果登陆状态为0 */
                  thisV.$message({
                    message: '您的账号暂时不可以登陆',
                    type: 'warning'
                  });
                }
              })
            }else
            {
              alert("登录失败");
            }
            /*if(response !=null)
            {
              alert("可以登录");
              console.log("接收相应:",response);
              var storage =window.sessionStorage;
              storage.setItem("UserName",thisV.tid);
            }else
            {
              alert("账号密码不正确");
            }*/
          })
      }
    }

  }
</script>

<style scoped>

  .el-form {
    border: 1px solid pink;
    width: 30%;
    margin: 100px auto;
    box-shadow: 0 0 30px pink;
    border-radius: 25px;
    padding: 30px 40px;
    text-align: center;
  }

</style>
