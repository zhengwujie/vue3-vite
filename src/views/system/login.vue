<template>
  <div class="login-body">
    <div class="login-container">
      <div class="head">
        <div class="name">
          <div class="title">Lovense translation system</div>
        </div>
      </div>
      <el-form label-position="top" :model="ruleForm" ref="loginForm" class="login-form">
        <el-form-item class="username">
          <el-input type="text" v-model.trim="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="password">
          <el-input type="password" v-model.trim="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button style="width: 100%" @click="submitForm" class="submit">Log In</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
import {reactive, ref, toRefs, getCurrentInstance} from 'vue'
import $elUtils from "../../utils/el-utils";

export default {
  name: 'Login',
  setup() {

    /* 全局挂载utils工具类 start */
    const {proxy} = getCurrentInstance()
    const {$api, $common, $validate, $router, $elUtils} = proxy

    /* 全局挂载 end */

    const loginForm = ref(null)
    const state = reactive({
      ruleForm: {
        username: '',
        password: ''
      },
      checked: true,
      rules: {
        username: [
          {required: 'true', message: '账户不能为空', trigger: 'blur'}
        ],
        password: [
          {required: 'true', message: '密码不能为空', trigger: 'blur'}
        ]
      }
    })
    const submitForm = async () => {
      console.log('state.ruleForm', state.ruleForm)
      if ($validate.isNull(state.ruleForm.username) || $validate.isNull(state.ruleForm.password)) {
        $elUtils.warnMsg('Account or password is not correct, please check.')
        return
      }
      const paramObj = {
        account: state.ruleForm.username || '',
        userPassword: md5(state.ruleForm.password),
        pwd: state.ruleForm.password,
      }
      $api.appLogin(paramObj).then((res) => {
        if (res.code == 0 && !$validate.isNull(res.data)) {
          res.data.authority && $common.setKeyVal('system', 'authority', res.data.authority, true)
          $router.push({name: 'TranslationsIndex'})
          $elUtils.successMsg('login success!!')
        } else {
          $elUtils.errorMsg(res.message)
        }
      }).catch((err) => {
        $elUtils.errorMsg(err.message)
      })

    }
    const resetForm = () => {
      // loginForm.value.resetFields();
    }
    return {
      ...toRefs(state),
      loginForm,
      submitForm,
      resetForm
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.login-body {
  display: flex;
  /*x轴对齐*/
  justify-content: center;
  /*y轴对齐*/
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #fff;
  //padding-top: 180px;
  .login-container {
    width: 500px;
    height: 380px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);

    .head {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 30px;
      padding: 40px 0 20px 0;

      .title {
        font-size: 24px;
        color: #333333;
        font-weight: bold;
      }
    }

    .login-form {
      width: 70%;
      margin: 0 auto;

      .username {
      }

      .password {
        margin: 20px 0 40px;
      }

      .btn {
        .submit {
          background-color: rgba(255, 45, 137, 1);
          color: #ffffff;
          padding: 14px 20px;
          font-size: 16px;
        }
      }
    }
  }
}


</style>
