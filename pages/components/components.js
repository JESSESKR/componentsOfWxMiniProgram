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
      }
    ]
    this.setData({ listData: listData })
  },
})
