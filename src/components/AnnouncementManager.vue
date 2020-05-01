<template>
    <div>
     <!-- {{amdata}} -->
     <Tabs type="card"
        @on-click="whenclick"
     >
        <TabPane label="公告">
        <Table border :columns="columns12" :data="data6">
        <template slot-scope="{ row }" slot="title">
            <strong>{{ row.title }}</strong>
       </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button @click="value4 = true,show(row,index)"  size="small" type="primary">预览查看</Button>
            <Button type="error" size="small" @click="remove(row.id,index)">Delete</Button>
         </template>
        </Table>  
    
      
        <Drawer :closable="false" width="640" v-model="value4">
            <h1>
            <el-input v-html="title" />
            <span  v-html="title" v-if="editIndex===-1"></span>
            <input type="textarea" v-else v-model="title">
            </h1>
      
          <span v-html="time"></span>
            <Divider />
         <span v-html="content" v-if="editIndex===-1"></span>
         <Input type="textarea" :rows="20" height="800px" v-else v-model="content"/><br>
         <el-button @click=edit v-if="editIndex===-1">修改</el-button>
          <el-button @click=saveContent() v-else>确定</el-button>
        </Drawer>
        
        </TabPane>
        <TabPane label="添加公告">
    <div class="demo-split">
        <Split v-model="split1">
            <div slot="left" class="demo-split-pane">
             <Divider size="small"><strong><h2>标题</h2></strong></Divider>
            <el-input placeholder="标题" v-model="title1"></el-input>
             <Divider size="small"><strong><h2>内容</h2></strong></Divider>
              <Input v-model="content1" type="textarea" :rows="20" placeholder="Enter something..." /> <Divider trpe="vertical"></Divider> 
              <center>
              <Button @click="addAnno()" long type="primary">提交</Button>
              </center>
           </div>
           <div slot="right" class="demo-split-pane">
                <h1><span v-html="title1"></span></h1>
                <Divider></Divider>
                <span v-html="content1"></span>
           </div>
        </Split>
    </div>
        </TabPane>
    </Tabs>
    </div>
</template>
<script>
import Axios from 'axios';
    export default {
        data () {
            return { 
                    editId:'',
                    editIndex: -1,
                    split1:0.5,
                    title1:'',
                    title:'',
                    time:'',
                    content:'',
                    content1:'',
                     value4: false,
                     columns12: [
                    {
                        title: 'Time',
                        key: 'time'
                    },
                    {
                        title: 'Title',
                        slot: 'title',
                       className: 'demo-table-info-column'
                    },

                    
                    {
                        title: 'Action',
                        slot: 'action',
                        align: 'center'
                    }
                ],
                data6: []
            }
        }
      ,
        methods: {
            saveContent(){
                let _this=this
                Axios.get("/api/admin/updataAnnouncement",{
                    params:{
                        id:_this.editId,
                        title:_this.title,
                        content:_this.content
                    }
                }).then((res)=>{
                    _this.$Message.success("修改成功")
                    _this.editIndex=-1
                    _this.findAllAnno();
                })

                
            },
            edit(){
                this.editIndex=1
            },
            whenclick(name){
                
            },
            show (row,index) {
              this.title=row.title;
              this.time=row.time
              this.content=row.content;
              this.editId=row.id
            },
            remove (id,index) {
                this.$Modal.confirm({
                    title: '删除',
                    content: '确定删除公告',
                    onOk: () => {
                        
                        this.data6.splice(index, 1);
                        Axios.get('/api/admin/deleteAnno',{
                            params:{
                                id:id
                            }
                        }).then((res)=>{
                            this.$Message.info('删除成功');
                        }).catch((res)=>{

                        })

                    },
                    onCancel: () => {
                        this.$Message.info('取消');
                    }
                });





            },
            addAnno(){
                var _this=this
                Axios.get("/api/admin/addAnno",{
                    params:{
                      title:_this.title1,
                      content:_this.content1  
                    }
                }).then((res)=>{
                    _this.$Message.success("添加成功")
                    _this.findAllAnno()
                }).catch((err)=>{

                })
            },
            findAllAnno(){
                var _this=this
            Axios.get("/api/admin/anno").then((res)=>{
                _this.data6=res.data.data
            })
            }
        },
         props:['amdata'],
        created:function(){
           this.findAllAnno();
        }
    }
</script>

<style>
    .ivu-table td.demo-table-info-column {
        background-color: #187;
        color: #fff;
    }
        .demo-split{
        height: 800px;
        border: 1px solid #dcdee2;
    }
    .demo-split-pane{
        padding: 10px;
    }
</style>

