// src/styles/common.js
// Theme: Inkwell Editorial — warm paper background, deep ink text, crimson accent
// Inspired by literary magazines — serif typography, editorial spacing, refined details
// Fonts: Playfair Display (display) + Lora (body) + DM Sans (ui)
// Add to index.html:
//   <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,400&family=Lora:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">

// ─── Layout ───────────────────────────────────────────
export const pageBackground   = "bg-gradient-to-br from-[#f8faff] via-[#f3f0fa] to-[#e9e6f7] min-h-screen"
export const pageWrapper      = "max-w-5xl mx-auto px-6 py-16"
export const section          = "mb-16"

// ─── Cards ────────────────────────────────────────────
export const cardClass        = "bg-white rounded-xl p-7 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border border-[#e0e7ff]"

// ─── Typography ───────────────────────────────────────
export const pageTitleClass   = "font-['Playfair_Display'] text-5xl font-extrabold text-[#2d1e6b] tracking-tight leading-none mb-2"
export const headingClass     = "font-['Playfair_Display'] text-2xl font-bold text-[#3b2f63] tracking-tight"
export const subHeadingClass  = "font-['Playfair_Display'] text-lg font-semibold text-[#5f4bb6] tracking-tight"
export const bodyText         = "font-['Lora'] text-[#2d1e6b] leading-[1.85]"
export const mutedText        = "font-['DM_Sans'] text-sm text-[#7a6f68]"
export const linkClass        = "text-[#5f4bb6] hover:text-[#2d1e6b] transition-colors underline underline-offset-2 decoration-[#5f4bb6]/30"

// ─── Buttons ──────────────────────────────────────────
export const primaryBtn       = "font-['DM_Sans'] bg-gradient-to-r from-[#5f4bb6] via-[#3b82f6] to-[#a78bfa] text-white font-semibold px-6 py-2.5 rounded-md hover:from-[#3b82f6] hover:to-[#5f4bb6] transition-all duration-200 cursor-pointer text-sm tracking-wide hover:-translate-y-px shadow-md hover:shadow-lg"
export const secondaryBtn     = "font-['DM_Sans'] border border-[#a78bfa] text-[#3b2f63] font-medium px-6 py-2.5 rounded-md hover:bg-[#f3f0fa] hover:border-[#5f4bb6] transition-colors cursor-pointer text-sm"
export const ghostBtn         = "font-['DM_Sans'] text-[#5f4bb6] font-medium hover:text-[#3b82f6] hover:bg-[#f3f0fa] px-4 py-2 rounded-md transition-colors cursor-pointer text-sm"

// ─── Forms ────────────────────────────────────────────
export const formCard         = "bg-white border border-[#e0e7ff] rounded-xl p-10 max-w-md mx-auto shadow-md"
export const formTitle        = "font-['Playfair_Display'] text-2xl font-bold text-[#5f4bb6] tracking-tight text-center mb-7"
export const labelClass       = "font-['DM_Sans'] text-xs font-semibold text-[#5f4bb6] uppercase tracking-widest mb-1.5 block"
export const inputClass       = "font-['DM_Sans'] w-full bg-white border border-[#a78bfa] rounded-md px-4 py-2.5 text-[#2d1e6b] text-sm placeholder:text-[#b5ada8] focus:outline-none focus:border-[#5f4bb6] focus:ring-2 focus:ring-[#a78bfa]/10 transition"
export const formGroup        = "mb-5"
export const submitBtn        = "font-['DM_Sans'] w-full bg-gradient-to-r from-[#5f4bb6] via-[#3b82f6] to-[#a78bfa] text-white font-semibold py-2.5 rounded-md hover:from-[#3b82f6] hover:to-[#5f4bb6] transition-colors cursor-pointer mt-2 text-sm tracking-wide shadow"

// ─── Navbar ───────────────────────────────────────────
export const navbarClass      = "bg-gradient-to-r from-[#f8faff]/90 via-[#f3f0fa]/90 to-[#e9e6f7]/90 backdrop-blur-xl border-b border-[#a78bfa] px-8 h-[60px] flex items-center sticky top-0 z-50"
export const navContainerClass= "max-w-5xl mx-auto w-full flex items-center justify-between"
export const navBrandClass    = "font-['Playfair_Display'] text-xl font-extrabold text-[#5f4bb6] tracking-tight"
export const navLinksClass    = "flex items-center gap-8"
export const navLinkClass     = "font-['DM_Sans'] text-[0.75rem] text-[#7a6f68] hover:text-[#1a1410] transition-colors font-normal uppercase tracking-widest"
export const navLinkActiveClass = "font-['DM_Sans'] text-[0.75rem] text-[#c0392b] font-semibold uppercase tracking-widest border-b-2 border-[#c0392b] pb-0.5"

// ─── Article / Blog ───────────────────────────────────
export const articleGrid      = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#ddd7ce] border border-[#ddd7ce] rounded-sm overflow-hidden"
export const articleCardClass = "bg-[#f4f0ea] p-7 hover:bg-[#ede8df] transition-colors duration-200 flex flex-col gap-3 cursor-pointer"
export const articleTitle     = "font-['Playfair_Display'] text-base font-bold text-[#1a1410] leading-snug tracking-tight"
export const articleExcerpt   = "font-['Lora'] text-sm text-[#3d3530] leading-relaxed italic"
export const articleMeta      = "font-['DM_Sans'] text-xs text-[#7a6f68]"
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