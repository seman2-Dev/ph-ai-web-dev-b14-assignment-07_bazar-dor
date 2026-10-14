export type Product = {
  id:number; slug:string; name:string; category:string; categoryName:string; emoji:string;
  unit:string; price:number; change:number; description:string;
  markets:{name:string;district:string;min:number;avg:number;max:number}[];
};

const marketNames = [
  ["সাহেব বাজার","রাজশাহী"],["কারওয়ান বাজার","ঢাকা"],["রিয়াজউদ্দিন বাজার","চট্টগ্রাম"],
  ["নিউ মার্কেট","খুলনা"],["বন্দর বাজার","সিলেট"],["মাছ বাজার","ময়মনসিংহ"]
];
function markets(price:number){return marketNames.map(([name,district],i)=>{const min=Math.round(price*(.88+i*.012));const max=Math.round(price*(1.05+i*.015));return {name,district,min,avg:Math.round((min+max)/2),max}})}

export const products:Product[]=[
{id:1,slug:"shornomoshuri-rice",name:"স্বর্ণমাছি চাল",category:"chal",categoryName:"চাল",emoji:"🍚",unit:"প্রতি কেজি",price:148,change:2.1,description:"বাজারে স্বর্ণমাছি চালের আজকের গড় খুচরা মূল্য।",markets:markets(148)},
{id:2,slug:"miniket-rice",name:"মিনিকেট চাল",category:"chal",categoryName:"চাল",emoji:"🍚",unit:"প্রতি কেজি",price:99,change:-1.9,description:"মিনিকেট চালের বাজারদর ও বিভিন্ন বাজারের তুলনা।",markets:markets(99)},
{id:3,slug:"najirshail-rice",name:"নাজিরশাইল চাল",category:"chal",categoryName:"চাল",emoji:"🍚",unit:"প্রতি কেজি",price:98,change:0,description:"নাজিরশাইল চালের সর্বশেষ বাজারদর।",markets:markets(98)},
{id:4,slug:"bari-mota-rice",name:"বাঁশি সাইজ চাল",category:"chal",categoryName:"চাল",emoji:"🍚",unit:"প্রতি কেজি",price:66,change:0.5,description:"প্রতিদিনের চালের বাজারদর।",markets:markets(66)},
{id:5,slug:"mosur-dal",name:"মসুর ডাল",category:"dal",categoryName:"ডাল",emoji:"🫘",unit:"প্রতি কেজি",price:142,change:1.2,description:"মসুর ডালের আজকের খুচরা বাজারদর।",markets:markets(142)},
{id:6,slug:"mug-dal",name:"মুগ ডাল",category:"dal",categoryName:"ডাল",emoji:"🫘",unit:"প্রতি কেজি",price:135,change:0,description:"মুগ ডালের বাজারদরের তুলনা।",markets:markets(135)},
{id:7,slug:"chola",name:"ছোলা",category:"dal",categoryName:"ডাল",emoji:"🫘",unit:"প্রতি কেজি",price:120,change:-1.8,description:"ছোলার বর্তমান বাজারদর।",markets:markets(120)},
{id:8,slug:"onion",name:"পেঁয়াজ",category:"vegetable",categoryName:"সবজি",emoji:"🧅",unit:"প্রতি কেজি",price:54,change:2.5,description:"দেশি পেঁয়াজের আজকের বাজারদর।",markets:markets(54)},
{id:9,slug:"potato",name:"আলু",category:"vegetable",categoryName:"সবজি",emoji:"🥔",unit:"প্রতি কেজি",price:30,change:-6.1,description:"আলুর বাজারদর ও বাজারভিত্তিক তুলনা।",markets:markets(30)},
{id:10,slug:"eggplant",name:"বেগুন",category:"vegetable",categoryName:"সবজি",emoji:"🍆",unit:"প্রতি কেজি",price:88,change:4.8,description:"বেগুনের দৈনিক বাজারদর।",markets:markets(88)},
{id:11,slug:"green-chili",name:"কাঁচামরিচ",category:"vegetable",categoryName:"সবজি",emoji:"🌶️",unit:"প্রতি কেজি",price:92,change:-4.8,description:"কাঁচামরিচের বাজারদর।",markets:markets(92)},
{id:12,slug:"garlic",name:"রসুন",category:"vegetable",categoryName:"সবজি",emoji:"🧄",unit:"প্রতি কেজি",price:152,change:-0.8,description:"রসুনের বাজারদর।",markets:markets(152)},
{id:13,slug:"cucumber",name:"শসা",category:"vegetable",categoryName:"সবজি",emoji:"🥒",unit:"প্রতি কেজি",price:38,change:0,description:"শসার বাজারদর।",markets:markets(38)},
{id:14,slug:"ilish",name:"ইলিশ মাছ",category:"fish",categoryName:"মাছ",emoji:"🐟",unit:"প্রতি কেজি",price:1850,change:2.9,description:"ইলিশ মাছের আনুমানিক খুচরা বাজারদর।",markets:markets(1850)},
{id:15,slug:"rui",name:"রুই মাছ",category:"fish",categoryName:"মাছ",emoji:"🐟",unit:"প্রতি কেজি",price:460,change:1.1,description:"রুই মাছের বাজারদর।",markets:markets(460)},
{id:16,slug:"broiler",name:"ব্রয়লার মুরগি",category:"meat",categoryName:"মাংস",emoji:"🍗",unit:"প্রতি কেজি",price:225,change:-1.6,description:"ব্রয়লার মুরগির বাজারদর।",markets:markets(225)},
{id:17,slug:"eggs",name:"ডিম",category:"egg",categoryName:"ডিম",emoji:"🥚",unit:"প্রতি ডজন",price:158,change:0.9,description:"ডিমের ডজনের বাজারদর।",markets:markets(158)},
{id:18,slug:"soybean-oil",name:"সয়াবিন তেল",category:"oil",categoryName:"তেল",emoji:"🫙",unit:"প্রতি লিটার",price:185,change:0.6,description:"সয়াবিন তেলের প্রতি লিটারের বাজারদর।",markets:markets(185)}
];

export const categories=[{slug:"chal",name:"চাল",emoji:"🍚"},{slug:"dal",name:"ডাল",emoji:"🫘"},{slug:"oil",name:"তেল",emoji:"🫙"},{slug:"vegetable",name:"সবজি",emoji:"🥬"},{slug:"fish",name:"মাছ",emoji:"🐟"},{slug:"meat",name:"মাংস",emoji:"🍗"},{slug:"egg",name:"ডিম",emoji:"🥚"}];

export const money=(n:number)=>new Intl.NumberFormat("bn-BD",{maximumFractionDigits:0}).format(n);
export const pct=(n:number)=>new Intl.NumberFormat("bn-BD",{maximumFractionDigits:1}).format(Math.abs(n))+"%";
