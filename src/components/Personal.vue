<template>
  <div>
    <!-- <el-button @click="al()"></el-button> -->
    <template>
      <Tabs>
        <TabPane label="个人中心" icon="md-person">
          <Row>
            <Col span="6" push="8">
              <Form :model="formItem" label-position="top">
                <FormItem label="职工号" size="60px">
                  <Input
                    v-model="formItem.username"
                    placeholder="Enter something..."
                    size="large"
                    readonly
                  ></Input>
                </FormItem>
                <FormItem label="姓名">
                  <Input v-model="formItem.name" placeholder="Enter something..." size="large"></Input>
                </FormItem>
                <FormItem label="性别">
                  <Select v-model="formItem.sex" size="large">
                    <Option value="男">男</Option>
                    <Option value="女">女</Option>
                  </Select>
                </FormItem>
                <FormItem label="年龄">
                  <Input v-model="formItem.age" placeholder="Enter something..." size="large"></Input>
                </FormItem>
                <FormItem label="电话">
                  <Input v-model="formItem.number" placeholder="Enter something..." size="large"></Input>
                </FormItem>
                <FormItem label="邮箱">
                  <Input v-model="formItem.mail" placeholder="Enter something..." size="large"></Input>
                </FormItem>
                <Button @click="handSave()" type="warning">保存</Button>
                <Button @click="modal11 = true">修改密码</Button>
              </Form>
              <Modal v-model="modal11" width="360">
                <p slot="header" style="color:#f60;text-align:center">
                  <Icon type="ios-information-circle"></Icon>
                  <span>修改密码</span>
                </p>
                <div style="text-align:center">
                  请输入密码
                  <Input type="password" v-model="password" password />
                  <br />请再次输入
                  <Input type="password" v-model="password1" password />
                </div>
                <div slot="footer">
                  <Button type="primary" size="large" long @click="restPas()">确定修改</Button>
                </div>
              </Modal>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </template>
  </div>
</template>

<script>
import VueEvent from "../model/VueEvent.js";
import storage from "../store/storage.js";
import Axios from "axios";
export default {
  data() {
    return {
      password: "",
      password1: "",
      modal11: false,
      editIndex: -1,
      index: 0,
      xiugai: "修改",
      readonly: true,
      formItem: {},
      username: "",
      list: []
    };
  },
  methods: {
    handSave(key) {
      let _this = this;
      Axios.get("/api/personal/updateUser", {
        params: {
          name: _this.formItem.name,
          sex: _this.formItem.sex,
          age: _this.formItem.age,
          number: _this.formItem.number,
          mail: _this.formItem.mail,
          username: _this.username
        }
      }).then(res => {
        _this.$Message.success("修改成功");
      });
    },

    findSimpleUserInfoByUsername() {
      let _this = this;
      Axios.get("/api/personal/findSimpleUserInfoByUsername", {
        params: {
          username: _this.username
        }
      }).then(res => {
        _this.formItem = res.data.data;
      });
    },
    restPas() {
      if (this.password != this.password1) {
        this.$Message.error("输入密码不一致");
      } else {
        let _this = this;
        Axios.get("/api/personal/resetPassword", {
          params: {
            userId: _this.formItem.id,
            password: _this.password
          }
        }).then(res => {
          this.modal11 = false;
          this.$Message.success("修改成功");
        });
      }
    }
  },
  created: function() {
    var _this = this;
    _this.username = storage.get("username");
    _this.findSimpleUserInfoByUsername();
  }
};
</script>

<style>
</style>