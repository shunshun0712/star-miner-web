/* ============================================
   星际矿站 · 操作指南 交互逻辑
   ============================================ */

(function () {
  'use strict';

  // ============ 数据定义 ============

  // SVG 图标库
  const ICONS = {
    pickaxe: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M14.7 6.3a4 4 0 0 0-5.4 5.4l-7 7 1.4 1.4 7-7a4 4 0 0 0 5.4-5.4l-2.3 2.3-1.4-1.4 2.3-2.3z\"/></svg>',
    gem: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><polygon points=\"12,2 22,12 12,22 2,12\"/><line x1=\"2\" y1=\"12\" x2=\"22\" y2=\"12\"/></svg>',
    sun: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41\"/></svg>',
    radiation: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M12 3v6M4.6 15h6M7.8 6.6l3 5.2M16.2 6.6l-3 5.2M19.4 15h-6\"/><circle cx=\"12\" cy=\"15\" r=\"3\"/></svg>',
    gear: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z\"/></svg>',
    dot: '<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><circle cx=\"12\" cy=\"12\" r=\"5\"/></svg>',
    mountain: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M3 20l6-10 4 6 3-4 5 8z\"/></svg>',
    swirl: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M12 2a10 10 0 1 0 10 10c0-4-3-7-7-7s-4 3-4 6 2 4 5 4\"/></svg>',
    battery: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"2\" y=\"7\" width=\"18\" height=\"10\" rx=\"1\"/><line x1=\"22\" y1=\"11\" x2=\"22\" y2=\"13\"/><rect x=\"4\" y=\"9\" width=\"10\" height=\"6\" fill=\"currentColor\" opacity=\"0.5\"/></svg>',
    bolt: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M13 2L3 14h9l-1 8 10-12h-9l1-8z\"/></svg>',
    plug: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M9 2v6M15 2v6M5 8h14v4a7 7 0 0 1-14 0V8zM12 19v3\"/></svg>',
    spark: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M12 2v6M12 16v6M2 12h6M16 12h6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24\"/></svg>',
    diamond: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><polygon points=\"12,2 22,12 12,22 2,12\"/></svg>',
    train: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"4\" y=\"3\" width=\"16\" height=\"14\" rx=\"2\"/><path d=\"M4 11h16M8 19l-2 3M16 19l2 3\"/><circle cx=\"8\" cy=\"16\" r=\"1\" fill=\"currentColor\"/><circle cx=\"16\" cy=\"16\" r=\"1\" fill=\"currentColor\"/></svg>',
    magnet: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M6 3v8a6 6 0 0 0 12 0V3M6 8H3v3a9 9 0 0 0 18 0V8h-3\"/></svg>',
    rails: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M4 4v16M20 4v16M9 8l6 8M15 8l-6 8\"/></svg>',
    bot: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"6\" y=\"7\" width=\"12\" height=\"10\" rx=\"2\"/><circle cx=\"9\" cy=\"12\" r=\"1\" fill=\"currentColor\"/><circle cx=\"15\" cy=\"12\" r=\"1\" fill=\"currentColor\"/><path d=\"M12 3v4M9 21l-1-3M15 21l1-3\"/></svg>',
    stars: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M12 2l2 6h6l-5 4 2 7-5-4-5 4 2-7-5-4h6z\"/></svg>',
    hole: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M5 5l4 4M19 19l-4-4M5 19l4-4M19 5l-4 4\"/></svg>',
    factory: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M3 21V10l6 4V10l6 4V6l6 2v13z\"/><line x1=\"3\" y1=\"21\" x2=\"21\" y2=\"21\"/></svg>',
    flask: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M9 3h6v6l4 8a2 2 0 0 1-2 3H7a2 2 0 0 1-2-3l4-8V3z\"/><line x1=\"9\" y1=\"9\" x2=\"15\" y2=\"9\"/></svg>',
    microscope: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M9 3v6M15 3v6M5 9h14M7 12l2 9h6l2-9\"/><circle cx=\"12\" cy=\"7\" r=\"2\"/></svg>',
    chart: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M3 3v18h18M7 15l4-4 3 3 5-6\"/></svg>',
    coin: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><circle cx=\"12\" cy=\"12\" r=\"5\"/><line x1=\"12\" y1=\"3\" x2=\"12\" y2=\"7\"/><line x1=\"12\" y1=\"17\" x2=\"12\" y2=\"21\"/></svg>',
    rocket: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M12 2l4 4v5c0 4-2 7-4 8-2-1-4-4-4-8V6l4-4z\"/><path d=\"M9 17v4h6v-4\"/><circle cx=\"12\" cy=\"9\" r=\"1.5\" fill=\"currentColor\"/></svg>',
    book: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z\"/></svg>',
    cap: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M2 10l10-5 10 5-10 5z\"/><path d=\"M6 12v5c2 1.5 4 2 6 2s4-.5 6-2v-5\"/></svg>',
    arrowUp: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><line x1=\"12\" y1=\"19\" x2=\"12\" y2=\"5\"/><polyline points=\"5,12 12,5 19,12\"/></svg>',
    lock: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"4\" y=\"11\" width=\"16\" height=\"10\" rx=\"2\"/><path d=\"M8 11V7a4 4 0 0 1 8 0v4\"/></svg>',
  };

  // 科技树数据（四分支）
  const techTreeData = {
    excavation: [
      { tier: 'T0', name: '基础采掘', desc: '星尘采掘效率 +10%', cost: '50 信用点', status: 'unlocked', icon: ICONS.pickaxe },
      { tier: 'T0', name: '精炼入门', desc: '晶体精炼效率 +10%', cost: '100 信用点', status: 'unlocked', icon: ICONS.gem },
      { tier: 'T1', name: '氦-3 开采', desc: '解锁氦-3 采掘器', cost: '200 信用点', status: 'available', icon: ICONS.sun },
      { tier: 'T1', name: '稀有同位素开采', desc: '解锁同位素反应堆', cost: '500 信用点', status: 'available', icon: ICONS.radiation },
      { tier: 'T2', name: '采掘优化', desc: '全采掘效率 +25%', cost: '1k 信用点', status: 'locked', icon: ICONS.gear },
      { tier: 'T2', name: '氘开采协议', desc: '解锁氘采掘器', cost: '2k 信用点', status: 'locked', icon: ICONS.dot },
      { tier: 'T3', name: '深层钻探', desc: '采掘效率再 +40%', cost: '10 晶体', status: 'locked', icon: ICONS.mountain },
      { tier: 'T4', name: '量子采掘', desc: '全采掘产量 ×2', cost: '5 反物质', status: 'locked', icon: ICONS.swirl },
    ],
    energy: [
      { tier: 'T0', name: '基础能源站', desc: '能量容量 +100', cost: '80 信用点', status: 'unlocked', icon: ICONS.battery },
      { tier: 'T1', name: '高级能源策略', desc: '解锁精炼优先模式', cost: '300 信用点', status: 'available', icon: ICONS.bolt },
      { tier: 'T1', name: '能量储备池', desc: '能量容量 +500', cost: '600 信用点', status: 'available', icon: ICONS.plug },
      { tier: 'T2', name: '聚变技术', desc: '解锁聚变模式', cost: '3k 信用点', status: 'locked', icon: ICONS.spark },
      { tier: 'T2', name: '超导电网', desc: '能源传输效率 +20%', cost: '5k 信用点', status: 'locked', icon: ICONS.diamond },
      { tier: 'T3', name: '反物质引擎', desc: '能量产出 ×1.5', cost: '8 晶体', status: 'locked', icon: ICONS.stars },
      { tier: 'T4', name: '奇点反应堆', desc: '能量容量 ×10', cost: '3 反物质', status: 'locked', icon: ICONS.hole },
    ],
    transport: [
      { tier: 'T0', name: '基础运输线', desc: '运输速度 +15%', cost: '120 信用点', status: 'unlocked', icon: ICONS.train },
      { tier: 'T1', name: '磁轨升级', desc: '运输速度再 +20%', cost: '400 信用点', status: 'available', icon: ICONS.magnet },
      { tier: 'T1', name: '并行轨道', desc: '运输容量 +50%', cost: '800 信用点', status: 'available', icon: ICONS.rails },
      { tier: 'T2', name: '自动调度', desc: '运输效率 +30%', cost: '4k 信用点', status: 'locked', icon: ICONS.bot },
      { tier: 'T3', name: '量子传输', desc: '瞬时运输（无延迟）', cost: '15 晶体', status: 'locked', icon: ICONS.swirl },
      { tier: 'T4', name: '虫洞物流', desc: '运输容量 ×5', cost: '2 暗物质', status: 'locked', icon: ICONS.hole },
    ],
    refinery: [
      { tier: 'T0', name: '基础精炼', desc: '晶体产出 +10%', cost: '100 信用点', status: 'unlocked', icon: ICONS.factory },
      { tier: 'T1', name: '精炼工艺', desc: '晶体产出再 +20%', cost: '500 信用点', status: 'available', icon: ICONS.flask },
      { tier: 'T1', name: '研究中心', desc: '解锁科技树面板', cost: '1k 信用点', status: 'available', icon: ICONS.microscope },
      { tier: 'T2', name: '高效提炼', desc: '晶体产出 +30%', cost: '5k 信用点', status: 'locked', icon: ICONS.chart },
      { tier: 'T3', name: '同位素富集', desc: '副产物概率 +50%', cost: '20 晶体', status: 'locked', icon: ICONS.radiation },
      { tier: 'T4', name: '超临界精炼', desc: '晶体产出 ×2', cost: '4 反物质', status: 'locked', icon: ICONS.gem },
    ],
  };

  // 星核商店数据
  const shopItemsData = {
    economy: [
      { name: '信用点注入', desc: '开局赠送额外信用点', icon: ICONS.coin, baseCost: 1, costMult: 1.5, maxLevel: 5, level: 2, status: 'purchasable' },
      { name: '信用放大器', desc: '全局信用点收入 +10% / 级', icon: ICONS.chart, baseCost: 2, costMult: 1.8, maxLevel: 10, level: 3, status: 'purchasable' },
      { name: '启动资金', desc: '转生后获得更多起始资源', icon: ICONS.rocket, baseCost: 3, costMult: 2.0, maxLevel: 5, level: 1, status: 'purchasable' },
    ],
    production: [
      { name: '采掘器调校', desc: '所有采掘器产量 +5% / 级', icon: ICONS.pickaxe, baseCost: 2, costMult: 1.6, maxLevel: 10, level: 4, status: 'purchasable' },
      { name: '矿石增幅器', desc: '稀有矿石掉率 +10% / 级', icon: ICONS.gem, baseCost: 4, costMult: 1.8, maxLevel: 8, level: 2, status: 'purchasable' },
      { name: '超频驱动', desc: '设施升级速度 +15% / 级', icon: ICONS.bolt, baseCost: 3, costMult: 1.7, maxLevel: 6, level: 0, status: 'insufficient' },
      { name: '同位素富集', desc: '同位素副产物概率 +8% / 级', icon: ICONS.radiation, baseCost: 5, costMult: 2.0, maxLevel: 5, level: 0, status: 'insufficient' },
    ],
    research: [
      { name: '研究补贴', desc: '研究成本 -5% / 级', icon: ICONS.book, baseCost: 2, costMult: 1.6, maxLevel: 10, level: 3, status: 'purchasable' },
      { name: '研究资助', desc: '研究速度 +10% / 级', icon: ICONS.microscope, baseCost: 3, costMult: 1.8, maxLevel: 8, level: 2, status: 'purchasable' },
      { name: '高级研究授权', desc: '解锁 T4 科技（前置：研究资助 Lv.2）', icon: ICONS.cap, baseCost: 10, costMult: 2.5, maxLevel: 1, level: 0, status: 'locked', lockReason: '需研究资助 Lv.2' },
    ],
    facility: [
      { name: '氦-3 开采许可', desc: '开局即解锁氦-3 采掘器', icon: ICONS.sun, baseCost: 5, costMult: 2.0, maxLevel: 1, level: 1, status: 'maxed' },
      { name: '氘开采许可', desc: '开局即解锁氘采掘器（前置：氦-3 许可）', icon: ICONS.dot, baseCost: 15, costMult: 2.5, maxLevel: 1, level: 0, status: 'purchasable', lockReason: '' },
      { name: '等级突破', desc: '所有设施最大等级 +2 / 级', icon: ICONS.arrowUp, baseCost: 8, costMult: 2.0, maxLevel: 5, level: 1, status: 'purchasable' },
    ],
    prestige: [
      { name: '星核共鸣', desc: '星核获取 +10% / 级', icon: ICONS.stars, baseCost: 5, costMult: 2.0, maxLevel: 10, level: 2, status: 'purchasable' },
      { name: '转生增幅器', desc: '转生收益 +25% / 级', icon: ICONS.swirl, baseCost: 10, costMult: 2.5, maxLevel: 5, level: 1, status: 'purchasable' },
    ],
  };

  // ============ 星空背景 ============
  function initStarfield() {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let stars = [];
    let animationId;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    }

    function initStars() {
      stars = [];
        const count = Math.floor((canvas.width * canvas.height) / 5000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.3,
          opacity: Math.random() * 0.6 + 0.2,
          speed: Math.random() * 0.05 + 0.01,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    }

    function draw(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(170, 200, 180, ${star.opacity * twinkle})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    }

    resize();
    draw(0);
    window.addEventListener('resize', resize);
  }

  // ============ 侧边栏导航切换 ============
  function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const panels = document.querySelectorAll('.panel');
    const pageTitle = document.getElementById('pageTitle');
    const sectionBadge = document.getElementById('sectionBadge');

    const titleMap = {
      overview: { title: '总览', badge: '' },
      reactor: { title: '同位素反应堆', badge: 'M2' },
      research: { title: '研究中心', badge: '' },
      prestige: { title: '转生仪式', badge: 'M3' },
      shop: { title: '星核商店', badge: 'M4' },
      shortcuts: { title: '快捷键指南', badge: '' },
      save: { title: '存档管理', badge: '' },
      readme: { title: 'README 原文', badge: '参考' },
    };

    function switchTo(section) {
      navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.section === section);
      });
      panels.forEach(panel => {
        panel.classList.toggle('active', panel.id === `panel-${section}`);
      });
      const info = titleMap[section];
      if (info) {
        pageTitle.textContent = info.title;
        sectionBadge.textContent = info.badge;
      }
      // 滚动到顶部
      const contentArea = document.getElementById('contentArea');
      if (contentArea) contentArea.scrollTop = 0;
    }

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const section = item.dataset.section;
        switchTo(section);
        // 移动端关闭侧边栏
        closeMobileSidebar();
      });
    });

    // 保存引用给其他地方使用
    window.__switchSection = switchTo;
  }

  // ============ 移动端侧边栏 ============
  function initMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.getElementById('mobileMenuBtn');
    const overlay = document.getElementById('sidebarOverlay');

    function open() {
      sidebar.classList.add('open');
      overlay.classList.add('active');
    }

    function close() {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    }

    if (menuBtn) menuBtn.addEventListener('click', open);
    if (overlay) overlay.addEventListener('click', close);

    window.__closeMobileSidebar = close;
  }

  function closeMobileSidebar() {
    if (window.__closeMobileSidebar) window.__closeMobileSidebar();
  }

  // ============ 反应堆活跃度动画 ============
  function initReactorActivity() {
    const activityValue = document.getElementById('activityValue');
    const gaugePowerVal = document.getElementById('gaugePowerVal');
    const gaugeTempVal = document.getElementById('gaugeTempVal');
    const gaugePowerNeedle = document.querySelector('#gaugePower .gauge-needle');
    const gaugeTempNeedle = document.querySelector('#gaugeTemp .gauge-needle');
    if (!activityValue) return;

    let activity = 0.25;
    let targetActivity = 0.4;
    let lastChange = 0;
    let frame = 0;

    // 指针角度映射：-90deg (0%) → +90deg (100%)
    function needleAngle(ratio) {
      return (-90 + ratio * 180) + 'deg';
    }

    // 温度基于活跃度非线性增长，高活动度时温度飙升
    function tempFromActivity(a) {
      return 300 + Math.pow(a, 1.4) * 2100;
    }

    function animate(time) {
      frame++;

      // 每 ~3 秒换一个目标值
      if (frame - lastChange > 180 + Math.random() * 120) {
        targetActivity = 0.2 + Math.random() * 0.6;
        // 偶尔冲高
        if (Math.random() < 0.15) targetActivity = 0.75 + Math.random() * 0.2;
        lastChange = frame;
      }

      // 物理式逼近：带轻微过冲
      const diff = targetActivity - activity;
      activity += diff * 0.015;
      // 加一点微抖动
      activity += (Math.random() - 0.5) * 0.004;
      activity = Math.max(0, Math.min(1, activity));

      const pct = Math.round(activity * 100);
      activityValue.textContent = pct + '%';

      // 功率表
      if (gaugePowerNeedle && gaugePowerVal) {
        gaugePowerNeedle.style.transform = `rotate(${needleAngle(activity)})`;
        gaugePowerVal.innerHTML = `${pct}<span class="gauge-unit">%</span>`;
      }

      // 温度表
      if (gaugeTempNeedle && gaugeTempVal) {
        const tK = Math.round(tempFromActivity(activity));
        const tempRatio = (tK - 300) / 2100;
        gaugeTempNeedle.style.transform = `rotate(${needleAngle(tempRatio)})`;
        gaugeTempVal.innerHTML = `${tK}<span class="gauge-unit">K</span>`;
      }

      // 核心发光亮度
      const coreGlow = document.querySelector('.core-glow');
      if (coreGlow) {
        coreGlow.style.opacity = 0.35 + activity * 0.6;
      }

      requestAnimationFrame(animate);
    }

    animate(0);
  }

  // ============ 科技树渲染 ============
  function initTechTree() {
    const tabs = document.querySelectorAll('.tech-tab');
    const treeEl = document.getElementById('techTree');
    if (!treeEl || !tabs.length) return;

    let currentBranch = 'excavation';

    function render(branch) {
      const nodes = techTreeData[branch];
      if (!nodes) return;

      // 按 tier 分组
      const tiers = {};
      nodes.forEach(node => {
        if (!tiers[node.tier]) tiers[node.tier] = [];
        tiers[node.tier].push(node);
      });

      treeEl.innerHTML = '';

      const tierOrder = ['T0', 'T1', 'T2', 'T3', 'T4'];
      tierOrder.forEach(tier => {
        if (!tiers[tier]) return;

        const tierEl = document.createElement('div');
        tierEl.className = 'tech-tier';

        const label = document.createElement('div');
        label.className = 'tech-tier-label';
        label.textContent = tier;
        tierEl.setAttribute('data-tier', tier);
        tierEl.appendChild(label);

        const nodesEl = document.createElement('div');
        nodesEl.className = 'tech-nodes';

        tiers[tier].forEach(node => {
          const nodeEl = document.createElement('div');
          nodeEl.className = `tech-node ${node.status}`;

          const statusText = {
            unlocked: '已研究',
            available: '可研究',
            locked: '未解锁',
          };

          nodeEl.innerHTML = `
            <div class="tech-node-head">
              <div class="tech-node-icon">${node.icon}</div>
              <div>
                <div class="tech-node-name">${node.name}</div>
                <span class="tech-node-status ${node.status}">${statusText[node.status] || ''}</span>
              </div>
            </div>
            <div class="tech-node-desc">${node.desc}</div>
            <div class="tech-node-cost">${node.cost}</div>
          `;

          nodesEl.appendChild(nodeEl);
        });

        tierEl.appendChild(nodesEl);
        treeEl.appendChild(tierEl);
      });
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const branch = tab.dataset.branch;
        if (branch === currentBranch) return;
        currentBranch = branch;
        tabs.forEach(t => t.classList.toggle('active', t === tab));
        render(branch);
      });
    });

    render(currentBranch);
  }

  // ============ 星核商店渲染 ============
  function initShop() {
    const catBtns = document.querySelectorAll('.shop-cat');
    const gridEl = document.getElementById('shopGrid');
    if (!gridEl || !catBtns.length) return;

    let currentCat = 'economy';

    function calcCost(item) {
      return Math.floor(item.baseCost * Math.pow(item.costMult, item.level));
    }

    function render(cat) {
      const items = shopItemsData[cat];
      if (!items) return;

      gridEl.innerHTML = '';

      items.forEach((item, idx) => {
        const cost = calcCost(item);
        const isMaxed = item.level >= item.maxLevel;
        const statusClass = isMaxed ? 'maxed' : item.status;

        const itemEl = document.createElement('div');
        itemEl.className = `shop-item ${statusClass}`;

        const btnText = isMaxed
          ? '已满级'
          : item.status === 'locked'
          ? '已锁定'
          : '购买';

        const lockReasonEl = item.status === 'locked' && item.lockReason
          ? `<div class="shop-item-lock-reason">${ICONS.lock} ${item.lockReason}</div>`
          : '';

        const costEl = isMaxed
          ? '<span class="shop-item-cost">—</span>'
          : `<div class="shop-item-cost">
              <span class="cost-icon">
                <svg viewBox="0 0 24 24"><polygon points="12,2 15,9 22,9 16.5,13.5 18.5,21 12,16.5 5.5,21 7.5,13.5 2,9 9,9"/></svg>
              </span>
              ${cost}
            </div>`;

        itemEl.innerHTML = `
          <div class="shop-item-head">
            <div class="shop-item-icon">${item.icon}</div>
            <div class="shop-item-info">
              <div class="shop-item-name">${item.name}</div>
              <div class="shop-item-desc">${item.desc}</div>
              ${lockReasonEl}
            </div>
          </div>
          <div class="shop-item-level">Lv.${item.level} / ${item.maxLevel}</div>
          <div class="shop-item-foot">
            ${costEl}
            <button class="shop-buy-btn" ${item.status === 'locked' || isMaxed ? 'disabled' : ''}>${btnText}</button>
          </div>
        `;

        // 购买按钮交互
        const btn = itemEl.querySelector('.shop-buy-btn');
        if (btn && !btn.disabled) {
          btn.addEventListener('click', () => {
            if (item.level < item.maxLevel) {
              item.level += 1;
              if (item.level >= item.maxLevel) {
                item.status = 'maxed';
              }
              render(currentCat);
            }
          });
        }

        gridEl.appendChild(itemEl);
      });
    }

    catBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.cat;
        if (cat === currentCat) return;
        currentCat = cat;
        catBtns.forEach(b => b.classList.toggle('active', b === btn));
        render(cat);
      });
    });

    render(currentCat);
  }

  // ============ Buff 按钮交互 ============
  function initBuffButtons() {
    const btns = document.querySelectorAll('.buff-btn, .explore-btn, .recipe-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btn.textContent = '✓ 已激活';
        btn.style.opacity = '0.7';
        setTimeout(() => {
          btn.textContent = btn.classList.contains('explore-btn')
            ? '派遣中...'
            : btn.classList.contains('recipe-btn')
            ? '已兑换'
            : '激活中...';
        }, 300);
        setTimeout(() => {
          btn.textContent = btn.classList.contains('explore-btn')
            ? '派遣'
            : btn.classList.contains('recipe-btn')
            ? '兑换'
            : '激活';
          btn.style.opacity = '1';
        }, 2000);
      });
    });
  }

  // ============ 键盘快捷键支持 ============
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', e => {
      // 忽略输入框中按键
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const key = e.key;
      const sectionMap = {
        o: 'overview',
        O: 'overview',
        r: 'research',
        R: 'research',
        k: 'shortcuts',
        K: 'shortcuts',
        m: 'save',
        M: 'save',
      };

      if (sectionMap[key]) {
        e.preventDefault();
        if (window.__switchSection) {
          window.__switchSection(sectionMap[key]);
        }
      }
    });
  }

  // ============ 宣告可升级 ============
  function announceUpgrade() {
    window.parent.postMessage({ type: 'miaoda:upgrade:available', kind: 'interactive-prototype' }, '*');
  }

  // ============ 初始化 ============
  function init() {
    initStarfield();
    initNavigation();
    initMobileSidebar();
    initReactorActivity();
    initTechTree();
    initShop();
    initBuffButtons();
    initKeyboardShortcuts();

    announceUpgrade();
    if (document.readyState !== 'complete') {
      window.addEventListener('load', announceUpgrade, { once: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
