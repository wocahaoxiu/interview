Status前端上机面试题目
--------------------

>> 如果面试者无法通过自行查询资料处理与后端通讯相关的所有问题，请联系面试老师获取参考实现。

>> 后端已提供(status.exe)，面试者需要完成前后端闭环的结果。


## 0 链路说明

后端采用**HTTPS**方式链接

## 1 RESTful接口

### (1) SignUp 注册
地址
```
  https://{host}:{port}/user/sign_up
```
方式
```
POST
```
请求：BODY-JSON
```json
    {
        "usrname":  "用户名",
        "password": "密码",
        "retype":   "第二次输入密码"
    }
```
返回：BODY-JSON
```json
    {
        "code":  0,
        "msg":   "提示信息",
        "state": true
    }
```

### (2) SignIn 登录
地址
```
  https://{host}:{port}/user/sign_in
```
方式
```
POST
```
 请求：BODY-JSON
```json
      {
         "usrname":  "用户名",
         "password": "密码"
      }
```
  返回：BODY-JSON

```json
      {
        "code":0,
        "msg":"提示信息",
        "state":true
      }
```
  返回：Cookie:
```
        sid=xxxxxxxx
```

### (3) SignOut 登出
  地址
```
 https://{host}:{port}/user/sign_out
```
  方式
```
   POST
```
  请求：BODY 空
```
```
   请求Cookie: 
```
   sid=xxxxxxxx
```
  返回：BODY-JSON
```json
      {
        "code":0,
        "msg":"提示信息",
        "state":true
      }
```

### (3) Service 获取Websocket服务地址
  地址
```
   https://{host}:{port}/service
```
  方式
```
   POST
```
  请求：BODY 空
```
```
  请求Cookie: 
```
  sid=xxxxxxxx
```
  返回：BODY-JSON
```json
      {
        "code":0,
        "msg":"提示信息",
        "state":true,
        "data": { "url":"/ws/406062ca" }
      }
```

注意，需要前端拼接WebSocket地址

```javascript
  'wss://{host}:{port}' + url
```

## 2 WebSocket接口

###  (1) 消息发送
      
      服务器Echo原始信息

###  (2) 消息推送
      服务器发送各服务工作状态，JSON格式

```json 
      {
         "alias":"服务别名",
         "endpt":"服务唯一标签",
         "host":"服务所在主机地址",
         "reporttm":1676523370, 
         "params":[
            {"Value":{"U64":0},"alias":"参数别名","name":"参数唯一标识","unit":"参数单位"}, 
            {"Value":{"I64":0},"alias":"参数别名","name":"参数唯一标识","unit":"参数单位"}, 
            {"Value":{"U32":0},"alias":"参数别名","name":"参数唯一标识","unit":"参数单位"}, 
            {"Value":{"I32":0},"alias":"参数别名","name":"参数唯一标识","unit":"参数单位"}, 
            {"Value":{"F64":0},"alias":"参数别名","name":"参数唯一标识","unit":"参数单位"}, 
            {"Value":{"F32":0},"alias":"参数别名","name":"参数唯一标识","unit":"参数单位"}, 
            {"Value":{"BOL":true},"alias":"参数别名","name":"参数唯一标识","unit":"参数单位"}, 
            {"Value":{"Str":""},"alias":"参数别名","name":"参数唯一标识","unit":"参数单位"} 
         ]
      }
```

说明：

* `reporttm`为UNIX时间戳
* 参数值`Value`采用类型标注方式标识其中

|枚举值|类型|
|-----|---|
|U64|值类型UINT64|
|I64|值类型INT64|
|U32|值类型UINT32|
|I32|值类型INT32|
|F64|值类型DOUBLE|
|F32|值类型FLOAT|
|BOL|值类型BOOL true/false|
|Str|值类型STRING|

* 特殊的，多个参数以字符串的形式合并于某一个参数中，格式固定如下
```json
       {"Str":"参数名(参数值), 参数名(参数值) "}
```
* 大约有20个不同类型服务，服务器滚动推动各服务当前状态

## 3 后端说明

>    注意：服务器未携带数据库，关闭后所有信息消失。
>         服务器支持跨域访问
    
### （1）工作逻辑
    
*  (1) 注册用户
*  (2) 登录，并于浏览器中缓存Session信息；
*  (3) 获取WebSocket链接地址，服务器动态生成；
*  (4) 建立WebSocket链接，服务器主动推送各个服务工作状态；
*  (5) 同一用户可以建立多次链接，也可以提前关闭；
*  (6) 登出用户时，服务主动关闭WS链接，Session信息失效。

### （2）启动方式

双击运行`status.exe`后端按照默认参数启动，服务器地址为`https://localhost:8080`。

也可以通过`status.exe --host {host} --port {port}`更改默认端口及地址。

其他后端功能可以参考`status.exe -h`获取。

## 4 前端要求

-   (1) 基于Vue构建前端可视化；
-   (2) UI框架采用[AntDesign](https://antdv.com/components/overview)或[tabler](https://github.com/tabler/tabler)之一；
-   (3) 自主设计单页面，提供一定的导航能力，能够方便查看不同服务当前工作状态；
-   (4) 可提供基于[eChart](https://github.com/ecomfe/vue-echarts)等曲线显示。
-   (5) 实现建议
      - 页面结构
         - 欢迎页面
         - 注册页面
         - 登录页面
         - 服务页面
      - 页面导航
```
欢迎 -> 注册 -> 欢迎 -> 登录 -> 服务 -> 欢迎
```

## 5 运行环境

* Windows 10+
* Chrome 87+


