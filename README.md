# 星际矿站 · Star Miner

一款原创科幻放置经营游戏浏览器原型。玩家在 Aurora-1 星球上修复采掘器、运输线与晶体精炼厂，通过自动生产、设施升级、能源策略、科技研究与无人机事件扩展矿站。

纯前端实现：TypeScript + Vite + Three.js，零外部美术资源（纹理全部程序化生成），无后端、无账号，存档保存在浏览器 IndexedDB。

**Star Miner** is an original sci-fi idle / base-building browser game prototype: restore excavators, maglev transport lines and a crystal refinery on planet Aurora-1, then grow the station through automation, upgrades, energy strategy, research and drone events.

## 截图

![星际矿站游戏截图](screenshot.png)

## 特性

- 核心生产链：星尘采掘器 → 氦-3 采掘器 → 氘采掘器 → 磁轨运输线 → 晶体精炼厂
- 四档能源策略（采掘优先 / 均衡运行 / 精炼优先 / 聚变模式）+ 能源站与能量储备池
- 资源链扩展：同位素（氘采掘副产物）→ 反物质 → 暗物质（T3/T4 高级资源）
- 研究中心与四分支科技树（T0–T4 共 29 个可研究节点，涵盖采掘 / 能源 / 运输 / 精炼）
- 30 个成就（每 10 点成就 +1% 全局产量）
- 转生系统：消耗资源获取星核，转生后基线重置但永久加成保留；转生仪式提供成就回顾
- 星核商店：15 种永久加成物品（经济 / 生产 / 研究 / 设施 / 转生五类），购买等级跨转生保留
- 无人机事件（A/B 二选一）、太阳风暴、投入型事件
- 离线收益（8 小时上限）、IndexedDB 本地存档（v9）+ JSON 导入导出 + 节奏数据 CSV 导出
- `~` 调试面板：改资源、等级、解锁、触发事件、模拟离线

## 技术栈

TypeScript · Vite · Three.js · Vitest

## 快速开始

```bash
cd game
npm install
npm run dev        # 开发服务器 http://localhost:5173
```

构建生产版本：

```bash
cd game
npm run build      # 输出到 ../outputs/StarMinerWeb
npm run preview
```

Windows 用户也可以先执行 `npm run build`，然后双击仓库根目录的「一键启动.bat」。

## 测试

```bash
cd game
npm test
```

## 操作说明

- 1 / 2 / 3：切换能源策略（采掘优先 / 均衡运行 / 精炼优先）
- 点击中央场景设施可选中；U 升级或解锁当前选中设施
- 解锁研究中心后，左侧「研究」查看四分支科技树，研究消耗晶体
- 左侧「成就」查看 30 个成就；交易面板可开启自动出售并设置保留数量
- P：打开转生面板，预览转生效果并确认；转生后获得星核，基线重置但永久加成保留
- S：打开星核商店，花费星核购买 15 种永久加成；购买等级跨转生保留
- M：打开存档管理（导出/导入 JSON、导出节奏数据 CSV）
- 左侧「星图」：查看星系地图与矿区解锁进度
- `~`：打开调试面板；Esc：关闭弹窗

## 文档

- [WebGL 原型计划书汇总](docs/星际矿站_WebGL原型_计划书汇总.md) — 总体设计与数值
- [v0.4 科技期计划书](docs/星际矿站_v0.4_科技期_计划书.md) — 科技树 / 能源 / 成就
- [v0.3 迭代计划书](docs/星际矿站_v0.3_迭代计划书.md)
- [运输与布局优化计划书](docs/星际矿站_运输与布局优化计划书.md)
- [同类游戏调研](docs/开源项目调研_同类游戏.md)

## 许可证

MIT © 2026 shunshun0712