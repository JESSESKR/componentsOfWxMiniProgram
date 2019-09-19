const app = getApp();
Component({
	properties: {
		state: {
      type: String,
      value: "0"
    },
	},
  data: {
    iphoneXBottom: app.globalData.isIphoneX == true ? 34 / app.globalData.rpx : 0,
  },
	methods: {
    navigatorUrl: function (e) {
      var url = e.currentTarget.dataset.url;
      if(url){
        wx.reLaunch({
          url: url
        })
      }
    }
  },
})