<template>
  <div>
    <Table :columns="columns13" :data="data5" border></Table>
    <template>
      <Page :current="current" :total="total" simple :page-size="pagesize" @on-change="onClick" />
    </template>
  </div>
</template>
<script>
import Axios from "axios";
export default {
  data() {
    return {
      columns13: [
        {
          title: "身份证号",
          key: "idcard",
          resizable: true
        },
        {
          title: "姓名",
          key: "name",
          resizable: true
        },
        {
          title: "年龄",
          key: "age",
          resizable: true
        },
        {
          title: "性别",
          key: "sex",
          resizable: true
        },
        {
          title: "电话",
          key: "number"
        },
        {
          title: "余额",
          key: "money",
          resizable: true
        },

        {
          title: "科室",
          key: "department",
          resizable: true
        }
      ],
      data5: [],
      pages: 1,
      total: 1,
      current: 1,
      pagesize: 8
    };
  },
  methods: {
    onClick(key) {
      var _this = this;
      _this.current = key;
      this.$nextTick(() => {
        _this.findAllPatient1(_this.current);
      });
    },
    findAllPatient1(key) {
      let _this = this;
      Axios.get("/api/viewdoctor/findAllPatient1", {
        params: {
          page: key,
          size: _this.pagesize
        }
      }).then(res => {
        // console.log(res)
        _this.data5 = res.data.data.list;
        _this.total = res.data.data.total;
        // alert(_this.total)
      });
    }
  },
  created: function() {
    this.findAllPatient1(1);
  }
};
</script>