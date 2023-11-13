import { createProxyMiddleware } from "http-proxy-middleware";
import express from "express";

const app = express();

// 去掉 X-Powered-By 响应头
app.set("x-powered-by", false);

const proxyConfig = {

    // 默认代理地址
    target: "http://127.0.0.1:3000",
    // 来源修改为目标地址
    changeOrigin: true,

    // 跟随重定向
    followRedirects: true,

    // 修改代理地址
    router: (req) => req.params[1],

    // 自定义重写
    pathRewrite: (path, req) => path.replace(req.params[0], ""),

    // 自定义错误
    onError: (err, req, res, target) => {
        res.writeHead(500, {
            "Content-Type": "text/plain",
        });
        res.end("Sorry, Error");
    },
};

app.use(
    /^(\/((?:http|ftp|https):\/\/(?:[\w-]+\.)+(?:[\w-]+)))/,
    createProxyMiddleware(proxyConfig)
);

app.use("*", (req, res) => {
    res.writeHead(404, {
        "Content-Type": "text/plain",
    });
    res.end("Not Found");
});

app.listen(3000, () => {
    console.log("http://127.0.0.1:3000");
});
