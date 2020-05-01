<template>

<div>
   <Divider size="small">描述</Divider>
就诊病人  {{username}}
<div>
 <el-input v-model="conslusion1"></el-input>
</div>
<br>
  <Divider size="small">取药</Divider>
    <Row>
       <Col span="12" style="padding-right:10px">
         <Select v-model="name" filterable allow-create >
            <Option v-for="item in DrugTable" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </Select>
      </Col>
      <Col  span="4" style="padding-right:10px">
        <Input type="text" v-model="number" placeholder="数量"/>
      </Col>
    <Button @click="add()">添加</Button>
    </Row>

  <Table :columns="columns" :data="data">
    <template slot-scope="{ row, index }" slot="name">
      <Input type="text" v-model="editName" v-if="editIndex === index" />
      <span v-else>{{ row.name }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="number">
      <Input type="text" v-model="editNumber" v-if="editIndex === index" />
      <span v-else>{{ row.number }}</span>
    </template>


    <template slot-scope="{ row, index }" slot="action">
      <div v-if="editIndex === index">
        <Button @click="handleSave(index)">保存</Button>
        <Button @click="editIndex = -1">取消</Button>
      </div>
      <div v-else>
        <Button @click="handleEdit(row, index)">操作</Button>
        <Button type="error"  @click="remove(index)">Delete</Button>
      </div>
    </template>
   
  </Table>
   <el-button @click="ok2()">确定</el-button>
  </div>
</template>
<script>
import storage from '../store/storage.js'
import Axios from 'axios'
  export default {
    data () {
      return {
        DrugTable:'',//
        username:storage.get("username"),
         name:'',
         number:'',
        columns: [
          {
            title: '姓名',
            slot: 'name'
          },
          {
            title: '数量',
            slot: 'number'
          },
         
          {
            title: '操作',
            slot: 'action'
          }
        ],
        data:[],
        editIndex: -1,  // 当前聚焦的输入框的行数
        editName: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
        editNumber: '',  // 第二列输入框
        conslusion1:'',
      }
    },
    created:function(){
      var _this=this
        Axios.get("/api/viewdoctor/findAllDrug").then((res)=>{
            _this.DrugTable=res.data.data
        }).then(err=>{
        })
    },
    methods: {
      ok2(){
        localStorage.setItem('conslusion1',this.conslusion1);
        localStorage.setItem('drug',JSON.stringify(this.data))
        
      },
      add(){
       var _this=this
        _this.data.push({
         
          name:_this.name,
          number:_this.number,
          
        })
      },
      handleEdit (row, index) {
        this.editName = row.name;
        this.editNumber = row.number;
        this.editIndex = index;
      },
      handleSave (index) {
        this.data[index].name = this.editName;
        this.data[index].number = this.editNumber;
        this.editIndex = -1;
      },
       remove(index) {
            this.data.splice(index, 1);
      }
      ,
      destroyed() {
        // alert("2")
      },
    },
  }
</script>