import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { money,pct } from "@/app/lib/products";
import { banglaDate } from "@/app/lib/date";
import {getCategories,getProducts} from "@/app/lib/api";
import AuthNav from "@/components/AuthNav";
import CategoryNav from "@/components/CategoryNav";
export default async function Header(){
 const [categories,products,date]=await Promise.all([getCategories(),getProducts(),banglaDate()]);
 const ticker=[...products,...products];
 return <header className="bg-white border-b border-[#e2ebe4]">
    <div className="container flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3">
            <span className="bg-[#12844c] text-white rounded-xl w-11 h-11 flex items-center justify-center"><ShoppingCart size={23}/></span>
            <span><strong className="block text-xl leading-tight">বাজার দর</strong><small className="text-xs text-[#78847c]">{date}</small></span>
        </Link>
   <div className="flex items-center gap-2 text-sm">
       <AuthNav/>
    </div>
    </div>
    <CategoryNav categories={categories}/>
    <div className="ticker overflow-hidden border-t border-b border-[#e3ebe4] bg-[#fbfdfb] py-2">
        <div className="flex w-max animate-[ticker_55s_linear_infinite]">{ticker.map((p,i)=>
            <span key={`${p.id}-${i}`} className="px-5 border-r border-[#edf1ed] whitespace-nowrap text-sm"><span className="mr-2">{p.emoji}</span>{p.name} <b>{money(p.price)} টাকা/{p.unit.replace("প্রতি ","")}</b> <strong className={p.change>0?"text-green-700":p.change<0?"text-red-600":"text-[#7d8980]"}>{p.change>0?"▲":p.change<0?"▼":"—"} {pct(p.change)}</strong></span>)}
        </div>
    </div>
    <style>{`@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
 </header>
}