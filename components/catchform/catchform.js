const Util = require("../../utils/util")
// const UserObj = require('../../model/UserManage.js')
Component({
  properties: {
 
  },

  data: {

  },

  methods: {

    //点击按钮
    catchSubmit: function (e) {
      // UserObj.formidRepertorySave(e.detail.formId);
      // callback()
    },

    //点击按钮回调函数
    callback: function (e) {
      try {
        this.triggerEvent("callback", e);
      } catch (err) {}
    }

  }

})