<template>
  <div class="login px-lg py-lg mt-md">
    <!-- 手机验证码登录 -->
    <div v-if="loginWay === 'verifyCode'">
      <div :class="{ 'pb-md': !errorTips.phone, 'mb-xs': true }">
        <el-input
          class="mb-xs"
          v-model="form.phone"
          placeholder="请输入手机号"
          @focus="handeFocusInput('phone')"
        ></el-input>
        <div v-if="errorTips.phone" class="font-error error-tips">
          请输入正确的手机号
        </div>
      </div>
      <div :class="{ 'pb-md': !errorTips.code, 'mb-xs': true }">
        <div class="d-flex items-center justify-between mb-xs">
          <el-input
            v-model="form.code"
            placeholder="请输入验证码"
            @focus="handeFocusInput('code')"
          ></el-input>
          <el-button
            class="ml-sm send-code"
            plain
            :disabled="isSending"
            @click="handleSendCode"
          >
            <span v-if="!isSending">发送验证码</span>
            <span v-if="isSending">{{ timeNum }} s</span>
          </el-button>
        </div>
        <div v-if="errorTips.code" class="font-error error-tips">
          请输入正确的验证码
        </div>
      </div>
    </div>

    <!-- 用户名密码登录 -->
    <div v-if="loginWay === 'password'">
      <div :class="{ 'pb-md': !errorTips.userName, 'mb-xs': true }">
        <el-input
          class="mb-xs"
          v-model="form.userName"
          placeholder="请输入用户名"
          @focus="handeFocusInput('userName')"
        ></el-input>
        <div v-if="errorTips.userName" class="font-error error-tips">
          请输入正确的用户名
        </div>
      </div>
      <div :class="{ 'pb-md': !errorTips.password, 'mb-xs': true }">
        <el-input
          class="mb-xs"
          show-password
          placeholder="请输入密码"
          v-model="form.password"
          @focus="handeFocusInput('password')"
        ></el-input>
        <div v-if="errorTips.password" class="font-error error-tips">
          请输入正确的密码
        </div>
      </div>
    </div>

    <!-- 底部按钮 -->
    <el-button type="primary" class="w-100" @click="handleLogin">
      登录
    </el-button>
    <div class="login-way d-flex items-center justify-between font-primary">
      <span class="point" @click="handleSwitchWay(loginWay)">
        {{ loginWay === "verifyCode" ? "其他登录方式" : "手机号登录" }}
      </span>
      <span v-if="loginWay === 'password'" class="point">忘记密码</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onUnmounted } from "vue";
import { Message } from "element3";
import { LoginForm } from "./index.type";
import { userStore } from "@/store/user";
import api from "@/api/index";

// 当前登录方式
const loginWay = ref<string>("verifyCode");
// 是否发送验证码
const isSending = ref<boolean>(false);
// 倒计时
const timeNum = ref<number>(60);
// 定时器
const timer = ref(null);
// 手机号正则
const regExp = new RegExp("^1[3578]\\d{9}$");
// 错误提示
const errorTips = ref<LoginForm>({
  phone: "",
  code: "",
  password: "",
  userName: "",
});
// 表单
const form = reactive<LoginForm>({
  phone: "",
  code: "",
  password: "",
  userName: "",
});
// 用户store
const useStore = userStore();
// 路由信息
const router = useRouter();

onUnmounted(() => {
  clearInterval(timer.value);
});

// 发送验证码
const handleSendCode = (): void => {
  if (!regExp.test(form.phone)) {
    errorTips.value = {
      code: "",
      password: "",
      userName: "",
      phone: "请输入正确的手机号",
    };
    return;
  }
  isSending.value = true;
  timer.value = setInterval(() => {
    timeNum.value = timeNum.value - 1;
    if (timeNum.value === 0) {
      isSending.value = false;
      clearInterval(timer.value);
    }
  }, 1000);
};

// 切换登录方式
const handleSwitchWay = (type: string): void => {
  errorTips.value = { code: "", password: "", phone: "", userName: "" };
  loginWay.value = type === "verifyCode" ? "password" : "verifyCode";
};

// 登录
const handleLogin = async (): Promise<void> => {
  if (handleValiField()) return;

  // const res = await api.login(null);

  if (form.phone === "18984302014" && form.code === "123456") {
    Message({
      message: "花点系统欢迎您，登录成功！",
      type: "success",
      duration: 2000,
    });
    router.push("/");
    // 设置用户信息stroe
    useStore.setUser({
      imgUrl: null,
      name: "admin",
      phone: "189****2014",
      email: "admin@yeah.net",
      createDate: "2012-12-12",
    });
  }
};

// 获取焦点
const handeFocusInput = (type: string): void => {
  if (type === "code") {
    errorTips.value.code = "";
  }
  if (type === "phone") {
    errorTips.value.phone = "";
  }
  if (type === "password") {
    errorTips.value.password = "";
  }
  if (type === "userName") {
    errorTips.value.userName = "";
  }
};

// 校验
const handleValiField = (): boolean => {
  if (!regExp.test(form.phone) && loginWay.value === "verifyCode") {
    errorTips.value.phone = "请输入正确的手机号";
  }
  if (!form.code && loginWay.value === "verifyCode") {
    errorTips.value.code = "请输入正确的验证码";
  }
  if (!regExp.test(form.userName) && loginWay.value === "password") {
    errorTips.value.userName = "请输入正确的用户名";
  }
  if (!form.password && loginWay.value === "password") {
    errorTips.value.password = "请输入正确的密码";
  }

  if (
    errorTips.value.code ||
    errorTips.value.phone ||
    errorTips.value.userName ||
    errorTips.value.password
  )
    return true;
  return false;
};
</script>

<style lang="scss" scoped>
.login {
  width: 400px;
  margin: 0 auto;
  border-radius: 4px;
  border: 1px solid #eee;
}
.error-tips {
  font-size: 14px;
  text-align: left;
  height: 16px;
  line-height: 16px;
}
.send-code {
  min-width: 120px;
}
.login-way {
  font-size: 14px;
  margin-top: 16px;
}
</style>
