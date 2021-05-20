<template>
  <el-dialog
      title="Check the changes"
      v-model="show"
      width="50%"
      :before-close="reset"
  >
    <div class="redmine-dialog">
      <div class="language-change">
        <div class="content" v-if="!$validate.isNull(list) && enviroment == 'save'">
          <h3>There are {{ list.length }} changes.</h3>
          <!--当前语言除英语外-->
          <el-table
              :data="list"
              size="mini"
              v-if="languageType != '0'"
          >
            <el-table-column
                prop="keyName"
                label="Key's name"
                :resizable="false"
            ></el-table-column>
            <el-table-column
                prop="oldTranslations"
                label="The translations in the official environment"
                :resizable="false"
            ></el-table-column>
            <el-table-column
                prop="translations"
                label="The new translations"
                :resizable="false"
            ></el-table-column>
          </el-table>
          <!--当前为英语-->
          <el-table
              :data="list"
              size="mini"
              v-else
          >
            <el-table-column
                prop="keyName"
                label="Key's name"
                :resizable="false"
            ></el-table-column>
            <el-table-column
                prop="oldLenguage"
                label="The translations in the official environment"
                :resizable="false"
            ></el-table-column>
            <el-table-column
                prop="english"
                label="The new translations"
                :resizable="false"
            ></el-table-column>
          </el-table>
        </div>
        <div class="content" v-else-if="!$validate.isNull(languageList) && enviroment == 'release'">
          <h3>There are {{ languageList.length }} changes.</h3>
          <el-table
              :data="languageList"
              size="mini"
          >
            <el-table-column
                prop="oldTranslations"
                label="The translations in the official environment"
                :resizable="false"
            ></el-table-column>
            <el-table-column
                prop="translations"
                label="The new translations"
                :resizable="false"
            ></el-table-column>
          </el-table>
        </div>
        <div class="no-data" v-else>
          No updated translations
        </div>
      </div>
      <el-form
          label-width="120px"
          size="small"
      >
        <div class="btn">
          <el-form-item>
            <el-button @click="reset">
              Cancel
            </el-button>
            <el-button type="primary" @click="save" v-if="!$validate.isNull(list)">
              Release
            </el-button>
            <el-button type="primary" @click="release" v-if="!$validate.isNull(languageList)">
              Release
            </el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>

import {getCurrentInstance, reactive, toRefs, onMounted} from "vue"

export default {
  components: {},
  props: {
    // save/release btn按钮来源操作
    enviroment: {
      type: String,
      default: ''
    },
    // 语言语种
    languageType: {
      type: String,
      default: ''
    },
    // 平台(websist/remote)
    platform: {
      type: String,
      default: ''
    },
    // 更新语言列表
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup(props, context) {

    /* 全局挂载utils工具类 start */
    const {$api, $validate, $elUtils} = getCurrentInstance().proxy
    /* 全局挂载 end */

    const state = reactive({
      show: true,
      languageList: [],
      isChangeList: false
    })

    onMounted(() => {
      if (props.enviroment == 'release') {
        /**
         * 查询对比线上数据
         */
        getChangeTranslations()
      }
    })
    /**
     * 查询对比线上数据
     */
    const getChangeTranslations = () => {
      const paramObj = {
        languageType: props.languageType,
        platformId: props.platform
      }
      state.isChangeList = true
      $api.appGetChangeTranslations(paramObj).then((res) => {
        if (res.code === 0 && !$validate.isNull(res.data)) {
          state.languageList = res.data || []
        }
        console.log('查询对比线上数据', res)
        state.isChangeList = false
      }).catch((err) => {
        state.isChangeList = false
      })
    }

    /**
     * 关闭弹框
     */
    const reset = () => {
      context.emit('returnFn', false)
    }
    /**
     * save submit
     */
    const save = () => {
      let languageList = []
      for (const a in props.list) {
        let translations = ''
        if (props.languageType == '0') {
          translations = props.list[a].english
        } else {
          translations = props.list[a].translations
        }
        languageList.push({
          id: props.list[a].id,
          languageType: props.languageType,
          translations: translations
        })
      }

      $api.appSaveTranslations(languageList).then((res) => {
        console.log('save', res)
        $elUtils.successMsg('release success!')
        context.emit('returnFn', true)
      }).catch((err) => {
        $elUtils.successMsg('release failed!')
      })
    }
    /**
     * release submit
     */
    const release = () => {
      $api.appReleaseTranslations({languageType: Number(props.languageType) || 0}).then((res) => {
        console.log('release', res)
        $elUtils.successMsg('release success!')
        context.emit('returnFn', true)
      }).catch((err) => {
        // $elUtils.successMsg('release failed!')
      })
    }
    return {
      ...toRefs(state),
      reset,
      save,
      release,
      getChangeTranslations
    }
  }
}
</script>
<style lang="scss" scoped>
.btn {
  text-align: right;
}

.language-change {
  .content {
    margin-bottom: 30px;

    h3 {
      margin-bottom: 30px;
    }
  }

  .no-data {
    text-align: center;
  }
}
</style>
