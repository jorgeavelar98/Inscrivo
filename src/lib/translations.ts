/**
 * Bilingual content dictionary (English + Spanish).
 *
 * This is the single source of truth for EVERY user-facing string on the site —
 * nav, hero, features, pricing, FAQ, footer, buttons, form labels and image alt text.
 * Components must read copy from here via `useTranslation()`; never hardcode text.
 *
 * The English object (`en`) defines the canonical shape; `es` must match it exactly,
 * which TypeScript enforces via the `Translation` type below.
 *
 * Spanish is neutral Latin American Spanish written for restaurant owners — natural,
 * warm and plain-spoken, not a literal machine translation.
 */

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

interface NavLink {
  label: string;
  href: string;
}

interface Card {
  title: string;
  body: string;
}

interface Step {
  number: string;
  title: string;
  body: string;
}

interface Feature {
  title: string;
  body: string;
  /** Descriptive alt text for the accompanying placeholder image. */
  imageAlt: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface Translation {
  meta: {
    title: string;
    description: string;
    ogImageAlt: string;
  };
  nav: {
    links: NavLink[];
    cta: string;
    toggleAria: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    imageAlt: string;
  };
  valueProps: {
    heading: string;
    subheading: string;
    cards: Card[];
  };
  howItWorks: {
    heading: string;
    subheading: string;
    steps: Step[];
  };
  features: {
    heading: string;
    subheading: string;
    items: Feature[];
  };
  pricing: {
    heading: string;
    subheading: string;
    planName: string;
    setupPrice: string;
    setupLabel: string;
    monthlyPrice: string;
    monthlyLabel: string;
    includedHeading: string;
    included: string[];
    cta: string;
    fineprint: string;
  };
  faq: {
    heading: string;
    subheading: string;
    items: FaqItem[];
  };
  contact: {
    heading: string;
    subheading: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    restaurantLabel: string;
    restaurantPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    orReachUs: string;
    emailValue: string;
    phoneValue: string;
    successMessage: string;
  };
  footer: {
    tagline: string;
    copyright: string;
    links: NavLink[];
  };
}

const en: Translation = {
  meta: {
    title: "Inscrivo — Professional websites for restaurants, fully managed",
    description:
      "Inscrivo designs and hosts a beautiful, mobile-friendly website for your restaurant — and gives you a simple dashboard to update your menu, hours, and photos yourself, anytime.",
    ogImageAlt: "Inscrivo — a professional restaurant website shown on a phone",
  },
  nav: {
    links: [
      { label: "Benefits", href: "#benefits" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: "Get started",
    toggleAria: "Switch language",
  },
  hero: {
    eyebrow: "Websites for restaurants",
    title: "A professional website for your restaurant — and you control it.",
    subtitle:
      "We design, build, and host it for you. Then you update your menu, hours, and photos yourself from your phone — no developer, no waiting, changes go live in seconds.",
    ctaPrimary: "Get started",
    ctaSecondary: "See how it works",
    imageAlt:
      "A restaurant website shown on a phone, with photos of dishes, hours, and a call button",
  },
  valueProps: {
    heading: "Everything your restaurant needs online",
    subheading: "Built for busy owners, not web developers.",
    cards: [
      {
        title: "You control your content",
        body: "Change a price, swap a photo, or update your hours in seconds — right from your phone. No developer to call, no fees per change.",
      },
      {
        title: "Live in days, not months",
        body: "We design and build your site for you. Most restaurants are online and taking attention within a week.",
      },
      {
        title: "Looks great on mobile",
        body: "Your customers find you on their phones. Your site is fast and beautiful on every screen, automatically.",
      },
      {
        title: "Everything in one place",
        body: "Menu, photo gallery, hours, directions, click-to-call, and links to your ordering and reservation tools — all on one polished site.",
      },
    ],
  },
  howItWorks: {
    heading: "How it works",
    subheading: "Three simple steps. We do the heavy lifting.",
    steps: [
      {
        number: "1",
        title: "We build it",
        body: "Tell us about your restaurant and send us your menu and photos. We design a professional site tailored to your brand.",
      },
      {
        number: "2",
        title: "You review & we launch",
        body: "Preview your site, request any changes, and approve it. We connect your domain and take it live.",
      },
      {
        number: "3",
        title: "Update it yourself, anytime",
        body: "Log in to your dashboard whenever you like to change your menu, hours, photos, or text. Updates go live instantly.",
      },
    ],
  },
  features: {
    heading: "A great site — plus a dashboard you'll actually use",
    subheading:
      "Your customers get a fast, beautiful website. You get simple controls to keep it current.",
    items: [
      {
        title: "Your own owner dashboard",
        body: "Update your menu, hours, photos, and text yourself — no code, no redeploys. Log in with a secure magic link sent to your email; there's no password to remember.",
        imageAlt:
          "The Inscrivo owner dashboard, showing menu and hours editing screens",
      },
      {
        title: "A polished site your customers love",
        body: "Home, menu, photo gallery, hours, location, and contact — with click-to-call, directions, and direct links to your online ordering and reservations.",
        imageAlt:
          "A sample restaurant website built by Inscrivo, shown on a laptop and a phone",
      },
    ],
  },
  pricing: {
    heading: "Simple, honest pricing",
    subheading: "One plan. Everything included. No surprises.",
    planName: "Standard",
    setupPrice: "$699",
    setupLabel: "one-time setup",
    monthlyPrice: "$99",
    monthlyLabel: "/ month — hosting + unlimited content updates",
    includedHeading: "What's included",
    included: [
      "Custom-designed website (home, menu, gallery, hours, location, contact)",
      "Owner dashboard — update menu, hours, photos, and text yourself, anytime",
      "Mobile-optimized and fast",
      "Photo gallery + menu management",
      "Click-to-call, directions, and online-ordering / reservation links",
      "Custom domain support",
      "Page-view analytics",
      "Ongoing hosting and support",
    ],
    cta: "Get started",
    fineprint:
      "$699 one-time setup, then $99/month. Cancel anytime. No long-term contract.",
  },
  faq: {
    heading: "Questions, answered",
    subheading: "Everything you might be wondering before you start.",
    items: [
      {
        question: "Do I need to know anything technical?",
        answer:
          "Not at all. We build everything for you. When you want to make a change, your dashboard works like any phone app — tap, type, and save. If you can post a photo to social media, you can update your site.",
      },
      {
        question: "Can I make changes myself?",
        answer:
          "Yes — that's the whole point. Update your menu, prices, hours, photos, and text whenever you want from your phone or computer, and changes go live in seconds. Unlimited updates are included in your monthly plan.",
      },
      {
        question: "How long does it take?",
        answer:
          "Most restaurants are live within a week of sending us their menu and photos. We design it, you review it, and we launch — usually in days, not months.",
      },
      {
        question: "Can I use my own domain?",
        answer:
          "Absolutely. We support custom domains like yourrestaurant.com. Already own one? We'll connect it. Need one? We'll help you get it set up.",
      },
      {
        question: "What if I need help?",
        answer:
          "Ongoing support is included. Email us anytime and a real person will help — whether it's a question about your dashboard or a change you'd rather we make for you.",
      },
      {
        question: "What does it cost?",
        answer:
          "One simple plan: $699 one-time setup and $99 a month for hosting plus unlimited content updates. No per-change fees, no long-term contract — cancel anytime.",
      },
    ],
  },
  contact: {
    heading: "Ready for a website that works as hard as you do?",
    subheading:
      "Tell us a little about your restaurant and we'll get you started. Most owners are live within a week.",
    nameLabel: "Your name",
    namePlaceholder: "Maria Gonzalez",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    restaurantLabel: "Restaurant name",
    restaurantPlaceholder: "Taqueria La Bonita",
    messageLabel: "Anything you'd like us to know? (optional)",
    messagePlaceholder: "We're a family taqueria looking to get online…",
    submit: "Get started",
    orReachUs: "Or reach us directly",
    emailValue: "hello@inscrivo.com",
    phoneValue: "(555) 123-4567",
    successMessage:
      "Thanks! We've received your details and will be in touch shortly.",
  },
  footer: {
    tagline: "Professional websites for restaurants — designed, hosted, and yours to control.",
    copyright: "Inscrivo. All rights reserved.",
    links: [
      { label: "Benefits", href: "#benefits" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
      { label: "Get started", href: "#contact" },
    ],
  },
};

const es: Translation = {
  meta: {
    title: "Inscrivo — Sitios web profesionales para restaurantes, todo administrado",
    description:
      "Inscrivo diseña y aloja un sitio web atractivo y optimizado para celulares para tu restaurante, y te da un panel sencillo para actualizar tu menú, horarios y fotos cuando quieras.",
    ogImageAlt: "Inscrivo — un sitio web profesional para restaurante visto en un celular",
  },
  nav: {
    links: [
      { label: "Beneficios", href: "#benefits" },
      { label: "Cómo funciona", href: "#how-it-works" },
      { label: "Características", href: "#features" },
      { label: "Precio", href: "#pricing" },
      { label: "Preguntas", href: "#faq" },
    ],
    cta: "Empezar",
    toggleAria: "Cambiar idioma",
  },
  hero: {
    eyebrow: "Sitios web para restaurantes",
    title: "Un sitio web profesional para tu restaurante, y tú lo controlas.",
    subtitle:
      "Nosotros lo diseñamos, lo creamos y lo alojamos por ti. Después tú mismo actualizas tu menú, horarios y fotos desde el celular: sin programadores, sin esperas, los cambios se publican en segundos.",
    ctaPrimary: "Empezar",
    ctaSecondary: "Ver cómo funciona",
    imageAlt:
      "Un sitio web de restaurante visto en un celular, con fotos de platillos, horarios y un botón para llamar",
  },
  valueProps: {
    heading: "Todo lo que tu restaurante necesita en línea",
    subheading: "Hecho para dueños ocupados, no para programadores.",
    cards: [
      {
        title: "Tú controlas tu contenido",
        body: "Cambia un precio, reemplaza una foto o actualiza tus horarios en segundos, directo desde tu celular. Sin llamar a un programador y sin cobros por cada cambio.",
      },
      {
        title: "En línea en días, no en meses",
        body: "Nosotros diseñamos y creamos tu sitio. La mayoría de los restaurantes están en línea y atrayendo clientes en menos de una semana.",
      },
      {
        title: "Se ve increíble en el celular",
        body: "Tus clientes te buscan desde el celular. Tu sitio se ve rápido y hermoso en cualquier pantalla, de forma automática.",
      },
      {
        title: "Todo en un solo lugar",
        body: "Menú, galería de fotos, horarios, cómo llegar, botón para llamar y enlaces a tus plataformas de pedidos y reservaciones, todo en un sitio bien hecho.",
      },
    ],
  },
  howItWorks: {
    heading: "Cómo funciona",
    subheading: "Tres pasos sencillos. Nosotros hacemos el trabajo pesado.",
    steps: [
      {
        number: "1",
        title: "Lo creamos",
        body: "Cuéntanos sobre tu restaurante y mándanos tu menú y tus fotos. Diseñamos un sitio profesional a la medida de tu marca.",
      },
      {
        number: "2",
        title: "Lo revisas y lo lanzamos",
        body: "Mira una vista previa de tu sitio, pide los cambios que quieras y apruébalo. Conectamos tu dominio y lo publicamos.",
      },
      {
        number: "3",
        title: "Lo actualizas tú mismo, cuando quieras",
        body: "Entra a tu panel cuando gustes para cambiar tu menú, horarios, fotos o textos. Los cambios se publican al instante.",
      },
    ],
  },
  features: {
    heading: "Un gran sitio, más un panel que de verdad vas a usar",
    subheading:
      "Tus clientes obtienen un sitio rápido y atractivo. Tú obtienes controles sencillos para mantenerlo al día.",
    items: [
      {
        title: "Tu propio panel de dueño",
        body: "Actualiza tú mismo tu menú, horarios, fotos y textos: sin código y sin esperas. Entra con un enlace mágico seguro que llega a tu correo; no hay contraseña que recordar.",
        imageAlt:
          "El panel de dueño de Inscrivo, mostrando las pantallas para editar el menú y los horarios",
      },
      {
        title: "Un sitio pulido que tus clientes adoran",
        body: "Inicio, menú, galería de fotos, horarios, ubicación y contacto, con botón para llamar, cómo llegar y enlaces directos a tus pedidos y reservaciones en línea.",
        imageAlt:
          "Un sitio de restaurante de ejemplo hecho por Inscrivo, visto en una laptop y un celular",
      },
    ],
  },
  pricing: {
    heading: "Precio sencillo y honesto",
    subheading: "Un solo plan. Todo incluido. Sin sorpresas.",
    planName: "Estándar",
    setupPrice: "$699",
    setupLabel: "pago único de instalación",
    monthlyPrice: "$99",
    monthlyLabel: "/ mes — alojamiento + actualizaciones de contenido ilimitadas",
    includedHeading: "Qué incluye",
    included: [
      "Sitio web con diseño personalizado (inicio, menú, galería, horarios, ubicación, contacto)",
      "Panel de dueño: actualiza tú mismo el menú, horarios, fotos y textos cuando quieras",
      "Optimizado para celular y muy rápido",
      "Galería de fotos + administración del menú",
      "Botón para llamar, cómo llegar y enlaces de pedidos / reservaciones en línea",
      "Compatible con dominio propio",
      "Estadísticas de visitas",
      "Alojamiento y soporte continuos",
    ],
    cta: "Empezar",
    fineprint:
      "$699 de instalación una sola vez, luego $99 al mes. Cancela cuando quieras. Sin contrato a largo plazo.",
  },
  faq: {
    heading: "Resolvemos tus dudas",
    subheading: "Todo lo que quizás te preguntas antes de empezar.",
    items: [
      {
        question: "¿Necesito saber algo técnico?",
        answer:
          "Para nada. Nosotros construimos todo por ti. Cuando quieras hacer un cambio, tu panel funciona como cualquier aplicación del celular: tocas, escribes y guardas. Si sabes subir una foto a tus redes sociales, sabes actualizar tu sitio.",
      },
      {
        question: "¿Puedo hacer cambios yo mismo?",
        answer:
          "Sí, esa es justamente la idea. Actualiza tu menú, precios, horarios, fotos y textos cuando quieras desde tu celular o computadora, y los cambios se publican en segundos. Las actualizaciones ilimitadas están incluidas en tu plan mensual.",
      },
      {
        question: "¿Cuánto tiempo toma?",
        answer:
          "La mayoría de los restaurantes están en línea menos de una semana después de mandarnos su menú y sus fotos. Lo diseñamos, tú lo revisas y lo lanzamos: normalmente en días, no en meses.",
      },
      {
        question: "¿Puedo usar mi propio dominio?",
        answer:
          "Por supuesto. Trabajamos con dominios propios como turestaurante.com. ¿Ya tienes uno? Lo conectamos. ¿Necesitas uno? Te ayudamos a conseguirlo y configurarlo.",
      },
      {
        question: "¿Y si necesito ayuda?",
        answer:
          "El soporte continuo está incluido. Escríbenos cuando quieras y una persona real te ayudará, ya sea con una duda sobre tu panel o con un cambio que prefieras que hagamos por ti.",
      },
      {
        question: "¿Cuánto cuesta?",
        answer:
          "Un solo plan sencillo: $699 de instalación una sola vez y $99 al mes por alojamiento más actualizaciones de contenido ilimitadas. Sin cobros por cada cambio y sin contrato a largo plazo; cancela cuando quieras.",
      },
    ],
  },
  contact: {
    heading: "¿Listo para un sitio web que trabaje tan duro como tú?",
    subheading:
      "Cuéntanos un poco sobre tu restaurante y te ayudamos a empezar. La mayoría de los dueños están en línea en menos de una semana.",
    nameLabel: "Tu nombre",
    namePlaceholder: "María González",
    emailLabel: "Correo electrónico",
    emailPlaceholder: "tu@ejemplo.com",
    restaurantLabel: "Nombre del restaurante",
    restaurantPlaceholder: "Taquería La Bonita",
    messageLabel: "¿Algo que quieras contarnos? (opcional)",
    messagePlaceholder: "Somos una taquería familiar que quiere estar en línea…",
    submit: "Empezar",
    orReachUs: "O contáctanos directamente",
    emailValue: "hola@inscrivo.com",
    phoneValue: "(555) 123-4567",
    successMessage:
      "¡Gracias! Recibimos tus datos y te contactaremos muy pronto.",
  },
  footer: {
    tagline: "Sitios web profesionales para restaurantes: diseñados, alojados y bajo tu control.",
    copyright: "Inscrivo. Todos los derechos reservados.",
    links: [
      { label: "Beneficios", href: "#benefits" },
      { label: "Precio", href: "#pricing" },
      { label: "Preguntas", href: "#faq" },
      { label: "Empezar", href: "#contact" },
    ],
  },
};

export const translations: Record<Locale, Translation> = { en, es };

export type { Translation };
