const app = getApp();
let arr = [];
let latitude = '29.607857';
let longitude = '106.503971';
let city = '重庆市';
let page = 1;
let val;
let isSearch = false;
Page({
    data: {
        imgs: [],
        goods: [],
        news: [],
        tic: [],
    },
    onLoad: function () {
        //监听页面加载的生命周期函数
        this.showBanner();
    },
    onReady: function () {
        // 监听页面初次渲染完成的生命周期函数
    },
    onShow: function () {
        // 监听页面显示的生命周期函数
        this.showTic()
        this.showNews()
    },
    gotoThere: function () {
        swan.getLocation({
            type: 'gcj02',
            success: function (res) {
                swan.openLocation({
                    latitude:40.102227,
                    longitude:94.682071,
                    scale: 18
                })
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
    },
    showBanner: function () {
        let that = this;
        swan.request({
            url: 'https://user.xisslvyou.com/api/template/component_side2/59236', //开发者服务器接口地址
            method: 'GET',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                
                for (let i = 0; i < res.data.body.length; i++) {
                    arr.push(res.data.body[i].image_url)
                }

                that.setData({
                    imgs: arr
                })
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
    },
    showNews: function () {
        let that = this;
        swan.request({
            url: 'https://user.xisslvyou.com/api/article/getArticleNewByCount?store_id=1770&count=3', //开发者服务器接口地址
            success: function (res) {
                that.setData({
                    news: res.data.body
                })

            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
    },
    showTic: function () {
        let that = this;
        swan.request({
            url: 'https://user.xisslvyou.com/api/item/store/1770?page_size=6&group_id=19830&page=0&sort=', //开发者服务器接口地址
            method: 'GET',
            dataType: 'json',
            data: {
                key: 'value'
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                
                that.setData({
                    tic: res.data.content
                })

            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
    },
    onHide: function () {
        // 监听页面隐藏的生命周期函数
    },
    onUnload: function () {
        // 监听页面卸载的生命周期函数
    },
    onPullDownRefresh: function () {
        // 监听用户下拉动作
    },
    onReachBottom: function () {
        // 页面上拉触底事件的处理函数
    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
    }
});