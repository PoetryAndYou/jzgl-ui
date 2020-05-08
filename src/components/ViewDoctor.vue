<template>
  <div>
    <el-tabs tab-position="left" style="height: 1800px;">
      <el-tab-pane label="待就诊">
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
          <el-tab-pane closable label="待就诊列表" name="1" title="12">
            <el-row :gutter="0">
              <el-col :span="6" :push="0">
                <el-form :inline="true" class="demo-form-inline">
                  <el-form-item label="科室">
                    <el-select v-model="departpartmentNow" placeholder="选择科室">
                      <el-option
                        v-for="de in department"
                        :key="de.id"
                        :label="de.name"
                        :value="de.name"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit1()">查询</el-button>
                  </el-form-item>
                </el-form>
                <!-- 姓名：
                          <el-input type="text" placeholder="请输入病人姓名" v-model="patName" ></el-input>
                <el-button>查询</el-button>-->
              </el-col>
              <el-col :span="4" :push="1">
                <template>
                  <div>
                    <Input
                      search
                      enter-button="搜索"
                      placeholder="请输入姓名"
                      @on-search="searchByName()"
                      v-model="patName"
                    />
                  </div>
                </template>
              </el-col>
            </el-row>
            <br />
            <template>
              <el-table :data="tableData" border stripe style="width:60%" ref="table">
                <el-table-column fixed label="时间" prop="create_time" width="170"></el-table-column>
                <el-table-column prop="name" label="姓名" width="160"></el-table-column>
                <el-table-column label="身份号" prop="idcard" width="160"></el-table-column>
                <el-table-column label="电话" prop="number" width="160"></el-table-column>
                <el-table-column label="余额" prop="money" width="160"></el-table-column>
                <el-table-column fixed="right" label="操作" width="160">
                  <template slot-scope="scope">
                    <el-button
                      @click="addTab(editableTabsValue,scope.row),findAllPM(scope.row.id);"
                      ref="addTab"
                      type="primary"
                      plain
                      size="small"
                    >查看</el-button>
                    <el-button
                      @click.native.prevent="remTab(editableTabsValue,scope.row,scope.$index, tableData)"
                      ref="remTab"
                      type="danger"
                      plain
                      size="small"
                    >移除</el-button>
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
              @current-change="findAllPatient"
            ></el-pagination>
          </el-tab-pane>
          <!-- //病人详情 -->
          <el-tab-pane
            v-for="(item) in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
            <Row>
              <Col span="6" push="0">
                <Steps :current="current" direction="vertical" size="small">
                  <Step title="基本信息"></Step>
                  <Step title="就诊病历"></Step>
                  <Step title="检查项"></Step>
                  <Step title="开取药物"></Step>
                </Steps>
              </Col>
              <Col span="16" pull="3">
                <center>
                  <Affix :offset-top="0">
                    <span class="demo-affix">
                      <Button type="primary" @click="last">上一步</Button>
                      <Button type="primary" @click="next">下一步</Button>
                    </span>
                  </Affix>
                </center>
                <div v-if="current===0">
                  <Divider size="small">一、基本信息</Divider>
                  <el-form label-width="80px" :inline="true" size="mini">
                    <!-- :value=item.content.address  -->
                    <el-form-item label="姓名">
                      <el-input v-model="forms[item.name-3].name"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号">
                      <el-input v-model="forms[item.name-3].idcard" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                      <el-radio-group v-model="forms[item.name-3].sex" size="mini">
                        <el-radio border label="男" value="男"></el-radio>
                        <el-radio border label="女" value="女"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="年龄">
                      <el-input v-model="forms[item.name-3].age"></el-input>
                    </el-form-item>
                    <el-form-item label="电话号">
                      <el-input v-model="forms[item.name-3].number"></el-input>
                    </el-form-item>
                    <el-form-item label="科室">
                      <el-input v-model="forms[item.name-3].department" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="余额">
                      <el-input v-model="forms[item.name-3].money" :disabled="true"></el-input>
                    </el-form-item>
                    <br />
                    <Divider size="small">二、状况描述</Divider>
                    <br />
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 6, maxRows: 6}"
                      placeholder="请输入内容"
                      v-model="forms[item.name-3].decri"
                    ></el-input>
                  </el-form>
                </div>
                <div v-if="current===1">
                  <Divider size="small">三、病例</Divider>
                  <template>
                    <Collapse
                      accordion
                      v-for="md1 in patientMdTD[item.name-3]"
                      :key="md1.id"
                      v-show="md1"
                    >
                      <Panel name="md1.id">
                        {{md1.visittime}}
                        <Icon type="ios-medkit" />
                        {{md1.conclusion}}
                        <p slot="content">
                          <Divider size="small">
                            <font color="#2b85e4">医生</font>
                          </Divider>
                          <Icon type="md-person" />
                          :{{md1.doctor}}
                        </p>
                        <p slot="content">
                          <Divider size="small">
                            <font color="#2b85e4">状况详情</font>
                          </Divider>
                          {{md1.symptom}}
                        </p>
                        <p slot="content">
                          <Divider size="small">
                            <font color="#2b85e4">药物</font>
                          </Divider>
                          {{md1.drug}}
                        </p>
                      </Panel>
                    </Collapse>
                  </template>
                </div>
                <div v-if="current===2">
                  <Divider size="small">四、检查</Divider>
                  <Row>
                    <Col span="6">
                      <Select v-model="model17" filterable allow-create>
                        <Option
                          v-for="item in cheackTable"
                          :value="item.name"
                          :key="item.name"
                        >{{ item.name }}</Option>
                      </Select>
                    </Col>
                    <Col span="4">
                      <Button @click="addCheck(model17)" type="primary" size="mini">添加</Button>
                    </Col>
                  </Row>
                  <!-- 检查 -->

                  <el-table :data="data" border stripe highlight-current-row ref="table">
                    <el-table-column fixed label="名称" prop="name"></el-table-column>
                    <el-table-column fixed="right" label="操作">
                      <template slot-scope="scope">
                        <el-button
                          @click.native.prevent="remove(scope.$index)"
                          type="text"
                          size="small"
                        >移除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <Button @click="checkAdd(forms[item.name-3].name)" type="primary">提交</Button>
                </div>
                <div v-if="current===3">
                  <todo-item ref="conslusion"></todo-item>
                  <center>
                    <el-button
                      @click="endAll(forms[item.name-3].name,forms[item.name-3].age,forms[item.name-3].sex,forms[item.name-3].number,forms[item.name-3].id,forms[item.name-3].decri),removeTab"
                    >结束就诊</el-button>
                  </center>
                </div>
              </Col>
            </Row>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="已就诊">
        <oldpatient></oldpatient>
      </el-tab-pane>
      <el-tab-pane label="所有病人">
        <allPatient></allPatient>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Patient_XQ from "./Patient_XQ.vue";
import Axios from "axios";
import storage from "../store/storage.js";
import oldpatient from "./OldPatient.vue";
import AllPatient from "./AllPatient.vue";
export default {
  data() {
    return {
      // editIndex: -1,  // 当前聚焦的输入框的行数
      editName: "", // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁

      data: [],
      cheackTable: [],
      model17: "",
      modal11: false,
      value2: "1",
      patientMdTD: [],
      textarea1: "",
      patName: "", //病人姓名
      nowPage: 1,
      pages: 0,
      formInline: [],

      departpartmentNow: "",
      nowTabNam: "",

      department: [],
      // 病人详情form
      forms: [],
      form: [],
      msg: [],
      editableTabsValue: "1",
      editableTabs: [],
      tabIndex: 2,
      conslusion: "",
      tableData: [],
      decri: "",
      current: 0
    };
  },
  components: {
    "todo-item": Patient_XQ,
    oldpatient: oldpatient,
    allPatient: AllPatient
  },
  created: function() {
    this.findDepar();
    this.findAllCheck();
    this.findAllPatient(1);
  },
  methods: {
    findAllPatient(key) {
      let _this = this;
      Axios.get("/api/viewdoctor/findAllPatient", {
        //params参数必写 , 如果没有参数传{}也可以
        params: {
          page: key,
          size: 8
        }
      }).then(res => {
        _this.tableData = res.data.data.list;
        _this.pages = res.data.data.total;
      });
    },

    endAll(name, age, sex, number, id, decri) {
      //更新信息
      this.updataPatient(name, age, sex, number, id);
      //添加病例
      this.addPaMD(id, decri);
      this.$Message.success("看诊结束");
    },
    addPaMD(id, decri) {
      var _this = this;
      var drug = JSON.parse(localStorage.getItem("drug"));
      var t = "";
      for (let index = 0; index < drug.length; index++) {
        t = t + "" + drug[index].name + ":" + drug[index].number + "天";
      }

      Axios.get("/api/viewdoctor/addPatientMD", {
        params: {
          conclusion: localStorage.getItem("conslusion1"),
          symptom: decri,
          drug: t,
          doctor: storage.get("username"),
          paid: id
        }
      })
        .then(function(res) {})
        .catch(function(res) {});
    },
    updataPatient(name, age, sex, number, id) {
      Axios.get("/api/viewdoctor/updatePatientPro", {
        params: {
          name: name,
          age: age,
          sex: sex,
          number: number,
          id: id
        }
      })
        .then(function(res) {})
        .catch(function(res) {});
    },

    //添加检查项
    checkAdd(key) {
      var _this = this;

      for (let index = 0; index < _this.data.length; index++) {
        Axios.get("/api/viewdoctor/addPcheck", {
          params: {
            name: _this.data[index].name,
            pname: key
          }
        })
          .then(function(res) {
            _this.$Message.success("添加成功");
          })
          .catch(function(res) {});
      }
    },
    remove(index) {
      this.data.splice(index, 1);
    },
    //查询所有检查项
    findAllCheck() {
      var _this = this;
      Axios.get("/api/viewdoctor/findAllCheck")
        .then(response => {
          _this.cheackTable = response.data.data;
        })
        .catch(error => {});
    },

    addCheck(key) {
      var _this = this;
      _this.data.push({
        name: key
      });
    },
    //查询所有记录
    findAllPM(key) {
      // alert(key)
      var _this = this;

      Axios.get("/api/viewdoctor/findAllPMByUserId", {
        params: {
          id: key
        }
      })
        .then(function(res) {
          _this.patientMdTD.push(res.data.data);
        })
        .catch(function(res) {});
    },

    //移除

    searchByName() {
      var _this = this;
      this.$nextTick(() => {
        Axios.get("/api/viewdoctor/findPatientByName", {
          params: {
            name: _this.patName
          }
        })
          .then(function(res) {
            if (res.data.data == "" || res.data.data == null) {
              _this.$Message.error("不存在该用户");
              return;
            }
            _this.$Message.success("查询成功");
            _this.tableData = res.data.data;
          })
          .catch(function(res) {});
      });
    },
    //查询待就诊病人
    findPatienthistory(key, de) {
      var _this = this;
      if (!de) {
        de = _this.departpartmentNow;
      }
      //  alert(de)
      Axios.get("/api/viewdoctor/findPatientByDepartment", {
        //params参数必写 , 如果没有参数传{}也可以
        params: {
          page: key,
          size: 8,
          department: de
        }
      })
        .then(function(res) {
          _this.nowPage = key;

          _this.tableData = res.data.data.list;
          _this.pages = res.data.data.total;
          // _this.onSubmit1()
        })
        .catch(function(err) {});
    },
    //根据科室查找
    onSubmit1() {
      this.$nextTick(() => {
        this.$Message.success("查询成功");
        this.findPatienthistory(this.nowPage, this.departpartmentNow);
      });
    },
    //查询科室
    findDepar() {
      var _this = this;
      Axios.get("/api/viewdoctor/findAllViewdepartment")
        .then(function(res) {
          _this.department = res.data.data;
        })
        .catch(function(err) {});
    },
    asd(key) {
      // alert(key.address)
    },
    remTab(targetName, row, index, tab) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });

          Axios.get("/api/viewdoctor/clearPatient", {
            params: {
              id: row.id
            }
          })
            .then(function(response) {
              // _this.patientForm="",
              // this.patientForm.splice(index+1,1);
              // _this.$options.methods.findPatienthistory(_this.nowPage)
            })
            .catch(function(error) {});
          //  alert(row.id)
          tab.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addTab(targetName, row) {
      this.msg = row;
      let newTabName = ++this.tabIndex + "";
      this.nowTabNam = newTabName;
      // alert(newTabName)
      this.editableTabs.push({
        title: row.name,
        name: newTabName,

        content: row
      });
      this.form = row;
      this.forms.push(row);
      this.editableTabsValue = newTabName;
      //  this.$options.methods.emit(row)
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    },
    next() {
      if (this.current == 3) {
        this.current = 3;
      } else {
        this.current += 1;
      }
    },
    last() {
      if (this.current == 0) {
        this.current = 0;
      } else {
        this.current -= 1;
      }
    }
  }
};
</script>

<style>
</style>