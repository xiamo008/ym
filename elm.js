/*@萝卜
APP : 饿了么
饿了么吃货豆，需要点外卖同学的福利
脚本说明：目前只支持部分任务，500，1000吃货豆换无门槛外卖红包
重写：https://h5.ele.me/svip/task-list url script-request-header https://cdn.jsdelivr.net/gh/LubooC/Script@main/ELM/elmchd.js
青龙环境变量  export elmck='.............'
抓包 h5.ele.me 域名下的任何url 请求头中的Cookie
获取数据 饿了么App->我的-> 赚吃货豆
多账户 @
脚本cron  59 9,18 * * * 

4/20 更新：新增抢兑换优惠券，参与瓜分吃货豆
变量：elmdh 兑换设置，默认为false,开启兑换，如需开启兑换，请设置为true
变量：SM_STARTTIME 值:默认为60，当为60时，9点59分运行脚本，10点准时开枪，如果网络慢可以设置为59，则9点59分59秒开抢。
*/
const $ = new Env("饿了么吃货豆");
let status;
const notify = $["isNode"]() ? require("./sendNotify") : '';
status = (status = $["getval"]("fhxzstatus") || "1") > 1 ? '' + status : '';
let elmckArr = [],
    allMessage = '';
let elmck = $["isNode"]() ? process["env"]["elmck"] ? process["env"]["elmck"] : '' : $["getdata"]("elmck") ? $["getdata"]("elmck") : '';
let elmdh = $["isNode"]() ? process["env"]["elmdh"] ? process["env"]["elmdh"] : "false" : $["getdata"]("elmdh") ? $["getdata"]("elmdh") : "false",
    elmcks = '',
    acceptTagCode,
    queryTagCode,
    num = rand(10, 99);
let ownerId = "bfb0188",
    umidToken = "defaultToken1_um_not_loaded@@https://tb.ele.me/wow/alsc/mod/d5275789de46503ba0908a9d@@" + Date["now"](),
    ua = "defaultUA1_uab_not_loaded@@https://tb.ele.me/wow/alsc/mod/d5275789de46503ba0908a9d@@" + Date["now"]();
$["isNode"]() && (Date["prototype"]["Format"] = function (_0x3f409a) {
  var _0x2a6c2f = {
    "M+": this["getMonth"]() + 1,
    "d+": this["getDate"](),
    "h+": this["getHours"](),
    "m+": this["getMinutes"](),
    "s+": this["getSeconds"](),
    "S": this["getMilliseconds"]()
  };

  if (/(y+)/["test"](_0x3f409a)) {
    _0x3f409a = _0x3f409a["replace"](RegExp["$1"], (this["getFullYear"]() + '')["substr"](4 - RegExp["$1"]["length"]));
  }

  for (var _0x534b28 in _0x2a6c2f) if (new RegExp("(" + _0x534b28 + ")")["test"](_0x3f409a)) {
    _0x3f409a = _0x3f409a["replace"](RegExp["$1"], RegExp["$1"]["length"] == 1 ? _0x2a6c2f[_0x534b28] : ("00" + _0x2a6c2f[_0x534b28])["substr"](('' + _0x2a6c2f[_0x534b28])["length"]));
  }

  return _0x3f409a;
});
!(async () => {
  if (typeof $request !== "undefined") {
    fhxzck();
  } else {
    if (!$["isNode"]()) {
      elmckArr["push"]($["getdata"]("elmck"));

      let _0x513a14 = $["getval"]("elmcount") || "1";

      for (let _0x4e6d07 = 2; _0x4e6d07 <= _0x513a14; _0x4e6d07++) {
        elmckArr["push"]($["getdata"]("elmck" + _0x4e6d07));
      }

      await qswcdl();
    } else {
      process["env"]["elmck"] && process["env"]["elmck"]["indexOf"]("@") > -1 ? (elmckArr = process["env"]["elmck"]["split"]("@"), console["log"]("您选择的是用\"@\"隔开\n")) : elmcks = [process["env"]["elmck"]];
      Object["keys"](elmcks)["forEach"](_0x59b14f => {
        elmcks[_0x59b14f] && elmckArr["push"](elmcks[_0x59b14f]);
      });
      await qswcdl();
      await notify["sendNotify"]("饿了么吃货豆", '' + allMessage, '');
    }
  }
})()["catch"](_0x2198eb => $["logErr"](_0x2198eb))["finally"](() => $["done"]());

function fhxzck() {
  if ($request["url"]["indexOf"]("svip") > -1) {
    const _0x5b14a0 = $request["headers"]["Cookie"];

    if (_0x5b14a0) {
      $["setdata"](_0x5b14a0, "elmck" + status);
    }

    $["log"](_0x5b14a0);
    $["msg"]($["name"], '', "饿了么" + status + "数据获取成功");
  }
}

function qswcdl(_0x1a3111 = 0) {
  return new Promise(_0x4ffba9 => {
    let _0x19b671 = {
      "url": "https://luobook.coding.net/p/code.json/d/luobook/git/raw/master/code.json",
      "headers": ''
    };
    $["get"](_0x19b671, async (_0x18c16b, _0x146ad1, _0x596dac) => {
      try {
        _0x596dac = JSON["parse"](_0x596dac);

        if (_0x596dac["elmcode1"] == 1) {
          _0x596dac["umidToken"] != undefined && (umidToken = _0x596dac["umidToken"], ua = _0x596dac["ua"]);
          ownerId = _0x596dac["ownerId"];
          console["log"]("\n脚本状态：" + _0x596dac["elmmsgi1"]);
          allMessage += '';
          allMessage += "\n脚本状态：" + _0x596dac["elmmsgi1"];
          console["log"]("\n不领取下单任务，长期领取不完成账号会降权！！！！！");
          allMessage += "\n不领取下单任务，长期领取不完成账号会降权！！！！！";
          console["log"]("共" + elmckArr["length"] + "个账号");

          if ($["isNode"]()) {
            if (elmdh == "true") {
              console["log"]("\n当前设置兑换优惠券");
              allMessage += "\n当前设置兑换优惠券";

              for (let _0x548f8d = 0; _0x548f8d < elmckArr["length"]; _0x548f8d++) {
                $["message"] = '';
                elmck = elmckArr[_0x548f8d];
                $["index"] = _0x548f8d + 1;
                console["log"]("\n开始【饿了么账户兑换 " + $["index"] + "】");
                allMessage += "\n开始【饿了么账户兑换 " + $["index"] + "】";
                PrizeIndex(elmck);
              }
            } else {
              console["log"]("\n当前设置不兑换优惠券");
              allMessage += "\n当前设置不兑换优惠券";
            }
          } else {
            console["log"]("\n代理环境不支持秒抢功能");
            allMessage += "\n代理环境不支持秒抢功能";
          }

          for (let _0x4a2a61 = 0; _0x4a2a61 < elmckArr["length"]; _0x4a2a61++) {
            $["message"] = '';
            elmck = elmckArr[_0x4a2a61];
            $["index"] = _0x4a2a61 + 1;
            console["log"]("\n开始【饿了么账户 " + $["index"] + "】");
            allMessage += "\n开始【饿了么账户 " + $["index"] + "】";
            await user();
            $["log"]("------------------任务结束------------------");
          }

          allMessage += "\n";
        } else {
          console["log"]("脚本状态:" + _0x596dac["elmmsg1"]);
          allMessage += "\n脚本状态:" + _0x596dac["elmmsg1"];
        }
      } catch (_0x3bb8b9) {
        $["logErr"](_0x3bb8b9, _0x146ad1);
      } finally {
        _0x4ffba9();
      }
    }, 0);
  });
}

async function PrizeIndex(_0x18fb29) {
  let _0x24f3ee = new Date()["Format"]("s.S"),
      _0x229350 = $["isNode"]() ? process["env"]["SM_STARTTIME"] ? process["env"]["SM_STARTTIME"] * 1 : 60 : $["getdata"]("SM_STARTTIME") ? $["getdata"]("SM_STARTTIME") * 1 : 60;

  if (_0x24f3ee < 59) {
    let _0x286191 = (_0x229350 - _0x24f3ee) * 1000;

    console["log"]("\n整点兑换等待时间 " + _0x286191 / 1000);
    await sleep(_0x286191);
  }

  await svip_scene(_0x18fb29);
}

function sleep(_0x3de22c) {
  return new Promise(_0x1f998b => setTimeout(_0x1f998b, _0x3de22c));
}

function svip_scene(_0x518528) {
  return new Promise(_0x17416b => {
    let _0x1152d8 = {
      "url": "https://h5.ele.me/restapi/biz.svip_scene/svip/engine/xSupply?params[]=%7B%22tagCode%22:%2243002%22,%22supplyInst%22:%2243002%7C178006%22,%22extra%22:%7B%22costFoodiePea%22:1000%7D%7D&bizCode=biz_code_main&longitude=113.38713836669" + num + "&latitude=22.931276321411" + num,
      "headers": {
        "Cookie": _0x518528,
        "Host": "h5.ele.me",
        "f-refer": "wv_h5",
        "Accept": "application/json, text/plain, */*",
        "x-shard": "loc=113.387" + num + "041531943,22.931" + num + "970003977",
        "bx-umidToken": umidToken,
        "bx-ua": ua,
        "f-pTraceId": "WVNet_WV_2-3-30",
        "Accept-Language": "zh-cn",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json;charset=utf-8",
        "Origin": "https://tb.ele.me",
        "x-ua": "RenderWay/H5 AppName/elmc DeviceId/2423E" + num + "9-E718-48E0-" + num + "9B-8AF98332514E AppExtraInfo/%7B%22miniWua%22%3A%22HHnB_trF4qnXd7LBb1W7aTfbQadftHWJ%2BMg4rvN%2FalAHEZTC%2BerivaAPHBKR4lQ3HSPXDH9vbyVUHKsUvvKe8yrOaRJh1q5faiUwYONdp9G7Xqh7c4OyAaTzONYqZvnlRdg98KPMpv%2Fzs8fjbJiHjWqqRyruhKfS8iHhdyQ2QkCo%2By6s%3D%22%2C%22umidToken%22%3A%22zjdL%2Fh9LOnj3PzV9ZlUgfYV2c4wnliyM%22%2C%22ttid%22%3A%22201200%40eleme_iphone_10.0.5%22%2C%22deviceUUID%22%3A%222423E699-E718-48E0-999B-8AF98332514E%22%2C%22utdid%22%3A%22YZ2hE01GigMDAEmsd67%2FkXGZ%22%7D Longitude/113.387" + num + "041531943 Latitude/22.931" + num + "970003977",
        "Connection": "keep-alive"
      }
    };
    $["get"](_0x1152d8, async (_0x2ac55f, _0x443c63, _0x4c726b) => {
      try {
        let _0x16daf5 = JSON["parse"](_0x4c726b);

        _0x16daf5["code"] ? _0x16daf5["data"][0]["xstatus"] == 1 ? (console["log"]("\n🔔10元无门槛优惠卷兑换成功\n"), allMessage += "\n🔔10元无门槛优惠卷兑换成功\n") : (console["log"]("\n🕛无门槛优惠卷兑换失败：" + _0x16daf5["data"][0]["xmessage"] + "\n"), allMessage += "\n🕛无门槛优惠卷兑换失败：" + _0x16daf5["data"][0]["xmessage"] + "\n") : console["log"](_0x4c726b);
      } catch (_0x5d7f7c) {
        $["logErr"](_0x5d7f7c, _0x443c63);
      } finally {
        _0x17416b();
      }
    }, 0);
  });
}

function home_ch_tasklist() {
  return new Promise(_0x42f485 => {
    let _0x4866ab = {
      "url": "https://h5.ele.me/restapi/biz.growth_finetune/v1/finetune/operate?bizScenarioCode=home_ch_tasklist&longitude=113.38713836669" + num + "&latitude=22.931276321411" + num,
      "headers": {
        "Cookie": elmck
      }
    };
    $["get"](_0x4866ab, async (_0x22462f, _0x273f03, _0x3e592a) => {
      try {
        let _0xa3a210 = JSON["parse"](_0x3e592a);

        actId = _0xa3a210["outputJson"]["moduleList"]["find"](_0x4b89e7 => _0x4b89e7["content"]["$attr"]["title"] == "瓜分吃货豆")["content"]["$attr"]["actId"];
        actId && (await gfd(actId));
      } catch (_0x267b90) {
        $["logErr"](_0x267b90, _0x273f03);
      } finally {
        _0x42f485();
      }
    }, 0);
  });
}

function gfd(_0x2438a2) {
  return new Promise(_0x5792a5 => {
    let _0x28066c = {
      "url": "https://h5.ele.me/restapi/biz.svip_scene/svip/engine/queryTrafficSupply?tagParams=[{\"tagCode\":\"347079\",\"extra\":{\"solutionType\":\"QUERY\",\"actId\":\"" + _0x2438a2 + "\",\"sceneCode\":\"divide_chd_interact\",\"client\":\"eleme\"}}]&bizCode=biz_card_main&longitude=113.38713836669" + num + "&latitude=22.931276321411" + num,
      "headers": {
        "Cookie": elmck
      }
    };
    $["get"](_0x28066c, async (_0x59817e, _0x3e1b3a, _0x5a35ee) => {
      try {
        let _0x2fa5af = JSON["parse"](_0x5a35ee);

        if (_0x2fa5af["code"] == 200) {
          let _0x286512 = _0x2fa5af["data"][0]["data"][0]["attribute"];
          console["log"]("\n当前瓜分吃货豆:" + _0x286512["lastActInfo"]["lastJackPotCount"] + ",参加人数：" + _0x286512["lastActInfo"]["lastEnrollCount"]);
          allMessage += "\n当前瓜分吃货豆:" + _0x286512["lastActInfo"]["lastJackPotCount"] + ",参加人数：" + _0x286512["lastActInfo"]["lastEnrollCount"];

          if (_0x286512["userStatus"] == 0 && _0x286512["isToReceive"]) {
            console["log"]("\n当前待领取");
            allMessage += "\n当前待领取";
            let _0x98f95e = _0x286512["lastActInfo"]["lastPhaseId"],
                _0x540553 = _0x286512["lastPrizeInfo"]["amount"];
            await xSupply(_0x98f95e, _0x2438a2, _0x540553);
          } else {
            if (_0x286512["userStatus"] == 10) {
              console["log"]("\n当前已报名，预计分得吃货豆：" + parseInt(_0x286512["lastActInfo"]["lastJackPotCount"] / _0x286512["lastActInfo"]["lastEnrollCount"]));
              allMessage += "\n当前已报名，预计分得吃货豆：" + parseInt(_0x286512["lastActInfo"]["lastJackPotCount"] / _0x286512["lastActInfo"]["lastEnrollCount"]);
            } else {
              if (_0x286512["userStatus"] == 0 && _0x286512["isToReceive"] == false) {
                console["log"]("\n当前待报名");
                allMessage += "\n当前待报名";
                let _0xe8e8d9 = _0x286512["lastActInfo"]["lastPhaseId"];
                await asac(_0xe8e8d9, _0x2438a2, _0x286512["safeCode"]);
              }
            }
          }
        }
      } catch (_0x38fee4) {
        $["logErr"](_0x38fee4, _0x3e1b3a);
      } finally {
        _0x5792a5();
      }
    }, 0);
  });
}

function asac(_0x2a8e74, _0x48cc4f, _0x574db3) {
  return new Promise(_0x80201d => {
    let _0x4c75e3 = {
      "url": "https://h5.ele.me/restapi/biz.svip_scene/svip/engine/xSupply?asac=" + _0x574db3,
      "headers": {
        "Cookie": elmck,
        "Host": "h5.ele.me",
        "f-refer": "wv_h5",
        "Accept": "application/json, text/plain, */*",
        "x-shard": "loc=113.387" + num + "041531943,22.931" + num + "970003977",
        "bx-umidToken": umidToken,
        "bx-ua": ua,
        "f-pTraceId": "WVNet_WV_2-3-30",
        "Accept-Language": "zh-cn",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json;charset=utf-8",
        "Origin": "https://tb.ele.me",
        "x-ua": "RenderWay/H5 AppName/elmc DeviceId/2423E" + num + "9-E718-48E0-" + num + "9B-8AF98332514E AppExtraInfo/%7B%22miniWua%22%3A%22HHnB_trF4qnXd7LBb1W7aTfbQadftHWJ%2BMg4rvN%2FalAHEZTC%2BerivaAPHBKR4lQ3HSPXDH9vbyVUHKsUvvKe8yrOaRJh1q5faiUwYONdp9G7Xqh7c4OyAaTzONYqZvnlRdg98KPMpv%2Fzs8fjbJiHjWqqRyruhKfS8iHhdyQ2QkCo%2By6s%3D%22%2C%22umidToken%22%3A%22zjdL%2Fh9LOnj3PzV9ZlUgfYV2c4wnliyM%22%2C%22ttid%22%3A%22201200%40eleme_iphone_10.0.5%22%2C%22deviceUUID%22%3A%222423E699-E718-48E0-999B-8AF98332514E%22%2C%22utdid%22%3A%22YZ2hE01GigMDAEmsd67%2FkXGZ%22%7D Longitude/113.387" + num + "041531943 Latitude/22.931" + num + "970003977",
        "Connection": "keep-alive"
      },
      "body": "{\"params\":[{\"tagCode\":\"381410\",\"extra\":{\"solutionType\":\"ENROLL\",\"phaseId\":" + _0x2a8e74 + ",\"actId\":\"" + _0x48cc4f + "\",\"sceneCode\":\"divide_chd_interact\",\"client\":\"eleme\"}}],\"bizCode\":\"biz_card_main\",\"longitude\":113.38713836669" + num + ",\"latitude\":22.931276321411" + num + "}"
    };
    $["post"](_0x4c75e3, async (_0x4e0a7e, _0x50cda8, _0x3d93e3) => {
      try {
        let _0x161a64 = JSON["parse"](_0x3d93e3);

        _0x161a64["code"] == 200 ? (console["log"]("\n瓜分参与成功"), allMessage += "\n瓜分参与成功") : (console["log"]("\n瓜分参与失败：" + _0x161a64["message"]), allMessage += "\n瓜分参与失败：" + _0x161a64["message"]);
      } catch (_0x42cd26) {
        $["logErr"](_0x42cd26, _0x50cda8);
      } finally {
        _0x80201d();
      }
    }, 0);
  });
}

function xSupply(_0x569b29, _0x9f751d, _0x4923c3) {
  return new Promise(_0x37ea96 => {
    let _0x47b4b2 = {
      "url": "https://h5.ele.me/restapi/biz.svip_scene/svip/engine/xSupply",
      "headers": {
        "Cookie": elmck,
        "Host": "h5.ele.me",
        "f-refer": "wv_h5",
        "Accept": "application/json, text/plain, */*",
        "x-shard": "loc=113.387" + num + "041531943,22.931" + num + "970003977",
        "bx-umidToken": umidToken,
        "bx-ua": ua,
        "f-pTraceId": "WVNet_WV_2-3-30",
        "Accept-Language": "zh-cn",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json;charset=utf-8",
        "Origin": "https://tb.ele.me",
        "x-ua": "RenderWay/H5 AppName/elmc DeviceId/2423E" + num + "9-E718-48E0-" + num + "9B-8AF98332514E AppExtraInfo/%7B%22miniWua%22%3A%22HHnB_trF4qnXd7LBb1W7aTfbQadftHWJ%2BMg4rvN%2FalAHEZTC%2BerivaAPHBKR4lQ3HSPXDH9vbyVUHKsUvvKe8yrOaRJh1q5faiUwYONdp9G7Xqh7c4OyAaTzONYqZvnlRdg98KPMpv%2Fzs8fjbJiHjWqqRyruhKfS8iHhdyQ2QkCo%2By6s%3D%22%2C%22umidToken%22%3A%22zjdL%2Fh9LOnj3PzV9ZlUgfYV2c4wnliyM%22%2C%22ttid%22%3A%22201200%40eleme_iphone_10.0.5%22%2C%22deviceUUID%22%3A%222423E699-E718-48E0-999B-8AF98332514E%22%2C%22utdid%22%3A%22YZ2hE01GigMDAEmsd67%2FkXGZ%22%7D Longitude/113.387" + num + "041531943 Latitude/22.931" + num + "970003977",
        "Connection": "keep-alive"
      },
      "body": "{\"params\":[{\"tagCode\":\"427048\",\"extra\":{\"solutionType\":\"RECEIVE_PRIZE\",\"phaseId\":" + _0x569b29 + ",\"actId\":\"" + _0x9f751d + "\",\"sceneCode\":\"divide_chd_interact\",\"amount\":" + _0x4923c3 + "}}],\"bizCode\":\"biz_card_main\",\"longitude\":113.38713836669" + num + ",\"latitude\":22.931276321411" + num + "}"
    };
    $["post"](_0x47b4b2, async (_0x33d962, _0x40ed54, _0x58ec1f) => {
      try {
        let _0x290fff = JSON["parse"](_0x58ec1f);

        _0x290fff["code"] == 200 ? (console["log"]("\n瓜分领取成功：" + _0x4923c3 + "吃货豆"), allMessage += "\n瓜分领取成功：" + _0x4923c3 + "吃货豆") : (console["log"]("\n瓜分领取失败：" + _0x290fff["message"]), allMessage += "\n瓜分领取失败：" + _0x290fff["message"]);
      } catch (_0xb7a252) {
        $["logErr"](_0xb7a252, _0x40ed54);
      } finally {
        _0x37ea96();
      }
    }, 0);
  });
}

function tagcode() {
  return new Promise(_0x481cc7 => {
    let _0x53a7f0 = {
      "url": "https://h5.ele.me/restapi/biz.growth_finetune/v1/finetune/operate?bizScenarioCode=home_ch_tasklist&longitude=113.387138366699" + num + "&latitude=22.9312763214111" + num,
      "headers": {
        "Cookie": elmck
      }
    };
    $["get"](_0x53a7f0, async (_0xd911cd, _0x551ba4, _0x2045f2) => {
      try {
        let _0x4af1dd = JSON["parse"](_0x2045f2);

        _0x4af1dd["success"] && (queryTagCode = _0x4af1dd["outputJson"]["moduleList"]["find"](_0x5c63fa => _0x5c63fa["content"]["$attr"]["queryTagCode"])["content"]["$attr"]["queryTagCode"], acceptTagCode = _0x4af1dd["outputJson"]["moduleList"]["find"](_0x2c12e0 => _0x2c12e0["content"]["$attr"]["acceptTagCode"])["content"]["$attr"]["acceptTagCode"], console["log"]("tagCode获取成功"), allMessage += "\ntagCode获取成功");
      } catch (_0x5ecdf4) {
        $["logErr"](_0x5ecdf4, _0x551ba4);
      } finally {
        _0x481cc7();
      }
    }, 0);
  });
}

function user() {
  return new Promise(_0x2eeaaa => {
    let _0x359e1a = {
      "url": "https://h5.ele.me/restapi/biz.svip_bonus/v1/users/supervip/pea/queryAccountBalance?types=[%22PEA_ACCOUNT%22]&longitude=113.387138366699" + num + "&latitude=22.9312763214111" + num,
      "headers": {
        "Cookie": elmck
      }
    };
    $["get"](_0x359e1a, async (_0x18eb90, _0x1d1450, _0x2d599a) => {
      try {
        let _0x4e32e9 = JSON["parse"](_0x2d599a);

        if (_0x4e32e9["success"]) {
          let _0x321594 = 0;
          _0x4e32e9["accountInfos"]["length"] != 0 && (_0x321594 = _0x4e32e9["accountInfos"][0]["count"]);
          console["log"]("当前吃货豆：" + _0x321594);
          allMessage += "\n当前吃货豆：" + _0x321594;
          await tagcode();
          await $["wait"](500);
          await supportor();
          await home_ch_tasklist();
          console["log"]("获取任务【目前只支持部分任务】");
          allMessage += "\n获取任务【目前只支持部分任务】";
          await menu();
          console["log"]("任务已完成");
          allMessage += "\n任务已完成";
          await userend();
        } else {
          console["log"]("未登录，请检查CK");
          allMessage += "\n未登录，请检查CK";
        }
      } catch (_0x4c1c87) {
        $["logErr"](_0x4c1c87, _0x1d1450);
      } finally {
        _0x2eeaaa();
      }
    }, 0);
  });
}

function userend() {
  return new Promise(_0x59ce0e => {
    let _0x1a2dca = {
      "url": "https://h5.ele.me/restapi/biz.svip_bonus/v1/users/supervip/pea/queryAccountBalance?types=[%22PEA_ACCOUNT%22]&longitude=113.387138366699" + num + "&latitude=22.9312763214111" + num,
      "headers": {
        "Cookie": elmck
      }
    };
    $["get"](_0x1a2dca, async (_0xb3a5c8, _0x46e1eb, _0x290f30) => {
      try {
        let _0x1d98ca = JSON["parse"](_0x290f30);

        _0x1d98ca["success"] && (console["log"]("当前吃货豆：" + _0x1d98ca["accountInfos"][0]["count"]), allMessage += "\n当前吃货豆：" + _0x1d98ca["accountInfos"][0]["count"]);
      } catch (_0x18ed89) {
        $["logErr"](_0x18ed89, _0x46e1eb);
      } finally {
        _0x59ce0e();
      }
    }, 0);
  });
}

function getLocalTime(_0x55a6a0) {
  return new Date(parseInt(_0x55a6a0) * 1000)["toLocaleString"]()["replace"](/:\d{1,2}$/, " ");
}

function supportor() {
  return new Promise(_0x3d76ca => {
    let _0x18ecde = {
      "url": "https://h5.ele.me/restapi/alpaca/v1/recommend/supportor",
      "body": "{\"ownerId\":\"" + ownerId + "\",\"fromOfficialAccount\":false,\"referUserId\":\"\",\"restaurantId\":\"\",\"referCode\":\"\",\"referChannelCode\":\"\",\"referChannelType\":\"\",\"fromWeChatApp\":false,\"bizType\":\"1\",\"v\":\"2.9\",\"chInfo\":\"ch_app_chsub_Photo\",\"actId\":\"1\",\"longitude\":113.387138366699" + num + ",\"latitude\":22.9312763214111" + num + "}",
      "headers": {
        "Cookie": elmck,
        "Host": "h5.ele.me",
        "f-refer": "wv_h5",
        "Accept": "application/json, text/plain, */*",
        "x-shard": "loc=113.387" + num + "041531943,22.931" + num + "970003977",
        "bx-umidToken": umidToken,
        "bx-ua": ua,
        "f-pTraceId": "WVNet_WV_2-3-30",
        "Accept-Language": "zh-cn",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json;charset=utf-8",
        "Origin": "https://tb.ele.me",
        "x-ua": "RenderWay/H5 AppName/elmc DeviceId/2423E" + num + "9-E718-48E0-" + num + "9B-8AF98332514E AppExtraInfo/%7B%22miniWua%22%3A%22HHnB_trF4qnXd7LBb1W7aTfbQadftHWJ%2BMg4rvN%2FalAHEZTC%2BerivaAPHBKR4lQ3HSPXDH9vbyVUHKsUvvKe8yrOaRJh1q5faiUwYONdp9G7Xqh7c4OyAaTzONYqZvnlRdg98KPMpv%2Fzs8fjbJiHjWqqRyruhKfS8iHhdyQ2QkCo%2By6s%3D%22%2C%22umidToken%22%3A%22zjdL%2Fh9LOnj3PzV9ZlUgfYV2c4wnliyM%22%2C%22ttid%22%3A%22201200%40eleme_iphone_10.0.5%22%2C%22deviceUUID%22%3A%222423E699-E718-48E0-999B-8AF98332514E%22%2C%22utdid%22%3A%22YZ2hE01GigMDAEmsd67%2FkXGZ%22%7D Longitude/113.387" + num + "041531943 Latitude/22.931" + num + "970003977",
        "Connection": "keep-alive"
      }
    };
    $["post"](_0x18ecde, async (_0x1c1e75, _0x4445ad, _0x5bff93) => {
      try {
        let _0x4ed480 = JSON["parse"](_0x5bff93);

        _0x4ed480["code"] != 0 ? (console["log"](_0x4ed480["message"]), allMessage += "\n" + _0x4ed480["message"]) : (console["log"]("获得：吃货联盟红包满" + _0x4ed480["data"]["couponCondition"] / 100 + "减" + _0x4ed480["data"]["couponAmount"] / 100 + ",过期时间：" + getLocalTime(_0x4ed480["data"]["couponEndTime"])), allMessage += "\n获得：吃货联盟红包满" + _0x4ed480["data"]["couponCondition"] / 100 + "减" + _0x4ed480["data"]["couponAmount"] / 100 + ",过期时间：" + getLocalTime(_0x4ed480["data"]["couponEndTime"]));
      } catch (_0x274c40) {
        $["logErr"](_0x274c40, _0x4445ad);
      } finally {
        _0x3d76ca();
      }
    }, 0);
  });
}

function supportoraff() {
  return new Promise(_0x1089e2 => {
    let _0x254788 = {
      "url": "https://h5.ele.me/restapi/alpaca/v1/livecode/scancode?id=675&p=open_type%3Dminiapp%26inviterId%3D" + ownerId + "%26actId%3D1%26_ltracker_f%3Dhjb_app_grzx%26chInfo%3Dch_app_chsub_Photo",
      "headers": {
        "Cookie": elmck,
        "Host": "h5.ele.me",
        "Content-Type": "application/json; charset=utf-8",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "f-refer": "wv_h5",
        "Accept": "*/*",
        "User-Agent": "Rajax/1 Apple/iPhone12,1 iOS/14.2 Eleme/10.0.5 ID/2423E6" + num + "-E718-48E0-999B-8AF98332514E; IsJailbroken/1 ASI/E" + num + "69D4C-6979-416E-A9DC-02FC21E319B6 Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 AliApp(ELMC/10.0.5) UT4Aplus/0.0.6 WindVane/8.7.2 828x1792 WK",
        "Referer": "https://h5.ele.me/ant/qrcode3/?open_type=miniapp&url_id=675&inviterId=" + ownerId + "&actId=1&_ltracker_f=hjb_app_grzx&chInfo=ch_app_chsub_Photo",
        "f-pTraceId": "WVNet_WV_2-2-68",
        "Accept-Language": "zh-cn"
      }
    };
    $["get"](_0x254788, async (_0x1f21a8, _0x36a6f4, _0x40d818) => {
      try {} catch (_0x10b490) {
        $["logErr"](_0x10b490, _0x36a6f4);
      } finally {
        _0x1089e2();
      }
    }, 0);
  });
}

function supportoraffd() {
  return new Promise(_0x19eba8 => {
    let _0x414d90 = {
      "url": "https://h5.ele.me/restapi/eus/v2/current_user_with_havana",
      "headers": {
        "Cookie": elmck,
        "Host": "h5.ele.me",
        "Origin": "https://tb.ele.me",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "f-refer": "wv_h5",
        "Accept": "*/*",
        "User-Agent": "Rajax/1 Apple/iPhone12,1 iOS/14.2 Eleme/10.0.5 ID/2423E6" + num + "-E718-48E0-999B-8AF98332514E; IsJailbroken/1 ASI/E" + num + "69D4C-6979-416E-A9DC-02FC21E319B6 Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 AliApp(ELMC/10.0.5) UT4Aplus/0.0.6 WindVane/8.7.2 828x1792 WK",
        "f-pTraceId": "WVNet_WV_2-3-94",
        "Referer": "https://tb.ele.me/wow/alsc/mod/d5275789de46503ba0908a9d?e=1&open_type=miniapp&inviterId=" + ownerId + "&actId=1&_ltracker_f=hjb_app_grzx&chInfo=ch_app_chsub_Photo",
        "Accept-Language": "zh-cn"
      }
    };
    $["get"](_0x414d90, async (_0x398bc3, _0x1e6a84, _0x126bba) => {
      try {} catch (_0x304db8) {
        $["logErr"](_0x304db8, _0x1e6a84);
      } finally {
        _0x19eba8();
      }
    }, 0);
  });
}

function supportoraffdd() {
  return new Promise(_0x448bf8 => {
    let _0x217852 = {
      "url": "https://h5.ele.me/restapi/lego/query_module_content?codes=[%22recommend_price_fire%22]&latitude=22.931" + num + "910095215&longitude=113.387" + num + "384277344",
      "headers": {
        "Cookie": elmck,
        "Host": "h5.ele.me",
        "Accept": "application/json, text/plain, */*",
        "x-shard": "loc=113.387" + num + "384277344,22.931" + num + "910095215",
        "f-pTraceId": "WVNet_WV_2-3-96",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "f-refer": "wv_h5",
        "Origin": "https://tb.ele.me",
        "x-ua": "RenderWay/H5 AppName/elmc DeviceId/2423E699-E718-48E0-999B-8AF98332514E AppExtraInfo/%7B%22miniWua%22%3A%22HHnB_trF4qnXd7LBb1W7aTfbQadftHWJ%2BMg4rvN%2FalAHEZTC%2BerivaAPHBKR4lQ3HSPXDH9vbyVUHKsUvvKe8yrOaRJh1q5faiUwYONdp9G7Xqh7c4OyAaTzONYqZvnlRdg98KPMpv%2Fzs8fjbJiHjWqqRyruhKfS8iHhdyQ2QkCo%2By6s%3D%22%2C%22umidToken%22%3A%22zjdL%2Fh9LOnj3PzV9ZlUgfYV2c4wnliyM%22%2C%22ttid%22%3A%22201200%40eleme_iphone_10.0.5%22%2C%22deviceUUID%22%3A%222423E699-E718-48E0-999B-8AF98332514E%22%2C%22utdid%22%3A%22YZ2hE01GigMDAEmsd67%2FkXGZ%22%7D Longitude/113.387" + num + "384277344 Latitude/22.931" + num + "910095215",
        "User-Agent": "Rajax/1 Apple/iPhone12,1 iOS/14.2 Eleme/10.0.5 ID/2423E6" + num + "-E718-48E0-999B-8AF98332514E; IsJailbroken/1 ASI/E" + num + "69D4C-6979-416E-A9DC-02FC21E319B6 Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 AliApp(ELMC/10.0.5) UT4Aplus/0.0.6 WindVane/8.7.2 828x1792 WK",
        "Referer": "https://tb.ele.me/wow/alsc/mod/d5275789de46503ba0908a9d?e=1&open_type=miniapp&inviterId=" + ownerId + "&actId=1&_ltracker_f=hjb_app_grzx&chInfo=ch_app_chsub_Photo",
        "Connection": "keep-alive"
      }
    };
    $["get"](_0x217852, async (_0x17e65a, _0x54c502, _0x501f4a) => {
      try {} catch (_0xdcec8d) {
        $["logErr"](_0xdcec8d, _0x54c502);
      } finally {
        _0x448bf8();
      }
    }, 0);
  });
}

function menu() {
  return new Promise(_0x10cc0e => {
    let _0x5279ed = {
      "url": "https://h5.ele.me/restapi/biz.svip_scene/svip/engine/queryTrafficSupply?tagParams[]=%7B%22tagCode%22:%22" + queryTagCode + "%22%7D&bizCode=biz_card_main&longitude=113.387138366699" + num + "&latitude=22.9312763214111" + num,
      "headers": {
        "Cookie": elmck
      }
    };
    $["get"](_0x5279ed, async (_0x4cbe45, _0x1fa6f8, _0x373db0) => {
      try {
        let _0x4d8400 = JSON["parse"](_0x373db0);

        if (_0x4d8400["code"] == 200) {
          let _0x3fbb1a = _0x4d8400["data"][0]["data"];

          for (let _0xec6837 = 0; _0xec6837 < _0x3fbb1a["length"]; _0xec6837++) {
            if (_0x3fbb1a[_0xec6837]["attribute"]["receiveStatus"] == "TORECEIVE") {
              let _0x550520 = _0x3fbb1a[_0xec6837]["attribute"]["missionType"];

              if (_0x550520 == "SIMPLESIGNIN") {
                console["log"]("任务：" + _0x3fbb1a[_0xec6837]["attribute"]["subTitle"]);
                allMessage += "\n任务：" + _0x3fbb1a[_0xec6837]["attribute"]["subTitle"];
                let _0x104ca1 = _0x3fbb1a[_0xec6837]["attribute"]["missionDefId"],
                    _0xc3eed1 = _0x3fbb1a[_0xec6837]["attribute"]["missionCollectionId"];
                await running(_0x104ca1, _0xc3eed1, _0x550520);
                console["log"]("随机等待15~16.5秒");
                allMessage += "\n随机等待15~16.5秒";

                let _0x53010a = rand(15100, 16500);

                await $["wait"](_0x53010a);
              }
            }
          }
        }
      } catch (_0x410b26) {
        $["logErr"](_0x410b26, _0x1fa6f8);
      } finally {
        _0x10cc0e();
      }
    }, 0);
  });
}

function running(_0x548c5a, _0x4b2c7c, _0x54a7e9) {
  return new Promise(_0x2aa8df => {
    let _0x5bc37e = {
      "url": "https://h5.ele.me/restapi/biz.svip_scene/svip/engine/xSupply?params[]=%7B%22tagCode%22:%22" + acceptTagCode + "%22,%22extra%22:%7B%22missionDefId%22:" + _0x548c5a + ",%22missionCollectionId%22:" + _0x4b2c7c + ",%22missionType%22:%22" + _0x54a7e9 + "%22%7D%7D&bizCode=biz_code_main&longitude=113.38713836669" + num + "&latitude=22.931276321411" + num,
      "headers": {
        "Cookie": elmck
      }
    };
    $["get"](_0x5bc37e, async (_0x2a5edd, _0x245e30, _0x3855e2) => {
      try {
        let _0x363f58 = JSON["parse"](_0x3855e2);

        _0x363f58["data"][0]["attribute"]["code"] ? (console["log"](_0x363f58["data"][0]["attribute"]["message"]), allMessage += "\n" + _0x363f58["data"][0]["attribute"]["message"]) : (console["log"]("任务失败：" + _0x363f58["data"][0]["xmessage"]), allMessage += "\n任务失败：" + _0x363f58["data"][0]["xmessage"]);
      } catch (_0x2b1cca) {
        $["logErr"](_0x2b1cca, _0x245e30);
      } finally {
        _0x2aa8df();
      }
    }, 0);
  });
}

function rand(_0x2c45fd, _0x3a7e17) {
  return parseInt(Math["random"]() * (_0x3a7e17 - _0x2c45fd + 1) + _0x2c45fd, 10);
}

function Env(_0x503d8d, _0x3a767e) {
  class _0x41031e {
    constructor(_0x4cc51a) {
      this["env"] = _0x4cc51a;
    }

    ["send"](_0x42f7ef, _0xaeccb3 = "GET") {
      _0x42f7ef = "string" == typeof _0x42f7ef ? {
        "url": _0x42f7ef
      } : _0x42f7ef;
      let _0x3cfe52 = this["get"];
      "POST" === _0xaeccb3 && (_0x3cfe52 = this["post"]);
      return new Promise((_0x42fd32, _0xd03f9) => {
        _0x3cfe52["call"](this, _0x42f7ef, (_0x1e1ae3, _0x141033, _0x4c19b9) => {
          _0x1e1ae3 ? _0xd03f9(_0x1e1ae3) : _0x42fd32(_0x141033);
        });
      });
    }

    ["get"](_0x1974c7) {
      return this["send"]["call"](this["env"], _0x1974c7);
    }

    ["post"](_0x10d58d) {
      return this["send"]["call"](this["env"], _0x10d58d, "POST");
    }

  }

  return new class {
    constructor(_0x4956ba, _0xb45652) {
      this["name"] = _0x4956ba;
      this["http"] = new _0x41031e(this);
      this["data"] = null;
      this["dataFile"] = "box.dat";
      this["logs"] = [];
      this["isMute"] = false;
      this["isNeedRewrite"] = false;
      this["logSeparator"] = "\n";
      this["encoding"] = "utf-8";
      this["startTime"] = new Date()["getTime"]();
      Object["assign"](this, _0xb45652);
      this["log"]('', "🔔" + this["name"] + ", 开始!");
    }

    ["isNode"]() {
      return "undefined" != typeof module && !!module["exports"];
    }

    ["isQuanX"]() {
      return "undefined" != typeof $task;
    }

    ["isSurge"]() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
    }

    ["isLoon"]() {
      return "undefined" != typeof $loon;
    }

    ["isShadowrocket"]() {
      return "undefined" != typeof $rocket;
    }

    ["toObj"](_0xaea396, _0x1b380c = null) {
      try {
        return JSON["parse"](_0xaea396);
      } catch {
        return _0x1b380c;
      }
    }

    ["toStr"](_0x1347ee, _0x3cea02 = null) {
      try {
        return JSON["stringify"](_0x1347ee);
      } catch {
        return _0x3cea02;
      }
    }

    ["getjson"](_0x324087, _0x4ebb5b) {
      let _0x2fcf00 = _0x4ebb5b;

      const _0x179b24 = this["getdata"](_0x324087);

      if (_0x179b24) {
        try {
          _0x2fcf00 = JSON["parse"](this["getdata"](_0x324087));
        } catch {}
      }

      return _0x2fcf00;
    }

    ["setjson"](_0x15959b, _0x530a52) {
      try {
        return this["setdata"](JSON["stringify"](_0x15959b), _0x530a52);
      } catch {
        return false;
      }
    }

    ["getScript"](_0x49d4e2) {
      return new Promise(_0x4a4cbe => {
        this["get"]({
          "url": _0x49d4e2
        }, (_0x298dba, _0x4da822, _0x163e7f) => _0x4a4cbe(_0x163e7f));
      });
    }

    ["runScript"](_0x4af1c1, _0x451d16) {
      return new Promise(_0x39b08c => {
        let _0x5da813 = this["getdata"]("@chavy_boxjs_userCfgs.httpapi");

        _0x5da813 = _0x5da813 ? _0x5da813["replace"](/\n/g, '')["trim"]() : _0x5da813;

        let _0x274f6e = this["getdata"]("@chavy_boxjs_userCfgs.httpapi_timeout");

        _0x274f6e = _0x274f6e ? 1 * _0x274f6e : 20;
        _0x274f6e = _0x451d16 && _0x451d16["timeout"] ? _0x451d16["timeout"] : _0x274f6e;

        const [_0x414f59, _0x3892d1] = _0x5da813["split"]("@"),
              _0xb4f090 = {
          "url": "http://" + _0x3892d1 + "/v1/scripting/evaluate",
          "body": {
            "script_text": _0x4af1c1,
            "mock_type": "cron",
            "timeout": _0x274f6e
          },
          "headers": {
            "X-Key": _0x414f59,
            "Accept": "*/*"
          }
        };

        this["post"](_0xb4f090, (_0x1c6947, _0xddc262, _0x4a06e8) => _0x39b08c(_0x4a06e8));
      })["catch"](_0xb32972 => this["logErr"](_0xb32972));
    }

    ["loaddata"]() {
      if (!this["isNode"]()) {
        return {};
      }

      {
        this["fs"] = this["fs"] ? this["fs"] : require("fs");
        this["path"] = this["path"] ? this["path"] : require("path");

        const _0x3ff04e = this["path"]["resolve"](this["dataFile"]),
              _0x1addf5 = this["path"]["resolve"](process["cwd"](), this["dataFile"]),
              _0x3856af = this["fs"]["existsSync"](_0x3ff04e),
              _0x5c5cf2 = !_0x3856af && this["fs"]["existsSync"](_0x1addf5);

        if (!_0x3856af && !_0x5c5cf2) {
          return {};
        }

        {
          const _0x19fdc1 = _0x3856af ? _0x3ff04e : _0x1addf5;

          try {
            return JSON["parse"](this["fs"]["readFileSync"](_0x19fdc1));
          } catch (_0x4214cc) {
            return {};
          }
        }
      }
    }

    ["writedata"]() {
      if (this["isNode"]()) {
        this["fs"] = this["fs"] ? this["fs"] : require("fs");
        this["path"] = this["path"] ? this["path"] : require("path");

        const _0x1f0c0d = this["path"]["resolve"](this["dataFile"]),
              _0x25f309 = this["path"]["resolve"](process["cwd"](), this["dataFile"]),
              _0x140837 = this["fs"]["existsSync"](_0x1f0c0d),
              _0x26e958 = !_0x140837 && this["fs"]["existsSync"](_0x25f309),
              _0xf01ac8 = JSON["stringify"](this["data"]);

        _0x140837 ? this["fs"]["writeFileSync"](_0x1f0c0d, _0xf01ac8) : _0x26e958 ? this["fs"]["writeFileSync"](_0x25f309, _0xf01ac8) : this["fs"]["writeFileSync"](_0x1f0c0d, _0xf01ac8);
      }
    }

    ["lodash_get"](_0x11f31c, _0x5add18, _0x52175f) {
      const _0x532c34 = _0x5add18["replace"](/\[(\d+)\]/g, ".$1")["split"](".");

      let _0x1be365 = _0x11f31c;

      for (const _0x3be656 of _0x532c34) if (_0x1be365 = Object(_0x1be365)[_0x3be656], void 0 === _0x1be365) {
        return _0x52175f;
      }

      return _0x1be365;
    }

    ["lodash_set"](_0x1824b0, _0x59b599, _0x42201a) {
      return Object(_0x1824b0) !== _0x1824b0 ? _0x1824b0 : (Array["isArray"](_0x59b599) || (_0x59b599 = _0x59b599["toString"]()["match"](/[^.[\]]+/g) || []), _0x59b599["slice"](0, -1)["reduce"]((_0x17f6c8, _0x534a02, _0x3fd499) => Object(_0x17f6c8[_0x534a02]) === _0x17f6c8[_0x534a02] ? _0x17f6c8[_0x534a02] : _0x17f6c8[_0x534a02] = Math["abs"](_0x59b599[_0x3fd499 + 1]) >> 0 == +_0x59b599[_0x3fd499 + 1] ? [] : {}, _0x1824b0)[_0x59b599[_0x59b599["length"] - 1]] = _0x42201a, _0x1824b0);
    }

    ["getdata"](_0x374bad) {
      let _0xa7c2d6 = this["getval"](_0x374bad);

      if (/^@/["test"](_0x374bad)) {
        const [, _0x5bb851, _0x343c38] = /^@(.*?)\.(.*?)$/["exec"](_0x374bad),
              _0x2a7670 = _0x5bb851 ? this["getval"](_0x5bb851) : '';

        if (_0x2a7670) {
          try {
            const _0x3fde05 = JSON["parse"](_0x2a7670);

            _0xa7c2d6 = _0x3fde05 ? this["lodash_get"](_0x3fde05, _0x343c38, '') : _0xa7c2d6;
          } catch (_0x2f7f31) {
            _0xa7c2d6 = '';
          }
        }
      }

      return _0xa7c2d6;
    }

    ["setdata"](_0x385bc1, _0x4974eb) {
      let _0x490da5 = false;

      if (/^@/["test"](_0x4974eb)) {
        const [, _0x5140f1, _0x478c00] = /^@(.*?)\.(.*?)$/["exec"](_0x4974eb),
              _0x38758a = this["getval"](_0x5140f1),
              _0xbc3ebe = _0x5140f1 ? "null" === _0x38758a ? null : _0x38758a || "{}" : "{}";

        try {
          const _0x5df3c6 = JSON["parse"](_0xbc3ebe);

          this["lodash_set"](_0x5df3c6, _0x478c00, _0x385bc1);
          _0x490da5 = this["setval"](JSON["stringify"](_0x5df3c6), _0x5140f1);
        } catch (_0x4a0c9f) {
          const _0x16eee9 = {};
          this["lodash_set"](_0x16eee9, _0x478c00, _0x385bc1);
          _0x490da5 = this["setval"](JSON["stringify"](_0x16eee9), _0x5140f1);
        }
      } else {
        _0x490da5 = this["setval"](_0x385bc1, _0x4974eb);
      }

      return _0x490da5;
    }

    ["getval"](_0x5e054f) {
      return this["isSurge"]() || this["isLoon"]() ? $persistentStore["read"](_0x5e054f) : this["isQuanX"]() ? $prefs["valueForKey"](_0x5e054f) : this["isNode"]() ? (this["data"] = this["loaddata"](), this["data"][_0x5e054f]) : this["data"] && this["data"][_0x5e054f] || null;
    }

    ["setval"](_0x9b5948, _0x5ab14c) {
      return this["isSurge"]() || this["isLoon"]() ? $persistentStore["write"](_0x9b5948, _0x5ab14c) : this["isQuanX"]() ? $prefs["setValueForKey"](_0x9b5948, _0x5ab14c) : this["isNode"]() ? (this["data"] = this["loaddata"](), this["data"][_0x5ab14c] = _0x9b5948, this["writedata"](), true) : this["data"] && this["data"][_0x5ab14c] || null;
    }

    ["initGotEnv"](_0xd5afbf) {
      this["got"] = this["got"] ? this["got"] : require("got");
      this["cktough"] = this["cktough"] ? this["cktough"] : require("tough-cookie");
      this["ckjar"] = this["ckjar"] ? this["ckjar"] : new this["cktough"]["CookieJar"]();
      _0xd5afbf && (_0xd5afbf["headers"] = _0xd5afbf["headers"] ? _0xd5afbf["headers"] : {}, void 0 === _0xd5afbf["headers"]["Cookie"] && void 0 === _0xd5afbf["cookieJar"] && (_0xd5afbf["cookieJar"] = this["ckjar"]));
    }

    ["get"](_0x32fbc7, _0x10b48e = () => {}) {
      if (_0x32fbc7["headers"] && (delete _0x32fbc7["headers"]["Content-Type"], delete _0x32fbc7["headers"]["Content-Length"]), this["isSurge"]() || this["isLoon"]()) {
        this["isSurge"]() && this["isNeedRewrite"] && (_0x32fbc7["headers"] = _0x32fbc7["headers"] || {}, Object["assign"](_0x32fbc7["headers"], {
          "X-Surge-Skip-Scripting": false
        }));
        $httpClient["get"](_0x32fbc7, (_0x244e81, _0x3cfffd, _0xd5bb7f) => {
          !_0x244e81 && _0x3cfffd && (_0x3cfffd["body"] = _0xd5bb7f, _0x3cfffd["statusCode"] = _0x3cfffd["status"]);

          _0x10b48e(_0x244e81, _0x3cfffd, _0xd5bb7f);
        });
      } else {
        if (this["isQuanX"]()) {
          this["isNeedRewrite"] && (_0x32fbc7["opts"] = _0x32fbc7["opts"] || {}, Object["assign"](_0x32fbc7["opts"], {
            "hints": false
          }));
          $task["fetch"](_0x32fbc7)["then"](_0xc8212d => {
            const {
              "statusCode": _0x1310b5,
              "statusCode": _0x1c325d,
              "headers": _0x273e81,
              "body": _0x509ed4
            } = _0xc8212d;

            _0x10b48e(null, {
              "status": _0x1310b5,
              "statusCode": _0x1c325d,
              "headers": _0x273e81,
              "body": _0x509ed4
            }, _0x509ed4);
          }, _0x4c7ce5 => _0x10b48e(_0x4c7ce5));
        } else {
          if (this["isNode"]()) {
            let _0x578fd9 = require("iconv-lite");

            this["initGotEnv"](_0x32fbc7);
            this["got"](_0x32fbc7)["on"]("redirect", (_0x830c75, _0x267021) => {
              try {
                if (_0x830c75["headers"]["set-cookie"]) {
                  const _0x5b0a0b = _0x830c75["headers"]["set-cookie"]["map"](this["cktough"]["Cookie"]["parse"])["toString"]();

                  _0x5b0a0b && this["ckjar"]["setCookieSync"](_0x5b0a0b, null);
                  _0x267021["cookieJar"] = this["ckjar"];
                }
              } catch (_0x3d870d) {
                this["logErr"](_0x3d870d);
              }
            })["then"](_0x94a4e7 => {
              const {
                "statusCode": _0x5d31ae,
                "statusCode": _0x2b9fa6,
                "headers": _0x422128,
                "rawBody": _0x39bfaa
              } = _0x94a4e7;

              _0x10b48e(null, {
                "status": _0x5d31ae,
                "statusCode": _0x2b9fa6,
                "headers": _0x422128,
                "rawBody": _0x39bfaa
              }, _0x578fd9["decode"](_0x39bfaa, this["encoding"]));
            }, _0x44068f => {
              const {
                "message": _0x341a07,
                "response": _0x315da9
              } = _0x44068f;

              _0x10b48e(_0x341a07, _0x315da9, _0x315da9 && _0x578fd9["decode"](_0x315da9["rawBody"], this["encoding"]));
            });
          }
        }
      }
    }

    ["post"](_0x3b4dc3, _0x291457 = () => {}) {
      const _0x2b92af = _0x3b4dc3["method"] ? _0x3b4dc3["method"]["toLocaleLowerCase"]() : "post";

      if (_0x3b4dc3["body"] && _0x3b4dc3["headers"] && !_0x3b4dc3["headers"]["Content-Type"] && (_0x3b4dc3["headers"]["Content-Type"] = "application/x-www-form-urlencoded"), _0x3b4dc3["headers"] && delete _0x3b4dc3["headers"]["Content-Length"], this["isSurge"]() || this["isLoon"]()) {
        this["isSurge"]() && this["isNeedRewrite"] && (_0x3b4dc3["headers"] = _0x3b4dc3["headers"] || {}, Object["assign"](_0x3b4dc3["headers"], {
          "X-Surge-Skip-Scripting": false
        }));

        $httpClient[_0x2b92af](_0x3b4dc3, (_0x122e0f, _0x331121, _0x137f67) => {
          !_0x122e0f && _0x331121 && (_0x331121["body"] = _0x137f67, _0x331121["statusCode"] = _0x331121["status"]);

          _0x291457(_0x122e0f, _0x331121, _0x137f67);
        });
      } else {
        if (this["isQuanX"]()) {
          _0x3b4dc3["method"] = _0x2b92af;
          this["isNeedRewrite"] && (_0x3b4dc3["opts"] = _0x3b4dc3["opts"] || {}, Object["assign"](_0x3b4dc3["opts"], {
            "hints": false
          }));
          $task["fetch"](_0x3b4dc3)["then"](_0x258544 => {
            const {
              "statusCode": _0x3c9547,
              "statusCode": _0x8d75d4,
              "headers": _0xf7ba14,
              "body": _0x2893d5
            } = _0x258544;

            _0x291457(null, {
              "status": _0x3c9547,
              "statusCode": _0x8d75d4,
              "headers": _0xf7ba14,
              "body": _0x2893d5
            }, _0x2893d5);
          }, _0x524824 => _0x291457(_0x524824));
        } else {
          if (this["isNode"]()) {
            let _0x464121 = require("iconv-lite");

            this["initGotEnv"](_0x3b4dc3);
            const {
              "url": _0x434c17,
              ..._0x2155d6
            } = _0x3b4dc3;

            this["got"][_0x2b92af](_0x434c17, _0x2155d6)["then"](_0x124d06 => {
              const {
                "statusCode": _0xfe81b8,
                "statusCode": _0xf02e23,
                "headers": _0x4cc293,
                "rawBody": _0x5a3411
              } = _0x124d06;

              _0x291457(null, {
                "status": _0xfe81b8,
                "statusCode": _0xf02e23,
                "headers": _0x4cc293,
                "rawBody": _0x5a3411
              }, _0x464121["decode"](_0x5a3411, this["encoding"]));
            }, _0x31b302 => {
              const {
                "message": _0x2a1a0a,
                "response": _0x4f5961
              } = _0x31b302;

              _0x291457(_0x2a1a0a, _0x4f5961, _0x4f5961 && _0x464121["decode"](_0x4f5961["rawBody"], this["encoding"]));
            });
          }
        }
      }
    }

    ["time"](_0x51da78, _0x33f611 = null) {
      const _0x1477ad = _0x33f611 ? new Date(_0x33f611) : new Date();

      let _0x2ef1f4 = {
        "M+": _0x1477ad["getMonth"]() + 1,
        "d+": _0x1477ad["getDate"](),
        "H+": _0x1477ad["getHours"](),
        "m+": _0x1477ad["getMinutes"](),
        "s+": _0x1477ad["getSeconds"](),
        "q+": Math["floor"]((_0x1477ad["getMonth"]() + 3) / 3),
        "S": _0x1477ad["getMilliseconds"]()
      };
      /(y+)/["test"](_0x51da78) && (_0x51da78 = _0x51da78["replace"](RegExp["$1"], (_0x1477ad["getFullYear"]() + '')["substr"](4 - RegExp["$1"]["length"])));

      for (let _0x5cc47a in _0x2ef1f4) new RegExp("(" + _0x5cc47a + ")")["test"](_0x51da78) && (_0x51da78 = _0x51da78["replace"](RegExp["$1"], 1 == RegExp["$1"]["length"] ? _0x2ef1f4[_0x5cc47a] : ("00" + _0x2ef1f4[_0x5cc47a])["substr"](('' + _0x2ef1f4[_0x5cc47a])["length"])));

      return _0x51da78;
    }

    ["msg"](_0x4bdf3f = _0x503d8d, _0x1f7c16 = '', _0x2e6e04 = '', _0x8d5d3) {
      const _0x56ab55 = _0x34b4e9 => {
        if (!_0x34b4e9) {
          return _0x34b4e9;
        }

        if ("string" == typeof _0x34b4e9) {
          return this["isLoon"]() ? _0x34b4e9 : this["isQuanX"]() ? {
            "open-url": _0x34b4e9
          } : this["isSurge"]() ? {
            "url": _0x34b4e9
          } : void 0;
        }

        if ("object" == typeof _0x34b4e9) {
          if (this["isLoon"]()) {
            let _0x33bf6f = _0x34b4e9["openUrl"] || _0x34b4e9["url"] || _0x34b4e9["open-url"],
                _0x1e47fd = _0x34b4e9["mediaUrl"] || _0x34b4e9["media-url"];

            return {
              "openUrl": _0x33bf6f,
              "mediaUrl": _0x1e47fd
            };
          }

          if (this["isQuanX"]()) {
            let _0x1106c7 = _0x34b4e9["open-url"] || _0x34b4e9["url"] || _0x34b4e9["openUrl"],
                _0x44b8bd = _0x34b4e9["media-url"] || _0x34b4e9["mediaUrl"];

            return {
              "open-url": _0x1106c7,
              "media-url": _0x44b8bd
            };
          }

          if (this["isSurge"]()) {
            let _0x18e317 = _0x34b4e9["url"] || _0x34b4e9["openUrl"] || _0x34b4e9["open-url"];

            return {
              "url": _0x18e317
            };
          }
        }
      };

      if (this["isMute"] || (this["isSurge"]() || this["isLoon"]() ? $notification["post"](_0x4bdf3f, _0x1f7c16, _0x2e6e04, _0x56ab55(_0x8d5d3)) : this["isQuanX"]() && $notify(_0x4bdf3f, _0x1f7c16, _0x2e6e04, _0x56ab55(_0x8d5d3))), !this["isMuteLog"]) {
        let _0x4ae3a8 = ['', "==============📣系统通知📣=============="];

        _0x4ae3a8["push"](_0x4bdf3f);

        _0x1f7c16 && _0x4ae3a8["push"](_0x1f7c16);
        _0x2e6e04 && _0x4ae3a8["push"](_0x2e6e04);
        console["log"](_0x4ae3a8["join"]("\n"));
        this["logs"] = this["logs"]["concat"](_0x4ae3a8);
      }
    }

    ["log"](..._0x4536e6) {
      _0x4536e6["length"] > 0 && (this["logs"] = [...this["logs"], ..._0x4536e6]);
      console["log"](_0x4536e6["join"](this["logSeparator"]));
    }

    ["logErr"](_0x10ff6f, _0x4e0c7b) {
      const _0x56ae64 = !this["isSurge"]() && !this["isQuanX"]() && !this["isLoon"]();

      _0x56ae64 ? this["log"]('', "❗️" + this["name"] + ", 错误!", _0x10ff6f["stack"]) : this["log"]('', "❗️" + this["name"] + ", 错误!", _0x10ff6f);
    }

    ["wait"](_0x36f323) {
      return new Promise(_0x260e28 => setTimeout(_0x260e28, _0x36f323));
    }

    ["done"](_0x63160e = {}) {
      const _0x28815d = new Date()["getTime"](),
            _0x4e1e7f = (_0x28815d - this["startTime"]) / 1000;

      this["log"]('', "🔔" + this["name"] + ", 结束! 🕛 " + _0x4e1e7f + " 秒");
      this["log"]();
      (this["isSurge"]() || this["isQuanX"]() || this["isLoon"]()) && $done(_0x63160e);
    }

  }(_0x503d8d, _0x3a767e);
}