const app = getApp();
Component({
  /**
   * 组件的一些选项
   */
  options: {
    multipleSlots: true
  },
  /**
   * 组件的对外属性
   */
  properties: {
    title: { //标题
      type: String,
      value: ''
    },
    bgColor: {
      type: String,
      value: '#fff'
    },
    bgImage: {
      type: String,
      value: ''
    },
    hasBack: {
      type: Boolean,
      value: true
    },
    backColor: {
      type: String,
      value: '#333'
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    StatusBarHeight: app.globalData.StatusBarHeight,
    CustomBarHeight: app.globalData.CustomBarHeight,
    Custom: app.globalData.Custom
  },
  /**
   * 组件的方法列表
   */
  methods: {
    back() {
      if(getCurrentPages().length <= 1) {
        wx.reLaunch({
          url: '/pages/index/index',
        })
      }else {
        wx.navigateBack({
          delta: 1
        });
      }
    },
    toHome() {
      wx.reLaunch({
        url: '/pages/index/index',
      })
    }
  }
})