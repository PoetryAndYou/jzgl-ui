<template  >
  <div class="as1">
    <el-upload
      class="upload-demo"
      :action="actionUtil"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="su"
      :file-list="fileList"
      list-type="picture-card"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>


<script>
import Axios from "axios";
export default {
  data() {
    return {
      actionUtil: "/ytmj" + "/fileUpload",
      fileList: []
    };
  },
  methods: {
    su(res, file) {
      var url = "http://www.yantumeijing.cn/Imgs/" + res;
      var _this = this;
      Axios.get("/api/admin/addImgs", {
        params: {
          name: file.name,
          url: url
        }
      })
        .then(res => {})
        .catch(() => {});
    },
    handleRemove(file, fileList) {
      var _this = this;
      Axios.get("/api/admin/deleteImgs", {
        params: {
          id: file.id
        }
      })
        .then(res => {})
        .catch(err => {});
    },
    handlePreview(file) {}
  },

  created: function() {
    var _this = this;
    Axios.get("/api/admin/img")
      .then(res => {
        _this.fileList = res.data.data;
      })
      .catch(err => {});
  }
};
</script>