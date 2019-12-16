Component({
  /**
   * 组件的属性列表
   */
  properties: {
    date: { //传入日期数据，也可以从init函数传入，最终在init方法中使用
      type: Object,
      value: []
    },
    canClickDate: { //是否能够点击日期
      type: Boolean,
      value: true
    },
    mutiSelect: { //多选
      type: Boolean,
      value: false
    },
    limitEnterDateClick: { //控制只允许点击传入的日期
      type: Boolean,
      value: false
    },
    showHighLight: { //初始化完成高亮传入日期
      type: Boolean,
      value: true
    },
    dateHeight: { //日期的高度，用户自定义
      type: String,
      value: "90",
    },
    horizontal: { //是否水平显示，默认true
      type: Boolean,
      value: true
    },
    horizontalStart: { //横向模式开始日期
      type: String,
      value: "2019-01"
    },
    horizontalEnd: { //横向模式结束日期
      type: String,
      value: "2019-02"
    }
  },

  data: {
    weeks: ['日', '一', '二', '三', '四', '五', '六'], //星期数组
    years: [],
    months: [],
    selectedDates: null, //选中的日期
    dateList: null, //日期
    swiperHeight: 0,
  },

  methods: {
    //初始化日历
    init: function(date,callback) {
      if (!date) {
        date = this.data.date;
      }
      wx.showLoading({
        title: '日历生成中',
        icon: "none"
      })
      var transferDate = {};
      //横向日历
      if (this.data.horizontal === true) {
        var startYear = parseInt(this.data.horizontalStart.split("-")[0]);
        var startMonth = parseInt(this.data.horizontalStart.split("-")[1]);
        var endYear = parseInt(this.data.horizontalEnd.split("-")[0]);
        var endMonth = parseInt(this.data.horizontalEnd.split("-")[1]);
        var totalMonth = (endYear - startYear) * 12 + endMonth - startMonth + 1;
        transferDate[startYear] = {};
        for (var i = 0; i < totalMonth;i++) {
          if ( (startMonth + i) > 12) {
            var year,month;
            if ((startMonth + i) % 12 == 0) {
              year = startYear + parseInt((startMonth + i) / 12) - 1;
              month = 12;
            }else {
              year = startYear + parseInt((startMonth + i) / 12);
              month = (startMonth + i) % 12;
            }
            if (!transferDate[year]) {
              transferDate[year] = {}
            }
            transferDate[year][month] = this.dateInit(year, month);
          }else {
            
            transferDate[startYear][startMonth + i] = this.dateInit(startYear, startMonth + i);
          }
        }

        //多选则为数组,单选则为对象
        var selectedDates;
        this.data.mutiSelect ? (selectedDates = []) : (selectedDates = {});

        for (var i = 0; i < date.length; i++) {
          var year = parseInt(date[i].date.split("-")[0]);
          var month = parseInt(date[i].date.split("-")[1]);
          var day = parseInt(date[i].date.split("-")[2]);
          if (transferDate[year]) {
            if (!transferDate[year][month]) {
              continue;
            }
          }else {
            continue;
          }
          for (var j = 0; j < transferDate[year][month].length; j++) {
            if (transferDate[year][month][j].dateNum == day) {
              if (this.data.showHighLight) {
                if(this.data.mutiSelect) {
                  selectedDates.push({ "year": year, "month": month, "date": day })
                } else {
                  if (!selectedDates.year) {
                    selectedDates["year"] = year;
                    selectedDates["month"] = month;
                    selectedDates["date"] = day;
                  }
                }
                transferDate[year][month][j].active = true;
              }
              transferDate[year][month][j].price = price;
              transferDate[year][month][j].canSelect = true;
            }
          }
        }
        
        //日历初始化完成回调函数
        typeof callback === "function" && callback();
        this.setData({ dateList: transferDate, selectedDates: selectedDates }, () => {
          setTimeout(() => {
            const query = wx.createSelectorQuery().in(this);
            query.selectAll('.cale-wrap').boundingClientRect((res) => {
              var max = 0;
              for (var i = 0; i < res.length; i++) {
                if (res[i].height > max) {
                  max = res[i].height;
                }
              }
              this.setData({ swiperHeight: max },() => {
                wx.hideLoading();
              });
            }).exec();
          }, 0);
        });
      }
      //非横向日历
      else {
        //多选则为数组,单选则为对象
        var selectedDates;
        this.data.mutiSelect ? (selectedDates = []) : (selectedDates = {});

        for (var i = 0; i < date.length; i++) {
          var year = parseInt(date[i].date.split("-")[0]);
          var month = parseInt(date[i].date.split("-")[1]);
          var day = parseInt(date[i].date.split("-")[2]);
          var price = date[i].price;
          if (!transferDate[year]) {
            transferDate[year] = {};
          }
          if (!transferDate[year][month]) {
            transferDate[year][month] = null;
            transferDate[year][month] = this.dateInit(year, month);
          }
          for (var j = 0; j < transferDate[year][month].length; j++) {
            if (transferDate[year][month][j].dateNum == day) {
              if (this.data.showHighLight) {
                if (this.data.mutiSelect) {
                  selectedDates.push({ "year": year, "month": month, "date": day })
                } else {
                  if (!selectedDates.year) {
                    selectedDates["year"] = year;
                    selectedDates["month"] = month;
                    selectedDates["date"] = day;
                  }
                }
                transferDate[year][month][j].active = true;
              }
              transferDate[year][month][j].price = price;
              transferDate[year][month][j].canSelect = true;
            }
          }
        }
        this.setData({ dateList: transferDate, selectedDates: selectedDates },() => {
          //日历初始化完成回调函数
          wx.hideLoading();
          typeof callback === "function" && callback();
        });
      }
      
    },

    //生成单月日历
    dateInit: function (year, month) {
      if (year && parseInt(year) > 0) {
        year = parseInt(year);
      } else {
        year = new Date().getFullYear();
      }
      if (month && parseInt(month) > 0) {
        month = parseInt(month) - 1;
      } else {
        month = new Date().getMonth();
      }
      let dateArr = []; //日期数组
      let arrLen = 0;
      let date = new Date(year, month);//当前时间
      let nextYear; //下一年
      let nextMonth = (month + 1) > 11 ? 1 : (month + 1); //下一个月
      let startWeek = new Date(year, month, 1).getDay(); //当前月第一天是星期几
      let dayNums = new Date(year, nextMonth, 0).getDate(); //当前月有多少天
      let num = 0;
      if (nextMonth == 1) {
        nextYear = year + 1;
        dayNums = new Date(nextYear, nextMonth, 0).getDate();
      }
      arrLen = startWeek + dayNums;
      for (let i = 0; i < arrLen; i++) {
        let obj = {};
        if (i >= startWeek) {
          num = i - startWeek + 1;
          obj = {
            active: false,
            canSelect: false,
            dateNum: num,
          }
        } else {
          obj = {};
        }
        dateArr[i] = obj;
      }

      return dateArr;
    },

    //点击日期
    dateClick: function(e) {
      var year = +e.currentTarget.dataset.year;
      var month = +e.currentTarget.dataset.month;
      var date = +e.currentTarget.dataset.date;
      var active = e.currentTarget.dataset.active; //选中状态
      var preday = new Date(year, month - 1, 1).getDay();//当前页第一天星期几，也就是1号前面有几格空出来的
      if (active) {
        //如果点击的是已选中的日期，则置为未选中
        this.data.dateList[year][month][preday + date - 1].active = false;
        //多选的话循环选中的数组,将要取消选择的日期移除
        if (this.data.mutiSelect) {
          var index = null;
          for (var i = 0; i < this.data.selectedDates.length;i++) {
            if (year == this.data.selectedDates[i].year && month == this.data.selectedDates[i].month && date == this.data.selectedDates[i].date) {
              index = i;
              break;
            }
          }
          this.data.selectedDates.splice(index,1);
        }
        //单选的话将上一个已选中的数据置为空
        else {
          this.data.selectedDates = null;
        }
      }else {
        //单选模式的话 上一个点击的置为未选中
        if (!this.data.mutiSelect) {
          if (this.data.selectedDates && this.data.selectedDates.date) {
            var lastDateYear = this.data.selectedDates.year;
            var lastDateMonth = this.data.selectedDates.month;
            var lastDateDate = this.data.selectedDates.date;
            var lastDateMonthPreDay = new Date(lastDateYear, lastDateMonth - 1, 1).getDay();
            this.data.dateList[lastDateYear][lastDateMonth][lastDateMonthPreDay + lastDateDate - 1].active = false;
          }
        }
        //当前点击的置为选中
        this.data.dateList[year][month][preday + date - 1].active = true;
        //多选则将数据加入数组
        if (this.data.mutiSelect) {
          !this.data.selectedDates && (this.data.selectedDates = []);
          this.data.selectedDates.push({ "year": year, "month": month, "date": date });
        }
        //单选则是一个object
        else {
          this.data.selectedDates = { "year": year, "month": month, "date": date };
        }
         
      }
      this.setData({ dateList: this.data.dateList},() => {
        //添加选完后的事件给调用页面
        this.triggerEvent("calendarClick", { "selectedDates": this.data.selectedDates});
      });
    },

    clear: function() {
      if (!this.data.selectedDates) return;
      if (this.data.mutiSelect) {
        this.data.selectedDates.forEach((item,i,arr) => {
          var lastDateYear = item.year;
          var lastDateMonth = item.month;
          var lastDateDate = item.date;
          var lastDateMonthPreDay = new Date(lastDateYear, lastDateMonth - 1, 1).getDay();
          this.data.dateList[lastDateYear][lastDateMonth][lastDateMonthPreDay + lastDateDate - 1].active = false;
          this.data.selectedDates = null;
        })
      }else {
        var lastDateYear = this.data.selectedDates.year;
        var lastDateMonth = this.data.selectedDates.month;
        var lastDateDate = this.data.selectedDates.date;
        var lastDateMonthPreDay = new Date(lastDateYear, lastDateMonth - 1, 1).getDay();
        this.data.dateList[lastDateYear][lastDateMonth][lastDateMonthPreDay + lastDateDate - 1].active = false;
        this.data.selectedDates = null;
      }
      this.setData({
        dateList: this.data.dateList
      })
    },

    // //触摸开始
    // calendarTouchStart: function(e) {
    //   if(!this.data.horizontal) {
    //     return;
    //   }else {
    //     if (!this.lastPoint) {
    //       this.lastPoint = {};
    //     }
    //     if (!this.startPoint) {
    //       this.startPoint = {};
    //     }
    //     this.lastPoint.x = e.touches[0].pageX;
    //     this.lastPoint.y = e.touches[0].pageY;
        
    //     this.startPoint.x = e.touches[0].pageX;
    //     this.startPoint.y = e.touches[0].pageY;
    //   }
    // },

    // //触摸移动
    // calendarTouchMove: function(e) {
    //   if (!this.data.horizontal) {
    //     return;
    //   }else {
    //     var moveX = e.touches[0].pageX;
    //     var moveY = e.touches[0].pageY;
    //     var disX = moveX - this.lastPoint.x;
    //     var disY = moveY - this.lastPoint.y;
    //     this.horizontalLeft += disX;
    //     this.lastPoint.x = moveX;
    //     this.lastPoint.y = moveY;
    //     this.setData({ horizontalLeft: this.horizontalLeft});
    //   }
    // },

    // //触摸结束
    // calendarTouchEnd: function(e) {
    //   if (!this.data.horizontal) {
    //     return;
    //   }else {
    //     if (e.touches.length == 0 && this.lastPoint.x !== this.startPoint.x) {
    //       var horizontalLeft = -(this.data.calendarWidth * this.data.currentIndex);
    //       //滑动不满一半回归原位
    //       if (Math.abs(this.lastPoint.x - this.startPoint.x) < this.data.calendarWidth / 2) {
    //         this.setData({ calendarDuration: 300, horizontalLeft: horizontalLeft}, () => {
    //           this.horizontalLeft = horizontalLeft;
    //           var timeout2 = setTimeout(() => {
    //             clearTimeout(timeout2);
    //             this.setData({ calendarDuration: 0 });
    //           }, 300);
    //         });
    //       } 
    //       //滑动超过一半则滚动到下一个月或者前一个月
    //       else {
    //         var prevYear1 = null, prevMonth1 = null, prevYear2 = null, prevMonth2 = null;
    //         //生成前两个月或者后两个月
    //         if ( (this.lastPoint.x - this.startPoint.x) > 0 ) {
    //           this.data.currentIndex -= 1;
    //         }else {
    //           this.data.currentIndex += 1;
    //         }

    //         var horizontalLeft = -(this.data.calendarWidth * this.data.currentIndex);
    //         this.setData({ calendarDuration: 300, horizontalLeft: horizontalLeft },() => {
    //           this.horizontalLeft = horizontalLeft;
    //           var timeout = setTimeout(() => {
    //             clearTimeout(timeout);
    //             this.setData({ calendarDuration: 0 });
    //           }, 300);
    //         });
    //       }

    //     }
    //   }
    // },
  }
})
