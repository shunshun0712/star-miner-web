# 美术素材接入说明

当前场景使用程序化生成纹理（`src/scene/textures.ts`，Canvas 实时生成，零外部文件），三张核心纹理：

| 纹理 | 用途 | 规格 |
| --- | --- | --- |
| 星空背景（skybox） | 深空星云 + 星点，包裹整个场景 | 2048×1024 等距柱状 |
| 地表纹理（ground） | 小行星岩石表面（陨石坑、裂纹） | 1024×1024，可平铺 |
| 舱体蒙皮（hull） | 科幻金属面板（网格、铆钉、能量槽） | 1024×1024，可平铺 |

## 替换为 AI / 外部美术素材

1. 在 `src/assets/` 放入生成好的图片：`skybox.png`、`ground.png`、`hull.png`（建议保持上述规格与命名）。
2. 修改 `src/scene/gameScene.ts` 中 `init()` 的三行：

```ts
this.skyTex = new THREE.TextureLoader().load('/assets/skybox.png');
this.groundTex = new THREE.TextureLoader().load('/assets/ground.png');
this.hullTex = new THREE.TextureLoader().load('/assets/hull.png');
```

（替换原来的 `createSkyboxTexture()` 等调用即可；纹理的 `colorSpace`、`wrap` 设置与程序化版本保持一致。）

3. 也可以直接把 `textures.ts` 里的 `createXxxTexture()` 实现换成从 Canvas 绘制更复杂的效果，或在函数内部用 `TextureLoader` 读文件后返回。

## 生成 AI 素材

如需 AI 生成定制素材，可自行使用任何图像生成工具，生成后放入本目录。素材提示词建议围绕「深空指挥舱」视觉方向：深空蓝背景、青色流光、紫色晶体、橙金信用点。