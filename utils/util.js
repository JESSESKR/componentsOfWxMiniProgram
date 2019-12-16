//格式化时间
// type 为 1: 1970-01-01 00:00:00
// type 为 2: 1970-01-01 00:00
// type 为 3: 时间戳（毫秒）
const formatTime = (datestr, type) => {
  //处理ios不兼容日期中有"-"的问题
  if (!datestr) {
    datestr = new Date()
  } else {
    if (typeof datestr === "string" && datestr.indexOf("-") != -1) {
      datestr = datestr.replace(/-/g, '/');
    }
  }

  let date = new Date(datestr);
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  if (type == undefined) {
    return year + "-" + ("00" + month).substr(-2) + "-" + ("00" + day).substr(-2) + " " + ("00" + hour).substr(-2) + ":" + ("00" + minute).substr(-2) + ":" + ("00" + second).substr(-2)
  } else if (type == 1) {
    return year + "-" + ("00" + month).substr(-2) + "-" + ("00" + day).substr(-2) + " " + ("00" + hour).substr(-2) + ":" + ("00" + minute).substr(-2)
  } else if (type == 2) {
    return year + "-" + ("00" + month).substr(-2) + "-" + ("00" + day).substr(-2)
  } else if (type == 3) {
    return date.getTime()
  }
}

//计算距离现在的总秒数 天 时 分 秒
const calculateDate = (value) => {
  let cacuTime = formatTime(value,3);
  let currentTime = new Date().getTimes();
  //总秒数
  let seconds = (currentTime - cacuTime) / 1000;
  //总天数
  let day = Math.floor(seconds / 3600 / 24);
  //总小时数
  let hour = Math.floor(seconds / 3600);
  //小时位
  let currentHour = hour % 24; 
  //分钟位
  let currentMinute = Math.floor((seconds - hour * 3600) / 60); 
  //秒位
  let currentSecond = Math.floor(seconds - hour * 3600 - currentMinute * 60); 
  currentHour = ("00" + currentHour).substr(-2);
  currentMinute = ("00" + currentMinute).substr(-2);
  currentSecond = ("00" + currentSecond).substr(-2);
  return {
    seconds: seconds,
    day: day,
    hour: currentHour,
    minute: currentMinute,
    second: currentSecond
  }
}

//校验方法集合
const valid = {
  //去除字符串两端的空白，参考jquery rtrim
  trim: (value) => {
    let regexTrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    if (value == null || value == undefined) {
      value = "";
    }
    return value.replace(regexTrim, '');
  },
  //校验电话号码
  tel: (value) => {
    let regexTel = /^1[0123456789]\d{9}$/;
    return regexTel.test(value);
  },
  //判断字符串是否为空
  isBlank: (value) => {
    if (value === null || value === undefined) {
      value = "";
    }
    if (this.trim(value) === "") {
      return true;
    } else {
      return false;
    }
  }
}

//过滤数组中的undefined和空值
const compact = arr => arr.filter(res => res != "undefined" && res != "")

//深拷贝 参考jquery extend
const deepCopy = (originObject) => {
  let objectType = getObjectType(originObject);
  let obj;
  if (objectType === "array") {
    obj = [];
    for (let i = 0; i < originObject.length; i++) {
      obj.push(deepCopy(originObject[i]));
    }
  } else if (objectType === "object") {
    obj = {};
    for (let key in originObject) {
      obj[key] = deepCopy(originObject[key]);
    }
  } else {
    return originObject;
  }

  return obj;
}

//获取对象数据类型
const getObjectType = (originObject) => {
  let str = (Object.prototype.toString.call(originObject)).toLowerCase();
  return str.substring(8, str.length - 1);
}

//通用请求发送方法
const toRequest = (obj) => {
  if ( getObjectType(obj) != "object") {
    console.warn("传入对象非JSON格式");
    return;
  }
  if ( !obj.url ) {
    console.warn("未传入请求地址");
    return;
  }
  let data = {
    url: obj.url,
    method: obj.method ? obj.method : "get",
    data: obj.data ? obj.data : {},
    header: {
      "Content-Type": obj.contenttype ? "application/json;" : "application/x-www-form-urlencoded;",
      "cache-control": "no-cache,must-revalidate",
      "Pragma": "no-cache",
      "Expires": "-1"
    },
    //success回调
    success: function (res) {
      //不成功发送报错码到运维平台
      if (res.data.code != 200) {
        wx.reportMonitor('1', parseInt(res.data.code));
      }
      typeof obj.success === "function" && obj.success(res);
    },
    //fail回调
    fail: function(res) {
      wx.reportMonitor('0', 1);
      typeof obj.fail === "function" && obj.fail(res);
    },
    //complete回调
    complete: function () {
      typeof obj.complete === "function" && obj.complete();
    }
  }
  //设置isjson
  data.data.isjson = 1;
  wx.request(data);
}

//通用跳转方法
const navigatorUrl = (url, obj) => {
  if (url) {
    var tabbars = [""];
    if (tabbars.indexOf(url) == -1) {
      var urlstr = url;
      if (obj) {
        for (var key in obj) {
          if (url.indexOf("?") == -1) {
            url = url + "?" + key + "=" + obj[key]
          } else {
            url = url + "&" + key + "=" + obj[key]
          }
        }
      }
      wx.navigateTo({
        url: url
      })
    } else {
      wx.switchTab({
        url: url,
      })
    }
  }
}

//通用微信支付接口
const userPay = (payInfo, success, fail, complete) => {
  wx.requestPayment({
    'timeStamp': payInfo.timeStamp,
    'nonceStr': payInfo.nonceStr,
    'package': payInfo.package,
    'signType': payInfo.signType,
    'paySign': payInfo.paySign,
    'success': function (payOverRes) {
      typeof success === "function" && success(payOverRes);
    },
    'fail': function () {
      typeof fail === "function" && fail();
    },
    'complete': function () {
      typeof complete === "function" && complete();
    }
  })
}

//版本号
const compareVersion = (ver) => {
  var curv = '';
  wx.getSystemInfo({
    success: function (res) {
      //console.log(res)
      curv = res.SDKVersion.split('.');
    }
  })
  ver = ver.split('.')
  var len = Math.max(ver.length, curv.length)

  while (ver.length < len) {
    ver.push('0')
  }
  while (curv.length < len) {
    curv.push('0')
  }

  for (var i = 0; i < len; i++) {
    var numver = parseInt(ver[i])
    var numcurv = parseInt(curv[i])

    if (numcurv > numver) {
      return 1
    } else if (numcurv < numver) {
      return -1
    }
  }
  return 0
}

//加载 （ios上如果有toast 调用hideloading会自动关闭toast）
const loading = (title) => {
  wx.showLoading({
    title: title || '',
    mask: true
  })
}
//关闭加载
const hideLoading = () => {
  wx.hideLoading()
}

module.exports = {
  formatTime,
  calculateDate,
  valid,
  compact,
  deepCopy,
  getObjectType,
  toRequest,
  navigatorUrl,
  userPay
}
