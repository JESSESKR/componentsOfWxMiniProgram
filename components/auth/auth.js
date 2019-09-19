Component({
  properties: {
    //是否能关闭组件弹出框
    canClose: {
      type: Boolean,
      value: true
    }
  },

  data: {
    showAuthModal: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    authCallback: null,
  },

  methods: {
    //点击授权
    confirmGetUserInfo(e) {
      //同意或拒绝后关闭授权框
      if (this.data.canClose) {
        this.closeAuthModal();
      }
      if (e.detail.errMsg == "getUserInfo:ok") {
        //同意授权
        typeof this.data.authCallback === "function" && this.data.authCallback("1");
      }else{
        //拒绝授权
        typeof this.data.authCallback === "function" && this.data.authCallback("0");
      }
    },

    //弹出授权框
    showAuthModal(callback) {
      wx.hideTabBar();
      this.setData({
        authCallback: typeof callback === "function" ? callback : null,
        showAuthModal: true
      })
    },

    //关闭授权框
    closeAuthModal() {
      this.setData({showAuthModal: false},() => {
        wx.showTabBar();
      });
    },

    //阻止背景滚动
    preventScroll() {
      return;
    },
  }
})
