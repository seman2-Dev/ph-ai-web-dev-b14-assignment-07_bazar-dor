"use client";
import Link from "next/link";
import Image from "next/image";
import {useState} from "react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {authClient, signOut, useSession} from "@/app/lib/auth-client";
type SessionUser={name?:string|null;email:string;image?:string|null};
export default function Profile(){
    const router=useRouter();
    const [isSubmitting,setIsSubmitting]=useState(false);
    const [isSigningOut,setIsSigningOut]=useState(false);
    const {data:session,isPending}=useSession();
    const user=(session as {user?:SessionUser}|null)?.user;
    if(isPending){return <div className="container py-12 min-h-[60vh] max-w-2xl"><div className="surface h-36 animate-pulse"/></div>}
    if(!user){return <div className="container py-12 min-h-[60vh] max-w-2xl"><h1 className="text-3xl font-black mb-5">আমার প্রোফাইল</h1><div className="surface p-6"><p className="text-[#7d8980]">প্রোফাইল দেখতে আগে সাইন ইন করুন।</p><Link className="btn btn-primary mt-5" href="/signin">সাইন ইন</Link></div></div>}
    const initials=(user.name||user.email||"U").trim().slice(0,1).toUpperCase();
    async function updateName(e:React.SyntheticEvent<HTMLFormElement>){
        e.preventDefault();
        const formData=new FormData(e.currentTarget);
        const nameValue=formData.get("name");
        const trimmedName=typeof nameValue==="string"?nameValue.trim():"";
        if(!trimmedName){toast.error("নাম লিখুন।");return}
        setIsSubmitting(true);
        const {error}=await authClient.updateUser({name:trimmedName});
        setIsSubmitting(false);
        if(error){toast.error(error.message||"তথ্য আপডেট করা যায়নি।");return}
        toast.success("তথ্য আপডেট হয়েছে।");
        router.refresh();
    }
    async function handleSignOut(){
        setIsSigningOut(true);
        const {error}=await signOut({fetchOptions:{}});
        if(error){setIsSigningOut(false);toast.error(error.message||"সাইন আউট করা যায়নি।");return}
        toast.success("সাইন আউট হয়েছে।");
        router.push("/");
        router.refresh();
    }
    return <div className="container py-12 min-h-[60vh] max-w-2xl">
        <div className="mb-5 flex items-center justify-between gap-4">
            <h1 className="text-3xl font-black">আমার প্রোফাইল</h1>
            <button className="btn" type="button" onClick={handleSignOut} disabled={isSigningOut}>{isSigningOut?"সাইন আউট হচ্ছে...":"সাইন আউট"}</button>
        </div>
        <div className="surface p-6">
            <div className="flex items-center gap-4">
                {user.image ? <Image src={user.image} alt="" width={64} height={64} unoptimized className="size-16 rounded-full object-cover"/> : 
                <span className="flex size-16 items-center justify-center rounded-full bg-[#dcefe1] text-2xl font-bold text-[#12844c]">{initials}</span>}
                <div><h2 className="text-xl font-bold">{user.name||"নাম যোগ করা হয়নি"}</h2>
                <p className="text-[#7d8980]">{user.email}</p>
                </div>
            </div>
        </div>
        <form className="surface mt-4 p-6" onSubmit={updateName}>
            <h2 className="text-xl font-bold">নাম পরিবর্তন করুন</h2>
            <label className="mt-4 block text-sm font-semibold">নাম<input key={user.name||"empty-name"} className="field mt-2" name="name" defaultValue={user.name||""} placeholder="আপনার নাম"/></label>
            <button className="btn btn-primary mt-4" type="submit" disabled={isSubmitting}>{isSubmitting?"আপডেট হচ্ছে...":"তথ্য আপডেট করুন"}</button>
        </form>
    </div>}