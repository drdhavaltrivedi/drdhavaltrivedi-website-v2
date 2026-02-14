# Dr. Dhaval Trivedi Website

Static multi-page site for **www.drdhaval.in**: home, expertise pages (Vedic Astrology, Vastu, Numerology, Palmistry, Guitar & Music), Tools, and Blog. Clean URLs, full SEO and AI search optimisation, breadcrumbs, FAQ and Article schema.

## Run locally

```bash
npm install
npm run dev
```

Open **http://localhost:3000**. Home is at `/`; other pages at `/vedic-astrology.html`, `/blog/index.html`, etc.

**To test clean URLs locally:** run `npx vercel dev`. Then use http://localhost:3000/vedic-astrology, /blog, etc.

## Deploy to Vercel (www.drdhaval.in)

1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel` then `vercel --prod`.
3. In Vercel, add custom domain **drdhaval.in** (with www). All canonicals and sitemap use **https://www.drdhaval.in**.

**Clean URLs (no .html):**
- https://www.drdhaval.in/
- https://www.drdhaval.in/vedic-astrology
- https://www.drdhaval.in/vastu-shastra
- https://www.drdhaval.in/numerology
- https://www.drdhaval.in/palmistry
- https://www.drdhaval.in/guitar-music-vocals
- https://www.drdhaval.in/blog
- https://www.drdhaval.in/blog/vedic-astrology-consultation-what-to-expect
- https://www.drdhaval.in/blog/numerology-life-path-simple-guide
- https://www.drdhaval.in/blog/free-online-palm-reading-tool

## SEO & AI search

- **Canonical:** Every page uses **https://www.drdhaval.in** (www, no subdomain).
- **Meta:** Unique title, description, keywords; author; robots index, follow.
- **Breadcrumbs:** Visible on all pages; BreadcrumbList JSON-LD on all.
- **FAQ:** FAQPage schema on expertise pages for rich snippets.
- **Articles:** Blog posts use Article schema with author and date.
- **Person + WebSite + ProfessionalService:** Home and expertise pages so search and AI can rank by name, profession, and skills.
- **Tools:** Home has a Tools section linking to **https://palmistry.appstream.me/** (free AI palm reading) and to expertise pages.
- **Blog:** Internal links between blog posts and expertise; human-tone copy; no em dash.
- **sitemap.xml** and **robots.txt** point to https://www.drdhaval.in/sitemap.xml.

Targets: Dr. Dhaval Trivedi, Vedic astrologer, Numerologist, Palmistry, Vastu expert, palm reading online, free palm reading, www.drdhaval.in, and related queries in Google and AI answers.
