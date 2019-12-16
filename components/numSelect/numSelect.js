// component/numSelect/numSelect.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hasEvent: {
      type: Boolean,
      value: true
    },
    inputname: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    canMius: false,
    canPlus: false,
    max: "",
    min: "",
    currentNum: "",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    init: function (min, max, currentNum) {
      this.setData({ min: min, max: max });
      this.numInputBlur({ detail: { value: currentNum || 0 } });
    },
    //数量减少
    //1判断能不能减 能减就减1
    //2.减完后的值 如果<=最小值 1)若能减则设为不能减 2)若不能加则设为能加
    //3.减完后的值 如果>最小值 且 <最大值 1)如果不能减则设为能减 2)如果能加则设为能加
    //4.传递参数到外部
    numMinus: function () {
      if (this.data.canMius) {
        this.setData({
          currentNum: this.data.currentNum - 1
        }, () => {
          if (this.data.currentNum <= this.data.min) {
            this.data.canMius && this.setData({ canMius: false });
            !this.data.canPlus && this.setData({ canPlus: true });
          } else if (this.data.currentNum > this.data.min && this.data.currentNum < this.data.max) {
            !this.data.canPlus && this.setData({ canPlus: true });
            !this.data.canMius && this.setData({ canMius: true });
          }
          this.change(this.data.currentNum);
        });
      }
    },

    //数量增加
    //2.加完后的值 如果>默认值 且 <最大值 1)如果不能加则设为能加 2)如果能减则设为能减
    //3.加完后的值 如果>=最大值 1)如果能加则设为不能加 2)如果不能减则设为能减
    //4.传递参数到外部
    numPlus: function () {
      if (this.data.canPlus) {
        this.setData({
          currentNum: this.data.currentNum + 1
        }, () => {
          if (this.data.currentNum > this.data.min && this.data.currentNum < this.data.max) {
            !this.data.canPlus && this.setData({ canPlus: true });
            !this.data.canMius && this.setData({ canMius: true });
          } else if (this.data.currentNum >= this.data.max) {
            this.data.canPlus && this.setData({ canPlus: false });
            !this.data.canMius && this.setData({ canMius: true });
          }
          this.change(this.data.currentNum);
        });
      }
    },

    //输入框失焦
    numInputBlur: function (e) {
      //获取输入框的值,转化为数字
      var value = "", value = e.detail.value && parseInt(e.detail.value), currentdata = { currentNum: value };
      //如果当前最大值 小于等于0,则设置输入框的值为0且加减按钮变淡无法点击
      if (this.data.max <= 0) {
        currentdata.currentNum = 0;
        currentdata.canMius = false;
        currentdata.canPlus = false;
        this.setData(currentdata);
        return;
      }
      //如果输入框的值为0或者NaN,输入框的值转为默认值
      if (!value) {
        value = this.data.min;
      }
      //如果最小值大于最大值,则加减按钮变淡无法点击,输入框的值变为库存数量
      if (this.data.min >= this.data.max) {
        currentdata.canMius = false;
        currentdata.canPlus = false;
        currentdata.currentNum = this.data.max;
      }
      //如果输入框的值小于等于默认值,则不能减了,判断能不能加 不能加要设为能加,输入框的值变为默认值
      else if (value <= this.data.min) {
        currentdata.canMius = false;
        !this.data.canPlus && (currentdata.canPlus = true);
        currentdata.currentNum = this.data.min;
      }
      //如果输入框的值大于等于最大值,则不能加了,判断能不能减 不能减要设为能减,输入框的值变为最大数量
      else if (value >= this.data.max) {
        currentdata.canPlus = false;
        !this.data.canMius && (currentdata.canMius = true);
        currentdata.currentNum = this.data.max;
      }
      //如果输入框的值在默认值和库存数量之间
      else if (value > this.data.min && value < this.data.max) {
        //如果输入框的值小于限购数量 不能加不能减的全设置为可以加减
        !this.data.canMius && (currentdata.canMius = true);
        !this.data.canPlus && (currentdata.canPlus = true);
        currentdata.currentNum = value;
      }
      this.setData(currentdata)
      this.change(currentdata.currentNum);
    },

    //点击时传递参数到外部
    change: function (values) {
      if (this.data.hasEvent) {
        this.triggerEvent('numChange', { value: values });
      }
    },

    stopPropagation: function() {
      return;
    }
  }
})
