<template>
  <div class="groupAdd">
    <div class="top">
      <span>{{$route.name}}</span>
    </div>
    <el-form ref="formData" :model="formData" :rules="rules" label-width="80px">
      <div class="first">
        <el-form-item label="社群名称" prop="community_name">
          <el-input v-model="formData.community_name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="社群头像">
          <el-upload class="avatar-uploader" :action="uploadImgUrl()" :show-file-list="false" :on-success="handleAvatarSuccess">
            <img v-if="formData.community_head_img" :src="formData.community_head_img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </div>
      <div class="second">
        <el-form-item label="社群分类">
          <el-select v-model="formData.community_classify_id" placeholder="请选择" size="small">
            <el-option v-for="item in classifyOptions" :key="item.id" :label="item.community_classify_name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="社群标签">
          <el-select v-model="formData.community_label_id" placeholder="请选择" size="small">
            <el-option v-for="item in labelOptions" :key="item.id" :label="item.community_label_name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="群主" prop="groupOwner">
          <el-select v-model="formData.groupOwner" filterable remote reserve-keyword placeholder="请选择群主" :remote-method="remoteAdmin" :loading="loading" popper-class="deputyGroupOwner" @change="changeAdmin" value-key="user_id" clearable>
            <el-option v-for="item in adminValues" :key="item.user_id" :label="item.nick_name" :value="item">
              <span style="position:absolute;left:10; color: #8492a6; font-size: 13px;line-height:50px">{{ item.nick_name }}</span>
              <span style="position:absolute;right:50px;"><img :src="item.head_img" class="img"></span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="副群主">
          <el-select v-model="formData.deputyGroupOwner" multiple filterable remote reserve-keyword placeholder="请选择副群主" :remote-method="remoteAss" :loading="loading" :multiple-limit="4" popper-class="deputyGroupOwner" @change="changeAssistant" value-key="user_id">
            <el-option v-for="item in assValues" :key="item.user_id" :label="item.nick_name" :value="item">
              <span style="position:absolute;left:10; color: #8492a6; font-size: 13px;line-height:50px">{{ item.nick_name }}</span>
              <span style="position:absolute;right:50px;"><img :src="item.head_img" class="img"></span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="群成员">
          <el-select v-model="formData.groupUser" multiple filterable remote reserve-keyword placeholder="请选择群成员" :remote-method="remoteMem" :loading="loading" popper-class="deputyGroupOwner" @change="changeMember" value-key="user_id">
            <el-option v-for="item in memValues" :key="item.user_id" :label="item.nick_name" :value="item">
              <span style="position:absolute;left:10; color: #8492a6; font-size: 13px;line-height:50px">{{ item.nick_name }}</span>
              <span style="position:absolute;right:50px;"><img :src="item.head_img" class="img"></span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-card class="box-card">
          <div class="admin">
            群主:
            <div class="admin-box" v-show="Object.keys(formData.groupOwner).length>0">
              <span class="admin-name" :title="formData.groupOwner.nick_name">{{formData.groupOwner.nick_name}}</span><br />
              <img class="admin-img" :src="formData.groupOwner.head_img">
              <i class="el-icon-close" @click="clearAdmin"></i>
            </div>
          </div>
          <div class="assistant">
            副群主:
            <div class="assistant-box" v-for="(item,index) in formData.deputyGroupOwner" :key="index">
              <span class="assistant-name" :title="item.nick_name">{{item.nick_name}}</span><br />
              <img class="assistant-img" :src="item.head_img">
              <i class="el-icon-close" @click="clearAssistant(item)"></i>
            </div>
          </div>
          <div class="member">
            群成员:
            <div class="member-box" v-for="(item,index) in formData.groupUser" :key="index">
              <span class="member-name" :title="item.nick_name">{{item.nick_name}}</span><br />
              <img class="member-img" :src="item.head_img">
              <i class="el-icon-close" @click="clearMember(item)"></i>
            </div>
          </div>
        </el-card>
      </div>
      <div class="third">
        <el-form-item label="背景图">
          <el-upload class="avatar-uploader" :action="uploadImgUrl()" :show-file-list="false" :on-success="handleAvatarSuccess1">
            <img v-if="formData.background_pic" :src="formData.background_pic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="formData.introduction" type="textarea" :autosize="{ minRows: 6, maxRows: 10}" placeholder="请输入内容"></el-input>
        </el-form-item>
      </div>
      <div class="fourth">
        <el-form-item label="推荐" prop="is_recommend">
          <el-radio v-model="formData.is_recommend" :label="0">是</el-radio>
          <el-radio v-model="formData.is_recommend" :label="1">否</el-radio>
        </el-form-item>
        <el-form-item label="外链地址">
          <el-input v-model="formData.url" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="权重">
          <el-select v-model="formData.weigh" placeholder="请选择" size="small">
            <el-option v-for="item in options2" :key="item.blockName" :label="item.blockName" :value="item.blockName">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formData')" v-if="$route.name=='添加社群'">添加</el-button>
        <el-button type="primary" @click="editForm('formData')" v-if="$route.name=='编辑社群'">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    var validate = (rule, value, callback) => {
      if (!value.user_id) {
        callback(new Error("请选择群主"));
      } else {
        callback();
      }
    };
    return {
      formData: {
        background_pic: "",
        community_head_img: "",
        groupUser: [],
        groupOwner: {},
        deputyGroupOwner: []
      },
      adminValues: [
        // { user_id: 1, nick_name: 1, head_img: 1 },
        // { user_id: 2, nick_name: 2, head_img: 2 },
        // { user_id: 3, nick_name: 3, head_img: 3 }
      ],
      assValues: [
        // { user_id: 1, nick_name: 1, head_img: 1 },
        // { user_id: 2, nick_name: 2, head_img: 2 },
        // { user_id: 3, nick_name: 3, head_img: 3 }
      ],
      memValues: [
        // { user_id: 1, nick_name: 1, head_img: 1 },
        // { user_id: 2, nick_name: 2, head_img: 2 },
        // { user_id: 3, nick_name: 3, head_img: 3 }
      ],
      rules: {},
      loading: false,
      classifyOptions: [],
      labelOptions: [],
      loading: false,
      options: [
        { label: 1 },
        { label: 2 },
        { label: 3 },
        { label: 4 },
        { label: 5 }
      ],
      classifyOptions: [
        { community_classify_name: "足球", id: 1 },
        { community_classify_name: "篮球", id: 2 }
      ],
      options2: [
        { blockName: 1 },
        { blockName: 2 },
        { blockName: 3 },
        { blockName: 4 },
        { blockName: 5 }
      ],

      rules: {
        groupOwner: [{ validator: validate, trigger: "change" }]
        //   sport_item: [
        //     { required: true, message: "请选择分类", trigger: "change" }
        //   ],
        // values: [{ required: true, message: "请选择标签", trigger: "change" }]
      }
    };
  },
  methods: {
    // 远程搜索
    remoteAdmin(query) {
      if (query !== "") {
        this.loading = true;
        var data = {
          page: 1,
          nick_name: query,
          user_id: "30be03b3acf543a3844ff4201c8155ae"
        };
        this.$axios.get("searchUser", data).then(res => {
          if (res.code == 200) {
            this.adminValues = res.data.userInfoList;
          }
        });
        setTimeout(() => {
          this.loading = false;
        }, 200);
      } else {
        this.adminValues = [];
      }
    },
    remoteAss(query) {
      if (query !== "") {
        this.loading = true;
        var data = {
          page: 1,
          nick_name: query,
          user_id: "30be03b3acf543a3844ff4201c8155ae"
        };
        this.$axios.get("searchUser", data).then(res => {
          if (res.code == 200) {
            this.assValues = res.data.userInfoList;
          }
        });
        setTimeout(() => {
          this.loading = false;
        }, 200);
      } else {
        this.assValues = [];
      }
    },
    remoteMem(query) {
      if (query !== "") {
        this.loading = true;
        var data = {
          page: 1,
          nick_name: query,
          user_id: "30be03b3acf543a3844ff4201c8155ae"
        };
        this.$axios.get("searchUser", data).then(res => {
          if (res.code == 200) {
            this.memValues = res.data.userInfoList;
          }
        });
        setTimeout(() => {
          this.loading = false;
        }, 200);
      } else {
        this.memValues = [];
      }
    },
    changeMember(val) {
      console.log(val);
      if (val.length > 0) {
        val.map(item => {
          if (this.formData.groupOwner.user_id == item.user_id) {
            this.formData.groupUser.splice(-1, 1);
            return this.$message.warning("该用户已是群主");
          }
          var index = this.formData.deputyGroupOwner.findIndex(function(x) {
            return x.user_id == item.user_id;
          });
          if (index !== -1) {
            this.formData.groupUser.splice(index, 1);
            return this.$message.warning("该用户已是副群主");
          }
        });
      }
    },
    changeAssistant(val) {
      console.log(val);
      if (val.length > 0) {
        val.map(item => {
          if (this.formData.groupOwner.user_id == item.user_id) {
            this.formData.deputyGroupOwner.splice(-1, 1);
            return this.$message.warning("该用户已是群主");
          }
          var index = this.formData.groupUser.findIndex(function(x) {
            return x.user_id == item.user_id;
          });
          if (index !== -1) {
            this.formData.deputyGroupOwner.splice(index, 1);
            return this.$message.warning("该用户已是群成员");
          }
        });
      }
    },
    changeAdmin(val) {
      console.log(val);
      var index = this.formData.deputyGroupOwner.findIndex(function(x) {
        return x.user_id == val.user_id;
      });
      if (index !== -1) {
        this.formData.groupOwner = {};
        return this.$message.warning("该用户已是副群主");
      }
      var index1 = this.formData.groupUser.findIndex(function(x) {
        return x.user_id == val.user_id;
      });
      if (index1 !== -1) {
        this.formData.groupOwner = {};
        return this.$message.warning("该用户已是群成员");
      }
    },
    clearAdmin() {
      this.formData.groupOwner = {};
    },
    clearAssistant(val) {
      var index = this.formData.deputyGroupOwner.indexOf(val);
      if (index !== -1) {
        this.formData.deputyGroupOwner.splice(index, 1);
      }
    },
    clearMember(val) {
      var index = this.formData.groupUser.indexOf(val);
      if (index !== -1) {
        this.formData.groupUser.splice(index, 1);
      }
    },
    uploadImgUrl() {
      return `${process.env.BASE_API}systemApiService/upload/image`;
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.formData.community_head_img = res.data.upload.url;
    },
    handleAvatarSuccess1(res, file) {
      console.log(res);
      this.formData.background_pic = res.data.upload.url;
    },
    beforeAvatarUpload(file) {},
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // //标签拼接
          let assistant = this.formData.deputyGroupOwner.map(item => {
            return item.user_id;
          });
          let member = this.formData.groupUser.map(item => {
            return item.user_id;
          });
          assistant = assistant.toString();
          member = member.toString();
          let data = {
            ...this.formData,
            groupOwner: {
              user_id: this.formData.groupOwner.user_id
            },
            deputyGroupOwner: {
              user_id: assistant
            },
            groupUser: {
              user_id: member
            }
          };
          console.log(data);
          this.$axios.get("addGroup", data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "社群添加成功"
              });
              this.$refs[formName].resetFields();
              this.$router.push({ path: "/group/group" });
            }
          });
        } else {
          this.$message({
            type: "warning",
            message: res.msg
          });
          console.log("error submit!!");
          return false;
        }
      });
    },
    editForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let assistant = this.formData.deputyGroupOwner.map(item => {
            return item.user_id;
          });
          let member = this.formData.groupUser.map(item => {
            return item.user_id;
          });
          assistant = assistant.toString();
          member = member.toString();
          let data = {
            ...this.formData,
            groupOwner: {
              user_id: this.formData.groupOwner.user_id
            },
            deputyGroupOwner: {
              user_id: assistant
            },
            groupUser: {
              user_id: member
            }
          };
          console.log(data);
          this.$axios.get("updateGroup", data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "社群编辑成功"
              });
              this.$refs[formName].resetFields();
              this.$router.push({ path: "/group/group" });
            }
          });
        } else {
          this.$message({
            type: "warning"
            // message: res.msg
          });
          console.log("error edit!!");
          return false;
        }
      });
    },
    getData() {
      this.$axios.get("infoGroup", { id: this.$route.query.id }).then(res => {
        if (res.code == 200) {
          this.formData = {
            ...res.data.associationDetail,
            groupUser: [],
            groupOwner: {},
            deputyGroupOwner: []
          };
          this.adminValues = res.data.associationDetail.groupUser.filter(
            item => {
              return item.role == 0;
            }
          );
          this.assValues = res.data.associationDetail.groupUser.filter(item => {
            return item.role == 1;
          });
          this.memValues = res.data.associationDetail.groupUser.filter(item => {
            return item.role == 2;
          });

          let admin = res.data.associationDetail.groupUser.filter(item => {
            return item.role == 0;
            F;
          });
          this.formData.groupOwner = { ...admin[0] };
          this.formData.deputyGroupOwner = res.data.associationDetail.groupUser.filter(
            item => {
              return item.role == 1;
            }
          );
          this.formData.groupUser = res.data.associationDetail.groupUser.filter(
            item => {
              return item.role == 2;
            }
          );
        }
      });
    },
    getOptions() {
      this.$axios.get("getClassify", { page: 1 }).then(res => {
        console.log(res);
        this.classifyOptions = res.data.communityClassifyList;
      });
    },
    getOptions1() {
      this.$axios
        .get("getRelativeLabel", {
          classifyId: this.formData.community_classify_id,
          page: 1
        })
        .then(res => {
          console.log(res);
          this.labelOptions = res.data.communityClassifyLabelList;
        });
    }
  },
  created() {
    if (this.$route.query.id) {
      this.getData();
    }
    this.getOptions();
  },
  watch: {
    "formData.community_classify_id": function(val) {
      this.getOptions1();
    }
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 130px;
  height: 130px;
  line-height: 130px !important;
  text-align: center;
}

.avatar {
  width: 130px;
  height: 130px;
  display: block;
}

.deputyGroupOwner .form-control {
  clear: none !important;
}
.groupUser .form-control {
  clear: none !important;
}
div.sp-result-area table.sp-table[data-v-07525036] {
  text-align: center;
}
.deputyGroupOwner .el-select-dropdown__item {
  height: 50px !important;
}
.deputyGroupOwner
  .el-select-dropdown.is-multiple
  .el-select-dropdown__item.selected::after {
  line-height: 50px !important;
}
</style>

 <style scoped>
.assValues {
  width: 500px;
}
.img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  text-align: center;
}
.groupAdd {
  padding: 30px 80px 0 90px;
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
.box-card {
  margin-top: 20px;
}
.admin,
.assistant,
.member {
  display: flex;
  text-align: center;
  margin-bottom: 20px;
}
.admin-img,
.assistant-img,
.member-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.admin-box,
.assistant-box,
.member-box {
  position: relative;
  margin-left: 10px;
  padding: 10px;
  border: 1px solid #eee;
}
.admin-name,
.assistant-name,
.member-name {
  display: inline-block;
  width: 80px;
  word-break: keep-all;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.admin-box > i,
.assistant-box > i,
.member-box > i {
  position: absolute;
  top: 0px;
  right: 0px;
  color: red;
  cursor: pointer;
}
</style>

