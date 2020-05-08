<template>
  <div>
    <div class="min1" align="center">
      <br />

      <div align="center">
        <b>
          <font size="20px">就诊</font>
        </b>
        <font size="20px">管理系统</font>
      </div>

      <br />
      <br />
      <div class="demo-input-suffix">
        <el-row :gutter="0">
          <el-col :span="1" :push="10">用户名:</el-col>
          <el-col :span="4" :push="10">
            <el-input placeholder="请输入内容" v-model="username" clearable></el-input>
          </el-col>
          <el-col :span="11"></el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="8"></el-col>
          <el-col :span="1" :push="10">密码：:</el-col>
          <el-col :span="4" :push="10">
            <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
          </el-col>
          <el-col :span="11"></el-col>
        </el-row>
        <br />

        <el-row :gutter="0">
          <el-col :span="8"></el-col>
          <el-col :span="1" :push="12">
            <el-button type="primary" round @click="login()">登录</el-button>
          </el-col>
          <el-col :span="1" :push="12">
            <el-button round @click="reset()">清空</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import VueEvent from "../model/VueEvent.js";
import storage from "../store/storage.js";
import { mapMutations } from "vuex";
import Axios from "axios";
import qs from "qs";

export default {
  data() {
    return {
      username: "",
      password: "",
      menuList: [],
      listitem: [
        { name: "个人中心", value: "personal" },
        { name: "退出", value: "logout" }
      ]
    };
  },
  methods: {
    ...mapMutations(["changeLogin"]),
    reset() {
      (this.username = ""), (this.password = "");
    },
    login() {
      let _this = this;
      Axios.post(
        "/api/pub/login",
        {
          username: _this.username,
          password: _this.password
        },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        }
      )
        .then(Response => {
          this.$message({
            type: "success",
            message: Response.data.data.msg
          });

          _this.token = Response.data.data.session_Id;
          // alert(_this.token)
          this.$store.commit("set_token", _this.token);

          //查寻当前用户信息
          storage.set("username", this.username);
          // localStorage.setItem('userid',Response.data.data.id)
          storage.set("listitem", JSON.stringify(_this.listitem));
          // alert("2")
          this.$router.push({ path: "/" });
          this.open1();
          location.reload();
        })
        .catch(error => {
          alert("11" + error);
        });
    },
    //查询用户拥有的菜单

    open1() {
      this.$notify({
        title: "成功",
        message: "这是一条成功的提示消息",
        type: "success"
      });
    }
  }
};
</script>

<style>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.min1 {
  width: 100%;
  height: 1080px;
  background: url(../img/bg123.png) no-repeat;
}
</style>