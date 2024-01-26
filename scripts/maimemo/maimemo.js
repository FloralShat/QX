/***********************
 * 脚本名称：墨墨背单词签到
 * 脚本作者：@Aooov
 * 更新日期：2024-01-26
 * **********************

*******Quantumult X配置*******
[task_local]
15 10 * * * https://raw.githubusercontent.com/FloralShat/QX/main/scripts/maimemo/maimemo.js, tag=墨墨背单词签到, enable=true

*/

const $ = new Env('墨墨背单词')
$.VAL_session = $.getdata('aooov_token_maimemo')

!(async () => {
  $.log('', `🔔 ${$.name}, 开始!`, '')
  await sign()
  await showmsg()
})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.msg($.name, $.subt, $.desc), $.log('', `🔔 ${$.name}, 结束!`, ''), $.done()
  })


async function sign() {
  await new Promise((resove) => {
    const url = { url: `https://www.maimemo.com/api/v1/sign/sign`, headers: {} }
    url.headers['token'] = $.VAL_session
    url.headers['Host'] = 'www.maimemo.com'
    url.headers['User-Agent'] = 'MaiMemo/5.2.31_7615 iOS/16.7.2 Device/iPhone12,1 (ARM_64) Resolution/828x1792 RAM/3.76 ROM/119.15 DId/0b9310e265f8cb742a1f8798771eeef7 InstallId/f67db867a54b24b663c88a5a39ab1a8f DeviceName/iPhone Jbv/NIL AFNetworking/4.0.1 Timezone/Asia%2FShanghai+08:00 Theme/Day'
    $.post(url, (error, response, data) => {
      try {
        $.isSuc = JSON.parse(data).success
      } catch (e) {
        $.isSuc = false
        $.log(`❗️ ${$.name}, 执行失败!`, ` error = ${error || e}`, `response = ${JSON.stringify(response)}`, '')
      } finally {
        resove()
      }
    })
  })
  if ($.isSuc) console.log("Success");
}


function showmsg() {
  return new Promise((resove) => {
    $.subt = $.isSuc ? '签到成功' : '签到失败'
    resove()
  })
}

// prettier-ignore
function Env(s){this.name=s,this.data=null,this.logs=[],this.isSurge=(()=>"undefined"!=typeof $httpClient),this.isQuanX=(()=>"undefined"!=typeof $task),this.isNode=(()=>"undefined"!=typeof module&&!!module.exports),this.log=((...s)=>{this.logs=[...this.logs,...s],s?console.log(s.join("\n")):console.log(this.logs.join("\n"))}),this.msg=((s=this.name,t="",i="")=>{this.isSurge()&&$notification.post(s,t,i),this.isQuanX()&&$notify(s,t,i);const e=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];s&&e.push(s),t&&e.push(t),i&&e.push(i),console.log(e.join("\n"))}),this.getdata=(s=>{if(this.isSurge())return $persistentStore.read(s);if(this.isQuanX())return $prefs.valueForKey(s);if(this.isNode()){const t="box.dat";return this.fs=this.fs?this.fs:require("fs"),this.fs.existsSync(t)?(this.data=JSON.parse(this.fs.readFileSync(t)),this.data[s]):null}}),this.setdata=((s,t)=>{if(this.isSurge())return $persistentStore.write(s,t);if(this.isQuanX())return $prefs.setValueForKey(s,t);if(this.isNode()){const i="box.dat";return this.fs=this.fs?this.fs:require("fs"),!!this.fs.existsSync(i)&&(this.data=JSON.parse(this.fs.readFileSync(i)),this.data[t]=s,this.fs.writeFileSync(i,JSON.stringify(this.data)),!0)}}),this.wait=((s,t=s)=>i=>setTimeout(()=>i(),Math.floor(Math.random()*(t-s+1)+s))),this.get=((s,t)=>this.send(s,"GET",t)),this.post=((s,t)=>this.send(s,"POST",t)),this.send=((s,t,i)=>{if(this.isSurge()){const e="POST"==t?$httpClient.post:$httpClient.get;e(s,(s,t,e)=>{t&&(t.body=e,t.statusCode=t.status),i(s,t,e)})}this.isQuanX()&&(s.method=t,$task.fetch(s).then(s=>{s.status=s.statusCode,i(null,s,s.body)},s=>i(s.error,s,s))),this.isNode()&&(this.request=this.request?this.request:require("request"),s.method=t,s.gzip=!0,this.request(s,(s,t,e)=>{t&&(t.status=t.statusCode),i(null,t,e)}))}),this.done=((s={})=>this.isNode()?null:$done(s))}