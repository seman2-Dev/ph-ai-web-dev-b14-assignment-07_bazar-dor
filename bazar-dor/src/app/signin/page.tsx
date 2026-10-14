import Link from "next/link";
import AuthForm from "@/components/AuthForm";
export default function SignIn(){
    return <div className="container py-12 min-h-[65vh]">
        <div className="max-w-md mx-auto text-center">
            <h1 className="text-3xl font-black">সাইন ইন</h1>
            <p className="text-[#7d8980] mt-2 mb-6">বিস্তারিত দাম ও প্রোফাইল দেখতে সাইন ইন করুন</p>
            <AuthForm mode="signin"/>
        </div>
        <p className="text-sm text-[#7d8980] mt-5 text-center">
        <Link className="text-[#12844c] font-bold" href="/#">← হোম পেজে ফিরে যান</Link>
        </p>
</div>}