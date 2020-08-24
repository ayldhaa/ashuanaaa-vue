<script src="../router/index.js"></script>

<template>
    <div>
      <el-button type="primary" plain>员工添加</el-button>

      <el-button type="primary" plain @click="UpRole()">员工角色分配</el-button>


      <el-button type="danger" plain @click="showCustomerStatus()">员工禁用</el-button>


      <el-table
        :data="tableData.filter(data => !search || data.cname.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-table-column
          label="员工编号"
          prop="cid">
        </el-table-column>

        <el-table-column
          label="员工姓名"
          prop="cname">
        </el-table-column>

        <el-table-column
          label="真实姓名"
          prop="ctname">
        </el-table-column>

        <el-table-column
          label="手机号"
          prop="ctelphone">
        </el-table-column>


        <el-table-column
          label="性别"
          prop="csex">
        </el-table-column>

        <el-table-column
          label="职位"
          prop="customerRole.crname">
        </el-table-column>


        <el-table-column
          label="登陆状态"
          prop="cstatus">
        </el-table-column>




        <el-table-column
          align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
          </template>

          <template slot-scope="scope">
            <el-button  type="primary" plain  @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button  type="danger"  plain  @click="DeleteCustomer(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

     <el-pagination
        background
        layout="prev, pager, next"
        :page-size="5"
        :total="total"
        @current-change="page">
      </el-pagination>


      <!--员工禁用模态-->
      <el-dialog :visible.sync="dialogAddgsVisible"  @close="closeDialogAddgsVisible">

        <el-table
          :data="tableData.filter(data => !search || data.cname.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
          <el-table-column
            label="员工编号"
            prop="cid">
          </el-table-column>

          <el-table-column
            label="员工姓名"
            prop="ctname">
          </el-table-column>


          <el-table-column
            label="登陆状态"
            prop="cstatus">
          </el-table-column>

          <el-table-column align="right">
            <template slot-scope="scope">
              <el-button  type="primary" plain  @click="UpCustomerStatusTow(scope.$index, scope.row)">恢复</el-button>

              <el-button  type="danger" plain  @click="UpCustomerStatus(scope.$index, scope.row)">禁用</el-button>

            </template>
          </el-table-column>

        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="5"
          :total="total"
          @current-change="page">
        </el-pagination>
      </el-dialog>


      <!--员工角色分配-->

      <el-dialog :visible.sync="UpCustomerRole"  @close="closeDialogAddgsVisible">

        <el-table
          :data="tableData.filter(data => !search || data.cname.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
          <el-table-column
            label="员工编号"
            prop="cid">
          </el-table-column>

          <el-table-column
            label="员工姓名"
            prop="ctname">
          </el-table-column>

          <el-table-column
            label="职位"
            prop="customerRole.crname">
          </el-table-column>




          <el-table-column align="right">
            <template slot-scope="scope">

              <el-button  type="primary" plain  @click="showUpRoleMsg(scope.$index, scope.row)">角色分配</el-button>

            </template>
          </el-table-column>

        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="5"
          :total="total"
          @current-change="page">
        </el-pagination>
      </el-dialog>

      <!--员工角色分配窗口-->

      <el-dialog :visible.sync="UpCustomerRoleMsg"  @close="closeDialogAddgsVisible">

        <el-form  ref="form" :model="form" label-width="80px" style="width:600px;">

          <el-form-item label="员工编号">
            <el-input v-model="form.cid" :readonly="true"></el-input>
          </el-form-item>

          <el-form-item label="员工姓名">
            <el-input v-model="form.cname" :readonly="true"></el-input>
          </el-form-item>


          <el-form-item label="员工角色">
            <el-select v-model="form.crid" placeholder="请选择角色">
              <el-option v-for="a in CustomerRole" :key="a.crid" :label="a.crname" :value="a.crid"></el-option>
            </el-select>
          </el-form-item>



          <el-form-item>
            <el-button type="primary" @click="TrueUpRole('form')">立即分配</el-button>
            <el-button @click="Close()">取消</el-button>
          </el-form-item>
        </el-form>



      </el-dialog>









    </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'second',
        tableData: [],
        search: '',
        loading: true,
        total: 0,
        dialogAddgsVisible: false,
        UpCustomerRole: false,
        UpCustomerRoleMsg: false,
        ruleForm: {
          cname: "",
        },
        form: {
          cid: '',
          cname: '',
          Crname: ''
        },
        CustomerRole: [],

      };
    },
    methods: {
      handleClick(tab, event) {

      },
      handleEdit(index, row) {

      },
      /*删除员工方法*/
      DeleteCustomer(index, row) {
        const thisV =this;



            this.$prompt('输入确认删除,开始验证您的权限', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(({ value }) => {
              if(value =="确认删除")
              {
                this.$http.post("/CuAll/DeleteCustomer/"+row.cid+"").then(function (response) {
                  if(response ==1)
                  {
                    thisV.$message({
                      showClose: true,
                      message: '删除员工成功',
                      type: 'success'
                    });
                    thisV.showCustomer();
                  }else
                  {
                    thisV.$message({
                      showClose: true,
                      message: '对不起,您的权限不足,不能使用该功能',
                      type: 'warning'
                    });
                  }
                })
              }else
              {
                this.$message({
                  type: 'info',
                  message: '取消删除'
                });
              }

            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消删除'
              });
            });


      },

      /*查询员工方法*/
      showCustomer()
      {
        const thisV =this;
        this.$http.post("/CuAll/showCustomerPage/1").then(function (response) {
          console.log("查询成功",response.list[0].cstatus);
          thisV.loading =false;
          thisV.tableData =response.list;
          thisV.total =response.total;
          for(var i=0;i<thisV.tableData.length;i++)
          {
            thisV.tableData[i].cstatus =thisV.tableData[i].cstatus ==1?"正常":"禁用";
          }

        })
      },

      /*分页方法*/
      page(pageNum)
      {
        const thisV =this;
        this.$http.post("/CuAll/showCustomerPage/"+pageNum+"").then(function (response) {
          thisV.tableData =response.list;
          for(var i=0;i<thisV.tableData.length;i++)
          {
            thisV.tableData[i].cstatus =thisV.tableData[i].cstatus ==1?"正常":"禁用";
          }
        })
      },
      /*模态框初始化*/
      closeDialogAddgsVisible(){
        /*this.$refs.addForm.resetFields();*///element封装的方法,清空模态框的值
        this.title="" //初始化title的值
        this.addForm={//初始化addForm中的值
          name:"",
          sort:"",
        }
      },
      /*员工状态方法显示*/
      showCustomerStatus(index,row)
      {
        this.dialogAddgsVisible=true;
      },
      /*员工状态修改方法 禁用*/
      UpCustomerStatus(index,row)
      {
        const thisV =this;
        this.$prompt('请输入确认禁用,开始验证您的权限', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          if(value =="确认禁用")
          {
            if(row.cstatus =="正常")
            {
              this.$http.post("/CuAll/UpCustomerStatus/"+row.cid+"").then(function (response) {
                console.log("修改登陆状态值:",response);
                if(response ==1)
                {
                  thisV.$message({
                    showClose: true,
                    message: '禁用该员工成功',
                    type: 'success'
                  });
                  thisV.dialogAddgsVisible = false;
                  thisV.showCustomer();
                }else
                {
                  thisV.$message({
                    showClose: true,
                    message: '对不起,您的权限不足,不能使用该功能',
                    type: 'warning'
                  });
                }
              })
            }else {
              this.$message({
                showClose: true,
                message: '该员工已经被禁用',
                type: 'warning'
              });
            }

          }else
          {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },

      /*员工状态修改方法 */
      UpCustomerStatusTow(index,row) {
        const thisV = this;
        this.$prompt('请输入确认恢复,开始验证您的权限', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          if (value == "确认恢复") {
            if (row.cstatus == "禁用") {
              this.$http.post("/CuAll/UpCustomerStatusTow/" + row.cid + "").then(function (response) {
                console.log("修改登陆状态值111:", response);
                if (response == 1) {
                  thisV.$message({
                    showClose: true,
                    message: '恢复该员工成功',
                    type: 'success'
                  });
                  thisV.dialogAddgsVisible = false;
                  thisV.showCustomer();
                } else {
                  thisV.$message({
                    showClose: true,
                    message: '对不起,您的权限不足,不能使用该功能',
                    type: 'warning'
                  });
                }
              })
            } else {
              this.$message({
                showClose: true,
                message: '该员工可以正常登陆',
                type: 'warning'
              });
            }

          } else {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },

      /*员工角色分配方法*/

      UpRole:function () {
        this.UpCustomerRole =true;
      },

      /*员工角色分配窗口*/
      showUpRoleMsg:function (index,row) {
        const thisV =this;
        this.UpCustomerRoleMsg =true;
        this.showCustomerRole();
        this.$http.post("/CuAll/showCustomerId/"+row.cid+"").then(function (response) {
          console.log("角色方法获取员工信息:",response[0]);
          thisV.form.cid =response[0].cid;
          thisV.form.cname =response[0].ctname;
          /*if(response[0].customerRole.crid !=null)
          {
            thisV.form.Crname =response[0].customerRole.crid;
          }*/
          if(response[0].customerRole !=null)
          {
            thisV.$message({
              showClose: true,
              message: '成功获取该员工角色',
              type: 'success'
            });
            thisV.form.crid =response[0].customerRole.crid;
          }else
          {
            thisV.$message({
              showClose: true,
              message: '该员工还没有分配角色',
              type: 'warning'
            });
          }

        })
      },

      /*确定修改角色方法*/

      TrueUpRole:function () {
        alert(this.form.cname);
        this.$http.post("/CuAll/UpCustomerRole",this.form).then(function (response) {
          console.log("获取对象方法");
        })
      },

      /*查询所有角色方法*/
      showCustomerRole()
      {
        const thisV =this;
        this.$http.post("/CuAll/showCustomerRole").then(function (response) {
          console.log("查询所有角色方法",response);
          thisV.CustomerRole =response;
        })
      },

      /*关闭窗口方法*/
      Close:function () {
        this.UpCustomerRoleMsg =false;
      }

    },
    created(){
      this.handleClick();
      this.showCustomer();
    }
  };
</script>

<style scoped>

</style>
