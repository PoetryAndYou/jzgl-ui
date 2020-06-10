<template>
  <div>
    <Table :columns="columns" :data="data">
      <template slot-scope="{ row}" slot="name">
        <span>{{ row.name }}</span>
      </template>

      <template slot-scope="{ row}" slot="age">
        <span>{{ row.age }}</span>
      </template>

      <template slot-scope="{ row}" slot="number">
        <span>{{ row.number}}</span>
      </template>

      <template slot-scope="{ row }" slot="department">
        <span>{{ row.department }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="pm">
        <div>
          <Button @click="look(row,index),modal11 = true">查看病历</Button>
        </div>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <div>
          <Button type="error" @click="remove(row,index)">Delete</Button>
        </div>
      </template>
    </Table>
    <template >
      <Modal v-model="modal11" fullscreen :title=PatientName>
         <div class="as1">
            
            <Collapse  accordion>
                <Panel v-for="(item ,index) in PatientMedical" :key="index">
                    时间：{{item.visittime}} 确诊： {{item.conclusion}}               
                    <p slot="content">
                      <span>就诊时间：{{item.visittime}}</span><br>
                      <span>确诊情况：{{item.conclusion}}</span><br>
                      <span>医生编号：{{item.doctor}}</span><br>
                      <span>描述：{{item.symptom}}</span><br>
                      <span>处方：{{item.drug}}</span><br>
                    </p>
                </Panel>
            </Collapse>
           
        </div>
      </Modal>
    </template>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="pages"
      :page-size="8"
      @current-change="findPatienthistory"
    ></el-pagination>
  </div>
</template>
<script>
import Axios from "axios";
export default {
  data() {
    return {
      modal11:false,
      pages: 20,
      columns: [
        {
          title: "姓名",
          slot: "name"
        },
        {
          title: "年龄",
          slot: "age"
        },
        {
          title: "电话",
          slot: "number"
        },
        {
          title: "部门",
          slot: "department"
        },
        {
          title: "查看",
          slot: "pm"
        },
        {
          title: "操作",
          slot: "action"
        }
      ],
      data: [],
      nowPages: 1,
      PatientName:'',
      PatientMedical:[]
    };
  },
  methods: {
    remove(row, index) {
      this.$Modal.confirm({
        title: "删除",
        content: "确定删除？",
        onOk: () => {
          let _this = this;
          Axios.get("/api/viewdoctor/clearPatient", {
            params: {
              id: row.id
            }
          }).then(res => {
            _this.findPatienthistory(_this.nowPages);
            this.$Message.info("删除成功");
          });
        },
        onCancel: () => {
          this.$Message.info("取消");
        }
      });
    },
    findPatienthistory(key) {
      var _this = this;
      Axios.get("/api/viewdoctor/findAllOldPatient", {
        //params参数必写 , 如果没有参数传{}也可以
        params: {
          page: key,
          size: 8
        }
      })
        .then(function(res) {
          // alert(key)
          _this.nowPage = key;
          _this.data = res.data.data.list;
          _this.pages = res.data.data.total;
          // location.reload()
        })
        .catch(function(err) {});
    },
    look(row, index){
      var _this=this;
      _this.PatientName=row.name
      Axios.get("/api/viewdoctor/findAllPMByUserId", {
        params: {
          id: row.id
        }
      })
        .then(function(res) {
          _this.PatientMedical=res.data.data;
          console.log( _this.PatientMedical)
        })
        .catch(function(res) {});
    }
  },
  mounted: function() {
    var _this = this;
    this.$nextTick(() => {
      this.findPatienthistory(_this.nowPages);
    });
  }
};
</script>