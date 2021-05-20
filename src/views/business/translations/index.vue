<template>
  <page-frame>
    <div class="translations">
      <div class="title">
        <h1>Lovense translation system</h1>
        <div class="sub-title">
          <h3>For better effect, when you translate, it's better to make the sentence almost same length as the English
            text, you're able to view the effect in the test environment once you save it.
          </h3>
          <div class="btn-group">
            <span v-if="authority == '1000'" class="release-enviroment" @click="saveEnviroment('release')">Release the current language to <br/>official enviroment</span>
          </div>
        </div>
      </div>
      <div class="search-module">
        <el-form
            size="mini"
            :inline="true"
        >
          <form-select :config="template.software" :data="software" @updateForm="updateSearchForm"/>
          <form-select :config="template.language" :data="language" @updateForm="updateSearchForm"/>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="translationsGetList(1)">
              Search
            </el-button>
            <span class="release-test-enviroment" @click="saveEnviroment('save')">Release the current <br/>language to test enviroment</span>
          </el-form-item>
        </el-form>
      </div>
      <div v-loading="loadingFloor">
        <el-table
            class="table"
            :data="translationsList"
            border
            style="width: 100%;min-width: 1200px;overflow-y: auto;"
            height="650"
            size="mini"
        >
          <el-table-column

              prop="keyName"
              label="Key's name"
              :resizable="false"
          ></el-table-column>
          <el-table-column
              prop="english"
              label="English"
              :resizable="false"
          >
            <template #default="scope">
              <div v-if="languageSearch != '0'">{{ scope.row.english }}</div>
              <div v-else>
                <el-input v-model="scope.row.english" @input="englishChange(scope.row)" maxlength="256"></el-input>
              </div>

            </template>
          </el-table-column>
          <el-table-column
              label="Translations"
              :resizable="false"
              v-if="languageSearch != '0'"
          >
            <template #default="scope">
              <el-input v-model="scope.row.translations" @input="translationsChange(scope.row)"
                        maxlength="256"></el-input>
            </template>
          </el-table-column>
          <el-table-column
              prop="note"
              label="Note"
              :resizable="false"
          >
            <template #default="scope">
              <el-input v-model="scope.row.note" @blur="noteChange(scope.row, scope.$index)" maxlength="256" v-if="authority == '1000'"></el-input>
              <span v-else>{{scope.row.note}}</span>
            </template>
          </el-table-column>
          <el-table-column
              label="Attachment"
              :resizable="false"
          >
            <template #default="scope">
              <div>---{{ scope.row.attachment }}---</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--
        title 翻译弹框
        @param enviroment save/release btn按钮来源操作
        @param languageType  语言语种
        @param platform  平台(websist/remote)
        @param list  更新语言列表
        @function @returnFn 回调方法
      -->
      <save-translation v-if="isShowSaveTranslation&&enviroment&&languageSearch&&software" :enviroment="enviroment" :languageType="languageSearch" :platform="software" :list="englishChangeList" @returnFn="saveTranslationFn"></save-translation>
    </div>
  </page-frame>
</template>

<script>
import {reactive, ref, toRefs, getCurrentInstance, onMounted, watch} from 'vue'
import SaveTranslation from './component/save-translation.vue'

export default {
  name: 'TranslationsIndex',
  components: {
    SaveTranslation
  },
  setup() {

    /* 全局挂载utils工具类 start */
    const {$api, $common, $validate, $constant, $elUtils} = getCurrentInstance().proxy
    // console.log($api, $common, $validate, $constant)
    /* 全局挂载 end */

    const state = reactive({
      loadingFloor: false,
      template: {
        software: {
          label: 'Software',
          name: 'software',
          placeholder: '',
          rules: [],
          array: [],
        },
        language: {
          label: 'Language',
          name: 'language',
          placeholder: '',
          rules: [],
          array: [],
        }
      },
      software: '1',
      language: '',
      languageSearch: '',
      translationsList: [],
      fileValue: '',
      englishChangeList: [],  //保存修改语言翻译
      isShowSaveTranslation: false, //是否打开保存翻译弹框
      enviroment: '', // save保存/release发布
      authority: $common.getKeyVal('system', 'authority', true) || ''
    })



    onMounted(() => {
      state.template.software.array = [
        {
          key: '1',
          value: 'Lovense website'
        },
        {
          key: '2',
          value: 'Lovense remote'
        }
      ]
      if (!$validate.isNull(getLanguage())) {
        state.language = getLanguage()[0].key
        state.template.language.array = getLanguage()
      }
      translationsGetList()
    })


    /**
     * 获取当前语言
     */
    const getLanguage = () => {
      let authority = state.authority
      const languageList = $constant.languageList
      let arr = []
      if ($validate.isNull(authority)) return
      switch (String(authority)) {
          // 高级用户
        case '1000':
          arr = languageList
          break
          // 普通用户
        case '500':
          for (const a in languageList) {
            languageList[a].key !== '0' && arr.push(languageList[a])
          }
          break
        default:
          if (authority) {
            authority = authority.split(',')
            for (const a in languageList) {
              for (const b in authority) {
                if (languageList[a].key == authority[b]) {
                  arr.push(languageList[a])
                }
              }
            }
          }
      }
      return arr
    }
    /**
     * 子组件传递更新Form对象属性
     * @param key
     * @param valN
     */
    const updateSearchForm = (key, val) => {
      console.log(key, val)
      key = key.trim()
      state[key] = val
    }
    /**
     * 查询列表
     * @param pageNo页码
     */
    const translationsGetList = () => {
      let sendData = getVersionParam()
      state.loadingFloor = true
      $api.appGetTranslationsList(sendData).then((res) => {
        state.languageSearch = state.language
        state.translationsList = []
        // res = res.data
        if (res.code === 0 && !$validate.isNull(res.data)) {
          let arr = []
          for (const a in res.data) {

            res.data[a].oldNote = res.data[a].note
            res.data[a].oldLenguage = res.data[a].english
            res.data[a].oldTranslations = res.data[a].translations
            if (arr.length < 30) {
              arr.push(res.data[a])
            }
          }
          state.englishChangeList = []
          // state.translationsList = res.data
          state.translationsList = arr
        }
        state.loadingFloor = false
      }).catch((err) => {
        state.loadingFloor = false
      })
    }
    /**
     * 获取筛选列表条件
     */
    const getVersionParam = () => {
      let sendData = {}
      sendData.platformId = state.software
      sendData.languageType = state.language
      return sendData
    }

    /**
     * 添加上传图标
     */
    const addAttachment = () => {

    }

    const englishChange = (data) => {
      if ($validate.isNull(state.englishChangeList)) {
        state.englishChangeList.push(data)
      } else {
        let isVal = false
        for (const a in state.englishChangeList) {
          if (state.englishChangeList[a].id == data.id) {
            isVal = true
            if (data.english == data.oldLenguage) {
              state.englishChangeList.splice(a, 1)
            } else {
              state.englishChangeList[a] = data
            }
          }
        }
        if (!isVal) {
          state.englishChangeList.push(data)
        }
      }
    }
    const translationsChange = (data) => {
      if ($validate.isNull(state.englishChangeList)) {
        state.englishChangeList.push(data)
      } else {
        let isVal = false
        for (const a in state.englishChangeList) {
          if (state.englishChangeList[a].id == data.id) {
            isVal = true
            if (data.translations == data.oldTranslations) {
              state.englishChangeList.splice(a, 1)
            } else {
              state.englishChangeList[a] = data
            }
          }
        }
        if (!isVal) {
          state.englishChangeList.push(data)
        }
      }
    }
    /**
     * 失去焦点请求note修改保存
     * @param data
     * @param index 数组下标
     */
    const noteChange = (data, index) => {
      if(data.note == data.oldNote) return
      const paramObj = {
        id: data.id,
        languageType: state.languageSearch,
        note: data.note || ' '
      }
      $api.appSaveTranslationsNote(paramObj).then((res) => {
        state.translationsList[index].note = data.note
        state.translationsList[index].oldNote = data.note
        console.log('appSaveTranslationsNote', res)
        $elUtils.successMsg('note save success!')
      }).catch((err) => {
        state.translationsList[index].note = state.translationsList[index].oldNote
        $elUtils.errorMsg('Note save failed!')
      })
    }
    // save/release open弹框
    const saveEnviroment = (env) => {
      state.enviroment = env
      state.isShowSaveTranslation = true

    }
    // 翻译弹框回调
    const saveTranslationFn = (e)=>{
      console.log(e)
      state.isShowSaveTranslation = false
      if(e){
        translationsGetList()
      }
    }
    return {
      ...toRefs(state),
      updateSearchForm,
      translationsGetList,
      getVersionParam,
      addAttachment,
      getLanguage,
      englishChange,
      translationsChange,
      noteChange,
      saveEnviroment,
      saveTranslationFn
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.pagination {
  margin-bottom: 14px;

  .el-pagination {
    float: left;
  }

  p {
    float: left;
    line-height: 32px;
  }

  &:after {
    content: "";
    display: block;
    clear: both;
  }
}

.translations {
  width: 100%;
  box-sizing: border-box;
  //min-width: 1820px;

  .title {
    padding: 60px 50px;
    position: relative;

    h1 {
      text-align: center;
      display: block;
      font-weight: bold;
      font-size: 24px;
      margin-bottom: 50px;
    }

    h3 {
      max-width: 1200px;
      font-size: 16px;
      color: rgba(51, 51, 51, 0.525490196078431);
    }

    .btn-group {
      position: absolute;
      bottom: 17px;
      right: 30px;
      .release-enviroment{
        border: 1px solid #6699FF;
        color: #6699FF;
        padding: 2px 6px;
        display: inline-block;
        border-radius: 8px;
        text-align: center;
        font-size: 12px;
        line-height: 14px;
        background-color: rgba(236, 245, 255, 1);
        cursor: pointer;
      }
    }
  }

  .search-module {
    padding: 0 30px;
  }
}

.release-test-enviroment {
  border: 1px solid #6699FF;
  color: #6699FF;
  padding: 2px 6px;
  display: inline-block;
  border-radius: 8px;
  text-align: center;
  font-size: 12px;
  line-height: 14px;
  vertical-align: middle;
  display: inline-block;
  margin-left: 30px;
  background-color: rgba(236, 245, 255, 1);
  cursor: pointer;
}
</style>
