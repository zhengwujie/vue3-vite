<template>
  <div class="">翻译</div>
</template>

<script>
import md5 from 'js-md5'
import { reactive, ref, toRefs ,getCurrentInstance } from 'vue'
// import { localSet } from '@/utils'
// import {ElMessage} from 'element-plus'
export default {
  name: 'Login',
  setup() {

    /* 全局挂载 start */
    const { proxy } = getCurrentInstance()
    const $constant = proxy.$constant
    const $api = proxy.$api
    const $common = proxy.$common
    const $validate = proxy.$validate
    const ElMessage = proxy.ElMessage
    console.log($api)
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
          { required: 'true', message: '账户不能为空', trigger: 'blur' }
        ],
        password: [
          { required: 'true', message: '密码不能为空', trigger: 'blur' }
        ]
      }
    })
    const submitForm = async () => {
      console.log('state.ruleForm',state.ruleForm)
      const paramObj = {
        account:state.ruleForm.username || '',
        userPassword: md5(state.ruleForm.password),
        pwd: state.ruleForm.password,
      }
      $api.appLogin(paramObj).then((res)=>{
        if( res.code == 0 && !$validate.isNull(res.data)){
          res.data.authority && $common.setKeyVal('system','authority',res.data.authority)
        }
        console.log('res',res)
      }).catch((err)=>{
        ElMessage({
          message: err.message,
          type: 'error'
        })
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
      margin-bottom: 50px;
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
      .username{}
      .password{
        margin: 20px 0 40px;
      }
      .btn{
        .submit{
          background-color: rgba(255, 45, 137, 1);
          color: #ffffff;
          padding:14px 20px;
          font-size: 16px;
        }
      }
    }
  }
}



</style>
