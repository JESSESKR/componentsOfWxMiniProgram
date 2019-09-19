Component({
  /**
   * 组件的属性列表
   */
  properties: {
    width: {
      type: Number,
      value: "750"
    },
    height: {
      type: Number,
      value: "400"
    },
    list: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    timeout: [],
    number: 0, //轨道数
    currentIndex: 0,
    list: [],
    // barrage1: { show: true, pic: "https://wx.qlogo.cn/mmhead/Q3auHgzwzM57XOzU0GxKw4O2GLOr37Z7eDUIWm2eWsWjB4BupTZWKg/64",name: "sssss",text: "哈哈哈1"},
    // barrage2: { show: true, pic: "https://wx.qlogo.cn/mmhead/Q3auHgzwzM57XOzU0GxKw4O2GLOr37Z7eDUIWm2eWsWjB4BupTZWKg/64", name: "sssss", text: "哈哈哈1" },
    // barrage3: { show: true, pic: "https://wx.qlogo.cn/mmhead/Q3auHgzwzM57XOzU0GxKw4O2GLOr37Z7eDUIWm2eWsWjB4BupTZWKg/64", name: "sssss", text: "哈哈哈1" },
    // barrage4: { show: true, pic: "https://wx.qlogo.cn/mmhead/Q3auHgzwzM57XOzU0GxKw4O2GLOr37Z7eDUIWm2eWsWjB4BupTZWKg/64", name: "sssss", text: "哈哈哈1" }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //弹幕开始
    start(number) {
      if (!number) {
        number = 1
      } else {
        if(number > 4) {
          number = 4
        }
      }
      this.setData({ number: number},() => {
        this.startBarrage();
      });
    },

    startBarrage() {
      if (!this.data.list || this.data.list.length == 0) {
        return;
      }

      //初始化每条弹幕
      for(var i = 0;i < this.data.number;i++) {
        if (this.data["barrage" + i]) {
          this.data["barrage" + i].show = false;
          this.data["barrage" + i].pic = "";
          this.data["barrage" + i].name = "";
          this.data["barrage" + i].text = "";
          this.data["barrage" + i].duration = "";
        }else {
          this.data["barrage" + i] = { show: false, pic: "", name: "", text: "", duration: "" };
        }
        this.barrageEndChange(this.data.list[i], i);
      }
    },

    barrageEndChange: function (item, index) {
      var duration = this.randomDuration();
      this.data["barrage" + index].show = true;
      this.data["barrage" + index].pic = item.pic;
      this.data["barrage" + index].name = item.name;
      this.data["barrage" + index].text = item.text;
      this.data["barrage" + index].duration = duration;
      this.data.currentIndex++;
      this.setData({ ["barrage" + index]: this.data["barrage" + index] },() => {
        this.data.timeout[index] = setTimeout(() => {
          clearTimeout(this.data.timeout[index])
          this.data["barrage" + index].show = false;
          this.setData({ ["barrage" + index]: this.data["barrage" + index] },() => {
            var timeout = setTimeout(() => {
              clearTimeout(timeout)
              if (this.data.currentIndex >= this.data.list.length) {
                this.data.currentIndex = 0
              }
              this.barrageEndChange(this.data.list[this.data.currentIndex], index);
            },50)
          })
        }, duration * 1000);
      });
    },

    randomDuration: function () {
      return parseInt(Math.random() * 5 + 5);
    },

    //弹幕定时器清理
    clear: function () {
      for (var i = 0; i < this.data.timeout.length;i++) {
        this.data.timeout[i] && clearTimeout(this.data.timeout[i])
      }
    }
  }
})