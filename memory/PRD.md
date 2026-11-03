# Villa Kephala - Product Requirements Document

## Original Problem Statement
Create a luxury website for "Villa Kephala" in Kea, Greece. Single-page scrollable layout with comprehensive photo gallery (categorized by rooms/areas using ONLY user-uploaded photos), testimonials, and fully responsive mobile-friendly design.

## Architecture
- **Frontend**: React + Tailwind CSS + Framer Motion + Phosphor Icons + Shadcn UI
- **Backend**: FastAPI (minimal)
- **Database**: MongoDB (contact inquiries, status checks)
- **Images**: 112 pre-compressed user photos served as static files from `/frontend/public/images/`

## What's Been Implemented

### Core Website (15 sections)
- Navigation, Hero, Welcome/Intro, Villa Details, Outdoor Living (Your Private Paradise), Direct Access to the Sea, Photo Gallery (6 tabs), Bedrooms (5 rooms), Amenities (12 items), Testimonials (8 anonymous quotes), About Kea, Activities (5 cards), Location (Google Map), Getting There, Contact/Rates, Footer

### Content Updates (Nov 2026)
- Outdoor Living: Added 2 x SUPs and Snorkels & Masks boxes
- Sea Access: Updated paragraph mentioning SUPs
- Amenities: Added row of 4 (SUPs, Table Tennis, Masks & Snorkels, Yoga Mats & Weights)
- Amenities description: "Guided trips, boats, cycling, baby sitting, personal chefs, daily maid service and home cooked food deliveries on request."
- Activities: Added Padel & Tennis card
- Testimonials: 8 anonymous guest quotes (no names/locations/dates)
- Rental Rates: €675/night low season to €1,500/night high season

### Image Optimization (Feb 2026)
- All 112 photos compressed to ~100-300KB, served locally
- LazyImage component with skeleton loading

### SEO & Branding
- Full meta tags (title, description, OG, Twitter Card, keywords)
- Custom wave favicon

### Mobile Responsiveness
- overflow-x hidden, maximum-scale=1, responsive tabs, hamburger menu

## Section Order
Hero → Intro → Villa → Outdoor (Your Private Paradise) → Direct Access to the Sea → Gallery → Bedrooms → Amenities → Testimonials → About Kea → Activities → Location → Getting There → Contact → Footer

## Backlog
- Refactor App.js into smaller components
- Extract image arrays into separate data file
