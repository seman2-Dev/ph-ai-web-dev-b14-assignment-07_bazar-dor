import Link from "next/link";
export default function NotFound(){
    return <div className="container min-h-[60vh] flex items-center justify-center py-16">
        <div className="surface p-10 text-center max-w-lg w-full">
            <div className="text-6xl mb-4">🔎</div>
            <p className="text-5xl font-black text-[#12844c]">404</p>
            <h1 className="text-2xl font-bold mt-3">পেজটি খুঁজে পাওয়া যায়নি</h1>
            <p className="text-[#7d8980] mt-2">ঠিকানা পরীক্ষা করুন অথবা হোম পেজে ফিরে যান।</p>
            <Link href="/" className="btn btn-primary mt-6">হোম পেজে ফিরে যান</Link>
        </div>
    </div>}