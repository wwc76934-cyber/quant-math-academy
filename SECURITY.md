# Security Policy

## 支持范围

当前 RC1：静态站点 + 本地 localStorage；无后端、无账号、无遥测。

## 报告漏洞

- 仓库建立后，优先使用 **GitHub Security Advisories** 私下报告。
- 仓库建立前，不要在公开 Issue 中披露可利用细节。
- 请提供：影响版本/提交、复现步骤、影响范围、建议修复。

## 范围

重点关注：

- 内容 HTML/公式注入（构建管线把 Markdown 转 HTML）；
- 导入 JSON 的解析与覆盖逻辑；
- localStorage 数据损坏/恢复；
- 依赖漏洞（KaTeX、React Router 等）；
- 部署配置泄露（Token、环境变量）。

不在范围：

- 需要物理访问用户设备的攻击；
- 社会工程；
- 已公开且无实际影响的依赖通告（请附利用条件）。

## 已知设计

- 无服务端，用户数据不离开浏览器；
- 导出文件由用户主动下载；导入前做 schema/结构校验；
- 不加载远程脚本/字体；KaTeX CSS/字体随构建产物提供。

## 依赖升级

KaTeX 0.19.1、React Router 7.18.5；`npm audit` 0。升级需跑全量公式/路由回归。
