<template>
  <div>
      <el-tabs type="border-card">
        <el-tab-pane label="首页管理">

            <el-tabs tab-position="left" style="height: 800px;" >
            <!--首页照片  -->
              <el-tab-pane label="图片管理">
                  <img_manger :imgdata="imgdata"></img_manger>
              </el-tab-pane>
             <!-- 公告 -->
              <el-tab-pane label="公告管理">
                <announcementManager :amdata="amdata" :search="search"></announcementManager>
              </el-tab-pane>
            </el-tabs>
        </el-tab-pane>  
        <el-tab-pane label="用户管理">
          <customerManager></customerManager>
        </el-tab-pane>
        <el-tab-pane label="角色管理">
          <roleManager></roleManager>
        </el-tab-pane>
        <el-tab-pane label="权限管理">
          <authorityManager></authorityManager>
        </el-tab-pane>
        <el-tab-pane label="科室管理">
          <departmentManager></departmentManager>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ImageManger from './ImageManger.vue'
import CustomerManager from './CustomerManager.vue'
import AnnouncementManager from './AnnouncementManager.vue'
import RoleManager from './RoleManager.vue'
import AuthorityManager from './AuthorityManager.vue'
import DepartmentManager from './DepartmentManager.vue'
export default {
    
    data() {
      return {
        imgdata:"这里是照片信息",
        amdata:"这里是公告数据",
        users: [{
          date: '2016-05-02',
          name: '小小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        search: ''
      }
      
    },
    
    components:{
      'img_manger':ImageManger,
      'announcementManager':AnnouncementManager,
      'customerManager':CustomerManager,
      'roleManager':RoleManager,
      'authorityManager':AuthorityManager,
      'departmentManager':DepartmentManager
    }

    }

</script>

<style>

</style>