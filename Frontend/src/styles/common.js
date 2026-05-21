// src/styles/common.js
// Theme: Inkwell Editorial — warm paper background, deep ink text, crimson accent
// Inspired by literary magazines — serif typography, editorial spacing, refined details
// Fonts: Playfair Display (display) + Lora (body) + DM Sans (ui)
// Add to index.html:
//   <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,400&family=Lora:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">

// ─── Layout ───────────────────────────────────────────
export const pageBackground   = "bg-[#faf8f5] min-h-screen"
export const pageWrapper      = "max-w-5xl mx-auto px-6 py-16"
export const section          = "mb-16"

// ─── Cards ────────────────────────────────────────────
export const cardClass        = "bg-[#f4f0ea] rounded-sm p-7 hover:bg-[#ede8df] transition-colors duration-200 cursor-pointer border border-[#ddd7ce]"

// ─── Typography ───────────────────────────────────────
export const pageTitleClass   = "font-['Playfair_Display'] text-5xl font-extrabold text-[#1a1410] tracking-tight leading-none mb-2"
export const headingClass     = "font-['Playfair_Display'] text-2xl font-bold text-[#1a1410] tracking-tight"
export const subHeadingClass  = "font-['Playfair_Display'] text-lg font-semibold text-[#1a1410] tracking-tight"
export const bodyText         = "font-['Lora'] text-[#3d3530] leading-[1.85]"
export const mutedText        = "font-['DM_Sans'] text-sm text-[#7a6f68]"
export const linkClass        = "text-[#c0392b] hover:text-[#922b21] transition-colors underline underline-offset-2 decoration-[#c0392b]/30"

// ─── Buttons ──────────────────────────────────────────
export const primaryBtn       = "font-['DM_Sans'] bg-[#c0392b] text-white font-semibold px-6 py-2.5 rounded-sm hover:bg-[#a93226] transition-all duration-200 cursor-pointer text-sm tracking-wide hover:-translate-y-px shadow-sm hover:shadow-md"
export const secondaryBtn     = "font-['DM_Sans'] border border-[#c4bdb4] text-[#1a1410] font-medium px-6 py-2.5 rounded-sm hover:bg-[#ede8df] hover:border-[#1a1410] transition-colors cursor-pointer text-sm"
export const ghostBtn         = "font-['DM_Sans'] text-[#7a6f68] font-medium hover:text-[#1a1410] hover:bg-[#ede8df] px-4 py-2 rounded-sm transition-colors cursor-pointer text-sm"

// ─── Forms ────────────────────────────────────────────
export const formCard         = "bg-[#f4f0ea] border border-[#ddd7ce] rounded-sm p-10 max-w-md mx-auto"
export const formTitle        = "font-['Playfair_Display'] text-2xl font-bold text-[#1a1410] tracking-tight text-center mb-7"
export const labelClass       = "font-['DM_Sans'] text-xs font-semibold text-[#7a6f68] uppercase tracking-widest mb-1.5 block"
export const inputClass       = "font-['DM_Sans'] w-full bg-white border border-[#ddd7ce] rounded-sm px-4 py-2.5 text-[#1a1410] text-sm placeholder:text-[#b5ada8] focus:outline-none focus:border-[#c0392b] focus:ring-2 focus:ring-[#c0392b]/10 transition"
export const formGroup        = "mb-5"
export const submitBtn        = "font-['DM_Sans'] w-full bg-[#c0392b] text-white font-semibold py-2.5 rounded-sm hover:bg-[#a93226] transition-colors cursor-pointer mt-2 text-sm tracking-wide"

// ─── Navbar ───────────────────────────────────────────
export const navbarClass      = "bg-[#faf8f5]/90 backdrop-blur-xl border-b border-[#ddd7ce] px-8 h-[60px] flex items-center sticky top-0 z-50"
export const navContainerClass= "max-w-5xl mx-auto w-full flex items-center justify-between"
export const navBrandClass    = "font-['Playfair_Display'] text-xl font-extrabold text-[#1a1410] tracking-tight"
export const navLinksClass    = "flex items-center gap-8"
export const navLinkClass     = "font-['DM_Sans'] text-[0.75rem] text-[#7a6f68] hover:text-[#1a1410] transition-colors font-normal uppercase tracking-widest"
export const navLinkActiveClass = "font-['DM_Sans'] text-[0.75rem] text-[#c0392b] font-semibold uppercase tracking-widest border-b-2 border-[#c0392b] pb-0.5"

// ─── Article / Blog ───────────────────────────────────
export const articleGrid      = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#ddd7ce] border border-[#ddd7ce] rounded-sm overflow-hidden"
export const articleCardClass = "bg-[#f4f0ea] p-7 hover:bg-[#ede8df] transition-colors duration-200 flex flex-col gap-3 cursor-pointer"
export const articleTitle     = "font-['Playfair_Display'] text-base font-bold text-[#1a1410] leading-snug tracking-tight"
export const articleExcerpt   = "font-['Lora'] text-sm text-[#3d3530] leading-relaxed italic"
export const articleMeta      = "font-['DM_Sans'] text-xs text-[#7a6f68]"

// ─── Modern Article Grid ──────────────────────────────
export const articleGridModern = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
export const articleCardModern = "bg-[#f4f0ea] border border-[#ede8df]/50 rounded-sm p-7 hover:border-[#c0392b]/20 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between group"
export const articleTitleModern = "font-['Playfair_Display'] text-xl font-bold text-[#1a1410] leading-snug tracking-tight mb-3 group-hover:text-[#c0392b] transition-colors"
export const articleExcerptModern = "font-['Lora'] text-sm text-[#3d3530] leading-[1.65] mb-4 flex-grow italic"
export const articleCategoryBadge = "font-['DM_Sans'] text-[0.65rem] font-semibold text-[#c0392b] uppercase tracking-wider bg-[#c0392b]/[0.08] px-3 py-1.5 rounded-sm w-fit"
export const articleMetaRow = "flex items-center justify-between pt-4 border-t border-[#ddd7ce]/50"
export const articleReadMoreBtn = "font-['DM_Sans'] text-xs font-semibold text-[#c0392b] hover:text-[#922b21] uppercase tracking-wider transition-colors"

// ─── Article Detail Page (Modern) ─────────────────────
export const articlePageTitle = "font-['Playfair_Display'] text-4xl md:text-5xl font-extrabold text-[#1a1410] tracking-tight leading-tight mb-3"
export const articlePageCategory = "font-['DM_Sans'] text-[0.65rem] font-bold text-[#c0392b] uppercase tracking-wider bg-[#c0392b]/[0.08] px-3 py-1.5 rounded-sm w-fit inline-block"
export const articlePageMeta = "font-['DM_Sans'] text-sm text-[#7a6f68]"
export const articlePageContent = "font-['Lora'] text-[#3d3530] text-lg leading-[1.95] whitespace-pre-wrap"
export const articlePageAuthor = "font-['DM_Sans'] font-semibold text-[#1a1410]"
export const articlePageTimestamp = "font-['DM_Sans'] text-sm text-[#7a6f68]"
export const articleBody      = "font-['Lora'] text-[#3d3530] leading-[1.9] text-[1rem] max-w-2xl"
export const timestampClass   = "font-['DM_Sans'] text-xs text-[#b5ada8] flex items-center gap-1.5"
export const tagClass         = "font-['DM_Sans'] text-[0.6rem] font-bold text-[#c0392b] uppercase tracking-[0.15em] w-fit"

// ─── Author ───────────────────────────────────────────
export const authorNameClass  = "font-['DM_Sans'] text-sm font-semibold text-[#1a1410]"
export const authorBioClass   = "font-['Lora'] text-sm text-[#7a6f68] italic leading-relaxed"
export const authorTagClass   = "font-['DM_Sans'] text-[0.6rem] font-semibold text-[#4a7c59] bg-[#4a7c59]/10 uppercase tracking-widest px-2 py-0.5 rounded-sm w-fit"

// ─── Pullquote ────────────────────────────────────────
export const pullquoteClass   = "font-['Playfair_Display'] text-xl italic font-normal text-[#1a1410] border-l-[3px] border-[#c0392b] pl-8 my-12 leading-snug"

// ─── Feedback ─────────────────────────────────────────
export const errorClass       = "font-['DM_Sans'] bg-[#c0392b]/[0.06] text-[#922b21] border border-[#c0392b]/20 rounded-sm px-4 py-3 text-sm"
export const successClass     = "font-['DM_Sans'] bg-[#4a7c59]/[0.07] text-[#2d5c3a] border border-[#4a7c59]/20 rounded-sm px-4 py-3 text-sm"
export const loadingClass     = "font-['DM_Sans'] text-[#c0392b]/50 text-sm animate-pulse text-center py-10"
export const emptyStateClass  = "font-['Playfair_Display'] italic text-center text-[#b5ada8] py-16 text-lg"

// ─── Divider ──────────────────────────────────────────
export const divider          = "border-t border-[#ddd7ce] my-12"
export const dividerOrnament  = "flex items-center gap-4 my-12 text-[#c4bdb4] text-xs tracking-[0.3em] uppercase font-['DM_Sans'] before:flex-1 before:border-t before:border-[#ddd7ce] after:flex-1 after:border-t after:border-[#ddd7ce]"

// ─── Article Detail Page ──────────────────────────────
export const articlePageWrapper = "max-w-3xl mx-auto px-6 py-20"
export const articleHeader      = "mb-12 border-b border-[#ddd7ce] pb-10"
export const articleCategory    = "font-['DM_Sans'] text-[0.7rem] font-bold text-[#c0392b] uppercase tracking-[0.15em] mb-3 block"
export const articleMainTitle   = "font-['Playfair_Display'] text-4xl md:text-5xl font-extrabold text-[#1a1410] tracking-tight mb-6 leading-tight"
export const articleAuthorRow   = "flex items-center justify-between font-['DM_Sans'] text-sm text-[#7a6f68]"
export const authorInfo         = "font-['DM_Sans'] font-semibold text-[#1a1410]"
export const articleContent     = "font-['Lora'] text-[#3d3530] text-lg leading-[1.9] mb-16 whitespace-pre-wrap"
export const articleFooter      = "border-t border-[#ddd7ce] pt-8 font-['DM_Sans'] text-xs text-[#b5ada8] mt-10"
export const articleActions     = "flex gap-4 mt-8"
export const editBtn           = "font-['DM_Sans'] bg-white border border-[#c4bdb4] text-[#1a1410] font-medium px-4 py-1.5 rounded-sm hover:bg-[#ede8df] transition-colors cursor-pointer text-xs"
export const deleteBtn         = "font-['DM_Sans'] bg-white border border-[#c0392b]/30 text-[#c0392b] font-medium px-4 py-1.5 rounded-sm hover:bg-[#c0392b]/[0.05] transition-colors cursor-pointer text-xs"
// let Res=await resobj.json()

// //Post
// //fetch
// let resobj=await fetch("",{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})
// if(resobj.status!==200){
//   throw new Error("Failed to fetch data")
// }
// let Res=await resobj.json()
// //--------------------------------

// //Post
// //axios
// let resobj=await axios.post("",data)
// let res=resobj.data

