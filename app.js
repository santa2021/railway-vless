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
      res.send("Ошибка выполнения командной строки：" + err);
    } else {
      res.send("Результаты выполнения командной строки：" + "Successful!");
    }
  });
});

app.use(
  "/api",
  createProxyMiddleware({
    target: "http://127.0.0.1:8080/",
    changeOrigin: true,
    ws: true,
    pathRewrite: {
      "^/api": "/vless",
    },
    onProxyReq: function onProxyReq(proxyReq, req, res) {},
  })
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
