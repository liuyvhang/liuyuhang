<template>
  <div class="questionAdd">
    <div class="top">
      <span>{{$route.name}}</span>
    </div>
    <el-form ref="formData" :model="formData" label-width="80px">
      <div class="first">
        <el-form-item label="问答图片">
          <el-upload class="avatar-uploader" :action="uploadImgUrl()" multiple :on-exceed="handleExceed" :file-list="formData.title_img" list-type="picture-card" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-remove="handleRemove" :limit="6">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </div>
      <div class="second">
        <el-form-item label="社群">
          <el-select v-model="formData.community_id" placeholder="请选择社群">
            <el-option v-for="item in options1" :key="item.id" :label="item.community_name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者">
          <el-select v-model="formData.post_user_id" filterable remote reserve-keyword placeholder="请选择作者" :remote-method="remoteAuthor" :loading="loading" popper-class="author" value-key="user_id" clearable>
            <el-option v-for="item in authorOptions" :key="item.user_id" :label="item.nick_name" :value="item.user_id">
              <span style="position:absolute;left:10; color: #8492a6; font-size: 13px;line-height:50px">{{ item.nick_name }}</span>
              <span style="position:absolute;right:50px;"><img :src="item.head_img" class="img"></span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签">
          <el-select v-model="values" multiple filterable allow-create placeholder="请添加标签">
            <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="积分">
          <el-select v-model="formData.reward_amount" placeholder="请选择积分">
            <el-option v-for="item in options2" :key="item.value" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="formData.content" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formData')" v-if="$route.name=='添加问答'" :disabled="addButton">添加</el-button>
        <el-button type="primary" @click="editForm('formData')" v-if="$route.name=='编辑问答'" :disabled="editButton">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        title_img: []
      },
      addButton: false,
      editButton: false,
      authorOptions: [],
      loading: false,
      values: "",
      options: [
        { label: 1 },
        { label: 2 },
        { label: 3 },
        { label: 4 },
        { label: 5 }
      ],
      options1: [],
      options2: [
        { value: 5 },
        { value: 10 },
        { value: 20 },
        { value: 50 },
        { value: 100 },
        { value: 200 },
        { value: 500 }
      ]
    };
  },
  methods: {
    // 远程搜索
    remoteAuthor(query) {
      if (query !== "") {
        this.loading = true;
        var data = {
          page: 1,
          nick_name: query,
          user_id: "30be03b3acf543a3844ff4201c8155ae"
        };
        this.$axios.get("searchUser", data).then(res => {
          if (res.code == 200) {
            this.authorOptions = res.data.userInfoList;
          }
        });
        setTimeout(() => {
          this.loading = false;
        }, 200);
      } else {
        this.authorOptions = [];
      }
    },
    handleAvatarSuccess(res, file) {
      let data = {
        name: `${file.name}`,
        url: res.data.upload.url
      };
      this.formData.title_img.push(data);
      console.log(this.formData.title_img);
    },

    beforeAvatarUpload(file) {
      // const isJPG = file.type === "img/jpeg";
      // const isGIF = file.type === "img/gif";
      // const isPNG = file.type === "img/png";
      // const isBMP = file.type === "img/bmp";
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG && !isGIF && !isPNG && !isBMP) {
      //   this.common.errorTip("上传图片必须是JPG/GIF/PNG/BMP 格式!");
      // }
      // if (!isLt2M) {
      //   this.common.errorTip("上传图片大小不能超过 2MB!");
      // }
      // return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
    },
    handleRemove(file, fileList) {
      if (fileList.length) {
        this.formData.title_img = fileList;
      } else {
        this.formData.title_img = [];
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`最多上传 6 个文件`);
    },
    uploadImgUrl() {
      return `${process.env.BASE_API}systemApiService/upload/image`;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //图片拼接
          let imgs = [];
          if (this.formData.title_img) {
            this.formData.title_img.map(item => {
              imgs.push(item.url);
            });
            imgs = imgs.toString();
          }
          let tags = [];
          tags = tags.concat(this.values);
          tags = [...new Set(tags)];
          tags = tags.toString();
          let data = {
            ...this.formData,
            post_type: 1,
            reward_type: 0,
            title_img: imgs,
            label_id: tags
          };
          this.addButton = true;
          this.$axios
            .get("addInvitation", data)
            .then(res => {
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "问答添加成功"
                });
                this.$refs[formName].resetFields();
                this.$router.push({ path: "/group/question" });
              } else {
                this.$message({
                  type: "warning",
                  message: res.msg
                });
                this.addButton = false;
                console.log("error submit!!");
                return false;
              }
            })
            .catch(rej => {
              this.addButton = false;
            });
        }
      });
    },
    editForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let imgs = [];
          if (this.formData.title_img) {
            this.formData.title_img.map(item => {
              imgs.push(item.url);
            });
            imgs = imgs.toString();
          }
          let tags = [];
          tags = tags.concat(this.values);
          tags = [...new Set(tags)];
          tags = tags.toString();
          console.log(tags);
          let data = {
            ...this.formData,
            title_img: imgs,
            label_id: tags
          };
          this.editButton = true;
          this.$axios
            .get("updateInvitation", data)
            .then(res => {
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "问答编辑成功"
                });
                this.$refs[formName].resetFields();
                this.$router.push({ path: "/group/question" });
              } else {
                this.$message({
                  type: "warning"
                  // message: res.msg
                });
                this.editButton = false;
                console.log("error edit!!");
                return false;
              }
            })
            .catch(rej => {
              this.editButton = false;
            });
        }
      });
    },
    getData() {
      this.$axios
        .get("infoInvitation", {
          post_id: this.$route.query.id,
          userId: "30be03b3acf543a3844ff4201c8155ae",
          page: 1
        })
        .then(res => {
          this.formData = res.data.postDetailInfo;
          let imgs = [];
          if (res.data.postDetailInfo.title_imgs) {
            res.data.postDetailInfo.title_imgs.split(",").map((item, index) => {
              let data = {
                name: `${index}`,
                url: item
              };
              imgs.push(data);
            });
            this.formData.title_img = imgs;
          }
          if (res.data.postDetailInfo.label_id) {
            let tags = res.data.postDetailInfo.label_id;
            tags = tags.trim().split(",");
            this.values = tags;
          }
          this.remoteAuthor(res.data.postDetailInfo.post_user_id_name);
        });
    },
    getOptions() {
      this.$axios.get("getLabel", { parent_id: "0" }).then(res => {
        console.log(res);
        this.options = res.data.label_list;
      });
    },
    getGroup() {
      this.$axios.get("getGroup").then(res => {
        if (res.code == 200) {
          this.options1 = res.data.backAssociationList;
        }
      });
    }
  },
  created() {
    if (this.$route.query.id) {
      this.getData();
    }
    this.getOptions();
    this.getGroup();
  }
};
</script>
<style>
.newsAdd .form-control {
  clear: none !important;
}
.author .author .form-control {
  clear: none !important;
}
div.sp-result-area table.sp-table[data-v-07525036] {
  text-align: center;
}
.author .el-select-dropdown__item {
  height: 50px !important;
}
.author
  .el-select-dropdown.is-multiple
  .el-select-dropdown__item.selected::after {
  line-height: 50px !important;
}
</style>

 <style scoped>
.questionAdd {
  padding: 30px 80px 0 90px;
}
.img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  text-align: center;
}
.top {
  width: 100%;
  text-align: center;
  font-size: 14px;
  margin-bottom: 41px;
}
.first,
.second,
.third,
.fourth {
  padding: 27px 54px 26px 56px;
  border: 1px solid #eee;
  margin-bottom: 20px;
}
</style>

