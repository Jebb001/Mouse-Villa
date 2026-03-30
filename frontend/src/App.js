import { useState, useEffect } from "react";
import "@/App.css";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bed, SwimmingPool, Waves, Mountains, WifiHigh, AirplaneTilt, 
  MapPin, House, SunHorizon, Compass, CaretDown, List, X, 
  EnvelopeSimple, Phone, User, Barbell, Boat, Bicycle, Fish,
  Timer, CarSimple, Anchor, AirplaneTakeoff, CheckCircle,
  Bathtub, Snowflake, TelevisionSimple, WashingMachine, Fan
} from "@phosphor-icons/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Button } from "./components/ui/button";
import { Label } from "./components/ui/label";
import { Toaster as SonnerToaster, toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Image assets - User provided photos only
const IMAGES = {
  // Sea/Outdoor photos
  hero: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/vx9wi6rx_Front%20page%20shot.jpg",
  outdoor: [
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/x4lznzvc_6X3A3243.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/zb6h31z5_6X3A3248.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/ic7n3s3i_6X3A3250.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/2mdq8ey6_6X3A3316.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/69ydmkh8_6X3A3320.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/p7t6012q_6X3A2862.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/irdvpl1j_6X3A2942.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/ptsy2naq_6X3A2953.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/os7nbj1z_6X3A2979.jpg"
  ],
  // Blue Room bedroom photos
  bedroom: [
    "https://customer-assets.emergentagent.com/job_fe429844-f03e-4126-85d4-d6ca607e49e7/artifacts/ylvi6l68_6X3A3119.jpg",
    "https://customer-assets.emergentagent.com/job_fe429844-f03e-4126-85d4-d6ca607e49e7/artifacts/m44rfaon_6X3A3127.jpg",
    "https://customer-assets.emergentagent.com/job_fe429844-f03e-4126-85d4-d6ca607e49e7/artifacts/ok2dvnl2_6X3A3131.jpg",
    "https://customer-assets.emergentagent.com/job_fe429844-f03e-4126-85d4-d6ca607e49e7/artifacts/b17g8dh2_6X3A3137.jpg"
  ],
  // Pink Room bedroom photos
  pinkRoom: [
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/07dv74jy_6X3A3145.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/aj900s2l_6X3A3168.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/vsj0m48k_6X3A3175.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/dmgvmmhh_6X3A3181.jpg"
  ],
  // Sea Room bedroom photos
  seaRoom: [
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/aqsbr719_6X3A3328.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/a5axtx6c_6X3A3331.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/d75kfy8y_6X3A3337.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/jt3r2pr1_6X3A3338.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/5za68vwo_6X3A3353.jpg"
  ],
  // Suzani Room bedroom photos
  suzaniRoom: [
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/2o093qsj_6X3A2737.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/4w9qrq0a_6X3A2750.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/zappo98a_6X3A2771.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/s24i0mtn_6X3A2781.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/nv8txv0a_6X3A2790.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/vnxc3gej_6X3A2722.jpg"
  ],
  // Interior/Sitting/Dining photos
  interior: [
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/76o7azlg_6X3A2502.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/vabzeoaq_6X3A2517.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/ci8nzblb_6X3A2527.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/19vile9q_6X3A2533.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/2r1yshyg_6X3A3038.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/rvfhrpwi_6X3A2420.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/lqu7ngfa_6X3A2455.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/utmp36zb_6X3A2461.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/bx7brtoq_6X3A2478.jpg"
  ],
  // Kitchen photos
  kitchen: [
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/0ba49ave_6X3A3048.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/196buzqy_6X3A3075.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/mydj1z33_6X3A3076.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/li8z02gw_6X3A3080.jpg"
  ],
  // Outdoor Dining & BBQ photos
  terrace: [
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/47wtgc6j_6X3A2648.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/oirpup82_6X3A2977.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/d5rpgebi_6X3A3007.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/glt1yit6_6X3A3010.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/2m1ujmwr_6X3A3271.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/grvt1i8p_6X3A2610.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/tqmq62fj_6X3A2619.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/4enq669i_IMG_8792.jpeg"
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
              data-testid="nav-inquire-btn"
            >
              Inquire
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
                Inquire
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
            <a href="#contact" className="btn-outline border-white text-white hover:bg-white hover:text-[#1C1917] px-8 py-3 text-sm font-medium rounded-none" data-testid="hero-inquire-btn">
              Make an Inquiry
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
    <section data-testid="intro-section" className="py-20 sm:py-32 bg-[#F3EFEA]">
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
              This exceptional seafront villa is newly completed and presented in immaculate condition throughout. It offers five generous double bedrooms, all with sea views and each with its own en-suite bathroom, providing both comfort and privacy for all guests.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <img
              src={IMAGES.interior[0]}
              alt="Villa interior"
              className="w-full h-[400px] sm:h-[500px] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-lg hidden sm:block">
              <p className="font-['Cormorant_Garamond'] text-4xl font-light text-[#C05E44]">5</p>
              <p className="text-sm text-[#57534E] uppercase tracking-wider">Bedrooms</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Villa Details Section
const VillaSection = () => {
  return (
    <section id="villa" data-testid="villa-section" className="py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="text-center mb-16">
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
              description: "Calm, beautifully interior-designed spaces flow seamlessly outdoors onto generous terraces, creating a natural connection between indoor and outdoor living."
            },
            {
              icon: <Barbell size={32} weight="thin" />,
              title: "Fully Equipped Kitchen",
              description: "The fully equipped kitchen is complemented by an outdoor bar/kitchen and BBQ area, ideal for long summer lunches and evenings spent cooking and dining under the sky."
            },
            {
              icon: <Snowflake size={32} weight="thin" />,
              title: "Air Conditioned",
              description: "The villa is fully air-conditioned, ensuring comfort throughout the warmer months. One bedroom features Dyson fans and sea breezes due to its proximity to the sea."
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
    <section data-testid="outdoor-section" className="py-20 sm:py-32 bg-[#2C423F] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#F3EFEA] text-xs uppercase tracking-[0.2em] font-medium mb-4 block">
              Outdoor Living
            </span>
            <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl lg:text-5xl font-light mb-6">
              Where Land Meets Sea
            </h2>
            <div className="space-y-6 text-white/80 leading-relaxed">
              <p>
                Outdoor sitting and dining areas beneath wooden pergolas offer welcome shade from the heat of the day, while the constant gentle sea breeze makes these spaces exceptionally comfortable.
              </p>
              <p>
                Multiple outdoor sitting areas are thoughtfully positioned around the villa, allowing guests to find their own moments of peace and tranquility throughout the day.
              </p>
              <p>
                An infinity pool overlooks the beautiful bay just 50m below, providing a breathtaking setting for swimming, relaxing, and enjoying the ever-changing light of the sea.
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
            <img
              src={IMAGES.outdoor[0]}
              alt="Path to the sea"
              className="w-full h-[300px] object-cover"
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
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 p-8 bg-white/5 border border-white/10"
        >
          <p className="text-white/90 text-base sm:text-lg leading-relaxed italic">
            "Stone steps lead directly from the house down to pristine waters and a small, secluded beach. Take a bean bag pouf down to the shore, settle in with a book, swim in crystal-clear waters, and while away the hours in complete serenity."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Photo Gallery Section
const GallerySection = () => {
  const allImages = [
    { src: IMAGES.interior[0], category: "interior", alt: "Living Room" },
    { src: IMAGES.terrace[0], category: "terrace", alt: "Outdoor Dining" },
    { src: IMAGES.bedroom[0], category: "bedroom", alt: "Blue Room" },
    { src: IMAGES.outdoor[0], category: "outdoor", alt: "Path to the Sea" },
    { src: IMAGES.pinkRoom[0], category: "bedroom", alt: "Pink Room" },
    { src: IMAGES.seaRoom[0], category: "bedroom", alt: "Sea Room" },
    { src: IMAGES.suzaniRoom[0], category: "bedroom", alt: "Suzani Room" },
    { src: IMAGES.interior[1], category: "interior", alt: "Sitting Area" },
    { src: IMAGES.kitchen[0], category: "kitchen", alt: "Kitchen" },
    { src: IMAGES.terrace[1], category: "terrace", alt: "BBQ Area" },
    { src: IMAGES.bedroom[1], category: "bedroom", alt: "Blue Room - Detail" },
    { src: IMAGES.pinkRoom[1], category: "bedroom", alt: "Pink Room - Detail" },
    { src: IMAGES.seaRoom[1], category: "bedroom", alt: "Sea Room - View" },
    { src: IMAGES.suzaniRoom[1], category: "bedroom", alt: "Suzani Room - Detail" },
    { src: IMAGES.interior[2], category: "interior", alt: "Dining Area" },
    { src: IMAGES.outdoor[1], category: "outdoor", alt: "Stone Steps" },
    { src: IMAGES.terrace[2], category: "terrace", alt: "Terrace Dining" },
    { src: IMAGES.kitchen[1], category: "kitchen", alt: "Kitchen View" },
    { src: IMAGES.interior[3], category: "interior", alt: "Interior" },
    { src: IMAGES.bedroom[2], category: "bedroom", alt: "Blue Room - Bed" },
    { src: IMAGES.pinkRoom[2], category: "bedroom", alt: "Pink Room - Bed" },
    { src: IMAGES.seaRoom[2], category: "bedroom", alt: "Sea Room - Bed" },
    { src: IMAGES.suzaniRoom[2], category: "bedroom", alt: "Suzani Room - Bed" },
    { src: IMAGES.outdoor[2], category: "outdoor", alt: "Coastal View" },
    { src: IMAGES.terrace[3], category: "terrace", alt: "Outdoor Kitchen" },
    { src: IMAGES.interior[4], category: "interior", alt: "Living Space" },
    { src: IMAGES.kitchen[2], category: "kitchen", alt: "Kitchen Detail" },
    { src: IMAGES.terrace[7], category: "terrace", alt: "Sunset Dining" },
    { src: IMAGES.bedroom[3], category: "bedroom", alt: "Blue Room - Bathroom" },
    { src: IMAGES.pinkRoom[3], category: "bedroom", alt: "Pink Room - Bathroom" },
    { src: IMAGES.seaRoom[3], category: "bedroom", alt: "Sea Room - Detail" },
    { src: IMAGES.suzaniRoom[3], category: "bedroom", alt: "Suzani Room - View" },
    { src: IMAGES.seaRoom[4], category: "bedroom", alt: "Sea Room - Bathroom" },
    { src: IMAGES.suzaniRoom[4], category: "bedroom", alt: "Suzani Room - Bathroom" },
    { src: IMAGES.suzaniRoom[5], category: "bedroom", alt: "Suzani Room - Window" },
    { src: IMAGES.outdoor[3], category: "outdoor", alt: "Bay View" },
    { src: IMAGES.terrace[4], category: "terrace", alt: "Pergola Dining" },
    { src: IMAGES.interior[5], category: "interior", alt: "Interior Detail" },
    { src: IMAGES.kitchen[3], category: "kitchen", alt: "Kitchen Area" },
    { src: IMAGES.terrace[5], category: "terrace", alt: "Terrace View" },
    { src: IMAGES.interior[6], category: "interior", alt: "Dining Room" },
    { src: IMAGES.outdoor[4], category: "outdoor", alt: "Sea Access" },
    { src: IMAGES.outdoor[5], category: "outdoor", alt: "Terrace View" },
    { src: IMAGES.outdoor[6], category: "outdoor", alt: "Outdoor Area" },
    { src: IMAGES.outdoor[7], category: "outdoor", alt: "Villa Exterior" },
    { src: IMAGES.outdoor[8], category: "outdoor", alt: "Terrace Seating" },
    { src: IMAGES.terrace[6], category: "terrace", alt: "Outdoor Seating" },
    { src: IMAGES.interior[7], category: "interior", alt: "Living Area" },
    { src: IMAGES.interior[8], category: "interior", alt: "Interior View" },
  ];

  const [activeTab, setActiveTab] = useState("all");

  const filteredImages = activeTab === "all" 
    ? allImages 
    : allImages.filter(img => img.category === activeTab);

  return (
    <section id="gallery" data-testid="gallery-section" className="py-20 sm:py-32 bg-[#F3EFEA]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="text-center mb-12">
          <span className="section-label mb-4 block">Gallery</span>
          <h2 className="section-heading text-3xl sm:text-4xl lg:text-5xl mb-6">
            Explore Villa Kephala
          </h2>
        </div>

        <Tabs defaultValue="all" className="villa-tabs" onValueChange={setActiveTab}>
          <TabsList className="mb-8 bg-transparent justify-center flex-wrap gap-2" data-testid="gallery-tabs">
            <TabsTrigger value="all" className="px-6 py-2 rounded-none border border-[#E7E5E4] data-[state=active]:bg-[#2C423F] data-[state=active]:text-white data-[state=active]:border-[#2C423F]" data-testid="gallery-tab-all">
              All
            </TabsTrigger>
            <TabsTrigger value="interior" className="px-6 py-2 rounded-none border border-[#E7E5E4] data-[state=active]:bg-[#2C423F] data-[state=active]:text-white data-[state=active]:border-[#2C423F]" data-testid="gallery-tab-interior">
              Interior
            </TabsTrigger>
            <TabsTrigger value="kitchen" className="px-6 py-2 rounded-none border border-[#E7E5E4] data-[state=active]:bg-[#2C423F] data-[state=active]:text-white data-[state=active]:border-[#2C423F]" data-testid="gallery-tab-kitchen">
              Kitchen
            </TabsTrigger>
            <TabsTrigger value="terrace" className="px-6 py-2 rounded-none border border-[#E7E5E4] data-[state=active]:bg-[#2C423F] data-[state=active]:text-white data-[state=active]:border-[#2C423F]" data-testid="gallery-tab-terrace">
              Terrace & BBQ
            </TabsTrigger>
            <TabsTrigger value="bedroom" className="px-6 py-2 rounded-none border border-[#E7E5E4] data-[state=active]:bg-[#2C423F] data-[state=active]:text-white data-[state=active]:border-[#2C423F]" data-testid="gallery-tab-bedrooms">
              Bedrooms
            </TabsTrigger>
            <TabsTrigger value="outdoor" className="px-6 py-2 rounded-none border border-[#E7E5E4] data-[state=active]:bg-[#2C423F] data-[state=active]:text-white data-[state=active]:border-[#2C423F]" data-testid="gallery-tab-outdoor">
              Sea & Outdoor
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              layout
            >
              <AnimatePresence mode="popLayout">
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.src}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`gallery-item cursor-pointer ${
                      index === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                    }`}
                    data-testid={`gallery-image-${index}`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className={`w-full object-cover ${
                        index === 0 ? "h-[400px] sm:h-full" : "h-[250px]"
                      }`}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

// Bedrooms Section
const BedroomsSection = () => {
  return (
    <section data-testid="bedrooms-section" className="py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <img
              src={IMAGES.bedroom[1]}
              alt="Bedroom detail"
              className="w-full h-[400px] sm:h-[500px] object-cover"
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
                "4 Superkings (2 can be made into twin bedrooms)",
                "1 King (cooled by Dyson fans and sea breezes)",
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
  ];

  return (
    <section data-testid="amenities-section" className="py-20 sm:py-32 bg-[#F3EFEA]">
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
            Guided trips, boats, restaurants, cycling, baby-sitting, personal chefs etc can all be organised on request.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// About Kea Section
const AboutKeaSection = () => {
  return (
    <section data-testid="about-kea-section" className="py-20 sm:py-32">
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
                Kea is the hidden gem of the Cyclades. Only an hour by ferry from Lavrio port (30 mins from Athens airport), it is particularly easy to reach and as a result has long attracted Athenians, many of whom have chosen the island for their holiday homes.
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
                A picturesque fishing village, now a cosmopolitan place frequented by many luxury yachts. This protected bay is often full of sailing boats and is a bustling spot in summer.
              </p>
            </div>
            <div className="bg-[#F3EFEA] p-8">
              <h3 className="font-['Cormorant_Garamond'] text-2xl mb-4">Ioulis (Chora)</h3>
              <p className="text-[#57534E] text-sm leading-relaxed">
                A village of tightly built traditional white houses with reddish tiles on the hillside. Its narrow stone-paved alleys, numerous chapels, restaurants and shops are definitely worth a visit.
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
      icon: <Mountains size={32} weight="thin" />,
      title: "Hiking",
      description: "81 km of stone-paved footpaths thread the island, well maintained and marked, a joy to walk especially in spring.",
      image: IMAGES.outdoor[1]
    },
    {
      icon: <Fish size={32} weight="thin" />,
      title: "Scuba Diving",
      description: "Exceptionally clear waters with marine life. Visit the Brittanic wreck (Titanic's sister ship) or other wrecks nearby.",
      image: IMAGES.outdoor[2]
    },
    {
      icon: <Boat size={32} weight="thin" />,
      title: "Boating",
      description: "Many beautiful beaches along the coast are best explored by boat. Hire one with a captain for a day of snorkeling.",
      image: IMAGES.outdoor[3]
    },
    {
      icon: <Bicycle size={32} weight="thin" />,
      title: "Cycling",
      description: "Explore Kea's beauty on two wheels. Electric bikes available for rent, making the mountainous terrain enjoyable.",
      image: IMAGES.outdoor[4]
    }
  ];

  return (
    <section id="activities" data-testid="activities-section" className="py-20 sm:py-32 bg-[#F3EFEA]">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="activity-card group relative h-[350px] overflow-hidden"
              data-testid={`activity-card-${index}`}
            >
              <img
                src={activity.image}
                alt={activity.title}
                className="w-full h-full object-cover"
              />
              <div className="activity-overlay absolute inset-0" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="mb-3">{activity.icon}</div>
                <h3 className="font-['Cormorant_Garamond'] text-2xl mb-2">{activity.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {activity.description}
                </p>
              </div>
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
              Exceptional variety including Tris Amoudia, Otzias, Gialiskari and Korissia. Numerous pristine hidden beaches accessible by 4x4: Xyla, Orkos, Liparo and Lygia.
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
    <section id="location" data-testid="location-section" className="py-20 sm:py-32">
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
                Kea is the closest Cycladic island to Athens, and being only an hour by ferry from the small port of Lavrio, makes it easily accessible from the airport and city.
              </p>
              <p>
                Villa Kephala is very peaceful and private, yet not isolated, sitting just above a beautiful bay on a small peninsula that houses about 9 villas, opposite Cape Kephala famous for an important late Neolithic settlement.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: <Timer size={20} />, text: "15 mins from Korissia port" },
                { icon: <MapPin size={20} />, text: "10 mins to Vourkari restaurants & shops" },
                { icon: <Waves size={20} />, text: "5 mins to Otzias beach" },
                { icon: <Anchor size={20} />, text: "1 hour ferry from Lavrio" },
                { icon: <AirplaneTakeoff size={20} />, text: "35 mins taxi from Athens airport" }
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50541.13082476457!2d24.28!3d37.62!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a29e8a1b8d3bd5%3A0x400bd2ce2b9b830!2sKea%2C%20Greece!5e0!3m2!1sen!2sus!4v1699000000000!5m2!1sen!2sus"
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
    <section data-testid="getting-there-section" className="py-20 sm:py-32 bg-[#2C423F] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="text-center mb-12">
          <span className="text-[#F3EFEA] text-xs uppercase tracking-[0.2em] font-medium mb-4 block">
            Getting There
          </span>
          <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl lg:text-5xl font-light mb-6">
            How to Reach Kea
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Anchor size={40} weight="thin" />,
              title: "By Ferry",
              description: "Car & passenger ferries go 4-5 times daily in high season from Lavrio Port. Book at least a few days in advance during peak months.",
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

// Contact Form Section
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dates: "",
    guests: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${API}/contact`, formData);
      toast.success("Thank you for your inquiry! We'll be in touch soon.");
      setFormData({ name: "", email: "", phone: "", dates: "", guests: "", message: "" });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label mb-4 block">Contact</span>
            <h2 className="section-heading text-3xl sm:text-4xl lg:text-5xl mb-6">
              Make an Inquiry
            </h2>
            <p className="text-[#57534E] text-base sm:text-lg leading-relaxed mb-8">
              Ready to experience Villa Kephala? Fill out the form and we'll get back to you with availability and any information you need.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#F3EFEA] flex items-center justify-center">
                  <MapPin size={20} className="text-[#C05E44]" />
                </div>
                <div>
                  <p className="text-sm text-[#57534E]">Location</p>
                  <p className="font-medium">Kea, Cyclades, Greece</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#F3EFEA] flex items-center justify-center">
                  <Bed size={20} className="text-[#C05E44]" />
                </div>
                <div>
                  <p className="text-sm text-[#57534E]">Capacity</p>
                  <p className="font-medium">5 Bedrooms, up to 10 Guests</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="card-solid p-8" data-testid="contact-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="name" className="text-sm text-[#57534E] mb-2 block">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input rounded-none"
                    data-testid="contact-name-input"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm text-[#57534E] mb-2 block">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input rounded-none"
                    data-testid="contact-email-input"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="phone" className="text-sm text-[#57534E] mb-2 block">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input rounded-none"
                    data-testid="contact-phone-input"
                  />
                </div>
                <div>
                  <Label htmlFor="guests" className="text-sm text-[#57534E] mb-2 block">Number of Guests</Label>
                  <Input
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="form-input rounded-none"
                    data-testid="contact-guests-input"
                  />
                </div>
              </div>
              <div className="mb-6">
                <Label htmlFor="dates" className="text-sm text-[#57534E] mb-2 block">Preferred Dates</Label>
                <Input
                  id="dates"
                  name="dates"
                  value={formData.dates}
                  onChange={handleChange}
                  placeholder="e.g., July 15-22, 2025"
                  className="form-input rounded-none"
                  data-testid="contact-dates-input"
                />
              </div>
              <div className="mb-6">
                <Label htmlFor="message" className="text-sm text-[#57534E] mb-2 block">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="form-input rounded-none resize-none"
                  placeholder="Tell us about your trip..."
                  data-testid="contact-message-input"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-3 rounded-none text-sm font-medium"
                data-testid="contact-submit-btn"
              >
                {isSubmitting ? "Sending..." : "Send Inquiry"}
              </Button>
            </form>
          </motion.div>
        </div>
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
      <GallerySection />
      <BedroomsSection />
      <AmenitiesSection />
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
