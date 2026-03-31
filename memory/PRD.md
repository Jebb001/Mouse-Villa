# Villa Kephala - Luxury Villa Website

## Problem Statement
Create a luxury website for "Villa Kephala" in Kea, Greece. The website includes specific copy about the location, 5 bedrooms, outdoor living, activities, and getting there. It features a contact form and a comprehensive photo gallery categorized by rooms/areas using ONLY user-uploaded photos.

## Product Requirements
- Single-page scrollable layout with multi-section design
- Photo gallery with categorized tabs and lightbox feature
- Testimonials section with real reviews
- Fully responsive mobile-friendly design
- Contact form backed by API

## Architecture
- **Frontend**: React + Tailwind CSS + Framer Motion + Phosphor Icons + Shadcn UI
- **Backend**: FastAPI (contact form endpoint)
- **Database**: None (contact form returns mock success)

## Completed Features (All Done)
- Navigation bar with smooth scroll
- Hero section with infinity pool focus
- Welcome section (pool-focused imagery)
- Villa Details section (bedrooms, outdoor living)
- Custom Testimonials section
- Amenities/Quick points section
- About Kea section
- Activities section (icons instead of photos: hiking, scuba, boating, cycling)
- Location info section
- Contact Form with FastAPI backend
- Photo Gallery with 8 tabs: **Exterior** (default, first), Interior, Kitchen, Terrace, Blue Room, Pink Room, Sea Room, Suzani Room, Top Room
- Lightbox overlay for image zoom
- Full mobile optimization (scrollable tabs, solid lightbox bg, stacking layout)
- "Enquire" button with proper contrast

## Key Files
- `/app/frontend/src/App.js` - Main React component (~1300 lines)
- `/app/frontend/src/App.css` - Custom styling
- `/app/frontend/src/index.css` - CSS variables
- `/app/backend/server.py` - FastAPI backend

## API Endpoints
- `POST /api/contact` - Contact form (mock response)

## Important Notes
- All images are user-provided `customer-assets` URLs — DO NOT replace with stock photos
- Gallery tab/category names must match in both the TabsTrigger values and allImages category fields
- Hot reload is enabled for frontend
