# Villa Kephala - Luxury Villa Website

## Problem Statement
Luxury website for "Villa Kephala" in Kea, Greece with photo gallery, contact info, testimonials, and responsive design using ONLY user-uploaded photos.

## Architecture
- **Frontend**: React + Tailwind CSS + Framer Motion + Phosphor Icons + Shadcn UI
- **Backend**: FastAPI (image proxy/compression, contact mock)
- **Image Optimization**: Backend proxy at `/api/img` compresses 10-16MB photos to ~100-200KB via Pillow

## Completed Features
- Navigation, Hero, Welcome, **Direct Access to the Sea**, Villa Details, Outdoor Living, Gallery, Bedrooms, Amenities, Testimonials, About Kea, Activities, Location, Getting There (4 boxes incl. Speedboat), Rental Rates, Contact
- Photo Gallery: Pool & Terraces, Down to the Sea, Interior, Outdoor Dining, Kitchen, Bedrooms
- Each tab shows one main photo; clicking opens lightbox with all images
- Bedrooms tab: per-room sections (Blue, Pink, Sea, Suzani, Top) each with own lightbox
- Image proxy compresses all photos for fast loading with lazy loading + skeleton placeholders
- Full mobile optimization (no zoom-out, contained tabs, responsive sections)

## Key Files
- `/app/frontend/src/App.js` - Main React component
- `/app/frontend/src/App.css` - Custom styling  
- `/app/frontend/src/index.css` - CSS variables
- `/app/frontend/public/index.html` - Meta tags, title
- `/app/backend/server.py` - FastAPI backend with image proxy

## API Endpoints
- `POST /api/contact` - Contact form (mock)
- `GET /api/img?url=&w=&q=` - Image proxy with compression

## Important Notes
- All images are user-provided `customer-assets` URLs — DO NOT replace
- Images with `isMain: true` are hero photos shown per tab
- Bedroom images have `room` field for per-room sections
- `optimImg()` helper wraps image URLs through the backend proxy
- `LazyImage` component handles loading skeleton + lazy loading
