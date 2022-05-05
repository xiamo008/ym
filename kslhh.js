/*
快手极速版- 一分领好货
脚本默认砍 肯德基牛堡分享桶 如需修改 自己环境变量里设置
抓包教程地址：http://cxgc.top/archives/ksjsb
填我邀请码，脚本遇见问题可以问我：791642607
交流群：212796668、681030097
脚本兼容: QuantumultX, Surge,Loon, JSBox, Node.js
=================================Quantumultx=========================
[task_local]
#快手极速版- 一分领好货
0 0 0,10,16,22 * * * https://github.com/JDWXX/jd_job/blob/master/ks/ksjsb_yflhh.js, tag=快手极速版- 一分领好货, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true
=================================Loon===================================
[Script]
cron "0 0 0,10,16,22 * * *" script-path=https://github.com/JDWXX/jd_job/blob/master/ks/ksjsb_yflhh.js,tag=快手极速版- 一分领好货
===================================Surge================================
快手极速版- 一分领好货 = type=cron,cronexp="0 0 0,10,16,22 * * *",wake-system=1,timeout=3600,script-path=https://github.com/JDWXX/jd_job/blob/master/ks/ksjsb_yflhh.js
====================================小火箭=============================
快手极速版- 一分领好货 = type=cron,script-path=https://github.com/JDWXX/jd_job/blob/master/ks/ksjsb_yflhh.js, cronexpr="0 0 0,10,16,22 * * *", timeout=3600, enable=true
 */
const $ = new Env('快手极速版- 一分领好货')
const jdCookieNode = $['isNode']() ? require('./ksCookie.js') : ''
let packetId = $['isNode']() ? (process['env']['packetId'] ? process['env']['packetId'] : '') : $['getdata']('packetId') ? $['getdata']('packetId') : '' //砍价助力码

let code = $['isNode']() ? (process['env']['code'] ? process['env']['code'] : '') : $['getdata']('code') ? $['getdata']('code') : '' //砍价助力码
// let skuId = $.isNode() ? (process.env.skuId ? process.env.skuId : "") : ($.getdata('skuId') ? $.getdata('skuId') : "")//肯德基牛堡分享桶 10912042532283
// let commodityId = $.isNode() ? (process.env.commodityId ? process.env.commodityId : "") : ($.getdata('commodityId') ? $.getdata('commodityId') : "")//肯德基牛堡分享桶 4087484862283

let skuId = '10912042532283' //肯德基牛堡分享桶 10912042532283

let commodityId = '4087484862283' //肯德基牛堡分享桶 4087484862283

var _0xodm = 'jsjiami.com.v6',
    _0x5684 = [
        _0xodm,
        'node-fetch',
        'isNode',
        'keys',
        'forEach',
        'push',
        'env',
        'JD_DEBUG',
        'false',
        'log',
        'getdata',
        'CookieJD',
        'CookieJD2',
        'CookiesJD',
        'map',
        'cookie',
        'filter',
        'https://ghproxy.com/https://raw.githubusercontent.com/xiaojia21190/jd_price/main/ks.json',
        '343427134180043852@3xpm5bx2nzrn87i',
        'get',
        'parse',
        'yflhh',
        'logErr',
        'floor',
        'random',
        'msg',
        'name',
        '【提示】请先获取快手账号 ksjsbCookie \n直接使用抓包工具抓包',
        'http://cxgc.top/archives/ksjsb',
        '\n异常错误,请稍候重试\n',
        '快手抓取ck教程：http://cxgc.top/archives/ksjsb',
        'length',
        'index',
        'isLogin',
        'nickName',
        '******开始【快手账号',
        '】*********',
        'substring',
        'replace',
        'ANDROID_ff60a387f6ba8904',
        'kpn=NEBULA; kpf=ANDROID_PHONE; ',
        'did=',
        '; c=XIAOMI; ver=10.2; appver=10.2.41.3075; language=zh-cn; ',
        'client_key=2ac2a76d; ',
        'https://ug-fission.kuaishou.com/rest/n/darwin/bargain/overview?version=2.1.0',
        'ug-fission.kuaishou.com',
        'keep-alive',
        '125',
        'application/json, text/plain, */*',
        'JD_USER_AGENT',
        './USER_AGENTS',
        'USER_AGENT',
        'JDUA',
        'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
        'application/json',
        'https://ug-fission.kuaishou.com',
        'com.kuaishou.nebula',
        'same-origin',
        'cors',
        'empty',
        'https://ug-fission.kuaishou.com/bargain?hyId=bargain&source=ITEM&layoutType=4&noBackNavi=true&useMerchantWeb=1',
        'gzip, deflate',
        'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        '{"hyId":"bargain","source":"ITEM","layoutType":"4","noBackNavi":"true","useMerchantWeb":"1","pageCode":1,"adamA":0,"adamB":0}',
        'POST',
        'then',
        'json',
        'data',
        'commodities',
        'itemList',
        '商品名称：',
        'title',
        '商品skuId：',
        'skuId',
        '商品commodityId：',
        'commodityId',
        '商品价格：',
        'price',
        '完成数：',
        'finishedNum',
        'packetViewList',
        '快手账号：',
        'teamView',
        'shareData',
        'userName',
        '正在砍的商品：',
        'progress',
        'totalAmount',
        '已完成金额：',
        'currentAmount',
        '剩余待砍金额：',
        'remainAmount',
        'packetId',
        '快手账号一的 packetId【',
        '1024',
        'code',
        '快手账号一的 code【',
        '去助力的code:',
        '去助力的packetId：',
        'split',
        '449',
        'https://ug-fission.kuaishou.com/bargain/?fid=1793574683&cc=share_wxms&followRefer=151&code=',
        '&shareMethod=TOKEN&kpn=NEBULA&subBiz=BARGAIN&shareId=16886150612781&shareMode=SYSTEM&noBackNavi=true&originShareId=16886150612781&useMerchantWeb=1&layoutType=4&shareObjectId=%7B%22teamId%22%3A%22%22,%22packetId%22%3A%22',
        '%22%7D&shareUrlOpened=0&hyId=bargain&timestamp=',
        '{"fid":"1793574683","cc":"share_wxms","followRefer":"151","code":"',
        '","shareMethod":"TOKEN","kpn":"NEBULA","subBiz":"BARGAIN",',
        '"shareId":"16886150612781","shareMode":"SYSTEM","noBackNavi":"true","originShareId":"16886150612781","useMerchantWeb":"1","layoutType":"4",',
        '"shareObjectId":"{\\"teamId\\":\\"\\",\\"packetId\\":\\"',
        '\\"}","shareUrlOpened":"0","hyId":"bargain","timestamp":"',
        '","pageCode":1,"adamA":0,"adamB":0}',
        'popup',
        '助力成功',
        'toast',
        'https://ug-fission.kuaishou.com/rest/n/darwin/bargain/firstBargain?version=2.1.0',
        '{"commodityId":',
        ',"skuId":',
        'commodityItem',
        '砍价商品名称：',
        'subTitle',
        '未读取到待砍价商品',
        '请先设置砍价商品的 commodityId 和 skuId',
        '定时签到奖励',
        'https://ug-fission.kuaishou.com/rest/n/darwin/bargain/taskBargain?version=2.1.0',
        'https://ug-fission.kuaishou.com/bargain/process/',
        '?fid=1793574683&cc=faceToFace&followRefer=151&code=3xpm5bx2nzrn87i&shareMethod=QRCODE&kpn=NEBULA&subBiz=BARGAIN&shareId=16886233489415&shareMode=APP&noBackNavi=true&originShareId=16886233489415&useMerchantWeb=1&layoutType=4&shareObjectId=%7B%22teamId%22%3A%22%22,%22packetId%22%3A%22343427134180043852%22%7D&shareUrlOpened=0&hyId=bargain&timestamp=1649911224944',
        '{"packetId":',
        ',"taskId":"2"}',
        '砍了：',
        'progressDesc',
        'wait',
        'catch',
        ', 失败! 原因: ',
        'finally',
        'done',
        'wjsjriaPtmiN.ZFbcxUom.vu6AGtS==',
    ]

function _0x2b68(_0x367999, _0x1c1be4) {
    _0x367999 = ~~'0x'['concat'](_0x367999['slice'](0))
    var _0x5369e5 = _0x5684[_0x367999]
    return _0x5369e5
}

;(function (_0x1d7da2, _0x539a7c) {
    var _0x43aa7d = 0

    for (_0x539a7c = _0x1d7da2['shift'](_0x43aa7d >> 2); _0x539a7c && _0x539a7c !== (_0x1d7da2['pop'](_0x43aa7d >> 3) + '')['replace'](/[wrPtNZFbxUuAGtS=]/g, ''); _0x43aa7d++) {
        _0x43aa7d = _0x43aa7d ^ 912796
    }
})(_0x5684, _0x2b68)

let cookiesArr = [],
    message

const fetch = require(_0x2b68('0'))

if ($[_0x2b68('1')]()) {
    Object[_0x2b68('2')](jdCookieNode)[_0x2b68('3')]((_0x473fb6) => {
        cookiesArr[_0x2b68('4')](jdCookieNode[_0x473fb6])
    })

    if (process[_0x2b68('5')][_0x2b68('6')] && process[_0x2b68('5')][_0x2b68('6')] === _0x2b68('7')) {
        console[_0x2b68('8')] = () => {}
    }
} else {
    cookiesArr = [$[_0x2b68('9')](_0x2b68('a')), $[_0x2b68('9')](_0x2b68('b')), ...jsonParse($[_0x2b68('9')](_0x2b68('c')) || '[]')[_0x2b68('d')]((_0x245b2d) => _0x245b2d[_0x2b68('e')])][_0x2b68('f')]((_0x1deb1d) => !!_0x1deb1d)
}

function gettext() {
    return {
        url: _0x2b68('10'),
        timeout: 10000,
    }
}

let authorCodeList = []

let yflhh = _0x2b68('11')

let qlzl = ''

if (packetId != '' && code != '') {
    qlzl = packetId + '@' + code
}

async function getHub() {
    return new Promise((_0x5338f5) => {
        setTimeout(() => {
            $[_0x2b68('12')](gettext(), (_0x2dad1d, _0xfd7325, _0x5ef514) => {
                try {
                    if (_0x5ef514) {
                        _0x5ef514 = JSON[_0x2b68('13')](_0x5ef514)
                        yflhh = _0x5ef514[_0x2b68('14')]
                    }
                } catch (_0x3a35d9) {
                    $[_0x2b68('15')](_0x3a35d9, _0xfd7325)
                } finally {
                    _0x5338f5(_0x5ef514)
                }
            })
        })
    })
}

function random(_0x411bf9, _0x5dc3d6) {
    return Math[_0x2b68('16')](Math[_0x2b68('17')]() * (_0x5dc3d6 - _0x411bf9)) + _0x411bf9
}

!(async () => {
    if (!cookiesArr[0]) {
        $[_0x2b68('18')]($[_0x2b68('19')], _0x2b68('1a'), _0x2b68('1b'), {
            'open-url': _0x2b68('1b'),
        })

        return
    }

    await getHub()

    authorCodeList[_0x2b68('4')](yflhh)

    console[_0x2b68('8')](_0x2b68('1d'))

    let _0x4b5592 = ''
    let _0x325434 = ''
    let _0x24f1fc = ''

    let ck1Pack = []
    for (let _0x1cfade = 0; _0x1cfade < cookiesArr[_0x2b68('1e')]; _0x1cfade++) {
        if (cookiesArr[_0x1cfade]) {
            $[_0x2b68('1f')] = _0x1cfade + 1
            $[_0x2b68('20')] = true
            $[_0x2b68('21')] = ''
            message = ''

            console[_0x2b68('8')](_0x2b68('22') + $[_0x2b68('1f')] + _0x2b68('23'))

            let _0x96d364 = cookiesArr[_0x1cfade]

            if (';' != _0x96d364[_0x2b68('24')](_0x96d364[_0x2b68('1e')] - 1, _0x96d364[_0x2b68('1e')])) {
                _0x96d364 = _0x96d364 + ';'
            }

            _0x96d364 = _0x96d364[_0x2b68('25')]('\n', '')

            let _0x5687b4 = Math[_0x2b68('16')](Math[_0x2b68('17')]() * 1000 + 1) + _0x2b68('26')

            let _0x3f4ee0 = _0x2b68('27') + _0x2b68('28') + _0x5687b4 + _0x2b68('29') + _0x2b68('2a') + _0x96d364

            try {
                let _0x466732 = []
                let _0x2d407f = ''
                await fetch(_0x2b68('2b'), {
                    headers: {
                        Host: _0x2b68('2c'),
                        Connection: _0x2b68('2d'),
                        'Content-Length': _0x2b68('2e'),
                        Accept: _0x2b68('2f'),
                        'User-Agent': $[_0x2b68('1')]() ? (process[_0x2b68('5')][_0x2b68('30')] ? process[_0x2b68('5')][_0x2b68('30')] : require(_0x2b68('31'))[_0x2b68('32')]) : $[_0x2b68('9')](_0x2b68('33')) ? $[_0x2b68('9')](_0x2b68('33')) : _0x2b68('34'),
                        'Content-Type': _0x2b68('35'),
                        Origin: _0x2b68('36'),
                        'X-Requested-With': _0x2b68('37'),
                        'Sec-Fetch-Site': _0x2b68('38'),
                        'Sec-Fetch-Mode': _0x2b68('39'),
                        'Sec-Fetch-Dest': _0x2b68('3a'),
                        Referer: _0x2b68('3b'),
                        'Accept-Encoding': _0x2b68('3c'),
                        'Accept-Language': _0x2b68('3d'),
                        Cookie: _0x3f4ee0,
                    },
                    body: _0x2b68('3e'),
                    method: _0x2b68('3f'),
                })
                    [_0x2b68('40')]((_0x64cccc) => _0x64cccc[_0x2b68('41')]())
                    [_0x2b68('40')]((_0x2350ca) => {
                        if ($[_0x2b68('1f')] == 1 && _0x2350ca[_0x2b68('42')][_0x2b68('43')] && _0x2350ca[_0x2b68('42')][_0x2b68('43')][_0x2b68('44')]) {
                            _0x466732 = _0x2350ca[_0x2b68('42')][_0x2b68('43')][_0x2b68('44')]

                            for (let _0x27671f = 0; _0x27671f < _0x466732[_0x2b68('1e')]; _0x27671f++) {
                                console[_0x2b68('8')](_0x2b68('45') + _0x466732[_0x27671f][_0x2b68('46')])

                                console[_0x2b68('8')](_0x2b68('47') + _0x466732[_0x27671f][_0x2b68('48')])

                                console[_0x2b68('8')](_0x2b68('49') + _0x466732[_0x27671f][_0x2b68('4a')])

                                console[_0x2b68('8')](_0x2b68('4b') + _0x466732[_0x27671f][_0x2b68('4c')])

                                console[_0x2b68('8')](_0x2b68('4d') + _0x466732[_0x27671f][_0x2b68('4e')])

                                console[_0x2b68('8')]('')
                            }
                        }

                        if (_0x2350ca[_0x2b68('42')] && _0x2350ca[_0x2b68('42')][_0x2b68('4f')]) {
                            console[_0x2b68('8')](_0x2b68('50') + _0x2350ca[_0x2b68('42')][_0x2b68('51')][_0x2b68('52')][_0x2b68('53')])

                            console[_0x2b68('8')](_0x2b68('54') + _0x2350ca[_0x2b68('42')][_0x2b68('4f')][0][_0x2b68('46')])

                            console[_0x2b68('8')](_0x2b68('4b') + _0x2350ca[_0x2b68('42')][_0x2b68('4f')][0][_0x2b68('55')][_0x2b68('56')])

                            console[_0x2b68('8')](_0x2b68('57') + _0x2350ca[_0x2b68('42')][_0x2b68('4f')][0][_0x2b68('55')][_0x2b68('58')])

                            console[_0x2b68('8')](_0x2b68('59') + _0x2350ca[_0x2b68('42')][_0x2b68('4f')][0][_0x2b68('55')][_0x2b68('5a')])

                            _0x2d407f = _0x2350ca[_0x2b68('42')][_0x2b68('4f')][0][_0x2b68('5b')]

                            if ($[_0x2b68('1f')] == 1 && qlzl == '') {
                                packetId = _0x2350ca[_0x2b68('42')][_0x2b68('4f')][0][_0x2b68('5b')]
                                if (_0x1cfade == 0) {
                                    ck1Pack.push(packetId)
                                }
                                console[_0x2b68('8')](_0x2b68('5c') + _0x2350ca[_0x2b68('42')][_0x2b68('4f')][0][_0x2b68('5b')] + '】')
                            }
                        }
                    })
                if ($[_0x2b68('1f')] == 1) {
                    await fetch(_0x2b68('2b'), {
                        headers: {
                            Host: _0x2b68('2c'),
                            Connection: _0x2b68('2d'),
                            'Content-Length': _0x2b68('5d'),
                            Accept: _0x2b68('2f'),
                            'User-Agent': $[_0x2b68('1')]() ? (process[_0x2b68('5')][_0x2b68('30')] ? process[_0x2b68('5')][_0x2b68('30')] : require(_0x2b68('31'))[_0x2b68('32')]) : $[_0x2b68('9')](_0x2b68('33')) ? $[_0x2b68('9')](_0x2b68('33')) : _0x2b68('34'),
                            'Content-Type': _0x2b68('35'),
                            Origin: _0x2b68('36'),
                            'X-Requested-With': _0x2b68('37'),
                            'Sec-Fetch-Site': _0x2b68('38'),
                            'Sec-Fetch-Mode': _0x2b68('39'),
                            'Sec-Fetch-Dest': _0x2b68('3a'),
                            Referer: _0x2b68('3b'),
                            'Accept-Encoding': _0x2b68('3c'),
                            'Accept-Language': _0x2b68('3d'),
                            Cookie: _0x3f4ee0,
                        },
                        body: _0x2b68('3e'),
                        method: _0x2b68('3f'),
                    })
                        [_0x2b68('40')]((_0x43bcfd) => _0x43bcfd[_0x2b68('41')]())
                        [_0x2b68('40')]((_0x2ef3d4) => {
                            if ($[_0x2b68('1f')] == 1 && qlzl == '') {
                                code = _0x2ef3d4[_0x2b68('42')][_0x2b68('52')][_0x2b68('5e')]
                                if (_0x1cfade == 0) {
                                    ck1Pack.push(code)
                                }
                                console[_0x2b68('8')](_0x2b68('5f') + _0x2ef3d4[_0x2b68('42')][_0x2b68('52')][_0x2b68('5e')] + '】')

                                console[_0x2b68('8')]('')
                            }
                        })
                }

                console[_0x2b68('8')](_0x2b68('60') + code)

                console[_0x2b68('8')](_0x2b68('61') + packetId)

                console[_0x2b68('8')]('')

                if ($[_0x2b68('1f')] == 1) {
                    if (qlzl == '') {
                        qlzl = packetId + '@' + code
                    }

                    authorCodeList[_0x2b68('4')](qlzl)

                    authorCodeList[_0x2b68('4')](qlzl)
                }

                _0x4b5592 = authorCodeList[random(0, authorCodeList[_0x2b68('1e')])][_0x2b68('62')]('@')
                _0x24f1fc = _0x4b5592[0]
                _0x325434 = _0x4b5592[1]

                if (_0x1cfade === 1) {
                    _0x24f1fc = ck1Pack[0]
                    _0x325434 = ck1Pack[1]
                }
                await fetch(_0x2b68('2b'), {
                    headers: {
                        Host: _0x2b68('2c'),
                        Connection: _0x2b68('2d'),
                        'Content-Length': _0x2b68('63'),
                        Accept: _0x2b68('2f'),
                        'User-Agent': $[_0x2b68('1')]() ? (process[_0x2b68('5')][_0x2b68('30')] ? process[_0x2b68('5')][_0x2b68('30')] : require(_0x2b68('31'))[_0x2b68('32')]) : $[_0x2b68('9')](_0x2b68('33')) ? $[_0x2b68('9')](_0x2b68('33')) : _0x2b68('34'),
                        'Content-Type': _0x2b68('35'),
                        Origin: _0x2b68('36'),
                        'X-Requested-With': _0x2b68('37'),
                        'Sec-Fetch-Site': _0x2b68('38'),
                        'Sec-Fetch-Mode': _0x2b68('39'),
                        'Sec-Fetch-Dest': _0x2b68('3a'),
                        Referer: _0x2b68('64') + _0x325434 + _0x2b68('65') + _0x24f1fc + _0x2b68('66') + Date[_0x2b68('13')](new Date()),
                        'Accept-Encoding': _0x2b68('3c'),
                        'Accept-Language': _0x2b68('3d'),
                        Cookie: _0x3f4ee0,
                    },
                    body: _0x2b68('67') + _0x325434 + _0x2b68('68') + _0x2b68('69') + _0x2b68('6a') + _0x24f1fc + _0x2b68('6b') + Date[_0x2b68('13')](new Date()) + _0x2b68('6c'),
                    method: _0x2b68('3f'),
                })
                    [_0x2b68('40')]((_0x380a78) => _0x380a78[_0x2b68('41')]())
                    [_0x2b68('40')]((_0x1d5c7e) => {
                        if (_0x1d5c7e[_0x2b68('42')][_0x2b68('6d')] && _0x1d5c7e[_0x2b68('42')][_0x2b68('6d')][_0x2b68('46')] && _0x1d5c7e[_0x2b68('42')][_0x2b68('6d')][_0x2b68('46')] == _0x2b68('6e')) {
                            console[_0x2b68('8')](_0x1d5c7e[_0x2b68('42')][_0x2b68('6d')][_0x2b68('46')])
                        }

                        if (_0x1d5c7e[_0x2b68('42')] && _0x1d5c7e[_0x2b68('42')][_0x2b68('6f')]) {
                            console[_0x2b68('8')](_0x1d5c7e[_0x2b68('42')][_0x2b68('6f')])
                        }
                    })
                await fetch(_0x2b68('70'), {
                    headers: {
                        Host: _0x2b68('2c'),
                        Connection: _0x2b68('2d'),
                        'Content-Length': _0x2b68('2e'),
                        Accept: _0x2b68('2f'),
                        'User-Agent': $[_0x2b68('1')]() ? (process[_0x2b68('5')][_0x2b68('30')] ? process[_0x2b68('5')][_0x2b68('30')] : require(_0x2b68('31'))[_0x2b68('32')]) : $[_0x2b68('9')](_0x2b68('33')) ? $[_0x2b68('9')](_0x2b68('33')) : _0x2b68('34'),
                        'Content-Type': _0x2b68('35'),
                        Origin: _0x2b68('36'),
                        'X-Requested-With': _0x2b68('37'),
                        'Sec-Fetch-Site': _0x2b68('38'),
                        'Sec-Fetch-Mode': _0x2b68('39'),
                        'Sec-Fetch-Dest': _0x2b68('3a'),
                        Referer: _0x2b68('3b'),
                        'Accept-Encoding': _0x2b68('3c'),
                        'Accept-Language': _0x2b68('3d'),
                        Cookie: _0x3f4ee0,
                    },
                    body: _0x2b68('71') + commodityId + _0x2b68('72') + skuId + '}',
                    method: _0x2b68('3f'),
                })
                    [_0x2b68('40')]((_0x501f67) => _0x501f67[_0x2b68('41')]())
                    [_0x2b68('40')]((_0x3ce25d) => {
                        if (_0x3ce25d[_0x2b68('42')][_0x2b68('6f')] != null && _0x3ce25d[_0x2b68('42')][_0x2b68('6f')] != '') {
                            console[_0x2b68('8')](_0x3ce25d[_0x2b68('42')][_0x2b68('6f')])
                        }

                        if (_0x3ce25d[_0x2b68('42')][_0x2b68('73')] != null && _0x3ce25d[_0x2b68('42')][_0x2b68('73')] != '' && _0x3ce25d[_0x2b68('42')][_0x2b68('73')][_0x2b68('46')] != '') {
                            console[_0x2b68('8')](_0x2b68('74') + _0x3ce25d[_0x2b68('42')][_0x2b68('73')][_0x2b68('46')])
                        }

                        if (_0x3ce25d[_0x2b68('42')][_0x2b68('6d')] != null && _0x3ce25d[_0x2b68('42')][_0x2b68('6d')] != '' && _0x3ce25d[_0x2b68('42')][_0x2b68('6d')][_0x2b68('46')] != '') {
                            console[_0x2b68('8')](_0x3ce25d[_0x2b68('42')][_0x2b68('6d')][_0x2b68('46')])

                            console[_0x2b68('8')](_0x3ce25d[_0x2b68('42')][_0x2b68('6d')][_0x2b68('75')])
                        }
                    })

                console[_0x2b68('8')]('')

                console[_0x2b68('8')](_0x2b68('78'))

                await fetch(_0x2b68('79'), {
                    headers: {
                        Host: _0x2b68('2c'),
                        Connection: _0x2b68('2d'),
                        'Content-Length': '46',
                        Accept: _0x2b68('2f'),
                        'User-Agent': $[_0x2b68('1')]() ? (process[_0x2b68('5')][_0x2b68('30')] ? process[_0x2b68('5')][_0x2b68('30')] : require(_0x2b68('31'))[_0x2b68('32')]) : $[_0x2b68('9')](_0x2b68('33')) ? $[_0x2b68('9')](_0x2b68('33')) : _0x2b68('34'),
                        'Content-Type': _0x2b68('35'),
                        Origin: _0x2b68('36'),
                        'X-Requested-With': _0x2b68('37'),
                        'Sec-Fetch-Site': _0x2b68('38'),
                        'Sec-Fetch-Mode': _0x2b68('39'),
                        'Sec-Fetch-Dest': _0x2b68('3a'),
                        Referer: _0x2b68('7a') + _0x2d407f + _0x2b68('7b'),
                        'Accept-Encoding': _0x2b68('3c'),
                        'Accept-Language': _0x2b68('3d'),
                        Cookie: _0x3f4ee0,
                    },
                    body: _0x2b68('7c') + _0x2d407f + _0x2b68('7d'),
                    method: _0x2b68('3f'),
                })
                    [_0x2b68('40')]((_0x226d73) => _0x226d73[_0x2b68('41')]())
                    [_0x2b68('40')]((_0x635e3c) => {
                        if (_0x635e3c[_0x2b68('42')] && _0x635e3c[_0x2b68('42')][_0x2b68('55')] && _0x635e3c[_0x2b68('42')][_0x2b68('55')][_0x2b68('5a')]) {
                            console[_0x2b68('8')](_0x2b68('7e') + _0x635e3c[_0x2b68('42')][_0x2b68('55')][_0x2b68('5a')])

                            console[_0x2b68('8')](_0x635e3c[_0x2b68('42')][_0x2b68('55')][_0x2b68('7f')])
                        }
                    })
            } catch (_0x4e15e0) {}

            await $[_0x2b68('80')](10000)

            console[_0x2b68('8')]('')
        }
    }
})()
    [_0x2b68('81')]((_0x175d88) => {
        $[_0x2b68('8')]('', '❌ ' + $[_0x2b68('19')] + _0x2b68('82') + _0x175d88 + '!', '')
    })
    [_0x2b68('83')](() => {
        $[_0x2b68('84')]()
    })
_0xodm = 'jsjiami.com.v6'

function Env(t, e) {
    'undefined' != typeof process && JSON['stringify'](process['env'])['indexOf']('GITHUB') > -1 && process['exit'](0)

    class s {
        constructor(t) {
            this['env'] = t
        }

        send(t, e = 'GET') {
            t =
                'string' == typeof t
                    ? {
                          url: t,
                      }
                    : t
            let s = this['get']
            'POST' === e && (s = this['post'])
            return new Promise((e, i) => {
                s['call'](this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }

        get(t) {
            return this['send']['call'](this['env'], t)
        }

        post(t) {
            return this['send']['call'](this['env'], t, 'POST')
        }
    }

    return new (class {
        constructor(t, e) {
            this['name'] = t
            this['http'] = new s(this)
            this['data'] = null
            this['dataFile'] = 'box.dat'
            this['logs'] = []
            this['isMute'] = false
            this['isNeedRewrite'] = false
            this['logSeparator'] = '\n'
            this['startTime'] = new Date()['getTime']()
            Object['assign'](this, e)
            this['log']('', `🔔${this['name']}, 开始!`)
        }

        isNode() {
            return 'undefined' != typeof module && !!module['exports']
        }

        isQuanX() {
            return 'undefined' != typeof $task
        }

        isSurge() {
            return 'undefined' != typeof $httpClient && 'undefined' == typeof $loon
        }

        isLoon() {
            return 'undefined' != typeof $loon
        }

        toObj(t, e = null) {
            try {
                return JSON['parse'](t)
            } catch {
                return e
            }
        }

        toStr(t, e = null) {
            try {
                return JSON['stringify'](t)
            } catch {
                return e
            }
        }

        getjson(t, e) {
            let s = e
            const i = this['getdata'](t)

            if (i) {
                try {
                    s = JSON['parse'](this['getdata'](t))
                } catch {}
            }

            return s
        }

        setjson(t, e) {
            try {
                return this['setdata'](JSON['stringify'](t), e)
            } catch {
                return false
            }
        }

        getScript(t) {
            return new Promise((e) => {
                this['get'](
                    {
                        url: t,
                    },
                    (t, s, i) => e(i)
                )
            })
        }

        runScript(t, e) {
            return new Promise((s) => {
                let i = this['getdata']('@chavy_boxjs_userCfgs.httpapi')
                i = i ? i['replace'](/\n/g, '')['trim']() : i
                let r = this['getdata']('@chavy_boxjs_userCfgs.httpapi_timeout')
                r = r ? 1 * r : 20
                r = e && e['timeout'] ? e['timeout'] : r
                const [o, h] = i['split']('@'),
                    n = {
                        url: `http://${h}/v1/scripting/evaluate`,
                        body: {
                            script_text: t,
                            mock_type: 'cron',
                            timeout: r,
                        },
                        headers: {
                            'X-Key': o,
                            Accept: '*/*',
                        },
                    }
                this['post'](n, (t, e, i) => s(i))
            })['catch']((t) => this['logErr'](t))
        }

        loaddata() {
            if (!this['isNode']()) {
                return {}
            }

            {
                this['fs'] = this['fs'] ? this['fs'] : require('fs')
                this['path'] = this['path'] ? this['path'] : require('path')
                const t = this['path']['resolve'](this['dataFile']),
                    e = this['path']['resolve'](process['cwd'](), this['dataFile']),
                    s = this['fs']['existsSync'](t),
                    i = !s && this['fs']['existsSync'](e)

                if (!s && !i) {
                    return {}
                }

                {
                    const i = s ? t : e

                    try {
                        return JSON['parse'](this['fs']['readFileSync'](i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }

        writedata() {
            if (this['isNode']()) {
                this['fs'] = this['fs'] ? this['fs'] : require('fs')
                this['path'] = this['path'] ? this['path'] : require('path')
                const t = this['path']['resolve'](this['dataFile']),
                    e = this['path']['resolve'](process['cwd'](), this['dataFile']),
                    s = this['fs']['existsSync'](t),
                    i = !s && this['fs']['existsSync'](e),
                    r = JSON['stringify'](this['data'])
                s ? this['fs']['writeFileSync'](t, r) : i ? this['fs']['writeFileSync'](e, r) : this['fs']['writeFileSync'](t, r)
            }
        }

        lodash_get(t, e, s) {
            const i = e['replace'](/\[(\d+)\]/g, '.$1')['split']('.')
            let r = t

            for (const t of i)
                if (((r = Object(r)[t]), void 0 === r)) {
                    return s
                }

            return r
        }

        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array['isArray'](e) || (e = e['toString']()['match'](/[^.[\]]+/g) || []), (e['slice'](0, -1)['reduce']((t, s, i) => (Object(t[s]) === t[s] ? t[s] : (t[s] = Math['abs'](e[i + 1]) >> 0 == +e[i + 1] ? [] : {})), t)[e[e['length'] - 1]] = s), t)
        }

        getdata(t) {
            let e = this['getval'](t)

            if (/^@/['test'](t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/['exec'](t),
                    r = s ? this['getval'](s) : ''

                if (r) {
                    try {
                        const t = JSON['parse'](r)
                        e = t ? this['lodash_get'](t, i, '') : e
                    } catch (t) {
                        e = ''
                    }
                }
            }

            return e
        }

        setdata(t, e) {
            let s = false

            if (/^@/['test'](e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/['exec'](e),
                    o = this['getval'](i),
                    h = i ? ('null' === o ? null : o || '{}') : '{}'

                try {
                    const e = JSON['parse'](h)
                    this['lodash_set'](e, r, t)
                    s = this['setval'](JSON['stringify'](e), i)
                } catch (e) {
                    const o = {}
                    this['lodash_set'](o, r, t)
                    s = this['setval'](JSON['stringify'](o), i)
                }
            } else {
                s = this['setval'](t, e)
            }

            return s
        }

        getval(t) {
            return this['isSurge']() || this['isLoon']() ? $persistentStore['read'](t) : this['isQuanX']() ? $prefs['valueForKey'](t) : this['isNode']() ? ((this['data'] = this['loaddata']()), this['data'][t]) : (this['data'] && this['data'][t]) || null
        }

        setval(t, e) {
            return this['isSurge']() || this['isLoon']() ? $persistentStore['write'](t, e) : this['isQuanX']() ? $prefs['setValueForKey'](t, e) : this['isNode']() ? ((this['data'] = this['loaddata']()), (this['data'][e] = t), this['writedata'](), true) : (this['data'] && this['data'][e]) || null
        }

        initGotEnv(t) {
            this['got'] = this['got'] ? this['got'] : require('got')
            this['cktough'] = this['cktough'] ? this['cktough'] : require('tough-cookie')
            this['ckjar'] = this['ckjar'] ? this['ckjar'] : new this['cktough']['CookieJar']()
            t && ((t['headers'] = t['headers'] ? t['headers'] : {}), void 0 === t['headers']['Cookie'] && void 0 === t['cookieJar'] && (t['cookieJar'] = this['ckjar']))
        }

        get(t, e = () => {}) {
            t['headers'] && (delete t['headers']['Content-Type'], delete t['headers']['Content-Length'])
            this['isSurge']() || this['isLoon']()
                ? (this['isSurge']() &&
                      this['isNeedRewrite'] &&
                      ((t['headers'] = t['headers'] || {}),
                      Object['assign'](t['headers'], {
                          'X-Surge-Skip-Scripting': false,
                      })),
                  $httpClient['get'](t, (t, s, i) => {
                      !t && s && ((s['body'] = i), (s['statusCode'] = s['status']))
                      e(t, s, i)
                  }))
                : this['isQuanX']()
                ? (this['isNeedRewrite'] &&
                      ((t['opts'] = t['opts'] || {}),
                      Object['assign'](t['opts'], {
                          hints: false,
                      })),
                  $task['fetch'](t)['then'](
                      (t) => {
                          const { statusCode: s, statusCode: i, headers: r, body: o } = t
                          e(
                              null,
                              {
                                  status: s,
                                  statusCode: i,
                                  headers: r,
                                  body: o,
                              },
                              o
                          )
                      },
                      (t) => e(t)
                  ))
                : this['isNode']() &&
                  (this['initGotEnv'](t),
                  this['got'](t)
                      ['on']('redirect', (t, e) => {
                          try {
                              if (t['headers']['set-cookie']) {
                                  const s = t['headers']['set-cookie']['map'](this['cktough']['Cookie']['parse'])['toString']()
                                  s && this['ckjar']['setCookieSync'](s, null)
                                  e['cookieJar'] = this['ckjar']
                              }
                          } catch (t) {
                              this['logErr'](t)
                          }
                      })
                      ['then'](
                          (t) => {
                              const { statusCode: s, statusCode: i, headers: r, body: o } = t
                              e(
                                  null,
                                  {
                                      status: s,
                                      statusCode: i,
                                      headers: r,
                                      body: o,
                                  },
                                  o
                              )
                          },
                          (t) => {
                              const { message: s, response: i } = t
                              e(s, i, i && i['body'])
                          }
                      ))
        }

        post(t, e = () => {}) {
            if ((t['body'] && t['headers'] && !t['headers']['Content-Type'] && (t['headers']['Content-Type'] = 'application/x-www-form-urlencoded'), t['headers'] && delete t['headers']['Content-Length'], this['isSurge']() || this['isLoon']())) {
                this['isSurge']() &&
                    this['isNeedRewrite'] &&
                    ((t['headers'] = t['headers'] || {}),
                    Object['assign'](t['headers'], {
                        'X-Surge-Skip-Scripting': false,
                    }))
                $httpClient['post'](t, (t, s, i) => {
                    !t && s && ((s['body'] = i), (s['statusCode'] = s['status']))
                    e(t, s, i)
                })
            } else {
                if (this['isQuanX']()) {
                    t['method'] = 'POST'
                    this['isNeedRewrite'] &&
                        ((t['opts'] = t['opts'] || {}),
                        Object['assign'](t['opts'], {
                            hints: false,
                        }))
                    $task['fetch'](t)['then'](
                        (t) => {
                            const { statusCode: s, statusCode: i, headers: r, body: o } = t
                            e(
                                null,
                                {
                                    status: s,
                                    statusCode: i,
                                    headers: r,
                                    body: o,
                                },
                                o
                            )
                        },
                        (t) => e(t)
                    )
                } else {
                    if (this['isNode']()) {
                        this['initGotEnv'](t)
                        const { url: s, ...i } = t
                        this['got']['post'](s, i)['then'](
                            (t) => {
                                const { statusCode: s, statusCode: i, headers: r, body: o } = t
                                e(
                                    null,
                                    {
                                        status: s,
                                        statusCode: i,
                                        headers: r,
                                        body: o,
                                    },
                                    o
                                )
                            },
                            (t) => {
                                const { message: s, response: i } = t
                                e(s, i, i && i['body'])
                            }
                        )
                    }
                }
            }
        }

        time(t, e = null) {
            const s = e ? new Date(e) : new Date()
            let i = {
                'M+': s['getMonth']() + 1,
                'd+': s['getDate'](),
                'H+': s['getHours'](),
                'm+': s['getMinutes'](),
                's+': s['getSeconds'](),
                'q+': Math['floor']((s['getMonth']() + 3) / 3),
                S: s['getMilliseconds'](),
            }
            ;/(y+)/['test'](t) && (t = t['replace'](RegExp['$1'], (s['getFullYear']() + '')['substr'](4 - RegExp['$1']['length'])))

            for (let e in i) new RegExp('(' + e + ')')['test'](t) && (t = t['replace'](RegExp['$1'], 1 == RegExp['$1']['length'] ? i[e] : ('00' + i[e])['substr'](('' + i[e])['length'])))

            return t
        }

        msg(e = t, s = '', i = '', r) {
            const o = (t) => {
                if (!t) {
                    return t
                }

                if ('string' == typeof t) {
                    return this['isLoon']()
                        ? t
                        : this['isQuanX']()
                        ? {
                              'open-url': t,
                          }
                        : this['isSurge']()
                        ? {
                              url: t,
                          }
                        : void 0
                }

                if ('object' == typeof t) {
                    if (this['isLoon']()) {
                        let e = t['openUrl'] || t['url'] || t['open-url'],
                            s = t['mediaUrl'] || t['media-url']
                        return {
                            openUrl: e,
                            mediaUrl: s,
                        }
                    }

                    if (this['isQuanX']()) {
                        let e = t['open-url'] || t['url'] || t['openUrl'],
                            s = t['media-url'] || t['mediaUrl']
                        return {
                            'open-url': e,
                            'media-url': s,
                        }
                    }

                    if (this['isSurge']()) {
                        let e = t['url'] || t['openUrl'] || t['open-url']
                        return {
                            url: e,
                        }
                    }
                }
            }

            if ((this['isMute'] || (this['isSurge']() || this['isLoon']() ? $notification['post'](e, s, i, o(r)) : this['isQuanX']() && $notify(e, s, i, o(r))), !this['isMuteLog'])) {
                let t = ['', '==============📣系统通知📣==============']
                t['push'](e)
                s && t['push'](s)
                i && t['push'](i)
                console['log'](t['join']('\n'))
                this['logs'] = this['logs']['concat'](t)
            }
        }

        log(...t) {
            t['length'] > 0 && (this['logs'] = [...this['logs'], ...t])
            console['log'](t['join'](this['logSeparator']))
        }

        logErr(t, e) {
            const s = !this['isSurge']() && !this['isQuanX']() && !this['isLoon']()
            s ? this['log']('', `❗️${this['name']}, 错误!`, t['stack']) : this['log']('', `❗️${this['name']}, 错误!`, t)
        }

        wait(t) {
            return new Promise((e) => setTimeout(e, t))
        }

        done(t = {}) {
            const e = new Date()['getTime'](),
                s = (e - this['startTime']) / 1e3
            this['log']('', `🔔${this['name']}, 结束! 🕛 ${s} 秒`)
            this['log']()
            ;(this['isSurge']() || this['isQuanX']() || this['isLoon']()) && $done(t)
        }
    })(t, e)
}
