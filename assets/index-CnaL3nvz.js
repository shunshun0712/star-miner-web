var Rh=Object.defineProperty;var Ph=(i,t,e)=>t in i?Rh(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var F=(i,t,e)=>Ph(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Lh="v0.5",Er=8,Ur=5,Dh=8*3600*1e3,Ih=4,Uh=8,Ga=1,au=1.7,Nh=.2,Fh=.25,Tc=3,Oh=1250,kh=20,Bh=100,ou=120*1e3,wc=180*1e3,zh=300*1e3,Hh=30*1e3,Gh=1.5,Zr=50,cu=60*1e3,Vh=.8,Wh=.9,Va=200,Xh=.05,Xo=50,lu=10,$h=[{id:"credits",name:"信用点",description:"星际通用货币，用于解锁设施、升级和研究",category:"currency",sellable:!1,consumable:!0,stateKey:"credits",schemaVersion:1},{id:"crystal",name:"晶体",description:"精炼星尘得到的晶体，用于高级升级和科技研究",category:"material",sellable:!0,consumable:!0,stateKey:"crystal",schemaVersion:1},{id:"isotope",name:"同位素",description:"稀有矿同位素，T3/T4 节点消耗预留资源",category:"rare",sellable:!1,consumable:!0,stateKey:"isotope",schemaVersion:1},{id:"antimatter",name:"反物质",description:"T3 科技节点消耗的稀有资源，通过深空探索获取",category:"rare",sellable:!1,consumable:!0,stateKey:"antimatter",schemaVersion:1},{id:"darkmatter",name:"暗物质",description:"T4 科技节点消耗的稀有资源，通过深空探索获取",category:"rare",sellable:!1,consumable:!0,stateKey:"darkmatter",schemaVersion:1}],qh=50,Yh=1e3,jh=15,Kh=.2,Nr=200,br=100,Zh=30*1e3,Jh=60*1e3,Qh=1.2,td=.8,ed=.9,nd=1.15,id=1.1,sd=1.2,rd=1.3,ad=2,od=1.05,cd=.9,ld=1.25,ud=.2,hd=.05,dd=.5,fd=1,pd=3,md=10,gd=.01,nn={excavator:{id:"excavator",name:"星尘采掘器",baseSpeed:1.2,baseCapacity:2e3,baseUpgradeCost:50,baseCrystalUpgradeCost:4,unlockCost:0,produces:"stardust",rateUnit:"星尘矿/秒"},he3Excavator:{id:"he3Excavator",name:"氦-3 采掘器",baseSpeed:1.2,baseCapacity:2e3,baseUpgradeCost:50,baseCrystalUpgradeCost:4,unlockCost:Oh,produces:"stardust",rateUnit:"星尘矿/秒"},deuteriumExcavator:{id:"deuteriumExcavator",name:"氘采掘器",baseSpeed:1.4,baseCapacity:2500,baseUpgradeCost:80,baseCrystalUpgradeCost:6,unlockCost:3e3,produces:"stardust",rateUnit:"星尘矿/秒"},transport:{id:"transport",name:"磁轨运输线",baseSpeed:1,baseCapacity:2e3,baseUpgradeCost:120,baseCrystalUpgradeCost:6,unlockCost:600,produces:"stardust",rateUnit:"星尘矿/秒"},refinery:{id:"refinery",name:"晶体精炼厂",baseSpeed:.25,baseCapacity:1e3,baseUpgradeCost:300,baseCrystalUpgradeCost:10,unlockCost:1e3,produces:"crystal",consumes:{resource:"stardust",amountPerOutput:4},rateUnit:"晶体/秒"},energyStation:{id:"energyStation",name:"能源站",baseSpeed:1,baseCapacity:0,baseUpgradeCost:200,baseCrystalUpgradeCost:8,unlockCost:Yh,produces:"energy",rateUnit:"能量/秒"}},tn=["excavator","he3Excavator","deuteriumExcavator","transport","refinery","energyStation"],uu={excavation:{excavator:1.35,he3Excavator:1.35,deuteriumExcavator:1.35,transport:.9,refinery:.9,energyStation:1},balanced:{excavator:1,he3Excavator:1,deuteriumExcavator:1,transport:1,refinery:1,energyStation:1},refinement:{excavator:.9,he3Excavator:.9,deuteriumExcavator:.9,transport:.9,refinery:1.35,energyStation:1}},_d={excavation:{excavator:.6,he3Excavator:.6,deuteriumExcavator:.6,transport:1.3,refinery:1.3,energyStation:0},balanced:{excavator:1,he3Excavator:1,deuteriumExcavator:1,transport:1,refinery:1,energyStation:0},refinement:{excavator:1.3,he3Excavator:1.3,deuteriumExcavator:1.3,transport:1.3,refinery:.6,energyStation:0}},vd=["excavator","he3Excavator","deuteriumExcavator","transport","refinery"],hu=["excavation","balanced","refinement"],pr={excavation:"采掘优先",balanced:"均衡运行",refinement:"精炼优先"},du=["excavation","energy","refinement","transport"],xd={excavation:"采掘科技",energy:"能源科技",refinement:"精炼科技",transport:"运输科技"},$o=[{id:"basicResearch",branch:"excavation",tier:0,name:"基础研究",description:"建立研究中心，解锁四大科技分支",cost:15,requires:[]},{id:"drillHardening",branch:"excavation",tier:1,name:"强化钻头",description:"所有采掘器 +15% 产量",cost:20,requires:["basicResearch"]},{id:"veinProspecting",branch:"excavation",tier:1,name:"矿脉探测",description:"采掘按期望 +10% 产量（10% 概率双倍）",cost:25,requires:["basicResearch"]},{id:"autoMiningArray",branch:"excavation",tier:2,name:"自动采掘阵列",description:"每个采掘器额外 +1 级自动产出（不占等级上限）",cost:80,requires:["drillHardening"]},{id:"rareIsotopeMining",branch:"excavation",tier:2,name:"稀有矿同位素",description:"采掘时有概率获得「同位素」（按期望 5%/秒）",cost:100,requires:["veinProspecting"]},{id:"quantumMining",branch:"excavation",tier:3,name:"量子采掘",description:"采掘速度 +50%（后续版本开放）",cost:300,requires:["autoMiningArray"]},{id:"nanoCollector",branch:"excavation",tier:3,name:"纳米采集器",description:"同位素获取概率提升（后续版本开放）",cost:350,requires:["rareIsotopeMining"]},{id:"coreMiningProtocol",branch:"excavation",tier:4,name:"星核采掘协议",description:"所有采掘器产量 ×2（后续版本开放）",cost:800,requires:["quantumMining","nanoCollector"]},{id:"highEfficiencyTurbine",branch:"energy",tier:1,name:"高效涡轮",description:"全设施能源消耗 -10%",cost:20,requires:["basicResearch"]},{id:"solarPanels",branch:"energy",tier:1,name:"太阳能板",description:"均衡策略下全设施产量 +5%",cost:25,requires:["basicResearch"]},{id:"energyReserve",branch:"energy",tier:2,name:"能源储备",description:"解锁能量储备池（200 容量）与「释放储备」",cost:80,requires:["highEfficiencyTurbine"]},{id:"overloadProtection",branch:"energy",tier:2,name:"过载保护",description:"能源不足惩罚由 -20% 降至 -10%",cost:100,requires:["solarPanels"]},{id:"fusionReactor",branch:"energy",tier:3,name:"聚变反应堆",description:"解锁第四档聚变模式（后续版本开放）",cost:300,requires:["energyReserve"]},{id:"smartGrid",branch:"energy",tier:3,name:"智能电网",description:"设施独立能源策略（后续版本开放）",cost:350,requires:["overloadProtection"]},{id:"zeroPointExtraction",branch:"energy",tier:4,name:"零点能提取",description:"能源不再受限（后续版本开放）",cost:800,requires:["fusionReactor","smartGrid"]},{id:"efficientCatalysis",branch:"refinement",tier:1,name:"高效催化",description:"精炼速度 +20%",cost:20,requires:["basicResearch"]},{id:"recipeOptimization",branch:"refinement",tier:1,name:"配方优化",description:"精炼配方 4:1 → 3:1",cost:30,requires:["basicResearch"]},{id:"byproductRecovery",branch:"refinement",tier:2,name:"副产品回收",description:"精炼时额外产出 20% 星尘",cost:80,requires:["efficientCatalysis"]},{id:"crystalQuality",branch:"refinement",tier:2,name:"晶体品质",description:"晶体售价 +25%",cost:100,requires:["recipeOptimization"]},{id:"quantumRefining",branch:"refinement",tier:3,name:"量子精炼",description:"2:1 配方与高品质晶体（后续版本开放）",cost:350,requires:["byproductRecovery"]},{id:"autoRefiningChain",branch:"refinement",tier:3,name:"自动精炼链",description:"精炼厂等级上限 +2（后续版本开放）",cost:300,requires:["crystalQuality"]},{id:"matterRecomposition",branch:"refinement",tier:4,name:"物质重组",description:"1:1 配方与晶体裂变（后续版本开放）",cost:900,requires:["quantumRefining","autoRefiningChain"]},{id:"railAcceleration",branch:"transport",tier:1,name:"磁轨加速",description:"运输速度 +30%",cost:20,requires:["basicResearch"]},{id:"cargoExpansion",branch:"transport",tier:1,name:"扩容货舱",description:"运输容量 +50%",cost:25,requires:["basicResearch"]},{id:"parallelRails",branch:"transport",tier:2,name:"多轨并行",description:"运输速度 ×2",cost:120,requires:["railAcceleration"]},{id:"droneLogistics",branch:"transport",tier:2,name:"无人机配送",description:"解锁物流无人机：0.5 星尘/秒直送精炼缓冲",cost:100,requires:["cargoExpansion"]},{id:"quantumTeleport",branch:"transport",tier:3,name:"量子传送",description:"运输瞬间到达（后续版本开放）",cost:400,requires:["parallelRails"]},{id:"logisticsAI",branch:"transport",tier:3,name:"物流 AI",description:"自动优化运输优先级（后续版本开放）",cost:300,requires:["droneLogistics"]},{id:"spaceFold",branch:"transport",tier:4,name:"空间折叠",description:"所有矿区共享库存池（后续版本开放）",cost:850,requires:["quantumTeleport","logisticsAI"]}],Qi=Object.fromEntries($o.map(i=>[i.id,i])),qo=[{id:"p100Stardust",category:"production",name:"初出茅庐",description:"累计产出 100 星尘矿",rewardCredits:50,rewardCrystals:1},{id:"p1000Stardust",category:"production",name:"星尘大户",description:"累计产出 1000 星尘矿",rewardCredits:150,rewardCrystals:3},{id:"p100Crystal",category:"production",name:"晶体学徒",description:"累计产出 100 晶体",rewardCredits:300,rewardCrystals:5},{id:"p500Crystal",category:"production",name:"晶体工匠",description:"累计产出 500 晶体",rewardCredits:800,rewardCrystals:10},{id:"p1000Crystal",category:"production",name:"晶体大师",description:"累计产出 1000 晶体",rewardCredits:1500,rewardCrystals:20},{id:"c1000Credits",category:"production",name:"第一桶金",description:"累计获得 1000 信用点",rewardCredits:100,rewardCrystals:2},{id:"c10000Credits",category:"production",name:"致富之路",description:"累计获得 10000 信用点",rewardCredits:500,rewardCrystals:8},{id:"e1000Energy",category:"production",name:"能源先驱",description:"累计产出 1000 能量",rewardCredits:200,rewardCrystals:4},{id:"allFacilities",category:"construction",name:"设施齐全",description:"解锁全部 6 个设施",rewardCredits:400,rewardCrystals:6},{id:"allLevel3",category:"construction",name:"全员三级",description:"所有已解锁设施达到 3 级",rewardCredits:500,rewardCrystals:8},{id:"anyLevel5",category:"construction",name:"满级王者",description:"任一设施达到 5 级",rewardCredits:600,rewardCrystals:10},{id:"researchCenter",category:"construction",name:"研究中心成立",description:"解锁研究中心",rewardCredits:300,rewardCrystals:5},{id:"allMines",category:"construction",name:"矿区全开",description:"解锁第二与第三矿区",rewardCredits:350,rewardCrystals:6},{id:"tBasic",category:"tech",name:"启蒙",description:"完成基础研究",rewardCredits:100,rewardCrystals:2},{id:"tBranchT1",category:"tech",name:"分支奠基",description:"任一分支完成全部 T1 科技",rewardCredits:200,rewardCrystals:4},{id:"t5",category:"tech",name:"科技新星",description:"累计研究 5 个科技",rewardCredits:400,rewardCrystals:6},{id:"t10",category:"tech",name:"科技学者",description:"累计研究 10 个科技",rewardCredits:800,rewardCrystals:12},{id:"tExcavation",category:"tech",name:"采掘学成",description:"完成采掘分支 T1–T2 全部科技",rewardCredits:600,rewardCrystals:10},{id:"tRefinement",category:"tech",name:"精炼学成",description:"完成精炼分支 T1–T2 全部科技",rewardCredits:600,rewardCrystals:10},{id:"ev10",category:"event",name:"事件初体验",description:"累计触发 10 次事件",rewardCredits:150,rewardCrystals:3},{id:"evDrone20",category:"event",name:"无人机常客",description:"处理 20 次无人机事件",rewardCredits:300,rewardCrystals:5},{id:"evStorm3",category:"event",name:"风暴见证者",description:"经历 3 次太阳风暴",rewardCredits:250,rewardCrystals:4},{id:"evInvest1",category:"event",name:"投资有道",description:"完成 1 次投入型事件",rewardCredits:200,rewardCrystals:4},{id:"ev30",category:"event",name:"事件达人",description:"累计触发 30 次事件",rewardCredits:500,rewardCrystals:8},{id:"xIsotope10",category:"exploration",name:"同位素收藏家",description:"累计获得 10 个同位素",rewardCredits:300,rewardCrystals:5},{id:"xHe3L3",category:"exploration",name:"氦三深潜",description:"氦-3 采掘器达到 3 级",rewardCredits:250,rewardCrystals:4},{id:"xDeutL3",category:"exploration",name:"氘三远征",description:"氘-3 采掘器达到 3 级",rewardCredits:350,rewardCrystals:6},{id:"hOffline",category:"hidden",name:"深空静默",description:"单次离线收益达到 500 晶体",rewardCredits:1e3,rewardCrystals:20},{id:"hEnergyFull",category:"hidden",name:"能量富余",description:"能量储备达到 200",rewardCredits:400,rewardCrystals:8},{id:"hCombo",category:"hidden",name:"科技能源双修",description:"研究科技 ≥6 个且能量储备 ≥100",rewardCredits:700,rewardCrystals:12}],yd=Object.fromEntries(qo.map(i=>[i.id,i])),Md={production:"生产",construction:"建设",tech:"科技",event:"事件",exploration:"探索",hidden:"隐藏"};function ue(i,t){return i.research.includes(t)}function fu(i,t){var n;const e=Qi[t];if(!e)return{ok:!1,reason:"未知科技"};if(ue(i,t))return{ok:!1,reason:"已研究"};if(e.tier>2)return{ok:!1,reason:"后续版本开放"};for(const s of e.requires)if(!ue(i,s))return{ok:!1,reason:`需先研究「${((n=Qi[s])==null?void 0:n.name)??s}」`};return i.crystal<e.cost?{ok:!1,reason:`晶体不足（需 ${e.cost}）`}:{ok:!0}}function Sd(i,t){const e=fu(i,t);return e.ok?(i.crystal-=Qi[t].cost,i.research.push(t),i.stats.researchesCompleted+=1,{ok:!0}):e}function Jr(i,t,e,n){const s=$o.filter(r=>r.branch===t&&r.tier>=e&&r.tier<=n);return s.length>0&&s.every(r=>ue(i,r.id))}function pu(i){return i.achievements.length}function mu(i){return 1+Math.floor(pu(i)/md)*gd}function Ed(i,t){const e=i.stats;switch(t){case"p100Stardust":return e.totalStardustProduced>=100;case"p1000Stardust":return e.totalStardustProduced>=1e3;case"p100Crystal":return e.totalCrystalProduced>=100;case"p500Crystal":return e.totalCrystalProduced>=500;case"p1000Crystal":return e.totalCrystalProduced>=1e3;case"c1000Credits":return e.totalCreditsEarned>=1e3;case"c10000Credits":return e.totalCreditsEarned>=1e4;case"e1000Energy":return e.totalEnergyProduced>=1e3;case"allFacilities":return tn.every(n=>i.facilities[n].unlocked);case"allLevel3":{const n=tn.filter(s=>i.facilities[s].unlocked);return n.length>0&&n.every(s=>i.facilities[s].level>=3)}case"anyLevel5":return tn.some(n=>i.facilities[n].level>=5);case"researchCenter":return i.researchCenterUnlocked;case"allMines":return i.facilities.he3Excavator.unlocked&&i.facilities.deuteriumExcavator.unlocked;case"tBasic":return ue(i,"basicResearch");case"tBranchT1":return du.some(n=>Jr(i,n,1,1));case"t5":return e.researchesCompleted>=5;case"t10":return e.researchesCompleted>=10;case"tExcavation":return Jr(i,"excavation",1,2);case"tRefinement":return Jr(i,"refinement",1,2);case"ev10":return e.eventsTriggered>=10;case"evDrone20":return e.droneEventsHandled>=20;case"evStorm3":return e.solarStormsExperienced>=3;case"evInvest1":return e.investmentsMade>=1;case"ev30":return e.eventsTriggered>=30;case"xIsotope10":return e.totalIsotopeProduced>=10;case"xHe3L3":return i.facilities.he3Excavator.level>=3;case"xDeutL3":return i.facilities.deuteriumExcavator.level>=3;case"hOffline":return e.lastOfflineCrystalGain>=500;case"hEnergyFull":return i.energy>=Nr;case"hCombo":return e.researchesCompleted>=6&&i.energy>=100;default:return!1}}function gu(i){const t=[];for(const e of qo)i.achievements.includes(e.id)||Ed(i,e.id)&&(i.achievements.push(e.id),i.credits+=e.rewardCredits,i.crystal+=e.rewardCrystals,t.push(e));return t}function Yo(i){const t=Uh;return ue(i,"crystalQuality")?t*ld:t}function Fr(i,t){const e=nn[t];return Math.round(e.baseUpgradeCost*Math.pow(au,i.facilities[t].level-1)+1e-9)}function Or(i,t){const e=i.facilities[t];if(e.level<Tc)return 0;const n=nn[t];return Math.round(n.baseCrystalUpgradeCost*Math.pow(au,e.level-Tc)+1e-9)}function _u(i,t){const e=i.facilities[t];if(!e.unlocked)return{ok:!1,reason:"设施未解锁"};if(e.level>=Ur)return{ok:!1,reason:"已达最高等级"};const n=Fr(i,t);if(i.credits<n)return{ok:!1,reason:`信用点不足（需 ${n}）`};const s=Or(i,t);return i.crystal<s?{ok:!1,reason:`晶体不足（需 ${s}）`}:{ok:!0}}function bd(i,t){const e=_u(i,t);if(!e.ok)return e;const n=Fr(i,t),s=Or(i,t);return i.credits-=n,i.crystal-=s,i.facilities[t].level+=1,i.stats.upgradesPerformed+=1,{ok:!0}}function jo(i,t){return nn[t].unlockCost}function Ko(i,t){return t==="he3Excavator"?kh:t==="deuteriumExcavator"?Bh:t==="energyStation"?jh:0}function vu(i,t){if(i.facilities[t].unlocked)return{ok:!1,reason:"设施已解锁"};const n=jo(i,t);if(i.credits<n)return{ok:!1,reason:`信用点不足（需 ${n}）`};const s=Ko(i,t);return i.crystal<s?{ok:!1,reason:`晶体不足（需 ${s}）`}:{ok:!0}}function Td(i,t){const e=vu(i,t);return e.ok?(i.credits-=jo(i,t),i.crystal-=Ko(i,t),i.facilities[t].unlocked=!0,{ok:!0}):e}function Wa(i,t,e){if(t==="stardust"){const n=i.stardust;if(n<=0)return 0;const s=e===void 0?n:Math.max(0,Math.min(Math.floor(e),n));if(s<=0)return 0;const r=s*Ga;return i.credits+=r,i.stardust-=s,i.stats.totalCreditsEarned+=r,r}if(t==="crystal"){const n=i.crystal;if(n<=0)return 0;const s=e===void 0?n:Math.max(0,Math.min(Math.floor(e),n));if(s<=0)return 0;const r=s*Yo(i);return i.credits+=r,i.crystal-=s,i.stats.totalCreditsEarned+=r,r}return 0}function wd(i){const t={stardust:0,crystal:0};if(i.settings.autoSellStardust){const e=Math.floor(i.stardust-i.settings.stardustKeepAmount);e>0&&(t.stardust+=Wa(i,"stardust",e))}if(i.settings.autoSellCrystal){const e=Math.floor(i.crystal-i.settings.crystalKeepAmount);e>0&&(t.crystal+=Wa(i,"crystal",e))}return t}function Ad(i,t){hu.includes(t)&&(i.energyStrategy=t)}function Zo(i){const t=ue(i,"highEfficiencyTurbine")?cd:1,e=_d[i.energyStrategy];let n=0;for(const s of vd)i.facilities[s].unlocked&&(n+=Kh*e[s]);return n*t}function Cd(i,t){return i.energyReleaseUntil>t}function xu(i,t){return ue(i,"energyReserve")?t<i.energyReleaseCooldownUntil?{ok:!1,reason:"储备释放冷却中"}:i.energy<br?{ok:!1,reason:`能量不足（需 ${br}）`}:{ok:!0}:{ok:!1,reason:"需先研究「能源储备」"}}function Rd(i,t){const e=xu(i,t);return e.ok?(i.energy-=br,i.energyReleaseUntil=t+Zh,i.energyReleaseCooldownUntil=t+Jh,{ok:!0}):e}function Pd(i,t,e){let n=1;return i.eventState.investUsed&&t==="excavator"&&(n*=1+Xh),e<i.eventState.droneBoostUntil&&(n*=Gh),e<i.eventState.solarStormUntil&&(n*=i.energyStrategy==="balanced"?Wh:Vh),n}function yu(i,t,e=Math.random){const n=wc+e()*(zh-wc);return t+n}function Ld(i,t=Math.random){const e=t(),n=!i.eventState.investUsed&&i.credits>=Va;if(n&&e<.15)return"invest";let s=e;return!n&&e<.15&&(s=t()),s<.4?"solar-storm":"drone"}function Dd(i,t,e=Math.random){if(i.eventState.pendingEvent||t<i.eventState.nextEventAt)return null;const n=Ld(i,e),s={id:`ev-${t}-${Math.floor(e()*1e6)}`,kind:n,createdAt:t};return i.stats.eventsTriggered+=1,n==="solar-storm"?(i.eventState.solarStormUntil=t+cu,i.stats.solarStormsExperienced+=1):i.eventState.pendingEvent=s,i.eventState.nextEventAt=yu(i,t,e),s}function Tr(i,t,e={}){const n=i.eventState.pendingEvent;if(!n||n.id!==t)return{ok:!1,reason:"事件不存在"};if(n.kind==="drone"){const s=e.choice;return s?(i.eventState.pendingEvent=null,i.stats.droneEventsHandled+=1,s==="A"?(i.credits+=Zr,i.stats.totalCreditsEarned+=Zr,{ok:!0,kind:"drone",choice:s,creditsGained:Zr}):(i.eventState.droneBoostUntil=(e.now??Date.now())+Hh,{ok:!0,kind:"drone",choice:s})):{ok:!1,reason:"请选择 A 或 B"}}return n.kind==="invest"?(i.eventState.pendingEvent=null,e.confirm!==!0?{ok:!0,kind:"invest",applied:!1}:i.credits<Va?{ok:!1,reason:"信用点不足"}:(i.credits-=Va,i.eventState.investUsed=!0,i.stats.investmentsMade+=1,{ok:!0,kind:"invest",applied:!0})):{ok:!1,reason:"无需结算的事件"}}function Ot(i){if(!Number.isFinite(i))return"∞";const t=Math.abs(i);return t>=1e9?`${Qr(i/1e9)}B`:t>=1e6?`${Qr(i/1e6)}M`:t>=1e3?`${Qr(i/1e3)}K`:Number.isInteger(i)?i.toLocaleString("en-US"):i.toLocaleString("en-US",{maximumFractionDigits:2})}function Qr(i){return i.toFixed(2).replace(/\.?0+$/,"")}function Kn(i){const t=Math.floor(i/1e3);if(t<60)return`${t} 秒`;const e=Math.floor(t/60);if(e<60)return`${e} 分钟`;const n=Math.floor(e/60),s=e%60;if(n<24)return s>0?`${n} 小时 ${s} 分`:`${n} 小时`;const r=Math.floor(n/24),a=n%24;return a>0?s>0?`${r} 天 ${a} 小时 ${s} 分`:`${r} 天 ${a} 小时`:`${r} 天`}function fs(i,t){return`${i.toFixed(2)} ${t}`}const Id=["excavator","he3Excavator","deuteriumExcavator"];function Ac(i){return Id.includes(i)}function Jo(i){return ue(i,"recipeOptimization")?pd:Ih}function Xa(i,t,e,n=Date.now()){const s=i.facilities[t];if(!s.unlocked)return 0;const r=nn[t],a=uu[i.energyStrategy][t];let o=e??s.level;Ac(t)&&ue(i,"autoMiningArray")&&(o+=fd);let c=1;return Ac(t)&&(ue(i,"drillHardening")&&(c*=nd),ue(i,"veinProspecting")&&(c*=id)),t==="refinery"&&ue(i,"efficientCatalysis")&&(c*=sd),t==="transport"&&(ue(i,"railAcceleration")&&(c*=rd),ue(i,"parallelRails")&&(c*=ad)),ue(i,"solarPanels")&&i.energyStrategy==="balanced"&&(c*=od),Cd(i,n)&&(c*=Qh),c*=mu(i),r.baseSpeed*a*(1+Nh*(o-1))*Pd(i,t,n)*c}function Qe(i,t,e=Date.now()){return Xa(i,t,void 0,e)}function Gi(i,t){const e=i.facilities[t];return e.unlocked?nn[t].baseCapacity*(1+Fh*(e.level-1)):0}function Ud(i,t=Date.now()){return{excavator:Qe(i,"excavator",t),he3Excavator:Qe(i,"he3Excavator",t),deuteriumExcavator:Qe(i,"deuteriumExcavator",t),transport:Qe(i,"transport",t),refinery:Qe(i,"refinery",t),energyStation:Qe(i,"energyStation",t)}}function Nd(i,t){const e=[];if(!i.facilities.excavator.unlocked)return e;if(t.excavator+t.he3Excavator+t.deuteriumExcavator>t.transport){const r=[];if(i.facilities.excavator.unlocked&&r.push(["excavator",t.excavator]),i.facilities.he3Excavator.unlocked&&r.push(["he3Excavator",t.he3Excavator]),i.facilities.deuteriumExcavator.unlocked&&r.push(["deuteriumExcavator",t.deuteriumExcavator]),r.length>0){let a=r[0][0],o=r[0][1];for(let c=1;c<r.length;c+=1)r[c][1]<o&&(o=r[c][1],a=r[c][0]);e.push(a)}}const s=t.refinery*Jo(i);return t.transport>s&&e.push("transport"),e}function Fd(i,t,e){if(!i.facilities.energyStation.unlocked)return{deficitFactor:1};const n=ue(i,"energyReserve"),s=t*e-Zo(i)*e;let r=0;if(n){const o=i.energy;i.energy=Math.max(0,Math.min(Nr,o+s)),s<0&&(r=Math.max(0,-s-o))}else s<0&&(r=-s);return{deficitFactor:r>1e-9?ue(i,"overloadProtection")?ed:td:1}}function Mu(i,t,e={}){const n=t/1e3,s=e.now??Date.now(),r=Ud(i,s),a=e.unboundedCapacity===!0,o=r.energyStation*n;r.energyStation>0&&(i.stats.totalEnergyProduced+=o);const{deficitFactor:c}=Fd(i,r.energyStation,n),l=z=>z*c,u=Gi(i,"excavator")+Gi(i,"he3Excavator")+Gi(i,"deuteriumExcavator"),h=Gi(i,"transport"),d=Gi(i,"refinery"),p=a?1/0:Math.max(0,u-i.stardust),g=Math.min(l(r.excavator+r.he3Excavator+r.deuteriumExcavator)*n,p);i.stardust=Math.max(0,i.stardust+g),i.stats.totalStardustProduced+=g;let _=0;ue(i,"rareIsotopeMining")&&(_=l(r.excavator+r.he3Excavator+r.deuteriumExcavator)*n*hd,i.isotope=Math.max(0,i.isotope+_),i.stats.totalIsotopeProduced+=_);const m=i.facilities.transport.unlocked,f=i.facilities.refinery.unlocked,M=r.excavator+r.he3Excavator+r.deuteriumExcavator,b=m&&(M>r.transport||f&&i.refineryBuffer>=h-.01),y=m?Math.min(l(r.transport)*n,i.stardust):0,D=a?1/0:Math.max(0,h-i.refineryBuffer),A=f?Math.min(y,D):y;let w=0;f&&ue(i,"droneLogistics")&&(w=Math.max(0,Math.min(dd*n,i.stardust-A,D-A))),f&&(i.stardust=Math.max(0,i.stardust-A-w),i.refineryBuffer=Math.max(0,i.refineryBuffer+A+w));const P=Jo(i),E=a?1/0:Math.max(0,d-i.crystal),x=i.refineryBuffer/P,R=Math.min(l(r.refinery)*n,x,E);i.refineryBuffer=Math.max(0,i.refineryBuffer-R*P),i.crystal=Math.max(0,i.crystal+R),i.stats.totalCrystalProduced+=R;let k=0;return ue(i,"byproductRecovery")&&(k=R*ud,i.stardust=Math.max(0,i.stardust+k)),{producedStardust:g,movedStardust:A,movedDrone:w,refinedCrystal:R,byproductStardust:k,isotopeProduced:_,energyDeficit:c<1,rates:r,bottlenecks:Nd(i,r),transportCongested:b}}function $a(i,t){const e=t-i.lastSavedAt,n=Math.max(0,Math.min(e,Dh));if(n<=0)return{applied:!1,elapsedMs:e,effectiveMs:n,summary:{producedStardust:0,movedStardust:0,movedDrone:0,refinedCrystal:0,byproductStardust:0,isotopeProduced:0,energyDeficit:!1,rates:{excavator:0,he3Excavator:0,deuteriumExcavator:0,transport:0,refinery:0,energyStation:0},bottlenecks:[],transportCongested:!1}};i.eventState.pendingEvent=null,i.eventState.droneBoostUntil=0,i.eventState.solarStormUntil=0,i.eventState.nextEventAt<=t&&(i.eventState.nextEventAt=yu(i,t));const s=Mu(i,n,{unboundedCapacity:!0,now:t});return i.lastSavedAt=t,i.stats.lastOfflineCrystalGain=s.refinedCrystal,{applied:!0,elapsedMs:e,effectiveMs:n,summary:s}}function Su(){return{active:[],aggregate:{completedEvents:0,consumedByResource:{},producedByResource:{}}}}function Qo(){return{unlocked:[],stardust:0,prestigeLevel:0,history:[]}}const tc={"prestige-start-credits":{id:"prestige-start-credits",name:"初始信用点 +500",description:"每次转生后从 600 信用点起步（裸初始态为 100）",apply(i){i.credits+=500}},"prestige-he3-unlock":{id:"prestige-he3-unlock",name:"初始解锁氦-3 采矿器",description:"每次转生后氦-3 采矿器默认解锁（裸初始态为锁定）",apply(i){i.facilities.he3Excavator.unlocked=!0}}};function Od(i){return i in tc}function Eu(i){return JSON.stringify(i,null,2)}function kd(i){const{prestige:t,...e}=i;return JSON.stringify({version:Er,main:e,prestige:t},null,2)}function Bd(i){let t;try{t=JSON.parse(i)}catch{return{ok:!1,error:"JSON 格式错误"}}if(typeof t!="object"||t===null)return{ok:!1,error:"存档不是有效的对象"};const e=t;if(typeof e.main=="object"&&e.main!==null&&typeof e.prestige=="object"&&e.prestige!==null){const n=e.main,s=e.prestige,r={...n,prestige:s};return typeof e.version=="number"?r.version=e.version:typeof n.version=="number"&&(r.version=n.version),qa(r)}return qa(e)}function jt(i){return typeof i=="number"&&Number.isFinite(i)}function bu(){return{totalStardustProduced:0,totalCrystalProduced:0,totalCreditsEarned:0,totalEnergyProduced:0,totalIsotopeProduced:0,eventsTriggered:0,droneEventsHandled:0,solarStormsExperienced:0,investmentsMade:0,upgradesPerformed:0,researchesCompleted:0,lastOfflineCrystalGain:0}}const zd=["drone","solar-storm","invest"];function Hd(i){return{pendingEvent:null,nextEventAt:i+ou,droneBoostUntil:0,solarStormUntil:0,investUsed:!1}}function Gd(i){const t=i.facilities??{};t.he3Excavator={level:1,unlocked:i.secondMineUnlocked===!0};const e=jt(i.createdAt)?i.createdAt:Date.now();return{...i,version:2,facilities:t,eventState:Hd(e)}}function Vd(i){const t=i.facilities??{};return t.deuteriumExcavator={level:1,unlocked:!1},{...i,version:3,facilities:t}}function Wd(i){return{...i,version:4,settings:{autoSellStardust:!1,stardustKeepAmount:Xo}}}function Xd(i){const t=i.settings??{};return{...i,version:5,settings:{autoSellStardust:t.autoSellStardust===!0,stardustKeepAmount:jt(t.stardustKeepAmount)?t.stardustKeepAmount:Xo,autoSellCrystal:!1,crystalKeepAmount:lu}}}function $d(i){const t=i.facilities??{};return t.energyStation={level:1,unlocked:!1},{...i,version:6,facilities:t,energy:jt(i.energy)?i.energy:0,isotope:jt(i.isotope)?i.isotope:0,researchCenterUnlocked:i.researchCenterUnlocked===!0,research:Array.isArray(i.research)?i.research:[],stats:typeof i.stats=="object"&&i.stats!==null?i.stats:bu(),achievements:Array.isArray(i.achievements)?i.achievements:[],energyReleaseUntil:jt(i.energyReleaseUntil)?i.energyReleaseUntil:0,energyReleaseCooldownUntil:jt(i.energyReleaseCooldownUntil)?i.energyReleaseCooldownUntil:0}}function qd(i){return{...i,version:7,consumptionLog:Su()}}function Yd(i){return{...i,version:8,prestige:Qo()}}function jd(i){let t={...i};return t.version===1&&(t=Gd(t)),t.version===2&&(t=Vd(t)),t.version===3&&(t=Wd(t)),t.version===4&&(t=Xd(t)),t.version===5&&(t=$d(t)),t.version===6&&(t=qd(t)),t.version===7&&(t=Yd(t)),t}function Cc(i){return Array.isArray(i)&&i.every(t=>typeof t=="string")}const Kd=["buff","exploration","exchange"];function Zd(i){if(typeof i!="object"||i===null)return"存档缺少消耗日志";const t=i;if(!Array.isArray(t.active))return"消耗日志活跃列表非法";for(const s of t.active){if(typeof s!="object"||s===null)return"消耗日志条目非法";const r=s;if(typeof r.id!="string")return"消耗日志条目 id 非法";if(typeof r.kind!="string"||!Kd.includes(r.kind))return"消耗日志条目 kind 非法";if(typeof r.resourceId!="string")return"消耗日志条目 resourceId 非法";if(!jt(r.amount)||r.amount<0)return"消耗日志条目 amount 非法";if(!Array.isArray(r.produced))return"消耗日志条目 produced 非法";for(const a of r.produced){if(typeof a!="object"||a===null)return"消耗日志产出条目非法";const o=a;if(typeof o.resourceId!="string")return"消耗日志产出 resourceId 非法";if(!jt(o.amount)||o.amount<0)return"消耗日志产出 amount 非法"}if(!jt(r.timestamp))return"消耗日志条目 timestamp 非法";if(r.expiresAt!==void 0&&!jt(r.expiresAt))return"消耗日志条目 expiresAt 非法";if(r.idempotencyKey!==void 0&&typeof r.idempotencyKey!="string")return"消耗日志条目 idempotencyKey 非法"}const e=t.aggregate;if(typeof e!="object"||e===null)return"消耗日志聚合非法";const n=e;if(!jt(n.completedEvents)||n.completedEvents<0)return"消耗日志聚合 completedEvents 非法";for(const s of["consumedByResource","producedByResource"]){const r=n[s];if(typeof r!="object"||r===null)return`消耗日志聚合 ${s} 非法`;for(const a of Object.values(r))if(!jt(a)||a<0)return`消耗日志聚合 ${s} 值非法`}return null}function Jd(i){if(typeof i!="object"||i===null)return"存档缺少转生层";const t=i;if(!Array.isArray(t.unlocked))return"转生层解锁列表非法";for(const e of t.unlocked)if(typeof e!="string")return"转生层解锁项非法";if(!jt(t.stardust)||t.stardust<0)return"转生层星核余额非法";if(!jt(t.prestigeLevel)||!Number.isInteger(t.prestigeLevel)||t.prestigeLevel<0)return"转生层等级非法";if(!Array.isArray(t.history))return"转生层历史快照非法";for(const e of t.history){if(typeof e!="object"||e===null)return"转生层历史条目非法";const n=e;if(!jt(n.sequence)||!Number.isInteger(n.sequence)||n.sequence<1)return"转生层历史 sequence 非法";if(!jt(n.timestamp))return"转生层历史 timestamp 非法";if(!jt(n.stardustEarned)||n.stardustEarned<0)return"转生层历史 stardustEarned 非法";const s=n.baselineSnapshot;if(typeof s!="object"||s===null)return"转生层历史快照非法";const r=s;for(const a of["credits","stardust","crystal","isotope","antimatter","darkmatter","createdAt"])if(!jt(r[a]))return`转生层历史快照 ${a} 非法`;if(typeof r.facilityLevels!="object"||r.facilityLevels===null)return"转生层历史快照 facilityLevels 非法";for(const a of Object.values(r.facilityLevels))if(!jt(a)||a<1)return"转生层历史快照 facilityLevels 值非法";if(!jt(r.achievementCount)||r.achievementCount<0)return"转生层历史快照 achievementCount 非法";if(!jt(r.researchCount)||r.researchCount<0)return"转生层历史快照 researchCount 非法"}return null}function qa(i){if(typeof i!="object"||i===null)return{ok:!1,error:"存档不是有效的对象"};const t=jd(i);if(typeof t!="object"||t===null)return{ok:!1,error:"存档不是有效的对象"};const e=t;if(e.version!==Er)return{ok:!1,error:`存档版本不支持（当前版本 ${Er}）`};jt(e.antimatter)||(e.antimatter=0),jt(e.darkmatter)||(e.darkmatter=0);for(const u of["credits","stardust","refineryBuffer","crystal","energy","isotope","antimatter","darkmatter"])if(!jt(e[u])||e[u]<0)return{ok:!1,error:`资源 ${u} 不能为负数或非法值`};const n=Zd(e.consumptionLog);if(n!==null)return{ok:!1,error:n};const s=Jd(e.prestige);if(s!==null)return{ok:!1,error:s};const r=e.prestige;if(r.unlocked=r.unlocked.filter(u=>Od(u)),typeof e.facilities!="object"||e.facilities===null)return{ok:!1,error:"存档缺少设施数据"};const a=e.facilities;for(const u of tn){const h=a[u];if(typeof h!="object"||h===null)return{ok:!1,error:`缺少设施 ${u}`};const d=h;if(!jt(d.level)||d.level<1||d.level>Ur)return{ok:!1,error:`设施 ${u} 等级越界`};if(typeof d.unlocked!="boolean")return{ok:!1,error:`设施 ${u} 解锁状态非法`}}if(typeof e.energyStrategy!="string"||!hu.includes(e.energyStrategy))return{ok:!1,error:"能源策略未知"};if(typeof e.eventState!="object"||e.eventState===null)return{ok:!1,error:"存档缺少事件状态"};const o=e.eventState;if(o.pendingEvent!==null){if(typeof o.pendingEvent!="object"||o.pendingEvent===null)return{ok:!1,error:"事件状态非法"};const u=o.pendingEvent;if(typeof u.id!="string"||typeof u.kind!="string"||!zd.includes(u.kind))return{ok:!1,error:"事件状态非法"};if(!jt(u.createdAt))return{ok:!1,error:"事件状态非法"}}for(const u of["nextEventAt","droneBoostUntil","solarStormUntil"])if(!jt(o[u]))return{ok:!1,error:`字段 ${u} 非法`};if(typeof o.investUsed!="boolean")return{ok:!1,error:"投入型事件状态非法"};const c=e.settings??null;if(typeof c!="object"||c===null)return{ok:!1,error:"存档缺少设置数据"};if(typeof c.autoSellStardust!="boolean")return{ok:!1,error:"自动出售设置非法"};if(!jt(c.stardustKeepAmount)||c.stardustKeepAmount<0)return{ok:!1,error:"保留数量非法"};if(typeof c.autoSellCrystal!="boolean")return{ok:!1,error:"晶体自动出售设置非法"};if(!jt(c.crystalKeepAmount)||c.crystalKeepAmount<0)return{ok:!1,error:"晶体保留数量非法"};if(typeof e.researchCenterUnlocked!="boolean")return{ok:!1,error:"研究中心状态非法"};if(!Cc(e.research))return{ok:!1,error:"研究列表非法"};if(!Cc(e.achievements))return{ok:!1,error:"成就列表非法"};e.research=e.research.filter(u=>u in Qi),e.achievements=e.achievements.filter(u=>u in yd);for(const u of["energyReleaseUntil","energyReleaseCooldownUntil"])if(!jt(e[u]))return{ok:!1,error:`字段 ${u} 非法`};if(typeof e.stats!="object"||e.stats===null)return{ok:!1,error:"存档缺少统计数据"};const l=e.stats;for(const u of Object.keys(bu()))if(!jt(l[u])||l[u]<0)return{ok:!1,error:`统计字段 ${u} 非法`};for(const u of["createdAt","lastSavedAt"])if(!jt(e[u]))return{ok:!1,error:`字段 ${u} 非法`};return{ok:!0,state:e}}function Tu(i){let t;try{t=JSON.parse(i)}catch{return{ok:!1,error:"JSON 格式错误"}}return qa(t)}function Qd(){return{totalStardustProduced:0,totalCrystalProduced:0,totalCreditsEarned:0,totalEnergyProduced:0,totalIsotopeProduced:0,eventsTriggered:0,droneEventsHandled:0,solarStormsExperienced:0,investmentsMade:0,upgradesPerformed:0,researchesCompleted:0,lastOfflineCrystalGain:0}}function wu(i){const t={};for(const e of tn)t[e]={level:1,unlocked:e==="excavator"};return{version:Er,credits:100,stardust:0,refineryBuffer:0,crystal:0,energy:0,isotope:0,antimatter:0,darkmatter:0,consumptionLog:Su(),facilities:t,energyStrategy:"balanced",eventState:{pendingEvent:null,nextEventAt:i+ou,droneBoostUntil:0,solarStormUntil:0,investUsed:!1},settings:{autoSellStardust:!1,stardustKeepAmount:Xo,autoSellCrystal:!1,crystalKeepAmount:lu},researchCenterUnlocked:!1,research:[],stats:Qd(),achievements:[],energyReleaseUntil:0,energyReleaseCooldownUntil:0,createdAt:i,lastSavedAt:i}}function Rc(i){return{...wu(i),prestige:Qo()}}const Au=new Map;function tf(i){if(!i.id)throw new Error("ResourceSchema 必须包含 id");Au.set(i.id,{...i})}function _n(i){return Au.get(i)}function ef(i){for(const t of i)tf(t)}function _i(i,t){const e=_n(t);if(!(e!=null&&e.stateKey))return 0;const n=i[e.stateKey];return typeof n=="number"?n:0}function Cu(i,t,e){const n=_n(t);if(!n)return{ok:!1,reason:`未知资源类型: ${t}`};if(!n.consumable)return{ok:!1,reason:`资源 ${n.name} 不可消耗`};if(e<0)return{ok:!1,reason:"消耗数量不能为负"};if(e===0)return{ok:!0,consumed:0};const s=_i(i,t);return s<e?{ok:!1,reason:`${n.name}不足（需 ${e}，持有 ${s}）`}:{ok:!0,consumed:e}}function nf(i,t,e){const n=Cu(i,t,e);if(!n.ok)return n;if(e===0)return{ok:!0,consumed:0};const s=_n(t);if(!(s!=null&&s.stateKey))return{ok:!1,reason:`资源 ${t} 缺少 stateKey 映射`};const r=i[s.stateKey];return typeof r=="number"&&(i[s.stateKey]=Math.max(0,r-e)),{ok:!0,consumed:e}}function Ya(i,t,e){if(e<=0)return;const n=_n(t);if(!(n!=null&&n.stateKey))return;const s=i[n.stateKey];typeof s=="number"&&(i[n.stateKey]=s+e)}ef($h);let Ru=0;function sf(){return`ce-${++Ru}`}class rf{constructor(t){F(this,"events",new Map);F(this,"processedKeys",new Set);this.repo=t}async consume(t,e){if(e.idempotencyKey&&this.processedKeys.has(e.idempotencyKey))return{ok:!0,event:this.findEventByIdempotencyKey(e.idempotencyKey)};const n=this.repo.begin(t);try{const s=n.getState(),r=Cu(s,e.resourceId,e.amount);if(!r.ok)return n.rollback(),{ok:!1,reason:r.reason};const a=nf(s,e.resourceId,e.amount);if(!a.ok)return n.rollback(),{ok:!1,reason:a.reason};const o=[];if(e.produces)for(const l of e.produces)Ya(s,l.resourceId,l.amount),o.push({resourceId:l.resourceId,amount:l.amount});const c={id:sf(),kind:e.kind,resourceId:e.resourceId,amount:e.amount,produced:o,timestamp:Date.now(),idempotencyKey:e.idempotencyKey,rolledBack:!1};return await n.commit(),this.events.set(c.id,c),e.idempotencyKey&&this.processedKeys.add(e.idempotencyKey),{ok:!0,event:c}}catch(s){return n.isDone()||n.rollback(),{ok:!1,reason:`消耗事务异常: ${s instanceof Error?s.message:String(s)}`}}}async rollback(t,e){const n=this.events.get(e);if(!n)return{ok:!1,reason:`消耗事件 ${e} 不存在`};if(n.rolledBack)return{ok:!1,reason:`消耗事件 ${e} 已回滚`};const s=this.repo.begin(t);try{const r=s.getState();Ya(r,n.resourceId,n.amount);for(const a of n.produced){const o=_n(a.resourceId);if(o!=null&&o.stateKey){const c=r[o.stateKey];typeof c=="number"&&(r[o.stateKey]=Math.max(0,c-a.amount))}}return n.rolledBack=!0,await s.commit(),{ok:!0,event:n}}catch(r){return s.isDone()||s.rollback(),{ok:!1,reason:`回滚异常: ${r instanceof Error?r.message:String(r)}`}}}isProcessed(t){return this.processedKeys.has(t)}getEvent(t){return this.events.get(t)}getEvents(){return Array.from(this.events.values())}getActiveEvents(){return Array.from(this.events.values()).filter(t=>!t.rolledBack)}reset(){this.events.clear(),this.processedKeys.clear(),Ru=0}findEventByIdempotencyKey(t){for(const e of this.events.values())if(e.idempotencyKey===t)return e}}class af{constructor(t,e){F(this,"snapshot",null);F(this,"workingState",null);F(this,"done",!1);this.backend=t,this.clone=e}begin(t){if(!this.done&&this.snapshot!==null)throw new Error("已有事务进行中，请先 commit 或 rollback");return this.snapshot=this.clone(t),this.workingState=t,this.done=!1,{getState:()=>{if(this.done)throw new Error("事务已结束，无法获取状态");return this.workingState},commit:async()=>{if(this.done)throw new Error("事务已结束，无法提交");await this.backend.save(this.workingState),this.cleanup()},rollback:()=>{if(this.done)throw new Error("事务已结束，无法回滚");this.restoreSnapshot(),this.cleanup()},isDone:()=>this.done}}isActive(){return!this.done&&this.snapshot!==null}restoreSnapshot(){if(!this.snapshot||!this.workingState)return;const t=this.clone(this.snapshot),e=this.workingState;for(const n of Object.keys(e))delete e[n];Object.assign(e,t)}cleanup(){this.done=!0,this.snapshot=null,this.workingState=null}}function of(i){const{prestige:t,...e}=i;return{baseline:e,prestige:t}}class cf{constructor(t){this.store=t}async load(){const t=await this.store.load();if(t===null)return null;const e=await this.store.loadPrestige();let n;if(e===null)n=Qo();else try{n=JSON.parse(e)}catch{throw new Error("转生层数据损坏，无法加载")}const r={...JSON.parse(t),prestige:n},a=Tu(JSON.stringify(r));if(!a.ok)throw new Error(a.error);return a.state}async save(t){const{baseline:e,prestige:n}=of(t),s=Eu(e),r=JSON.stringify(n,null,2);await this.store.saveBoth(s,r)}}const Pu=[{id:"catalysis-overdrive",name:"催化过载",description:"全采掘 ×2 产出，持续 10 分钟",cost:{resourceId:"isotope",amount:60},durationMs:600*1e3,effect:{target:"stardust",mult:2}},{id:"crystal-resonance",name:"晶体共鸣",description:"精炼 ×1.5 产出，持续 5 分钟",cost:{resourceId:"isotope",amount:90},durationMs:300*1e3,effect:{target:"crystal",mult:1.5}},{id:"isotope-furnace",name:"同位素熔炉",description:"全采掘 ×1.5 产出，持续 20 分钟（长时低增益）",cost:{resourceId:"isotope",amount:40},durationMs:1200*1e3,effect:{target:"stardust",mult:1.5}}],ja=[{id:"nearby-belt",name:"近地小行星带",description:"低风险短途，稳定产出反物质",durationMs:60*1e3,cost:{resourceId:"isotope",amount:30},reward:{resourceId:"antimatter",amount:4},riskLabel:"低"},{id:"kuiper",name:"柯伊伯带",description:"中风险长途，产出暗物质",durationMs:180*1e3,cost:{resourceId:"isotope",amount:80},reward:{resourceId:"darkmatter",amount:3},riskLabel:"中"},{id:"ophiuchus",name:"蛇夫座深空",description:"高风险远征，高额反物质回报",durationMs:360*1e3,cost:{resourceId:"isotope",amount:150},reward:{resourceId:"antimatter",amount:10},riskLabel:"高"}],Lu=[{id:"iso-to-credits",name:"同位素催化兑换",cost:{resourceId:"isotope",amount:25},produces:[{resourceId:"credits",amount:300}]},{id:"iso-to-crystal",name:"同位素结晶",cost:{resourceId:"isotope",amount:40},produces:[{resourceId:"crystal",amount:8}]},{id:"antimatter-to-darkmatter",name:"反物质湮灭",cost:{resourceId:"antimatter",amount:3},produces:[{resourceId:"darkmatter",amount:2}]}],wr=Object.fromEntries(Pu.map(i=>[i.id,i])),Cs=Object.fromEntries(ja.map(i=>[i.id,i])),Ka=Object.fromEntries(Lu.map(i=>[i.id,i])),lf=8;let Du=0;function Pc(i){return`${i}-${++Du}`}class uf{constructor(t){F(this,"activeBuffs",new Map);F(this,"activeExplorations",new Map);this.engine=t}canActivateBuff(t,e,n){const s=wr[e];if(!s)return{ok:!1,reason:"未知 buff"};if(this.buffActive(e))return{ok:!1,reason:`${s.name} 已在运行`};const r=_i(t,s.cost.resourceId);return r<s.cost.amount?{ok:!1,reason:`同位素不足（需 ${s.cost.amount}，持有 ${Math.floor(r)}）`}:{ok:!0}}async activateBuff(t,e,n){const s=wr[e];if(!s)return{ok:!1,reason:"未知 buff"};if(this.buffActive(e))return{ok:!1,reason:`${s.name} 已在运行`};const r={kind:"buff",resourceId:s.cost.resourceId,amount:s.cost.amount,idempotencyKey:`buff-${e}-${n}`};try{const o=await this.engine.consume(t,r);if(!o.ok)return{ok:!1,reason:o.reason??"激活失败"}}catch(o){return{ok:!1,reason:`激活异常: ${o instanceof Error?o.message:String(o)}`}}const a={instanceId:Pc("buff"),defId:e,startedAt:n,expiresAt:n+s.durationMs,effect:{...s.effect}};return this.activeBuffs.set(e,a),{ok:!0}}buffActive(t){return this.activeBuffs.has(t)}getActiveBuff(t){return this.activeBuffs.get(t)}getActiveBuffs(){return Array.from(this.activeBuffs.values())}getProductionMult(t,e){let n=1;for(const s of this.activeBuffs.values())s.effect.target===t&&s.expiresAt>e&&(n*=s.effect.mult);return Math.min(lf,n)}canDispatch(t,e){const n=Cs[e];if(!n)return{ok:!1,reason:"未知探索目标"};if(this.activeExplorations.size>0)return{ok:!1,reason:"已有探索进行中（每次仅限 1 路）"};const s=_i(t,n.cost.resourceId);return s<n.cost.amount?{ok:!1,reason:`同位素不足（需 ${n.cost.amount}，持有 ${Math.floor(s)}）`}:{ok:!0}}async dispatchExploration(t,e,n){const s=Cs[e];if(!s)return{ok:!1,reason:"未知探索目标"};if(this.activeExplorations.size>0)return{ok:!1,reason:"已有探索进行中"};const r={kind:"exploration",resourceId:s.cost.resourceId,amount:s.cost.amount,idempotencyKey:`explore-${e}-${n}`};try{const o=await this.engine.consume(t,r);if(!o.ok)return{ok:!1,reason:o.reason??"派遣失败"}}catch(o){return{ok:!1,reason:`派遣异常: ${o instanceof Error?o.message:String(o)}`}}const a={instanceId:Pc("explore"),targetId:e,startedAt:n,completesAt:n+s.durationMs,reward:{...s.reward}};return this.activeExplorations.set(a.instanceId,a),{ok:!0}}getActiveExplorations(){return Array.from(this.activeExplorations.values())}canExchange(t,e){const n=Ka[e];if(!n)return{ok:!1,reason:"未知兑换配方"};const s=_i(t,n.cost.resourceId);return s<n.cost.amount?{ok:!1,reason:`资源不足（需 ${n.cost.amount}，持有 ${Math.floor(s)}）`}:{ok:!0}}async exchange(t,e){const n=Ka[e];if(!n)return{ok:!1,reason:"未知兑换配方"};const s={kind:"exchange",resourceId:n.cost.resourceId,amount:n.cost.amount,produces:n.produces.map(r=>({resourceId:r.resourceId,amount:r.amount})),idempotencyKey:`exchange-${e}-${Date.now()}`};try{const r=await this.engine.consume(t,s);return r.ok?{ok:!0}:{ok:!1,reason:r.reason??"兑换失败"}}catch(r){return{ok:!1,reason:`兑换异常: ${r instanceof Error?r.message:String(r)}`}}}tick(t,e){const n=[],s=[];for(const[r,a]of this.activeBuffs)a.expiresAt<=e&&(s.push(a),this.activeBuffs.delete(r));for(const[r,a]of this.activeExplorations)a.completesAt<=e&&(Ya(t,a.reward.resourceId,a.reward.amount),n.push(a),this.activeExplorations.delete(r));return{completed:n,expiredBuffs:s}}reactorActivity(t){let e=0;for(const n of this.activeBuffs.values())n.expiresAt>t&&(e+=1);return e+=this.activeExplorations.size,e===0?0:Math.min(1,.55+.45*(e/3))}reset(){this.activeBuffs.clear(),this.activeExplorations.clear(),Du=0}}const Vi={crystal:1/100,isotope:1/20,antimatter:1/5,darkmatter:1/2,stardust:1/1e3},Za=2,Ja=5;function hf(i){let t=0;t+=i.crystal*Vi.crystal,t+=i.isotope*Vi.isotope,t+=i.antimatter*Vi.antimatter,t+=i.darkmatter*Vi.darkmatter,t+=i.stardust*Vi.stardust;for(const e of Object.values(i.facilities))t+=Math.max(0,e.level-1)*Za;return t+=i.research.length*Ja,Math.floor(t)}function df(i){const{prestige:t,...e}=i;return structuredClone(e)}function ff(i){const t={};return Object.keys(i.facilities).forEach(e=>{t[e]=i.facilities[e].level}),{credits:i.credits,stardust:i.stardust,crystal:i.crystal,isotope:i.isotope,antimatter:i.antimatter,darkmatter:i.darkmatter,facilityLevels:t,achievementCount:i.achievements.length,researchCount:i.research.length,createdAt:i.createdAt}}function pf(i,t){const e={...wu(i),prestige:t};for(const n of t.unlocked){const s=tc[n];s&&s.apply(e)}return e}function Iu(i,t){const e=hf(i),n={baseline:df(i),prestige:structuredClone(i.prestige),timestamp:t},s=Object.keys(n.baseline),r={unlocked:[...i.prestige.unlocked],stardust:i.prestige.stardust+e,prestigeLevel:i.prestige.prestigeLevel+1,history:[...i.prestige.history,{sequence:i.prestige.prestigeLevel+1,timestamp:t,baselineSnapshot:ff(i),stardustEarned:e}]},a=pf(t,r);return{stardustEarned:e,preSnapshot:n,dirtyFields:s,newPrestige:r,rebuiltState:a}}function mf(i,t){const e=Iu(i,t);return{stardustEarned:e.stardustEarned,newPrestigeLevel:e.newPrestige.prestigeLevel,newStardustBalance:e.newPrestige.stardust,permanentBonuses:[...e.newPrestige.unlocked],resets:{resourceIds:["credits","stardust","refineryBuffer","crystal","energy","isotope","antimatter","darkmatter"],facilityCount:Object.keys(i.facilities).length,researchCount:i.research.length,achievementCount:i.achievements.length},baselineBefore:e.preSnapshot.baseline,stateAfter:e.rebuiltState}}function gf(i,t){const e=i;for(const n of Object.keys(e))delete e[n];Object.assign(e,structuredClone(t))}async function _f(i,t,e){const n=Iu(t,e);let s;try{s=i.begin(t)}catch(r){return{ok:!1,error:r instanceof Error?r.message:"事务启动失败"}}return gf(s.getState(),n.rebuiltState),await s.commit(),{ok:!0,state:t,stardustEarned:n.stardustEarned,preSnapshot:n.preSnapshot}}const vf={stardust:"星尘矿",crystal:"晶体",isotope:"同位素",antimatter:"反物质",darkmatter:"暗物质"},xf=["stardust","crystal","isotope","antimatter","darkmatter"];function yf(i){const t=xf.map(o=>{const c=i[o],l=Vi[o];return{id:o,label:vf[o],amount:c,rate:l,points:c*l}}),e=Object.values(i.facilities).reduce((o,c)=>o+Math.max(0,c.level-1),0),n=e*Za,s=i.research.length,r=s*Ja,a=t.reduce((o,c)=>o+c.points,0)+n+r;return{resourceItems:t,facility:{totalLevelsAboveOne:e,rate:Za,points:n},research:{count:s,rate:Ja,points:r},totalPoints:a,stardustEarned:Math.floor(a)}}const Xi=["review","settlement","confirm"],Mf={review:"成就回顾",settlement:"星核结算",confirm:"确认转生"};function Sf(i){const t={};let e=0;return Object.keys(i.facilities).forEach(n=>{t[n]=i.facilities[n].level,i.facilities[n].unlocked&&(e+=1)}),{createdAt:i.createdAt,credits:i.credits,stardust:i.stardust,crystal:i.crystal,isotope:i.isotope,antimatter:i.antimatter,darkmatter:i.darkmatter,facilityCount:e,facilityLevels:t,researchCount:i.research.length,achievementCount:i.achievements.length}}function Ef(i){return i.map(t=>tc[t]).filter(t=>!!t).map(t=>({id:t.id,name:t.name,description:t.description}))}function bf(i){document.addEventListener("keydown",t=>{const e=t.target;if(!(e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)))switch(t.key){case"1":i.onStrategy("excavation");break;case"2":i.onStrategy("balanced");break;case"3":i.onStrategy("refinement");break;case"u":case"U":i.onUpgrade();break;case"Escape":i.onCloseModal();break;case"m":case"M":i.onOpenSave();break;case"`":case"~":i.onDebug();break}})}function Tf(i){const t=new Blob([kd(i)],{type:"application/json"});Uu(t,`星际矿站存档_${new Date().toISOString().slice(0,10)}.json`)}function wf(i,t){Uu(new Blob([t],{type:"text/csv;charset=utf-8"}),i)}function Uu(i,t){const e=URL.createObjectURL(i),n=document.createElement("a");n.href=e,n.download=t,n.click(),URL.revokeObjectURL(e)}async function Af(i){let t;try{t=await i.text()}catch{return{ok:!1,error:"读取文件失败"}}return Bd(t)}const Cf="star-miner-save",$e="saves",ta="main",ea="prestige";let an=null;function ps(){return an?Promise.resolve(an):new Promise((i,t)=>{if(typeof indexedDB>"u"){t(new Error("当前环境不支持 IndexedDB"));return}const e=indexedDB.open(Cf,1);e.onupgradeneeded=()=>{const n=e.result;n.objectStoreNames.contains($e)||n.createObjectStore($e)},e.onsuccess=()=>{an=e.result,an.onclose=()=>{an=null},an.onversionchange=()=>{an==null||an.close(),an=null},i(an)},e.onerror=()=>t(e.error??new Error("打开存档数据库失败"))})}class Rf{async load(){const t=await ps();return new Promise((e,n)=>{const r=t.transaction($e,"readonly").objectStore($e).get(ta);r.onsuccess=()=>e(typeof r.result=="string"?r.result:null),r.onerror=()=>n(r.error??new Error("读取存档失败"))})}async save(t){const e=await ps();return new Promise((n,s)=>{const r=e.transaction($e,"readwrite");r.objectStore($e).put(t,ta),r.oncomplete=()=>n(),r.onerror=()=>s(r.error??new Error("写入存档失败"))})}async loadPrestige(){const t=await ps();return new Promise((e,n)=>{const r=t.transaction($e,"readonly").objectStore($e).get(ea);r.onsuccess=()=>e(typeof r.result=="string"?r.result:null),r.onerror=()=>n(r.error??new Error("读取转生层失败"))})}async savePrestige(t){const e=await ps();return new Promise((n,s)=>{const r=e.transaction($e,"readwrite");r.objectStore($e).put(t,ea),r.oncomplete=()=>n(),r.onerror=()=>s(r.error??new Error("写入转生层失败"))})}async saveBoth(t,e){const n=await ps();return new Promise((s,r)=>{const a=n.transaction($e,"readwrite");a.objectStore($e).put(t,ta),a.objectStore($e).put(e,ea),a.oncomplete=()=>s(),a.onerror=()=>r(a.error??new Error("原子写入存档失败"))})}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ec="170",Yi={ROTATE:0,DOLLY:1,PAN:2},$i={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Pf=0,Lc=1,Lf=2,Nu=1,Fu=2,Rn=3,Qn=0,Oe=1,Ln=2,Zn=0,ji=1,Dc=2,Ic=3,Uc=4,Df=5,hi=100,If=101,Uf=102,Nf=103,Ff=104,Of=200,kf=201,Bf=202,zf=203,Qa=204,to=205,Hf=206,Gf=207,Vf=208,Wf=209,Xf=210,$f=211,qf=212,Yf=213,jf=214,eo=0,no=1,io=2,ts=3,so=4,ro=5,ao=6,oo=7,Ou=0,Kf=1,Zf=2,Jn=0,Jf=1,Qf=2,tp=3,ep=4,np=5,ip=6,sp=7,ku=300,es=301,ns=302,co=303,lo=304,kr=306,is=1e3,pi=1001,uo=1002,je=1003,rp=1004,Os=1005,vn=1006,na=1007,mi=1008,Nn=1009,Bu=1010,zu=1011,Rs=1012,nc=1013,vi=1014,xn=1015,Ls=1016,ic=1017,sc=1018,ss=1020,Hu=35902,Gu=1021,Vu=1022,dn=1023,Wu=1024,Xu=1025,Ki=1026,rs=1027,rc=1028,ac=1029,$u=1030,oc=1031,cc=1033,mr=33776,gr=33777,_r=33778,vr=33779,ho=35840,fo=35841,po=35842,mo=35843,go=36196,_o=37492,vo=37496,xo=37808,yo=37809,Mo=37810,So=37811,Eo=37812,bo=37813,To=37814,wo=37815,Ao=37816,Co=37817,Ro=37818,Po=37819,Lo=37820,Do=37821,xr=36492,Io=36494,Uo=36495,qu=36283,No=36284,Fo=36285,Oo=36286,ap=3200,op=3201,Yu=0,cp=1,qn="",De="srgb",cs="srgb-linear",Br="linear",Qt="srgb",bi=7680,Nc=519,lp=512,up=513,hp=514,ju=515,dp=516,fp=517,pp=518,mp=519,Fc=35044,zr=35048,Oc="300 es",In=2e3,Ar=2001;class Mi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Pe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],yr=Math.PI/180,ko=180/Math.PI;function Ds(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Pe[i&255]+Pe[i>>8&255]+Pe[i>>16&255]+Pe[i>>24&255]+"-"+Pe[t&255]+Pe[t>>8&255]+"-"+Pe[t>>16&15|64]+Pe[t>>24&255]+"-"+Pe[e&63|128]+Pe[e>>8&255]+"-"+Pe[e>>16&255]+Pe[e>>24&255]+Pe[n&255]+Pe[n>>8&255]+Pe[n>>16&255]+Pe[n>>24&255]).toLowerCase()}function Ne(i,t,e){return Math.max(t,Math.min(e,i))}function gp(i,t){return(i%t+t)%t}function ia(i,t,e){return(1-e)*i+e*t}function ms(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Be(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const _p={DEG2RAD:yr};class At{constructor(t=0,e=0){At.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ne(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ut{constructor(t,e,n,s,r,a,o,c,l){Ut.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){const u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],h=n[7],d=n[2],p=n[5],g=n[8],_=s[0],m=s[3],f=s[6],M=s[1],b=s[4],y=s[7],D=s[2],A=s[5],w=s[8];return r[0]=a*_+o*M+c*D,r[3]=a*m+o*b+c*A,r[6]=a*f+o*y+c*w,r[1]=l*_+u*M+h*D,r[4]=l*m+u*b+h*A,r[7]=l*f+u*y+h*w,r[2]=d*_+p*M+g*D,r[5]=d*m+p*b+g*A,r[8]=d*f+p*y+g*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8];return e*a*u-e*o*l-n*r*u+n*o*c+s*r*l-s*a*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],h=u*a-o*l,d=o*c-u*r,p=l*r-a*c,g=e*h+n*d+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=h*_,t[1]=(s*l-u*n)*_,t[2]=(o*n-s*a)*_,t[3]=d*_,t[4]=(u*e-s*c)*_,t[5]=(s*r-o*e)*_,t[6]=p*_,t[7]=(n*c-l*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(sa.makeScale(t,e)),this}rotate(t){return this.premultiply(sa.makeRotation(-t)),this}translate(t,e){return this.premultiply(sa.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const sa=new Ut;function Ku(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Cr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function vp(){const i=Cr("canvas");return i.style.display="block",i}const kc={};function Ts(i){i in kc||(kc[i]=!0,console.warn(i))}function xp(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function yp(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Mp(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const qt={enabled:!0,workingColorSpace:cs,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===Qt&&(i.r=Un(i.r),i.g=Un(i.g),i.b=Un(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===Qt&&(i.r=Zi(i.r),i.g=Zi(i.g),i.b=Zi(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===qn?Br:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Un(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Zi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Bc=[.64,.33,.3,.6,.15,.06],zc=[.2126,.7152,.0722],Hc=[.3127,.329],Gc=new Ut().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Vc=new Ut().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);qt.define({[cs]:{primaries:Bc,whitePoint:Hc,transfer:Br,toXYZ:Gc,fromXYZ:Vc,luminanceCoefficients:zc,workingColorSpaceConfig:{unpackColorSpace:De},outputColorSpaceConfig:{drawingBufferColorSpace:De}},[De]:{primaries:Bc,whitePoint:Hc,transfer:Qt,toXYZ:Gc,fromXYZ:Vc,luminanceCoefficients:zc,outputColorSpaceConfig:{drawingBufferColorSpace:De}}});let Ti;class Sp{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ti===void 0&&(Ti=Cr("canvas")),Ti.width=t.width,Ti.height=t.height;const n=Ti.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ti}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Cr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Un(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Un(e[n]/255)*255):e[n]=Un(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Ep=0;class Zu{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ep++}),this.uuid=Ds(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(ra(s[a].image)):r.push(ra(s[a]))}else r=ra(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function ra(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Sp.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let bp=0;class Ie extends Mi{constructor(t=Ie.DEFAULT_IMAGE,e=Ie.DEFAULT_MAPPING,n=pi,s=pi,r=vn,a=mi,o=dn,c=Nn,l=Ie.DEFAULT_ANISOTROPY,u=qn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:bp++}),this.uuid=Ds(),this.name="",this.source=new Zu(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new At(0,0),this.repeat=new At(1,1),this.center=new At(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ut,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ku)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case is:t.x=t.x-Math.floor(t.x);break;case pi:t.x=t.x<0?0:1;break;case uo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case is:t.y=t.y-Math.floor(t.y);break;case pi:t.y=t.y<0?0:1;break;case uo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ie.DEFAULT_IMAGE=null;Ie.DEFAULT_MAPPING=ku;Ie.DEFAULT_ANISOTROPY=1;class ee{constructor(t=0,e=0,n=0,s=1){ee.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],u=c[4],h=c[8],d=c[1],p=c[5],g=c[9],_=c[2],m=c[6],f=c[10];if(Math.abs(u-d)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(l+1)/2,y=(p+1)/2,D=(f+1)/2,A=(u+d)/4,w=(h+_)/4,P=(g+m)/4;return b>y&&b>D?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=A/n,r=w/n):y>D?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=A/s,r=P/s):D<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(D),n=w/r,s=P/r),this.set(n,s,r,e),this}let M=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(d-u)*(d-u));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(h-_)/M,this.z=(d-u)/M,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Tp extends Mi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ee(0,0,t,e),this.scissorTest=!1,this.viewport=new ee(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:vn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ie(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Zu(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class xi extends Tp{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Ju extends Ie{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=je,this.minFilter=je,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class wp extends Ie{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=je,this.minFilter=je,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class yi{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],u=n[s+2],h=n[s+3];const d=r[a+0],p=r[a+1],g=r[a+2],_=r[a+3];if(o===0){t[e+0]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h;return}if(o===1){t[e+0]=d,t[e+1]=p,t[e+2]=g,t[e+3]=_;return}if(h!==_||c!==d||l!==p||u!==g){let m=1-o;const f=c*d+l*p+u*g+h*_,M=f>=0?1:-1,b=1-f*f;if(b>Number.EPSILON){const D=Math.sqrt(b),A=Math.atan2(D,f*M);m=Math.sin(m*A)/D,o=Math.sin(o*A)/D}const y=o*M;if(c=c*m+d*y,l=l*m+p*y,u=u*m+g*y,h=h*m+_*y,m===1-o){const D=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=D,l*=D,u*=D,h*=D}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],u=n[s+3],h=r[a],d=r[a+1],p=r[a+2],g=r[a+3];return t[e]=o*g+u*h+c*p-l*d,t[e+1]=c*g+u*d+l*h-o*p,t[e+2]=l*g+u*p+o*d-c*h,t[e+3]=u*g-o*h-c*d-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(s/2),h=o(r/2),d=c(n/2),p=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=d*u*h+l*p*g,this._y=l*p*h-d*u*g,this._z=l*u*g+d*p*h,this._w=l*u*h-d*p*g;break;case"YXZ":this._x=d*u*h+l*p*g,this._y=l*p*h-d*u*g,this._z=l*u*g-d*p*h,this._w=l*u*h+d*p*g;break;case"ZXY":this._x=d*u*h-l*p*g,this._y=l*p*h+d*u*g,this._z=l*u*g+d*p*h,this._w=l*u*h-d*p*g;break;case"ZYX":this._x=d*u*h-l*p*g,this._y=l*p*h+d*u*g,this._z=l*u*g-d*p*h,this._w=l*u*h+d*p*g;break;case"YZX":this._x=d*u*h+l*p*g,this._y=l*p*h+d*u*g,this._z=l*u*g-d*p*h,this._w=l*u*h-d*p*g;break;case"XZY":this._x=d*u*h-l*p*g,this._y=l*p*h-d*u*g,this._z=l*u*g+d*p*h,this._w=l*u*h+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],u=e[6],h=e[10],d=n+o+h;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-c)*p,this._y=(r-l)*p,this._z=(a-s)*p}else if(n>o&&n>h){const p=2*Math.sqrt(1+n-o-h);this._w=(u-c)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+l)/p}else if(o>h){const p=2*Math.sqrt(1+o-n-h);this._w=(r-l)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+h-n-o);this._w=(a-s)/p,this._x=(r+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ne(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-s*o,this._w=a*u-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const p=1-e;return this._w=p*a+e*this._w,this._x=p*n+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,o),h=Math.sin((1-e)*u)/l,d=Math.sin(e*u)/l;return this._w=a*h+this._w*d,this._x=n*h+this._x*d,this._y=s*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(t=0,e=0,n=0){C.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Wc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Wc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),u=2*(o*e-r*s),h=2*(r*n-a*e);return this.x=e+c*l+a*h-o*u,this.y=n+c*u+o*l-r*h,this.z=s+c*h+r*u-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return aa.copy(this).projectOnVector(t),this.sub(aa)}reflect(t){return this.sub(aa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ne(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const aa=new C,Wc=new yi;class Si{constructor(t=new C(1/0,1/0,1/0),e=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(on.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(on.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=on.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,on):on.fromBufferAttribute(r,a),on.applyMatrix4(t.matrixWorld),this.expandByPoint(on);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ks.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ks.copy(n.boundingBox)),ks.applyMatrix4(t.matrixWorld),this.union(ks)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,on),on.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(gs),Bs.subVectors(this.max,gs),wi.subVectors(t.a,gs),Ai.subVectors(t.b,gs),Ci.subVectors(t.c,gs),Bn.subVectors(Ai,wi),zn.subVectors(Ci,Ai),ii.subVectors(wi,Ci);let e=[0,-Bn.z,Bn.y,0,-zn.z,zn.y,0,-ii.z,ii.y,Bn.z,0,-Bn.x,zn.z,0,-zn.x,ii.z,0,-ii.x,-Bn.y,Bn.x,0,-zn.y,zn.x,0,-ii.y,ii.x,0];return!oa(e,wi,Ai,Ci,Bs)||(e=[1,0,0,0,1,0,0,0,1],!oa(e,wi,Ai,Ci,Bs))?!1:(zs.crossVectors(Bn,zn),e=[zs.x,zs.y,zs.z],oa(e,wi,Ai,Ci,Bs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,on).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(on).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(bn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),bn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),bn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),bn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),bn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),bn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),bn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),bn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(bn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const bn=[new C,new C,new C,new C,new C,new C,new C,new C],on=new C,ks=new Si,wi=new C,Ai=new C,Ci=new C,Bn=new C,zn=new C,ii=new C,gs=new C,Bs=new C,zs=new C,si=new C;function oa(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){si.fromArray(i,r);const o=s.x*Math.abs(si.x)+s.y*Math.abs(si.y)+s.z*Math.abs(si.z),c=t.dot(si),l=e.dot(si),u=n.dot(si);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Ap=new Si,_s=new C,ca=new C;class Is{constructor(t=new C,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Ap.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;_s.subVectors(t,this.center);const e=_s.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(_s,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ca.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(_s.copy(t.center).add(ca)),this.expandByPoint(_s.copy(t.center).sub(ca))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Tn=new C,la=new C,Hs=new C,Hn=new C,ua=new C,Gs=new C,ha=new C;class lc{constructor(t=new C,e=new C(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Tn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Tn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Tn.copy(this.origin).addScaledVector(this.direction,e),Tn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){la.copy(t).add(e).multiplyScalar(.5),Hs.copy(e).sub(t).normalize(),Hn.copy(this.origin).sub(la);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Hs),o=Hn.dot(this.direction),c=-Hn.dot(Hs),l=Hn.lengthSq(),u=Math.abs(1-a*a);let h,d,p,g;if(u>0)if(h=a*c-o,d=a*o-c,g=r*u,h>=0)if(d>=-g)if(d<=g){const _=1/u;h*=_,d*=_,p=h*(h+a*d+2*o)+d*(a*h+d+2*c)+l}else d=r,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*c)+l;else d=-r,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*c)+l;else d<=-g?(h=Math.max(0,-(-a*r+o)),d=h>0?-r:Math.min(Math.max(-r,-c),r),p=-h*h+d*(d+2*c)+l):d<=g?(h=0,d=Math.min(Math.max(-r,-c),r),p=d*(d+2*c)+l):(h=Math.max(0,-(a*r+o)),d=h>0?r:Math.min(Math.max(-r,-c),r),p=-h*h+d*(d+2*c)+l);else d=a>0?-r:r,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(la).addScaledVector(Hs,d),p}intersectSphere(t,e){Tn.subVectors(t.center,this.origin);const n=Tn.dot(this.direction),s=Tn.dot(Tn)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),u>=0?(r=(t.min.y-d.y)*u,a=(t.max.y-d.y)*u):(r=(t.max.y-d.y)*u,a=(t.min.y-d.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(t.min.z-d.z)*h,c=(t.max.z-d.z)*h):(o=(t.max.z-d.z)*h,c=(t.min.z-d.z)*h),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Tn)!==null}intersectTriangle(t,e,n,s,r){ua.subVectors(e,t),Gs.subVectors(n,t),ha.crossVectors(ua,Gs);let a=this.direction.dot(ha),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Hn.subVectors(this.origin,t);const c=o*this.direction.dot(Gs.crossVectors(Hn,Gs));if(c<0)return null;const l=o*this.direction.dot(ua.cross(Hn));if(l<0||c+l>a)return null;const u=-o*Hn.dot(ha);return u<0?null:this.at(u/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class se{constructor(t,e,n,s,r,a,o,c,l,u,h,d,p,g,_,m){se.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,u,h,d,p,g,_,m)}set(t,e,n,s,r,a,o,c,l,u,h,d,p,g,_,m){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=c,f[2]=l,f[6]=u,f[10]=h,f[14]=d,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new se().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Ri.setFromMatrixColumn(t,0).length(),r=1/Ri.setFromMatrixColumn(t,1).length(),a=1/Ri.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){const d=a*u,p=a*h,g=o*u,_=o*h;e[0]=c*u,e[4]=-c*h,e[8]=l,e[1]=p+g*l,e[5]=d-_*l,e[9]=-o*c,e[2]=_-d*l,e[6]=g+p*l,e[10]=a*c}else if(t.order==="YXZ"){const d=c*u,p=c*h,g=l*u,_=l*h;e[0]=d+_*o,e[4]=g*o-p,e[8]=a*l,e[1]=a*h,e[5]=a*u,e[9]=-o,e[2]=p*o-g,e[6]=_+d*o,e[10]=a*c}else if(t.order==="ZXY"){const d=c*u,p=c*h,g=l*u,_=l*h;e[0]=d-_*o,e[4]=-a*h,e[8]=g+p*o,e[1]=p+g*o,e[5]=a*u,e[9]=_-d*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const d=a*u,p=a*h,g=o*u,_=o*h;e[0]=c*u,e[4]=g*l-p,e[8]=d*l+_,e[1]=c*h,e[5]=_*l+d,e[9]=p*l-g,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const d=a*c,p=a*l,g=o*c,_=o*l;e[0]=c*u,e[4]=_-d*h,e[8]=g*h+p,e[1]=h,e[5]=a*u,e[9]=-o*u,e[2]=-l*u,e[6]=p*h+g,e[10]=d-_*h}else if(t.order==="XZY"){const d=a*c,p=a*l,g=o*c,_=o*l;e[0]=c*u,e[4]=-h,e[8]=l*u,e[1]=d*h+_,e[5]=a*u,e[9]=p*h-g,e[2]=g*h-p,e[6]=o*u,e[10]=_*h+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Cp,t,Rp)}lookAt(t,e,n){const s=this.elements;return We.subVectors(t,e),We.lengthSq()===0&&(We.z=1),We.normalize(),Gn.crossVectors(n,We),Gn.lengthSq()===0&&(Math.abs(n.z)===1?We.x+=1e-4:We.z+=1e-4,We.normalize(),Gn.crossVectors(n,We)),Gn.normalize(),Vs.crossVectors(We,Gn),s[0]=Gn.x,s[4]=Vs.x,s[8]=We.x,s[1]=Gn.y,s[5]=Vs.y,s[9]=We.y,s[2]=Gn.z,s[6]=Vs.z,s[10]=We.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],h=n[5],d=n[9],p=n[13],g=n[2],_=n[6],m=n[10],f=n[14],M=n[3],b=n[7],y=n[11],D=n[15],A=s[0],w=s[4],P=s[8],E=s[12],x=s[1],R=s[5],k=s[9],z=s[13],X=s[2],K=s[6],W=s[10],J=s[14],V=s[3],rt=s[7],ht=s[11],St=s[15];return r[0]=a*A+o*x+c*X+l*V,r[4]=a*w+o*R+c*K+l*rt,r[8]=a*P+o*k+c*W+l*ht,r[12]=a*E+o*z+c*J+l*St,r[1]=u*A+h*x+d*X+p*V,r[5]=u*w+h*R+d*K+p*rt,r[9]=u*P+h*k+d*W+p*ht,r[13]=u*E+h*z+d*J+p*St,r[2]=g*A+_*x+m*X+f*V,r[6]=g*w+_*R+m*K+f*rt,r[10]=g*P+_*k+m*W+f*ht,r[14]=g*E+_*z+m*J+f*St,r[3]=M*A+b*x+y*X+D*V,r[7]=M*w+b*R+y*K+D*rt,r[11]=M*P+b*k+y*W+D*ht,r[15]=M*E+b*z+y*J+D*St,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],u=t[2],h=t[6],d=t[10],p=t[14],g=t[3],_=t[7],m=t[11],f=t[15];return g*(+r*c*h-s*l*h-r*o*d+n*l*d+s*o*p-n*c*p)+_*(+e*c*p-e*l*d+r*a*d-s*a*p+s*l*u-r*c*u)+m*(+e*l*h-e*o*p-r*a*h+n*a*p+r*o*u-n*l*u)+f*(-s*o*u-e*c*h+e*o*d+s*a*h-n*a*d+n*c*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],h=t[9],d=t[10],p=t[11],g=t[12],_=t[13],m=t[14],f=t[15],M=h*m*l-_*d*l+_*c*p-o*m*p-h*c*f+o*d*f,b=g*d*l-u*m*l-g*c*p+a*m*p+u*c*f-a*d*f,y=u*_*l-g*h*l+g*o*p-a*_*p-u*o*f+a*h*f,D=g*h*c-u*_*c-g*o*d+a*_*d+u*o*m-a*h*m,A=e*M+n*b+s*y+r*D;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/A;return t[0]=M*w,t[1]=(_*d*r-h*m*r-_*s*p+n*m*p+h*s*f-n*d*f)*w,t[2]=(o*m*r-_*c*r+_*s*l-n*m*l-o*s*f+n*c*f)*w,t[3]=(h*c*r-o*d*r-h*s*l+n*d*l+o*s*p-n*c*p)*w,t[4]=b*w,t[5]=(u*m*r-g*d*r+g*s*p-e*m*p-u*s*f+e*d*f)*w,t[6]=(g*c*r-a*m*r-g*s*l+e*m*l+a*s*f-e*c*f)*w,t[7]=(a*d*r-u*c*r+u*s*l-e*d*l-a*s*p+e*c*p)*w,t[8]=y*w,t[9]=(g*h*r-u*_*r-g*n*p+e*_*p+u*n*f-e*h*f)*w,t[10]=(a*_*r-g*o*r+g*n*l-e*_*l-a*n*f+e*o*f)*w,t[11]=(u*o*r-a*h*r-u*n*l+e*h*l+a*n*p-e*o*p)*w,t[12]=D*w,t[13]=(u*_*s-g*h*s+g*n*d-e*_*d-u*n*m+e*h*m)*w,t[14]=(g*o*s-a*_*s-g*n*c+e*_*c+a*n*m-e*o*m)*w,t[15]=(a*h*s-u*o*s+u*n*c-e*h*c-a*n*d+e*o*d)*w,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+n,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,u=a+a,h=o+o,d=r*l,p=r*u,g=r*h,_=a*u,m=a*h,f=o*h,M=c*l,b=c*u,y=c*h,D=n.x,A=n.y,w=n.z;return s[0]=(1-(_+f))*D,s[1]=(p+y)*D,s[2]=(g-b)*D,s[3]=0,s[4]=(p-y)*A,s[5]=(1-(d+f))*A,s[6]=(m+M)*A,s[7]=0,s[8]=(g+b)*w,s[9]=(m-M)*w,s[10]=(1-(d+_))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Ri.set(s[0],s[1],s[2]).length();const a=Ri.set(s[4],s[5],s[6]).length(),o=Ri.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],cn.copy(this);const l=1/r,u=1/a,h=1/o;return cn.elements[0]*=l,cn.elements[1]*=l,cn.elements[2]*=l,cn.elements[4]*=u,cn.elements[5]*=u,cn.elements[6]*=u,cn.elements[8]*=h,cn.elements[9]*=h,cn.elements[10]*=h,e.setFromRotationMatrix(cn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=In){const c=this.elements,l=2*r/(e-t),u=2*r/(n-s),h=(e+t)/(e-t),d=(n+s)/(n-s);let p,g;if(o===In)p=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Ar)p=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=In){const c=this.elements,l=1/(e-t),u=1/(n-s),h=1/(a-r),d=(e+t)*l,p=(n+s)*u;let g,_;if(o===In)g=(a+r)*h,_=-2*h;else if(o===Ar)g=r*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ri=new C,cn=new se,Cp=new C(0,0,0),Rp=new C(1,1,1),Gn=new C,Vs=new C,We=new C,Xc=new se,$c=new yi;class Mn{constructor(t=0,e=0,n=0,s=Mn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],h=s[2],d=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Ne(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ne(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ne(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ne(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ne(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ne(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Xc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Xc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return $c.setFromEuler(this),this.setFromQuaternion($c,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Mn.DEFAULT_ORDER="XYZ";class uc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Pp=0;const qc=new C,Pi=new yi,wn=new se,Ws=new C,vs=new C,Lp=new C,Dp=new yi,Yc=new C(1,0,0),jc=new C(0,1,0),Kc=new C(0,0,1),Zc={type:"added"},Ip={type:"removed"},Li={type:"childadded",child:null},da={type:"childremoved",child:null};class me extends Mi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Pp++}),this.uuid=Ds(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=me.DEFAULT_UP.clone();const t=new C,e=new Mn,n=new yi,s=new C(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new se},normalMatrix:{value:new Ut}}),this.matrix=new se,this.matrixWorld=new se,this.matrixAutoUpdate=me.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new uc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Pi.setFromAxisAngle(t,e),this.quaternion.multiply(Pi),this}rotateOnWorldAxis(t,e){return Pi.setFromAxisAngle(t,e),this.quaternion.premultiply(Pi),this}rotateX(t){return this.rotateOnAxis(Yc,t)}rotateY(t){return this.rotateOnAxis(jc,t)}rotateZ(t){return this.rotateOnAxis(Kc,t)}translateOnAxis(t,e){return qc.copy(t).applyQuaternion(this.quaternion),this.position.add(qc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Yc,t)}translateY(t){return this.translateOnAxis(jc,t)}translateZ(t){return this.translateOnAxis(Kc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(wn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ws.copy(t):Ws.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),vs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?wn.lookAt(vs,Ws,this.up):wn.lookAt(Ws,vs,this.up),this.quaternion.setFromRotationMatrix(wn),s&&(wn.extractRotation(s.matrixWorld),Pi.setFromRotationMatrix(wn),this.quaternion.premultiply(Pi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Zc),Li.child=t,this.dispatchEvent(Li),Li.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ip),da.child=t,this.dispatchEvent(da),da.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),wn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),wn.multiply(t.parent.matrixWorld)),t.applyMatrix4(wn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Zc),Li.child=t,this.dispatchEvent(Li),Li.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vs,t,Lp),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vs,Dp,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];r(t.shapes,h)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),u=a(t.images),h=a(t.shapes),d=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}me.DEFAULT_UP=new C(0,1,0);me.DEFAULT_MATRIX_AUTO_UPDATE=!0;me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ln=new C,An=new C,fa=new C,Cn=new C,Di=new C,Ii=new C,Jc=new C,pa=new C,ma=new C,ga=new C,_a=new ee,va=new ee,xa=new ee;class hn{constructor(t=new C,e=new C,n=new C){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),ln.subVectors(t,e),s.cross(ln);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){ln.subVectors(s,e),An.subVectors(n,e),fa.subVectors(t,e);const a=ln.dot(ln),o=ln.dot(An),c=ln.dot(fa),l=An.dot(An),u=An.dot(fa),h=a*l-o*o;if(h===0)return r.set(0,0,0),null;const d=1/h,p=(l*c-o*u)*d,g=(a*u-o*c)*d;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Cn)===null?!1:Cn.x>=0&&Cn.y>=0&&Cn.x+Cn.y<=1}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,Cn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Cn.x),c.addScaledVector(a,Cn.y),c.addScaledVector(o,Cn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,a){return _a.setScalar(0),va.setScalar(0),xa.setScalar(0),_a.fromBufferAttribute(t,e),va.fromBufferAttribute(t,n),xa.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(_a,r.x),a.addScaledVector(va,r.y),a.addScaledVector(xa,r.z),a}static isFrontFacing(t,e,n,s){return ln.subVectors(n,e),An.subVectors(t,e),ln.cross(An).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ln.subVectors(this.c,this.b),An.subVectors(this.a,this.b),ln.cross(An).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return hn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return hn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return hn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return hn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return hn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;Di.subVectors(s,n),Ii.subVectors(r,n),pa.subVectors(t,n);const c=Di.dot(pa),l=Ii.dot(pa);if(c<=0&&l<=0)return e.copy(n);ma.subVectors(t,s);const u=Di.dot(ma),h=Ii.dot(ma);if(u>=0&&h<=u)return e.copy(s);const d=c*h-u*l;if(d<=0&&c>=0&&u<=0)return a=c/(c-u),e.copy(n).addScaledVector(Di,a);ga.subVectors(t,r);const p=Di.dot(ga),g=Ii.dot(ga);if(g>=0&&p<=g)return e.copy(r);const _=p*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),e.copy(n).addScaledVector(Ii,o);const m=u*g-p*h;if(m<=0&&h-u>=0&&p-g>=0)return Jc.subVectors(r,s),o=(h-u)/(h-u+(p-g)),e.copy(s).addScaledVector(Jc,o);const f=1/(m+_+d);return a=_*f,o=d*f,e.copy(n).addScaledVector(Di,a).addScaledVector(Ii,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Qu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vn={h:0,s:0,l:0},Xs={h:0,s:0,l:0};function ya(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Lt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=De){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,qt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,qt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=qt.workingColorSpace){if(t=gp(t,1),e=Ne(e,0,1),n=Ne(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=ya(a,r,t+1/3),this.g=ya(a,r,t),this.b=ya(a,r,t-1/3)}return qt.toWorkingColorSpace(this,s),this}setStyle(t,e=De){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=De){const n=Qu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Un(t.r),this.g=Un(t.g),this.b=Un(t.b),this}copyLinearToSRGB(t){return this.r=Zi(t.r),this.g=Zi(t.g),this.b=Zi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=De){return qt.fromWorkingColorSpace(Le.copy(this),t),Math.round(Ne(Le.r*255,0,255))*65536+Math.round(Ne(Le.g*255,0,255))*256+Math.round(Ne(Le.b*255,0,255))}getHexString(t=De){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=qt.workingColorSpace){qt.fromWorkingColorSpace(Le.copy(this),e);const n=Le.r,s=Le.g,r=Le.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const h=a-o;switch(l=u<=.5?h/(a+o):h/(2-a-o),a){case n:c=(s-r)/h+(s<r?6:0);break;case s:c=(r-n)/h+2;break;case r:c=(n-s)/h+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=qt.workingColorSpace){return qt.fromWorkingColorSpace(Le.copy(this),e),t.r=Le.r,t.g=Le.g,t.b=Le.b,t}getStyle(t=De){qt.fromWorkingColorSpace(Le.copy(this),t);const e=Le.r,n=Le.g,s=Le.b;return t!==De?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Vn),this.setHSL(Vn.h+t,Vn.s+e,Vn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Vn),t.getHSL(Xs);const n=ia(Vn.h,Xs.h,e),s=ia(Vn.s,Xs.s,e),r=ia(Vn.l,Xs.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Le=new Lt;Lt.NAMES=Qu;let Up=0;class Us extends Mi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Up++}),this.uuid=Ds(),this.name="",this.blending=ji,this.side=Qn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Qa,this.blendDst=to,this.blendEquation=hi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Lt(0,0,0),this.blendAlpha=0,this.depthFunc=ts,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Nc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=bi,this.stencilZFail=bi,this.stencilZPass=bi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ji&&(n.blending=this.blending),this.side!==Qn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Qa&&(n.blendSrc=this.blendSrc),this.blendDst!==to&&(n.blendDst=this.blendDst),this.blendEquation!==hi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ts&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Nc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==bi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==bi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==bi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Me extends Us{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Lt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mn,this.combine=Ou,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const _e=new C,$s=new At;class en{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Fc,this.updateRanges=[],this.gpuType=xn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)$s.fromBufferAttribute(this,e),$s.applyMatrix3(t),this.setXY(e,$s.x,$s.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix3(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix4(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyNormalMatrix(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.transformDirection(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ms(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Be(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ms(e,this.array)),e}setX(t,e){return this.normalized&&(e=Be(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ms(e,this.array)),e}setY(t,e){return this.normalized&&(e=Be(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ms(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Be(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ms(e,this.array)),e}setW(t,e){return this.normalized&&(e=Be(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Be(e,this.array),n=Be(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Be(e,this.array),n=Be(n,this.array),s=Be(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Be(e,this.array),n=Be(n,this.array),s=Be(s,this.array),r=Be(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Fc&&(t.usage=this.usage),t}}class th extends en{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class eh extends en{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Ee extends en{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Np=0;const Je=new se,Ma=new me,Ui=new C,Xe=new Si,xs=new Si,we=new C;class Ce extends Mi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Np++}),this.uuid=Ds(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ku(t)?eh:th)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ut().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Je.makeRotationFromQuaternion(t),this.applyMatrix4(Je),this}rotateX(t){return Je.makeRotationX(t),this.applyMatrix4(Je),this}rotateY(t){return Je.makeRotationY(t),this.applyMatrix4(Je),this}rotateZ(t){return Je.makeRotationZ(t),this.applyMatrix4(Je),this}translate(t,e,n){return Je.makeTranslation(t,e,n),this.applyMatrix4(Je),this}scale(t,e,n){return Je.makeScale(t,e,n),this.applyMatrix4(Je),this}lookAt(t){return Ma.lookAt(t),Ma.updateMatrix(),this.applyMatrix4(Ma.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ui).negate(),this.translate(Ui.x,Ui.y,Ui.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ee(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Si);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Xe.setFromBufferAttribute(r),this.morphTargetsRelative?(we.addVectors(this.boundingBox.min,Xe.min),this.boundingBox.expandByPoint(we),we.addVectors(this.boundingBox.max,Xe.max),this.boundingBox.expandByPoint(we)):(this.boundingBox.expandByPoint(Xe.min),this.boundingBox.expandByPoint(Xe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Is);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(t){const n=this.boundingSphere.center;if(Xe.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];xs.setFromBufferAttribute(o),this.morphTargetsRelative?(we.addVectors(Xe.min,xs.min),Xe.expandByPoint(we),we.addVectors(Xe.max,xs.max),Xe.expandByPoint(we)):(Xe.expandByPoint(xs.min),Xe.expandByPoint(xs.max))}Xe.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)we.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(we));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)we.fromBufferAttribute(o,l),c&&(Ui.fromBufferAttribute(t,l),we.add(Ui)),s=Math.max(s,n.distanceToSquared(we))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new en(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let P=0;P<n.count;P++)o[P]=new C,c[P]=new C;const l=new C,u=new C,h=new C,d=new At,p=new At,g=new At,_=new C,m=new C;function f(P,E,x){l.fromBufferAttribute(n,P),u.fromBufferAttribute(n,E),h.fromBufferAttribute(n,x),d.fromBufferAttribute(r,P),p.fromBufferAttribute(r,E),g.fromBufferAttribute(r,x),u.sub(l),h.sub(l),p.sub(d),g.sub(d);const R=1/(p.x*g.y-g.x*p.y);isFinite(R)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(R),m.copy(h).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(R),o[P].add(_),o[E].add(_),o[x].add(_),c[P].add(m),c[E].add(m),c[x].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let P=0,E=M.length;P<E;++P){const x=M[P],R=x.start,k=x.count;for(let z=R,X=R+k;z<X;z+=3)f(t.getX(z+0),t.getX(z+1),t.getX(z+2))}const b=new C,y=new C,D=new C,A=new C;function w(P){D.fromBufferAttribute(s,P),A.copy(D);const E=o[P];b.copy(E),b.sub(D.multiplyScalar(D.dot(E))).normalize(),y.crossVectors(A,E);const R=y.dot(c[P])<0?-1:1;a.setXYZW(P,b.x,b.y,b.z,R)}for(let P=0,E=M.length;P<E;++P){const x=M[P],R=x.start,k=x.count;for(let z=R,X=R+k;z<X;z+=3)w(t.getX(z+0)),w(t.getX(z+1)),w(t.getX(z+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new en(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const s=new C,r=new C,a=new C,o=new C,c=new C,l=new C,u=new C,h=new C;if(t)for(let d=0,p=t.count;d<p;d+=3){const g=t.getX(d+0),_=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,m),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),o.add(u),c.add(u),l.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,p=e.count;d<p;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)we.fromBufferAttribute(t,e),we.normalize(),t.setXYZ(e,we.x,we.y,we.z)}toNonIndexed(){function t(o,c){const l=o.array,u=o.itemSize,h=o.normalized,d=new l.constructor(c.length*u);let p=0,g=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?p=c[_]*o.data.stride+o.offset:p=c[_]*u;for(let f=0;f<u;f++)d[g++]=l[p++]}return new en(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ce,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=t(c,n);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,h=l.length;u<h;u++){const d=l[u],p=t(d,n);c.push(p)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,d=l.length;h<d;h++){const p=l[h];u.push(p.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(e))}const r=t.morphAttributes;for(const l in r){const u=[],h=r[l];for(let d=0,p=h.length;d<p;d++)u.push(h[d].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,u=a.length;l<u;l++){const h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Qc=new se,ri=new lc,qs=new Is,tl=new C,Ys=new C,js=new C,Ks=new C,Sa=new C,Zs=new C,el=new C,Js=new C;class xt extends me{constructor(t=new Ce,e=new Me){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){Zs.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],h=r[c];u!==0&&(Sa.fromBufferAttribute(h,t),a?Zs.addScaledVector(Sa,u):Zs.addScaledVector(Sa.sub(e),u))}e.add(Zs)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),qs.copy(n.boundingSphere),qs.applyMatrix4(r),ri.copy(t.ray).recast(t.near),!(qs.containsPoint(ri.origin)===!1&&(ri.intersectSphere(qs,tl)===null||ri.origin.distanceToSquared(tl)>(t.far-t.near)**2))&&(Qc.copy(r).invert(),ri.copy(t.ray).applyMatrix4(Qc),!(n.boundingBox!==null&&ri.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ri)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],f=a[m.materialIndex],M=Math.max(m.start,p.start),b=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let y=M,D=b;y<D;y+=3){const A=o.getX(y),w=o.getX(y+1),P=o.getX(y+2);s=Qs(this,f,t,n,l,u,h,A,w,P),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(o.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const M=o.getX(m),b=o.getX(m+1),y=o.getX(m+2);s=Qs(this,a,t,n,l,u,h,M,b,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],f=a[m.materialIndex],M=Math.max(m.start,p.start),b=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let y=M,D=b;y<D;y+=3){const A=y,w=y+1,P=y+2;s=Qs(this,f,t,n,l,u,h,A,w,P),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const M=m,b=m+1,y=m+2;s=Qs(this,a,t,n,l,u,h,M,b,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Fp(i,t,e,n,s,r,a,o){let c;if(t.side===Oe?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===Qn,o),c===null)return null;Js.copy(o),Js.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Js);return l<e.near||l>e.far?null:{distance:l,point:Js.clone(),object:i}}function Qs(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,Ys),i.getVertexPosition(c,js),i.getVertexPosition(l,Ks);const u=Fp(i,t,e,n,Ys,js,Ks,el);if(u){const h=new C;hn.getBarycoord(el,Ys,js,Ks,h),s&&(u.uv=hn.getInterpolatedAttribute(s,o,c,l,h,new At)),r&&(u.uv1=hn.getInterpolatedAttribute(r,o,c,l,h,new At)),a&&(u.normal=hn.getInterpolatedAttribute(a,o,c,l,h,new C),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new C,materialIndex:0};hn.getNormal(Ys,js,Ks,d.normal),u.face=d,u.barycoord=h}return u}class fe extends Ce{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],u=[],h=[];let d=0,p=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Ee(l,3)),this.setAttribute("normal",new Ee(u,3)),this.setAttribute("uv",new Ee(h,2));function g(_,m,f,M,b,y,D,A,w,P,E){const x=y/w,R=D/P,k=y/2,z=D/2,X=A/2,K=w+1,W=P+1;let J=0,V=0;const rt=new C;for(let ht=0;ht<W;ht++){const St=ht*R-z;for(let Bt=0;Bt<K;Bt++){const ne=Bt*x-k;rt[_]=ne*M,rt[m]=St*b,rt[f]=X,l.push(rt.x,rt.y,rt.z),rt[_]=0,rt[m]=0,rt[f]=A>0?1:-1,u.push(rt.x,rt.y,rt.z),h.push(Bt/w),h.push(1-ht/P),J+=1}}for(let ht=0;ht<P;ht++)for(let St=0;St<w;St++){const Bt=d+St+K*ht,ne=d+St+K*(ht+1),q=d+(St+1)+K*(ht+1),nt=d+(St+1)+K*ht;c.push(Bt,ne,nt),c.push(ne,q,nt),V+=6}o.addGroup(p,V,E),p+=V,d+=J}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fe(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function as(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ue(i){const t={};for(let e=0;e<i.length;e++){const n=as(i[e]);for(const s in n)t[s]=n[s]}return t}function Op(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function nh(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:qt.workingColorSpace}const kp={clone:as,merge:Ue};var Bp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,zp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ti extends Us{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Bp,this.fragmentShader=zp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=as(t.uniforms),this.uniformsGroups=Op(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class ih extends me{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new se,this.projectionMatrix=new se,this.projectionMatrixInverse=new se,this.coordinateSystem=In}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Wn=new C,nl=new At,il=new At;class qe extends ih{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ko*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(yr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ko*2*Math.atan(Math.tan(yr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Wn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Wn.x,Wn.y).multiplyScalar(-t/Wn.z),Wn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Wn.x,Wn.y).multiplyScalar(-t/Wn.z)}getViewSize(t,e){return this.getViewBounds(t,nl,il),e.subVectors(il,nl)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(yr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ni=-90,Fi=1;class Hp extends me{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new qe(Ni,Fi,t,e);s.layers=this.layers,this.add(s);const r=new qe(Ni,Fi,t,e);r.layers=this.layers,this.add(r);const a=new qe(Ni,Fi,t,e);a.layers=this.layers,this.add(a);const o=new qe(Ni,Fi,t,e);o.layers=this.layers,this.add(o);const c=new qe(Ni,Fi,t,e);c.layers=this.layers,this.add(c);const l=new qe(Ni,Fi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(const l of e)this.remove(l);if(t===In)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Ar)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,u]=this.children,h=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,u),t.setRenderTarget(h,d,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class sh extends Ie{constructor(t,e,n,s,r,a,o,c,l,u){t=t!==void 0?t:[],e=e!==void 0?e:es,super(t,e,n,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Gp extends xi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new sh(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:vn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new fe(5,5,5),r=new ti({name:"CubemapFromEquirect",uniforms:as(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Oe,blending:Zn});r.uniforms.tEquirect.value=e;const a=new xt(s,r),o=e.minFilter;return e.minFilter===mi&&(e.minFilter=vn),new Hp(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}const Ea=new C,Vp=new C,Wp=new Ut;class $n{constructor(t=new C(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Ea.subVectors(n,e).cross(Vp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Ea),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Wp.getNormalMatrix(t),s=this.coplanarPoint(Ea).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ai=new Is,tr=new C;class hc{constructor(t=new $n,e=new $n,n=new $n,s=new $n,r=new $n,a=new $n){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=In){const n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],c=s[3],l=s[4],u=s[5],h=s[6],d=s[7],p=s[8],g=s[9],_=s[10],m=s[11],f=s[12],M=s[13],b=s[14],y=s[15];if(n[0].setComponents(c-r,d-l,m-p,y-f).normalize(),n[1].setComponents(c+r,d+l,m+p,y+f).normalize(),n[2].setComponents(c+a,d+u,m+g,y+M).normalize(),n[3].setComponents(c-a,d-u,m-g,y-M).normalize(),n[4].setComponents(c-o,d-h,m-_,y-b).normalize(),e===In)n[5].setComponents(c+o,d+h,m+_,y+b).normalize();else if(e===Ar)n[5].setComponents(o,h,_,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ai.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ai.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ai)}intersectsSprite(t){return ai.center.set(0,0,0),ai.radius=.7071067811865476,ai.applyMatrix4(t.matrixWorld),this.intersectsSphere(ai)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(tr.x=s.normal.x>0?t.max.x:t.min.x,tr.y=s.normal.y>0?t.max.y:t.min.y,tr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(tr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function rh(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Xp(i){const t=new WeakMap;function e(o,c){const l=o.array,u=o.usage,h=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,u),o.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,c,l){const u=c.array,h=c.updateRanges;if(i.bindBuffer(l,o),h.length===0)i.bufferSubData(l,0,u);else{h.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<h.length;p++){const g=h[d],_=h[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,h[d]=_)}h.length=d+1;for(let p=0,g=h.length;p<g;p++){const _=h[p];i.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}class Hr extends Ce{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,u=c+1,h=t/o,d=e/c,p=[],g=[],_=[],m=[];for(let f=0;f<u;f++){const M=f*d-a;for(let b=0;b<l;b++){const y=b*h-r;g.push(y,-M,0),_.push(0,0,1),m.push(b/o),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let M=0;M<o;M++){const b=M+l*f,y=M+l*(f+1),D=M+1+l*(f+1),A=M+1+l*f;p.push(b,y,A),p.push(y,D,A)}this.setIndex(p),this.setAttribute("position",new Ee(g,3)),this.setAttribute("normal",new Ee(_,3)),this.setAttribute("uv",new Ee(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Hr(t.width,t.height,t.widthSegments,t.heightSegments)}}var $p=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,qp=`#ifdef USE_ALPHAHASH
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
#endif`,Yp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,jp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Kp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Zp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Jp=`#ifdef USE_AOMAP
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
#endif`,Qp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,tm=`#ifdef USE_BATCHING
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
#endif`,em=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,nm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,im=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,sm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,rm=`#ifdef USE_IRIDESCENCE
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
#endif`,am=`#ifdef USE_BUMPMAP
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
#endif`,om=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,cm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,lm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,um=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,hm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,dm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,fm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,pm=`#if defined( USE_COLOR_ALPHA )
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
#endif`,mm=`#define PI 3.141592653589793
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
} // validated`,gm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,_m=`vec3 transformedNormal = objectNormal;
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
#endif`,vm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,xm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ym=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Mm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Sm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Em=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,bm=`#ifdef USE_ENVMAP
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
#endif`,Tm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,wm=`#ifdef USE_ENVMAP
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
#endif`,Am=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Cm=`#ifdef USE_ENVMAP
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
#endif`,Rm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Pm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Lm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Dm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Im=`#ifdef USE_GRADIENTMAP
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
}`,Um=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Nm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Fm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Om=`uniform bool receiveShadow;
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
#endif`,km=`#ifdef USE_ENVMAP
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
#endif`,Bm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,zm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Hm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Gm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Vm=`PhysicalMaterial material;
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
#endif`,Wm=`struct PhysicalMaterial {
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
}`,Xm=`
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
#endif`,$m=`#if defined( RE_IndirectDiffuse )
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
#endif`,qm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ym=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,jm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Km=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Jm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Qm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,tg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,eg=`#if defined( USE_POINTS_UV )
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
#endif`,ng=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ig=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,sg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,rg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ag=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,og=`#ifdef USE_MORPHTARGETS
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
#endif`,cg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ug=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,hg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,pg=`#ifdef USE_NORMALMAP
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
#endif`,mg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,gg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,_g=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,vg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,xg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,yg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Mg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Sg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Eg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,bg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Tg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,wg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ag=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Cg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Rg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Pg=`float getShadowMask() {
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
}`,Lg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Dg=`#ifdef USE_SKINNING
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
#endif`,Ig=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ug=`#ifdef USE_SKINNING
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
#endif`,Ng=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Fg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Og=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,kg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Bg=`#ifdef USE_TRANSMISSION
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
#endif`,zg=`#ifdef USE_TRANSMISSION
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
#endif`,Hg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Gg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Vg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Wg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Xg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$g=`uniform sampler2D t2D;
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
}`,qg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,jg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Kg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zg=`#include <common>
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
}`,Jg=`#if DEPTH_PACKING == 3200
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
}`,Qg=`#define DISTANCE
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
}`,t0=`#define DISTANCE
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
}`,e0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,n0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,i0=`uniform float scale;
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
}`,s0=`uniform vec3 diffuse;
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
}`,r0=`#include <common>
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
}`,a0=`uniform vec3 diffuse;
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
}`,o0=`#define LAMBERT
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
}`,c0=`#define LAMBERT
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
}`,l0=`#define MATCAP
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
}`,u0=`#define MATCAP
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
}`,h0=`#define NORMAL
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
}`,d0=`#define NORMAL
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
}`,f0=`#define PHONG
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
}`,p0=`#define PHONG
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
}`,m0=`#define STANDARD
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
}`,g0=`#define STANDARD
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
}`,_0=`#define TOON
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
}`,v0=`#define TOON
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
}`,x0=`uniform float size;
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
}`,y0=`uniform vec3 diffuse;
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
}`,M0=`#include <common>
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
}`,S0=`uniform vec3 color;
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
}`,E0=`uniform float rotation;
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
}`,b0=`uniform vec3 diffuse;
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
}`,Ft={alphahash_fragment:$p,alphahash_pars_fragment:qp,alphamap_fragment:Yp,alphamap_pars_fragment:jp,alphatest_fragment:Kp,alphatest_pars_fragment:Zp,aomap_fragment:Jp,aomap_pars_fragment:Qp,batching_pars_vertex:tm,batching_vertex:em,begin_vertex:nm,beginnormal_vertex:im,bsdfs:sm,iridescence_fragment:rm,bumpmap_pars_fragment:am,clipping_planes_fragment:om,clipping_planes_pars_fragment:cm,clipping_planes_pars_vertex:lm,clipping_planes_vertex:um,color_fragment:hm,color_pars_fragment:dm,color_pars_vertex:fm,color_vertex:pm,common:mm,cube_uv_reflection_fragment:gm,defaultnormal_vertex:_m,displacementmap_pars_vertex:vm,displacementmap_vertex:xm,emissivemap_fragment:ym,emissivemap_pars_fragment:Mm,colorspace_fragment:Sm,colorspace_pars_fragment:Em,envmap_fragment:bm,envmap_common_pars_fragment:Tm,envmap_pars_fragment:wm,envmap_pars_vertex:Am,envmap_physical_pars_fragment:km,envmap_vertex:Cm,fog_vertex:Rm,fog_pars_vertex:Pm,fog_fragment:Lm,fog_pars_fragment:Dm,gradientmap_pars_fragment:Im,lightmap_pars_fragment:Um,lights_lambert_fragment:Nm,lights_lambert_pars_fragment:Fm,lights_pars_begin:Om,lights_toon_fragment:Bm,lights_toon_pars_fragment:zm,lights_phong_fragment:Hm,lights_phong_pars_fragment:Gm,lights_physical_fragment:Vm,lights_physical_pars_fragment:Wm,lights_fragment_begin:Xm,lights_fragment_maps:$m,lights_fragment_end:qm,logdepthbuf_fragment:Ym,logdepthbuf_pars_fragment:jm,logdepthbuf_pars_vertex:Km,logdepthbuf_vertex:Zm,map_fragment:Jm,map_pars_fragment:Qm,map_particle_fragment:tg,map_particle_pars_fragment:eg,metalnessmap_fragment:ng,metalnessmap_pars_fragment:ig,morphinstance_vertex:sg,morphcolor_vertex:rg,morphnormal_vertex:ag,morphtarget_pars_vertex:og,morphtarget_vertex:cg,normal_fragment_begin:lg,normal_fragment_maps:ug,normal_pars_fragment:hg,normal_pars_vertex:dg,normal_vertex:fg,normalmap_pars_fragment:pg,clearcoat_normal_fragment_begin:mg,clearcoat_normal_fragment_maps:gg,clearcoat_pars_fragment:_g,iridescence_pars_fragment:vg,opaque_fragment:xg,packing:yg,premultiplied_alpha_fragment:Mg,project_vertex:Sg,dithering_fragment:Eg,dithering_pars_fragment:bg,roughnessmap_fragment:Tg,roughnessmap_pars_fragment:wg,shadowmap_pars_fragment:Ag,shadowmap_pars_vertex:Cg,shadowmap_vertex:Rg,shadowmask_pars_fragment:Pg,skinbase_vertex:Lg,skinning_pars_vertex:Dg,skinning_vertex:Ig,skinnormal_vertex:Ug,specularmap_fragment:Ng,specularmap_pars_fragment:Fg,tonemapping_fragment:Og,tonemapping_pars_fragment:kg,transmission_fragment:Bg,transmission_pars_fragment:zg,uv_pars_fragment:Hg,uv_pars_vertex:Gg,uv_vertex:Vg,worldpos_vertex:Wg,background_vert:Xg,background_frag:$g,backgroundCube_vert:qg,backgroundCube_frag:Yg,cube_vert:jg,cube_frag:Kg,depth_vert:Zg,depth_frag:Jg,distanceRGBA_vert:Qg,distanceRGBA_frag:t0,equirect_vert:e0,equirect_frag:n0,linedashed_vert:i0,linedashed_frag:s0,meshbasic_vert:r0,meshbasic_frag:a0,meshlambert_vert:o0,meshlambert_frag:c0,meshmatcap_vert:l0,meshmatcap_frag:u0,meshnormal_vert:h0,meshnormal_frag:d0,meshphong_vert:f0,meshphong_frag:p0,meshphysical_vert:m0,meshphysical_frag:g0,meshtoon_vert:_0,meshtoon_frag:v0,points_vert:x0,points_frag:y0,shadow_vert:M0,shadow_frag:S0,sprite_vert:E0,sprite_frag:b0},it={common:{diffuse:{value:new Lt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ut}},envmap:{envMap:{value:null},envMapRotation:{value:new Ut},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ut}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ut}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ut},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ut},normalScale:{value:new At(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ut},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ut}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ut}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ut}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Lt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Lt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0},uvTransform:{value:new Ut}},sprite:{diffuse:{value:new Lt(16777215)},opacity:{value:1},center:{value:new At(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}}},mn={basic:{uniforms:Ue([it.common,it.specularmap,it.envmap,it.aomap,it.lightmap,it.fog]),vertexShader:Ft.meshbasic_vert,fragmentShader:Ft.meshbasic_frag},lambert:{uniforms:Ue([it.common,it.specularmap,it.envmap,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.fog,it.lights,{emissive:{value:new Lt(0)}}]),vertexShader:Ft.meshlambert_vert,fragmentShader:Ft.meshlambert_frag},phong:{uniforms:Ue([it.common,it.specularmap,it.envmap,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.fog,it.lights,{emissive:{value:new Lt(0)},specular:{value:new Lt(1118481)},shininess:{value:30}}]),vertexShader:Ft.meshphong_vert,fragmentShader:Ft.meshphong_frag},standard:{uniforms:Ue([it.common,it.envmap,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.roughnessmap,it.metalnessmap,it.fog,it.lights,{emissive:{value:new Lt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag},toon:{uniforms:Ue([it.common,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.gradientmap,it.fog,it.lights,{emissive:{value:new Lt(0)}}]),vertexShader:Ft.meshtoon_vert,fragmentShader:Ft.meshtoon_frag},matcap:{uniforms:Ue([it.common,it.bumpmap,it.normalmap,it.displacementmap,it.fog,{matcap:{value:null}}]),vertexShader:Ft.meshmatcap_vert,fragmentShader:Ft.meshmatcap_frag},points:{uniforms:Ue([it.points,it.fog]),vertexShader:Ft.points_vert,fragmentShader:Ft.points_frag},dashed:{uniforms:Ue([it.common,it.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ft.linedashed_vert,fragmentShader:Ft.linedashed_frag},depth:{uniforms:Ue([it.common,it.displacementmap]),vertexShader:Ft.depth_vert,fragmentShader:Ft.depth_frag},normal:{uniforms:Ue([it.common,it.bumpmap,it.normalmap,it.displacementmap,{opacity:{value:1}}]),vertexShader:Ft.meshnormal_vert,fragmentShader:Ft.meshnormal_frag},sprite:{uniforms:Ue([it.sprite,it.fog]),vertexShader:Ft.sprite_vert,fragmentShader:Ft.sprite_frag},background:{uniforms:{uvTransform:{value:new Ut},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ft.background_vert,fragmentShader:Ft.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ut}},vertexShader:Ft.backgroundCube_vert,fragmentShader:Ft.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ft.cube_vert,fragmentShader:Ft.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ft.equirect_vert,fragmentShader:Ft.equirect_frag},distanceRGBA:{uniforms:Ue([it.common,it.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ft.distanceRGBA_vert,fragmentShader:Ft.distanceRGBA_frag},shadow:{uniforms:Ue([it.lights,it.fog,{color:{value:new Lt(0)},opacity:{value:1}}]),vertexShader:Ft.shadow_vert,fragmentShader:Ft.shadow_frag}};mn.physical={uniforms:Ue([mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ut},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ut},clearcoatNormalScale:{value:new At(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ut},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ut},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ut},sheen:{value:0},sheenColor:{value:new Lt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ut},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ut},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ut},transmissionSamplerSize:{value:new At},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ut},attenuationDistance:{value:0},attenuationColor:{value:new Lt(0)},specularColor:{value:new Lt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ut},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ut},anisotropyVector:{value:new At},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ut}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag};const er={r:0,b:0,g:0},oi=new Mn,T0=new se;function w0(i,t,e,n,s,r,a){const o=new Lt(0);let c=r===!0?0:1,l,u,h=null,d=0,p=null;function g(M){let b=M.isScene===!0?M.background:null;return b&&b.isTexture&&(b=(M.backgroundBlurriness>0?e:t).get(b)),b}function _(M){let b=!1;const y=g(M);y===null?f(o,c):y&&y.isColor&&(f(y,1),b=!0);const D=i.xr.getEnvironmentBlendMode();D==="additive"?n.buffers.color.setClear(0,0,0,1,a):D==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||b)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(M,b){const y=g(b);y&&(y.isCubeTexture||y.mapping===kr)?(u===void 0&&(u=new xt(new fe(1,1,1),new ti({name:"BackgroundCubeMaterial",uniforms:as(mn.backgroundCube.uniforms),vertexShader:mn.backgroundCube.vertexShader,fragmentShader:mn.backgroundCube.fragmentShader,side:Oe,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(D,A,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),oi.copy(b.backgroundRotation),oi.x*=-1,oi.y*=-1,oi.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(oi.y*=-1,oi.z*=-1),u.material.uniforms.envMap.value=y,u.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(T0.makeRotationFromEuler(oi)),u.material.toneMapped=qt.getTransfer(y.colorSpace)!==Qt,(h!==y||d!==y.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,h=y,d=y.version,p=i.toneMapping),u.layers.enableAll(),M.unshift(u,u.geometry,u.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new xt(new Hr(2,2),new ti({name:"BackgroundMaterial",uniforms:as(mn.background.uniforms),vertexShader:mn.background.vertexShader,fragmentShader:mn.background.fragmentShader,side:Qn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=qt.getTransfer(y.colorSpace)!==Qt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||d!==y.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,h=y,d=y.version,p=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function f(M,b){M.getRGB(er,nh(i)),n.buffers.color.setClear(er.r,er.g,er.b,b,a)}return{getClearColor:function(){return o},setClearColor:function(M,b=1){o.set(M),c=b,f(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,f(o,c)},render:_,addToRenderList:m}}function A0(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(x,R,k,z,X){let K=!1;const W=h(z,k,R);r!==W&&(r=W,l(r.object)),K=p(x,z,k,X),K&&g(x,z,k,X),X!==null&&t.update(X,i.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,y(x,R,k,z),X!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function c(){return i.createVertexArray()}function l(x){return i.bindVertexArray(x)}function u(x){return i.deleteVertexArray(x)}function h(x,R,k){const z=k.wireframe===!0;let X=n[x.id];X===void 0&&(X={},n[x.id]=X);let K=X[R.id];K===void 0&&(K={},X[R.id]=K);let W=K[z];return W===void 0&&(W=d(c()),K[z]=W),W}function d(x){const R=[],k=[],z=[];for(let X=0;X<e;X++)R[X]=0,k[X]=0,z[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:k,attributeDivisors:z,object:x,attributes:{},index:null}}function p(x,R,k,z){const X=r.attributes,K=R.attributes;let W=0;const J=k.getAttributes();for(const V in J)if(J[V].location>=0){const ht=X[V];let St=K[V];if(St===void 0&&(V==="instanceMatrix"&&x.instanceMatrix&&(St=x.instanceMatrix),V==="instanceColor"&&x.instanceColor&&(St=x.instanceColor)),ht===void 0||ht.attribute!==St||St&&ht.data!==St.data)return!0;W++}return r.attributesNum!==W||r.index!==z}function g(x,R,k,z){const X={},K=R.attributes;let W=0;const J=k.getAttributes();for(const V in J)if(J[V].location>=0){let ht=K[V];ht===void 0&&(V==="instanceMatrix"&&x.instanceMatrix&&(ht=x.instanceMatrix),V==="instanceColor"&&x.instanceColor&&(ht=x.instanceColor));const St={};St.attribute=ht,ht&&ht.data&&(St.data=ht.data),X[V]=St,W++}r.attributes=X,r.attributesNum=W,r.index=z}function _(){const x=r.newAttributes;for(let R=0,k=x.length;R<k;R++)x[R]=0}function m(x){f(x,0)}function f(x,R){const k=r.newAttributes,z=r.enabledAttributes,X=r.attributeDivisors;k[x]=1,z[x]===0&&(i.enableVertexAttribArray(x),z[x]=1),X[x]!==R&&(i.vertexAttribDivisor(x,R),X[x]=R)}function M(){const x=r.newAttributes,R=r.enabledAttributes;for(let k=0,z=R.length;k<z;k++)R[k]!==x[k]&&(i.disableVertexAttribArray(k),R[k]=0)}function b(x,R,k,z,X,K,W){W===!0?i.vertexAttribIPointer(x,R,k,X,K):i.vertexAttribPointer(x,R,k,z,X,K)}function y(x,R,k,z){_();const X=z.attributes,K=k.getAttributes(),W=R.defaultAttributeValues;for(const J in K){const V=K[J];if(V.location>=0){let rt=X[J];if(rt===void 0&&(J==="instanceMatrix"&&x.instanceMatrix&&(rt=x.instanceMatrix),J==="instanceColor"&&x.instanceColor&&(rt=x.instanceColor)),rt!==void 0){const ht=rt.normalized,St=rt.itemSize,Bt=t.get(rt);if(Bt===void 0)continue;const ne=Bt.buffer,q=Bt.type,nt=Bt.bytesPerElement,vt=q===i.INT||q===i.UNSIGNED_INT||rt.gpuType===nc;if(rt.isInterleavedBufferAttribute){const at=rt.data,wt=at.stride,Pt=rt.offset;if(at.isInstancedInterleavedBuffer){for(let zt=0;zt<V.locationSize;zt++)f(V.location+zt,at.meshPerAttribute);x.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let zt=0;zt<V.locationSize;zt++)m(V.location+zt);i.bindBuffer(i.ARRAY_BUFFER,ne);for(let zt=0;zt<V.locationSize;zt++)b(V.location+zt,St/V.locationSize,q,ht,wt*nt,(Pt+St/V.locationSize*zt)*nt,vt)}else{if(rt.isInstancedBufferAttribute){for(let at=0;at<V.locationSize;at++)f(V.location+at,rt.meshPerAttribute);x.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let at=0;at<V.locationSize;at++)m(V.location+at);i.bindBuffer(i.ARRAY_BUFFER,ne);for(let at=0;at<V.locationSize;at++)b(V.location+at,St/V.locationSize,q,ht,St*nt,St/V.locationSize*at*nt,vt)}}else if(W!==void 0){const ht=W[J];if(ht!==void 0)switch(ht.length){case 2:i.vertexAttrib2fv(V.location,ht);break;case 3:i.vertexAttrib3fv(V.location,ht);break;case 4:i.vertexAttrib4fv(V.location,ht);break;default:i.vertexAttrib1fv(V.location,ht)}}}}M()}function D(){P();for(const x in n){const R=n[x];for(const k in R){const z=R[k];for(const X in z)u(z[X].object),delete z[X];delete R[k]}delete n[x]}}function A(x){if(n[x.id]===void 0)return;const R=n[x.id];for(const k in R){const z=R[k];for(const X in z)u(z[X].object),delete z[X];delete R[k]}delete n[x.id]}function w(x){for(const R in n){const k=n[R];if(k[x.id]===void 0)continue;const z=k[x.id];for(const X in z)u(z[X].object),delete z[X];delete k[x.id]}}function P(){E(),a=!0,r!==s&&(r=s,l(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:P,resetDefaultState:E,dispose:D,releaseStatesOfGeometry:A,releaseStatesOfProgram:w,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function C0(i,t,e){let n;function s(l){n=l}function r(l,u){i.drawArrays(n,l,u),e.update(u,n,1)}function a(l,u,h){h!==0&&(i.drawArraysInstanced(n,l,u,h),e.update(u,n,h))}function o(l,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let p=0;for(let g=0;g<h;g++)p+=u[g];e.update(p,n,1)}function c(l,u,h,d){if(h===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)a(l[g],u[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,u,0,d,0,h);let g=0;for(let _=0;_<h;_++)g+=u[_]*d[_];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function R0(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(w){return!(w!==dn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){const P=w===Ls&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==Nn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==xn&&!P)}function c(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),D=g>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:M,maxVaryings:b,maxFragmentUniforms:y,vertexTextures:D,maxSamples:A}}function P0(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new $n,o=new Ut,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const p=h.length!==0||d||n!==0||s;return s=d,n=h.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){e=u(h,d,0)},this.setState=function(h,d,p){const g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,f=i.get(h);if(!s||g===null||g.length===0||r&&!m)r?u(null):l();else{const M=r?0:n,b=M*4;let y=f.clippingState||null;c.value=y,y=u(g,d,b,p);for(let D=0;D!==b;++D)y[D]=e[D];f.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,d,p,g){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const f=p+_*4,M=d.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<f)&&(m=new Float32Array(f));for(let b=0,y=p;b!==_;++b,y+=4)a.copy(h[b]).applyMatrix4(M,o),a.normal.toArray(m,y),m[y+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function L0(i){let t=new WeakMap;function e(a,o){return o===co?a.mapping=es:o===lo&&(a.mapping=ns),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===co||o===lo)if(t.has(a)){const c=t.get(a).texture;return e(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new Gp(c.height);return l.fromEquirectangularTexture(i,a),t.set(a,l),a.addEventListener("dispose",s),e(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class ah extends ih{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const qi=4,sl=[.125,.215,.35,.446,.526,.582],di=20,ba=new ah,rl=new Lt;let Ta=null,wa=0,Aa=0,Ca=!1;const ui=(1+Math.sqrt(5))/2,Oi=1/ui,al=[new C(-ui,Oi,0),new C(ui,Oi,0),new C(-Oi,0,ui),new C(Oi,0,ui),new C(0,ui,-Oi),new C(0,ui,Oi),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)];class ol{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Ta=this._renderer.getRenderTarget(),wa=this._renderer.getActiveCubeFace(),Aa=this._renderer.getActiveMipmapLevel(),Ca=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ul(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ll(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ta,wa,Aa),this._renderer.xr.enabled=Ca,t.scissorTest=!1,nr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===es||t.mapping===ns?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ta=this._renderer.getRenderTarget(),wa=this._renderer.getActiveCubeFace(),Aa=this._renderer.getActiveMipmapLevel(),Ca=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:vn,minFilter:vn,generateMipmaps:!1,type:Ls,format:dn,colorSpace:cs,depthBuffer:!1},s=cl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=cl(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=D0(r)),this._blurMaterial=I0(r,t,e)}return s}_compileMaterial(t){const e=new xt(this._lodPlanes[0],t);this._renderer.compile(e,ba)}_sceneToCubeUV(t,e,n,s){const o=new qe(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(rl),u.toneMapping=Jn,u.autoClear=!1;const p=new Me({name:"PMREM.Background",side:Oe,depthWrite:!1,depthTest:!1}),g=new xt(new fe,p);let _=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,_=!0):(p.color.copy(rl),_=!0);for(let f=0;f<6;f++){const M=f%3;M===0?(o.up.set(0,c[f],0),o.lookAt(l[f],0,0)):M===1?(o.up.set(0,0,c[f]),o.lookAt(0,l[f],0)):(o.up.set(0,c[f],0),o.lookAt(0,0,l[f]));const b=this._cubeSize;nr(s,M*b,f>2?b:0,b,b),u.setRenderTarget(s),_&&u.render(g,o),u.render(t,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=d,u.autoClear=h,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===es||t.mapping===ns;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ul()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ll());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new xt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;nr(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,ba)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=al[(s-r-1)%al.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new xt(this._lodPlanes[s],l),d=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*di-1),_=r/g,m=isFinite(r)?1+Math.floor(u*_):di;m>di&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${di}`);const f=[];let M=0;for(let w=0;w<di;++w){const P=w/_,E=Math.exp(-P*P/2);f.push(E),w===0?M+=E:w<m&&(M+=2*E)}for(let w=0;w<f.length;w++)f[w]=f[w]/M;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:b}=this;d.dTheta.value=g,d.mipInt.value=b-n;const y=this._sizeLods[s],D=3*y*(s>b-qi?s-b+qi:0),A=4*(this._cubeSize-y);nr(e,D,A,3*y,2*y),c.setRenderTarget(e),c.render(h,ba)}}function D0(i){const t=[],e=[],n=[];let s=i;const r=i-qi+1+sl.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let c=1/o;a>i-qi?c=sl[a-i+qi-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),u=-l,h=1+l,d=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,g=6,_=3,m=2,f=1,M=new Float32Array(_*g*p),b=new Float32Array(m*g*p),y=new Float32Array(f*g*p);for(let A=0;A<p;A++){const w=A%3*2/3-1,P=A>2?0:-1,E=[w,P,0,w+2/3,P,0,w+2/3,P+1,0,w,P,0,w+2/3,P+1,0,w,P+1,0];M.set(E,_*g*A),b.set(d,m*g*A);const x=[A,A,A,A,A,A];y.set(x,f*g*A)}const D=new Ce;D.setAttribute("position",new en(M,_)),D.setAttribute("uv",new en(b,m)),D.setAttribute("faceIndex",new en(y,f)),t.push(D),s>qi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function cl(i,t,e){const n=new xi(i,t,e);return n.texture.mapping=kr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function nr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function I0(i,t,e){const n=new Float32Array(di),s=new C(0,1,0);return new ti({name:"SphericalGaussianBlur",defines:{n:di,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:dc(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function ll(){return new ti({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:dc(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function ul(){return new ti({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:dc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function dc(){return`

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
	`}function U0(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===co||c===lo,u=c===es||c===ns;if(l||u){let h=t.get(o);const d=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new ol(i)),h=l?e.fromEquirectangular(o,h):e.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),h.texture;if(h!==void 0)return h.texture;{const p=o.image;return l&&p&&p.height>0||u&&p&&s(p)?(e===null&&(e=new ol(i)),h=l?e.fromEquirectangular(o):e.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function s(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function N0(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Ts("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function F0(i,t,e,n){const s={},r=new WeakMap;function a(h){const d=h.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,f=_.length;m<f;m++)t.remove(_[m])}d.removeEventListener("dispose",a),delete s[d.id];const p=r.get(d);p&&(t.remove(p),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(h,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,e.memory.geometries++),d}function c(h){const d=h.attributes;for(const g in d)t.update(d[g],i.ARRAY_BUFFER);const p=h.morphAttributes;for(const g in p){const _=p[g];for(let m=0,f=_.length;m<f;m++)t.update(_[m],i.ARRAY_BUFFER)}}function l(h){const d=[],p=h.index,g=h.attributes.position;let _=0;if(p!==null){const M=p.array;_=p.version;for(let b=0,y=M.length;b<y;b+=3){const D=M[b+0],A=M[b+1],w=M[b+2];d.push(D,A,A,w,w,D)}}else if(g!==void 0){const M=g.array;_=g.version;for(let b=0,y=M.length/3-1;b<y;b+=3){const D=b+0,A=b+1,w=b+2;d.push(D,A,A,w,w,D)}}else return;const m=new(Ku(d)?eh:th)(d,1);m.version=_;const f=r.get(h);f&&t.remove(f),r.set(h,m)}function u(h){const d=r.get(h);if(d){const p=h.index;p!==null&&d.version<p.version&&l(h)}else l(h);return r.get(h)}return{get:o,update:c,getWireframeAttribute:u}}function O0(i,t,e){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,p){i.drawElements(n,p,r,d*a),e.update(p,n,1)}function l(d,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,d*a,g),e.update(p,n,g))}function u(d,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,d,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];e.update(m,n,1)}function h(d,p,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)l(d[f]/a,p[f],_[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,d,0,_,0,g);let f=0;for(let M=0;M<g;M++)f+=p[M]*_[M];e.update(f,n,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function k0(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function B0(i,t,e){const n=new WeakMap,s=new ee;function r(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let d=n.get(o);if(d===void 0||d.count!==h){let x=function(){P.dispose(),n.delete(o),o.removeEventListener("dispose",x)};var p=x;d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],M=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let y=0;g===!0&&(y=1),_===!0&&(y=2),m===!0&&(y=3);let D=o.attributes.position.count*y,A=1;D>t.maxTextureSize&&(A=Math.ceil(D/t.maxTextureSize),D=t.maxTextureSize);const w=new Float32Array(D*A*4*h),P=new Ju(w,D,A,h);P.type=xn,P.needsUpdate=!0;const E=y*4;for(let R=0;R<h;R++){const k=f[R],z=M[R],X=b[R],K=D*A*4*R;for(let W=0;W<k.count;W++){const J=W*E;g===!0&&(s.fromBufferAttribute(k,W),w[K+J+0]=s.x,w[K+J+1]=s.y,w[K+J+2]=s.z,w[K+J+3]=0),_===!0&&(s.fromBufferAttribute(z,W),w[K+J+4]=s.x,w[K+J+5]=s.y,w[K+J+6]=s.z,w[K+J+7]=0),m===!0&&(s.fromBufferAttribute(X,W),w[K+J+8]=s.x,w[K+J+9]=s.y,w[K+J+10]=s.z,w[K+J+11]=X.itemSize===4?s.w:1)}}d={count:h,texture:P,size:new At(D,A)},n.set(o,d),o.addEventListener("dispose",x)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const _=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function z0(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,h=t.get(c,u);if(s.get(h)!==l&&(t.update(h),s.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return h}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:a}}class oh extends Ie{constructor(t,e,n,s,r,a,o,c,l,u=Ki){if(u!==Ki&&u!==rs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Ki&&(n=vi),n===void 0&&u===rs&&(n=ss),super(null,s,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:je,this.minFilter=c!==void 0?c:je,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const ch=new Ie,hl=new oh(1,1),lh=new Ju,uh=new wp,hh=new sh,dl=[],fl=[],pl=new Float32Array(16),ml=new Float32Array(9),gl=new Float32Array(4);function ls(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=dl[s];if(r===void 0&&(r=new Float32Array(s),dl[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function be(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Te(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Gr(i,t){let e=fl[t];e===void 0&&(e=new Int32Array(t),fl[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function H0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function G0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;i.uniform2fv(this.addr,t),Te(e,t)}}function V0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(be(e,t))return;i.uniform3fv(this.addr,t),Te(e,t)}}function W0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;i.uniform4fv(this.addr,t),Te(e,t)}}function X0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Te(e,t)}else{if(be(e,n))return;gl.set(n),i.uniformMatrix2fv(this.addr,!1,gl),Te(e,n)}}function $0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Te(e,t)}else{if(be(e,n))return;ml.set(n),i.uniformMatrix3fv(this.addr,!1,ml),Te(e,n)}}function q0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Te(e,t)}else{if(be(e,n))return;pl.set(n),i.uniformMatrix4fv(this.addr,!1,pl),Te(e,n)}}function Y0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function j0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;i.uniform2iv(this.addr,t),Te(e,t)}}function K0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;i.uniform3iv(this.addr,t),Te(e,t)}}function Z0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;i.uniform4iv(this.addr,t),Te(e,t)}}function J0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Q0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;i.uniform2uiv(this.addr,t),Te(e,t)}}function t_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;i.uniform3uiv(this.addr,t),Te(e,t)}}function e_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;i.uniform4uiv(this.addr,t),Te(e,t)}}function n_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(hl.compareFunction=ju,r=hl):r=ch,e.setTexture2D(t||r,s)}function i_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||uh,s)}function s_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||hh,s)}function r_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||lh,s)}function a_(i){switch(i){case 5126:return H0;case 35664:return G0;case 35665:return V0;case 35666:return W0;case 35674:return X0;case 35675:return $0;case 35676:return q0;case 5124:case 35670:return Y0;case 35667:case 35671:return j0;case 35668:case 35672:return K0;case 35669:case 35673:return Z0;case 5125:return J0;case 36294:return Q0;case 36295:return t_;case 36296:return e_;case 35678:case 36198:case 36298:case 36306:case 35682:return n_;case 35679:case 36299:case 36307:return i_;case 35680:case 36300:case 36308:case 36293:return s_;case 36289:case 36303:case 36311:case 36292:return r_}}function o_(i,t){i.uniform1fv(this.addr,t)}function c_(i,t){const e=ls(t,this.size,2);i.uniform2fv(this.addr,e)}function l_(i,t){const e=ls(t,this.size,3);i.uniform3fv(this.addr,e)}function u_(i,t){const e=ls(t,this.size,4);i.uniform4fv(this.addr,e)}function h_(i,t){const e=ls(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function d_(i,t){const e=ls(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function f_(i,t){const e=ls(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function p_(i,t){i.uniform1iv(this.addr,t)}function m_(i,t){i.uniform2iv(this.addr,t)}function g_(i,t){i.uniform3iv(this.addr,t)}function __(i,t){i.uniform4iv(this.addr,t)}function v_(i,t){i.uniform1uiv(this.addr,t)}function x_(i,t){i.uniform2uiv(this.addr,t)}function y_(i,t){i.uniform3uiv(this.addr,t)}function M_(i,t){i.uniform4uiv(this.addr,t)}function S_(i,t,e){const n=this.cache,s=t.length,r=Gr(e,s);be(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||ch,r[a])}function E_(i,t,e){const n=this.cache,s=t.length,r=Gr(e,s);be(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||uh,r[a])}function b_(i,t,e){const n=this.cache,s=t.length,r=Gr(e,s);be(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||hh,r[a])}function T_(i,t,e){const n=this.cache,s=t.length,r=Gr(e,s);be(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||lh,r[a])}function w_(i){switch(i){case 5126:return o_;case 35664:return c_;case 35665:return l_;case 35666:return u_;case 35674:return h_;case 35675:return d_;case 35676:return f_;case 5124:case 35670:return p_;case 35667:case 35671:return m_;case 35668:case 35672:return g_;case 35669:case 35673:return __;case 5125:return v_;case 36294:return x_;case 36295:return y_;case 36296:return M_;case 35678:case 36198:case 36298:case 36306:case 35682:return S_;case 35679:case 36299:case 36307:return E_;case 35680:case 36300:case 36308:case 36293:return b_;case 36289:case 36303:case 36311:case 36292:return T_}}class A_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=a_(e.type)}}class C_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=w_(e.type)}}class R_{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const Ra=/(\w+)(\])?(\[|\.)?/g;function _l(i,t){i.seq.push(t),i.map[t.id]=t}function P_(i,t,e){const n=i.name,s=n.length;for(Ra.lastIndex=0;;){const r=Ra.exec(n),a=Ra.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){_l(e,l===void 0?new A_(o,i,t):new C_(o,i,t));break}else{let h=e.map[o];h===void 0&&(h=new R_(o),_l(e,h)),e=h}}}class Mr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);P_(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function vl(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const L_=37297;let D_=0;function I_(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const xl=new Ut;function U_(i){qt._getMatrix(xl,qt.workingColorSpace,i);const t=`mat3( ${xl.elements.map(e=>e.toFixed(4))} )`;switch(qt.getTransfer(i)){case Br:return[t,"LinearTransferOETF"];case Qt:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function yl(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+I_(i.getShaderSource(t),a)}else return s}function N_(i,t){const e=U_(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function F_(i,t){let e;switch(t){case Jf:e="Linear";break;case Qf:e="Reinhard";break;case tp:e="Cineon";break;case ep:e="ACESFilmic";break;case ip:e="AgX";break;case sp:e="Neutral";break;case np:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ir=new C;function O_(){qt.getLuminanceCoefficients(ir);const i=ir.x.toFixed(4),t=ir.y.toFixed(4),e=ir.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function k_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ws).join(`
`)}function B_(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function z_(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function ws(i){return i!==""}function Ml(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Sl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const H_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Bo(i){return i.replace(H_,V_)}const G_=new Map;function V_(i,t){let e=Ft[t];if(e===void 0){const n=G_.get(t);if(n!==void 0)e=Ft[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Bo(e)}const W_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function El(i){return i.replace(W_,X_)}function X_(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function bl(i){let t=`precision ${i.precision} float;
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
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function $_(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Nu?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Fu?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Rn&&(t="SHADOWMAP_TYPE_VSM"),t}function q_(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case es:case ns:t="ENVMAP_TYPE_CUBE";break;case kr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Y_(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ns:t="ENVMAP_MODE_REFRACTION";break}return t}function j_(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Ou:t="ENVMAP_BLENDING_MULTIPLY";break;case Kf:t="ENVMAP_BLENDING_MIX";break;case Zf:t="ENVMAP_BLENDING_ADD";break}return t}function K_(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Z_(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=$_(e),l=q_(e),u=Y_(e),h=j_(e),d=K_(e),p=k_(e),g=B_(r),_=s.createProgram();let m,f,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ws).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ws).join(`
`),f.length>0&&(f+=`
`)):(m=[bl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ws).join(`
`),f=[bl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Jn?"#define TONE_MAPPING":"",e.toneMapping!==Jn?Ft.tonemapping_pars_fragment:"",e.toneMapping!==Jn?F_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ft.colorspace_pars_fragment,N_("linearToOutputTexel",e.outputColorSpace),O_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ws).join(`
`)),a=Bo(a),a=Ml(a,e),a=Sl(a,e),o=Bo(o),o=Ml(o,e),o=Sl(o,e),a=El(a),o=El(o),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===Oc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Oc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const b=M+m+a,y=M+f+o,D=vl(s,s.VERTEX_SHADER,b),A=vl(s,s.FRAGMENT_SHADER,y);s.attachShader(_,D),s.attachShader(_,A),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function w(R){if(i.debug.checkShaderErrors){const k=s.getProgramInfoLog(_).trim(),z=s.getShaderInfoLog(D).trim(),X=s.getShaderInfoLog(A).trim();let K=!0,W=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(K=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,D,A);else{const J=yl(s,D,"vertex"),V=yl(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+k+`
`+J+`
`+V)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(z===""||X==="")&&(W=!1);W&&(R.diagnostics={runnable:K,programLog:k,vertexShader:{log:z,prefix:m},fragmentShader:{log:X,prefix:f}})}s.deleteShader(D),s.deleteShader(A),P=new Mr(s,_),E=z_(s,_)}let P;this.getUniforms=function(){return P===void 0&&w(this),P};let E;this.getAttributes=function(){return E===void 0&&w(this),E};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(_,L_)),x},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=D_++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=D,this.fragmentShader=A,this}let J_=0;class Q_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new tv(t),e.set(t,n)),n}}class tv{constructor(t){this.id=J_++,this.code=t,this.usedTimes=0}}function ev(i,t,e,n,s,r,a){const o=new uc,c=new Q_,l=new Set,u=[],h=s.logarithmicDepthBuffer,d=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return l.add(E),E===0?"uv":`uv${E}`}function m(E,x,R,k,z){const X=k.fog,K=z.geometry,W=E.isMeshStandardMaterial?k.environment:null,J=(E.isMeshStandardMaterial?e:t).get(E.envMap||W),V=J&&J.mapping===kr?J.image.height:null,rt=g[E.type];E.precision!==null&&(p=s.getMaxPrecision(E.precision),p!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));const ht=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,St=ht!==void 0?ht.length:0;let Bt=0;K.morphAttributes.position!==void 0&&(Bt=1),K.morphAttributes.normal!==void 0&&(Bt=2),K.morphAttributes.color!==void 0&&(Bt=3);let ne,q,nt,vt;if(rt){const Jt=mn[rt];ne=Jt.vertexShader,q=Jt.fragmentShader}else ne=E.vertexShader,q=E.fragmentShader,c.update(E),nt=c.getVertexShaderID(E),vt=c.getFragmentShaderID(E);const at=i.getRenderTarget(),wt=i.state.buffers.depth.getReversed(),Pt=z.isInstancedMesh===!0,zt=z.isBatchedMesh===!0,de=!!E.map,Xt=!!E.matcap,ge=!!J,N=!!E.aoMap,Ke=!!E.lightMap,Ht=!!E.bumpMap,Gt=!!E.normalMap,bt=!!E.displacementMap,oe=!!E.emissiveMap,Et=!!E.metalnessMap,T=!!E.roughnessMap,v=E.anisotropy>0,O=E.clearcoat>0,Y=E.dispersion>0,Z=E.iridescence>0,$=E.sheen>0,yt=E.transmission>0,ot=v&&!!E.anisotropyMap,dt=O&&!!E.clearcoatMap,$t=O&&!!E.clearcoatNormalMap,tt=O&&!!E.clearcoatRoughnessMap,ft=Z&&!!E.iridescenceMap,Tt=Z&&!!E.iridescenceThicknessMap,Ct=$&&!!E.sheenColorMap,pt=$&&!!E.sheenRoughnessMap,Vt=!!E.specularMap,Nt=!!E.specularColorMap,re=!!E.specularIntensityMap,L=yt&&!!E.transmissionMap,st=yt&&!!E.thicknessMap,G=!!E.gradientMap,j=!!E.alphaMap,ut=E.alphaTest>0,ct=!!E.alphaHash,Dt=!!E.extensions;let pe=Jn;E.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(pe=i.toneMapping);const Re={shaderID:rt,shaderType:E.type,shaderName:E.name,vertexShader:ne,fragmentShader:q,defines:E.defines,customVertexShaderID:nt,customFragmentShaderID:vt,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:zt,batchingColor:zt&&z._colorsTexture!==null,instancing:Pt,instancingColor:Pt&&z.instanceColor!==null,instancingMorph:Pt&&z.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:at===null?i.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:cs,alphaToCoverage:!!E.alphaToCoverage,map:de,matcap:Xt,envMap:ge,envMapMode:ge&&J.mapping,envMapCubeUVHeight:V,aoMap:N,lightMap:Ke,bumpMap:Ht,normalMap:Gt,displacementMap:d&&bt,emissiveMap:oe,normalMapObjectSpace:Gt&&E.normalMapType===cp,normalMapTangentSpace:Gt&&E.normalMapType===Yu,metalnessMap:Et,roughnessMap:T,anisotropy:v,anisotropyMap:ot,clearcoat:O,clearcoatMap:dt,clearcoatNormalMap:$t,clearcoatRoughnessMap:tt,dispersion:Y,iridescence:Z,iridescenceMap:ft,iridescenceThicknessMap:Tt,sheen:$,sheenColorMap:Ct,sheenRoughnessMap:pt,specularMap:Vt,specularColorMap:Nt,specularIntensityMap:re,transmission:yt,transmissionMap:L,thicknessMap:st,gradientMap:G,opaque:E.transparent===!1&&E.blending===ji&&E.alphaToCoverage===!1,alphaMap:j,alphaTest:ut,alphaHash:ct,combine:E.combine,mapUv:de&&_(E.map.channel),aoMapUv:N&&_(E.aoMap.channel),lightMapUv:Ke&&_(E.lightMap.channel),bumpMapUv:Ht&&_(E.bumpMap.channel),normalMapUv:Gt&&_(E.normalMap.channel),displacementMapUv:bt&&_(E.displacementMap.channel),emissiveMapUv:oe&&_(E.emissiveMap.channel),metalnessMapUv:Et&&_(E.metalnessMap.channel),roughnessMapUv:T&&_(E.roughnessMap.channel),anisotropyMapUv:ot&&_(E.anisotropyMap.channel),clearcoatMapUv:dt&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:$t&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:tt&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:ft&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:Tt&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:Ct&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:pt&&_(E.sheenRoughnessMap.channel),specularMapUv:Vt&&_(E.specularMap.channel),specularColorMapUv:Nt&&_(E.specularColorMap.channel),specularIntensityMapUv:re&&_(E.specularIntensityMap.channel),transmissionMapUv:L&&_(E.transmissionMap.channel),thicknessMapUv:st&&_(E.thicknessMap.channel),alphaMapUv:j&&_(E.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(Gt||v),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!K.attributes.uv&&(de||j),fog:!!X,useFog:E.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:wt,skinning:z.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:St,morphTextureStride:Bt,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:pe,decodeVideoTexture:de&&E.map.isVideoTexture===!0&&qt.getTransfer(E.map.colorSpace)===Qt,decodeVideoTextureEmissive:oe&&E.emissiveMap.isVideoTexture===!0&&qt.getTransfer(E.emissiveMap.colorSpace)===Qt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Ln,flipSided:E.side===Oe,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Dt&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Dt&&E.extensions.multiDraw===!0||zt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Re.vertexUv1s=l.has(1),Re.vertexUv2s=l.has(2),Re.vertexUv3s=l.has(3),l.clear(),Re}function f(E){const x=[];if(E.shaderID?x.push(E.shaderID):(x.push(E.customVertexShaderID),x.push(E.customFragmentShaderID)),E.defines!==void 0)for(const R in E.defines)x.push(R),x.push(E.defines[R]);return E.isRawShaderMaterial===!1&&(M(x,E),b(x,E),x.push(i.outputColorSpace)),x.push(E.customProgramCacheKey),x.join()}function M(E,x){E.push(x.precision),E.push(x.outputColorSpace),E.push(x.envMapMode),E.push(x.envMapCubeUVHeight),E.push(x.mapUv),E.push(x.alphaMapUv),E.push(x.lightMapUv),E.push(x.aoMapUv),E.push(x.bumpMapUv),E.push(x.normalMapUv),E.push(x.displacementMapUv),E.push(x.emissiveMapUv),E.push(x.metalnessMapUv),E.push(x.roughnessMapUv),E.push(x.anisotropyMapUv),E.push(x.clearcoatMapUv),E.push(x.clearcoatNormalMapUv),E.push(x.clearcoatRoughnessMapUv),E.push(x.iridescenceMapUv),E.push(x.iridescenceThicknessMapUv),E.push(x.sheenColorMapUv),E.push(x.sheenRoughnessMapUv),E.push(x.specularMapUv),E.push(x.specularColorMapUv),E.push(x.specularIntensityMapUv),E.push(x.transmissionMapUv),E.push(x.thicknessMapUv),E.push(x.combine),E.push(x.fogExp2),E.push(x.sizeAttenuation),E.push(x.morphTargetsCount),E.push(x.morphAttributeCount),E.push(x.numDirLights),E.push(x.numPointLights),E.push(x.numSpotLights),E.push(x.numSpotLightMaps),E.push(x.numHemiLights),E.push(x.numRectAreaLights),E.push(x.numDirLightShadows),E.push(x.numPointLightShadows),E.push(x.numSpotLightShadows),E.push(x.numSpotLightShadowsWithMaps),E.push(x.numLightProbes),E.push(x.shadowMapType),E.push(x.toneMapping),E.push(x.numClippingPlanes),E.push(x.numClipIntersection),E.push(x.depthPacking)}function b(E,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),E.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reverseDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),E.push(o.mask)}function y(E){const x=g[E.type];let R;if(x){const k=mn[x];R=kp.clone(k.uniforms)}else R=E.uniforms;return R}function D(E,x){let R;for(let k=0,z=u.length;k<z;k++){const X=u[k];if(X.cacheKey===x){R=X,++R.usedTimes;break}}return R===void 0&&(R=new Z_(i,x,E,r),u.push(R)),R}function A(E){if(--E.usedTimes===0){const x=u.indexOf(E);u[x]=u[u.length-1],u.pop(),E.destroy()}}function w(E){c.remove(E)}function P(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:y,acquireProgram:D,releaseProgram:A,releaseShaderCache:w,programs:u,dispose:P}}function nv(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function iv(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Tl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function wl(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(h,d,p,g,_,m){let f=i[t];return f===void 0?(f={id:h.id,object:h,geometry:d,material:p,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},i[t]=f):(f.id=h.id,f.object=h,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=h.renderOrder,f.z=_,f.group=m),t++,f}function o(h,d,p,g,_,m){const f=a(h,d,p,g,_,m);p.transmission>0?n.push(f):p.transparent===!0?s.push(f):e.push(f)}function c(h,d,p,g,_,m){const f=a(h,d,p,g,_,m);p.transmission>0?n.unshift(f):p.transparent===!0?s.unshift(f):e.unshift(f)}function l(h,d){e.length>1&&e.sort(h||iv),n.length>1&&n.sort(d||Tl),s.length>1&&s.sort(d||Tl)}function u(){for(let h=t,d=i.length;h<d;h++){const p=i[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:u,sort:l}}function sv(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new wl,i.set(n,[a])):s>=r.length?(a=new wl,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function rv(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new C,color:new Lt};break;case"SpotLight":e={position:new C,direction:new C,color:new Lt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new C,color:new Lt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new C,skyColor:new Lt,groundColor:new Lt};break;case"RectAreaLight":e={color:new Lt,position:new C,halfWidth:new C,halfHeight:new C};break}return i[t.id]=e,e}}}function av(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let ov=0;function cv(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function lv(i){const t=new rv,e=av(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new C);const s=new C,r=new se,a=new se;function o(l){let u=0,h=0,d=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let p=0,g=0,_=0,m=0,f=0,M=0,b=0,y=0,D=0,A=0,w=0;l.sort(cv);for(let E=0,x=l.length;E<x;E++){const R=l[E],k=R.color,z=R.intensity,X=R.distance,K=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=k.r*z,h+=k.g*z,d+=k.b*z;else if(R.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(R.sh.coefficients[W],z);w++}else if(R.isDirectionalLight){const W=t.get(R);if(W.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const J=R.shadow,V=e.get(R);V.shadowIntensity=J.intensity,V.shadowBias=J.bias,V.shadowNormalBias=J.normalBias,V.shadowRadius=J.radius,V.shadowMapSize=J.mapSize,n.directionalShadow[p]=V,n.directionalShadowMap[p]=K,n.directionalShadowMatrix[p]=R.shadow.matrix,M++}n.directional[p]=W,p++}else if(R.isSpotLight){const W=t.get(R);W.position.setFromMatrixPosition(R.matrixWorld),W.color.copy(k).multiplyScalar(z),W.distance=X,W.coneCos=Math.cos(R.angle),W.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),W.decay=R.decay,n.spot[_]=W;const J=R.shadow;if(R.map&&(n.spotLightMap[D]=R.map,D++,J.updateMatrices(R),R.castShadow&&A++),n.spotLightMatrix[_]=J.matrix,R.castShadow){const V=e.get(R);V.shadowIntensity=J.intensity,V.shadowBias=J.bias,V.shadowNormalBias=J.normalBias,V.shadowRadius=J.radius,V.shadowMapSize=J.mapSize,n.spotShadow[_]=V,n.spotShadowMap[_]=K,y++}_++}else if(R.isRectAreaLight){const W=t.get(R);W.color.copy(k).multiplyScalar(z),W.halfWidth.set(R.width*.5,0,0),W.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=W,m++}else if(R.isPointLight){const W=t.get(R);if(W.color.copy(R.color).multiplyScalar(R.intensity),W.distance=R.distance,W.decay=R.decay,R.castShadow){const J=R.shadow,V=e.get(R);V.shadowIntensity=J.intensity,V.shadowBias=J.bias,V.shadowNormalBias=J.normalBias,V.shadowRadius=J.radius,V.shadowMapSize=J.mapSize,V.shadowCameraNear=J.camera.near,V.shadowCameraFar=J.camera.far,n.pointShadow[g]=V,n.pointShadowMap[g]=K,n.pointShadowMatrix[g]=R.shadow.matrix,b++}n.point[g]=W,g++}else if(R.isHemisphereLight){const W=t.get(R);W.skyColor.copy(R.color).multiplyScalar(z),W.groundColor.copy(R.groundColor).multiplyScalar(z),n.hemi[f]=W,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=it.LTC_FLOAT_1,n.rectAreaLTC2=it.LTC_FLOAT_2):(n.rectAreaLTC1=it.LTC_HALF_1,n.rectAreaLTC2=it.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;const P=n.hash;(P.directionalLength!==p||P.pointLength!==g||P.spotLength!==_||P.rectAreaLength!==m||P.hemiLength!==f||P.numDirectionalShadows!==M||P.numPointShadows!==b||P.numSpotShadows!==y||P.numSpotMaps!==D||P.numLightProbes!==w)&&(n.directional.length=p,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=y+D-A,n.spotLightMap.length=D,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=w,P.directionalLength=p,P.pointLength=g,P.spotLength=_,P.rectAreaLength=m,P.hemiLength=f,P.numDirectionalShadows=M,P.numPointShadows=b,P.numSpotShadows=y,P.numSpotMaps=D,P.numLightProbes=w,n.version=ov++)}function c(l,u){let h=0,d=0,p=0,g=0,_=0;const m=u.matrixWorldInverse;for(let f=0,M=l.length;f<M;f++){const b=l[f];if(b.isDirectionalLight){const y=n.directional[h];y.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),h++}else if(b.isSpotLight){const y=n.spot[p];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),p++}else if(b.isRectAreaLight){const y=n.rectArea[g];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(m),a.identity(),r.copy(b.matrixWorld),r.premultiply(m),a.extractRotation(r),y.halfWidth.set(b.width*.5,0,0),y.halfHeight.set(0,b.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(b.isPointLight){const y=n.point[d];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(m),d++}else if(b.isHemisphereLight){const y=n.hemi[_];y.direction.setFromMatrixPosition(b.matrixWorld),y.direction.transformDirection(m),_++}}}return{setup:o,setupView:c,state:n}}function Al(i){const t=new lv(i),e=[],n=[];function s(u){l.camera=u,e.length=0,n.length=0}function r(u){e.push(u)}function a(u){n.push(u)}function o(){t.setup(e)}function c(u){t.setupView(e,u)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function uv(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Al(i),t.set(s,[o])):r>=a.length?(o=new Al(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class hv extends Us{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=ap,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class dv extends Us{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const fv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,pv=`uniform sampler2D shadow_pass;
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
}`;function mv(i,t,e){let n=new hc;const s=new At,r=new At,a=new ee,o=new hv({depthPacking:op}),c=new dv,l={},u=e.maxTextureSize,h={[Qn]:Oe,[Oe]:Qn,[Ln]:Ln},d=new ti({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new At},radius:{value:4}},vertexShader:fv,fragmentShader:pv}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new Ce;g.setAttribute("position",new en(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new xt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Nu;let f=this.type;this.render=function(A,w,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const E=i.getRenderTarget(),x=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),k=i.state;k.setBlending(Zn),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const z=f!==Rn&&this.type===Rn,X=f===Rn&&this.type!==Rn;for(let K=0,W=A.length;K<W;K++){const J=A[K],V=J.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const rt=V.getFrameExtents();if(s.multiply(rt),r.copy(V.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/rt.x),s.x=r.x*rt.x,V.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/rt.y),s.y=r.y*rt.y,V.mapSize.y=r.y)),V.map===null||z===!0||X===!0){const St=this.type!==Rn?{minFilter:je,magFilter:je}:{};V.map!==null&&V.map.dispose(),V.map=new xi(s.x,s.y,St),V.map.texture.name=J.name+".shadowMap",V.camera.updateProjectionMatrix()}i.setRenderTarget(V.map),i.clear();const ht=V.getViewportCount();for(let St=0;St<ht;St++){const Bt=V.getViewport(St);a.set(r.x*Bt.x,r.y*Bt.y,r.x*Bt.z,r.y*Bt.w),k.viewport(a),V.updateMatrices(J,St),n=V.getFrustum(),y(w,P,V.camera,J,this.type)}V.isPointLightShadow!==!0&&this.type===Rn&&M(V,P),V.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(E,x,R)};function M(A,w){const P=t.update(_);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new xi(s.x,s.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(w,null,P,d,_,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(w,null,P,p,_,null)}function b(A,w,P,E){let x=null;const R=P.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(R!==void 0)x=R;else if(x=P.isPointLight===!0?c:o,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const k=x.uuid,z=w.uuid;let X=l[k];X===void 0&&(X={},l[k]=X);let K=X[z];K===void 0&&(K=x.clone(),X[z]=K,w.addEventListener("dispose",D)),x=K}if(x.visible=w.visible,x.wireframe=w.wireframe,E===Rn?x.side=w.shadowSide!==null?w.shadowSide:w.side:x.side=w.shadowSide!==null?w.shadowSide:h[w.side],x.alphaMap=w.alphaMap,x.alphaTest=w.alphaTest,x.map=w.map,x.clipShadows=w.clipShadows,x.clippingPlanes=w.clippingPlanes,x.clipIntersection=w.clipIntersection,x.displacementMap=w.displacementMap,x.displacementScale=w.displacementScale,x.displacementBias=w.displacementBias,x.wireframeLinewidth=w.wireframeLinewidth,x.linewidth=w.linewidth,P.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const k=i.properties.get(x);k.light=P}return x}function y(A,w,P,E,x){if(A.visible===!1)return;if(A.layers.test(w.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&x===Rn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,A.matrixWorld);const z=t.update(A),X=A.material;if(Array.isArray(X)){const K=z.groups;for(let W=0,J=K.length;W<J;W++){const V=K[W],rt=X[V.materialIndex];if(rt&&rt.visible){const ht=b(A,rt,E,x);A.onBeforeShadow(i,A,w,P,z,ht,V),i.renderBufferDirect(P,null,z,ht,A,V),A.onAfterShadow(i,A,w,P,z,ht,V)}}}else if(X.visible){const K=b(A,X,E,x);A.onBeforeShadow(i,A,w,P,z,K,null),i.renderBufferDirect(P,null,z,K,A,null),A.onAfterShadow(i,A,w,P,z,K,null)}}const k=A.children;for(let z=0,X=k.length;z<X;z++)y(k[z],w,P,E,x)}function D(A){A.target.removeEventListener("dispose",D);for(const P in l){const E=l[P],x=A.target.uuid;x in E&&(E[x].dispose(),delete E[x])}}}const gv={[eo]:no,[io]:ao,[so]:oo,[ts]:ro,[no]:eo,[ao]:io,[oo]:so,[ro]:ts};function _v(i,t){function e(){let L=!1;const st=new ee;let G=null;const j=new ee(0,0,0,0);return{setMask:function(ut){G!==ut&&!L&&(i.colorMask(ut,ut,ut,ut),G=ut)},setLocked:function(ut){L=ut},setClear:function(ut,ct,Dt,pe,Re){Re===!0&&(ut*=pe,ct*=pe,Dt*=pe),st.set(ut,ct,Dt,pe),j.equals(st)===!1&&(i.clearColor(ut,ct,Dt,pe),j.copy(st))},reset:function(){L=!1,G=null,j.set(-1,0,0,0)}}}function n(){let L=!1,st=!1,G=null,j=null,ut=null;return{setReversed:function(ct){if(st!==ct){const Dt=t.get("EXT_clip_control");st?Dt.clipControlEXT(Dt.LOWER_LEFT_EXT,Dt.ZERO_TO_ONE_EXT):Dt.clipControlEXT(Dt.LOWER_LEFT_EXT,Dt.NEGATIVE_ONE_TO_ONE_EXT);const pe=ut;ut=null,this.setClear(pe)}st=ct},getReversed:function(){return st},setTest:function(ct){ct?at(i.DEPTH_TEST):wt(i.DEPTH_TEST)},setMask:function(ct){G!==ct&&!L&&(i.depthMask(ct),G=ct)},setFunc:function(ct){if(st&&(ct=gv[ct]),j!==ct){switch(ct){case eo:i.depthFunc(i.NEVER);break;case no:i.depthFunc(i.ALWAYS);break;case io:i.depthFunc(i.LESS);break;case ts:i.depthFunc(i.LEQUAL);break;case so:i.depthFunc(i.EQUAL);break;case ro:i.depthFunc(i.GEQUAL);break;case ao:i.depthFunc(i.GREATER);break;case oo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}j=ct}},setLocked:function(ct){L=ct},setClear:function(ct){ut!==ct&&(st&&(ct=1-ct),i.clearDepth(ct),ut=ct)},reset:function(){L=!1,G=null,j=null,ut=null,st=!1}}}function s(){let L=!1,st=null,G=null,j=null,ut=null,ct=null,Dt=null,pe=null,Re=null;return{setTest:function(Jt){L||(Jt?at(i.STENCIL_TEST):wt(i.STENCIL_TEST))},setMask:function(Jt){st!==Jt&&!L&&(i.stencilMask(Jt),st=Jt)},setFunc:function(Jt,sn,Sn){(G!==Jt||j!==sn||ut!==Sn)&&(i.stencilFunc(Jt,sn,Sn),G=Jt,j=sn,ut=Sn)},setOp:function(Jt,sn,Sn){(ct!==Jt||Dt!==sn||pe!==Sn)&&(i.stencilOp(Jt,sn,Sn),ct=Jt,Dt=sn,pe=Sn)},setLocked:function(Jt){L=Jt},setClear:function(Jt){Re!==Jt&&(i.clearStencil(Jt),Re=Jt)},reset:function(){L=!1,st=null,G=null,j=null,ut=null,ct=null,Dt=null,pe=null,Re=null}}}const r=new e,a=new n,o=new s,c=new WeakMap,l=new WeakMap;let u={},h={},d=new WeakMap,p=[],g=null,_=!1,m=null,f=null,M=null,b=null,y=null,D=null,A=null,w=new Lt(0,0,0),P=0,E=!1,x=null,R=null,k=null,z=null,X=null;const K=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,J=0;const V=i.getParameter(i.VERSION);V.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(V)[1]),W=J>=1):V.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),W=J>=2);let rt=null,ht={};const St=i.getParameter(i.SCISSOR_BOX),Bt=i.getParameter(i.VIEWPORT),ne=new ee().fromArray(St),q=new ee().fromArray(Bt);function nt(L,st,G,j){const ut=new Uint8Array(4),ct=i.createTexture();i.bindTexture(L,ct),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Dt=0;Dt<G;Dt++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(st,0,i.RGBA,1,1,j,0,i.RGBA,i.UNSIGNED_BYTE,ut):i.texImage2D(st+Dt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ut);return ct}const vt={};vt[i.TEXTURE_2D]=nt(i.TEXTURE_2D,i.TEXTURE_2D,1),vt[i.TEXTURE_CUBE_MAP]=nt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),vt[i.TEXTURE_2D_ARRAY]=nt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),vt[i.TEXTURE_3D]=nt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),at(i.DEPTH_TEST),a.setFunc(ts),Ht(!1),Gt(Lc),at(i.CULL_FACE),N(Zn);function at(L){u[L]!==!0&&(i.enable(L),u[L]=!0)}function wt(L){u[L]!==!1&&(i.disable(L),u[L]=!1)}function Pt(L,st){return h[L]!==st?(i.bindFramebuffer(L,st),h[L]=st,L===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=st),L===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=st),!0):!1}function zt(L,st){let G=p,j=!1;if(L){G=d.get(st),G===void 0&&(G=[],d.set(st,G));const ut=L.textures;if(G.length!==ut.length||G[0]!==i.COLOR_ATTACHMENT0){for(let ct=0,Dt=ut.length;ct<Dt;ct++)G[ct]=i.COLOR_ATTACHMENT0+ct;G.length=ut.length,j=!0}}else G[0]!==i.BACK&&(G[0]=i.BACK,j=!0);j&&i.drawBuffers(G)}function de(L){return g!==L?(i.useProgram(L),g=L,!0):!1}const Xt={[hi]:i.FUNC_ADD,[If]:i.FUNC_SUBTRACT,[Uf]:i.FUNC_REVERSE_SUBTRACT};Xt[Nf]=i.MIN,Xt[Ff]=i.MAX;const ge={[Of]:i.ZERO,[kf]:i.ONE,[Bf]:i.SRC_COLOR,[Qa]:i.SRC_ALPHA,[Xf]:i.SRC_ALPHA_SATURATE,[Vf]:i.DST_COLOR,[Hf]:i.DST_ALPHA,[zf]:i.ONE_MINUS_SRC_COLOR,[to]:i.ONE_MINUS_SRC_ALPHA,[Wf]:i.ONE_MINUS_DST_COLOR,[Gf]:i.ONE_MINUS_DST_ALPHA,[$f]:i.CONSTANT_COLOR,[qf]:i.ONE_MINUS_CONSTANT_COLOR,[Yf]:i.CONSTANT_ALPHA,[jf]:i.ONE_MINUS_CONSTANT_ALPHA};function N(L,st,G,j,ut,ct,Dt,pe,Re,Jt){if(L===Zn){_===!0&&(wt(i.BLEND),_=!1);return}if(_===!1&&(at(i.BLEND),_=!0),L!==Df){if(L!==m||Jt!==E){if((f!==hi||y!==hi)&&(i.blendEquation(i.FUNC_ADD),f=hi,y=hi),Jt)switch(L){case ji:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Dc:i.blendFunc(i.ONE,i.ONE);break;case Ic:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Uc:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case ji:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Dc:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Ic:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Uc:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}M=null,b=null,D=null,A=null,w.set(0,0,0),P=0,m=L,E=Jt}return}ut=ut||st,ct=ct||G,Dt=Dt||j,(st!==f||ut!==y)&&(i.blendEquationSeparate(Xt[st],Xt[ut]),f=st,y=ut),(G!==M||j!==b||ct!==D||Dt!==A)&&(i.blendFuncSeparate(ge[G],ge[j],ge[ct],ge[Dt]),M=G,b=j,D=ct,A=Dt),(pe.equals(w)===!1||Re!==P)&&(i.blendColor(pe.r,pe.g,pe.b,Re),w.copy(pe),P=Re),m=L,E=!1}function Ke(L,st){L.side===Ln?wt(i.CULL_FACE):at(i.CULL_FACE);let G=L.side===Oe;st&&(G=!G),Ht(G),L.blending===ji&&L.transparent===!1?N(Zn):N(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),r.setMask(L.colorWrite);const j=L.stencilWrite;o.setTest(j),j&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),oe(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?at(i.SAMPLE_ALPHA_TO_COVERAGE):wt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ht(L){x!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),x=L)}function Gt(L){L!==Pf?(at(i.CULL_FACE),L!==R&&(L===Lc?i.cullFace(i.BACK):L===Lf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):wt(i.CULL_FACE),R=L}function bt(L){L!==k&&(W&&i.lineWidth(L),k=L)}function oe(L,st,G){L?(at(i.POLYGON_OFFSET_FILL),(z!==st||X!==G)&&(i.polygonOffset(st,G),z=st,X=G)):wt(i.POLYGON_OFFSET_FILL)}function Et(L){L?at(i.SCISSOR_TEST):wt(i.SCISSOR_TEST)}function T(L){L===void 0&&(L=i.TEXTURE0+K-1),rt!==L&&(i.activeTexture(L),rt=L)}function v(L,st,G){G===void 0&&(rt===null?G=i.TEXTURE0+K-1:G=rt);let j=ht[G];j===void 0&&(j={type:void 0,texture:void 0},ht[G]=j),(j.type!==L||j.texture!==st)&&(rt!==G&&(i.activeTexture(G),rt=G),i.bindTexture(L,st||vt[L]),j.type=L,j.texture=st)}function O(){const L=ht[rt];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function Y(){try{i.compressedTexImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Z(){try{i.compressedTexImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function $(){try{i.texSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function yt(){try{i.texSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ot(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function dt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function $t(){try{i.texStorage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function tt(){try{i.texStorage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ft(){try{i.texImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Tt(){try{i.texImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ct(L){ne.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),ne.copy(L))}function pt(L){q.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),q.copy(L))}function Vt(L,st){let G=l.get(st);G===void 0&&(G=new WeakMap,l.set(st,G));let j=G.get(L);j===void 0&&(j=i.getUniformBlockIndex(st,L.name),G.set(L,j))}function Nt(L,st){const j=l.get(st).get(L);c.get(st)!==j&&(i.uniformBlockBinding(st,j,L.__bindingPointIndex),c.set(st,j))}function re(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},rt=null,ht={},h={},d=new WeakMap,p=[],g=null,_=!1,m=null,f=null,M=null,b=null,y=null,D=null,A=null,w=new Lt(0,0,0),P=0,E=!1,x=null,R=null,k=null,z=null,X=null,ne.set(0,0,i.canvas.width,i.canvas.height),q.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:at,disable:wt,bindFramebuffer:Pt,drawBuffers:zt,useProgram:de,setBlending:N,setMaterial:Ke,setFlipSided:Ht,setCullFace:Gt,setLineWidth:bt,setPolygonOffset:oe,setScissorTest:Et,activeTexture:T,bindTexture:v,unbindTexture:O,compressedTexImage2D:Y,compressedTexImage3D:Z,texImage2D:ft,texImage3D:Tt,updateUBOMapping:Vt,uniformBlockBinding:Nt,texStorage2D:$t,texStorage3D:tt,texSubImage2D:$,texSubImage3D:yt,compressedTexSubImage2D:ot,compressedTexSubImage3D:dt,scissor:Ct,viewport:pt,reset:re}}function Cl(i,t,e,n){const s=vv(n);switch(e){case Gu:return i*t;case Wu:return i*t;case Xu:return i*t*2;case rc:return i*t/s.components*s.byteLength;case ac:return i*t/s.components*s.byteLength;case $u:return i*t*2/s.components*s.byteLength;case oc:return i*t*2/s.components*s.byteLength;case Vu:return i*t*3/s.components*s.byteLength;case dn:return i*t*4/s.components*s.byteLength;case cc:return i*t*4/s.components*s.byteLength;case mr:case gr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case _r:case vr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case fo:case mo:return Math.max(i,16)*Math.max(t,8)/4;case ho:case po:return Math.max(i,8)*Math.max(t,8)/2;case go:case _o:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case vo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case xo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case yo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Mo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case So:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Eo:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case bo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case To:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case wo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ao:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Co:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Ro:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Po:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Lo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Do:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case xr:case Io:case Uo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case qu:case No:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Fo:case Oo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function vv(i){switch(i){case Nn:case Bu:return{byteLength:1,components:1};case Rs:case zu:case Ls:return{byteLength:2,components:1};case ic:case sc:return{byteLength:2,components:4};case vi:case nc:case xn:return{byteLength:4,components:1};case Hu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function xv(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new At,u=new WeakMap;let h;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,v){return p?new OffscreenCanvas(T,v):Cr("canvas")}function _(T,v,O){let Y=1;const Z=Et(T);if((Z.width>O||Z.height>O)&&(Y=O/Math.max(Z.width,Z.height)),Y<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const $=Math.floor(Y*Z.width),yt=Math.floor(Y*Z.height);h===void 0&&(h=g($,yt));const ot=v?g($,yt):h;return ot.width=$,ot.height=yt,ot.getContext("2d").drawImage(T,0,0,$,yt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+$+"x"+yt+")."),ot}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),T;return T}function m(T){return T.generateMipmaps}function f(T){i.generateMipmap(T)}function M(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(T,v,O,Y,Z=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let $=v;if(v===i.RED&&(O===i.FLOAT&&($=i.R32F),O===i.HALF_FLOAT&&($=i.R16F),O===i.UNSIGNED_BYTE&&($=i.R8)),v===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&($=i.R8UI),O===i.UNSIGNED_SHORT&&($=i.R16UI),O===i.UNSIGNED_INT&&($=i.R32UI),O===i.BYTE&&($=i.R8I),O===i.SHORT&&($=i.R16I),O===i.INT&&($=i.R32I)),v===i.RG&&(O===i.FLOAT&&($=i.RG32F),O===i.HALF_FLOAT&&($=i.RG16F),O===i.UNSIGNED_BYTE&&($=i.RG8)),v===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&($=i.RG8UI),O===i.UNSIGNED_SHORT&&($=i.RG16UI),O===i.UNSIGNED_INT&&($=i.RG32UI),O===i.BYTE&&($=i.RG8I),O===i.SHORT&&($=i.RG16I),O===i.INT&&($=i.RG32I)),v===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&($=i.RGB8UI),O===i.UNSIGNED_SHORT&&($=i.RGB16UI),O===i.UNSIGNED_INT&&($=i.RGB32UI),O===i.BYTE&&($=i.RGB8I),O===i.SHORT&&($=i.RGB16I),O===i.INT&&($=i.RGB32I)),v===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&($=i.RGBA8UI),O===i.UNSIGNED_SHORT&&($=i.RGBA16UI),O===i.UNSIGNED_INT&&($=i.RGBA32UI),O===i.BYTE&&($=i.RGBA8I),O===i.SHORT&&($=i.RGBA16I),O===i.INT&&($=i.RGBA32I)),v===i.RGB&&O===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),v===i.RGBA){const yt=Z?Br:qt.getTransfer(Y);O===i.FLOAT&&($=i.RGBA32F),O===i.HALF_FLOAT&&($=i.RGBA16F),O===i.UNSIGNED_BYTE&&($=yt===Qt?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function y(T,v){let O;return T?v===null||v===vi||v===ss?O=i.DEPTH24_STENCIL8:v===xn?O=i.DEPTH32F_STENCIL8:v===Rs&&(O=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===vi||v===ss?O=i.DEPTH_COMPONENT24:v===xn?O=i.DEPTH_COMPONENT32F:v===Rs&&(O=i.DEPTH_COMPONENT16),O}function D(T,v){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==je&&T.minFilter!==vn?Math.log2(Math.max(v.width,v.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?v.mipmaps.length:1}function A(T){const v=T.target;v.removeEventListener("dispose",A),P(v),v.isVideoTexture&&u.delete(v)}function w(T){const v=T.target;v.removeEventListener("dispose",w),x(v)}function P(T){const v=n.get(T);if(v.__webglInit===void 0)return;const O=T.source,Y=d.get(O);if(Y){const Z=Y[v.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&E(T),Object.keys(Y).length===0&&d.delete(O)}n.remove(T)}function E(T){const v=n.get(T);i.deleteTexture(v.__webglTexture);const O=T.source,Y=d.get(O);delete Y[v.__cacheKey],a.memory.textures--}function x(T){const v=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(v.__webglFramebuffer[Y]))for(let Z=0;Z<v.__webglFramebuffer[Y].length;Z++)i.deleteFramebuffer(v.__webglFramebuffer[Y][Z]);else i.deleteFramebuffer(v.__webglFramebuffer[Y]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[Y])}else{if(Array.isArray(v.__webglFramebuffer))for(let Y=0;Y<v.__webglFramebuffer.length;Y++)i.deleteFramebuffer(v.__webglFramebuffer[Y]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let Y=0;Y<v.__webglColorRenderbuffer.length;Y++)v.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[Y]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const O=T.textures;for(let Y=0,Z=O.length;Y<Z;Y++){const $=n.get(O[Y]);$.__webglTexture&&(i.deleteTexture($.__webglTexture),a.memory.textures--),n.remove(O[Y])}n.remove(T)}let R=0;function k(){R=0}function z(){const T=R;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),R+=1,T}function X(T){const v=[];return v.push(T.wrapS),v.push(T.wrapT),v.push(T.wrapR||0),v.push(T.magFilter),v.push(T.minFilter),v.push(T.anisotropy),v.push(T.internalFormat),v.push(T.format),v.push(T.type),v.push(T.generateMipmaps),v.push(T.premultiplyAlpha),v.push(T.flipY),v.push(T.unpackAlignment),v.push(T.colorSpace),v.join()}function K(T,v){const O=n.get(T);if(T.isVideoTexture&&bt(T),T.isRenderTargetTexture===!1&&T.version>0&&O.__version!==T.version){const Y=T.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(O,T,v);return}}e.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+v)}function W(T,v){const O=n.get(T);if(T.version>0&&O.__version!==T.version){q(O,T,v);return}e.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+v)}function J(T,v){const O=n.get(T);if(T.version>0&&O.__version!==T.version){q(O,T,v);return}e.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+v)}function V(T,v){const O=n.get(T);if(T.version>0&&O.__version!==T.version){nt(O,T,v);return}e.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+v)}const rt={[is]:i.REPEAT,[pi]:i.CLAMP_TO_EDGE,[uo]:i.MIRRORED_REPEAT},ht={[je]:i.NEAREST,[rp]:i.NEAREST_MIPMAP_NEAREST,[Os]:i.NEAREST_MIPMAP_LINEAR,[vn]:i.LINEAR,[na]:i.LINEAR_MIPMAP_NEAREST,[mi]:i.LINEAR_MIPMAP_LINEAR},St={[lp]:i.NEVER,[mp]:i.ALWAYS,[up]:i.LESS,[ju]:i.LEQUAL,[hp]:i.EQUAL,[pp]:i.GEQUAL,[dp]:i.GREATER,[fp]:i.NOTEQUAL};function Bt(T,v){if(v.type===xn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===vn||v.magFilter===na||v.magFilter===Os||v.magFilter===mi||v.minFilter===vn||v.minFilter===na||v.minFilter===Os||v.minFilter===mi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,rt[v.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,rt[v.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,rt[v.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,ht[v.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,ht[v.minFilter]),v.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,St[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===je||v.minFilter!==Os&&v.minFilter!==mi||v.type===xn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const O=t.get("EXT_texture_filter_anisotropic");i.texParameterf(T,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function ne(T,v){let O=!1;T.__webglInit===void 0&&(T.__webglInit=!0,v.addEventListener("dispose",A));const Y=v.source;let Z=d.get(Y);Z===void 0&&(Z={},d.set(Y,Z));const $=X(v);if($!==T.__cacheKey){Z[$]===void 0&&(Z[$]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,O=!0),Z[$].usedTimes++;const yt=Z[T.__cacheKey];yt!==void 0&&(Z[T.__cacheKey].usedTimes--,yt.usedTimes===0&&E(v)),T.__cacheKey=$,T.__webglTexture=Z[$].texture}return O}function q(T,v,O){let Y=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Y=i.TEXTURE_3D);const Z=ne(T,v),$=v.source;e.bindTexture(Y,T.__webglTexture,i.TEXTURE0+O);const yt=n.get($);if($.version!==yt.__version||Z===!0){e.activeTexture(i.TEXTURE0+O);const ot=qt.getPrimaries(qt.workingColorSpace),dt=v.colorSpace===qn?null:qt.getPrimaries(v.colorSpace),$t=v.colorSpace===qn||ot===dt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,$t);let tt=_(v.image,!1,s.maxTextureSize);tt=oe(v,tt);const ft=r.convert(v.format,v.colorSpace),Tt=r.convert(v.type);let Ct=b(v.internalFormat,ft,Tt,v.colorSpace,v.isVideoTexture);Bt(Y,v);let pt;const Vt=v.mipmaps,Nt=v.isVideoTexture!==!0,re=yt.__version===void 0||Z===!0,L=$.dataReady,st=D(v,tt);if(v.isDepthTexture)Ct=y(v.format===rs,v.type),re&&(Nt?e.texStorage2D(i.TEXTURE_2D,1,Ct,tt.width,tt.height):e.texImage2D(i.TEXTURE_2D,0,Ct,tt.width,tt.height,0,ft,Tt,null));else if(v.isDataTexture)if(Vt.length>0){Nt&&re&&e.texStorage2D(i.TEXTURE_2D,st,Ct,Vt[0].width,Vt[0].height);for(let G=0,j=Vt.length;G<j;G++)pt=Vt[G],Nt?L&&e.texSubImage2D(i.TEXTURE_2D,G,0,0,pt.width,pt.height,ft,Tt,pt.data):e.texImage2D(i.TEXTURE_2D,G,Ct,pt.width,pt.height,0,ft,Tt,pt.data);v.generateMipmaps=!1}else Nt?(re&&e.texStorage2D(i.TEXTURE_2D,st,Ct,tt.width,tt.height),L&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,tt.width,tt.height,ft,Tt,tt.data)):e.texImage2D(i.TEXTURE_2D,0,Ct,tt.width,tt.height,0,ft,Tt,tt.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Nt&&re&&e.texStorage3D(i.TEXTURE_2D_ARRAY,st,Ct,Vt[0].width,Vt[0].height,tt.depth);for(let G=0,j=Vt.length;G<j;G++)if(pt=Vt[G],v.format!==dn)if(ft!==null)if(Nt){if(L)if(v.layerUpdates.size>0){const ut=Cl(pt.width,pt.height,v.format,v.type);for(const ct of v.layerUpdates){const Dt=pt.data.subarray(ct*ut/pt.data.BYTES_PER_ELEMENT,(ct+1)*ut/pt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,G,0,0,ct,pt.width,pt.height,1,ft,Dt)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,G,0,0,0,pt.width,pt.height,tt.depth,ft,pt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,G,Ct,pt.width,pt.height,tt.depth,0,pt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Nt?L&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,G,0,0,0,pt.width,pt.height,tt.depth,ft,Tt,pt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,G,Ct,pt.width,pt.height,tt.depth,0,ft,Tt,pt.data)}else{Nt&&re&&e.texStorage2D(i.TEXTURE_2D,st,Ct,Vt[0].width,Vt[0].height);for(let G=0,j=Vt.length;G<j;G++)pt=Vt[G],v.format!==dn?ft!==null?Nt?L&&e.compressedTexSubImage2D(i.TEXTURE_2D,G,0,0,pt.width,pt.height,ft,pt.data):e.compressedTexImage2D(i.TEXTURE_2D,G,Ct,pt.width,pt.height,0,pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Nt?L&&e.texSubImage2D(i.TEXTURE_2D,G,0,0,pt.width,pt.height,ft,Tt,pt.data):e.texImage2D(i.TEXTURE_2D,G,Ct,pt.width,pt.height,0,ft,Tt,pt.data)}else if(v.isDataArrayTexture)if(Nt){if(re&&e.texStorage3D(i.TEXTURE_2D_ARRAY,st,Ct,tt.width,tt.height,tt.depth),L)if(v.layerUpdates.size>0){const G=Cl(tt.width,tt.height,v.format,v.type);for(const j of v.layerUpdates){const ut=tt.data.subarray(j*G/tt.data.BYTES_PER_ELEMENT,(j+1)*G/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,j,tt.width,tt.height,1,ft,Tt,ut)}v.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,ft,Tt,tt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ct,tt.width,tt.height,tt.depth,0,ft,Tt,tt.data);else if(v.isData3DTexture)Nt?(re&&e.texStorage3D(i.TEXTURE_3D,st,Ct,tt.width,tt.height,tt.depth),L&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,ft,Tt,tt.data)):e.texImage3D(i.TEXTURE_3D,0,Ct,tt.width,tt.height,tt.depth,0,ft,Tt,tt.data);else if(v.isFramebufferTexture){if(re)if(Nt)e.texStorage2D(i.TEXTURE_2D,st,Ct,tt.width,tt.height);else{let G=tt.width,j=tt.height;for(let ut=0;ut<st;ut++)e.texImage2D(i.TEXTURE_2D,ut,Ct,G,j,0,ft,Tt,null),G>>=1,j>>=1}}else if(Vt.length>0){if(Nt&&re){const G=Et(Vt[0]);e.texStorage2D(i.TEXTURE_2D,st,Ct,G.width,G.height)}for(let G=0,j=Vt.length;G<j;G++)pt=Vt[G],Nt?L&&e.texSubImage2D(i.TEXTURE_2D,G,0,0,ft,Tt,pt):e.texImage2D(i.TEXTURE_2D,G,Ct,ft,Tt,pt);v.generateMipmaps=!1}else if(Nt){if(re){const G=Et(tt);e.texStorage2D(i.TEXTURE_2D,st,Ct,G.width,G.height)}L&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ft,Tt,tt)}else e.texImage2D(i.TEXTURE_2D,0,Ct,ft,Tt,tt);m(v)&&f(Y),yt.__version=$.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function nt(T,v,O){if(v.image.length!==6)return;const Y=ne(T,v),Z=v.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+O);const $=n.get(Z);if(Z.version!==$.__version||Y===!0){e.activeTexture(i.TEXTURE0+O);const yt=qt.getPrimaries(qt.workingColorSpace),ot=v.colorSpace===qn?null:qt.getPrimaries(v.colorSpace),dt=v.colorSpace===qn||yt===ot?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,dt);const $t=v.isCompressedTexture||v.image[0].isCompressedTexture,tt=v.image[0]&&v.image[0].isDataTexture,ft=[];for(let j=0;j<6;j++)!$t&&!tt?ft[j]=_(v.image[j],!0,s.maxCubemapSize):ft[j]=tt?v.image[j].image:v.image[j],ft[j]=oe(v,ft[j]);const Tt=ft[0],Ct=r.convert(v.format,v.colorSpace),pt=r.convert(v.type),Vt=b(v.internalFormat,Ct,pt,v.colorSpace),Nt=v.isVideoTexture!==!0,re=$.__version===void 0||Y===!0,L=Z.dataReady;let st=D(v,Tt);Bt(i.TEXTURE_CUBE_MAP,v);let G;if($t){Nt&&re&&e.texStorage2D(i.TEXTURE_CUBE_MAP,st,Vt,Tt.width,Tt.height);for(let j=0;j<6;j++){G=ft[j].mipmaps;for(let ut=0;ut<G.length;ut++){const ct=G[ut];v.format!==dn?Ct!==null?Nt?L&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ut,0,0,ct.width,ct.height,Ct,ct.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ut,Vt,ct.width,ct.height,0,ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Nt?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ut,0,0,ct.width,ct.height,Ct,pt,ct.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ut,Vt,ct.width,ct.height,0,Ct,pt,ct.data)}}}else{if(G=v.mipmaps,Nt&&re){G.length>0&&st++;const j=Et(ft[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,st,Vt,j.width,j.height)}for(let j=0;j<6;j++)if(tt){Nt?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,ft[j].width,ft[j].height,Ct,pt,ft[j].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Vt,ft[j].width,ft[j].height,0,Ct,pt,ft[j].data);for(let ut=0;ut<G.length;ut++){const Dt=G[ut].image[j].image;Nt?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ut+1,0,0,Dt.width,Dt.height,Ct,pt,Dt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ut+1,Vt,Dt.width,Dt.height,0,Ct,pt,Dt.data)}}else{Nt?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Ct,pt,ft[j]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Vt,Ct,pt,ft[j]);for(let ut=0;ut<G.length;ut++){const ct=G[ut];Nt?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ut+1,0,0,Ct,pt,ct.image[j]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ut+1,Vt,Ct,pt,ct.image[j])}}}m(v)&&f(i.TEXTURE_CUBE_MAP),$.__version=Z.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function vt(T,v,O,Y,Z,$){const yt=r.convert(O.format,O.colorSpace),ot=r.convert(O.type),dt=b(O.internalFormat,yt,ot,O.colorSpace),$t=n.get(v),tt=n.get(O);if(tt.__renderTarget=v,!$t.__hasExternalTextures){const ft=Math.max(1,v.width>>$),Tt=Math.max(1,v.height>>$);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?e.texImage3D(Z,$,dt,ft,Tt,v.depth,0,yt,ot,null):e.texImage2D(Z,$,dt,ft,Tt,0,yt,ot,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),Gt(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,Z,tt.__webglTexture,0,Ht(v)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,Z,tt.__webglTexture,$),e.bindFramebuffer(i.FRAMEBUFFER,null)}function at(T,v,O){if(i.bindRenderbuffer(i.RENDERBUFFER,T),v.depthBuffer){const Y=v.depthTexture,Z=Y&&Y.isDepthTexture?Y.type:null,$=y(v.stencilBuffer,Z),yt=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=Ht(v);Gt(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ot,$,v.width,v.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,ot,$,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,$,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,yt,i.RENDERBUFFER,T)}else{const Y=v.textures;for(let Z=0;Z<Y.length;Z++){const $=Y[Z],yt=r.convert($.format,$.colorSpace),ot=r.convert($.type),dt=b($.internalFormat,yt,ot,$.colorSpace),$t=Ht(v);O&&Gt(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,$t,dt,v.width,v.height):Gt(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,$t,dt,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,dt,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function wt(T,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Y=n.get(v.depthTexture);Y.__renderTarget=v,(!Y.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),K(v.depthTexture,0);const Z=Y.__webglTexture,$=Ht(v);if(v.depthTexture.format===Ki)Gt(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0);else if(v.depthTexture.format===rs)Gt(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function Pt(T){const v=n.get(T),O=T.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==T.depthTexture){const Y=T.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),Y){const Z=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,Y.removeEventListener("dispose",Z)};Y.addEventListener("dispose",Z),v.__depthDisposeCallback=Z}v.__boundDepthTexture=Y}if(T.depthTexture&&!v.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");wt(v.__webglFramebuffer,T)}else if(O){v.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[Y]),v.__webglDepthbuffer[Y]===void 0)v.__webglDepthbuffer[Y]=i.createRenderbuffer(),at(v.__webglDepthbuffer[Y],T,!1);else{const Z=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=v.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,$),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,$)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),at(v.__webglDepthbuffer,T,!1);else{const Y=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,Z)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function zt(T,v,O){const Y=n.get(T);v!==void 0&&vt(Y.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&Pt(T)}function de(T){const v=T.texture,O=n.get(T),Y=n.get(v);T.addEventListener("dispose",w);const Z=T.textures,$=T.isWebGLCubeRenderTarget===!0,yt=Z.length>1;if(yt||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=v.version,a.memory.textures++),$){O.__webglFramebuffer=[];for(let ot=0;ot<6;ot++)if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer[ot]=[];for(let dt=0;dt<v.mipmaps.length;dt++)O.__webglFramebuffer[ot][dt]=i.createFramebuffer()}else O.__webglFramebuffer[ot]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer=[];for(let ot=0;ot<v.mipmaps.length;ot++)O.__webglFramebuffer[ot]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(yt)for(let ot=0,dt=Z.length;ot<dt;ot++){const $t=n.get(Z[ot]);$t.__webglTexture===void 0&&($t.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&Gt(T)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let ot=0;ot<Z.length;ot++){const dt=Z[ot];O.__webglColorRenderbuffer[ot]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[ot]);const $t=r.convert(dt.format,dt.colorSpace),tt=r.convert(dt.type),ft=b(dt.internalFormat,$t,tt,dt.colorSpace,T.isXRRenderTarget===!0),Tt=Ht(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Tt,ft,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ot,i.RENDERBUFFER,O.__webglColorRenderbuffer[ot])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),at(O.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if($){e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),Bt(i.TEXTURE_CUBE_MAP,v);for(let ot=0;ot<6;ot++)if(v.mipmaps&&v.mipmaps.length>0)for(let dt=0;dt<v.mipmaps.length;dt++)vt(O.__webglFramebuffer[ot][dt],T,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,dt);else vt(O.__webglFramebuffer[ot],T,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0);m(v)&&f(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(yt){for(let ot=0,dt=Z.length;ot<dt;ot++){const $t=Z[ot],tt=n.get($t);e.bindTexture(i.TEXTURE_2D,tt.__webglTexture),Bt(i.TEXTURE_2D,$t),vt(O.__webglFramebuffer,T,$t,i.COLOR_ATTACHMENT0+ot,i.TEXTURE_2D,0),m($t)&&f(i.TEXTURE_2D)}e.unbindTexture()}else{let ot=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ot=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ot,Y.__webglTexture),Bt(ot,v),v.mipmaps&&v.mipmaps.length>0)for(let dt=0;dt<v.mipmaps.length;dt++)vt(O.__webglFramebuffer[dt],T,v,i.COLOR_ATTACHMENT0,ot,dt);else vt(O.__webglFramebuffer,T,v,i.COLOR_ATTACHMENT0,ot,0);m(v)&&f(ot),e.unbindTexture()}T.depthBuffer&&Pt(T)}function Xt(T){const v=T.textures;for(let O=0,Y=v.length;O<Y;O++){const Z=v[O];if(m(Z)){const $=M(T),yt=n.get(Z).__webglTexture;e.bindTexture($,yt),f($),e.unbindTexture()}}}const ge=[],N=[];function Ke(T){if(T.samples>0){if(Gt(T)===!1){const v=T.textures,O=T.width,Y=T.height;let Z=i.COLOR_BUFFER_BIT;const $=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,yt=n.get(T),ot=v.length>1;if(ot)for(let dt=0;dt<v.length;dt++)e.bindFramebuffer(i.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,yt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,yt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,yt.__webglFramebuffer);for(let dt=0;dt<v.length;dt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),ot){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,yt.__webglColorRenderbuffer[dt]);const $t=n.get(v[dt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,$t,0)}i.blitFramebuffer(0,0,O,Y,0,0,O,Y,Z,i.NEAREST),c===!0&&(ge.length=0,N.length=0,ge.push(i.COLOR_ATTACHMENT0+dt),T.depthBuffer&&T.resolveDepthBuffer===!1&&(ge.push($),N.push($),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,N)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ge))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ot)for(let dt=0;dt<v.length;dt++){e.bindFramebuffer(i.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.RENDERBUFFER,yt.__webglColorRenderbuffer[dt]);const $t=n.get(v[dt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,yt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.TEXTURE_2D,$t,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,yt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){const v=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function Ht(T){return Math.min(s.maxSamples,T.samples)}function Gt(T){const v=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function bt(T){const v=a.render.frame;u.get(T)!==v&&(u.set(T,v),T.update())}function oe(T,v){const O=T.colorSpace,Y=T.format,Z=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||O!==cs&&O!==qn&&(qt.getTransfer(O)===Qt?(Y!==dn||Z!==Nn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),v}function Et(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=z,this.resetTextureUnits=k,this.setTexture2D=K,this.setTexture2DArray=W,this.setTexture3D=J,this.setTextureCube=V,this.rebindTextures=zt,this.setupRenderTarget=de,this.updateRenderTargetMipmap=Xt,this.updateMultisampleRenderTarget=Ke,this.setupDepthRenderbuffer=Pt,this.setupFrameBufferTexture=vt,this.useMultisampledRTT=Gt}function yv(i,t){function e(n,s=qn){let r;const a=qt.getTransfer(s);if(n===Nn)return i.UNSIGNED_BYTE;if(n===ic)return i.UNSIGNED_SHORT_4_4_4_4;if(n===sc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Hu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Bu)return i.BYTE;if(n===zu)return i.SHORT;if(n===Rs)return i.UNSIGNED_SHORT;if(n===nc)return i.INT;if(n===vi)return i.UNSIGNED_INT;if(n===xn)return i.FLOAT;if(n===Ls)return i.HALF_FLOAT;if(n===Gu)return i.ALPHA;if(n===Vu)return i.RGB;if(n===dn)return i.RGBA;if(n===Wu)return i.LUMINANCE;if(n===Xu)return i.LUMINANCE_ALPHA;if(n===Ki)return i.DEPTH_COMPONENT;if(n===rs)return i.DEPTH_STENCIL;if(n===rc)return i.RED;if(n===ac)return i.RED_INTEGER;if(n===$u)return i.RG;if(n===oc)return i.RG_INTEGER;if(n===cc)return i.RGBA_INTEGER;if(n===mr||n===gr||n===_r||n===vr)if(a===Qt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===mr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===gr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===_r)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===mr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===gr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===_r)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===vr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ho||n===fo||n===po||n===mo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ho)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===fo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===po)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===mo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===go||n===_o||n===vo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===go||n===_o)return a===Qt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===vo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===xo||n===yo||n===Mo||n===So||n===Eo||n===bo||n===To||n===wo||n===Ao||n===Co||n===Ro||n===Po||n===Lo||n===Do)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===xo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===yo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Mo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===So)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Eo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===bo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===To)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===wo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ao)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Co)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ro)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Po)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Lo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Do)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===xr||n===Io||n===Uo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===xr)return a===Qt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Io)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Uo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===qu||n===No||n===Fo||n===Oo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===xr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===No)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Fo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Oo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ss?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class Mv extends qe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class yn extends me{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Sv={type:"move"};class Pa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new yn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new yn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new yn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),f=this._getHandJoint(l,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],d=u.position.distanceTo(h.position),p=.02,g=.005;l.inputState.pinching&&d>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Sv)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new yn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Ev=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,bv=`
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

}`;class Tv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Ie,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new ti({vertexShader:Ev,fragmentShader:bv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new xt(new Hr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class wv extends Mi{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,h=null,d=null,p=null,g=null;const _=new Tv,m=e.getContextAttributes();let f=null,M=null;const b=[],y=[],D=new At;let A=null;const w=new qe;w.viewport=new ee;const P=new qe;P.viewport=new ee;const E=[w,P],x=new Mv;let R=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let nt=b[q];return nt===void 0&&(nt=new Pa,b[q]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(q){let nt=b[q];return nt===void 0&&(nt=new Pa,b[q]=nt),nt.getGripSpace()},this.getHand=function(q){let nt=b[q];return nt===void 0&&(nt=new Pa,b[q]=nt),nt.getHandSpace()};function z(q){const nt=y.indexOf(q.inputSource);if(nt===-1)return;const vt=b[nt];vt!==void 0&&(vt.update(q.inputSource,q.frame,l||a),vt.dispatchEvent({type:q.type,data:q.inputSource}))}function X(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",K);for(let q=0;q<b.length;q++){const nt=y[q];nt!==null&&(y[q]=null,b[q].disconnect(nt))}R=null,k=null,_.reset(),t.setRenderTarget(f),p=null,d=null,h=null,s=null,M=null,ne.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(D.width,D.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(f=t.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",X),s.addEventListener("inputsourceschange",K),m.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(D),s.renderState.layers===void 0){const nt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,nt),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),M=new xi(p.framebufferWidth,p.framebufferHeight,{format:dn,type:Nn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let nt=null,vt=null,at=null;m.depth&&(at=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,nt=m.stencil?rs:Ki,vt=m.stencil?ss:vi);const wt={colorFormat:e.RGBA8,depthFormat:at,scaleFactor:r};h=new XRWebGLBinding(s,e),d=h.createProjectionLayer(wt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),M=new xi(d.textureWidth,d.textureHeight,{format:dn,type:Nn,depthTexture:new oh(d.textureWidth,d.textureHeight,vt,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),ne.setContext(s),ne.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function K(q){for(let nt=0;nt<q.removed.length;nt++){const vt=q.removed[nt],at=y.indexOf(vt);at>=0&&(y[at]=null,b[at].disconnect(vt))}for(let nt=0;nt<q.added.length;nt++){const vt=q.added[nt];let at=y.indexOf(vt);if(at===-1){for(let Pt=0;Pt<b.length;Pt++)if(Pt>=y.length){y.push(vt),at=Pt;break}else if(y[Pt]===null){y[Pt]=vt,at=Pt;break}if(at===-1)break}const wt=b[at];wt&&wt.connect(vt)}}const W=new C,J=new C;function V(q,nt,vt){W.setFromMatrixPosition(nt.matrixWorld),J.setFromMatrixPosition(vt.matrixWorld);const at=W.distanceTo(J),wt=nt.projectionMatrix.elements,Pt=vt.projectionMatrix.elements,zt=wt[14]/(wt[10]-1),de=wt[14]/(wt[10]+1),Xt=(wt[9]+1)/wt[5],ge=(wt[9]-1)/wt[5],N=(wt[8]-1)/wt[0],Ke=(Pt[8]+1)/Pt[0],Ht=zt*N,Gt=zt*Ke,bt=at/(-N+Ke),oe=bt*-N;if(nt.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(oe),q.translateZ(bt),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),wt[10]===-1)q.projectionMatrix.copy(nt.projectionMatrix),q.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{const Et=zt+bt,T=de+bt,v=Ht-oe,O=Gt+(at-oe),Y=Xt*de/T*Et,Z=ge*de/T*Et;q.projectionMatrix.makePerspective(v,O,Y,Z,Et,T),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function rt(q,nt){nt===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(nt.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let nt=q.near,vt=q.far;_.texture!==null&&(_.depthNear>0&&(nt=_.depthNear),_.depthFar>0&&(vt=_.depthFar)),x.near=P.near=w.near=nt,x.far=P.far=w.far=vt,(R!==x.near||k!==x.far)&&(s.updateRenderState({depthNear:x.near,depthFar:x.far}),R=x.near,k=x.far),w.layers.mask=q.layers.mask|2,P.layers.mask=q.layers.mask|4,x.layers.mask=w.layers.mask|P.layers.mask;const at=q.parent,wt=x.cameras;rt(x,at);for(let Pt=0;Pt<wt.length;Pt++)rt(wt[Pt],at);wt.length===2?V(x,w,P):x.projectionMatrix.copy(w.projectionMatrix),ht(q,x,at)};function ht(q,nt,vt){vt===null?q.matrix.copy(nt.matrixWorld):(q.matrix.copy(vt.matrixWorld),q.matrix.invert(),q.matrix.multiply(nt.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(nt.projectionMatrix),q.projectionMatrixInverse.copy(nt.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=ko*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(q){c=q,d!==null&&(d.fixedFoveation=q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=q)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(x)};let St=null;function Bt(q,nt){if(u=nt.getViewerPose(l||a),g=nt,u!==null){const vt=u.views;p!==null&&(t.setRenderTargetFramebuffer(M,p.framebuffer),t.setRenderTarget(M));let at=!1;vt.length!==x.cameras.length&&(x.cameras.length=0,at=!0);for(let Pt=0;Pt<vt.length;Pt++){const zt=vt[Pt];let de=null;if(p!==null)de=p.getViewport(zt);else{const ge=h.getViewSubImage(d,zt);de=ge.viewport,Pt===0&&(t.setRenderTargetTextures(M,ge.colorTexture,d.ignoreDepthValues?void 0:ge.depthStencilTexture),t.setRenderTarget(M))}let Xt=E[Pt];Xt===void 0&&(Xt=new qe,Xt.layers.enable(Pt),Xt.viewport=new ee,E[Pt]=Xt),Xt.matrix.fromArray(zt.transform.matrix),Xt.matrix.decompose(Xt.position,Xt.quaternion,Xt.scale),Xt.projectionMatrix.fromArray(zt.projectionMatrix),Xt.projectionMatrixInverse.copy(Xt.projectionMatrix).invert(),Xt.viewport.set(de.x,de.y,de.width,de.height),Pt===0&&(x.matrix.copy(Xt.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),at===!0&&x.cameras.push(Xt)}const wt=s.enabledFeatures;if(wt&&wt.includes("depth-sensing")){const Pt=h.getDepthInformation(vt[0]);Pt&&Pt.isValid&&Pt.texture&&_.init(t,Pt,s.renderState)}}for(let vt=0;vt<b.length;vt++){const at=y[vt],wt=b[vt];at!==null&&wt!==void 0&&wt.update(at,nt,l||a)}St&&St(q,nt),nt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:nt}),g=null}const ne=new rh;ne.setAnimationLoop(Bt),this.setAnimationLoop=function(q){St=q},this.dispose=function(){}}}const ci=new Mn,Av=new se;function Cv(i,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,nh(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,M,b,y){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),h(m,f)):f.isMeshPhongMaterial?(r(m,f),u(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,y)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),_(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?c(m,f,M,b):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Oe&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Oe&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const M=t.get(f),b=M.envMap,y=M.envMapRotation;b&&(m.envMap.value=b,ci.copy(y),ci.x*=-1,ci.y*=-1,ci.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(ci.y*=-1,ci.z*=-1),m.envMapRotation.value.setFromMatrix4(Av.makeRotationFromEuler(ci)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,M,b){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*M,m.scale.value=b*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function h(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,M){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Oe&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const M=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Rv(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,b){const y=b.program;n.uniformBlockBinding(M,y)}function l(M,b){let y=s[M.id];y===void 0&&(g(M),y=u(M),s[M.id]=y,M.addEventListener("dispose",m));const D=b.program;n.updateUBOMapping(M,D);const A=t.render.frame;r[M.id]!==A&&(d(M),r[M.id]=A)}function u(M){const b=h();M.__bindingPointIndex=b;const y=i.createBuffer(),D=M.__size,A=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,D,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,y),y}function h(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){const b=s[M.id],y=M.uniforms,D=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let A=0,w=y.length;A<w;A++){const P=Array.isArray(y[A])?y[A]:[y[A]];for(let E=0,x=P.length;E<x;E++){const R=P[E];if(p(R,A,E,D)===!0){const k=R.__offset,z=Array.isArray(R.value)?R.value:[R.value];let X=0;for(let K=0;K<z.length;K++){const W=z[K],J=_(W);typeof W=="number"||typeof W=="boolean"?(R.__data[0]=W,i.bufferSubData(i.UNIFORM_BUFFER,k+X,R.__data)):W.isMatrix3?(R.__data[0]=W.elements[0],R.__data[1]=W.elements[1],R.__data[2]=W.elements[2],R.__data[3]=0,R.__data[4]=W.elements[3],R.__data[5]=W.elements[4],R.__data[6]=W.elements[5],R.__data[7]=0,R.__data[8]=W.elements[6],R.__data[9]=W.elements[7],R.__data[10]=W.elements[8],R.__data[11]=0):(W.toArray(R.__data,X),X+=J.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,k,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(M,b,y,D){const A=M.value,w=b+"_"+y;if(D[w]===void 0)return typeof A=="number"||typeof A=="boolean"?D[w]=A:D[w]=A.clone(),!0;{const P=D[w];if(typeof A=="number"||typeof A=="boolean"){if(P!==A)return D[w]=A,!0}else if(P.equals(A)===!1)return P.copy(A),!0}return!1}function g(M){const b=M.uniforms;let y=0;const D=16;for(let w=0,P=b.length;w<P;w++){const E=Array.isArray(b[w])?b[w]:[b[w]];for(let x=0,R=E.length;x<R;x++){const k=E[x],z=Array.isArray(k.value)?k.value:[k.value];for(let X=0,K=z.length;X<K;X++){const W=z[X],J=_(W),V=y%D,rt=V%J.boundary,ht=V+rt;y+=rt,ht!==0&&D-ht<J.storage&&(y+=D-ht),k.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=y,y+=J.storage}}}const A=y%D;return A>0&&(y+=D-A),M.__size=y,M.__cache={},this}function _(M){const b={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(b.boundary=4,b.storage=4):M.isVector2?(b.boundary=8,b.storage=8):M.isVector3||M.isColor?(b.boundary=16,b.storage=12):M.isVector4?(b.boundary=16,b.storage=16):M.isMatrix3?(b.boundary=48,b.storage=48):M.isMatrix4?(b.boundary=64,b.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),b}function m(M){const b=M.target;b.removeEventListener("dispose",m);const y=a.indexOf(b.__bindingPointIndex);a.splice(y,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function f(){for(const M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:c,update:l,dispose:f}}class Pv{constructor(t={}){const{canvas:e=vp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,f=null;const M=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=De,this.toneMapping=Jn,this.toneMappingExposure=1;const y=this;let D=!1,A=0,w=0,P=null,E=-1,x=null;const R=new ee,k=new ee;let z=null;const X=new Lt(0);let K=0,W=e.width,J=e.height,V=1,rt=null,ht=null;const St=new ee(0,0,W,J),Bt=new ee(0,0,W,J);let ne=!1;const q=new hc;let nt=!1,vt=!1;const at=new se,wt=new se,Pt=new C,zt=new ee,de={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Xt=!1;function ge(){return P===null?V:1}let N=n;function Ke(S,I){return e.getContext(S,I)}try{const S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ec}`),e.addEventListener("webglcontextlost",j,!1),e.addEventListener("webglcontextrestored",ut,!1),e.addEventListener("webglcontextcreationerror",ct,!1),N===null){const I="webgl2";if(N=Ke(I,S),N===null)throw Ke(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let Ht,Gt,bt,oe,Et,T,v,O,Y,Z,$,yt,ot,dt,$t,tt,ft,Tt,Ct,pt,Vt,Nt,re,L;function st(){Ht=new N0(N),Ht.init(),Nt=new yv(N,Ht),Gt=new R0(N,Ht,t,Nt),bt=new _v(N,Ht),Gt.reverseDepthBuffer&&d&&bt.buffers.depth.setReversed(!0),oe=new k0(N),Et=new nv,T=new xv(N,Ht,bt,Et,Gt,Nt,oe),v=new L0(y),O=new U0(y),Y=new Xp(N),re=new A0(N,Y),Z=new F0(N,Y,oe,re),$=new z0(N,Z,Y,oe),Ct=new B0(N,Gt,T),tt=new P0(Et),yt=new ev(y,v,O,Ht,Gt,re,tt),ot=new Cv(y,Et),dt=new sv,$t=new uv(Ht),Tt=new w0(y,v,O,bt,$,p,c),ft=new mv(y,$,Gt),L=new Rv(N,oe,Gt,bt),pt=new C0(N,Ht,oe),Vt=new O0(N,Ht,oe),oe.programs=yt.programs,y.capabilities=Gt,y.extensions=Ht,y.properties=Et,y.renderLists=dt,y.shadowMap=ft,y.state=bt,y.info=oe}st();const G=new wv(y,N);this.xr=G,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const S=Ht.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Ht.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(S){S!==void 0&&(V=S,this.setSize(W,J,!1))},this.getSize=function(S){return S.set(W,J)},this.setSize=function(S,I,B=!0){if(G.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=S,J=I,e.width=Math.floor(S*V),e.height=Math.floor(I*V),B===!0&&(e.style.width=S+"px",e.style.height=I+"px"),this.setViewport(0,0,S,I)},this.getDrawingBufferSize=function(S){return S.set(W*V,J*V).floor()},this.setDrawingBufferSize=function(S,I,B){W=S,J=I,V=B,e.width=Math.floor(S*B),e.height=Math.floor(I*B),this.setViewport(0,0,S,I)},this.getCurrentViewport=function(S){return S.copy(R)},this.getViewport=function(S){return S.copy(St)},this.setViewport=function(S,I,B,H){S.isVector4?St.set(S.x,S.y,S.z,S.w):St.set(S,I,B,H),bt.viewport(R.copy(St).multiplyScalar(V).round())},this.getScissor=function(S){return S.copy(Bt)},this.setScissor=function(S,I,B,H){S.isVector4?Bt.set(S.x,S.y,S.z,S.w):Bt.set(S,I,B,H),bt.scissor(k.copy(Bt).multiplyScalar(V).round())},this.getScissorTest=function(){return ne},this.setScissorTest=function(S){bt.setScissorTest(ne=S)},this.setOpaqueSort=function(S){rt=S},this.setTransparentSort=function(S){ht=S},this.getClearColor=function(S){return S.copy(Tt.getClearColor())},this.setClearColor=function(){Tt.setClearColor.apply(Tt,arguments)},this.getClearAlpha=function(){return Tt.getClearAlpha()},this.setClearAlpha=function(){Tt.setClearAlpha.apply(Tt,arguments)},this.clear=function(S=!0,I=!0,B=!0){let H=0;if(S){let U=!1;if(P!==null){const et=P.texture.format;U=et===cc||et===oc||et===ac}if(U){const et=P.texture.type,lt=et===Nn||et===vi||et===Rs||et===ss||et===ic||et===sc,mt=Tt.getClearColor(),gt=Tt.getClearAlpha(),Rt=mt.r,It=mt.g,_t=mt.b;lt?(g[0]=Rt,g[1]=It,g[2]=_t,g[3]=gt,N.clearBufferuiv(N.COLOR,0,g)):(_[0]=Rt,_[1]=It,_[2]=_t,_[3]=gt,N.clearBufferiv(N.COLOR,0,_))}else H|=N.COLOR_BUFFER_BIT}I&&(H|=N.DEPTH_BUFFER_BIT),B&&(H|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",j,!1),e.removeEventListener("webglcontextrestored",ut,!1),e.removeEventListener("webglcontextcreationerror",ct,!1),dt.dispose(),$t.dispose(),Et.dispose(),v.dispose(),O.dispose(),$.dispose(),re.dispose(),L.dispose(),yt.dispose(),G.dispose(),G.removeEventListener("sessionstart",_c),G.removeEventListener("sessionend",vc),ni.stop()};function j(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),D=!0}function ut(){console.log("THREE.WebGLRenderer: Context Restored."),D=!1;const S=oe.autoReset,I=ft.enabled,B=ft.autoUpdate,H=ft.needsUpdate,U=ft.type;st(),oe.autoReset=S,ft.enabled=I,ft.autoUpdate=B,ft.needsUpdate=H,ft.type=U}function ct(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Dt(S){const I=S.target;I.removeEventListener("dispose",Dt),pe(I)}function pe(S){Re(S),Et.remove(S)}function Re(S){const I=Et.get(S).programs;I!==void 0&&(I.forEach(function(B){yt.releaseProgram(B)}),S.isShaderMaterial&&yt.releaseShaderCache(S))}this.renderBufferDirect=function(S,I,B,H,U,et){I===null&&(I=de);const lt=U.isMesh&&U.matrixWorld.determinant()<0,mt=wh(S,I,B,H,U);bt.setMaterial(H,lt);let gt=B.index,Rt=1;if(H.wireframe===!0){if(gt=Z.getWireframeAttribute(B),gt===void 0)return;Rt=2}const It=B.drawRange,_t=B.attributes.position;let Yt=It.start*Rt,ae=(It.start+It.count)*Rt;et!==null&&(Yt=Math.max(Yt,et.start*Rt),ae=Math.min(ae,(et.start+et.count)*Rt)),gt!==null?(Yt=Math.max(Yt,0),ae=Math.min(ae,gt.count)):_t!=null&&(Yt=Math.max(Yt,0),ae=Math.min(ae,_t.count));const ce=ae-Yt;if(ce<0||ce===1/0)return;re.setup(U,H,mt,B,gt);let ke,Kt=pt;if(gt!==null&&(ke=Y.get(gt),Kt=Vt,Kt.setIndex(ke)),U.isMesh)H.wireframe===!0?(bt.setLineWidth(H.wireframeLinewidth*ge()),Kt.setMode(N.LINES)):Kt.setMode(N.TRIANGLES);else if(U.isLine){let Mt=H.linewidth;Mt===void 0&&(Mt=1),bt.setLineWidth(Mt*ge()),U.isLineSegments?Kt.setMode(N.LINES):U.isLineLoop?Kt.setMode(N.LINE_LOOP):Kt.setMode(N.LINE_STRIP)}else U.isPoints?Kt.setMode(N.POINTS):U.isSprite&&Kt.setMode(N.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)Kt.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(Ht.get("WEBGL_multi_draw"))Kt.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const Mt=U._multiDrawStarts,En=U._multiDrawCounts,Zt=U._multiDrawCount,rn=gt?Y.get(gt).bytesPerElement:1,Ei=Et.get(H).currentProgram.getUniforms();for(let Ve=0;Ve<Zt;Ve++)Ei.setValue(N,"_gl_DrawID",Ve),Kt.render(Mt[Ve]/rn,En[Ve])}else if(U.isInstancedMesh)Kt.renderInstances(Yt,ce,U.count);else if(B.isInstancedBufferGeometry){const Mt=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,En=Math.min(B.instanceCount,Mt);Kt.renderInstances(Yt,ce,En)}else Kt.render(Yt,ce)};function Jt(S,I,B){S.transparent===!0&&S.side===Ln&&S.forceSinglePass===!1?(S.side=Oe,S.needsUpdate=!0,Fs(S,I,B),S.side=Qn,S.needsUpdate=!0,Fs(S,I,B),S.side=Ln):Fs(S,I,B)}this.compile=function(S,I,B=null){B===null&&(B=S),f=$t.get(B),f.init(I),b.push(f),B.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(f.pushLight(U),U.castShadow&&f.pushShadow(U))}),S!==B&&S.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(f.pushLight(U),U.castShadow&&f.pushShadow(U))}),f.setupLights();const H=new Set;return S.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const et=U.material;if(et)if(Array.isArray(et))for(let lt=0;lt<et.length;lt++){const mt=et[lt];Jt(mt,B,U),H.add(mt)}else Jt(et,B,U),H.add(et)}),b.pop(),f=null,H},this.compileAsync=function(S,I,B=null){const H=this.compile(S,I,B);return new Promise(U=>{function et(){if(H.forEach(function(lt){Et.get(lt).currentProgram.isReady()&&H.delete(lt)}),H.size===0){U(S);return}setTimeout(et,10)}Ht.get("KHR_parallel_shader_compile")!==null?et():setTimeout(et,10)})};let sn=null;function Sn(S){sn&&sn(S)}function _c(){ni.stop()}function vc(){ni.start()}const ni=new rh;ni.setAnimationLoop(Sn),typeof self<"u"&&ni.setContext(self),this.setAnimationLoop=function(S){sn=S,G.setAnimationLoop(S),S===null?ni.stop():ni.start()},G.addEventListener("sessionstart",_c),G.addEventListener("sessionend",vc),this.render=function(S,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),G.enabled===!0&&G.isPresenting===!0&&(G.cameraAutoUpdate===!0&&G.updateCamera(I),I=G.getCamera()),S.isScene===!0&&S.onBeforeRender(y,S,I,P),f=$t.get(S,b.length),f.init(I),b.push(f),wt.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),q.setFromProjectionMatrix(wt),vt=this.localClippingEnabled,nt=tt.init(this.clippingPlanes,vt),m=dt.get(S,M.length),m.init(),M.push(m),G.enabled===!0&&G.isPresenting===!0){const et=y.xr.getDepthSensingMesh();et!==null&&Kr(et,I,-1/0,y.sortObjects)}Kr(S,I,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(rt,ht),Xt=G.enabled===!1||G.isPresenting===!1||G.hasDepthSensing()===!1,Xt&&Tt.addToRenderList(m,S),this.info.render.frame++,nt===!0&&tt.beginShadows();const B=f.state.shadowsArray;ft.render(B,S,I),nt===!0&&tt.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=m.opaque,U=m.transmissive;if(f.setupLights(),I.isArrayCamera){const et=I.cameras;if(U.length>0)for(let lt=0,mt=et.length;lt<mt;lt++){const gt=et[lt];yc(H,U,S,gt)}Xt&&Tt.render(S);for(let lt=0,mt=et.length;lt<mt;lt++){const gt=et[lt];xc(m,S,gt,gt.viewport)}}else U.length>0&&yc(H,U,S,I),Xt&&Tt.render(S),xc(m,S,I);P!==null&&(T.updateMultisampleRenderTarget(P),T.updateRenderTargetMipmap(P)),S.isScene===!0&&S.onAfterRender(y,S,I),re.resetDefaultState(),E=-1,x=null,b.pop(),b.length>0?(f=b[b.length-1],nt===!0&&tt.setGlobalState(y.clippingPlanes,f.state.camera)):f=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function Kr(S,I,B,H){if(S.visible===!1)return;if(S.layers.test(I.layers)){if(S.isGroup)B=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(I);else if(S.isLight)f.pushLight(S),S.castShadow&&f.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||q.intersectsSprite(S)){H&&zt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(wt);const lt=$.update(S),mt=S.material;mt.visible&&m.push(S,lt,mt,B,zt.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||q.intersectsObject(S))){const lt=$.update(S),mt=S.material;if(H&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),zt.copy(S.boundingSphere.center)):(lt.boundingSphere===null&&lt.computeBoundingSphere(),zt.copy(lt.boundingSphere.center)),zt.applyMatrix4(S.matrixWorld).applyMatrix4(wt)),Array.isArray(mt)){const gt=lt.groups;for(let Rt=0,It=gt.length;Rt<It;Rt++){const _t=gt[Rt],Yt=mt[_t.materialIndex];Yt&&Yt.visible&&m.push(S,lt,Yt,B,zt.z,_t)}}else mt.visible&&m.push(S,lt,mt,B,zt.z,null)}}const et=S.children;for(let lt=0,mt=et.length;lt<mt;lt++)Kr(et[lt],I,B,H)}function xc(S,I,B,H){const U=S.opaque,et=S.transmissive,lt=S.transparent;f.setupLightsView(B),nt===!0&&tt.setGlobalState(y.clippingPlanes,B),H&&bt.viewport(R.copy(H)),U.length>0&&Ns(U,I,B),et.length>0&&Ns(et,I,B),lt.length>0&&Ns(lt,I,B),bt.buffers.depth.setTest(!0),bt.buffers.depth.setMask(!0),bt.buffers.color.setMask(!0),bt.setPolygonOffset(!1)}function yc(S,I,B,H){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[H.id]===void 0&&(f.state.transmissionRenderTarget[H.id]=new xi(1,1,{generateMipmaps:!0,type:Ht.has("EXT_color_buffer_half_float")||Ht.has("EXT_color_buffer_float")?Ls:Nn,minFilter:mi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qt.workingColorSpace}));const et=f.state.transmissionRenderTarget[H.id],lt=H.viewport||R;et.setSize(lt.z,lt.w);const mt=y.getRenderTarget();y.setRenderTarget(et),y.getClearColor(X),K=y.getClearAlpha(),K<1&&y.setClearColor(16777215,.5),y.clear(),Xt&&Tt.render(B);const gt=y.toneMapping;y.toneMapping=Jn;const Rt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),f.setupLightsView(H),nt===!0&&tt.setGlobalState(y.clippingPlanes,H),Ns(S,B,H),T.updateMultisampleRenderTarget(et),T.updateRenderTargetMipmap(et),Ht.has("WEBGL_multisampled_render_to_texture")===!1){let It=!1;for(let _t=0,Yt=I.length;_t<Yt;_t++){const ae=I[_t],ce=ae.object,ke=ae.geometry,Kt=ae.material,Mt=ae.group;if(Kt.side===Ln&&ce.layers.test(H.layers)){const En=Kt.side;Kt.side=Oe,Kt.needsUpdate=!0,Mc(ce,B,H,ke,Kt,Mt),Kt.side=En,Kt.needsUpdate=!0,It=!0}}It===!0&&(T.updateMultisampleRenderTarget(et),T.updateRenderTargetMipmap(et))}y.setRenderTarget(mt),y.setClearColor(X,K),Rt!==void 0&&(H.viewport=Rt),y.toneMapping=gt}function Ns(S,I,B){const H=I.isScene===!0?I.overrideMaterial:null;for(let U=0,et=S.length;U<et;U++){const lt=S[U],mt=lt.object,gt=lt.geometry,Rt=H===null?lt.material:H,It=lt.group;mt.layers.test(B.layers)&&Mc(mt,I,B,gt,Rt,It)}}function Mc(S,I,B,H,U,et){S.onBeforeRender(y,I,B,H,U,et),S.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),U.onBeforeRender(y,I,B,H,S,et),U.transparent===!0&&U.side===Ln&&U.forceSinglePass===!1?(U.side=Oe,U.needsUpdate=!0,y.renderBufferDirect(B,I,H,U,S,et),U.side=Qn,U.needsUpdate=!0,y.renderBufferDirect(B,I,H,U,S,et),U.side=Ln):y.renderBufferDirect(B,I,H,U,S,et),S.onAfterRender(y,I,B,H,U,et)}function Fs(S,I,B){I.isScene!==!0&&(I=de);const H=Et.get(S),U=f.state.lights,et=f.state.shadowsArray,lt=U.state.version,mt=yt.getParameters(S,U.state,et,I,B),gt=yt.getProgramCacheKey(mt);let Rt=H.programs;H.environment=S.isMeshStandardMaterial?I.environment:null,H.fog=I.fog,H.envMap=(S.isMeshStandardMaterial?O:v).get(S.envMap||H.environment),H.envMapRotation=H.environment!==null&&S.envMap===null?I.environmentRotation:S.envMapRotation,Rt===void 0&&(S.addEventListener("dispose",Dt),Rt=new Map,H.programs=Rt);let It=Rt.get(gt);if(It!==void 0){if(H.currentProgram===It&&H.lightsStateVersion===lt)return Ec(S,mt),It}else mt.uniforms=yt.getUniforms(S),S.onBeforeCompile(mt,y),It=yt.acquireProgram(mt,gt),Rt.set(gt,It),H.uniforms=mt.uniforms;const _t=H.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(_t.clippingPlanes=tt.uniform),Ec(S,mt),H.needsLights=Ch(S),H.lightsStateVersion=lt,H.needsLights&&(_t.ambientLightColor.value=U.state.ambient,_t.lightProbe.value=U.state.probe,_t.directionalLights.value=U.state.directional,_t.directionalLightShadows.value=U.state.directionalShadow,_t.spotLights.value=U.state.spot,_t.spotLightShadows.value=U.state.spotShadow,_t.rectAreaLights.value=U.state.rectArea,_t.ltc_1.value=U.state.rectAreaLTC1,_t.ltc_2.value=U.state.rectAreaLTC2,_t.pointLights.value=U.state.point,_t.pointLightShadows.value=U.state.pointShadow,_t.hemisphereLights.value=U.state.hemi,_t.directionalShadowMap.value=U.state.directionalShadowMap,_t.directionalShadowMatrix.value=U.state.directionalShadowMatrix,_t.spotShadowMap.value=U.state.spotShadowMap,_t.spotLightMatrix.value=U.state.spotLightMatrix,_t.spotLightMap.value=U.state.spotLightMap,_t.pointShadowMap.value=U.state.pointShadowMap,_t.pointShadowMatrix.value=U.state.pointShadowMatrix),H.currentProgram=It,H.uniformsList=null,It}function Sc(S){if(S.uniformsList===null){const I=S.currentProgram.getUniforms();S.uniformsList=Mr.seqWithValue(I.seq,S.uniforms)}return S.uniformsList}function Ec(S,I){const B=Et.get(S);B.outputColorSpace=I.outputColorSpace,B.batching=I.batching,B.batchingColor=I.batchingColor,B.instancing=I.instancing,B.instancingColor=I.instancingColor,B.instancingMorph=I.instancingMorph,B.skinning=I.skinning,B.morphTargets=I.morphTargets,B.morphNormals=I.morphNormals,B.morphColors=I.morphColors,B.morphTargetsCount=I.morphTargetsCount,B.numClippingPlanes=I.numClippingPlanes,B.numIntersection=I.numClipIntersection,B.vertexAlphas=I.vertexAlphas,B.vertexTangents=I.vertexTangents,B.toneMapping=I.toneMapping}function wh(S,I,B,H,U){I.isScene!==!0&&(I=de),T.resetTextureUnits();const et=I.fog,lt=H.isMeshStandardMaterial?I.environment:null,mt=P===null?y.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:cs,gt=(H.isMeshStandardMaterial?O:v).get(H.envMap||lt),Rt=H.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,It=!!B.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),_t=!!B.morphAttributes.position,Yt=!!B.morphAttributes.normal,ae=!!B.morphAttributes.color;let ce=Jn;H.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(ce=y.toneMapping);const ke=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Kt=ke!==void 0?ke.length:0,Mt=Et.get(H),En=f.state.lights;if(nt===!0&&(vt===!0||S!==x)){const Ze=S===x&&H.id===E;tt.setState(H,S,Ze)}let Zt=!1;H.version===Mt.__version?(Mt.needsLights&&Mt.lightsStateVersion!==En.state.version||Mt.outputColorSpace!==mt||U.isBatchedMesh&&Mt.batching===!1||!U.isBatchedMesh&&Mt.batching===!0||U.isBatchedMesh&&Mt.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Mt.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Mt.instancing===!1||!U.isInstancedMesh&&Mt.instancing===!0||U.isSkinnedMesh&&Mt.skinning===!1||!U.isSkinnedMesh&&Mt.skinning===!0||U.isInstancedMesh&&Mt.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Mt.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Mt.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Mt.instancingMorph===!1&&U.morphTexture!==null||Mt.envMap!==gt||H.fog===!0&&Mt.fog!==et||Mt.numClippingPlanes!==void 0&&(Mt.numClippingPlanes!==tt.numPlanes||Mt.numIntersection!==tt.numIntersection)||Mt.vertexAlphas!==Rt||Mt.vertexTangents!==It||Mt.morphTargets!==_t||Mt.morphNormals!==Yt||Mt.morphColors!==ae||Mt.toneMapping!==ce||Mt.morphTargetsCount!==Kt)&&(Zt=!0):(Zt=!0,Mt.__version=H.version);let rn=Mt.currentProgram;Zt===!0&&(rn=Fs(H,I,U));let Ei=!1,Ve=!1,hs=!1;const le=rn.getUniforms(),pn=Mt.uniforms;if(bt.useProgram(rn.program)&&(Ei=!0,Ve=!0,hs=!0),H.id!==E&&(E=H.id,Ve=!0),Ei||x!==S){bt.buffers.depth.getReversed()?(at.copy(S.projectionMatrix),yp(at),Mp(at),le.setValue(N,"projectionMatrix",at)):le.setValue(N,"projectionMatrix",S.projectionMatrix),le.setValue(N,"viewMatrix",S.matrixWorldInverse);const On=le.map.cameraPosition;On!==void 0&&On.setValue(N,Pt.setFromMatrixPosition(S.matrixWorld)),Gt.logarithmicDepthBuffer&&le.setValue(N,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&le.setValue(N,"isOrthographic",S.isOrthographicCamera===!0),x!==S&&(x=S,Ve=!0,hs=!0)}if(U.isSkinnedMesh){le.setOptional(N,U,"bindMatrix"),le.setOptional(N,U,"bindMatrixInverse");const Ze=U.skeleton;Ze&&(Ze.boneTexture===null&&Ze.computeBoneTexture(),le.setValue(N,"boneTexture",Ze.boneTexture,T))}U.isBatchedMesh&&(le.setOptional(N,U,"batchingTexture"),le.setValue(N,"batchingTexture",U._matricesTexture,T),le.setOptional(N,U,"batchingIdTexture"),le.setValue(N,"batchingIdTexture",U._indirectTexture,T),le.setOptional(N,U,"batchingColorTexture"),U._colorsTexture!==null&&le.setValue(N,"batchingColorTexture",U._colorsTexture,T));const ds=B.morphAttributes;if((ds.position!==void 0||ds.normal!==void 0||ds.color!==void 0)&&Ct.update(U,B,rn),(Ve||Mt.receiveShadow!==U.receiveShadow)&&(Mt.receiveShadow=U.receiveShadow,le.setValue(N,"receiveShadow",U.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(pn.envMap.value=gt,pn.flipEnvMap.value=gt.isCubeTexture&&gt.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&I.environment!==null&&(pn.envMapIntensity.value=I.environmentIntensity),Ve&&(le.setValue(N,"toneMappingExposure",y.toneMappingExposure),Mt.needsLights&&Ah(pn,hs),et&&H.fog===!0&&ot.refreshFogUniforms(pn,et),ot.refreshMaterialUniforms(pn,H,V,J,f.state.transmissionRenderTarget[S.id]),Mr.upload(N,Sc(Mt),pn,T)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Mr.upload(N,Sc(Mt),pn,T),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&le.setValue(N,"center",U.center),le.setValue(N,"modelViewMatrix",U.modelViewMatrix),le.setValue(N,"normalMatrix",U.normalMatrix),le.setValue(N,"modelMatrix",U.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const Ze=H.uniformsGroups;for(let On=0,kn=Ze.length;On<kn;On++){const bc=Ze[On];L.update(bc,rn),L.bind(bc,rn)}}return rn}function Ah(S,I){S.ambientLightColor.needsUpdate=I,S.lightProbe.needsUpdate=I,S.directionalLights.needsUpdate=I,S.directionalLightShadows.needsUpdate=I,S.pointLights.needsUpdate=I,S.pointLightShadows.needsUpdate=I,S.spotLights.needsUpdate=I,S.spotLightShadows.needsUpdate=I,S.rectAreaLights.needsUpdate=I,S.hemisphereLights.needsUpdate=I}function Ch(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(S,I,B){Et.get(S.texture).__webglTexture=I,Et.get(S.depthTexture).__webglTexture=B;const H=Et.get(S);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=B===void 0,H.__autoAllocateDepthBuffer||Ht.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,I){const B=Et.get(S);B.__webglFramebuffer=I,B.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(S,I=0,B=0){P=S,A=I,w=B;let H=!0,U=null,et=!1,lt=!1;if(S){const gt=Et.get(S);if(gt.__useDefaultFramebuffer!==void 0)bt.bindFramebuffer(N.FRAMEBUFFER,null),H=!1;else if(gt.__webglFramebuffer===void 0)T.setupRenderTarget(S);else if(gt.__hasExternalTextures)T.rebindTextures(S,Et.get(S.texture).__webglTexture,Et.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const _t=S.depthTexture;if(gt.__boundDepthTexture!==_t){if(_t!==null&&Et.has(_t)&&(S.width!==_t.image.width||S.height!==_t.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(S)}}const Rt=S.texture;(Rt.isData3DTexture||Rt.isDataArrayTexture||Rt.isCompressedArrayTexture)&&(lt=!0);const It=Et.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(It[I])?U=It[I][B]:U=It[I],et=!0):S.samples>0&&T.useMultisampledRTT(S)===!1?U=Et.get(S).__webglMultisampledFramebuffer:Array.isArray(It)?U=It[B]:U=It,R.copy(S.viewport),k.copy(S.scissor),z=S.scissorTest}else R.copy(St).multiplyScalar(V).floor(),k.copy(Bt).multiplyScalar(V).floor(),z=ne;if(bt.bindFramebuffer(N.FRAMEBUFFER,U)&&H&&bt.drawBuffers(S,U),bt.viewport(R),bt.scissor(k),bt.setScissorTest(z),et){const gt=Et.get(S.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+I,gt.__webglTexture,B)}else if(lt){const gt=Et.get(S.texture),Rt=I||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,gt.__webglTexture,B||0,Rt)}E=-1},this.readRenderTargetPixels=function(S,I,B,H,U,et,lt){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let mt=Et.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&lt!==void 0&&(mt=mt[lt]),mt){bt.bindFramebuffer(N.FRAMEBUFFER,mt);try{const gt=S.texture,Rt=gt.format,It=gt.type;if(!Gt.textureFormatReadable(Rt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Gt.textureTypeReadable(It)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=S.width-H&&B>=0&&B<=S.height-U&&N.readPixels(I,B,H,U,Nt.convert(Rt),Nt.convert(It),et)}finally{const gt=P!==null?Et.get(P).__webglFramebuffer:null;bt.bindFramebuffer(N.FRAMEBUFFER,gt)}}},this.readRenderTargetPixelsAsync=async function(S,I,B,H,U,et,lt){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let mt=Et.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&lt!==void 0&&(mt=mt[lt]),mt){const gt=S.texture,Rt=gt.format,It=gt.type;if(!Gt.textureFormatReadable(Rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Gt.textureTypeReadable(It))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(I>=0&&I<=S.width-H&&B>=0&&B<=S.height-U){bt.bindFramebuffer(N.FRAMEBUFFER,mt);const _t=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,_t),N.bufferData(N.PIXEL_PACK_BUFFER,et.byteLength,N.STREAM_READ),N.readPixels(I,B,H,U,Nt.convert(Rt),Nt.convert(It),0);const Yt=P!==null?Et.get(P).__webglFramebuffer:null;bt.bindFramebuffer(N.FRAMEBUFFER,Yt);const ae=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await xp(N,ae,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,_t),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,et),N.deleteBuffer(_t),N.deleteSync(ae),et}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,I=null,B=0){S.isTexture!==!0&&(Ts("WebGLRenderer: copyFramebufferToTexture function signature has changed."),I=arguments[0]||null,S=arguments[1]);const H=Math.pow(2,-B),U=Math.floor(S.image.width*H),et=Math.floor(S.image.height*H),lt=I!==null?I.x:0,mt=I!==null?I.y:0;T.setTexture2D(S,0),N.copyTexSubImage2D(N.TEXTURE_2D,B,0,0,lt,mt,U,et),bt.unbindTexture()},this.copyTextureToTexture=function(S,I,B=null,H=null,U=0){S.isTexture!==!0&&(Ts("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,S=arguments[1],I=arguments[2],U=arguments[3]||0,B=null);let et,lt,mt,gt,Rt,It,_t,Yt,ae;const ce=S.isCompressedTexture?S.mipmaps[U]:S.image;B!==null?(et=B.max.x-B.min.x,lt=B.max.y-B.min.y,mt=B.isBox3?B.max.z-B.min.z:1,gt=B.min.x,Rt=B.min.y,It=B.isBox3?B.min.z:0):(et=ce.width,lt=ce.height,mt=ce.depth||1,gt=0,Rt=0,It=0),H!==null?(_t=H.x,Yt=H.y,ae=H.z):(_t=0,Yt=0,ae=0);const ke=Nt.convert(I.format),Kt=Nt.convert(I.type);let Mt;I.isData3DTexture?(T.setTexture3D(I,0),Mt=N.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(T.setTexture2DArray(I,0),Mt=N.TEXTURE_2D_ARRAY):(T.setTexture2D(I,0),Mt=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,I.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,I.unpackAlignment);const En=N.getParameter(N.UNPACK_ROW_LENGTH),Zt=N.getParameter(N.UNPACK_IMAGE_HEIGHT),rn=N.getParameter(N.UNPACK_SKIP_PIXELS),Ei=N.getParameter(N.UNPACK_SKIP_ROWS),Ve=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,ce.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ce.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,gt),N.pixelStorei(N.UNPACK_SKIP_ROWS,Rt),N.pixelStorei(N.UNPACK_SKIP_IMAGES,It);const hs=S.isDataArrayTexture||S.isData3DTexture,le=I.isDataArrayTexture||I.isData3DTexture;if(S.isRenderTargetTexture||S.isDepthTexture){const pn=Et.get(S),ds=Et.get(I),Ze=Et.get(pn.__renderTarget),On=Et.get(ds.__renderTarget);bt.bindFramebuffer(N.READ_FRAMEBUFFER,Ze.__webglFramebuffer),bt.bindFramebuffer(N.DRAW_FRAMEBUFFER,On.__webglFramebuffer);for(let kn=0;kn<mt;kn++)hs&&N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Et.get(S).__webglTexture,U,It+kn),S.isDepthTexture?(le&&N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Et.get(I).__webglTexture,U,ae+kn),N.blitFramebuffer(gt,Rt,et,lt,_t,Yt,et,lt,N.DEPTH_BUFFER_BIT,N.NEAREST)):le?N.copyTexSubImage3D(Mt,U,_t,Yt,ae+kn,gt,Rt,et,lt):N.copyTexSubImage2D(Mt,U,_t,Yt,ae+kn,gt,Rt,et,lt);bt.bindFramebuffer(N.READ_FRAMEBUFFER,null),bt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else le?S.isDataTexture||S.isData3DTexture?N.texSubImage3D(Mt,U,_t,Yt,ae,et,lt,mt,ke,Kt,ce.data):I.isCompressedArrayTexture?N.compressedTexSubImage3D(Mt,U,_t,Yt,ae,et,lt,mt,ke,ce.data):N.texSubImage3D(Mt,U,_t,Yt,ae,et,lt,mt,ke,Kt,ce):S.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,U,_t,Yt,et,lt,ke,Kt,ce.data):S.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,U,_t,Yt,ce.width,ce.height,ke,ce.data):N.texSubImage2D(N.TEXTURE_2D,U,_t,Yt,et,lt,ke,Kt,ce);N.pixelStorei(N.UNPACK_ROW_LENGTH,En),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Zt),N.pixelStorei(N.UNPACK_SKIP_PIXELS,rn),N.pixelStorei(N.UNPACK_SKIP_ROWS,Ei),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ve),U===0&&I.generateMipmaps&&N.generateMipmap(Mt),bt.unbindTexture()},this.copyTextureToTexture3D=function(S,I,B=null,H=null,U=0){return S.isTexture!==!0&&(Ts("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,H=arguments[1]||null,S=arguments[2],I=arguments[3],U=arguments[4]||0),Ts('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,I,B,H,U)},this.initRenderTarget=function(S){Et.get(S).__webglFramebuffer===void 0&&T.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?T.setTextureCube(S,0):S.isData3DTexture?T.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?T.setTexture2DArray(S,0):T.setTexture2D(S,0),bt.unbindTexture()},this.resetState=function(){A=0,w=0,P=null,bt.reset(),re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return In}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=qt._getUnpackColorSpace()}}class fc{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Lt(t),this.near=e,this.far=n}clone(){return new fc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class La extends me{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Mn,this.environmentIntensity=1,this.environmentRotation=new Mn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Lv extends Ie{constructor(t=null,e=1,n=1,s,r,a,o,c,l=je,u=je,h,d){super(null,a,o,c,l,u,s,r,h,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Rl extends en{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const ki=new se,Pl=new se,sr=[],Ll=new Si,Dv=new se,ys=new xt,Ms=new Is;class Vr extends xt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Rl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Dv)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Si),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ki),Ll.copy(t.boundingBox).applyMatrix4(ki),this.boundingBox.union(Ll)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Is),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ki),Ms.copy(t.boundingSphere).applyMatrix4(ki),this.boundingSphere.union(Ms)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(ys.geometry=this.geometry,ys.material=this.material,ys.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ms.copy(this.boundingSphere),Ms.applyMatrix4(n),t.ray.intersectsSphere(Ms)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ki),Pl.multiplyMatrices(n,ki),ys.matrixWorld=Pl,ys.raycast(t,sr);for(let a=0,o=sr.length;a<o;a++){const c=sr[a];c.instanceId=r,c.object=this,e.push(c)}sr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Rl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Lv(new Float32Array(s*this.count),s,this.count,rc,xn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*t;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Wr extends Ie{constructor(t,e,n,s,r,a,o,c,l){super(t,e,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Se extends Ce{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],h=[],d=[],p=[];let g=0;const _=[],m=n/2;let f=0;M(),a===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(u),this.setAttribute("position",new Ee(h,3)),this.setAttribute("normal",new Ee(d,3)),this.setAttribute("uv",new Ee(p,2));function M(){const y=new C,D=new C;let A=0;const w=(e-t)/n;for(let P=0;P<=r;P++){const E=[],x=P/r,R=x*(e-t)+t;for(let k=0;k<=s;k++){const z=k/s,X=z*c+o,K=Math.sin(X),W=Math.cos(X);D.x=R*K,D.y=-x*n+m,D.z=R*W,h.push(D.x,D.y,D.z),y.set(K,w,W).normalize(),d.push(y.x,y.y,y.z),p.push(z,1-x),E.push(g++)}_.push(E)}for(let P=0;P<s;P++)for(let E=0;E<r;E++){const x=_[E][P],R=_[E+1][P],k=_[E+1][P+1],z=_[E][P+1];(t>0||E!==0)&&(u.push(x,R,z),A+=3),(e>0||E!==r-1)&&(u.push(R,k,z),A+=3)}l.addGroup(f,A,0),f+=A}function b(y){const D=g,A=new At,w=new C;let P=0;const E=y===!0?t:e,x=y===!0?1:-1;for(let k=1;k<=s;k++)h.push(0,m*x,0),d.push(0,x,0),p.push(.5,.5),g++;const R=g;for(let k=0;k<=s;k++){const X=k/s*c+o,K=Math.cos(X),W=Math.sin(X);w.x=E*W,w.y=m*x,w.z=E*K,h.push(w.x,w.y,w.z),d.push(0,x,0),A.x=K*.5+.5,A.y=W*.5*x+.5,p.push(A.x,A.y),g++}for(let k=0;k<s;k++){const z=D+k,X=R+k;y===!0?u.push(X,X+1,z):u.push(X+1,X,z),P+=3}l.addGroup(f,P,y===!0?1:2),f+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Se(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class us extends Se{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new us(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Xr extends Ce{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],a=[];o(s),l(n),u(),this.setAttribute("position",new Ee(r,3)),this.setAttribute("normal",new Ee(r.slice(),3)),this.setAttribute("uv",new Ee(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(M){const b=new C,y=new C,D=new C;for(let A=0;A<e.length;A+=3)p(e[A+0],b),p(e[A+1],y),p(e[A+2],D),c(b,y,D,M)}function c(M,b,y,D){const A=D+1,w=[];for(let P=0;P<=A;P++){w[P]=[];const E=M.clone().lerp(y,P/A),x=b.clone().lerp(y,P/A),R=A-P;for(let k=0;k<=R;k++)k===0&&P===A?w[P][k]=E:w[P][k]=E.clone().lerp(x,k/R)}for(let P=0;P<A;P++)for(let E=0;E<2*(A-P)-1;E++){const x=Math.floor(E/2);E%2===0?(d(w[P][x+1]),d(w[P+1][x]),d(w[P][x])):(d(w[P][x+1]),d(w[P+1][x+1]),d(w[P+1][x]))}}function l(M){const b=new C;for(let y=0;y<r.length;y+=3)b.x=r[y+0],b.y=r[y+1],b.z=r[y+2],b.normalize().multiplyScalar(M),r[y+0]=b.x,r[y+1]=b.y,r[y+2]=b.z}function u(){const M=new C;for(let b=0;b<r.length;b+=3){M.x=r[b+0],M.y=r[b+1],M.z=r[b+2];const y=m(M)/2/Math.PI+.5,D=f(M)/Math.PI+.5;a.push(y,1-D)}g(),h()}function h(){for(let M=0;M<a.length;M+=6){const b=a[M+0],y=a[M+2],D=a[M+4],A=Math.max(b,y,D),w=Math.min(b,y,D);A>.9&&w<.1&&(b<.2&&(a[M+0]+=1),y<.2&&(a[M+2]+=1),D<.2&&(a[M+4]+=1))}}function d(M){r.push(M.x,M.y,M.z)}function p(M,b){const y=M*3;b.x=t[y+0],b.y=t[y+1],b.z=t[y+2]}function g(){const M=new C,b=new C,y=new C,D=new C,A=new At,w=new At,P=new At;for(let E=0,x=0;E<r.length;E+=9,x+=6){M.set(r[E+0],r[E+1],r[E+2]),b.set(r[E+3],r[E+4],r[E+5]),y.set(r[E+6],r[E+7],r[E+8]),A.set(a[x+0],a[x+1]),w.set(a[x+2],a[x+3]),P.set(a[x+4],a[x+5]),D.copy(M).add(b).add(y).divideScalar(3);const R=m(D);_(A,x+0,M,R),_(w,x+2,b,R),_(P,x+4,y,R)}}function _(M,b,y,D){D<0&&M.x===1&&(a[b]=M.x-1),y.x===0&&y.z===0&&(a[b]=D/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function f(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xr(t.vertices,t.indices,t.radius,t.details)}}class $r extends Xr{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new $r(t.radius,t.detail)}}class ei extends Xr{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new ei(t.radius,t.detail)}}class fn extends Ce{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const u=[],h=new C,d=new C,p=[],g=[],_=[],m=[];for(let f=0;f<=n;f++){const M=[],b=f/n;let y=0;f===0&&a===0?y=.5/e:f===n&&c===Math.PI&&(y=-.5/e);for(let D=0;D<=e;D++){const A=D/e;h.x=-t*Math.cos(s+A*r)*Math.sin(a+b*o),h.y=t*Math.cos(a+b*o),h.z=t*Math.sin(s+A*r)*Math.sin(a+b*o),g.push(h.x,h.y,h.z),d.copy(h).normalize(),_.push(d.x,d.y,d.z),m.push(A+y,1-b),M.push(l++)}u.push(M)}for(let f=0;f<n;f++)for(let M=0;M<e;M++){const b=u[f][M+1],y=u[f][M],D=u[f+1][M],A=u[f+1][M+1];(f!==0||a>0)&&p.push(b,y,A),(f!==n-1||c<Math.PI)&&p.push(y,D,A)}this.setIndex(p),this.setAttribute("position",new Ee(g,3)),this.setAttribute("normal",new Ee(_,3)),this.setAttribute("uv",new Ee(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fn(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Fe extends Ce{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],c=[],l=[],u=new C,h=new C,d=new C;for(let p=0;p<=n;p++)for(let g=0;g<=s;g++){const _=g/s*r,m=p/n*Math.PI*2;h.x=(t+e*Math.cos(m))*Math.cos(_),h.y=(t+e*Math.cos(m))*Math.sin(_),h.z=e*Math.sin(m),o.push(h.x,h.y,h.z),u.x=t*Math.cos(_),u.y=t*Math.sin(_),d.subVectors(h,u).normalize(),c.push(d.x,d.y,d.z),l.push(g/s),l.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=s;g++){const _=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,f=(s+1)*(p-1)+g,M=(s+1)*p+g;a.push(_,m,M),a.push(m,f,M)}this.setIndex(a),this.setAttribute("position",new Ee(o,3)),this.setAttribute("normal",new Ee(c,3)),this.setAttribute("uv",new Ee(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fe(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class ye extends Us{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Lt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Lt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Yu,this.normalScale=new At(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class qr extends me{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Lt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Iv extends qr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(me.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Lt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Da=new se,Dl=new C,Il=new C;class dh{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new At(512,512),this.map=null,this.mapPass=null,this.matrix=new se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new hc,this._frameExtents=new At(1,1),this._viewportCount=1,this._viewports=[new ee(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Dl.setFromMatrixPosition(t.matrixWorld),e.position.copy(Dl),Il.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Il),e.updateMatrixWorld(),Da.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Da),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Da)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Ul=new se,Ss=new C,Ia=new C;class Uv extends dh{constructor(){super(new qe(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new At(4,2),this._viewportCount=6,this._viewports=[new ee(2,1,1,1),new ee(0,1,1,1),new ee(3,1,1,1),new ee(1,1,1,1),new ee(3,0,1,1),new ee(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Ss.setFromMatrixPosition(t.matrixWorld),n.position.copy(Ss),Ia.copy(n.position),Ia.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Ia),n.updateMatrixWorld(),s.makeTranslation(-Ss.x,-Ss.y,-Ss.z),Ul.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ul)}}class Yn extends qr{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Uv}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Nv extends dh{constructor(){super(new ah(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Fv extends qr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(me.DEFAULT_UP),this.updateMatrix(),this.target=new me,this.shadow=new Nv}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Ov extends qr{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class kv{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Nl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Nl();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Nl(){return performance.now()}const Fl=new se;class Bv{constructor(t,e,n=0,s=1/0){this.ray=new lc(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new uc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Fl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Fl),this}intersectObject(t,e=!0,n=[]){return zo(t,this,n,e),n.sort(Ol),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)zo(t[s],this,n,e);return n.sort(Ol),n}}function Ol(i,t){return i.distance-t.distance}function zo(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)zo(r[a],t,e,!0)}}class kl{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Ne(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class zv extends Mi{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ec}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ec);const Bl={type:"change"},pc={type:"start"},fh={type:"end"},rr=new lc,zl=new $n,Hv=Math.cos(70*_p.DEG2RAD),ve=new C,ze=2*Math.PI,te={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ua=1e-6;class Gv extends zv{constructor(t,e=null){super(t,e),this.state=te.NONE,this.enabled=!0,this.target=new C,this.cursor=new C,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Yi.ROTATE,MIDDLE:Yi.DOLLY,RIGHT:Yi.PAN},this.touches={ONE:$i.ROTATE,TWO:$i.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new C,this._lastQuaternion=new yi,this._lastTargetPosition=new C,this._quat=new yi().setFromUnitVectors(t.up,new C(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new kl,this._sphericalDelta=new kl,this._scale=1,this._panOffset=new C,this._rotateStart=new At,this._rotateEnd=new At,this._rotateDelta=new At,this._panStart=new At,this._panEnd=new At,this._panDelta=new At,this._dollyStart=new At,this._dollyEnd=new At,this._dollyDelta=new At,this._dollyDirection=new C,this._mouse=new At,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Wv.bind(this),this._onPointerDown=Vv.bind(this),this._onPointerUp=Xv.bind(this),this._onContextMenu=Jv.bind(this),this._onMouseWheel=Yv.bind(this),this._onKeyDown=jv.bind(this),this._onTouchStart=Kv.bind(this),this._onTouchMove=Zv.bind(this),this._onMouseDown=$v.bind(this),this._onMouseMove=qv.bind(this),this._interceptControlDown=Qv.bind(this),this._interceptControlUp=tx.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Bl),this.update(),this.state=te.NONE}update(t=null){const e=this.object.position;ve.copy(e).sub(this.target),ve.applyQuaternion(this._quat),this._spherical.setFromVector3(ve),this.autoRotate&&this.state===te.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=ze:n>Math.PI&&(n-=ze),s<-Math.PI?s+=ze:s>Math.PI&&(s-=ze),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(ve.setFromSpherical(this._spherical),ve.applyQuaternion(this._quatInverse),e.copy(this.target).add(ve),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=ve.length();a=this._clampDistance(o*this._scale);const c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const o=new C(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new C(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=ve.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(rr.origin.copy(this.object.position),rr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(rr.direction))<Hv?this.object.lookAt(this.target):(zl.setFromNormalAndCoplanarPoint(this.object.up,this.target),rr.intersectPlane(zl,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ua||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ua||this._lastTargetPosition.distanceToSquared(this.target)>Ua?(this.dispatchEvent(Bl),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?ze/60*this.autoRotateSpeed*t:ze/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){ve.setFromMatrixColumn(e,0),ve.multiplyScalar(-t),this._panOffset.add(ve)}_panUp(t,e){this.screenSpacePanning===!0?ve.setFromMatrixColumn(e,1):(ve.setFromMatrixColumn(e,0),ve.crossVectors(this.object.up,ve)),ve.multiplyScalar(t),this._panOffset.add(ve)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;ve.copy(s).sub(this.target);let r=ve.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(ze*this._rotateDelta.x/e.clientHeight),this._rotateUp(ze*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(ze*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-ze*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(ze*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-ze*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(ze*this._rotateDelta.x/e.clientHeight),this._rotateUp(ze*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new At,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function Vv(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function Wv(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Xv(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(fh),this.state=te.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function $v(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Yi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=te.DOLLY;break;case Yi.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=te.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=te.ROTATE}break;case Yi.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=te.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=te.PAN}break;default:this.state=te.NONE}this.state!==te.NONE&&this.dispatchEvent(pc)}function qv(i){switch(this.state){case te.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case te.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case te.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Yv(i){this.enabled===!1||this.enableZoom===!1||this.state!==te.NONE||(i.preventDefault(),this.dispatchEvent(pc),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(fh))}function jv(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function Kv(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case $i.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=te.TOUCH_ROTATE;break;case $i.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=te.TOUCH_PAN;break;default:this.state=te.NONE}break;case 2:switch(this.touches.TWO){case $i.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=te.TOUCH_DOLLY_PAN;break;case $i.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=te.TOUCH_DOLLY_ROTATE;break;default:this.state=te.NONE}break;default:this.state=te.NONE}this.state!==te.NONE&&this.dispatchEvent(pc)}function Zv(i){switch(this._trackPointer(i),this.state){case te.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case te.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case te.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case te.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=te.NONE}}function Jv(i){this.enabled!==!1&&i.preventDefault()}function Qv(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function tx(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Yr(i,t){const e=document.createElement("canvas");e.width=i,e.height=t;const n=e.getContext("2d");if(!n)throw new Error("canvas 2d context unavailable");return[e,n]}function jr(i){let t=i>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}function ex(){const[e,n]=Yr(2048,1024),s=jr(20260807),r=n.createLinearGradient(0,0,0,1024);r.addColorStop(0,"#02040c"),r.addColorStop(.45,"#060d1f"),r.addColorStop(.75,"#0a1428"),r.addColorStop(1,"#03050d"),n.fillStyle=r,n.fillRect(0,0,2048,1024);const a=[{x:.22,y:.34,r:.22,color:"rgba(56,217,232,0.10)"},{x:.38,y:.62,r:.16,color:"rgba(160,107,255,0.10)"},{x:.58,y:.28,r:.2,color:"rgba(56,120,255,0.09)"},{x:.74,y:.55,r:.18,color:"rgba(160,107,255,0.08)"},{x:.9,y:.38,r:.14,color:"rgba(56,217,232,0.09)"},{x:.5,y:.82,r:.15,color:"rgba(39,75,143,0.10)"}];for(const c of a){const l=n.createRadialGradient(c.x*2048,c.y*1024,0,c.x*2048,c.y*1024,c.r*2048);l.addColorStop(0,c.color),l.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=l,n.fillRect(0,0,2048,1024)}for(let c=0;c<900;c+=1){const l=s()*2048,u=s()*1024,h=.6+s()*1.6,d=s(),p=d<.6?"255,255,255":d<.8?"180,220,255":"255,220,180",g=.35+s()*.6;n.fillStyle=`rgba(${p},${g})`,n.beginPath(),n.arc(l,u,h,0,Math.PI*2),n.fill()}for(let c=0;c<26;c+=1){const l=s()*2048,u=s()*1024,h=2+s()*2.5,d=s()<.5?"56,217,232":"255,255,255",p=n.createRadialGradient(l,u,0,l,u,h*6);p.addColorStop(0,`rgba(${d},0.9)`),p.addColorStop(.25,`rgba(${d},0.35)`),p.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=p,n.fillRect(l-h*6,u-h*6,h*12,h*12),n.fillStyle="#ffffff",n.beginPath(),n.arc(l,u,h,0,Math.PI*2),n.fill()}const o=new Wr(e);return o.colorSpace=De,o}function nx(){const[t,e]=Yr(1024,1024),n=jr(19860713);e.fillStyle="#1a2231",e.fillRect(0,0,1024,1024);for(let r=0;r<12e3;r+=1){const a=n()*1024,o=n()*1024,l=n()<.5?18+n()*14:34+n()*18;e.fillStyle=`rgb(${l},${l+4},${l+10})`,e.fillRect(a,o,1+n()*2,1+n()*2)}for(let r=0;r<46;r+=1){const a=n()*1024,o=n()*1024,c=8+n()*34;e.fillStyle="rgba(10,14,24,0.85)",e.beginPath(),e.arc(a,o,c,0,Math.PI*2),e.fill(),e.strokeStyle="rgba(110,126,150,0.5)",e.lineWidth=2+n()*3,e.beginPath(),e.arc(a,o,c*.82,0,Math.PI*2),e.stroke()}for(let r=0;r<30;r+=1){let a=n()*1024,o=n()*1024;e.strokeStyle="rgba(8,11,18,0.8)",e.lineWidth=1+n()*1.5,e.beginPath(),e.moveTo(a,o);const c=4+Math.floor(n()*6);for(let l=0;l<c;l+=1)a+=(n()-.5)*70,o+=(n()-.5)*70,e.lineTo(a,o);e.stroke()}const s=new Wr(t);return s.colorSpace=De,s.wrapS=s.wrapT=is,s.repeat.set(2,2),s}function ix(){const[t,e]=Yr(1024,1024),n=jr(991023);e.fillStyle="#232d3d",e.fillRect(0,0,1024,1024),e.strokeStyle="#2f3d53",e.lineWidth=3;const s=128;for(let a=0;a<=1024;a+=s)e.beginPath(),e.moveTo(a,0),e.lineTo(a,1024),e.stroke();for(let a=0;a<=1024;a+=s)e.beginPath(),e.moveTo(0,a),e.lineTo(1024,a),e.stroke();for(let a=0;a<1024/s;a+=1)for(let o=0;o<1024/s;o+=1){const c=a*s,l=o*s,u=n(),h=e.createLinearGradient(c,l,c,l+s);h.addColorStop(0,`rgba(255,255,255,${.03+u*.03})`),h.addColorStop(1,"rgba(0,0,0,0.05)"),e.fillStyle=h,e.fillRect(c+4,l+4,s-8,s-8)}e.fillStyle="#4a5a74";for(let a=0;a<520;a+=1){const o=8+n()*1008,c=8+n()*1008;e.beginPath(),e.arc(o,c,2+n()*1.5,0,Math.PI*2),e.fill()}for(let a=0;a<10;a+=1){const o=n()<.5,c=n()*1024,l=n()*1024,u=100+n()*180,h=n(),d=h<.5?"56,217,232":h<.8?"160,107,255":"255,159,67";e.strokeStyle=`rgba(${d},0.55)`,e.lineWidth=4,e.beginPath(),o?(e.moveTo(c,l),e.lineTo(c+u,l)):(e.moveTo(c,l),e.lineTo(c,l+u)),e.stroke()}for(let a=0;a<300;a+=1){const o=n()*1024,c=n()*1024;e.fillStyle=`rgba(10,14,22,${.1+n()*.2})`,e.fillRect(o,c,2+n()*8,1+n()*3)}const r=new Wr(t);return r.colorSpace=De,r.wrapS=r.wrapT=is,r.repeat.set(1,1),r}function sx(i){const[e,n]=Yr(1024,1024),s=jr(i.seed??991023);n.fillStyle=i.base,n.fillRect(0,0,1024,1024);for(let o=0;o<48;o+=1){const c=s()*1024,l=s()*1024,u=90+s()*180,h=s()<.55,d=.03+s()*.05,p=n.createRadialGradient(c,l,0,c,l,u);p.addColorStop(0,h?`rgba(0,0,0,${d})`:`rgba(255,255,255,${d*.7})`),p.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=p,n.fillRect(0,0,1024,1024)}n.strokeStyle=i.panelLine,n.lineWidth=3;const r=128;for(let o=0;o<=1024;o+=r)n.beginPath(),n.moveTo(o,0),n.lineTo(o,1024),n.stroke();for(let o=0;o<=1024;o+=r)n.beginPath(),n.moveTo(0,o),n.lineTo(1024,o),n.stroke();for(let o=0;o<1024/r;o+=1)for(let c=0;c<1024/r;c+=1){const l=o*r,u=c*r,h=n.createLinearGradient(l,u,l,u+r);h.addColorStop(0,`rgba(255,255,255,${.025+s()*.025})`),h.addColorStop(1,"rgba(0,0,0,0.06)"),n.fillStyle=h,n.fillRect(l+4,u+4,r-8,r-8),n.fillStyle="#5a6270";for(const[d,p]of[[l+10,u+10],[l+r-10,u+10],[l+10,u+r-10],[l+r-10,u+r-10]])n.beginPath(),n.arc(d,p,4,0,Math.PI*2),n.fill()}n.strokeStyle="rgba(0,0,0,0.30)";for(let o=0;o<120;o+=1){const c=s()*1024,l=s()*1024;n.lineWidth=1+s()*1.2,n.beginPath(),n.moveTo(c,l),n.lineTo(c+(s()-.5)*70,l+(s()-.5)*70),n.stroke()}for(let o=0;o<9e3;o+=1){const c=s();n.fillStyle=c<.5?`rgba(0,0,0,${.05+s()*.08})`:`rgba(255,255,255,${.02+s()*.04})`,n.fillRect(s()*1024,s()*1024,1+s()*1.5,1+s()*1.5)}if(i.accent){const o=i.accentChance??.2;for(let c=0;c<14;c+=1){if(s()>o)continue;const l=s()<.5,u=s()*1024,h=s()*1024,d=90+s()*160;n.strokeStyle=i.accent,n.globalAlpha=.35+s()*.25,n.lineWidth=3,n.beginPath(),l?(n.moveTo(u,h),n.lineTo(u+d,h)):(n.moveTo(u,h),n.lineTo(u,h+d)),n.stroke(),n.globalAlpha=1}}n.strokeStyle="rgba(255,255,255,0.05)";for(let o=0;o<26;o+=1){const c=Math.floor(s()*4),l=s()*1024,u=30+s()*120;n.lineWidth=2+s()*3,n.beginPath(),c===0?(n.moveTo(l,0),n.lineTo(l+u,2)):c===1?(n.moveTo(l,1024),n.lineTo(l+u,1022)):c===2?(n.moveTo(0,l),n.lineTo(2,l+u)):(n.moveTo(1024,l),n.lineTo(1022,l+u)),n.stroke()}const a=new Wr(e);return a.colorSpace=De,a.wrapS=a.wrapT=is,a.repeat.set(1,1),a}const gn={color:{bgDeep:"#14161a",bgPanel:"#1b1e24",bgPanelSolid:"#15171c",line:"#2a2f38",text:"#e8e9eb",muted:"#9aa1ac",gold:"#c9a227",cyan:"#3fe0d8",purple:"#a78bfa",orange:"#e8862e",green:"#5fbf77",danger:"#ff6b5e",dust:"#8a93a0"},radius:2,panelWidth:"300px",navWidth:"64px",topbarHeight:"56px"};function rx(){const i=document.documentElement.style,t=gn.color;i.setProperty("--bg-deep",t.bgDeep),i.setProperty("--bg-panel",t.bgPanel),i.setProperty("--bg-panel-solid",t.bgPanelSolid),i.setProperty("--line",t.line),i.setProperty("--text",t.text),i.setProperty("--muted",t.muted),i.setProperty("--gold",t.gold),i.setProperty("--cyan",t.cyan),i.setProperty("--purple",t.purple),i.setProperty("--warn",t.orange),i.setProperty("--ok",t.green),i.setProperty("--danger",t.danger),i.setProperty("--radius",`${gn.radius}px`),i.setProperty("--panel-w",gn.panelWidth),i.setProperty("--nav-w",gn.navWidth),i.setProperty("--topbar-h",gn.topbarHeight)}const Rr=new Map;function ax(i){let t=0;for(let e=0;e<i.length;e+=1)t=t*31+i.charCodeAt(e)>>>0;return t}function Bi(i,t,e){const n=`metal:${i}`,s=Rr.get(n);if(s)return s;const r={base:t,panelLine:"#3a414e",seed:ax(i)},a=new ye({map:sx(r),metalness:.85,roughness:.45});return Rr.set(n,a),a}const Ae=gn.color,Hl=new WeakSet;function Pn(i){Hl.has(i)||(Hl.add(i),i.dispose())}const he={hullDark:Bi("hull-dark","#20242b"),hullSteel:Bi("hull-steel","#2e333c"),drillSteel:Bi("drill-steel","#3a404b"),gold:new ye({color:Ae.gold,metalness:1,roughness:.32}),cyanEnergy:new Me({color:Ae.cyan}),purpleCrystal:new ye({color:Ae.purple,emissive:Ae.purple,emissiveIntensity:1.1,metalness:.3,roughness:.2}),orangeBeacon:new ye({color:Ae.orange,emissive:Ae.orange,emissiveIntensity:1,metalness:.2,roughness:.4}),orangeWarn:new ye({color:Ae.orange,emissive:Ae.orange,emissiveIntensity:.35,metalness:.4,roughness:.5}),dust:new Me({color:Ae.dust}),disposeAll(){for(const i of Rr.values())Pn(i);Rr.clear(),Pn(this.gold),Pn(this.cyanEnergy),Pn(this.purpleCrystal),Pn(this.orangeBeacon),Pn(this.orangeWarn),Pn(this.dust),this.hullDark=Bi("hull-dark","#20242b"),this.hullSteel=Bi("hull-steel","#2e333c"),this.drillSteel=Bi("drill-steel","#3a404b"),this.gold=new ye({color:Ae.gold,metalness:1,roughness:.32}),this.cyanEnergy=new Me({color:Ae.cyan}),this.purpleCrystal=new ye({color:Ae.purple,emissive:Ae.purple,emissiveIntensity:1.1,metalness:.3,roughness:.2}),this.orangeBeacon=new ye({color:Ae.orange,emissive:Ae.orange,emissiveIntensity:1,metalness:.2,roughness:.4}),this.orangeWarn=new ye({color:Ae.orange,emissive:Ae.orange,emissiveIntensity:.35,metalness:.4,roughness:.5}),this.dust=new Me({color:Ae.dust})}};function ox(i){return 1-Math.pow(1-i,3)}function cx(i,t,e,n){const s=3*i,r=3*(e-i)-s,a=1-s-r,o=3*t,c=3*(n-t)-o,l=1-o-c,u=p=>((a*p+r)*p+s)*p,h=p=>((l*p+c)*p+o)*p,d=p=>(3*a*p+2*r)*p+s;return p=>{if(p<=0)return 0;if(p>=1)return 1;let g=p;for(let _=0;_<10;_+=1){const m=u(g)-p;if(Math.abs(m)<1e-6)break;const f=d(g);if(Math.abs(f)<1e-6)break;g-=m/f}return h(g)}}const lx=cx(.34,1.56,.64,1);function Ji(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,c=new Ce;let l=0;for(let u=0;u<i.length;++u){const h=i[u];let d=0;if(e!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const p in h.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(h.attributes[p]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const p in h.morphAttributes){if(!s.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;a[p]===void 0&&(a[p]=[]),a[p].push(h.morphAttributes[p])}if(t){let p;if(e)p=h.index.count;else if(h.attributes.position!==void 0)p=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,p,u),l+=p}}if(e){let u=0;const h=[];for(let d=0;d<i.length;++d){const p=i[d].index;for(let g=0;g<p.count;++g)h.push(p.getX(g)+u);u+=i[d].attributes.position.count}c.setIndex(h)}for(const u in r){const h=Gl(r[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,h)}for(const u in a){const h=a[u][0].length;if(h===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let d=0;d<h;++d){const p=[];for(let _=0;_<a[u].length;++_)p.push(a[u][_][d]);const g=Gl(p);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(g)}}return c}function Gl(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){const u=i[l];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}const a=new t(r),o=new en(a,e,n);let c=0;for(let l=0;l<i.length;++l){const u=i[l];if(u.isInterleavedBufferAttribute){const h=c/e;for(let d=0,p=u.count;d<p;d++)for(let g=0;g<e;g++){const _=u.getComponent(d,g);o.setComponent(d+h,g,_)}}else a.set(u.array,c);c+=u.count*e}return s!==void 0&&(o.gpuType=s),o}const Es=50,Vl=.8,ux=8;class hx{constructor(){F(this,"mesh");F(this,"dummy",new me);F(this,"pos",[]);F(this,"vel",[]);F(this,"life",[]);F(this,"acc",0);F(this,"active",!1);const t=new us(.07,.16,5),e=new Me({color:"#8a93a0"});this.mesh=new Vr(t,e,Es),this.mesh.instanceMatrix.setUsage(zr),this.mesh.frustumCulled=!1;for(let n=0;n<Es;n+=1)this.pos.push(new C),this.vel.push(new C),this.life.push(0),this.dummy.position.set(0,-100,0),this.dummy.scale.setScalar(.001),this.dummy.updateMatrix(),this.mesh.setMatrixAt(n,this.dummy.matrix)}setActive(t){if(this.active!==t&&(this.active=t,!t)){for(let e=0;e<Es;e+=1)this.life[e]=0,this.dummy.position.set(0,-100,0),this.dummy.scale.setScalar(.001),this.dummy.updateMatrix(),this.mesh.setMatrixAt(e,this.dummy.matrix);this.mesh.instanceMatrix.needsUpdate=!0}}update(t,e){if(this.active){this.acc+=t;const n=1/ux;for(;this.acc>=n;)this.acc-=n,this.spawn(e)}for(let n=0;n<Es;n+=1)if(!(this.life[n]<=0)){if(this.life[n]-=t,this.life[n]<=0){this.life[n]=0,this.dummy.position.set(0,-100,0),this.dummy.scale.setScalar(.001),this.dummy.updateMatrix(),this.mesh.setMatrixAt(n,this.dummy.matrix);continue}this.vel[n].y-=3*t,this.pos[n].addScaledVector(this.vel[n],t),this.syncInstance(n)}this.mesh.instanceMatrix.needsUpdate=!0}dispose(){this.mesh.geometry.dispose(),this.mesh.material.dispose()}spawn(t){let e=0,n=this.life[0];for(let s=1;s<Es;s+=1)this.life[s]<n&&(n=this.life[s],e=s);this.pos[e].set(t.x+(Math.random()-.5)*.24,t.y+(Math.random()-.5)*.1,t.z+(Math.random()-.5)*.24),this.vel[e].set((Math.random()-.5)*.8,.5+Math.random()*.8,(Math.random()-.5)*.8),this.life[e]=Vl,this.syncInstance(e)}syncInstance(t){const e=1-this.life[t]/Vl;this.dummy.position.copy(this.pos[t]),this.dummy.scale.setScalar(Math.max(.001,1-e*.6)),this.dummy.rotation.set(e*3,e*2,0),this.dummy.updateMatrix(),this.mesh.setMatrixAt(t,this.dummy.matrix)}}function ar(i){const t=[];for(const n of i){const s=n.geo.clone();n.rot&&s.rotateX(n.rot[0]).rotateY(n.rot[1]).rotateZ(n.rot[2]),n.pos&&s.translate(n.pos[0],n.pos[1],n.pos[2]),t.push(s)}const e=Ji(t);for(const n of t)n.dispose();for(const n of i)n.geo.dispose();if(!e)throw new Error("excavator: mergeGeometries failed");return e}function dx(i){const t=he.hullDark,e=new yn;i.add(e);const n=new xt(ar([{geo:new Se(2.1,2.3,.5,6),pos:[0,.25,0]},{geo:new fe(2.2,1.2,1.9),pos:[0,1.35,0]},{geo:new fe(1.2,.7,1.3),pos:[.1,2.2,-.1]},{geo:new fe(.9,.8,1.4),pos:[-.55,1.45,-1.05]},{geo:new fe(.12,.5,1.2),pos:[1.15,1.5,.15]},{geo:new fe(.12,.5,1.2),pos:[-1.15,1.5,.15]},{geo:new fe(.12,.5,1.2),pos:[1.15,1.5,-.75]},{geo:new fe(.12,.5,1.2),pos:[-1.15,1.5,-.75]},{geo:new fe(1.15,.95,1.25),pos:[1.25,.95,.15]}]),t);n.castShadow=!0,e.add(n);const s=new xt(ar([{geo:new Fe(2.18,.07,6,24),pos:[0,.5,0],rot:[Math.PI/2,0,0]},{geo:new Se(.3,.3,.06,6),pos:[.72,1.55,.96],rot:[Math.PI/2,0,0]}]),he.gold);s.castShadow=!0,e.add(s);const r=he.cyanEnergy.clone(),a=new xt(new Fe(1.86,.06,6,32),r);a.rotation.x=Math.PI/2,a.position.y=.72,e.add(a);const o=he.purpleCrystal.clone(),c=new xt(new ei(.34),o);c.position.set(1.25,1.15,.15),e.add(c);const l=new xt(new ei(.2),o);l.position.set(1.35,.85,-.25),l.rotation.set(.5,.3,0),e.add(l);const u=he.orangeBeacon.clone(),h=new xt(new fn(.12,10,10),u);h.position.set(0,2.65,0),e.add(h);const d=new yn;d.position.set(-1.25,1.55,.35),d.rotation.z=-.5;const p=new xt(ar([{geo:new Se(.16,.2,1.1,10),pos:[0,-.55,0]},{geo:new us(.42,.9,10),pos:[0,-1.55,0],rot:[Math.PI,0,0]},{geo:new fe(.05,1.5,.14),pos:[0,-1.05,0],rot:[0,.7,0]},{geo:new fe(.05,1.5,.14),pos:[0,-1.05,0],rot:[0,-.7,0]}]),he.drillSteel);p.castShadow=!0,d.add(p);const g=new xt(new Fe(.36,.055,6,12),he.orangeWarn);g.position.y=-1.05,g.rotation.x=Math.PI/2,d.add(g);const _=new me;_.position.set(0,-2.1,0),d.add(_),e.add(d);const m=new xt(ar([{geo:new fe(.35,.5,1),pos:[-1.05,1.7,.35],rot:[0,0,-.5]}]),he.hullSteel);m.castShadow=!0,e.add(m);const f=new Yn(16777215,6,12,1.6);f.position.set(.3,2.4,.7),e.add(f);const M=new hx;return i.add(M.mesh),{drill:d,crystalMat:o,beaconMat:u,energyMat:r,pulseGroup:e,light:f,dust:M,drillTip:_}}function fx(i){const t=new xt(new Se(2,2.2,.5,6),he.hullDark);t.position.y=.25,t.castShadow=!0,i.add(t);const e=new xt(new Fe(2.06,.06,6,24),he.gold);e.rotation.x=Math.PI/2,e.position.y=.5,i.add(e);const n=new xt(new Se(.5,.68,1.7,10),he.hullSteel);n.position.y=1.45,n.castShadow=!0,i.add(n);const s=new xt(new fe(.9,.7,.9),he.hullDark);s.position.y=2.3,s.castShadow=!0,i.add(s);const r=new xt(new Se(.28,.28,.05,6),he.gold);r.rotation.x=Math.PI/2,r.position.set(0,2.3,.46),i.add(r);const a=new xt(new Se(.04,.06,.9,8),he.hullSteel);a.position.y=2.95,i.add(a);const o=new xt(new fn(.11,10,10),he.orangeBeacon);o.position.y=3.4,i.add(o);const c=new fe(2.4,.28,.5).translate(-1.2,0,0),l=new fe(.5,.28,1.2).translate(1.2,0,0),u=Ji([c,l])??new Ce;c.dispose(),l.dispose();const h=new xt(u,he.hullSteel);h.position.set(4.9,1.05,0),h.castShadow=!0,i.add(h);const d=new xt(new fe(2.4,.06,.12),he.cyanEnergy);d.position.set(4.9,1.22,0),i.add(d);const p=new xt(new fn(.1,8,8),he.cyanEnergy);p.position.set(4.9,1.35,0),i.add(p)}const Wi=6,Xn=1,un=1.38,px=.45,or=new Lt(gn.color.cyan),cr=new Lt(gn.color.gold),mx=new Lt(gn.color.danger),gx=new C(0,1,0);class _x{constructor(t){F(this,"length");F(this,"pts");F(this,"cum");this.pts=t,this.cum=[0];for(let e=1;e<t.length;e+=1)this.cum.push(this.cum[e-1]+t[e].distanceTo(t[e-1]));this.length=this.cum[this.cum.length-1]}pointAt(t,e){const n=Math.max(0,Math.min(this.length,t*this.length));let s=1;for(;s<this.cum.length-1&&this.cum[s]<n;)s+=1;const r=this.cum[s]-this.cum[s-1],a=r>1e-6?(n-this.cum[s-1])/r:0;e.lerpVectors(this.pts[s-1],this.pts[s],a)}}function Wl(i){return i.clone().normalize().multiplyScalar(Wi)}function vx(i,t,e){const n=[];let s=(i%(Math.PI*2)+Math.PI*2)%(Math.PI*2);const r=Math.PI*2;for(;s<r-1e-4;)n.push(new C(Math.cos(s)*t,e,Math.sin(s)*t)),s+=.35;return n.push(new C(t,e,0)),n}function As(i,t,e,n){const s=t.clone().sub(i),r=s.length(),a=new fe(r,n,e);return a.translate(r/2,0,0),a.rotateY(-Math.atan2(s.z,s.x)),a.translate(i.x,0,i.z),a}function Xl(i,t,e=.6){const n=i.clone().lerp(t,.5),s=n.clone().normalize(),r=n.clone().addScaledVector(s,-e),a=[],o=20;for(let c=0;c<=o;c+=1){const l=c/o,u=i.clone().lerp(r,l),h=r.clone().lerp(t,l);a.push(u.lerp(h,l))}return a}function xx(i,t,e){const n=[];for(let s=1;s<i.length;s+=1)n.push(As(i[s-1],i[s],t,e));return Ji(n)??new Ce}function yx(i,t){if(t==="transport")return i<4;switch(i){case 0:return t==="excavator";case 1:return t==="he3Excavator";case 2:return t==="deuteriumExcavator";case 3:return t==="refinery";case 4:return t==="energyStation";default:return!1}}class Mx{constructor(){F(this,"group",new yn);F(this,"ringGlowMat");F(this,"spokeGlowMats",[]);F(this,"cargoPods");F(this,"energyOrbs");F(this,"arrows");F(this,"loadPortals");F(this,"dummy",new me);F(this,"sources",[]);F(this,"energyPath");F(this,"arrowDefs",[]);F(this,"dist",[]);F(this,"t",0);F(this,"congested",!1);const t=new xt(new Fe(Wi,.16,8,64),he.hullSteel);t.rotation.x=Math.PI/2,t.position.y=Xn,this.group.add(t),this.ringGlowMat=he.cyanEnergy.clone(),this.ringGlowMat.transparent=!0;const e=new xt(new Fe(Wi+.2,.05,6,64),this.ringGlowMat);e.rotation.x=Math.PI/2,e.position.y=Xn+.07,this.group.add(e);const n=[new C(-12,0,-7),new C(12,0,-7),new C(0,0,-14)],s=[new C(-10.75,0,-6.85),new C(10.75,0,-6.85),new C(.15,0,-12.75)],r=[],a=[];for(let M=0;M<n.length;M+=1){const b=s[M],y=Wl(n[M]),D=Xl(b,y);a.push(D),r.push({from:D[0],to:D[D.length-1]})}const o={from:new C(5.2,0,0),to:new C(1.05,0,0)};r.push(o);const c={from:new C(0,0,11),to:new C(0,0,6.3)};r.push(c);const l=[];l.push(As(r[3].from,r[3].to,.26,.14)),l.push(As(r[4].from,r[4].to,.26,.14));const u=new xt(Ji(l)??new Ce,he.hullSteel);u.position.y=Xn,this.group.add(u);for(let M=0;M<r.length;M+=1){const b=r[M],y=he.cyanEnergy.clone();y.transparent=!0,M===4&&y.color.copy(cr);let D;if(M===3){const w=b.to.clone().sub(b.from).normalize(),P=new C(-w.z,0,w.x),E=[];for(const x of[-.16,.16]){const R=b.from.clone().addScaledVector(P,x),k=b.to.clone().addScaledVector(P,x);E.push(As(R,k,.16,.1))}D=Ji(E)??new Ce}else M<3?D=xx(a[M],.22,.08):D=As(b.from,b.to,.14,.06);const A=new xt(D,y);A.position.y=M===3?Xn+.2:Xn+.07,this.group.add(A),this.spokeGlowMats.push(y)}const h=[];for(let M=0;M<s.length;M+=1){const b=s[M],y=b.clone().addScaledVector(r[M].to.clone().sub(r[M].from).normalize(),-.6);h.push(new Se(.72,.82,.28,6).translate(b.x,.14,b.z)),h.push(new Se(.07,.09,1.35,8).translate(y.x,.675,y.z))}const d=new C(1.05,0,0);h.push(new Se(.72,.82,.28,6).translate(d.x,.14,d.z)),h.push(new Se(.07,.09,1.35,8).translate(d.x-.55,.675,d.z));const p=new xt(Ji(h)??new Ce,he.hullSteel);p.position.y=Xn,this.group.add(p),this.loadPortals=this.makePods(new Fe(.55,.06,8,24),s.length+1,!0);for(let M=0;M<s.length;M+=1){const b=s[M],y=r[M].to.clone().sub(r[M].from).setY(0).normalize();this.dummy.position.set(b.x,Xn+.38,b.z),this.dummy.quaternion.setFromUnitVectors(new C(0,0,1),y),this.dummy.scale.setScalar(1),this.dummy.updateMatrix(),this.loadPortals.setMatrixAt(M,this.dummy.matrix),this.loadPortals.setColorAt(M,or)}{const M=o.to.clone().sub(o.from).setY(0).normalize();this.dummy.position.set(d.x,Xn+.38,d.z),this.dummy.quaternion.setFromUnitVectors(new C(0,0,1),M),this.dummy.scale.setScalar(1),this.dummy.updateMatrix(),this.loadPortals.setMatrixAt(s.length,this.dummy.matrix),this.loadPortals.setColorAt(s.length,or)}const g=[Math.atan2(-7,-12),Math.atan2(-7,12),Math.atan2(-14,0)];for(let M=0;M<n.length;M+=1){const b=s[M].clone().setY(un),y=Wl(n[M]).setY(un),D=vx(g[M],Wi,un),w=[...Xl(b,y),...D,new C(6,un,0),new C(1.05,un,0)],P=new _x(w);this.sources.push({path:P,clampDist:P.length-.95,spokeIndex:M}),this.dist.push(M*2.5)}this.energyPath={from:new C(0,un,11),to:new C(0,un,6.3)};for(let M=0;M<3;M+=1){const b=a[M];for(const y of[.3,.62]){const D=Math.round(y*(b.length-1)),A=b[Math.max(0,D-1)],w=b[Math.min(b.length-1,D+1)];this.arrowDefs.push({pos:b[D].clone().setY(un+.12),dir:w.clone().sub(A).setY(0).normalize(),gold:!1})}}const _=o.to.clone().sub(o.from).normalize();this.arrowDefs.push({pos:o.from.clone().lerp(o.to,.5).setY(un+.12),dir:_,gold:!1,delivery:!0});const m=c.to.clone().sub(c.from).normalize();this.arrowDefs.push({pos:c.from.clone().lerp(c.to,.5).setY(un+.12),dir:m,gold:!0});const f=[1.7,2.8,4.25,5.3,6.05];for(const M of f)this.arrowDefs.push({pos:new C(Math.cos(M)*Wi,un+.12,Math.sin(M)*Wi),dir:new C(-Math.sin(M),0,Math.cos(M)),gold:!1});this.arrows=this.makePods(new us(.14,.3,4),this.arrowDefs.length,!1),this.cargoPods=this.makePods(new fn(.44,10,10),6,!0),this.energyOrbs=this.makePods(new fn(.24,10,10),2,!0)}update(t,e,n,s=null){this.congested=n,this.t+=t;const r=e>.001;if(r){const p=2.2+e*2.4;for(let g=0;g<this.sources.length;g+=1)this.dist[g]+=p*t}const a=n?mx:or,o=px+.08*Math.sin(this.t*2.5),c=r&&s!==null&&s!=="energyStation";for(let p=0;p<this.spokeGlowMats.length;p+=1){const g=this.spokeGlowMats[p],_=p===4,m=_?cr:a;let f;r?_?f=s==="energyStation"?1.1:.7+.2*Math.sin(this.t*5):p<3?f=n?.9:.8+.15*Math.sin(this.t*6):yx(p,s)?f=1.15+.05*Math.sin(this.t*6):c?f=.42+.08*Math.sin(this.t*3):f=n?.9:.6+.25*Math.sin(this.t*6):f=o,g.color.copy(m).multiplyScalar(f),g.opacity=r?1:.9}let l;r?s==="transport"||s==="refinery"?l=1.1:c?l=.5+.06*Math.sin(this.t*3):l=n?.9:.6+.25*Math.sin(this.t*6):l=o,this.ringGlowMat.color.copy(a).multiplyScalar(l),this.ringGlowMat.opacity=r?1:.9;let u=0;for(let p=0;p<this.sources.length;p+=1){const g=this.sources[p],_=g.path;for(let m=0;m<2;m+=1){let f=(this.dist[p]+m*_.length*.5)%_.length;n&&(f=Math.min(f,Math.max(0,g.clampDist-u*.35))),_.pointAt(f/_.length,this.dummy.position);let M=r?1:.001;r&&f>_.length-1.15&&(M=Math.max(.001,1-(f-(_.length-1.15))/1.15)),this.dummy.scale.setScalar(M),this.dummy.updateMatrix(),this.cargoPods.setMatrixAt(u,this.dummy.matrix),this.cargoPods.setColorAt(u,a),u+=1}}for(let p=0;p<2;p+=1){const g=(this.t*.6+p*.5)%1;this.dummy.position.lerpVectors(this.energyPath.from,this.energyPath.to,g),this.dummy.scale.setScalar(r?.9:.001),this.dummy.updateMatrix(),this.energyOrbs.setMatrixAt(p,this.dummy.matrix),this.energyOrbs.setColorAt(p,cr)}const h=r?n?.85:.8:o;for(let p=0;p<this.arrowDefs.length;p+=1){const g=this.arrowDefs[p];this.dummy.position.copy(g.pos),this.dummy.quaternion.setFromUnitVectors(gx,g.dir),this.dummy.scale.setScalar(r?1:.55),this.dummy.updateMatrix(),this.arrows.setMatrixAt(p,this.dummy.matrix);const _=g.gold?cr:a;this.arrows.setColorAt(p,_.clone().multiplyScalar(h))}const d=r?n?.9:.8+.2*Math.sin(this.t*4):o;for(let p=0;p<this.loadPortals.count;p+=1)this.loadPortals.setColorAt(p,a.clone().multiplyScalar(d));this.loadPortals.instanceColor.needsUpdate=!0,this.cargoPods.instanceMatrix.needsUpdate=!0,this.energyOrbs.instanceMatrix.needsUpdate=!0,this.arrows.instanceMatrix.needsUpdate=!0,this.cargoPods.instanceColor.needsUpdate=!0,this.energyOrbs.instanceColor.needsUpdate=!0,this.arrows.instanceColor.needsUpdate=!0}makePods(t,e,n){const s=new Vr(t,new Me({color:16777215}),e);s.instanceMatrix.setUsage(zr),s.frustumCulled=!1;for(let r=0;r<e;r+=1)this.dummy.position.set(0,-100,0),this.dummy.scale.setScalar(.001),this.dummy.quaternion.identity(),this.dummy.updateMatrix(),s.setMatrixAt(r,this.dummy.matrix),n&&s.setColorAt(r,or);return this.group.add(s),s}}const lr=80,$l=1.2,Sx=14;class Ex{constructor(){F(this,"group",new yn);F(this,"core");F(this,"coreMat");F(this,"halo");F(this,"haloMat");F(this,"light");F(this,"particles");F(this,"particleMat");F(this,"dummy",new me);F(this,"pPos",[]);F(this,"pVel",[]);F(this,"pLife",[]);F(this,"spawnAcc",0);F(this,"activity",0);const t=new xt(new Se(1.6,1.9,.4,6),new ye({color:2305085,metalness:.7,roughness:.55}));t.position.y=.2,t.castShadow=!0,this.group.add(t),this.coreMat=new ye({color:10513407,emissive:6963156,emissiveIntensity:1,metalness:.3,roughness:.2}),this.core=new xt(new ei(.85),this.coreMat),this.core.position.y=2,this.core.castShadow=!0,this.group.add(this.core),this.haloMat=new Me({color:8319968,transparent:!0,opacity:.6}),this.halo=new xt(new Fe(1.2,.06,8,40),this.haloMat),this.halo.position.y=2,this.halo.rotation.x=Math.PI/2.4,this.group.add(this.halo),this.light=new Yn(10120191,6,12,1.6),this.light.position.y=2.3,this.group.add(this.light),this.particleMat=new Me({color:9099775,transparent:!0,opacity:.9}),this.particles=new Vr(new fn(.09,6,6),this.particleMat,lr),this.particles.instanceMatrix.setUsage(zr),this.particles.frustumCulled=!1;for(let e=0;e<lr;e+=1)this.pPos.push(new C),this.pVel.push(new C),this.pLife.push(0),this.hideInstance(e);this.particles.instanceMatrix.needsUpdate=!0,this.group.add(this.particles)}setActivity(t){this.activity=Math.max(0,Math.min(1,t))}update(t,e){const n=this.activity;this.core.rotation.y+=(.4+n*1.2)*t,this.core.rotation.x=Math.sin(e*.8)*.15;const s=.7+.3*Math.sin(e*Math.PI*2*(.6+n));if(this.coreMat.emissiveIntensity=.6+n*1.2*s,this.core.scale.setScalar(1+n*.12*s),this.halo.rotation.z+=(.6+n*2.4)*t,this.haloMat.opacity=.25+n*.55,this.haloMat.color.setHex(n>.5?10513407:8319968),this.light.intensity=4+n*16*s,this.light.color.setHex(n>.66?10513407:8317183),n>.02)for(this.spawnAcc+=t*Sx*n;this.spawnAcc>=1;)this.spawnAcc-=1,this.spawnParticle();for(let r=0;r<lr;r+=1)if(!(this.pLife[r]<=0)){if(this.pLife[r]-=t,this.pLife[r]<=0){this.hideInstance(r);continue}this.pVel[r].y+=.6*t,this.pPos[r].addScaledVector(this.pVel[r],t),this.syncInstance(r)}this.particles.instanceMatrix.needsUpdate=!0}dispose(){this.core.geometry.dispose(),this.coreMat.dispose(),this.halo.geometry.dispose(),this.haloMat.dispose(),this.particles.geometry.dispose(),this.particleMat.dispose(),this.group.traverse(t=>{const e=t;if(e===this.core||e===this.halo||e===this.particles)return;e.geometry&&e.geometry.dispose();const n=e.material;n&&n.dispose()})}spawnParticle(){let t=0,e=this.pLife[0];for(let r=1;r<lr;r+=1)this.pLife[r]<e&&(e=this.pLife[r],t=r);const n=Math.random()*Math.PI*2,s=.5+Math.random()*.6;this.pPos[t].set(Math.cos(n)*s,.6+Math.random()*.3,Math.sin(n)*s),this.pVel[t].set(Math.cos(n)*.3,.8+Math.random()*.7,Math.sin(n)*.3),this.pLife[t]=$l,this.syncInstance(t)}syncInstance(t){const e=1-this.pLife[t]/$l;this.dummy.position.copy(this.pPos[t]),this.dummy.scale.setScalar(Math.max(.001,(1-e)*(.6+this.activity*.8))),this.dummy.updateMatrix(),this.particles.setMatrixAt(t,this.dummy.matrix)}hideInstance(t){this.dummy.position.set(0,-100,0),this.dummy.scale.setScalar(.001),this.dummy.updateMatrix(),this.particles.setMatrixAt(t,this.dummy.matrix)}}const Dn={collapse:1.6,burst:.8,rebirth:1.8},bs=Dn.collapse+Dn.burst+Dn.rebirth;function bx(i){const{collapse:t,burst:e,rebirth:n}=Dn;return i<0?{phase:"idle",phaseProgress:0,overall:0,elapsed:0}:i>=bs?{phase:"done",phaseProgress:1,overall:1,elapsed:bs}:i<t?{phase:"collapse",phaseProgress:i/t,overall:i/bs,elapsed:i}:i<t+e?{phase:"burst",phaseProgress:(i-t)/e,overall:i/bs,elapsed:i}:{phase:"rebirth",phaseProgress:(i-t-e)/n,overall:i/bs,elapsed:i}}const li=240;class Tx{constructor(){F(this,"group",new yn);F(this,"core");F(this,"coreMat");F(this,"halo");F(this,"haloMat");F(this,"light");F(this,"particles");F(this,"particleMat");F(this,"shell");F(this,"shellMat");F(this,"dummy",new me);F(this,"pPos",[]);F(this,"pVel",[]);F(this,"pLife",[]);F(this,"active",!1);F(this,"startElapsed",0);this.coreMat=new ye({color:12577023,emissive:7002623,emissiveIntensity:1.2,metalness:.2,roughness:.25,transparent:!0,opacity:1}),this.core=new xt(new ei(1.2,0),this.coreMat),this.core.position.y=6,this.group.add(this.core),this.haloMat=new Me({color:10154239,transparent:!0,opacity:.55}),this.halo=new xt(new Fe(1.8,.08,10,48),this.haloMat),this.halo.position.y=6,this.halo.rotation.x=Math.PI/2,this.group.add(this.halo),this.shellMat=new Me({color:16777215,transparent:!0,opacity:0,wireframe:!0}),this.shell=new xt(new $r(1,1),this.shellMat),this.shell.position.y=6,this.group.add(this.shell),this.light=new Yn(16777215,0,60,1.2),this.light.position.y=6,this.group.add(this.light),this.particleMat=new Me({color:13626111,transparent:!0,opacity:.9}),this.particles=new Vr(new fn(.08,6,6),this.particleMat,li),this.particles.instanceMatrix.setUsage(zr),this.particles.frustumCulled=!1;for(let t=0;t<li;t+=1)this.pPos.push(new C),this.pVel.push(new C),this.pLife.push(0),this.hideInstance(t);this.particles.instanceMatrix.needsUpdate=!0,this.group.add(this.particles),this.group.visible=!1}isActive(){return this.active}start(t){this.active=!0,this.startElapsed=t,this.group.visible=!0;for(let e=0;e<li;e+=1){const n=e/li*Math.PI*2+Math.random()*.3,s=3+Math.random()*2.5;this.pPos[e].set(Math.cos(n)*s,6+(Math.random()-.5)*1.5,Math.sin(n)*s),this.pVel[e].set(-Math.cos(n)*1.8,-.3,-Math.sin(n)*1.8),this.pLife[e]=Dn.collapse+Dn.burst,this.syncInstance(e,1)}this.particles.instanceMatrix.needsUpdate=!0}update(t,e){if(!this.active)return;const n=e-this.startElapsed,s=bx(n);switch(s.phase){case"collapse":this.updateCollapse(s.phaseProgress,t);break;case"burst":this.updateBurst(s.phaseProgress,t,n);break;case"rebirth":this.updateRebirth(s.phaseProgress,t);break;case"done":this.finish();return}for(let r=0;r<li;r+=1){if(this.pLife[r]<=0)continue;this.pLife[r]-=t,this.pPos[r].addScaledVector(this.pVel[r],t),s.phase==="rebirth"&&this.pVel[r].multiplyScalar(.92);const a=Math.max(0,Math.min(1,this.pLife[r]/1.5));this.syncInstance(r,a),this.pLife[r]<=0&&this.hideInstance(r)}this.particles.instanceMatrix.needsUpdate=!0}updateCollapse(t,e){const n=1-t*.95;this.core.scale.setScalar(Math.max(.05,n)),this.core.rotation.y+=.04,this.coreMat.emissiveIntensity=1.2+t*2.2,this.coreMat.emissive.lerpColors(new Lt(7002623),new Lt(16777215),t),this.coreMat.opacity=1,this.halo.scale.setScalar(1-t*.6),this.haloMat.opacity=.55+t*.35,this.halo.rotation.z+=.05,this.shellMat.opacity=0,this.light.intensity=t*8}updateBurst(t,e,n){const s=t<.4?0:(t-.4)/.6;this.coreMat.opacity=s,this.core.scale.setScalar(.05+s*.95),this.coreMat.emissiveIntensity=3.4-s*2;const r=t<.3?t/.3:1-(t-.3)/.7;this.light.intensity=r*220;const a=1+t*30;if(this.shell.scale.setScalar(a),this.shellMat.opacity=(1-t)*.6,this.shell.rotation.y+=.02,this.shell.rotation.x+=.015,this.halo.scale.setScalar(.4+t*.6),this.haloMat.opacity=.35+t*.4,n-Dn.collapse<.05)for(let o=0;o<li;o+=1){const c=Math.random()*Math.PI*2,l=(Math.random()-.5)*.8,u=6+Math.random()*5;this.pVel[o].set(Math.cos(c)*u,l*u+1.5,Math.sin(c)*u),this.pLife[o]=Dn.burst+Dn.rebirth}}updateRebirth(t,e){this.coreMat.opacity=1,this.core.scale.setScalar(1+(1-t)*.5),this.coreMat.emissiveIntensity=2-t*.8,this.coreMat.emissive.lerpColors(new Lt(16777215),new Lt(7002623),t),this.core.rotation.y+=.02,this.halo.scale.setScalar(1),this.haloMat.opacity=.55-t*.2,this.haloMat.color.setHex(t>.5?10154239:16777215),this.shellMat.opacity=0,this.light.intensity=(1-t)*12}finish(){this.active=!1,this.group.visible=!1,this.core.scale.setScalar(1),this.coreMat.opacity=1,this.coreMat.emissiveIntensity=1.2,this.coreMat.emissive.setHex(7002623),this.halo.scale.setScalar(1),this.haloMat.opacity=.55,this.shellMat.opacity=0,this.light.intensity=0;for(let t=0;t<li;t+=1)this.pLife[t]=0,this.hideInstance(t);this.particles.instanceMatrix.needsUpdate=!0}dispose(){this.core.geometry.dispose(),this.coreMat.dispose(),this.halo.geometry.dispose(),this.haloMat.dispose(),this.shell.geometry.dispose(),this.shellMat.dispose(),this.particles.geometry.dispose(),this.particleMat.dispose()}syncInstance(t,e){this.dummy.position.copy(this.pPos[t]),this.dummy.scale.setScalar(Math.max(.001,e)),this.dummy.updateMatrix(),this.particles.setMatrixAt(t,this.dummy.matrix)}hideInstance(t){this.dummy.position.set(0,-100,0),this.dummy.scale.setScalar(.001),this.dummy.updateMatrix(),this.particles.setMatrixAt(t,this.dummy.matrix)}}const Na={ONLINE:5824673,LOCKED:4017251,BUILDING:16752451,UPGRADING:16752451,OFFLINE:4477030},Fa={excavator:[-12,-7],he3Excavator:[12,-7],deuteriumExcavator:[0,-14],transport:[6,0],refinery:[0,0],energyStation:[0,12]},Ir=class Ir{constructor(){F(this,"renderer",null);F(this,"scene",new La);F(this,"camera",null);F(this,"controls",null);F(this,"container",null);F(this,"labelsLayer",null);F(this,"visuals",new Map);F(this,"labelEls",new Map);F(this,"skyTex",null);F(this,"groundTex",null);F(this,"hullTex",null);F(this,"tracks",null);F(this,"reactorFX",null);F(this,"prestigeFX",null);F(this,"prestigeResolver",null);F(this,"reactorActivity",0);F(this,"transportCongested",!1);F(this,"raycaster",new Bv);F(this,"pointer",new At);F(this,"tmpVec",new C);F(this,"clock",new kv);F(this,"raf",0);F(this,"running",!1);F(this,"selected",null);F(this,"onSelect",null);F(this,"resizeObserver",null);F(this,"activity",0);F(this,"bottlenecks",[]);F(this,"elapsed",0);F(this,"pulses",new Map);F(this,"energyBase",new Lt(gn.color.cyan));F(this,"statuses",{excavator:"ONLINE",he3Excavator:"LOCKED",deuteriumExcavator:"LOCKED",transport:"LOCKED",refinery:"LOCKED",energyStation:"LOCKED"});F(this,"onContextLost",t=>{t.preventDefault(),this.running=!1,cancelAnimationFrame(this.raf)});F(this,"onContextRestored",()=>{this.reinitGraphics()});F(this,"onPointerDown",t=>{var n,s;if(!this.renderer)return;const e=this.pick(t);e?(this.selected=e,(n=this.onSelect)==null||n.call(this,e)):(s=this.onSelect)==null||s.call(this,null)});F(this,"onPointerMove",t=>{if(!this.renderer)return;const e=this.pick(t);this.renderer.domElement.style.cursor=e?"pointer":"grab"});F(this,"frame",()=>{var e,n,s,r;if(!this.running)return;const t=Math.min(this.clock.getDelta(),.1);this.elapsed+=t;for(const a of this.visuals.values())a.excavator&&this.updateExcavator(a,t);for(const a of this.visuals.values()){const o=this.statuses[a.id];a.pulse+=t*3;const c=this.bottlenecks.includes(a.id)?16752451:Na[o],l=o==="LOCKED"?.2:.55+.25*Math.sin(a.pulse);a.ringMat.color.setHex(c),a.ringMat.opacity=l}if((e=this.tracks)==null||e.update(t,this.activity,this.transportCongested,this.selected),(n=this.reactorFX)==null||n.update(t,this.elapsed),(s=this.prestigeFX)==null||s.update(t,this.elapsed),this.prestigeResolver&&this.prestigeFX&&!this.prestigeFX.isActive()){const a=this.prestigeResolver;this.prestigeResolver=null,a()}(r=this.controls)==null||r.update(),this.updateLabels(),this.camera&&this.renderer&&this.renderer.render(this.scene,this.camera),this.running&&(this.raf=requestAnimationFrame(this.frame))})}init(t,e,n={}){this.container=t,this.labelsLayer=e,this.onSelect=n.onSelect??null,this.buildGraphics(),this.resizeObserver=new ResizeObserver(()=>this.handleResize()),this.resizeObserver.observe(t)}buildGraphics(){const t=this.container;if(!t)return;const e=new Pv({antialias:!0});e.setPixelRatio(Math.min(window.devicePixelRatio,2)),e.setSize(Math.max(1,t.clientWidth),Math.max(1,t.clientHeight)),e.shadowMap.enabled=!0,e.shadowMap.type=Fu,e.domElement.style.width="100%",e.domElement.style.height="100%",t.appendChild(e.domElement),this.renderer=e;const n=new qe(50,Math.max(1,t.clientWidth)/Math.max(1,t.clientHeight),.1,300);n.position.set(0,30,32),this.camera=n;const s=new Gv(n,e.domElement);s.target.set(0,0,0),s.enableDamping=!0,s.dampingFactor=.08,s.minDistance=12,s.maxDistance=60,s.maxPolarAngle=1.35,this.controls=s,this.scene=new La,this.scene.background=new Lt(330260),this.scene.fog=new fc(330260,50,120),this.skyTex=ex(),this.groundTex=nx(),this.hullTex=ix(),this.buildLights(),this.buildSkybox(),this.buildGround(),this.buildFacilities(),this.buildTracks(),this.buildReactor(),this.buildPrestigeFX(),e.domElement.addEventListener("pointerdown",this.onPointerDown),e.domElement.addEventListener("pointermove",this.onPointerMove),e.domElement.addEventListener("webglcontextlost",this.onContextLost),e.domElement.addEventListener("webglcontextrestored",this.onContextRestored)}teardownGraphics(){var e,n,s,r,a,o,c,l,u;cancelAnimationFrame(this.raf),(e=this.skyTex)==null||e.dispose(),this.skyTex=null,(n=this.groundTex)==null||n.dispose(),this.groundTex=null,(s=this.hullTex)==null||s.dispose(),this.hullTex=null;for(const h of this.visuals.values())(r=h.excavator)==null||r.dust.dispose(),h.group.traverse(d=>{const p=d;p.geometry&&p.geometry.dispose();const g=p.material;if(Array.isArray(g))for(const _ of g)Pn(_);else g&&Pn(g)});this.visuals.clear(),this.tracks=null,(a=this.reactorFX)==null||a.dispose(),this.reactorFX=null,(o=this.prestigeFX)==null||o.dispose(),this.prestigeFX=null,this.prestigeResolver=null,he.disposeAll(),(c=this.controls)==null||c.dispose(),this.controls=null;const t=(l=this.renderer)==null?void 0:l.domElement;t&&(t.removeEventListener("pointerdown",this.onPointerDown),t.removeEventListener("pointermove",this.onPointerMove),t.removeEventListener("webglcontextlost",this.onContextLost),t.removeEventListener("webglcontextrestored",this.onContextRestored),t.remove()),(u=this.renderer)==null||u.dispose(),this.renderer=null;for(const h of this.labelEls.values())h.remove();this.labelEls.clear(),this.scene=new La}reinitGraphics(){var n,s;const t=((n=this.camera)==null?void 0:n.position.clone())??null,e=((s=this.controls)==null?void 0:s.target.clone())??null;this.teardownGraphics(),this.buildGraphics(),t&&this.camera&&this.camera.position.copy(t),e&&this.controls&&this.controls.target.copy(e),this.clock.getDelta(),this.running=!0,this.raf=requestAnimationFrame(this.frame)}start(){this.running||(this.running=!0,this.clock.start(),this.raf=requestAnimationFrame(this.frame))}setPaused(t){this.controls&&(this.controls.enabled=!t)}sync(t){var e;this.statuses=t.statuses,this.selected=t.selected,this.activity=t.transportActivity,this.bottlenecks=t.bottlenecks,this.transportCongested=t.transportCongested,this.reactorActivity=t.reactorActivity,(e=this.reactorFX)==null||e.setActivity(this.reactorActivity)}dispose(){var t;this.running=!1,(t=this.resizeObserver)==null||t.disconnect(),this.resizeObserver=null,this.teardownGraphics()}pick(t){if(!this.renderer||!this.camera)return null;const e=this.renderer.domElement.getBoundingClientRect();this.pointer.x=(t.clientX-e.left)/Math.max(1,e.width)*2-1,this.pointer.y=-((t.clientY-e.top)/Math.max(1,e.height))*2+1,this.raycaster.setFromCamera(this.pointer,this.camera);const n=[...this.visuals.values()].map(a=>a.group),s=this.raycaster.intersectObjects(n,!0);if(s.length===0)return null;let r=s[0].object;for(;r;){const a=r.userData.facilityId;if(a&&this.visuals.has(a))return a;r=r.parent}return null}handleResize(){if(!this.container||!this.renderer||!this.camera)return;const t=Math.max(1,this.container.clientWidth),e=Math.max(1,this.container.clientHeight);this.renderer.setSize(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix()}buildLights(){this.scene.add(new Ov(3359846,.9));const t=new Iv(8952251,659226,.7);this.scene.add(t);const e=new Fv(16774104,1.15);e.position.set(12,18,10),e.castShadow=!0,e.shadow.mapSize.set(1024,1024),e.shadow.camera.left=-16,e.shadow.camera.right=16,e.shadow.camera.top=16,e.shadow.camera.bottom=-16,e.shadow.camera.near=1,e.shadow.camera.far=60,e.shadow.bias=-4e-4,this.scene.add(e);const n=new Yn(3725800,40,30);n.position.set(-9,4.5,2),this.scene.add(n);const s=new Yn(8317183,30,26);s.position.set(-16,4.5,0),this.scene.add(s);const r=new Yn(10513407,40,30);r.position.set(9,4.5,-2),this.scene.add(r)}buildSkybox(){if(!this.skyTex)return;const t=new fn(170,40,24),e=new Me({map:this.skyTex,side:Oe,fog:!1}),n=new xt(t,e);this.scene.add(n)}buildGround(){const t=new $r(20,1),e=new ye({map:this.groundTex??void 0,color:16777215,roughness:.95,metalness:.1,flatShading:!0}),n=new xt(t,e);n.scale.set(1,.28,1),n.position.y=-5,n.receiveShadow=!0,this.scene.add(n)}buildFacilities(){for(const t of tn){const e=new yn,[n,s]=Fa[t];e.position.set(n,0,s),e.userData.facilityId=t;const r=this.buildFacilityMesh(t,e);this.scene.add(e),this.visuals.set(t,r),this.buildLabel(t)}}buildFacilityMesh(t,e){if(t==="excavator"){const l=dx(e),u=new Me({color:Na.ONLINE,transparent:!0,opacity:.7}),h=new xt(new Fe(1.4,.05,10,48),u);h.rotation.x=Math.PI/2,h.position.y=2.75,e.add(h);const d=new xt(new Se(2.35,2.35,5,12),new Me({colorWrite:!1,depthWrite:!1}));return d.position.y=2.3,e.add(d),{id:t,group:e,ringMat:u,pips:[],pipPhase:0,pulse:Math.random()*6,excavator:l}}const n=l=>new ye({map:this.hullTex??void 0,color:l,metalness:.72,roughness:.35}),s=new xt(new Se(1.9,2.1,.35,24),new ye({map:this.hullTex??void 0,color:2305085,metalness:.7,roughness:.55}));s.position.y=.18,e.add(s);const r=[];if(t==="he3Excavator"||t==="deuteriumExcavator"){const l=t==="he3Excavator",u=t==="deuteriumExcavator",h=u?9387855:l?4165535:6256276,d=u?16739166:l?8317183:3725800,p=new xt(new fe(2,1.3,1.8),n(h));p.position.y=1.15,e.add(p);const g=new xt(new us(.55,1.5,12),n(u?13205391:l?8368317:10135480));g.position.y=.65,g.rotation.x=Math.PI,e.add(g);const _=new xt(new Fe(.48,.09,8,24),new ye({color:d,emissive:d,emissiveIntensity:1.2}));_.position.y=1.9,_.rotation.x=Math.PI/2,e.add(_);const m=new xt(new Se(.04,.06,1.1,8),n(u?13205391:l?8368317:10135480));m.position.y=2.4,e.add(m);const f=new xt(new fn(.1,12,12),new ye({color:d,emissive:d,emissiveIntensity:1.6}));f.position.y=3,e.add(f)}if(t==="transport"&&fx(e),t==="refinery"){const l=new xt(new fe(2,1.2,2),n(4930158));l.position.y=1.05,e.add(l);const u=new xt(new ei(.85),new ye({color:10513407,emissive:8077268,emissiveIntensity:1.35,metalness:.3,roughness:.2}));u.position.y=2.1,e.add(u);const h=new Yn(10513407,18,8);h.position.y=2.4,e.add(h)}if(t==="energyStation"){const l=new xt(new ei(.9),new ye({color:3790529,emissive:2078883,emissiveIntensity:1.5,metalness:.3,roughness:.2}));l.position.y=2.1,e.add(l);const u=new xt(new Fe(1.15,.07,8,32),new Me({color:8319968}));u.position.y=2.1,u.rotation.x=Math.PI/2.6,e.add(u);const h=new Yn(3790529,20,9);h.position.y=2.4,e.add(h)}const a=new xt(new Se(2.35,2.35,5,12),new Me({colorWrite:!1,depthWrite:!1}));a.position.y=2.3,e.add(a);const o=new Me({color:Na.ONLINE,transparent:!0,opacity:.7}),c=new xt(new Fe(1.4,.05,10,48),o);return c.rotation.x=Math.PI/2,c.position.y=2.75,e.add(c),{id:t,group:e,ringMat:o,pips:r,pipPhase:Math.random()*Math.PI*2,pulse:Math.random()*6}}buildTracks(){this.tracks=new Mx,this.scene.add(this.tracks.group)}buildReactor(){this.reactorFX=new Ex,this.reactorFX.group.position.set(16,0,8),this.scene.add(this.reactorFX.group)}buildPrestigeFX(){this.prestigeFX=new Tx,this.scene.add(this.prestigeFX.group)}playPrestigeSequence(){return this.prestigeFX?(this.prestigeFX.start(this.elapsed),new Promise(t=>{this.prestigeResolver=t})):Promise.resolve()}buildLabel(t){if(!this.labelsLayer)return;const e=document.createElement("div");e.className="facility-label",e.dataset.facility=t;const n=document.createElement("span");n.className="label-status",e.append(document.createTextNode(nn[t].name)),e.append(n),this.labelsLayer.appendChild(e),this.labelEls.set(t,e)}updateLabels(){if(!this.labelsLayer||!this.camera)return;const t=this.camera,e=this.labelsLayer.getBoundingClientRect(),n=(s,r,a,o=[0,0])=>{this.tmpVec.set(s,3.6,r);const c=this.tmpVec.clone().project(t);if(!(c.z>-1&&c.z<1)){a.style.display="none";return}a.style.display="block",a.style.left=`${(c.x+1)/2*e.width+o[0]}px`,a.style.top=`${(1-c.y)/2*e.height+o[1]}px`};for(const s of tn){const r=this.visuals.get(s),a=this.labelEls.get(s);if(!r||!a)continue;const o=Ir.LABEL_OFFSETS[s]??[0,0];n(Fa[s][0],Fa[s][1],a,o);const c=this.statuses[s],l=a.querySelector(".label-status");l&&(l.textContent=c,l.className=`label-status ${c}`),a.dataset.status=c,a.classList.toggle("selected",this.selected===s)}}pulseFacility(t){this.pulses.set(t,this.elapsed)}updateExcavator(t,e){const n=t.excavator;if(!n)return;const s=this.statuses[t.id]==="ONLINE";s&&(n.drill.rotation.y+=2.5*e);const r=this.elapsed;n.crystalMat.emissiveIntensity=s?1.1+.3*Math.sin(r*Math.PI*2):.45,n.beaconMat.emissiveIntensity=s&&Math.floor(r*2)%2===0?2:.2;let a=.5+.2*Math.sin(r*Math.PI*1.6),o=1,c=0;const l=this.pulses.get(t.id);if(l!==void 0){const u=this.elapsed-l;u<.6&&(a=Math.max(a,.5+.7*Math.sin(Math.PI*(u/.6)))),u<.45&&(o=1+(lx(u/.45)-1)*.6),u<.5&&(c=.5*(1-u/.5)),u>=.6&&this.pulses.delete(t.id)}n.energyMat.color.copy(this.energyBase).multiplyScalar(a),n.pulseGroup.scale.setScalar(o),n.light.intensity=6*(1+c),n.drillTip.getWorldPosition(this.tmpVec),n.dust.setActive(s),n.dust.update(e,this.tmpVec)}};F(Ir,"LABEL_OFFSETS",{transport:[0,-48],refinery:[0,-48],energyStation:[0,-48]});let Ho=Ir,fi=null,os=!0;try{os=localStorage.getItem("starminer-sfx")!=="0"}catch{}function mc(){if(!os)return null;if(!fi){const i=window.AudioContext??window.webkitAudioContext;if(!i)return null;fi=new i}return fi.state==="suspended"&&fi.resume(),fi}function wx(){const i=()=>{mc()};document.addEventListener("pointerdown",i),document.addEventListener("keydown",i)}function Ax(i){os=i;try{localStorage.setItem("starminer-sfx",i?"1":"0")}catch{}!i&&fi&&fi.suspend()}function ql(){return os}function Cx(){return Ax(!os),os}function ph(i,t,e,n={}){const s=mc();if(!s)return;const r=s.currentTime+(n.delay??0),a=s.createOscillator(),o=s.createGain();a.type=n.type??"sine",a.frequency.setValueAtTime(Math.max(1,i),r),t!==i&&a.frequency.exponentialRampToValueAtTime(Math.max(1,t),r+e);const c=n.attack??.008;o.gain.setValueAtTime(1e-4,r),o.gain.exponentialRampToValueAtTime(n.gain??.14,r+c),o.gain.exponentialRampToValueAtTime(1e-4,r+e),a.connect(o),o.connect(s.destination),a.start(r),a.stop(r+e+.03)}function Rx(){ph(880,640,.04,{type:"square",gain:.045})}function Px(){const i=mc();if(!i)return;const t=i.currentTime,e=i.createOscillator(),n=i.createGain();e.type="sine",e.frequency.setValueAtTime(220,t),e.frequency.exponentialRampToValueAtTime(440,t+.12),n.gain.setValueAtTime(1e-4,t),n.gain.exponentialRampToValueAtTime(.16,t+.12),n.gain.exponentialRampToValueAtTime(1e-4,t+.52),e.connect(n),n.connect(i.destination),e.start(t),e.stop(t+.55)}function Lx(){[392,494,587].forEach((t,e)=>{ph(t,t,.18,{attack:.02,gain:.14,delay:e*.09,type:"triangle"})})}class Dx{constructor(){F(this,"creditsEl");F(this,"stardustEl");F(this,"crystalEl");F(this,"energyEl");this.creditsEl=ur("stat-credits"),this.stardustEl=ur("stat-stardust"),this.crystalEl=ur("stat-crystal"),this.energyEl=ur("stat-energy")}update(t){if(this.creditsEl.textContent=Ot(t.credits),this.stardustEl.textContent=Ot(t.stardust),this.crystalEl.textContent=Ot(t.crystal),!t.facilities.energyStation.unlocked)this.energyEl.textContent="—",this.energyEl.className="stat-value energy-val";else if(t.research.includes("energyReserve"))this.energyEl.textContent=`${Ot(t.energy)} / ${Nr}`,this.energyEl.className="stat-value energy-val";else{const n=Qe(t,"energyStation",Date.now())-Zo(t),s=n>=0?"+":"";this.energyEl.textContent=`${s}${Ot(n)}/秒`,this.energyEl.className=`stat-value ${n<0?"danger":"energy-val"}`}}}function ur(i){const t=document.getElementById(i);if(!t)throw new Error(`missing #${i}`);return t}function Ix(i,t,e=Date.now()){const n=i.facilities[t];if(!n.unlocked||n.level>=Ur)return null;const s=Xa(i,t,n.level,e),r=Xa(i,t,n.level+1,e),a=r-s,o=Fr(i,t),c=Or(i,t),l=t==="refinery"?Yo(i)-Jo(i)*Ga:Ga,u=a>0?Math.ceil(o/(a*l)):null;return{currentRate:s,nextRate:r,deltaRate:a,costCredits:o,costCrystal:c,valuePerUnit:l,paybackSeconds:u}}function Ux(i,t){if(t==="refinery"){if(!i.facilities.refinery.unlocked)return null;if(!i.facilities.transport.unlocked)return"等待原料：需先解锁磁轨运输线（600 信用点）"}if(t==="energyStation"){if(!i.facilities.energyStation.unlocked)return null;if(!ue(i,"energyReserve"))return"研究「能源储备」后，盈余能量会存入储备池，并可释放获得 30 秒 ×1.2 加成"}return null}function Yl(i,t,e=450){i.classList.remove(t),i.offsetWidth,i.classList.add(t),window.setTimeout(()=>i.classList.remove(t),e)}function Nx(i,t,e){const n=e>0?Math.max(0,Math.min(100,t/e*100)):0;i.style.width=`${n}%`,i.classList.toggle("full",n>=99.5)}function jl(i,t,e){i.classList.toggle("bottleneck",e),t.classList.toggle("on",e),t.textContent=e?"→":""}function Fx(i,t,e,n){i.innerHTML="";const s=document.createElement("span");s.className="up-cur",s.textContent=t;const r=document.createElement("span");r.className="up-arrow",r.textContent=" → ";const a=document.createElement("span");a.className="up-next",a.textContent=e;const o=document.createElement("span");o.className="up-delta",o.textContent=n,i.append(s,r,a,o)}class Ox{constructor(t){F(this,"name");F(this,"status");F(this,"level");F(this,"rate");F(this,"capacity");F(this,"bottleneck");F(this,"hintEl");F(this,"actionBtn");F(this,"costHint");F(this,"sellStardust");F(this,"sellStardustAll");F(this,"sellCrystal");F(this,"sellCrystalAll");F(this,"qtyStardust");F(this,"qtyCrystal");F(this,"heldStardust");F(this,"heldCrystal");F(this,"crystalPriceLabel");F(this,"energyBtns");F(this,"autoSellEl");F(this,"autoSellKeepEl");F(this,"autoSellCrystalEl");F(this,"autoSellCrystalKeepEl");F(this,"autoSellHintEl");F(this,"energyEffectEl");F(this,"upgradePreviewEl");F(this,"releaseBtn");F(this,"capacityLabel");F(this,"bottleneckLabel");F(this,"capacityFill");F(this,"bottleneckRow");F(this,"bottleneckArrow");F(this,"facilityCard");F(this,"rateTween",null);var e;this.name=Wt("facility-name"),this.status=Wt("facility-status"),this.level=Wt("facility-level"),this.rate=Wt("facility-rate"),this.capacity=Wt("facility-capacity"),this.bottleneck=Wt("bottleneck-text"),this.hintEl=Wt("facility-hint"),this.actionBtn=Wt("btn-facility"),this.costHint=Wt("facility-cost"),this.sellStardust=Wt("btn-sell-stardust"),this.sellStardustAll=Wt("btn-sell-stardust-all"),this.sellCrystal=Wt("btn-sell-crystal"),this.sellCrystalAll=Wt("btn-sell-crystal-all"),this.qtyStardust=Wt("qty-stardust"),this.qtyCrystal=Wt("qty-crystal"),this.heldStardust=Wt("held-stardust"),this.heldCrystal=Wt("held-crystal"),this.crystalPriceLabel=Wt("crystal-price-label"),this.energyBtns=[...document.querySelectorAll(".energy-btn")],this.autoSellEl=Wt("auto-sell-stardust"),this.autoSellKeepEl=Wt("auto-sell-keep"),this.autoSellCrystalEl=Wt("auto-sell-crystal"),this.autoSellCrystalKeepEl=Wt("auto-sell-crystal-keep"),this.autoSellHintEl=Wt("auto-sell-hint"),this.energyEffectEl=Wt("energy-effect"),this.upgradePreviewEl=Wt("upgrade-preview"),this.releaseBtn=Wt("btn-release-energy"),this.capacityLabel=((e=Wt("facility-capacity").parentElement)==null?void 0:e.querySelector("dt"))??Wt("facility-capacity"),this.bottleneckLabel=Wt("bottleneck-row").querySelector("dt")??Wt("bottleneck-text"),this.capacityFill=Wt("capacity-fill"),this.bottleneckRow=Wt("bottleneck-row"),this.bottleneckArrow=Wt("bottleneck-arrow"),this.facilityCard=Wt("facility-card"),this.actionBtn.addEventListener("click",()=>t.onFacilityAction()),this.energyBtns.forEach(n=>n.addEventListener("click",()=>t.onEnergy(n.dataset.strategy))),this.sellStardust.addEventListener("click",()=>t.onSell("stardust",hr(this.qtyStardust))),this.sellStardustAll.addEventListener("click",()=>t.onSell("stardust")),this.sellCrystal.addEventListener("click",()=>t.onSell("crystal",hr(this.qtyCrystal))),this.sellCrystalAll.addEventListener("click",()=>t.onSell("crystal")),this.autoSellEl.addEventListener("change",()=>t.onAutoSell("stardust",this.autoSellEl.checked,dr(this.autoSellKeepEl))),this.autoSellKeepEl.addEventListener("change",()=>t.onAutoSell("stardust",this.autoSellEl.checked,dr(this.autoSellKeepEl))),this.autoSellCrystalEl.addEventListener("change",()=>t.onAutoSell("crystal",this.autoSellCrystalEl.checked,dr(this.autoSellCrystalKeepEl))),this.autoSellCrystalKeepEl.addEventListener("change",()=>t.onAutoSell("crystal",this.autoSellCrystalEl.checked,dr(this.autoSellCrystalKeepEl))),this.releaseBtn.addEventListener("click",()=>t.onReleaseEnergy())}update(t,e,n){const s=t.facilities[e],r=nn[e];this.name.textContent=r.name,this.status.textContent=s.unlocked?"ONLINE":"LOCKED",this.status.className=`status-badge ${s.unlocked?"ONLINE":"LOCKED"}`,this.level.textContent=s.unlocked?`Lv.${s.level} / 5`:"—";const a=Qe(t,e),o=Gi(t,e);if(this.rateTween&&s.unlocked){const g=Math.min(1,(performance.now()-this.rateTween.start)/this.rateTween.duration);this.rate.textContent=fs(this.rateTween.from+(this.rateTween.to-this.rateTween.from)*ox(g),r.rateUnit),g>=1&&(this.rateTween=null)}else this.rateTween=null,this.rate.textContent=s.unlocked?fs(a,r.rateUnit):"—";if(this.capacityLabel.textContent=e==="energyStation"?"储备":"容量",this.capacity.textContent=s.unlocked?e==="energyStation"?ue(t,"energyReserve")?`${Ot(t.energy)} / ${Nr}`:"未解锁（研究能源储备）":Ot(o):"—",e!=="energyStation"&&s.unlocked){const g=r.produces==="stardust"?t.stardust:r.produces==="crystal"?t.crystal:0;Nx(this.capacityFill,g,o)}else this.capacityFill.style.width="0%",this.capacityFill.classList.remove("full");const c=(n==null?void 0:n.bottlenecks.includes(e))??!1;if(e==="energyStation"&&s.unlocked){const g=Qe(t,"energyStation",Date.now()),_=Zo(t),m=_>g;this.bottleneckLabel.textContent="收支",this.bottleneck.textContent=`产出 ${g.toFixed(2)} / 消耗 ${_.toFixed(2)} /秒`,this.bottleneck.style.color=m?"var(--warn)":"",jl(this.bottleneckRow,this.bottleneckArrow,m)}else this.bottleneckLabel.textContent="瓶颈",this.bottleneck.textContent=c?"下游处理不足":"无",this.bottleneck.style.color=c?"var(--warn)":"",jl(this.bottleneckRow,this.bottleneckArrow,c);if(this.releaseBtn.hidden=!(e==="energyStation"&&s.unlocked&&ue(t,"energyReserve")),!this.releaseBtn.hidden){const g=xu(t,Date.now());this.releaseBtn.disabled=!g.ok,this.releaseBtn.textContent=`释放储备（-${br} 能量）`,this.releaseBtn.title=g.ok?"30 秒全设施 ×1.2，冷却 60 秒":g.reason??""}const l=uu[t.energyStrategy][e],u=Math.round((l-1)*100);this.energyEffectEl.textContent=u===0?`${pr[t.energyStrategy]}：对${r.name}无加成`:`${pr[t.energyStrategy]}：对${r.name} ${u>0?"+":""}${u}%`;const h=Ux(t,e);if(this.hintEl.hidden=!h,this.hintEl.textContent=h??"",s.unlocked)if(s.level>=5)this.actionBtn.textContent="已满级",this.actionBtn.disabled=!0,this.costHint.textContent="",this.upgradePreviewEl.hidden=!0;else{const g=Fr(t,e),_=Or(t,e);this.actionBtn.textContent=_>0?`升级（U）· ${Ot(g)} 信用点 + ${Ot(_)} 晶体`:`升级（U）· ${Ot(g)} 信用点`;const m=_u(t,e);this.actionBtn.disabled=!m.ok,this.costHint.textContent=m.ok?"":m.reason??"";const f=e==="energyStation"?null:Ix(t,e);if(f&&f.deltaRate>0){this.upgradePreviewEl.hidden=!1;const M=f.paybackSeconds===null?"":`，约 ${Kn(f.paybackSeconds*1e3)}回本`;Fx(this.upgradePreviewEl,fs(a,r.rateUnit),fs(a+f.deltaRate,r.rateUnit),`+${fs(f.deltaRate,r.rateUnit)}${M}`)}else this.upgradePreviewEl.hidden=!0}else{const g=jo(t,e),_=Ko(t,e);this.actionBtn.textContent=_>0?`解锁（${Ot(g)} 信用点 + ${Ot(_)} 晶体）`:`解锁（${Ot(g)} 信用点）`;const m=vu(t,e);this.actionBtn.disabled=!m.ok,this.costHint.textContent=m.ok?"":m.reason??"",this.upgradePreviewEl.hidden=!0}this.energyBtns.forEach(g=>{g.classList.toggle("active",g.dataset.strategy===t.energyStrategy),g.title=`${pr[g.dataset.strategy]}（快捷键 ${g.dataset.strategy==="excavation"?"1":g.dataset.strategy==="balanced"?"2":"3"}）`}),this.heldStardust.textContent=Ot(t.stardust),this.heldCrystal.textContent=Ot(t.crystal),this.crystalPriceLabel.textContent=String(Yo(t)),this.autoSellEl.checked=t.settings.autoSellStardust,this.autoSellCrystalEl.checked=t.settings.autoSellCrystal,this.autoSellHintEl.hidden=!t.settings.autoSellStardust&&!t.settings.autoSellCrystal,document.activeElement!==this.autoSellKeepEl&&(this.autoSellKeepEl.value=String(t.settings.stardustKeepAmount)),document.activeElement!==this.autoSellCrystalKeepEl&&(this.autoSellCrystalKeepEl.value=String(t.settings.crystalKeepAmount));const d=hr(this.qtyStardust),p=hr(this.qtyCrystal);this.sellStardust.textContent=d>0?`出售 ${Ot(d)}`:"出售",this.sellStardust.disabled=t.stardust<=0||d<=0,this.sellStardustAll.disabled=t.stardust<=0,this.sellCrystal.textContent=p>0?`出售 ${Ot(p)}`:"出售",this.sellCrystal.disabled=t.crystal<=0||p<=0,this.sellCrystalAll.disabled=t.crystal<=0}flashUpgrade(t,e){this.rateTween={from:t,to:e,start:performance.now(),duration:600},Yl(this.actionBtn,"btn-jump",450),Yl(this.facilityCard,"card-pulse",600)}}function Wt(i){const t=document.getElementById(i);if(!t)throw new Error(`missing #${i}`);return t}function hr(i){const t=Number.parseInt(i.value,10);return Number.isFinite(t)&&t>0?t:0}function dr(i){const t=Number.parseInt(i.value,10);return Number.isFinite(t)&&t>=0?t:50}const Kl=2*Math.PI*26;var ru;class kx{constructor(t){F(this,"body");F(this,"heldIsotope");F(this,"heldAntimatter");F(this,"heldDarkmatter");F(this,"reactorStatus");F(this,"buffRows",[]);F(this,"targetBtns",[]);F(this,"dispatchBtn");F(this,"exploreStatus");F(this,"exploreRing");F(this,"exploreLabel");F(this,"exploreRemain");F(this,"exchangeRows",[]);F(this,"selectedTarget",((ru=ja[0])==null?void 0:ru.id)??"");this.cbs=t;const e=document.getElementById("reactor-body");if(!e)throw new Error("missing #reactor-body");this.body=e,this.body.innerHTML=this.renderShell(),this.heldIsotope=this.byId("reactor-isotope"),this.heldAntimatter=this.byId("reactor-antimatter"),this.heldDarkmatter=this.byId("reactor-darkmatter"),this.reactorStatus=this.byId("reactor-status"),this.buildBuffRows(),this.buildExploration(),this.buildExchangeRows()}setVisible(t){const e=document.getElementById("reactor-card");e&&(e.hidden=!t)}update(t,e,n){this.heldIsotope.textContent=Ot(Math.floor(_i(t,"isotope"))),this.heldAntimatter.textContent=Ot(Math.floor(_i(t,"antimatter"))),this.heldDarkmatter.textContent=Ot(Math.floor(_i(t,"darkmatter")));const s=e.reactorActivity(n);if(s<=0)this.reactorStatus.textContent="待机",this.reactorStatus.className="reactor-status muted";else{const r=Math.round(s*100);this.reactorStatus.textContent=`运行中 ${r}%`,this.reactorStatus.className="reactor-status active"}this.updateBuffs(t,e,n),this.updateExploration(t,e,n),this.updateExchange(t,e)}renderShell(){return`
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
      </div>`}buildBuffRows(){const t=this.byId("reactor-buffs");for(const e of Pu){const n=document.createElement("div");n.className="buff-row",n.innerHTML=`
        <div class="buff-head">
          <span class="buff-name">${e.name}</span>
          <span class="buff-cost" data-cost></span>
        </div>
        <div class="buff-desc">${e.description}</div>
        <div class="buff-active" data-active hidden>
          <div class="buff-bar-track"><div class="buff-bar-fill" data-bar></div></div>
          <span class="buff-remain" data-remain></span>
        </div>
        <button class="btn buff-btn" type="button" data-buff="${e.id}">激活</button>`,t.appendChild(n),this.buffRows.push({defId:e.id,btn:n.querySelector(".buff-btn"),costEl:n.querySelector("[data-cost]"),activeEl:n.querySelector("[data-active]"),bar:n.querySelector("[data-bar]"),remainEl:n.querySelector("[data-remain]")})}t.addEventListener("click",e=>{const n=e.target.closest(".buff-btn");n!=null&&n.dataset.buff&&this.cbs.onActivateBuff(n.dataset.buff)})}buildExploration(){var e;const t=this.byId("reactor-targets");for(const n of ja){const s=document.createElement("button");s.type="button",s.className="target-btn",s.dataset.target=n.id,s.innerHTML=`
        <span class="target-name">${n.name}</span>
        <span class="target-meta">${n.riskLabel}风险 · ${Kn(n.durationMs)} · 产 ${((e=_n(n.reward.resourceId))==null?void 0:e.name)??n.reward.resourceId} ×${n.reward.amount}</span>`,s.addEventListener("click",()=>{this.selectedTarget=n.id,this.refreshTargetSelection()}),t.appendChild(s),this.targetBtns.push(s)}this.refreshTargetSelection(),this.dispatchBtn=document.createElement("button"),this.dispatchBtn.type="button",this.dispatchBtn.className="btn primary dispatch-btn",this.dispatchBtn.textContent="派遣探索",this.dispatchBtn.addEventListener("click",()=>this.cbs.onDispatch(this.selectedTarget)),t.appendChild(this.dispatchBtn),this.exploreStatus=this.byId("reactor-explore-status"),this.exploreStatus.innerHTML=`
      <div class="explore-active" data-explore-active hidden>
        <svg class="explore-ring" viewBox="0 0 60 60" width="60" height="60">
          <circle class="explore-ring-bg" cx="30" cy="30" r="26" />
          <circle class="explore-ring-fg" cx="30" cy="30" r="26" data-ring />
        </svg>
        <div class="explore-info">
          <span class="explore-label" data-explore-label></span>
          <span class="explore-remain" data-explore-remain></span>
        </div>
      </div>`,this.exploreRing=this.exploreStatus.querySelector("[data-ring]"),this.exploreRing.style.strokeDasharray=String(Kl),this.exploreLabel=this.exploreStatus.querySelector("[data-explore-label]"),this.exploreRemain=this.exploreStatus.querySelector("[data-explore-remain]")}buildExchangeRows(){var e;const t=this.byId("reactor-exchange");for(const n of Lu){const s=document.createElement("div");s.className="exchange-row";const r=((e=_n(n.cost.resourceId))==null?void 0:e.name)??n.cost.resourceId,a=n.produces.map(o=>{var c;return`${((c=_n(o.resourceId))==null?void 0:c.name)??o.resourceId} ×${o.amount}`}).join(" + ");s.innerHTML=`
        <div class="exchange-info">
          <span class="exchange-name">${n.name}</span>
          <span class="exchange-flow">${r} ×${n.cost.amount} → ${a}</span>
        </div>
        <button class="btn exchange-btn" type="button" data-recipe="${n.id}">兑换</button>`,t.appendChild(s),this.exchangeRows.push({recipeId:n.id,btn:s.querySelector(".exchange-btn"),costEl:s.querySelector(".exchange-flow")})}t.addEventListener("click",n=>{const s=n.target.closest(".exchange-btn");s!=null&&s.dataset.recipe&&this.cbs.onExchange(s.dataset.recipe)})}updateBuffs(t,e,n){var s;for(const r of this.buffRows){const a=wr[r.defId],o=((s=_n(a.cost.resourceId))==null?void 0:s.name)??a.cost.resourceId;r.costEl.textContent=`${o} ×${a.cost.amount}`;const c=e.getActiveBuff(r.defId);if(c){const l=Math.max(0,c.expiresAt-n),u=a.durationMs,h=u>0?Math.min(100,l/u*100):0;r.activeEl.hidden=!1,r.bar.style.width=`${h}%`,r.remainEl.textContent=Kn(l),r.btn.textContent="运行中",r.btn.disabled=!0,r.btn.classList.add("running")}else{r.activeEl.hidden=!0,r.btn.classList.remove("running");const l=e.canActivateBuff(t,r.defId,n);r.btn.textContent="激活",r.btn.disabled=!l.ok,r.btn.title=l.ok?"":l.reason??""}}}updateExploration(t,e,n){const s=e.getActiveExplorations()[0],r=this.exploreStatus.querySelector("[data-explore-active]");if(s){const a=Cs[s.targetId],o=s.completesAt-s.startedAt,c=Math.min(o,n-s.startedAt),l=o>0?c/o:0,u=Math.max(0,s.completesAt-n);r.hidden=!1,this.exploreRing.style.strokeDashoffset=String(Kl*(1-l)),this.exploreLabel.textContent=a?a.name:s.targetId,this.exploreRemain.textContent=`剩余 ${Kn(u)}`,this.dispatchBtn.disabled=!0,this.dispatchBtn.textContent="探索进行中",this.targetBtns.forEach(h=>h.disabled=!0)}else{r.hidden=!0,this.dispatchBtn.textContent="派遣探索";const a=e.canDispatch(t,this.selectedTarget);this.dispatchBtn.disabled=!a.ok,this.dispatchBtn.title=a.ok?"":a.reason??"",this.targetBtns.forEach(o=>o.disabled=!1)}}updateExchange(t,e){for(const n of this.exchangeRows){const s=e.canExchange(t,n.recipeId);n.btn.disabled=!s.ok,n.btn.title=s.ok?"":s.reason??""}}refreshTargetSelection(){this.targetBtns.forEach(t=>{t.classList.toggle("selected",t.dataset.target===this.selectedTarget)})}byId(t){const e=document.getElementById(t);if(!e)throw new Error(`missing #${t}`);return e}}function Bx(i){return Xi.map((t,e)=>{const n=Xi.indexOf(i),s=e<n?"done":e===n?"current":"pending",r=e<n?"✓":String(e+1);return`<li class="ceremony-step-mark ${s}"><span class="mark">${r}</span><span class="step-name">${Mf[t]}</span></li>`}).join("")}function zx(i,t){const e=Math.max(0,t-i.createdAt),n=tn.map(s=>{const r=i.facilityLevels[s];return`<div class="row"><dt>${nn[s].name}</dt><dd>Lv.${r}</dd></div>`}).join("");return`
    <p class="muted-text">回顾本轮（第 ${i.achievementCount>0,"一世"}）的星际开拓历程：</p>
    <div class="offline-list">
      <div class="row"><dt>游戏时长</dt><dd>${Kn(e)}</dd></div>
      <div class="row"><dt>信用点</dt><dd class="gold">${Ot(i.credits)}</dd></div>
      <div class="row"><dt>星尘矿</dt><dd class="cyan">${Ot(i.stardust)}</dd></div>
      <div class="row"><dt>晶体</dt><dd class="purple">${Ot(i.crystal)}</dd></div>
      <div class="row"><dt>同位素</dt><dd class="cyan">${Ot(i.isotope)}</dd></div>
      <div class="row"><dt>反物质</dt><dd class="cyan">${Ot(i.antimatter)}</dd></div>
      <div class="row"><dt>暗物质</dt><dd class="cyan">${Ot(i.darkmatter)}</dd></div>
    </div>
    <div class="offline-list ceremony-sub">
      <div class="row"><dt>已解锁设施</dt><dd>${i.facilityCount} / ${tn.length}</dd></div>
      ${n}
      <div class="row"><dt>完成研究</dt><dd>${i.researchCount} 项</dd></div>
      <div class="row"><dt>达成成就</dt><dd>${i.achievementCount} 项</dd></div>
    </div>
    <p class="muted-text">转生将重置以上全部进度，换取永久星核加成。</p>`}function Hx(i,t){return`
    <p class="muted-text">星核按本轮资源、设施等级、研究进度综合结算：</p>
    <div class="offline-list">
      ${i.resourceItems.map(n=>`<div class="row"><dt>${n.label} ×${Ot(n.amount)}</dt><dd>× ${n.rate.toFixed(n.rate<.01?4:3)} → <b class="gold">${n.points.toFixed(2)}</b></dd></div>`).join("")}
      <div class="row"><dt>设施等级 Σ(Lv-1) = ${i.facility.totalLevelsAboveOne}</dt><dd>× ${i.facility.rate} → <b class="gold">${i.facility.points}</b></dd></div>
      <div class="row"><dt>研究 ×${i.research.count}</dt><dd>× ${i.research.rate} → <b class="gold">${i.research.points}</b></dd></div>
    </div>
    <div class="ceremony-total">
      <span>总点数</span><b>${i.totalPoints.toFixed(2)}</b>
      <span>星核（向下取整）</span><b class="gold big">+${Ot(i.stardustEarned)}</b>
    </div>
    <p class="muted-text">转生后等级 Lv.${t.newPrestigeLevel}，星核余额 ${Ot(t.newStardustBalance)}。</p>`}function Gx(i,t){const e=t.length>0?t.map(n=>`<div class="row"><dt>${n.name}</dt><dd>${n.description}</dd></div>`).join(""):'<div class="row"><dt>暂无永久加成</dt><dd>转生后可在星核商店解锁永久 buff</dd></div>';return`
    <p class="muted-text">转生后 Lv.${i.newPrestigeLevel}，以下永久加成将生效：</p>
    <div class="offline-list">
      ${e}
    </div>
    <p class="muted-text" style="margin-top:10px">同时将失去：</p>
    <div class="offline-list ceremony-loss">
      <div class="row"><dt>资源归零</dt><dd>${i.resets.resourceIds.length} 项（信用点/星尘/晶体/能量/同位素/反物质/暗物质等）</dd></div>
      <div class="row"><dt>设施重置</dt><dd>${i.resets.facilityCount} 项（等级回到 1）</dd></div>
      <div class="row"><dt>研究清空</dt><dd>${i.resets.researchCount} 项</dd></div>
      <div class="row"><dt>成就清空</dt><dd>${i.resets.achievementCount} 项</dd></div>
    </div>
    <p class="ceremony-warn">此操作不可撤销，确认后将播放转生仪式并进入新的一世。</p>`}function Vx(i){const t=document.getElementById("modal-root");if(!t)return;document.dispatchEvent(new CustomEvent("modal:close"));const e=document.createElement("div");e.className="modal-backdrop ceremony-backdrop";const n=document.createElement("div");n.className="modal ceremony-modal";let s="review",r=!1;const a=()=>{const u=s==="review"?zx(i.review,i.now):s==="settlement"?Hx(i.breakdown,i.preview):Gx(i.preview,i.bonuses);n.innerHTML=`
      <h2>转生仪式</h2>
      <ol class="ceremony-steps">${Bx(s)}</ol>
      <div class="ceremony-body">${u}</div>`},o=document.createElement("div");o.className="modal-actions",e.append(n,o),t.appendChild(e);const c=()=>{r||(r=!0,e.remove(),document.dispatchEvent(new CustomEvent("modal:closed")))},l=()=>{o.innerHTML="";const u=Xi.indexOf(s);if(u>0){const d=document.createElement("button");d.type="button",d.className="btn",d.textContent="上一步",d.addEventListener("click",()=>{s=Xi[u-1],a(),l()}),o.appendChild(d)}const h=document.createElement("button");if(h.type="button",h.className="btn ghost",h.textContent="取消",h.addEventListener("click",()=>{c(),i.handlers.onCancel()}),o.appendChild(h),u<Xi.length-1){const d=document.createElement("button");d.type="button",d.className="btn primary",d.textContent="下一步",d.addEventListener("click",()=>{s=Xi[u+1],a(),l()}),o.appendChild(d)}else{const d=document.createElement("button");d.type="button",d.className="btn primary",d.textContent="确认转生",d.addEventListener("click",()=>{c(),i.handlers.onConfirm()}),o.appendChild(d)}};e.addEventListener("click",u=>{u.target===e&&(c(),i.handlers.onCancel())}),a(),l(),document.dispatchEvent(new CustomEvent("modal:open"))}function Wx(i){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Xx(){try{const t=document.createElement("canvas");t.width=256,t.height=256;const e=t.getContext("2d");if(!e)return;const n=Wx(20260807);e.clearRect(0,0,256,256),e.strokeStyle="rgba(56, 217, 232, 0.08)",e.lineWidth=2;for(let c=0;c<=256;c+=64)e.beginPath(),e.moveTo(c,0),e.lineTo(c,256),e.stroke(),e.beginPath(),e.moveTo(0,c),e.lineTo(256,c),e.stroke();for(let c=0;c<120;c+=1){const l=n()<.5?"56,217,232":"160,107,255";e.fillStyle=`rgba(${l},${.03+n()*.06})`,e.fillRect(Math.floor(n()*256),Math.floor(n()*256),2,2)}const s=e.createRadialGradient(0,0,0,0,0,256);s.addColorStop(0,"rgba(255,255,255,0.045)"),s.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=s,e.fillRect(0,0,256,256);const r=e.createRadialGradient(256,256,0,256,256,256);r.addColorStop(0,"rgba(0,0,0,0.10)"),r.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=r,e.fillRect(0,0,256,256);const a=t.toDataURL("image/png"),o=document.createElement("style");o.textContent=`
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
    `,document.head.appendChild(o)}catch{}}function Fn(i,t,e,n){const s=document.getElementById("modal-root");if(!s)return;document.querySelectorAll(".modal-backdrop").forEach(()=>{document.dispatchEvent(new CustomEvent("modal:close"))});const a=document.createElement("div");a.className="modal-backdrop";const o=document.createElement("div");o.className="modal",o.innerHTML=`<h2>${i}</h2>${t}`;const c=document.createElement("div");c.className="modal-actions";const l=()=>{a.remove(),document.dispatchEvent(new CustomEvent("modal:closed"))};for(const u of e){const h=document.createElement("button");h.type="button",h.className=`btn ${u.className??""}`.trim(),h.textContent=u.label,h.addEventListener("click",()=>u.onClick(l)),c.appendChild(h)}o.appendChild(c),a.appendChild(o),s.appendChild(a),a.addEventListener("click",u=>{u.target===a&&l()}),n==null||n(),document.dispatchEvent(new CustomEvent("modal:open"))}function Go(i,t){const e=`
    <p class="muted-text">离开期间（${Kn(i.effectiveMs)}）矿站自动运行：</p>
    <div class="offline-list">
      <div class="row"><dt>采掘器产出</dt><dd class="cyan">+${Ot(i.summary.producedStardust)} 星尘矿</dd></div>
      <div class="row"><dt>运输线转运</dt><dd class="cyan">+${Ot(i.summary.movedStardust)} 星尘矿</dd></div>
      <div class="row"><dt>精炼厂产出</dt><dd class="purple">+${Ot(i.summary.refinedCrystal)} 晶体</dd></div>
    </div>
    <p class="muted-text" style="margin-top:10px">离线为福利时段，产出不封顶，与在线容量限制不同。</p>`;Fn("离线收益",e,[{label:"确认领取",className:"primary",onClick:n=>{n(),t()}}])}function $x(i,t){const e=`
    <p>当前存档：</p>
    <div class="offline-list">
      <div class="row"><dt>创建时间</dt><dd>${new Date(i.createdAt).toLocaleString("zh-CN")}</dd></div>
      <div class="row"><dt>最近保存</dt><dd>${new Date(i.lastSavedAt).toLocaleString("zh-CN")}</dd></div>
    </div>
    <p class="muted-text">建议定期导出 JSON 备份；浏览器清理数据会丢失存档。</p>
    <input type="file" id="import-file" accept="application/json,.json" hidden />`;Fn("存档管理",e,[{label:"导出 JSON",className:"primary",onClick:n=>{t.onExport(),n()}},{label:"导入 JSON",onClick:()=>{const n=document.getElementById("import-file");n&&n.click()}},{label:"导出节奏数据",onClick:n=>{t.onExportCsv()}},{label:"关闭",onClick:n=>n()}],()=>{const n=document.getElementById("import-file");n==null||n.addEventListener("change",()=>{var r;const s=(r=n.files)==null?void 0:r[0];s&&t.onImport(s),n.value=""})})}function qx(i,t){const e=["excavator","transport","refinery"].map(s=>{const r=i.facilities[s];return`<div class="row"><dt>${s==="excavator"?"采掘器":s==="transport"?"运输线":"精炼厂"}</dt><dd>${r.unlocked?`Lv.${r.level}`:"未解锁"}</dd></div>`}).join(""),n=`
    <p class="muted-text">导入后当前进度将被覆盖，请确认：</p>
    <div class="offline-list">
      <div class="row"><dt>信用点</dt><dd class="gold">${Ot(i.credits)}</dd></div>
      <div class="row"><dt>星尘矿</dt><dd class="cyan">${Ot(i.stardust)}</dd></div>
      <div class="row"><dt>晶体</dt><dd class="purple">${Ot(i.crystal)}</dd></div>
      ${e}
    </div>
    <label style="display:flex;gap:6px;align-items:center;margin-top:10px;color:var(--muted);font-size:12px">
      <input type="checkbox" id="dbg-unlock" /> 解锁全部设施（同时可调整等级）
    </label>`;Fn("导入预览",n,[{label:"确认导入",className:"primary",onClick:s=>{s(),t()}},{label:"取消",onClick:s=>s()}])}document.addEventListener("modal:close",()=>{const i=document.querySelectorAll(".modal-backdrop"),t=i[i.length-1];t&&(t.remove(),document.dispatchEvent(new CustomEvent("modal:closed")))});function Yx(i,t){Fn("里程碑达成",`<p>🎉 ${i}</p><p class="muted-text" style="margin-top:8px">用时 ${Kn(t)}</p>`,[{label:"继续",className:"primary",onClick:e=>e()}])}function Pr(i,t={}){const e=document.getElementById("event-host");if(!e)return;e.querySelectorAll(".event-card").forEach(s=>s.remove());const n=document.createElement("div");if(n.className=`event-card${i==="solar-storm"?" storm":""}`,i==="drone"){n.innerHTML="<h3>✈ 无人机事件</h3><p>选择奖励：A 立即获得 50 信用点；B 所有设施 30 秒内速度 ×1.5。</p>";const s=document.createElement("div");s.className="event-actions";const r=document.createElement("button");r.className="btn",r.textContent="A · +50 信用点";const a=document.createElement("button");if(a.className="btn primary",a.textContent="B · ×1.5 速度 30 秒",s.append(r,a),t.onResearchCenter){const o=document.createElement("button");o.className="btn",o.textContent="C · 发现古代数据核心",o.addEventListener("click",()=>{var c;n.remove(),(c=t.onResearchCenter)==null||c.call(t)}),s.appendChild(o)}n.appendChild(s),r.addEventListener("click",()=>{var o;n.remove(),(o=t.onA)==null||o.call(t)}),a.addEventListener("click",()=>{var o;n.remove(),(o=t.onB)==null||o.call(t)})}else if(i==="invest"){n.innerHTML="<h3>◆ 投入型机会</h3><p>消耗 200 信用点，永久提升采掘速度 +5%（仅一次）。</p>";const s=document.createElement("div");s.className="event-actions";const r=document.createElement("button");r.className="btn primary",r.textContent="投资（-200 信用点）";const a=document.createElement("button");a.className="btn",a.textContent="忽略",s.append(r,a),n.appendChild(s),r.addEventListener("click",()=>{var o;n.remove(),(o=t.onInvest)==null||o.call(t)}),a.addEventListener("click",()=>{var o;n.remove(),(o=t.onIgnore)==null||o.call(t)})}else{n.innerHTML="<h3>☀ 太阳风暴</h3><p>全设施速度降低 20%（均衡策略减半），持续 1 分钟。</p>";const s=document.createElement("div");s.className="event-actions";const r=document.createElement("button");r.className="btn",r.textContent="知道了",s.appendChild(r),n.appendChild(s),r.addEventListener("click",()=>{var a;n.remove(),(a=t.onClose)==null||a.call(t)})}e.appendChild(n),i==="solar-storm"&&window.setTimeout(()=>{n.parentElement&&n.remove()},12e3)}function jx(i,t){const e=r=>[1,2,3,4,5].map(a=>`<option value="${a}"${a===r?" selected":""}>Lv.${a}</option>`).join(""),n=tn.map(r=>{const a=i.facilities[r];return`<label>${nn[r].name}<select id="dbg-lvl-${r}">${e(a.level)}</select></label>`}).join(""),s=`
    <div class="debug-grid">
      <label>信用点<input type="number" id="dbg-credits" value="${Math.round(i.credits)}" /></label>
      <label>星尘矿<input type="number" id="dbg-stardust" value="${Math.round(i.stardust)}" /></label>
      <label>晶体<input type="number" id="dbg-crystal" value="${Math.round(i.crystal)}" /></label>
      ${n}
    </div>
    <label style="display:flex;gap:6px;align-items:center;margin-top:10px;color:var(--muted);font-size:12px">
      <input type="checkbox" id="dbg-unlock" /> 解锁全部设施（同时可调整等级）
    </label>
    <p class="muted-text" style="margin-top:10px">调试改动不会绕过解锁与等级规则；模拟离线会直接结算离线收益。</p>`;Fn("调试面板（~）",s,[{label:"应用数值",className:"primary",onClick:()=>{const r=c=>{const l=document.getElementById(c),u=Number.parseFloat((l==null?void 0:l.value)??"0");return Number.isFinite(u)&&u>=0?u:0},a={};for(const c of tn){const l=document.getElementById(`dbg-lvl-${c}`);a[c]=Number.parseInt((l==null?void 0:l.value)??"1",10)||1}const o=document.getElementById("dbg-unlock");t.onApply({credits:r("dbg-credits"),stardust:r("dbg-stardust"),crystal:r("dbg-crystal"),levels:a,unlockAll:(o==null?void 0:o.checked)??!1})}},{label:"触发无人机事件",onClick:()=>t.onDrone()},{label:"触发太阳风暴",onClick:()=>t.onStorm()},{label:"模拟离线 1 小时",onClick:()=>t.onOffline(1)},{label:"模拟离线 8 小时",onClick:()=>t.onOffline(8)},{label:"关闭",onClick:r=>r()}])}function Kx(i){const n=`
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
    <p class="muted-text">当前坐标：Aurora-1 · 矿站。邻近星系均为未探索区域。</p>`;Fn("星图",n,[{label:"关闭",onClick:s=>s()}])}function mh(i,t){const e=du.map(n=>{const r=$o.filter(a=>a.branch===n).sort((a,o)=>a.tier-o.tier).map(a=>{const o=i.research.includes(a.id),c=a.tier<=2,l=fu(i,a.id),u=o?"done":c?l.ok?"ready":"locked":"future";let h;if(o)h='<span class="tech-status done">已研究</span>';else if(!c)h='<span class="tech-status future">后续开放</span>';else{const p=l.ok?`研究（${a.cost} 晶体）`:l.reason??"";h=`<button class="btn tech-btn" data-tech="${a.id}" ${l.ok?"":"disabled"}>${p}</button>`}const d=a.requires.length>0?`<div class="tech-reqs">前置：${a.requires.map(p=>{var g;return((g=Qi[p])==null?void 0:g.name)??p}).join("、")}</div>`:"";return`<div class="tech-card ${u}" data-tier="${a.tier}">
          <div class="tech-name">${a.name}</div>
          <div class="tech-desc">${a.description}</div>
          ${d}
          <div class="tech-action">${h}</div>
        </div>`}).join("");return`<div class="tech-branch">
      <h3>${xd[n]}</h3>
      <div class="tech-cards">${r}</div>
    </div>`}).join("");Fn("研究中心 · 科技树",e,[{label:"关闭",onClick:n=>n()}],()=>{document.querySelectorAll(".tech-btn").forEach(n=>{n.addEventListener("click",()=>t.onResearch(n.dataset.tech??""))})})}function Zx(i){const t=pu(i),e=mu(i),n=i.prestige,s=n.history.map(c=>{const l=c.baselineSnapshot,u=Object.entries(l.facilityLevels).filter(([,h])=>h>1).map(([h,d])=>{var p;return`${((p=nn[h])==null?void 0:p.name)??h} Lv.${d}`}).join("、");return`<div class="row">
        <dt>第 ${c.sequence} 世</dt>
        <dd>
          <span class="cyan">+${Ot(c.stardustEarned)} 星核</span>
          · ${new Date(c.timestamp).toLocaleString("zh-CN")}
          ${l.researchCount>0?` · 研究 ${l.researchCount}`:""}
          ${l.achievementCount>0?` · 成就 ${l.achievementCount}`:""}
          ${u?` · ${u}`:""}
        </dd>
      </div>`}).join(""),r=`
    <div class="prestige-history-block">
      <h3 class="prestige-history-title">转生进度 · Lv.${n.prestigeLevel}</h3>
      <div class="offline-list">
        <div class="row"><dt>星核余额</dt><dd class="gold">${Ot(n.stardust)}</dd></div>
        <div class="row"><dt>永久加成</dt><dd>${n.unlocked.length} 项</dd></div>
      </div>
      ${n.history.length>0?`
        <h4 class="prestige-history-subtitle">历次转生（${n.history.length}）</h4>
        <div class="offline-list prestige-history-list">${s}</div>
      `:'<p class="muted-text" style="margin:6px 0 0">尚未转生——积累资源与设施等级后可在「转生」入口重置进度换取永久星核。</p>'}
    </div>`,o=["production","construction","tech","event","exploration","hidden"].map(c=>{const l=qo.filter(d=>d.category===c),u=l.filter(d=>i.achievements.includes(d.id)).length,h=l.map(d=>{const p=i.achievements.includes(d.id);return`<div class="ach-row ${p?"done":""}">
            <span class="ach-mark">${p?"✓":"○"}</span>
            <div class="ach-info">
              <div class="ach-name">${d.name}</div>
              <div class="ach-desc">${d.description}</div>
            </div>
            <span class="ach-reward">${Ot(d.rewardCredits)} 信用点 + ${d.rewardCrystals} 晶体</span>
          </div>`}).join("");return`<div class="ach-group">
        <h3>${Md[c]}（${u}/${l.length}）</h3>
        ${h}
      </div>`}).join("");Fn(`成就（${t} 点 · 全局产量 ×${e.toFixed(2)}）`,r+o,[{label:"关闭",onClick:c=>c()}])}function Jx(){Fn("帮助",`
    <h3 class="help-title">资源说明</h3>
    <div class="help-list">
      <div class="help-item"><b class="gold">信用点</b><span>货币：出售矿石、事件奖励获得。用于解锁设施、升级设施、研究科技。</span></div>
      <div class="help-item"><b class="cyan">星尘矿</b><span>基础矿石：采掘器产出。可出售（1 信用点/个），也是精炼晶体的原料。</span></div>
      <div class="help-item"><b class="purple">晶体</b><span>高级资源：精炼厂把 4 星尘矿（配方优化后 3 个）变成 1 晶体。用于科技研究与 3 级以上升级，也可出售（8 信用点/个）。</span></div>
      <div class="help-item"><b class="energy-val">能量</b><span>能源站产出，保证设施运转；不足时全设施减产 20%（过载保护后 10%）。研究「能源储备」后，盈余存入储备池（200），可用「释放储备」获得 30 秒全设施 ×1.2 加成。</span></div>
      <div class="help-item"><b class="cyan">同位素</b><span>稀有资源：采掘时概率获得。当前用于成就收集，后续版本开放合成用途。</span></div>
    </div>
    <h3 class="help-title">玩法速览</h3>
    <div class="help-list">
      <div class="help-item"><b>生产链</b><span>采掘器产出星尘矿 → 运输线转运 → 精炼厂产出晶体 → 出售换信用点或研究科技。</span></div>
      <div class="help-item"><b>能源策略</b><span>快捷键 1 / 2 / 3 切换采掘优先、均衡、精炼优先；影响产量倍率与能量消耗。</span></div>
      <div class="help-item"><b>研究中心</b><span>累计产出 50 晶体 + 解锁第二矿区后，等无人机事件出现「发现古代数据核心」即可解锁科技树。</span></div>
      <div class="help-item"><b>成就</b><span>完成成就获得信用点与晶体，每 10 点成就 +1% 全局产量（永久）。</span></div>
    </div>
    <h3 class="help-title">快捷操作</h3>
    <div class="help-list">
      <div class="help-item"><b>快捷键</b><span>1/2/3 能源策略 · U 升级/解锁 · M 存档 · Esc 关闭弹窗 · ~ 调试面板</span></div>
      <div class="help-item"><b>提示</b><span>把鼠标悬停在顶栏资源上可查看说明；点击场景中的设施可切换查看与操作。</span></div>
    </div>`,[{label:"关闭",onClick:t=>t()}])}function kt(i,t="info"){const e=document.getElementById("toasts");if(!e)return;const n=document.createElement("div");n.className=`toast${t==="error"?" error":""}`,n.textContent=i,e.appendChild(n),window.setTimeout(()=>n.remove(),3200)}const Oa=100,Qx=3e4,Zl=6e4,gh="star-miner-snapshot";let Q,xe="excavator",Ye=null,fr=null;const Vo=[],ty=new Rf,Lr=new cf(ty),_h=new af(Lr,structuredClone),gi=new Ho;let vh,gc,Ps,Ge;function He(i){const t=document.getElementById(i);if(!t)throw new Error(`missing #${i}`);return t}function ka(i){He("save-status").textContent=i}function zi(i){if(Vo.some(e=>e.name===i))return;const t=Date.now()-Q.createdAt;Vo.push({name:i,atMs:t}),console.info(`[里程碑] ${i} 用时 ${Kn(t)}`),Yx(i,t),kt(`达成：${i}`)}function Hi(i){return Q.facilities[i].unlocked?"ONLINE":"LOCKED"}function ey(){return{statuses:{excavator:Hi("excavator"),he3Excavator:Hi("he3Excavator"),deuteriumExcavator:Hi("deuteriumExcavator"),transport:Hi("transport"),refinery:Hi("refinery"),energyStation:Hi("energyStation")},selected:xe,transportActivity:Math.min(1,Qe(Q,"transport")/1),bottlenecks:(Ye==null?void 0:Ye.bottlenecks)??[],transportCongested:(Ye==null?void 0:Ye.transportCongested)??!1,reactorActivity:(Ge==null?void 0:Ge.reactorActivity(Date.now()))??0}}function xh(i){const t=!Q.researchCenterUnlocked&&Q.facilities.he3Excavator.unlocked&&Q.stats.totalCrystalProduced>=qh;Pr("drone",{onA:()=>{const e=Tr(Q,i.id,{choice:"A"});e.ok?(kt(`无人机奖励：+${e.creditsGained} 信用点`),ie("事件")):kt(e.reason??"事件已失效","error")},onB:()=>{const e=Tr(Q,i.id,{choice:"B",now:Date.now()});e.ok?(kt("无人机奖励：全设施 ×1.5 速度 30 秒"),ie("事件")):kt(e.reason??"事件已失效","error")},onResearchCenter:t?()=>{Q.researchCenterUnlocked=!0,kt("研究中心已解锁！打开「研究」页探索科技树"),ie("研究中心")}:void 0})}function ny(i){Sh(),i.kind==="solar-storm"?(Pr("solar-storm"),kt("太阳风暴来袭：全设施速度降低"),ie("事件")):i.kind==="drone"?xh(i):Pr("invest",{onInvest:()=>{const t=Tr(Q,i.id,{confirm:!0});t.ok?kt("投入完成：采掘速度永久 +5%"):kt(t.reason??"投资失败","error"),ie("事件")},onIgnore:()=>{Tr(Q,i.id,{confirm:!1})}})}const yh="starminer-guide-step";let Mh=!1,jn=iy();function iy(){const i=Number.parseInt(sessionStorage.getItem(yh)??"0",10);return Number.isFinite(i)&&i>=0&&i<=4?i:0}function sy(){sessionStorage.setItem(yh,String(jn))}function Dr(){jn<4&&(jn+=1,sy())}const Jl=[{name:"出售矿石",title:"第 1 步：出售矿石",body:"点「交易」区的出售按钮，把星尘矿换成信用点。",target:"market-card"},{name:"升级采掘器",title:"第 2 步：升级采掘器",body:"点「升级（U）」按钮提升采掘产出。",target:"facility-card"},{name:"切换能源策略",title:"第 3 步：切换能源策略",body:"试试切换三种能源策略，观察产出倍率变化。",target:"energy-card"},{name:"解锁运输线",title:"第 4 步：解锁运输线",body:"攒 600 信用点，点击场景中的磁轨运输线（橙色轨道）后解锁。",target:"facility-card"}];function Wo(){var i;for(const t of["market-card","energy-card","facility-card"])(i=document.getElementById(t))==null||i.classList.remove("guide-highlight")}function ry(){var n;const i=He("guide-card");if(Mh||Q.facilities.transport.unlocked||jn>=4){i.hidden=!0,Wo();return}const t=Jl[jn];i.hidden=!1,He("guide-title").textContent=t.title,He("guide-body").textContent=t.body;const e=He("guide-steps");e.innerHTML=Jl.map((s,r)=>{const a=r<jn?"done":r===jn?"current":"pending",o=r<jn?"✓":String(r+1);return`<li class="guide-step ${a}"><span class="guide-step-mark">${o}</span>${s.name}</li>`}).join(""),Wo(),(n=document.getElementById(t.target))==null||n.classList.add("guide-highlight")}function Sh(){const i=He("event-status");i.classList.add("flash"),window.setTimeout(()=>i.classList.remove("flash"),1500)}function ay(){const i=He("event-status"),t=Date.now(),e=Q.eventState.solarStormUntil-t,n=Q.eventState.droneBoostUntil-t,s=i.classList.contains("flash");if(e>0){const r=Q.energyStrategy==="balanced"?"-10%":"-20%";i.textContent=`太阳风暴 ${r} ${Math.ceil(e/1e3)}s`,i.className="stat-value danger"}else n>0?(i.textContent=`无人机加速 ×1.5 ${Math.ceil(n/1e3)}s`,i.className="stat-value boost"):(i.textContent="正常",i.className="stat-value muted");s&&i.classList.add("flash")}let Ba=0;async function ie(i="自动"){const t=++Ba;ka("保存中…"),Q.lastSavedAt=Date.now();try{await Lr.save(Q),t===Ba&&ka(`已保存 ${new Date().toLocaleTimeString("zh-CN",{hour12:!1})}`)}catch{t===Ba&&(ka("保存失败"),kt("保存失败，请检查浏览器存储","error"))}}function Ql(i){try{localStorage.setItem(gh,Eu(i))}catch{}}function tu(){try{const i=localStorage.getItem(gh);if(!i)return null;const t=Tu(i);return t.ok?t.state:null}catch{return null}}function eu(){Rx();const i=Q.facilities[xe];if(!i.unlocked){const n=Td(Q,xe);n.ok?(Lx(),kt(`${nn[xe].name} 已解锁`),xe==="transport"&&(zi("解锁运输线"),Dr()),xe==="refinery"&&zi("建成晶体精炼厂"),xe==="he3Excavator"&&zi("解锁第二矿区"),xe==="deuteriumExcavator"&&zi("解锁第三矿区"),xe==="energyStation"&&zi("解锁能源站"),ie("解锁")):kt(n.reason??"解锁失败","error");return}const t=Qe(Q,xe),e=bd(Q,xe);if(e.ok){const n=Qe(Q,xe);gc.flashUpgrade(t,n),gi.pulseFacility(xe),Px(),kt(`${nn[xe].name} 升至 Lv.${i.level}`),xe==="excavator"&&i.level===2&&(zi("首次升级"),Dr()),ie("升级")}else kt(e.reason??"升级失败","error")}function nu(i){Ad(Q,i),kt(`能源策略：${pr[i]}`),i!=="balanced"&&Dr(),ie("策略")}function oy(i,t){const e=Wa(Q,i,t);e>0&&(kt(`售出获得 ${Ot(e)} 信用点`),Dr()),ie("交易")}function Eh(i){for(const t of i)kt(`成就达成：${t.name}（+${Ot(t.rewardCredits)} 信用点 +${t.rewardCrystals} 晶体）`);i.length>0&&ie("成就")}function bh(){return{onResearch:i=>{var e;const t=Sd(Q,i);t.ok?(kt(`研究完成：${((e=Qi[i])==null?void 0:e.name)??i}`),ie("研究"),Eh(gu(Q)),mh(Q,bh())):kt(t.reason??"研究失败","error")}}}function cy(){if(!Q.researchCenterUnlocked){kt("需先解锁研究中心：累计产出 50 晶体 + 第二矿区，等待无人机事件出现「发现古代数据核心」","error");return}mh(Q,bh())}function ly(){Zx(Q)}function uy(){const i=Date.now(),t=mf(Q,i),e=yf(Q),n=Sf(Q),s=Ef(t.permanentBonuses);Vx({preview:t,breakdown:e,review:n,bonuses:s,now:i,handlers:{onCancel:()=>{},onConfirm:async()=>{const r=await _f(_h,Q,Date.now());if(!r.ok){kt(r.error??"转生失败","error");return}xe="excavator",Ye=null,await gi.playPrestigeSequence(),kt(`转生完成！等级 Lv.${Q.prestige.prestigeLevel}，星核 +${r.stardustEarned}`),ie("转生")}}})}function hy(){Kx(Q)}function za(){$x({createdAt:Q.createdAt,lastSavedAt:Q.lastSavedAt},{onExport:()=>Tf(Q),onImport:i=>void fy(i),onExportCsv:py})}function dy(){jx(Q,{onApply:i=>{Q.credits=i.credits,Q.stardust=i.stardust,Q.crystal=i.crystal;for(const t of tn)Q.facilities[t].level=Math.min(Ur,Math.max(1,i.levels[t])),i.unlockAll&&(Q.facilities[t].unlocked=!0);ie("调试"),kt("调试数值已应用")},onDrone:()=>{const i={id:`ev-debug-${Date.now()}`,kind:"drone",createdAt:Date.now()};Q.eventState.pendingEvent=i,xh(i)},onStorm:()=>{Q.eventState.solarStormUntil=Date.now()+cu,Pr("solar-storm"),Sh(),kt("太阳风暴已触发"),ie("调试")},onOffline:i=>{Q.lastSavedAt=Date.now()-i*3600*1e3;const t=$a(Q,Date.now());t.applied&&Go(t,()=>{}),ie("调试")}})}async function fy(i){const t=await Af(i);if(!t.ok){kt(`导入失败：${t.error}，当前进度保持不变`,"error");return}qx(t.state,()=>{Q=t.state,xe="excavator",Ye=null,ie("导入").then(()=>kt("存档导入成功"))})}function py(){const i="里程碑,用时(秒)",t=Vo.map(e=>`${e.name},${(e.atMs/1e3).toFixed(1)}`);wf("星际矿站_节奏数据.csv",[i,...t].join(`
`)),kt("节奏数据已导出")}function my(i){var t;return((t=_n(i))==null?void 0:t.name)??i}function gy(i){if(!Ge||!Ye)return;const t=Ge.getProductionMult("stardust",i);if(t>1){const n=Ye.producedStardust*(t-1);n>0&&(Q.stardust=Math.max(0,Q.stardust+n),Q.stats.totalStardustProduced+=n)}const e=Ge.getProductionMult("crystal",i);if(e>1){const n=Ye.refinedCrystal*(e-1);n>0&&(Q.crystal=Math.max(0,Q.crystal+n),Q.stats.totalCrystalProduced+=n)}}function _y(){Ps&&Ps.setVisible(ue(Q,"rareIsotopeMining"))}function Th(i){const t=Math.min(i-iu,500);for(iu=i,Ha+=t;Ha>=Oa;){const n=Date.now();if(Ye=Mu(Q,Oa,{now:n}),Ha-=Oa,wd(Q),gy(n),Ge){const s=Ge.tick(Q,n);for(const r of s.completed){const a=Cs[r.targetId],o=a?`${my(a.reward.resourceId)} ×${a.reward.amount}`:"探索奖励";kt(`探索完成：${(a==null?void 0:a.name)??r.targetId}，获得 ${o}`),ie("探索完成")}}}i-su>=1e3&&(su=i,Eh(gu(Q)));const e=Dd(Q,Date.now());e&&ny(e),vh.update(Q),gc.update(Q,xe,Ye),Ps&&Ge&&Ps.update(Q,Ge,Date.now()),ay(),ry(),_y(),gi.sync(ey()),requestAnimationFrame(Th)}let iu=performance.now(),Ha=0,su=0,Sr=null;function vy(){Sr!==null&&(clearInterval(Sr),Sr=null)}async function xy(){rx(),wx();try{const c=await Lr.load();c?Q=c:Q=tu()??Rc(Date.now())}catch(c){Q=tu()??Rc(Date.now()),kt(`无法读取浏览器存档：${c instanceof Error?c.message:"未知错误"}，已尝试恢复快照`,"error")}Xx(),vh=new Dx,He("version-label").textContent=`Web 原型 ${Lh}`,He("btn-guide-close").addEventListener("click",()=>{Mh=!0,He("guide-card").hidden=!0,Wo()}),gc=new Ox({onFacilityAction:eu,onEnergy:nu,onSell:oy,onReleaseEnergy:()=>{const c=Rd(Q,Date.now());c.ok?(kt("储备释放：30 秒全设施 ×1.2"),ie("释放")):kt(c.reason??"无法释放储备","error")},onAutoSell:(c,l,u)=>{const h=c==="stardust"?"星尘矿":"晶体";c==="stardust"?(Q.settings.autoSellStardust=l,Q.settings.stardustKeepAmount=u):(Q.settings.autoSellCrystal=l,Q.settings.crystalKeepAmount=u),kt(l?`${h}自动出售已开启（保留 ${u} 个）`:`${h}自动出售已关闭`),ie("设置")}});const i=new rf(_h);Ge=new uf(i),Ps=new kx({onActivateBuff:async c=>{const l=wr[c],u=await Ge.activateBuff(Q,c,Date.now());u.ok?(kt(`${(l==null?void 0:l.name)??"buff"} 已激活`),ie("反应堆")):kt(u.reason??"激活失败","error")},onDispatch:async c=>{const l=Cs[c],u=await Ge.dispatchExploration(Q,c,Date.now());u.ok?(kt(`已派遣：${(l==null?void 0:l.name)??c}`),ie("反应堆")):kt(u.reason??"派遣失败","error")},onExchange:async c=>{const l=Ka[c],u=await Ge.exchange(Q,c);u.ok?(kt(`${(l==null?void 0:l.name)??"兑换"} 完成`),ie("反应堆")):kt(u.reason??"兑换失败","error")}}),Q.createdAt===Q.lastSavedAt&&!Q.facilities.transport.unlocked&&Q.credits===100&&kt("提示：出售星尘矿可赚信用点，先解锁运输线（600），再建精炼厂（1000）；点击场景设施可查看详情");const e=Date.now(),n=e-Q.lastSavedAt>=Zl?$a(Q,e):null;n!=null&&n.applied&&(Go(n,()=>{}),ie("离线结算"));const s=He("scene-host"),r=He("scene-labels");gi.init(s,r,{onSelect:c=>{xe=c??"excavator"}}),gi.start(),He("btn-save-modal").addEventListener("click",za),document.querySelectorAll(".nav-btn").forEach(c=>{c.addEventListener("click",()=>{const l=c.dataset.page;if(l==="save")za();else if(l==="starmap")hy();else if(l==="research")cy();else if(l==="achievements")ly();else if(l==="prestige")uy();else if(l==="reactor"){if(!ue(Q,"rareIsotopeMining")){kt("需先完成「稀有同位素开采」研究","error");return}const u=document.getElementById("reactor-card");u&&!u.hidden&&u.scrollIntoView({behavior:"smooth",block:"nearest"})}else l==="help"&&Jx()})});const a=He("btn-sfx"),o=()=>{a.textContent=ql()?"音效：开":"音效：关",a.classList.toggle("sfx-off",!ql())};a.addEventListener("click",()=>{Cx(),o()}),o(),bf({onStrategy:nu,onUpgrade:eu,onCloseModal:()=>document.dispatchEvent(new Event("modal:close")),onOpenSave:za,onDebug:dy}),Sr=window.setInterval(()=>void ie("定时"),Qx),document.addEventListener("visibilitychange",()=>{if(document.hidden)fr=Date.now(),ie("隐藏");else if(fr!==null){const c=Date.now()-fr;if(fr=null,c>Zl){const l=$a(Q,Date.now());l.applied&&(Go(l,()=>{}),ie("离线结算"))}}}),window.addEventListener("beforeunload",()=>{Q.lastSavedAt=Date.now(),Ql(Q),Lr.save(Q),vy()}),window.addEventListener("pagehide",()=>{Q.lastSavedAt=Date.now(),Ql(Q)}),document.addEventListener("modal:open",()=>gi.setPaused(!0)),document.addEventListener("modal:closed",()=>gi.setPaused(!1)),requestAnimationFrame(Th),ie("启动")}xy();
