 "use client";
import {useMemo,useState} from "react";
import ProductCard from "@/components/ProductCard";
import type {Product} from "@/lib/products";
export default function SortableProducts({items}:{items:Product[]}) {
 const [sort,setSort]=useState("default");
 const sorted=useMemo(()=>{const copy=[...items];if(sort==="asc")copy.sort((a,b)=>a.price-b.price);if(sort==="desc")copy.sort((a,b)=>b.price-a.price);return copy},[items,sort]);
 return <><div className="surface mt-5 p-4 flex justify-end items-center gap-3"><label htmlFor="sort" className="text-sm text-[#768178]">সাজান:</label><select id="sort" className="field max-w-56" value={sort} onChange={e=>setSort(e.target.value)}><option value="default">ডিফল্ট</option><option value="asc">দাম: কম থেকে বেশি</option><option value="desc">দাম: বেশি থেকে কম</option></select></div><p className="text-sm text-[#849087] my-4">মোট {sorted.length}টি পণ্য পাওয়া গেছে</p>{sorted.length?<div className="product-grid">{sorted.map(p=><ProductCard key={p.id} product={p}/>)}</div>:<div className="surface text-center p-12">এই বিভাগে কোনো পণ্য পাওয়া যায়নি</div>}</>
}