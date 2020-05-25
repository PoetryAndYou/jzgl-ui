<template>
  <div class="as1">
    <Row>
      <Col span="4" style="padding-right:10px">
        <Input type="text" v-model="roleName" placeholder="名字" />
      </Col>
      <Col span="4" style="padding-right:10px">
        <Input type="text" v-model="description" placeholder="描述" />
      </Col>
      <Col span="4" style="padding-right:10px">
        <Button @click="add()">添加</Button>
      </Col>
    </Row>

    <Table :columns="columns" :data="data">
      <template slot-scope="{ row, index }" slot="roleName">
        <Input type="text" v-model="editName" v-if="editIndex === index" />
        <span v-else>{{ row.roleName }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="description">
        <Input type="text" v-model="editDesc" v-if="editIndex === index" />
        <span v-else>{{ row.description }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <div v-if="editIndex === index">
          <Button @click="handleSave(index)">保存</Button>
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
<script>
import Axios from "axios";
export default {
  data() {
    return {
      roleName: "",
      description: "",

      columns: [
        {
          title: "权限名",
          slot: "roleName"
        },
        {
          title: "描述",
          slot: "description"
        },
        {
          title: "操作",
          slot: "action"
        }
      ],
      data: [],
      editIndex: -1, // 当前聚焦的输入框的行数
      editName: "", // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
      editDesc: "" // 第二列输入框
    };
  },
  methods: {
    add() {
      var _this = this;
      Axios.get("/api/admin/addRole", {
        params: {
          roleName: _this.roleName,
          description: _this.description
        }
      }).then(res => {
        _this.$Message.success("添加成功");
        this.findAllRole();
      });
    },
    handleEdit(row, index) {
      this.editName = row.roleName;
      this.editDesc = row.description;
      this.editIndex = index;
    },
    handleSave(index) {
      this.data[index].roleName = this.editName;
      this.data[index].description = this.editDesc;
      this.editIndex = -1;
    },
    remove(row, index) {
      this.$Modal.confirm({
        title: "警告",
        content: "确定要删除吗",
        onOk: () => {
          let _this = this;
          Axios.get("/api/admin/deleteRole", {
            params: {
              id: row.id
            }
          }).then(res => {
            this.findAllRole();
            this.$Message.info("删除成功");
          });
        },
        onCancel: () => {
          this.$Message.info("取消");
        }
      });
    },
    findAllRole() {
      let _this = this;
      Axios.get("/api/admin/findAll").then(res => {
        _this.data = res.data.data;
      });
    }
  },
  created: function() {
    this.findAllRole();
  }
};
</script>