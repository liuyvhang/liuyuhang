<template>
  <div class="bannerAdd">
    <div class="top">
      <span>{{$route.name}}</span>
    </div>
    <el-form ref="formData" :model="formData" :rules="rules" label-width="100px">
      <div class="first">
        <el-form-item label="标题" prop="title">
          <el-input v-model="formData.title" placeholder="请输入内容"></el-input>
        </el-form-item>
        <!-- <el-form-item label="Banner图" prop="title_image">
          <el-upload class="avatar-uploader" :action="uploadImgUrl()" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="formData.title_image" :src="formData.title_image" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="addImage">插入图片</el-button>
        </el-form-item>
        <el-form-item v-for="(url, index) in formData.urls" :label="'外链地址' + index" :key="url.key" :prop="'urls.' + index + '.url'">
          <el-input v-model="url.url" style="width:200px;"></el-input>
          <el-button @click.prevent="removeUrl(url)">删除</el-button>
        </el-form-item>
        <el-form-item v-for="(image, index) in formData.images" :label="'图片' + index" :key="image.key" :prop="'images.' + index + '.image'">
          <el-upload class="upload-demo" :action="uploadImgUrl()" :on-preview="handlePreview" :on-remove="handleRemove" list-type="picture" :limit='1' :on-exceed="handleExceed">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </div>
      <div class="second">
        <el-form-item label="分类" prop="classify">
          <el-select v-model="formData.classify" placeholder="请选择" size="small">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="频道模块" prop="channel_module">
                    <el-select v-model="formData.channel_module" placeholder="请选择" size="small">
                        <el-option v-for="item in options3" :key="item.blockName" :label="item.blockName" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item> -->
        <el-form-item label="作者" prop="author">
          <el-input v-model="formData.author" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="Banner描述" prop="desc">
          <el-input v-model="formData.summary" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"></el-input>
        </el-form-item>
      </div>
      <div class="third">
        <!-- <el-form-item label="外链地址" prop="url">
          <el-input v-model="formData.url" v-if="$route.name=='生成轮播图'" disabled></el-input>
          <el-input v-model="formData.url" placeholder="请输入内容" v-else></el-input>
        </el-form-item> -->
        <el-form-item label="权重" prop="weigh">
          <el-select v-model="formData.weigh" placeholder="请选择" size="small">
            <el-option v-for="item in options2" :key="item.blockName" :label="item.blockName" :value="item.blockName">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formData')" v-if="$route.name=='新增轮播图'">添加</el-button>
        <el-button type="primary" @click="editForm('formData')" v-if="$route.name=='编辑轮播图'">保存</el-button>
        <el-button type="primary" @click="addForm('formData')" v-if="$route.name=='生成轮播图'">生成</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        urls: [],
        images: []
      },
      options: [],
      options1: [
        { label: "推荐轮播页", value: 0 },
        { label: "专题页", value: 1 },
        { label: "快讯页", value: 2 }
      ],
      options2: [
        { blockName: 1 },
        { blockName: 2 },
        { blockName: 3 },
        { blockName: 4 },
        { blockName: 5 }
      ],
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        classify: [
          { required: true, message: "请选择分类", trigger: "change" }
        ],
        title_image: [
          { required: true, message: "请上传图片", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    //新增图片
    addImage() {
      this.formData.images.push({
        image: "",
        key: Date.now()
      });
      this.formData.urls.push({
        url: "",
        key: Date.now()
      });
    },
    //删除外链
    removeUrl(item) {
      var index = this.formData.urls.indexOf(item);
      if (index !== -1) {
        // this.formData.images.splice(index, 1);
        this.formData.urls.splice(index, 1);
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`一次最多上传 1 张图片，如有需求点击插入图片`);
    },
    // 遍历value
    multipleValues(val) {
      this.values = [];
      val.map(item => {
        this.values.push(item.id);
      });
    },
    //上传成功
    handleAvatarSuccess(res, file) {
      console.log(res.data);
      this.formData.title_image = res.data.url;
      console.log(this.formData.title_image);
    },
    //上传前的验证
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isGIF = file.type === "image/gif";
      const isPNG = file.type === "image/png";
      const isBMP = file.type === "image/bmp";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isGIF && !isPNG && !isBMP) {
        this.common.errorTip("上传图片必须是JPG/GIF/PNG/BMP 格式!");
      }
      if (!isLt2M) {
        this.common.errorTip("上传图片大小不能超过 2MB!");
      }
      return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
    },
    //上传图片地址
    uploadImgUrl() {
       return `${process.env.BASE_API}systemApiService/upload/image`;
    },
    //获取content
    getText(val) {
      this.formData.contentText = val;
    },
    //提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            ...this.formData
          };
          console.log(data);
          // this.$axios.post("addNews", data).then(res => {
          //   if (res.code == 200) {
          //     this.$message({
          //       type: "success",
          //       message: "资讯添加成功"
          //     });
          //     this.$refs[formName].resetFields();
          //     this.$router.push({ path: "/news/news" });
          //   }
          // });
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
    //编辑
    editForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            ...this.formData,
            id: this.$route.query.id
          };
          console.log(data);
          this.$axios.post("updateNews", data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "频道编辑成功"
              });
              this.$refs[formName].resetFields();
              this.$router.push({ path: "/news/news" });
            }
          });
        } else {
          this.$message({
            type: "warning",
            message: res.msg
          });
          console.log("error edit!!");
          return false;
        }
      });
    },
    //获取数据
    getData() {
      this.$axios
        .get("infoBanner", { news_id: this.$route.query.id })
        .then(res => {
          console.log(res);
          this.formData = res.data.news;
        });
    },
    //获取标签
    getOptions() {
      this.$axios.get("getLabel", { parent_id: "0" }).then(res => {
        console.log(res);
        this.options = res.data.label_list;
      });
    }
    //新增图片按钮和输入框
  },
  created() {
    if (this.$route.name == "编辑轮播图") {
      this.getData();
    }
    if (this.$route.name == "生成轮播图") {
      this.formData.url = this.$route.query.id;
    }
    this.getOptions();
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
.bannerAdd .form-control {
  clear: none !important;
}
</style>

 <style scoped>
.bannerAdd {
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
</style>

