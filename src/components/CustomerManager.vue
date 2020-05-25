<template>
  <div class="as1">
    <!-- Form -->
    <el-button type="text" @click="dialogFormVisible = true">添加新用户</el-button>

    <el-dialog title="添加新用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="账号名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false,addUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 用户列表 -->
    <template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="工号">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>性别: {{ scope.row.sex }}</p>
              <p>年龄: {{ scope.row.age }}</p>
              <p>电话: {{ scope.row.number }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="邮箱">
          <template slot-scope="scope">
            <span>{{ scope.row.mail }}</span>
          </template>
        </el-table-column>
        <el-table-column label="电话">
          <template slot-scope="scope">
            <span>{{ scope.row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色">
          <template slot-scope="scope">
            <el-tag
              v-for="tag in scope.row.roleList"
              :key="tag.id"
              :type="tag.type"
            >{{tag.description}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" style="margin-right: 10px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row),dialogFormVisible1 = true"
            >编辑</el-button>
            <el-button size="mini" type="danger" @click="handleReset(scope.$index, scope.row)">密码重置</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 编辑 -->
    <!-- <el-button type="text" @click="dialogFormVisible1 = true">打开嵌套表单的 Dialog</el-button> -->

    <el-dialog title="用户信息" :visible.sync="dialogFormVisible1">
      <el-form :label-position="labelPosition1" label-width="80px" :model="formLabelAlign1">
        <el-form-item label="名称">
          <el-input v-model="formLabelAlign1.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="formLabelAlign1.age"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formLabelAlign1.mail"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formLabelAlign1.number"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="formLabelAlign1.sex" placeholder="性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="roles" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in options"
              :key="item.id"
              :label="item.description"
              :value="index"
            ></el-option>
          </el-select>
          <Button @click="addRole(formLabelAlign1.id,roles)">添加</Button>
        </el-form-item>
      </el-form>
      <el-tag
        :key="tag.id"
        v-for="tag in formLabelAlign1.roleList"
        closable
        :disable-transitions="false"
        @close="handleClose1(tag.id,formLabelAlign1.id)"
      >{{tag.description}}</el-tag>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible1 = false,updataUser()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Axios from "axios";
export default {
  data() {
    return {
      roles: "",
      options: [],
      dialogFormVisible: false,
      form: [],
      formLabelWidth: "100px",
      tableData: [],
      dialogFormVisible1: false,
      formLabelWidth1: "120px",
      labelPosition1: "right",
      formLabelAlign1: {},
      inputVisible: false
    };
  },
  methods: {
    handleEdit(index, row) {
      this.formLabelAlign1 = row;
      // console.log(index, row);
    },
    //删除用户
    handleDelete(index, row) {
      this.$Modal.confirm({
        title: "警告",
        content: "确定要删除吗",
        onOk: () => {
          var _this = this;
          Axios.get("api/admin/deleteUserByUserId", {
            params: {
              userId: row.id
            }
          }).then(res => {
            this.findAllUsers();
            this.$Message.info("删除成功");
          });
        },
        onCancel: () => {
          this.$Message.info("取消");
        }
      });
    },
    handleClose1(tag, userid) {
      //  console.log("tag", tag);
      //  console.log("tag", userid);
      this.formLabelAlign1.roleList.splice(
        this.formLabelAlign1.roleList.indexOf(tag),
        1
      );
      var _this = this;
      Axios.get("api/admin/deleteRoleByUR", {
        params: {
          userId: userid,
          roleId: tag
        }
      }).then(res => {});
    },
    findAllUsers() {
      var _this = this;
      Axios.get("api/admin/findAllUsers").then(res => {
        _this.tableData = res.data.data;
        //  console.log("_this.form",_this.form)
      });
    },
    findAllRole() {
      var _this = this;
      Axios.get("api/admin/findAll").then(res => {
        _this.options = res.data.data;
        //  console.log("_this.options",_this.options)
      });
    },
    //给用户添加角色
    addRole(userid, row) {
      for (
        let index = 0;
        index < this.formLabelAlign1.roleList.length;
        index++
      ) {
        if (this.formLabelAlign1.roleList[index].id == this.options[row].id) {
          this.$message({
            message: "已拥有该角色，请勿重复添加",
            type: "warning"
          });
          return;
        }
      }
      this.formLabelAlign1.roleList.push(this.options[row]);
      var _this = this;
      Axios.get("api/admin/makeRole", {
        params: {
          userId: userid,
          roleId: _this.options[row].id
        }
      }).then(res => {});
    },
    //更新用户信息
    updataUser() {
      var _this = this;
      Axios.get("api/admin/updateUser", {
        params: {
          name: _this.formLabelAlign1.name,
          age: _this.formLabelAlign1.age,
          mail: _this.formLabelAlign1.mail,
          sex: _this.formLabelAlign1.sex,
          number: _this.formLabelAlign1.number,
          id: _this.formLabelAlign1.id
        }
      }).then(res => {});
    },
    //重置密码
    handleReset(index, row) {
      var _this = this;
      Axios.get("api/admin/resetPassword", {
        params: {
          password: 123,
          userId: row.id
        }
      }).then(res => {});
    },
    addUser() {
      var _this = this;
      Axios.get("api/admin/addUser", {
        params: {
          username: _this.form.username,
          name: _this.form.name,
          sex: _this.form.sex
        }
      }).then(res => {
        this.findAllUsers();
        _this.form = [];
      });
    }
  },
  mounted: function() {
    // this.$nextTick(()=>{

    // })
    this.findAllRole();
    this.findAllUsers();
  }
};
</script>