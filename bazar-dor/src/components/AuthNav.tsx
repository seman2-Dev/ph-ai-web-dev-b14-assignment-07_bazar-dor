"use client";

import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/app/lib/auth-client";
import { auth } from "@/app/lib/auth";
import { use } from "react";

type SessionUser={name?:string|null;email:string;image?:string|null};
async function handleSignOut(){
    const {error}=await signOut({
  fetchOptions: {
    onSuccess: () => {
      // Redirect after successful sign out
      console.log("Signed out successfully"); 
    },
  },
});
    if(error){toast.error(error.message||"সাইন আউট করা যায়নি।");return}
    toast.success("সাইন আউট হয়েছে।");
}

export default function AuthNav(){
    const {data:session,isPending}=useSession();
    const user=(session as {user?:SessionUser}|null)?.user;

    if(isPending){return <div className="h-10 w-32 animate-pulse rounded-lg bg-[#eef4ef]" aria-hidden="true"/>}
    if(!user){return <>
        <Link className="btn desktop-auth" href="/signin">সাইন ইন</Link>
        <Link className="btn btn-primary desktop-auth" href="/signup">সাইন আপ</Link>
    </>}

    const initials=(user.name||user.email||"U").trim().slice(0,1).toUpperCase();
    return <div className="flex items-center gap-2">
        <Link href="/profile" className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-[#eef7f0]" aria-label="প্রোফাইল দেখুন">
            {user.image ? <Image src={user.image} alt="" width={36} height={36} unoptimized className="size-9 rounded-full object-cover"/> : <span className="flex size-9 items-center justify-center rounded-full bg-[#dcefe1] text-sm font-bold text-[#12844c]">{initials}</span>}
            <span className="hidden max-w-28 truncate text-sm font-semibold sm:block">{user.name||user.email}</span>
        </Link>
        <button className="btn" type="button" onClick={handleSignOut}>সাইন আউট</button>
    </div>
}
