---
layout: post
title:  "A fresh look for the WordPress Security Checklist"
date:   2026-04-17 12:00:00
image:  "/img/screenshot.png"
categories: update
language: en
permalink: /:categories/:year/:month/:day/:title/
---

We have rolled out a **major refresh** of [wpsecuritychecklist.org](https://wpsecuritychecklist.org/){:target="_blank" rel="noopener noreferrer"}—new visual design, clearer navigation, and a more maintainable codebase so the checklist stays easy to use on phones, desktops, and GitHub Pages.

## What you will notice

**Typography and layout**  
The site now uses **Plus Jakarta Sans** with stronger hierarchy: larger, bolder headings and improved spacing so long checklist sections are easier to scan.

**Neumorphic-style surfaces**  
Inspired by current UI trends (soft depth, tactile controls), the main content sits on a **raised panel** with gentle shadows, while the header navigation and primary actions use subtle depth instead of flat blocks everywhere.

**Header and footer**  
The header has a clearer structure (title and description aligned with the content column), a **rounded navigation bar**, and pill-style links. The mobile menu uses a **CSS-only hamburger** that morphs into a close icon—no separate image asset. **Languages** open from an **icon** in the header with a compact submenu instead of a long dropdown. The footer uses a **frosted panel** on the brand background, a CSS **grid** for columns, and clearer social and contribution links.

**Light and dark themes**  
You can switch between **light** and **dark** from the icon next to the menu. Until you choose a preference, the site follows your **system** color scheme. Your choice is remembered for the next visit.

**Faster, simpler front end**  
Checklist interactivity (checkboxes, section counters, theme toggle) now runs on **vanilla JavaScript**—no jQuery—which keeps the payload small and behavior predictable. Progress is **saved in your browser** between visits. A **pinned progress bar** and per-section counts help you stay oriented. Checks use a subtle **pen-draw style overlay**, and you can **check or clear every item in a section** in one go. Completing the list can trigger a **celebration** (motion, confetti, and optional sound), with a toggle to turn that off when you prefer less distraction or motion. You can also **export to PDF**, with an optional project name on the cover sheet.

**Content and hosting**  
Checklist recommendations were **reviewed for modern WordPress** (last reviewed date on the homepage). The project is aligned with **native GitHub Pages** builds (no fragile language plugins in the build), and localized strings load reliably across **English, Portuguese, Spanish, and Japanese** via a single `strings` data file. There is new guidance to **reduce author and username enumeration**, including an optional **Apache `.htaccess` snippet** behind a collapsible block so the page stays scannable. **XML-RPC** and related hosting-oriented items now live in the **Hosting** section, and link labels that point to the WordPress hardening handbook are **translated per locale**.

**Structured data**  
Every page includes **Schema.org JSON-LD**, and the checklist itself is described as a full **ItemList** in the active locale—better for search engines and assistants that consume structured data.

**Accessibility and privacy**  
There is a **skip link** straight to the main content, a proper **`main` landmark**, and **localized ARIA** copy for the menu, navigation metadata, and checklist controls (including the PDF dialog, which uses a **focus trap** for keyboard users). The document head adds a stricter **`referrer`** policy and a narrow **Permissions-Policy** for APIs the site does not need.

## Still the same mission

The checklist remains **free**, **open source**, and focused on practical steps you can take to harden WordPress. If you want to suggest edits or translations, the repo is on [GitHub](https://github.com/rafaelfunchal/wordpress-security-checklist){:target="_blank" rel="noopener noreferrer"}.

Thank you for using the site—and if something looks wrong on your browser or language, open an issue and we will take a look.
