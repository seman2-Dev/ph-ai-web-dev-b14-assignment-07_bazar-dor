 "use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function AuthForm({mode}:{mode:"signin"|"signup"}){const [name,setName]=useState("");const [email,setEmail]=useState("");const [password,setPassword]=useState("");const router=useRouter();const signup=mode==="signup";
function submit(e:React.FormEvent){e.preventDefault();if(!email.includes("@")||password.length<8||(signup&&!name.trim())){toast.error("সঠিক তথ্য দিন। পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");return}toast.error("Authentication এখনো কনফিগার করা হয়নি। Better Auth সেটআপ করুন।")}
return <form onSubmit={submit} className="surface text-left p-6 space-y-4">{signup&&<label className="block text-sm font-semibold">নাম<input className="field mt-2" value={name} onChange={e=>setName(e.target.value)} placeholder="আপনার নাম" autoComplete="name"/>
    </label>}<label className="block text-sm font-semibold">ইমেইল<input className="field mt-2" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@example.com" autoComplete="email"/></label>
    <label className="block text-sm font-semibold">পাসওয়ার্ড<input className="field mt-2" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="কমপক্ষে ৮ অক্ষর" autoComplete={signup?"new-password":"current-password"}/></label>
    <button className="btn btn-primary w-full" type="submit">{signup?"অ্যাকাউন্ট তৈরি করুন":"সাইন ইন"}</button>
    
    <div className="text-center text-xs text-[#849087]">অথবা</div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button type="button" onClick={()=>toast("Google provider সেটআপ করতে হবে।")} className="btn inline-flex min-w-0 w-full items-center justify-center gap-2 text-center text-sm">
            <svg aria-hidden="true" className="size-4 shrink-0" viewBox="0 0 24 24"><path fill="#4285F4" d="M21.35 12.27c0-.71-.06-1.4-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.15c1.84-1.69 2.9-4.18 2.9-7.22Z"/><path fill="#34A853" d="M12 21.7c2.63 0 4.84-.87 6.45-2.36l-3.15-2.45c-.87.58-1.98.92-3.3.92-2.54 0-4.7-1.72-5.47-4.03H3.27v2.53A9.74 9.74 0 0 0 12 21.7Z"/><path fill="#FBBC05" d="M6.53 13.78A5.85 5.85 0 0 1 6.23 12c0-.62.11-1.22.3-1.78V7.69H3.27A9.72 9.72 0 0 0 2.25 12c0 1.56.37 3.04 1.02 4.31l3.26-2.53Z"/><path fill="#EA4335" d="M12 6.19c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.17 14.63 2.3 12 2.3a9.74 9.74 0 0 0-8.73 5.39l3.26 2.53C7.3 7.91 9.46 6.19 12 6.19Z"/></svg>
            <span className="text-[10px]">Google দিয়ে চালিয়ে যান</span>
        </button>
        <button type="button" onClick={()=>toast("GitHub provider সেটআপ করতে হবে।")} className="btn inline-flex min-w-0 w-full items-center justify-center gap-2 text-center text-sm">
            <svg aria-hidden="true" className="size-4 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 7.01a9.6 9.6 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>
            <span className="text-[10px]">GitHub দিয়ে চালিয়ে যান</span>
        </button>
    </div>
    {signup ? <p className="text-sm text-[#7d8980] mt-5 text-center">ইতিমধ্যে অ্যাকাউন্ট আছে? <Link className="text-[#12844c] font-bold" href="/signin">সাইন ইন করুন</Link></p> : <p className="text-sm text-[#7d8980] mt-5 text-center">অ্যাকাউন্ট নেই? <Link className="text-[#12844c] font-bold" href="/signup">সাইন আপ করুন</Link></p>}
</form>}