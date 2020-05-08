<template>
  <div class="sz">
    <div>
      <el-tabs :tab-position="tabPosition" style="height: 600px;" @tab-click="aa">
        <el-tab-pane label="挂号" v-show="false">
          <el-row>
            <el-col :span="6" :push="1">
              <Input type="text" placeholder="身份证号" v-model.trim="paidcard" />
            </el-col>
            <el-col :span="6" :push="1">
              <Button type="success" large @click="findPatient(paidcard)">查询</Button>
            </el-col>

            <el-col :span="6" :push="1">
              <Input type="text" placeholder="姓名" v-model.trim="patientName" />
            </el-col>

            <el-col :span="6" :push="1">
              <Button type="success" large @click="findByName()">查询</Button>
            </el-col>
          </el-row>
          <br />
          <hr />
          <Table :columns="columns" :data="data1" v-if="editIndex === index">
            <template slot-scope="{ row, index }" slot="idcard">
              <span>{{ row.idcard }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="name">
              <span>{{ row.name }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="age">
              <span>{{ row.age }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="sex">
              <span>{{ row.sex }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="number">
              <span>{{ row.number }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="action">
              <Button type="parmary" @click="remove(row)">选择</Button>
            </template>
          </Table>

          <Affix :offset-top="700" v-if="editIndex === index">
            <Button type="dashed" long @click="goBack">返回</Button>
          </Affix>

          <Form :model="patientForm" label-position="top" v-else>
            <FormItem label="身份证" size="60px">
              <Input
                v-model.trim="patientForm.idcard"
                placeholder="Enter something..."
                size="large"
                readonly
              ></Input>
            </FormItem>
            <FormItem label="姓名">
              <Input v-model="patientForm.name" placeholder="Enter something..." size="large"></Input>
            </FormItem>
            <FormItem label="手机号">
              <Input v-model="patientForm.number" placeholder="Enter something..." size="large"></Input>
            </FormItem>
            <FormItem label="余额">
              <Input v-model="patientForm.money" placeholder="Enter something..." size="large"></Input>
            </FormItem>
            <FormItem label="科室">
              <Select v-model="patientForm.department" size="large">
                <Option v-for="de in department" :key="de.id" :label="de.name" :value="de.name"></Option>
              </Select>
            </FormItem>

            <Button type="primary" @click="onSubmit()">确定</Button>
            <Button @click="clearForm()">清除</Button>
          </Form>
        </el-tab-pane>

        <el-tab-pane label="挂号记录">
          <template>
            <el-table
              :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%"
            >
              <el-table-column label="时间" prop="create_time"></el-table-column>
              <el-table-column label="身份号" prop="idcard"></el-table-column>
              <el-table-column label="姓名" prop="name"></el-table-column>
              <el-table-column label="电话" prop="number"></el-table-column>
              <el-table-column label="科室" prop="department"></el-table-column>
              <el-table-column label="余额" prop="money"></el-table-column>
              <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                  <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
                </template>
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click.native.prevent="deleteRow(scope.$index, tableData),handleDelete(scope.$index, scope.row)"
                  >Delete</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="pages"
            :page-size="8"
            @current-change="findPatienthistory"
          ></el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      patientName: "",
      paidcard: "",
      index: 1,
      columns: [
        {
          title: "身份证号",
          slot: "idcard"
        },
        {
          title: "姓名",
          slot: "name"
        },
        {
          title: "年龄",
          slot: "age"
        },
        {
          title: "性别",
          slot: "sex"
        },
        {
          title: "电话",
          slot: "number"
        },
        {
          title: "操作",
          slot: "action"
        }
      ],
      data1: [],
      editIndex: -1, // 当前聚焦的输入框的行数
      rules: {
        name: [
          { required: true, message: "请输入idcard" },
          { min: 3, max: 18, message: "长度在 3 到 5 个字符" }
        ]
      },

      idcard: "",
      a: false,
      tabPosition: "left",
      department: [],
      patientForm: {
        id: "",
        name: "",
        age: "",
        sex: "",
        number: "",
        money: "",
        idcard: "",
        department: "",
        createTime: "",
        status: ""
      },
      tableData: [],
      search: "",
      keysize: 1,
      pages: 0,
      nowPage: ""
    };
  },

  created: function() {
    var _this = this;
    this.findDepar();
    this.findPatienthistory(_this.keysize);
  },
  methods: {
    goBack() {
      this.index = 1;
    },
    //通过病人name查询所有用户
    findByName() {
      var _this = this;
      Axios.get("/api/registered/findByName", {
        params: {
          name: _this.patientName
        }
      }).then(res => {
        if (res.data.data.length > 0) {
          _this.data1 = res.data.data;
          _this.index = -1;
        } else {
          _this.$Message.error("该用户不存在");
        }
      });
    },
    remove(row) {
      this.patientForm = row;
      this.index = 1;
    },
    deleteRow(index, rows) {
      // rows.splice(index, 1);
    },
    aa(key) {
      if (key.index == 1) {
        this.$nextTick(() => {
          this.findPatienthistory(1);
        });
      }
    },
    //查询挂号信息
    findPatienthistory(key) {
      var _this = this;
      Axios.get("/api/registered/findAllPatient", {
        //params参数必写 , 如果没有参数传{}也可以
        params: {
          page: key,
          size: 8
        }
      })
        .then(function(res) {
          // alert(key)
          _this.nowPage = key;
          _this.tableData = res.data.data.list;
          _this.pages = res.data.data.total;
          // location.reload()
        })
        .catch(function(err) {});
    },

    //清除表
    clearForm() {
      this.patientForm = [];
    },
    //查询科室
    findDepar() {
      var _this = this;
      Axios.get("/api/registered/findAllViewdepartment")
        .then(function(res) {
          _this.department = res.data.data;
        })
        .catch(function(err) {});
    },

    //根据idcard查询用户
    findPatient(key) {
      var _this = this;
      Axios.get("/api/registered/findPatientByIdcard", {
        //params参数必写 , 如果没有参数传{}也可以
        params: {
          idcard: key
        }
      })
        .then(function(res) {
          if (res.data.data != null) {
            _this.patientForm = res.data.data;
          } else {
            _this.$Message.error("该用户不存在");
          }
        })
        .catch(function(err) {});
    },
    open1() {
      this.$notify({
        title: "成功",
        message: "这是一条成功的提示消息",
        type: "success"
      });
    },
    onSubmit() {
      var _this = this;
      Axios.post("/api/registered/addPatient", {
        name: _this.patientForm.name,
        number: _this.patientForm.number,
        money: _this.patientForm.money,
        idcard: _this.patientForm.idcard,
        department: _this.patientForm.department,
        id: _this.patientForm.id
      })
        .then(function(response) {
          _this.patientForm.id = "";
          _this.open1();
        })
        .catch(function(error) {});
    },
    handleDelete(index, row) {
      this.$Modal.confirm({
        title: "Title",
        content: "<p>确定要删除本条本条记录？</p>",
        onOk: () => {
          let _this = this;
          Axios.get("/api/registered/clearPatient", {
            params: {
              id: row.id
            }
          })
            .then(function(response) {
              _this.$Message.info("删除成功");
              _this.findPatienthistory(_this.nowPage);
            })
            .catch(function(error) {});
        },
        onCancel: () => {
          this.$Message.info("取消");
        }
      });
    }
  }
};
</script>

<style>
.form_re {
  margin-top: 20px;
  /* margin-right: 55%; */
  margin-left: 20%;
  float: left;
}
</style>