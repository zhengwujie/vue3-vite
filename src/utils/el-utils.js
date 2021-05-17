import { ElLoading, ElMessage } from 'element-plus'
/**
 * element 自定义封装脚本方法，特针对模板生成组件
 */
export default {
  /**
   * 重置组件
   *
   * @param that
   * @param name
   */
  reset(that, name) {
    that.$refs[name].resetFields()
  },
  /**
   * 错误提醒
   *
   * @param msg
   */
  errorMsg(msg) {
    ElMessage({
      message: msg,
      type: 'error',
      duration: 5 * 1000,
      showClose: true
    })
  },
  /**
   * 成功提醒
   * @param msg
   */
  successMsg(msg, closeTime) {
    ElMessage({
      showClose: true,
      message: msg,
      type: 'success',
      duration: closeTime || 3 * 1000
    })
  },
  /**
   * 警告提醒
   *
   * @param msg
   */
  warnMsg(msg, closeTime) {
    ElMessage({
      showClose: true,
      message: msg,
      type: 'warning',
      duration: closeTime || 3 * 1000
    })
  },
  startElLoading() {
    ElLoading.service({})
  },

  endElLoading() {
    const loading = ElLoading.service({})
    setTimeout(() => {
      loading.close()
    }, 500)
  }
}
