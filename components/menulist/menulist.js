const Util = require("../../utils/util.js")
//type为列表类型
Component({
  properties: {
    type: { //类型
      type: Number,
      value: 1
    },
    listData: { //数据
      type: Object,
      value: ""
    }
  },

  data: {

  },

  methods: {
    navigatorUrl(e) {
      Util.navigatorUrl(e.currentTarget.dataset.url);
    }
  }
})
