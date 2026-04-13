# Villa Kephala - Product Requirements Document

## Original Problem Statement
Create a luxury website for "Villa Kephala" in Kea, Greece. Single-page scrollable layout with comprehensive photo gallery (categorized by rooms/areas using ONLY user-uploaded photos), testimonials, and fully responsive mobile-friendly design.

## Architecture
- **Frontend**: React + Tailwind CSS + Framer Motion + Phosphor Icons + Shadcn UI
- **Backend**: FastAPI (minimal, serves API endpoints)
- **Database**: MongoDB (contact inquiries, status checks)
- **Images**: 112 pre-compressed user photos served as static files from `/frontend/public/images/`

## What's Been Implemented

### Core Website
- Full single-page luxury villa website with 15 sections
- Navigation bar with smooth scroll links (The Villa, Gallery, Activities, Location, Enquire)
- Hero section with full-bleed background image
- Welcome / "Enjoy a Blissful Retreat" intro section
- The Villa details section
- "Your Private Paradise" (Pool & Outdoor Living) section
- "Direct Access to the Sea" section (after Outdoor, before Gallery)
- Photo Gallery with 6 tabs: Pool & Terraces, Down to the Sea, Interior, Outdoor Dining, Kitchen, Bedrooms
- Lightbox with prev/next navigation and thumbnail strip
- Bedrooms section with individual room galleries (Blue, Pink, Sea, Suzani, Top rooms)
- Amenities, Testimonials, About Kea, Activities, Location (Google Map), Getting There, Contact, Footer

### Image Optimization (Feb 2026)
- All 112 user-uploaded photos compressed from 10-15MB each to ~100-300KB
- Stored locally at `/frontend/public/images/`
- Removed backend image proxy — all images served as static files

### SEO & Branding (Feb 2026)
- Meta title: "Luxury Greek Villa with Private Sea Access | Seafront Holiday Villa in Greece"
- Meta description with targeted copy
- Open Graph tags (title, description, image, URL, site_name)
- Twitter Card tags (summary_large_image)
- Keywords meta tag
- Custom wave favicon (terracotta, matches brand)
- Apple touch icon

### Mobile Responsiveness
- overflow-x: hidden on body, maximum-scale=1 viewport
- Responsive gallery tabs, mobile hamburger menu
- Proper padding/spacing on all breakpoints

## Section Order
Hero → Intro → Villa → Outdoor (Your Private Paradise) → Direct Access to the Sea → Gallery → Bedrooms → Amenities → Testimonials → About Kea → Activities → Location → Getting There → Contact → Footer

## Backlog
- Refactor App.js (1400+ lines) into smaller components
- Extract image arrays into separate data file
