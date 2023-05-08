<template>
  <div class="logincontainer">
    <el-form
      class="formstyle"
      :model="loginModel"
      ref="loginForm"
      :rules="rules"
      size="default"
    >
      <el-form-item style="display: flex; justify-content: center">
        <div class="loginTitleStyle">"Internet+"智慧社区物资管理系统</div>
      </el-form-item>
      <el-form-item prop="username">
        <el-input
          size="large"
          v-model="loginModel.username"
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          size="large"
          v-model="loginModel.password"
          placeholder="请输入密码"
          :show-password="true"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-row :gutter="20">
          <el-col :span="16" :offset="0">
            <el-input
              size="large"
              v-model="loginModel.code"
              placeholder="请输入验证码"
            ></el-input>
          </el-col>
          <el-col :span="8" :offset="0">
            <img :src="imgSrc" class="image" @click="getImage" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row style="width:100%;margin-top: 20px;">
          <el-col :span="12" :offset="0" style="padding-right: 10px; padding-left: 0px">
            <el-button style="width:100%;" size="large" color="#A78B7E" plain @click="onSubmit">登录</el-button>
          </el-col>
          <el-col :span="12" :offset="0" style="padding-right: 0px; padding-left: 10px">
            <el-button color="#fff" plain style="width:100%; color:#000" size="large" @click="onRefresh">重置
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import imageCode from "@/composables/login/imageCode";
import type { FormInstance } from "element-plus";
import { useRouter } from "vue-router";
import { login } from "@/api/login";
import { loginStore } from "@/stores/login";

const { imgSrc, getImage } = imageCode();
const router = useRouter();
//获取store
const store = loginStore();
const loginForm = ref<FormInstance>();
const onRefresh = () => {
  loginForm.value?.resetFields();
  getImage();
};
//表单对象
const loginModel = reactive({
  username: "",
  password: "",
  code: ""
});
//表单验证规则
const rules = reactive({
  username: [
    {
      required: true,
      message: "请输入账号",
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur"
    }
  ],
  code: [
    {
      required: true,
      message: "请输入验证码",
      trigger: "blur"
    }
  ]
});
//登录提交
const onSubmit = () => {
  loginForm.value?.validate(async (valid) => {
    if (valid) {
      let res: any = await login(loginModel);
      if (res && res.code == 200) {
        //存储token和userId
        console.log(res);
        store.setToken(res.data.token);
        store.setUserId(res.data.userId);
        //跳转到首页
        router.push({ path: "/" });
      }
    }
  });
};
</script>

<style scoped lang="scss">
.logincontainer {
  background-color: #DFD8D2;
  height: 100%;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .formstyle {
    border-radius: 10px;
    background-color: #DFD8D2;
    height: 300px;
    width: 460px;
    padding: 20px 35px;

    .loginTitleStyle {
      width: 100%;
      font-size: 24px;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .image {
      height: 40px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
}
</style>
