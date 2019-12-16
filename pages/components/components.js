//获取应用实例
const app = getApp()

Page({
  data: {
    listData: []
  },
  
  onLoad: function () {
    var listData = [
      {
        text: "菜单",
        url: "/pages/menu/menu"
      },
      {
        text: "弹窗",
        url: "/pagesB/modal/modal"
      },
      {
        text: "toast",
        url: "/pagesB/toast/toast"
      },
      {
        text: "弹幕",
        url: "/pagesB/barrage/barrage"
      },
      {
        text: "导航栏",
        url: "/pagesB/navbar/navbar"
      },
      {
        text: "工具栏",
        url: "/pagesB/tabbar/tabbar"
      },
      {
        text: "侧边弹窗",
        url: "/pagesB/sidemodal/sidemodal"
      },
      {
        text: "瀑布流布局",
        url: "/pagesB/waterfall/waterfall"
      },
      {
        text: "日历",
        url: "/pagesB/calendar/calendar"
      },
      {
        text: "数量选择",
        url: "/pagesB/numselect/numselect"
      },
      {
        text: "底部弹出框",
        url: "/pagesB/bottommodal/bottommodal"
      },
      {
        text: "时间日期选择器",
        url: "/pagesB/datePicker/datePicker"
      },
    ]
    this.setData({ listData: listData })
  },
})
