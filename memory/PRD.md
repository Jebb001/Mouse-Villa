# Villa Kephala - Luxury Villa Website

## Problem Statement
Create a luxury website for "Villa Kephala" in Kea, Greece with photo gallery, contact form, testimonials, and responsive design using ONLY user-uploaded photos.

## Architecture
- **Frontend**: React + Tailwind CSS + Framer Motion + Phosphor Icons + Shadcn UI (Tabs, Accordion)
- **Backend**: FastAPI (contact form endpoint, mock response)

## Completed Features
- Navigation, Hero, Welcome, Villa Details, Testimonials, Amenities, About Kea, Activities, Location, Contact Form
- Photo Gallery with 6 tabs: Pool & Terraces, Down to the Sea, Interior, Outdoor Dining, Kitchen, Bedrooms
- **Main photo layout**: Each non-bedroom tab shows one large hero image; clicking opens lightbox with all images
- **Bedrooms tab**: Accordion dropdowns per room (Blue, Pink, Sea, Suzani, Top)
- Lightbox with prev/next, thumbnails, keyboard nav, counter
- Full mobile optimization

## Gallery Main Photos (user-uploaded)
- Pool & Terraces: `2mcxhs4y_1st Shot of pool section.jpg`
- Down to the Sea: `et9roi8q_Main Photo Option.jpg`
- Interior: `bh088xq7_Main Photo.jpg`
- Outdoor Dining: `42dcy0cp_Main Shot.jpg`
- Kitchen: `8e5izdsp_Main Shot.jpg`

## Key Files
- `/app/frontend/src/App.js` - Main React component
- `/app/frontend/src/App.css` - Custom styling
- `/app/frontend/src/index.css` - CSS variables
- `/app/backend/server.py` - FastAPI backend

## Important Notes
- All images are user-provided `customer-assets` URLs — DO NOT replace with stock photos
- Gallery images with `isMain: true` are the hero photos shown per tab
- Bedroom images have a `room` field for accordion grouping
