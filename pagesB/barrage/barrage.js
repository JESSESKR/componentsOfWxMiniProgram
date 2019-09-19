Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{ show: true, pic: "https://wx.qlogo.cn/mmhead/Q3auHgzwzM57XOzU0GxKw4O2GLOr37Z7eDUIWm2eWsWjB4BupTZWKg/64", name: "sssss", text: "哈哈哈1" },
      { show: true, pic: "https://wx.qlogo.cn/mmhead/Q3auHgzwzM57XOzU0GxKw4O2GLOr37Z7eDUIWm2eWsWjB4BupTZWKg/64", name: "sssss", text: "哈哈哈2" },
      { show: true, pic: "https://wx.qlogo.cn/mmhead/Q3auHgzwzM57XOzU0GxKw4O2GLOr37Z7eDUIWm2eWsWjB4BupTZWKg/64", name: "sssss", text: "哈哈哈3" },
      { show: true, pic: "https://wx.qlogo.cn/mmhead/Q3auHgzwzM57XOzU0GxKw4O2GLOr37Z7eDUIWm2eWsWjB4BupTZWKg/64", name: "sssss", text: "哈哈哈4" },
      { show: true, pic: "https://wx.qlogo.cn/mmhead/Q3auHgzwzM57XOzU0GxKw4O2GLOr37Z7eDUIWm2eWsWjB4BupTZWKg/64", name: "sssss", text: "哈哈哈5" }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  start: function() {
    this.selectComponent("#barrage").start(2)
  },

  end: function() {
    this.selectComponent("#barrage").clear()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})