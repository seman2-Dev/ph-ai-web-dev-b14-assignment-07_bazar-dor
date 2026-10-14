import Link from "next/link";
import {headers} from "next/headers";
import {notFound, redirect} from "next/navigation";
import {money,pct} from "@/app/lib/products";
import {getProductBySlug} from "@/app/lib/api";
import {auth} from "@/app/lib/auth";

export const instant = false;

export default async function ProductPage({params}:{params:Promise<{slug:string}>}){
    const {slug}=await params;
    const session=await auth.api.getSession({headers:await headers()});
    if(!session)redirect(`/signin?redirected=1&callbackUrl=${encodeURIComponent(`/product/${slug}`)}`);
    const p=await getProductBySlug(slug);if(!p)notFound();
    const min=Math.min(...p.markets.map(m=>m.min)),max=Math.max(...p.markets.map(m=>m.max)),avg=Math.round(p.markets.reduce((s,m)=>s+m.avg,0)/p.markets.length);
    return <div className="container py-8 min-h-[65vh]">
        <div className="text-sm text-[#7d8980] mb-4">
            <Link href="/">হোম</Link>　›　
            <Link href={`/category/${p.category}`}>{p.categoryName}</Link>　›　{p.name}</div>
            <section className="surface p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5">
                <div className="w-20 h-20 rounded-2xl bg-[#f0f6f0] flex items-center justify-center text-5xl">{p.emoji}</div><div className="flex-1">
                    <h1 className="text-3xl font-black">{p.name}</h1>
                    <p className="text-[#77847a] mt-2">{p.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                        <span className="bg-[#e4f4e9] text-[#16804a] rounded-full px-3 py-1 text-sm">{p.categoryName}</span>
                        <span className="bg-gray-100 rounded-full px-3 py-1 text-sm">{p.unit}</span>
                    </div>
                </div>
            <div className="rounded-2xl bg-[#f0f6f0] p-5 text-center min-w-36">
                <p className="text-sm text-[#7d8980]">আজকের দাম</p>
                <strong className="text-3xl">{money(p.price)}</strong>
                <p>টাকা</p>
                <span className={p.change<0?"text-green-700":"text-red-600"}>{p.change>0?"▲":p.change<0?"▼":"—"} {pct(p.change)}</span>
            </div>
            </section>
            <section className="surface p-5 sm:p-7 mt-5">
                <h2 className="text-xl font-extrabold mb-4">দামের সারসংক্ষেপ</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">{[["সর্বনিম্ন দাম",min,"text-green-700"],["সর্বোচ্চ দাম",max,"text-red-600"],["গড় দাম",avg,"text-green-700"]].map(([label,value,color])=><div key={String(label)} className="border border-[#e4ebe5] rounded-xl p-4"><p className="text-sm text-[#7d8980]">{label}</p><strong className={`text-2xl ${color}`}>{money(Number(value))} টাকা</strong>
                <p className="text-xs text-[#7d8980] mt-1">{p.unit}</p></div>)}</div>
                <h2 className="text-xl font-extrabold mt-7 mb-3">বাজারভিত্তিক আজকের দাম</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left"><thead>
                        <tr className="bg-[#f1f6f1]">
                            <th className="p-3">বাজার</th><th className="p-3">বিভাগ</th>
                            <th className="p-3">সর্বনিম্ন</th>
                            <th className="p-3">সর্বোচ্চ</th>
                            <th className="p-3">গড়</th>
                        </tr>
                        </thead>
                        <tbody>{p.markets.map(m=><tr key={m.name} className="border-b border-[#e6ece7]"><td className="p-3 font-semibold">{m.name}</td><td className="p-3">{m.district}</td>
                            <td className="p-3">{money(m.min)} টাকা</td>
                            <td className="p-3">{money(m.max)} টাকা</td>
                            <td className="p-3">{money(m.avg)} টাকা</td>
                        </tr>)}
                    </tbody></table></div>
            </section>
            <p className="text-xs text-[#89948c] mt-4">দ্রষ্টব্য: বাজারদর API থেকে নেওয়া হয়েছে। তথ্য আপডেটের সময় API সরবরাহকারীর আপডেট-চক্রের ওপর নির্ভরশীল।</p></div>}