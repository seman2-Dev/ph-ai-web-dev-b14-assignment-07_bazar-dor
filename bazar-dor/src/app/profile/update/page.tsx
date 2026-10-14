 "use client";
import {useState} from "react";import {useRouter} from "next/navigation";import toast from "react-hot-toast";
import {authClient, useSession} from "@/app/lib/auth-client";
export default function UpdateProfile(){
    const [isSubmitting,setIsSubmitting]=useState(false);
    const router=useRouter();
    const {data:session,isPending}=useSession();
    const sessionUser=(session as {user?:{name?:string|null}}|null)?.user;

    async function submit(e:React.SyntheticEvent<HTMLFormElement>){
        e.preventDefault();
        const formData=new FormData(e.currentTarget);
        const trimmedName=String(formData.get("name")||"").trim();
        if(!trimmedName){toast.error("নাম লিখুন।");return}
        setIsSubmitting(true);
        const {error}=await authClient.updateUser({name:trimmedName});
        setIsSubmitting(false);
        if(error){toast.error(error.message||"তথ্য আপডেট করা যায়নি।");return}
        toast.success("তথ্য আপডেট হয়েছে।");
        router.push("/profile");
        router.refresh();
    }

    if(isPending){return <div className="container py-12 min-h-[60vh] max-w-xl"><div className="surface h-36 animate-pulse"/></div>}
    if(!sessionUser){return <div className="container py-12 min-h-[60vh] max-w-xl"><h1 className="text-3xl font-black mb-5">তথ্য আপডেট</h1><div className="surface p-6"><p className="text-[#7d8980]">তথ্য আপডেট করতে আগে সাইন ইন করুন।</p><a className="btn btn-primary mt-5" href="/signin">সাইন ইন</a></div></div>}
    return <div className="container py-12 min-h-[60vh] max-w-xl">
        <h1 className="text-3xl font-black mb-5">তথ্য আপডেট</h1>
        <form className="surface p-6" onSubmit={submit}>
            <label className="block font-semibold text-sm">নাম<input key={sessionUser?.name||"empty-name"} className="field mt-2" name="name" defaultValue={sessionUser?.name||""} placeholder="আপনার নাম"/></label>
            <button className="btn btn-primary mt-4" type="submit" disabled={isSubmitting}>{isSubmitting?"আপডেট হচ্ছে...":"তথ্য আপডেট করুন"}</button>
        </form>
    </div>}