<template>
  <div class="as2 as1">
    <el-tabs type="border-card">
      <el-tab-pane label="首页管理">
        <el-tabs tab-position="left" style="height: 800px;">
          <!--首页照片  -->
          <el-tab-pane label="图片管理">
            <img_manger ></img_manger>
          </el-tab-pane>
          <!-- 公告 -->
          <el-tab-pane label="公告管理">
            <announcementManager :search="search"></announcementManager>
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
      <el-tab-pane label="检查管理">
        <checkManager></checkManager>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ImageManger from "./ImageManger.vue";
import CustomerManager from "./CustomerManager.vue";
import AnnouncementManager from "./AnnouncementManager.vue";
import RoleManager from "./RoleManager.vue";
import AuthorityManager from "./AuthorityManager.vue";
import DepartmentManager from "./DepartmentManager.vue";
import CheckManager from "./CheckManager.vue";
export default {
  data() {
    return {
      search: ""
    };
  },

  components: {
    img_manger: ImageManger,
    announcementManager: AnnouncementManager,
    customerManager: CustomerManager,
    roleManager: RoleManager,
    authorityManager: AuthorityManager,
    departmentManager: DepartmentManager,
    checkManager: CheckManager
  }
};
</script>

<style>
</style>