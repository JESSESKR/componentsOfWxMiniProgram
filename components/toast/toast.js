Component({
  properties: {

  },

  data: {
    modalshow: false,
    showModalAnimation: false,
    closeCallback: null,
    title: ""
  },

  methods: {
    show(title, closeCallback, time) {
      this.setData({ modalshow: true })
      var timeout1 = setTimeout(() => {
        clearTimeout(timeout1)
        this.data.closeCallback = (typeof closeCallback === "function" ? closeCallback : null)
        this.setData({ showModalAnimation: true, title: title });
        var timeout2 = setTimeout(() => {
          clearTimeout(timeout2)
          this.close()
        }, time || 1500)
      }, 50)
    },
    close(closeCallback) {
      var timeout1 = setTimeout(() => {
        clearTimeout(timeout1)
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
