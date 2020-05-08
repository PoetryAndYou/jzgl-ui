<template>
  <div>
    <el-tabs tab-position="left" style="height: 800px;" @tab-click="quYao">
      <el-tab-pane label="取药">
        <template>
          <el-table :data="tableData1" style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="药品">
                    <span>{{ props.row.drug }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>

            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="性别" prop="sex"></el-table-column>
            <el-table-column label="电话" prop="number"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="prop">
                <Button type="error" @click="del(prop.row)">Delete</Button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="pages"
          :page-size="8"
          @current-change="findALLMR"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="检查">
        <template>
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="pname" label="姓名" width="180"></el-table-column>
            <el-table-column prop="name" label="检查项"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="prop">
                <Button type="error" @click="delCheck(prop.row)">删除检查</Button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="page1s"
          :page-size="8"
          @current-change="findAllPCheck"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="库存">
        <template>
          <div>
            <br />
            <Row>
              <Col span="2" style="padding-right:10px">药品名</Col>
              <Col span="4" style="padding-right:10px">
                <Input type="text" v-model="name" placeholder="药品名" />
              </Col>
              <Col span="2" style="padding-right:10px">数量</Col>
              <Col span="4" style="padding-right:10px">
                <Input type="text" v-model="count" placeholder="数量" />
              </Col>
              <Col span="4" style="padding-right:10px">
                <Input type="text" v-model="money" placeholder="价格" />
              </Col>
              <Button @click="add()">添加</Button>
            </Row>
            <br />

            <Table :columns="columns" :data="data">
              <template slot-scope="{ row, index }" slot="name">
                <Input type="text" v-model="editName" v-if="editIndex === index" />
                <span v-else>{{ row.name }}</span>
              </template>

              <template slot-scope="{ row, index }" slot="count">
                <Input type="text" v-model="editCount" v-if="editIndex === index" />
                <span v-else>{{ row.count }}</span>
              </template>

              <template slot-scope="{ row, index }" slot="money">
                <Input type="text" v-model="editMoney" v-if="editIndex === index" />
                <span v-else>{{row.money }}</span>
              </template>
              <template slot-scope="{ row, index }" slot="action">
                <div v-if="editIndex === index">
                  <Button @click="handleSave(row,index)">保存</Button>
                  <Button @click="editIndex = -1">取消</Button>
                </div>
                <div v-else>
                  <Button @click="handleEdit(row, index)">操作</Button>
                  <Button type="error" @click="remove(row,index)">Delete</Button>
                </div>
              </template>
            </Table>
          </div>
        </template>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="page2s"
          :page-size="8"
          @current-change="findAllDrug"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Axios from "axios";
export default {
  data() {
    return {
      name: "",
      count: "",
      money: "",
      columns: [
        {
          title: "药品名",
          slot: "name"
        },
        {
          title: "数量",
          slot: "count"
        },
        {
          title: "价格",
          slot: "money"
        },
        {
          title: "操作",
          slot: "action"
        }
      ],
      data: [],
      editIndex: -1, // 当前聚焦的输入框的行数
      editName: "", // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
      editCount: "", // 第二列输入框
      editMoney: "", // 第三列输入框
      pages: 1,
      page1s: 1,
      page2s: 1,
      tableData1: [],
      tableData: [],
      nowPage1: "",
      nowPage2: ""
    };
  },
  created: function() {
    this.findALLMR(1);
  },
  methods: {
    delCheck(key) {
      this.$Modal.confirm({
        title: "提示",
        content: "确定已经检查了吗",
        onOk: () => {
          let _this = this;
          Axios.get("/api/drug/deleteCheck1", {
            params: {
              id: key.id
            }
          }).then(res => {
            _this.findAllPCheck(_this.nowPage1);
            this.$Message.info("删除成功");
          });
        },
        onCancel: () => {
          this.$Message.info("取消");
        }
      });
    },
    del(key) {
      this.$Modal.confirm({
        title: "提示",
        content: "确定已经取药",
        onOk: () => {
          let _this = this;
          Axios.get("/api/drug/deleteDurdRecord", {
            params: {
              id: key.id
            }
          }).then(res => {
            _this.findALLMR(_this.nowPage1);
            this.$Message.info("删除成功");
          });
        },
        onCancel: () => {
          this.$Message.info("取消");
        }
      });
    },
    quYao(targetName) {
      if (targetName.index == "0") {
        // this.findALLMR();
      } else if (targetName.index == "1") {
        this.findAllPCheck(1);
      } else if (targetName.index == "2") {
        this.findAllDrug(1);
      }
      // console.log(targetName)
    },
    handleEdit(index, row) {
      // console.log(index, row);
    },
    handleDelete(index, row) {
      // console.log(index, row);
    },
    //药品
    findAllDrug(key) {
      var _this = this;
      Axios.get("/api/drug/findAllDrug", {
        params: {
          page: key,
          size: 8
        }
      })
        .then(res => {
          console.log("wwww", res);
          _this.data = res.data.data.list;
          _this.page2s = res.data.data.total;
        })
        .catch(err => {});
    },

    //检查所有待检查项目
    findAllPCheck(key) {
      var _this = this;
      Axios.get("/api/drug/findAllPCheck", {
        params: {
          page: key,
          size: 8
        }
      })
        .then(res => {
          _this.tableData = res.data.data.list;
          _this.page1s = res.data.data.total;
          _this.nowPage2 = key;
        })
        .catch(err => {});
    },

    //查询所有的取药单
    findALLMR(key) {
      var _this = this;
      Axios.get("/api/drug/findAllMR", {
        params: {
          page: key,
          size: 8
        }
      })
        .then(res => {
          _this.tableData1 = res.data.data.list;
          //  console.log(res)
          _this.pages = res.data.data.total;
          _this.nowPage1 = key;
        })
        .catch(err => {});
    },
    add() {
      var _this = this;
      _this.data.push({
        name: _this.name,
        count: _this.count,
        money: _this.money
      });
      var _this = this;
      Axios.get("/api/drug/addDrug", {
        params: {
          name: _this.name,
          count: _this.count,
          money: _this.money
        }
      })
        .then(res => {
          _this.$Message.success("添加成功");
        })
        .catch(err => {});
    },
    handleEdit(row, index) {
      this.editName = row.name;
      this.editCount = row.count;
      this.editMoney = row.money;
      this.editIndex = index;
    },
    handleSave(row, index) {
      this.data[index].name = this.editName;
      this.data[index].count = this.editCount;
      this.data[index].money = this.editMoney;
      this.editIndex = -1;
      var _this = this;
      Axios.get("/api/drug/updataDrug", {
        params: {
          name: _this.editName,
          count: _this.editCount,
          money: _this.editMoney,
          id: row.id
        }
      })
        .then(res => {
          _this.$Message.success("保存成功");
        })
        .catch(err => {});
    },
    remove(row, index) {
      this.$Modal.confirm({
        title: "提示",
        content: "确定要删除吗",
        onOk: () => {
          this.data.splice(index, 1);
          var _this = this;
          Axios.get("/api/drug/deleteCheck", {
            params: {
              id: row.id
            }
          })
            .then(res => {
              this.$Message.info("删除成功");
            })
            .catch(err => {});
        },
        onCancel: () => {
          this.$Message.info("取消");
        }
      });
    }
  }
};
</script>
<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>