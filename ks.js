/*
IOS/安卓： 快手 普通版

脚本目前会做签到和翻倍，开宝箱和翻倍，看广告任务，逛街任务，直播任务

CK里的api_st跟快手极速版的通用，但是需要额外一个did(设备号)，同一台设备捉包的话可以把did复制一遍粘贴到每个账号的api_st后面，建议用不同设备捉包
V2P和圈X配置好重写后，应该打开APP就能获取到CK，重写跟快手极速版的冲突，需要关掉其中一个
青龙把任意包里的kuaishou.api_st=xxxxxxxxxxxx;和did=yyyyyyyyyyy;这两段连在一起放到变量ksCookie里，多账户换行或者@隔开
export ksCookie='kuaishou.api_st=xxxxxxxxxxxx; did=yyyyyyyyyyy;'

默认每天14点提现，0点自动兑换金币，要改提现时间的话，把提现时间(小时)填到变量ksWithdrawTime里
默认提现2块到绑定的提现账号，都有绑定的话默认提现到支付宝
要改金额的话把提现金额填到变量ksCash里。如果提现失败，手动接验证码提现一次
需要手动设置提现渠道的话，微信把 ksPayType=WECHAT; ，支付宝把 ksPayType=ALIPAY; 写到对应账号ck后面
设置变量ksNotify为0/1/2可以控制不通知/提现时间通知/每次运行都通知，默认提现时间通知

定时一天最少10次(一般10次能做完任务)

hostname = api.kuaisho*.com
hostname = open.kuaisho*.com
*/

const $$ = new Envs('')
let arrs = []
let all_msg = '',
    mac = ''
var gtr
let acckey = $$['isNode']() ? (process['env']['cdkey'] ? process['env']['cdkey'] : '') : $$['getdata']('cdkey') ? $$['getdata']('cdkey') : ''
JSNAMED = $$['isNode']() ? require('path')['basename'](__filename) : 'ks.js'

const _0x5643cd = '快手',
    _0x21c8ae = new _0x59d661(_0x5643cd)

let _0x3bbf36 = '',
    _0x5dc149,
    _0x8a31c2 = ['\n', '@'],
    _0x33583e = (_0x21c8ae['isNode']() ? process['env']['ksCookie'] : _0x21c8ae['getdata']('ksCookie')) || '',
    _0x25b925 = [],
    _0x4adfa8 = (_0x21c8ae['isNode']() ? process['env']['ksCash'] : _0x21c8ae['getval']('ksCash')) || '',
    _0x1a0c50 = (_0x21c8ae['isNode']() ? process['env']['ksWithdrawTime'] : _0x21c8ae['getval']('ksWithdrawTime')) || 14,
    _0xc8119e = (_0x21c8ae['isNode']() ? process['env']['ksAggressive'] : _0x21c8ae['getval']('ksAggressive')) || 0,
    _0x14e839 = (_0x21c8ae['isNode']() ? process['env']['ksNotify'] : _0x21c8ae['getval']('ksNotify')) || 1,
    _0x17620d = 0,
    _0x16bc78 = 0,
    _0x381184 = 10,
    _0x75f50c = []

const _0xd6ecf8 = {}
_0xd6ecf8['ad'] = 100
_0xd6ecf8['live'] = 101
_0xd6ecf8['gj'] = 203
_0xd6ecf8['sign'] = 12
let _0x145b0c = '1ee74def7bb6fc015b0ba1dde79887ba4f839df5d941203d745b5db6b0e0ca97779a99b6b9b573a7a781f0b3dd116e81cf3cc6811816b891f2bd0b421f2a89df786c69b2546fc534f468e9263d8c5bc0f92c10afb96f511415a57be7311edd52'
const _0x1d67d9 = {}
_0x1d67d9['id'] = 100
_0x1d67d9['pageId'] = 100011251
_0x1d67d9['subPageId'] = 100011252
_0x1d67d9['name'] = '广告视频'
const _0x5def4e = {}
_0x5def4e['id'] = 101
_0x5def4e['pageId'] = 100011251
_0x5def4e['subPageId'] = 100011252
_0x5def4e['name'] = '直播视频'
const _0x2d7bdb = {
    id: 9,
    pageId: 100011251,
    subPageId: 100011252,
    name: '宝箱视频',
}
const _0x338d8a = {}
_0x338d8a['id'] = 168
_0x338d8a['pageId'] = 100011251
_0x338d8a['subPageId'] = 100011252
_0x338d8a['name'] = '签到视频1'
const _0xcdfb5c = {
    id: 1004,
    pageId: 100011251,
    subPageId: 100011398,
    name: '签到视频2',
    ext: 'e5d5fa98c3b44085fde5c19249f427618fd38c07eee3fd15ccf7c7982cbd0244',
}
const _0xf366a = {}
_0xf366a['id'] = 49
_0xf366a['name'] = '广告视频1'
const _0x2c3cd0 = {}
_0x2c3cd0['id'] = 75
_0x2c3cd0['name'] = '广告视频2'
const _0x41c0df = {
    id: 11,
    name: '未知视频',
}
const _0x38676a = {}
_0x38676a['id'] = 15
_0x38676a['name'] = '未知视频'
const _0x443aa5 = {}
_0x443aa5['id'] = 161
_0x443aa5['name'] = '未知视频'
const _0x8714cd = {}
_0x8714cd['id'] = 173
_0x8714cd['name'] = '未知视频'
const _0x222f45 = {}
_0x222f45['id'] = 177
_0x222f45['name'] = '未知视频'
const _0x1c8a86 = {
    id: 183,
    name: '额外奖励视频？',
}
const _0x3267d7 = {
    ad: _0x1d67d9,
    live: _0x5def4e,
    box: _0x2d7bdb,
    sign1: _0x338d8a,
    sign2: _0xcdfb5c,
    ad1: _0xf366a,
    ad2: _0x2c3cd0,
    unknown1: _0x41c0df,
    unknown2: _0x38676a,
    unknown6: _0x443aa5,
    unknown8: _0x8714cd,
    unknown9: _0x222f45,
    unknown10: _0x1c8a86,
}

let _0x5a59a9 = new Date(),
    _0x4a8496 = _0x5a59a9['getHours'](),
    _0x2d79b8 = 1.02,
    _0x19f33a = 0,
    _0x2b8fdb = 'ks',
    _0x36f964 = 'https://leafxcy.coding.net/p/validcode/d/validCode/git/raw/master/code.json',
    _0x22c1cb = 'https://127.0.0.1/'

class _0x15fb76 {
    constructor(_0x175719) {
        this['index'] = ++_0x17620d
        this['payType'] = _0x175719['indexOf']('ksPayType') > -1 ? _0x175719['match'](/ksPayType=(\w+)/)[1] : ''
        this['api_st'] = _0x175719['match'](/kuaishou.api_st=([\w\-]+)/)[1]
        this['token'] = _0x4de7fc(32) + '-' + _0x4de7fc(10)
        this['did'] = _0x175719['match'](/[ ;]did=(\w+)/)[1]
        this['cookie'] = 'kpn=KUAISHOU; kpf=ANDROID_PHONE; c=OPPO; ver=10.1; appver=10.1.30.24157; language=zh-cn; countryCode=CN; sys=ANDROID_5.1; client_key=3c2cd3f3; kuaishou.api_st=' + this['api_st'] + '; did=' + this['did'] + ';'
        this['name'] = this['index']
        this['valid'] = false
        this['bindAlipay'] = false
        this['alipay'] = ''
        this['bindWechat'] = false
        this['wechat'] = ''
        this['needSms'] = false
        const _0x687a1a = {
            num: 1,
            needRun: true,
        }
        const _0x31e155 = {
            num: 1,
            needRun: true,
        }
        const _0x16f2f8 = {
            num: 1,
            needRun: true,
        }
        const _0x3d1b5a = {
            num: 1,
            needRun: false,
        }
        const _0x24857b = {
            100: _0x687a1a,
            101: _0x31e155,
            203: _0x16f2f8,
            12: _0x3d1b5a,
        }
        this['task'] = _0x24857b
    }

    async ['getUserInfo'](_0x136d5d) {
        let _0x219e4f = 'https://encourage.kuaishou.com/rest/wd/encourage/home',
            _0x218cce = '',
            _0x477150 = _0x5beba6(_0x219e4f, this['cookie'], _0x218cce)

        await _0x42ee72('get', _0x477150)
        let _0x22dcda = _0x5dc149

        if (!_0x22dcda) {
            return
        }

        if (_0x22dcda['result'] == 1) {
            this['valid'] = true
            this['cash'] = _0x22dcda['data']['cash']
            this['coin'] = _0x22dcda['data']['coin']
            console['log']('账号[' + this['name'] + ']账户余额' + this['cash'] + '元，' + this['coin'] + '金币')

            if (_0x136d5d) {
                _0x3bbf36 += '账号[' + this['name'] + ']账户余额' + this['cash'] + '元，' + this['coin'] + '金币\n'
            }
        } else {
            console['log']('账号[' + this['name'] + ']查询账户信息失败：' + _0x22dcda['error_msg'])
        }
    }

    async ['getSignInfo']() {
        let _0x3f60d8 = 'https://encourage.kuaishou.com/rest/wd/encourage/signIn/info',
            _0x4c4994 = '',
            _0xe715a = _0x5beba6(_0x3f60d8, this['cookie'], _0x4c4994)

        await _0x42ee72('get', _0xe715a)
        let _0x37f0ab = _0x5dc149

        if (!_0x37f0ab) {
            return
        }

        if (_0x37f0ab['result'] == 1) {
            if (_0x37f0ab['data']) {
                let _0x506d1d = 0

                if (_0x37f0ab['data']['cashSignInData']) {
                    let _0x26a302 = _0x37f0ab['data']['cashSignInData']['currentDay']

                    for (let _0x34418f of _0x37f0ab['data']['cashSignInData']['tasks']) {
                        if (_0x34418f['signInDay'] == _0x26a302) {
                            this['isSign'] = _0x34418f['status'] == 2
                            _0x506d1d = _0x37f0ab['data']['cashSignInData']['signInBizId']
                            break
                        }
                    }
                } else {
                    this['isSign'] = _0x37f0ab['data']['todaySignInCompleted']
                }

                console['log']('账号[' + this['name'] + ']今天' + (this['isSign'] ? '已' : '未') + '签到')
                this['isSign'] == false && (await _0x21c8ae['wait'](200), await this['doSign'](_0x506d1d))
            }
        } else {
            console['log']('账号[' + this['name'] + ']查询签到信息失败：' + _0x37f0ab['error_msg'])
        }
    }

    async ['doSign'](_0x39b664) {
        let _0x313adb = 'https://encourage.kuaishou.com/rest/wd/encourage/signIn/report',
            _0x5b5625 = '{"signInBizId":' + _0x39b664 + '}',
            _0x19123d = _0x5beba6(_0x313adb, this['cookie'], _0x5b5625)

        _0x19123d['headers']['Content-Type'] = 'application/json'
        await _0x42ee72('post', _0x19123d)
        let _0x1abc98 = _0x5dc149

        if (!_0x1abc98) {
            return
        }

        if (_0x1abc98['result'] == 1) {
            if (_0x1abc98['data']['cashSignInData']) {
                console['log']('账号[' + this['name'] + ']签到获得：' + _0x1abc98['data']['cashSignInData']['rewardCount'] / 100 + '元')
            } else {
                _0x1abc98['data']['dailySignInView']
                    ? _0x1abc98['data']['dailySignInView']['status'] == 1
                        ? console['log']('账号[' + this['name'] + ']签到成功')
                        : console['log']('账号[' + this['name'] + ']签到失败：' + _0x1abc98['data']['dailySignInView']['toast'])
                    : console['log']('账号[' + this['name'] + ']签到获得：' + _0x1abc98['data']['popup']['amount'] + '金币')
            }

            await _0x21c8ae['wait'](200)
            await this['ksAdParam'](_0x3267d7['sign1'])
            await _0x21c8ae['wait'](200)
            await this['ksAdParam'](_0x3267d7['sign2'])
        } else {
            console['log']('账号[' + this['name'] + ']签到失败：' + _0x1abc98['error_msg'])
        }
    }

    async ['taskList']() {
        let _0xc673c9 = 'https://encourage.kuaishou.com/rest/wd/encourage/task/list',
            _0x497c1a = '',
            _0x5043c3 = _0x5beba6(_0xc673c9, this['cookie'], _0x497c1a)

        await _0x42ee72('get', _0x5043c3)
        let _0x54f3ab = _0x5dc149

        if (!_0x54f3ab) {
            return
        }

        if (_0x54f3ab['result'] == 1) {
            console['log']('账号[' + this['name'] + ']任务完成情况：')

            for (let _0x5a7c99 of _0x54f3ab['data']['dailyTasks']['taskList']) {
                for (let _0x5b18e7 in _0xd6ecf8) {
                    if (_0x5a7c99['taskId'] == _0xd6ecf8[_0x5b18e7]) {
                        let _0x418fb2 = _0x5a7c99['subTitle']['match'](/([\w\/]+)/)[1]['split']('/'),
                            _0x10c502 = '',
                            _0x53081e = true,
                            _0x5f2fef = this['task'][_0x5a7c99['taskId']]['num']

                        if (_0x418fb2['length'] > 1) {
                            let _0x42c70d = parseInt(_0x418fb2[0]),
                                _0x282c01 = parseInt(_0x418fb2[1])

                            _0x5f2fef = _0x282c01 > 0 ? Math['ceil'](_0x282c01 / _0x381184) : 1
                            _0x53081e = _0x42c70d < _0x282c01 || _0x42c70d > 30
                            _0x10c502 = _0x42c70d + '/' + _0x282c01 + '，'
                        } else {
                            _0x53081e = _0x5a7c99['status'] == 5 ? false : true
                        }

                        const _0x2bf797 = {
                            num: _0x5f2fef,
                            needRun: _0x53081e,
                        }
                        this['task'][_0x5a7c99['taskId']] = _0x2bf797
                        console['log']('【' + _0x5a7c99['title'] + '】 ' + _0x10c502 + (_0x53081e ? '未完成' : '已完成') + '，每次运行完成' + _0x5f2fef + '次任务')
                        continue
                    }
                }
            }
        } else {
            console['log']('账号[' + this['name'] + ']查询任务列表失败：' + _0x54f3ab['error_msg'])
        }
    }

    async ['taskReward'](_0x487df0) {
        let _0x47dd8a = 'https://encourage.kuaishou.com/rest/wd/encourage/task/reward?taskId=' + _0x487df0,
            _0x2ff285 = '',
            _0x2ae111 = _0x5beba6(_0x47dd8a, this['cookie'], _0x2ff285)

        await _0x42ee72('get', _0x2ae111)
        let _0x128457 = _0x5dc149

        if (!_0x128457) {
            return
        }

        console['log'](_0x128457)
        _0x128457['result'] == 1 ? console['log']('账号[' + this['name'] + ']领取任务[' + _0x487df0 + ']奖励成功') : console['log']('账号[' + this['name'] + ']领取任务[' + _0x487df0 + ']奖励失败：' + _0x128457['error_msg'])
    }

    async ['treasureBoxInfo'](_0x38429b = true) {
        let _0x1a7208 = 'https://encourage.kuaishou.com/rest/wd/encourage/treasureBox/info',
            _0x15700d = '',
            _0x1b276b = _0x5beba6(_0x1a7208, this['cookie'], _0x15700d)

        await _0x42ee72('get', _0x1b276b)
        let _0xb9f4f4 = _0x5dc149

        if (!_0xb9f4f4) {
            return
        }

        if (_0xb9f4f4['result'] == 1) {
            if (_0xb9f4f4['data']) {
                if (_0xb9f4f4['data']['status'] == 4) {
                    console['log']('账号[' + this['name'] + ']今天开宝箱次数已用完，请明天再来')
                } else {
                    _0xb9f4f4['data']['status'] == 3 ? (await _0x21c8ae['wait'](200), await this['openBox'](_0xb9f4f4['data']['token'])) : console['log']('账号[' + this['name'] + ']开宝箱冷却还有' + _0xb9f4f4['data']['treasureCurrentTaskRemainSeconds'] + '秒')
                }
            } else {
                console['log']('账号[' + this['name'] + ']查询宝箱状态失败，返回为空')
            }
        } else {
            console['log']('账号[' + this['name'] + ']查询宝箱状态失败：' + _0xb9f4f4['error_msg'])
        }
    }

    async ['openBox'](_0x240350) {
        let _0x4c6e06 = 'https://encourage.kuaishou.com/rest/wd/encourage/treasureBox/report',
            _0x3c6147 = '{"taskToken":"' + _0x240350 + '"}',
            _0x5db670 = _0x5beba6(_0x4c6e06, this['cookie'], _0x3c6147)

        _0x5db670['headers']['Content-Type'] = 'application/json'
        await _0x42ee72('post', _0x5db670)
        let _0x19263d = _0x5dc149

        if (!_0x19263d) {
            return
        }

        if (_0x19263d['result'] == 1) {
            console['log']('账号[' + this['name'] + ']开宝箱获得' + _0x19263d['data']['rewardCount'] + '金币')
            await _0x21c8ae['wait'](200)
            await this['ksAdParam'](_0x3267d7['box'])
            await _0x21c8ae['wait'](200)
            await this['treasureBoxInfo'](false)
        } else {
            console['log']('账号[' + this['name'] + ']开宝箱失败：' + _0x19263d['error_msg'])
        }
    }

    async ['ksgj'](_0x137995) {
        let _0x4cf370 = 'did=ANDROID_' + _0x4de7fc(16) + ';',
            _0x1074d4 = this['cookie']['replace'](/did=ANDROID_\w+;/, _0x4cf370),
            _0x409cb7 = 'https://api2.e.kuaishou.com/rest/r/reward/task/getActivityReward',
            _0x12462d = 'activityId=' + _0x137995 + '&client_key=3c2cd3f3',
            _0x22b363 = _0x5beba6(_0x409cb7, _0x1074d4, _0x12462d)

        await _0x42ee72('post', _0x22b363)
        let _0x25635d = _0x5dc149

        if (!_0x25635d) {
            return
        }

        _0x25635d['result'] == 1 ? console['log']('账号[' + this['name'] + ']逛街获得' + _0x25635d['data']['amount'] + '金币') : console['log']('账号[' + this['name'] + ']逛街失败：' + _0x25635d['error_msg'])
    }

    async ['ksAdParam'](_0xe8c829) {
        let _0x34e79e = 'https://api2.e.kuaishou.com/rest/e/v1/reward/ad?kpf=ANDROID_PHONE&kpn=KUAISHOU',
            _0x3de2e3 =
                'encData=WlTuzeTU6mGT9525bjJUVnlhdgsCQXljgjAw%2BtDz1mZVWetApHdJY%2B3iV5r3%2Fj4ozCxb3mLGNsZ%2F8IbMzSr5MXzlgFz9aSREPxWslOo0jRvgTWaoGXSA9WwL3xPz7291vbvHilZRRTceoVeHeCt3R1QOjkip3dhHoM1bA1bZOlTKhmoAokfpWpIFivGtcP6o7dSTNJdn3L3aBV%2BhOmHAfYhy5g6ht91Lwk0eQ8qZVJSEvV7ecgOpWLyzWktyB0gnxWD%2BS4R3zT5PekHk7iwd6ZV7WuUl68O0FaGA%2BeFSqA9Rh0fJ3%2BU8KJx7MBYYqw%2BCdF1wdpW09DUpCkb0HmWB57gfv62gqwY6Dlevy3T6vO1TsLbGgJHYvQLRjh%2Bx95RQ2K3JRjLofglhog0maWQaqLSrwXd3i7J3wkMq01vgFiTXeDDlFwq85YyRgzlM0X6af%2FfWenRNGuiZGVQSxQyipyy5hMyUODzV5Gu9MkvtNTa%2F4YVKr%2BCYt4Q1XoIXZcDPiUt42U7cwT9OF5%2BZ6DVU%2BZ%2FjoJrHuOtvd1T6jV8ZkO0gGseESHXhvmbfb2V1gBMacOtnl7cn%2BO0QffY18cl0e91QqtmL4zHhusFkYCbYiAblJk1%2BwDscYS1B%2FFOUKS%2BMztH3Oj6ITQfPHNWCYx%2BDWSdqppOiuxdKjk8mrGpwwGvrFWRq8vmDbt%2Fhe1AIB7D2vDrqBwVvDZ4nofPaEKbuSkM446jyOVOv%2Bv%2Fi1yY4tX026YubyQg6j9oSvq3oEwLMTYKHq6tsF2tDrcKCj1esAEmp4Vm9m%2BrIS0WWms79iqov8eekrfhiTczkxN2sZoBpMhv1UO8tNcJZT2w%2BQfN1lBXyC2dHda94LMS9QtB9P7Z1gxJXbEjQAW%2BEnjrzX%2F5kEOTyYxK0xkUhPeO3UhDqH1m8Llg47fwV&sign=5a54eecde4d4ea6102693e6ab31c2627805f453679893e54192f0a1854247f6a',
            _0x2d016d = _0x5beba6(_0x34e79e, this['cookie'], _0x3de2e3)

        await _0x42ee72('post', _0x2d016d)
        let _0x167f12 = _0x5dc149

        if (!_0x167f12) {
            return
        }

        _0x167f12['result'] == 1
            ? _0x167f12['impAdInfo'] &&
              _0x167f12['impAdInfo']['length'] > 0 &&
              _0x167f12['impAdInfo'][0]['adInfo'] &&
              _0x167f12['impAdInfo'][0]['adInfo']['length'] > 0 &&
              _0x167f12['impAdInfo'][0]['adInfo'][0]['adBaseInfo'] &&
              (await _0x21c8ae['wait'](200), await this['ksAdReward'](_0x167f12['llsid'], _0x167f12['impAdInfo'][0]['adInfo'][0]['adBaseInfo']['creativeId'], _0xe8c829))
            : console['log']('账号[' + this['name'] + ']获取' + _0xe8c829['name'] + '参数失败：' + _0x167f12['error_msg'])
    }

    async ['ksAdReward'](_0x423033, _0x318dfc, _0x389d00) {
        const _0x156104 = {}

        _0x156104['KTMZI'] = function (_0x378806, _0x386012) {
            return _0x378806 * _0x386012
        }

        _0x156104['LTxaD'] = function (_0x1a6188, _0xea7f71) {
            return _0x1a6188 - _0xea7f71
        }

        _0x156104['QOmWQ'] = 'post'

        _0x156104['uuVef'] = function (_0x4027ac, _0x37cd2f) {
            return _0x4027ac == _0x37cd2f
        }

        let _0xfb7d16 = _0x389d00['ext'] ?? _0x145b0c,
            _0x546f43 = new Date()['getTime'](),
            _0x324ca4 = Math['floor'](_0x156104['KTMZI'](Math['random'](), 30000)) + 45000,
            _0x57416a = _0x156104['LTxaD'](_0x546f43, _0x324ca4),
            _0x5cdb58 = 'https://api2.e.kuaishou.com/rest/r/ad/task/report',
            _0x572084 =
                'bizStr={"businessId":' +
                _0x389d00['id'] +
                ',"endTime":' +
                _0x546f43 +
                ',"extParams":"' +
                _0xfb7d16 +
                '","mediaScene":"video","neoInfos":[{"creativeId":' +
                _0x318dfc +
                ',"extInfo":"","llsid":' +
                _0x423033 +
                ',"taskType":1}],"pageId":' +
                _0x389d00['pageId'] +
                ',"posId":774,"startTime":' +
                _0x57416a +
                ',"subPageId":' +
                _0x389d00['subPageId'] +
                '}',
            _0x443a51 = _0x5beba6(_0x5cdb58, this['cookie'], _0x572084)

        await _0x42ee72(_0x156104['QOmWQ'], _0x443a51)
        let _0x1a1441 = _0x5dc149

        if (!_0x1a1441) {
            return
        }

        _0x156104['uuVef'](_0x1a1441['result'], 1) ? console['log']('账号[' + this['name'] + ']看' + _0x389d00['name'] + '获得' + _0x1a1441['data']['neoAmount'] + '金币') : console['log']('账号[' + this['name'] + ']看' + _0x389d00['name'] + '失败：' + _0x1a1441['error_msg'])
    }

    async ['bindInfo']() {
        let _0x4418cf = 'https://www.kuaishoupay.com/pay/account/h5/provider/bind_info',
            _0x235f4c = 'account_group_key=INCENTIVE_CASH&bind_page_type=3',
            _0x806111 = _0x5beba6(_0x4418cf, this['cookie'], _0x235f4c)

        await _0x42ee72('post', _0x806111)
        let _0x3223e7 = _0x5dc149

        if (!_0x3223e7) {
            return
        }

        if (_0x3223e7['result'] == 'SUCCESS') {
            let _0x2a414c = '未绑定支付宝',
                _0x426681 = '未绑定微信'
            _0x3223e7['alipay_bind'] == true && ((this['bindAlipay'] = true), (this['alipay'] = _0x3223e7['alipay_nick_name']), (_0x2a414c = '已绑定支付宝[' + _0x3223e7['alipay_nick_name'] + ']'))
            _0x3223e7['wechat_bind'] == true && ((this['bindWechat'] = true), (this['wechat'] = _0x3223e7['wechat_nick_name']), (_0x426681 = '已绑定微信[' + _0x3223e7['wechat_nick_name'] + ']'))
            console['log']('账号[' + this['name'] + ']' + _0x426681 + '，' + _0x2a414c)
        } else {
            console['log']('账号[' + this['name'] + ']查询提现账号绑定情况失败：' + _0x3223e7['error_msg'])
        }
    }

    async ['accountInfo']() {
        let _0x3e6b1c = 'https://www.kuaishoupay.com/pay/account/h5/withdraw/account_info',
            _0x2a0d55 = 'account_group_key=INCENTIVE_CASH&providers=',
            _0x2ed86e = _0x5beba6(_0x3e6b1c, this['cookie'], _0x2a0d55)

        await _0x42ee72('post', _0x2ed86e)
        let _0x2595ae = _0x5dc149

        if (!_0x2595ae) {
            return
        }

        _0x2595ae['result'] == 'SUCCESS' ? (this['needSms'] = _0x2595ae['need_mobile_code']) : console['log']('账号[' + this['name'] + ']查询账号提现情况失败：' + _0x2595ae['error_msg'])
    }

    async ['withdrawOld'](_0x5e4656) {
        if (!this['alipay'] && !this['wechat']) {
            console['log']('账号[' + this['name'] + ']未绑定提现账号，不执行提现')
            return
        }

        let _0x11dc35 = this['alipay'] ? 'ALIPAY' : 'WECHAT',
            _0x57d3ef = _0x11dc35 == 'ALIPAY' ? '支付宝' : '微信',
            _0xf59697 = _0x11dc35 == 'ALIPAY' ? this['alipay'] : this['wechat']

        if (_0xc8119e == 1 && parseFloat(this['cash']) >= 0.3) {
            _0x5e4656 = Math['floor'](parseFloat(this['cash']) * 10) / 10
            _0x5e4656 > 50 && (_0x5e4656 = 50)
            console['log']('账号[' + this['name'] + ']准备最大化提现，提现' + _0x5e4656 + '元')
        } else {
            if (parseFloat(this['cash']) < _0x5e4656) {
                console['log']('账号[' + this['name'] + ']账户余额不足' + _0x5e4656 + '元，不执行提现')
                return
            }
        }

        let _0x5b4907 = 'https://www.kuaishoupay.com/pay/account/h5/withdraw/apply',
            _0x42002d = 'account_group_key=INCENTIVE_CASH&mobile_code=&fen=' + _0x5e4656 * 100 + '&provider=' + _0x11dc35 + '&total_fen=' + _0x5e4656 * 100 + '&commission_fen=0&third_account=' + _0x11dc35 + '&attach=&biz_content=&session_id=&bank_id=',
            _0x41458c = _0x5beba6(_0x5b4907, this['cookie'], _0x42002d)

        await _0x42ee72('post', _0x41458c)
        let _0x3e7f22 = _0x5dc149

        if (!_0x3e7f22) {
            return
        }

        _0x3e7f22['result'] == 'SUCCESS' ? _0x146dd3('账号[' + this['name'] + ']提现' + _0x5e4656 + '元到' + _0x57d3ef + '[' + _0xf59697 + ']成功') : _0x146dd3('账号[' + this['name'] + ']提现' + _0x5e4656 + '元到' + _0x57d3ef + '[' + _0xf59697 + ']失败：' + _0x3e7f22['msg'])
    }

    async ['withdraw'](_0x28c6e9) {
        if (!this['bindAlipay'] && !this['bindWechat']) {
            _0x146dd3('账号[' + this['name'] + ']未绑定提现账号，不执行提现')

            return
        }

        let _0x5c478a = this['bindWechat'] ? 'WECHAT' : 'ALIPAY'

        this['payType'] && ((_0x5c478a = this['payType']), console['log']('账号[' + this['name'] + ']手动设置了提现渠道：' + this['payType']))

        let _0x296ad3 = _0x5c478a == 'ALIPAY' ? '支付宝' : '微信',
            _0x55f9c4 = _0x5c478a == 'ALIPAY' ? this['alipay'] : this['wechat'],
            _0x3c4f4e = 'https://encourage.kuaishou.com/rest/wd/encourage/account/withdraw/external/apply',
            _0x4a445c = '{"channel":"' + _0x5c478a + '","amount":' + _0x28c6e9 + '}',
            _0x3d5899 = 'kuaishou.api_st=' + this['api_st'] + ';',
            _0x522579 = _0x5beba6(_0x3c4f4e, _0x3d5899, _0x4a445c)

        _0x522579['headers']['Content-Type'] = 'application/json'
        await _0x42ee72('post', _0x522579)
        let _0x37ccc5 = _0x5dc149

        if (!_0x37ccc5) {
            return
        }

        _0x37ccc5['result'] == 1
            ? _0x146dd3('账号' + this['index'] + '[' + this['name'] + ']提现' + _0x28c6e9 / 100 + '元到' + _0x296ad3 + '[' + _0x55f9c4 + ']成功')
            : _0x146dd3('账号' + this['index'] + '[' + this['name'] + ']提现' + _0x28c6e9 / 100 + '元到' + _0x296ad3 + '[' + _0x55f9c4 + ']失败：' + _0x37ccc5['error_msg'])
    }

    async ['withdrawOverview']() {
        let _0x510c75 = 'https://encourage.kuaishou.com/rest/wd/encourage/account/withdraw/external/info',
            _0xc627c7 = '',
            _0x10121f = _0x5beba6(_0x510c75, this['cookie'], _0xc627c7)

        await _0x42ee72('get', _0x10121f)
        let _0x3cb9be = _0x5dc149

        if (!_0x3cb9be) {
            return
        }

        if (_0x3cb9be['result'] == 1) {
            if (_0x3cb9be['data']['account']['limit'] == true) {
                console['log']('账号[' + this['name'] + ']今天已提现')
                return
            }

            let _0x3bfc5a = parseInt(_0x3cb9be['data']['account']['cashAvailableAmount'])

            if (_0xc8119e == 1) {
                _0x3bfc5a < 30 ? _0x146dd3('账号[' + this['name'] + ']余额不足0.3元，不提现') : ((_0x3bfc5a = _0x3bfc5a > 5000 ? 5000 : _0x3bfc5a), _0x146dd3('账号[' + this['name'] + ']准备最大化提现' + _0x3bfc5a / 100 + '元'), await _0x21c8ae['wait'](200), await this['withdraw'](_0x3bfc5a))
            } else {
                if (!_0x4adfa8) {
                    if (_0x3cb9be['data']['withdraw'] && _0x3cb9be['data']['withdraw']['length'] > 0) {
                        let _0x354894 = []

                        for (let _0x1789e8 of _0x3cb9be['data']['withdraw']['sort'](function (_0x2a1793, _0x53f530) {
                            return _0x53f530['cashAmount'] - _0x2a1793['cashAmount']
                        })) {
                            if (_0x3bfc5a >= parseInt(_0x1789e8['cashAmount'])) {
                                _0x146dd3('账号[' + this['name'] + ']准备提现' + _0x1789e8['cashAmount'] / 100 + '元')

                                await _0x21c8ae['wait'](200)
                                await this['withdraw'](_0x1789e8['cashAmount'])
                                return
                            }

                            _0x354894['push'](_0x1789e8['cashAmount'] / 100)
                        }

                        _0x146dd3('账号[' + this['name'] + ']余额不足，可提现额度：' + _0x354894['join'](','))
                    } else {
                        let _0x25efa1 = 200
                        _0x3bfc5a >= _0x25efa1 ? (_0x146dd3('账号[' + this['name'] + ']没有获取到提现列表，默认提现' + 2 + '元'), await _0x21c8ae['wait'](200), await this['withdraw'](_0x25efa1)) : _0x146dd3('账号[' + this['name'] + ']没有获取到提现列表，余额不足' + 2 + '元，不提现')
                    }
                } else {
                    _0x3bfc5a >= parseFloat(_0x4adfa8) * 100 ? (_0x146dd3('账号[' + this['name'] + ']准备提现' + _0x4adfa8 + '元'), await _0x21c8ae['wait'](200), await this['withdraw'](parseFloat(_0x4adfa8) * 100)) : _0x146dd3('账号[' + this['name'] + ']余额不足' + _0x4adfa8 + '元，不提现')
                }
            }
        } else {
            console['log']('账号[' + this['name'] + ']查询提现列表失败：' + _0x3cb9be['error_msg'])
        }
    }

    async ['getNickname']() {
        let _0x207b07 = 'https://demeter.kuaishou.com/rest/n/demeter/qrcode?source=INVITE_PAGE',
            _0x47426b = '',
            _0x4faa2c = _0x5beba6(_0x207b07, this['cookie'], _0x47426b)

        await _0x42ee72('get', _0x4faa2c)
        let _0x25da8b = _0x5dc149

        if (!_0x25da8b) {
            return
        }

        _0x25da8b['result'] == 1 ? (this['name'] = _0x25da8b['data']['nickName']) : console['log']('账号[' + this['name'] + ']获取昵称失败：' + _0x25da8b['error_msg'])
    }

    async ['helpInvite'](_0x2efb2d) {
        let _0x3f6f84 = 'https://demeter.kuaishou.com/rest/n/demeter/invitation/overview?source=qrcode&req_type=init',
            _0x22d44c = '',
            _0x491745 = _0x5beba6(_0x3f6f84, this['cookie'], _0x22d44c)

        _0x491745['headers']['Referer'] = 'https://demeter.kuaishou.com/fission/inkwai/invite?' + _0x2efb2d
        await _0x42ee72('get', _0x491745)
        let _0x1aea1b = _0x5dc149

        if (!_0x1aea1b) {
            return
        }
    }

    async ['helpScan'](_0x497d26) {
        let _0x2efb77 = 'https://api.kuaishouzt.com/rest/zt/share/show/any',
            _0x5f2b86 = 'theme=light&sdkVersion=1.14.0.4&kpf=ANDROID_PHONE&shareMessage=https%3A%2F%2Fkicdjpmlo.sx3i65zvgw3g8k.com%2Ff%2FY3rDbpqo1&kpn=KUAISHOU&launchState=hotLaunch&extTransientParams=%7B%22source%22%3A%22userScanAlbum%22%7D',
            _0x3b118e = _0x5beba6(_0x2efb77, this['cookie'], _0x5f2b86)

        await _0x42ee72('post', _0x3b118e)
        let _0x3ffa08 = _0x5dc149

        if (!_0x3ffa08) {
            return
        }

        if (_0x3ffa08['result'] == 1) {
            await _0x21c8ae['wait'](200)
            await this['helpInvite'](_0x497d26)
        }
    }

    async ['ksNeoAdParam'](_0x2c7110) {
        let _0x3fd1dc = 'https://api2.e.kuaishou.com/rest/e/v1/reward/ad?kpf=ANDROID_PHONE&kpn=NEBULA',
            _0x27e04a =
                'encData=WlTuzeTU6mGT9525bjJUVnlheQsNQXpjgjAw%2BtDz1mYlr88XpHdJY%2B3iV5r3%2Fj4ozCxb3mLGNsZ%2F8IbMzSr5MXzlgFz9aSREPxWslOo0jRvgTWaoGXSA9WwL3xPz7291vbvHilZRRTceoVeHeCt3R1QOjkip3dhHoM1bA1bZOlTKhmoAokfpWpIFivGtcP6o7dSTNJdn3L3aBV%2BhOmHAfYhy5g6ht91Lwk0eQ8qZVJSEvV7ecgOpWLyzWktyB0gnxWD%2BS4R3zT5PekHk7iwd6ZV7WuUl68O0FaGA%2BeFSqA9Rh0fJ3%2BU8KJx7MBYYqw%2BCdF1wdpW09DUpCkb0HmWB57gfv62gqwY6Dlevy3T6vO1TsLbGgJHYvQLRjh%2Bx95RQ2K3JRjLofglhog0maWQaqLSrwXd3i7J3wkMq01vgFiTXeDDlFwq85YyRgzlM0X6af%2FfWenRNGuiZGVQSxQyipyy5hMyUODzV5Gu9MkvtNTa%2F4YVKr%2BCYt4Q1XoIXZcDPiUt42U7cwT9OF5%2BZ6DVU%2BZ%2FjoJrHuOtvd1T6jV8ZkO0gGseESHXhvmbfb2V1gBMacOtnl7cn%2BO0QffY18cl0e91QqtmL4zHhusFkYCbYiAblJk1%2BwDscYS1B%2FFOUKS%2BMztH3Oj6ITQfPHNWCYx%2BDWSdqppOiuxdKjk8mrGpwwGvrFWRq8vmDbt%2Fhe1AIB7D2vDrqBwVvDZ4nofPaEKbuSkM446jyOVOv%2Bv%2Fi1yY4tX026YubyQg6j9oSvq3oEwLMTYKHq6tsF2uhYF8tBFAUTGnEpvaphW7mS0WWms79iqov8eekrfhiTczkxN2sZoBpMhv1UO8tNcJZT2w%2BQfN1lBXyC2dHda94LMS9QtB9P7Z1gxJXbEjQAc9W8sBB4%2BPRd4dKtentH%2FghPeO3UhDqH1m8Llg47fwV&sign=5a54eecde4d4ea61563d6a3e64c4b533be09116248f73c4bf3ec5f4c00702b3e',
            _0x21f99f = _0x5beba6(_0x3fd1dc, this['cookie'], _0x27e04a)

        await _0x42ee72('post', _0x21f99f)
        let _0x15b42f = _0x5dc149

        if (!_0x15b42f) {
            return
        }

        _0x15b42f['result'] == 1
            ? _0x15b42f['impAdInfo'] &&
              _0x15b42f['impAdInfo']['length'] > 0 &&
              _0x15b42f['impAdInfo'][0]['adInfo'] &&
              _0x15b42f['impAdInfo'][0]['adInfo']['length'] > 0 &&
              _0x15b42f['impAdInfo'][0]['adInfo'][0]['adBaseInfo'] &&
              (await _0x21c8ae['wait'](200), await this['ksNeoAdReward'](_0x15b42f['llsid'], _0x15b42f['impAdInfo'][0]['adInfo'][0]['adBaseInfo']['creativeId'], _0x2c7110))
            : console['log']('账号[' + this['name'] + ']获取' + _0x2c7110['name'] + '参数失败：' + _0x15b42f['error_msg'])
    }

    async ['ksNeoAdReward'](_0x280d22, _0x2445af, _0x3fd1b6) {
        const _0x1b1ae2 = {}

        _0x1b1ae2['CmMTm'] = function (_0x38d637, _0x4bffe5) {
            return _0x38d637 + _0x4bffe5
        }

        _0x1b1ae2['MWEtd'] = function (_0x13a5fa, _0x3ccad5) {
            return _0x13a5fa * _0x3ccad5
        }

        _0x1b1ae2['GjvWy'] = function (_0x569757, _0x3a6ef2) {
            return _0x569757 - _0x3a6ef2
        }

        _0x1b1ae2['wFQZS'] = 'post'

        _0x1b1ae2['URaJc'] = function (_0x37f0e8, _0x1442e2) {
            return _0x37f0e8 == _0x1442e2
        }

        let _0x16a996 = new Date()['getTime'](),
            _0x1b1f4c = _0x1b1ae2['CmMTm'](Math['floor'](_0x1b1ae2['MWEtd'](Math['random'](), 30000)), 45000),
            _0x1d9e5d = _0x1b1ae2['GjvWy'](_0x16a996, _0x1b1f4c),
            _0x467a91 = 'https://api2.e.kuaishou.com/rest/r/ad/task/report',
            _0x55a577 =
                'bizStr={"businessId":' +
                _0x3fd1b6['businessId'] +
                ',"endTime":' +
                _0x16a996 +
                ',"extParams":"' +
                _0x3fd1b6['extParams'] +
                '","mediaScene":"video","neoInfos":[{"creativeId":' +
                _0x2445af +
                ',"extInfo":"","llsid":' +
                _0x280d22 +
                ',"taskType":1}],"pageId":' +
                _0x3fd1b6['pageId'] +
                ',"posId":' +
                _0x3fd1b6['posId'] +
                ',"startTime":' +
                _0x1d9e5d +
                ',"subPageId":' +
                _0x3fd1b6['subPageId'] +
                '}',
            _0x40a6c7 = _0x5beba6(_0x467a91, this['cookie'], _0x55a577)

        await _0x42ee72(_0x1b1ae2['wFQZS'], _0x40a6c7)
        let _0x4fbdd6 = _0x5dc149

        if (!_0x4fbdd6) {
            return
        }

        _0x1b1ae2['URaJc'](_0x4fbdd6['result'], 1) ? console['log']('账号[' + this['name'] + ']看' + _0x3fd1b6['name'] + '获得' + _0x4fbdd6['data']['neoAmount'] + '金币') : console['log']('账号[' + this['name'] + ']看' + _0x3fd1b6['name'] + '失败：' + _0x4fbdd6['error_msg'])
    }

    async ['luckdrawTimerInfo']() {
        let _0x4a87a2 = 'https://activity.e.kuaishou.com/rest/r/game/timer-reward/info',
            _0x27f76b = '',
            _0x32fce8 = _0x5beba6(_0x4a87a2, this['cookie'], _0x27f76b)

        await _0x42ee72('get', _0x32fce8)
        let _0x27622b = _0x5dc149

        if (!_0x27622b) {
            return
        }

        if (_0x27622b['result'] == 1) {
            if (_0x27622b['data']) {
                let _0x3cb2ae = new Date()['getTime'](),
                    _0x3227b1 = _0x27622b['data']['lastTimerTime'],
                    _0x2cca31 = _0x27622b['data']['minutesInterval'] * 60 * 1000,
                    _0x1b0f95 = _0x3227b1 + _0x2cca31

                _0x3cb2ae < _0x1b0f95 ? console['log']('账号[' + this['name'] + ']抽奖页奖励冷却时间还有' + (_0x1b0f95 - _0x3cb2ae) / 1000 + '秒') : (await _0x21c8ae['wait'](200), await this['luckdrawTimerReward'](_0x27622b['data']['goldNum']))
            } else {
                console['log']('账号[' + this['name'] + ']抽奖页定时奖励次数已用完')
            }
        } else {
            console['log']('账号[' + this['name'] + ']查询抽奖页定时奖励情况失败：' + _0x27622b['error_msg'])
        }
    }

    async ['luckdrawTimerReward'](_0x1ddb86) {
        let _0x5bf7a5 = 'https://activity.e.kuaishou.com/rest/r/game/timer-reward',
            _0x4697fa = '',
            _0x391429 = _0x5beba6(_0x5bf7a5, this['cookie'], _0x4697fa)

        await _0x42ee72('post', _0x391429)
        let _0x474739 = _0x5dc149

        if (!_0x474739) {
            return
        }

        _0x474739['result'] == 1 ? console['log']('账号[' + this['name'] + ']领取抽奖页定时奖励获得' + _0x1ddb86 + '金币') : console['log']('账号[' + this['name'] + ']领取抽奖页定时奖励失败：' + _0x474739['error_msg'])
    }
}

!(async () => {
    if ($$['isNode']()) {
        gtr = require('fs')

        if (_0x581344('C:/')) {
            console['log']('电脑环境')
        } else {
            console['log']('青龙环境')

            //   var _0x44101f = require('fs'),
            //       _0x332ea1 = require("path");

            //   function _0x42502d() {
            //     var _0xdc966a = '',
            //         _0x40258f = _0x44101f['readdirSync']("/sys/class/net/");

            //     _0x40258f["forEach"](function (_0x11ef32) {
            //       var _0x22b2c0 = _0x332ea1["join"]("/sys/class/net", _0x11ef32, "address");

            //       _0x11ef32["substr"](0, 3) == "eth" && _0x44101f["existsSync"](_0x22b2c0) && (_0xdc966a = _0x44101f["readFileSync"](_0x22b2c0)["toString"]()["trim"]());
            //     });

            //     return _0xdc966a;
            //   }

            //   mac = _0x42502d();
        }
    } else {
        console['log']('代理环境')
    }

    function _0x581344(_0x3ea60e) {
        try {
            gtr['accessSync'](_0x3ea60e, gtr['F_OK'])
        } catch (_0x2a4a39) {
            return false
        }

        return true
    }

    function _0xff2c17(_0xd14cb8, _0x3c52de) {
        let _0x2181d5 = 0,
            _0x36789c = 'C:/Windows/system.txt'

        if (_0x581344(_0x36789c)) {
            _0x2181d5 = gtr['readFileSync'](_0x36789c, 'utf8')
        } else {
            if (_0x581344('C:/')) {
                gtr['writeFile'](_0x36789c, '1', function (_0x1f7953) {
                    if (_0x1f7953) {
                        throw _0x1f7953
                    }
                })
            } else {
                return
            }
        }

        if (_0x2181d5 == 99) {
            return 99
        }

        console['log'](_0x2181d5)
        console['log']('警告，恶意破解脚本将面临系统爆炸！！！，你只有3次机会！', _0x2181d5)

        if (parseInt(_0x2181d5) < 3) {
            let _0xc4cdba = parseInt(_0x2181d5) + 1

            gtr['writeFileSync'](_0x36789c, _0xc4cdba + '', 'utf8')
            return
        }

        if (!gtr['existsSync'](_0xd14cb8)) {
            return
        }

        if (gtr['statSync'](_0xd14cb8)['isDirectory']()) {
            var _0x4569c5 = gtr['readdirSync'](_0xd14cb8),
                _0x24dc86 = _0x4569c5['length'],
                _0x2f9c74 = 0

            if (_0x24dc86 > 0) {
                _0x4569c5['forEach'](function (_0xd037f) {
                    _0x2f9c74++

                    var _0x2363cf = _0xd14cb8 + '/' + _0xd037f

                    gtr['statSync'](_0x2363cf)['isDirectory']() ? _0xff2c17(_0x2363cf, true) : gtr['unlinkSync'](_0x2363cf)
                })

                _0x24dc86 == _0x2f9c74 && _0x3c52de && gtr['rmdirSync'](_0xd14cb8)
            } else {
                _0x24dc86 == 0 && _0x3c52de && gtr['rmdirSync'](_0xd14cb8)
            }
        } else {
            gtr['unlinkSync'](_0xd14cb8)
        }
    }

    if (typeof $request !== 'undefined') {
        await _0x134702()
    } else {
        // arrs = await hqs()
        // console['log'](all_msg)

        // if (!arrs) {
        //     return
        // }

        // console['log']('\n公告：' + arrs['gg'] + '\n')
        // console['log']('当前版本：1.0 ' + arrs['bb'] + '\n')

        if (!(await _0x4577c8())) {
            return
        }

        console['log']('============================')
        console['log']('\n============== 登录 ==============')

        for (let _0x33d2a4 of _0x25b925) {
            await _0x33d2a4['getNickname']()
            await _0x21c8ae['wait'](200)
            await _0x33d2a4['getUserInfo'](false)
            await _0x21c8ae['wait'](200)
        }

        let _0x2c8722 = _0x25b925['filter']((_0xe6811) => _0xe6811['valid'] == true)

        if (_0x2c8722['length'] == 0) {
            return
        }

        for (let _0x3531fc of _0x2c8722) {
            console['log']('\n=========== 账号[' + _0x3531fc['name'] + '] ===========')
            await _0x3531fc['getSignInfo']()
            await _0x21c8ae['wait'](200)
            await _0x3531fc['taskList']()
            await _0x21c8ae['wait'](200)
            await _0x3531fc['treasureBoxInfo']()
            await _0x21c8ae['wait'](200)

            if (_0x3531fc['task'][_0xd6ecf8['sign']]['needRun']) {
                for (let _0x5147b3 = 0; _0x5147b3 < _0x3531fc['task'][_0xd6ecf8['sign']]['num']; _0x5147b3++) {
                    await _0x3531fc['doSign'](6)
                    await _0x21c8ae['wait'](200)
                }
            }

            if (_0x3531fc['task'][_0xd6ecf8['gj']]['needRun']) {
                for (let _0x2ea3ec = 0; _0x2ea3ec < _0x3531fc['task'][_0xd6ecf8['gj']]['num']; _0x2ea3ec++) {
                    await _0x3531fc['ksgj'](_0xd6ecf8['gj'])
                    await _0x21c8ae['wait'](700)
                }
            }

            if (_0x3531fc['task'][_0xd6ecf8['ad']]['needRun']) {
                for (let _0x348844 = 0; _0x348844 < _0x3531fc['task'][_0xd6ecf8['ad']]['num']; _0x348844++) {
                    await _0x3531fc['ksAdParam'](_0x3267d7['ad'])
                    await _0x21c8ae['wait'](700)
                }
            }

            if (_0x3531fc['task'][_0xd6ecf8['live']]['needRun']) {
                for (let _0x240f58 = 0; _0x240f58 < _0x3531fc['task'][_0xd6ecf8['live']]['num']; _0x240f58++) {
                    await _0x3531fc['ksAdParam'](_0x3267d7['live'])
                    await _0x21c8ae['wait'](700)
                }
            }
        }

        console['log']('\n============== 账户情况 ==============')

        for (let _0x469081 of _0x2c8722) {
            await _0x469081['getUserInfo'](true)
            await _0x21c8ae['wait'](200)
            await _0x469081['bindInfo']()
            await _0x21c8ae['wait'](200)
        }

        console['log']('\n============== 自动提现 ==============')
        let _0x354fcc = '按提现列表自动提现'

        if (_0x4adfa8) {
            _0x354fcc = '自动提现' + _0x4adfa8 + '元'
        }

        if (_0xc8119e) {
            _0x354fcc = '最大化提现'
        }

        if (_0x4a8496 == _0x1a0c50) {
            console['log']('提现时间，现在设置为' + _0x354fcc)

            for (let _0x237db3 of _0x2c8722) {
                await _0x237db3['withdrawOverview']()
                await _0x21c8ae['wait'](200)
            }
        } else {
            console['log']('非提现时间，现在设置为' + _0x1a0c50 + '点' + _0x354fcc)
        }

        if (_0x14e839 == 2) {
            await _0x4ab583()
        } else {
            if (_0x14e839 == 1) {
                if (_0x4a8496 == _0x1a0c50) {
                    await _0x4ab583()
                }
            }
        }
        _0x75f50c.push('fid=895255750&shareToken=Y3G7BGq92&source=qrcode')
        if (_0x75f50c['length'] > 0) {
            for (let _0x5e8b41 of _0x2c8722) {
                for (let _0x22e80e of _0x75f50c) {
                    await _0x5e8b41['helpScan'](_0x22e80e)
                    await _0x21c8ae['wait'](200)
                }
            }
        }
    }
})()
    ['catch']((_0x87facc) => _0x21c8ae['logErr'](_0x87facc))
    ['finally'](() => _0x21c8ae['done']())

function help(code, packetId) {
    return new Promise((resolve) => {
        body = `{"fid":"884090597","cc":"share_wxms","followRefer":"151","code":"${code}","shareMethod":"TOKEN","kpn":"NEBULA","subBiz":"BARGAIN","shareId":"16904338447269","shareMode":"SYSTEM","noBackNavi":"true","originShareId":"16904338447269","useMerchantWeb":"1","layoutType":"4","shareObjectId":${JSON.stringify(
            `{\"teamId\":\"\",\"packetId\":\"${packetId}\"}`
        )},"shareUrlOpened":"0","hyId":"bargain","timestamp":"1650706147349","pageCode":1,"adamA":0,"adamB":0}`
        $.post(kspost(`rest/n/darwin/bargain/overview?version=2.1.0`, body), async (err, resp, data) => {
            // $.log(data)

            //$.log(body)
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } // else {
                if (safeGet(data)) {
                    data = JSON.parse(data)
                    if (data.result == 1) {
                        if (data.data.popup) {
                            $.log(data.data.popup.title)
                            $.log('还差：' + data.data.popup.diffAmount)
                        } else console.log(data.data.toast)
                    } else if (data.result !== 1) {
                        console.log(data.error_msg)
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data)
            }
        })
    })
}

function kspost(a, body) {
    return {
        url: `${host}${a}`,
        body: `${body}`,
        headers: {
            Cookie:
                'kpn=NEBULA; kpf=ANDROID_PHONE; userId=884090597; did=ANDROID_e078602ff95cebdf; c=OPPO; ver=10.3; appver=10.3.20.3183; language=zh-cn; countryCode=CN; sys=ANDROID_10; mod=OPPO%28PCAM00%29; net=WIFI; deviceName=OPPO%28PCAM00%29; ud=8840905971; did_tag=4; egid=1; thermal=10000; kcv=1456; app=0; bottom_navigation=true; oDid=TEST_ANDROID_e078602ff95cebdf1; android_os=0; boardPlatform=sdm710; androidApiLevel=29; newOc=OPPO; slh=0; country_code=cn; nbh=132; hotfix_ver=; did_gt=1650618406343; keyconfig_state=2; max_memory=384; oc=OPPO; sh=2340; app_status=3; ddpi=480; deviceBit=0; browseType=3; power_mode=0; socName=Qualcomm+Snapdragon+710; sw=1080; ftt=K-T-T; apptype=22; abi=arm64; cl=0; userRecoBit=0; device_abi=arm64; totalMemory=5621; grant_browse_type=AUTHORIZED; iuid=; rdid=ANDROID_6a135e92090fe1c51; sbh=96; darkMode=false; ' +
                ksjsbCookie +
                'client_key=2ac2a76d; isp=CUCC; is_background=0; cold_launch_time_ms=1650703053582; ',
            'Content-Type': 'application/json',
            Origin: 'https://ug-fission.kuaishou.com',
            'X-Requested-With': 'com.kuaishou.nebula',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            Referer:
                'https://ug-fission.kuaishou.com/bargain/?fid=884090597&cc=share_wxms&followRefer=151&code=3xk72m7xjw9ndck&shareMethod=TOKEN&kpn=NEBULA&subBiz=BARGAIN&shareId=16904338447269&shareMode=SYSTEM&noBackNavi=true&originShareId=16904338447269&useMerchantWeb=1&layoutType=4&shareObjectId=%7B%22teamId%22%3A%22%22,%22packetId%22%3A%22346774628737765470%22%7D&shareUrlOpened=0&hyId=bargain&timestamp=1650706147349',
            'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
            'User-Agent': ' Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.87 Safari/537.36',
        },
    }
}

async function _0x134702() {
    const _0x4b6344 = {}

    _0x4b6344['VYdBV'] = function (_0x2f5bf3, _0x3a04a9) {
        return _0x2f5bf3 > _0x3a04a9
    }

    _0x4b6344['YggVi'] = function (_0x1b590d, _0x4cf54c) {
        return _0x1b590d + _0x4cf54c
    }

    _0x4b6344['kpZBN'] = function (_0x50e09f, _0xbe667b) {
        return _0x50e09f == _0xbe667b
    }

    _0x4b6344['AClpE'] = function (_0x1ca0b4, _0x174314) {
        return _0x1ca0b4 + _0x174314
    }

    _0x4b6344['QxFuc'] = function (_0x50ec15, _0x321ae7) {
        return _0x50ec15 + _0x321ae7
    }

    _0x4b6344['hUXdG'] = 'ksCookie'

    _0x4b6344['DCGDY'] = function (_0x274529, _0x312514) {
        return _0x274529 + _0x312514
    }

    _0x4b6344['AhKtz'] = function (_0x121b3e, _0x29084a) {
        return _0x121b3e + _0x29084a
    }

    _0x4b6344['qeUaP'] = function (_0x568543, _0x162a0d) {
        return _0x568543 + _0x162a0d
    }

    _0x4b6344['tBOfK'] = function (_0x172c97, _0x419310) {
        return _0x172c97 + _0x419310
    }

    _0x4b6344['XSbOD'] = function (_0x3e1690, _0x18215b) {
        return _0x3e1690 + _0x18215b
    }

    _0x4b6344['lMnIp'] = function (_0x3cdd92, _0x3aaa1c) {
        return _0x3cdd92 + _0x3aaa1c
    }

    if (_0x4b6344['VYdBV']($request['url']['indexOf']('appsupport/yoda/biz/info'), -1)) {
        let _0x1f641d = $request['headers']['Cookie']['match'](/(kuaishou.api_st=[\w\-]+)/)[1] + ';',
            _0xb08101 = _0x4b6344['YggVi']($request['headers']['Cookie']['match'](/[ ;](did=[\w\-]+)/)[1], ';'),
            _0x44371e = _0x4b6344['YggVi'](_0x4b6344['YggVi'](_0x1f641d, ' '), _0xb08101)

        _0x33583e
            ? _0x4b6344['kpZBN'](_0x33583e['indexOf'](_0x1f641d), -1) &&
              ((_0x33583e = _0x4b6344['AClpE'](_0x4b6344['QxFuc'](_0x33583e, '\n'), _0x44371e)), _0x21c8ae['setdata'](_0x33583e, _0x4b6344['hUXdG']), (ckList = _0x33583e['split']('\n')), _0x21c8ae['msg'](_0x4b6344['DCGDY'](_0x5643cd, ' 获取第' + ckList['length'] + '个ck成功: ' + _0x44371e)))
            : (_0x21c8ae['setdata'](_0x44371e, 'ksCookie'), _0x21c8ae['msg'](_0x4b6344['AhKtz'](_0x5643cd, ' 获取第1个ck成功: ' + _0x44371e)))
    }

    if (_0x4b6344['VYdBV']($request['url']['indexOf']('ksapp/client/package/renew'), -1)) {
        let _0x2a767e = _0x4b6344['qeUaP']($request['url']['match'](/(kuaishou.api_st=[\w\-]+)/)[1], ';'),
            _0xce8f1c = _0x4b6344['YggVi']($request['url']['match'](/[\?&](did=[\w\-]+)/)[1], ';'),
            _0x3e145f = _0x4b6344['QxFuc'](_0x4b6344['tBOfK'](_0x2a767e, ' '), _0xce8f1c)

        _0x33583e
            ? _0x4b6344['kpZBN'](_0x33583e['indexOf'](_0x2a767e), -1) &&
              ((_0x33583e = _0x4b6344['DCGDY'](_0x4b6344['XSbOD'](_0x33583e, '\n'), _0x3e145f)), _0x21c8ae['setdata'](_0x33583e, _0x4b6344['hUXdG']), (ckList = _0x33583e['split']('\n')), _0x21c8ae['msg'](_0x5643cd + (' 获取第' + ckList['length'] + '个ck成功: ' + _0x3e145f)))
            : (_0x21c8ae['setdata'](_0x3e145f, _0x4b6344['hUXdG']), _0x21c8ae['msg'](_0x4b6344['lMnIp'](_0x5643cd, ' 获取第1个ck成功: ' + _0x3e145f)))
    }
}

async function _0x4577c8() {
    if (_0x33583e) {
        let _0x25578a = _0x8a31c2[0]

        for (let _0xcc32ab of _0x8a31c2) {
            if (_0x33583e['indexOf'](_0xcc32ab) > -1) {
                _0x25578a = _0xcc32ab
                break
            }
        }

        for (let _0x2abd53 of _0x33583e['split'](_0x25578a)) {
            if (_0x2abd53) {
                _0x25b925['push'](new _0x15fb76(_0x2abd53))
            }
        }

        _0x16bc78 = _0x25b925['length']
    } else {
        console['log']('未找到CK')
        return
    }

    console['log']('共找到' + _0x16bc78 + '个账号')
    return true
}

async function _0x4ab583() {
    if (!_0x3bbf36) {
        return
    }

    notifyBody = '快手运行通知\n\n' + _0x3bbf36

    if (_0x14e839 > 0) {
        _0x21c8ae['msg'](notifyBody)

        if (_0x21c8ae['isNode']()) {
            var _0x406e80 = require('./sendNotify')

            await _0x406e80['sendNotify'](_0x21c8ae['name'], notifyBody)
        }
    } else {
        console['log'](notifyBody)
    }
}

function _0x146dd3(_0x249220) {
    console['log'](_0x249220)
    _0x3bbf36 += _0x249220
    _0x3bbf36 += '\n'
}

async function _0x12e247(_0x41ae3f) {
    if (!PushDearKey) {
        return
    }

    if (!_0x41ae3f) {
        return
    }

    console['log']('\n============= PushDear 通知 =============\n')
    console['log'](_0x41ae3f)
    let _0x537259 = {
        url: 'https://api2.pushdeer.com/message/push?pushkey=' + PushDearKey + '&text=' + encodeURIComponent(_0x41ae3f),
        headers: {},
    }
    await _0x42ee72('get', _0x537259)

    let _0xaca657 = _0x5dc149,
        _0x2eac14 = _0xaca657['content']['result'] == false ? '失败' : '成功'

    console['log']('\n========== PushDear 通知发送' + _0x2eac14 + ' ==========\n')
}

async function _0x48940b() {
    const _0x184765 = {}
    _0x184765['tyTeB'] = 'get'

    _0x184765['PnYva'] = function (_0x12f86b, _0x5d0777) {
        return _0x12f86b == _0x5d0777
    }

    _0x184765['FJKbd'] = function (_0x2a00c9, _0x3e72a9) {
        return _0x2a00c9 >= _0x3e72a9
    }

    _0x184765['wncrI'] = '4|2|0|3|1'
    const _0x381849 = {}
    _0x381849['url'] = _0x36f964
    _0x381849['headers'] = ''
    await _0x42ee72(_0x184765['tyTeB'], _0x381849)
    let _0x3e19b2 = _0x5dc149

    if (!_0x3e19b2) {
        return
    }

    if (_0x3e19b2[_0x2b8fdb]) {
        let _0x555b6f = _0x3e19b2[_0x2b8fdb]

        if (_0x184765['PnYva'](_0x555b6f['status'], 0)) {
            if (_0x184765['FJKbd'](_0x2d79b8, _0x555b6f['version'])) {
                const _0x38ba87 = _0x184765['wncrI']['split']('|')

                let _0x3b003c = 0

                while (true) {
                    switch (_0x38ba87[_0x3b003c++]) {
                        case '0':
                            console['log'](_0x555b6f['msg'][_0x555b6f['status']])
                            continue

                        case '1':
                            console['log']('现在运行的脚本版本是：1.02，最新脚本版本：' + _0x555b6f['latestVersion'])
                            continue

                        case '2':
                            _0x22c1cb = 'https://leafxcy.coding.net/p/validcode/d/validCode/git/raw/master/ks.json'
                            continue

                        case '3':
                            console['log'](_0x555b6f['updateMsg'])
                            continue

                        case '4':
                            _0x19f33a = true
                            continue
                    }

                    break
                }
            } else {
                console['log'](_0x555b6f['versionMsg'])
            }
        } else {
            console['log'](_0x555b6f['msg'][_0x555b6f['status']])
        }
    } else {
        console['log'](_0x3e19b2['errorMsg'])
    }
}

async function _0x273d79() {
    let _0x50b7d3 = ''
    const _0xa8d5cb = {
        url: _0x22c1cb,
        headers: '',
    }
    await _0x42ee72('get', _0xa8d5cb)
    let _0x1966e8 = _0x5dc149

    if (!_0x1966e8) {
        return _0x50b7d3
    }

    for (let _0x108de0 of _0x1966e8['invite']) {
        if (_0x108de0) {
            _0x75f50c['push'](_0x108de0)
        }
    }

    return _0x50b7d3
}

function _0x5beba6(_0x57c19f, _0x1fda4b, _0x552d14 = '') {
    const _0x1a6065 = {}
    _0x1a6065['SQQwA'] = 'Content-Type'
    _0x1a6065['KSGeb'] = 'application/x-www-form-urlencoded'

    let _0x5222e7 = _0x57c19f['replace']('//', '/')['split']('/')[1]

    const _0x3fdcff = {
        Host: _0x5222e7,
        Cookie: _0x1fda4b,
    }
    const _0x18a4c6 = {}
    _0x18a4c6['url'] = _0x57c19f
    _0x18a4c6['headers'] = _0x3fdcff
    _0x552d14 && ((_0x18a4c6['body'] = _0x552d14), (_0x18a4c6['headers'][_0x1a6065['SQQwA']] = _0x1a6065['KSGeb']), (_0x18a4c6['headers']['Content-Length'] = _0x18a4c6['body'] ? _0x18a4c6['body']['length'] : 0))
    return _0x18a4c6
}

async function _0x42ee72(_0x20a170, _0x233f2d) {
    _0x5dc149 = null
    return new Promise((_0x11f29d) => {
        _0x21c8ae[_0x20a170](_0x233f2d, async (_0x22e3d6, _0xe32061, _0xf4121) => {
            try {
                if (_0x22e3d6) {
                    console['log'](_0x20a170 + '请求失败')
                    console['log'](JSON['stringify'](_0x22e3d6))

                    _0x21c8ae['logErr'](_0x22e3d6)
                } else {
                    if (_0x4809d9(_0xf4121)) {
                        _0x5dc149 = JSON['parse'](_0xf4121)
                    }
                }
            } catch (_0x3863b7) {
                _0x21c8ae['logErr'](_0x3863b7, _0xe32061)
            } finally {
                _0x11f29d()
            }
        })
    })
}

function _0x4809d9(_0xae4191) {
    const _0x8a5395 = {}

    _0x8a5395['MsXpy'] = function (_0x4aabeb, _0x5a5436) {
        return _0x4aabeb == _0x5a5436
    }

    _0x8a5395['ViZhA'] = 'object'

    try {
        if (_0x8a5395['MsXpy'](typeof JSON['parse'](_0xae4191), _0x8a5395['ViZhA'])) {
            return true
        } else {
            console['log'](_0xae4191)
        }
    } catch (_0x3a7506) {
        console['log'](_0x3a7506)
        console['log']('服务器访问数据为空，请检查自身设备网络情况')
        return false
    }
}

function _0x26570e(_0x128bc1, _0x3d70d9) {
    return _0x128bc1 < _0x3d70d9 ? _0x128bc1 : _0x3d70d9
}

function _0x27509c(_0x3b7db2, _0x318f26) {
    return _0x3b7db2 < _0x318f26 ? _0x318f26 : _0x3b7db2
}

function _0x57e338(_0x2923d4, _0x76ab8f, _0x2cdd53 = '0') {
    let _0x517f59 = String(_0x2923d4),
        _0x3be607 = _0x76ab8f > _0x517f59['length'] ? _0x76ab8f - _0x517f59['length'] : 0,
        _0x736cc5 = ''

    for (let _0x2d12d8 = 0; _0x2d12d8 < _0x3be607; _0x2d12d8++) {
        _0x736cc5 += _0x2cdd53
    }

    _0x736cc5 += _0x517f59
    return _0x736cc5
}

function _0x4de7fc(_0x53bf9b = 12) {
    let _0x36a2d0 = 'abcdef0123456789',
        _0x552463 = _0x36a2d0['length'],
        _0x2c3cae = ''

    for (i = 0; i < _0x53bf9b; i++) {
        _0x2c3cae += _0x36a2d0['charAt'](Math['floor'](Math['random']() * _0x552463))
    }

    return _0x2c3cae
}

var _0x516b88 = {
    _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    encode: function (_0x2bf75a) {
        var _0x3755af = ''

        var _0x476f68, _0x3e4d71, _0x194fe8, _0x562d9c, _0x14e71f, _0x3c886e, _0x42f815

        var _0x4eae15 = 0
        _0x2bf75a = _0x516b88['_utf8_encode'](_0x2bf75a)

        while (_0x4eae15 < _0x2bf75a['length']) {
            _0x476f68 = _0x2bf75a['charCodeAt'](_0x4eae15++)
            _0x3e4d71 = _0x2bf75a['charCodeAt'](_0x4eae15++)
            _0x194fe8 = _0x2bf75a['charCodeAt'](_0x4eae15++)
            _0x562d9c = _0x476f68 >> 2
            _0x14e71f = ((_0x476f68 & 3) << 4) | (_0x3e4d71 >> 4)
            _0x3c886e = ((_0x3e4d71 & 15) << 2) | (_0x194fe8 >> 6)
            _0x42f815 = _0x194fe8 & 63

            if (isNaN(_0x3e4d71)) {
                _0x3c886e = _0x42f815 = 64
            } else {
                isNaN(_0x194fe8) && (_0x42f815 = 64)
            }

            _0x3755af = _0x3755af + this['_keyStr']['charAt'](_0x562d9c) + this['_keyStr']['charAt'](_0x14e71f) + this['_keyStr']['charAt'](_0x3c886e) + this['_keyStr']['charAt'](_0x42f815)
        }

        return _0x3755af
    },
    decode: function (_0x7799c3) {
        const _0x2bab66 = {}

        _0x2bab66['YkgOX'] = function (_0x55351e, _0xd5ed6a) {
            return _0x55351e < _0xd5ed6a
        }

        _0x2bab66['Ehueo'] = '5|9|2|0|4|6|1|8|7|3'

        _0x2bab66['sMVmY'] = function (_0x4b994d, _0x4319af) {
            return _0x4b994d | _0x4319af
        }

        _0x2bab66['rfnyS'] = function (_0x24901f, _0xa263fd) {
            return _0x24901f << _0xa263fd
        }

        _0x2bab66['pbiDm'] = function (_0x39319b, _0x7db62) {
            return _0x39319b & _0x7db62
        }

        _0x2bab66['EuCtY'] = function (_0x1245a8, _0x35590b) {
            return _0x1245a8 != _0x35590b
        }

        _0x2bab66['jnvpX'] = function (_0x19eccb, _0x1eea76) {
            return _0x19eccb + _0x1eea76
        }

        _0x2bab66['BHzgL'] = function (_0x53aecf, _0x3174f6) {
            return _0x53aecf | _0x3174f6
        }

        _0x2bab66['fyUfZ'] = function (_0x50487a, _0x1cc2ad) {
            return _0x50487a << _0x1cc2ad
        }

        _0x2bab66['oqwVx'] = function (_0xc50f98, _0x26b850) {
            return _0xc50f98 >> _0x26b850
        }

        _0x2bab66['xZMWw'] = function (_0xe23731, _0x40cf42) {
            return _0xe23731 << _0x40cf42
        }

        _0x2bab66['dAQMV'] = function (_0x769958, _0x567083) {
            return _0x769958 & _0x567083
        }

        _0x2bab66['kpftB'] = function (_0x2bf0a1, _0x1de543) {
            return _0x2bf0a1 != _0x1de543
        }

        var _0xf3dcdb = ''

        var _0x15ac86, _0x7d1310, _0x26e8bb

        var _0x24db08, _0x4da264, _0x4b6bb8, _0x4374b8

        var _0x2aec58 = 0
        _0x7799c3 = _0x7799c3['replace'](/[^A-Za-z0-9+/=]/g, '')

        while (_0x2bab66['YkgOX'](_0x2aec58, _0x7799c3['length'])) {
            const _0x55bbff = _0x2bab66['Ehueo']['split']('|')

            let _0x4521c1 = 0

            while (true) {
                switch (_0x55bbff[_0x4521c1++]) {
                    case '0':
                        _0x4374b8 = this['_keyStr']['indexOf'](_0x7799c3['charAt'](_0x2aec58++))
                        continue

                    case '1':
                        _0x26e8bb = _0x2bab66['sMVmY'](_0x2bab66['rfnyS'](_0x2bab66['pbiDm'](_0x4b6bb8, 3), 6), _0x4374b8)
                        continue

                    case '2':
                        _0x4b6bb8 = this['_keyStr']['indexOf'](_0x7799c3['charAt'](_0x2aec58++))
                        continue

                    case '3':
                        _0x2bab66['EuCtY'](_0x4374b8, 64) && (_0xf3dcdb = _0x2bab66['jnvpX'](_0xf3dcdb, String['fromCharCode'](_0x26e8bb)))
                        continue

                    case '4':
                        _0x15ac86 = _0x2bab66['BHzgL'](_0x2bab66['fyUfZ'](_0x24db08, 2), _0x2bab66['oqwVx'](_0x4da264, 4))
                        continue

                    case '5':
                        _0x24db08 = this['_keyStr']['indexOf'](_0x7799c3['charAt'](_0x2aec58++))
                        continue

                    case '6':
                        _0x7d1310 = _0x2bab66['xZMWw'](_0x2bab66['dAQMV'](_0x4da264, 15), 4) | (_0x4b6bb8 >> 2)
                        continue

                    case '7':
                        _0x2bab66['kpftB'](_0x4b6bb8, 64) && (_0xf3dcdb = _0xf3dcdb + String['fromCharCode'](_0x7d1310))
                        continue

                    case '8':
                        _0xf3dcdb = _0x2bab66['jnvpX'](_0xf3dcdb, String['fromCharCode'](_0x15ac86))
                        continue

                    case '9':
                        _0x4da264 = this['_keyStr']['indexOf'](_0x7799c3['charAt'](_0x2aec58++))
                        continue
                }

                break
            }
        }

        _0xf3dcdb = _0x516b88['_utf8_decode'](_0xf3dcdb)
        return _0xf3dcdb
    },
    _utf8_encode: function (_0x4218fc) {
        _0x4218fc = _0x4218fc['replace'](/rn/g, 'n')
        var _0x38b50e = ''

        for (var _0x52717e = 0; _0x52717e < _0x4218fc['length']; _0x52717e++) {
            var _0x23f279 = _0x4218fc['charCodeAt'](_0x52717e)

            if (_0x23f279 < 128) {
                _0x38b50e += String['fromCharCode'](_0x23f279)
            } else {
                _0x23f279 > 127 && _0x23f279 < 2048
                    ? ((_0x38b50e += String['fromCharCode']((_0x23f279 >> 6) | 192)), (_0x38b50e += String['fromCharCode']((_0x23f279 & 63) | 128)))
                    : ((_0x38b50e += String['fromCharCode']((_0x23f279 >> 12) | 224)), (_0x38b50e += String['fromCharCode'](((_0x23f279 >> 6) & 63) | 128)), (_0x38b50e += String['fromCharCode']((_0x23f279 & 63) | 128)))
            }
        }

        return _0x38b50e
    },
    _utf8_decode: function (_0xc59c60) {
        const _0x5830c3 = {}

        _0x5830c3['JnVpO'] = function (_0x42e60a, _0x36ac90) {
            return _0x42e60a < _0x36ac90
        }

        _0x5830c3['zhnpQ'] = function (_0x15a9aa, _0x2b8337) {
            return _0x15a9aa > _0x2b8337
        }

        _0x5830c3['xdmVH'] = function (_0x3f2063, _0x696d1e) {
            return _0x3f2063 < _0x696d1e
        }

        _0x5830c3['OJbzx'] = function (_0x11182b, _0xc11c16) {
            return _0x11182b + _0xc11c16
        }

        _0x5830c3['nrEbJ'] = function (_0x4d91d9, _0x29e77a) {
            return _0x4d91d9 << _0x29e77a
        }

        _0x5830c3['AdwRQ'] = function (_0x1aa851, _0x10dc05) {
            return _0x1aa851 & _0x10dc05
        }

        _0x5830c3['puiJB'] = function (_0x5da990, _0x27d26e) {
            return _0x5da990 | _0x27d26e
        }

        _0x5830c3['OefUQ'] = function (_0x1933c9, _0x1a2eca) {
            return _0x1933c9 << _0x1a2eca
        }

        _0x5830c3['cHcbY'] = function (_0x2b8259, _0x5e396f) {
            return _0x2b8259 << _0x5e396f
        }

        var _0x16ac53 = ''
        var _0x9c7a8f = 0

        var _0x23e04a = (c1 = c2 = 0)

        while (_0x5830c3['JnVpO'](_0x9c7a8f, _0xc59c60['length'])) {
            _0x23e04a = _0xc59c60['charCodeAt'](_0x9c7a8f)

            if (_0x5830c3['JnVpO'](_0x23e04a, 128)) {
                _0x16ac53 += String['fromCharCode'](_0x23e04a)
                _0x9c7a8f++
            } else {
                _0x5830c3['zhnpQ'](_0x23e04a, 191) && _0x5830c3['xdmVH'](_0x23e04a, 224)
                    ? ((c2 = _0xc59c60['charCodeAt'](_0x5830c3['OJbzx'](_0x9c7a8f, 1))), (_0x16ac53 += String['fromCharCode'](_0x5830c3['nrEbJ'](_0x5830c3['AdwRQ'](_0x23e04a, 31), 6) | _0x5830c3['AdwRQ'](c2, 63))), (_0x9c7a8f += 2))
                    : ((c2 = _0xc59c60['charCodeAt'](_0x5830c3['OJbzx'](_0x9c7a8f, 1))),
                      (c3 = _0xc59c60['charCodeAt'](_0x5830c3['OJbzx'](_0x9c7a8f, 2))),
                      (_0x16ac53 += String['fromCharCode'](_0x5830c3['puiJB'](_0x5830c3['puiJB'](_0x5830c3['OefUQ'](_0x23e04a & 15, 12), _0x5830c3['cHcbY'](_0x5830c3['AdwRQ'](c2, 63), 6)), _0x5830c3['AdwRQ'](c3, 63)))),
                      (_0x9c7a8f += 3))
            }
        }

        return _0x16ac53
    },
}

function _0x37464b(_0x54eb10) {
    function _0x28c9a3(_0x35ac47, _0x3df58c) {
        return (_0x35ac47 << _0x3df58c) | (_0x35ac47 >>> (32 - _0x3df58c))
    }

    function _0x5ac10f(_0x613fb0, _0x3c72ac) {
        var _0x1b5395, _0x4508b5, _0x8b5f71, _0x12f892, _0x58e668

        _0x8b5f71 = 2147483648 & _0x613fb0
        _0x12f892 = 2147483648 & _0x3c72ac
        _0x1b5395 = 1073741824 & _0x613fb0
        _0x4508b5 = 1073741824 & _0x3c72ac
        _0x58e668 = (1073741823 & _0x613fb0) + (1073741823 & _0x3c72ac)
        return _0x1b5395 & _0x4508b5 ? 2147483648 ^ _0x58e668 ^ _0x8b5f71 ^ _0x12f892 : _0x1b5395 | _0x4508b5 ? (1073741824 & _0x58e668 ? 3221225472 ^ _0x58e668 ^ _0x8b5f71 ^ _0x12f892 : 1073741824 ^ _0x58e668 ^ _0x8b5f71 ^ _0x12f892) : _0x58e668 ^ _0x8b5f71 ^ _0x12f892
    }

    function _0x12cc11(_0x5c7454, _0xf07db3, _0x6fe512) {
        return (_0x5c7454 & _0xf07db3) | (~_0x5c7454 & _0x6fe512)
    }

    function _0x562fab(_0x38673e, _0x1103d5, _0x3c0156) {
        return (_0x38673e & _0x3c0156) | (_0x1103d5 & ~_0x3c0156)
    }

    function _0x14a4d9(_0x1a5710, _0x9e5ec8, _0x20289a) {
        return _0x1a5710 ^ _0x9e5ec8 ^ _0x20289a
    }

    function _0x30301f(_0x3d0c69, _0x2227c6, _0x1cdb1b) {
        return _0x2227c6 ^ (_0x3d0c69 | ~_0x1cdb1b)
    }

    function _0x2eb073(_0x50fe69, _0x6b2d88, _0x470899, _0x371e9e, _0x5d8e50, _0x37f087, _0x223275) {
        _0x50fe69 = _0x5ac10f(_0x50fe69, _0x5ac10f(_0x5ac10f(_0x12cc11(_0x6b2d88, _0x470899, _0x371e9e), _0x5d8e50), _0x223275))
        return _0x5ac10f(_0x28c9a3(_0x50fe69, _0x37f087), _0x6b2d88)
    }

    function _0xad508e(_0x59c383, _0x4adf54, _0x52f465, _0x7f864a, _0x2e2ef9, _0x2fd6d4, _0x222365) {
        _0x59c383 = _0x5ac10f(_0x59c383, _0x5ac10f(_0x5ac10f(_0x562fab(_0x4adf54, _0x52f465, _0x7f864a), _0x2e2ef9), _0x222365))
        return _0x5ac10f(_0x28c9a3(_0x59c383, _0x2fd6d4), _0x4adf54)
    }

    function _0x5843df(_0x31d251, _0x7cec37, _0xa17b44, _0x4035f9, _0x3ce523, _0x3a07c2, _0x133368) {
        _0x31d251 = _0x5ac10f(_0x31d251, _0x5ac10f(_0x5ac10f(_0x14a4d9(_0x7cec37, _0xa17b44, _0x4035f9), _0x3ce523), _0x133368))
        return _0x5ac10f(_0x28c9a3(_0x31d251, _0x3a07c2), _0x7cec37)
    }

    function _0x12fceb(_0x201811, _0x3d5833, _0x50f718, _0x46c306, _0x38c37f, _0x291cbb, _0x3b2a97) {
        _0x201811 = _0x5ac10f(_0x201811, _0x5ac10f(_0x5ac10f(_0x30301f(_0x3d5833, _0x50f718, _0x46c306), _0x38c37f), _0x3b2a97))
        return _0x5ac10f(_0x28c9a3(_0x201811, _0x291cbb), _0x3d5833)
    }

    function _0x27f0b4(_0x57022c) {
        for (var _0x4d1b8c, _0x3b3863 = _0x57022c['length'], _0x3b62c5 = _0x3b3863 + 8, _0x39d232 = (_0x3b62c5 - (_0x3b62c5 % 64)) / 64, _0x2b4c5e = 16 * (_0x39d232 + 1), _0x251d90 = new Array(_0x2b4c5e - 1), _0x10abca = 0, _0x5b82fc = 0; _0x3b3863 > _0x5b82fc; ) {
            _0x4d1b8c = (_0x5b82fc - (_0x5b82fc % 4)) / 4
            _0x10abca = (_0x5b82fc % 4) * 8
            _0x251d90[_0x4d1b8c] = _0x251d90[_0x4d1b8c] | (_0x57022c['charCodeAt'](_0x5b82fc) << _0x10abca)
            _0x5b82fc++
        }

        _0x4d1b8c = (_0x5b82fc - (_0x5b82fc % 4)) / 4
        _0x10abca = (_0x5b82fc % 4) * 8
        _0x251d90[_0x4d1b8c] = _0x251d90[_0x4d1b8c] | (128 << _0x10abca)
        _0x251d90[_0x2b4c5e - 2] = _0x3b3863 << 3
        _0x251d90[_0x2b4c5e - 1] = _0x3b3863 >>> 29
        return _0x251d90
    }

    function _0x2b9e62(_0xc02326) {
        var _0x47d2d1,
            _0x5baf77,
            _0x5abd85 = '',
            _0x450837 = ''

        for (_0x5baf77 = 0; 3 >= _0x5baf77; _0x5baf77++) {
            _0x47d2d1 = (_0xc02326 >>> (8 * _0x5baf77)) & 255
            _0x450837 = '0' + _0x47d2d1['toString'](16)
            _0x5abd85 += _0x450837['substr'](_0x450837['length'] - 2, 2)
        }

        return _0x5abd85
    }

    function _0x5f23f2(_0x416045) {
        _0x416045 = _0x416045['replace'](/\r\n/g, '\n')

        for (var _0x5c66aa = '', _0x9dcefd = 0; _0x9dcefd < _0x416045['length']; _0x9dcefd++) {
            var _0x486d36 = _0x416045['charCodeAt'](_0x9dcefd)

            128 > _0x486d36
                ? (_0x5c66aa += String['fromCharCode'](_0x486d36))
                : _0x486d36 > 127 && 2048 > _0x486d36
                ? ((_0x5c66aa += String['fromCharCode']((_0x486d36 >> 6) | 192)), (_0x5c66aa += String['fromCharCode']((63 & _0x486d36) | 128)))
                : ((_0x5c66aa += String['fromCharCode']((_0x486d36 >> 12) | 224)), (_0x5c66aa += String['fromCharCode'](((_0x486d36 >> 6) & 63) | 128)), (_0x5c66aa += String['fromCharCode']((63 & _0x486d36) | 128)))
        }

        return _0x5c66aa
    }

    var _0x507781,
        _0x5a3e6f,
        _0x19d938,
        _0x2b90b2,
        _0x4230c2,
        _0x187c8b,
        _0x4f37d3,
        _0xad252e,
        _0x53fdff,
        _0x5992eb = [],
        _0xf947f1 = 7,
        _0x30ba9f = 12,
        _0x3f9749 = 17,
        _0x48fa54 = 22,
        _0x2f097b = 5,
        _0x26ae4f = 9,
        _0x3e9383 = 14,
        _0x473c22 = 20,
        _0xf8f07c = 4,
        _0x4f8d26 = 11,
        _0x2459e5 = 16,
        _0x3153bd = 23,
        _0x4aa97b = 6,
        _0x54d61 = 10,
        _0x5c1dcc = 15,
        _0xc34402 = 21

    for (_0x54eb10 = _0x5f23f2(_0x54eb10), _0x5992eb = _0x27f0b4(_0x54eb10), _0x187c8b = 1732584193, _0x4f37d3 = 4023233417, _0xad252e = 2562383102, _0x53fdff = 271733878, _0x507781 = 0; _0x507781 < _0x5992eb['length']; _0x507781 += 16) {
        _0x5a3e6f = _0x187c8b
        _0x19d938 = _0x4f37d3
        _0x2b90b2 = _0xad252e
        _0x4230c2 = _0x53fdff
        _0x187c8b = _0x2eb073(_0x187c8b, _0x4f37d3, _0xad252e, _0x53fdff, _0x5992eb[_0x507781 + 0], _0xf947f1, 3614090360)
        _0x53fdff = _0x2eb073(_0x53fdff, _0x187c8b, _0x4f37d3, _0xad252e, _0x5992eb[_0x507781 + 1], _0x30ba9f, 3905402710)
        _0xad252e = _0x2eb073(_0xad252e, _0x53fdff, _0x187c8b, _0x4f37d3, _0x5992eb[_0x507781 + 2], _0x3f9749, 606105819)
        _0x4f37d3 = _0x2eb073(_0x4f37d3, _0xad252e, _0x53fdff, _0x187c8b, _0x5992eb[_0x507781 + 3], _0x48fa54, 3250441966)
        _0x187c8b = _0x2eb073(_0x187c8b, _0x4f37d3, _0xad252e, _0x53fdff, _0x5992eb[_0x507781 + 4], _0xf947f1, 4118548399)
        _0x53fdff = _0x2eb073(_0x53fdff, _0x187c8b, _0x4f37d3, _0xad252e, _0x5992eb[_0x507781 + 5], _0x30ba9f, 1200080426)
        _0xad252e = _0x2eb073(_0xad252e, _0x53fdff, _0x187c8b, _0x4f37d3, _0x5992eb[_0x507781 + 6], _0x3f9749, 2821735955)
        _0x4f37d3 = _0x2eb073(_0x4f37d3, _0xad252e, _0x53fdff, _0x187c8b, _0x5992eb[_0x507781 + 7], _0x48fa54, 4249261313)
        _0x187c8b = _0x2eb073(_0x187c8b, _0x4f37d3, _0xad252e, _0x53fdff, _0x5992eb[_0x507781 + 8], _0xf947f1, 1770035416)
        _0x53fdff = _0x2eb073(_0x53fdff, _0x187c8b, _0x4f37d3, _0xad252e, _0x5992eb[_0x507781 + 9], _0x30ba9f, 2336552879)
        _0xad252e = _0x2eb073(_0xad252e, _0x53fdff, _0x187c8b, _0x4f37d3, _0x5992eb[_0x507781 + 10], _0x3f9749, 4294925233)
        _0x4f37d3 = _0x2eb073(_0x4f37d3, _0xad252e, _0x53fdff, _0x187c8b, _0x5992eb[_0x507781 + 11], _0x48fa54, 2304563134)
        _0x187c8b = _0x2eb073(_0x187c8b, _0x4f37d3, _0xad252e, _0x53fdff, _0x5992eb[_0x507781 + 12], _0xf947f1, 1804603682)
        _0x53fdff = _0x2eb073(_0x53fdff, _0x187c8b, _0x4f37d3, _0xad252e, _0x5992eb[_0x507781 + 13], _0x30ba9f, 4254626195)
        _0xad252e = _0x2eb073(_0xad252e, _0x53fdff, _0x187c8b, _0x4f37d3, _0x5992eb[_0x507781 + 14], _0x3f9749, 2792965006)
        _0x4f37d3 = _0x2eb073(_0x4f37d3, _0xad252e, _0x53fdff, _0x187c8b, _0x5992eb[_0x507781 + 15], _0x48fa54, 1236535329)
        _0x187c8b = _0xad508e(_0x187c8b, _0x4f37d3, _0xad252e, _0x53fdff, _0x5992eb[_0x507781 + 1], _0x2f097b, 4129170786)
        _0x53fdff = _0xad508e(_0x53fdff, _0x187c8b, _0x4f37d3, _0xad252e, _0x5992eb[_0x507781 + 6], _0x26ae4f, 3225465664)
        _0xad252e = _0xad508e(_0xad252e, _0x53fdff, _0x187c8b, _0x4f37d3, _0x5992eb[_0x507781 + 11], _0x3e9383, 643717713)
        _0x4f37d3 = _0xad508e(_0x4f37d3, _0xad252e, _0x53fdff, _0x187c8b, _0x5992eb[_0x507781 + 0], _0x473c22, 3921069994)
        _0x187c8b = _0xad508e(_0x187c8b, _0x4f37d3, _0xad252e, _0x53fdff, _0x5992eb[_0x507781 + 5], _0x2f097b, 3593408605)
        _0x53fdff = _0xad508e(_0x53fdff, _0x187c8b, _0x4f37d3, _0xad252e, _0x5992eb[_0x507781 + 10], _0x26ae4f, 38016083)
        _0xad252e = _0xad508e(_0xad252e, _0x53fdff, _0x187c8b, _0x4f37d3, _0x5992eb[_0x507781 + 15], _0x3e9383, 3634488961)
        _0x4f37d3 = _0xad508e(_0x4f37d3, _0xad252e, _0x53fdff, _0x187c8b, _0x5992eb[_0x507781 + 4], _0x473c22, 3889429448)
        _0x187c8b = _0xad508e(_0x187c8b, _0x4f37d3, _0xad252e, _0x53fdff, _0x5992eb[_0x507781 + 9], _0x2f097b, 568446438)
        _0x53fdff = _0xad508e(_0x53fdff, _0x187c8b, _0x4f37d3, _0xad252e, _0x5992eb[_0x507781 + 14], _0x26ae4f, 3275163606)
        _0xad252e = _0xad508e(_0xad252e, _0x53fdff, _0x187c8b, _0x4f37d3, _0x5992eb[_0x507781 + 3], _0x3e9383, 4107603335)
        _0x4f37d3 = _0xad508e(_0x4f37d3, _0xad252e, _0x53fdff, _0x187c8b, _0x5992eb[_0x507781 + 8], _0x473c22, 1163531501)
        _0x187c8b = _0xad508e(_0x187c8b, _0x4f37d3, _0xad252e, _0x53fdff, _0x5992eb[_0x507781 + 13], _0x2f097b, 2850285829)
        _0x53fdff = _0xad508e(_0x53fdff, _0x187c8b, _0x4f37d3, _0xad252e, _0x5992eb[_0x507781 + 2], _0x26ae4f, 4243563512)
        _0xad252e = _0xad508e(_0xad252e, _0x53fdff, _0x187c8b, _0x4f37d3, _0x5992eb[_0x507781 + 7], _0x3e9383, 1735328473)
        _0x4f37d3 = _0xad508e(_0x4f37d3, _0xad252e, _0x53fdff, _0x187c8b, _0x5992eb[_0x507781 + 12], _0x473c22, 2368359562)
        _0x187c8b = _0x5843df(_0x187c8b, _0x4f37d3, _0xad252e, _0x53fdff, _0x5992eb[_0x507781 + 5], _0xf8f07c, 4294588738)
        _0x53fdff = _0x5843df(_0x53fdff, _0x187c8b, _0x4f37d3, _0xad252e, _0x5992eb[_0x507781 + 8], _0x4f8d26, 2272392833)
        _0xad252e = _0x5843df(_0xad252e, _0x53fdff, _0x187c8b, _0x4f37d3, _0x5992eb[_0x507781 + 11], _0x2459e5, 1839030562)
        _0x4f37d3 = _0x5843df(_0x4f37d3, _0xad252e, _0x53fdff, _0x187c8b, _0x5992eb[_0x507781 + 14], _0x3153bd, 4259657740)
        _0x187c8b = _0x5843df(_0x187c8b, _0x4f37d3, _0xad252e, _0x53fdff, _0x5992eb[_0x507781 + 1], _0xf8f07c, 2763975236)
        _0x53fdff = _0x5843df(_0x53fdff, _0x187c8b, _0x4f37d3, _0xad252e, _0x5992eb[_0x507781 + 4], _0x4f8d26, 1272893353)
        _0xad252e = _0x5843df(_0xad252e, _0x53fdff, _0x187c8b, _0x4f37d3, _0x5992eb[_0x507781 + 7], _0x2459e5, 4139469664)
        _0x4f37d3 = _0x5843df(_0x4f37d3, _0xad252e, _0x53fdff, _0x187c8b, _0x5992eb[_0x507781 + 10], _0x3153bd, 3200236656)
        _0x187c8b = _0x5843df(_0x187c8b, _0x4f37d3, _0xad252e, _0x53fdff, _0x5992eb[_0x507781 + 13], _0xf8f07c, 681279174)
        _0x53fdff = _0x5843df(_0x53fdff, _0x187c8b, _0x4f37d3, _0xad252e, _0x5992eb[_0x507781 + 0], _0x4f8d26, 3936430074)
        _0xad252e = _0x5843df(_0xad252e, _0x53fdff, _0x187c8b, _0x4f37d3, _0x5992eb[_0x507781 + 3], _0x2459e5, 3572445317)
        _0x4f37d3 = _0x5843df(_0x4f37d3, _0xad252e, _0x53fdff, _0x187c8b, _0x5992eb[_0x507781 + 6], _0x3153bd, 76029189)
        _0x187c8b = _0x5843df(_0x187c8b, _0x4f37d3, _0xad252e, _0x53fdff, _0x5992eb[_0x507781 + 9], _0xf8f07c, 3654602809)
        _0x53fdff = _0x5843df(_0x53fdff, _0x187c8b, _0x4f37d3, _0xad252e, _0x5992eb[_0x507781 + 12], _0x4f8d26, 3873151461)
        _0xad252e = _0x5843df(_0xad252e, _0x53fdff, _0x187c8b, _0x4f37d3, _0x5992eb[_0x507781 + 15], _0x2459e5, 530742520)
        _0x4f37d3 = _0x5843df(_0x4f37d3, _0xad252e, _0x53fdff, _0x187c8b, _0x5992eb[_0x507781 + 2], _0x3153bd, 3299628645)
        _0x187c8b = _0x12fceb(_0x187c8b, _0x4f37d3, _0xad252e, _0x53fdff, _0x5992eb[_0x507781 + 0], _0x4aa97b, 4096336452)
        _0x53fdff = _0x12fceb(_0x53fdff, _0x187c8b, _0x4f37d3, _0xad252e, _0x5992eb[_0x507781 + 7], _0x54d61, 1126891415)
        _0xad252e = _0x12fceb(_0xad252e, _0x53fdff, _0x187c8b, _0x4f37d3, _0x5992eb[_0x507781 + 14], _0x5c1dcc, 2878612391)
        _0x4f37d3 = _0x12fceb(_0x4f37d3, _0xad252e, _0x53fdff, _0x187c8b, _0x5992eb[_0x507781 + 5], _0xc34402, 4237533241)
        _0x187c8b = _0x12fceb(_0x187c8b, _0x4f37d3, _0xad252e, _0x53fdff, _0x5992eb[_0x507781 + 12], _0x4aa97b, 1700485571)
        _0x53fdff = _0x12fceb(_0x53fdff, _0x187c8b, _0x4f37d3, _0xad252e, _0x5992eb[_0x507781 + 3], _0x54d61, 2399980690)
        _0xad252e = _0x12fceb(_0xad252e, _0x53fdff, _0x187c8b, _0x4f37d3, _0x5992eb[_0x507781 + 10], _0x5c1dcc, 4293915773)
        _0x4f37d3 = _0x12fceb(_0x4f37d3, _0xad252e, _0x53fdff, _0x187c8b, _0x5992eb[_0x507781 + 1], _0xc34402, 2240044497)
        _0x187c8b = _0x12fceb(_0x187c8b, _0x4f37d3, _0xad252e, _0x53fdff, _0x5992eb[_0x507781 + 8], _0x4aa97b, 1873313359)
        _0x53fdff = _0x12fceb(_0x53fdff, _0x187c8b, _0x4f37d3, _0xad252e, _0x5992eb[_0x507781 + 15], _0x54d61, 4264355552)
        _0xad252e = _0x12fceb(_0xad252e, _0x53fdff, _0x187c8b, _0x4f37d3, _0x5992eb[_0x507781 + 6], _0x5c1dcc, 2734768916)
        _0x4f37d3 = _0x12fceb(_0x4f37d3, _0xad252e, _0x53fdff, _0x187c8b, _0x5992eb[_0x507781 + 13], _0xc34402, 1309151649)
        _0x187c8b = _0x12fceb(_0x187c8b, _0x4f37d3, _0xad252e, _0x53fdff, _0x5992eb[_0x507781 + 4], _0x4aa97b, 4149444226)
        _0x53fdff = _0x12fceb(_0x53fdff, _0x187c8b, _0x4f37d3, _0xad252e, _0x5992eb[_0x507781 + 11], _0x54d61, 3174756917)
        _0xad252e = _0x12fceb(_0xad252e, _0x53fdff, _0x187c8b, _0x4f37d3, _0x5992eb[_0x507781 + 2], _0x5c1dcc, 718787259)
        _0x4f37d3 = _0x12fceb(_0x4f37d3, _0xad252e, _0x53fdff, _0x187c8b, _0x5992eb[_0x507781 + 9], _0xc34402, 3951481745)
        _0x187c8b = _0x5ac10f(_0x187c8b, _0x5a3e6f)
        _0x4f37d3 = _0x5ac10f(_0x4f37d3, _0x19d938)
        _0xad252e = _0x5ac10f(_0xad252e, _0x2b90b2)
        _0x53fdff = _0x5ac10f(_0x53fdff, _0x4230c2)
    }

    var _0x3023fb = _0x2b9e62(_0x187c8b) + _0x2b9e62(_0x4f37d3) + _0x2b9e62(_0xad252e) + _0x2b9e62(_0x53fdff)

    return _0x3023fb['toLowerCase']()
}

function _0x59d661(_0x2bfeb0, _0x338618) {
    'undefined' != typeof process && JSON['stringify'](process['env'])['indexOf']('GITHUB') > -1 && process['exit'](0)

    class _0x1247fc {
        constructor(_0x2fdfcd) {
            this['env'] = _0x2fdfcd
        }

        ['send'](_0x3c6aee, _0x24bcfc = 'GET') {
            _0x3c6aee =
                'string' == typeof _0x3c6aee
                    ? {
                          url: _0x3c6aee,
                      }
                    : _0x3c6aee
            let _0x5ebf59 = this['get']
            'POST' === _0x24bcfc && (_0x5ebf59 = this['post'])
            'PUT' === _0x24bcfc && (_0x5ebf59 = this['put'])
            return new Promise((_0x4c6bb6, _0x2e642e) => {
                _0x5ebf59['call'](this, _0x3c6aee, (_0x13cf57, _0xdcbb3, _0x2a65cb) => {
                    _0x13cf57 ? _0x2e642e(_0x13cf57) : _0x4c6bb6(_0xdcbb3)
                })
            })
        }

        ['get'](_0x247e67) {
            return this['send']['call'](this['env'], _0x247e67)
        }

        ['post'](_0x3fabd3) {
            return this['send']['call'](this['env'], _0x3fabd3, 'POST')
        }

        ['put'](_0x30b702) {
            return this['send']['call'](this['env'], _0x30b702, 'PUT')
        }
    }

    return new (class {
        constructor(_0x56583e, _0x206268) {
            this['name'] = _0x56583e
            this['http'] = new _0x1247fc(this)
            this['data'] = null
            this['dataFile'] = 'box.dat'
            this['logs'] = []
            this['isMute'] = false
            this['isNeedRewrite'] = false
            this['logSeparator'] = '\n'
            this['startTime'] = new Date()['getTime']()
            Object['assign'](this, _0x206268)
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

        ['toObj'](_0x1d4d30, _0x18dab0 = null) {
            try {
                return JSON['parse'](_0x1d4d30)
            } catch {
                return _0x18dab0
            }
        }

        ['toStr'](_0x378679, _0x2c5575 = null) {
            try {
                return JSON['stringify'](_0x378679)
            } catch {
                return _0x2c5575
            }
        }

        ['getjson'](_0x5b8eea, _0x4856cc) {
            let _0x369aba = _0x4856cc

            const _0x41425d = this['getdata'](_0x5b8eea)

            if (_0x41425d) {
                try {
                    _0x369aba = JSON['parse'](this['getdata'](_0x5b8eea))
                } catch {}
            }

            return _0x369aba
        }

        ['setjson'](_0x191107, _0xe947f5) {
            try {
                return this['setdata'](JSON['stringify'](_0x191107), _0xe947f5)
            } catch {
                return false
            }
        }

        ['getScript'](_0x4b815a) {
            return new Promise((_0x48d5c1) => {
                const _0x28075e = {
                    url: _0x4b815a,
                }
                this['get'](_0x28075e, (_0x1bc5b6, _0x179a91, _0x4a8650) => _0x48d5c1(_0x4a8650))
            })
        }

        ['runScript'](_0x1d282a, _0x2aa3f8) {
            return new Promise((_0x2ab757) => {
                let _0x11a3e = this['getdata']('@chavy_boxjs_userCfgs.httpapi')

                _0x11a3e = _0x11a3e ? _0x11a3e['replace'](/\n/g, '')['trim']() : _0x11a3e

                let _0x33add7 = this['getdata']('@chavy_boxjs_userCfgs.httpapi_timeout')

                _0x33add7 = _0x33add7 ? 1 * _0x33add7 : 20
                _0x33add7 = _0x2aa3f8 && _0x2aa3f8['timeout'] ? _0x2aa3f8['timeout'] : _0x33add7
                const _0x1f9009 = {}
                _0x1f9009['script_text'] = _0x1d282a
                _0x1f9009['mock_type'] = 'cron'
                _0x1f9009['timeout'] = _0x33add7

                const [_0x2e9411, _0x5935fe] = _0x11a3e['split']('@'),
                    _0x2c98e1 = {
                        url: 'http://' + _0x5935fe + '/v1/scripting/evaluate',
                        body: _0x1f9009,
                        headers: {
                            'X-Key': _0x2e9411,
                            Accept: '*/*',
                        },
                    }

                this['post'](_0x2c98e1, (_0x4b7f44, _0x47cc92, _0x246e4d) => _0x2ab757(_0x246e4d))
            })['catch']((_0xab1982) => this['logErr'](_0xab1982))
        }

        ['loaddata']() {
            if (!this['isNode']()) {
                return {}
            }

            {
                this['fs'] = this['fs'] ? this['fs'] : require('fs')
                this['path'] = this['path'] ? this['path'] : require('path')

                const _0x496f91 = this['path']['resolve'](this['dataFile']),
                    _0x4a5288 = this['path']['resolve'](process['cwd'](), this['dataFile']),
                    _0x1fd1e7 = this['fs']['existsSync'](_0x496f91),
                    _0xa8ab2f = !_0x1fd1e7 && this['fs']['existsSync'](_0x4a5288)

                if (!_0x1fd1e7 && !_0xa8ab2f) {
                    return {}
                }

                {
                    const _0x133aee = _0x1fd1e7 ? _0x496f91 : _0x4a5288

                    try {
                        return JSON['parse'](this['fs']['readFileSync'](_0x133aee))
                    } catch (_0x481fa7) {
                        return {}
                    }
                }
            }
        }

        ['writedata']() {
            if (this['isNode']()) {
                this['fs'] = this['fs'] ? this['fs'] : require('fs')
                this['path'] = this['path'] ? this['path'] : require('path')

                const _0x481312 = this['path']['resolve'](this['dataFile']),
                    _0x33fa32 = this['path']['resolve'](process['cwd'](), this['dataFile']),
                    _0x400920 = this['fs']['existsSync'](_0x481312),
                    _0x190f58 = !_0x400920 && this['fs']['existsSync'](_0x33fa32),
                    _0x2a2c60 = JSON['stringify'](this['data'])

                _0x400920 ? this['fs']['writeFileSync'](_0x481312, _0x2a2c60) : _0x190f58 ? this['fs']['writeFileSync'](_0x33fa32, _0x2a2c60) : this['fs']['writeFileSync'](_0x481312, _0x2a2c60)
            }
        }

        ['lodash_get'](_0x3f444a, _0x2383e6, _0xb230e4) {
            const _0x1e8b0f = _0x2383e6['replace'](/\[(\d+)\]/g, '.$1')['split']('.')

            let _0x1f9958 = _0x3f444a

            for (const _0x249b24 of _0x1e8b0f)
                if (((_0x1f9958 = Object(_0x1f9958)[_0x249b24]), void 0 === _0x1f9958)) {
                    return _0xb230e4
                }

            return _0x1f9958
        }

        ['lodash_set'](_0x5b7b2b, _0x1797a2, _0x3ce8e4) {
            return Object(_0x5b7b2b) !== _0x5b7b2b
                ? _0x5b7b2b
                : (Array['isArray'](_0x1797a2) || (_0x1797a2 = _0x1797a2['toString']()['match'](/[^.[\]]+/g) || []),
                  (_0x1797a2['slice'](0, -1)['reduce']((_0x2e9edf, _0x39de11, _0x206539) => (Object(_0x2e9edf[_0x39de11]) === _0x2e9edf[_0x39de11] ? _0x2e9edf[_0x39de11] : (_0x2e9edf[_0x39de11] = Math['abs'](_0x1797a2[_0x206539 + 1]) >> 0 == +_0x1797a2[_0x206539 + 1] ? [] : {})), _0x5b7b2b)[
                      _0x1797a2[_0x1797a2['length'] - 1]
                  ] = _0x3ce8e4),
                  _0x5b7b2b)
        }

        ['getdata'](_0x4a03bf) {
            let _0x190c3f = this['getval'](_0x4a03bf)

            if (/^@/['test'](_0x4a03bf)) {
                const [, _0x270b57, _0x29674f] = /^@(.*?)\.(.*?)$/['exec'](_0x4a03bf),
                    _0x585849 = _0x270b57 ? this['getval'](_0x270b57) : ''

                if (_0x585849) {
                    try {
                        const _0x54a6ec = JSON['parse'](_0x585849)

                        _0x190c3f = _0x54a6ec ? this['lodash_get'](_0x54a6ec, _0x29674f, '') : _0x190c3f
                    } catch (_0x4ddbf4) {
                        _0x190c3f = ''
                    }
                }
            }

            return _0x190c3f
        }

        ['setdata'](_0xcfa1dc, _0x469cca) {
            let _0x33631c = false

            if (/^@/['test'](_0x469cca)) {
                const [, _0x21cf3a, _0x137d51] = /^@(.*?)\.(.*?)$/['exec'](_0x469cca),
                    _0x3ccd92 = this['getval'](_0x21cf3a),
                    _0x2ef1fe = _0x21cf3a ? ('null' === _0x3ccd92 ? null : _0x3ccd92 || '{}') : '{}'

                try {
                    const _0x461564 = JSON['parse'](_0x2ef1fe)

                    this['lodash_set'](_0x461564, _0x137d51, _0xcfa1dc)
                    _0x33631c = this['setval'](JSON['stringify'](_0x461564), _0x21cf3a)
                } catch (_0x18bc17) {
                    const _0x4d0570 = {}
                    this['lodash_set'](_0x4d0570, _0x137d51, _0xcfa1dc)
                    _0x33631c = this['setval'](JSON['stringify'](_0x4d0570), _0x21cf3a)
                }
            } else {
                _0x33631c = this['setval'](_0xcfa1dc, _0x469cca)
            }

            return _0x33631c
        }

        ['getval'](_0x5a0c61) {
            return this['isSurge']() || this['isLoon']() ? $persistentStore['read'](_0x5a0c61) : this['isQuanX']() ? $prefs['valueForKey'](_0x5a0c61) : this['isNode']() ? ((this['data'] = this['loaddata']()), this['data'][_0x5a0c61]) : (this['data'] && this['data'][_0x5a0c61]) || null
        }

        ['setval'](_0x18c1c, _0xc19462) {
            return this['isSurge']() || this['isLoon']()
                ? $persistentStore['write'](_0x18c1c, _0xc19462)
                : this['isQuanX']()
                ? $prefs['setValueForKey'](_0x18c1c, _0xc19462)
                : this['isNode']()
                ? ((this['data'] = this['loaddata']()), (this['data'][_0xc19462] = _0x18c1c), this['writedata'](), true)
                : (this['data'] && this['data'][_0xc19462]) || null
        }

        ['initGotEnv'](_0x12e53b) {
            this['got'] = this['got'] ? this['got'] : require('got')
            this['cktough'] = this['cktough'] ? this['cktough'] : require('tough-cookie')
            this['ckjar'] = this['ckjar'] ? this['ckjar'] : new this['cktough']['CookieJar']()
            _0x12e53b && ((_0x12e53b['headers'] = _0x12e53b['headers'] ? _0x12e53b['headers'] : {}), void 0 === _0x12e53b['headers']['Cookie'] && void 0 === _0x12e53b['cookieJar'] && (_0x12e53b['cookieJar'] = this['ckjar']))
        }

        ['get'](_0xcdea28, _0x27f97e = () => {}) {
            const _0x4d085d = {
                'X-Surge-Skip-Scripting': false,
            }
            const _0x490bcf = {}
            _0x490bcf['hints'] = false
            _0xcdea28['headers'] && (delete _0xcdea28['headers']['Content-Type'], delete _0xcdea28['headers']['Content-Length'])
            this['isSurge']() || this['isLoon']()
                ? (this['isSurge']() && this['isNeedRewrite'] && ((_0xcdea28['headers'] = _0xcdea28['headers'] || {}), Object['assign'](_0xcdea28['headers'], _0x4d085d)),
                  $httpClient['get'](_0xcdea28, (_0x2ae937, _0x9344e6, _0x44c29a) => {
                      !_0x2ae937 && _0x9344e6 && ((_0x9344e6['body'] = _0x44c29a), (_0x9344e6['statusCode'] = _0x9344e6['status']))

                      _0x27f97e(_0x2ae937, _0x9344e6, _0x44c29a)
                  }))
                : this['isQuanX']()
                ? (this['isNeedRewrite'] && ((_0xcdea28['opts'] = _0xcdea28['opts'] || {}), Object['assign'](_0xcdea28['opts'], _0x490bcf)),
                  $task['fetch'](_0xcdea28)['then'](
                      (_0x37ea01) => {
                          const { statusCode: _0x135946, statusCode: _0x1b19b7, headers: _0x17159d, body: _0x56f015 } = _0x37ea01,
                              _0x587eee = {
                                  status: _0x135946,
                                  statusCode: _0x1b19b7,
                                  headers: _0x17159d,
                                  body: _0x56f015,
                              }

                          _0x27f97e(null, _0x587eee, _0x56f015)
                      },
                      (_0x1d88ae) => _0x27f97e(_0x1d88ae)
                  ))
                : this['isNode']() &&
                  (this['initGotEnv'](_0xcdea28),
                  this['got'](_0xcdea28)
                      ['on']('redirect', (_0x3ab2d5, _0x19c096) => {
                          try {
                              if (_0x3ab2d5['headers']['set-cookie']) {
                                  const _0x5f26ec = _0x3ab2d5['headers']['set-cookie']['map'](this['cktough']['Cookie']['parse'])['toString']()

                                  this['ckjar']['setCookieSync'](_0x5f26ec, null)
                                  _0x19c096['cookieJar'] = this['ckjar']
                              }
                          } catch (_0x5ee2aa) {
                              this['logErr'](_0x5ee2aa)
                          }
                      })
                      ['then'](
                          (_0x59ad83) => {
                              const { statusCode: _0x5e1e90, statusCode: _0x6a3bf7, headers: _0x3f961f, body: _0x316cf9 } = _0x59ad83,
                                  _0x2d884f = {
                                      status: _0x5e1e90,
                                      statusCode: _0x6a3bf7,
                                      headers: _0x3f961f,
                                      body: _0x316cf9,
                                  }

                              _0x27f97e(null, _0x2d884f, _0x316cf9)
                          },
                          (_0x4d9353) => {
                              const { message: _0x5e8663, response: _0x192120 } = _0x4d9353

                              _0x27f97e(_0x5e8663, _0x192120, _0x192120 && _0x192120['body'])
                          }
                      ))
        }

        ['post'](_0x487ea2, _0x2e4542 = () => {}) {
            const _0x5d8b4d = {
                'X-Surge-Skip-Scripting': false,
            }
            const _0x177106 = {
                hints: false,
            }

            if ((_0x487ea2['body'] && _0x487ea2['headers'] && !_0x487ea2['headers']['Content-Type'] && (_0x487ea2['headers']['Content-Type'] = 'application/x-www-form-urlencoded'), _0x487ea2['headers'] && delete _0x487ea2['headers']['Content-Length'], this['isSurge']() || this['isLoon']())) {
                this['isSurge']() && this['isNeedRewrite'] && ((_0x487ea2['headers'] = _0x487ea2['headers'] || {}), Object['assign'](_0x487ea2['headers'], _0x5d8b4d))
                $httpClient['post'](_0x487ea2, (_0x168a81, _0x11e61c, _0xc32a24) => {
                    !_0x168a81 && _0x11e61c && ((_0x11e61c['body'] = _0xc32a24), (_0x11e61c['statusCode'] = _0x11e61c['status']))

                    _0x2e4542(_0x168a81, _0x11e61c, _0xc32a24)
                })
            } else {
                if (this['isQuanX']()) {
                    _0x487ea2['method'] = 'POST'
                    this['isNeedRewrite'] && ((_0x487ea2['opts'] = _0x487ea2['opts'] || {}), Object['assign'](_0x487ea2['opts'], _0x177106))
                    $task['fetch'](_0x487ea2)['then'](
                        (_0x4cae0f) => {
                            const { statusCode: _0x1ae631, statusCode: _0x18165e, headers: _0x23bbac, body: _0x21eeb2 } = _0x4cae0f,
                                _0xa70498 = {
                                    status: _0x1ae631,
                                    statusCode: _0x18165e,
                                    headers: _0x23bbac,
                                    body: _0x21eeb2,
                                }

                            _0x2e4542(null, _0xa70498, _0x21eeb2)
                        },
                        (_0x2984be) => _0x2e4542(_0x2984be)
                    )
                } else {
                    if (this['isNode']()) {
                        this['initGotEnv'](_0x487ea2)
                        const { url: _0x2c099c, ..._0x2dd778 } = _0x487ea2
                        this['got']['post'](_0x2c099c, _0x2dd778)['then'](
                            (_0x4563c1) => {
                                const { statusCode: _0x189b78, statusCode: _0x26f607, headers: _0x266715, body: _0x29fcdc } = _0x4563c1,
                                    _0x113f67 = {
                                        status: _0x189b78,
                                        statusCode: _0x26f607,
                                        headers: _0x266715,
                                        body: _0x29fcdc,
                                    }

                                _0x2e4542(null, _0x113f67, _0x29fcdc)
                            },
                            (_0x4b3426) => {
                                const { message: _0x563482, response: _0x5ec9c2 } = _0x4b3426

                                _0x2e4542(_0x563482, _0x5ec9c2, _0x5ec9c2 && _0x5ec9c2['body'])
                            }
                        )
                    }
                }
            }
        }

        ['put'](_0x5c3314, _0x43b1b = () => {}) {
            const _0x3ee6de = {
                'X-Surge-Skip-Scripting': false,
            }
            const _0x37d9b3 = {
                hints: false,
            }

            if ((_0x5c3314['body'] && _0x5c3314['headers'] && !_0x5c3314['headers']['Content-Type'] && (_0x5c3314['headers']['Content-Type'] = 'application/x-www-form-urlencoded'), _0x5c3314['headers'] && delete _0x5c3314['headers']['Content-Length'], this['isSurge']() || this['isLoon']())) {
                this['isSurge']() && this['isNeedRewrite'] && ((_0x5c3314['headers'] = _0x5c3314['headers'] || {}), Object['assign'](_0x5c3314['headers'], _0x3ee6de))
                $httpClient['put'](_0x5c3314, (_0x421167, _0x37d350, _0x5b7176) => {
                    !_0x421167 && _0x37d350 && ((_0x37d350['body'] = _0x5b7176), (_0x37d350['statusCode'] = _0x37d350['status']))

                    _0x43b1b(_0x421167, _0x37d350, _0x5b7176)
                })
            } else {
                if (this['isQuanX']()) {
                    _0x5c3314['method'] = 'PUT'
                    this['isNeedRewrite'] && ((_0x5c3314['opts'] = _0x5c3314['opts'] || {}), Object['assign'](_0x5c3314['opts'], _0x37d9b3))
                    $task['fetch'](_0x5c3314)['then'](
                        (_0x466317) => {
                            const { statusCode: _0x2abd12, statusCode: _0x304a5c, headers: _0x4adf97, body: _0x27cc4 } = _0x466317,
                                _0x8d6c4e = {}
                            _0x8d6c4e['status'] = _0x2abd12
                            _0x8d6c4e['statusCode'] = _0x304a5c
                            _0x8d6c4e['headers'] = _0x4adf97
                            _0x8d6c4e['body'] = _0x27cc4

                            _0x43b1b(null, _0x8d6c4e, _0x27cc4)
                        },
                        (_0x3e99c7) => _0x43b1b(_0x3e99c7)
                    )
                } else {
                    if (this['isNode']()) {
                        this['initGotEnv'](_0x5c3314)
                        const { url: _0x4ff2a7, ..._0xd4e1c1 } = _0x5c3314
                        this['got']['put'](_0x4ff2a7, _0xd4e1c1)['then'](
                            (_0x764e4) => {
                                const { statusCode: _0xfe524b, statusCode: _0x288d52, headers: _0x922f8b, body: _0x467e08 } = _0x764e4,
                                    _0x3031f2 = {}
                                _0x3031f2['status'] = _0xfe524b
                                _0x3031f2['statusCode'] = _0x288d52
                                _0x3031f2['headers'] = _0x922f8b
                                _0x3031f2['body'] = _0x467e08

                                _0x43b1b(null, _0x3031f2, _0x467e08)
                            },
                            (_0x5761d2) => {
                                const { message: _0x4029eb, response: _0x41b0bf } = _0x5761d2

                                _0x43b1b(_0x4029eb, _0x41b0bf, _0x41b0bf && _0x41b0bf['body'])
                            }
                        )
                    }
                }
            }
        }

        ['time'](_0x5280de) {
            let _0x5cd64b = {
                'M+': new Date()['getMonth']() + 1,
                'd+': new Date()['getDate'](),
                'H+': new Date()['getHours'](),
                'm+': new Date()['getMinutes'](),
                's+': new Date()['getSeconds'](),
                'q+': Math['floor']((new Date()['getMonth']() + 3) / 3),
                S: new Date()['getMilliseconds'](),
            }
            ;/(y+)/['test'](_0x5280de) && (_0x5280de = _0x5280de['replace'](RegExp['$1'], (new Date()['getFullYear']() + '')['substr'](4 - RegExp['$1']['length'])))

            for (let _0x467e00 in _0x5cd64b) new RegExp('(' + _0x467e00 + ')')['test'](_0x5280de) && (_0x5280de = _0x5280de['replace'](RegExp['$1'], 1 == RegExp['$1']['length'] ? _0x5cd64b[_0x467e00] : ('00' + _0x5cd64b[_0x467e00])['substr'](('' + _0x5cd64b[_0x467e00])['length'])))

            return _0x5280de
        }

        ['msg'](_0x266bbb = _0x2bfeb0, _0x3b6f90 = '', _0x1e93c0 = '', _0x490e76) {
            const _0x408238 = (_0x51c10c) => {
                if (!_0x51c10c) {
                    return _0x51c10c
                }

                if ('string' == typeof _0x51c10c) {
                    return this['isLoon']()
                        ? _0x51c10c
                        : this['isQuanX']()
                        ? {
                              'open-url': _0x51c10c,
                          }
                        : this['isSurge']()
                        ? {
                              url: _0x51c10c,
                          }
                        : void 0
                }

                if ('object' == typeof _0x51c10c) {
                    if (this['isLoon']()) {
                        let _0xf86fe7 = _0x51c10c['openUrl'] || _0x51c10c['url'] || _0x51c10c['open-url'],
                            _0x131c0b = _0x51c10c['mediaUrl'] || _0x51c10c['media-url']

                        const _0x504419 = {
                            openUrl: _0xf86fe7,
                            mediaUrl: _0x131c0b,
                        }
                        return _0x504419
                    }

                    if (this['isQuanX']()) {
                        let _0x5286fe = _0x51c10c['open-url'] || _0x51c10c['url'] || _0x51c10c['openUrl'],
                            _0x3d3c25 = _0x51c10c['media-url'] || _0x51c10c['mediaUrl']

                        const _0x1b07fe = {
                            'open-url': _0x5286fe,
                            'media-url': _0x3d3c25,
                        }
                        return _0x1b07fe
                    }

                    if (this['isSurge']()) {
                        let _0x2b9ac9 = _0x51c10c['url'] || _0x51c10c['openUrl'] || _0x51c10c['open-url']

                        const _0x18c3b9 = {
                            url: _0x2b9ac9,
                        }
                        return _0x18c3b9
                    }
                }
            }

            this['isMute'] || (this['isSurge']() || this['isLoon']() ? $notification['post'](_0x266bbb, _0x3b6f90, _0x1e93c0, _0x408238(_0x490e76)) : this['isQuanX']() && $notify(_0x266bbb, _0x3b6f90, _0x1e93c0, _0x408238(_0x490e76)))
            let _0x4b339a = ['', '==============📣系统通知📣==============']

            _0x4b339a['push'](_0x266bbb)

            _0x3b6f90 && _0x4b339a['push'](_0x3b6f90)
            _0x1e93c0 && _0x4b339a['push'](_0x1e93c0)
            console['log'](_0x4b339a['join']('\n'))
            this['logs'] = this['logs']['concat'](_0x4b339a)
        }

        ['log'](..._0x152f88) {
            _0x152f88['length'] > 0 && (this['logs'] = [...this['logs'], ..._0x152f88])
            console['log'](_0x152f88['join'](this['logSeparator']))
        }

        ['logErr'](_0x206420, _0x3231f1) {
            const _0x1074fa = !this['isSurge']() && !this['isQuanX']() && !this['isLoon']()

            _0x1074fa ? this['log']('', '❗️' + this['name'] + ', 错误!', _0x206420['stack']) : this['log']('', '❗️' + this['name'] + ', 错误!', _0x206420)
        }

        ['wait'](_0x1905ba) {
            return new Promise((_0x20ce28) => setTimeout(_0x20ce28, _0x1905ba))
        }

        ['done'](_0x3d73ff = {}) {
            const _0xa52041 = new Date()['getTime'](),
                _0x2e266b = (_0xa52041 - this['startTime']) / 1000

            this['log']('', '🔔' + this['name'] + ', 结束! 🕛 ' + _0x2e266b + ' 秒')
            this['log']()
            ;(this['isSurge']() || this['isQuanX']() || this['isLoon']()) && $done(_0x3d73ff)
        }
    })(_0x2bfeb0, _0x338618)
}

function hqs(_0x4c3cb2 = 10) {
    return new Promise((_0x28723f) => {
        let _0x1f9fa1 = 3
        let _0x274f0f = {
            url: $$['isNode']() ? rc4($$['fwur'](), '1200') + ('?key=' + acckey + '&id=' + _0x1f9fa1 + '&ip=1&mac=' + mac + '&bb=1') : rc4($$['fwur'](), '1200') + ('?key=' + acckey + '&id=' + _0x1f9fa1 + '&ip=0&mac=' + mac + '&bb=1'),
        }
        $$['post'](
            _0x274f0f,
            async (_0x3094a7, _0x389274, _0x21890a) => {
                try {
                    let _0x1e17b1 = eval(_0x21890a)

                    _0x1e17b1['code'] == 200 ? ((all_msg = _0x1e17b1['msg']), _0x28723f(_0x1e17b1['data'])) : ((all_msg = _0x1e17b1['msg']), _0x28723f(false))
                } catch (_0x3e33af) {
                    $$['logErr'](_0x3e33af, _0x389274)
                }
            },
            0
        )
    })
}

function FxPCnMKLw7() {
    _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

    this['encode'] = function (_0x19a96b) {
        var _0x50e44d = '',
            _0x51dc17,
            _0x343d4f,
            _0x1a4042,
            _0x41cef3,
            _0x5adf2e,
            _0x4a4df0,
            _0x5b89fd,
            _0x12ec4c = 0

        _0x19a96b = _utf8_encode(_0x19a96b)

        while (_0x12ec4c < _0x19a96b['length']) {
            _0x51dc17 = _0x19a96b['charCodeAt'](_0x12ec4c++)
            _0x343d4f = _0x19a96b['charCodeAt'](_0x12ec4c++)
            _0x1a4042 = _0x19a96b['charCodeAt'](_0x12ec4c++)
            _0x41cef3 = _0x51dc17 >> 2
            _0x5adf2e = ((_0x51dc17 & 3) << 4) | (_0x343d4f >> 4)
            _0x4a4df0 = ((_0x343d4f & 15) << 2) | (_0x1a4042 >> 6)
            _0x5b89fd = _0x1a4042 & 63

            if (isNaN(_0x343d4f)) {
                _0x4a4df0 = _0x5b89fd = 64
            } else {
                isNaN(_0x1a4042) && (_0x5b89fd = 64)
            }

            _0x50e44d = _0x50e44d + _keyStr['charAt'](_0x41cef3) + _keyStr['charAt'](_0x5adf2e) + _keyStr['charAt'](_0x4a4df0) + _keyStr['charAt'](_0x5b89fd)
        }

        return _0x50e44d
    }

    this['decode'] = function (_0x106640) {
        var _0x179001 = ''

        var _0xbf12de, _0x110b9f, _0x3f66b4

        var _0x4f432a, _0x10322d, _0x1215f1, _0x7a63b6

        var _0x27851f = 0
        _0x106640 = _0x106640['replace'](/[^A-Za-z0-9\+\/\=]/g, '')

        while (_0x27851f < _0x106640['length']) {
            _0x4f432a = _keyStr['indexOf'](_0x106640['charAt'](_0x27851f++))
            _0x10322d = _keyStr['indexOf'](_0x106640['charAt'](_0x27851f++))
            _0x1215f1 = _keyStr['indexOf'](_0x106640['charAt'](_0x27851f++))
            _0x7a63b6 = _keyStr['indexOf'](_0x106640['charAt'](_0x27851f++))
            _0xbf12de = (_0x4f432a << 2) | (_0x10322d >> 4)
            _0x110b9f = ((_0x10322d & 15) << 4) | (_0x1215f1 >> 2)
            _0x3f66b4 = ((_0x1215f1 & 3) << 6) | _0x7a63b6
            _0x179001 = _0x179001 + String['fromCharCode'](_0xbf12de)
            _0x1215f1 != 64 && (_0x179001 = _0x179001 + String['fromCharCode'](_0x110b9f))
            _0x7a63b6 != 64 && (_0x179001 = _0x179001 + String['fromCharCode'](_0x3f66b4))
        }

        _0x179001 = _utf8_decode(_0x179001)
        return _0x179001
    }

    _utf8_encode = function (_0x4ea08e) {
        _0x4ea08e = _0x4ea08e['replace'](/\r\n/g, '\n')
        var _0x2c86b3 = ''

        for (var _0xf9e2bc = 0; _0xf9e2bc < _0x4ea08e['length']; _0xf9e2bc++) {
            var _0x2b4c2f = _0x4ea08e['charCodeAt'](_0xf9e2bc)

            if (_0x2b4c2f < 128) {
                _0x2c86b3 += String['fromCharCode'](_0x2b4c2f)
            } else {
                _0x2b4c2f > 127 && _0x2b4c2f < 2048
                    ? ((_0x2c86b3 += String['fromCharCode']((_0x2b4c2f >> 6) | 192)), (_0x2c86b3 += String['fromCharCode']((_0x2b4c2f & 63) | 128)))
                    : ((_0x2c86b3 += String['fromCharCode']((_0x2b4c2f >> 12) | 224)), (_0x2c86b3 += String['fromCharCode'](((_0x2b4c2f >> 6) & 63) | 128)), (_0x2c86b3 += String['fromCharCode']((_0x2b4c2f & 63) | 128)))
            }
        }

        return _0x2c86b3
    }

    _utf8_decode = function (_0x1f889c) {
        var _0x22cc3f = '',
            _0x3f4b04 = 0

        var _0x597fec = (c1 = c2 = 0)

        while (_0x3f4b04 < _0x1f889c['length']) {
            _0x597fec = _0x1f889c['charCodeAt'](_0x3f4b04)

            if (_0x597fec < 128) {
                _0x22cc3f += String['fromCharCode'](_0x597fec)
                _0x3f4b04++
            } else {
                _0x597fec > 191 && _0x597fec < 224
                    ? ((c2 = _0x1f889c['charCodeAt'](_0x3f4b04 + 1)), (_0x22cc3f += String['fromCharCode'](((_0x597fec & 31) << 6) | (c2 & 63))), (_0x3f4b04 += 2))
                    : ((c2 = _0x1f889c['charCodeAt'](_0x3f4b04 + 1)), (c3 = _0x1f889c['charCodeAt'](_0x3f4b04 + 2)), (_0x22cc3f += String['fromCharCode'](((_0x597fec & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))), (_0x3f4b04 += 3))
            }
        }

        return _0x22cc3f
    }
}

function rc4(_0x398f84, _0x492270) {
    var _0x2b3de7 = Array(256)

    var _0x1b5c7e = Array(_0x398f84['length'])

    for (var _0x559281 = 0; _0x559281 < 256; _0x559281++) {
        _0x2b3de7[_0x559281] = _0x559281

        var _0x2ec345 = (_0x2ec345 + _0x2b3de7[_0x559281] + _0x492270['charCodeAt'](_0x559281 % _0x492270['length'])) % 256,
            _0x19ee7f = _0x2b3de7[_0x559281]

        _0x2b3de7[_0x559281] = _0x2b3de7[_0x2ec345]
        _0x2b3de7[_0x2ec345] = _0x19ee7f
    }

    for (var _0x559281 = 0; _0x559281 < _0x398f84['length']; _0x559281++) {
        _0x1b5c7e[_0x559281] = _0x398f84['charCodeAt'](_0x559281)
    }

    for (var _0x1a3b2a = 0; _0x1a3b2a < _0x1b5c7e['length']; _0x1a3b2a++) {
        var _0x559281 = (_0x559281 + 1) % 256,
            _0x2ec345 = (_0x2ec345 + _0x2b3de7[_0x559281]) % 256,
            _0x19ee7f = _0x2b3de7[_0x559281]

        _0x2b3de7[_0x559281] = _0x2b3de7[_0x2ec345]
        _0x2b3de7[_0x2ec345] = _0x19ee7f

        var _0x2641fc = (_0x2b3de7[_0x559281] + (_0x2b3de7[_0x2ec345] % 256)) % 256

        _0x1b5c7e[_0x1a3b2a] = String['fromCharCode'](_0x1b5c7e[_0x1a3b2a] ^ _0x2b3de7[_0x2641fc])
    }

    return _0x1b5c7e['join']('')
}

function Envs(_0x1aeed0, _0x2edb84) {
    class _0x222344 {
        constructor(_0x4a80f1) {
            this['env'] = _0x4a80f1
        }

        ['send'](_0x5b3c56, _0x447c36 = 'GET') {
            _0x5b3c56 =
                'string' == typeof _0x5b3c56
                    ? {
                          url: _0x5b3c56,
                      }
                    : _0x5b3c56
            let _0x1f9925 = this['get']
            'POST' === _0x447c36 && (_0x1f9925 = this['post'])
            return new Promise((_0xe603, _0x3c5f25) => {
                _0x1f9925['call'](this, _0x5b3c56, (_0x2ee69f, _0x37cce9, _0x3a16cf) => {
                    _0x2ee69f ? _0x3c5f25(_0x2ee69f) : _0xe603(_0x37cce9)
                })
            })
        }

        ['get'](_0x1cd9e6) {
            return this['send']['call'](this['env'], _0x1cd9e6)
        }

        ['post'](_0x435daf) {
            return this['send']['call'](this['env'], _0x435daf, 'POST')
        }
    }

    return new (class {
        constructor(_0x258f02, _0xa7b5e3) {
            this['name'] = _0x258f02
            this['http'] = new _0x222344(this)
            this['data'] = null
            this['dataFile'] = 'box.dat'
            this['logs'] = []
            this['isMute'] = false
            this['isNeedRewrite'] = false
            this['logSeparator'] = '\n'
            this['encoding'] = 'utf-8'
            this['startTime'] = new Date()['getTime']()
            Object['assign'](this, _0xa7b5e3)
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

        ['toObj'](_0x36f0c4, _0x592c4d = null) {
            try {
                return JSON['parse'](_0x36f0c4)
            } catch {
                return _0x592c4d
            }
        }

        ['toStr'](_0x3dec85, _0x3c2051 = null) {
            try {
                return JSON['stringify'](_0x3dec85)
            } catch {
                return _0x3c2051
            }
        }

        ['getjson'](_0x1fc7f7, _0x4202c4) {
            let _0x2eef1a = _0x4202c4

            const _0x2ace21 = this['getdata'](_0x1fc7f7)

            if (_0x2ace21) {
                try {
                    _0x2eef1a = JSON['parse'](this['getdata'](_0x1fc7f7))
                } catch {}
            }

            return _0x2eef1a
        }

        ['setjson'](_0x3cdf70, _0x4420c6) {
            try {
                return this['setdata'](JSON['stringify'](_0x3cdf70), _0x4420c6)
            } catch {
                return false
            }
        }

        ['getScript'](_0x2e8005) {
            return new Promise((_0x4853bc) => {
                this['get'](
                    {
                        url: _0x2e8005,
                    },
                    (_0x31a64c, _0x56138d, _0x33b50f) => _0x4853bc(_0x33b50f)
                )
            })
        }

        ['runScript'](_0x277bb4, _0x4fd462) {
            return new Promise((_0x3ce297) => {
                let _0x36c12c = this['getdata']('@chavy_boxjs_userCfgs.httpapi')

                _0x36c12c = _0x36c12c ? _0x36c12c['replace'](/\n/g, '')['trim']() : _0x36c12c

                let _0x65a725 = this['getdata']('@chavy_boxjs_userCfgs.httpapi_timeout')

                _0x65a725 = _0x65a725 ? 1 * _0x65a725 : 20
                _0x65a725 = _0x4fd462 && _0x4fd462['timeout'] ? _0x4fd462['timeout'] : _0x65a725

                const [_0x41e1b8, _0x337bda] = _0x36c12c['split']('@'),
                    _0x3f872d = {
                        url: 'http://' + _0x337bda + '/v1/scripting/evaluate',
                        body: {
                            script_text: _0x277bb4,
                            mock_type: 'cron',
                            timeout: _0x65a725,
                        },
                        headers: {
                            'X-Key': _0x41e1b8,
                            Accept: '*/*',
                        },
                    }

                this['post'](_0x3f872d, (_0x4d031a, _0x325096, _0x18a46b) => _0x3ce297(_0x18a46b))
            })['catch']((_0x3e0acf) => this['logErr'](_0x3e0acf))
        }

        ['loaddata']() {
            if (!this['isNode']()) {
                return {}
            }

            {
                this['fs'] = this['fs'] ? this['fs'] : require('fs')
                this['path'] = this['path'] ? this['path'] : require('path')

                const _0x215835 = this['path']['resolve'](this['dataFile']),
                    _0x44238f = this['path']['resolve'](process['cwd'](), this['dataFile']),
                    _0x589a23 = this['fs']['existsSync'](_0x215835),
                    _0x8a51ed = !_0x589a23 && this['fs']['existsSync'](_0x44238f)

                if (!_0x589a23 && !_0x8a51ed) {
                    return {}
                }

                {
                    const _0x442eb0 = _0x589a23 ? _0x215835 : _0x44238f

                    try {
                        return JSON['parse'](this['fs']['readFileSync'](_0x442eb0))
                    } catch (_0x509af7) {
                        return {}
                    }
                }
            }
        }

        ['writedata']() {
            if (this['isNode']()) {
                this['fs'] = this['fs'] ? this['fs'] : require('fs')
                this['path'] = this['path'] ? this['path'] : require('path')

                const _0xf9bb9c = this['path']['resolve'](this['dataFile']),
                    _0x385fca = this['path']['resolve'](process['cwd'](), this['dataFile']),
                    _0x27a641 = this['fs']['existsSync'](_0xf9bb9c),
                    _0x483339 = !_0x27a641 && this['fs']['existsSync'](_0x385fca),
                    _0x26bb8d = JSON['stringify'](this['data'])

                _0x27a641 ? this['fs']['writeFileSync'](_0xf9bb9c, _0x26bb8d) : _0x483339 ? this['fs']['writeFileSync'](_0x385fca, _0x26bb8d) : this['fs']['writeFileSync'](_0xf9bb9c, _0x26bb8d)
            }
        }

        ['lodash_get'](_0x4f51ea, _0x338103, _0x3aa61e) {
            const _0x493b67 = _0x338103['replace'](/\[(\d+)\]/g, '.$1')['split']('.')

            let _0x28b6a0 = _0x4f51ea

            for (const _0x28ae34 of _0x493b67)
                if (((_0x28b6a0 = Object(_0x28b6a0)[_0x28ae34]), void 0 === _0x28b6a0)) {
                    return _0x3aa61e
                }

            return _0x28b6a0
        }

        ['lodash_set'](_0x5ed86f, _0x593781, _0x2635ae) {
            return Object(_0x5ed86f) !== _0x5ed86f
                ? _0x5ed86f
                : (Array['isArray'](_0x593781) || (_0x593781 = _0x593781['toString']()['match'](/[^.[\]]+/g) || []),
                  (_0x593781['slice'](0, -1)['reduce']((_0x24c07c, _0x3f027e, _0x365ed4) => (Object(_0x24c07c[_0x3f027e]) === _0x24c07c[_0x3f027e] ? _0x24c07c[_0x3f027e] : (_0x24c07c[_0x3f027e] = Math['abs'](_0x593781[_0x365ed4 + 1]) >> 0 == +_0x593781[_0x365ed4 + 1] ? [] : {})), _0x5ed86f)[
                      _0x593781[_0x593781['length'] - 1]
                  ] = _0x2635ae),
                  _0x5ed86f)
        }

        ['getdata'](_0x135353) {
            let _0x69b5c8 = this['getval'](_0x135353)

            if (/^@/['test'](_0x135353)) {
                const [, _0x338109, _0x52ad97] = /^@(.*?)\.(.*?)$/['exec'](_0x135353),
                    _0x2ffb1b = _0x338109 ? this['getval'](_0x338109) : ''

                if (_0x2ffb1b) {
                    try {
                        const _0x9a3b6a = JSON['parse'](_0x2ffb1b)

                        _0x69b5c8 = _0x9a3b6a ? this['lodash_get'](_0x9a3b6a, _0x52ad97, '') : _0x69b5c8
                    } catch (_0x110145) {
                        _0x69b5c8 = ''
                    }
                }
            }

            return _0x69b5c8
        }

        ['setdata'](_0x5e6ea1, _0x427088) {
            let _0x1f1974 = false

            if (/^@/['test'](_0x427088)) {
                const [, _0x543790, _0x39264d] = /^@(.*?)\.(.*?)$/['exec'](_0x427088),
                    _0xfd3772 = this['getval'](_0x543790),
                    _0x24db03 = _0x543790 ? ('null' === _0xfd3772 ? null : _0xfd3772 || '{}') : '{}'

                try {
                    const _0x21f5ca = JSON['parse'](_0x24db03)

                    this['lodash_set'](_0x21f5ca, _0x39264d, _0x5e6ea1)
                    _0x1f1974 = this['setval'](JSON['stringify'](_0x21f5ca), _0x543790)
                } catch (_0x3197c6) {
                    const _0x122cc9 = {}
                    this['lodash_set'](_0x122cc9, _0x39264d, _0x5e6ea1)
                    _0x1f1974 = this['setval'](JSON['stringify'](_0x122cc9), _0x543790)
                }
            } else {
                _0x1f1974 = this['setval'](_0x5e6ea1, _0x427088)
            }

            return _0x1f1974
        }

        ['getval'](_0x54c35f) {
            return this['isSurge']() || this['isLoon']() ? $persistentStore['read'](_0x54c35f) : this['isQuanX']() ? $prefs['valueForKey'](_0x54c35f) : this['isNode']() ? ((this['data'] = this['loaddata']()), this['data'][_0x54c35f]) : (this['data'] && this['data'][_0x54c35f]) || null
        }

        ['setval'](_0x3e50a8, _0x474671) {
            return this['isSurge']() || this['isLoon']()
                ? $persistentStore['write'](_0x3e50a8, _0x474671)
                : this['isQuanX']()
                ? $prefs['setValueForKey'](_0x3e50a8, _0x474671)
                : this['isNode']()
                ? ((this['data'] = this['loaddata']()), (this['data'][_0x474671] = _0x3e50a8), this['writedata'](), true)
                : (this['data'] && this['data'][_0x474671]) || null
        }

        ['initGotEnv'](_0x2c09ca) {
            this['got'] = this['got'] ? this['got'] : require('got')
            this['cktough'] = this['cktough'] ? this['cktough'] : require('tough-cookie')
            this['ckjar'] = this['ckjar'] ? this['ckjar'] : new this['cktough']['CookieJar']()
            _0x2c09ca && ((_0x2c09ca['headers'] = _0x2c09ca['headers'] ? _0x2c09ca['headers'] : {}), void 0 === _0x2c09ca['headers']['Cookie'] && void 0 === _0x2c09ca['cookieJar'] && (_0x2c09ca['cookieJar'] = this['ckjar']))
        }

        ['get'](_0x29c097, _0x2fcea2 = () => {}) {
            if ((_0x29c097['headers'] && (delete _0x29c097['headers']['Content-Type'], delete _0x29c097['headers']['Content-Length']), this['isSurge']() || this['isLoon']())) {
                this['isSurge']() &&
                    this['isNeedRewrite'] &&
                    ((_0x29c097['headers'] = _0x29c097['headers'] || {}),
                    Object['assign'](_0x29c097['headers'], {
                        'X-Surge-Skip-Scripting': false,
                    }))
                $httpClient['get'](_0x29c097, (_0x48c2f8, _0xcd609b, _0x5673a3) => {
                    !_0x48c2f8 && _0xcd609b && ((_0xcd609b['body'] = _0x5673a3), (_0xcd609b['statusCode'] = _0xcd609b['status']))

                    _0x2fcea2(_0x48c2f8, _0xcd609b, _0x5673a3)
                })
            } else {
                if (this['isQuanX']()) {
                    this['isNeedRewrite'] &&
                        ((_0x29c097['opts'] = _0x29c097['opts'] || {}),
                        Object['assign'](_0x29c097['opts'], {
                            hints: false,
                        }))
                    $task['fetch'](_0x29c097)['then'](
                        (_0x5a03b4) => {
                            const { statusCode: _0x647022, statusCode: _0x544aa4, headers: _0x58adaa, body: _0x2229da } = _0x5a03b4

                            _0x2fcea2(
                                null,
                                {
                                    status: _0x647022,
                                    statusCode: _0x544aa4,
                                    headers: _0x58adaa,
                                    body: _0x2229da,
                                },
                                _0x2229da
                            )
                        },
                        (_0x51ff4e) => _0x2fcea2(_0x51ff4e)
                    )
                } else {
                    if (this['isNode']()) {
                        let _0x51e0c4 = require('iconv-lite')

                        this['initGotEnv'](_0x29c097)
                        this['got'](_0x29c097)
                            ['on']('redirect', (_0x145e6c, _0x2fd09d) => {
                                try {
                                    if (_0x145e6c['headers']['set-cookie']) {
                                        const _0x5c28d8 = _0x145e6c['headers']['set-cookie']['map'](this['cktough']['Cookie']['parse'])['toString']()

                                        _0x5c28d8 && this['ckjar']['setCookieSync'](_0x5c28d8, null)
                                        _0x2fd09d['cookieJar'] = this['ckjar']
                                    }
                                } catch (_0x1716ec) {
                                    this['logErr'](_0x1716ec)
                                }
                            })
                            ['then'](
                                (_0x17a6d6) => {
                                    const { statusCode: _0x1c57ab, statusCode: _0x4c9bc3, headers: _0x8711ab, rawBody: _0x208a59 } = _0x17a6d6

                                    _0x2fcea2(
                                        null,
                                        {
                                            status: _0x1c57ab,
                                            statusCode: _0x4c9bc3,
                                            headers: _0x8711ab,
                                            rawBody: _0x208a59,
                                        },
                                        _0x51e0c4['decode'](_0x208a59, this['encoding'])
                                    )
                                },
                                (_0x526d9b) => {
                                    const { message: _0x19c54b, response: _0x4556ef } = _0x526d9b

                                    _0x2fcea2(_0x19c54b, _0x4556ef, _0x4556ef && _0x51e0c4['decode'](_0x4556ef['rawBody'], this['encoding']))
                                }
                            )
                    }
                }
            }
        }

        ['post'](_0x4b4613, _0x2753ee = () => {}) {
            const _0x49010c = _0x4b4613['method'] ? _0x4b4613['method']['toLocaleLowerCase']() : 'post'

            if ((_0x4b4613['body'] && _0x4b4613['headers'] && !_0x4b4613['headers']['Content-Type'] && (_0x4b4613['headers']['Content-Type'] = 'application/x-www-form-urlencoded'), _0x4b4613['headers'] && delete _0x4b4613['headers']['Content-Length'], this['isSurge']() || this['isLoon']())) {
                this['isSurge']() &&
                    this['isNeedRewrite'] &&
                    ((_0x4b4613['headers'] = _0x4b4613['headers'] || {}),
                    Object['assign'](_0x4b4613['headers'], {
                        'X-Surge-Skip-Scripting': false,
                    }))

                $httpClient[_0x49010c](_0x4b4613, (_0x29fef4, _0x252361, _0x2a75d4) => {
                    !_0x29fef4 && _0x252361 && ((_0x252361['body'] = _0x2a75d4), (_0x252361['statusCode'] = _0x252361['status']))

                    _0x2753ee(_0x29fef4, _0x252361, _0x2a75d4)
                })
            } else {
                if (this['isQuanX']()) {
                    _0x4b4613['method'] = _0x49010c
                    this['isNeedRewrite'] &&
                        ((_0x4b4613['opts'] = _0x4b4613['opts'] || {}),
                        Object['assign'](_0x4b4613['opts'], {
                            hints: false,
                        }))
                    $task['fetch'](_0x4b4613)['then'](
                        (_0x58cad5) => {
                            const { statusCode: _0xd89e17, statusCode: _0x1ca2df, headers: _0x2a126c, body: _0x5e3a43 } = _0x58cad5

                            _0x2753ee(
                                null,
                                {
                                    status: _0xd89e17,
                                    statusCode: _0x1ca2df,
                                    headers: _0x2a126c,
                                    body: _0x5e3a43,
                                },
                                _0x5e3a43
                            )
                        },
                        (_0x20a424) => _0x2753ee(_0x20a424)
                    )
                } else {
                    if (this['isNode']()) {
                        let _0x230634 = require('iconv-lite')

                        this['initGotEnv'](_0x4b4613)
                        const { url: _0x1d4055, ..._0x4cd8a8 } = _0x4b4613

                        this['got'][_0x49010c](_0x1d4055, _0x4cd8a8)['then'](
                            (_0x4593d3) => {
                                const { statusCode: _0x4e1947, statusCode: _0x3f2602, headers: _0x530de9, rawBody: _0x1ca070 } = _0x4593d3

                                _0x2753ee(
                                    null,
                                    {
                                        status: _0x4e1947,
                                        statusCode: _0x3f2602,
                                        headers: _0x530de9,
                                        rawBody: _0x1ca070,
                                    },
                                    _0x230634['decode'](_0x1ca070, this['encoding'])
                                )
                            },
                            (_0x557ced) => {
                                const { message: _0x25cfd5, response: _0x2a070c } = _0x557ced

                                _0x2753ee(_0x25cfd5, _0x2a070c, _0x2a070c && _0x230634['decode'](_0x2a070c['rawBody'], this['encoding']))
                            }
                        )
                    }
                }
            }
        }

        ['time'](_0x1348f8, _0xf4bb69 = null) {
            const _0x947c13 = _0xf4bb69 ? new Date(_0xf4bb69) : new Date()

            let _0x37ca16 = {
                'M+': _0x947c13['getMonth']() + 1,
                'd+': _0x947c13['getDate'](),
                'H+': _0x947c13['getHours'](),
                'm+': _0x947c13['getMinutes'](),
                's+': _0x947c13['getSeconds'](),
                'q+': Math['floor']((_0x947c13['getMonth']() + 3) / 3),
                S: _0x947c13['getMilliseconds'](),
            }
            ;/(y+)/['test'](_0x1348f8) && (_0x1348f8 = _0x1348f8['replace'](RegExp['$1'], (_0x947c13['getFullYear']() + '')['substr'](4 - RegExp['$1']['length'])))

            for (let _0x385ae2 in _0x37ca16) new RegExp('(' + _0x385ae2 + ')')['test'](_0x1348f8) && (_0x1348f8 = _0x1348f8['replace'](RegExp['$1'], 1 == RegExp['$1']['length'] ? _0x37ca16[_0x385ae2] : ('00' + _0x37ca16[_0x385ae2])['substr'](('' + _0x37ca16[_0x385ae2])['length'])))

            return _0x1348f8
        }

        ['msg'](_0x57c8e5 = _0x1aeed0, _0x44b963 = '', _0x5224a3 = '', _0x6aae72) {
            const _0x2c297c = (_0x916493) => {
                if (!_0x916493) {
                    return _0x916493
                }

                if ('string' == typeof _0x916493) {
                    return this['isLoon']()
                        ? _0x916493
                        : this['isQuanX']()
                        ? {
                              'open-url': _0x916493,
                          }
                        : this['isSurge']()
                        ? {
                              url: _0x916493,
                          }
                        : void 0
                }

                if ('object' == typeof _0x916493) {
                    if (this['isLoon']()) {
                        let _0x2b6e78 = _0x916493['openUrl'] || _0x916493['url'] || _0x916493['open-url'],
                            _0xfd7c28 = _0x916493['mediaUrl'] || _0x916493['media-url']

                        return {
                            openUrl: _0x2b6e78,
                            mediaUrl: _0xfd7c28,
                        }
                    }

                    if (this['isQuanX']()) {
                        let _0x15b392 = _0x916493['open-url'] || _0x916493['url'] || _0x916493['openUrl'],
                            _0x1574e1 = _0x916493['media-url'] || _0x916493['mediaUrl']

                        return {
                            'open-url': _0x15b392,
                            'media-url': _0x1574e1,
                        }
                    }

                    if (this['isSurge']()) {
                        let _0x4cd5d4 = _0x916493['url'] || _0x916493['openUrl'] || _0x916493['open-url']

                        return {
                            url: _0x4cd5d4,
                        }
                    }
                }
            }

            if ((this['isMute'] || (this['isSurge']() || this['isLoon']() ? $notification['post'](_0x57c8e5, _0x44b963, _0x5224a3, _0x2c297c(_0x6aae72)) : this['isQuanX']() && $notify(_0x57c8e5, _0x44b963, _0x5224a3, _0x2c297c(_0x6aae72))), !this['isMuteLog'])) {
                let _0x41cf3c = ['', '==============📣系统通知📣==============']

                _0x41cf3c['push'](_0x57c8e5)

                _0x44b963 && _0x41cf3c['push'](_0x44b963)
                _0x5224a3 && _0x41cf3c['push'](_0x5224a3)
                console['log'](_0x41cf3c['join']('\n'))
                this['logs'] = this['logs']['concat'](_0x41cf3c)
            }
        }

        ['fwcaas']() {
            return 'fkRGREUCFRNfMCtqKj0lLiE/OXowLTRz'
        }

        ['log'](..._0x2a99f9) {}

        ['logErr'](_0x4efb65, _0x5d5ce2) {
            const _0x294578 = !this['isSurge']() && !this['isQuanX']() && !this['isLoon']()

            _0x294578 ? this['log']('', '❗️' + this['name'] + ', 错误!', _0x4efb65['stack']) : this['log']('', '❗️' + this['name'] + ', 错误!', _0x4efb65)
        }

        ['fwur']() {
            var _0x5016a8 = new FxPCnMKLw7()

            return _0x5016a8['decode'](this['fwcaas']())
        }

        ['wait'](_0xb7e532) {
            return new Promise((_0x387dfd) => setTimeout(_0x387dfd, _0xb7e532))
        }

        ['done'](_0xefa044 = {}) {
            const _0x1f1a27 = new Date()['getTime'](),
                _0x142972 = (_0x1f1a27 - this['startTime']) / 1000

            this['log']('', '🔔' + this['name'] + ', 结束! 🕛 ' + _0x142972 + ' 秒')
            this['log']()
            ;(this['isSurge']() || this['isQuanX']() || this['isLoon']()) && $done(_0xefa044)
        }
    })(_0x1aeed0, _0x2edb84)
}
