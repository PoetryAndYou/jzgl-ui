<template>
  <div class="sz">
      <div >
          <el-tabs :tab-position="tabPosition" style="height: 600px;" @tab-click=aa>
            <el-tab-pane label="挂号" v-show=false>
                <el-row :gutter="20">
                  <el-col :span="8" :push="8">
                
                <el-form class="form_re" :rules="rules" ref="form" :model="patientForm" label-width="100px" size="small "  >
                    <el-form-item label="身份证号" >
                        <el-input v-model.trim="patientForm.idcard"></el-input>
                         <Button type="success" long  @click="findPatient(patientForm.idcard)">查询</Button>
                         <!-- <el-button type="success" @click="findPatient(patientForm.idcard)">查询</el-button> -->
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="patientForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="patientForm.number"></el-input>
                    </el-form-item>
                    <el-form-item label="余额">
                        <el-input v-model="patientForm.money"></el-input>
                    </el-form-item>
                    <el-form-item label="科室">
                      <el-select v-model="patientForm.department"  placeholder="科室">
                        
                        <el-option v-for="de in department" :key="de.id" :label=de.name :value=de.name ></el-option>
                        
                      </el-select><br>
                       <el-button type="primary" @click="onSubmit()">确定</el-button>
                       <el-button  @click="clearForm()">清除</el-button>
                    </el-form-item>
                    
                    </el-form>

                  </el-col>
                  <el-col :span="4"></el-col>
                </el-row>

            </el-tab-pane>


            <el-tab-pane label="挂号记录">
                
                    <template>
                        <el-table
                            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                            style="width: 100%">
                            <el-table-column
                            label="时间"
                            prop="create_time">
                            </el-table-column>
                            <el-table-column
                            label="身份号"
                            prop="idcard">
                            </el-table-column>
                            <el-table-column
                            label="姓名"
                            prop="name">
                            </el-table-column>
                            <el-table-column
                            label="电话"
                            prop="number">
                            </el-table-column>
                            <el-table-column
                            label="科室"
                            prop="department">
                            </el-table-column>
                            <el-table-column
                            label="余额"
                            prop="money">
                            </el-table-column>
                            <el-table-column
                            align="right">
                            <template slot="header" slot-scope="scope">
                                <el-input
                                v-model="search"
                                size="mini"
                                placeholder="输入关键字搜索"/>
                            </template>
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                type="danger"
                                @click.native.prevent="deleteRow(scope.$index, tableData),handleDelete(scope.$index, scope.row)">Delete</el-button>
                            </template>
                            </el-table-column>
                        </el-table>
                        </template>
                        <!-- 分页 -->
                    <el-pagination
                      background
                      layout="prev, pager, next"
                      :total=pages
                      :page-size="8"
                      @current-change="findPatienthistory"
                      
                      >
                    </el-pagination>

            </el-tab-pane>

            
  </el-tabs>
      </div>
  </div>
</template>

<script> 
import Axios from 'axios';
 export default {
    data() {
      return {
          rules: {
          name: [
            { required: true, message: '请输入idcard' },
            { min: 3, max: 18, message: '长度在 3 到 5 个字符'}
          ]},

        idcard:'',
        a:false,
        tabPosition: 'left',
        department:[],
        patientForm: {
          id:'',
          name: '',
          age: '',
          sex: '',
          number: '',
          money: '',
          idcard: '',
          department: '',
          createTime: '',
          status:''
        },
        tableData: [],
        search: '',
        keysize:1,
        pages:0,
        nowPage:''
      };
    },

    created:function(){
      var _this=this
      this.findDepar()
      this.findPatienthistory(_this.keysize);
    },
    methods: {
            deleteRow(index, rows) {
        // rows.splice(index, 1);
      },
      aa(key){
        if(key.index==1){
               this.$nextTick(()=>{
                  this.findPatienthistory(1)
              })
        }
      },
      //查询挂号信息
      findPatienthistory(key){
        var _this=this
        Axios.get('/api/registered/findAllPatient', {  //params参数必写 , 如果没有参数传{}也可以
            params: { 
              page: key,
              size: 8
            }
        })
        .then(function (res) {
          // alert(key)
            _this.nowPage=key
            _this.tableData=res.data.data.list;
            _this.pages=res.data.data.total;
            // location.reload()
        })
        .catch(function (err) {
        });

      },

      //清除表
      clearForm(){
        this.patientForm=[]

      },
      //查询科室
      findDepar(){
        var _this=this
         Axios.get('/api/registered/findAllViewdepartment')
         .then(function (res) {
              _this.department=res.data.data
          })
          .catch(function (err) {
          });


      },

      //根据idcard查询用户
      findPatient(key){
          var _this=this;
          Axios.get('/api/registered/findPatientByIdcard', {  //params参数必写 , 如果没有参数传{}也可以
              params: { 
                idcard: key
              }
          })
          .then(function (res) {
              if(res.data.data!=null){
                  _this.patientForm=res.data.data
              }else{

                 _this.$Message.error('该用户不存在');
              }
              

          })
          .catch(function (err) {
           
          });

      },
      open1() {
        this.$notify({
          title: '成功',
          message: '这是一条成功的提示消息',
          type: 'success'
        })},
        onSubmit() {
        var _this=this
          Axios.post('/api/registered/addPatient', {
          name: _this.patientForm.name,
          number:_this.patientForm.number,
          money:_this.patientForm.money,
          idcard:_this.patientForm.idcard,
          department:_this.patientForm.department,
          id:_this.patientForm.id,
          })
          .then(function (response) {
            _this.patientForm.id='';
           _this.open1();
          })
          .catch(function (error) {
          });


      },
      handleDelete(index, row) {
                    this.$Modal.confirm({
                    title: 'Title',
                    content: '<p>确定要删除本条本条记录？</p>',
                    onOk: () => {
                         let _this=this
                        Axios.get('/api/registered/clearPatient', {
                          params:{
                            id:row.id
                          }
                      })
                      .then(function (response) {
                         _this.$Message.info('删除成功');
                        _this.findPatienthistory(_this.nowPage)
                      })
                      .catch(function (error) {
                      });
                    },
                    onCancel: () => {
                        this.$Message.info('取消');
                    }
                });

        

        
      }
    },


    }
  
</script>

<style>
.form_re {
   margin-top: 20px;
   /* margin-right: 55%; */
   margin-left: 20%;
   float: left;
}
</style>