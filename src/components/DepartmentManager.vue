<template>
    <div>
    <Row>
      <Col span="4" style="padding-right:10px">
        <Input type="text" v-model="name" placeholder="名字" />
      </Col>
      <Col span="4" style="padding-right:10px">
        <Input type="text" v-model="description" placeholder="描述"/>
      </Col>
      <Col span="4" style="padding-right:10px">
          <Button @click="add()">添加</Button>
      </Col>
    </Row>

  <Table :columns="columns" :data="data">
    <template slot-scope="{ row, index }" slot="name">
      <Input type="text" v-model="editName" v-if="editIndex === index" />
      <span v-else>{{ row.name }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="description">
      <Input type="text" v-model="editDescription" v-if="editIndex === index" />
      <span v-else>{{ row.description }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="action">
      <div v-if="editIndex === index">
        <Button @click="handleSave(row,index)">保存</Button>
        <Button @click="editIndex = -1">取消</Button>
      </div>
      <div v-else>
        <Button @click="handleEdit(row, index)">操作</Button>
        <Button type="error"  @click="remove(row,index)">Delete</Button>
      </div>
    </template>
  </Table>
 </div>
</template>
<script>
import Axios from 'axios'
  export default {
    data () {
      return {
         name:'',
        description:'',
        columns: [
          {
            title: '名字',
            slot: 'name'
          },
          {
            title: '描述',
            slot: 'description'
          },
          {
            title: '操作',
            slot: 'action'
          }
        ],
        data:[],
        editIndex: -1,  // 当前聚焦的输入框的行数
        editName: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
        editDescription: '',  // 第二列输入框
      }
    },
    methods: {
      add(){
       
        let _this=this
        Axios.get("/api/admin/addDepartment",{
              params:{
                name:_this.name,
                description:_this.description,
              }
        }).then((res)=>{
           _this.$Message.success("保存成功")
          _this.findAllDeparment();
          _this.name="";
          _this.description="";
        })


      },
      handleEdit (row, index) {
        this.editName = row.name;
        this.editDescription = row.description;
        this.editIndex = index;
      },
      handleSave (row,index) {
                this.data[index].name = this.editName;
        this.data[index].description = this.editDescription;
        this.editIndex = -1;
        let _this=this
        Axios.get("/api/admin/updateDepartment",{
              params:{
                name:_this.editName,
                description:_this.editDescription,
                 id:row.id
              }
        }).then((res)=>{
          _this.$Message.success("保存成功")
          _this.findAllDeparment()
        })

      },
       remove(row,index) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '确定要删除吗',
                    onOk: () => {
                        this.data.splice(index, 1);
                        let _this=this
                        Axios.get("/api/admin/deleteDepartment",{
                          params:{
                            id:row.id
                          }
                        }).then((res)=>{
                           this.$Message.info('删除成功');
                        })
                    },
                    onCancel: () => {
                        this.$Message.info('取消');
                    }
                });

      } ,
       findAllDeparment(){
        let _this=this
        Axios.get("/api/admin/findAllDeparment").then((res)=>{
            _this.data=res.data.data
        })
      }
      
  },
        created:function() {
          this.findAllDeparment();
        }
  }
</script>