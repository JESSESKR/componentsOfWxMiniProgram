//app.js
const Util = require('utils/util.js')

const updateManager = wx.getUpdateManager();

let args = new Object()
args.module = 'main_main' //返回app首页

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())

    var that = this

    //监听小程序有版本更新事件
    updateManager.onCheckForUpdate(function (res) {
    })
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启？',
        success(res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel: false
      })
    })

    //隐藏tabbar
    // wx.hideTabBar();

    //设置屏幕宽高
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.screenWidth = res.windowWidth
        that.globalData.screenHeight = res.windowHeight
        that.globalData.rpx = res.screenWidth / 750
        that.globalData.screenHeightRpx = res.screenHeight / that.globalData.rpx
        that.globalData.screenWidthRpx = res.screenWidth / that.globalData.rpx
        that.globalData.StatusBarHeight = res.statusBarHeight;
        //胶囊信息获取兼容处理
        let custom = wx.hasOwnProperty("getMenuButtonBoundingClientRect") ? wx.getMenuButtonBoundingClientRect() : '';
        that.globalData.Custom = custom || "";
        //iphone会出现偶尔获取不到的情况，给默认值
        if (custom && custom.bottom) {
          that.globalData.CustomBarHeight = (custom.bottom || 58) + (custom.top || 26) - res.statusBarHeight;
        }else {
          that.globalData.CustomBarHeight = 64;
        }
        
        console.log(res)
        // console.log(res)
        // console.log(that.globalData.rpx)
        // console.log(res.screenWidth)
        // console.log(res.screenHeight)
        // console.log(that.globalData.screenWidthRpx)
        // console.log(that.globalData.screenHeightRpx)
        // console.log(res.pixelRatio)
        //获取手机品牌名称
        var mobileTypeArr = res.model.split(" ");
        var mobileType = ""
        if (mobileTypeArr.length > 0) {
          mobileType = mobileTypeArr[0]
        }

        if (res.model.indexOf("iPhone X") != -1 || res.model.indexOf("iPhone XR") != -1 || res.model.indexOf("iPhone XS") != -1 || res.model.indexOf("iPhone XS Max") != -1) {//iphonex特别处理
          that.globalData.isIphoneX = true
          //that.globalData.topbarHeight = 50 / that.globalData.rpx + 44 / that.globalData.rpx
          that.globalData.topbarHeight = 88 / that.globalData.rpx
          //that.globalData.bottombarHeight = 40 / that.globalData.rpx + 34 / that.globalData.rpx
          that.globalData.bottombarHeight = 83 / that.globalData.rpx
          that.globalData.isIphone = true;
          //胶囊信息不兼容且为流海屏时
          if (that.globalData.CustomBarHeight == 64) {
            that.globalData.CustomBarHeight = 88
          }
        } else if (mobileType == 'iPhone') {//其他iphone型号处理
          that.globalData.topbarHeight = 64 / that.globalData.rpx
          that.globalData.bottombarHeight = 49 / that.globalData.rpx
          that.globalData.isIphone = true;
        } else {//所有安卓手机型号处理
          that.globalData.topbarHeight = 70 / that.globalData.rpx
          that.globalData.bottombarHeight = 49 / that.globalData.rpx
          that.globalData.isIphone = false
        }
      }

    })
  },

  onShow: function (options) {
    //app分享消息卡片进入或移动应用进入小程序，则显示返回app的层
    if (options.scene == 1069 || options.scene == 1036) {
      this.globalData.backApp = true
      if (Util.compareVersion('1.9.5') < 0) {
        Util.showMessage('请下载最新微信客户端');
      }
    } else {
      this.globalData.backApp = false
    }
  },

  globalData: {
    userInfo: null,
    backApp: false,
    jump_path: JSON.stringify(args),
    screenWidth: 0,
    screenHeight: 0,
    rpx: 0.5,
    topbarHeight: 0,
    bottombarheight: 0,
    isIphoneX: false,
    isIphone: false,
    shareCardPic: "https://mod.happy2cs.com/common/shareCardPic.jpg?v=1",
    sharePic: "https://mod.happy2cs.com/common/sharePic.jpg?v=1"
  }
})