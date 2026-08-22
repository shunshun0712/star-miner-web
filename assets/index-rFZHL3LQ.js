var Bu=Object.defineProperty;var zu=(i,e,t)=>e in i?Bu(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var O=(i,e,t)=>zu(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Hu="v0.5",wr=9,Ko=5,Gu=8*3600*1e3,Vu=4,Wu=8,qa=1,hd=1.7,Xu=.2,$u=.25,Dc=3,qu=1250,Yu=20,ju=100,fd=120*1e3,Ic=180*1e3,Ku=300*1e3,Zu=30*1e3,Ju=1.5,ta=50,pd=60*1e3,Qu=.8,eh=.9,Ya=200,th=.05,Zo=50,md=10,nh=[{id:"credits",name:"信用点",description:"星际通用货币，用于解锁设施、升级和研究",category:"currency",sellable:!1,consumable:!0,stateKey:"credits",schemaVersion:1},{id:"crystal",name:"晶体",description:"精炼星尘得到的晶体，用于高级升级和科技研究",category:"material",sellable:!0,consumable:!0,stateKey:"crystal",schemaVersion:1},{id:"isotope",name:"同位素",description:"稀有矿同位素，T3/T4 节点消耗预留资源",category:"rare",sellable:!1,consumable:!0,stateKey:"isotope",schemaVersion:1},{id:"antimatter",name:"反物质",description:"T3 科技节点消耗的稀有资源，通过深空探索获取",category:"rare",sellable:!1,consumable:!0,stateKey:"antimatter",schemaVersion:1},{id:"darkmatter",name:"暗物质",description:"T4 科技节点消耗的稀有资源，通过深空探索获取",category:"rare",sellable:!1,consumable:!0,stateKey:"darkmatter",schemaVersion:1}],ih=50,sh=1e3,rh=15,ah=.2,kr=200,Ar=100,oh=30*1e3,ch=60*1e3,lh=1.2,dh=.8,uh=.9,hh=1.15,fh=1.1,ph=1.2,mh=1.3,gh=2,vh=1.05,_h=.9,xh=1.25,yh=.2,Mh=.05,Sh=.5,Eh=1,bh=3,Th=10,wh=.01,sn={excavator:{id:"excavator",name:"星尘采掘器",baseSpeed:1.2,baseCapacity:2e3,baseUpgradeCost:50,baseCrystalUpgradeCost:4,unlockCost:0,produces:"stardust",rateUnit:"星尘矿/秒"},he3Excavator:{id:"he3Excavator",name:"氦-3 采掘器",baseSpeed:1.2,baseCapacity:2e3,baseUpgradeCost:50,baseCrystalUpgradeCost:4,unlockCost:qu,produces:"stardust",rateUnit:"星尘矿/秒"},deuteriumExcavator:{id:"deuteriumExcavator",name:"氘采掘器",baseSpeed:1.4,baseCapacity:2500,baseUpgradeCost:80,baseCrystalUpgradeCost:6,unlockCost:3e3,produces:"stardust",rateUnit:"星尘矿/秒"},transport:{id:"transport",name:"磁轨运输线",baseSpeed:1,baseCapacity:2e3,baseUpgradeCost:120,baseCrystalUpgradeCost:6,unlockCost:600,produces:"stardust",rateUnit:"星尘矿/秒"},refinery:{id:"refinery",name:"晶体精炼厂",baseSpeed:.25,baseCapacity:1e3,baseUpgradeCost:300,baseCrystalUpgradeCost:10,unlockCost:1e3,produces:"crystal",consumes:{resource:"stardust",amountPerOutput:4},rateUnit:"晶体/秒"},energyStation:{id:"energyStation",name:"能源站",baseSpeed:1,baseCapacity:0,baseUpgradeCost:200,baseCrystalUpgradeCost:8,unlockCost:sh,produces:"energy",rateUnit:"能量/秒"}},tn=["excavator","he3Excavator","deuteriumExcavator","transport","refinery","energyStation"],gd={excavation:{excavator:1.35,he3Excavator:1.35,deuteriumExcavator:1.35,transport:.9,refinery:.9,energyStation:1},balanced:{excavator:1,he3Excavator:1,deuteriumExcavator:1,transport:1,refinery:1,energyStation:1},refinement:{excavator:.9,he3Excavator:.9,deuteriumExcavator:.9,transport:.9,refinery:1.35,energyStation:1}},Ah={excavation:{excavator:.6,he3Excavator:.6,deuteriumExcavator:.6,transport:1.3,refinery:1.3,energyStation:0},balanced:{excavator:1,he3Excavator:1,deuteriumExcavator:1,transport:1,refinery:1,energyStation:0},refinement:{excavator:1.3,he3Excavator:1.3,deuteriumExcavator:1.3,transport:1.3,refinery:.6,energyStation:0}},Ch=["excavator","he3Excavator","deuteriumExcavator","transport","refinery"],vd=["excavation","balanced","refinement"],vr={excavation:"采掘优先",balanced:"均衡运行",refinement:"精炼优先"},_d=["excavation","energy","refinement","transport"],Rh={excavation:"采掘科技",energy:"能源科技",refinement:"精炼科技",transport:"运输科技"},Jo=[{id:"basicResearch",branch:"excavation",tier:0,name:"基础研究",description:"建立研究中心，解锁四大科技分支",cost:15,requires:[]},{id:"drillHardening",branch:"excavation",tier:1,name:"强化钻头",description:"所有采掘器 +15% 产量",cost:20,requires:["basicResearch"]},{id:"veinProspecting",branch:"excavation",tier:1,name:"矿脉探测",description:"采掘按期望 +10% 产量（10% 概率双倍）",cost:25,requires:["basicResearch"]},{id:"autoMiningArray",branch:"excavation",tier:2,name:"自动采掘阵列",description:"每个采掘器额外 +1 级自动产出（不占等级上限）",cost:80,requires:["drillHardening"]},{id:"rareIsotopeMining",branch:"excavation",tier:2,name:"稀有矿同位素",description:"采掘时有概率获得「同位素」（按期望 5%/秒）",cost:100,requires:["veinProspecting"]},{id:"quantumMining",branch:"excavation",tier:3,name:"量子采掘",description:"采掘速度 +50%（后续版本开放）",cost:300,requires:["autoMiningArray"]},{id:"nanoCollector",branch:"excavation",tier:3,name:"纳米采集器",description:"同位素获取概率提升（后续版本开放）",cost:350,requires:["rareIsotopeMining"]},{id:"coreMiningProtocol",branch:"excavation",tier:4,name:"星核采掘协议",description:"所有采掘器产量 ×2（后续版本开放）",cost:800,requires:["quantumMining","nanoCollector"]},{id:"highEfficiencyTurbine",branch:"energy",tier:1,name:"高效涡轮",description:"全设施能源消耗 -10%",cost:20,requires:["basicResearch"]},{id:"solarPanels",branch:"energy",tier:1,name:"太阳能板",description:"均衡策略下全设施产量 +5%",cost:25,requires:["basicResearch"]},{id:"energyReserve",branch:"energy",tier:2,name:"能源储备",description:"解锁能量储备池（200 容量）与「释放储备」",cost:80,requires:["highEfficiencyTurbine"]},{id:"overloadProtection",branch:"energy",tier:2,name:"过载保护",description:"能源不足惩罚由 -20% 降至 -10%",cost:100,requires:["solarPanels"]},{id:"fusionReactor",branch:"energy",tier:3,name:"聚变反应堆",description:"解锁第四档聚变模式（后续版本开放）",cost:300,requires:["energyReserve"]},{id:"smartGrid",branch:"energy",tier:3,name:"智能电网",description:"设施独立能源策略（后续版本开放）",cost:350,requires:["overloadProtection"]},{id:"zeroPointExtraction",branch:"energy",tier:4,name:"零点能提取",description:"能源不再受限（后续版本开放）",cost:800,requires:["fusionReactor","smartGrid"]},{id:"efficientCatalysis",branch:"refinement",tier:1,name:"高效催化",description:"精炼速度 +20%",cost:20,requires:["basicResearch"]},{id:"recipeOptimization",branch:"refinement",tier:1,name:"配方优化",description:"精炼配方 4:1 → 3:1",cost:30,requires:["basicResearch"]},{id:"byproductRecovery",branch:"refinement",tier:2,name:"副产品回收",description:"精炼时额外产出 20% 星尘",cost:80,requires:["efficientCatalysis"]},{id:"crystalQuality",branch:"refinement",tier:2,name:"晶体品质",description:"晶体售价 +25%",cost:100,requires:["recipeOptimization"]},{id:"quantumRefining",branch:"refinement",tier:3,name:"量子精炼",description:"2:1 配方与高品质晶体（后续版本开放）",cost:350,requires:["byproductRecovery"]},{id:"autoRefiningChain",branch:"refinement",tier:3,name:"自动精炼链",description:"精炼厂等级上限 +2（后续版本开放）",cost:300,requires:["crystalQuality"]},{id:"matterRecomposition",branch:"refinement",tier:4,name:"物质重组",description:"1:1 配方与晶体裂变（后续版本开放）",cost:900,requires:["quantumRefining","autoRefiningChain"]},{id:"railAcceleration",branch:"transport",tier:1,name:"磁轨加速",description:"运输速度 +30%",cost:20,requires:["basicResearch"]},{id:"cargoExpansion",branch:"transport",tier:1,name:"扩容货舱",description:"运输容量 +50%",cost:25,requires:["basicResearch"]},{id:"parallelRails",branch:"transport",tier:2,name:"多轨并行",description:"运输速度 ×2",cost:120,requires:["railAcceleration"]},{id:"droneLogistics",branch:"transport",tier:2,name:"无人机配送",description:"解锁物流无人机：0.5 星尘/秒直送精炼缓冲",cost:100,requires:["cargoExpansion"]},{id:"quantumTeleport",branch:"transport",tier:3,name:"量子传送",description:"运输瞬间到达（后续版本开放）",cost:400,requires:["parallelRails"]},{id:"logisticsAI",branch:"transport",tier:3,name:"物流 AI",description:"自动优化运输优先级（后续版本开放）",cost:300,requires:["droneLogistics"]},{id:"spaceFold",branch:"transport",tier:4,name:"空间折叠",description:"所有矿区共享库存池（后续版本开放）",cost:850,requires:["quantumTeleport","logisticsAI"]}],ts=Object.fromEntries(Jo.map(i=>[i.id,i])),Qo=[{id:"p100Stardust",category:"production",name:"初出茅庐",description:"累计产出 100 星尘矿",rewardCredits:50,rewardCrystals:1},{id:"p1000Stardust",category:"production",name:"星尘大户",description:"累计产出 1000 星尘矿",rewardCredits:150,rewardCrystals:3},{id:"p100Crystal",category:"production",name:"晶体学徒",description:"累计产出 100 晶体",rewardCredits:300,rewardCrystals:5},{id:"p500Crystal",category:"production",name:"晶体工匠",description:"累计产出 500 晶体",rewardCredits:800,rewardCrystals:10},{id:"p1000Crystal",category:"production",name:"晶体大师",description:"累计产出 1000 晶体",rewardCredits:1500,rewardCrystals:20},{id:"c1000Credits",category:"production",name:"第一桶金",description:"累计获得 1000 信用点",rewardCredits:100,rewardCrystals:2},{id:"c10000Credits",category:"production",name:"致富之路",description:"累计获得 10000 信用点",rewardCredits:500,rewardCrystals:8},{id:"e1000Energy",category:"production",name:"能源先驱",description:"累计产出 1000 能量",rewardCredits:200,rewardCrystals:4},{id:"allFacilities",category:"construction",name:"设施齐全",description:"解锁全部 6 个设施",rewardCredits:400,rewardCrystals:6},{id:"allLevel3",category:"construction",name:"全员三级",description:"所有已解锁设施达到 3 级",rewardCredits:500,rewardCrystals:8},{id:"anyLevel5",category:"construction",name:"满级王者",description:"任一设施达到 5 级",rewardCredits:600,rewardCrystals:10},{id:"researchCenter",category:"construction",name:"研究中心成立",description:"解锁研究中心",rewardCredits:300,rewardCrystals:5},{id:"allMines",category:"construction",name:"矿区全开",description:"解锁第二与第三矿区",rewardCredits:350,rewardCrystals:6},{id:"tBasic",category:"tech",name:"启蒙",description:"完成基础研究",rewardCredits:100,rewardCrystals:2},{id:"tBranchT1",category:"tech",name:"分支奠基",description:"任一分支完成全部 T1 科技",rewardCredits:200,rewardCrystals:4},{id:"t5",category:"tech",name:"科技新星",description:"累计研究 5 个科技",rewardCredits:400,rewardCrystals:6},{id:"t10",category:"tech",name:"科技学者",description:"累计研究 10 个科技",rewardCredits:800,rewardCrystals:12},{id:"tExcavation",category:"tech",name:"采掘学成",description:"完成采掘分支 T1–T2 全部科技",rewardCredits:600,rewardCrystals:10},{id:"tRefinement",category:"tech",name:"精炼学成",description:"完成精炼分支 T1–T2 全部科技",rewardCredits:600,rewardCrystals:10},{id:"ev10",category:"event",name:"事件初体验",description:"累计触发 10 次事件",rewardCredits:150,rewardCrystals:3},{id:"evDrone20",category:"event",name:"无人机常客",description:"处理 20 次无人机事件",rewardCredits:300,rewardCrystals:5},{id:"evStorm3",category:"event",name:"风暴见证者",description:"经历 3 次太阳风暴",rewardCredits:250,rewardCrystals:4},{id:"evInvest1",category:"event",name:"投资有道",description:"完成 1 次投入型事件",rewardCredits:200,rewardCrystals:4},{id:"ev30",category:"event",name:"事件达人",description:"累计触发 30 次事件",rewardCredits:500,rewardCrystals:8},{id:"xIsotope10",category:"exploration",name:"同位素收藏家",description:"累计获得 10 个同位素",rewardCredits:300,rewardCrystals:5},{id:"xHe3L3",category:"exploration",name:"氦三深潜",description:"氦-3 采掘器达到 3 级",rewardCredits:250,rewardCrystals:4},{id:"xDeutL3",category:"exploration",name:"氘三远征",description:"氘-3 采掘器达到 3 级",rewardCredits:350,rewardCrystals:6},{id:"hOffline",category:"hidden",name:"深空静默",description:"单次离线收益达到 500 晶体",rewardCredits:1e3,rewardCrystals:20},{id:"hEnergyFull",category:"hidden",name:"能量富余",description:"能量储备达到 200",rewardCredits:400,rewardCrystals:8},{id:"hCombo",category:"hidden",name:"科技能源双修",description:"研究科技 ≥6 个且能量储备 ≥100",rewardCredits:700,rewardCrystals:12}],Ph=Object.fromEntries(Qo.map(i=>[i.id,i])),Lh={production:"生产",construction:"建设",tech:"科技",event:"事件",exploration:"探索",hidden:"隐藏"},On={"shop-credit-injection":{id:"shop-credit-injection",name:"信用点注入",description:"购买后立即获得 500 信用点（每级效果叠加）",category:"economy",baseCost:3,costMultiplier:1.5,maxLevel:5,prerequisites:[],onPurchase(i,e){i.credits+=500}},"shop-credit-amplifier":{id:"shop-credit-amplifier",name:"信用放大器",description:"出售资源获得的信用点每级 +15%（持续生效）",category:"economy",baseCost:6,costMultiplier:1.6,maxLevel:3,prerequisites:[{itemId:"shop-credit-injection",level:1}]},"shop-starting-fund":{id:"shop-starting-fund",name:"启动资金",description:"每次转生后初始信用点 +300×等级（叠加在裸基线 100 之上）",category:"economy",baseCost:8,costMultiplier:1.7,maxLevel:3,prerequisites:[{itemId:"shop-credit-injection",level:1}],onBaseline(i,e){i.credits+=300*e}},"shop-excavator-tuning":{id:"shop-excavator-tuning",name:"采掘器调校",description:"每次转生后采掘器额外 +1 级（每级叠加，上限受 effectiveMaxLevel 约束）",category:"production",baseCost:5,costMultiplier:1.5,maxLevel:3,prerequisites:[{itemId:"shop-credit-injection",level:1}],onBaseline(i,e){i.facilities.excavator.level=Math.min(5,i.facilities.excavator.level+e)}},"shop-ore-booster":{id:"shop-ore-booster",name:"矿石增幅器",description:"所有采掘器矿石产量每级 +20%（持续生效）",category:"production",baseCost:7,costMultiplier:1.6,maxLevel:3,prerequisites:[{itemId:"shop-excavator-tuning",level:1}]},"shop-overdrive":{id:"shop-overdrive",name:"超频驱动",description:"所有设施产出速率每级 +10%（持续生效）",category:"production",baseCost:12,costMultiplier:1.8,maxLevel:2,prerequisites:[{itemId:"shop-ore-booster",level:1}]},"shop-isotope-enrichment":{id:"shop-isotope-enrichment",name:"同位素富集",description:"同位素获取概率每级 +25%（持续生效）",category:"production",baseCost:9,costMultiplier:1.7,maxLevel:2,prerequisites:[{itemId:"shop-credit-injection",level:1}]},"shop-research-subsidy":{id:"shop-research-subsidy",name:"研究补贴",description:"购买后永久解锁研究中心（无需晶体）",category:"research",baseCost:8,costMultiplier:1.8,maxLevel:1,prerequisites:[],onPurchase(i,e){i.researchCenterUnlocked=!0}},"shop-research-grant":{id:"shop-research-grant",name:"研究资助",description:"所有科技研究成本每级 -10%（持续生效）",category:"research",baseCost:10,costMultiplier:1.7,maxLevel:3,prerequisites:[{itemId:"shop-research-subsidy",level:1}]},"shop-advanced-research":{id:"shop-advanced-research",name:"高级研究授权",description:"解锁 T3 层科技（量子采掘、聚变反应堆、量子精炼等）",category:"research",baseCost:20,costMultiplier:2,maxLevel:1,prerequisites:[{itemId:"shop-research-grant",level:2}]},"shop-he3-permit":{id:"shop-he3-permit",name:"氦-3 开采许可",description:"每次转生后氦-3 采掘器默认解锁",category:"facility",baseCost:10,costMultiplier:2,maxLevel:1,prerequisites:[{itemId:"shop-credit-injection",level:1}],onBaseline(i,e){i.facilities.he3Excavator.unlocked=!0}},"shop-deuterium-permit":{id:"shop-deuterium-permit",name:"氘开采许可",description:"每次转生后氘采掘器默认解锁",category:"facility",baseCost:14,costMultiplier:2,maxLevel:1,prerequisites:[{itemId:"shop-he3-permit",level:1}],onBaseline(i,e){i.facilities.deuteriumExcavator.unlocked=!0}},"shop-level-cap":{id:"shop-level-cap",name:"等级突破",description:"设施等级上限每级 +1（裸上限 5，每级突破上限）",category:"facility",baseCost:18,costMultiplier:2.2,maxLevel:2,prerequisites:[{itemId:"shop-credit-injection",level:2}]},"shop-stardust-resonance":{id:"shop-stardust-resonance",name:"星核共鸣",description:"每次转生后初始星尘 +50×等级",category:"prestige",baseCost:15,costMultiplier:2,maxLevel:3,prerequisites:[{itemId:"shop-credit-injection",level:2}],onBaseline(i,e){i.stardust+=50*e}},"shop-prestige-amplifier":{id:"shop-prestige-amplifier",name:"转生增幅器",description:"转生结算获得的星核每级 +25%（持续生效）",category:"prestige",baseCost:25,costMultiplier:2.5,maxLevel:2,prerequisites:[{itemId:"shop-stardust-resonance",level:1}]}};function Ut(i,e){return i.prestige.shopPurchases[e]??0}function Br(i,e){const t=On[e];if(!t)return 1/0;const n=Ut(i,e);return Math.floor(t.baseCost*Math.pow(t.costMultiplier,n))}function Dh(i,e){const t=On[e];if(!t)return{ok:!1,reason:`未知商店物品: ${e}`};if(Ut(i,e)>=t.maxLevel)return{ok:!1,reason:`${t.name}已满级（${t.maxLevel}级）`};const s=Br(i,e);if(i.prestige.stardust<s)return{ok:!1,reason:`星核不足（需 ${s}，余 ${i.prestige.stardust}）`};for(const r of t.prerequisites)if(Ut(i,r.itemId)<r.level){const o=On[r.itemId];return{ok:!1,reason:`需要${(o==null?void 0:o.name)??r.itemId}达到 ${r.level} 级`}}return{ok:!0}}async function Ih(i,e,t){const n=Dh(e,t);if(!n.ok)return{ok:!1,error:n.reason};const s=Br(e,t),a=Ut(e,t)+1;let o;try{o=i.begin(e)}catch(d){return{ok:!1,error:d instanceof Error?d.message:"事务启动失败"}}const c=o.getState();c.prestige.stardust-=s,c.prestige.shopPurchases[t]=a;const l=On[t];l.onPurchase&&l.onPurchase(c,a);try{await o.commit()}catch(d){return o.isDone()||o.rollback(),{ok:!1,error:d instanceof Error?d.message:"提交事务失败"}}return{ok:!0,state:e,itemId:t,newLevel:a,cost:s}}function Uh(i){const e=i.prestige.shopPurchases;for(const t of Object.keys(e)){const n=e[t];if(n<=0)continue;const s=On[t];s&&s.onBaseline&&s.onBaseline(i,n)}}function Nh(i){return 1+.2*Ut(i,"shop-ore-booster")}function Oh(i){return 1+.1*Ut(i,"shop-overdrive")}function Fh(i){return 1+.25*Ut(i,"shop-isotope-enrichment")}function kh(i){return 1+.15*Ut(i,"shop-credit-amplifier")}function Bh(i){return Math.max(.1,1-.1*Ut(i,"shop-research-grant"))}function xd(i){return 1+.25*Ut(i,"shop-prestige-amplifier")}function yd(i){return Ko+Ut(i,"shop-level-cap")}function zh(i){return Ut(i,"shop-advanced-research")>=1}function dt(i,e){return i.research.includes(e)}function Md(i,e){const t=ts[e];return t?Math.max(0,Math.floor(t.cost*Bh(i))):1/0}function Sd(i,e){var s;const t=ts[e];if(!t)return{ok:!1,reason:"未知科技"};if(dt(i,e))return{ok:!1,reason:"已研究"};if(t.tier>2&&!zh(i))return{ok:!1,reason:"后续版本开放"};for(const r of t.requires)if(!dt(i,r))return{ok:!1,reason:`需先研究「${((s=ts[r])==null?void 0:s.name)??r}」`};const n=Md(i,e);return i.crystal<n?{ok:!1,reason:`晶体不足（需 ${n}）`}:{ok:!0}}function Hh(i,e){const t=Sd(i,e);return t.ok?(i.crystal-=Md(i,e),i.research.push(e),i.stats.researchesCompleted+=1,{ok:!0}):t}function na(i,e,t,n){const s=Jo.filter(r=>r.branch===e&&r.tier>=t&&r.tier<=n);return s.length>0&&s.every(r=>dt(i,r.id))}function Ed(i){return i.achievements.length}function bd(i){return 1+Math.floor(Ed(i)/Th)*wh}function Gh(i,e){const t=i.stats;switch(e){case"p100Stardust":return t.totalStardustProduced>=100;case"p1000Stardust":return t.totalStardustProduced>=1e3;case"p100Crystal":return t.totalCrystalProduced>=100;case"p500Crystal":return t.totalCrystalProduced>=500;case"p1000Crystal":return t.totalCrystalProduced>=1e3;case"c1000Credits":return t.totalCreditsEarned>=1e3;case"c10000Credits":return t.totalCreditsEarned>=1e4;case"e1000Energy":return t.totalEnergyProduced>=1e3;case"allFacilities":return tn.every(n=>i.facilities[n].unlocked);case"allLevel3":{const n=tn.filter(s=>i.facilities[s].unlocked);return n.length>0&&n.every(s=>i.facilities[s].level>=3)}case"anyLevel5":return tn.some(n=>i.facilities[n].level>=5);case"researchCenter":return i.researchCenterUnlocked;case"allMines":return i.facilities.he3Excavator.unlocked&&i.facilities.deuteriumExcavator.unlocked;case"tBasic":return dt(i,"basicResearch");case"tBranchT1":return _d.some(n=>na(i,n,1,1));case"t5":return t.researchesCompleted>=5;case"t10":return t.researchesCompleted>=10;case"tExcavation":return na(i,"excavation",1,2);case"tRefinement":return na(i,"refinement",1,2);case"ev10":return t.eventsTriggered>=10;case"evDrone20":return t.droneEventsHandled>=20;case"evStorm3":return t.solarStormsExperienced>=3;case"evInvest1":return t.investmentsMade>=1;case"ev30":return t.eventsTriggered>=30;case"xIsotope10":return t.totalIsotopeProduced>=10;case"xHe3L3":return i.facilities.he3Excavator.level>=3;case"xDeutL3":return i.facilities.deuteriumExcavator.level>=3;case"hOffline":return t.lastOfflineCrystalGain>=500;case"hEnergyFull":return i.energy>=kr;case"hCombo":return t.researchesCompleted>=6&&i.energy>=100;default:return!1}}function Td(i){const e=[];for(const t of Qo)i.achievements.includes(t.id)||Gh(i,t.id)&&(i.achievements.push(t.id),i.credits+=t.rewardCredits,i.crystal+=t.rewardCrystals,e.push(t));return e}function ec(i){const e=Wu;return dt(i,"crystalQuality")?e*xh:e}function zr(i,e){const t=sn[e];return Math.round(t.baseUpgradeCost*Math.pow(hd,i.facilities[e].level-1)+1e-9)}function Hr(i,e){const t=i.facilities[e];if(t.level<Dc)return 0;const n=sn[e];return Math.round(n.baseCrystalUpgradeCost*Math.pow(hd,t.level-Dc)+1e-9)}function wd(i,e){const t=i.facilities[e];if(!t.unlocked)return{ok:!1,reason:"设施未解锁"};if(t.level>=yd(i))return{ok:!1,reason:"已达最高等级"};const n=zr(i,e);if(i.credits<n)return{ok:!1,reason:`信用点不足（需 ${n}）`};const s=Hr(i,e);return i.crystal<s?{ok:!1,reason:`晶体不足（需 ${s}）`}:{ok:!0}}function Vh(i,e){const t=wd(i,e);if(!t.ok)return t;const n=zr(i,e),s=Hr(i,e);return i.credits-=n,i.crystal-=s,i.facilities[e].level+=1,i.stats.upgradesPerformed+=1,{ok:!0}}function tc(i,e){return sn[e].unlockCost}function nc(i,e){return e==="he3Excavator"?Yu:e==="deuteriumExcavator"?ju:e==="energyStation"?rh:0}function Ad(i,e){if(i.facilities[e].unlocked)return{ok:!1,reason:"设施已解锁"};const n=tc(i,e);if(i.credits<n)return{ok:!1,reason:`信用点不足（需 ${n}）`};const s=nc(i,e);return i.crystal<s?{ok:!1,reason:`晶体不足（需 ${s}）`}:{ok:!0}}function Wh(i,e){const t=Ad(i,e);return t.ok?(i.credits-=tc(i,e),i.crystal-=nc(i,e),i.facilities[e].unlocked=!0,{ok:!0}):t}function ja(i,e,t){const n=kh(i);if(e==="stardust"){const s=i.stardust;if(s<=0)return 0;const r=t===void 0?s:Math.max(0,Math.min(Math.floor(t),s));if(r<=0)return 0;const a=Math.floor(r*qa*n);return i.credits+=a,i.stardust-=r,i.stats.totalCreditsEarned+=a,a}if(e==="crystal"){const s=i.crystal;if(s<=0)return 0;const r=t===void 0?s:Math.max(0,Math.min(Math.floor(t),s));if(r<=0)return 0;const a=Math.floor(r*ec(i)*n);return i.credits+=a,i.crystal-=r,i.stats.totalCreditsEarned+=a,a}return 0}function Xh(i){const e={stardust:0,crystal:0};if(i.settings.autoSellStardust){const t=Math.floor(i.stardust-i.settings.stardustKeepAmount);t>0&&(e.stardust+=ja(i,"stardust",t))}if(i.settings.autoSellCrystal){const t=Math.floor(i.crystal-i.settings.crystalKeepAmount);t>0&&(e.crystal+=ja(i,"crystal",t))}return e}function $h(i,e){vd.includes(e)&&(i.energyStrategy=e)}function ic(i){const e=dt(i,"highEfficiencyTurbine")?_h:1,t=Ah[i.energyStrategy];let n=0;for(const s of Ch)i.facilities[s].unlocked&&(n+=ah*t[s]);return n*e}function qh(i,e){return i.energyReleaseUntil>e}function Cd(i,e){return dt(i,"energyReserve")?e<i.energyReleaseCooldownUntil?{ok:!1,reason:"储备释放冷却中"}:i.energy<Ar?{ok:!1,reason:`能量不足（需 ${Ar}）`}:{ok:!0}:{ok:!1,reason:"需先研究「能源储备」"}}function Yh(i,e){const t=Cd(i,e);return t.ok?(i.energy-=Ar,i.energyReleaseUntil=e+oh,i.energyReleaseCooldownUntil=e+ch,{ok:!0}):t}function jh(i,e,t){let n=1;return i.eventState.investUsed&&e==="excavator"&&(n*=1+th),t<i.eventState.droneBoostUntil&&(n*=Ju),t<i.eventState.solarStormUntil&&(n*=i.energyStrategy==="balanced"?eh:Qu),n}function Rd(i,e,t=Math.random){const n=Ic+t()*(Ku-Ic);return e+n}function Kh(i,e=Math.random){const t=e(),n=!i.eventState.investUsed&&i.credits>=Ya;if(n&&t<.15)return"invest";let s=t;return!n&&t<.15&&(s=e()),s<.4?"solar-storm":"drone"}function Zh(i,e,t=Math.random){if(i.eventState.pendingEvent||e<i.eventState.nextEventAt)return null;const n=Kh(i,t),s={id:`ev-${e}-${Math.floor(t()*1e6)}`,kind:n,createdAt:e};return i.stats.eventsTriggered+=1,n==="solar-storm"?(i.eventState.solarStormUntil=e+pd,i.stats.solarStormsExperienced+=1):i.eventState.pendingEvent=s,i.eventState.nextEventAt=Rd(i,e,t),s}function Cr(i,e,t={}){const n=i.eventState.pendingEvent;if(!n||n.id!==e)return{ok:!1,reason:"事件不存在"};if(n.kind==="drone"){const s=t.choice;return s?(i.eventState.pendingEvent=null,i.stats.droneEventsHandled+=1,s==="A"?(i.credits+=ta,i.stats.totalCreditsEarned+=ta,{ok:!0,kind:"drone",choice:s,creditsGained:ta}):(i.eventState.droneBoostUntil=(t.now??Date.now())+Zu,{ok:!0,kind:"drone",choice:s})):{ok:!1,reason:"请选择 A 或 B"}}return n.kind==="invest"?(i.eventState.pendingEvent=null,t.confirm!==!0?{ok:!0,kind:"invest",applied:!1}:i.credits<Ya?{ok:!1,reason:"信用点不足"}:(i.credits-=Ya,i.eventState.investUsed=!0,i.stats.investmentsMade+=1,{ok:!0,kind:"invest",applied:!0})):{ok:!1,reason:"无需结算的事件"}}function Pe(i){if(!Number.isFinite(i))return"∞";const e=Math.abs(i);return e>=1e9?`${ia(i/1e9)}B`:e>=1e6?`${ia(i/1e6)}M`:e>=1e3?`${ia(i/1e3)}K`:Number.isInteger(i)?i.toLocaleString("en-US"):i.toLocaleString("en-US",{maximumFractionDigits:2})}function ia(i){return i.toFixed(2).replace(/\.?0+$/,"")}function Jn(i){const e=Math.floor(i/1e3);if(e<60)return`${e} 秒`;const t=Math.floor(e/60);if(t<60)return`${t} 分钟`;const n=Math.floor(t/60),s=t%60;if(n<24)return s>0?`${n} 小时 ${s} 分`:`${n} 小时`;const r=Math.floor(n/24),a=n%24;return a>0?s>0?`${r} 天 ${a} 小时 ${s} 分`:`${r} 天 ${a} 小时`:`${r} 天`}function ms(i,e){return`${i.toFixed(2)} ${e}`}const Jh=["excavator","he3Excavator","deuteriumExcavator"];function sa(i){return Jh.includes(i)}function sc(i){return dt(i,"recipeOptimization")?bh:Vu}function Ka(i,e,t,n=Date.now()){const s=i.facilities[e];if(!s.unlocked)return 0;const r=sn[e],a=gd[i.energyStrategy][e];let o=t??s.level;sa(e)&&dt(i,"autoMiningArray")&&(o+=Eh);let c=1;return sa(e)&&(dt(i,"drillHardening")&&(c*=hh),dt(i,"veinProspecting")&&(c*=fh)),e==="refinery"&&dt(i,"efficientCatalysis")&&(c*=ph),e==="transport"&&(dt(i,"railAcceleration")&&(c*=mh),dt(i,"parallelRails")&&(c*=gh)),dt(i,"solarPanels")&&i.energyStrategy==="balanced"&&(c*=vh),qh(i,n)&&(c*=lh),c*=bd(i),c*=Oh(i),sa(e)&&(c*=Nh(i)),r.baseSpeed*a*(1+Xu*(o-1))*jh(i,e,n)*c}function en(i,e,t=Date.now()){return Ka(i,e,void 0,t)}function Wi(i,e){const t=i.facilities[e];return t.unlocked?sn[e].baseCapacity*(1+$u*(t.level-1)):0}function Qh(i,e=Date.now()){return{excavator:en(i,"excavator",e),he3Excavator:en(i,"he3Excavator",e),deuteriumExcavator:en(i,"deuteriumExcavator",e),transport:en(i,"transport",e),refinery:en(i,"refinery",e),energyStation:en(i,"energyStation",e)}}function ef(i,e){const t=[];if(!i.facilities.excavator.unlocked)return t;if(e.excavator+e.he3Excavator+e.deuteriumExcavator>e.transport){const r=[];if(i.facilities.excavator.unlocked&&r.push(["excavator",e.excavator]),i.facilities.he3Excavator.unlocked&&r.push(["he3Excavator",e.he3Excavator]),i.facilities.deuteriumExcavator.unlocked&&r.push(["deuteriumExcavator",e.deuteriumExcavator]),r.length>0){let a=r[0][0],o=r[0][1];for(let c=1;c<r.length;c+=1)r[c][1]<o&&(o=r[c][1],a=r[c][0]);t.push(a)}}const s=e.refinery*sc(i);return e.transport>s&&t.push("transport"),t}function tf(i,e,t){if(!i.facilities.energyStation.unlocked)return{deficitFactor:1};const n=dt(i,"energyReserve"),s=e*t-ic(i)*t;let r=0;if(n){const o=i.energy;i.energy=Math.max(0,Math.min(kr,o+s)),s<0&&(r=Math.max(0,-s-o))}else s<0&&(r=-s);return{deficitFactor:r>1e-9?dt(i,"overloadProtection")?uh:dh:1}}function Pd(i,e,t={}){const n=e/1e3,s=t.now??Date.now(),r=Qh(i,s),a=t.unboundedCapacity===!0,o=r.energyStation*n;r.energyStation>0&&(i.stats.totalEnergyProduced+=o);const{deficitFactor:c}=tf(i,r.energyStation,n),l=z=>z*c,d=Wi(i,"excavator")+Wi(i,"he3Excavator")+Wi(i,"deuteriumExcavator"),u=Wi(i,"transport"),h=Wi(i,"refinery"),p=a?1/0:Math.max(0,d-i.stardust),g=Math.min(l(r.excavator+r.he3Excavator+r.deuteriumExcavator)*n,p);i.stardust=Math.max(0,i.stardust+g),i.stats.totalStardustProduced+=g;let v=0;dt(i,"rareIsotopeMining")&&(v=l(r.excavator+r.he3Excavator+r.deuteriumExcavator)*n*Mh*Fh(i),i.isotope=Math.max(0,i.isotope+v),i.stats.totalIsotopeProduced+=v);const m=i.facilities.transport.unlocked,f=i.facilities.refinery.unlocked,M=r.excavator+r.he3Excavator+r.deuteriumExcavator,b=m&&(M>r.transport||f&&i.refineryBuffer>=u-.01),y=m?Math.min(l(r.transport)*n,i.stardust):0,D=a?1/0:Math.max(0,u-i.refineryBuffer),A=f?Math.min(y,D):y;let w=0;f&&dt(i,"droneLogistics")&&(w=Math.max(0,Math.min(Sh*n,i.stardust-A,D-A))),f&&(i.stardust=Math.max(0,i.stardust-A-w),i.refineryBuffer=Math.max(0,i.refineryBuffer+A+w));const P=sc(i),E=a?1/0:Math.max(0,h-i.crystal),x=i.refineryBuffer/P,R=Math.min(l(r.refinery)*n,x,E);i.refineryBuffer=Math.max(0,i.refineryBuffer-R*P),i.crystal=Math.max(0,i.crystal+R),i.stats.totalCrystalProduced+=R;let k=0;return dt(i,"byproductRecovery")&&(k=R*yh,i.stardust=Math.max(0,i.stardust+k)),{producedStardust:g,movedStardust:A,movedDrone:w,refinedCrystal:R,byproductStardust:k,isotopeProduced:v,energyDeficit:c<1,rates:r,bottlenecks:ef(i,r),transportCongested:b}}function Za(i,e){const t=e-i.lastSavedAt,n=Math.max(0,Math.min(t,Gu));if(n<=0)return{applied:!1,elapsedMs:t,effectiveMs:n,summary:{producedStardust:0,movedStardust:0,movedDrone:0,refinedCrystal:0,byproductStardust:0,isotopeProduced:0,energyDeficit:!1,rates:{excavator:0,he3Excavator:0,deuteriumExcavator:0,transport:0,refinery:0,energyStation:0},bottlenecks:[],transportCongested:!1}};i.eventState.pendingEvent=null,i.eventState.droneBoostUntil=0,i.eventState.solarStormUntil=0,i.eventState.nextEventAt<=e&&(i.eventState.nextEventAt=Rd(i,e));const s=Pd(i,n,{unboundedCapacity:!0,now:e});return i.lastSavedAt=e,i.stats.lastOfflineCrystalGain=s.refinedCrystal,{applied:!0,elapsedMs:t,effectiveMs:n,summary:s}}function Ld(){return{active:[],aggregate:{completedEvents:0,consumedByResource:{},producedByResource:{}}}}function rc(){return{unlocked:[],stardust:0,prestigeLevel:0,history:[],shopPurchases:{}}}const ac={"prestige-start-credits":{id:"prestige-start-credits",name:"初始信用点 +500",description:"每次转生后从 600 信用点起步（裸初始态为 100）",apply(i){i.credits+=500}},"prestige-he3-unlock":{id:"prestige-he3-unlock",name:"初始解锁氦-3 采矿器",description:"每次转生后氦-3 采矿器默认解锁（裸初始态为锁定）",apply(i){i.facilities.he3Excavator.unlocked=!0}}};function nf(i){return i in ac}function Dd(i){return JSON.stringify(i,null,2)}function sf(i){const{prestige:e,...t}=i;return JSON.stringify({version:wr,main:t,prestige:e},null,2)}function rf(i){let e;try{e=JSON.parse(i)}catch{return{ok:!1,error:"JSON 格式错误"}}if(typeof e!="object"||e===null)return{ok:!1,error:"存档不是有效的对象"};const t=e;if(typeof t.main=="object"&&t.main!==null&&typeof t.prestige=="object"&&t.prestige!==null){const n=t.main,s=t.prestige,r={...n,prestige:s};return typeof t.version=="number"?r.version=t.version:typeof n.version=="number"&&(r.version=n.version),Ja(r)}return Ja(t)}function qe(i){return typeof i=="number"&&Number.isFinite(i)}function Id(){return{totalStardustProduced:0,totalCrystalProduced:0,totalCreditsEarned:0,totalEnergyProduced:0,totalIsotopeProduced:0,eventsTriggered:0,droneEventsHandled:0,solarStormsExperienced:0,investmentsMade:0,upgradesPerformed:0,researchesCompleted:0,lastOfflineCrystalGain:0}}const af=["drone","solar-storm","invest"];function of(i){return{pendingEvent:null,nextEventAt:i+fd,droneBoostUntil:0,solarStormUntil:0,investUsed:!1}}function cf(i){const e=i.facilities??{};e.he3Excavator={level:1,unlocked:i.secondMineUnlocked===!0};const t=qe(i.createdAt)?i.createdAt:Date.now();return{...i,version:2,facilities:e,eventState:of(t)}}function lf(i){const e=i.facilities??{};return e.deuteriumExcavator={level:1,unlocked:!1},{...i,version:3,facilities:e}}function df(i){return{...i,version:4,settings:{autoSellStardust:!1,stardustKeepAmount:Zo}}}function uf(i){const e=i.settings??{};return{...i,version:5,settings:{autoSellStardust:e.autoSellStardust===!0,stardustKeepAmount:qe(e.stardustKeepAmount)?e.stardustKeepAmount:Zo,autoSellCrystal:!1,crystalKeepAmount:md}}}function hf(i){const e=i.facilities??{};return e.energyStation={level:1,unlocked:!1},{...i,version:6,facilities:e,energy:qe(i.energy)?i.energy:0,isotope:qe(i.isotope)?i.isotope:0,researchCenterUnlocked:i.researchCenterUnlocked===!0,research:Array.isArray(i.research)?i.research:[],stats:typeof i.stats=="object"&&i.stats!==null?i.stats:Id(),achievements:Array.isArray(i.achievements)?i.achievements:[],energyReleaseUntil:qe(i.energyReleaseUntil)?i.energyReleaseUntil:0,energyReleaseCooldownUntil:qe(i.energyReleaseCooldownUntil)?i.energyReleaseCooldownUntil:0}}function ff(i){return{...i,version:7,consumptionLog:Ld()}}function pf(i){return{...i,version:8,prestige:rc()}}function mf(i){const e=i.prestige??{};return{...i,version:9,prestige:{...e,shopPurchases:{}}}}function gf(i){let e={...i};return e.version===1&&(e=cf(e)),e.version===2&&(e=lf(e)),e.version===3&&(e=df(e)),e.version===4&&(e=uf(e)),e.version===5&&(e=hf(e)),e.version===6&&(e=ff(e)),e.version===7&&(e=pf(e)),e.version===8&&(e=mf(e)),e}function Uc(i){return Array.isArray(i)&&i.every(e=>typeof e=="string")}const vf=["buff","exploration","exchange"];function _f(i){if(typeof i!="object"||i===null)return"存档缺少消耗日志";const e=i;if(!Array.isArray(e.active))return"消耗日志活跃列表非法";for(const s of e.active){if(typeof s!="object"||s===null)return"消耗日志条目非法";const r=s;if(typeof r.id!="string")return"消耗日志条目 id 非法";if(typeof r.kind!="string"||!vf.includes(r.kind))return"消耗日志条目 kind 非法";if(typeof r.resourceId!="string")return"消耗日志条目 resourceId 非法";if(!qe(r.amount)||r.amount<0)return"消耗日志条目 amount 非法";if(!Array.isArray(r.produced))return"消耗日志条目 produced 非法";for(const a of r.produced){if(typeof a!="object"||a===null)return"消耗日志产出条目非法";const o=a;if(typeof o.resourceId!="string")return"消耗日志产出 resourceId 非法";if(!qe(o.amount)||o.amount<0)return"消耗日志产出 amount 非法"}if(!qe(r.timestamp))return"消耗日志条目 timestamp 非法";if(r.expiresAt!==void 0&&!qe(r.expiresAt))return"消耗日志条目 expiresAt 非法";if(r.idempotencyKey!==void 0&&typeof r.idempotencyKey!="string")return"消耗日志条目 idempotencyKey 非法"}const t=e.aggregate;if(typeof t!="object"||t===null)return"消耗日志聚合非法";const n=t;if(!qe(n.completedEvents)||n.completedEvents<0)return"消耗日志聚合 completedEvents 非法";for(const s of["consumedByResource","producedByResource"]){const r=n[s];if(typeof r!="object"||r===null)return`消耗日志聚合 ${s} 非法`;for(const a of Object.values(r))if(!qe(a)||a<0)return`消耗日志聚合 ${s} 值非法`}return null}function xf(i){if(typeof i!="object"||i===null)return"存档缺少转生层";const e=i;if(!Array.isArray(e.unlocked))return"转生层解锁列表非法";for(const n of e.unlocked)if(typeof n!="string")return"转生层解锁项非法";if(!qe(e.stardust)||e.stardust<0)return"转生层星核余额非法";if(!qe(e.prestigeLevel)||!Number.isInteger(e.prestigeLevel)||e.prestigeLevel<0)return"转生层等级非法";if(!Array.isArray(e.history))return"转生层历史快照非法";for(const n of e.history){if(typeof n!="object"||n===null)return"转生层历史条目非法";const s=n;if(!qe(s.sequence)||!Number.isInteger(s.sequence)||s.sequence<1)return"转生层历史 sequence 非法";if(!qe(s.timestamp))return"转生层历史 timestamp 非法";if(!qe(s.stardustEarned)||s.stardustEarned<0)return"转生层历史 stardustEarned 非法";const r=s.baselineSnapshot;if(typeof r!="object"||r===null)return"转生层历史快照非法";const a=r;for(const o of["credits","stardust","crystal","isotope","antimatter","darkmatter","createdAt"])if(!qe(a[o]))return`转生层历史快照 ${o} 非法`;if(typeof a.facilityLevels!="object"||a.facilityLevels===null)return"转生层历史快照 facilityLevels 非法";for(const o of Object.values(a.facilityLevels))if(!qe(o)||o<1)return"转生层历史快照 facilityLevels 值非法";if(!qe(a.achievementCount)||a.achievementCount<0)return"转生层历史快照 achievementCount 非法";if(!qe(a.researchCount)||a.researchCount<0)return"转生层历史快照 researchCount 非法"}const t=e.shopPurchases;if(typeof t!="object"||t===null)return"转生层商店购买记录非法";for(const n of Object.values(t))if(!qe(n)||!Number.isInteger(n)||n<0)return"转生层商店购买等级非法";return null}function Ja(i){if(typeof i!="object"||i===null)return{ok:!1,error:"存档不是有效的对象"};const e=gf(i);if(typeof e!="object"||e===null)return{ok:!1,error:"存档不是有效的对象"};const t=e;if(t.version!==wr)return{ok:!1,error:`存档版本不支持（当前版本 ${wr}）`};qe(t.antimatter)||(t.antimatter=0),qe(t.darkmatter)||(t.darkmatter=0);for(const u of["credits","stardust","refineryBuffer","crystal","energy","isotope","antimatter","darkmatter"])if(!qe(t[u])||t[u]<0)return{ok:!1,error:`资源 ${u} 不能为负数或非法值`};const n=_f(t.consumptionLog);if(n!==null)return{ok:!1,error:n};const s=xf(t.prestige);if(s!==null)return{ok:!1,error:s};const r=t.prestige;if(r.unlocked=r.unlocked.filter(u=>nf(u)),typeof t.facilities!="object"||t.facilities===null)return{ok:!1,error:"存档缺少设施数据"};const a=t.facilities,o=yd(t);for(const u of tn){const h=a[u];if(typeof h!="object"||h===null)return{ok:!1,error:`缺少设施 ${u}`};const p=h;if(!qe(p.level)||p.level<1||p.level>o)return{ok:!1,error:`设施 ${u} 等级越界`};if(typeof p.unlocked!="boolean")return{ok:!1,error:`设施 ${u} 解锁状态非法`}}if(typeof t.energyStrategy!="string"||!vd.includes(t.energyStrategy))return{ok:!1,error:"能源策略未知"};if(typeof t.eventState!="object"||t.eventState===null)return{ok:!1,error:"存档缺少事件状态"};const c=t.eventState;if(c.pendingEvent!==null){if(typeof c.pendingEvent!="object"||c.pendingEvent===null)return{ok:!1,error:"事件状态非法"};const u=c.pendingEvent;if(typeof u.id!="string"||typeof u.kind!="string"||!af.includes(u.kind))return{ok:!1,error:"事件状态非法"};if(!qe(u.createdAt))return{ok:!1,error:"事件状态非法"}}for(const u of["nextEventAt","droneBoostUntil","solarStormUntil"])if(!qe(c[u]))return{ok:!1,error:`字段 ${u} 非法`};if(typeof c.investUsed!="boolean")return{ok:!1,error:"投入型事件状态非法"};const l=t.settings??null;if(typeof l!="object"||l===null)return{ok:!1,error:"存档缺少设置数据"};if(typeof l.autoSellStardust!="boolean")return{ok:!1,error:"自动出售设置非法"};if(!qe(l.stardustKeepAmount)||l.stardustKeepAmount<0)return{ok:!1,error:"保留数量非法"};if(typeof l.autoSellCrystal!="boolean")return{ok:!1,error:"晶体自动出售设置非法"};if(!qe(l.crystalKeepAmount)||l.crystalKeepAmount<0)return{ok:!1,error:"晶体保留数量非法"};if(typeof t.researchCenterUnlocked!="boolean")return{ok:!1,error:"研究中心状态非法"};if(!Uc(t.research))return{ok:!1,error:"研究列表非法"};if(!Uc(t.achievements))return{ok:!1,error:"成就列表非法"};t.research=t.research.filter(u=>u in ts),t.achievements=t.achievements.filter(u=>u in Ph);for(const u of["energyReleaseUntil","energyReleaseCooldownUntil"])if(!qe(t[u]))return{ok:!1,error:`字段 ${u} 非法`};if(typeof t.stats!="object"||t.stats===null)return{ok:!1,error:"存档缺少统计数据"};const d=t.stats;for(const u of Object.keys(Id()))if(!qe(d[u])||d[u]<0)return{ok:!1,error:`统计字段 ${u} 非法`};for(const u of["createdAt","lastSavedAt"])if(!qe(t[u]))return{ok:!1,error:`字段 ${u} 非法`};return{ok:!0,state:t}}function Ud(i){let e;try{e=JSON.parse(i)}catch{return{ok:!1,error:"JSON 格式错误"}}return Ja(e)}function yf(){return{totalStardustProduced:0,totalCrystalProduced:0,totalCreditsEarned:0,totalEnergyProduced:0,totalIsotopeProduced:0,eventsTriggered:0,droneEventsHandled:0,solarStormsExperienced:0,investmentsMade:0,upgradesPerformed:0,researchesCompleted:0,lastOfflineCrystalGain:0}}function Nd(i){const e={};for(const t of tn)e[t]={level:1,unlocked:t==="excavator"};return{version:wr,credits:100,stardust:0,refineryBuffer:0,crystal:0,energy:0,isotope:0,antimatter:0,darkmatter:0,consumptionLog:Ld(),facilities:e,energyStrategy:"balanced",eventState:{pendingEvent:null,nextEventAt:i+fd,droneBoostUntil:0,solarStormUntil:0,investUsed:!1},settings:{autoSellStardust:!1,stardustKeepAmount:Zo,autoSellCrystal:!1,crystalKeepAmount:md},researchCenterUnlocked:!1,research:[],stats:yf(),achievements:[],energyReleaseUntil:0,energyReleaseCooldownUntil:0,createdAt:i,lastSavedAt:i}}function Nc(i){return{...Nd(i),prestige:rc()}}const Od=new Map;function Mf(i){if(!i.id)throw new Error("ResourceSchema 必须包含 id");Od.set(i.id,{...i})}function _n(i){return Od.get(i)}function Sf(i){for(const e of i)Mf(e)}function xi(i,e){const t=_n(e);if(!(t!=null&&t.stateKey))return 0;const n=i[t.stateKey];return typeof n=="number"?n:0}function Fd(i,e,t){const n=_n(e);if(!n)return{ok:!1,reason:`未知资源类型: ${e}`};if(!n.consumable)return{ok:!1,reason:`资源 ${n.name} 不可消耗`};if(t<0)return{ok:!1,reason:"消耗数量不能为负"};if(t===0)return{ok:!0,consumed:0};const s=xi(i,e);return s<t?{ok:!1,reason:`${n.name}不足（需 ${t}，持有 ${s}）`}:{ok:!0,consumed:t}}function Ef(i,e,t){const n=Fd(i,e,t);if(!n.ok)return n;if(t===0)return{ok:!0,consumed:0};const s=_n(e);if(!(s!=null&&s.stateKey))return{ok:!1,reason:`资源 ${e} 缺少 stateKey 映射`};const r=i[s.stateKey];return typeof r=="number"&&(i[s.stateKey]=Math.max(0,r-t)),{ok:!0,consumed:t}}function Qa(i,e,t){if(t<=0)return;const n=_n(e);if(!(n!=null&&n.stateKey))return;const s=i[n.stateKey];typeof s=="number"&&(i[n.stateKey]=s+t)}Sf(nh);let kd=0;function bf(){return`ce-${++kd}`}class Tf{constructor(e){O(this,"events",new Map);O(this,"processedKeys",new Set);O(this,"queue",Promise.resolve());this.repo=e}async runSerialized(e){const t=this.queue.then(e);return this.queue=t.catch(()=>{}),t}async consume(e,t){return this.runSerialized(()=>this.doConsume(e,t))}async doConsume(e,t){if(t.idempotencyKey&&this.processedKeys.has(t.idempotencyKey))return{ok:!0,event:this.findEventByIdempotencyKey(t.idempotencyKey)};let n;try{n=this.repo.begin(e);const s=n.getState(),r=Fd(s,t.resourceId,t.amount);if(!r.ok)return n.rollback(),{ok:!1,reason:r.reason};const a=Ef(s,t.resourceId,t.amount);if(!a.ok)return n.rollback(),{ok:!1,reason:a.reason};const o=[];if(t.produces)for(const l of t.produces)Qa(s,l.resourceId,l.amount),o.push({resourceId:l.resourceId,amount:l.amount});const c={id:bf(),kind:t.kind,resourceId:t.resourceId,amount:t.amount,produced:o,timestamp:Date.now(),idempotencyKey:t.idempotencyKey,rolledBack:!1};return await n.commit(),this.events.set(c.id,c),t.idempotencyKey&&this.processedKeys.add(t.idempotencyKey),{ok:!0,event:c}}catch(s){return n&&!n.isDone()&&n.rollback(),{ok:!1,reason:`消耗事务异常: ${s instanceof Error?s.message:String(s)}`}}}async rollback(e,t){return this.runSerialized(()=>this.doRollback(e,t))}async doRollback(e,t){const n=this.events.get(t);if(!n)return{ok:!1,reason:`消耗事件 ${t} 不存在`};if(n.rolledBack)return{ok:!1,reason:`消耗事件 ${t} 已回滚`};let s;try{s=this.repo.begin(e);const r=s.getState();Qa(r,n.resourceId,n.amount);for(const a of n.produced){const o=_n(a.resourceId);if(o!=null&&o.stateKey){const c=r[o.stateKey];typeof c=="number"&&(r[o.stateKey]=Math.max(0,c-a.amount))}}return n.rolledBack=!0,await s.commit(),{ok:!0,event:n}}catch(r){return s&&!s.isDone()&&s.rollback(),{ok:!1,reason:`回滚异常: ${r instanceof Error?r.message:String(r)}`}}}isProcessed(e){return this.processedKeys.has(e)}getEvent(e){return this.events.get(e)}getEvents(){return Array.from(this.events.values())}getActiveEvents(){return Array.from(this.events.values()).filter(e=>!e.rolledBack)}reset(){this.events.clear(),this.processedKeys.clear(),kd=0,this.queue=Promise.resolve()}findEventByIdempotencyKey(e){for(const t of this.events.values())if(t.idempotencyKey===e)return t}}class wf{constructor(e,t){O(this,"snapshot",null);O(this,"workingState",null);O(this,"done",!1);this.backend=e,this.clone=t}begin(e){return!this.done&&this.snapshot!==null&&this.cleanup(),this.snapshot=this.clone(e),this.workingState=e,this.done=!1,{getState:()=>{if(this.done)throw new Error("事务已结束，无法获取状态");return this.workingState},commit:async()=>{if(this.done)throw new Error("事务已结束，无法提交");await this.backend.save(this.workingState),this.cleanup()},rollback:()=>{if(this.done)throw new Error("事务已结束，无法回滚");this.restoreSnapshot(),this.cleanup()},isDone:()=>this.done}}isActive(){return!this.done&&this.snapshot!==null}restoreSnapshot(){if(!this.snapshot||!this.workingState)return;const e=this.clone(this.snapshot),t=this.workingState;for(const n of Object.keys(t))delete t[n];Object.assign(t,e)}cleanup(){this.done=!0,this.snapshot=null,this.workingState=null}}function Af(i){const{prestige:e,...t}=i;return{baseline:t,prestige:e}}class Cf{constructor(e){this.store=e}async load(){const e=await this.store.load();if(e===null)return null;const t=await this.store.loadPrestige();let n;if(t===null)n=rc();else try{n=JSON.parse(t)}catch{throw new Error("转生层数据损坏，无法加载")}const r={...JSON.parse(e),prestige:n},a=Ud(JSON.stringify(r));if(!a.ok)throw new Error(a.error);return a.state}async save(e){const{baseline:t,prestige:n}=Af(e),s=Dd(t),r=JSON.stringify(n,null,2);await this.store.saveBoth(s,r)}}const Bd=[{id:"catalysis-overdrive",name:"催化过载",description:"全采掘 ×2 产出，持续 10 分钟",cost:{resourceId:"isotope",amount:60},durationMs:600*1e3,effect:{target:"stardust",mult:2}},{id:"crystal-resonance",name:"晶体共鸣",description:"精炼 ×1.5 产出，持续 5 分钟",cost:{resourceId:"isotope",amount:90},durationMs:300*1e3,effect:{target:"crystal",mult:1.5}},{id:"isotope-furnace",name:"同位素熔炉",description:"全采掘 ×1.5 产出，持续 20 分钟（长时低增益）",cost:{resourceId:"isotope",amount:40},durationMs:1200*1e3,effect:{target:"stardust",mult:1.5}}],eo=[{id:"nearby-belt",name:"近地小行星带",description:"低风险短途，稳定产出反物质",durationMs:60*1e3,cost:{resourceId:"isotope",amount:30},reward:{resourceId:"antimatter",amount:4},riskLabel:"低"},{id:"kuiper",name:"柯伊伯带",description:"中风险长途，产出暗物质",durationMs:180*1e3,cost:{resourceId:"isotope",amount:80},reward:{resourceId:"darkmatter",amount:3},riskLabel:"中"},{id:"ophiuchus",name:"蛇夫座深空",description:"高风险远征，高额反物质回报",durationMs:360*1e3,cost:{resourceId:"isotope",amount:150},reward:{resourceId:"antimatter",amount:10},riskLabel:"高"}],zd=[{id:"iso-to-credits",name:"同位素催化兑换",cost:{resourceId:"isotope",amount:25},produces:[{resourceId:"credits",amount:300}]},{id:"iso-to-crystal",name:"同位素结晶",cost:{resourceId:"isotope",amount:40},produces:[{resourceId:"crystal",amount:8}]},{id:"antimatter-to-darkmatter",name:"反物质湮灭",cost:{resourceId:"antimatter",amount:3},produces:[{resourceId:"darkmatter",amount:2}]}],Rr=Object.fromEntries(Bd.map(i=>[i.id,i])),Ls=Object.fromEntries(eo.map(i=>[i.id,i])),to=Object.fromEntries(zd.map(i=>[i.id,i])),Rf=8;let Hd=0;function Oc(i){return`${i}-${++Hd}`}class Pf{constructor(e){O(this,"activeBuffs",new Map);O(this,"activeExplorations",new Map);this.engine=e}canActivateBuff(e,t,n){const s=Rr[t];if(!s)return{ok:!1,reason:"未知 buff"};if(this.buffActive(t))return{ok:!1,reason:`${s.name} 已在运行`};const r=xi(e,s.cost.resourceId);return r<s.cost.amount?{ok:!1,reason:`同位素不足（需 ${s.cost.amount}，持有 ${Math.floor(r)}）`}:{ok:!0}}async activateBuff(e,t,n){const s=Rr[t];if(!s)return{ok:!1,reason:"未知 buff"};if(this.buffActive(t))return{ok:!1,reason:`${s.name} 已在运行`};const r={kind:"buff",resourceId:s.cost.resourceId,amount:s.cost.amount,idempotencyKey:`buff-${t}-${n}`};try{const o=await this.engine.consume(e,r);if(!o.ok)return{ok:!1,reason:o.reason??"激活失败"}}catch(o){return{ok:!1,reason:`激活异常: ${o instanceof Error?o.message:String(o)}`}}const a={instanceId:Oc("buff"),defId:t,startedAt:n,expiresAt:n+s.durationMs,effect:{...s.effect}};return this.activeBuffs.set(t,a),{ok:!0}}buffActive(e){return this.activeBuffs.has(e)}getActiveBuff(e){return this.activeBuffs.get(e)}getActiveBuffs(){return Array.from(this.activeBuffs.values())}getProductionMult(e,t){let n=1;for(const s of this.activeBuffs.values())s.effect.target===e&&s.expiresAt>t&&(n*=s.effect.mult);return Math.min(Rf,n)}canDispatch(e,t){const n=Ls[t];if(!n)return{ok:!1,reason:"未知探索目标"};if(this.activeExplorations.size>0)return{ok:!1,reason:"已有探索进行中（每次仅限 1 路）"};const s=xi(e,n.cost.resourceId);return s<n.cost.amount?{ok:!1,reason:`同位素不足（需 ${n.cost.amount}，持有 ${Math.floor(s)}）`}:{ok:!0}}async dispatchExploration(e,t,n){const s=Ls[t];if(!s)return{ok:!1,reason:"未知探索目标"};if(this.activeExplorations.size>0)return{ok:!1,reason:"已有探索进行中"};const r={kind:"exploration",resourceId:s.cost.resourceId,amount:s.cost.amount,idempotencyKey:`explore-${t}-${n}`};try{const o=await this.engine.consume(e,r);if(!o.ok)return{ok:!1,reason:o.reason??"派遣失败"}}catch(o){return{ok:!1,reason:`派遣异常: ${o instanceof Error?o.message:String(o)}`}}const a={instanceId:Oc("explore"),targetId:t,startedAt:n,completesAt:n+s.durationMs,reward:{...s.reward}};return this.activeExplorations.set(a.instanceId,a),{ok:!0}}getActiveExplorations(){return Array.from(this.activeExplorations.values())}canExchange(e,t){const n=to[t];if(!n)return{ok:!1,reason:"未知兑换配方"};const s=xi(e,n.cost.resourceId);return s<n.cost.amount?{ok:!1,reason:`资源不足（需 ${n.cost.amount}，持有 ${Math.floor(s)}）`}:{ok:!0}}async exchange(e,t){const n=to[t];if(!n)return{ok:!1,reason:"未知兑换配方"};const s={kind:"exchange",resourceId:n.cost.resourceId,amount:n.cost.amount,produces:n.produces.map(r=>({resourceId:r.resourceId,amount:r.amount})),idempotencyKey:`exchange-${t}-${Date.now()}`};try{const r=await this.engine.consume(e,s);return r.ok?{ok:!0}:{ok:!1,reason:r.reason??"兑换失败"}}catch(r){return{ok:!1,reason:`兑换异常: ${r instanceof Error?r.message:String(r)}`}}}tick(e,t){const n=[],s=[];for(const[r,a]of this.activeBuffs)a.expiresAt<=t&&(s.push(a),this.activeBuffs.delete(r));for(const[r,a]of this.activeExplorations)a.completesAt<=t&&(Qa(e,a.reward.resourceId,a.reward.amount),n.push(a),this.activeExplorations.delete(r));return{completed:n,expiredBuffs:s}}reactorActivity(e){let t=0;for(const n of this.activeBuffs.values())n.expiresAt>e&&(t+=1);return t+=this.activeExplorations.size,t===0?0:Math.min(1,.55+.45*(t/3))}reset(){this.activeBuffs.clear(),this.activeExplorations.clear(),Hd=0}}const Xi={crystal:1/100,isotope:1/20,antimatter:1/5,darkmatter:1/2,stardust:1/1e3},no=2,io=5;function Lf(i){let e=0;e+=i.crystal*Xi.crystal,e+=i.isotope*Xi.isotope,e+=i.antimatter*Xi.antimatter,e+=i.darkmatter*Xi.darkmatter,e+=i.stardust*Xi.stardust;for(const t of Object.values(i.facilities))e+=Math.max(0,t.level-1)*no;return e+=i.research.length*io,Math.floor(e*xd(i))}function Df(i){const{prestige:e,...t}=i;return structuredClone(t)}function If(i){const e={};return Object.keys(i.facilities).forEach(t=>{e[t]=i.facilities[t].level}),{credits:i.credits,stardust:i.stardust,crystal:i.crystal,isotope:i.isotope,antimatter:i.antimatter,darkmatter:i.darkmatter,facilityLevels:e,achievementCount:i.achievements.length,researchCount:i.research.length,createdAt:i.createdAt}}function Uf(i,e){const t={...Nd(i),prestige:e};for(const n of e.unlocked){const s=ac[n];s&&s.apply(t)}return Uh(t),t}function Gd(i,e){const t=Lf(i),n={baseline:Df(i),prestige:structuredClone(i.prestige),timestamp:e},s=Object.keys(n.baseline),r={unlocked:[...i.prestige.unlocked],stardust:i.prestige.stardust+t,prestigeLevel:i.prestige.prestigeLevel+1,history:[...i.prestige.history,{sequence:i.prestige.prestigeLevel+1,timestamp:e,baselineSnapshot:If(i),stardustEarned:t}],shopPurchases:{...i.prestige.shopPurchases}},a=Uf(e,r);return{stardustEarned:t,preSnapshot:n,dirtyFields:s,newPrestige:r,rebuiltState:a}}function Nf(i,e){const t=Gd(i,e);return{stardustEarned:t.stardustEarned,newPrestigeLevel:t.newPrestige.prestigeLevel,newStardustBalance:t.newPrestige.stardust,permanentBonuses:[...t.newPrestige.unlocked],resets:{resourceIds:["credits","stardust","refineryBuffer","crystal","energy","isotope","antimatter","darkmatter"],facilityCount:Object.keys(i.facilities).length,researchCount:i.research.length,achievementCount:i.achievements.length},baselineBefore:t.preSnapshot.baseline,stateAfter:t.rebuiltState}}function Of(i,e){const t=i;for(const n of Object.keys(t))delete t[n];Object.assign(t,structuredClone(e))}async function Ff(i,e,t){const n=Gd(e,t);let s;try{s=i.begin(e)}catch(r){return{ok:!1,error:r instanceof Error?r.message:"事务启动失败"}}Of(s.getState(),n.rebuiltState);try{await s.commit()}catch(r){return s.isDone()||s.rollback(),{ok:!1,error:r instanceof Error?r.message:"提交转生事务失败"}}return{ok:!0,state:e,stardustEarned:n.stardustEarned,preSnapshot:n.preSnapshot}}const kf={stardust:"星尘矿",crystal:"晶体",isotope:"同位素",antimatter:"反物质",darkmatter:"暗物质"},Bf=["stardust","crystal","isotope","antimatter","darkmatter"];function zf(i){const e=Bf.map(c=>{const l=i[c],d=Xi[c];return{id:c,label:kf[c],amount:l,rate:d,points:l*d}}),t=Object.values(i.facilities).reduce((c,l)=>c+Math.max(0,l.level-1),0),n=t*no,s=i.research.length,r=s*io,a=e.reduce((c,l)=>c+l.points,0)+n+r,o=xd(i);return{resourceItems:e,facility:{totalLevelsAboveOne:t,rate:no,points:n},research:{count:s,rate:io,points:r},totalPoints:a,shopGainMultiplier:o,stardustEarned:Math.floor(a*o)}}const qi=["review","settlement","confirm"],Hf={review:"成就回顾",settlement:"星核结算",confirm:"确认转生"};function Gf(i){const e={};let t=0;return Object.keys(i.facilities).forEach(n=>{e[n]=i.facilities[n].level,i.facilities[n].unlocked&&(t+=1)}),{createdAt:i.createdAt,credits:i.credits,stardust:i.stardust,crystal:i.crystal,isotope:i.isotope,antimatter:i.antimatter,darkmatter:i.darkmatter,facilityCount:t,facilityLevels:e,researchCount:i.research.length,achievementCount:i.achievements.length}}function Vf(i){return i.map(e=>ac[e]).filter(e=>!!e).map(e=>({id:e.id,name:e.name,description:e.description}))}function Wf(i){document.addEventListener("keydown",e=>{const t=e.target;if(!(t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable)))switch(e.key){case"1":i.onStrategy("excavation");break;case"2":i.onStrategy("balanced");break;case"3":i.onStrategy("refinement");break;case"u":case"U":i.onUpgrade();break;case"Escape":i.onCloseModal();break;case"m":case"M":i.onOpenSave();break;case"`":case"~":i.onDebug();break}})}function Xf(i){const e=new Blob([sf(i)],{type:"application/json"});Vd(e,`星际矿站存档_${new Date().toISOString().slice(0,10)}.json`)}function $f(i,e){Vd(new Blob([e],{type:"text/csv;charset=utf-8"}),i)}function Vd(i,e){const t=URL.createObjectURL(i),n=document.createElement("a");n.href=t,n.download=e,n.click(),URL.revokeObjectURL(t)}async function qf(i){let e;try{e=await i.text()}catch{return{ok:!1,error:"读取文件失败"}}return rf(e)}const Yf="star-miner-save",qt="saves",ra="main",aa="prestige";let on=null;function gs(){return on?Promise.resolve(on):new Promise((i,e)=>{if(typeof indexedDB>"u"){e(new Error("当前环境不支持 IndexedDB"));return}const t=indexedDB.open(Yf,1);t.onupgradeneeded=()=>{const n=t.result;n.objectStoreNames.contains(qt)||n.createObjectStore(qt)},t.onsuccess=()=>{on=t.result,on.onclose=()=>{on=null},on.onversionchange=()=>{on==null||on.close(),on=null},i(on)},t.onerror=()=>e(t.error??new Error("打开存档数据库失败"))})}class jf{async load(){const e=await gs();return new Promise((t,n)=>{const r=e.transaction(qt,"readonly").objectStore(qt).get(ra);r.onsuccess=()=>t(typeof r.result=="string"?r.result:null),r.onerror=()=>n(r.error??new Error("读取存档失败"))})}async save(e){const t=await gs();return new Promise((n,s)=>{const r=t.transaction(qt,"readwrite");r.objectStore(qt).put(e,ra),r.oncomplete=()=>n(),r.onerror=()=>s(r.error??new Error("写入存档失败"))})}async loadPrestige(){const e=await gs();return new Promise((t,n)=>{const r=e.transaction(qt,"readonly").objectStore(qt).get(aa);r.onsuccess=()=>t(typeof r.result=="string"?r.result:null),r.onerror=()=>n(r.error??new Error("读取转生层失败"))})}async savePrestige(e){const t=await gs();return new Promise((n,s)=>{const r=t.transaction(qt,"readwrite");r.objectStore(qt).put(e,aa),r.oncomplete=()=>n(),r.onerror=()=>s(r.error??new Error("写入转生层失败"))})}async saveBoth(e,t){const n=await gs();return new Promise((s,r)=>{const a=n.transaction(qt,"readwrite");a.objectStore(qt).put(e,ra),a.objectStore(qt).put(t,aa),a.oncomplete=()=>s(),a.onerror=()=>r(a.error??new Error("原子写入存档失败"))})}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const oc="170",Ki={ROTATE:0,DOLLY:1,PAN:2},Yi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Kf=0,Fc=1,Zf=2,Wd=1,Xd=2,Pn=3,ti=0,kt=1,Dn=2,Qn=0,Zi=1,kc=2,Bc=3,zc=4,Jf=5,fi=100,Qf=101,ep=102,tp=103,np=104,ip=200,sp=201,rp=202,ap=203,so=204,ro=205,op=206,cp=207,lp=208,dp=209,up=210,hp=211,fp=212,pp=213,mp=214,ao=0,oo=1,co=2,ns=3,lo=4,uo=5,ho=6,fo=7,$d=0,gp=1,vp=2,ei=0,_p=1,xp=2,yp=3,Mp=4,Sp=5,Ep=6,bp=7,qd=300,is=301,ss=302,po=303,mo=304,Gr=306,rs=1e3,gi=1001,go=1002,Kt=1003,Tp=1004,zs=1005,xn=1006,oa=1007,vi=1008,Fn=1009,Yd=1010,jd=1011,Ds=1012,cc=1013,yi=1014,yn=1015,Us=1016,lc=1017,dc=1018,as=1020,Kd=35902,Zd=1021,Jd=1022,fn=1023,Qd=1024,eu=1025,Ji=1026,os=1027,uc=1028,hc=1029,tu=1030,fc=1031,pc=1033,_r=33776,xr=33777,yr=33778,Mr=33779,vo=35840,_o=35841,xo=35842,yo=35843,Mo=36196,So=37492,Eo=37496,bo=37808,To=37809,wo=37810,Ao=37811,Co=37812,Ro=37813,Po=37814,Lo=37815,Do=37816,Io=37817,Uo=37818,No=37819,Oo=37820,Fo=37821,Sr=36492,ko=36494,Bo=36495,nu=36283,zo=36284,Ho=36285,Go=36286,wp=3200,Ap=3201,iu=0,Cp=1,jn="",Dt="srgb",ds="srgb-linear",Vr="linear",Qe="srgb",wi=7680,Hc=519,Rp=512,Pp=513,Lp=514,su=515,Dp=516,Ip=517,Up=518,Np=519,Gc=35044,Wr=35048,Vc="300 es",Un=2e3,Pr=2001;class Ei{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Pt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Er=Math.PI/180,Vo=180/Math.PI;function Ns(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Pt[i&255]+Pt[i>>8&255]+Pt[i>>16&255]+Pt[i>>24&255]+"-"+Pt[e&255]+Pt[e>>8&255]+"-"+Pt[e>>16&15|64]+Pt[e>>24&255]+"-"+Pt[t&63|128]+Pt[t>>8&255]+"-"+Pt[t>>16&255]+Pt[t>>24&255]+Pt[n&255]+Pt[n>>8&255]+Pt[n>>16&255]+Pt[n>>24&255]).toLowerCase()}function Ot(i,e,t){return Math.max(e,Math.min(t,i))}function Op(i,e){return(i%e+e)%e}function ca(i,e,t){return(1-t)*i+t*e}function vs(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function zt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Fp={DEG2RAD:Er};class Ae{constructor(e=0,t=0){Ae.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Oe{constructor(e,t,n,s,r,a,o,c,l){Oe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){const d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=c,d[6]=n,d[7]=a,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],d=n[4],u=n[7],h=n[2],p=n[5],g=n[8],v=s[0],m=s[3],f=s[6],M=s[1],b=s[4],y=s[7],D=s[2],A=s[5],w=s[8];return r[0]=a*v+o*M+c*D,r[3]=a*m+o*b+c*A,r[6]=a*f+o*y+c*w,r[1]=l*v+d*M+u*D,r[4]=l*m+d*b+u*A,r[7]=l*f+d*y+u*w,r[2]=h*v+p*M+g*D,r[5]=h*m+p*b+g*A,r[8]=h*f+p*y+g*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8];return t*a*d-t*o*l-n*r*d+n*o*c+s*r*l-s*a*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8],u=d*a-o*l,h=o*c-d*r,p=l*r-a*c,g=t*u+n*h+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=u*v,e[1]=(s*l-d*n)*v,e[2]=(o*n-s*a)*v,e[3]=h*v,e[4]=(d*t-s*c)*v,e[5]=(s*r-o*t)*v,e[6]=p*v,e[7]=(n*c-l*t)*v,e[8]=(a*t-n*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(la.makeScale(e,t)),this}rotate(e){return this.premultiply(la.makeRotation(-e)),this}translate(e,t){return this.premultiply(la.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const la=new Oe;function ru(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Lr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function kp(){const i=Lr("canvas");return i.style.display="block",i}const Wc={};function Cs(i){i in Wc||(Wc[i]=!0,console.warn(i))}function Bp(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function zp(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Hp(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Ye={enabled:!0,workingColorSpace:ds,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===Qe&&(i.r=Nn(i.r),i.g=Nn(i.g),i.b=Nn(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===Qe&&(i.r=Qi(i.r),i.g=Qi(i.g),i.b=Qi(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===jn?Vr:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Nn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Qi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Xc=[.64,.33,.3,.6,.15,.06],$c=[.2126,.7152,.0722],qc=[.3127,.329],Yc=new Oe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),jc=new Oe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Ye.define({[ds]:{primaries:Xc,whitePoint:qc,transfer:Vr,toXYZ:Yc,fromXYZ:jc,luminanceCoefficients:$c,workingColorSpaceConfig:{unpackColorSpace:Dt},outputColorSpaceConfig:{drawingBufferColorSpace:Dt}},[Dt]:{primaries:Xc,whitePoint:qc,transfer:Qe,toXYZ:Yc,fromXYZ:jc,luminanceCoefficients:$c,outputColorSpaceConfig:{drawingBufferColorSpace:Dt}}});let Ai;class Gp{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ai===void 0&&(Ai=Lr("canvas")),Ai.width=e.width,Ai.height=e.height;const n=Ai.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Ai}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Lr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Nn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Nn(t[n]/255)*255):t[n]=Nn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Vp=0;class au{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Vp++}),this.uuid=Ns(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(da(s[a].image)):r.push(da(s[a]))}else r=da(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function da(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Gp.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Wp=0;class It extends Ei{constructor(e=It.DEFAULT_IMAGE,t=It.DEFAULT_MAPPING,n=gi,s=gi,r=xn,a=vi,o=fn,c=Fn,l=It.DEFAULT_ANISOTROPY,d=jn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wp++}),this.uuid=Ns(),this.name="",this.source=new au(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ae(0,0),this.repeat=new Ae(1,1),this.center=new Ae(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==qd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case rs:e.x=e.x-Math.floor(e.x);break;case gi:e.x=e.x<0?0:1;break;case go:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case rs:e.y=e.y-Math.floor(e.y);break;case gi:e.y=e.y<0?0:1;break;case go:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}It.DEFAULT_IMAGE=null;It.DEFAULT_MAPPING=qd;It.DEFAULT_ANISOTROPY=1;class nt{constructor(e=0,t=0,n=0,s=1){nt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],d=c[4],u=c[8],h=c[1],p=c[5],g=c[9],v=c[2],m=c[6],f=c[10];if(Math.abs(d-h)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+h)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(l+1)/2,y=(p+1)/2,D=(f+1)/2,A=(d+h)/4,w=(u+v)/4,P=(g+m)/4;return b>y&&b>D?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=A/n,r=w/n):y>D?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=A/s,r=P/s):D<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(D),n=w/r,s=P/r),this.set(n,s,r,t),this}let M=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(h-d)*(h-d));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-v)/M,this.z=(h-d)/M,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Xp extends Ei{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new nt(0,0,e,t),this.scissorTest=!1,this.viewport=new nt(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:xn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new It(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new au(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Mi extends Xp{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class ou extends It{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class $p extends It{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Si{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],d=n[s+2],u=n[s+3];const h=r[a+0],p=r[a+1],g=r[a+2],v=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=d,e[t+3]=u;return}if(o===1){e[t+0]=h,e[t+1]=p,e[t+2]=g,e[t+3]=v;return}if(u!==v||c!==h||l!==p||d!==g){let m=1-o;const f=c*h+l*p+d*g+u*v,M=f>=0?1:-1,b=1-f*f;if(b>Number.EPSILON){const D=Math.sqrt(b),A=Math.atan2(D,f*M);m=Math.sin(m*A)/D,o=Math.sin(o*A)/D}const y=o*M;if(c=c*m+h*y,l=l*m+p*y,d=d*m+g*y,u=u*m+v*y,m===1-o){const D=1/Math.sqrt(c*c+l*l+d*d+u*u);c*=D,l*=D,d*=D,u*=D}}e[t]=c,e[t+1]=l,e[t+2]=d,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],d=n[s+3],u=r[a],h=r[a+1],p=r[a+2],g=r[a+3];return e[t]=o*g+d*u+c*p-l*h,e[t+1]=c*g+d*h+l*u-o*p,e[t+2]=l*g+d*p+o*h-c*u,e[t+3]=d*g-o*u-c*h-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),d=o(s/2),u=o(r/2),h=c(n/2),p=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=h*d*u+l*p*g,this._y=l*p*u-h*d*g,this._z=l*d*g+h*p*u,this._w=l*d*u-h*p*g;break;case"YXZ":this._x=h*d*u+l*p*g,this._y=l*p*u-h*d*g,this._z=l*d*g-h*p*u,this._w=l*d*u+h*p*g;break;case"ZXY":this._x=h*d*u-l*p*g,this._y=l*p*u+h*d*g,this._z=l*d*g+h*p*u,this._w=l*d*u-h*p*g;break;case"ZYX":this._x=h*d*u-l*p*g,this._y=l*p*u+h*d*g,this._z=l*d*g-h*p*u,this._w=l*d*u+h*p*g;break;case"YZX":this._x=h*d*u+l*p*g,this._y=l*p*u+h*d*g,this._z=l*d*g-h*p*u,this._w=l*d*u-h*p*g;break;case"XZY":this._x=h*d*u-l*p*g,this._y=l*p*u-h*d*g,this._z=l*d*g+h*p*u,this._w=l*d*u+h*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],d=t[6],u=t[10],h=n+o+u;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(d-c)*p,this._y=(r-l)*p,this._z=(a-s)*p}else if(n>o&&n>u){const p=2*Math.sqrt(1+n-o-u);this._w=(d-c)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+l)/p}else if(o>u){const p=2*Math.sqrt(1+o-n-u);this._w=(r-l)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(c+d)/p}else{const p=2*Math.sqrt(1+u-n-o);this._w=(a-s)/p,this._x=(r+l)/p,this._y=(c+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ot(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,d=t._w;return this._x=n*d+a*o+s*l-r*c,this._y=s*d+a*c+r*o-n*l,this._z=r*d+a*l+n*c-s*o,this._w=a*d-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),d=Math.atan2(l,o),u=Math.sin((1-t)*d)/l,h=Math.sin(t*d)/l;return this._w=a*u+this._w*h,this._x=n*u+this._x*h,this._y=s*u+this._y*h,this._z=r*u+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(e=0,t=0,n=0){C.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Kc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Kc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),d=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+c*l+a*u-o*d,this.y=n+c*d+o*l-r*u,this.z=s+c*u+r*d-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ua.copy(this).projectOnVector(e),this.sub(ua)}reflect(e){return this.sub(ua.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ua=new C,Kc=new Si;class bi{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(cn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(cn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=cn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,cn):cn.fromBufferAttribute(r,a),cn.applyMatrix4(e.matrixWorld),this.expandByPoint(cn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Hs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Hs.copy(n.boundingBox)),Hs.applyMatrix4(e.matrixWorld),this.union(Hs)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,cn),cn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(_s),Gs.subVectors(this.max,_s),Ci.subVectors(e.a,_s),Ri.subVectors(e.b,_s),Pi.subVectors(e.c,_s),Hn.subVectors(Ri,Ci),Gn.subVectors(Pi,Ri),ri.subVectors(Ci,Pi);let t=[0,-Hn.z,Hn.y,0,-Gn.z,Gn.y,0,-ri.z,ri.y,Hn.z,0,-Hn.x,Gn.z,0,-Gn.x,ri.z,0,-ri.x,-Hn.y,Hn.x,0,-Gn.y,Gn.x,0,-ri.y,ri.x,0];return!ha(t,Ci,Ri,Pi,Gs)||(t=[1,0,0,0,1,0,0,0,1],!ha(t,Ci,Ri,Pi,Gs))?!1:(Vs.crossVectors(Hn,Gn),t=[Vs.x,Vs.y,Vs.z],ha(t,Ci,Ri,Pi,Gs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,cn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(cn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Tn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Tn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Tn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Tn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Tn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Tn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Tn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Tn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Tn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Tn=[new C,new C,new C,new C,new C,new C,new C,new C],cn=new C,Hs=new bi,Ci=new C,Ri=new C,Pi=new C,Hn=new C,Gn=new C,ri=new C,_s=new C,Gs=new C,Vs=new C,ai=new C;function ha(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ai.fromArray(i,r);const o=s.x*Math.abs(ai.x)+s.y*Math.abs(ai.y)+s.z*Math.abs(ai.z),c=e.dot(ai),l=t.dot(ai),d=n.dot(ai);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>o)return!1}return!0}const qp=new bi,xs=new C,fa=new C;class Os{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):qp.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;xs.subVectors(e,this.center);const t=xs.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(xs,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(fa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(xs.copy(e.center).add(fa)),this.expandByPoint(xs.copy(e.center).sub(fa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const wn=new C,pa=new C,Ws=new C,Vn=new C,ma=new C,Xs=new C,ga=new C;class mc{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,wn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=wn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(wn.copy(this.origin).addScaledVector(this.direction,t),wn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){pa.copy(e).add(t).multiplyScalar(.5),Ws.copy(t).sub(e).normalize(),Vn.copy(this.origin).sub(pa);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Ws),o=Vn.dot(this.direction),c=-Vn.dot(Ws),l=Vn.lengthSq(),d=Math.abs(1-a*a);let u,h,p,g;if(d>0)if(u=a*c-o,h=a*o-c,g=r*d,u>=0)if(h>=-g)if(h<=g){const v=1/d;u*=v,h*=v,p=u*(u+a*h+2*o)+h*(a*u+h+2*c)+l}else h=r,u=Math.max(0,-(a*h+o)),p=-u*u+h*(h+2*c)+l;else h=-r,u=Math.max(0,-(a*h+o)),p=-u*u+h*(h+2*c)+l;else h<=-g?(u=Math.max(0,-(-a*r+o)),h=u>0?-r:Math.min(Math.max(-r,-c),r),p=-u*u+h*(h+2*c)+l):h<=g?(u=0,h=Math.min(Math.max(-r,-c),r),p=h*(h+2*c)+l):(u=Math.max(0,-(a*r+o)),h=u>0?r:Math.min(Math.max(-r,-c),r),p=-u*u+h*(h+2*c)+l);else h=a>0?-r:r,u=Math.max(0,-(a*h+o)),p=-u*u+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(pa).addScaledVector(Ws,h),p}intersectSphere(e,t){wn.subVectors(e.center,this.origin);const n=wn.dot(this.direction),s=wn.dot(wn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c;const l=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,h=this.origin;return l>=0?(n=(e.min.x-h.x)*l,s=(e.max.x-h.x)*l):(n=(e.max.x-h.x)*l,s=(e.min.x-h.x)*l),d>=0?(r=(e.min.y-h.y)*d,a=(e.max.y-h.y)*d):(r=(e.max.y-h.y)*d,a=(e.min.y-h.y)*d),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-h.z)*u,c=(e.max.z-h.z)*u):(o=(e.max.z-h.z)*u,c=(e.min.z-h.z)*u),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,wn)!==null}intersectTriangle(e,t,n,s,r){ma.subVectors(t,e),Xs.subVectors(n,e),ga.crossVectors(ma,Xs);let a=this.direction.dot(ga),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Vn.subVectors(this.origin,e);const c=o*this.direction.dot(Xs.crossVectors(Vn,Xs));if(c<0)return null;const l=o*this.direction.dot(ma.cross(Vn));if(l<0||c+l>a)return null;const d=-o*Vn.dot(ga);return d<0?null:this.at(d/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class st{constructor(e,t,n,s,r,a,o,c,l,d,u,h,p,g,v,m){st.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,d,u,h,p,g,v,m)}set(e,t,n,s,r,a,o,c,l,d,u,h,p,g,v,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=c,f[2]=l,f[6]=d,f[10]=u,f[14]=h,f[3]=p,f[7]=g,f[11]=v,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new st().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Li.setFromMatrixColumn(e,0).length(),r=1/Li.setFromMatrixColumn(e,1).length(),a=1/Li.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),d=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const h=a*d,p=a*u,g=o*d,v=o*u;t[0]=c*d,t[4]=-c*u,t[8]=l,t[1]=p+g*l,t[5]=h-v*l,t[9]=-o*c,t[2]=v-h*l,t[6]=g+p*l,t[10]=a*c}else if(e.order==="YXZ"){const h=c*d,p=c*u,g=l*d,v=l*u;t[0]=h+v*o,t[4]=g*o-p,t[8]=a*l,t[1]=a*u,t[5]=a*d,t[9]=-o,t[2]=p*o-g,t[6]=v+h*o,t[10]=a*c}else if(e.order==="ZXY"){const h=c*d,p=c*u,g=l*d,v=l*u;t[0]=h-v*o,t[4]=-a*u,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*d,t[9]=v-h*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const h=a*d,p=a*u,g=o*d,v=o*u;t[0]=c*d,t[4]=g*l-p,t[8]=h*l+v,t[1]=c*u,t[5]=v*l+h,t[9]=p*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const h=a*c,p=a*l,g=o*c,v=o*l;t[0]=c*d,t[4]=v-h*u,t[8]=g*u+p,t[1]=u,t[5]=a*d,t[9]=-o*d,t[2]=-l*d,t[6]=p*u+g,t[10]=h-v*u}else if(e.order==="XZY"){const h=a*c,p=a*l,g=o*c,v=o*l;t[0]=c*d,t[4]=-u,t[8]=l*d,t[1]=h*u+v,t[5]=a*d,t[9]=p*u-g,t[2]=g*u-p,t[6]=o*d,t[10]=v*u+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Yp,e,jp)}lookAt(e,t,n){const s=this.elements;return Xt.subVectors(e,t),Xt.lengthSq()===0&&(Xt.z=1),Xt.normalize(),Wn.crossVectors(n,Xt),Wn.lengthSq()===0&&(Math.abs(n.z)===1?Xt.x+=1e-4:Xt.z+=1e-4,Xt.normalize(),Wn.crossVectors(n,Xt)),Wn.normalize(),$s.crossVectors(Xt,Wn),s[0]=Wn.x,s[4]=$s.x,s[8]=Xt.x,s[1]=Wn.y,s[5]=$s.y,s[9]=Xt.y,s[2]=Wn.z,s[6]=$s.z,s[10]=Xt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],d=n[1],u=n[5],h=n[9],p=n[13],g=n[2],v=n[6],m=n[10],f=n[14],M=n[3],b=n[7],y=n[11],D=n[15],A=s[0],w=s[4],P=s[8],E=s[12],x=s[1],R=s[5],k=s[9],z=s[13],X=s[2],K=s[6],W=s[10],J=s[14],V=s[3],re=s[7],ue=s[11],Se=s[15];return r[0]=a*A+o*x+c*X+l*V,r[4]=a*w+o*R+c*K+l*re,r[8]=a*P+o*k+c*W+l*ue,r[12]=a*E+o*z+c*J+l*Se,r[1]=d*A+u*x+h*X+p*V,r[5]=d*w+u*R+h*K+p*re,r[9]=d*P+u*k+h*W+p*ue,r[13]=d*E+u*z+h*J+p*Se,r[2]=g*A+v*x+m*X+f*V,r[6]=g*w+v*R+m*K+f*re,r[10]=g*P+v*k+m*W+f*ue,r[14]=g*E+v*z+m*J+f*Se,r[3]=M*A+b*x+y*X+D*V,r[7]=M*w+b*R+y*K+D*re,r[11]=M*P+b*k+y*W+D*ue,r[15]=M*E+b*z+y*J+D*Se,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],d=e[2],u=e[6],h=e[10],p=e[14],g=e[3],v=e[7],m=e[11],f=e[15];return g*(+r*c*u-s*l*u-r*o*h+n*l*h+s*o*p-n*c*p)+v*(+t*c*p-t*l*h+r*a*h-s*a*p+s*l*d-r*c*d)+m*(+t*l*u-t*o*p-r*a*u+n*a*p+r*o*d-n*l*d)+f*(-s*o*d-t*c*u+t*o*h+s*a*u-n*a*h+n*c*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8],u=e[9],h=e[10],p=e[11],g=e[12],v=e[13],m=e[14],f=e[15],M=u*m*l-v*h*l+v*c*p-o*m*p-u*c*f+o*h*f,b=g*h*l-d*m*l-g*c*p+a*m*p+d*c*f-a*h*f,y=d*v*l-g*u*l+g*o*p-a*v*p-d*o*f+a*u*f,D=g*u*c-d*v*c-g*o*h+a*v*h+d*o*m-a*u*m,A=t*M+n*b+s*y+r*D;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/A;return e[0]=M*w,e[1]=(v*h*r-u*m*r-v*s*p+n*m*p+u*s*f-n*h*f)*w,e[2]=(o*m*r-v*c*r+v*s*l-n*m*l-o*s*f+n*c*f)*w,e[3]=(u*c*r-o*h*r-u*s*l+n*h*l+o*s*p-n*c*p)*w,e[4]=b*w,e[5]=(d*m*r-g*h*r+g*s*p-t*m*p-d*s*f+t*h*f)*w,e[6]=(g*c*r-a*m*r-g*s*l+t*m*l+a*s*f-t*c*f)*w,e[7]=(a*h*r-d*c*r+d*s*l-t*h*l-a*s*p+t*c*p)*w,e[8]=y*w,e[9]=(g*u*r-d*v*r-g*n*p+t*v*p+d*n*f-t*u*f)*w,e[10]=(a*v*r-g*o*r+g*n*l-t*v*l-a*n*f+t*o*f)*w,e[11]=(d*o*r-a*u*r-d*n*l+t*u*l+a*n*p-t*o*p)*w,e[12]=D*w,e[13]=(d*v*s-g*u*s+g*n*h-t*v*h-d*n*m+t*u*m)*w,e[14]=(g*o*s-a*v*s-g*n*c+t*v*c+a*n*m-t*o*m)*w,e[15]=(a*u*s-d*o*s+d*n*c-t*u*c-a*n*h+t*o*h)*w,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,d=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,d*o+n,d*c-s*a,0,l*c-s*o,d*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,d=a+a,u=o+o,h=r*l,p=r*d,g=r*u,v=a*d,m=a*u,f=o*u,M=c*l,b=c*d,y=c*u,D=n.x,A=n.y,w=n.z;return s[0]=(1-(v+f))*D,s[1]=(p+y)*D,s[2]=(g-b)*D,s[3]=0,s[4]=(p-y)*A,s[5]=(1-(h+f))*A,s[6]=(m+M)*A,s[7]=0,s[8]=(g+b)*w,s[9]=(m-M)*w,s[10]=(1-(h+v))*w,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Li.set(s[0],s[1],s[2]).length();const a=Li.set(s[4],s[5],s[6]).length(),o=Li.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],ln.copy(this);const l=1/r,d=1/a,u=1/o;return ln.elements[0]*=l,ln.elements[1]*=l,ln.elements[2]*=l,ln.elements[4]*=d,ln.elements[5]*=d,ln.elements[6]*=d,ln.elements[8]*=u,ln.elements[9]*=u,ln.elements[10]*=u,t.setFromRotationMatrix(ln),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=Un){const c=this.elements,l=2*r/(t-e),d=2*r/(n-s),u=(t+e)/(t-e),h=(n+s)/(n-s);let p,g;if(o===Un)p=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Pr)p=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Un){const c=this.elements,l=1/(t-e),d=1/(n-s),u=1/(a-r),h=(t+e)*l,p=(n+s)*d;let g,v;if(o===Un)g=(a+r)*u,v=-2*u;else if(o===Pr)g=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-h,c[1]=0,c[5]=2*d,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=v,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Li=new C,ln=new st,Yp=new C(0,0,0),jp=new C(1,1,1),Wn=new C,$s=new C,Xt=new C,Zc=new st,Jc=new Si;class Sn{constructor(e=0,t=0,n=0,s=Sn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],d=s[9],u=s[2],h=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Ot(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ot(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ot(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ot(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ot(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ot(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Zc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Zc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Jc.setFromEuler(this),this.setFromQuaternion(Jc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Sn.DEFAULT_ORDER="XYZ";class gc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Kp=0;const Qc=new C,Di=new Si,An=new st,qs=new C,ys=new C,Zp=new C,Jp=new Si,el=new C(1,0,0),tl=new C(0,1,0),nl=new C(0,0,1),il={type:"added"},Qp={type:"removed"},Ii={type:"childadded",child:null},va={type:"childremoved",child:null};class mt extends Ei{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Kp++}),this.uuid=Ns(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=mt.DEFAULT_UP.clone();const e=new C,t=new Sn,n=new Si,s=new C(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new st},normalMatrix:{value:new Oe}}),this.matrix=new st,this.matrixWorld=new st,this.matrixAutoUpdate=mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new gc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Di.setFromAxisAngle(e,t),this.quaternion.multiply(Di),this}rotateOnWorldAxis(e,t){return Di.setFromAxisAngle(e,t),this.quaternion.premultiply(Di),this}rotateX(e){return this.rotateOnAxis(el,e)}rotateY(e){return this.rotateOnAxis(tl,e)}rotateZ(e){return this.rotateOnAxis(nl,e)}translateOnAxis(e,t){return Qc.copy(e).applyQuaternion(this.quaternion),this.position.add(Qc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(el,e)}translateY(e){return this.translateOnAxis(tl,e)}translateZ(e){return this.translateOnAxis(nl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(An.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?qs.copy(e):qs.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ys.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?An.lookAt(ys,qs,this.up):An.lookAt(qs,ys,this.up),this.quaternion.setFromRotationMatrix(An),s&&(An.extractRotation(s.matrixWorld),Di.setFromRotationMatrix(An),this.quaternion.premultiply(Di.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(il),Ii.child=e,this.dispatchEvent(Ii),Ii.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Qp),va.child=e,this.dispatchEvent(va),va.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),An.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),An.multiply(e.parent.matrixWorld)),e.applyMatrix4(An),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(il),Ii.child=e,this.dispatchEvent(Ii),Ii.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ys,e,Zp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ys,Jp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){const u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),d=a(e.images),u=a(e.shapes),h=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),d.length>0&&(n.images=d),u.length>0&&(n.shapes=u),h.length>0&&(n.skeletons=h),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const c=[];for(const l in o){const d=o[l];delete d.metadata,c.push(d)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}mt.DEFAULT_UP=new C(0,1,0);mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const dn=new C,Cn=new C,_a=new C,Rn=new C,Ui=new C,Ni=new C,sl=new C,xa=new C,ya=new C,Ma=new C,Sa=new nt,Ea=new nt,ba=new nt;class hn{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),dn.subVectors(e,t),s.cross(dn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){dn.subVectors(s,t),Cn.subVectors(n,t),_a.subVectors(e,t);const a=dn.dot(dn),o=dn.dot(Cn),c=dn.dot(_a),l=Cn.dot(Cn),d=Cn.dot(_a),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;const h=1/u,p=(l*c-o*d)*h,g=(a*d-o*c)*h;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Rn)===null?!1:Rn.x>=0&&Rn.y>=0&&Rn.x+Rn.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,Rn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Rn.x),c.addScaledVector(a,Rn.y),c.addScaledVector(o,Rn.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return Sa.setScalar(0),Ea.setScalar(0),ba.setScalar(0),Sa.fromBufferAttribute(e,t),Ea.fromBufferAttribute(e,n),ba.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Sa,r.x),a.addScaledVector(Ea,r.y),a.addScaledVector(ba,r.z),a}static isFrontFacing(e,t,n,s){return dn.subVectors(n,t),Cn.subVectors(e,t),dn.cross(Cn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return dn.subVectors(this.c,this.b),Cn.subVectors(this.a,this.b),dn.cross(Cn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return hn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return hn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return hn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return hn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return hn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;Ui.subVectors(s,n),Ni.subVectors(r,n),xa.subVectors(e,n);const c=Ui.dot(xa),l=Ni.dot(xa);if(c<=0&&l<=0)return t.copy(n);ya.subVectors(e,s);const d=Ui.dot(ya),u=Ni.dot(ya);if(d>=0&&u<=d)return t.copy(s);const h=c*u-d*l;if(h<=0&&c>=0&&d<=0)return a=c/(c-d),t.copy(n).addScaledVector(Ui,a);Ma.subVectors(e,r);const p=Ui.dot(Ma),g=Ni.dot(Ma);if(g>=0&&p<=g)return t.copy(r);const v=p*l-c*g;if(v<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(Ni,o);const m=d*g-p*u;if(m<=0&&u-d>=0&&p-g>=0)return sl.subVectors(r,s),o=(u-d)/(u-d+(p-g)),t.copy(s).addScaledVector(sl,o);const f=1/(m+v+h);return a=v*f,o=h*f,t.copy(n).addScaledVector(Ui,a).addScaledVector(Ni,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const cu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Xn={h:0,s:0,l:0},Ys={h:0,s:0,l:0};function Ta(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ie{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Dt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ye.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=Ye.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ye.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=Ye.workingColorSpace){if(e=Op(e,1),t=Ot(t,0,1),n=Ot(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Ta(a,r,e+1/3),this.g=Ta(a,r,e),this.b=Ta(a,r,e-1/3)}return Ye.toWorkingColorSpace(this,s),this}setStyle(e,t=Dt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Dt){const n=cu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Nn(e.r),this.g=Nn(e.g),this.b=Nn(e.b),this}copyLinearToSRGB(e){return this.r=Qi(e.r),this.g=Qi(e.g),this.b=Qi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Dt){return Ye.fromWorkingColorSpace(Lt.copy(this),e),Math.round(Ot(Lt.r*255,0,255))*65536+Math.round(Ot(Lt.g*255,0,255))*256+Math.round(Ot(Lt.b*255,0,255))}getHexString(e=Dt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ye.workingColorSpace){Ye.fromWorkingColorSpace(Lt.copy(this),t);const n=Lt.r,s=Lt.g,r=Lt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const d=(o+a)/2;if(o===a)c=0,l=0;else{const u=a-o;switch(l=d<=.5?u/(a+o):u/(2-a-o),a){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=d,e}getRGB(e,t=Ye.workingColorSpace){return Ye.fromWorkingColorSpace(Lt.copy(this),t),e.r=Lt.r,e.g=Lt.g,e.b=Lt.b,e}getStyle(e=Dt){Ye.fromWorkingColorSpace(Lt.copy(this),e);const t=Lt.r,n=Lt.g,s=Lt.b;return e!==Dt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Xn),this.setHSL(Xn.h+e,Xn.s+t,Xn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Xn),e.getHSL(Ys);const n=ca(Xn.h,Ys.h,t),s=ca(Xn.s,Ys.s,t),r=ca(Xn.l,Ys.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Lt=new Ie;Ie.NAMES=cu;let em=0;class Fs extends Ei{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:em++}),this.uuid=Ns(),this.name="",this.blending=Zi,this.side=ti,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=so,this.blendDst=ro,this.blendEquation=fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ie(0,0,0),this.blendAlpha=0,this.depthFunc=ns,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Hc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=wi,this.stencilZFail=wi,this.stencilZPass=wi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Zi&&(n.blending=this.blending),this.side!==ti&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==so&&(n.blendSrc=this.blendSrc),this.blendDst!==ro&&(n.blendDst=this.blendDst),this.blendEquation!==fi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ns&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Hc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==wi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==wi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==wi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Mt extends Fs{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Ie(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sn,this.combine=$d,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const vt=new C,js=new Ae;class nn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Gc,this.updateRanges=[],this.gpuType=yn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)js.fromBufferAttribute(this,t),js.applyMatrix3(e),this.setXY(t,js.x,js.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix3(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix4(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.applyNormalMatrix(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.transformDirection(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=vs(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=zt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=vs(t,this.array)),t}setX(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=vs(t,this.array)),t}setY(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=vs(t,this.array)),t}setZ(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=vs(t,this.array)),t}setW(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),s=zt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),s=zt(s,this.array),r=zt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Gc&&(e.usage=this.usage),e}}class lu extends nn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class du extends nn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Et extends nn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let tm=0;const Qt=new st,wa=new mt,Oi=new C,$t=new bi,Ms=new bi,wt=new C;class Ct extends Ei{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:tm++}),this.uuid=Ns(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ru(e)?du:lu)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Oe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Qt.makeRotationFromQuaternion(e),this.applyMatrix4(Qt),this}rotateX(e){return Qt.makeRotationX(e),this.applyMatrix4(Qt),this}rotateY(e){return Qt.makeRotationY(e),this.applyMatrix4(Qt),this}rotateZ(e){return Qt.makeRotationZ(e),this.applyMatrix4(Qt),this}translate(e,t,n){return Qt.makeTranslation(e,t,n),this.applyMatrix4(Qt),this}scale(e,t,n){return Qt.makeScale(e,t,n),this.applyMatrix4(Qt),this}lookAt(e){return wa.lookAt(e),wa.updateMatrix(),this.applyMatrix4(wa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Oi).negate(),this.translate(Oi.x,Oi.y,Oi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Et(n,3))}else{for(let n=0,s=t.count;n<s;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new bi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];$t.setFromBufferAttribute(r),this.morphTargetsRelative?(wt.addVectors(this.boundingBox.min,$t.min),this.boundingBox.expandByPoint(wt),wt.addVectors(this.boundingBox.max,$t.max),this.boundingBox.expandByPoint(wt)):(this.boundingBox.expandByPoint($t.min),this.boundingBox.expandByPoint($t.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Os);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(e){const n=this.boundingSphere.center;if($t.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Ms.setFromBufferAttribute(o),this.morphTargetsRelative?(wt.addVectors($t.min,Ms.min),$t.expandByPoint(wt),wt.addVectors($t.max,Ms.max),$t.expandByPoint(wt)):($t.expandByPoint(Ms.min),$t.expandByPoint(Ms.max))}$t.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)wt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(wt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,d=o.count;l<d;l++)wt.fromBufferAttribute(o,l),c&&(Oi.fromBufferAttribute(e,l),wt.add(Oi)),s=Math.max(s,n.distanceToSquared(wt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new nn(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let P=0;P<n.count;P++)o[P]=new C,c[P]=new C;const l=new C,d=new C,u=new C,h=new Ae,p=new Ae,g=new Ae,v=new C,m=new C;function f(P,E,x){l.fromBufferAttribute(n,P),d.fromBufferAttribute(n,E),u.fromBufferAttribute(n,x),h.fromBufferAttribute(r,P),p.fromBufferAttribute(r,E),g.fromBufferAttribute(r,x),d.sub(l),u.sub(l),p.sub(h),g.sub(h);const R=1/(p.x*g.y-g.x*p.y);isFinite(R)&&(v.copy(d).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(R),m.copy(u).multiplyScalar(p.x).addScaledVector(d,-g.x).multiplyScalar(R),o[P].add(v),o[E].add(v),o[x].add(v),c[P].add(m),c[E].add(m),c[x].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let P=0,E=M.length;P<E;++P){const x=M[P],R=x.start,k=x.count;for(let z=R,X=R+k;z<X;z+=3)f(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const b=new C,y=new C,D=new C,A=new C;function w(P){D.fromBufferAttribute(s,P),A.copy(D);const E=o[P];b.copy(E),b.sub(D.multiplyScalar(D.dot(E))).normalize(),y.crossVectors(A,E);const R=y.dot(c[P])<0?-1:1;a.setXYZW(P,b.x,b.y,b.z,R)}for(let P=0,E=M.length;P<E;++P){const x=M[P],R=x.start,k=x.count;for(let z=R,X=R+k;z<X;z+=3)w(e.getX(z+0)),w(e.getX(z+1)),w(e.getX(z+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new nn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,p=n.count;h<p;h++)n.setXYZ(h,0,0,0);const s=new C,r=new C,a=new C,o=new C,c=new C,l=new C,d=new C,u=new C;if(e)for(let h=0,p=e.count;h<p;h+=3){const g=e.getX(h+0),v=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,m),o.add(d),c.add(d),l.add(d),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,p=t.count;h<p;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),n.setXYZ(h+0,d.x,d.y,d.z),n.setXYZ(h+1,d.x,d.y,d.z),n.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)wt.fromBufferAttribute(e,t),wt.normalize(),e.setXYZ(t,wt.x,wt.y,wt.z)}toNonIndexed(){function e(o,c){const l=o.array,d=o.itemSize,u=o.normalized,h=new l.constructor(c.length*d);let p=0,g=0;for(let v=0,m=c.length;v<m;v++){o.isInterleavedBufferAttribute?p=c[v]*o.data.stride+o.offset:p=c[v]*d;for(let f=0;f<d;f++)h[g++]=l[p++]}return new nn(h,d,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ct,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let d=0,u=l.length;d<u;d++){const h=l[d],p=e(h,n);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],d=[];for(let u=0,h=l.length;u<h;u++){const p=l[u];d.push(p.toJSON(e.data))}d.length>0&&(s[c]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const l in s){const d=s[l];this.setAttribute(l,d.clone(t))}const r=e.morphAttributes;for(const l in r){const d=[],u=r[l];for(let h=0,p=u.length;h<p;h++)d.push(u[h].clone(t));this.morphAttributes[l]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,d=a.length;l<d;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const rl=new st,oi=new mc,Ks=new Os,al=new C,Zs=new C,Js=new C,Qs=new C,Aa=new C,er=new C,ol=new C,tr=new C;class xe extends mt{constructor(e=new Ct,t=new Mt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){er.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const d=o[c],u=r[c];d!==0&&(Aa.fromBufferAttribute(u,e),a?er.addScaledVector(Aa,d):er.addScaledVector(Aa.sub(t),d))}t.add(er)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ks.copy(n.boundingSphere),Ks.applyMatrix4(r),oi.copy(e.ray).recast(e.near),!(Ks.containsPoint(oi.origin)===!1&&(oi.intersectSphere(Ks,al)===null||oi.origin.distanceToSquared(al)>(e.far-e.near)**2))&&(rl.copy(r).invert(),oi.copy(e.ray).applyMatrix4(rl),!(n.boundingBox!==null&&oi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,oi)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,d=r.attributes.uv1,u=r.attributes.normal,h=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=h.length;g<v;g++){const m=h[g],f=a[m.materialIndex],M=Math.max(m.start,p.start),b=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let y=M,D=b;y<D;y+=3){const A=o.getX(y),w=o.getX(y+1),P=o.getX(y+2);s=nr(this,f,e,n,l,d,u,A,w,P),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){const M=o.getX(m),b=o.getX(m+1),y=o.getX(m+2);s=nr(this,a,e,n,l,d,u,M,b,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,v=h.length;g<v;g++){const m=h[g],f=a[m.materialIndex],M=Math.max(m.start,p.start),b=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let y=M,D=b;y<D;y+=3){const A=y,w=y+1,P=y+2;s=nr(this,f,e,n,l,d,u,A,w,P),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),v=Math.min(c.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){const M=m,b=m+1,y=m+2;s=nr(this,a,e,n,l,d,u,M,b,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function nm(i,e,t,n,s,r,a,o){let c;if(e.side===kt?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===ti,o),c===null)return null;tr.copy(o),tr.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(tr);return l<t.near||l>t.far?null:{distance:l,point:tr.clone(),object:i}}function nr(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,Zs),i.getVertexPosition(c,Js),i.getVertexPosition(l,Qs);const d=nm(i,e,t,n,Zs,Js,Qs,ol);if(d){const u=new C;hn.getBarycoord(ol,Zs,Js,Qs,u),s&&(d.uv=hn.getInterpolatedAttribute(s,o,c,l,u,new Ae)),r&&(d.uv1=hn.getInterpolatedAttribute(r,o,c,l,u,new Ae)),a&&(d.normal=hn.getInterpolatedAttribute(a,o,c,l,u,new C),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new C,materialIndex:0};hn.getNormal(Zs,Js,Qs,h.normal),d.face=h,d.barycoord=u}return d}class ft extends Ct{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],d=[],u=[];let h=0,p=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Et(l,3)),this.setAttribute("normal",new Et(d,3)),this.setAttribute("uv",new Et(u,2));function g(v,m,f,M,b,y,D,A,w,P,E){const x=y/w,R=D/P,k=y/2,z=D/2,X=A/2,K=w+1,W=P+1;let J=0,V=0;const re=new C;for(let ue=0;ue<W;ue++){const Se=ue*R-z;for(let Be=0;Be<K;Be++){const it=Be*x-k;re[v]=it*M,re[m]=Se*b,re[f]=X,l.push(re.x,re.y,re.z),re[v]=0,re[m]=0,re[f]=A>0?1:-1,d.push(re.x,re.y,re.z),u.push(Be/w),u.push(1-ue/P),J+=1}}for(let ue=0;ue<P;ue++)for(let Se=0;Se<w;Se++){const Be=h+Se+K*ue,it=h+Se+K*(ue+1),q=h+(Se+1)+K*(ue+1),ne=h+(Se+1)+K*ue;c.push(Be,it,ne),c.push(it,q,ne),V+=6}o.addGroup(p,V,E),p+=V,h+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ft(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function cs(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Nt(i){const e={};for(let t=0;t<i.length;t++){const n=cs(i[t]);for(const s in n)e[s]=n[s]}return e}function im(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function uu(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ye.workingColorSpace}const sm={clone:cs,merge:Nt};var rm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,am=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ni extends Fs{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=rm,this.fragmentShader=am,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=cs(e.uniforms),this.uniformsGroups=im(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class hu extends mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new st,this.projectionMatrix=new st,this.projectionMatrixInverse=new st,this.coordinateSystem=Un}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const $n=new C,cl=new Ae,ll=new Ae;class Yt extends hu{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Vo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Er*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Vo*2*Math.atan(Math.tan(Er*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){$n.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set($n.x,$n.y).multiplyScalar(-e/$n.z),$n.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set($n.x,$n.y).multiplyScalar(-e/$n.z)}getViewSize(e,t){return this.getViewBounds(e,cl,ll),t.subVectors(ll,cl)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Er*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Fi=-90,ki=1;class om extends mt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Yt(Fi,ki,e,t);s.layers=this.layers,this.add(s);const r=new Yt(Fi,ki,e,t);r.layers=this.layers,this.add(r);const a=new Yt(Fi,ki,e,t);a.layers=this.layers,this.add(a);const o=new Yt(Fi,ki,e,t);o.layers=this.layers,this.add(o);const c=new Yt(Fi,ki,e,t);c.layers=this.layers,this.add(c);const l=new Yt(Fi,ki,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===Un)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Pr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,d]=this.children,u=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),e.render(t,d),e.setRenderTarget(u,h,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class fu extends It{constructor(e,t,n,s,r,a,o,c,l,d){e=e!==void 0?e:[],t=t!==void 0?t:is,super(e,t,n,s,r,a,o,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class cm extends Mi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new fu(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:xn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new ft(5,5,5),r=new ni({name:"CubemapFromEquirect",uniforms:cs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:kt,blending:Qn});r.uniforms.tEquirect.value=t;const a=new xe(s,r),o=t.minFilter;return t.minFilter===vi&&(t.minFilter=xn),new om(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}const Ca=new C,lm=new C,dm=new Oe;class Yn{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Ca.subVectors(n,t).cross(lm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Ca),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||dm.getNormalMatrix(e),s=this.coplanarPoint(Ca).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ci=new Os,ir=new C;class vc{constructor(e=new Yn,t=new Yn,n=new Yn,s=new Yn,r=new Yn,a=new Yn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Un){const n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],c=s[3],l=s[4],d=s[5],u=s[6],h=s[7],p=s[8],g=s[9],v=s[10],m=s[11],f=s[12],M=s[13],b=s[14],y=s[15];if(n[0].setComponents(c-r,h-l,m-p,y-f).normalize(),n[1].setComponents(c+r,h+l,m+p,y+f).normalize(),n[2].setComponents(c+a,h+d,m+g,y+M).normalize(),n[3].setComponents(c-a,h-d,m-g,y-M).normalize(),n[4].setComponents(c-o,h-u,m-v,y-b).normalize(),t===Un)n[5].setComponents(c+o,h+u,m+v,y+b).normalize();else if(t===Pr)n[5].setComponents(o,u,v,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ci.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ci.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ci)}intersectsSprite(e){return ci.center.set(0,0,0),ci.radius=.7071067811865476,ci.applyMatrix4(e.matrixWorld),this.intersectsSphere(ci)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(ir.x=s.normal.x>0?e.max.x:e.min.x,ir.y=s.normal.y>0?e.max.y:e.min.y,ir.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ir)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function pu(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function um(i){const e=new WeakMap;function t(o,c){const l=o.array,d=o.usage,u=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,d),o.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,c,l){const d=c.array,u=c.updateRanges;if(i.bindBuffer(l,o),u.length===0)i.bufferSubData(l,0,d);else{u.sort((p,g)=>p.start-g.start);let h=0;for(let p=1;p<u.length;p++){const g=u[h],v=u[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++h,u[h]=v)}u.length=h+1;for(let p=0,g=u.length;p<g;p++){const v=u[p];i.bufferSubData(l,v.start*d.BYTES_PER_ELEMENT,d,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}class Xr extends Ct{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,d=c+1,u=e/o,h=t/c,p=[],g=[],v=[],m=[];for(let f=0;f<d;f++){const M=f*h-a;for(let b=0;b<l;b++){const y=b*u-r;g.push(y,-M,0),v.push(0,0,1),m.push(b/o),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let M=0;M<o;M++){const b=M+l*f,y=M+l*(f+1),D=M+1+l*(f+1),A=M+1+l*f;p.push(b,y,A),p.push(y,D,A)}this.setIndex(p),this.setAttribute("position",new Et(g,3)),this.setAttribute("normal",new Et(v,3)),this.setAttribute("uv",new Et(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xr(e.width,e.height,e.widthSegments,e.heightSegments)}}var hm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,fm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,pm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,mm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,vm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,_m=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,xm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ym=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Mm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Sm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Em=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Tm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,wm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Am=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Cm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Rm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Pm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Lm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Dm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Im=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Um=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Nm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Om=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Fm=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,km=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Bm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,zm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Hm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Gm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Vm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Wm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Xm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,$m=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,qm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ym=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,jm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Km=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Zm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Jm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Qm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,eg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,tg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ng=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ig=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,sg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,rg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ag=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,og=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,cg=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,dg=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ug=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,hg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,fg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,pg=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,mg=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gg=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vg=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,_g=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,xg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,yg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Mg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Sg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Eg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,bg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Tg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,wg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ag=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Cg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Rg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Pg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Lg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Dg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ig=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ug=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ng=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Og=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Fg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,kg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Bg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,zg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Hg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Gg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Vg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Wg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Xg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,$g=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,qg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Yg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,jg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Kg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Zg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Jg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Qg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,e0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,t0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,n0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,i0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,s0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,r0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,a0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,o0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,c0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,l0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,d0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const u0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,h0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,f0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,p0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,m0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,g0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,v0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,_0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,x0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,y0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,M0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,S0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,E0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,b0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,T0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,w0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,A0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,C0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,R0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,P0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,L0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,D0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,I0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,U0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,N0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,O0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,F0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,k0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,B0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,z0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,H0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,G0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,V0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,W0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ke={alphahash_fragment:hm,alphahash_pars_fragment:fm,alphamap_fragment:pm,alphamap_pars_fragment:mm,alphatest_fragment:gm,alphatest_pars_fragment:vm,aomap_fragment:_m,aomap_pars_fragment:xm,batching_pars_vertex:ym,batching_vertex:Mm,begin_vertex:Sm,beginnormal_vertex:Em,bsdfs:bm,iridescence_fragment:Tm,bumpmap_pars_fragment:wm,clipping_planes_fragment:Am,clipping_planes_pars_fragment:Cm,clipping_planes_pars_vertex:Rm,clipping_planes_vertex:Pm,color_fragment:Lm,color_pars_fragment:Dm,color_pars_vertex:Im,color_vertex:Um,common:Nm,cube_uv_reflection_fragment:Om,defaultnormal_vertex:Fm,displacementmap_pars_vertex:km,displacementmap_vertex:Bm,emissivemap_fragment:zm,emissivemap_pars_fragment:Hm,colorspace_fragment:Gm,colorspace_pars_fragment:Vm,envmap_fragment:Wm,envmap_common_pars_fragment:Xm,envmap_pars_fragment:$m,envmap_pars_vertex:qm,envmap_physical_pars_fragment:sg,envmap_vertex:Ym,fog_vertex:jm,fog_pars_vertex:Km,fog_fragment:Zm,fog_pars_fragment:Jm,gradientmap_pars_fragment:Qm,lightmap_pars_fragment:eg,lights_lambert_fragment:tg,lights_lambert_pars_fragment:ng,lights_pars_begin:ig,lights_toon_fragment:rg,lights_toon_pars_fragment:ag,lights_phong_fragment:og,lights_phong_pars_fragment:cg,lights_physical_fragment:lg,lights_physical_pars_fragment:dg,lights_fragment_begin:ug,lights_fragment_maps:hg,lights_fragment_end:fg,logdepthbuf_fragment:pg,logdepthbuf_pars_fragment:mg,logdepthbuf_pars_vertex:gg,logdepthbuf_vertex:vg,map_fragment:_g,map_pars_fragment:xg,map_particle_fragment:yg,map_particle_pars_fragment:Mg,metalnessmap_fragment:Sg,metalnessmap_pars_fragment:Eg,morphinstance_vertex:bg,morphcolor_vertex:Tg,morphnormal_vertex:wg,morphtarget_pars_vertex:Ag,morphtarget_vertex:Cg,normal_fragment_begin:Rg,normal_fragment_maps:Pg,normal_pars_fragment:Lg,normal_pars_vertex:Dg,normal_vertex:Ig,normalmap_pars_fragment:Ug,clearcoat_normal_fragment_begin:Ng,clearcoat_normal_fragment_maps:Og,clearcoat_pars_fragment:Fg,iridescence_pars_fragment:kg,opaque_fragment:Bg,packing:zg,premultiplied_alpha_fragment:Hg,project_vertex:Gg,dithering_fragment:Vg,dithering_pars_fragment:Wg,roughnessmap_fragment:Xg,roughnessmap_pars_fragment:$g,shadowmap_pars_fragment:qg,shadowmap_pars_vertex:Yg,shadowmap_vertex:jg,shadowmask_pars_fragment:Kg,skinbase_vertex:Zg,skinning_pars_vertex:Jg,skinning_vertex:Qg,skinnormal_vertex:e0,specularmap_fragment:t0,specularmap_pars_fragment:n0,tonemapping_fragment:i0,tonemapping_pars_fragment:s0,transmission_fragment:r0,transmission_pars_fragment:a0,uv_pars_fragment:o0,uv_pars_vertex:c0,uv_vertex:l0,worldpos_vertex:d0,background_vert:u0,background_frag:h0,backgroundCube_vert:f0,backgroundCube_frag:p0,cube_vert:m0,cube_frag:g0,depth_vert:v0,depth_frag:_0,distanceRGBA_vert:x0,distanceRGBA_frag:y0,equirect_vert:M0,equirect_frag:S0,linedashed_vert:E0,linedashed_frag:b0,meshbasic_vert:T0,meshbasic_frag:w0,meshlambert_vert:A0,meshlambert_frag:C0,meshmatcap_vert:R0,meshmatcap_frag:P0,meshnormal_vert:L0,meshnormal_frag:D0,meshphong_vert:I0,meshphong_frag:U0,meshphysical_vert:N0,meshphysical_frag:O0,meshtoon_vert:F0,meshtoon_frag:k0,points_vert:B0,points_frag:z0,shadow_vert:H0,shadow_frag:G0,sprite_vert:V0,sprite_frag:W0},ie={common:{diffuse:{value:new Ie(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Oe}},envmap:{envMap:{value:null},envMapRotation:{value:new Oe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Oe},normalScale:{value:new Ae(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ie(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ie(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0},uvTransform:{value:new Oe}},sprite:{diffuse:{value:new Ie(16777215)},opacity:{value:1},center:{value:new Ae(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}}},gn={basic:{uniforms:Nt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.fog]),vertexShader:ke.meshbasic_vert,fragmentShader:ke.meshbasic_frag},lambert:{uniforms:Nt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new Ie(0)}}]),vertexShader:ke.meshlambert_vert,fragmentShader:ke.meshlambert_frag},phong:{uniforms:Nt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new Ie(0)},specular:{value:new Ie(1118481)},shininess:{value:30}}]),vertexShader:ke.meshphong_vert,fragmentShader:ke.meshphong_frag},standard:{uniforms:Nt([ie.common,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.roughnessmap,ie.metalnessmap,ie.fog,ie.lights,{emissive:{value:new Ie(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag},toon:{uniforms:Nt([ie.common,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.gradientmap,ie.fog,ie.lights,{emissive:{value:new Ie(0)}}]),vertexShader:ke.meshtoon_vert,fragmentShader:ke.meshtoon_frag},matcap:{uniforms:Nt([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,{matcap:{value:null}}]),vertexShader:ke.meshmatcap_vert,fragmentShader:ke.meshmatcap_frag},points:{uniforms:Nt([ie.points,ie.fog]),vertexShader:ke.points_vert,fragmentShader:ke.points_frag},dashed:{uniforms:Nt([ie.common,ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ke.linedashed_vert,fragmentShader:ke.linedashed_frag},depth:{uniforms:Nt([ie.common,ie.displacementmap]),vertexShader:ke.depth_vert,fragmentShader:ke.depth_frag},normal:{uniforms:Nt([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,{opacity:{value:1}}]),vertexShader:ke.meshnormal_vert,fragmentShader:ke.meshnormal_frag},sprite:{uniforms:Nt([ie.sprite,ie.fog]),vertexShader:ke.sprite_vert,fragmentShader:ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ke.background_vert,fragmentShader:ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Oe}},vertexShader:ke.backgroundCube_vert,fragmentShader:ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ke.cube_vert,fragmentShader:ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ke.equirect_vert,fragmentShader:ke.equirect_frag},distanceRGBA:{uniforms:Nt([ie.common,ie.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ke.distanceRGBA_vert,fragmentShader:ke.distanceRGBA_frag},shadow:{uniforms:Nt([ie.lights,ie.fog,{color:{value:new Ie(0)},opacity:{value:1}}]),vertexShader:ke.shadow_vert,fragmentShader:ke.shadow_frag}};gn.physical={uniforms:Nt([gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Oe},clearcoatNormalScale:{value:new Ae(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Oe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Oe},sheen:{value:0},sheenColor:{value:new Ie(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Oe},transmissionSamplerSize:{value:new Ae},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Oe},attenuationDistance:{value:0},attenuationColor:{value:new Ie(0)},specularColor:{value:new Ie(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Oe},anisotropyVector:{value:new Ae},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Oe}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag};const sr={r:0,b:0,g:0},li=new Sn,X0=new st;function $0(i,e,t,n,s,r,a){const o=new Ie(0);let c=r===!0?0:1,l,d,u=null,h=0,p=null;function g(M){let b=M.isScene===!0?M.background:null;return b&&b.isTexture&&(b=(M.backgroundBlurriness>0?t:e).get(b)),b}function v(M){let b=!1;const y=g(M);y===null?f(o,c):y&&y.isColor&&(f(y,1),b=!0);const D=i.xr.getEnvironmentBlendMode();D==="additive"?n.buffers.color.setClear(0,0,0,1,a):D==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||b)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(M,b){const y=g(b);y&&(y.isCubeTexture||y.mapping===Gr)?(d===void 0&&(d=new xe(new ft(1,1,1),new ni({name:"BackgroundCubeMaterial",uniforms:cs(gn.backgroundCube.uniforms),vertexShader:gn.backgroundCube.vertexShader,fragmentShader:gn.backgroundCube.fragmentShader,side:kt,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(D,A,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),li.copy(b.backgroundRotation),li.x*=-1,li.y*=-1,li.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(li.y*=-1,li.z*=-1),d.material.uniforms.envMap.value=y,d.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(X0.makeRotationFromEuler(li)),d.material.toneMapped=Ye.getTransfer(y.colorSpace)!==Qe,(u!==y||h!==y.version||p!==i.toneMapping)&&(d.material.needsUpdate=!0,u=y,h=y.version,p=i.toneMapping),d.layers.enableAll(),M.unshift(d,d.geometry,d.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new xe(new Xr(2,2),new ni({name:"BackgroundMaterial",uniforms:cs(gn.background.uniforms),vertexShader:gn.background.vertexShader,fragmentShader:gn.background.fragmentShader,side:ti,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=Ye.getTransfer(y.colorSpace)!==Qe,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||h!==y.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,u=y,h=y.version,p=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function f(M,b){M.getRGB(sr,uu(i)),n.buffers.color.setClear(sr.r,sr.g,sr.b,b,a)}return{getClearColor:function(){return o},setClearColor:function(M,b=1){o.set(M),c=b,f(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,f(o,c)},render:v,addToRenderList:m}}function q0(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null);let r=s,a=!1;function o(x,R,k,z,X){let K=!1;const W=u(z,k,R);r!==W&&(r=W,l(r.object)),K=p(x,z,k,X),K&&g(x,z,k,X),X!==null&&e.update(X,i.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,y(x,R,k,z),X!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function c(){return i.createVertexArray()}function l(x){return i.bindVertexArray(x)}function d(x){return i.deleteVertexArray(x)}function u(x,R,k){const z=k.wireframe===!0;let X=n[x.id];X===void 0&&(X={},n[x.id]=X);let K=X[R.id];K===void 0&&(K={},X[R.id]=K);let W=K[z];return W===void 0&&(W=h(c()),K[z]=W),W}function h(x){const R=[],k=[],z=[];for(let X=0;X<t;X++)R[X]=0,k[X]=0,z[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:k,attributeDivisors:z,object:x,attributes:{},index:null}}function p(x,R,k,z){const X=r.attributes,K=R.attributes;let W=0;const J=k.getAttributes();for(const V in J)if(J[V].location>=0){const ue=X[V];let Se=K[V];if(Se===void 0&&(V==="instanceMatrix"&&x.instanceMatrix&&(Se=x.instanceMatrix),V==="instanceColor"&&x.instanceColor&&(Se=x.instanceColor)),ue===void 0||ue.attribute!==Se||Se&&ue.data!==Se.data)return!0;W++}return r.attributesNum!==W||r.index!==z}function g(x,R,k,z){const X={},K=R.attributes;let W=0;const J=k.getAttributes();for(const V in J)if(J[V].location>=0){let ue=K[V];ue===void 0&&(V==="instanceMatrix"&&x.instanceMatrix&&(ue=x.instanceMatrix),V==="instanceColor"&&x.instanceColor&&(ue=x.instanceColor));const Se={};Se.attribute=ue,ue&&ue.data&&(Se.data=ue.data),X[V]=Se,W++}r.attributes=X,r.attributesNum=W,r.index=z}function v(){const x=r.newAttributes;for(let R=0,k=x.length;R<k;R++)x[R]=0}function m(x){f(x,0)}function f(x,R){const k=r.newAttributes,z=r.enabledAttributes,X=r.attributeDivisors;k[x]=1,z[x]===0&&(i.enableVertexAttribArray(x),z[x]=1),X[x]!==R&&(i.vertexAttribDivisor(x,R),X[x]=R)}function M(){const x=r.newAttributes,R=r.enabledAttributes;for(let k=0,z=R.length;k<z;k++)R[k]!==x[k]&&(i.disableVertexAttribArray(k),R[k]=0)}function b(x,R,k,z,X,K,W){W===!0?i.vertexAttribIPointer(x,R,k,X,K):i.vertexAttribPointer(x,R,k,z,X,K)}function y(x,R,k,z){v();const X=z.attributes,K=k.getAttributes(),W=R.defaultAttributeValues;for(const J in K){const V=K[J];if(V.location>=0){let re=X[J];if(re===void 0&&(J==="instanceMatrix"&&x.instanceMatrix&&(re=x.instanceMatrix),J==="instanceColor"&&x.instanceColor&&(re=x.instanceColor)),re!==void 0){const ue=re.normalized,Se=re.itemSize,Be=e.get(re);if(Be===void 0)continue;const it=Be.buffer,q=Be.type,ne=Be.bytesPerElement,_e=q===i.INT||q===i.UNSIGNED_INT||re.gpuType===cc;if(re.isInterleavedBufferAttribute){const ae=re.data,we=ae.stride,Le=re.offset;if(ae.isInstancedInterleavedBuffer){for(let ze=0;ze<V.locationSize;ze++)f(V.location+ze,ae.meshPerAttribute);x.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let ze=0;ze<V.locationSize;ze++)m(V.location+ze);i.bindBuffer(i.ARRAY_BUFFER,it);for(let ze=0;ze<V.locationSize;ze++)b(V.location+ze,Se/V.locationSize,q,ue,we*ne,(Le+Se/V.locationSize*ze)*ne,_e)}else{if(re.isInstancedBufferAttribute){for(let ae=0;ae<V.locationSize;ae++)f(V.location+ae,re.meshPerAttribute);x.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let ae=0;ae<V.locationSize;ae++)m(V.location+ae);i.bindBuffer(i.ARRAY_BUFFER,it);for(let ae=0;ae<V.locationSize;ae++)b(V.location+ae,Se/V.locationSize,q,ue,Se*ne,Se/V.locationSize*ae*ne,_e)}}else if(W!==void 0){const ue=W[J];if(ue!==void 0)switch(ue.length){case 2:i.vertexAttrib2fv(V.location,ue);break;case 3:i.vertexAttrib3fv(V.location,ue);break;case 4:i.vertexAttrib4fv(V.location,ue);break;default:i.vertexAttrib1fv(V.location,ue)}}}}M()}function D(){P();for(const x in n){const R=n[x];for(const k in R){const z=R[k];for(const X in z)d(z[X].object),delete z[X];delete R[k]}delete n[x]}}function A(x){if(n[x.id]===void 0)return;const R=n[x.id];for(const k in R){const z=R[k];for(const X in z)d(z[X].object),delete z[X];delete R[k]}delete n[x.id]}function w(x){for(const R in n){const k=n[R];if(k[x.id]===void 0)continue;const z=k[x.id];for(const X in z)d(z[X].object),delete z[X];delete k[x.id]}}function P(){E(),a=!0,r!==s&&(r=s,l(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:P,resetDefaultState:E,dispose:D,releaseStatesOfGeometry:A,releaseStatesOfProgram:w,initAttributes:v,enableAttribute:m,disableUnusedAttributes:M}}function Y0(i,e,t){let n;function s(l){n=l}function r(l,d){i.drawArrays(n,l,d),t.update(d,n,1)}function a(l,d,u){u!==0&&(i.drawArraysInstanced(n,l,d,u),t.update(d,n,u))}function o(l,d,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,d,0,u);let p=0;for(let g=0;g<u;g++)p+=d[g];t.update(p,n,1)}function c(l,d,u,h){if(u===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)a(l[g],d[g],h[g]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,d,0,h,0,u);let g=0;for(let v=0;v<u;v++)g+=d[v]*h[v];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function j0(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(w){return!(w!==fn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){const P=w===Us&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==Fn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==yn&&!P)}function c(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const d=c(l);d!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);const u=t.logarithmicDepthBuffer===!0,h=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),D=g>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:h,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:M,maxVaryings:b,maxFragmentUniforms:y,vertexTextures:D,maxSamples:A}}function K0(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Yn,o=new Oe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,h){const p=u.length!==0||h||n!==0||s;return s=h,n=u.length,p},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,h){t=d(u,h,0)},this.setState=function(u,h,p){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,f=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?d(null):l();else{const M=r?0:n,b=M*4;let y=f.clippingState||null;c.value=y,y=d(g,h,b,p);for(let D=0;D!==b;++D)y[D]=t[D];f.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(u,h,p,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=c.value,g!==!0||m===null){const f=p+v*4,M=h.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<f)&&(m=new Float32Array(f));for(let b=0,y=p;b!==v;++b,y+=4)a.copy(u[b]).applyMatrix4(M,o),a.normal.toArray(m,y),m[y+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function Z0(i){let e=new WeakMap;function t(a,o){return o===po?a.mapping=is:o===mo&&(a.mapping=ss),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===po||o===mo)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new cm(c.height);return l.fromEquirectangularTexture(i,a),e.set(a,l),a.addEventListener("dispose",s),t(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class mu extends hu{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=d*this.view.offsetY,c=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const ji=4,dl=[.125,.215,.35,.446,.526,.582],pi=20,Ra=new mu,ul=new Ie;let Pa=null,La=0,Da=0,Ia=!1;const hi=(1+Math.sqrt(5))/2,Bi=1/hi,hl=[new C(-hi,Bi,0),new C(hi,Bi,0),new C(-Bi,0,hi),new C(Bi,0,hi),new C(0,hi,-Bi),new C(0,hi,Bi),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)];class fl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Pa=this._renderer.getRenderTarget(),La=this._renderer.getActiveCubeFace(),Da=this._renderer.getActiveMipmapLevel(),Ia=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=gl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ml(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Pa,La,Da),this._renderer.xr.enabled=Ia,e.scissorTest=!1,rr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===is||e.mapping===ss?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Pa=this._renderer.getRenderTarget(),La=this._renderer.getActiveCubeFace(),Da=this._renderer.getActiveMipmapLevel(),Ia=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:xn,minFilter:xn,generateMipmaps:!1,type:Us,format:fn,colorSpace:ds,depthBuffer:!1},s=pl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=pl(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=J0(r)),this._blurMaterial=Q0(r,e,t)}return s}_compileMaterial(e){const t=new xe(this._lodPlanes[0],e);this._renderer.compile(t,Ra)}_sceneToCubeUV(e,t,n,s){const o=new Yt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,h=d.toneMapping;d.getClearColor(ul),d.toneMapping=ei,d.autoClear=!1;const p=new Mt({name:"PMREM.Background",side:kt,depthWrite:!1,depthTest:!1}),g=new xe(new ft,p);let v=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,v=!0):(p.color.copy(ul),v=!0);for(let f=0;f<6;f++){const M=f%3;M===0?(o.up.set(0,c[f],0),o.lookAt(l[f],0,0)):M===1?(o.up.set(0,0,c[f]),o.lookAt(0,l[f],0)):(o.up.set(0,c[f],0),o.lookAt(0,0,l[f]));const b=this._cubeSize;rr(s,M*b,f>2?b:0,b,b),d.setRenderTarget(s),v&&d.render(g,o),d.render(e,o)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=h,d.autoClear=u,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===is||e.mapping===ss;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=gl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ml());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new xe(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;rr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Ra)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=hl[(s-r-1)%hl.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,u=new xe(this._lodPlanes[s],l),h=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*pi-1),v=r/g,m=isFinite(r)?1+Math.floor(d*v):pi;m>pi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${pi}`);const f=[];let M=0;for(let w=0;w<pi;++w){const P=w/v,E=Math.exp(-P*P/2);f.push(E),w===0?M+=E:w<m&&(M+=2*E)}for(let w=0;w<f.length;w++)f[w]=f[w]/M;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=f,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:b}=this;h.dTheta.value=g,h.mipInt.value=b-n;const y=this._sizeLods[s],D=3*y*(s>b-ji?s-b+ji:0),A=4*(this._cubeSize-y);rr(t,D,A,3*y,2*y),c.setRenderTarget(t),c.render(u,Ra)}}function J0(i){const e=[],t=[],n=[];let s=i;const r=i-ji+1+dl.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let c=1/o;a>i-ji?c=dl[a-i+ji-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),d=-l,u=1+l,h=[d,d,u,d,u,u,d,d,u,u,d,u],p=6,g=6,v=3,m=2,f=1,M=new Float32Array(v*g*p),b=new Float32Array(m*g*p),y=new Float32Array(f*g*p);for(let A=0;A<p;A++){const w=A%3*2/3-1,P=A>2?0:-1,E=[w,P,0,w+2/3,P,0,w+2/3,P+1,0,w,P,0,w+2/3,P+1,0,w,P+1,0];M.set(E,v*g*A),b.set(h,m*g*A);const x=[A,A,A,A,A,A];y.set(x,f*g*A)}const D=new Ct;D.setAttribute("position",new nn(M,v)),D.setAttribute("uv",new nn(b,m)),D.setAttribute("faceIndex",new nn(y,f)),e.push(D),s>ji&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function pl(i,e,t){const n=new Mi(i,e,t);return n.texture.mapping=Gr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function rr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Q0(i,e,t){const n=new Float32Array(pi),s=new C(0,1,0);return new ni({name:"SphericalGaussianBlur",defines:{n:pi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:_c(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function ml(){return new ni({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_c(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function gl(){return new ni({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_c(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function _c(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function ev(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===po||c===mo,d=c===is||c===ss;if(l||d){let u=e.get(o);const h=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return t===null&&(t=new fl(i)),u=l?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const p=o.image;return l&&p&&p.height>0||d&&p&&s(p)?(t===null&&(t=new fl(i)),u=l?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let c=0;const l=6;for(let d=0;d<l;d++)o[d]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function tv(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Cs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function nv(i,e,t,n){const s={},r=new WeakMap;function a(u){const h=u.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);for(const g in h.morphAttributes){const v=h.morphAttributes[g];for(let m=0,f=v.length;m<f;m++)e.remove(v[m])}h.removeEventListener("dispose",a),delete s[h.id];const p=r.get(h);p&&(e.remove(p),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(u,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function c(u){const h=u.attributes;for(const g in h)e.update(h[g],i.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const v=p[g];for(let m=0,f=v.length;m<f;m++)e.update(v[m],i.ARRAY_BUFFER)}}function l(u){const h=[],p=u.index,g=u.attributes.position;let v=0;if(p!==null){const M=p.array;v=p.version;for(let b=0,y=M.length;b<y;b+=3){const D=M[b+0],A=M[b+1],w=M[b+2];h.push(D,A,A,w,w,D)}}else if(g!==void 0){const M=g.array;v=g.version;for(let b=0,y=M.length/3-1;b<y;b+=3){const D=b+0,A=b+1,w=b+2;h.push(D,A,A,w,w,D)}}else return;const m=new(ru(h)?du:lu)(h,1);m.version=v;const f=r.get(u);f&&e.remove(f),r.set(u,m)}function d(u){const h=r.get(u);if(h){const p=u.index;p!==null&&h.version<p.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:d}}function iv(i,e,t){let n;function s(h){n=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function c(h,p){i.drawElements(n,p,r,h*a),t.update(p,n,1)}function l(h,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,h*a,g),t.update(p,n,g))}function d(h,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,h,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];t.update(m,n,1)}function u(h,p,g,v){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<h.length;f++)l(h[f]/a,p[f],v[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,h,0,v,0,g);let f=0;for(let M=0;M<g;M++)f+=p[M]*v[M];t.update(f,n,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=d,this.renderMultiDrawInstances=u}function sv(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function rv(i,e,t){const n=new WeakMap,s=new nt;function r(a,o,c){const l=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=d!==void 0?d.length:0;let h=n.get(o);if(h===void 0||h.count!==u){let x=function(){P.dispose(),n.delete(o),o.removeEventListener("dispose",x)};var p=x;h!==void 0&&h.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],M=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let y=0;g===!0&&(y=1),v===!0&&(y=2),m===!0&&(y=3);let D=o.attributes.position.count*y,A=1;D>e.maxTextureSize&&(A=Math.ceil(D/e.maxTextureSize),D=e.maxTextureSize);const w=new Float32Array(D*A*4*u),P=new ou(w,D,A,u);P.type=yn,P.needsUpdate=!0;const E=y*4;for(let R=0;R<u;R++){const k=f[R],z=M[R],X=b[R],K=D*A*4*R;for(let W=0;W<k.count;W++){const J=W*E;g===!0&&(s.fromBufferAttribute(k,W),w[K+J+0]=s.x,w[K+J+1]=s.y,w[K+J+2]=s.z,w[K+J+3]=0),v===!0&&(s.fromBufferAttribute(z,W),w[K+J+4]=s.x,w[K+J+5]=s.y,w[K+J+6]=s.z,w[K+J+7]=0),m===!0&&(s.fromBufferAttribute(X,W),w[K+J+8]=s.x,w[K+J+9]=s.y,w[K+J+10]=s.z,w[K+J+11]=X.itemSize===4?s.w:1)}}h={count:u,texture:P,size:new Ae(D,A)},n.set(o,h),o.addEventListener("dispose",x)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const v=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",v),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function av(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,d=c.geometry,u=e.get(c,d);if(s.get(u)!==l&&(e.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const h=c.skeleton;s.get(h)!==l&&(h.update(),s.set(h,l))}return u}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}class gu extends It{constructor(e,t,n,s,r,a,o,c,l,d=Ji){if(d!==Ji&&d!==os)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===Ji&&(n=yi),n===void 0&&d===os&&(n=as),super(null,s,r,a,o,c,d,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Kt,this.minFilter=c!==void 0?c:Kt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const vu=new It,vl=new gu(1,1),_u=new ou,xu=new $p,yu=new fu,_l=[],xl=[],yl=new Float32Array(16),Ml=new Float32Array(9),Sl=new Float32Array(4);function us(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=_l[s];if(r===void 0&&(r=new Float32Array(s),_l[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function bt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Tt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function $r(i,e){let t=xl[e];t===void 0&&(t=new Int32Array(e),xl[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function ov(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function cv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;i.uniform2fv(this.addr,e),Tt(t,e)}}function lv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(bt(t,e))return;i.uniform3fv(this.addr,e),Tt(t,e)}}function dv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;i.uniform4fv(this.addr,e),Tt(t,e)}}function uv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Tt(t,e)}else{if(bt(t,n))return;Sl.set(n),i.uniformMatrix2fv(this.addr,!1,Sl),Tt(t,n)}}function hv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Tt(t,e)}else{if(bt(t,n))return;Ml.set(n),i.uniformMatrix3fv(this.addr,!1,Ml),Tt(t,n)}}function fv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Tt(t,e)}else{if(bt(t,n))return;yl.set(n),i.uniformMatrix4fv(this.addr,!1,yl),Tt(t,n)}}function pv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function mv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;i.uniform2iv(this.addr,e),Tt(t,e)}}function gv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;i.uniform3iv(this.addr,e),Tt(t,e)}}function vv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;i.uniform4iv(this.addr,e),Tt(t,e)}}function _v(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function xv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;i.uniform2uiv(this.addr,e),Tt(t,e)}}function yv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;i.uniform3uiv(this.addr,e),Tt(t,e)}}function Mv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;i.uniform4uiv(this.addr,e),Tt(t,e)}}function Sv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(vl.compareFunction=su,r=vl):r=vu,t.setTexture2D(e||r,s)}function Ev(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||xu,s)}function bv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||yu,s)}function Tv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||_u,s)}function wv(i){switch(i){case 5126:return ov;case 35664:return cv;case 35665:return lv;case 35666:return dv;case 35674:return uv;case 35675:return hv;case 35676:return fv;case 5124:case 35670:return pv;case 35667:case 35671:return mv;case 35668:case 35672:return gv;case 35669:case 35673:return vv;case 5125:return _v;case 36294:return xv;case 36295:return yv;case 36296:return Mv;case 35678:case 36198:case 36298:case 36306:case 35682:return Sv;case 35679:case 36299:case 36307:return Ev;case 35680:case 36300:case 36308:case 36293:return bv;case 36289:case 36303:case 36311:case 36292:return Tv}}function Av(i,e){i.uniform1fv(this.addr,e)}function Cv(i,e){const t=us(e,this.size,2);i.uniform2fv(this.addr,t)}function Rv(i,e){const t=us(e,this.size,3);i.uniform3fv(this.addr,t)}function Pv(i,e){const t=us(e,this.size,4);i.uniform4fv(this.addr,t)}function Lv(i,e){const t=us(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Dv(i,e){const t=us(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Iv(i,e){const t=us(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Uv(i,e){i.uniform1iv(this.addr,e)}function Nv(i,e){i.uniform2iv(this.addr,e)}function Ov(i,e){i.uniform3iv(this.addr,e)}function Fv(i,e){i.uniform4iv(this.addr,e)}function kv(i,e){i.uniform1uiv(this.addr,e)}function Bv(i,e){i.uniform2uiv(this.addr,e)}function zv(i,e){i.uniform3uiv(this.addr,e)}function Hv(i,e){i.uniform4uiv(this.addr,e)}function Gv(i,e,t){const n=this.cache,s=e.length,r=$r(t,s);bt(n,r)||(i.uniform1iv(this.addr,r),Tt(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||vu,r[a])}function Vv(i,e,t){const n=this.cache,s=e.length,r=$r(t,s);bt(n,r)||(i.uniform1iv(this.addr,r),Tt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||xu,r[a])}function Wv(i,e,t){const n=this.cache,s=e.length,r=$r(t,s);bt(n,r)||(i.uniform1iv(this.addr,r),Tt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||yu,r[a])}function Xv(i,e,t){const n=this.cache,s=e.length,r=$r(t,s);bt(n,r)||(i.uniform1iv(this.addr,r),Tt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||_u,r[a])}function $v(i){switch(i){case 5126:return Av;case 35664:return Cv;case 35665:return Rv;case 35666:return Pv;case 35674:return Lv;case 35675:return Dv;case 35676:return Iv;case 5124:case 35670:return Uv;case 35667:case 35671:return Nv;case 35668:case 35672:return Ov;case 35669:case 35673:return Fv;case 5125:return kv;case 36294:return Bv;case 36295:return zv;case 36296:return Hv;case 35678:case 36198:case 36298:case 36306:case 35682:return Gv;case 35679:case 36299:case 36307:return Vv;case 35680:case 36300:case 36308:case 36293:return Wv;case 36289:case 36303:case 36311:case 36292:return Xv}}class qv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=wv(t.type)}}class Yv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=$v(t.type)}}class jv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Ua=/(\w+)(\])?(\[|\.)?/g;function El(i,e){i.seq.push(e),i.map[e.id]=e}function Kv(i,e,t){const n=i.name,s=n.length;for(Ua.lastIndex=0;;){const r=Ua.exec(n),a=Ua.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){El(t,l===void 0?new qv(o,i,e):new Yv(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new jv(o),El(t,u)),t=u}}}class br{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);Kv(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function bl(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Zv=37297;let Jv=0;function Qv(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Tl=new Oe;function e_(i){Ye._getMatrix(Tl,Ye.workingColorSpace,i);const e=`mat3( ${Tl.elements.map(t=>t.toFixed(4))} )`;switch(Ye.getTransfer(i)){case Vr:return[e,"LinearTransferOETF"];case Qe:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function wl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+Qv(i.getShaderSource(e),a)}else return s}function t_(i,e){const t=e_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function n_(i,e){let t;switch(e){case _p:t="Linear";break;case xp:t="Reinhard";break;case yp:t="Cineon";break;case Mp:t="ACESFilmic";break;case Ep:t="AgX";break;case bp:t="Neutral";break;case Sp:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ar=new C;function i_(){Ye.getLuminanceCoefficients(ar);const i=ar.x.toFixed(4),e=ar.y.toFixed(4),t=ar.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function s_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Rs).join(`
`)}function r_(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function a_(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Rs(i){return i!==""}function Al(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Cl(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const o_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Wo(i){return i.replace(o_,l_)}const c_=new Map;function l_(i,e){let t=ke[e];if(t===void 0){const n=c_.get(e);if(n!==void 0)t=ke[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Wo(t)}const d_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Rl(i){return i.replace(d_,u_)}function u_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Pl(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function h_(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Wd?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Xd?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Pn&&(e="SHADOWMAP_TYPE_VSM"),e}function f_(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case is:case ss:e="ENVMAP_TYPE_CUBE";break;case Gr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function p_(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ss:e="ENVMAP_MODE_REFRACTION";break}return e}function m_(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case $d:e="ENVMAP_BLENDING_MULTIPLY";break;case gp:e="ENVMAP_BLENDING_MIX";break;case vp:e="ENVMAP_BLENDING_ADD";break}return e}function g_(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function v_(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=h_(t),l=f_(t),d=p_(t),u=m_(t),h=g_(t),p=s_(t),g=r_(r),v=s.createProgram();let m,f,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Rs).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Rs).join(`
`),f.length>0&&(f+=`
`)):(m=[Pl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Rs).join(`
`),f=[Pl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ei?"#define TONE_MAPPING":"",t.toneMapping!==ei?ke.tonemapping_pars_fragment:"",t.toneMapping!==ei?n_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ke.colorspace_pars_fragment,t_("linearToOutputTexel",t.outputColorSpace),i_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Rs).join(`
`)),a=Wo(a),a=Al(a,t),a=Cl(a,t),o=Wo(o),o=Al(o,t),o=Cl(o,t),a=Rl(a),o=Rl(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===Vc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Vc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const b=M+m+a,y=M+f+o,D=bl(s,s.VERTEX_SHADER,b),A=bl(s,s.FRAGMENT_SHADER,y);s.attachShader(v,D),s.attachShader(v,A),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function w(R){if(i.debug.checkShaderErrors){const k=s.getProgramInfoLog(v).trim(),z=s.getShaderInfoLog(D).trim(),X=s.getShaderInfoLog(A).trim();let K=!0,W=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(K=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,D,A);else{const J=wl(s,D,"vertex"),V=wl(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+k+`
`+J+`
`+V)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(z===""||X==="")&&(W=!1);W&&(R.diagnostics={runnable:K,programLog:k,vertexShader:{log:z,prefix:m},fragmentShader:{log:X,prefix:f}})}s.deleteShader(D),s.deleteShader(A),P=new br(s,v),E=a_(s,v)}let P;this.getUniforms=function(){return P===void 0&&w(this),P};let E;this.getAttributes=function(){return E===void 0&&w(this),E};let x=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(v,Zv)),x},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Jv++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=D,this.fragmentShader=A,this}let __=0;class x_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new y_(e),t.set(e,n)),n}}class y_{constructor(e){this.id=__++,this.code=e,this.usedTimes=0}}function M_(i,e,t,n,s,r,a){const o=new gc,c=new x_,l=new Set,d=[],u=s.logarithmicDepthBuffer,h=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(E){return l.add(E),E===0?"uv":`uv${E}`}function m(E,x,R,k,z){const X=k.fog,K=z.geometry,W=E.isMeshStandardMaterial?k.environment:null,J=(E.isMeshStandardMaterial?t:e).get(E.envMap||W),V=J&&J.mapping===Gr?J.image.height:null,re=g[E.type];E.precision!==null&&(p=s.getMaxPrecision(E.precision),p!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));const ue=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Se=ue!==void 0?ue.length:0;let Be=0;K.morphAttributes.position!==void 0&&(Be=1),K.morphAttributes.normal!==void 0&&(Be=2),K.morphAttributes.color!==void 0&&(Be=3);let it,q,ne,_e;if(re){const Je=gn[re];it=Je.vertexShader,q=Je.fragmentShader}else it=E.vertexShader,q=E.fragmentShader,c.update(E),ne=c.getVertexShaderID(E),_e=c.getFragmentShaderID(E);const ae=i.getRenderTarget(),we=i.state.buffers.depth.getReversed(),Le=z.isInstancedMesh===!0,ze=z.isBatchedMesh===!0,ht=!!E.map,Xe=!!E.matcap,gt=!!J,N=!!E.aoMap,Zt=!!E.lightMap,He=!!E.bumpMap,Ge=!!E.normalMap,be=!!E.displacementMap,ot=!!E.emissiveMap,Ee=!!E.metalnessMap,T=!!E.roughnessMap,_=E.anisotropy>0,F=E.clearcoat>0,Y=E.dispersion>0,Z=E.iridescence>0,$=E.sheen>0,ye=E.transmission>0,oe=_&&!!E.anisotropyMap,he=F&&!!E.clearcoatMap,$e=F&&!!E.clearcoatNormalMap,ee=F&&!!E.clearcoatRoughnessMap,fe=Z&&!!E.iridescenceMap,Te=Z&&!!E.iridescenceThicknessMap,Ce=$&&!!E.sheenColorMap,pe=$&&!!E.sheenRoughnessMap,Ve=!!E.specularMap,Fe=!!E.specularColorMap,rt=!!E.specularIntensityMap,L=ye&&!!E.transmissionMap,se=ye&&!!E.thicknessMap,G=!!E.gradientMap,j=!!E.alphaMap,de=E.alphaTest>0,ce=!!E.alphaHash,Ue=!!E.extensions;let pt=ei;E.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(pt=i.toneMapping);const Rt={shaderID:re,shaderType:E.type,shaderName:E.name,vertexShader:it,fragmentShader:q,defines:E.defines,customVertexShaderID:ne,customFragmentShaderID:_e,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:ze,batchingColor:ze&&z._colorsTexture!==null,instancing:Le,instancingColor:Le&&z.instanceColor!==null,instancingMorph:Le&&z.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:ae===null?i.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:ds,alphaToCoverage:!!E.alphaToCoverage,map:ht,matcap:Xe,envMap:gt,envMapMode:gt&&J.mapping,envMapCubeUVHeight:V,aoMap:N,lightMap:Zt,bumpMap:He,normalMap:Ge,displacementMap:h&&be,emissiveMap:ot,normalMapObjectSpace:Ge&&E.normalMapType===Cp,normalMapTangentSpace:Ge&&E.normalMapType===iu,metalnessMap:Ee,roughnessMap:T,anisotropy:_,anisotropyMap:oe,clearcoat:F,clearcoatMap:he,clearcoatNormalMap:$e,clearcoatRoughnessMap:ee,dispersion:Y,iridescence:Z,iridescenceMap:fe,iridescenceThicknessMap:Te,sheen:$,sheenColorMap:Ce,sheenRoughnessMap:pe,specularMap:Ve,specularColorMap:Fe,specularIntensityMap:rt,transmission:ye,transmissionMap:L,thicknessMap:se,gradientMap:G,opaque:E.transparent===!1&&E.blending===Zi&&E.alphaToCoverage===!1,alphaMap:j,alphaTest:de,alphaHash:ce,combine:E.combine,mapUv:ht&&v(E.map.channel),aoMapUv:N&&v(E.aoMap.channel),lightMapUv:Zt&&v(E.lightMap.channel),bumpMapUv:He&&v(E.bumpMap.channel),normalMapUv:Ge&&v(E.normalMap.channel),displacementMapUv:be&&v(E.displacementMap.channel),emissiveMapUv:ot&&v(E.emissiveMap.channel),metalnessMapUv:Ee&&v(E.metalnessMap.channel),roughnessMapUv:T&&v(E.roughnessMap.channel),anisotropyMapUv:oe&&v(E.anisotropyMap.channel),clearcoatMapUv:he&&v(E.clearcoatMap.channel),clearcoatNormalMapUv:$e&&v(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ee&&v(E.clearcoatRoughnessMap.channel),iridescenceMapUv:fe&&v(E.iridescenceMap.channel),iridescenceThicknessMapUv:Te&&v(E.iridescenceThicknessMap.channel),sheenColorMapUv:Ce&&v(E.sheenColorMap.channel),sheenRoughnessMapUv:pe&&v(E.sheenRoughnessMap.channel),specularMapUv:Ve&&v(E.specularMap.channel),specularColorMapUv:Fe&&v(E.specularColorMap.channel),specularIntensityMapUv:rt&&v(E.specularIntensityMap.channel),transmissionMapUv:L&&v(E.transmissionMap.channel),thicknessMapUv:se&&v(E.thicknessMap.channel),alphaMapUv:j&&v(E.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(Ge||_),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!K.attributes.uv&&(ht||j),fog:!!X,useFog:E.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:we,skinning:z.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:Se,morphTextureStride:Be,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:pt,decodeVideoTexture:ht&&E.map.isVideoTexture===!0&&Ye.getTransfer(E.map.colorSpace)===Qe,decodeVideoTextureEmissive:ot&&E.emissiveMap.isVideoTexture===!0&&Ye.getTransfer(E.emissiveMap.colorSpace)===Qe,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Dn,flipSided:E.side===kt,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Ue&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ue&&E.extensions.multiDraw===!0||ze)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Rt.vertexUv1s=l.has(1),Rt.vertexUv2s=l.has(2),Rt.vertexUv3s=l.has(3),l.clear(),Rt}function f(E){const x=[];if(E.shaderID?x.push(E.shaderID):(x.push(E.customVertexShaderID),x.push(E.customFragmentShaderID)),E.defines!==void 0)for(const R in E.defines)x.push(R),x.push(E.defines[R]);return E.isRawShaderMaterial===!1&&(M(x,E),b(x,E),x.push(i.outputColorSpace)),x.push(E.customProgramCacheKey),x.join()}function M(E,x){E.push(x.precision),E.push(x.outputColorSpace),E.push(x.envMapMode),E.push(x.envMapCubeUVHeight),E.push(x.mapUv),E.push(x.alphaMapUv),E.push(x.lightMapUv),E.push(x.aoMapUv),E.push(x.bumpMapUv),E.push(x.normalMapUv),E.push(x.displacementMapUv),E.push(x.emissiveMapUv),E.push(x.metalnessMapUv),E.push(x.roughnessMapUv),E.push(x.anisotropyMapUv),E.push(x.clearcoatMapUv),E.push(x.clearcoatNormalMapUv),E.push(x.clearcoatRoughnessMapUv),E.push(x.iridescenceMapUv),E.push(x.iridescenceThicknessMapUv),E.push(x.sheenColorMapUv),E.push(x.sheenRoughnessMapUv),E.push(x.specularMapUv),E.push(x.specularColorMapUv),E.push(x.specularIntensityMapUv),E.push(x.transmissionMapUv),E.push(x.thicknessMapUv),E.push(x.combine),E.push(x.fogExp2),E.push(x.sizeAttenuation),E.push(x.morphTargetsCount),E.push(x.morphAttributeCount),E.push(x.numDirLights),E.push(x.numPointLights),E.push(x.numSpotLights),E.push(x.numSpotLightMaps),E.push(x.numHemiLights),E.push(x.numRectAreaLights),E.push(x.numDirLightShadows),E.push(x.numPointLightShadows),E.push(x.numSpotLightShadows),E.push(x.numSpotLightShadowsWithMaps),E.push(x.numLightProbes),E.push(x.shadowMapType),E.push(x.toneMapping),E.push(x.numClippingPlanes),E.push(x.numClipIntersection),E.push(x.depthPacking)}function b(E,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),E.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reverseDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),E.push(o.mask)}function y(E){const x=g[E.type];let R;if(x){const k=gn[x];R=sm.clone(k.uniforms)}else R=E.uniforms;return R}function D(E,x){let R;for(let k=0,z=d.length;k<z;k++){const X=d[k];if(X.cacheKey===x){R=X,++R.usedTimes;break}}return R===void 0&&(R=new v_(i,x,E,r),d.push(R)),R}function A(E){if(--E.usedTimes===0){const x=d.indexOf(E);d[x]=d[d.length-1],d.pop(),E.destroy()}}function w(E){c.remove(E)}function P(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:y,acquireProgram:D,releaseProgram:A,releaseShaderCache:w,programs:d,dispose:P}}function S_(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function E_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Ll(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Dl(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u,h,p,g,v,m){let f=i[e];return f===void 0?(f={id:u.id,object:u,geometry:h,material:p,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},i[e]=f):(f.id=u.id,f.object=u,f.geometry=h,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=v,f.group=m),e++,f}function o(u,h,p,g,v,m){const f=a(u,h,p,g,v,m);p.transmission>0?n.push(f):p.transparent===!0?s.push(f):t.push(f)}function c(u,h,p,g,v,m){const f=a(u,h,p,g,v,m);p.transmission>0?n.unshift(f):p.transparent===!0?s.unshift(f):t.unshift(f)}function l(u,h){t.length>1&&t.sort(u||E_),n.length>1&&n.sort(h||Ll),s.length>1&&s.sort(h||Ll)}function d(){for(let u=e,h=i.length;u<h;u++){const p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:d,sort:l}}function b_(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Dl,i.set(n,[a])):s>=r.length?(a=new Dl,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function T_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new Ie};break;case"SpotLight":t={position:new C,direction:new C,color:new Ie,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new Ie,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new Ie,groundColor:new Ie};break;case"RectAreaLight":t={color:new Ie,position:new C,halfWidth:new C,halfHeight:new C};break}return i[e.id]=t,t}}}function w_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let A_=0;function C_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function R_(i){const e=new T_,t=w_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new C);const s=new C,r=new st,a=new st;function o(l){let d=0,u=0,h=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let p=0,g=0,v=0,m=0,f=0,M=0,b=0,y=0,D=0,A=0,w=0;l.sort(C_);for(let E=0,x=l.length;E<x;E++){const R=l[E],k=R.color,z=R.intensity,X=R.distance,K=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)d+=k.r*z,u+=k.g*z,h+=k.b*z;else if(R.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(R.sh.coefficients[W],z);w++}else if(R.isDirectionalLight){const W=e.get(R);if(W.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const J=R.shadow,V=t.get(R);V.shadowIntensity=J.intensity,V.shadowBias=J.bias,V.shadowNormalBias=J.normalBias,V.shadowRadius=J.radius,V.shadowMapSize=J.mapSize,n.directionalShadow[p]=V,n.directionalShadowMap[p]=K,n.directionalShadowMatrix[p]=R.shadow.matrix,M++}n.directional[p]=W,p++}else if(R.isSpotLight){const W=e.get(R);W.position.setFromMatrixPosition(R.matrixWorld),W.color.copy(k).multiplyScalar(z),W.distance=X,W.coneCos=Math.cos(R.angle),W.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),W.decay=R.decay,n.spot[v]=W;const J=R.shadow;if(R.map&&(n.spotLightMap[D]=R.map,D++,J.updateMatrices(R),R.castShadow&&A++),n.spotLightMatrix[v]=J.matrix,R.castShadow){const V=t.get(R);V.shadowIntensity=J.intensity,V.shadowBias=J.bias,V.shadowNormalBias=J.normalBias,V.shadowRadius=J.radius,V.shadowMapSize=J.mapSize,n.spotShadow[v]=V,n.spotShadowMap[v]=K,y++}v++}else if(R.isRectAreaLight){const W=e.get(R);W.color.copy(k).multiplyScalar(z),W.halfWidth.set(R.width*.5,0,0),W.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=W,m++}else if(R.isPointLight){const W=e.get(R);if(W.color.copy(R.color).multiplyScalar(R.intensity),W.distance=R.distance,W.decay=R.decay,R.castShadow){const J=R.shadow,V=t.get(R);V.shadowIntensity=J.intensity,V.shadowBias=J.bias,V.shadowNormalBias=J.normalBias,V.shadowRadius=J.radius,V.shadowMapSize=J.mapSize,V.shadowCameraNear=J.camera.near,V.shadowCameraFar=J.camera.far,n.pointShadow[g]=V,n.pointShadowMap[g]=K,n.pointShadowMatrix[g]=R.shadow.matrix,b++}n.point[g]=W,g++}else if(R.isHemisphereLight){const W=e.get(R);W.skyColor.copy(R.color).multiplyScalar(z),W.groundColor.copy(R.groundColor).multiplyScalar(z),n.hemi[f]=W,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ie.LTC_FLOAT_1,n.rectAreaLTC2=ie.LTC_FLOAT_2):(n.rectAreaLTC1=ie.LTC_HALF_1,n.rectAreaLTC2=ie.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=u,n.ambient[2]=h;const P=n.hash;(P.directionalLength!==p||P.pointLength!==g||P.spotLength!==v||P.rectAreaLength!==m||P.hemiLength!==f||P.numDirectionalShadows!==M||P.numPointShadows!==b||P.numSpotShadows!==y||P.numSpotMaps!==D||P.numLightProbes!==w)&&(n.directional.length=p,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=y+D-A,n.spotLightMap.length=D,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=w,P.directionalLength=p,P.pointLength=g,P.spotLength=v,P.rectAreaLength=m,P.hemiLength=f,P.numDirectionalShadows=M,P.numPointShadows=b,P.numSpotShadows=y,P.numSpotMaps=D,P.numLightProbes=w,n.version=A_++)}function c(l,d){let u=0,h=0,p=0,g=0,v=0;const m=d.matrixWorldInverse;for(let f=0,M=l.length;f<M;f++){const b=l[f];if(b.isDirectionalLight){const y=n.directional[u];y.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),u++}else if(b.isSpotLight){const y=n.spot[p];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),p++}else if(b.isRectAreaLight){const y=n.rectArea[g];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(m),a.identity(),r.copy(b.matrixWorld),r.premultiply(m),a.extractRotation(r),y.halfWidth.set(b.width*.5,0,0),y.halfHeight.set(0,b.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(b.isPointLight){const y=n.point[h];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(m),h++}else if(b.isHemisphereLight){const y=n.hemi[v];y.direction.setFromMatrixPosition(b.matrixWorld),y.direction.transformDirection(m),v++}}}return{setup:o,setupView:c,state:n}}function Il(i){const e=new R_(i),t=[],n=[];function s(d){l.camera=d,t.length=0,n.length=0}function r(d){t.push(d)}function a(d){n.push(d)}function o(){e.setup(t)}function c(d){e.setupView(t,d)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function P_(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Il(i),e.set(s,[o])):r>=a.length?(o=new Il(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}class L_ extends Fs{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=wp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class D_ extends Fs{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const I_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,U_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function N_(i,e,t){let n=new vc;const s=new Ae,r=new Ae,a=new nt,o=new L_({depthPacking:Ap}),c=new D_,l={},d=t.maxTextureSize,u={[ti]:kt,[kt]:ti,[Dn]:Dn},h=new ni({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ae},radius:{value:4}},vertexShader:I_,fragmentShader:U_}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const g=new Ct;g.setAttribute("position",new nn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new xe(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Wd;let f=this.type;this.render=function(A,w,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const E=i.getRenderTarget(),x=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),k=i.state;k.setBlending(Qn),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const z=f!==Pn&&this.type===Pn,X=f===Pn&&this.type!==Pn;for(let K=0,W=A.length;K<W;K++){const J=A[K],V=J.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const re=V.getFrameExtents();if(s.multiply(re),r.copy(V.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/re.x),s.x=r.x*re.x,V.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/re.y),s.y=r.y*re.y,V.mapSize.y=r.y)),V.map===null||z===!0||X===!0){const Se=this.type!==Pn?{minFilter:Kt,magFilter:Kt}:{};V.map!==null&&V.map.dispose(),V.map=new Mi(s.x,s.y,Se),V.map.texture.name=J.name+".shadowMap",V.camera.updateProjectionMatrix()}i.setRenderTarget(V.map),i.clear();const ue=V.getViewportCount();for(let Se=0;Se<ue;Se++){const Be=V.getViewport(Se);a.set(r.x*Be.x,r.y*Be.y,r.x*Be.z,r.y*Be.w),k.viewport(a),V.updateMatrices(J,Se),n=V.getFrustum(),y(w,P,V.camera,J,this.type)}V.isPointLightShadow!==!0&&this.type===Pn&&M(V,P),V.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(E,x,R)};function M(A,w){const P=e.update(v);h.defines.VSM_SAMPLES!==A.blurSamples&&(h.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Mi(s.x,s.y)),h.uniforms.shadow_pass.value=A.map.texture,h.uniforms.resolution.value=A.mapSize,h.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(w,null,P,h,v,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(w,null,P,p,v,null)}function b(A,w,P,E){let x=null;const R=P.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(R!==void 0)x=R;else if(x=P.isPointLight===!0?c:o,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const k=x.uuid,z=w.uuid;let X=l[k];X===void 0&&(X={},l[k]=X);let K=X[z];K===void 0&&(K=x.clone(),X[z]=K,w.addEventListener("dispose",D)),x=K}if(x.visible=w.visible,x.wireframe=w.wireframe,E===Pn?x.side=w.shadowSide!==null?w.shadowSide:w.side:x.side=w.shadowSide!==null?w.shadowSide:u[w.side],x.alphaMap=w.alphaMap,x.alphaTest=w.alphaTest,x.map=w.map,x.clipShadows=w.clipShadows,x.clippingPlanes=w.clippingPlanes,x.clipIntersection=w.clipIntersection,x.displacementMap=w.displacementMap,x.displacementScale=w.displacementScale,x.displacementBias=w.displacementBias,x.wireframeLinewidth=w.wireframeLinewidth,x.linewidth=w.linewidth,P.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const k=i.properties.get(x);k.light=P}return x}function y(A,w,P,E,x){if(A.visible===!1)return;if(A.layers.test(w.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&x===Pn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,A.matrixWorld);const z=e.update(A),X=A.material;if(Array.isArray(X)){const K=z.groups;for(let W=0,J=K.length;W<J;W++){const V=K[W],re=X[V.materialIndex];if(re&&re.visible){const ue=b(A,re,E,x);A.onBeforeShadow(i,A,w,P,z,ue,V),i.renderBufferDirect(P,null,z,ue,A,V),A.onAfterShadow(i,A,w,P,z,ue,V)}}}else if(X.visible){const K=b(A,X,E,x);A.onBeforeShadow(i,A,w,P,z,K,null),i.renderBufferDirect(P,null,z,K,A,null),A.onAfterShadow(i,A,w,P,z,K,null)}}const k=A.children;for(let z=0,X=k.length;z<X;z++)y(k[z],w,P,E,x)}function D(A){A.target.removeEventListener("dispose",D);for(const P in l){const E=l[P],x=A.target.uuid;x in E&&(E[x].dispose(),delete E[x])}}}const O_={[ao]:oo,[co]:ho,[lo]:fo,[ns]:uo,[oo]:ao,[ho]:co,[fo]:lo,[uo]:ns};function F_(i,e){function t(){let L=!1;const se=new nt;let G=null;const j=new nt(0,0,0,0);return{setMask:function(de){G!==de&&!L&&(i.colorMask(de,de,de,de),G=de)},setLocked:function(de){L=de},setClear:function(de,ce,Ue,pt,Rt){Rt===!0&&(de*=pt,ce*=pt,Ue*=pt),se.set(de,ce,Ue,pt),j.equals(se)===!1&&(i.clearColor(de,ce,Ue,pt),j.copy(se))},reset:function(){L=!1,G=null,j.set(-1,0,0,0)}}}function n(){let L=!1,se=!1,G=null,j=null,de=null;return{setReversed:function(ce){if(se!==ce){const Ue=e.get("EXT_clip_control");se?Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.ZERO_TO_ONE_EXT):Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.NEGATIVE_ONE_TO_ONE_EXT);const pt=de;de=null,this.setClear(pt)}se=ce},getReversed:function(){return se},setTest:function(ce){ce?ae(i.DEPTH_TEST):we(i.DEPTH_TEST)},setMask:function(ce){G!==ce&&!L&&(i.depthMask(ce),G=ce)},setFunc:function(ce){if(se&&(ce=O_[ce]),j!==ce){switch(ce){case ao:i.depthFunc(i.NEVER);break;case oo:i.depthFunc(i.ALWAYS);break;case co:i.depthFunc(i.LESS);break;case ns:i.depthFunc(i.LEQUAL);break;case lo:i.depthFunc(i.EQUAL);break;case uo:i.depthFunc(i.GEQUAL);break;case ho:i.depthFunc(i.GREATER);break;case fo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}j=ce}},setLocked:function(ce){L=ce},setClear:function(ce){de!==ce&&(se&&(ce=1-ce),i.clearDepth(ce),de=ce)},reset:function(){L=!1,G=null,j=null,de=null,se=!1}}}function s(){let L=!1,se=null,G=null,j=null,de=null,ce=null,Ue=null,pt=null,Rt=null;return{setTest:function(Je){L||(Je?ae(i.STENCIL_TEST):we(i.STENCIL_TEST))},setMask:function(Je){se!==Je&&!L&&(i.stencilMask(Je),se=Je)},setFunc:function(Je,rn,En){(G!==Je||j!==rn||de!==En)&&(i.stencilFunc(Je,rn,En),G=Je,j=rn,de=En)},setOp:function(Je,rn,En){(ce!==Je||Ue!==rn||pt!==En)&&(i.stencilOp(Je,rn,En),ce=Je,Ue=rn,pt=En)},setLocked:function(Je){L=Je},setClear:function(Je){Rt!==Je&&(i.clearStencil(Je),Rt=Je)},reset:function(){L=!1,se=null,G=null,j=null,de=null,ce=null,Ue=null,pt=null,Rt=null}}}const r=new t,a=new n,o=new s,c=new WeakMap,l=new WeakMap;let d={},u={},h=new WeakMap,p=[],g=null,v=!1,m=null,f=null,M=null,b=null,y=null,D=null,A=null,w=new Ie(0,0,0),P=0,E=!1,x=null,R=null,k=null,z=null,X=null;const K=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,J=0;const V=i.getParameter(i.VERSION);V.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(V)[1]),W=J>=1):V.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),W=J>=2);let re=null,ue={};const Se=i.getParameter(i.SCISSOR_BOX),Be=i.getParameter(i.VIEWPORT),it=new nt().fromArray(Se),q=new nt().fromArray(Be);function ne(L,se,G,j){const de=new Uint8Array(4),ce=i.createTexture();i.bindTexture(L,ce),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ue=0;Ue<G;Ue++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(se,0,i.RGBA,1,1,j,0,i.RGBA,i.UNSIGNED_BYTE,de):i.texImage2D(se+Ue,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,de);return ce}const _e={};_e[i.TEXTURE_2D]=ne(i.TEXTURE_2D,i.TEXTURE_2D,1),_e[i.TEXTURE_CUBE_MAP]=ne(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),_e[i.TEXTURE_2D_ARRAY]=ne(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),_e[i.TEXTURE_3D]=ne(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ae(i.DEPTH_TEST),a.setFunc(ns),He(!1),Ge(Fc),ae(i.CULL_FACE),N(Qn);function ae(L){d[L]!==!0&&(i.enable(L),d[L]=!0)}function we(L){d[L]!==!1&&(i.disable(L),d[L]=!1)}function Le(L,se){return u[L]!==se?(i.bindFramebuffer(L,se),u[L]=se,L===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=se),L===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=se),!0):!1}function ze(L,se){let G=p,j=!1;if(L){G=h.get(se),G===void 0&&(G=[],h.set(se,G));const de=L.textures;if(G.length!==de.length||G[0]!==i.COLOR_ATTACHMENT0){for(let ce=0,Ue=de.length;ce<Ue;ce++)G[ce]=i.COLOR_ATTACHMENT0+ce;G.length=de.length,j=!0}}else G[0]!==i.BACK&&(G[0]=i.BACK,j=!0);j&&i.drawBuffers(G)}function ht(L){return g!==L?(i.useProgram(L),g=L,!0):!1}const Xe={[fi]:i.FUNC_ADD,[Qf]:i.FUNC_SUBTRACT,[ep]:i.FUNC_REVERSE_SUBTRACT};Xe[tp]=i.MIN,Xe[np]=i.MAX;const gt={[ip]:i.ZERO,[sp]:i.ONE,[rp]:i.SRC_COLOR,[so]:i.SRC_ALPHA,[up]:i.SRC_ALPHA_SATURATE,[lp]:i.DST_COLOR,[op]:i.DST_ALPHA,[ap]:i.ONE_MINUS_SRC_COLOR,[ro]:i.ONE_MINUS_SRC_ALPHA,[dp]:i.ONE_MINUS_DST_COLOR,[cp]:i.ONE_MINUS_DST_ALPHA,[hp]:i.CONSTANT_COLOR,[fp]:i.ONE_MINUS_CONSTANT_COLOR,[pp]:i.CONSTANT_ALPHA,[mp]:i.ONE_MINUS_CONSTANT_ALPHA};function N(L,se,G,j,de,ce,Ue,pt,Rt,Je){if(L===Qn){v===!0&&(we(i.BLEND),v=!1);return}if(v===!1&&(ae(i.BLEND),v=!0),L!==Jf){if(L!==m||Je!==E){if((f!==fi||y!==fi)&&(i.blendEquation(i.FUNC_ADD),f=fi,y=fi),Je)switch(L){case Zi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case kc:i.blendFunc(i.ONE,i.ONE);break;case Bc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case zc:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Zi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case kc:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Bc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case zc:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}M=null,b=null,D=null,A=null,w.set(0,0,0),P=0,m=L,E=Je}return}de=de||se,ce=ce||G,Ue=Ue||j,(se!==f||de!==y)&&(i.blendEquationSeparate(Xe[se],Xe[de]),f=se,y=de),(G!==M||j!==b||ce!==D||Ue!==A)&&(i.blendFuncSeparate(gt[G],gt[j],gt[ce],gt[Ue]),M=G,b=j,D=ce,A=Ue),(pt.equals(w)===!1||Rt!==P)&&(i.blendColor(pt.r,pt.g,pt.b,Rt),w.copy(pt),P=Rt),m=L,E=!1}function Zt(L,se){L.side===Dn?we(i.CULL_FACE):ae(i.CULL_FACE);let G=L.side===kt;se&&(G=!G),He(G),L.blending===Zi&&L.transparent===!1?N(Qn):N(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),r.setMask(L.colorWrite);const j=L.stencilWrite;o.setTest(j),j&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),ot(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ae(i.SAMPLE_ALPHA_TO_COVERAGE):we(i.SAMPLE_ALPHA_TO_COVERAGE)}function He(L){x!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),x=L)}function Ge(L){L!==Kf?(ae(i.CULL_FACE),L!==R&&(L===Fc?i.cullFace(i.BACK):L===Zf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):we(i.CULL_FACE),R=L}function be(L){L!==k&&(W&&i.lineWidth(L),k=L)}function ot(L,se,G){L?(ae(i.POLYGON_OFFSET_FILL),(z!==se||X!==G)&&(i.polygonOffset(se,G),z=se,X=G)):we(i.POLYGON_OFFSET_FILL)}function Ee(L){L?ae(i.SCISSOR_TEST):we(i.SCISSOR_TEST)}function T(L){L===void 0&&(L=i.TEXTURE0+K-1),re!==L&&(i.activeTexture(L),re=L)}function _(L,se,G){G===void 0&&(re===null?G=i.TEXTURE0+K-1:G=re);let j=ue[G];j===void 0&&(j={type:void 0,texture:void 0},ue[G]=j),(j.type!==L||j.texture!==se)&&(re!==G&&(i.activeTexture(G),re=G),i.bindTexture(L,se||_e[L]),j.type=L,j.texture=se)}function F(){const L=ue[re];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function Y(){try{i.compressedTexImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Z(){try{i.compressedTexImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function $(){try{i.texSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ye(){try{i.texSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function oe(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function he(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function $e(){try{i.texStorage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ee(){try{i.texStorage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function fe(){try{i.texImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Te(){try{i.texImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ce(L){it.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),it.copy(L))}function pe(L){q.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),q.copy(L))}function Ve(L,se){let G=l.get(se);G===void 0&&(G=new WeakMap,l.set(se,G));let j=G.get(L);j===void 0&&(j=i.getUniformBlockIndex(se,L.name),G.set(L,j))}function Fe(L,se){const j=l.get(se).get(L);c.get(se)!==j&&(i.uniformBlockBinding(se,j,L.__bindingPointIndex),c.set(se,j))}function rt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},re=null,ue={},u={},h=new WeakMap,p=[],g=null,v=!1,m=null,f=null,M=null,b=null,y=null,D=null,A=null,w=new Ie(0,0,0),P=0,E=!1,x=null,R=null,k=null,z=null,X=null,it.set(0,0,i.canvas.width,i.canvas.height),q.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ae,disable:we,bindFramebuffer:Le,drawBuffers:ze,useProgram:ht,setBlending:N,setMaterial:Zt,setFlipSided:He,setCullFace:Ge,setLineWidth:be,setPolygonOffset:ot,setScissorTest:Ee,activeTexture:T,bindTexture:_,unbindTexture:F,compressedTexImage2D:Y,compressedTexImage3D:Z,texImage2D:fe,texImage3D:Te,updateUBOMapping:Ve,uniformBlockBinding:Fe,texStorage2D:$e,texStorage3D:ee,texSubImage2D:$,texSubImage3D:ye,compressedTexSubImage2D:oe,compressedTexSubImage3D:he,scissor:Ce,viewport:pe,reset:rt}}function Ul(i,e,t,n){const s=k_(n);switch(t){case Zd:return i*e;case Qd:return i*e;case eu:return i*e*2;case uc:return i*e/s.components*s.byteLength;case hc:return i*e/s.components*s.byteLength;case tu:return i*e*2/s.components*s.byteLength;case fc:return i*e*2/s.components*s.byteLength;case Jd:return i*e*3/s.components*s.byteLength;case fn:return i*e*4/s.components*s.byteLength;case pc:return i*e*4/s.components*s.byteLength;case _r:case xr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case yr:case Mr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case _o:case yo:return Math.max(i,16)*Math.max(e,8)/4;case vo:case xo:return Math.max(i,8)*Math.max(e,8)/2;case Mo:case So:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Eo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case bo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case To:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case wo:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Ao:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Co:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Ro:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Po:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Lo:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Do:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Io:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Uo:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case No:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Oo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Fo:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Sr:case ko:case Bo:return Math.ceil(i/4)*Math.ceil(e/4)*16;case nu:case zo:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ho:case Go:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function k_(i){switch(i){case Fn:case Yd:return{byteLength:1,components:1};case Ds:case jd:case Us:return{byteLength:2,components:1};case lc:case dc:return{byteLength:2,components:4};case yi:case cc:case yn:return{byteLength:4,components:1};case Kd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function B_(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ae,d=new WeakMap;let u;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,_){return p?new OffscreenCanvas(T,_):Lr("canvas")}function v(T,_,F){let Y=1;const Z=Ee(T);if((Z.width>F||Z.height>F)&&(Y=F/Math.max(Z.width,Z.height)),Y<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const $=Math.floor(Y*Z.width),ye=Math.floor(Y*Z.height);u===void 0&&(u=g($,ye));const oe=_?g($,ye):u;return oe.width=$,oe.height=ye,oe.getContext("2d").drawImage(T,0,0,$,ye),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+$+"x"+ye+")."),oe}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),T;return T}function m(T){return T.generateMipmaps}function f(T){i.generateMipmap(T)}function M(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(T,_,F,Y,Z=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let $=_;if(_===i.RED&&(F===i.FLOAT&&($=i.R32F),F===i.HALF_FLOAT&&($=i.R16F),F===i.UNSIGNED_BYTE&&($=i.R8)),_===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&($=i.R8UI),F===i.UNSIGNED_SHORT&&($=i.R16UI),F===i.UNSIGNED_INT&&($=i.R32UI),F===i.BYTE&&($=i.R8I),F===i.SHORT&&($=i.R16I),F===i.INT&&($=i.R32I)),_===i.RG&&(F===i.FLOAT&&($=i.RG32F),F===i.HALF_FLOAT&&($=i.RG16F),F===i.UNSIGNED_BYTE&&($=i.RG8)),_===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&($=i.RG8UI),F===i.UNSIGNED_SHORT&&($=i.RG16UI),F===i.UNSIGNED_INT&&($=i.RG32UI),F===i.BYTE&&($=i.RG8I),F===i.SHORT&&($=i.RG16I),F===i.INT&&($=i.RG32I)),_===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&($=i.RGB8UI),F===i.UNSIGNED_SHORT&&($=i.RGB16UI),F===i.UNSIGNED_INT&&($=i.RGB32UI),F===i.BYTE&&($=i.RGB8I),F===i.SHORT&&($=i.RGB16I),F===i.INT&&($=i.RGB32I)),_===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&($=i.RGBA8UI),F===i.UNSIGNED_SHORT&&($=i.RGBA16UI),F===i.UNSIGNED_INT&&($=i.RGBA32UI),F===i.BYTE&&($=i.RGBA8I),F===i.SHORT&&($=i.RGBA16I),F===i.INT&&($=i.RGBA32I)),_===i.RGB&&F===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),_===i.RGBA){const ye=Z?Vr:Ye.getTransfer(Y);F===i.FLOAT&&($=i.RGBA32F),F===i.HALF_FLOAT&&($=i.RGBA16F),F===i.UNSIGNED_BYTE&&($=ye===Qe?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function y(T,_){let F;return T?_===null||_===yi||_===as?F=i.DEPTH24_STENCIL8:_===yn?F=i.DEPTH32F_STENCIL8:_===Ds&&(F=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===yi||_===as?F=i.DEPTH_COMPONENT24:_===yn?F=i.DEPTH_COMPONENT32F:_===Ds&&(F=i.DEPTH_COMPONENT16),F}function D(T,_){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==Kt&&T.minFilter!==xn?Math.log2(Math.max(_.width,_.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?_.mipmaps.length:1}function A(T){const _=T.target;_.removeEventListener("dispose",A),P(_),_.isVideoTexture&&d.delete(_)}function w(T){const _=T.target;_.removeEventListener("dispose",w),x(_)}function P(T){const _=n.get(T);if(_.__webglInit===void 0)return;const F=T.source,Y=h.get(F);if(Y){const Z=Y[_.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&E(T),Object.keys(Y).length===0&&h.delete(F)}n.remove(T)}function E(T){const _=n.get(T);i.deleteTexture(_.__webglTexture);const F=T.source,Y=h.get(F);delete Y[_.__cacheKey],a.memory.textures--}function x(T){const _=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(_.__webglFramebuffer[Y]))for(let Z=0;Z<_.__webglFramebuffer[Y].length;Z++)i.deleteFramebuffer(_.__webglFramebuffer[Y][Z]);else i.deleteFramebuffer(_.__webglFramebuffer[Y]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[Y])}else{if(Array.isArray(_.__webglFramebuffer))for(let Y=0;Y<_.__webglFramebuffer.length;Y++)i.deleteFramebuffer(_.__webglFramebuffer[Y]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Y=0;Y<_.__webglColorRenderbuffer.length;Y++)_.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[Y]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const F=T.textures;for(let Y=0,Z=F.length;Y<Z;Y++){const $=n.get(F[Y]);$.__webglTexture&&(i.deleteTexture($.__webglTexture),a.memory.textures--),n.remove(F[Y])}n.remove(T)}let R=0;function k(){R=0}function z(){const T=R;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),R+=1,T}function X(T){const _=[];return _.push(T.wrapS),_.push(T.wrapT),_.push(T.wrapR||0),_.push(T.magFilter),_.push(T.minFilter),_.push(T.anisotropy),_.push(T.internalFormat),_.push(T.format),_.push(T.type),_.push(T.generateMipmaps),_.push(T.premultiplyAlpha),_.push(T.flipY),_.push(T.unpackAlignment),_.push(T.colorSpace),_.join()}function K(T,_){const F=n.get(T);if(T.isVideoTexture&&be(T),T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version){const Y=T.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(F,T,_);return}}t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+_)}function W(T,_){const F=n.get(T);if(T.version>0&&F.__version!==T.version){q(F,T,_);return}t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+_)}function J(T,_){const F=n.get(T);if(T.version>0&&F.__version!==T.version){q(F,T,_);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+_)}function V(T,_){const F=n.get(T);if(T.version>0&&F.__version!==T.version){ne(F,T,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+_)}const re={[rs]:i.REPEAT,[gi]:i.CLAMP_TO_EDGE,[go]:i.MIRRORED_REPEAT},ue={[Kt]:i.NEAREST,[Tp]:i.NEAREST_MIPMAP_NEAREST,[zs]:i.NEAREST_MIPMAP_LINEAR,[xn]:i.LINEAR,[oa]:i.LINEAR_MIPMAP_NEAREST,[vi]:i.LINEAR_MIPMAP_LINEAR},Se={[Rp]:i.NEVER,[Np]:i.ALWAYS,[Pp]:i.LESS,[su]:i.LEQUAL,[Lp]:i.EQUAL,[Up]:i.GEQUAL,[Dp]:i.GREATER,[Ip]:i.NOTEQUAL};function Be(T,_){if(_.type===yn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===xn||_.magFilter===oa||_.magFilter===zs||_.magFilter===vi||_.minFilter===xn||_.minFilter===oa||_.minFilter===zs||_.minFilter===vi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,re[_.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,re[_.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,re[_.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,ue[_.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,ue[_.minFilter]),_.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,Se[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Kt||_.minFilter!==zs&&_.minFilter!==vi||_.type===yn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");i.texParameterf(T,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function it(T,_){let F=!1;T.__webglInit===void 0&&(T.__webglInit=!0,_.addEventListener("dispose",A));const Y=_.source;let Z=h.get(Y);Z===void 0&&(Z={},h.set(Y,Z));const $=X(_);if($!==T.__cacheKey){Z[$]===void 0&&(Z[$]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,F=!0),Z[$].usedTimes++;const ye=Z[T.__cacheKey];ye!==void 0&&(Z[T.__cacheKey].usedTimes--,ye.usedTimes===0&&E(_)),T.__cacheKey=$,T.__webglTexture=Z[$].texture}return F}function q(T,_,F){let Y=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(Y=i.TEXTURE_3D);const Z=it(T,_),$=_.source;t.bindTexture(Y,T.__webglTexture,i.TEXTURE0+F);const ye=n.get($);if($.version!==ye.__version||Z===!0){t.activeTexture(i.TEXTURE0+F);const oe=Ye.getPrimaries(Ye.workingColorSpace),he=_.colorSpace===jn?null:Ye.getPrimaries(_.colorSpace),$e=_.colorSpace===jn||oe===he?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,$e);let ee=v(_.image,!1,s.maxTextureSize);ee=ot(_,ee);const fe=r.convert(_.format,_.colorSpace),Te=r.convert(_.type);let Ce=b(_.internalFormat,fe,Te,_.colorSpace,_.isVideoTexture);Be(Y,_);let pe;const Ve=_.mipmaps,Fe=_.isVideoTexture!==!0,rt=ye.__version===void 0||Z===!0,L=$.dataReady,se=D(_,ee);if(_.isDepthTexture)Ce=y(_.format===os,_.type),rt&&(Fe?t.texStorage2D(i.TEXTURE_2D,1,Ce,ee.width,ee.height):t.texImage2D(i.TEXTURE_2D,0,Ce,ee.width,ee.height,0,fe,Te,null));else if(_.isDataTexture)if(Ve.length>0){Fe&&rt&&t.texStorage2D(i.TEXTURE_2D,se,Ce,Ve[0].width,Ve[0].height);for(let G=0,j=Ve.length;G<j;G++)pe=Ve[G],Fe?L&&t.texSubImage2D(i.TEXTURE_2D,G,0,0,pe.width,pe.height,fe,Te,pe.data):t.texImage2D(i.TEXTURE_2D,G,Ce,pe.width,pe.height,0,fe,Te,pe.data);_.generateMipmaps=!1}else Fe?(rt&&t.texStorage2D(i.TEXTURE_2D,se,Ce,ee.width,ee.height),L&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ee.width,ee.height,fe,Te,ee.data)):t.texImage2D(i.TEXTURE_2D,0,Ce,ee.width,ee.height,0,fe,Te,ee.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Fe&&rt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,se,Ce,Ve[0].width,Ve[0].height,ee.depth);for(let G=0,j=Ve.length;G<j;G++)if(pe=Ve[G],_.format!==fn)if(fe!==null)if(Fe){if(L)if(_.layerUpdates.size>0){const de=Ul(pe.width,pe.height,_.format,_.type);for(const ce of _.layerUpdates){const Ue=pe.data.subarray(ce*de/pe.data.BYTES_PER_ELEMENT,(ce+1)*de/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,G,0,0,ce,pe.width,pe.height,1,fe,Ue)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,G,0,0,0,pe.width,pe.height,ee.depth,fe,pe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,G,Ce,pe.width,pe.height,ee.depth,0,pe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Fe?L&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,G,0,0,0,pe.width,pe.height,ee.depth,fe,Te,pe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,G,Ce,pe.width,pe.height,ee.depth,0,fe,Te,pe.data)}else{Fe&&rt&&t.texStorage2D(i.TEXTURE_2D,se,Ce,Ve[0].width,Ve[0].height);for(let G=0,j=Ve.length;G<j;G++)pe=Ve[G],_.format!==fn?fe!==null?Fe?L&&t.compressedTexSubImage2D(i.TEXTURE_2D,G,0,0,pe.width,pe.height,fe,pe.data):t.compressedTexImage2D(i.TEXTURE_2D,G,Ce,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Fe?L&&t.texSubImage2D(i.TEXTURE_2D,G,0,0,pe.width,pe.height,fe,Te,pe.data):t.texImage2D(i.TEXTURE_2D,G,Ce,pe.width,pe.height,0,fe,Te,pe.data)}else if(_.isDataArrayTexture)if(Fe){if(rt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,se,Ce,ee.width,ee.height,ee.depth),L)if(_.layerUpdates.size>0){const G=Ul(ee.width,ee.height,_.format,_.type);for(const j of _.layerUpdates){const de=ee.data.subarray(j*G/ee.data.BYTES_PER_ELEMENT,(j+1)*G/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,j,ee.width,ee.height,1,fe,Te,de)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,fe,Te,ee.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ce,ee.width,ee.height,ee.depth,0,fe,Te,ee.data);else if(_.isData3DTexture)Fe?(rt&&t.texStorage3D(i.TEXTURE_3D,se,Ce,ee.width,ee.height,ee.depth),L&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,fe,Te,ee.data)):t.texImage3D(i.TEXTURE_3D,0,Ce,ee.width,ee.height,ee.depth,0,fe,Te,ee.data);else if(_.isFramebufferTexture){if(rt)if(Fe)t.texStorage2D(i.TEXTURE_2D,se,Ce,ee.width,ee.height);else{let G=ee.width,j=ee.height;for(let de=0;de<se;de++)t.texImage2D(i.TEXTURE_2D,de,Ce,G,j,0,fe,Te,null),G>>=1,j>>=1}}else if(Ve.length>0){if(Fe&&rt){const G=Ee(Ve[0]);t.texStorage2D(i.TEXTURE_2D,se,Ce,G.width,G.height)}for(let G=0,j=Ve.length;G<j;G++)pe=Ve[G],Fe?L&&t.texSubImage2D(i.TEXTURE_2D,G,0,0,fe,Te,pe):t.texImage2D(i.TEXTURE_2D,G,Ce,fe,Te,pe);_.generateMipmaps=!1}else if(Fe){if(rt){const G=Ee(ee);t.texStorage2D(i.TEXTURE_2D,se,Ce,G.width,G.height)}L&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,fe,Te,ee)}else t.texImage2D(i.TEXTURE_2D,0,Ce,fe,Te,ee);m(_)&&f(Y),ye.__version=$.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function ne(T,_,F){if(_.image.length!==6)return;const Y=it(T,_),Z=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+F);const $=n.get(Z);if(Z.version!==$.__version||Y===!0){t.activeTexture(i.TEXTURE0+F);const ye=Ye.getPrimaries(Ye.workingColorSpace),oe=_.colorSpace===jn?null:Ye.getPrimaries(_.colorSpace),he=_.colorSpace===jn||ye===oe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);const $e=_.isCompressedTexture||_.image[0].isCompressedTexture,ee=_.image[0]&&_.image[0].isDataTexture,fe=[];for(let j=0;j<6;j++)!$e&&!ee?fe[j]=v(_.image[j],!0,s.maxCubemapSize):fe[j]=ee?_.image[j].image:_.image[j],fe[j]=ot(_,fe[j]);const Te=fe[0],Ce=r.convert(_.format,_.colorSpace),pe=r.convert(_.type),Ve=b(_.internalFormat,Ce,pe,_.colorSpace),Fe=_.isVideoTexture!==!0,rt=$.__version===void 0||Y===!0,L=Z.dataReady;let se=D(_,Te);Be(i.TEXTURE_CUBE_MAP,_);let G;if($e){Fe&&rt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,se,Ve,Te.width,Te.height);for(let j=0;j<6;j++){G=fe[j].mipmaps;for(let de=0;de<G.length;de++){const ce=G[de];_.format!==fn?Ce!==null?Fe?L&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,de,0,0,ce.width,ce.height,Ce,ce.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,de,Ve,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Fe?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,de,0,0,ce.width,ce.height,Ce,pe,ce.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,de,Ve,ce.width,ce.height,0,Ce,pe,ce.data)}}}else{if(G=_.mipmaps,Fe&&rt){G.length>0&&se++;const j=Ee(fe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,se,Ve,j.width,j.height)}for(let j=0;j<6;j++)if(ee){Fe?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,fe[j].width,fe[j].height,Ce,pe,fe[j].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Ve,fe[j].width,fe[j].height,0,Ce,pe,fe[j].data);for(let de=0;de<G.length;de++){const Ue=G[de].image[j].image;Fe?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,de+1,0,0,Ue.width,Ue.height,Ce,pe,Ue.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,de+1,Ve,Ue.width,Ue.height,0,Ce,pe,Ue.data)}}else{Fe?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Ce,pe,fe[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Ve,Ce,pe,fe[j]);for(let de=0;de<G.length;de++){const ce=G[de];Fe?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,de+1,0,0,Ce,pe,ce.image[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,de+1,Ve,Ce,pe,ce.image[j])}}}m(_)&&f(i.TEXTURE_CUBE_MAP),$.__version=Z.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function _e(T,_,F,Y,Z,$){const ye=r.convert(F.format,F.colorSpace),oe=r.convert(F.type),he=b(F.internalFormat,ye,oe,F.colorSpace),$e=n.get(_),ee=n.get(F);if(ee.__renderTarget=_,!$e.__hasExternalTextures){const fe=Math.max(1,_.width>>$),Te=Math.max(1,_.height>>$);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?t.texImage3D(Z,$,he,fe,Te,_.depth,0,ye,oe,null):t.texImage2D(Z,$,he,fe,Te,0,ye,oe,null)}t.bindFramebuffer(i.FRAMEBUFFER,T),Ge(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,Z,ee.__webglTexture,0,He(_)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,Z,ee.__webglTexture,$),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ae(T,_,F){if(i.bindRenderbuffer(i.RENDERBUFFER,T),_.depthBuffer){const Y=_.depthTexture,Z=Y&&Y.isDepthTexture?Y.type:null,$=y(_.stencilBuffer,Z),ye=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=He(_);Ge(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,oe,$,_.width,_.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,oe,$,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,$,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ye,i.RENDERBUFFER,T)}else{const Y=_.textures;for(let Z=0;Z<Y.length;Z++){const $=Y[Z],ye=r.convert($.format,$.colorSpace),oe=r.convert($.type),he=b($.internalFormat,ye,oe,$.colorSpace),$e=He(_);F&&Ge(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,$e,he,_.width,_.height):Ge(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,$e,he,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,he,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function we(T,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,T),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Y=n.get(_.depthTexture);Y.__renderTarget=_,(!Y.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),K(_.depthTexture,0);const Z=Y.__webglTexture,$=He(_);if(_.depthTexture.format===Ji)Ge(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0);else if(_.depthTexture.format===os)Ge(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function Le(T){const _=n.get(T),F=T.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==T.depthTexture){const Y=T.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),Y){const Z=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,Y.removeEventListener("dispose",Z)};Y.addEventListener("dispose",Z),_.__depthDisposeCallback=Z}_.__boundDepthTexture=Y}if(T.depthTexture&&!_.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");we(_.__webglFramebuffer,T)}else if(F){_.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[Y]),_.__webglDepthbuffer[Y]===void 0)_.__webglDepthbuffer[Y]=i.createRenderbuffer(),ae(_.__webglDepthbuffer[Y],T,!1);else{const Z=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=_.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,$),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,$)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),ae(_.__webglDepthbuffer,T,!1);else{const Y=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,Z)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ze(T,_,F){const Y=n.get(T);_!==void 0&&_e(Y.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&Le(T)}function ht(T){const _=T.texture,F=n.get(T),Y=n.get(_);T.addEventListener("dispose",w);const Z=T.textures,$=T.isWebGLCubeRenderTarget===!0,ye=Z.length>1;if(ye||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=_.version,a.memory.textures++),$){F.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer[oe]=[];for(let he=0;he<_.mipmaps.length;he++)F.__webglFramebuffer[oe][he]=i.createFramebuffer()}else F.__webglFramebuffer[oe]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer=[];for(let oe=0;oe<_.mipmaps.length;oe++)F.__webglFramebuffer[oe]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(ye)for(let oe=0,he=Z.length;oe<he;oe++){const $e=n.get(Z[oe]);$e.__webglTexture===void 0&&($e.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&Ge(T)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let oe=0;oe<Z.length;oe++){const he=Z[oe];F.__webglColorRenderbuffer[oe]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[oe]);const $e=r.convert(he.format,he.colorSpace),ee=r.convert(he.type),fe=b(he.internalFormat,$e,ee,he.colorSpace,T.isXRRenderTarget===!0),Te=He(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Te,fe,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.RENDERBUFFER,F.__webglColorRenderbuffer[oe])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),ae(F.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if($){t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),Be(i.TEXTURE_CUBE_MAP,_);for(let oe=0;oe<6;oe++)if(_.mipmaps&&_.mipmaps.length>0)for(let he=0;he<_.mipmaps.length;he++)_e(F.__webglFramebuffer[oe][he],T,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,he);else _e(F.__webglFramebuffer[oe],T,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);m(_)&&f(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ye){for(let oe=0,he=Z.length;oe<he;oe++){const $e=Z[oe],ee=n.get($e);t.bindTexture(i.TEXTURE_2D,ee.__webglTexture),Be(i.TEXTURE_2D,$e),_e(F.__webglFramebuffer,T,$e,i.COLOR_ATTACHMENT0+oe,i.TEXTURE_2D,0),m($e)&&f(i.TEXTURE_2D)}t.unbindTexture()}else{let oe=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(oe=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(oe,Y.__webglTexture),Be(oe,_),_.mipmaps&&_.mipmaps.length>0)for(let he=0;he<_.mipmaps.length;he++)_e(F.__webglFramebuffer[he],T,_,i.COLOR_ATTACHMENT0,oe,he);else _e(F.__webglFramebuffer,T,_,i.COLOR_ATTACHMENT0,oe,0);m(_)&&f(oe),t.unbindTexture()}T.depthBuffer&&Le(T)}function Xe(T){const _=T.textures;for(let F=0,Y=_.length;F<Y;F++){const Z=_[F];if(m(Z)){const $=M(T),ye=n.get(Z).__webglTexture;t.bindTexture($,ye),f($),t.unbindTexture()}}}const gt=[],N=[];function Zt(T){if(T.samples>0){if(Ge(T)===!1){const _=T.textures,F=T.width,Y=T.height;let Z=i.COLOR_BUFFER_BIT;const $=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ye=n.get(T),oe=_.length>1;if(oe)for(let he=0;he<_.length;he++)t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let he=0;he<_.length;he++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),oe){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ye.__webglColorRenderbuffer[he]);const $e=n.get(_[he]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,$e,0)}i.blitFramebuffer(0,0,F,Y,0,0,F,Y,Z,i.NEAREST),c===!0&&(gt.length=0,N.length=0,gt.push(i.COLOR_ATTACHMENT0+he),T.depthBuffer&&T.resolveDepthBuffer===!1&&(gt.push($),N.push($),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,N)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,gt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),oe)for(let he=0;he<_.length;he++){t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,ye.__webglColorRenderbuffer[he]);const $e=n.get(_[he]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.TEXTURE_2D,$e,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){const _=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function He(T){return Math.min(s.maxSamples,T.samples)}function Ge(T){const _=n.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function be(T){const _=a.render.frame;d.get(T)!==_&&(d.set(T,_),T.update())}function ot(T,_){const F=T.colorSpace,Y=T.format,Z=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||F!==ds&&F!==jn&&(Ye.getTransfer(F)===Qe?(Y!==fn||Z!==Fn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),_}function Ee(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=z,this.resetTextureUnits=k,this.setTexture2D=K,this.setTexture2DArray=W,this.setTexture3D=J,this.setTextureCube=V,this.rebindTextures=ze,this.setupRenderTarget=ht,this.updateRenderTargetMipmap=Xe,this.updateMultisampleRenderTarget=Zt,this.setupDepthRenderbuffer=Le,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=Ge}function z_(i,e){function t(n,s=jn){let r;const a=Ye.getTransfer(s);if(n===Fn)return i.UNSIGNED_BYTE;if(n===lc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===dc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Kd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Yd)return i.BYTE;if(n===jd)return i.SHORT;if(n===Ds)return i.UNSIGNED_SHORT;if(n===cc)return i.INT;if(n===yi)return i.UNSIGNED_INT;if(n===yn)return i.FLOAT;if(n===Us)return i.HALF_FLOAT;if(n===Zd)return i.ALPHA;if(n===Jd)return i.RGB;if(n===fn)return i.RGBA;if(n===Qd)return i.LUMINANCE;if(n===eu)return i.LUMINANCE_ALPHA;if(n===Ji)return i.DEPTH_COMPONENT;if(n===os)return i.DEPTH_STENCIL;if(n===uc)return i.RED;if(n===hc)return i.RED_INTEGER;if(n===tu)return i.RG;if(n===fc)return i.RG_INTEGER;if(n===pc)return i.RGBA_INTEGER;if(n===_r||n===xr||n===yr||n===Mr)if(a===Qe)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===_r)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===xr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===yr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Mr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===_r)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===xr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===yr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Mr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===vo||n===_o||n===xo||n===yo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===vo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===_o)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===xo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===yo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Mo||n===So||n===Eo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Mo||n===So)return a===Qe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Eo)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===bo||n===To||n===wo||n===Ao||n===Co||n===Ro||n===Po||n===Lo||n===Do||n===Io||n===Uo||n===No||n===Oo||n===Fo)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===bo)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===To)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===wo)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ao)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Co)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ro)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Po)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Lo)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Do)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Io)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Uo)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===No)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Oo)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Fo)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Sr||n===ko||n===Bo)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Sr)return a===Qe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ko)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Bo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===nu||n===zo||n===Ho||n===Go)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Sr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===zo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ho)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Go)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===as?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class H_ extends Yt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Mn extends mt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const G_={type:"move"};class Na{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Mn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Mn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Mn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),f=this._getHandJoint(l,v);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const d=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],h=d.position.distanceTo(u.position),p=.02,g=.005;l.inputState.pinching&&h>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(G_)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Mn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const V_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,W_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class X_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new It,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new ni({vertexShader:V_,fragmentShader:W_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new xe(new Xr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class $_ extends Ei{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,d=null,u=null,h=null,p=null,g=null;const v=new X_,m=t.getContextAttributes();let f=null,M=null;const b=[],y=[],D=new Ae;let A=null;const w=new Yt;w.viewport=new nt;const P=new Yt;P.viewport=new nt;const E=[w,P],x=new H_;let R=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let ne=b[q];return ne===void 0&&(ne=new Na,b[q]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(q){let ne=b[q];return ne===void 0&&(ne=new Na,b[q]=ne),ne.getGripSpace()},this.getHand=function(q){let ne=b[q];return ne===void 0&&(ne=new Na,b[q]=ne),ne.getHandSpace()};function z(q){const ne=y.indexOf(q.inputSource);if(ne===-1)return;const _e=b[ne];_e!==void 0&&(_e.update(q.inputSource,q.frame,l||a),_e.dispatchEvent({type:q.type,data:q.inputSource}))}function X(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",K);for(let q=0;q<b.length;q++){const ne=y[q];ne!==null&&(y[q]=null,b[q].disconnect(ne))}R=null,k=null,v.reset(),e.setRenderTarget(f),p=null,h=null,u=null,s=null,M=null,it.stop(),n.isPresenting=!1,e.setPixelRatio(A),e.setSize(D.width,D.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(f=e.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",X),s.addEventListener("inputsourceschange",K),m.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(D),s.renderState.layers===void 0){const ne={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ne),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),M=new Mi(p.framebufferWidth,p.framebufferHeight,{format:fn,type:Fn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let ne=null,_e=null,ae=null;m.depth&&(ae=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ne=m.stencil?os:Ji,_e=m.stencil?as:yi);const we={colorFormat:t.RGBA8,depthFormat:ae,scaleFactor:r};u=new XRWebGLBinding(s,t),h=u.createProjectionLayer(we),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),M=new Mi(h.textureWidth,h.textureHeight,{format:fn,type:Fn,depthTexture:new gu(h.textureWidth,h.textureHeight,_e,void 0,void 0,void 0,void 0,void 0,void 0,ne),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),it.setContext(s),it.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function K(q){for(let ne=0;ne<q.removed.length;ne++){const _e=q.removed[ne],ae=y.indexOf(_e);ae>=0&&(y[ae]=null,b[ae].disconnect(_e))}for(let ne=0;ne<q.added.length;ne++){const _e=q.added[ne];let ae=y.indexOf(_e);if(ae===-1){for(let Le=0;Le<b.length;Le++)if(Le>=y.length){y.push(_e),ae=Le;break}else if(y[Le]===null){y[Le]=_e,ae=Le;break}if(ae===-1)break}const we=b[ae];we&&we.connect(_e)}}const W=new C,J=new C;function V(q,ne,_e){W.setFromMatrixPosition(ne.matrixWorld),J.setFromMatrixPosition(_e.matrixWorld);const ae=W.distanceTo(J),we=ne.projectionMatrix.elements,Le=_e.projectionMatrix.elements,ze=we[14]/(we[10]-1),ht=we[14]/(we[10]+1),Xe=(we[9]+1)/we[5],gt=(we[9]-1)/we[5],N=(we[8]-1)/we[0],Zt=(Le[8]+1)/Le[0],He=ze*N,Ge=ze*Zt,be=ae/(-N+Zt),ot=be*-N;if(ne.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(ot),q.translateZ(be),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),we[10]===-1)q.projectionMatrix.copy(ne.projectionMatrix),q.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const Ee=ze+be,T=ht+be,_=He-ot,F=Ge+(ae-ot),Y=Xe*ht/T*Ee,Z=gt*ht/T*Ee;q.projectionMatrix.makePerspective(_,F,Y,Z,Ee,T),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function re(q,ne){ne===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(ne.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let ne=q.near,_e=q.far;v.texture!==null&&(v.depthNear>0&&(ne=v.depthNear),v.depthFar>0&&(_e=v.depthFar)),x.near=P.near=w.near=ne,x.far=P.far=w.far=_e,(R!==x.near||k!==x.far)&&(s.updateRenderState({depthNear:x.near,depthFar:x.far}),R=x.near,k=x.far),w.layers.mask=q.layers.mask|2,P.layers.mask=q.layers.mask|4,x.layers.mask=w.layers.mask|P.layers.mask;const ae=q.parent,we=x.cameras;re(x,ae);for(let Le=0;Le<we.length;Le++)re(we[Le],ae);we.length===2?V(x,w,P):x.projectionMatrix.copy(w.projectionMatrix),ue(q,x,ae)};function ue(q,ne,_e){_e===null?q.matrix.copy(ne.matrixWorld):(q.matrix.copy(_e.matrixWorld),q.matrix.invert(),q.matrix.multiply(ne.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(ne.projectionMatrix),q.projectionMatrixInverse.copy(ne.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Vo*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(h===null&&p===null))return c},this.setFoveation=function(q){c=q,h!==null&&(h.fixedFoveation=q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=q)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(x)};let Se=null;function Be(q,ne){if(d=ne.getViewerPose(l||a),g=ne,d!==null){const _e=d.views;p!==null&&(e.setRenderTargetFramebuffer(M,p.framebuffer),e.setRenderTarget(M));let ae=!1;_e.length!==x.cameras.length&&(x.cameras.length=0,ae=!0);for(let Le=0;Le<_e.length;Le++){const ze=_e[Le];let ht=null;if(p!==null)ht=p.getViewport(ze);else{const gt=u.getViewSubImage(h,ze);ht=gt.viewport,Le===0&&(e.setRenderTargetTextures(M,gt.colorTexture,h.ignoreDepthValues?void 0:gt.depthStencilTexture),e.setRenderTarget(M))}let Xe=E[Le];Xe===void 0&&(Xe=new Yt,Xe.layers.enable(Le),Xe.viewport=new nt,E[Le]=Xe),Xe.matrix.fromArray(ze.transform.matrix),Xe.matrix.decompose(Xe.position,Xe.quaternion,Xe.scale),Xe.projectionMatrix.fromArray(ze.projectionMatrix),Xe.projectionMatrixInverse.copy(Xe.projectionMatrix).invert(),Xe.viewport.set(ht.x,ht.y,ht.width,ht.height),Le===0&&(x.matrix.copy(Xe.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),ae===!0&&x.cameras.push(Xe)}const we=s.enabledFeatures;if(we&&we.includes("depth-sensing")){const Le=u.getDepthInformation(_e[0]);Le&&Le.isValid&&Le.texture&&v.init(e,Le,s.renderState)}}for(let _e=0;_e<b.length;_e++){const ae=y[_e],we=b[_e];ae!==null&&we!==void 0&&we.update(ae,ne,l||a)}Se&&Se(q,ne),ne.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ne}),g=null}const it=new pu;it.setAnimationLoop(Be),this.setAnimationLoop=function(q){Se=q},this.dispose=function(){}}}const di=new Sn,q_=new st;function Y_(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,uu(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,M,b,y){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),d(m,f)):f.isMeshStandardMaterial?(r(m,f),h(m,f),f.isMeshPhysicalMaterial&&p(m,f,y)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),v(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?c(m,f,M,b):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===kt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===kt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const M=e.get(f),b=M.envMap,y=M.envMapRotation;b&&(m.envMap.value=b,di.copy(y),di.x*=-1,di.y*=-1,di.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(di.y*=-1,di.z*=-1),m.envMapRotation.value.setFromMatrix4(q_.makeRotationFromEuler(di)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,M,b){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*M,m.scale.value=b*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function d(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,M){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===kt&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function v(m,f){const M=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function j_(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,b){const y=b.program;n.uniformBlockBinding(M,y)}function l(M,b){let y=s[M.id];y===void 0&&(g(M),y=d(M),s[M.id]=y,M.addEventListener("dispose",m));const D=b.program;n.updateUBOMapping(M,D);const A=e.render.frame;r[M.id]!==A&&(h(M),r[M.id]=A)}function d(M){const b=u();M.__bindingPointIndex=b;const y=i.createBuffer(),D=M.__size,A=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,D,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,y),y}function u(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(M){const b=s[M.id],y=M.uniforms,D=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let A=0,w=y.length;A<w;A++){const P=Array.isArray(y[A])?y[A]:[y[A]];for(let E=0,x=P.length;E<x;E++){const R=P[E];if(p(R,A,E,D)===!0){const k=R.__offset,z=Array.isArray(R.value)?R.value:[R.value];let X=0;for(let K=0;K<z.length;K++){const W=z[K],J=v(W);typeof W=="number"||typeof W=="boolean"?(R.__data[0]=W,i.bufferSubData(i.UNIFORM_BUFFER,k+X,R.__data)):W.isMatrix3?(R.__data[0]=W.elements[0],R.__data[1]=W.elements[1],R.__data[2]=W.elements[2],R.__data[3]=0,R.__data[4]=W.elements[3],R.__data[5]=W.elements[4],R.__data[6]=W.elements[5],R.__data[7]=0,R.__data[8]=W.elements[6],R.__data[9]=W.elements[7],R.__data[10]=W.elements[8],R.__data[11]=0):(W.toArray(R.__data,X),X+=J.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,k,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(M,b,y,D){const A=M.value,w=b+"_"+y;if(D[w]===void 0)return typeof A=="number"||typeof A=="boolean"?D[w]=A:D[w]=A.clone(),!0;{const P=D[w];if(typeof A=="number"||typeof A=="boolean"){if(P!==A)return D[w]=A,!0}else if(P.equals(A)===!1)return P.copy(A),!0}return!1}function g(M){const b=M.uniforms;let y=0;const D=16;for(let w=0,P=b.length;w<P;w++){const E=Array.isArray(b[w])?b[w]:[b[w]];for(let x=0,R=E.length;x<R;x++){const k=E[x],z=Array.isArray(k.value)?k.value:[k.value];for(let X=0,K=z.length;X<K;X++){const W=z[X],J=v(W),V=y%D,re=V%J.boundary,ue=V+re;y+=re,ue!==0&&D-ue<J.storage&&(y+=D-ue),k.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=y,y+=J.storage}}}const A=y%D;return A>0&&(y+=D-A),M.__size=y,M.__cache={},this}function v(M){const b={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(b.boundary=4,b.storage=4):M.isVector2?(b.boundary=8,b.storage=8):M.isVector3||M.isColor?(b.boundary=16,b.storage=12):M.isVector4?(b.boundary=16,b.storage=16):M.isMatrix3?(b.boundary=48,b.storage=48):M.isMatrix4?(b.boundary=64,b.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),b}function m(M){const b=M.target;b.removeEventListener("dispose",m);const y=a.indexOf(b.__bindingPointIndex);a.splice(y,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function f(){for(const M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:c,update:l,dispose:f}}class K_{constructor(e={}){const{canvas:t=kp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,f=null;const M=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Dt,this.toneMapping=ei,this.toneMappingExposure=1;const y=this;let D=!1,A=0,w=0,P=null,E=-1,x=null;const R=new nt,k=new nt;let z=null;const X=new Ie(0);let K=0,W=t.width,J=t.height,V=1,re=null,ue=null;const Se=new nt(0,0,W,J),Be=new nt(0,0,W,J);let it=!1;const q=new vc;let ne=!1,_e=!1;const ae=new st,we=new st,Le=new C,ze=new nt,ht={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Xe=!1;function gt(){return P===null?V:1}let N=n;function Zt(S,I){return t.getContext(S,I)}try{const S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${oc}`),t.addEventListener("webglcontextlost",j,!1),t.addEventListener("webglcontextrestored",de,!1),t.addEventListener("webglcontextcreationerror",ce,!1),N===null){const I="webgl2";if(N=Zt(I,S),N===null)throw Zt(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let He,Ge,be,ot,Ee,T,_,F,Y,Z,$,ye,oe,he,$e,ee,fe,Te,Ce,pe,Ve,Fe,rt,L;function se(){He=new tv(N),He.init(),Fe=new z_(N,He),Ge=new j0(N,He,e,Fe),be=new F_(N,He),Ge.reverseDepthBuffer&&h&&be.buffers.depth.setReversed(!0),ot=new sv(N),Ee=new S_,T=new B_(N,He,be,Ee,Ge,Fe,ot),_=new Z0(y),F=new ev(y),Y=new um(N),rt=new q0(N,Y),Z=new nv(N,Y,ot,rt),$=new av(N,Z,Y,ot),Ce=new rv(N,Ge,T),ee=new K0(Ee),ye=new M_(y,_,F,He,Ge,rt,ee),oe=new Y_(y,Ee),he=new b_,$e=new P_(He),Te=new $0(y,_,F,be,$,p,c),fe=new N_(y,$,Ge),L=new j_(N,ot,Ge,be),pe=new Y0(N,He,ot),Ve=new iv(N,He,ot),ot.programs=ye.programs,y.capabilities=Ge,y.extensions=He,y.properties=Ee,y.renderLists=he,y.shadowMap=fe,y.state=be,y.info=ot}se();const G=new $_(y,N);this.xr=G,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const S=He.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=He.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(S){S!==void 0&&(V=S,this.setSize(W,J,!1))},this.getSize=function(S){return S.set(W,J)},this.setSize=function(S,I,B=!0){if(G.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=S,J=I,t.width=Math.floor(S*V),t.height=Math.floor(I*V),B===!0&&(t.style.width=S+"px",t.style.height=I+"px"),this.setViewport(0,0,S,I)},this.getDrawingBufferSize=function(S){return S.set(W*V,J*V).floor()},this.setDrawingBufferSize=function(S,I,B){W=S,J=I,V=B,t.width=Math.floor(S*B),t.height=Math.floor(I*B),this.setViewport(0,0,S,I)},this.getCurrentViewport=function(S){return S.copy(R)},this.getViewport=function(S){return S.copy(Se)},this.setViewport=function(S,I,B,H){S.isVector4?Se.set(S.x,S.y,S.z,S.w):Se.set(S,I,B,H),be.viewport(R.copy(Se).multiplyScalar(V).round())},this.getScissor=function(S){return S.copy(Be)},this.setScissor=function(S,I,B,H){S.isVector4?Be.set(S.x,S.y,S.z,S.w):Be.set(S,I,B,H),be.scissor(k.copy(Be).multiplyScalar(V).round())},this.getScissorTest=function(){return it},this.setScissorTest=function(S){be.setScissorTest(it=S)},this.setOpaqueSort=function(S){re=S},this.setTransparentSort=function(S){ue=S},this.getClearColor=function(S){return S.copy(Te.getClearColor())},this.setClearColor=function(){Te.setClearColor.apply(Te,arguments)},this.getClearAlpha=function(){return Te.getClearAlpha()},this.setClearAlpha=function(){Te.setClearAlpha.apply(Te,arguments)},this.clear=function(S=!0,I=!0,B=!0){let H=0;if(S){let U=!1;if(P!==null){const te=P.texture.format;U=te===pc||te===fc||te===hc}if(U){const te=P.texture.type,le=te===Fn||te===yi||te===Ds||te===as||te===lc||te===dc,me=Te.getClearColor(),ge=Te.getClearAlpha(),Re=me.r,Ne=me.g,ve=me.b;le?(g[0]=Re,g[1]=Ne,g[2]=ve,g[3]=ge,N.clearBufferuiv(N.COLOR,0,g)):(v[0]=Re,v[1]=Ne,v[2]=ve,v[3]=ge,N.clearBufferiv(N.COLOR,0,v))}else H|=N.COLOR_BUFFER_BIT}I&&(H|=N.DEPTH_BUFFER_BIT),B&&(H|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",j,!1),t.removeEventListener("webglcontextrestored",de,!1),t.removeEventListener("webglcontextcreationerror",ce,!1),he.dispose(),$e.dispose(),Ee.dispose(),_.dispose(),F.dispose(),$.dispose(),rt.dispose(),L.dispose(),ye.dispose(),G.dispose(),G.removeEventListener("sessionstart",bc),G.removeEventListener("sessionend",Tc),si.stop()};function j(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),D=!0}function de(){console.log("THREE.WebGLRenderer: Context Restored."),D=!1;const S=ot.autoReset,I=fe.enabled,B=fe.autoUpdate,H=fe.needsUpdate,U=fe.type;se(),ot.autoReset=S,fe.enabled=I,fe.autoUpdate=B,fe.needsUpdate=H,fe.type=U}function ce(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Ue(S){const I=S.target;I.removeEventListener("dispose",Ue),pt(I)}function pt(S){Rt(S),Ee.remove(S)}function Rt(S){const I=Ee.get(S).programs;I!==void 0&&(I.forEach(function(B){ye.releaseProgram(B)}),S.isShaderMaterial&&ye.releaseShaderCache(S))}this.renderBufferDirect=function(S,I,B,H,U,te){I===null&&(I=ht);const le=U.isMesh&&U.matrixWorld.determinant()<0,me=Ou(S,I,B,H,U);be.setMaterial(H,le);let ge=B.index,Re=1;if(H.wireframe===!0){if(ge=Z.getWireframeAttribute(B),ge===void 0)return;Re=2}const Ne=B.drawRange,ve=B.attributes.position;let je=Ne.start*Re,at=(Ne.start+Ne.count)*Re;te!==null&&(je=Math.max(je,te.start*Re),at=Math.min(at,(te.start+te.count)*Re)),ge!==null?(je=Math.max(je,0),at=Math.min(at,ge.count)):ve!=null&&(je=Math.max(je,0),at=Math.min(at,ve.count));const ct=at-je;if(ct<0||ct===1/0)return;rt.setup(U,H,me,B,ge);let Bt,Ke=pe;if(ge!==null&&(Bt=Y.get(ge),Ke=Ve,Ke.setIndex(Bt)),U.isMesh)H.wireframe===!0?(be.setLineWidth(H.wireframeLinewidth*gt()),Ke.setMode(N.LINES)):Ke.setMode(N.TRIANGLES);else if(U.isLine){let Me=H.linewidth;Me===void 0&&(Me=1),be.setLineWidth(Me*gt()),U.isLineSegments?Ke.setMode(N.LINES):U.isLineLoop?Ke.setMode(N.LINE_LOOP):Ke.setMode(N.LINE_STRIP)}else U.isPoints?Ke.setMode(N.POINTS):U.isSprite&&Ke.setMode(N.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)Ke.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(He.get("WEBGL_multi_draw"))Ke.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const Me=U._multiDrawStarts,bn=U._multiDrawCounts,Ze=U._multiDrawCount,an=ge?Y.get(ge).bytesPerElement:1,Ti=Ee.get(H).currentProgram.getUniforms();for(let Wt=0;Wt<Ze;Wt++)Ti.setValue(N,"_gl_DrawID",Wt),Ke.render(Me[Wt]/an,bn[Wt])}else if(U.isInstancedMesh)Ke.renderInstances(je,ct,U.count);else if(B.isInstancedBufferGeometry){const Me=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,bn=Math.min(B.instanceCount,Me);Ke.renderInstances(je,ct,bn)}else Ke.render(je,ct)};function Je(S,I,B){S.transparent===!0&&S.side===Dn&&S.forceSinglePass===!1?(S.side=kt,S.needsUpdate=!0,Bs(S,I,B),S.side=ti,S.needsUpdate=!0,Bs(S,I,B),S.side=Dn):Bs(S,I,B)}this.compile=function(S,I,B=null){B===null&&(B=S),f=$e.get(B),f.init(I),b.push(f),B.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(f.pushLight(U),U.castShadow&&f.pushShadow(U))}),S!==B&&S.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(f.pushLight(U),U.castShadow&&f.pushShadow(U))}),f.setupLights();const H=new Set;return S.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const te=U.material;if(te)if(Array.isArray(te))for(let le=0;le<te.length;le++){const me=te[le];Je(me,B,U),H.add(me)}else Je(te,B,U),H.add(te)}),b.pop(),f=null,H},this.compileAsync=function(S,I,B=null){const H=this.compile(S,I,B);return new Promise(U=>{function te(){if(H.forEach(function(le){Ee.get(le).currentProgram.isReady()&&H.delete(le)}),H.size===0){U(S);return}setTimeout(te,10)}He.get("KHR_parallel_shader_compile")!==null?te():setTimeout(te,10)})};let rn=null;function En(S){rn&&rn(S)}function bc(){si.stop()}function Tc(){si.start()}const si=new pu;si.setAnimationLoop(En),typeof self<"u"&&si.setContext(self),this.setAnimationLoop=function(S){rn=S,G.setAnimationLoop(S),S===null?si.stop():si.start()},G.addEventListener("sessionstart",bc),G.addEventListener("sessionend",Tc),this.render=function(S,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),G.enabled===!0&&G.isPresenting===!0&&(G.cameraAutoUpdate===!0&&G.updateCamera(I),I=G.getCamera()),S.isScene===!0&&S.onBeforeRender(y,S,I,P),f=$e.get(S,b.length),f.init(I),b.push(f),we.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),q.setFromProjectionMatrix(we),_e=this.localClippingEnabled,ne=ee.init(this.clippingPlanes,_e),m=he.get(S,M.length),m.init(),M.push(m),G.enabled===!0&&G.isPresenting===!0){const te=y.xr.getDepthSensingMesh();te!==null&&ea(te,I,-1/0,y.sortObjects)}ea(S,I,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(re,ue),Xe=G.enabled===!1||G.isPresenting===!1||G.hasDepthSensing()===!1,Xe&&Te.addToRenderList(m,S),this.info.render.frame++,ne===!0&&ee.beginShadows();const B=f.state.shadowsArray;fe.render(B,S,I),ne===!0&&ee.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=m.opaque,U=m.transmissive;if(f.setupLights(),I.isArrayCamera){const te=I.cameras;if(U.length>0)for(let le=0,me=te.length;le<me;le++){const ge=te[le];Ac(H,U,S,ge)}Xe&&Te.render(S);for(let le=0,me=te.length;le<me;le++){const ge=te[le];wc(m,S,ge,ge.viewport)}}else U.length>0&&Ac(H,U,S,I),Xe&&Te.render(S),wc(m,S,I);P!==null&&(T.updateMultisampleRenderTarget(P),T.updateRenderTargetMipmap(P)),S.isScene===!0&&S.onAfterRender(y,S,I),rt.resetDefaultState(),E=-1,x=null,b.pop(),b.length>0?(f=b[b.length-1],ne===!0&&ee.setGlobalState(y.clippingPlanes,f.state.camera)):f=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function ea(S,I,B,H){if(S.visible===!1)return;if(S.layers.test(I.layers)){if(S.isGroup)B=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(I);else if(S.isLight)f.pushLight(S),S.castShadow&&f.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||q.intersectsSprite(S)){H&&ze.setFromMatrixPosition(S.matrixWorld).applyMatrix4(we);const le=$.update(S),me=S.material;me.visible&&m.push(S,le,me,B,ze.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||q.intersectsObject(S))){const le=$.update(S),me=S.material;if(H&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),ze.copy(S.boundingSphere.center)):(le.boundingSphere===null&&le.computeBoundingSphere(),ze.copy(le.boundingSphere.center)),ze.applyMatrix4(S.matrixWorld).applyMatrix4(we)),Array.isArray(me)){const ge=le.groups;for(let Re=0,Ne=ge.length;Re<Ne;Re++){const ve=ge[Re],je=me[ve.materialIndex];je&&je.visible&&m.push(S,le,je,B,ze.z,ve)}}else me.visible&&m.push(S,le,me,B,ze.z,null)}}const te=S.children;for(let le=0,me=te.length;le<me;le++)ea(te[le],I,B,H)}function wc(S,I,B,H){const U=S.opaque,te=S.transmissive,le=S.transparent;f.setupLightsView(B),ne===!0&&ee.setGlobalState(y.clippingPlanes,B),H&&be.viewport(R.copy(H)),U.length>0&&ks(U,I,B),te.length>0&&ks(te,I,B),le.length>0&&ks(le,I,B),be.buffers.depth.setTest(!0),be.buffers.depth.setMask(!0),be.buffers.color.setMask(!0),be.setPolygonOffset(!1)}function Ac(S,I,B,H){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[H.id]===void 0&&(f.state.transmissionRenderTarget[H.id]=new Mi(1,1,{generateMipmaps:!0,type:He.has("EXT_color_buffer_half_float")||He.has("EXT_color_buffer_float")?Us:Fn,minFilter:vi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ye.workingColorSpace}));const te=f.state.transmissionRenderTarget[H.id],le=H.viewport||R;te.setSize(le.z,le.w);const me=y.getRenderTarget();y.setRenderTarget(te),y.getClearColor(X),K=y.getClearAlpha(),K<1&&y.setClearColor(16777215,.5),y.clear(),Xe&&Te.render(B);const ge=y.toneMapping;y.toneMapping=ei;const Re=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),f.setupLightsView(H),ne===!0&&ee.setGlobalState(y.clippingPlanes,H),ks(S,B,H),T.updateMultisampleRenderTarget(te),T.updateRenderTargetMipmap(te),He.has("WEBGL_multisampled_render_to_texture")===!1){let Ne=!1;for(let ve=0,je=I.length;ve<je;ve++){const at=I[ve],ct=at.object,Bt=at.geometry,Ke=at.material,Me=at.group;if(Ke.side===Dn&&ct.layers.test(H.layers)){const bn=Ke.side;Ke.side=kt,Ke.needsUpdate=!0,Cc(ct,B,H,Bt,Ke,Me),Ke.side=bn,Ke.needsUpdate=!0,Ne=!0}}Ne===!0&&(T.updateMultisampleRenderTarget(te),T.updateRenderTargetMipmap(te))}y.setRenderTarget(me),y.setClearColor(X,K),Re!==void 0&&(H.viewport=Re),y.toneMapping=ge}function ks(S,I,B){const H=I.isScene===!0?I.overrideMaterial:null;for(let U=0,te=S.length;U<te;U++){const le=S[U],me=le.object,ge=le.geometry,Re=H===null?le.material:H,Ne=le.group;me.layers.test(B.layers)&&Cc(me,I,B,ge,Re,Ne)}}function Cc(S,I,B,H,U,te){S.onBeforeRender(y,I,B,H,U,te),S.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),U.onBeforeRender(y,I,B,H,S,te),U.transparent===!0&&U.side===Dn&&U.forceSinglePass===!1?(U.side=kt,U.needsUpdate=!0,y.renderBufferDirect(B,I,H,U,S,te),U.side=ti,U.needsUpdate=!0,y.renderBufferDirect(B,I,H,U,S,te),U.side=Dn):y.renderBufferDirect(B,I,H,U,S,te),S.onAfterRender(y,I,B,H,U,te)}function Bs(S,I,B){I.isScene!==!0&&(I=ht);const H=Ee.get(S),U=f.state.lights,te=f.state.shadowsArray,le=U.state.version,me=ye.getParameters(S,U.state,te,I,B),ge=ye.getProgramCacheKey(me);let Re=H.programs;H.environment=S.isMeshStandardMaterial?I.environment:null,H.fog=I.fog,H.envMap=(S.isMeshStandardMaterial?F:_).get(S.envMap||H.environment),H.envMapRotation=H.environment!==null&&S.envMap===null?I.environmentRotation:S.envMapRotation,Re===void 0&&(S.addEventListener("dispose",Ue),Re=new Map,H.programs=Re);let Ne=Re.get(ge);if(Ne!==void 0){if(H.currentProgram===Ne&&H.lightsStateVersion===le)return Pc(S,me),Ne}else me.uniforms=ye.getUniforms(S),S.onBeforeCompile(me,y),Ne=ye.acquireProgram(me,ge),Re.set(ge,Ne),H.uniforms=me.uniforms;const ve=H.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(ve.clippingPlanes=ee.uniform),Pc(S,me),H.needsLights=ku(S),H.lightsStateVersion=le,H.needsLights&&(ve.ambientLightColor.value=U.state.ambient,ve.lightProbe.value=U.state.probe,ve.directionalLights.value=U.state.directional,ve.directionalLightShadows.value=U.state.directionalShadow,ve.spotLights.value=U.state.spot,ve.spotLightShadows.value=U.state.spotShadow,ve.rectAreaLights.value=U.state.rectArea,ve.ltc_1.value=U.state.rectAreaLTC1,ve.ltc_2.value=U.state.rectAreaLTC2,ve.pointLights.value=U.state.point,ve.pointLightShadows.value=U.state.pointShadow,ve.hemisphereLights.value=U.state.hemi,ve.directionalShadowMap.value=U.state.directionalShadowMap,ve.directionalShadowMatrix.value=U.state.directionalShadowMatrix,ve.spotShadowMap.value=U.state.spotShadowMap,ve.spotLightMatrix.value=U.state.spotLightMatrix,ve.spotLightMap.value=U.state.spotLightMap,ve.pointShadowMap.value=U.state.pointShadowMap,ve.pointShadowMatrix.value=U.state.pointShadowMatrix),H.currentProgram=Ne,H.uniformsList=null,Ne}function Rc(S){if(S.uniformsList===null){const I=S.currentProgram.getUniforms();S.uniformsList=br.seqWithValue(I.seq,S.uniforms)}return S.uniformsList}function Pc(S,I){const B=Ee.get(S);B.outputColorSpace=I.outputColorSpace,B.batching=I.batching,B.batchingColor=I.batchingColor,B.instancing=I.instancing,B.instancingColor=I.instancingColor,B.instancingMorph=I.instancingMorph,B.skinning=I.skinning,B.morphTargets=I.morphTargets,B.morphNormals=I.morphNormals,B.morphColors=I.morphColors,B.morphTargetsCount=I.morphTargetsCount,B.numClippingPlanes=I.numClippingPlanes,B.numIntersection=I.numClipIntersection,B.vertexAlphas=I.vertexAlphas,B.vertexTangents=I.vertexTangents,B.toneMapping=I.toneMapping}function Ou(S,I,B,H,U){I.isScene!==!0&&(I=ht),T.resetTextureUnits();const te=I.fog,le=H.isMeshStandardMaterial?I.environment:null,me=P===null?y.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:ds,ge=(H.isMeshStandardMaterial?F:_).get(H.envMap||le),Re=H.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Ne=!!B.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),ve=!!B.morphAttributes.position,je=!!B.morphAttributes.normal,at=!!B.morphAttributes.color;let ct=ei;H.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(ct=y.toneMapping);const Bt=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Ke=Bt!==void 0?Bt.length:0,Me=Ee.get(H),bn=f.state.lights;if(ne===!0&&(_e===!0||S!==x)){const Jt=S===x&&H.id===E;ee.setState(H,S,Jt)}let Ze=!1;H.version===Me.__version?(Me.needsLights&&Me.lightsStateVersion!==bn.state.version||Me.outputColorSpace!==me||U.isBatchedMesh&&Me.batching===!1||!U.isBatchedMesh&&Me.batching===!0||U.isBatchedMesh&&Me.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Me.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Me.instancing===!1||!U.isInstancedMesh&&Me.instancing===!0||U.isSkinnedMesh&&Me.skinning===!1||!U.isSkinnedMesh&&Me.skinning===!0||U.isInstancedMesh&&Me.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Me.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Me.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Me.instancingMorph===!1&&U.morphTexture!==null||Me.envMap!==ge||H.fog===!0&&Me.fog!==te||Me.numClippingPlanes!==void 0&&(Me.numClippingPlanes!==ee.numPlanes||Me.numIntersection!==ee.numIntersection)||Me.vertexAlphas!==Re||Me.vertexTangents!==Ne||Me.morphTargets!==ve||Me.morphNormals!==je||Me.morphColors!==at||Me.toneMapping!==ct||Me.morphTargetsCount!==Ke)&&(Ze=!0):(Ze=!0,Me.__version=H.version);let an=Me.currentProgram;Ze===!0&&(an=Bs(H,I,U));let Ti=!1,Wt=!1,fs=!1;const lt=an.getUniforms(),mn=Me.uniforms;if(be.useProgram(an.program)&&(Ti=!0,Wt=!0,fs=!0),H.id!==E&&(E=H.id,Wt=!0),Ti||x!==S){be.buffers.depth.getReversed()?(ae.copy(S.projectionMatrix),zp(ae),Hp(ae),lt.setValue(N,"projectionMatrix",ae)):lt.setValue(N,"projectionMatrix",S.projectionMatrix),lt.setValue(N,"viewMatrix",S.matrixWorldInverse);const Bn=lt.map.cameraPosition;Bn!==void 0&&Bn.setValue(N,Le.setFromMatrixPosition(S.matrixWorld)),Ge.logarithmicDepthBuffer&&lt.setValue(N,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&lt.setValue(N,"isOrthographic",S.isOrthographicCamera===!0),x!==S&&(x=S,Wt=!0,fs=!0)}if(U.isSkinnedMesh){lt.setOptional(N,U,"bindMatrix"),lt.setOptional(N,U,"bindMatrixInverse");const Jt=U.skeleton;Jt&&(Jt.boneTexture===null&&Jt.computeBoneTexture(),lt.setValue(N,"boneTexture",Jt.boneTexture,T))}U.isBatchedMesh&&(lt.setOptional(N,U,"batchingTexture"),lt.setValue(N,"batchingTexture",U._matricesTexture,T),lt.setOptional(N,U,"batchingIdTexture"),lt.setValue(N,"batchingIdTexture",U._indirectTexture,T),lt.setOptional(N,U,"batchingColorTexture"),U._colorsTexture!==null&&lt.setValue(N,"batchingColorTexture",U._colorsTexture,T));const ps=B.morphAttributes;if((ps.position!==void 0||ps.normal!==void 0||ps.color!==void 0)&&Ce.update(U,B,an),(Wt||Me.receiveShadow!==U.receiveShadow)&&(Me.receiveShadow=U.receiveShadow,lt.setValue(N,"receiveShadow",U.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(mn.envMap.value=ge,mn.flipEnvMap.value=ge.isCubeTexture&&ge.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&I.environment!==null&&(mn.envMapIntensity.value=I.environmentIntensity),Wt&&(lt.setValue(N,"toneMappingExposure",y.toneMappingExposure),Me.needsLights&&Fu(mn,fs),te&&H.fog===!0&&oe.refreshFogUniforms(mn,te),oe.refreshMaterialUniforms(mn,H,V,J,f.state.transmissionRenderTarget[S.id]),br.upload(N,Rc(Me),mn,T)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(br.upload(N,Rc(Me),mn,T),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&lt.setValue(N,"center",U.center),lt.setValue(N,"modelViewMatrix",U.modelViewMatrix),lt.setValue(N,"normalMatrix",U.normalMatrix),lt.setValue(N,"modelMatrix",U.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const Jt=H.uniformsGroups;for(let Bn=0,zn=Jt.length;Bn<zn;Bn++){const Lc=Jt[Bn];L.update(Lc,an),L.bind(Lc,an)}}return an}function Fu(S,I){S.ambientLightColor.needsUpdate=I,S.lightProbe.needsUpdate=I,S.directionalLights.needsUpdate=I,S.directionalLightShadows.needsUpdate=I,S.pointLights.needsUpdate=I,S.pointLightShadows.needsUpdate=I,S.spotLights.needsUpdate=I,S.spotLightShadows.needsUpdate=I,S.rectAreaLights.needsUpdate=I,S.hemisphereLights.needsUpdate=I}function ku(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(S,I,B){Ee.get(S.texture).__webglTexture=I,Ee.get(S.depthTexture).__webglTexture=B;const H=Ee.get(S);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=B===void 0,H.__autoAllocateDepthBuffer||He.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,I){const B=Ee.get(S);B.__webglFramebuffer=I,B.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(S,I=0,B=0){P=S,A=I,w=B;let H=!0,U=null,te=!1,le=!1;if(S){const ge=Ee.get(S);if(ge.__useDefaultFramebuffer!==void 0)be.bindFramebuffer(N.FRAMEBUFFER,null),H=!1;else if(ge.__webglFramebuffer===void 0)T.setupRenderTarget(S);else if(ge.__hasExternalTextures)T.rebindTextures(S,Ee.get(S.texture).__webglTexture,Ee.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const ve=S.depthTexture;if(ge.__boundDepthTexture!==ve){if(ve!==null&&Ee.has(ve)&&(S.width!==ve.image.width||S.height!==ve.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(S)}}const Re=S.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(le=!0);const Ne=Ee.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ne[I])?U=Ne[I][B]:U=Ne[I],te=!0):S.samples>0&&T.useMultisampledRTT(S)===!1?U=Ee.get(S).__webglMultisampledFramebuffer:Array.isArray(Ne)?U=Ne[B]:U=Ne,R.copy(S.viewport),k.copy(S.scissor),z=S.scissorTest}else R.copy(Se).multiplyScalar(V).floor(),k.copy(Be).multiplyScalar(V).floor(),z=it;if(be.bindFramebuffer(N.FRAMEBUFFER,U)&&H&&be.drawBuffers(S,U),be.viewport(R),be.scissor(k),be.setScissorTest(z),te){const ge=Ee.get(S.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+I,ge.__webglTexture,B)}else if(le){const ge=Ee.get(S.texture),Re=I||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,ge.__webglTexture,B||0,Re)}E=-1},this.readRenderTargetPixels=function(S,I,B,H,U,te,le){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let me=Ee.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&le!==void 0&&(me=me[le]),me){be.bindFramebuffer(N.FRAMEBUFFER,me);try{const ge=S.texture,Re=ge.format,Ne=ge.type;if(!Ge.textureFormatReadable(Re)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ge.textureTypeReadable(Ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=S.width-H&&B>=0&&B<=S.height-U&&N.readPixels(I,B,H,U,Fe.convert(Re),Fe.convert(Ne),te)}finally{const ge=P!==null?Ee.get(P).__webglFramebuffer:null;be.bindFramebuffer(N.FRAMEBUFFER,ge)}}},this.readRenderTargetPixelsAsync=async function(S,I,B,H,U,te,le){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let me=Ee.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&le!==void 0&&(me=me[le]),me){const ge=S.texture,Re=ge.format,Ne=ge.type;if(!Ge.textureFormatReadable(Re))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ge.textureTypeReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(I>=0&&I<=S.width-H&&B>=0&&B<=S.height-U){be.bindFramebuffer(N.FRAMEBUFFER,me);const ve=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,ve),N.bufferData(N.PIXEL_PACK_BUFFER,te.byteLength,N.STREAM_READ),N.readPixels(I,B,H,U,Fe.convert(Re),Fe.convert(Ne),0);const je=P!==null?Ee.get(P).__webglFramebuffer:null;be.bindFramebuffer(N.FRAMEBUFFER,je);const at=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Bp(N,at,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,ve),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,te),N.deleteBuffer(ve),N.deleteSync(at),te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,I=null,B=0){S.isTexture!==!0&&(Cs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),I=arguments[0]||null,S=arguments[1]);const H=Math.pow(2,-B),U=Math.floor(S.image.width*H),te=Math.floor(S.image.height*H),le=I!==null?I.x:0,me=I!==null?I.y:0;T.setTexture2D(S,0),N.copyTexSubImage2D(N.TEXTURE_2D,B,0,0,le,me,U,te),be.unbindTexture()},this.copyTextureToTexture=function(S,I,B=null,H=null,U=0){S.isTexture!==!0&&(Cs("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,S=arguments[1],I=arguments[2],U=arguments[3]||0,B=null);let te,le,me,ge,Re,Ne,ve,je,at;const ct=S.isCompressedTexture?S.mipmaps[U]:S.image;B!==null?(te=B.max.x-B.min.x,le=B.max.y-B.min.y,me=B.isBox3?B.max.z-B.min.z:1,ge=B.min.x,Re=B.min.y,Ne=B.isBox3?B.min.z:0):(te=ct.width,le=ct.height,me=ct.depth||1,ge=0,Re=0,Ne=0),H!==null?(ve=H.x,je=H.y,at=H.z):(ve=0,je=0,at=0);const Bt=Fe.convert(I.format),Ke=Fe.convert(I.type);let Me;I.isData3DTexture?(T.setTexture3D(I,0),Me=N.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(T.setTexture2DArray(I,0),Me=N.TEXTURE_2D_ARRAY):(T.setTexture2D(I,0),Me=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,I.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,I.unpackAlignment);const bn=N.getParameter(N.UNPACK_ROW_LENGTH),Ze=N.getParameter(N.UNPACK_IMAGE_HEIGHT),an=N.getParameter(N.UNPACK_SKIP_PIXELS),Ti=N.getParameter(N.UNPACK_SKIP_ROWS),Wt=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,ct.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ct.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,ge),N.pixelStorei(N.UNPACK_SKIP_ROWS,Re),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ne);const fs=S.isDataArrayTexture||S.isData3DTexture,lt=I.isDataArrayTexture||I.isData3DTexture;if(S.isRenderTargetTexture||S.isDepthTexture){const mn=Ee.get(S),ps=Ee.get(I),Jt=Ee.get(mn.__renderTarget),Bn=Ee.get(ps.__renderTarget);be.bindFramebuffer(N.READ_FRAMEBUFFER,Jt.__webglFramebuffer),be.bindFramebuffer(N.DRAW_FRAMEBUFFER,Bn.__webglFramebuffer);for(let zn=0;zn<me;zn++)fs&&N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ee.get(S).__webglTexture,U,Ne+zn),S.isDepthTexture?(lt&&N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ee.get(I).__webglTexture,U,at+zn),N.blitFramebuffer(ge,Re,te,le,ve,je,te,le,N.DEPTH_BUFFER_BIT,N.NEAREST)):lt?N.copyTexSubImage3D(Me,U,ve,je,at+zn,ge,Re,te,le):N.copyTexSubImage2D(Me,U,ve,je,at+zn,ge,Re,te,le);be.bindFramebuffer(N.READ_FRAMEBUFFER,null),be.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else lt?S.isDataTexture||S.isData3DTexture?N.texSubImage3D(Me,U,ve,je,at,te,le,me,Bt,Ke,ct.data):I.isCompressedArrayTexture?N.compressedTexSubImage3D(Me,U,ve,je,at,te,le,me,Bt,ct.data):N.texSubImage3D(Me,U,ve,je,at,te,le,me,Bt,Ke,ct):S.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,U,ve,je,te,le,Bt,Ke,ct.data):S.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,U,ve,je,ct.width,ct.height,Bt,ct.data):N.texSubImage2D(N.TEXTURE_2D,U,ve,je,te,le,Bt,Ke,ct);N.pixelStorei(N.UNPACK_ROW_LENGTH,bn),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Ze),N.pixelStorei(N.UNPACK_SKIP_PIXELS,an),N.pixelStorei(N.UNPACK_SKIP_ROWS,Ti),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Wt),U===0&&I.generateMipmaps&&N.generateMipmap(Me),be.unbindTexture()},this.copyTextureToTexture3D=function(S,I,B=null,H=null,U=0){return S.isTexture!==!0&&(Cs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,H=arguments[1]||null,S=arguments[2],I=arguments[3],U=arguments[4]||0),Cs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,I,B,H,U)},this.initRenderTarget=function(S){Ee.get(S).__webglFramebuffer===void 0&&T.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?T.setTextureCube(S,0):S.isData3DTexture?T.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?T.setTexture2DArray(S,0):T.setTexture2D(S,0),be.unbindTexture()},this.resetState=function(){A=0,w=0,P=null,be.reset(),rt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Un}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Ye._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ye._getUnpackColorSpace()}}class xc{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ie(e),this.near=t,this.far=n}clone(){return new xc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Oa extends mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Sn,this.environmentIntensity=1,this.environmentRotation=new Sn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Z_ extends It{constructor(e=null,t=1,n=1,s,r,a,o,c,l=Kt,d=Kt,u,h){super(null,a,o,c,l,d,s,r,u,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Nl extends nn{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const zi=new st,Ol=new st,or=[],Fl=new bi,J_=new st,Ss=new xe,Es=new Os;class qr extends xe{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Nl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,J_)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new bi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,zi),Fl.copy(e.boundingBox).applyMatrix4(zi),this.boundingBox.union(Fl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Os),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,zi),Es.copy(e.boundingSphere).applyMatrix4(zi),this.boundingSphere.union(Es)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(Ss.geometry=this.geometry,Ss.material=this.material,Ss.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Es.copy(this.boundingSphere),Es.applyMatrix4(n),e.ray.intersectsSphere(Es)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,zi),Ol.multiplyMatrices(n,zi),Ss.matrixWorld=Ol,Ss.raycast(e,or);for(let a=0,o=or.length;a<o;a++){const c=or[a];c.instanceId=r,c.object=this,t.push(c)}or.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Nl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Z_(new Float32Array(s*this.count),s,this.count,uc,yn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Yr extends It{constructor(e,t,n,s,r,a,o,c,l){super(e,t,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class St extends Ct{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const d=[],u=[],h=[],p=[];let g=0;const v=[],m=n/2;let f=0;M(),a===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(d),this.setAttribute("position",new Et(u,3)),this.setAttribute("normal",new Et(h,3)),this.setAttribute("uv",new Et(p,2));function M(){const y=new C,D=new C;let A=0;const w=(t-e)/n;for(let P=0;P<=r;P++){const E=[],x=P/r,R=x*(t-e)+e;for(let k=0;k<=s;k++){const z=k/s,X=z*c+o,K=Math.sin(X),W=Math.cos(X);D.x=R*K,D.y=-x*n+m,D.z=R*W,u.push(D.x,D.y,D.z),y.set(K,w,W).normalize(),h.push(y.x,y.y,y.z),p.push(z,1-x),E.push(g++)}v.push(E)}for(let P=0;P<s;P++)for(let E=0;E<r;E++){const x=v[E][P],R=v[E+1][P],k=v[E+1][P+1],z=v[E][P+1];(e>0||E!==0)&&(d.push(x,R,z),A+=3),(t>0||E!==r-1)&&(d.push(R,k,z),A+=3)}l.addGroup(f,A,0),f+=A}function b(y){const D=g,A=new Ae,w=new C;let P=0;const E=y===!0?e:t,x=y===!0?1:-1;for(let k=1;k<=s;k++)u.push(0,m*x,0),h.push(0,x,0),p.push(.5,.5),g++;const R=g;for(let k=0;k<=s;k++){const X=k/s*c+o,K=Math.cos(X),W=Math.sin(X);w.x=E*W,w.y=m*x,w.z=E*K,u.push(w.x,w.y,w.z),h.push(0,x,0),A.x=K*.5+.5,A.y=W*.5*x+.5,p.push(A.x,A.y),g++}for(let k=0;k<s;k++){const z=D+k,X=R+k;y===!0?d.push(X,X+1,z):d.push(X+1,X,z),P+=3}l.addGroup(f,P,y===!0?1:2),f+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new St(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class hs extends St{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new hs(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class jr extends Ct{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];o(s),l(n),d(),this.setAttribute("position",new Et(r,3)),this.setAttribute("normal",new Et(r.slice(),3)),this.setAttribute("uv",new Et(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(M){const b=new C,y=new C,D=new C;for(let A=0;A<t.length;A+=3)p(t[A+0],b),p(t[A+1],y),p(t[A+2],D),c(b,y,D,M)}function c(M,b,y,D){const A=D+1,w=[];for(let P=0;P<=A;P++){w[P]=[];const E=M.clone().lerp(y,P/A),x=b.clone().lerp(y,P/A),R=A-P;for(let k=0;k<=R;k++)k===0&&P===A?w[P][k]=E:w[P][k]=E.clone().lerp(x,k/R)}for(let P=0;P<A;P++)for(let E=0;E<2*(A-P)-1;E++){const x=Math.floor(E/2);E%2===0?(h(w[P][x+1]),h(w[P+1][x]),h(w[P][x])):(h(w[P][x+1]),h(w[P+1][x+1]),h(w[P+1][x]))}}function l(M){const b=new C;for(let y=0;y<r.length;y+=3)b.x=r[y+0],b.y=r[y+1],b.z=r[y+2],b.normalize().multiplyScalar(M),r[y+0]=b.x,r[y+1]=b.y,r[y+2]=b.z}function d(){const M=new C;for(let b=0;b<r.length;b+=3){M.x=r[b+0],M.y=r[b+1],M.z=r[b+2];const y=m(M)/2/Math.PI+.5,D=f(M)/Math.PI+.5;a.push(y,1-D)}g(),u()}function u(){for(let M=0;M<a.length;M+=6){const b=a[M+0],y=a[M+2],D=a[M+4],A=Math.max(b,y,D),w=Math.min(b,y,D);A>.9&&w<.1&&(b<.2&&(a[M+0]+=1),y<.2&&(a[M+2]+=1),D<.2&&(a[M+4]+=1))}}function h(M){r.push(M.x,M.y,M.z)}function p(M,b){const y=M*3;b.x=e[y+0],b.y=e[y+1],b.z=e[y+2]}function g(){const M=new C,b=new C,y=new C,D=new C,A=new Ae,w=new Ae,P=new Ae;for(let E=0,x=0;E<r.length;E+=9,x+=6){M.set(r[E+0],r[E+1],r[E+2]),b.set(r[E+3],r[E+4],r[E+5]),y.set(r[E+6],r[E+7],r[E+8]),A.set(a[x+0],a[x+1]),w.set(a[x+2],a[x+3]),P.set(a[x+4],a[x+5]),D.copy(M).add(b).add(y).divideScalar(3);const R=m(D);v(A,x+0,M,R),v(w,x+2,b,R),v(P,x+4,y,R)}}function v(M,b,y,D){D<0&&M.x===1&&(a[b]=M.x-1),y.x===0&&y.z===0&&(a[b]=D/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function f(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jr(e.vertices,e.indices,e.radius,e.details)}}class Kr extends jr{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Kr(e.radius,e.detail)}}class ii extends jr{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ii(e.radius,e.detail)}}class pn extends Ct{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const d=[],u=new C,h=new C,p=[],g=[],v=[],m=[];for(let f=0;f<=n;f++){const M=[],b=f/n;let y=0;f===0&&a===0?y=.5/t:f===n&&c===Math.PI&&(y=-.5/t);for(let D=0;D<=t;D++){const A=D/t;u.x=-e*Math.cos(s+A*r)*Math.sin(a+b*o),u.y=e*Math.cos(a+b*o),u.z=e*Math.sin(s+A*r)*Math.sin(a+b*o),g.push(u.x,u.y,u.z),h.copy(u).normalize(),v.push(h.x,h.y,h.z),m.push(A+y,1-b),M.push(l++)}d.push(M)}for(let f=0;f<n;f++)for(let M=0;M<t;M++){const b=d[f][M+1],y=d[f][M],D=d[f+1][M],A=d[f+1][M+1];(f!==0||a>0)&&p.push(b,y,A),(f!==n-1||c<Math.PI)&&p.push(y,D,A)}this.setIndex(p),this.setAttribute("position",new Et(g,3)),this.setAttribute("normal",new Et(v,3)),this.setAttribute("uv",new Et(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ft extends Ct{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],c=[],l=[],d=new C,u=new C,h=new C;for(let p=0;p<=n;p++)for(let g=0;g<=s;g++){const v=g/s*r,m=p/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(v),u.y=(e+t*Math.cos(m))*Math.sin(v),u.z=t*Math.sin(m),o.push(u.x,u.y,u.z),d.x=e*Math.cos(v),d.y=e*Math.sin(v),h.subVectors(u,d).normalize(),c.push(h.x,h.y,h.z),l.push(g/s),l.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=s;g++){const v=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,f=(s+1)*(p-1)+g,M=(s+1)*p+g;a.push(v,m,M),a.push(m,f,M)}this.setIndex(a),this.setAttribute("position",new Et(o,3)),this.setAttribute("normal",new Et(c,3)),this.setAttribute("uv",new Et(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ft(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class yt extends Fs{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Ie(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ie(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=iu,this.normalScale=new Ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Zr extends mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ie(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Q_ extends Zr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ie(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Fa=new st,kl=new C,Bl=new C;class Mu{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ae(512,512),this.map=null,this.mapPass=null,this.matrix=new st,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vc,this._frameExtents=new Ae(1,1),this._viewportCount=1,this._viewports=[new nt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;kl.setFromMatrixPosition(e.matrixWorld),t.position.copy(kl),Bl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Bl),t.updateMatrixWorld(),Fa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Fa),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Fa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const zl=new st,bs=new C,ka=new C;class ex extends Mu{constructor(){super(new Yt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ae(4,2),this._viewportCount=6,this._viewports=[new nt(2,1,1,1),new nt(0,1,1,1),new nt(3,1,1,1),new nt(1,1,1,1),new nt(3,0,1,1),new nt(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),bs.setFromMatrixPosition(e.matrixWorld),n.position.copy(bs),ka.copy(n.position),ka.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(ka),n.updateMatrixWorld(),s.makeTranslation(-bs.x,-bs.y,-bs.z),zl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(zl)}}class Kn extends Zr{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new ex}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class tx extends Mu{constructor(){super(new mu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class nx extends Zr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.shadow=new tx}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class ix extends Zr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class sx{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Hl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Hl();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Hl(){return performance.now()}const Gl=new st;class rx{constructor(e,t,n=0,s=1/0){this.ray=new mc(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new gc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Gl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Gl),this}intersectObject(e,t=!0,n=[]){return Xo(e,this,n,t),n.sort(Vl),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Xo(e[s],this,n,t);return n.sort(Vl),n}}function Vl(i,e){return i.distance-e.distance}function Xo(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Xo(r[a],e,t,!0)}}class Wl{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Ot(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class ax extends Ei{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:oc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=oc);const Xl={type:"change"},yc={type:"start"},Su={type:"end"},cr=new mc,$l=new Yn,ox=Math.cos(70*Fp.DEG2RAD),_t=new C,Ht=2*Math.PI,tt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ba=1e-6;class cx extends ax{constructor(e,t=null){super(e,t),this.state=tt.NONE,this.enabled=!0,this.target=new C,this.cursor=new C,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ki.ROTATE,MIDDLE:Ki.DOLLY,RIGHT:Ki.PAN},this.touches={ONE:Yi.ROTATE,TWO:Yi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new C,this._lastQuaternion=new Si,this._lastTargetPosition=new C,this._quat=new Si().setFromUnitVectors(e.up,new C(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Wl,this._sphericalDelta=new Wl,this._scale=1,this._panOffset=new C,this._rotateStart=new Ae,this._rotateEnd=new Ae,this._rotateDelta=new Ae,this._panStart=new Ae,this._panEnd=new Ae,this._panDelta=new Ae,this._dollyStart=new Ae,this._dollyEnd=new Ae,this._dollyDelta=new Ae,this._dollyDirection=new C,this._mouse=new Ae,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=dx.bind(this),this._onPointerDown=lx.bind(this),this._onPointerUp=ux.bind(this),this._onContextMenu=_x.bind(this),this._onMouseWheel=px.bind(this),this._onKeyDown=mx.bind(this),this._onTouchStart=gx.bind(this),this._onTouchMove=vx.bind(this),this._onMouseDown=hx.bind(this),this._onMouseMove=fx.bind(this),this._interceptControlDown=xx.bind(this),this._interceptControlUp=yx.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Xl),this.update(),this.state=tt.NONE}update(e=null){const t=this.object.position;_t.copy(t).sub(this.target),_t.applyQuaternion(this._quat),this._spherical.setFromVector3(_t),this.autoRotate&&this.state===tt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Ht:n>Math.PI&&(n-=Ht),s<-Math.PI?s+=Ht:s>Math.PI&&(s-=Ht),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(_t.setFromSpherical(this._spherical),_t.applyQuaternion(this._quatInverse),t.copy(this.target).add(_t),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=_t.length();a=this._clampDistance(o*this._scale);const c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const o=new C(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new C(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=_t.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(cr.origin.copy(this.object.position),cr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(cr.direction))<ox?this.object.lookAt(this.target):($l.setFromNormalAndCoplanarPoint(this.object.up,this.target),cr.intersectPlane($l,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ba||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ba||this._lastTargetPosition.distanceToSquared(this.target)>Ba?(this.dispatchEvent(Xl),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Ht/60*this.autoRotateSpeed*e:Ht/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){_t.setFromMatrixColumn(t,0),_t.multiplyScalar(-e),this._panOffset.add(_t)}_panUp(e,t){this.screenSpacePanning===!0?_t.setFromMatrixColumn(t,1):(_t.setFromMatrixColumn(t,0),_t.crossVectors(this.object.up,_t)),_t.multiplyScalar(e),this._panOffset.add(_t)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;_t.copy(s).sub(this.target);let r=_t.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Ht*this._rotateDelta.x/t.clientHeight),this._rotateUp(Ht*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(Ht*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(-Ht*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(Ht*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(-Ht*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Ht*this._rotateDelta.x/t.clientHeight),this._rotateUp(Ht*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Ae,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function lx(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function dx(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function ux(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Su),this.state=tt.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function hx(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ki.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=tt.DOLLY;break;case Ki.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=tt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=tt.ROTATE}break;case Ki.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=tt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=tt.PAN}break;default:this.state=tt.NONE}this.state!==tt.NONE&&this.dispatchEvent(yc)}function fx(i){switch(this.state){case tt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case tt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case tt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function px(i){this.enabled===!1||this.enableZoom===!1||this.state!==tt.NONE||(i.preventDefault(),this.dispatchEvent(yc),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Su))}function mx(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function gx(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Yi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=tt.TOUCH_ROTATE;break;case Yi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=tt.TOUCH_PAN;break;default:this.state=tt.NONE}break;case 2:switch(this.touches.TWO){case Yi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=tt.TOUCH_DOLLY_PAN;break;case Yi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=tt.TOUCH_DOLLY_ROTATE;break;default:this.state=tt.NONE}break;default:this.state=tt.NONE}this.state!==tt.NONE&&this.dispatchEvent(yc)}function vx(i){switch(this._trackPointer(i),this.state){case tt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case tt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case tt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case tt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=tt.NONE}}function _x(i){this.enabled!==!1&&i.preventDefault()}function xx(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function yx(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Jr(i,e){const t=document.createElement("canvas");t.width=i,t.height=e;const n=t.getContext("2d");if(!n)throw new Error("canvas 2d context unavailable");return[t,n]}function Qr(i){let e=i>>>0;return()=>(e=e*1664525+1013904223>>>0,e/4294967296)}function Mx(){const[t,n]=Jr(2048,1024),s=Qr(20260807),r=n.createLinearGradient(0,0,0,1024);r.addColorStop(0,"#02040c"),r.addColorStop(.45,"#060d1f"),r.addColorStop(.75,"#0a1428"),r.addColorStop(1,"#03050d"),n.fillStyle=r,n.fillRect(0,0,2048,1024);const a=[{x:.22,y:.34,r:.22,color:"rgba(56,217,232,0.10)"},{x:.38,y:.62,r:.16,color:"rgba(160,107,255,0.10)"},{x:.58,y:.28,r:.2,color:"rgba(56,120,255,0.09)"},{x:.74,y:.55,r:.18,color:"rgba(160,107,255,0.08)"},{x:.9,y:.38,r:.14,color:"rgba(56,217,232,0.09)"},{x:.5,y:.82,r:.15,color:"rgba(39,75,143,0.10)"}];for(const c of a){const l=n.createRadialGradient(c.x*2048,c.y*1024,0,c.x*2048,c.y*1024,c.r*2048);l.addColorStop(0,c.color),l.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=l,n.fillRect(0,0,2048,1024)}for(let c=0;c<900;c+=1){const l=s()*2048,d=s()*1024,u=.6+s()*1.6,h=s(),p=h<.6?"255,255,255":h<.8?"180,220,255":"255,220,180",g=.35+s()*.6;n.fillStyle=`rgba(${p},${g})`,n.beginPath(),n.arc(l,d,u,0,Math.PI*2),n.fill()}for(let c=0;c<26;c+=1){const l=s()*2048,d=s()*1024,u=2+s()*2.5,h=s()<.5?"56,217,232":"255,255,255",p=n.createRadialGradient(l,d,0,l,d,u*6);p.addColorStop(0,`rgba(${h},0.9)`),p.addColorStop(.25,`rgba(${h},0.35)`),p.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=p,n.fillRect(l-u*6,d-u*6,u*12,u*12),n.fillStyle="#ffffff",n.beginPath(),n.arc(l,d,u,0,Math.PI*2),n.fill()}const o=new Yr(t);return o.colorSpace=Dt,o}function Sx(){const[e,t]=Jr(1024,1024),n=Qr(19860713);t.fillStyle="#1a2231",t.fillRect(0,0,1024,1024);for(let r=0;r<12e3;r+=1){const a=n()*1024,o=n()*1024,l=n()<.5?18+n()*14:34+n()*18;t.fillStyle=`rgb(${l},${l+4},${l+10})`,t.fillRect(a,o,1+n()*2,1+n()*2)}for(let r=0;r<46;r+=1){const a=n()*1024,o=n()*1024,c=8+n()*34;t.fillStyle="rgba(10,14,24,0.85)",t.beginPath(),t.arc(a,o,c,0,Math.PI*2),t.fill(),t.strokeStyle="rgba(110,126,150,0.5)",t.lineWidth=2+n()*3,t.beginPath(),t.arc(a,o,c*.82,0,Math.PI*2),t.stroke()}for(let r=0;r<30;r+=1){let a=n()*1024,o=n()*1024;t.strokeStyle="rgba(8,11,18,0.8)",t.lineWidth=1+n()*1.5,t.beginPath(),t.moveTo(a,o);const c=4+Math.floor(n()*6);for(let l=0;l<c;l+=1)a+=(n()-.5)*70,o+=(n()-.5)*70,t.lineTo(a,o);t.stroke()}const s=new Yr(e);return s.colorSpace=Dt,s.wrapS=s.wrapT=rs,s.repeat.set(2,2),s}function Ex(){const[e,t]=Jr(1024,1024),n=Qr(991023);t.fillStyle="#232d3d",t.fillRect(0,0,1024,1024),t.strokeStyle="#2f3d53",t.lineWidth=3;const s=128;for(let a=0;a<=1024;a+=s)t.beginPath(),t.moveTo(a,0),t.lineTo(a,1024),t.stroke();for(let a=0;a<=1024;a+=s)t.beginPath(),t.moveTo(0,a),t.lineTo(1024,a),t.stroke();for(let a=0;a<1024/s;a+=1)for(let o=0;o<1024/s;o+=1){const c=a*s,l=o*s,d=n(),u=t.createLinearGradient(c,l,c,l+s);u.addColorStop(0,`rgba(255,255,255,${.03+d*.03})`),u.addColorStop(1,"rgba(0,0,0,0.05)"),t.fillStyle=u,t.fillRect(c+4,l+4,s-8,s-8)}t.fillStyle="#4a5a74";for(let a=0;a<520;a+=1){const o=8+n()*1008,c=8+n()*1008;t.beginPath(),t.arc(o,c,2+n()*1.5,0,Math.PI*2),t.fill()}for(let a=0;a<10;a+=1){const o=n()<.5,c=n()*1024,l=n()*1024,d=100+n()*180,u=n(),h=u<.5?"56,217,232":u<.8?"160,107,255":"255,159,67";t.strokeStyle=`rgba(${h},0.55)`,t.lineWidth=4,t.beginPath(),o?(t.moveTo(c,l),t.lineTo(c+d,l)):(t.moveTo(c,l),t.lineTo(c,l+d)),t.stroke()}for(let a=0;a<300;a+=1){const o=n()*1024,c=n()*1024;t.fillStyle=`rgba(10,14,22,${.1+n()*.2})`,t.fillRect(o,c,2+n()*8,1+n()*3)}const r=new Yr(e);return r.colorSpace=Dt,r.wrapS=r.wrapT=rs,r.repeat.set(1,1),r}function bx(i){const[t,n]=Jr(1024,1024),s=Qr(i.seed??991023);n.fillStyle=i.base,n.fillRect(0,0,1024,1024);for(let o=0;o<48;o+=1){const c=s()*1024,l=s()*1024,d=90+s()*180,u=s()<.55,h=.03+s()*.05,p=n.createRadialGradient(c,l,0,c,l,d);p.addColorStop(0,u?`rgba(0,0,0,${h})`:`rgba(255,255,255,${h*.7})`),p.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=p,n.fillRect(0,0,1024,1024)}n.strokeStyle=i.panelLine,n.lineWidth=3;const r=128;for(let o=0;o<=1024;o+=r)n.beginPath(),n.moveTo(o,0),n.lineTo(o,1024),n.stroke();for(let o=0;o<=1024;o+=r)n.beginPath(),n.moveTo(0,o),n.lineTo(1024,o),n.stroke();for(let o=0;o<1024/r;o+=1)for(let c=0;c<1024/r;c+=1){const l=o*r,d=c*r,u=n.createLinearGradient(l,d,l,d+r);u.addColorStop(0,`rgba(255,255,255,${.025+s()*.025})`),u.addColorStop(1,"rgba(0,0,0,0.06)"),n.fillStyle=u,n.fillRect(l+4,d+4,r-8,r-8),n.fillStyle="#5a6270";for(const[h,p]of[[l+10,d+10],[l+r-10,d+10],[l+10,d+r-10],[l+r-10,d+r-10]])n.beginPath(),n.arc(h,p,4,0,Math.PI*2),n.fill()}n.strokeStyle="rgba(0,0,0,0.30)";for(let o=0;o<120;o+=1){const c=s()*1024,l=s()*1024;n.lineWidth=1+s()*1.2,n.beginPath(),n.moveTo(c,l),n.lineTo(c+(s()-.5)*70,l+(s()-.5)*70),n.stroke()}for(let o=0;o<9e3;o+=1){const c=s();n.fillStyle=c<.5?`rgba(0,0,0,${.05+s()*.08})`:`rgba(255,255,255,${.02+s()*.04})`,n.fillRect(s()*1024,s()*1024,1+s()*1.5,1+s()*1.5)}if(i.accent){const o=i.accentChance??.2;for(let c=0;c<14;c+=1){if(s()>o)continue;const l=s()<.5,d=s()*1024,u=s()*1024,h=90+s()*160;n.strokeStyle=i.accent,n.globalAlpha=.35+s()*.25,n.lineWidth=3,n.beginPath(),l?(n.moveTo(d,u),n.lineTo(d+h,u)):(n.moveTo(d,u),n.lineTo(d,u+h)),n.stroke(),n.globalAlpha=1}}n.strokeStyle="rgba(255,255,255,0.05)";for(let o=0;o<26;o+=1){const c=Math.floor(s()*4),l=s()*1024,d=30+s()*120;n.lineWidth=2+s()*3,n.beginPath(),c===0?(n.moveTo(l,0),n.lineTo(l+d,2)):c===1?(n.moveTo(l,1024),n.lineTo(l+d,1022)):c===2?(n.moveTo(0,l),n.lineTo(2,l+d)):(n.moveTo(1024,l),n.lineTo(1022,l+d)),n.stroke()}const a=new Yr(t);return a.colorSpace=Dt,a.wrapS=a.wrapT=rs,a.repeat.set(1,1),a}const vn={color:{bgDeep:"#14161a",bgPanel:"#1b1e24",bgPanelSolid:"#15171c",line:"#2a2f38",text:"#e8e9eb",muted:"#9aa1ac",gold:"#c9a227",cyan:"#3fe0d8",purple:"#a78bfa",orange:"#e8862e",green:"#5fbf77",danger:"#ff6b5e",dust:"#8a93a0"},radius:2,panelWidth:"300px",navWidth:"64px",topbarHeight:"56px"};function Tx(){const i=document.documentElement.style,e=vn.color;i.setProperty("--bg-deep",e.bgDeep),i.setProperty("--bg-panel",e.bgPanel),i.setProperty("--bg-panel-solid",e.bgPanelSolid),i.setProperty("--line",e.line),i.setProperty("--text",e.text),i.setProperty("--muted",e.muted),i.setProperty("--gold",e.gold),i.setProperty("--cyan",e.cyan),i.setProperty("--purple",e.purple),i.setProperty("--warn",e.orange),i.setProperty("--ok",e.green),i.setProperty("--danger",e.danger),i.setProperty("--radius",`${vn.radius}px`),i.setProperty("--panel-w",vn.panelWidth),i.setProperty("--nav-w",vn.navWidth),i.setProperty("--topbar-h",vn.topbarHeight)}const Dr=new Map;function wx(i){let e=0;for(let t=0;t<i.length;t+=1)e=e*31+i.charCodeAt(t)>>>0;return e}function Hi(i,e,t){const n=`metal:${i}`,s=Dr.get(n);if(s)return s;const r={base:e,panelLine:"#3a414e",seed:wx(i)},a=new yt({map:bx(r),metalness:.85,roughness:.45});return Dr.set(n,a),a}const At=vn.color,ql=new WeakSet;function Ln(i){ql.has(i)||(ql.add(i),i.dispose())}const ut={hullDark:Hi("hull-dark","#20242b"),hullSteel:Hi("hull-steel","#2e333c"),drillSteel:Hi("drill-steel","#3a404b"),gold:new yt({color:At.gold,metalness:1,roughness:.32}),cyanEnergy:new Mt({color:At.cyan}),purpleCrystal:new yt({color:At.purple,emissive:At.purple,emissiveIntensity:1.1,metalness:.3,roughness:.2}),orangeBeacon:new yt({color:At.orange,emissive:At.orange,emissiveIntensity:1,metalness:.2,roughness:.4}),orangeWarn:new yt({color:At.orange,emissive:At.orange,emissiveIntensity:.35,metalness:.4,roughness:.5}),dust:new Mt({color:At.dust}),disposeAll(){for(const i of Dr.values())Ln(i);Dr.clear(),Ln(this.gold),Ln(this.cyanEnergy),Ln(this.purpleCrystal),Ln(this.orangeBeacon),Ln(this.orangeWarn),Ln(this.dust),this.hullDark=Hi("hull-dark","#20242b"),this.hullSteel=Hi("hull-steel","#2e333c"),this.drillSteel=Hi("drill-steel","#3a404b"),this.gold=new yt({color:At.gold,metalness:1,roughness:.32}),this.cyanEnergy=new Mt({color:At.cyan}),this.purpleCrystal=new yt({color:At.purple,emissive:At.purple,emissiveIntensity:1.1,metalness:.3,roughness:.2}),this.orangeBeacon=new yt({color:At.orange,emissive:At.orange,emissiveIntensity:1,metalness:.2,roughness:.4}),this.orangeWarn=new yt({color:At.orange,emissive:At.orange,emissiveIntensity:.35,metalness:.4,roughness:.5}),this.dust=new Mt({color:At.dust})}};function Ax(i){return 1-Math.pow(1-i,3)}function Cx(i,e,t,n){const s=3*i,r=3*(t-i)-s,a=1-s-r,o=3*e,c=3*(n-e)-o,l=1-o-c,d=p=>((a*p+r)*p+s)*p,u=p=>((l*p+c)*p+o)*p,h=p=>(3*a*p+2*r)*p+s;return p=>{if(p<=0)return 0;if(p>=1)return 1;let g=p;for(let v=0;v<10;v+=1){const m=d(g)-p;if(Math.abs(m)<1e-6)break;const f=h(g);if(Math.abs(f)<1e-6)break;g-=m/f}return u(g)}}const Rx=Cx(.34,1.56,.64,1);function es(i,e=!1){const t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,c=new Ct;let l=0;for(let d=0;d<i.length;++d){const u=i[d];let h=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const p in u.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(u.attributes[p]),h++}if(h!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const p in u.morphAttributes){if(!s.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+".  .morphAttributes must be consistent throughout all geometries."),null;a[p]===void 0&&(a[p]=[]),a[p].push(u.morphAttributes[p])}if(e){let p;if(t)p=u.index.count;else if(u.attributes.position!==void 0)p=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,p,d),l+=p}}if(t){let d=0;const u=[];for(let h=0;h<i.length;++h){const p=i[h].index;for(let g=0;g<p.count;++g)u.push(p.getX(g)+d);d+=i[h].attributes.position.count}c.setIndex(u)}for(const d in r){const u=Yl(r[d]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" attribute."),null;c.setAttribute(d,u)}for(const d in a){const u=a[d][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[d]=[];for(let h=0;h<u;++h){const p=[];for(let v=0;v<a[d].length;++v)p.push(a[d][v][h]);const g=Yl(p);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" morphAttribute."),null;c.morphAttributes[d].push(g)}}return c}function Yl(i){let e,t,n,s=-1,r=0;for(let l=0;l<i.length;++l){const d=i[l];if(e===void 0&&(e=d.array.constructor),e!==d.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=d.itemSize),t!==d.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=d.normalized),n!==d.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=d.gpuType),s!==d.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=d.count*t}const a=new e(r),o=new nn(a,t,n);let c=0;for(let l=0;l<i.length;++l){const d=i[l];if(d.isInterleavedBufferAttribute){const u=c/t;for(let h=0,p=d.count;h<p;h++)for(let g=0;g<t;g++){const v=d.getComponent(h,g);o.setComponent(h+u,g,v)}}else a.set(d.array,c);c+=d.count*t}return s!==void 0&&(o.gpuType=s),o}const Ts=50,jl=.8,Px=8;class Lx{constructor(){O(this,"mesh");O(this,"dummy",new mt);O(this,"pos",[]);O(this,"vel",[]);O(this,"life",[]);O(this,"acc",0);O(this,"active",!1);const e=new hs(.07,.16,5),t=new Mt({color:"#8a93a0"});this.mesh=new qr(e,t,Ts),this.mesh.instanceMatrix.setUsage(Wr),this.mesh.frustumCulled=!1;for(let n=0;n<Ts;n+=1)this.pos.push(new C),this.vel.push(new C),this.life.push(0),this.dummy.position.set(0,-100,0),this.dummy.scale.setScalar(.001),this.dummy.updateMatrix(),this.mesh.setMatrixAt(n,this.dummy.matrix)}setActive(e){if(this.active!==e&&(this.active=e,!e)){for(let t=0;t<Ts;t+=1)this.life[t]=0,this.dummy.position.set(0,-100,0),this.dummy.scale.setScalar(.001),this.dummy.updateMatrix(),this.mesh.setMatrixAt(t,this.dummy.matrix);this.mesh.instanceMatrix.needsUpdate=!0}}update(e,t){if(this.active){this.acc+=e;const n=1/Px;for(;this.acc>=n;)this.acc-=n,this.spawn(t)}for(let n=0;n<Ts;n+=1)if(!(this.life[n]<=0)){if(this.life[n]-=e,this.life[n]<=0){this.life[n]=0,this.dummy.position.set(0,-100,0),this.dummy.scale.setScalar(.001),this.dummy.updateMatrix(),this.mesh.setMatrixAt(n,this.dummy.matrix);continue}this.vel[n].y-=3*e,this.pos[n].addScaledVector(this.vel[n],e),this.syncInstance(n)}this.mesh.instanceMatrix.needsUpdate=!0}dispose(){this.mesh.geometry.dispose(),this.mesh.material.dispose()}spawn(e){let t=0,n=this.life[0];for(let s=1;s<Ts;s+=1)this.life[s]<n&&(n=this.life[s],t=s);this.pos[t].set(e.x+(Math.random()-.5)*.24,e.y+(Math.random()-.5)*.1,e.z+(Math.random()-.5)*.24),this.vel[t].set((Math.random()-.5)*.8,.5+Math.random()*.8,(Math.random()-.5)*.8),this.life[t]=jl,this.syncInstance(t)}syncInstance(e){const t=1-this.life[e]/jl;this.dummy.position.copy(this.pos[e]),this.dummy.scale.setScalar(Math.max(.001,1-t*.6)),this.dummy.rotation.set(t*3,t*2,0),this.dummy.updateMatrix(),this.mesh.setMatrixAt(e,this.dummy.matrix)}}function lr(i){const e=[];for(const n of i){const s=n.geo.clone();n.rot&&s.rotateX(n.rot[0]).rotateY(n.rot[1]).rotateZ(n.rot[2]),n.pos&&s.translate(n.pos[0],n.pos[1],n.pos[2]),e.push(s)}const t=es(e);for(const n of e)n.dispose();for(const n of i)n.geo.dispose();if(!t)throw new Error("excavator: mergeGeometries failed");return t}function Dx(i){const e=ut.hullDark,t=new Mn;i.add(t);const n=new xe(lr([{geo:new St(2.1,2.3,.5,6),pos:[0,.25,0]},{geo:new ft(2.2,1.2,1.9),pos:[0,1.35,0]},{geo:new ft(1.2,.7,1.3),pos:[.1,2.2,-.1]},{geo:new ft(.9,.8,1.4),pos:[-.55,1.45,-1.05]},{geo:new ft(.12,.5,1.2),pos:[1.15,1.5,.15]},{geo:new ft(.12,.5,1.2),pos:[-1.15,1.5,.15]},{geo:new ft(.12,.5,1.2),pos:[1.15,1.5,-.75]},{geo:new ft(.12,.5,1.2),pos:[-1.15,1.5,-.75]},{geo:new ft(1.15,.95,1.25),pos:[1.25,.95,.15]}]),e);n.castShadow=!0,t.add(n);const s=new xe(lr([{geo:new Ft(2.18,.07,6,24),pos:[0,.5,0],rot:[Math.PI/2,0,0]},{geo:new St(.3,.3,.06,6),pos:[.72,1.55,.96],rot:[Math.PI/2,0,0]}]),ut.gold);s.castShadow=!0,t.add(s);const r=ut.cyanEnergy.clone(),a=new xe(new Ft(1.86,.06,6,32),r);a.rotation.x=Math.PI/2,a.position.y=.72,t.add(a);const o=ut.purpleCrystal.clone(),c=new xe(new ii(.34),o);c.position.set(1.25,1.15,.15),t.add(c);const l=new xe(new ii(.2),o);l.position.set(1.35,.85,-.25),l.rotation.set(.5,.3,0),t.add(l);const d=ut.orangeBeacon.clone(),u=new xe(new pn(.12,10,10),d);u.position.set(0,2.65,0),t.add(u);const h=new Mn;h.position.set(-1.25,1.55,.35),h.rotation.z=-.5;const p=new xe(lr([{geo:new St(.16,.2,1.1,10),pos:[0,-.55,0]},{geo:new hs(.42,.9,10),pos:[0,-1.55,0],rot:[Math.PI,0,0]},{geo:new ft(.05,1.5,.14),pos:[0,-1.05,0],rot:[0,.7,0]},{geo:new ft(.05,1.5,.14),pos:[0,-1.05,0],rot:[0,-.7,0]}]),ut.drillSteel);p.castShadow=!0,h.add(p);const g=new xe(new Ft(.36,.055,6,12),ut.orangeWarn);g.position.y=-1.05,g.rotation.x=Math.PI/2,h.add(g);const v=new mt;v.position.set(0,-2.1,0),h.add(v),t.add(h);const m=new xe(lr([{geo:new ft(.35,.5,1),pos:[-1.05,1.7,.35],rot:[0,0,-.5]}]),ut.hullSteel);m.castShadow=!0,t.add(m);const f=new Kn(16777215,6,12,1.6);f.position.set(.3,2.4,.7),t.add(f);const M=new Lx;return i.add(M.mesh),{drill:h,crystalMat:o,beaconMat:d,energyMat:r,pulseGroup:t,light:f,dust:M,drillTip:v}}function Ix(i){const e=new xe(new St(2,2.2,.5,6),ut.hullDark);e.position.y=.25,e.castShadow=!0,i.add(e);const t=new xe(new Ft(2.06,.06,6,24),ut.gold);t.rotation.x=Math.PI/2,t.position.y=.5,i.add(t);const n=new xe(new St(.5,.68,1.7,10),ut.hullSteel);n.position.y=1.45,n.castShadow=!0,i.add(n);const s=new xe(new ft(.9,.7,.9),ut.hullDark);s.position.y=2.3,s.castShadow=!0,i.add(s);const r=new xe(new St(.28,.28,.05,6),ut.gold);r.rotation.x=Math.PI/2,r.position.set(0,2.3,.46),i.add(r);const a=new xe(new St(.04,.06,.9,8),ut.hullSteel);a.position.y=2.95,i.add(a);const o=new xe(new pn(.11,10,10),ut.orangeBeacon);o.position.y=3.4,i.add(o);const c=new ft(2.4,.28,.5).translate(-1.2,0,0),l=new ft(.5,.28,1.2).translate(1.2,0,0),d=es([c,l])??new Ct;c.dispose(),l.dispose();const u=new xe(d,ut.hullSteel);u.position.set(4.9,1.05,0),u.castShadow=!0,i.add(u);const h=new xe(new ft(2.4,.06,.12),ut.cyanEnergy);h.position.set(4.9,1.22,0),i.add(h);const p=new xe(new pn(.1,8,8),ut.cyanEnergy);p.position.set(4.9,1.35,0),i.add(p)}const $i=6,qn=1,un=1.38,Ux=.45,dr=new Ie(vn.color.cyan),ur=new Ie(vn.color.gold),Nx=new Ie(vn.color.danger),Ox=new C(0,1,0);class Fx{constructor(e){O(this,"length");O(this,"pts");O(this,"cum");this.pts=e,this.cum=[0];for(let t=1;t<e.length;t+=1)this.cum.push(this.cum[t-1]+e[t].distanceTo(e[t-1]));this.length=this.cum[this.cum.length-1]}pointAt(e,t){const n=Math.max(0,Math.min(this.length,e*this.length));let s=1;for(;s<this.cum.length-1&&this.cum[s]<n;)s+=1;const r=this.cum[s]-this.cum[s-1],a=r>1e-6?(n-this.cum[s-1])/r:0;t.lerpVectors(this.pts[s-1],this.pts[s],a)}}function Kl(i){return i.clone().normalize().multiplyScalar($i)}function kx(i,e,t){const n=[];let s=(i%(Math.PI*2)+Math.PI*2)%(Math.PI*2);const r=Math.PI*2;for(;s<r-1e-4;)n.push(new C(Math.cos(s)*e,t,Math.sin(s)*e)),s+=.35;return n.push(new C(e,t,0)),n}function Ps(i,e,t,n){const s=e.clone().sub(i),r=s.length(),a=new ft(r,n,t);return a.translate(r/2,0,0),a.rotateY(-Math.atan2(s.z,s.x)),a.translate(i.x,0,i.z),a}function Zl(i,e,t=.6){const n=i.clone().lerp(e,.5),s=n.clone().normalize(),r=n.clone().addScaledVector(s,-t),a=[],o=20;for(let c=0;c<=o;c+=1){const l=c/o,d=i.clone().lerp(r,l),u=r.clone().lerp(e,l);a.push(d.lerp(u,l))}return a}function Bx(i,e,t){const n=[];for(let s=1;s<i.length;s+=1)n.push(Ps(i[s-1],i[s],e,t));return es(n)??new Ct}function zx(i,e){if(e==="transport")return i<4;switch(i){case 0:return e==="excavator";case 1:return e==="he3Excavator";case 2:return e==="deuteriumExcavator";case 3:return e==="refinery";case 4:return e==="energyStation";default:return!1}}class Hx{constructor(){O(this,"group",new Mn);O(this,"ringGlowMat");O(this,"spokeGlowMats",[]);O(this,"cargoPods");O(this,"energyOrbs");O(this,"arrows");O(this,"loadPortals");O(this,"dummy",new mt);O(this,"sources",[]);O(this,"energyPath");O(this,"arrowDefs",[]);O(this,"dist",[]);O(this,"t",0);O(this,"congested",!1);const e=new xe(new Ft($i,.16,8,64),ut.hullSteel);e.rotation.x=Math.PI/2,e.position.y=qn,this.group.add(e),this.ringGlowMat=ut.cyanEnergy.clone(),this.ringGlowMat.transparent=!0;const t=new xe(new Ft($i+.2,.05,6,64),this.ringGlowMat);t.rotation.x=Math.PI/2,t.position.y=qn+.07,this.group.add(t);const n=[new C(-12,0,-7),new C(12,0,-7),new C(0,0,-14)],s=[new C(-10.75,0,-6.85),new C(10.75,0,-6.85),new C(.15,0,-12.75)],r=[],a=[];for(let M=0;M<n.length;M+=1){const b=s[M],y=Kl(n[M]),D=Zl(b,y);a.push(D),r.push({from:D[0],to:D[D.length-1]})}const o={from:new C(5.2,0,0),to:new C(1.05,0,0)};r.push(o);const c={from:new C(0,0,11),to:new C(0,0,6.3)};r.push(c);const l=[];l.push(Ps(r[3].from,r[3].to,.26,.14)),l.push(Ps(r[4].from,r[4].to,.26,.14));const d=new xe(es(l)??new Ct,ut.hullSteel);d.position.y=qn,this.group.add(d);for(let M=0;M<r.length;M+=1){const b=r[M],y=ut.cyanEnergy.clone();y.transparent=!0,M===4&&y.color.copy(ur);let D;if(M===3){const w=b.to.clone().sub(b.from).normalize(),P=new C(-w.z,0,w.x),E=[];for(const x of[-.16,.16]){const R=b.from.clone().addScaledVector(P,x),k=b.to.clone().addScaledVector(P,x);E.push(Ps(R,k,.16,.1))}D=es(E)??new Ct}else M<3?D=Bx(a[M],.22,.08):D=Ps(b.from,b.to,.14,.06);const A=new xe(D,y);A.position.y=M===3?qn+.2:qn+.07,this.group.add(A),this.spokeGlowMats.push(y)}const u=[];for(let M=0;M<s.length;M+=1){const b=s[M],y=b.clone().addScaledVector(r[M].to.clone().sub(r[M].from).normalize(),-.6);u.push(new St(.72,.82,.28,6).translate(b.x,.14,b.z)),u.push(new St(.07,.09,1.35,8).translate(y.x,.675,y.z))}const h=new C(1.05,0,0);u.push(new St(.72,.82,.28,6).translate(h.x,.14,h.z)),u.push(new St(.07,.09,1.35,8).translate(h.x-.55,.675,h.z));const p=new xe(es(u)??new Ct,ut.hullSteel);p.position.y=qn,this.group.add(p),this.loadPortals=this.makePods(new Ft(.55,.06,8,24),s.length+1,!0);for(let M=0;M<s.length;M+=1){const b=s[M],y=r[M].to.clone().sub(r[M].from).setY(0).normalize();this.dummy.position.set(b.x,qn+.38,b.z),this.dummy.quaternion.setFromUnitVectors(new C(0,0,1),y),this.dummy.scale.setScalar(1),this.dummy.updateMatrix(),this.loadPortals.setMatrixAt(M,this.dummy.matrix),this.loadPortals.setColorAt(M,dr)}{const M=o.to.clone().sub(o.from).setY(0).normalize();this.dummy.position.set(h.x,qn+.38,h.z),this.dummy.quaternion.setFromUnitVectors(new C(0,0,1),M),this.dummy.scale.setScalar(1),this.dummy.updateMatrix(),this.loadPortals.setMatrixAt(s.length,this.dummy.matrix),this.loadPortals.setColorAt(s.length,dr)}const g=[Math.atan2(-7,-12),Math.atan2(-7,12),Math.atan2(-14,0)];for(let M=0;M<n.length;M+=1){const b=s[M].clone().setY(un),y=Kl(n[M]).setY(un),D=kx(g[M],$i,un),w=[...Zl(b,y),...D,new C(6,un,0),new C(1.05,un,0)],P=new Fx(w);this.sources.push({path:P,clampDist:P.length-.95,spokeIndex:M}),this.dist.push(M*2.5)}this.energyPath={from:new C(0,un,11),to:new C(0,un,6.3)};for(let M=0;M<3;M+=1){const b=a[M];for(const y of[.3,.62]){const D=Math.round(y*(b.length-1)),A=b[Math.max(0,D-1)],w=b[Math.min(b.length-1,D+1)];this.arrowDefs.push({pos:b[D].clone().setY(un+.12),dir:w.clone().sub(A).setY(0).normalize(),gold:!1})}}const v=o.to.clone().sub(o.from).normalize();this.arrowDefs.push({pos:o.from.clone().lerp(o.to,.5).setY(un+.12),dir:v,gold:!1,delivery:!0});const m=c.to.clone().sub(c.from).normalize();this.arrowDefs.push({pos:c.from.clone().lerp(c.to,.5).setY(un+.12),dir:m,gold:!0});const f=[1.7,2.8,4.25,5.3,6.05];for(const M of f)this.arrowDefs.push({pos:new C(Math.cos(M)*$i,un+.12,Math.sin(M)*$i),dir:new C(-Math.sin(M),0,Math.cos(M)),gold:!1});this.arrows=this.makePods(new hs(.14,.3,4),this.arrowDefs.length,!1),this.cargoPods=this.makePods(new pn(.44,10,10),6,!0),this.energyOrbs=this.makePods(new pn(.24,10,10),2,!0)}update(e,t,n,s=null){this.congested=n,this.t+=e;const r=t>.001;if(r){const p=2.2+t*2.4;for(let g=0;g<this.sources.length;g+=1)this.dist[g]+=p*e}const a=n?Nx:dr,o=Ux+.08*Math.sin(this.t*2.5),c=r&&s!==null&&s!=="energyStation";for(let p=0;p<this.spokeGlowMats.length;p+=1){const g=this.spokeGlowMats[p],v=p===4,m=v?ur:a;let f;r?v?f=s==="energyStation"?1.1:.7+.2*Math.sin(this.t*5):p<3?f=n?.9:.8+.15*Math.sin(this.t*6):zx(p,s)?f=1.15+.05*Math.sin(this.t*6):c?f=.42+.08*Math.sin(this.t*3):f=n?.9:.6+.25*Math.sin(this.t*6):f=o,g.color.copy(m).multiplyScalar(f),g.opacity=r?1:.9}let l;r?s==="transport"||s==="refinery"?l=1.1:c?l=.5+.06*Math.sin(this.t*3):l=n?.9:.6+.25*Math.sin(this.t*6):l=o,this.ringGlowMat.color.copy(a).multiplyScalar(l),this.ringGlowMat.opacity=r?1:.9;let d=0;for(let p=0;p<this.sources.length;p+=1){const g=this.sources[p],v=g.path;for(let m=0;m<2;m+=1){let f=(this.dist[p]+m*v.length*.5)%v.length;n&&(f=Math.min(f,Math.max(0,g.clampDist-d*.35))),v.pointAt(f/v.length,this.dummy.position);let M=r?1:.001;r&&f>v.length-1.15&&(M=Math.max(.001,1-(f-(v.length-1.15))/1.15)),this.dummy.scale.setScalar(M),this.dummy.updateMatrix(),this.cargoPods.setMatrixAt(d,this.dummy.matrix),this.cargoPods.setColorAt(d,a),d+=1}}for(let p=0;p<2;p+=1){const g=(this.t*.6+p*.5)%1;this.dummy.position.lerpVectors(this.energyPath.from,this.energyPath.to,g),this.dummy.scale.setScalar(r?.9:.001),this.dummy.updateMatrix(),this.energyOrbs.setMatrixAt(p,this.dummy.matrix),this.energyOrbs.setColorAt(p,ur)}const u=r?n?.85:.8:o;for(let p=0;p<this.arrowDefs.length;p+=1){const g=this.arrowDefs[p];this.dummy.position.copy(g.pos),this.dummy.quaternion.setFromUnitVectors(Ox,g.dir),this.dummy.scale.setScalar(r?1:.55),this.dummy.updateMatrix(),this.arrows.setMatrixAt(p,this.dummy.matrix);const v=g.gold?ur:a;this.arrows.setColorAt(p,v.clone().multiplyScalar(u))}const h=r?n?.9:.8+.2*Math.sin(this.t*4):o;for(let p=0;p<this.loadPortals.count;p+=1)this.loadPortals.setColorAt(p,a.clone().multiplyScalar(h));this.loadPortals.instanceColor.needsUpdate=!0,this.cargoPods.instanceMatrix.needsUpdate=!0,this.energyOrbs.instanceMatrix.needsUpdate=!0,this.arrows.instanceMatrix.needsUpdate=!0,this.cargoPods.instanceColor.needsUpdate=!0,this.energyOrbs.instanceColor.needsUpdate=!0,this.arrows.instanceColor.needsUpdate=!0}makePods(e,t,n){const s=new qr(e,new Mt({color:16777215}),t);s.instanceMatrix.setUsage(Wr),s.frustumCulled=!1;for(let r=0;r<t;r+=1)this.dummy.position.set(0,-100,0),this.dummy.scale.setScalar(.001),this.dummy.quaternion.identity(),this.dummy.updateMatrix(),s.setMatrixAt(r,this.dummy.matrix),n&&s.setColorAt(r,dr);return this.group.add(s),s}}const hr=80,Jl=1.2,Gx=14;class Vx{constructor(){O(this,"group",new Mn);O(this,"core");O(this,"coreMat");O(this,"halo");O(this,"haloMat");O(this,"light");O(this,"particles");O(this,"particleMat");O(this,"dummy",new mt);O(this,"pPos",[]);O(this,"pVel",[]);O(this,"pLife",[]);O(this,"spawnAcc",0);O(this,"activity",0);const e=new xe(new St(1.6,1.9,.4,6),new yt({color:2305085,metalness:.7,roughness:.55}));e.position.y=.2,e.castShadow=!0,this.group.add(e),this.coreMat=new yt({color:10513407,emissive:6963156,emissiveIntensity:1,metalness:.3,roughness:.2}),this.core=new xe(new ii(.85),this.coreMat),this.core.position.y=2,this.core.castShadow=!0,this.group.add(this.core),this.haloMat=new Mt({color:8319968,transparent:!0,opacity:.6}),this.halo=new xe(new Ft(1.2,.06,8,40),this.haloMat),this.halo.position.y=2,this.halo.rotation.x=Math.PI/2.4,this.group.add(this.halo),this.light=new Kn(10120191,6,12,1.6),this.light.position.y=2.3,this.group.add(this.light),this.particleMat=new Mt({color:9099775,transparent:!0,opacity:.9}),this.particles=new qr(new pn(.09,6,6),this.particleMat,hr),this.particles.instanceMatrix.setUsage(Wr),this.particles.frustumCulled=!1;for(let t=0;t<hr;t+=1)this.pPos.push(new C),this.pVel.push(new C),this.pLife.push(0),this.hideInstance(t);this.particles.instanceMatrix.needsUpdate=!0,this.group.add(this.particles)}setActivity(e){this.activity=Math.max(0,Math.min(1,e))}update(e,t){const n=this.activity;this.core.rotation.y+=(.4+n*1.2)*e,this.core.rotation.x=Math.sin(t*.8)*.15;const s=.7+.3*Math.sin(t*Math.PI*2*(.6+n));if(this.coreMat.emissiveIntensity=.6+n*1.2*s,this.core.scale.setScalar(1+n*.12*s),this.halo.rotation.z+=(.6+n*2.4)*e,this.haloMat.opacity=.25+n*.55,this.haloMat.color.setHex(n>.5?10513407:8319968),this.light.intensity=4+n*16*s,this.light.color.setHex(n>.66?10513407:8317183),n>.02)for(this.spawnAcc+=e*Gx*n;this.spawnAcc>=1;)this.spawnAcc-=1,this.spawnParticle();for(let r=0;r<hr;r+=1)if(!(this.pLife[r]<=0)){if(this.pLife[r]-=e,this.pLife[r]<=0){this.hideInstance(r);continue}this.pVel[r].y+=.6*e,this.pPos[r].addScaledVector(this.pVel[r],e),this.syncInstance(r)}this.particles.instanceMatrix.needsUpdate=!0}dispose(){this.core.geometry.dispose(),this.coreMat.dispose(),this.halo.geometry.dispose(),this.haloMat.dispose(),this.particles.geometry.dispose(),this.particleMat.dispose(),this.group.traverse(e=>{const t=e;if(t===this.core||t===this.halo||t===this.particles)return;t.geometry&&t.geometry.dispose();const n=t.material;n&&n.dispose()})}spawnParticle(){let e=0,t=this.pLife[0];for(let r=1;r<hr;r+=1)this.pLife[r]<t&&(t=this.pLife[r],e=r);const n=Math.random()*Math.PI*2,s=.5+Math.random()*.6;this.pPos[e].set(Math.cos(n)*s,.6+Math.random()*.3,Math.sin(n)*s),this.pVel[e].set(Math.cos(n)*.3,.8+Math.random()*.7,Math.sin(n)*.3),this.pLife[e]=Jl,this.syncInstance(e)}syncInstance(e){const t=1-this.pLife[e]/Jl;this.dummy.position.copy(this.pPos[e]),this.dummy.scale.setScalar(Math.max(.001,(1-t)*(.6+this.activity*.8))),this.dummy.updateMatrix(),this.particles.setMatrixAt(e,this.dummy.matrix)}hideInstance(e){this.dummy.position.set(0,-100,0),this.dummy.scale.setScalar(.001),this.dummy.updateMatrix(),this.particles.setMatrixAt(e,this.dummy.matrix)}}const In={collapse:1.6,burst:.8,rebirth:1.8},ws=In.collapse+In.burst+In.rebirth;function Wx(i){const{collapse:e,burst:t,rebirth:n}=In;return i<0?{phase:"idle",phaseProgress:0,overall:0,elapsed:0}:i>=ws?{phase:"done",phaseProgress:1,overall:1,elapsed:ws}:i<e?{phase:"collapse",phaseProgress:i/e,overall:i/ws,elapsed:i}:i<e+t?{phase:"burst",phaseProgress:(i-e)/t,overall:i/ws,elapsed:i}:{phase:"rebirth",phaseProgress:(i-e-t)/n,overall:i/ws,elapsed:i}}const ui=240;class Xx{constructor(){O(this,"group",new Mn);O(this,"core");O(this,"coreMat");O(this,"halo");O(this,"haloMat");O(this,"light");O(this,"particles");O(this,"particleMat");O(this,"shell");O(this,"shellMat");O(this,"dummy",new mt);O(this,"pPos",[]);O(this,"pVel",[]);O(this,"pLife",[]);O(this,"active",!1);O(this,"startElapsed",0);this.coreMat=new yt({color:12577023,emissive:7002623,emissiveIntensity:1.2,metalness:.2,roughness:.25,transparent:!0,opacity:1}),this.core=new xe(new ii(1.2,0),this.coreMat),this.core.position.y=6,this.group.add(this.core),this.haloMat=new Mt({color:10154239,transparent:!0,opacity:.55}),this.halo=new xe(new Ft(1.8,.08,10,48),this.haloMat),this.halo.position.y=6,this.halo.rotation.x=Math.PI/2,this.group.add(this.halo),this.shellMat=new Mt({color:16777215,transparent:!0,opacity:0,wireframe:!0}),this.shell=new xe(new Kr(1,1),this.shellMat),this.shell.position.y=6,this.group.add(this.shell),this.light=new Kn(16777215,0,60,1.2),this.light.position.y=6,this.group.add(this.light),this.particleMat=new Mt({color:13626111,transparent:!0,opacity:.9}),this.particles=new qr(new pn(.08,6,6),this.particleMat,ui),this.particles.instanceMatrix.setUsage(Wr),this.particles.frustumCulled=!1;for(let e=0;e<ui;e+=1)this.pPos.push(new C),this.pVel.push(new C),this.pLife.push(0),this.hideInstance(e);this.particles.instanceMatrix.needsUpdate=!0,this.group.add(this.particles),this.group.visible=!1}isActive(){return this.active}start(e){this.active=!0,this.startElapsed=e,this.group.visible=!0;for(let t=0;t<ui;t+=1){const n=t/ui*Math.PI*2+Math.random()*.3,s=3+Math.random()*2.5;this.pPos[t].set(Math.cos(n)*s,6+(Math.random()-.5)*1.5,Math.sin(n)*s),this.pVel[t].set(-Math.cos(n)*1.8,-.3,-Math.sin(n)*1.8),this.pLife[t]=In.collapse+In.burst,this.syncInstance(t,1)}this.particles.instanceMatrix.needsUpdate=!0}update(e,t){if(!this.active)return;const n=t-this.startElapsed,s=Wx(n);switch(s.phase){case"collapse":this.updateCollapse(s.phaseProgress,e);break;case"burst":this.updateBurst(s.phaseProgress,e,n);break;case"rebirth":this.updateRebirth(s.phaseProgress,e);break;case"done":this.finish();return}for(let r=0;r<ui;r+=1){if(this.pLife[r]<=0)continue;this.pLife[r]-=e,this.pPos[r].addScaledVector(this.pVel[r],e),s.phase==="rebirth"&&this.pVel[r].multiplyScalar(.92);const a=Math.max(0,Math.min(1,this.pLife[r]/1.5));this.syncInstance(r,a),this.pLife[r]<=0&&this.hideInstance(r)}this.particles.instanceMatrix.needsUpdate=!0}updateCollapse(e,t){const n=1-e*.95;this.core.scale.setScalar(Math.max(.05,n)),this.core.rotation.y+=.04,this.coreMat.emissiveIntensity=1.2+e*2.2,this.coreMat.emissive.lerpColors(new Ie(7002623),new Ie(16777215),e),this.coreMat.opacity=1,this.halo.scale.setScalar(1-e*.6),this.haloMat.opacity=.55+e*.35,this.halo.rotation.z+=.05,this.shellMat.opacity=0,this.light.intensity=e*8}updateBurst(e,t,n){const s=e<.4?0:(e-.4)/.6;this.coreMat.opacity=s,this.core.scale.setScalar(.05+s*.95),this.coreMat.emissiveIntensity=3.4-s*2;const r=e<.3?e/.3:1-(e-.3)/.7;this.light.intensity=r*220;const a=1+e*30;if(this.shell.scale.setScalar(a),this.shellMat.opacity=(1-e)*.6,this.shell.rotation.y+=.02,this.shell.rotation.x+=.015,this.halo.scale.setScalar(.4+e*.6),this.haloMat.opacity=.35+e*.4,n-In.collapse<.05)for(let o=0;o<ui;o+=1){const c=Math.random()*Math.PI*2,l=(Math.random()-.5)*.8,d=6+Math.random()*5;this.pVel[o].set(Math.cos(c)*d,l*d+1.5,Math.sin(c)*d),this.pLife[o]=In.burst+In.rebirth}}updateRebirth(e,t){this.coreMat.opacity=1,this.core.scale.setScalar(1+(1-e)*.5),this.coreMat.emissiveIntensity=2-e*.8,this.coreMat.emissive.lerpColors(new Ie(16777215),new Ie(7002623),e),this.core.rotation.y+=.02,this.halo.scale.setScalar(1),this.haloMat.opacity=.55-e*.2,this.haloMat.color.setHex(e>.5?10154239:16777215),this.shellMat.opacity=0,this.light.intensity=(1-e)*12}finish(){this.active=!1,this.group.visible=!1,this.core.scale.setScalar(1),this.coreMat.opacity=1,this.coreMat.emissiveIntensity=1.2,this.coreMat.emissive.setHex(7002623),this.halo.scale.setScalar(1),this.haloMat.opacity=.55,this.shellMat.opacity=0,this.light.intensity=0;for(let e=0;e<ui;e+=1)this.pLife[e]=0,this.hideInstance(e);this.particles.instanceMatrix.needsUpdate=!0}dispose(){this.core.geometry.dispose(),this.coreMat.dispose(),this.halo.geometry.dispose(),this.haloMat.dispose(),this.shell.geometry.dispose(),this.shellMat.dispose(),this.particles.geometry.dispose(),this.particleMat.dispose()}syncInstance(e,t){this.dummy.position.copy(this.pPos[e]),this.dummy.scale.setScalar(Math.max(.001,t)),this.dummy.updateMatrix(),this.particles.setMatrixAt(e,this.dummy.matrix)}hideInstance(e){this.dummy.position.set(0,-100,0),this.dummy.scale.setScalar(.001),this.dummy.updateMatrix(),this.particles.setMatrixAt(e,this.dummy.matrix)}}const za={ONLINE:5824673,LOCKED:4017251,BUILDING:16752451,UPGRADING:16752451,OFFLINE:4477030},Ha={excavator:[-12,-7],he3Excavator:[12,-7],deuteriumExcavator:[0,-14],transport:[6,0],refinery:[0,0],energyStation:[0,12]},Fr=class Fr{constructor(){O(this,"renderer",null);O(this,"scene",new Oa);O(this,"camera",null);O(this,"controls",null);O(this,"container",null);O(this,"labelsLayer",null);O(this,"visuals",new Map);O(this,"labelEls",new Map);O(this,"skyTex",null);O(this,"groundTex",null);O(this,"hullTex",null);O(this,"tracks",null);O(this,"reactorFX",null);O(this,"prestigeFX",null);O(this,"prestigeResolver",null);O(this,"prestigeOverlay",null);O(this,"reactorActivity",0);O(this,"transportCongested",!1);O(this,"raycaster",new rx);O(this,"pointer",new Ae);O(this,"tmpVec",new C);O(this,"clock",new sx);O(this,"raf",0);O(this,"running",!1);O(this,"selected",null);O(this,"onSelect",null);O(this,"resizeObserver",null);O(this,"activity",0);O(this,"bottlenecks",[]);O(this,"elapsed",0);O(this,"pulses",new Map);O(this,"energyBase",new Ie(vn.color.cyan));O(this,"statuses",{excavator:"ONLINE",he3Excavator:"LOCKED",deuteriumExcavator:"LOCKED",transport:"LOCKED",refinery:"LOCKED",energyStation:"LOCKED"});O(this,"onContextLost",e=>{e.preventDefault(),this.running=!1,cancelAnimationFrame(this.raf)});O(this,"onContextRestored",()=>{this.reinitGraphics()});O(this,"onPointerDown",e=>{var n,s;if(!this.renderer)return;const t=this.pick(e);t?(this.selected=t,(n=this.onSelect)==null||n.call(this,t)):(s=this.onSelect)==null||s.call(this,null)});O(this,"onPointerMove",e=>{if(!this.renderer)return;const t=this.pick(e);this.renderer.domElement.style.cursor=t?"pointer":"grab"});O(this,"frame",()=>{var t,n,s,r;if(!this.running)return;const e=Math.min(this.clock.getDelta(),.1);this.elapsed+=e;for(const a of this.visuals.values())a.excavator&&this.updateExcavator(a,e);for(const a of this.visuals.values()){const o=this.statuses[a.id];a.pulse+=e*3;const c=this.bottlenecks.includes(a.id)?16752451:za[o],l=o==="LOCKED"?.2:.55+.25*Math.sin(a.pulse);a.ringMat.color.setHex(c),a.ringMat.opacity=l}if((t=this.tracks)==null||t.update(e,this.activity,this.transportCongested,this.selected),(n=this.reactorFX)==null||n.update(e,this.elapsed),(s=this.prestigeFX)==null||s.update(e,this.elapsed),this.prestigeResolver&&this.prestigeFX&&!this.prestigeFX.isActive()){this.controls&&(this.controls.enabled=!0),this.hidePrestigeOverlay();const a=this.prestigeResolver;this.prestigeResolver=null,a()}(r=this.controls)==null||r.update(),this.updateLabels(),this.camera&&this.renderer&&this.renderer.render(this.scene,this.camera),this.running&&(this.raf=requestAnimationFrame(this.frame))})}init(e,t,n={}){this.container=e,this.labelsLayer=t,this.onSelect=n.onSelect??null,this.buildGraphics(),this.resizeObserver=new ResizeObserver(()=>this.handleResize()),this.resizeObserver.observe(e)}buildGraphics(){const e=this.container;if(!e)return;const t=new K_({antialias:!0});t.setPixelRatio(Math.min(window.devicePixelRatio,2)),t.setSize(Math.max(1,e.clientWidth),Math.max(1,e.clientHeight)),t.shadowMap.enabled=!0,t.shadowMap.type=Xd,t.domElement.style.width="100%",t.domElement.style.height="100%",e.appendChild(t.domElement),this.renderer=t;const n=new Yt(50,Math.max(1,e.clientWidth)/Math.max(1,e.clientHeight),.1,300);n.position.set(0,30,32),this.camera=n;const s=new cx(n,t.domElement);s.target.set(0,0,0),s.enableDamping=!0,s.dampingFactor=.08,s.minDistance=12,s.maxDistance=60,s.maxPolarAngle=1.35,this.controls=s,this.scene=new Oa,this.scene.background=new Ie(330260),this.scene.fog=new xc(330260,50,120),this.skyTex=Mx(),this.groundTex=Sx(),this.hullTex=Ex(),this.buildLights(),this.buildSkybox(),this.buildGround(),this.buildFacilities(),this.buildTracks(),this.buildReactor(),this.buildPrestigeFX(),t.domElement.addEventListener("pointerdown",this.onPointerDown),t.domElement.addEventListener("pointermove",this.onPointerMove),t.domElement.addEventListener("webglcontextlost",this.onContextLost),t.domElement.addEventListener("webglcontextrestored",this.onContextRestored)}teardownGraphics(){var t,n,s,r,a,o,c,l,d;cancelAnimationFrame(this.raf),(t=this.skyTex)==null||t.dispose(),this.skyTex=null,(n=this.groundTex)==null||n.dispose(),this.groundTex=null,(s=this.hullTex)==null||s.dispose(),this.hullTex=null;for(const u of this.visuals.values())(r=u.excavator)==null||r.dust.dispose(),u.group.traverse(h=>{const p=h;p.geometry&&p.geometry.dispose();const g=p.material;if(Array.isArray(g))for(const v of g)Ln(v);else g&&Ln(g)});this.visuals.clear(),this.tracks=null,(a=this.reactorFX)==null||a.dispose(),this.reactorFX=null,(o=this.prestigeFX)==null||o.dispose(),this.prestigeFX=null,this.prestigeResolver=null,this.hidePrestigeOverlay(),ut.disposeAll(),(c=this.controls)==null||c.dispose(),this.controls=null;const e=(l=this.renderer)==null?void 0:l.domElement;e&&(e.removeEventListener("pointerdown",this.onPointerDown),e.removeEventListener("pointermove",this.onPointerMove),e.removeEventListener("webglcontextlost",this.onContextLost),e.removeEventListener("webglcontextrestored",this.onContextRestored),e.remove()),(d=this.renderer)==null||d.dispose(),this.renderer=null;for(const u of this.labelEls.values())u.remove();this.labelEls.clear(),this.scene=new Oa}reinitGraphics(){var n,s;const e=((n=this.camera)==null?void 0:n.position.clone())??null,t=((s=this.controls)==null?void 0:s.target.clone())??null;this.teardownGraphics(),this.buildGraphics(),e&&this.camera&&this.camera.position.copy(e),t&&this.controls&&this.controls.target.copy(t),this.clock.getDelta(),this.running=!0,this.raf=requestAnimationFrame(this.frame)}start(){this.running||(this.running=!0,this.clock.start(),this.raf=requestAnimationFrame(this.frame))}setPaused(e){this.controls&&(this.controls.enabled=!e)}sync(e){var t;this.statuses=e.statuses,this.selected=e.selected,this.activity=e.transportActivity,this.bottlenecks=e.bottlenecks,this.transportCongested=e.transportCongested,this.reactorActivity=e.reactorActivity,(t=this.reactorFX)==null||t.setActivity(this.reactorActivity)}dispose(){var e;this.running=!1,(e=this.resizeObserver)==null||e.disconnect(),this.resizeObserver=null,this.teardownGraphics()}pick(e){if(!this.renderer||!this.camera)return null;const t=this.renderer.domElement.getBoundingClientRect();this.pointer.x=(e.clientX-t.left)/Math.max(1,t.width)*2-1,this.pointer.y=-((e.clientY-t.top)/Math.max(1,t.height))*2+1,this.raycaster.setFromCamera(this.pointer,this.camera);const n=[...this.visuals.values()].map(a=>a.group),s=this.raycaster.intersectObjects(n,!0);if(s.length===0)return null;let r=s[0].object;for(;r;){const a=r.userData.facilityId;if(a&&this.visuals.has(a))return a;r=r.parent}return null}handleResize(){if(!this.container||!this.renderer||!this.camera)return;const e=Math.max(1,this.container.clientWidth),t=Math.max(1,this.container.clientHeight);this.renderer.setSize(e,t),this.camera.aspect=e/t,this.camera.updateProjectionMatrix()}buildLights(){this.scene.add(new ix(3359846,.9));const e=new Q_(8952251,659226,.7);this.scene.add(e);const t=new nx(16774104,1.15);t.position.set(12,18,10),t.castShadow=!0,t.shadow.mapSize.set(1024,1024),t.shadow.camera.left=-16,t.shadow.camera.right=16,t.shadow.camera.top=16,t.shadow.camera.bottom=-16,t.shadow.camera.near=1,t.shadow.camera.far=60,t.shadow.bias=-4e-4,this.scene.add(t);const n=new Kn(3725800,40,30);n.position.set(-9,4.5,2),this.scene.add(n);const s=new Kn(8317183,30,26);s.position.set(-16,4.5,0),this.scene.add(s);const r=new Kn(10513407,40,30);r.position.set(9,4.5,-2),this.scene.add(r)}buildSkybox(){if(!this.skyTex)return;const e=new pn(170,40,24),t=new Mt({map:this.skyTex,side:kt,fog:!1}),n=new xe(e,t);this.scene.add(n)}buildGround(){const e=new Kr(20,1),t=new yt({map:this.groundTex??void 0,color:16777215,roughness:.95,metalness:.1,flatShading:!0}),n=new xe(e,t);n.scale.set(1,.28,1),n.position.y=-5,n.receiveShadow=!0,this.scene.add(n)}buildFacilities(){for(const e of tn){const t=new Mn,[n,s]=Ha[e];t.position.set(n,0,s),t.userData.facilityId=e;const r=this.buildFacilityMesh(e,t);this.scene.add(t),this.visuals.set(e,r),this.buildLabel(e)}}buildFacilityMesh(e,t){if(e==="excavator"){const l=Dx(t),d=new Mt({color:za.ONLINE,transparent:!0,opacity:.7}),u=new xe(new Ft(1.4,.05,10,48),d);u.rotation.x=Math.PI/2,u.position.y=2.75,t.add(u);const h=new xe(new St(2.35,2.35,5,12),new Mt({colorWrite:!1,depthWrite:!1}));return h.position.y=2.3,t.add(h),{id:e,group:t,ringMat:d,pips:[],pipPhase:0,pulse:Math.random()*6,excavator:l}}const n=l=>new yt({map:this.hullTex??void 0,color:l,metalness:.72,roughness:.35}),s=new xe(new St(1.9,2.1,.35,24),new yt({map:this.hullTex??void 0,color:2305085,metalness:.7,roughness:.55}));s.position.y=.18,t.add(s);const r=[];if(e==="he3Excavator"||e==="deuteriumExcavator"){const l=e==="he3Excavator",d=e==="deuteriumExcavator",u=d?9387855:l?4165535:6256276,h=d?16739166:l?8317183:3725800,p=new xe(new ft(2,1.3,1.8),n(u));p.position.y=1.15,t.add(p);const g=new xe(new hs(.55,1.5,12),n(d?13205391:l?8368317:10135480));g.position.y=.65,g.rotation.x=Math.PI,t.add(g);const v=new xe(new Ft(.48,.09,8,24),new yt({color:h,emissive:h,emissiveIntensity:1.2}));v.position.y=1.9,v.rotation.x=Math.PI/2,t.add(v);const m=new xe(new St(.04,.06,1.1,8),n(d?13205391:l?8368317:10135480));m.position.y=2.4,t.add(m);const f=new xe(new pn(.1,12,12),new yt({color:h,emissive:h,emissiveIntensity:1.6}));f.position.y=3,t.add(f)}if(e==="transport"&&Ix(t),e==="refinery"){const l=new xe(new ft(2,1.2,2),n(4930158));l.position.y=1.05,t.add(l);const d=new xe(new ii(.85),new yt({color:10513407,emissive:8077268,emissiveIntensity:1.35,metalness:.3,roughness:.2}));d.position.y=2.1,t.add(d);const u=new Kn(10513407,18,8);u.position.y=2.4,t.add(u)}if(e==="energyStation"){const l=new xe(new ii(.9),new yt({color:3790529,emissive:2078883,emissiveIntensity:1.5,metalness:.3,roughness:.2}));l.position.y=2.1,t.add(l);const d=new xe(new Ft(1.15,.07,8,32),new Mt({color:8319968}));d.position.y=2.1,d.rotation.x=Math.PI/2.6,t.add(d);const u=new Kn(3790529,20,9);u.position.y=2.4,t.add(u)}const a=new xe(new St(2.35,2.35,5,12),new Mt({colorWrite:!1,depthWrite:!1}));a.position.y=2.3,t.add(a);const o=new Mt({color:za.ONLINE,transparent:!0,opacity:.7}),c=new xe(new Ft(1.4,.05,10,48),o);return c.rotation.x=Math.PI/2,c.position.y=2.75,t.add(c),{id:e,group:t,ringMat:o,pips:r,pipPhase:Math.random()*Math.PI*2,pulse:Math.random()*6}}buildTracks(){this.tracks=new Hx,this.scene.add(this.tracks.group)}buildReactor(){this.reactorFX=new Vx,this.reactorFX.group.position.set(16,0,8),this.scene.add(this.reactorFX.group)}buildPrestigeFX(){this.prestigeFX=new Xx,this.scene.add(this.prestigeFX.group)}playPrestigeSequence(){return this.prestigeFX?(this.prestigeFX.start(this.elapsed),this.controls&&(this.controls.enabled=!1),this.showPrestigeOverlay(),new Promise(e=>{this.prestigeResolver=e})):Promise.resolve()}showPrestigeOverlay(){if(this.prestigeOverlay)return;const e=document.createElement("div");e.className="prestige-interaction-lock",e.style.cssText="position:fixed;inset:0;z-index:9999;pointer-events:auto;background:transparent;cursor:wait;",e.setAttribute("aria-hidden","true"),document.body.appendChild(e),this.prestigeOverlay=e}hidePrestigeOverlay(){this.prestigeOverlay&&(this.prestigeOverlay.remove(),this.prestigeOverlay=null)}buildLabel(e){if(!this.labelsLayer)return;const t=document.createElement("div");t.className="facility-label",t.dataset.facility=e;const n=document.createElement("span");n.className="label-status",t.append(document.createTextNode(sn[e].name)),t.append(n),this.labelsLayer.appendChild(t),this.labelEls.set(e,t)}updateLabels(){if(!this.labelsLayer||!this.camera)return;const e=this.camera,t=this.labelsLayer.getBoundingClientRect(),n=(s,r,a,o=[0,0])=>{this.tmpVec.set(s,3.6,r);const c=this.tmpVec.clone().project(e);if(!(c.z>-1&&c.z<1)){a.style.display="none";return}a.style.display="block",a.style.left=`${(c.x+1)/2*t.width+o[0]}px`,a.style.top=`${(1-c.y)/2*t.height+o[1]}px`};for(const s of tn){const r=this.visuals.get(s),a=this.labelEls.get(s);if(!r||!a)continue;const o=Fr.LABEL_OFFSETS[s]??[0,0];n(Ha[s][0],Ha[s][1],a,o);const c=this.statuses[s],l=a.querySelector(".label-status");l&&(l.textContent=c,l.className=`label-status ${c}`),a.dataset.status=c,a.classList.toggle("selected",this.selected===s)}}pulseFacility(e){this.pulses.set(e,this.elapsed)}updateExcavator(e,t){const n=e.excavator;if(!n)return;const s=this.statuses[e.id]==="ONLINE";s&&(n.drill.rotation.y+=2.5*t);const r=this.elapsed;n.crystalMat.emissiveIntensity=s?1.1+.3*Math.sin(r*Math.PI*2):.45,n.beaconMat.emissiveIntensity=s&&Math.floor(r*2)%2===0?2:.2;let a=.5+.2*Math.sin(r*Math.PI*1.6),o=1,c=0;const l=this.pulses.get(e.id);if(l!==void 0){const d=this.elapsed-l;d<.6&&(a=Math.max(a,.5+.7*Math.sin(Math.PI*(d/.6)))),d<.45&&(o=1+(Rx(d/.45)-1)*.6),d<.5&&(c=.5*(1-d/.5)),d>=.6&&this.pulses.delete(e.id)}n.energyMat.color.copy(this.energyBase).multiplyScalar(a),n.pulseGroup.scale.setScalar(o),n.light.intensity=6*(1+c),n.drillTip.getWorldPosition(this.tmpVec),n.dust.setActive(s),n.dust.update(t,this.tmpVec)}};O(Fr,"LABEL_OFFSETS",{transport:[0,-48],refinery:[0,-48],energyStation:[0,-48]});let $o=Fr,mi=null,ls=!0;try{ls=localStorage.getItem("starminer-sfx")!=="0"}catch{}function Mc(){if(!ls)return null;if(!mi){const i=window.AudioContext??window.webkitAudioContext;if(!i)return null;mi=new i}return mi.state==="suspended"&&mi.resume(),mi}function $x(){const i=()=>{Mc()};document.addEventListener("pointerdown",i),document.addEventListener("keydown",i)}function qx(i){ls=i;try{localStorage.setItem("starminer-sfx",i?"1":"0")}catch{}!i&&mi&&mi.suspend()}function Ql(){return ls}function Yx(){return qx(!ls),ls}function Eu(i,e,t,n={}){const s=Mc();if(!s)return;const r=s.currentTime+(n.delay??0),a=s.createOscillator(),o=s.createGain();a.type=n.type??"sine",a.frequency.setValueAtTime(Math.max(1,i),r),e!==i&&a.frequency.exponentialRampToValueAtTime(Math.max(1,e),r+t);const c=n.attack??.008;o.gain.setValueAtTime(1e-4,r),o.gain.exponentialRampToValueAtTime(n.gain??.14,r+c),o.gain.exponentialRampToValueAtTime(1e-4,r+t),a.connect(o),o.connect(s.destination),a.start(r),a.stop(r+t+.03)}function jx(){Eu(880,640,.04,{type:"square",gain:.045})}function Kx(){const i=Mc();if(!i)return;const e=i.currentTime,t=i.createOscillator(),n=i.createGain();t.type="sine",t.frequency.setValueAtTime(220,e),t.frequency.exponentialRampToValueAtTime(440,e+.12),n.gain.setValueAtTime(1e-4,e),n.gain.exponentialRampToValueAtTime(.16,e+.12),n.gain.exponentialRampToValueAtTime(1e-4,e+.52),t.connect(n),n.connect(i.destination),t.start(e),t.stop(e+.55)}function Zx(){[392,494,587].forEach((e,t)=>{Eu(e,e,.18,{attack:.02,gain:.14,delay:t*.09,type:"triangle"})})}class Jx{constructor(){O(this,"creditsEl");O(this,"stardustEl");O(this,"crystalEl");O(this,"energyEl");this.creditsEl=fr("stat-credits"),this.stardustEl=fr("stat-stardust"),this.crystalEl=fr("stat-crystal"),this.energyEl=fr("stat-energy")}update(e){if(this.creditsEl.textContent=Pe(e.credits),this.stardustEl.textContent=Pe(e.stardust),this.crystalEl.textContent=Pe(e.crystal),!e.facilities.energyStation.unlocked)this.energyEl.textContent="—",this.energyEl.className="stat-value energy-val";else if(e.research.includes("energyReserve"))this.energyEl.textContent=`${Pe(e.energy)} / ${kr}`,this.energyEl.className="stat-value energy-val";else{const n=en(e,"energyStation",Date.now())-ic(e),s=n>=0?"+":"";this.energyEl.textContent=`${s}${Pe(n)}/秒`,this.energyEl.className=`stat-value ${n<0?"danger":"energy-val"}`}}}function fr(i){const e=document.getElementById(i);if(!e)throw new Error(`missing #${i}`);return e}function Qx(i,e,t=Date.now()){const n=i.facilities[e];if(!n.unlocked||n.level>=Ko)return null;const s=Ka(i,e,n.level,t),r=Ka(i,e,n.level+1,t),a=r-s,o=zr(i,e),c=Hr(i,e),l=e==="refinery"?ec(i)-sc(i)*qa:qa,d=a>0?Math.ceil(o/(a*l)):null;return{currentRate:s,nextRate:r,deltaRate:a,costCredits:o,costCrystal:c,valuePerUnit:l,paybackSeconds:d}}function ey(i,e){if(e==="refinery"){if(!i.facilities.refinery.unlocked)return null;if(!i.facilities.transport.unlocked)return"等待原料：需先解锁磁轨运输线（600 信用点）"}if(e==="energyStation"){if(!i.facilities.energyStation.unlocked)return null;if(!dt(i,"energyReserve"))return"研究「能源储备」后，盈余能量会存入储备池，并可释放获得 30 秒 ×1.2 加成"}return null}function ed(i,e,t=450){i.classList.remove(e),i.offsetWidth,i.classList.add(e),window.setTimeout(()=>i.classList.remove(e),t)}function ty(i,e,t){const n=t>0?Math.max(0,Math.min(100,e/t*100)):0;i.style.width=`${n}%`,i.classList.toggle("full",n>=99.5)}function td(i,e,t){i.classList.toggle("bottleneck",t),e.classList.toggle("on",t),e.textContent=t?"→":""}function ny(i,e,t,n){i.innerHTML="";const s=document.createElement("span");s.className="up-cur",s.textContent=e;const r=document.createElement("span");r.className="up-arrow",r.textContent=" → ";const a=document.createElement("span");a.className="up-next",a.textContent=t;const o=document.createElement("span");o.className="up-delta",o.textContent=n,i.append(s,r,a,o)}class iy{constructor(e){O(this,"name");O(this,"status");O(this,"level");O(this,"rate");O(this,"capacity");O(this,"bottleneck");O(this,"hintEl");O(this,"actionBtn");O(this,"costHint");O(this,"sellStardust");O(this,"sellStardustAll");O(this,"sellCrystal");O(this,"sellCrystalAll");O(this,"qtyStardust");O(this,"qtyCrystal");O(this,"heldStardust");O(this,"heldCrystal");O(this,"crystalPriceLabel");O(this,"energyBtns");O(this,"autoSellEl");O(this,"autoSellKeepEl");O(this,"autoSellCrystalEl");O(this,"autoSellCrystalKeepEl");O(this,"autoSellHintEl");O(this,"energyEffectEl");O(this,"upgradePreviewEl");O(this,"releaseBtn");O(this,"capacityLabel");O(this,"bottleneckLabel");O(this,"capacityFill");O(this,"bottleneckRow");O(this,"bottleneckArrow");O(this,"facilityCard");O(this,"rateTween",null);var t;this.name=We("facility-name"),this.status=We("facility-status"),this.level=We("facility-level"),this.rate=We("facility-rate"),this.capacity=We("facility-capacity"),this.bottleneck=We("bottleneck-text"),this.hintEl=We("facility-hint"),this.actionBtn=We("btn-facility"),this.costHint=We("facility-cost"),this.sellStardust=We("btn-sell-stardust"),this.sellStardustAll=We("btn-sell-stardust-all"),this.sellCrystal=We("btn-sell-crystal"),this.sellCrystalAll=We("btn-sell-crystal-all"),this.qtyStardust=We("qty-stardust"),this.qtyCrystal=We("qty-crystal"),this.heldStardust=We("held-stardust"),this.heldCrystal=We("held-crystal"),this.crystalPriceLabel=We("crystal-price-label"),this.energyBtns=[...document.querySelectorAll(".energy-btn")],this.autoSellEl=We("auto-sell-stardust"),this.autoSellKeepEl=We("auto-sell-keep"),this.autoSellCrystalEl=We("auto-sell-crystal"),this.autoSellCrystalKeepEl=We("auto-sell-crystal-keep"),this.autoSellHintEl=We("auto-sell-hint"),this.energyEffectEl=We("energy-effect"),this.upgradePreviewEl=We("upgrade-preview"),this.releaseBtn=We("btn-release-energy"),this.capacityLabel=((t=We("facility-capacity").parentElement)==null?void 0:t.querySelector("dt"))??We("facility-capacity"),this.bottleneckLabel=We("bottleneck-row").querySelector("dt")??We("bottleneck-text"),this.capacityFill=We("capacity-fill"),this.bottleneckRow=We("bottleneck-row"),this.bottleneckArrow=We("bottleneck-arrow"),this.facilityCard=We("facility-card"),this.actionBtn.addEventListener("click",()=>e.onFacilityAction()),this.energyBtns.forEach(n=>n.addEventListener("click",()=>e.onEnergy(n.dataset.strategy))),this.sellStardust.addEventListener("click",()=>e.onSell("stardust",pr(this.qtyStardust))),this.sellStardustAll.addEventListener("click",()=>e.onSell("stardust")),this.sellCrystal.addEventListener("click",()=>e.onSell("crystal",pr(this.qtyCrystal))),this.sellCrystalAll.addEventListener("click",()=>e.onSell("crystal")),this.autoSellEl.addEventListener("change",()=>e.onAutoSell("stardust",this.autoSellEl.checked,mr(this.autoSellKeepEl))),this.autoSellKeepEl.addEventListener("change",()=>e.onAutoSell("stardust",this.autoSellEl.checked,mr(this.autoSellKeepEl))),this.autoSellCrystalEl.addEventListener("change",()=>e.onAutoSell("crystal",this.autoSellCrystalEl.checked,mr(this.autoSellCrystalKeepEl))),this.autoSellCrystalKeepEl.addEventListener("change",()=>e.onAutoSell("crystal",this.autoSellCrystalEl.checked,mr(this.autoSellCrystalKeepEl))),this.releaseBtn.addEventListener("click",()=>e.onReleaseEnergy())}update(e,t,n){const s=e.facilities[t],r=sn[t];this.name.textContent=r.name,this.status.textContent=s.unlocked?"ONLINE":"LOCKED",this.status.className=`status-badge ${s.unlocked?"ONLINE":"LOCKED"}`,this.level.textContent=s.unlocked?`Lv.${s.level} / 5`:"—";const a=en(e,t),o=Wi(e,t);if(this.rateTween&&s.unlocked){const g=Math.min(1,(performance.now()-this.rateTween.start)/this.rateTween.duration);this.rate.textContent=ms(this.rateTween.from+(this.rateTween.to-this.rateTween.from)*Ax(g),r.rateUnit),g>=1&&(this.rateTween=null)}else this.rateTween=null,this.rate.textContent=s.unlocked?ms(a,r.rateUnit):"—";if(this.capacityLabel.textContent=t==="energyStation"?"储备":"容量",this.capacity.textContent=s.unlocked?t==="energyStation"?dt(e,"energyReserve")?`${Pe(e.energy)} / ${kr}`:"未解锁（研究能源储备）":Pe(o):"—",t!=="energyStation"&&s.unlocked){const g=r.produces==="stardust"?e.stardust:r.produces==="crystal"?e.crystal:0;ty(this.capacityFill,g,o)}else this.capacityFill.style.width="0%",this.capacityFill.classList.remove("full");const c=(n==null?void 0:n.bottlenecks.includes(t))??!1;if(t==="energyStation"&&s.unlocked){const g=en(e,"energyStation",Date.now()),v=ic(e),m=v>g;this.bottleneckLabel.textContent="收支",this.bottleneck.textContent=`产出 ${g.toFixed(2)} / 消耗 ${v.toFixed(2)} /秒`,this.bottleneck.style.color=m?"var(--warn)":"",td(this.bottleneckRow,this.bottleneckArrow,m)}else this.bottleneckLabel.textContent="瓶颈",this.bottleneck.textContent=c?"下游处理不足":"无",this.bottleneck.style.color=c?"var(--warn)":"",td(this.bottleneckRow,this.bottleneckArrow,c);if(this.releaseBtn.hidden=!(t==="energyStation"&&s.unlocked&&dt(e,"energyReserve")),!this.releaseBtn.hidden){const g=Cd(e,Date.now());this.releaseBtn.disabled=!g.ok,this.releaseBtn.textContent=`释放储备（-${Ar} 能量）`,this.releaseBtn.title=g.ok?"30 秒全设施 ×1.2，冷却 60 秒":g.reason??""}const l=gd[e.energyStrategy][t],d=Math.round((l-1)*100);this.energyEffectEl.textContent=d===0?`${vr[e.energyStrategy]}：对${r.name}无加成`:`${vr[e.energyStrategy]}：对${r.name} ${d>0?"+":""}${d}%`;const u=ey(e,t);if(this.hintEl.hidden=!u,this.hintEl.textContent=u??"",s.unlocked)if(s.level>=5)this.actionBtn.textContent="已满级",this.actionBtn.disabled=!0,this.costHint.textContent="",this.upgradePreviewEl.hidden=!0;else{const g=zr(e,t),v=Hr(e,t);this.actionBtn.textContent=v>0?`升级（U）· ${Pe(g)} 信用点 + ${Pe(v)} 晶体`:`升级（U）· ${Pe(g)} 信用点`;const m=wd(e,t);this.actionBtn.disabled=!m.ok,this.costHint.textContent=m.ok?"":m.reason??"";const f=t==="energyStation"?null:Qx(e,t);if(f&&f.deltaRate>0){this.upgradePreviewEl.hidden=!1;const M=f.paybackSeconds===null?"":`，约 ${Jn(f.paybackSeconds*1e3)}回本`;ny(this.upgradePreviewEl,ms(a,r.rateUnit),ms(a+f.deltaRate,r.rateUnit),`+${ms(f.deltaRate,r.rateUnit)}${M}`)}else this.upgradePreviewEl.hidden=!0}else{const g=tc(e,t),v=nc(e,t);this.actionBtn.textContent=v>0?`解锁（${Pe(g)} 信用点 + ${Pe(v)} 晶体）`:`解锁（${Pe(g)} 信用点）`;const m=Ad(e,t);this.actionBtn.disabled=!m.ok,this.costHint.textContent=m.ok?"":m.reason??"",this.upgradePreviewEl.hidden=!0}this.energyBtns.forEach(g=>{g.classList.toggle("active",g.dataset.strategy===e.energyStrategy),g.title=`${vr[g.dataset.strategy]}（快捷键 ${g.dataset.strategy==="excavation"?"1":g.dataset.strategy==="balanced"?"2":"3"}）`}),this.heldStardust.textContent=Pe(e.stardust),this.heldCrystal.textContent=Pe(e.crystal),this.crystalPriceLabel.textContent=String(ec(e)),this.autoSellEl.checked=e.settings.autoSellStardust,this.autoSellCrystalEl.checked=e.settings.autoSellCrystal,this.autoSellHintEl.hidden=!e.settings.autoSellStardust&&!e.settings.autoSellCrystal,document.activeElement!==this.autoSellKeepEl&&(this.autoSellKeepEl.value=String(e.settings.stardustKeepAmount)),document.activeElement!==this.autoSellCrystalKeepEl&&(this.autoSellCrystalKeepEl.value=String(e.settings.crystalKeepAmount));const h=pr(this.qtyStardust),p=pr(this.qtyCrystal);this.sellStardust.textContent=h>0?`出售 ${Pe(h)}`:"出售",this.sellStardust.disabled=e.stardust<=0||h<=0,this.sellStardustAll.disabled=e.stardust<=0,this.sellCrystal.textContent=p>0?`出售 ${Pe(p)}`:"出售",this.sellCrystal.disabled=e.crystal<=0||p<=0,this.sellCrystalAll.disabled=e.crystal<=0}flashUpgrade(e,t){this.rateTween={from:e,to:t,start:performance.now(),duration:600},ed(this.actionBtn,"btn-jump",450),ed(this.facilityCard,"card-pulse",600)}}function We(i){const e=document.getElementById(i);if(!e)throw new Error(`missing #${i}`);return e}function pr(i){const e=Number.parseInt(i.value,10);return Number.isFinite(e)&&e>0?e:0}function mr(i){const e=Number.parseInt(i.value,10);return Number.isFinite(e)&&e>=0?e:50}const nd=2*Math.PI*26;var ud;class sy{constructor(e){O(this,"body");O(this,"heldIsotope");O(this,"heldAntimatter");O(this,"heldDarkmatter");O(this,"reactorStatus");O(this,"buffRows",[]);O(this,"targetBtns",[]);O(this,"dispatchBtn");O(this,"exploreStatus");O(this,"exploreRing");O(this,"exploreLabel");O(this,"exploreRemain");O(this,"exchangeRows",[]);O(this,"selectedTarget",((ud=eo[0])==null?void 0:ud.id)??"");this.cbs=e;const t=document.getElementById("reactor-body");if(!t)throw new Error("missing #reactor-body");this.body=t,this.body.innerHTML=this.renderShell(),this.heldIsotope=this.byId("reactor-isotope"),this.heldAntimatter=this.byId("reactor-antimatter"),this.heldDarkmatter=this.byId("reactor-darkmatter"),this.reactorStatus=this.byId("reactor-status"),this.buildBuffRows(),this.buildExploration(),this.buildExchangeRows()}setVisible(e){const t=document.getElementById("reactor-card");t&&(t.hidden=!e)}update(e,t,n){this.heldIsotope.textContent=Pe(Math.floor(xi(e,"isotope"))),this.heldAntimatter.textContent=Pe(Math.floor(xi(e,"antimatter"))),this.heldDarkmatter.textContent=Pe(Math.floor(xi(e,"darkmatter")));const s=t.reactorActivity(n);if(s<=0)this.reactorStatus.textContent="待机",this.reactorStatus.className="reactor-status muted";else{const r=Math.round(s*100);this.reactorStatus.textContent=`运行中 ${r}%`,this.reactorStatus.className="reactor-status active"}this.updateBuffs(e,t,n),this.updateExploration(e,t,n),this.updateExchange(e,t)}renderShell(){return`
      <div class="reactor-held">
        <span class="rh-item"><span class="rh-label">同位素</span><span class="rh-val cyan" id="reactor-isotope">0</span></span>
        <span class="rh-item"><span class="rh-label">反物质</span><span class="rh-val purple" id="reactor-antimatter">0</span></span>
        <span class="rh-item"><span class="rh-label">暗物质</span><span class="rh-val" id="reactor-darkmatter">0</span></span>
        <span class="reactor-status muted" id="reactor-status">待机</span>
      </div>

      <div class="reactor-section">
        <h3 class="reactor-h3">增益 buff</h3>
        <div id="reactor-buffs"></div>
      </div>

      <div class="reactor-section">
        <h3 class="reactor-h3">深空探索</h3>
        <div id="reactor-targets"></div>
        <div class="reactor-explore-status" id="reactor-explore-status"></div>
      </div>

      <div class="reactor-section">
        <h3 class="reactor-h3">碎片兑换</h3>
        <div id="reactor-exchange"></div>
      </div>`}buildBuffRows(){const e=this.byId("reactor-buffs");for(const t of Bd){const n=document.createElement("div");n.className="buff-row",n.innerHTML=`
        <div class="buff-head">
          <span class="buff-name">${t.name}</span>
          <span class="buff-cost" data-cost></span>
        </div>
        <div class="buff-desc">${t.description}</div>
        <div class="buff-active" data-active hidden>
          <div class="buff-bar-track"><div class="buff-bar-fill" data-bar></div></div>
          <span class="buff-remain" data-remain></span>
        </div>
        <button class="btn buff-btn" type="button" data-buff="${t.id}">激活</button>`,e.appendChild(n),this.buffRows.push({defId:t.id,btn:n.querySelector(".buff-btn"),costEl:n.querySelector("[data-cost]"),activeEl:n.querySelector("[data-active]"),bar:n.querySelector("[data-bar]"),remainEl:n.querySelector("[data-remain]")})}e.addEventListener("click",t=>{const n=t.target.closest(".buff-btn");n!=null&&n.dataset.buff&&this.cbs.onActivateBuff(n.dataset.buff)})}buildExploration(){var t;const e=this.byId("reactor-targets");for(const n of eo){const s=document.createElement("button");s.type="button",s.className="target-btn",s.dataset.target=n.id,s.innerHTML=`
        <span class="target-name">${n.name}</span>
        <span class="target-meta">${n.riskLabel}风险 · ${Jn(n.durationMs)} · 产 ${((t=_n(n.reward.resourceId))==null?void 0:t.name)??n.reward.resourceId} ×${n.reward.amount}</span>`,s.addEventListener("click",()=>{this.selectedTarget=n.id,this.refreshTargetSelection()}),e.appendChild(s),this.targetBtns.push(s)}this.refreshTargetSelection(),this.dispatchBtn=document.createElement("button"),this.dispatchBtn.type="button",this.dispatchBtn.className="btn primary dispatch-btn",this.dispatchBtn.textContent="派遣探索",this.dispatchBtn.addEventListener("click",()=>this.cbs.onDispatch(this.selectedTarget)),e.appendChild(this.dispatchBtn),this.exploreStatus=this.byId("reactor-explore-status"),this.exploreStatus.innerHTML=`
      <div class="explore-active" data-explore-active hidden>
        <svg class="explore-ring" viewBox="0 0 60 60" width="60" height="60">
          <circle class="explore-ring-bg" cx="30" cy="30" r="26" />
          <circle class="explore-ring-fg" cx="30" cy="30" r="26" data-ring />
        </svg>
        <div class="explore-info">
          <span class="explore-label" data-explore-label></span>
          <span class="explore-remain" data-explore-remain></span>
        </div>
      </div>`,this.exploreRing=this.exploreStatus.querySelector("[data-ring]"),this.exploreRing.style.strokeDasharray=String(nd),this.exploreLabel=this.exploreStatus.querySelector("[data-explore-label]"),this.exploreRemain=this.exploreStatus.querySelector("[data-explore-remain]")}buildExchangeRows(){var t;const e=this.byId("reactor-exchange");for(const n of zd){const s=document.createElement("div");s.className="exchange-row";const r=((t=_n(n.cost.resourceId))==null?void 0:t.name)??n.cost.resourceId,a=n.produces.map(o=>{var c;return`${((c=_n(o.resourceId))==null?void 0:c.name)??o.resourceId} ×${o.amount}`}).join(" + ");s.innerHTML=`
        <div class="exchange-info">
          <span class="exchange-name">${n.name}</span>
          <span class="exchange-flow">${r} ×${n.cost.amount} → ${a}</span>
        </div>
        <button class="btn exchange-btn" type="button" data-recipe="${n.id}">兑换</button>`,e.appendChild(s),this.exchangeRows.push({recipeId:n.id,btn:s.querySelector(".exchange-btn"),costEl:s.querySelector(".exchange-flow")})}e.addEventListener("click",n=>{const s=n.target.closest(".exchange-btn");s!=null&&s.dataset.recipe&&this.cbs.onExchange(s.dataset.recipe)})}updateBuffs(e,t,n){var s;for(const r of this.buffRows){const a=Rr[r.defId],o=((s=_n(a.cost.resourceId))==null?void 0:s.name)??a.cost.resourceId;r.costEl.textContent=`${o} ×${a.cost.amount}`;const c=t.getActiveBuff(r.defId);if(c){const l=Math.max(0,c.expiresAt-n),d=a.durationMs,u=d>0?Math.min(100,l/d*100):0;r.activeEl.hidden=!1,r.bar.style.width=`${u}%`,r.remainEl.textContent=Jn(l),r.btn.textContent="运行中",r.btn.disabled=!0,r.btn.classList.add("running")}else{r.activeEl.hidden=!0,r.btn.classList.remove("running");const l=t.canActivateBuff(e,r.defId,n);r.btn.textContent="激活",r.btn.disabled=!l.ok,r.btn.title=l.ok?"":l.reason??""}}}updateExploration(e,t,n){const s=t.getActiveExplorations()[0],r=this.exploreStatus.querySelector("[data-explore-active]");if(s){const a=Ls[s.targetId],o=s.completesAt-s.startedAt,c=Math.min(o,n-s.startedAt),l=o>0?c/o:0,d=Math.max(0,s.completesAt-n);r.hidden=!1,this.exploreRing.style.strokeDashoffset=String(nd*(1-l)),this.exploreLabel.textContent=a?a.name:s.targetId,this.exploreRemain.textContent=`剩余 ${Jn(d)}`,this.dispatchBtn.disabled=!0,this.dispatchBtn.textContent="探索进行中",this.targetBtns.forEach(u=>u.disabled=!0)}else{r.hidden=!0,this.dispatchBtn.textContent="派遣探索";const a=t.canDispatch(e,this.selectedTarget);this.dispatchBtn.disabled=!a.ok,this.dispatchBtn.title=a.ok?"":a.reason??"",this.targetBtns.forEach(o=>o.disabled=!1)}}updateExchange(e,t){for(const n of this.exchangeRows){const s=t.canExchange(e,n.recipeId);n.btn.disabled=!s.ok,n.btn.title=s.ok?"":s.reason??""}}refreshTargetSelection(){this.targetBtns.forEach(e=>{e.classList.toggle("selected",e.dataset.target===this.selectedTarget)})}byId(e){const t=document.getElementById(e);if(!t)throw new Error(`missing #${e}`);return t}}function ry(i){return qi.map((e,t)=>{const n=qi.indexOf(i),s=t<n?"done":t===n?"current":"pending",r=t<n?"✓":String(t+1);return`<li class="ceremony-step-mark ${s}"><span class="mark">${r}</span><span class="step-name">${Hf[e]}</span></li>`}).join("")}function ay(i,e){const t=Math.max(0,e-i.createdAt),n=tn.map(s=>{const r=i.facilityLevels[s];return`<div class="row"><dt>${sn[s].name}</dt><dd>Lv.${r}</dd></div>`}).join("");return`
    <p class="muted-text">回顾本轮（第 ${i.achievementCount>0,"一世"}）的星际开拓历程：</p>
    <div class="offline-list">
      <div class="row"><dt>游戏时长</dt><dd>${Jn(t)}</dd></div>
      <div class="row"><dt>信用点</dt><dd class="gold">${Pe(i.credits)}</dd></div>
      <div class="row"><dt>星尘矿</dt><dd class="cyan">${Pe(i.stardust)}</dd></div>
      <div class="row"><dt>晶体</dt><dd class="purple">${Pe(i.crystal)}</dd></div>
      <div class="row"><dt>同位素</dt><dd class="cyan">${Pe(i.isotope)}</dd></div>
      <div class="row"><dt>反物质</dt><dd class="cyan">${Pe(i.antimatter)}</dd></div>
      <div class="row"><dt>暗物质</dt><dd class="cyan">${Pe(i.darkmatter)}</dd></div>
    </div>
    <div class="offline-list ceremony-sub">
      <div class="row"><dt>已解锁设施</dt><dd>${i.facilityCount} / ${tn.length}</dd></div>
      ${n}
      <div class="row"><dt>完成研究</dt><dd>${i.researchCount} 项</dd></div>
      <div class="row"><dt>达成成就</dt><dd>${i.achievementCount} 项</dd></div>
    </div>
    <p class="muted-text">转生将重置以上全部进度，换取永久星核加成。</p>`}function oy(i,e){return`
    <p class="muted-text">星核按本轮资源、设施等级、研究进度综合结算：</p>
    <div class="offline-list">
      ${i.resourceItems.map(n=>`<div class="row"><dt>${n.label} ×${Pe(n.amount)}</dt><dd>× ${n.rate.toFixed(n.rate<.01?4:3)} → <b class="gold">${n.points.toFixed(2)}</b></dd></div>`).join("")}
      <div class="row"><dt>设施等级 Σ(Lv-1) = ${i.facility.totalLevelsAboveOne}</dt><dd>× ${i.facility.rate} → <b class="gold">${i.facility.points}</b></dd></div>
      <div class="row"><dt>研究 ×${i.research.count}</dt><dd>× ${i.research.rate} → <b class="gold">${i.research.points}</b></dd></div>
    </div>
    <div class="ceremony-total">
      <span>总点数</span><b>${i.totalPoints.toFixed(2)}</b>
      <span>星核（向下取整）</span><b class="gold big">+${Pe(i.stardustEarned)}</b>
    </div>
    <p class="muted-text">转生后等级 Lv.${e.newPrestigeLevel}，星核余额 ${Pe(e.newStardustBalance)}。</p>`}function cy(i,e){const t=e.length>0?e.map(n=>`<div class="row"><dt>${n.name}</dt><dd>${n.description}</dd></div>`).join(""):'<div class="row"><dt>暂无永久加成</dt><dd>转生后可在星核商店解锁永久 buff</dd></div>';return`
    <p class="muted-text">转生后 Lv.${i.newPrestigeLevel}，以下永久加成将生效：</p>
    <div class="offline-list">
      ${t}
    </div>
    <p class="muted-text" style="margin-top:10px">同时将失去：</p>
    <div class="offline-list ceremony-loss">
      <div class="row"><dt>资源归零</dt><dd>${i.resets.resourceIds.length} 项（信用点/星尘/晶体/能量/同位素/反物质/暗物质等）</dd></div>
      <div class="row"><dt>设施重置</dt><dd>${i.resets.facilityCount} 项（等级回到 1）</dd></div>
      <div class="row"><dt>研究清空</dt><dd>${i.resets.researchCount} 项</dd></div>
      <div class="row"><dt>成就清空</dt><dd>${i.resets.achievementCount} 项</dd></div>
    </div>
    <p class="ceremony-warn">此操作不可撤销，确认后将播放转生仪式并进入新的一世。</p>`}function ly(i){const e=document.getElementById("modal-root");if(!e)return;document.dispatchEvent(new CustomEvent("modal:close"));const t=document.createElement("div");t.className="modal-backdrop ceremony-backdrop";const n=document.createElement("div");n.className="modal ceremony-modal";let s="review",r=!1;const a=()=>{const d=s==="review"?ay(i.review,i.now):s==="settlement"?oy(i.breakdown,i.preview):cy(i.preview,i.bonuses);n.innerHTML=`
      <h2>转生仪式</h2>
      <ol class="ceremony-steps">${ry(s)}</ol>
      <div class="ceremony-body">${d}</div>`},o=document.createElement("div");o.className="modal-actions",t.append(n,o),e.appendChild(t);const c=()=>{r||(r=!0,t.remove(),document.dispatchEvent(new CustomEvent("modal:closed")))},l=()=>{o.innerHTML="";const d=qi.indexOf(s);if(d>0){const h=document.createElement("button");h.type="button",h.className="btn",h.textContent="上一步",h.addEventListener("click",()=>{s=qi[d-1],a(),l()}),o.appendChild(h)}const u=document.createElement("button");if(u.type="button",u.className="btn ghost",u.textContent="取消",u.addEventListener("click",()=>{c(),i.handlers.onCancel()}),o.appendChild(u),d<qi.length-1){const h=document.createElement("button");h.type="button",h.className="btn primary",h.textContent="下一步",h.addEventListener("click",()=>{s=qi[d+1],a(),l()}),o.appendChild(h)}else{const h=document.createElement("button");h.type="button",h.className="btn primary",h.textContent="确认转生",h.addEventListener("click",()=>{c(),i.handlers.onConfirm()}),o.appendChild(h)}};t.addEventListener("click",d=>{d.target===t&&(c(),i.handlers.onCancel())}),a(),l(),document.dispatchEvent(new CustomEvent("modal:open"))}function De(i,e="info"){const t=document.getElementById("toasts");if(!t)return;const n=document.createElement("div");n.className=`toast${e==="error"?" error":""}`,n.textContent=i,t.appendChild(n),window.setTimeout(()=>n.remove(),3200)}const bu=["economy","production","research","facility","prestige"],Tu={economy:"经济",production:"生产",research:"研究",facility:"设施",prestige:"转生"};function dy(i,e){var s;if(Ut(i,e.id)>=e.maxLevel)return{purchaseState:"maxed",lockReason:`已满级（${e.maxLevel} 级）`};for(const r of e.prerequisites){const a=Ut(i,r.itemId);if(a<r.level)return{purchaseState:"locked",lockReason:`需要${((s=On[r.itemId])==null?void 0:s.name)??r.itemId}达到 ${r.level} 级（当前 ${a}）`}}const n=Br(i,e.id);return i.prestige.stardust<n?{purchaseState:"insufficient",lockReason:`星核不足（需 ${Pe(n)}）`}:{purchaseState:"purchasable"}}function uy(i){const e={economy:[],production:[],research:[],facility:[],prestige:[]},t=[];let n=0;for(const s of Object.values(On)){const r=Ut(i,s.id),a=s.maxLevel,o=r>=a?1/0:Br(i,s.id),{purchaseState:c,lockReason:l}=dy(i,s),d=s.prerequisites.map(p=>{var v;const g=Ut(i,p.itemId);return{itemId:p.itemId,name:((v=On[p.itemId])==null?void 0:v.name)??p.itemId,requiredLevel:p.level,currentLevel:g,met:g>=p.level}}),u=r>0;u&&(n+=1);const h={id:s.id,name:s.name,description:s.description,category:s.category,categoryLabel:Tu[s.category],level:r,maxLevel:a,nextCost:o,costDisplay:r>=a?"已满级":Pe(o),purchaseState:c,lockReason:l,prerequisites:d,purchased:u};e[s.category].push(h),t.push(h)}return{balance:i.prestige.stardust,balanceDisplay:Pe(i.prestige.stardust),categories:bu,itemsByCategory:e,items:t,totalItems:t.length,purchasedCount:n}}class hy{constructor(e,t){O(this,"backdrop");O(this,"modal");O(this,"balanceEl");O(this,"tabsHost");O(this,"gridHost");O(this,"closeBtn");O(this,"activeCategory",bu[0]);O(this,"state");this.cbs=t,this.state=e,this.mount(),this.refresh(e)}mount(){const e=document.getElementById("modal-root");e&&(document.querySelectorAll(".modal-backdrop").forEach(()=>{document.dispatchEvent(new CustomEvent("modal:close"))}),this.backdrop=document.createElement("div"),this.backdrop.className="modal-backdrop",this.modal=document.createElement("div"),this.modal.className="modal shop-modal",this.modal.innerHTML=`
      <div class="shop-header">
        <h2>星核商店</h2>
        <div class="shop-balance">
          <span class="shop-balance-label">星核余额</span>
          <span class="shop-balance-val" id="shop-balance">0</span>
        </div>
        <button type="button" class="btn ghost shop-close" id="shop-close" aria-label="关闭">×</button>
      </div>
      <div class="shop-tabs" id="shop-tabs"></div>
      <div class="shop-grid" id="shop-grid"></div>`,this.balanceEl=this.modal.querySelector("#shop-balance"),this.tabsHost=this.modal.querySelector("#shop-tabs"),this.gridHost=this.modal.querySelector("#shop-grid"),this.closeBtn=this.modal.querySelector("#shop-close"),this.backdrop.appendChild(this.modal),e.appendChild(this.backdrop),this.tabsHost.addEventListener("click",t=>{const n=t.target.closest("[data-category]");n!=null&&n.dataset.category&&(this.activeCategory=n.dataset.category,this.refresh(this.state))}),this.gridHost.addEventListener("click",async t=>{const n=t.target.closest("[data-buy]");if(n!=null&&n.dataset.buy){const s=n.dataset.buy;n.disabled=!0;try{await this.cbs.onPurchase(s)}finally{this.refresh(this.state)}}}),this.closeBtn.addEventListener("click",()=>this.close()),this.backdrop.addEventListener("click",t=>{t.target===this.backdrop&&this.close()}),document.dispatchEvent(new CustomEvent("modal:open")))}refresh(e){this.state=e;const t=uy(e);this.balanceEl.textContent=t.balanceDisplay,this.tabsHost.innerHTML=t.categories.map(s=>{const r=t.itemsByCategory[s],a=r.filter(c=>c.purchased).length;return`<button type="button" class="shop-tab${s===this.activeCategory?" active":""}" data-category="${s}">
          <span class="shop-tab-label">${Tu[s]}</span>
          <span class="shop-tab-count">${a}/${r.length}</span>
        </button>`}).join("");const n=t.itemsByCategory[this.activeCategory]??[];if(n.length===0){this.gridHost.innerHTML='<p class="muted-text shop-empty">该分类暂无物品</p>';return}this.gridHost.innerHTML=n.map(s=>this.renderCard(s)).join("")}renderCard(e){const t=`<span class="shop-level">Lv.${e.level}/${e.maxLevel}</span>`,n=e.purchaseState==="maxed"?`<span class="shop-cost maxed">${e.costDisplay}</span>`:`<span class="shop-cost">下一级 · ${e.costDisplay} 星核</span>`,s=e.prerequisites.filter(l=>!l.met),r=s.length>0?`<div class="shop-prereq">${s.map(l=>`需 ${l.name} Lv.${l.requiredLevel}（当前 ${l.currentLevel}）`).join("；")}</div>`:"";let a="btn primary",o="购买",c="";switch(e.purchaseState){case"purchasable":a="btn primary",o=`购买（${e.costDisplay}）`;break;case"locked":a="btn shop-buy-locked",o="锁定",c="disabled";break;case"maxed":a="btn shop-buy-maxed",o="已满级",c="disabled";break;case"insufficient":a="btn shop-buy-insufficient",o="星核不足",c="disabled";break}return`<div class="shop-card state-${e.purchaseState}${e.purchased?" purchased":""}">
      <div class="shop-card-head">
        <span class="shop-card-name">${e.name}</span>
        <span class="shop-cat-tag">${e.categoryLabel}</span>
      </div>
      <div class="shop-card-level">${t}</div>
      <div class="shop-card-desc">${e.description}</div>
      ${r}
      <div class="shop-card-foot">
        ${n}
        <button type="button" class="${a} shop-buy" data-buy="${e.id}" ${c}>${o}</button>
      </div>
    </div>`}close(){var e;(e=this.backdrop)!=null&&e.parentNode&&this.backdrop.remove(),document.dispatchEvent(new CustomEvent("modal:closed"))}isOpen(){return!!this.backdrop&&document.body.contains(this.backdrop)}}function fy(i,e){return new hy(i,e)}function py(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function my(){try{const e=document.createElement("canvas");e.width=256,e.height=256;const t=e.getContext("2d");if(!t)return;const n=py(20260807);t.clearRect(0,0,256,256),t.strokeStyle="rgba(56, 217, 232, 0.08)",t.lineWidth=2;for(let c=0;c<=256;c+=64)t.beginPath(),t.moveTo(c,0),t.lineTo(c,256),t.stroke(),t.beginPath(),t.moveTo(0,c),t.lineTo(256,c),t.stroke();for(let c=0;c<120;c+=1){const l=n()<.5?"56,217,232":"160,107,255";t.fillStyle=`rgba(${l},${.03+n()*.06})`,t.fillRect(Math.floor(n()*256),Math.floor(n()*256),2,2)}const s=t.createRadialGradient(0,0,0,0,0,256);s.addColorStop(0,"rgba(255,255,255,0.045)"),s.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=s,t.fillRect(0,0,256,256);const r=t.createRadialGradient(256,256,0,256,256,256);r.addColorStop(0,"rgba(0,0,0,0.10)"),r.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=r,t.fillRect(0,0,256,256);const a=e.toDataURL("image/png"),o=document.createElement("style");o.textContent=`
      #topbar {
        background-image: url("${a}"), linear-gradient(180deg, #0b1524, #08101d);
        background-size: 256px 256px, cover;
      }
      #leftnav, #right-panel {
        background-image: url("${a}");
        background-size: 256px 256px;
      }
      .panel-card, .modal {
        background-image: url("${a}");
        background-size: 256px 256px;
      }
    `,document.head.appendChild(o)}catch{}}function kn(i,e,t,n){const s=document.getElementById("modal-root");if(!s)return;document.querySelectorAll(".modal-backdrop").forEach(()=>{document.dispatchEvent(new CustomEvent("modal:close"))});const a=document.createElement("div");a.className="modal-backdrop";const o=document.createElement("div");o.className="modal",o.innerHTML=`<h2>${i}</h2>${e}`;const c=document.createElement("div");c.className="modal-actions";const l=()=>{a.remove(),document.dispatchEvent(new CustomEvent("modal:closed"))};for(const d of t){const u=document.createElement("button");u.type="button",u.className=`btn ${d.className??""}`.trim(),u.textContent=d.label,u.addEventListener("click",()=>d.onClick(l)),c.appendChild(u)}o.appendChild(c),a.appendChild(o),s.appendChild(a),a.addEventListener("click",d=>{d.target===a&&l()}),n==null||n(),document.dispatchEvent(new CustomEvent("modal:open"))}function qo(i,e){const t=`
    <p class="muted-text">离开期间（${Jn(i.effectiveMs)}）矿站自动运行：</p>
    <div class="offline-list">
      <div class="row"><dt>采掘器产出</dt><dd class="cyan">+${Pe(i.summary.producedStardust)} 星尘矿</dd></div>
      <div class="row"><dt>运输线转运</dt><dd class="cyan">+${Pe(i.summary.movedStardust)} 星尘矿</dd></div>
      <div class="row"><dt>精炼厂产出</dt><dd class="purple">+${Pe(i.summary.refinedCrystal)} 晶体</dd></div>
    </div>
    <p class="muted-text" style="margin-top:10px">离线为福利时段，产出不封顶，与在线容量限制不同。</p>`;kn("离线收益",t,[{label:"确认领取",className:"primary",onClick:n=>{n(),e()}}])}function gy(i,e){const t=`
    <p>当前存档：</p>
    <div class="offline-list">
      <div class="row"><dt>创建时间</dt><dd>${new Date(i.createdAt).toLocaleString("zh-CN")}</dd></div>
      <div class="row"><dt>最近保存</dt><dd>${new Date(i.lastSavedAt).toLocaleString("zh-CN")}</dd></div>
    </div>
    <p class="muted-text">建议定期导出 JSON 备份；浏览器清理数据会丢失存档。</p>
    <input type="file" id="import-file" accept="application/json,.json" hidden />`;kn("存档管理",t,[{label:"导出 JSON",className:"primary",onClick:n=>{e.onExport(),n()}},{label:"导入 JSON",onClick:()=>{const n=document.getElementById("import-file");n&&n.click()}},{label:"导出节奏数据",onClick:n=>{e.onExportCsv()}},{label:"关闭",onClick:n=>n()}],()=>{const n=document.getElementById("import-file");n==null||n.addEventListener("change",()=>{var r;const s=(r=n.files)==null?void 0:r[0];s&&e.onImport(s),n.value=""})})}function vy(i,e){const t=["excavator","transport","refinery"].map(s=>{const r=i.facilities[s];return`<div class="row"><dt>${s==="excavator"?"采掘器":s==="transport"?"运输线":"精炼厂"}</dt><dd>${r.unlocked?`Lv.${r.level}`:"未解锁"}</dd></div>`}).join(""),n=`
    <p class="muted-text">导入后当前进度将被覆盖，请确认：</p>
    <div class="offline-list">
      <div class="row"><dt>信用点</dt><dd class="gold">${Pe(i.credits)}</dd></div>
      <div class="row"><dt>星尘矿</dt><dd class="cyan">${Pe(i.stardust)}</dd></div>
      <div class="row"><dt>晶体</dt><dd class="purple">${Pe(i.crystal)}</dd></div>
      ${t}
    </div>
    <label style="display:flex;gap:6px;align-items:center;margin-top:10px;color:var(--muted);font-size:12px">
      <input type="checkbox" id="dbg-unlock" /> 解锁全部设施（同时可调整等级）
    </label>`;kn("导入预览",n,[{label:"确认导入",className:"primary",onClick:s=>{s(),e()}},{label:"取消",onClick:s=>s()}])}document.addEventListener("modal:close",()=>{const i=document.querySelectorAll(".modal-backdrop"),e=i[i.length-1];e&&(e.remove(),document.dispatchEvent(new CustomEvent("modal:closed")))});function _y(i,e){kn("里程碑达成",`<p>🎉 ${i}</p><p class="muted-text" style="margin-top:8px">用时 ${Jn(e)}</p>`,[{label:"继续",className:"primary",onClick:t=>t()}])}function Ir(i,e={}){const t=document.getElementById("event-host");if(!t)return;t.querySelectorAll(".event-card").forEach(s=>s.remove());const n=document.createElement("div");if(n.className=`event-card${i==="solar-storm"?" storm":""}`,i==="drone"){n.innerHTML="<h3>✈ 无人机事件</h3><p>选择奖励：A 立即获得 50 信用点；B 所有设施 30 秒内速度 ×1.5。</p>";const s=document.createElement("div");s.className="event-actions";const r=document.createElement("button");r.className="btn",r.textContent="A · +50 信用点";const a=document.createElement("button");if(a.className="btn primary",a.textContent="B · ×1.5 速度 30 秒",s.append(r,a),e.onResearchCenter){const o=document.createElement("button");o.className="btn",o.textContent="C · 发现古代数据核心",o.addEventListener("click",()=>{var c;n.remove(),(c=e.onResearchCenter)==null||c.call(e)}),s.appendChild(o)}n.appendChild(s),r.addEventListener("click",()=>{var o;n.remove(),(o=e.onA)==null||o.call(e)}),a.addEventListener("click",()=>{var o;n.remove(),(o=e.onB)==null||o.call(e)})}else if(i==="invest"){n.innerHTML="<h3>◆ 投入型机会</h3><p>消耗 200 信用点，永久提升采掘速度 +5%（仅一次）。</p>";const s=document.createElement("div");s.className="event-actions";const r=document.createElement("button");r.className="btn primary",r.textContent="投资（-200 信用点）";const a=document.createElement("button");a.className="btn",a.textContent="忽略",s.append(r,a),n.appendChild(s),r.addEventListener("click",()=>{var o;n.remove(),(o=e.onInvest)==null||o.call(e)}),a.addEventListener("click",()=>{var o;n.remove(),(o=e.onIgnore)==null||o.call(e)})}else{n.innerHTML="<h3>☀ 太阳风暴</h3><p>全设施速度降低 20%（均衡策略减半），持续 1 分钟。</p>";const s=document.createElement("div");s.className="event-actions";const r=document.createElement("button");r.className="btn",r.textContent="知道了",s.appendChild(r),n.appendChild(s),r.addEventListener("click",()=>{var a;n.remove(),(a=e.onClose)==null||a.call(e)})}t.appendChild(n),i==="solar-storm"&&window.setTimeout(()=>{n.parentElement&&n.remove()},12e3)}function xy(i,e){const t=r=>[1,2,3,4,5].map(a=>`<option value="${a}"${a===r?" selected":""}>Lv.${a}</option>`).join(""),n=tn.map(r=>{const a=i.facilities[r];return`<label>${sn[r].name}<select id="dbg-lvl-${r}">${t(a.level)}</select></label>`}).join(""),s=`
    <div class="debug-grid">
      <label>信用点<input type="number" id="dbg-credits" value="${Math.round(i.credits)}" /></label>
      <label>星尘矿<input type="number" id="dbg-stardust" value="${Math.round(i.stardust)}" /></label>
      <label>晶体<input type="number" id="dbg-crystal" value="${Math.round(i.crystal)}" /></label>
      ${n}
    </div>
    <label style="display:flex;gap:6px;align-items:center;margin-top:10px;color:var(--muted);font-size:12px">
      <input type="checkbox" id="dbg-unlock" /> 解锁全部设施（同时可调整等级）
    </label>
    <p class="muted-text" style="margin-top:10px">调试改动不会绕过解锁与等级规则；模拟离线会直接结算离线收益。</p>`;kn("调试面板（~）",s,[{label:"应用数值",className:"primary",onClick:()=>{const r=c=>{const l=document.getElementById(c),d=Number.parseFloat((l==null?void 0:l.value)??"0");return Number.isFinite(d)&&d>=0?d:0},a={};for(const c of tn){const l=document.getElementById(`dbg-lvl-${c}`);a[c]=Number.parseInt((l==null?void 0:l.value)??"1",10)||1}const o=document.getElementById("dbg-unlock");e.onApply({credits:r("dbg-credits"),stardust:r("dbg-stardust"),crystal:r("dbg-crystal"),levels:a,unlockAll:(o==null?void 0:o.checked)??!1})}},{label:"触发无人机事件",onClick:()=>e.onDrone()},{label:"触发太阳风暴",onClick:()=>e.onStorm()},{label:"模拟离线 1 小时",onClick:()=>e.onOffline(1)},{label:"模拟离线 8 小时",onClick:()=>e.onOffline(8)},{label:"关闭",onClick:r=>r()}])}function yy(i){const n=`
    <svg viewBox="0 0 640 200" style="width:100%;height:auto;display:block">
      <line x1="100" y1="100" x2="270" y2="100" stroke="#1d2f45" stroke-width="2"/>
      <line x1="370" y1="100" x2="540" y2="100" stroke="#1d2f45" stroke-width="2" stroke-dasharray="6 6"/>
      <circle cx="100" cy="100" r="30" fill="#0a1220" stroke="#38d9e8" stroke-width="2"/>
      <text x="100" y="106" text-anchor="middle" fill="#38d9e8" font-size="13">Aurora-1</text>
      <text x="100" y="152" text-anchor="middle" fill="#6f8ba3" font-size="11">当前星区</text>
      <circle cx="270" cy="100" r="20" fill="#0a1220" stroke="#3d4c63" stroke-width="2"/>
      <text x="270" y="106" text-anchor="middle" fill="#6f8ba3" font-size="12">开普勒-7</text>
      <circle cx="470" cy="100" r="16" fill="#0a1220" stroke="#3d4c63" stroke-width="2"/>
      <text x="470" y="106" text-anchor="middle" fill="#6f8ba3" font-size="12">赫利俄斯</text>
      <text x="470" y="140" text-anchor="middle" fill="#3d4c63" font-size="10">后续版本开放</text>
    </svg>
    <div class="offline-list">${[{name:"第一矿区 · 星尘",unlocked:!0,req:""},{name:"第二矿区 · 氦-3",unlocked:i.facilities.he3Excavator.unlocked,req:"解锁：1250 信用点 + 20 晶体"},{name:"第三矿区 · 氘-3",unlocked:i.facilities.deuteriumExcavator.unlocked,req:"解锁：3000 信用点 + 100 晶体"}].map(s=>`<div class="row"><dt>${s.unlocked?"●":"○"} ${s.name}</dt><dd>${s.unlocked?"已解锁":s.req}</dd></div>`).join("")}</div>
    <p class="muted-text">当前坐标：Aurora-1 · 矿站。邻近星系均为未探索区域。</p>`;kn("星图",n,[{label:"关闭",onClick:s=>s()}])}function wu(i,e){const t=_d.map(n=>{const r=Jo.filter(a=>a.branch===n).sort((a,o)=>a.tier-o.tier).map(a=>{const o=i.research.includes(a.id),c=a.tier<=2,l=Sd(i,a.id),d=o?"done":c?l.ok?"ready":"locked":"future";let u;if(o)u='<span class="tech-status done">已研究</span>';else if(!c)u='<span class="tech-status future">后续开放</span>';else{const p=l.ok?`研究（${a.cost} 晶体）`:l.reason??"";u=`<button class="btn tech-btn" data-tech="${a.id}" ${l.ok?"":"disabled"}>${p}</button>`}const h=a.requires.length>0?`<div class="tech-reqs">前置：${a.requires.map(p=>{var g;return((g=ts[p])==null?void 0:g.name)??p}).join("、")}</div>`:"";return`<div class="tech-card ${d}" data-tier="${a.tier}">
          <div class="tech-name">${a.name}</div>
          <div class="tech-desc">${a.description}</div>
          ${h}
          <div class="tech-action">${u}</div>
        </div>`}).join("");return`<div class="tech-branch">
      <h3>${Rh[n]}</h3>
      <div class="tech-cards">${r}</div>
    </div>`}).join("");kn("研究中心 · 科技树",t,[{label:"关闭",onClick:n=>n()}],()=>{document.querySelectorAll(".tech-btn").forEach(n=>{n.addEventListener("click",()=>e.onResearch(n.dataset.tech??""))})})}function My(i){const e=Ed(i),t=bd(i),n=i.prestige,s=n.history.map(c=>{const l=c.baselineSnapshot,d=Object.entries(l.facilityLevels).filter(([,u])=>u>1).map(([u,h])=>{var p;return`${((p=sn[u])==null?void 0:p.name)??u} Lv.${h}`}).join("、");return`<div class="row">
        <dt>第 ${c.sequence} 世</dt>
        <dd>
          <span class="cyan">+${Pe(c.stardustEarned)} 星核</span>
          · ${new Date(c.timestamp).toLocaleString("zh-CN")}
          ${l.researchCount>0?` · 研究 ${l.researchCount}`:""}
          ${l.achievementCount>0?` · 成就 ${l.achievementCount}`:""}
          ${d?` · ${d}`:""}
        </dd>
      </div>`}).join(""),r=`
    <div class="prestige-history-block">
      <h3 class="prestige-history-title">转生进度 · Lv.${n.prestigeLevel}</h3>
      <div class="offline-list">
        <div class="row"><dt>星核余额</dt><dd class="gold">${Pe(n.stardust)}</dd></div>
        <div class="row"><dt>永久加成</dt><dd>${n.unlocked.length} 项</dd></div>
      </div>
      ${n.history.length>0?`
        <h4 class="prestige-history-subtitle">历次转生（${n.history.length}）</h4>
        <div class="offline-list prestige-history-list">${s}</div>
      `:'<p class="muted-text" style="margin:6px 0 0">尚未转生——积累资源与设施等级后可在「转生」入口重置进度换取永久星核。</p>'}
    </div>`,o=["production","construction","tech","event","exploration","hidden"].map(c=>{const l=Qo.filter(h=>h.category===c),d=l.filter(h=>i.achievements.includes(h.id)).length,u=l.map(h=>{const p=i.achievements.includes(h.id);return`<div class="ach-row ${p?"done":""}">
            <span class="ach-mark">${p?"✓":"○"}</span>
            <div class="ach-info">
              <div class="ach-name">${h.name}</div>
              <div class="ach-desc">${h.description}</div>
            </div>
            <span class="ach-reward">${Pe(h.rewardCredits)} 信用点 + ${h.rewardCrystals} 晶体</span>
          </div>`}).join("");return`<div class="ach-group">
        <h3>${Lh[c]}（${d}/${l.length}）</h3>
        ${u}
      </div>`}).join("");kn(`成就（${e} 点 · 全局产量 ×${t.toFixed(2)}）`,r+o,[{label:"关闭",onClick:c=>c()}])}function Sy(){kn("帮助",`
    <style>
      .modal { position: relative; scrollbar-width: thin; scrollbar-color: rgba(63,224,216,0.25) transparent; }
      .modal::-webkit-scrollbar { width: 8px; }
      .modal::-webkit-scrollbar-track { background: transparent; }
      .modal::-webkit-scrollbar-thumb { background: rgba(63,224,216,0.25); border-radius: 4px; border: 2px solid transparent; background-clip: content-box; }
      .modal::-webkit-scrollbar-thumb:hover { background: rgba(63,224,216,0.45); background-clip: content-box; }
      .help-list .help-item { flex-wrap: wrap; }
      .help-list details { flex-basis: 100%; margin-top: 6px; }
      .help-list summary { cursor: pointer; color: var(--muted); font-size: 11px; list-style: none; }
      .help-list summary::-webkit-details-marker { display: none; }
      .help-list summary::before { content: '▸ '; letter-spacing: .5px; }
      .help-list details[open] summary { color: var(--cyan); }
      .help-list details[open] summary::before { content: '▾ '; }
      .help-list .help-detail { padding: 6px 0 0; font-size: 11px; line-height: 1.7; color: var(--muted); }
      .help-list .help-detail div { padding-left: 2px; }
      .help-search { width: 100%; box-sizing: border-box; margin-bottom: 8px; padding: 4px 8px; background: var(--bg,#0a1220); border: 1px solid var(--panel-border,#1d2f45); color: var(--text,#c8d6e5); font-size: 12px; border-radius: 4px; }
      .help-search:focus { outline: none; border-color: var(--cyan); box-shadow: 0 0 0 2px rgba(63,224,216,0.15); }
      .help-close-x { position: absolute; top: 8px; right: 12px; cursor: pointer; color: var(--muted); font-size: 18px; line-height: 1; background: none; border: none; padding: 0; }
      .help-close-x:focus { outline: none; color: var(--cyan); }
      .help-close-x:hover { color: var(--text,#c8d6e5); }
      .help-quick, .help-milestone, .help-faq { background: rgba(56,217,232,0.04); border-left: 2px solid var(--cyan); padding: 8px 12px; margin: 10px 0; border-radius: 0 4px 4px 0; }
      .help-quick ol, .help-milestone ol { margin: 4px 0 0; padding-left: 18px; }
      .help-quick li, .help-milestone li { margin: 4px 0; font-size: 12px; line-height: 1.6; }
      .help-sec-title { display: flex; align-items: center; gap: 6px; margin: 14px 0 6px; }
      .help-sec-title .lock { color: var(--muted); font-size: 12px; }
      .help-version { text-align: center; color: var(--muted); font-size: 11px; padding: 10px 0 2px; border-top: 1px solid var(--panel-border,#1d2f45); margin-top: 14px; }
      .help-search-hide { display: none !important; }
    </style>
    <button class="help-close-x" id="help-close-x" title="关闭">×</button>
    <input class="help-search" id="help-search" placeholder="🔍 搜索条目（输入关键字实时过滤）…" />
    <div class="help-quick">
      <b>快速开始</b> · 新手前三步
      <ol>
        <li>点场景里的<b>星尘采掘器</b> → 升级（50 信用点起步），星尘矿越挖越快。</li>
        <li>攒信用点（出售星尘矿获得）解锁<b>磁轨运输线</b>（600 信用点）→ 再建<b>精炼厂</b>（1000 信用点），把矿炼成晶体。</li>
        <li>晶体累计到 <b>50</b>，等无人机送来「古代数据核心」，<b>研究中心</b>解锁科技树。</li>
      </ol>
    </div>
    <div class="help-milestone">
      <b>进度里程碑</b> · 照着走不迷路
      <ol>
        <li>🎯 建第一个精炼厂（需先建运输线 600 → 精炼厂 1000 信用点）</li>
        <li>🎯 累计 50 晶体 → 解锁研究中心，开启科技树</li>
        <li>🎯 完成「稀有矿同位素」研究（100 晶体，前置矿脉探测 25）→ 解锁反应堆</li>
        <li>🎯 积累资源后首次转生 → 换星核买永久加成</li>
      </ol>
    </div>
    <div class="help-sec-title"><h3 class="help-title" style="margin:0">基础系统（开局即可用）</h3></div>
    <div class="help-list">
      <div class="help-item"><b class="gold">信用点</b><span>出售矿石/事件获得的货币，用于解锁与升级。</span>
        <details open><summary>展开</summary><div class="help-detail">
          <div>获取：出售星尘矿（1/个）、晶体（8/个），事件奖励 +50。</div>
          <div>消耗：解锁设施（运输线 600、精炼厂 1000、能源站 1000+15 晶体）、升级设施、研究科技。</div>
        </div></details></div>
      <div class="help-item"><b class="cyan">星尘矿</b><span>采掘器产出的基础矿石，可出售或精炼为晶体。</span>
        <details open><summary>展开</summary><div class="help-detail">
          <div>获取：采掘器产出（星尘/氦-3/氘 三类，基础 1.2/s）。</div>
          <div>消耗：精炼为晶体（4:1，优化后 3:1）；出售换信用点（1/个）。</div>
          <div>容量 2000，不运走会堆满停产。</div>
        </div></details></div>
      <div class="help-item"><b class="purple">晶体</b><span>精炼厂产出的高级资源，用于研究与高级升级。</span>
        <details open><summary>展开</summary><div class="help-detail">
          <div>获取：精炼厂消耗 4 星尘产 1 晶体（优化后 3:1）。</div>
          <div>消耗：解锁第二/三矿区（20/100 晶体）、3 级以上设施升级、科技研究（15~100 晶体不等）。</div>
          <div>售价 8 信用点/个；累计 50 解锁研究中心。</div>
        </div></details></div>
      <div class="help-item"><b class="energy-val">能量</b><span>能源站产出，不足时减产；盈余可释放加成。</span>
        <details open><summary>展开</summary><div class="help-detail">
          <div>获取：能源站产出（解锁需 1000 信用点 + 15 晶体）。</div>
          <div>消耗：所有生产设施运行耗能（基础 0.2/s）；不足时全设施 ×0.8（研究过载保护后 ×0.9）。</div>
          <div>释放加成：研究「能源储备」后，点能源站的「释放储备」按钮（消耗 100 储备能量）→ 30 秒全设施 ×1.2，冷却 60 秒。储备池上限 200。</div>
        </div></details></div>
      <div class="help-item"><b>生产链</b><span>采掘器→运输线→精炼厂产晶体→出售/研究；能源站供能。</span>
        <details><summary>展开</summary><div class="help-detail">
          <div>不建运输线，星尘矿无法运到精炼厂，就产不出晶体。</div>
          <div>采掘器：挖星尘矿，堆满会停产，得靠运输线运走。</div>
          <div>运输线：把矿从采掘器搬到精炼厂，不建矿就堆在采掘器出不来。</div>
          <div>精炼厂：吃 4 矿吐 1 晶体（优化后 3:1）。</div>
          <div>出售：点顶栏矿图标直接卖（星尘 1、晶体 8）。研究：在研究中心花晶体点科技。</div>
          <div>能源站：供能，不足时全设施减速 ×0.8。</div>
          <div>解锁：运输线 600、精炼厂 1000、第二矿区 1250+20 晶体、第三矿区 3000+100 晶体。</div>
        </div></details></div>
      <div class="help-item"><b>能源策略</b><span>快捷键 1/2/3 切 3 档：采掘/均衡/精炼优先。</span>
        <details><summary>展开</summary><div class="help-detail">
          <div>采掘优先（1）：前期缺矿/运输线没建满时用。采掘产量 ×1.35，运输/精炼 ×0.9；采掘耗能 ×0.6，运输/精炼耗能 ×1.3。</div>
          <div>均衡（2）：默认稳定档。全设施产量 ×1、耗能 ×1。</div>
          <div>精炼优先（3）：矿石积压/急需晶体时用。精炼产量 ×1.35，采掘/运输 ×0.9；精炼耗能 ×0.6，采掘/运输耗能 ×1.3。</div>
          <div>切错没硬伤，就是把产量与耗能配比拧偏，改回来即可。第四档「聚变」后续版本开放。</div>
        </div></details></div>
      <div class="help-item"><b>事件</b><span>每 3–5 分钟触发无人机/投入型/太阳风暴。</span>
        <details><summary>展开</summary><div class="help-detail">
          <div>无人机（正面·需操作）：弹窗二选一——选 A 拿 50 信用点；选 B 得 30 秒采掘 ×1.5 加成。未处理会阻塞后续事件触发，尽快选。</div>
          <div>投入型（正面·需确认）：花 200 信用点换永久采掘 +5%，仅一次；缺钱可先放着不亏（不确认不扣费）。</div>
          <div>太阳风暴（负面·自动生效）：全设施产量 ×0.8 持续 60 秒；均衡策略可减至 ×0.9。无需操作，结束自动恢复。</div>
          <div>首次事件 2 分钟后触发，之后每 3–5 分钟一桩。</div>
        </div></details></div>
      <div class="help-item"><b>离线收益</b><span>离线自动产出，封顶 8 小时，重进领取。</span>
        <details><summary>展开</summary><div class="help-detail">
          <div>离线自动采掘/转运/精炼，产出不封顶；时间封顶 8 小时。</div>
          <div>离线不触发事件、不留临时增益；重新进入时弹窗领取，不领会继续累计。</div>
        </div></details></div>
      <div class="help-item"><b>研究中心</b><span>累计 50 晶体后，无人机事件解锁科技树。</span>
        <details><summary>展开</summary><div class="help-detail">
          <div>解锁需累计 50 晶体，再等一次无人机事件（自带「古代数据核心」）；或星核商店「研究补贴」直接解锁。</div>
          <div>4 支科技树，29 个节点，T0–T4 五级。根节点「基础研究」（15 晶体）解锁后开启四大分支。</div>
          <div>采掘科技：强化钻头(20)→稀有矿同位素(100)等 8 节点；能源科技：高效涡轮(20)→能源储备(80)等 7 节点；精炼科技：配方优化(30)→晶体品质(100)等 7 节点；运输科技：磁轨加速(20)→无人机配送(100)等 7 节点。</div>
          <div>每支 T1×2→T2×2→T3×2→T4×1，T3/T4 标注「后续版本开放」，需星核商店「高级研究权限」解锁。节点有前置依赖，按分支树状推进。</div>
        </div></details></div>
      <div class="help-item"><b>成就</b><span>完成获奖励，每 10 点 +1% 全局产量（永久）。</span>
        <details><summary>展开</summary><div class="help-detail">
          <div>6 类共 30 条：生产（初出茅庐·100 星尘、晶体学徒·100 晶体、第一桶金·1000 信用点、能源先驱·1000 能量…）、建设（设施齐全·全 6 设施、满级王者·任一 5 级、矿区全开…）、科技（启蒙·基础研究、科技学者·10 科技…）、事件（无人机常客·20 次、投资有道…）、探索（同位素收藏家·10 同位素…）、隐藏（深空静默·离线 500 晶体…）。</div>
          <div>每条给信用点 + 晶体奖励；每 10 条全局产量 +1%（永久）。在成就面板查看全部。</div>
        </div></details></div>
    </div>
    <div class="help-sec-title"><h3 class="help-title" style="margin:0">进阶系统</h3><span class="lock">🔒 需解锁</span></div>
    <div class="help-list">
      <div class="help-item"><b class="cyan">同位素</b><span>稀有资源，需研究解锁；可消耗于反应堆。</span>
        <details><summary>展开</summary><div class="help-detail">
          <div>获取：研究「稀有矿同位素」后采掘按 5%/秒期望掉落。</div>
          <div>消耗：反应堆 buff、深空探索派遣、碎片兑换。</div>
        </div></details></div>
      <div class="help-item"><b class="cyan">反物质</b><span>T3 稀有资源，反应堆深空探索获得。</span>
        <details><summary>展开</summary><div class="help-detail">
          <div>获取：反应堆深空探索（近地小行星带、蛇夫座远征）。</div>
          <div>消耗：兑换暗物质、预留 T3 科技节点。</div>
        </div></details></div>
      <div class="help-item"><b class="cyan">暗物质</b><span>T4 稀有资源，柯伊伯带探索或湮灭兑换。</span>
        <details><summary>展开</summary><div class="help-detail">
          <div>获取：柯伊伯带探索；反物质湮灭 3 反物质 → 2 暗物质。</div>
          <div>消耗：预留 T4 科技节点。</div>
        </div></details></div>
      <div class="help-item"><b>同位素反应堆</b><span>需研究解锁。3 类入口：buff / 探索 / 兑换。</span>
        <details><summary>展开</summary><div class="help-detail">
          <div>解锁：完成「稀有矿同位素」研究后面板自动出现。</div>
          <div>buff：催化过载 60→采掘×2/10min；晶体共鸣 90→精炼×1.5/5min；同位素熔炉 40→采掘×1.5/20min（叠加封顶 ×8）。</div>
          <div>探索：近地 30/1min→4 反物质；柯伊伯带 80/3min→3 暗物质；蛇夫座 150/6min→10 反物质（每次仅 1 路）。</div>
          <div>兑换：25 同位素→300 信用点；40→8 晶体；3 反物质→2 暗物质。</div>
        </div></details></div>
      <div class="help-item"><b>转生系统</b><span>积累后转生换星核买永久加成；资源清零、转生等级保留。</span>
        <details><summary>展开</summary><div class="help-detail">
          <div>积累什么：晶体、同位素、反物质、暗物质、星尘、设施等级、研究数都能换星核。</div>
          <div>星核 = ⌊(晶体/100 + 同位素/20 + 反物质/5 + 暗物质/2 + 星尘/1000 + 2×Σ(设施等级−1) + 5×研究数) × 转生增幅⌋。</div>
          <div>转生前面板会显示预估星核数与「会失去什么」清单，确认后结算。</div>
          <div>仪式：基线回顾 → 星核结算 → 确认。</div>
          <div>重置：资源/设施/研究/成就归零。</div>
          <div>保留：转生等级（每次 +1，影响下次加成）、星核余额、商店购买记录。</div>
        </div></details></div>
      <div class="help-item"><b>星核商店</b><span>用星核买永久加成，5 类 15 件，跨转生保留。</span>
        <details><summary>展开</summary><div class="help-detail">
          <div>5 类（经济/生产/研究/设施/转生）共 15 件，用转生攒的星核买。</div>
          <div>成本：⌊基础成本 × 递增倍率^当前等级⌋，含前置等级与满级限制。</div>
          <div>代表项：信用放大器 +15%/级；超频驱动 +10%/级；转生增幅器 +25%/级。</div>
        </div></details></div>
    </div>
    <h3 class="help-title">快捷操作</h3>
    <div class="help-list">
      <div class="help-item"><b>快捷键</b><span>1/2/3 能源策略 · U 升级 · M 存档 · Esc 关闭弹窗 · ~ 调试</span></div>
      <div class="help-item"><b>提示</b><span>左侧边栏切面板（设施/星图/反应堆/转生/商店）；点顶栏资源看说明；点场景设施上手操作；设施升级 = 产能变强，解锁 = 开新设施入口；存档自动写浏览器本地（M 手动存），换电脑/清缓存会丢。</span></div>
    </div>
    <div class="help-faq">
      <b>常见问题</b>
      <div style="margin-top:6px;font-size:12px;line-height:1.7">
        <div><b>采掘器不工作了？</b> 多半是能量不足——看能源站是否建了、能量够不够，不够就切均衡或建/升能源站。</div>
        <div><b>能量一直不够怎么办？</b> 优先升能源站等级（最直接），其次研究「高效涡轮」降 10% 能耗，实在紧张切均衡策略；研究「过载保护」可把能源不足惩罚从 −20% 降到 −10%。</div>
        <div><b>怎么重置游戏？</b> 转生是部分重置（换星核、留永久加成）；想彻底重开需清浏览器站点数据（IndexedDB + localStorage），无游戏内一键重置。</div>
        <div><b>存档存哪？换电脑还有吗？</b> 存浏览器本地（IndexedDB 为主，localStorage 兜底）。换电脑、清缓存、隐私模式都不保留，需用「存档」面板导出文件迁移。</div>
        <div><b>离线收益最多攒多久？</b> 封顶 8 小时，超过的不计；回来重新进入会弹窗领取。</div>
      </div>
    </div>
    <div class="help-version">帮助版本 v0.5.0 · 最后更新 2026-08</div>`,[{label:"关闭",onClick:e=>e()}],()=>{const e=document.getElementById("help-close-x");e&&e.addEventListener("click",()=>{document.querySelectorAll(".modal-backdrop").forEach(n=>n.remove()),document.dispatchEvent(new CustomEvent("modal:closed"))});const t=document.getElementById("help-search");t&&t.addEventListener("input",()=>{const n=t.value.trim().toLowerCase();document.querySelectorAll(".help-modal-body, .help-list, .help-item, .help-quick, .help-milestone, .help-faq, .help-sec-title").forEach(s=>s.classList.remove("help-search-hide")),n&&(document.querySelectorAll(".help-item").forEach(s=>{const r=(s.textContent||"").toLowerCase().includes(n);s.classList.toggle("help-search-hide",!r)}),document.querySelectorAll(".help-sec-title, .help-quick, .help-milestone, .help-faq").forEach(s=>{s.classList.add("help-search-hide")}))})})}const Ga=100,Ey=3e4,id=6e4,Au="star-miner-snapshot";let Q,xt="excavator",jt=null,gr=null;const Yo=[],by=new jf,Ur=new Cf(by),Sc=new wf(Ur,i=>structuredClone(i)),_i=new $o;let Cu,Ec,Is,Vt,Nr;function Gt(i){const e=document.getElementById(i);if(!e)throw new Error(`missing #${i}`);return e}function Va(i){Gt("save-status").textContent=i}function Gi(i){if(Yo.some(t=>t.name===i))return;const e=Date.now()-Q.createdAt;Yo.push({name:i,atMs:e}),console.info(`[里程碑] ${i} 用时 ${Jn(e)}`),_y(i,e),De(`达成：${i}`)}function Vi(i){return Q.facilities[i].unlocked?"ONLINE":"LOCKED"}function Ty(){return{statuses:{excavator:Vi("excavator"),he3Excavator:Vi("he3Excavator"),deuteriumExcavator:Vi("deuteriumExcavator"),transport:Vi("transport"),refinery:Vi("refinery"),energyStation:Vi("energyStation")},selected:xt,transportActivity:Math.min(1,en(Q,"transport")/1),bottlenecks:(jt==null?void 0:jt.bottlenecks)??[],transportCongested:(jt==null?void 0:jt.transportCongested)??!1,reactorActivity:(Vt==null?void 0:Vt.reactorActivity(Date.now()))??0}}function Ru(i){const e=!Q.researchCenterUnlocked&&Q.facilities.he3Excavator.unlocked&&Q.stats.totalCrystalProduced>=ih;Ir("drone",{onA:()=>{const t=Cr(Q,i.id,{choice:"A"});t.ok?(De(`无人机奖励：+${t.creditsGained} 信用点`),et("事件")):De(t.reason??"事件已失效","error")},onB:()=>{const t=Cr(Q,i.id,{choice:"B",now:Date.now()});t.ok?(De("无人机奖励：全设施 ×1.5 速度 30 秒"),et("事件")):De(t.reason??"事件已失效","error")},onResearchCenter:e?()=>{Q.researchCenterUnlocked=!0,De("研究中心已解锁！打开「研究」页探索科技树"),et("研究中心")}:void 0})}function wy(i){Du(),i.kind==="solar-storm"?(Ir("solar-storm"),De("太阳风暴来袭：全设施速度降低"),et("事件")):i.kind==="drone"?Ru(i):Ir("invest",{onInvest:()=>{const e=Cr(Q,i.id,{confirm:!0});e.ok?De("投入完成：采掘速度永久 +5%"):De(e.reason??"投资失败","error"),et("事件")},onIgnore:()=>{Cr(Q,i.id,{confirm:!1})}})}const Pu="starminer-guide-step";let Lu=!1,Zn=Ay();function Ay(){const i=Number.parseInt(sessionStorage.getItem(Pu)??"0",10);return Number.isFinite(i)&&i>=0&&i<=4?i:0}function Cy(){sessionStorage.setItem(Pu,String(Zn))}function Or(){Zn<4&&(Zn+=1,Cy())}const sd=[{name:"出售矿石",title:"第 1 步：出售矿石",body:"点「交易」区的出售按钮，把星尘矿换成信用点。",target:"market-card"},{name:"升级采掘器",title:"第 2 步：升级采掘器",body:"点「升级（U）」按钮提升采掘产出。",target:"facility-card"},{name:"切换能源策略",title:"第 3 步：切换能源策略",body:"试试切换三种能源策略，观察产出倍率变化。",target:"energy-card"},{name:"解锁运输线",title:"第 4 步：解锁运输线",body:"攒 600 信用点，点击场景中的磁轨运输线（橙色轨道）后解锁。",target:"facility-card"}];function jo(){var i;for(const e of["market-card","energy-card","facility-card"])(i=document.getElementById(e))==null||i.classList.remove("guide-highlight")}function Ry(){var n;const i=Gt("guide-card");if(Lu||Q.facilities.transport.unlocked||Zn>=4){i.hidden=!0,jo();return}const e=sd[Zn];i.hidden=!1,Gt("guide-title").textContent=e.title,Gt("guide-body").textContent=e.body;const t=Gt("guide-steps");t.innerHTML=sd.map((s,r)=>{const a=r<Zn?"done":r===Zn?"current":"pending",o=r<Zn?"✓":String(r+1);return`<li class="guide-step ${a}"><span class="guide-step-mark">${o}</span>${s.name}</li>`}).join(""),jo(),(n=document.getElementById(e.target))==null||n.classList.add("guide-highlight")}function Du(){const i=Gt("event-status");i.classList.add("flash"),window.setTimeout(()=>i.classList.remove("flash"),1500)}function Py(){const i=Gt("event-status"),e=Date.now(),t=Q.eventState.solarStormUntil-e,n=Q.eventState.droneBoostUntil-e,s=i.classList.contains("flash");if(t>0){const r=Q.energyStrategy==="balanced"?"-10%":"-20%";i.textContent=`太阳风暴 ${r} ${Math.ceil(t/1e3)}s`,i.className="stat-value danger"}else n>0?(i.textContent=`无人机加速 ×1.5 ${Math.ceil(n/1e3)}s`,i.className="stat-value boost"):(i.textContent="正常",i.className="stat-value muted");s&&i.classList.add("flash")}let Wa=0;async function et(i="自动"){const e=++Wa;Va("保存中…"),Q.lastSavedAt=Date.now();try{await Ur.save(Q),e===Wa&&Va(`已保存 ${new Date().toLocaleTimeString("zh-CN",{hour12:!1})}`)}catch{e===Wa&&(Va("保存失败"),De("保存失败，请检查浏览器存储","error"))}}function rd(i){try{localStorage.setItem(Au,Dd(i))}catch{}}function ad(){try{const i=localStorage.getItem(Au);if(!i)return null;const e=Ud(i);return e.ok?e.state:null}catch{return null}}function od(){jx();const i=Q.facilities[xt];if(!i.unlocked){const n=Wh(Q,xt);n.ok?(Zx(),De(`${sn[xt].name} 已解锁`),xt==="transport"&&(Gi("解锁运输线"),Or()),xt==="refinery"&&Gi("建成晶体精炼厂"),xt==="he3Excavator"&&Gi("解锁第二矿区"),xt==="deuteriumExcavator"&&Gi("解锁第三矿区"),xt==="energyStation"&&Gi("解锁能源站"),et("解锁")):De(n.reason??"解锁失败","error");return}const e=en(Q,xt),t=Vh(Q,xt);if(t.ok){const n=en(Q,xt);Ec.flashUpgrade(e,n),_i.pulseFacility(xt),Kx(),De(`${sn[xt].name} 升至 Lv.${i.level}`),xt==="excavator"&&i.level===2&&(Gi("首次升级"),Or()),et("升级")}else De(t.reason??"升级失败","error")}function cd(i){$h(Q,i),De(`能源策略：${vr[i]}`),i!=="balanced"&&Or(),et("策略")}function Ly(i,e){const t=ja(Q,i,e);t>0&&(De(`售出获得 ${Pe(t)} 信用点`),Or()),et("交易")}function Iu(i){for(const e of i)De(`成就达成：${e.name}（+${Pe(e.rewardCredits)} 信用点 +${e.rewardCrystals} 晶体）`);i.length>0&&et("成就")}function Uu(){return{onResearch:i=>{var t;const e=Hh(Q,i);e.ok?(De(`研究完成：${((t=ts[i])==null?void 0:t.name)??i}`),et("研究"),Iu(Td(Q)),wu(Q,Uu())):De(e.reason??"研究失败","error")}}}function Dy(){if(!Q.researchCenterUnlocked){De("需先解锁研究中心：累计产出 50 晶体 + 第二矿区，等待无人机事件出现「发现古代数据核心」","error");return}wu(Q,Uu())}function Iy(){My(Q)}function Uy(){const i=Date.now(),e=Nf(Q,i),t=zf(Q),n=Gf(Q),s=Vf(e.permanentBonuses);ly({preview:e,breakdown:t,review:n,bonuses:s,now:i,handlers:{onCancel:()=>{},onConfirm:async()=>{const r=await Nr.runSerialized(()=>Ff(Sc,Q,Date.now()));if(!r.ok){De(r.error??"转生失败","error");return}xt="excavator",jt=null,await _i.playPrestigeSequence(),De(`转生完成！等级 Lv.${Q.prestige.prestigeLevel}，星核 +${r.stardustEarned}`),et("转生")}}})}function Ny(){yy(Q)}let As=null;function Oy(){if(As!=null&&As.isOpen()){As.close();return}As=fy(Q,{onPurchase:async i=>{const e=On[i],t=await Nr.runSerialized(()=>Ih(Sc,Q,i));t.ok?(De(`购买成功：${(e==null?void 0:e.name)??i} → Lv.${t.newLevel}（消耗 ${t.cost} 星核）`),et("商店")):De(t.error??"购买失败","error")}})}function Xa(){gy({createdAt:Q.createdAt,lastSavedAt:Q.lastSavedAt},{onExport:()=>Xf(Q),onImport:i=>void ky(i),onExportCsv:By})}function Fy(){xy(Q,{onApply:i=>{Q.credits=i.credits,Q.stardust=i.stardust,Q.crystal=i.crystal;for(const e of tn)Q.facilities[e].level=Math.min(Ko,Math.max(1,i.levels[e])),i.unlockAll&&(Q.facilities[e].unlocked=!0);et("调试"),De("调试数值已应用")},onDrone:()=>{const i={id:`ev-debug-${Date.now()}`,kind:"drone",createdAt:Date.now()};Q.eventState.pendingEvent=i,Ru(i)},onStorm:()=>{Q.eventState.solarStormUntil=Date.now()+pd,Ir("solar-storm"),Du(),De("太阳风暴已触发"),et("调试")},onOffline:i=>{Q.lastSavedAt=Date.now()-i*3600*1e3;const e=Za(Q,Date.now());e.applied&&qo(e,()=>{}),et("调试")}})}async function ky(i){const e=await qf(i);if(!e.ok){De(`导入失败：${e.error}，当前进度保持不变`,"error");return}vy(e.state,()=>{Q=e.state,xt="excavator",jt=null,et("导入").then(()=>De("存档导入成功"))})}function By(){const i="里程碑,用时(秒)",e=Yo.map(t=>`${t.name},${(t.atMs/1e3).toFixed(1)}`);$f("星际矿站_节奏数据.csv",[i,...e].join(`
`)),De("节奏数据已导出")}function zy(i){var e;return((e=_n(i))==null?void 0:e.name)??i}function Hy(i){if(!Vt||!jt)return;const e=Vt.getProductionMult("stardust",i);if(e>1){const n=jt.producedStardust*(e-1);n>0&&(Q.stardust=Math.max(0,Q.stardust+n),Q.stats.totalStardustProduced+=n)}const t=Vt.getProductionMult("crystal",i);if(t>1){const n=jt.refinedCrystal*(t-1);n>0&&(Q.crystal=Math.max(0,Q.crystal+n),Q.stats.totalCrystalProduced+=n)}}function Gy(){Is&&Is.setVisible(dt(Q,"rareIsotopeMining"))}function Nu(i){const e=Math.min(i-ld,500);for(ld=i,$a+=e;$a>=Ga;){const n=Date.now();if(jt=Pd(Q,Ga,{now:n}),$a-=Ga,Xh(Q),Hy(n),Vt){const s=Vt.tick(Q,n);for(const r of s.completed){const a=Ls[r.targetId],o=a?`${zy(a.reward.resourceId)} ×${a.reward.amount}`:"探索奖励";De(`探索完成：${(a==null?void 0:a.name)??r.targetId}，获得 ${o}`),et("探索完成")}}}i-dd>=1e3&&(dd=i,Iu(Td(Q)));const t=Zh(Q,Date.now());t&&wy(t),Cu.update(Q),Ec.update(Q,xt,jt),Is&&Vt&&Is.update(Q,Vt,Date.now()),Py(),Ry(),Gy(),_i.sync(Ty()),requestAnimationFrame(Nu)}let ld=performance.now(),$a=0,dd=0,Tr=null;function Vy(){Tr!==null&&(clearInterval(Tr),Tr=null)}async function Wy(){Tx(),$x();try{const o=await Ur.load();o?Q=o:Q=ad()??Nc(Date.now())}catch(o){Q=ad()??Nc(Date.now()),De(`无法读取浏览器存档：${o instanceof Error?o.message:"未知错误"}，已尝试恢复快照`,"error")}my(),Cu=new Jx,Gt("version-label").textContent=`Web 原型 ${Hu}`,Gt("btn-guide-close").addEventListener("click",()=>{Lu=!0,Gt("guide-card").hidden=!0,jo()}),Ec=new iy({onFacilityAction:od,onEnergy:cd,onSell:Ly,onReleaseEnergy:()=>{const o=Yh(Q,Date.now());o.ok?(De("储备释放：30 秒全设施 ×1.2"),et("释放")):De(o.reason??"无法释放储备","error")},onAutoSell:(o,c,l)=>{const d=o==="stardust"?"星尘矿":"晶体";o==="stardust"?(Q.settings.autoSellStardust=c,Q.settings.stardustKeepAmount=l):(Q.settings.autoSellCrystal=c,Q.settings.crystalKeepAmount=l),De(c?`${d}自动出售已开启（保留 ${l} 个）`:`${d}自动出售已关闭`),et("设置")}}),Nr=new Tf(Sc),Vt=new Pf(Nr),Is=new sy({onActivateBuff:async o=>{const c=Rr[o],l=await Vt.activateBuff(Q,o,Date.now());l.ok?(De(`${(c==null?void 0:c.name)??"buff"} 已激活`),et("反应堆")):De(l.reason??"激活失败","error")},onDispatch:async o=>{const c=Ls[o],l=await Vt.dispatchExploration(Q,o,Date.now());l.ok?(De(`已派遣：${(c==null?void 0:c.name)??o}`),et("反应堆")):De(l.reason??"派遣失败","error")},onExchange:async o=>{const c=to[o],l=await Vt.exchange(Q,o);l.ok?(De(`${(c==null?void 0:c.name)??"兑换"} 完成`),et("反应堆")):De(l.reason??"兑换失败","error")}}),Q.createdAt===Q.lastSavedAt&&!Q.facilities.transport.unlocked&&Q.credits===100&&De("提示：出售星尘矿可赚信用点，先解锁运输线（600），再建精炼厂（1000）；点击场景设施可查看详情");const e=Date.now(),t=e-Q.lastSavedAt>=id?Za(Q,e):null;t!=null&&t.applied&&(qo(t,()=>{}),et("离线结算"));const n=Gt("scene-host"),s=Gt("scene-labels");_i.init(n,s,{onSelect:o=>{xt=o??"excavator"}}),_i.start(),Gt("btn-save-modal").addEventListener("click",Xa),document.querySelectorAll(".nav-btn").forEach(o=>{o.addEventListener("click",()=>{const c=o.dataset.page;if(c==="save")Xa();else if(c==="starmap")Ny();else if(c==="research")Dy();else if(c==="achievements")Iy();else if(c==="prestige")Uy();else if(c==="shop")Oy();else if(c==="reactor"){if(!dt(Q,"rareIsotopeMining")){De("需先完成「稀有同位素开采」研究","error");return}const l=document.getElementById("reactor-card");l&&!l.hidden&&l.scrollIntoView({behavior:"smooth",block:"nearest"})}else c==="help"&&Sy()})});const r=Gt("btn-sfx"),a=()=>{r.textContent=Ql()?"音效：开":"音效：关",r.classList.toggle("sfx-off",!Ql())};r.addEventListener("click",()=>{Yx(),a()}),a(),Wf({onStrategy:cd,onUpgrade:od,onCloseModal:()=>document.dispatchEvent(new Event("modal:close")),onOpenSave:Xa,onDebug:Fy}),Tr=window.setInterval(()=>void et("定时"),Ey),document.addEventListener("visibilitychange",()=>{if(document.hidden)gr=Date.now(),et("隐藏");else if(gr!==null){const o=Date.now()-gr;if(gr=null,o>id){const c=Za(Q,Date.now());c.applied&&(qo(c,()=>{}),et("离线结算"))}}}),window.addEventListener("beforeunload",()=>{Q.lastSavedAt=Date.now(),rd(Q),Ur.save(Q),Vy()}),window.addEventListener("pagehide",()=>{Q.lastSavedAt=Date.now(),rd(Q)}),document.addEventListener("modal:open",()=>_i.setPaused(!0)),document.addEventListener("modal:closed",()=>_i.setPaused(!1)),requestAnimationFrame(Nu),et("启动")}Wy();
