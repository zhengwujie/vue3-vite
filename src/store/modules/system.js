const user = {
  namespaced: true,
  state: {
    // ctoken: '', // ctoken存储
    // refreshToken: '',
    // userInfo: '', // 用户信息
    // avatar: '',
    // nickName: '',
    authority:'' //会员级别
  },
  mutations: {
    // UPDATE_CTOKEN(state, ctoken) {
    //   state.ctoken = ctoken
    // },
    // UPDATE_REFRESH_TOKEN(state, refreshToken) {
    //   state.refreshToken = refreshToken
    // },
    // UPDATE_USERINFO(state, userInfo) {
    //   state.userInfo = userInfo
    // },
    // UPDATE_AVATAR(state, avatar) {
    //   state.avatar = avatar
    // },
    // UPDATE_NICKNAME(state, nickName) {
    //   state.nickName = nickName
    // },
    UPDATE_AUTHORITY(state, authority) {
      state.authority = authority
    }
  },
  actions: {
    // UpdateCtoken({ commit }, data) {
    //   commit('UPDATE_CTOKEN', data)
    // },
    // UpdateRefreshToken({ commit }, data) {
    //   commit('UPDATE_REFRESH_TOKEN', data)
    // },
    // UpdateUserInfo({ commit }, data) {
    //   commit('UPDATE_USERINFO', data)
    // },
    // UpdateAvatar({ commit }, data) {
    //   commit('UPDATE_AVATAR', data)
    // },
    // UpdateNickName({ commit }, data) {
    //   commit('UPDATE_NICKNAME', data)
    // },
    UpdateAuthority({ commit }, data) {
      commit('UPDATE_AUTHORITY', data)
    }
  }
}
export default user
