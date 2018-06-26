
cc.Class({
    extends: cc.Component,

    properties: {
        nickName: {
            default: null,
            type: cc.Label
        },
        imgUrl:{
            type:cc.Sprite,
            default:null,
        },
    },

  

    onLoad() {
        this.denglu_shouquan();
        
    },
    denglu_shouquan() {
        Globals.token = (wx.getStorageSync('token'));
        console.log("异步从微信获取token----------"+Globals.token);
        Globals.userInfo = (wx.getStorageSync('userInfo'));
        console.log("异步从微信获取token----------"+Globals.userInfo);


        wx.showShareMenu(true);
        var setImageUrl = function (node, url) {
            if (url != null && url != "") {
                cc.loader.load({
                    url: url,
                    type: 'png',
                }, (err, tex) => {
                    if (err) {
                    } else {
                        let oldWidth = node.width;
                        node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex);
                        node.scale = oldWidth / node.width;
                    }
                });
            }
    }



        var func1 = (nickName) =>{
            this.nickName.string = nickName;
        }

        var func2=(avatarUrl) =>{
            setImageUrl(this.imgUrl, avatarUrl);
        }



        //再次登录
        if (Globals.token) {
            wx.getUserInfo({
                success: function (res) {
                    wx.getUserInfo({
                        success: function (res) {
                            console.log(res);
                            console.log("获取用户信息--3---");
                            if (res != null) {
                                Globals.userInfo = res.userInfo;
                                wx.setStorageSync('userInfo', res.userInfo);
                                var nickName = res.userInfo.nickName;//用户昵称
                                var avatarUrl = res.userInfo.avatarUrl;//用户头像图片url
                                var gender = res.userInfo.gender;//用户性别
                                var city = res.userInfo.city;//用户所在城市
                                var province = res.userInfo.province;//用户所在省份
                                var country = res.userInfo.country;//用户所在国家
                                wx.request({
                                    url: "http://chixintech.cn/shejian/public/api/reg",//服务器保存的token
                                    data: {//发送用户信息
                                        nickName: nickName,
                                        avatarUrl: avatarUrl,
                                        gender: gender,
                                        city: city,
                                        province: province,
                                        country: country,
                                    },
                                    method: 'POST',
                                    header: {//发送tocken
                                        'token': Globals.token,
                                    },
                                    success: function (src) {
                                        console.log("发送tocken-----------3--------返回值-----");
                                        console.log(src);
                                    },
                                });
                            }
                        }
                    });
                    console.log("-3-------获取用户信息完成！")
                },
                fail: function () {
                    // fail
                    console.log("获取失败！")
                },
                complete: function () {
                    // complete
                    console.log("获取用户信息完成！")
                }
            })
        } else {
            //第一步----------
            wx.login({
                success: function (res) {
                    console.log(res.code+"用户完整信息---------------")
                    if (res.code) {
                        //第二步------------发起网络请求获取tocken
                        wx.request({
                            url: 'http://chixintech.cn/shejian/public/api/token',
                            data: {
                                code: res.code,
                            },
                            method: 'POST',
                            success: function (res) {//得到token
                                console.log("得到token------------" + res.data.token);
                                Globals.token = res.data.token;
                                wx.setStorageSync('token', res.data.token);
                                if (Globals.token != null) {
                                    //第三步-----------授权
                                    wx.getSetting({
                                        success(res) {
                                            var authSetting = res.authSetting;//授权结果
                                            if (!authSetting['scope.userInfo']) {
                                                //第四步-------------获取用户信息
                                                wx.getUserInfo({
                                                    success: function (res) {//用户允许
                                                        console.log(res);
                                                        console.log("获取用户信息--3---");
                                                        if (res != null) {
                                                            Globals.userInfo = res.userInfo;
                                                            wx.setStorageSync('userInfo', res.userInfo);
                                                            console.log("获取用户信息---1--" + res.userInfo);
                                                            console.log("获取用户信息---1--" + res);
                                                            var nickName = res.userInfo.nickName;//用户昵称
                                                            var avatarUrl = res.userInfo.avatarUrl;//用户头像图片url
                                                           func1(nickName);
                                                           func2(avatarUrl);
                                                            wx.request({
                                                                url: "http://chixintech.cn/shejian/public/api/reg",
                                                                data: {//发送用户信息
                                                                    nickName: nickName,
                                                                    avatarUrl: avatarUrl,
                                                                    gender: gender,
                                                                    city: city,
                                                                    province: province,
                                                                    country: country,
                                                                },
                                                                method: 'POST',
                                                                header: {//发送tocken
                                                                    'token': Globals.token,
                                                                },
                                                                success: function (src) {
                                                                    console.log("发送tocken-----------1--------返回值-----");
                                                                    console.log(src);
                                                                },
                                                            });
                                                        }
                                                    },
                                                    //用户取消授权处理
                                                    fail: function () {
                                                        //显示模态对话框
                                                        wx.showModal({
                                                            title: '警告通知',
                                                            content: '您点击了拒绝授权,将无法正常游戏,点击确定重新获取授权。',
                                                            success: function (res) {
                                                                if (res.confirm) {
                                                                    //调起客户端小程序设置界面，返回用户设置的操作结果。
                                                                    wx.openSetting({
                                                                        success: (res) => {
                                                                            if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录
                                                                                wx.getUserInfo({
                                                                                    success: function (res) {
                                                                                        console.log(res);
                                                                                        if (Globals.token != null) {
                                                                                            Globals.userInfo = res.userInfo;
                                                                                            wx.setStorageSync('userInfo', res.userInfo);
                                                                                            var nickName = res.userInfo.nickName;//用户昵称
                                                                                            var avatarUrl = res.userInfo.avatarUrl;//用户头像图片url
                                                                                            var gender = res.userInfo.gender;//用户性别
                                                                                            var city = res.userInfo.city;//用户所在城市
                                                                                            var province = res.userInfo.province;//用户所在省份
                                                                                            var country = res.userInfo.country;//用户所在国家
                                                                                            wx.request({
                                                                                                url: "http://chixintech.cn/shejian/public/api/reg",
                                                                                                data: {//发送用户信息
                                                                                                    nickName: nickName,
                                                                                                    avatarUrl: avatarUrl,
                                                                                                    gender: gender,
                                                                                                    city: city,
                                                                                                    province: province,
                                                                                                    country: country,
                                                                                                },
                                                                                                method: 'POST',
                                                                                                header: {//发送tocken
                                                                                                    'token': Globals.token,
                                                                                                },
                                                                                                success: function (src) {
                                                                                                    console.log("发送tocken-----------2--------返回值-----");
                                                                                                    console.log(src);
                                                                                                },
                                                                                            });
                                                                                        }

                                                                                    }
                                                                                });
                                                                            }
                                                                        },
                                                                        fail: function (res) {
                                                                            console.log("用户再次拒绝授权");
                                                                        },
                                                                    })
                                                                }
                                                            }
                                                        })
                                                    },
                                                })
                                            }
                                        }
                                    })
                                }
                            }
                        });
                    }
                }
            });
        };
    },


});
