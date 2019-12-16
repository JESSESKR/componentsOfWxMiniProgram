Component({
  properties: {
    boxPadding: { //弹出层是否有padding
      type: Boolean,
      value: true
    },
    boxHaveBg: { //弹出层是否有白色背景
      type: Boolean,
      value: true,
    },
    showClose: { //弹出层显示关闭按钮
      type: Boolean,
      value: false
    },
    maskClose: { //弹出层是否能点击遮罩关闭
      type: Boolean,
      value: true,
    }
  },

  data: {
    modalshow: false,
    showModalAnimation: false,
    closeCallback: null
  },

  methods: {
    showModal(openCallback, closeCallback) {
      this.setData({ modalshow: true })
      var timeout = setTimeout(() => {
        clearTimeout(timeout)
        typeof openCallback === "function" && openCallback();
        this.setData({ showModalAnimation: true, closeCallback: typeof closeCallback === "function" ? closeCallback : null });
      }, 50)
    },
    closeModal(closeCallback) {
      var timeout = setTimeout(() => {
        clearTimeout(timeout)
        this.setData({ showModalAnimation: false })
        var timeout2 = setTimeout(() => {
          clearTimeout(timeout2)
          this.setData({ modalshow: false });
          if (typeof closeCallback === "function") {
            closeCallback();
          } else {
            typeof this.data.closeCallback === "function" && this.data.closeCallback();
          }
        }, 200)
      }, 50);
    },
    forbidPageScroll() {
      return;
    }
  }
})
