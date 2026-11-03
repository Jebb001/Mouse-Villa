import { useState, useEffect, useRef, useCallback } from "react";
import "@/App.css";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bed, SwimmingPool, Waves, Mountains, WifiHigh, AirplaneTilt, 
  MapPin, House, SunHorizon, Compass, CaretDown, CaretLeft, CaretRight, List, X, 
  EnvelopeSimple, Phone, User, Barbell, Boat, Bicycle, Fish,
  GameController,
  Timer, CarSimple, Anchor, AirplaneTakeoff, CheckCircle,
  Bathtub, Snowflake, TelevisionSimple, WashingMachine, Fan,
  PersonSimpleSwim, Goggles, TennisBall
} from "@phosphor-icons/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./components/ui/accordion";

// Lazy image with loading skeleton
const LazyImage = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-[#E7E5E4] animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};
import { Toaster as SonnerToaster } from "sonner";

// Image assets - User provided photos only
const IMAGES = {
  // Sea/Outdoor photos
  hero: "/images/b7d88a2b22.jpg",
  outdoor: [
    "/images/c7d8d3b323.jpg",
    "/images/793b8e2af2.jpg",
    "/images/59857e0a03.jpg",
    "/images/cda50ca24a.jpg",
    "/images/b500d51b1a.jpg",
    "/images/3dd1b44a6e.jpg",
    "/images/94c8bb9ebd.jpg",
    "/images/e5ed73054a.jpg",
    "/images/4d1d48b293.jpg",
    "/images/f858985fdc.jpg",
    "/images/6b8484644e.jpg",
    "/images/d580222851.jpg",
    "/images/b32868e5a0.jpg",
    "/images/5692465cdb.jpg",
    "/images/aa126c09e5.jpg",
    "/images/6bb63febc7.jpg",
    "/images/72b76c46d3.jpg",
    "/images/9f0f882af0.jpg",
    "/images/29e57ed3ab.jpg"
  ],
  // Blue Room bedroom photos
  bedroom: [
    "/images/f5929a98a6.jpg",
    "/images/aaaeb2beb1.jpg",
    "/images/4dd529a72a.jpg",
    "/images/5b8e9084bf.jpg"
  ],
  // Pink Room bedroom photos
  pinkRoom: [
    "/images/0260fa6563.jpg",
    "/images/c0d0db514c.jpg",
    "/images/37bf505a4b.jpg",
    "/images/a5cfe07942.jpg"
  ],
  // Sea Room bedroom photos
  seaRoom: [
    "/images/718325e2a0.jpg",
    "/images/4721800524.jpg",
    "/images/bb25253fc0.jpg",
    "/images/a3d0f2a98a.jpg",
    "/images/74a8afbb35.jpg"
  ],
  // Suzani Room bedroom photos
  suzaniRoom: [
    "/images/dc10730569.jpg",
    "/images/2e52b4ad9e.jpg",
    "/images/432d361792.jpg",
    "/images/ed41e9a19e.jpg",
    "/images/d2269670ef.jpg",
    "/images/a4c7d7e6c5.jpg"
  ],
  // Top Room bedroom photos
  topRoom: [
    "/images/53d75eb475.jpg",
    "/images/7b5250c8c9.jpg",
    "/images/35ab5bd056.jpg",
    "/images/9f6ad2c5b2.jpg"
  ],
  // Interior/Sitting/Dining photos
  interior: [
    "/images/2c30ee682b.jpg",
    "/images/3b4e9b40ab.jpg",
    "/images/7eb5d4a24a.jpg",
    "/images/2ad4383921.jpg",
    "/images/fda4f5f11a.jpg",
    "/images/b978559c45.jpg",
    "/images/981ca0f644.jpg",
    "/images/fc819c092c.jpg",
    "/images/1d94d21a86.jpg"
  ],
  // Kitchen photos
  kitchen: [
    "/images/08b61c2fb6.jpg",
    "/images/e25b0ab5e8.jpg",
    "/images/5df5d33158.jpg",
    "/images/44fb23445c.jpg"
  ],
  // Outdoor Dining & BBQ photos
  terrace: [
    "/images/933d7336cf.jpg",
    "/images/395cccc551.jpg",
    "/images/dd5af927d9.jpg",
    "/images/d6390ef7e5.jpg",
    "/images/0e25af86bd.jpg",
    "/images/acf1b78fb4.jpg",
    "/images/40b366e39f.jpg",
    "/images/15f2895e7e.jpg"
  ]
};

// Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#villa", label: "The Villa" },
    { href: "#gallery", label: "Gallery" },
    { href: "#activities", label: "Activities" },
    { href: "#location", label: "Location" },
  ];

  return (
    <nav
      data-testid="main-navigation"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "nav-glass shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="font-['Cormorant_Garamond'] text-2xl font-light tracking-tight" data-testid="brand-logo">
            <span className={isScrolled ? "text-[#1C1917]" : "text-white"}>Villa Kephala</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link text-sm font-medium ${
                  isScrolled ? "text-[#57534E] hover:text-[#1C1917]" : "text-white/90 hover:text-white"
                }`}
                data-testid={`nav-link-${link.label.toLowerCase().replace(' ', '-')}`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-primary px-6 py-2.5 text-sm font-medium rounded-none"
              data-testid="nav-enquire-btn"
            >
              Enquire
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? (
              <X size={24} className={isScrolled ? "text-[#1C1917]" : "text-white"} />
            ) : (
              <List size={24} className={isScrolled ? "text-[#1C1917]" : "text-white"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mobile-menu md:hidden absolute top-20 left-0 right-0 py-6 px-6"
            data-testid="mobile-menu"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[#1C1917] text-lg font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="btn-primary px-6 py-3 text-center text-sm font-medium rounded-none mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Enquire
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section
      data-testid="hero-section"
      className="min-h-screen relative flex items-end pb-24"
      style={{
        backgroundImage: `url(${IMAGES.hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-overlay absolute inset-0" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-white/80 text-xs uppercase tracking-[0.2em] font-medium mb-4 block">
            Kea, Cyclades, Greece
          </span>
          <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white font-light tracking-tight mb-6 max-w-4xl">
            Exceptional Seafront Villa in Unspoilt Kea, Greece
          </h1>
          <p className="text-white/90 text-base sm:text-lg max-w-2xl leading-relaxed mb-8">
            A newly completed and immaculate private retreat where refined interiors meet the endless blue of the Aegean Sea.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#villa" className="btn-primary px-8 py-3 text-sm font-medium rounded-none" data-testid="hero-discover-btn">
              Discover the Villa
            </a>
            <a href="#contact" className="bg-white text-[#1C1917] hover:bg-[#F3EFEA] px-8 py-3 text-sm font-medium rounded-none transition-all" data-testid="hero-enquire-btn">
              Make an Enquiry
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
        <CaretDown size={32} className="text-white/60" />
      </div>
    </section>
  );
};

// Introduction Section
const IntroSection = () => {
  return (
    <section data-testid="intro-section" className="py-12 sm:py-20 lg:py-32 bg-[#F3EFEA]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label mb-4 block">Welcome</span>
            <h2 className="section-heading text-3xl sm:text-4xl lg:text-5xl mb-6">
              Enjoy a Blissful Retreat
            </h2>
            <p className="text-[#57534E] text-base sm:text-lg leading-relaxed mb-6">
              Enjoy a blissful retreat with unforgettable, uninterrupted views and golden sunsets in this elegant Cycladic home just meters from the sea.
            </p>
            <p className="text-[#57534E] text-base sm:text-lg leading-relaxed">
              Relax by the stunning infinity pool overlooking the beautiful bay, or take the stone steps down to your own private beach. This exceptional seafront villa offers the perfect blend of luxury and tranquility.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <LazyImage
              src="/images/9f48eb7fb0.jpg"
              alt="Villa Kephala Welcome"
              className="w-full h-[400px] sm:h-[500px]"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-lg hidden sm:block">
              <p className="font-['Cormorant_Garamond'] text-4xl font-light text-[#C05E44]"><Mountains size={32} weight="thin" /></p>
              <p className="text-sm text-[#57534E] uppercase tracking-wider">Stunning Views</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


// Direct Access to the Sea Section
const SeaAccessSection = () => {
  return (
    <section data-testid="sea-access-section" className="py-12 sm:py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label mb-4 block">The Villa</span>
            <h2 className="section-heading text-3xl sm:text-4xl lg:text-5xl mb-6">
              Direct Access to the Sea
            </h2>
            <div className="space-y-4 text-[#57534E] text-base sm:text-lg leading-relaxed">
              <p>
                Step from the terrace straight down to the crystal-clear waters of the Aegean with private, direct access to a secluded bay and small beach.
              </p>
              <p>
                Take a beanbag down to the water and while away the afternoon with a book, or explore the crystal clear bay at your own pace with one of our stand-up paddle boards (SUPs).
              </p>
              <p>
                This rare feature makes the villa truly special—offering the luxury of privacy alongside the natural beauty of the Greek coastline.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <LazyImage
              src="/images/17ebdc83a4.jpg"
              alt="Steps down to the sea with outdoor shower"
              className="w-full h-[400px] sm:h-[500px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Villa Details Section
const VillaSection = () => {
  return (
    <section id="villa" data-testid="villa-section" className="py-12 sm:py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="text-center mb-10 sm:mb-16">
          <span className="section-label mb-4 block">The Villa</span>
          <h2 className="section-heading text-3xl sm:text-4xl lg:text-5xl mb-6">
            Elegant Cycladic Living
          </h2>
          <p className="text-[#57534E] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            A large, airy, open plan sitting room and dining area form the heart of the home, designed for relaxed living and effortless entertaining.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <House size={32} weight="thin" />,
              title: "Interior Spaces",
              description: "Calm, beautifully interior-designed spaces flow seamlessly outdoors onto generous terraces, creating a natural connection between indoor and outdoor living. The villa is fully air conditioned throughout, with the exception of the Sea Bedroom which is cooled by Dyson fans and sea breezes due to its proximity to the sea."
            },
            {
              icon: <Barbell size={32} weight="thin" />,
              title: "Fully Equipped Kitchen",
              description: "The fully equipped kitchen is complemented by an outdoor bar/kitchen and BBQ area, ideal for long summer lunches and evenings spent cooking and dining under the sky."
            },
            {
              icon: <SunHorizon size={32} weight="thin" />,
              title: "Outdoor Living",
              description: "Multiple outdoor sitting areas are thoughtfully positioned around the villa, allowing guests to find their own moments of peace and tranquility throughout the day. Table tennis, board games, cards and books are also available for your enjoyment."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-solid card-hover p-8"
            >
              <div className="amenity-icon mb-4">{item.icon}</div>
              <h3 className="font-['Cormorant_Garamond'] text-xl mb-3">{item.title}</h3>
              <p className="text-[#57534E] text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Outdoor Living Section
const OutdoorSection = () => {
  return (
    <section data-testid="outdoor-section" className="py-12 sm:py-20 lg:py-32 bg-[#2C423F] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#F3EFEA] text-xs uppercase tracking-[0.2em] font-medium mb-4 block">
              Pool & Outdoor Living
            </span>
            <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl lg:text-5xl font-light mb-6">
              Your Private Paradise
            </h2>
            <div className="space-y-6 text-white/80 leading-relaxed">
              <p>
                The stunning infinity pool overlooks the beautiful bay just 50m below, providing a breathtaking setting for swimming, relaxing, and enjoying the ever-changing light of the Aegean Sea.
              </p>
              <p>
                Outdoor sitting and dining areas beneath wooden pergolas offer welcome shade from the heat of the day, while the constant gentle sea breeze makes these spaces exceptionally comfortable.
              </p>
              <p>
                As evening falls, return to the terraces for sunset drinks, where exquisite views and soft light create unforgettable moments at the end of each day.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <LazyImage
              src={IMAGES.outdoor[14]}
              alt="Infinity pool with bay view"
              className="w-full h-[300px]"
            />
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 p-6">
                <SwimmingPool size={28} weight="thin" className="mb-3" />
                <p className="text-sm">Infinity Pool</p>
              </div>
              <div className="bg-white/10 p-6">
                <Waves size={28} weight="thin" className="mb-3" />
                <p className="text-sm">Direct Beach Access</p>
              </div>
              <div className="bg-white/10 p-6">
                <SunHorizon size={28} weight="thin" className="mb-3" />
                <p className="text-sm">Sunset Terraces</p>
              </div>
              <div className="bg-white/10 p-6">
                <House size={28} weight="thin" className="mb-3" />
                <p className="text-sm">Shaded Pergolas</p>
              </div>
              <div className="bg-white/10 p-6">
                <PersonSimpleSwim size={28} weight="thin" className="mb-3" />
                <p className="text-sm">2 x SUPs</p>
              </div>
              <div className="bg-white/10 p-6">
                <Goggles size={28} weight="thin" className="mb-3" />
                <p className="text-sm">Snorkels & Masks</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Photo Gallery Section
const GallerySection = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("pool");
  const [lightboxImages, setLightboxImages] = useState([]);
  const thumbnailStripRef = useRef(null);
  
  const allImages = [
    // Pool Section and Terraces (user-uploaded - 15 photos)
    // Main photo
    { src: "/images/8092c6c263.jpg", category: "pool", alt: "Pool & Terraces", isMain: true },
    // Pool photos (landscape 3:2)
    { src: "/images/ae754d6429.jpg", category: "pool", alt: "Pool View" },
    { src: "/images/43a8b83e88.jpg", category: "pool", alt: "Sea View Pool" },
    { src: "/images/8d43b64f31.jpg", category: "pool", alt: "Pool Panorama" },
    { src: "/images/9d2143d832.jpg", category: "pool", alt: "Pool & Bay" },
    { src: "/images/cdd9b4e1be.jpg", category: "pool", alt: "Poolside Loungers" },
    { src: "/images/9ff69b9e98.jpg", category: "pool", alt: "Infinity Pool" },
    { src: "/images/560584b6a2.jpg", category: "pool", alt: "Sunset Pool" },
    // Seating areas
    { src: "/images/b113a7166c.jpg", category: "pool", alt: "Terrace Sofa" },
    { src: "/images/5e0f57a7cc.jpg", category: "pool", alt: "Seaside Seating" },
    // Striped beds
    { src: "/images/edede981b2.jpg", category: "pool", alt: "Striped Day Beds" },
    { src: "/images/269422a969.jpg", category: "pool", alt: "Striped Loungers" },
    { src: "/images/ed5808073a.jpg", category: "pool", alt: "Terrace Chaise Lounges" },
    // Different aspect ratio at end
    { src: "/images/1e64e608cd.jpg", category: "pool", alt: "Outdoor Sofa & Chairs" },
    { src: "/images/7367178a9b.jpg", category: "pool", alt: "Woven Chairs & Table" },
    // Down to the Sea (user-uploaded - 11 photos)
    { src: "/images/fa819dfa39.jpg", category: "sea", alt: "Down to the Sea", isMain: true },
    { src: "/images/d67da8202d.jpg", category: "sea", alt: "Coastal Steps" },
    { src: "/images/17ebdc83a4.jpg", category: "sea", alt: "Outdoor Shower" },
    { src: "/images/4f3cb65681.jpg", category: "sea", alt: "Rocky Shore" },
    { src: "/images/0932d52309.jpg", category: "sea", alt: "Sea Cove" },
    { src: "/images/cca3adb8ad.jpg", category: "sea", alt: "Aerial Villa View" },
    { src: "/images/96d0b2d236.jpg", category: "sea", alt: "Aerial Coastline" },
    { src: "/images/6113ab564a.jpg", category: "sea", alt: "Aerial Sea Path" },
    { src: "/images/d3f96fce8a.jpg", category: "sea", alt: "Hillside to Sea" },
    { src: "/images/db0d8e960d.jpg", category: "sea", alt: "Crystal Cove" },
    { src: "/images/dc1115f109.jpg", category: "sea", alt: "Sunset over Bay" },
    // Interior (user-uploaded - 10 photos)
    { src: "/images/45b8235cec.jpg", category: "interior", alt: "Interior", isMain: true },
    { src: "/images/a604cc52a5.jpg", category: "interior", alt: "Living Room" },
    { src: "/images/a9f5a7ad93.jpg", category: "interior", alt: "Sitting Area" },
    { src: "/images/6748387709.jpg", category: "interior", alt: "Dining Area" },
    { src: "/images/75f1be5e62.jpg", category: "interior", alt: "Living Space" },
    { src: "/images/131c758268.jpg", category: "interior", alt: "Interior Detail" },
    { src: "/images/538895f651.jpg", category: "interior", alt: "Lounge" },
    { src: "/images/7df23b4298.jpg", category: "interior", alt: "Dining Room" },
    { src: "/images/01df9b0e86.jpg", category: "interior", alt: "Interior View" },
    // Bedrooms
    { src: IMAGES.bedroom[0], category: "bedrooms", room: "Blue Bedroom", isMain: true, alt: "Blue Bedroom" },
    { src: IMAGES.bedroom[1], category: "bedrooms", room: "Blue Bedroom", alt: "Blue Room - Detail" },
    { src: IMAGES.bedroom[2], category: "bedrooms", room: "Blue Bedroom", alt: "Blue Room - Bed" },
    { src: IMAGES.bedroom[3], category: "bedrooms", room: "Blue Bedroom", alt: "Blue Room - Bathroom" },
    { src: IMAGES.pinkRoom[0], category: "bedrooms", room: "Pink Bedroom", isMain: true, alt: "Pink Bedroom" },
    { src: IMAGES.pinkRoom[1], category: "bedrooms", room: "Pink Bedroom", alt: "Pink Room - Detail" },
    { src: IMAGES.pinkRoom[2], category: "bedrooms", room: "Pink Bedroom", alt: "Pink Room - Bed" },
    { src: IMAGES.pinkRoom[3], category: "bedrooms", room: "Pink Bedroom", alt: "Pink Room - Bathroom" },
    { src: IMAGES.seaRoom[1], category: "bedrooms", room: "Sea Bedroom", isMain: true, alt: "Sea Bedroom" },
    { src: IMAGES.seaRoom[0], category: "bedrooms", room: "Sea Bedroom", alt: "Sea Room - View" },
    { src: IMAGES.seaRoom[2], category: "bedrooms", room: "Sea Bedroom", alt: "Sea Room - Bed" },
    { src: IMAGES.seaRoom[3], category: "bedrooms", room: "Sea Bedroom", alt: "Sea Room - Detail" },
    { src: IMAGES.seaRoom[4], category: "bedrooms", room: "Sea Bedroom", alt: "Sea Room - Bathroom" },
    { src: IMAGES.suzaniRoom[0], category: "bedrooms", room: "Suzani Bedroom", isMain: true, alt: "Suzani Bedroom" },
    { src: IMAGES.suzaniRoom[1], category: "bedrooms", room: "Suzani Bedroom", alt: "Suzani Room - Detail" },
    { src: IMAGES.suzaniRoom[2], category: "bedrooms", room: "Suzani Bedroom", alt: "Suzani Room - Bed" },
    { src: IMAGES.suzaniRoom[3], category: "bedrooms", room: "Suzani Bedroom", alt: "Suzani Room - View" },
    { src: IMAGES.suzaniRoom[4], category: "bedrooms", room: "Suzani Bedroom", alt: "Suzani Room - Bathroom" },
    { src: IMAGES.suzaniRoom[5], category: "bedrooms", room: "Suzani Bedroom", alt: "Suzani Room - Window" },
    { src: IMAGES.topRoom[1], category: "bedrooms", room: "Top Bedroom", isMain: true, alt: "Top Bedroom" },
    { src: IMAGES.topRoom[0], category: "bedrooms", room: "Top Bedroom", alt: "Top Room - View" },
    { src: IMAGES.topRoom[2], category: "bedrooms", room: "Top Bedroom", alt: "Top Room - Bed" },
    { src: IMAGES.topRoom[3], category: "bedrooms", room: "Top Bedroom", alt: "Top Room - Bathroom" },
    // Outdoor Dining (user-uploaded - 8 photos)
    { src: "/images/21f5c1bdc1.jpg", category: "dining", alt: "Outdoor Dining", isMain: true },
    { src: "/images/bec04cb68b.jpg", category: "dining", alt: "Dining Terrace" },
    { src: "/images/41d774ce3a.jpg", category: "dining", alt: "Al Fresco Setting" },
    { src: "/images/1550972adb.jpg", category: "dining", alt: "Table Setting" },
    { src: "/images/631c5f2358.jpg", category: "dining", alt: "Pergola Dining" },
    { src: "/images/aad1f02a12.jpg", category: "dining", alt: "Outdoor Kitchen" },
    { src: "/images/38be002118.jpg", category: "dining", alt: "BBQ Area" },
    { src: "/images/939a04d466.jpg", category: "dining", alt: "Sunset Dinner" },
    // Kitchen (user-uploaded - 4 photos)
    { src: "/images/585db820e5.jpg", category: "kitchen", alt: "Kitchen", isMain: true },
    { src: "/images/9015784f1e.jpg", category: "kitchen", alt: "Kitchen View" },
    { src: "/images/3a92fcae6d.jpg", category: "kitchen", alt: "Kitchen Detail" },
    { src: "/images/6aff5f29ec.jpg", category: "kitchen", alt: "Kitchen Area" },
  ];

  const filteredImages = allImages.filter(img => img.category === activeTab);
  const selectedImage = selectedImageIndex !== null ? lightboxImages[selectedImageIndex] : null;

  const openLightbox = useCallback((images, startIndex) => {
    setLightboxImages(images);
    setSelectedImageIndex(startIndex);
  }, []);

  const goToImage = useCallback((newIndex) => {
    if (newIndex >= 0 && newIndex < lightboxImages.length) {
      setSelectedImageIndex(newIndex);
      setTimeout(() => {
        const thumb = document.querySelector(`[data-thumb-index="${newIndex}"]`);
        if (thumb) thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }, 50);
    }
  }, [lightboxImages.length]);

  const goNext = useCallback(() => {
    if (selectedImageIndex !== null) goToImage((selectedImageIndex + 1) % lightboxImages.length);
  }, [selectedImageIndex, lightboxImages.length, goToImage]);

  const goPrev = useCallback(() => {
    if (selectedImageIndex !== null) goToImage((selectedImageIndex - 1 + lightboxImages.length) % lightboxImages.length);
  }, [selectedImageIndex, lightboxImages.length, goToImage]);

  const closeLightbox = useCallback(() => {
    setSelectedImageIndex(null);
    setLightboxImages([]);
  }, []);

  useEffect(() => {
    if (selectedImageIndex === null) return;
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedImageIndex, goNext, goPrev, closeLightbox]);

  return (
    <section id="gallery" data-testid="gallery-section" className="py-12 sm:py-20 lg:py-32 bg-[#F3EFEA]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="text-center mb-12">
          <span className="section-label mb-4 block">Gallery</span>
          <h2 className="section-heading text-3xl sm:text-4xl lg:text-5xl mb-6">
            Explore Villa Kephala
          </h2>
        </div>

        <Tabs defaultValue="pool" className="villa-tabs" onValueChange={setActiveTab}>
          <TabsList className="mb-8 bg-transparent justify-start sm:justify-center flex-nowrap overflow-x-auto gap-2 pb-2 max-w-full" data-testid="gallery-tabs">
            <TabsTrigger value="pool" className="px-3 sm:px-4 py-2 rounded-none border border-[#E7E5E4] data-[state=active]:bg-[#2C423F] data-[state=active]:text-white data-[state=active]:border-[#2C423F] whitespace-nowrap text-xs sm:text-sm" data-testid="gallery-tab-pool">
              Pool & Terraces
            </TabsTrigger>
            <TabsTrigger value="sea" className="px-3 sm:px-4 py-2 rounded-none border border-[#E7E5E4] data-[state=active]:bg-[#2C423F] data-[state=active]:text-white data-[state=active]:border-[#2C423F] whitespace-nowrap text-xs sm:text-sm" data-testid="gallery-tab-sea">
              Down to the Sea
            </TabsTrigger>
            <TabsTrigger value="interior" className="px-3 sm:px-4 py-2 rounded-none border border-[#E7E5E4] data-[state=active]:bg-[#2C423F] data-[state=active]:text-white data-[state=active]:border-[#2C423F] whitespace-nowrap text-xs sm:text-sm" data-testid="gallery-tab-interior">
              Interior
            </TabsTrigger>
            <TabsTrigger value="dining" className="px-3 sm:px-4 py-2 rounded-none border border-[#E7E5E4] data-[state=active]:bg-[#2C423F] data-[state=active]:text-white data-[state=active]:border-[#2C423F] whitespace-nowrap text-xs sm:text-sm" data-testid="gallery-tab-dining">
              Outdoor Dining
            </TabsTrigger>
            <TabsTrigger value="kitchen" className="px-3 sm:px-4 py-2 rounded-none border border-[#E7E5E4] data-[state=active]:bg-[#2C423F] data-[state=active]:text-white data-[state=active]:border-[#2C423F] whitespace-nowrap text-xs sm:text-sm" data-testid="gallery-tab-kitchen">
              Kitchen
            </TabsTrigger>
            <TabsTrigger value="bedrooms" className="px-3 sm:px-4 py-2 rounded-none border border-[#E7E5E4] data-[state=active]:bg-[#2C423F] data-[state=active]:text-white data-[state=active]:border-[#2C423F] whitespace-nowrap text-xs sm:text-sm" data-testid="gallery-tab-bedrooms">
              Bedrooms
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            {activeTab === "bedrooms" ? (
              <div className="space-y-8">
                {["Blue Bedroom", "Pink Bedroom", "Sea Bedroom", "Suzani Bedroom", "Top Bedroom"].map((roomName) => {
                  const roomImages = filteredImages.filter(img => img.room === roomName);
                  const mainImage = roomImages[0];
                  if (!mainImage) return null;
                  const globalIndex = filteredImages.indexOf(mainImage);
                  return (
                    <div key={roomName}>
                      <h3 className="text-xl sm:text-2xl font-normal tracking-wide text-[#2C423F] mb-4 font-['Cormorant_Garamond']">{roomName}</h3>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="cursor-pointer relative group overflow-hidden"
                        onClick={() => openLightbox(roomImages, 0)}
                        data-testid={`bedroom-main-${roomName.toLowerCase().replace(' ', '-')}`}
                      >
                        <LazyImage
                          src={mainImage.src}
                          alt={mainImage.alt}
                          className="w-full aspect-[16/9]"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                          <span className="text-white text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 px-6 py-3 backdrop-blur-sm">
                            View {roomImages.length} photos
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="cursor-pointer relative group overflow-hidden"
              onClick={() => openLightbox(filteredImages, 0)}
              data-testid="gallery-main-image"
            >
              <LazyImage
                src={filteredImages[0]?.src}
                alt={filteredImages[0]?.alt}
                className="w-full aspect-[16/9]"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <span className="text-white text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 px-6 py-3 backdrop-blur-sm">
                  View {filteredImages.length} photos
                </span>
              </div>
            </motion.div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Lightbox Modal with Navigation */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col bg-black"
            onClick={closeLightbox}
            data-testid="lightbox-modal"
          >
            {/* Top bar: close + counter */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
              <span className="text-white/60 text-sm font-light tracking-wide" data-testid="lightbox-counter">
                {selectedImageIndex + 1} / {lightboxImages.length}
              </span>
              <button
                onClick={closeLightbox}
                className="text-white/70 hover:text-white transition-colors p-1"
                data-testid="lightbox-close"
              >
                <X size={28} weight="light" />
              </button>
            </div>

            {/* Main image area with prev/next */}
            <div className="flex-1 flex items-center justify-center relative min-h-0 px-2 sm:px-16" onClick={(e) => e.stopPropagation()}>
              {/* Previous button */}
              <button
                onClick={goPrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm"
                data-testid="lightbox-prev"
              >
                <CaretLeft size={24} weight="bold" />
              </button>

              {/* Image */}
              <motion.img
                key={selectedImage.src}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.2 }}
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-full object-contain"
                data-testid="lightbox-image"
              />

              {/* Next button */}
              <button
                onClick={goNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm"
                data-testid="lightbox-next"
              >
                <CaretRight size={24} weight="bold" />
              </button>
            </div>

            {/* Thumbnail strip */}
            <div
              ref={thumbnailStripRef}
              className="flex-shrink-0 px-4 pb-4 pt-2 overflow-x-auto"
              onClick={(e) => e.stopPropagation()}
              data-testid="lightbox-thumbnails"
            >
              <div className="flex gap-2 justify-start sm:justify-center mx-auto max-w-5xl">
                {lightboxImages.map((img, i) => (
                  <button
                    key={img.src}
                    data-thumb-index={i}
                    onClick={() => goToImage(i)}
                    className={`flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 overflow-hidden transition-all duration-200 ${
                      i === selectedImageIndex
                        ? "ring-2 ring-white opacity-100"
                        : "opacity-40 hover:opacity-70"
                    }`}
                    data-testid={`lightbox-thumb-${i}`}
                  >
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Bedrooms Section
const BedroomsSection = () => {
  return (
    <section data-testid="bedrooms-section" className="py-12 sm:py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <LazyImage
              src={IMAGES.bedroom[1]}
              alt="Bedroom detail"
              className="w-full h-[400px] sm:h-[500px]"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <span className="section-label mb-4 block">Bedrooms</span>
            <h2 className="section-heading text-3xl sm:text-4xl lg:text-5xl mb-6">
              Restful Retreat
            </h2>
            <div className="space-y-4 text-[#57534E] leading-relaxed mb-8">
              <p>All bedrooms are generously sized with shutters and fly screens. Luxurious premium mattresses and bed linen in all rooms ensuring a restorative night's sleep.</p>
              <p>Wake up to the sound of the waves. Every bedroom has spectacular sea views.</p>
            </div>
            <ul className="space-y-3">
              {[
                "4 Superkings (All with A/C and 2 can be made into twins)",
                "1 King (Dyson fans & sea breezes — no A/C)",
                "All rooms with en-suite bathrooms",
                "TVs in 4 bedrooms and sitting room"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle size={20} weight="fill" className="text-[#C05E44] mt-0.5 flex-shrink-0" />
                  <span className="text-[#57534E]">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Amenities Section
const AmenitiesSection = () => {
  const amenities = [
    { icon: <Bed size={28} weight="thin" />, label: "5 Double Bedrooms" },
    { icon: <Bathtub size={28} weight="thin" />, label: "En-suite Bathrooms" },
    { icon: <SwimmingPool size={28} weight="thin" />, label: "Infinity Pool" },
    { icon: <Waves size={28} weight="thin" />, label: "Beach Access" },
    { icon: <Snowflake size={28} weight="thin" />, label: "Air Conditioning" },
    { icon: <WifiHigh size={28} weight="thin" />, label: "Starlink WiFi" },
    { icon: <TelevisionSimple size={28} weight="thin" />, label: "Smart TVs" },
    { icon: <WashingMachine size={28} weight="thin" />, label: "Washer/Dryer" },
    { icon: <PersonSimpleSwim size={28} weight="thin" />, label: "SUPs" },
    { icon: <GameController size={28} weight="thin" />, label: "Table Tennis" },
    { icon: <Goggles size={28} weight="thin" />, label: "Masks & Snorkels" },
    { icon: <Barbell size={28} weight="thin" />, label: "Yoga Mats & Weights" },
  ];

  return (
    <section data-testid="amenities-section" className="py-12 sm:py-20 lg:py-32 bg-[#F3EFEA]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="text-center mb-12">
          <span className="section-label mb-4 block">Amenities</span>
          <h2 className="section-heading text-3xl sm:text-4xl lg:text-5xl mb-6">
            Everything You Need
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {amenities.map((amenity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="amenity-item text-center p-6 bg-white border border-[#E7E5E4]"
              data-testid={`amenity-${index}`}
            >
              <div className="amenity-icon flex justify-center mb-3">{amenity.icon}</div>
              <p className="text-sm text-[#57534E]">{amenity.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center text-[#57534E]"
        >
          <p className="text-sm">
            Guided trips, boats, cycling, baby sitting, personal chefs, daily maid service and home cooked food deliveries on request.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "We had the most glorious vacation at Villa Kephala. The villa is gorgeous and beautifully furnished and fully equipped. The outdoor living area is heavenly and the infinity pool is bliss. The view from the villa is beautiful-hillsides and the bluest sea. There are steps down to the little private beach for those who want to sea swim. I would highly recommend this villa - we can't wait to return!"
    },
    {
      quote: "Had an exquisite 5 days here with my girlfriends....it was magical. Beautiful house with all the amenities. Amazing outside space for al fresco dining. A good sized pool with sea front views. Sundowners and amazing sunsets topped it off! Will be returning and would highly recommend."
    },
    {
      quote: "We had such a wonderful holiday at this beautiful villa. Incredible sea views from each en-suite bedroom, lots of great terraces with comfy seating areas for cocktails, and direct access to the sea for morning dips. Beautiful pool and conveniently close to local amenities. Can't recommend highly enough!"
    },
    {
      quote: "Wow, wow, wow. We were blown away by Villa Kephala. Its dreamy position, the crashing waves, the starlit skies. Sitting alfresco whilst drinking rose and talking & laughing, all cares slipped away. The soft beds, sun loungers and sea snorkelling. The only bad thing about this holiday is leaving!"
    },
    {
      quote: "This is a beautiful home and island. We have been captivated by the scenery and people. Kea really is an undiscovered gem — long may it last. We had the most magical family holiday!"
    },
    {
      quote: "Thank you for sharing your amazing home with us! The style, comfort and location all make this place so unique and memorable. We especially enjoyed early morning swims in the sea, afternoon reading by the pool and evenings watching extraordinary sunsets."
    },
    {
      quote: "We have had the most wonderful few days here. We are all wishing for a few more! It's so peaceful, so private, so beautiful. We've enjoyed the beach & pool here, had amazing boats trips to visit ancient ruins & secluded beaches, and been fed to bursting point. Villa Kephala has been an unparalleled success!"
    },
    {
      quote: "Wow, this house is truly one of the most magical ever! We have loved slipping into the sea, soaking in the sun on the loungers & falling asleep to sound of the waves every night. It has been a perfect week!"
    }
  ];

  return (
    <section data-testid="testimonials-section" className="py-12 sm:py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="text-center mb-10 sm:mb-16">
          <span className="section-label mb-4 block">Guest Reviews</span>
          <h2 className="section-heading text-3xl sm:text-4xl lg:text-5xl mb-6">
            What Our Guests Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#F3EFEA] p-8"
              data-testid={`testimonial-${index}`}
            >
              <div className="text-[#C05E44] text-4xl font-serif mb-4">"</div>
              <p className="text-[#57534E] text-sm leading-relaxed italic">
                {testimonial.quote}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// About Kea Section
const AboutKeaSection = () => {
  return (
    <section data-testid="about-kea-section" className="py-12 sm:py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label mb-4 block">About Kea</span>
            <h2 className="section-heading text-3xl sm:text-4xl lg:text-5xl mb-6">
              The Hidden Gem of the Cyclades
            </h2>
            <div className="space-y-6 text-[#57534E] leading-relaxed">
              <p>
                Kea is the hidden gem of the Cyclades. It is particularly easy to reach and as a result has long attracted Athenians, many of whom have chosen the island for their holiday homes.
              </p>
              <p>
                It is known for its popular hiking trails, ancient history, beaches, oak forests and scuba diving. Visitors are drawn by Kea's beautiful beaches and enchanting landscape, where vines and fruit trees flourish.
              </p>
              <p>
                Inland, gentle rolling hills reveal ancient mule tracks, historic monasteries, striking rock formations and traditional windmills.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-[#F3EFEA] p-8">
              <h3 className="font-['Cormorant_Garamond'] text-2xl mb-4">Korissia</h3>
              <p className="text-[#57534E] text-sm leading-relaxed">
                The port of the island, located on a big natural bay. Here you will find many excellent tavernas, cafes, bakeries, bars and shops.
              </p>
            </div>
            <div className="bg-[#F3EFEA] p-8">
              <h3 className="font-['Cormorant_Garamond'] text-2xl mb-4">Vourkari</h3>
              <p className="text-[#57534E] text-sm leading-relaxed">
                A picturesque fishing village, now a cosmopolitan place frequented by many luxury yachts. This protected bay is often full of sailing boats and is a bustling spot in summer. It is a great place to spend an evening at one of the many excellent restaurants and bars.
              </p>
            </div>
            <div className="bg-[#F3EFEA] p-8">
              <h3 className="font-['Cormorant_Garamond'] text-2xl mb-4">Ioulis (Chora)</h3>
              <p className="text-[#57534E] text-sm leading-relaxed">
                A hillside village of tightly built traditional white houses with reddish tiles on the hillside. Its narrow stone-paved alleys, numerous chapels, restaurants and shops are definitely worth a visit.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Activities Section
const ActivitiesSection = () => {
  const activities = [
    {
      icon: <Mountains size={48} weight="thin" />,
      title: "Hiking",
      description: "81 km of stone-paved footpaths thread the island, well maintained and marked, a joy to walk especially in spring."
    },
    {
      icon: <Fish size={48} weight="thin" />,
      title: "Scuba Diving",
      description: "Exceptionally clear waters with teeming marine life, and for the experienced diver, excellent wreck diving, including Britannic, sister ship of Titanic."
    },
    {
      icon: <Boat size={48} weight="thin" />,
      title: "Boating",
      description: "Many of the beautiful beaches along the coast are best explored by boat. Hire one with a captain for the day."
    },
    {
      icon: <Bicycle size={48} weight="thin" />,
      title: "Cycling",
      description: "Explore Kea's beauty on two wheels. Electric bikes available for rent, making the mountainous terrain enjoyable."
    },
    {
      icon: <TennisBall size={48} weight="thin" />,
      title: "Padel & Tennis",
      description: "Get active with a game of padel or tennis — perfect for fun, fitness and a little friendly competition."
    }
  ];

  return (
    <section id="activities" data-testid="activities-section" className="py-12 sm:py-20 lg:py-32 bg-[#F3EFEA]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="text-center mb-12">
          <span className="section-label mb-4 block">What To Do</span>
          <h2 className="section-heading text-3xl sm:text-4xl lg:text-5xl mb-6">
            Explore Kea
          </h2>
          <p className="text-[#57534E] text-base sm:text-lg max-w-2xl mx-auto">
            From pristine beaches and ancient ruins to underwater adventures and scenic trails.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 border border-[#E7E5E4] text-center card-hover"
              data-testid={`activity-card-${index}`}
            >
              <div className="text-[#C05E44] flex justify-center mb-4">{activity.icon}</div>
              <h3 className="font-['Cormorant_Garamond'] text-2xl mb-3">{activity.title}</h3>
              <p className="text-[#57534E] text-sm leading-relaxed">
                {activity.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-white p-8 border border-[#E7E5E4]">
            <h3 className="font-['Cormorant_Garamond'] text-2xl mb-4">Beaches</h3>
            <p className="text-[#57534E] text-sm leading-relaxed">
              Exceptional variety including Tris Amoudia, Otzias, Spathi, Gialiskari and Korissia. Numerous pristine hidden beaches accessible by 4x4: Xyla, Orkos, Liparo and Lygia.
            </p>
          </div>
          <div className="bg-white p-8 border border-[#E7E5E4]">
            <h3 className="font-['Cormorant_Garamond'] text-2xl mb-4">Historical Sites</h3>
            <p className="text-[#57534E] text-sm leading-relaxed">
              The archaeological site of Karthaia dates back to the 8th century BC with an ancient theatre and Doric temple. The stone lion, the island's trademark, dates from 6-7th BC.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Location & Map Section
const LocationSection = () => {
  return (
    <section id="location" data-testid="location-section" className="py-12 sm:py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label mb-4 block">Location</span>
            <h2 className="section-heading text-3xl sm:text-4xl lg:text-5xl mb-6">
              Easy to Reach, Hard to Leave
            </h2>
            <div className="space-y-6 text-[#57534E] leading-relaxed mb-8">
              <p>
                Kea is the closest Cycladic island to Athens, and being only an hour by ferry from the small port of Lavrio, makes it easily accessible from the city. The airport is just a 35 minute taxi ride to Lavrio port.
              </p>
              <p>
                Villa Kephala is very peaceful and private, yet not isolated, sitting just above a beautiful bay on a small peninsula that houses about a dozen villas, opposite Cape Kephala famous for an important late Neolithic settlement.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: <Timer size={20} />, text: "15 mins from Korissia port" },
                { icon: <MapPin size={20} />, text: "10 mins to Vourkari restaurants & shops" },
                { icon: <Waves size={20} />, text: "5 mins to Otzias beach" },
                { icon: <Anchor size={20} />, text: "1 hour ferry from Lavrio to Kea" },
                { icon: <AirplaneTakeoff size={20} />, text: "35 mins taxi from Athens airport to Lavrio Port" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-[#57534E]">
                  <span className="text-[#C05E44]">{item.icon}</span>
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="map-container h-[400px] lg:h-full min-h-[400px]"
          >
            <iframe
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Villa+Kephala,+840+02+Kea,+Greece&zoom=14"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Villa Kephala Location"
              data-testid="location-map"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// How to Get There Section
const GettingThereSection = () => {
  return (
    <section data-testid="getting-there-section" className="py-12 sm:py-20 lg:py-32 bg-[#2C423F] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="text-center mb-12">
          <span className="text-[#F3EFEA] text-xs uppercase tracking-[0.2em] font-medium mb-4 block">
            Getting There
          </span>
          <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl lg:text-5xl font-light mb-6">
            How to Reach Kea
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {[
            {
              icon: <Anchor size={40} weight="thin" />,
              title: "By Ferry",
              description: "Car & passenger ferries go 4-5 times daily in high season from Lavrio Port (35 mins from Athens Airport). Book at least a few days in advance during peak months.",
              link: "https://www.ferryhopper.com/",
              linkText: "Book Ferry"
            },
            {
              icon: <AirplaneTilt size={40} weight="thin" />,
              title: "By Helicopter",
              description: "Scheduled helicopter transfers available a couple of days a week for those with little luggage. Quick and scenic option.",
              link: "https://flyhoper.com/destinations/greece/kea",
              linkText: "View Flights"
            },
            {
              icon: <Boat size={40} weight="thin" />,
              title: "Speedboat Transfer",
              description: "Private speedboat transfers are available (depending on sea conditions) and take roughly 40 minutes.",
              link: "https://keadivers.com/useful.html",
              linkText: "More Info"
            },
            {
              icon: <CarSimple size={40} weight="thin" />,
              title: "Car Hire",
              description: "All major car hire companies at Athens airport. You can also hire cars on Kea via Avance, a short walk from the ferry dock.",
              link: "https://avance.gr/locations/kea-tzia/",
              linkText: "Rent a Car"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-8 bg-white/5 border border-white/10"
              data-testid={`transport-option-${index}`}
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="font-['Cormorant_Garamond'] text-2xl mb-4">{item.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-6">{item.description}</p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm text-[#C05E44] hover:text-[#F3EFEA] transition-colors"
              >
                {item.linkText} →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  return (
    <section id="contact" data-testid="contact-section" className="py-12 sm:py-20 lg:py-32">
      <div className="max-w-3xl mx-auto px-6 sm:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label mb-4 block">Rental Rates</span>
          <p className="text-[#57534E] text-base sm:text-lg leading-relaxed mb-12 font-['Cormorant_Garamond'] text-xl sm:text-2xl">
            From &euro;675/night in low season to &euro;1,500/night in high season.
          </p>
          <span className="section-label mb-4 block">Contact</span>
          <h2 className="section-heading text-3xl sm:text-4xl lg:text-5xl mb-10">
            Get in Touch
          </h2>
          <div className="space-y-6">
            <a href="mailto:Lucinda.byng@btinternet.com" className="flex items-center justify-center gap-3 sm:gap-4 text-[#2C423F] hover:text-[#C05E44] transition-colors group" data-testid="contact-email">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 bg-[#F3EFEA] flex items-center justify-center group-hover:bg-[#C05E44]/10 transition-colors">
                <EnvelopeSimple size={20} className="text-[#C05E44]" />
              </div>
              <span className="text-sm sm:text-lg font-['Cormorant_Garamond'] break-all sm:break-normal">Lucinda.byng@btinternet.com</span>
            </a>
            <a href="tel:+447887945315" className="flex items-center justify-center gap-3 sm:gap-4 text-[#2C423F] hover:text-[#C05E44] transition-colors group" data-testid="contact-phone">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 bg-[#F3EFEA] flex items-center justify-center group-hover:bg-[#C05E44]/10 transition-colors">
                <Phone size={20} className="text-[#C05E44]" />
              </div>
              <span className="text-sm sm:text-lg font-['Cormorant_Garamond']">+44 7887 945 315</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer data-testid="footer" className="bg-[#1C1917] text-white py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-['Cormorant_Garamond'] text-2xl mb-4">Villa Kephala</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              An exceptional seafront villa in unspoilt Kea, Greece. Where refined interiors meet the endless blue of the Aegean Sea.
            </p>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["The Villa", "Gallery", "Activities", "Location", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4">Learn More</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.cntraveller.com/article/kea-greece-guide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 text-sm hover:text-white transition-colors"
                >
                  Condé Nast Traveller Guide
                </a>
              </li>
              <li>
                <a
                  href="https://www.bbc.co.uk/travel/article/20240814-kea-the-tiny-idyllic-island-where-greeks-escape-the-heat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 text-sm hover:text-white transition-colors"
                >
                  BBC Travel Feature
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Villa Kephala. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <SonnerToaster position="top-right" richColors closeButton />
      <Navigation />
      <HeroSection />
      <IntroSection />
      <VillaSection />
      <OutdoorSection />
      <SeaAccessSection />
      <GallerySection />
      <BedroomsSection />
      <AmenitiesSection />
      <TestimonialsSection />
      <AboutKeaSection />
      <ActivitiesSection />
      <LocationSection />
      <GettingThereSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
