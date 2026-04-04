import { useState, useEffect, useRef, useCallback } from "react";
import "@/App.css";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bed, SwimmingPool, Waves, Mountains, WifiHigh, AirplaneTilt, 
  MapPin, House, SunHorizon, Compass, CaretDown, CaretLeft, CaretRight, List, X, 
  EnvelopeSimple, Phone, User, Barbell, Boat, Bicycle, Fish,
  Timer, CarSimple, Anchor, AirplaneTakeoff, CheckCircle,
  Bathtub, Snowflake, TelevisionSimple, WashingMachine, Fan
} from "@phosphor-icons/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./components/ui/accordion";
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
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/os7nbj1z_6X3A2979.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/4o1hq3yl_6X3A2672.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/ztcq7zra_6X3A2674.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/iftlcoa5_6X3A2685.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/00beod5w_6X3A2761.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/ou2o94cw_6X3A2840.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/q1p5hifu_6X3A2577.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/w9ms065p_6X3A2652.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/ouk3ggn1_6X3A2658.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/ukf2iv4c_IMG_2846.jpeg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/8gftqw95_IMG_9380.jpeg"
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
  // Top Room bedroom photos
  topRoom: [
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/lhqes2dd_6X3A2809.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/wz4g6xnf_6X3A2820.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/yjl17e06_6X3A2836.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/rqdx95ck_6X3A2936.jpg"
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
            <img
              src={IMAGES.outdoor[15]}
              alt="Infinity pool with sea view"
              className="w-full h-[400px] sm:h-[500px] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-lg hidden sm:block">
              <p className="font-['Cormorant_Garamond'] text-4xl font-light text-[#C05E44]">∞</p>
              <p className="text-sm text-[#57534E] uppercase tracking-wider">Infinity Pool</p>
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
              description: "Multiple outdoor sitting areas are thoughtfully positioned around the villa, allowing guests to find their own moments of peace and tranquility throughout the day."
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
            <img
              src={IMAGES.outdoor[14]}
              alt="Infinity pool with bay view"
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
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/8qru9z8n_1st%20Shot%20of%20pool%20section.jpg", category: "pool", alt: "Pool & Terraces", isMain: true },
    // Pool photos
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/n74aj80a_5th%20shot.jpg", category: "pool", alt: "Pool View" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/6ebta2y6_6X3A2685.jpg", category: "pool", alt: "Sea View Pool" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/yk36ymws_6X3A2979.jpg", category: "pool", alt: "Infinity Pool" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/6f8v5ybr_fouth%20shot.jpg", category: "pool", alt: "Pool Panorama" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/w03fxzmz_Second%20Main%20shot.jpg", category: "pool", alt: "Pool & Bay" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/8nlyu6xh_thrid%20shot.jpg", category: "pool", alt: "Poolside Loungers" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/xwhow8qr_IMG_9420.jpeg", category: "pool", alt: "Sunset Pool" },
    // Seating areas
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/562pm7rb_6X3A2672.jpg", category: "pool", alt: "Outdoor Sofa & Chairs" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/uolthw34_6X3A2942.jpg", category: "pool", alt: "Terrace Sofa" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/7wint7la_6X3A2761.jpg", category: "pool", alt: "Seaside Seating" },
    // Table and chairs
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/pqo4p0lj_6X3A2674.jpg", category: "pool", alt: "Woven Chairs & Table" },
    // Striped beds
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/x97o08jp_6X3A2840.jpg", category: "pool", alt: "Striped Day Beds" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/ephbwhe6_6X3A2862.jpg", category: "pool", alt: "Striped Loungers" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/7h74aimj_6X3A2953.jpg", category: "pool", alt: "Terrace Chaise Lounges" },
    // Down to the Sea (user-uploaded folder - 12 photos only)
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/zxso9kvv_main%20pho.jpg", category: "sea", alt: "Down to the Sea", isMain: true },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/2abm8h8n_6X3A3275.jpg", category: "sea", alt: "Coastal Steps" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/kqiim4cb_6X3A3316.jpg", category: "sea", alt: "Rocky Shore" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/m2btdjh4_6X3A3320.jpg", category: "sea", alt: "Sea Cove" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/lww6rffa_DJI_20250831161029_0103_D%20copy.jpg", category: "sea", alt: "Aerial Villa View" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/t5zwm95t_DJI_20250831161052_0106_D%20copy.jpg", category: "sea", alt: "Aerial Coastline" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/ufbiwkrp_DJI_20250831161634_0138_D%20copy.jpg", category: "sea", alt: "Aerial Sea Path" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/cgfs9a63_Main%20Photo%20Option.jpg", category: "sea", alt: "Outdoor Shower" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/9yxbz6wa_DJI_20250831161115_0108_D%20copy.jpg", category: "sea", alt: "Hillside to Sea" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/285qxmsp_Main%20photo%20option%202.heic", category: "sea", alt: "Path to the Sea" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/ekwml0zh_aab6d5b1-6c6f-41ed-aeb5-19ab94c80446.jpg", category: "sea", alt: "Crystal Cove" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/rpq7r46m_9f532966-46f5-4775-8131-67650e7744ba.jpg", category: "sea", alt: "Sunset over Bay" },
    // Interior (user-uploaded - 10 photos)
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/06fdna31_Main%20Photo.jpg", category: "interior", alt: "Interior", isMain: true },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/x1fizolk_6X3A2420.jpg", category: "interior", alt: "Living Room" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/wddyfkn7_6X3A2455.jpg", category: "interior", alt: "Sitting Area" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/5zo75vz1_6X3A2461.jpg", category: "interior", alt: "Dining Area" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/573zw91d_6X3A2478.jpg", category: "interior", alt: "Living Space" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/w28wcqxv_6X3A2517.jpg", category: "interior", alt: "Interior Detail" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/d7xik4o3_6X3A2527.jpg", category: "interior", alt: "Lounge" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/bj0h5wrc_6X3A2533.jpg", category: "interior", alt: "Dining Room" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/6to9rj0u_6X3A3038.jpg", category: "interior", alt: "Interior View" },
    // Bedrooms
    { src: IMAGES.bedroom[0], category: "bedrooms", room: "Blue Bedroom", isMain: true, alt: "Blue Bedroom" },
    { src: IMAGES.bedroom[1], category: "bedrooms", room: "Blue Bedroom", alt: "Blue Room - Detail" },
    { src: IMAGES.bedroom[2], category: "bedrooms", room: "Blue Bedroom", alt: "Blue Room - Bed" },
    { src: IMAGES.bedroom[3], category: "bedrooms", room: "Blue Bedroom", alt: "Blue Room - Bathroom" },
    { src: IMAGES.pinkRoom[0], category: "bedrooms", room: "Pink Bedroom", isMain: true, alt: "Pink Bedroom" },
    { src: IMAGES.pinkRoom[1], category: "bedrooms", room: "Pink Bedroom", alt: "Pink Room - Detail" },
    { src: IMAGES.pinkRoom[2], category: "bedrooms", room: "Pink Bedroom", alt: "Pink Room - Bed" },
    { src: IMAGES.pinkRoom[3], category: "bedrooms", room: "Pink Bedroom", alt: "Pink Room - Bathroom" },
    { src: IMAGES.seaRoom[0], category: "bedrooms", room: "Sea Bedroom", isMain: true, alt: "Sea Bedroom" },
    { src: IMAGES.seaRoom[1], category: "bedrooms", room: "Sea Bedroom", alt: "Sea Room - View" },
    { src: IMAGES.seaRoom[2], category: "bedrooms", room: "Sea Bedroom", alt: "Sea Room - Bed" },
    { src: IMAGES.seaRoom[3], category: "bedrooms", room: "Sea Bedroom", alt: "Sea Room - Detail" },
    { src: IMAGES.seaRoom[4], category: "bedrooms", room: "Sea Bedroom", alt: "Sea Room - Bathroom" },
    { src: IMAGES.suzaniRoom[0], category: "bedrooms", room: "Suzani Bedroom", isMain: true, alt: "Suzani Bedroom" },
    { src: IMAGES.suzaniRoom[1], category: "bedrooms", room: "Suzani Bedroom", alt: "Suzani Room - Detail" },
    { src: IMAGES.suzaniRoom[2], category: "bedrooms", room: "Suzani Bedroom", alt: "Suzani Room - Bed" },
    { src: IMAGES.suzaniRoom[3], category: "bedrooms", room: "Suzani Bedroom", alt: "Suzani Room - View" },
    { src: IMAGES.suzaniRoom[4], category: "bedrooms", room: "Suzani Bedroom", alt: "Suzani Room - Bathroom" },
    { src: IMAGES.suzaniRoom[5], category: "bedrooms", room: "Suzani Bedroom", alt: "Suzani Room - Window" },
    { src: IMAGES.topRoom[0], category: "bedrooms", room: "Top Bedroom", isMain: true, alt: "Top Bedroom" },
    { src: IMAGES.topRoom[1], category: "bedrooms", room: "Top Bedroom", alt: "Top Room - View" },
    { src: IMAGES.topRoom[2], category: "bedrooms", room: "Top Bedroom", alt: "Top Room - Bed" },
    { src: IMAGES.topRoom[3], category: "bedrooms", room: "Top Bedroom", alt: "Top Room - Bathroom" },
    // Outdoor Dining (user-uploaded - 8 photos)
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/4zpf91xn_Main%20Shot.jpg", category: "dining", alt: "Outdoor Dining", isMain: true },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/vpf2fobt_6X3A2610.jpg", category: "dining", alt: "Dining Terrace" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/wqmyullr_6X3A2619.jpg", category: "dining", alt: "Al Fresco Setting" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/gr884u1k_6X3A2648.jpg", category: "dining", alt: "Table Setting" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/8xg5oe5c_6X3A2977.jpg", category: "dining", alt: "Pergola Dining" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/ums7pats_6X3A3007.jpg", category: "dining", alt: "Outdoor Kitchen" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/tcnc460i_6X3A3010.jpg", category: "dining", alt: "BBQ Area" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/vfnwo4c3_IMG_8792.jpeg", category: "dining", alt: "Sunset Dinner" },
    // Kitchen (user-uploaded - 4 photos)
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/xzgggwie_Main%20Shot.jpg", category: "kitchen", alt: "Kitchen", isMain: true },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/o1ppr2bg_6X3A3075.jpg", category: "kitchen", alt: "Kitchen View" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/gitf0uu5_6X3A3076.jpg", category: "kitchen", alt: "Kitchen Detail" },
    { src: "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/1iieiy9h_6X3A3080.jpg", category: "kitchen", alt: "Kitchen Area" },
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
    <section id="gallery" data-testid="gallery-section" className="py-20 sm:py-32 bg-[#F3EFEA]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="text-center mb-12">
          <span className="section-label mb-4 block">Gallery</span>
          <h2 className="section-heading text-3xl sm:text-4xl lg:text-5xl mb-6">
            Explore Villa Kephala
          </h2>
        </div>

        <Tabs defaultValue="pool" className="villa-tabs" onValueChange={setActiveTab}>
          <TabsList className="mb-8 bg-transparent justify-start sm:justify-center flex-nowrap overflow-x-auto gap-2 pb-2" data-testid="gallery-tabs">
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
                        <img
                          src={mainImage.src}
                          alt={mainImage.alt}
                          className="w-full aspect-[16/9] object-cover"
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
              <img
                src={filteredImages[0]?.src}
                alt={filteredImages[0]?.alt}
                className="w-full aspect-[16/9] object-cover"
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

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "We had the most glorious vacation at Villa Kephala. The villa is gorgeous and beautifully furnished and fully equipped. The outdoor living area is heavenly and the infinity pool is bliss. The view from the villa is beautiful-hillsides and the bluest sea. There are steps down to the little private beach for those who want to sea swim. I would highly recommend this villa - we can't wait to return!",
      author: "Nicola",
      location: "Maine, USA",
      date: "July 2025"
    },
    {
      quote: "Had an exquisite 5 days here with my girlfriends….it was magical. Beautiful house with all amenities. Amazing outside space for al fresco dining. A good sized pool with sea front views. Sundowners and amazing sunsets topped it off! Will be returning and would highly recommend.",
      author: "Nikki",
      location: "South London",
      date: "October 2025"
    },
    {
      quote: "We had such a wonderful holiday at this beautiful villa. Incredible sea views from each en-suite bedroom, lots of great terraces with comfy seating areas for cocktails, and direct access to the sea for morning dips. Beautiful pool and conveniently close to local amenities. Can't recommend highly enough!",
      author: "Rachel",
      location: "SW London",
      date: "October 2025"
    }
  ];

  return (
    <section data-testid="testimonials-section" className="py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="text-center mb-16">
          <span className="section-label mb-4 block">Guest Reviews</span>
          <h2 className="section-heading text-3xl sm:text-4xl lg:text-5xl mb-6">
            What Our Guests Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <p className="text-[#57534E] text-sm leading-relaxed mb-6 italic">
                {testimonial.quote}
              </p>
              <div className="border-t border-[#E7E5E4] pt-4">
                <p className="font-['Cormorant_Garamond'] text-lg font-medium text-[#1C1917]">
                  {testimonial.author}
                </p>
                <p className="text-[#57534E] text-sm">
                  {testimonial.location} · {testimonial.date}
                </p>
              </div>
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
      icon: <Mountains size={48} weight="thin" />,
      title: "Hiking",
      description: "81 km of stone-paved footpaths thread the island, well maintained and marked, a joy to walk especially in spring."
    },
    {
      icon: <Fish size={48} weight="thin" />,
      title: "Scuba Diving",
      description: "Exceptionally clear waters with marine life. Visit the Brittanic wreck (Titanic's sister ship) or other wrecks nearby."
    },
    {
      icon: <Boat size={48} weight="thin" />,
      title: "Boating",
      description: "Many beautiful beaches along the coast are best explored by boat. Hire one with a captain for a day of snorkeling."
    },
    {
      icon: <Bicycle size={48} weight="thin" />,
      title: "Cycling",
      description: "Explore Kea's beauty on two wheels. Electric bikes available for rent, making the mountainous terrain enjoyable."
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

// Contact Section
const ContactSection = () => {
  return (
    <section id="contact" data-testid="contact-section" className="py-20 sm:py-32">
      <div className="max-w-3xl mx-auto px-6 sm:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label mb-4 block">Contact</span>
          <h2 className="section-heading text-3xl sm:text-4xl lg:text-5xl mb-10">
            Get in Touch
          </h2>
          <div className="space-y-6">
            <a href="mailto:Lucinda.byng@btinternet.com" className="flex items-center justify-center gap-4 text-[#2C423F] hover:text-[#C05E44] transition-colors group" data-testid="contact-email">
              <div className="w-12 h-12 bg-[#F3EFEA] flex items-center justify-center group-hover:bg-[#C05E44]/10 transition-colors">
                <EnvelopeSimple size={22} className="text-[#C05E44]" />
              </div>
              <span className="text-base sm:text-lg font-medium">Lucinda.byng@btinternet.com</span>
            </a>
            <a href="tel:07887945315" className="flex items-center justify-center gap-4 text-[#2C423F] hover:text-[#C05E44] transition-colors group" data-testid="contact-phone">
              <div className="w-12 h-12 bg-[#F3EFEA] flex items-center justify-center group-hover:bg-[#C05E44]/10 transition-colors">
                <Phone size={22} className="text-[#C05E44]" />
              </div>
              <span className="text-base sm:text-lg font-medium">07887 945 315</span>
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
