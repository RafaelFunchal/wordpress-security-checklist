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
The header has a clearer structure (title and description aligned with the content column), a **rounded navigation bar**, and pill-style links. The footer uses a **frosted panel** on the brand background, a CSS **grid** for columns, and clearer social and contribution links.

**Light and dark themes**  
You can switch between **light** and **dark** from the icon next to the menu. Until you choose a preference, the site follows your **system** color scheme. Your choice is remembered for the next visit.

**Faster, simpler front end**  
Checklist interactivity (checkboxes, section counters, theme toggle) now runs on **vanilla JavaScript**—no jQuery— which keeps the payload small and behavior predictable.

**Content and hosting**  
Checklist recommendations were **reviewed for modern WordPress** (last reviewed date on the homepage). The project is aligned with **native GitHub Pages** builds (no fragile language plugins in the build), and localized strings load reliably across **English, Portuguese, Spanish, and Japanese** via a single `strings` data file.

## Still the same mission

The checklist remains **free**, **open source**, and focused on practical steps you can take to harden WordPress. If you want to suggest edits or translations, the repo is on [GitHub](https://github.com/rafaelfunchal/wordpress-security-checklist){:target="_blank" rel="noopener noreferrer"}.

Thank you for using the site—and if something looks wrong on your browser or language, open an issue and we will take a look.
