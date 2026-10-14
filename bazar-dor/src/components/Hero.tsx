import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import {getProducts} from "@/app/lib/api";
import {banglaDate} from "@/app/lib/date";
import heroImg from "../app/assets/bazar-hero.png";


const HeroPage = async () => {
   const [products,date]=await Promise.all([getProducts(),banglaDate()]);
 const risers=[...products].filter(p=>p.change>0).sort((a,b)=>b.change-a.change).slice(0,6);
 const fallers=[...products].filter(p=>p.change<0).sort((a,b)=>a.change-b.change).slice(0,6);

    return (
        <div className="container py-7">
  <section className="surface p-6 sm:p-9 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
   <div className="max-w-2xl"><span className="inline-block rounded-full bg-[#e4f4e9] text-[#16804a] px-3 py-1 text-xs font-bold mb-3">সর্বশেষ বাজারদর • {date}</span><h1 className="hero-title text-3xl sm:text-4xl font-black leading-tight">আজকের বাজারের দাম এক নজরে</h1><p className="text-[#77847a] mt-4 leading-7">চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম। বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।</p><a href="#সব-পণ্য" className="btn btn-primary mt-6">⚖️ বাজার দেখুন</a></div>
   <div className="shrink-0 text-[115px] sm:text-[145px] drop-shadow-sm" aria-label="বাজারের ঝুড়ি"><Image src={heroImg} alt="বাজারের ঝুড়ি" width={300} height={300}></Image></div>
  </section>
   <section className="mt-9"><h2 className="section-title mb-4"><span className="text-green-700">▲</span> আজ দাম বেড়েছে</h2><div className="product-grid">{risers.map(p=><ProductCard key={p.id} product={p}/>)}</div></section>
   <section className="mt-9"><h2 className="section-title mb-4"><span className="text-red-600">▼</span> আজ দাম কমেছে</h2><div className="product-grid">{fallers.map(p=><ProductCard key={p.id} product={p}/>)}</div></section>

    <section id="সব-পণ্য" className="mt-10 scroll-mt-5"><h2 className="section-title">সব পণ্য</h2><p className="text-sm text-[#849087] mt-1 mb-4">মোট {products.length}টি পণ্য দেখানো হচ্ছে </p><div className="product-grid">{products.map(p=><ProductCard key={p.id} product={p}/>)}</div></section>
 </div>
    );
};

export default HeroPage;