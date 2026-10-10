import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {Toaster} from "react-hot-toast";
import Hero from "@/components/Hero";
export const metadata:Metadata={title:"বাজার দর | আজকের বাজারের দাম",description:"বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দৈনিক বাজারদর এক নজরে।"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="bn"><body><Header/><Hero /><main>{children}</main><Footer/><Toaster position="top-center" toastOptions={{duration:3000}}/></body></html>}