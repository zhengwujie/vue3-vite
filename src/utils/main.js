import moment from 'moment'
import $validate from './validate'
import store from '@/store'

/**
 * 公用脚本方法类
 */
export default {
  /**
   * 格式化时间
   * pattern
   * yyyy-MM-dd HH:mm:ss
   * @param datetime
   * @param pattern
   */
  format(datetime, pattern) {
    return moment(datetime).format(pattern)
  },
  /**
   * 深度拷贝对象
   *
   * @param data
   * @returns {*}
   */
  deepClone(data) {
    const type = getType(data)
    let obj
    if (type === 'array') {
      obj = []
    } else if (type === 'object') {
      obj = {}
    } else {
      return data
    }
    if (type === 'array') {
      for (let i = 0, len = data.length; i < len; i++) {
        obj.push(this.deepClone(data[i]))
      }
    } else if (type === 'object') {
      for (const key in data) {
        obj[key] = this.deepClone(data[key])
      }
    }
    return obj

    /**
     * 获取对象属性类型
     *
     * @param e
     * @returns {string}
     */
    function getType(e) {
      if (e == null) {
        return ''
      }
      if (e.constructor === Array) {
        return 'array'
      } else if (e.constructor === Object) {
        return 'object'
      } else if (e.constructor === String) {
        return 'string'
      } else if (e.constructor === Number) {
        return 'number'
      } else if (e.constructor === Boolean) {
        return 'boolean'
      }
      return ''
    }
  },
  /**
   * 存储 store , sessionStorage
   * 注意传参格式
   * @param {String} module
   * @param {String} key
   * @param {String} val
   * @param {String} isLocal 可不传 true/false 是否深度存储
   */
  setKeyVal(module, key, val, isLocal) {
    const fnName = module + '/Update' + key.substring(0, 1).toUpperCase() + key.substring(1)
    const type = $validate.judgeTypeOf(val)
    if (type !== 'String' && type !== 'Undefined' && type !== 'Null') {
      store.dispatch(fnName, val)
      if (isLocal) {
        // let val1 = this.deepCloneObj(val)
        const val1 = JSON.stringify(val)
        window.localStorage.setItem(key, val1)
      }
    } else {
      if (isLocal) {
        window.localStorage.setItem(key, val)
      }

      try {
        if (val.match(/\{/)) { // 若匹配到{则说明是json字符
          val = JSON.parse(val)
        }
      } catch (e) {
        // dosome...
      } finally {
        if (type === 'String') {
          store.dispatch(fnName, val)
        }
      }
    }
  },
  /**
   * 获取 store,sessionStorage
   * @param {String} module 模块名字
   * @param {String} key state属性
   * @param {Boolean} isLocal true/false 是否深度存储
   */
  getKeyVal(module, key, isLocal) {
    let val = store.state[module][key]
    if ($validate.isNull(val) && !$validate.isNull(isLocal)) {
      val = window.localStorage.getItem(key)
      if (!$validate.isNull(val)) {
        this.setKeyVal(module, key, val)

        const type = $validate.judgeTypeOf(val)
        if (type === 'String' && val.match(/\{/)) { // 若匹配到{则说明是json字符
          val = JSON.parse(val)
        }
      }
    }
    return val
  },
  /**
   * 清除前后空格
   * @param val
   */
  clearSpace(val) {
    let value = val
    if (value) {
      value = value.replace(/(^\s*)|(\s*$)/g, '')
    }
    return value
  },
  getImgUrl(img) {
    return require('@/assets/' + img)
  },
  formatDate(date, fmt = 'yyyy-MM-dd') {
    if (typeof (date) === 'number') {
      date = new Date(date)
    }
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
    }
    return fmt
  },
  demo(){
    return 'demo test fn'
  },
}
