const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
var exec = require("child_process").exec;
const os = require("os");
const { createProxyMiddleware } = require("http-proxy-middleware");
var fs = require("fs");

app.get("/", (req, res) => {
  res.send("hello wolrd");
});

app.get("/start", (req, res) => {
  let cmdStr = "chmod +x ./web && ./web -c ./config.yaml >/dev/null 2>&1 &";
  exec(cmdStr, function (err, stdout, stderr) {
    if (err) {
      res.send("命令行执行错误：" + err);
    } else {
      res.send("命令行执行结果：" + "启动成功!");
    }
  });
});

app.use(
  "/api",
  createProxyMiddleware({
    target: "http://127.0.0.1:8080/", // 需要跨域处理的请求地址
    changeOrigin: true, // 默认false，是否需要改变原始主机头为目标URL
    ws: true, // 是否代理websockets
    pathRewrite: {
      // 请求中去除/api
      "^/api": "/qwe",
    },
    onProxyReq: function onProxyReq(proxyReq, req, res) {},
  })
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
