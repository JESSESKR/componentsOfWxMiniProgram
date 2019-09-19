Component({
  properties: {
    boxWidth: {
      type: String,
      value: "650"
    },
    boxPadding: { //
      type: Boolean,
      value: true
    },
    directionFrom: { //动画出现的方向 right|left
      type: "string",
      value: "right",
    },
    maskClose: { //是否点击背景关闭
      type: Boolean,
      value: true,
    }
  },

  data: {
    slideModalshow: false,
    slideModalShowAnimation: false,
    closeCallback: null
  },

  methods: {
    show(openCallback, closeCallback) {
      this.setData({ slideModalshow: true })
      setTimeout(() => {
        typeof openCallback === "function" && openCallback();
        this.setData({ slideModalShowAnimation: true, closeCallback: typeof closeCallback === "function" ? closeCallback : null });
      }, 50)
    },
    close(closeCallback) {
      setTimeout(() => {
        this.setData({ slideModalShowAnimation: false })
        setTimeout(() => {
          this.setData({ slideModalshow: false });
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
