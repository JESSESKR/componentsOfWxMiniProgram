// pagesB/calendar/calendar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showHighLight: false,
    canClickDate: false,
    mutiSelect: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
  },

  clickDate: function(e) {
    var index = e.currentTarget.dataset.index;
    this.selectComponent("#calendar" + index).init([{ date: "2019-09-11" },{date: "2019-10-01"}],() => {
      this.selectComponent("#modal"+index).showModal("")
    });
  },

  afterClickDate: (e) => {
    console.log(e)
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