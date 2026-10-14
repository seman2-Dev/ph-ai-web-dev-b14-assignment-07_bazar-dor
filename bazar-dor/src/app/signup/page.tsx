import Link from "next/link";
import AuthForm from "@/components/AuthForm";
export default function SignUp(){return <div className="container py-12 min-h-[65vh]">
    <div className="max-w-md mx-auto text-center"><h1 className="text-3xl font-black">সাইন আপ</h1>
        <p className="text-[#7d8980] mt-2 mb-6">বাজার দর ব্যবহার করতে অ্যাকাউন্ট তৈরি করুন</p><AuthForm mode="signup"/>
        <p className="text-sm text-[#7d8980] mt-5"><Link className="text-[#12844c] font-bold" href="/">← হোম পেজে ফিরে যান</Link></p>
    </div>
</div>}