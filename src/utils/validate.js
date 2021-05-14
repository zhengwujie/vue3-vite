/**
 * 验证工具类
 */

export default {

    /**
     * 合法uri
     * @param textval
     * @returns {boolean}
     */
    isURL(textval) {
        const urlregex = /^(http:\/\/|^https:\/\/|^\/\/)((\w|=|\?|\.|\/|&|-)+)/g
        return urlregex.test(textval)
    },

    /**
     * 验证pad还是pc
     * @returns {boolean}
     */
    isPc() {
        const userAgentInfo = navigator.userAgent
        const Agents = ['Android', 'iPhone',
            'SymbianOS', 'Windows Phone',
            'iPad', 'iPod']
        let flag = true
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false
                break
            }
        }
        return flag
    },

    /**
     * validate email
     * @param email
     * @returns {boolean}
     */
    isEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email)
    },

    /**
     * 判断身份证号码
     */
    isCardid(code) {
        const list = []
        let result = true
        let msg = ''
        var city = {
            11: '北京',
            12: '天津',
            13: '河北',
            14: '山西',
            15: '内蒙古',
            21: '辽宁',
            22: '吉林',
            23: '黑龙江 ',
            31: '上海',
            32: '江苏',
            33: '浙江',
            34: '安徽',
            35: '福建',
            36: '江西',
            37: '山东',
            41: '河南',
            42: '湖北 ',
            43: '湖南',
            44: '广东',
            45: '广西',
            46: '海南',
            50: '重庆',
            51: '四川',
            52: '贵州',
            53: '云南',
            54: '西藏 ',
            61: '陕西',
            62: '甘肃',
            63: '青海',
            64: '宁夏',
            65: '新疆',
            71: '台湾',
            81: '香港',
            82: '澳门',
            91: '国外 '
        }
        if (!this.isNull(code)) {
            if (code.length === 18) {
                if (!code || !/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(code)) {
                    msg = '证件号码格式错误'
                } else if (!city[code.substr(0, 2)]) {
                    msg = '地址编码错误'
                } else {
                    // 18位身份证需要验证最后一位校验位
                    code = code.split('')
                    // ∑(ai×Wi)(mod 11)
                    // 加权因子
                    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
                    // 校验位
                    var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2, 'x']
                    var sum = 0
                    var ai = 0
                    var wi = 0
                    for (var i = 0; i < 17; i++) {
                        ai = code[i]
                        wi = factor[i]
                        sum += ai * wi
                    }
                    // var last = parity[sum % 11]
                    if (parity[sum % 11] !== code[17]) {
                        msg = '证件号码校验位错误'
                    } else {
                        result = false
                    }
                }
            } else {
                msg = '证件号码长度不为18位'
            }
        } else {
            msg = '证件号码不能为空'
        }
        list.push(result)
        list.push(msg)
        return list
    },

    /**
     * 判断手机号码是否正确
     * flag true 验证通过 false 验证失败
     */
    isMobile(phone) {
        const obj = {
            flag: true,
            msg: ''
        }
        // 增加134 减少|1349[0-9]{7}，增加181,增加145，增加17[678]
        if (!this.isNull(phone)) {
            if (phone.length === 11) {
                const isPhone = /^[1][3,4,5,7,8][0-9]{9}$/
                if (!isPhone.test(phone)) {
                    obj.msg = '手机号码格式不正确'
                    obj.flag = false
                    //    eltool.errorMsg(obj.msg)
                }
            } else {
                obj.msg = '手机号码长度不为11位'
                obj.flag = false
                //  eltool.errorMsg(obj.msg)
            }
        } else {
            obj.msg = '手机号码不能为空'
            obj.flag = false
            //    eltool.errorMsg(obj.msg)
        }

        return obj
    },

    /**
     * 判断姓名是否正确
     */
    isName(name) {
        var regName = /^[\u4e00-\u9fa5]{2,4}$/
        if (!regName.test(name)) return false
        return true
    },

    /**
     * 判断是否为整数
     */
    isNum(num, type) {
        let regName = /[^\d.]/g
        if (type === 1) {
            if (!regName.test(num)) return false
        } else if (type === 2) {
            regName = /[^\d]/g
            if (!regName.test(num)) return false
        }
        return true
    },

    /**
     * 判断是否为小数
     */
    isDecimals(num, type) {
        let regName = /[^\d.]/g
        if (type === 1) {
            if (!regName.test(num)) return false
        } else if (type === 2) {
            regName = /[^\d.]/g
            if (!regName.test(num)) return false
        }
        return true
    },

    /**
     * 判断是否为空
     */
    isNull(val) {
        if (val instanceof Array) {
            if (val.length === 0) return true
        } else if (val instanceof Object) {
            if (JSON.stringify(val) === '{}') return true
        } else {
            if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '') return true
            return false
        }
        return false
    },

    // 判断是否为图片
    isPicture(url) {
        //strFilter必须是小写列举
        let strFilter = ".jpeg|.gif|.jpg|.png|.bmp|.pic|.svg|"
        if (url.indexOf(".") > -1) {
            let p = url.lastIndexOf(".")
            let strPostfix = url.substring(p, url.length)
            strPostfix = strPostfix.toLowerCase()
            if (strFilter.indexOf(strPostfix) > -1) {
                return true
            }
        }
        return
    },

    /**
     * 判断数据类型
     * @param {各种数据类型} o
     */
    judgeTypeOf(o) {
        var typeArr = ['String', 'Object', 'Number', 'Array', 'Undefined', 'Function', 'Null', 'Symbol']
        let name = ''
        for (const a of typeArr) {
            name = '[object ' + a + ']'
            if (Object.prototype.toString.call(o) === name) {
                return a
            }
        }
    }
}
 