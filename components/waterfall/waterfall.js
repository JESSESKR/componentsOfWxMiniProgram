Component({
  properties: {
    list: {
      type: Array,
      value: [],
      observer: function(newList) {
        if(newList && newList.length > 0) {
          var previewList = []
          newList.forEach((item, index) => {
            previewList.push(item.pic)
          })
          this.data.imageSortList = new Array(newList.length)
          this.data.previewList = this.data.previewList.concat(previewList)
          this.setData({ previewList: previewList,images: newList})
        }
      }
    }
  },

  data: {
    previewList: [],
    leftList: [],
    rightList: [],
    page: 1,
    maxPage: 1,
    images: [], 
    imageSortList: null,
    imageLoadNum: 0
  },

  methods: {
    //加载图片
    onImageLoad: function (e) {
      ++this.data.imageLoadNum
      var length = this.data.images.length
      var index = e.currentTarget.dataset.index
      var originWidth = e.detail.width
      var originHeight = e.detail.height
      var currentWidth = 360;
      var currentHeight = originHeight / originWidth * currentWidth
      this.data.imageSortList[index] = {}
      this.data.imageSortList[index].width = currentWidth
      this.data.imageSortList[index].height = currentHeight
      for (var key in this.data.images[index]) {
        this.data.imageSortList[index][key] = this.data.images[index][key]
      }
      //所有图片加载完毕
      if (this.data.imageLoadNum == this.data.images.length) {
        //左侧数组为空的情况
        if (this.data.leftList.length == 0 && this.data.imageSortList.length > 0) {
          this.data.leftList.push(this.data.imageSortList[0])
          this.data.leftHeight = this.data.leftList[0].height;//左边列表的高度
          this.data.imageSortList.splice(0, 1)
        }
        //右侧数组为空的情况
        if (this.data.rightList.length == 0 && this.data.imageSortList.length > 0) {
          this.data.rightList.push(this.data.imageSortList[0])
          this.data.rightHeight = this.data.rightList[0].height;//右边列表的高度
          this.data.imageSortList.splice(0, 1)
        }
        //循环数组通过左右两侧高度分别加入到左右列表中
        for (var i = 0; i < this.data.imageSortList.length; i++) {
          if (this.data.leftHeight <= this.data.rightHeight) {
            this.data.leftHeight += this.data.imageSortList[i].height
            this.data.leftList.push(this.data.imageSortList[i])
          } else {
            this.data.rightHeight += this.data.imageSortList[i].height
            this.data.rightList.push(this.data.imageSortList[i])
          }
        }
        this.data.images.length = 0;
        this.data.imageSortList.length = 0;
        this.setData({
          images: this.data.images,
          imageLoadNum: 0,
          leftList: this.data.leftList,
          rightList: this.data.rightList,
          imageSortList: null
        }, () => {
          Util.hideLoading()
        })
      }
    },

    resetList: function() {
      this.data.leftList.length = 0;
      this.data.rightList.length = 0;
      this.data.leftHeight = 0;
      this.data.rightHeight = 0;
      this.setData({
        leftList: this.data.leftList,
        rightList: this.data.rightList,
        previewList: previewList
      })
    }
  }
})
