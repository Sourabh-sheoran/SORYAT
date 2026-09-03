# SORYAT — Digital Excellence

> **Demo-First Digital Agency Platform**  
> High-performance Web Development, Autonomous AI Agents, Academic Research, and SEO Growth Marketing across India, Canada, and global markets.

---

## Overview

**SORYAT** is a modern, demo-first digital agency web application built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS**. It provides a rich, interactive client experience featuring:

- **Cinematic Scroll-Driven Animations**: Day & night video scrub experiences, liquid refraction aesthetics, and interactive glassmorphism UI.
- **Service Hubs**: Full-stack web development, multi-agent AI workflows (LangGraph/Gemini), academic research paper writing, SEO marketing, and content analytics.
- **Client Authentication & Protected Action Gating**:
  - Automatic new-visitor login popup with quick dismissal.
  - Action-gated service booking ("first login, then get service").
  - Multi-step interactive onboarding flow with OTP verification and business profiling.
- **Interactive Multi-Currency Pricing**: Real-time currency conversions between INR (₹), USD ($), and CAD (CA$).
- **Live Proof of Work**: Filterable portfolio showcase with sub-second performance metrics and case studies.

---

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Custom Glassmorphism System
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes) (Seamless Dark & Light modes)
- **Icons & Motion**: [Lucide React](https://lucide.dev/), CSS Keyframe Animations

---

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Sourabh-sheoran/SORYAT.git

# Navigate into the project directory
cd SORYAT

# Install dependencies
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore the live application.

### Building for Production

```bash
npm run build
npm start
```

---

## Project Structure

```
├── public/                 # Favicons, company logo assets, SVGs
├── src/
│   ├── app/                # Next.js App Router routes
│   │   ├── about/          # Agency vision, values & leadership
│   │   ├── blog/           # Technical engineering insights
│   │   ├── contact/        # Direct inquiries & SLA booking
│   │   ├── login/          # Dedicated client portal login
│   │   ├── portfolio/      # Interactive case studies
│   │   ├── pricing/        # Dynamic multi-currency pricing tiers
│   │   ├── services/       # Detailed service landing pages
│   │   │   ├── ai-agents/
│   │   │   ├── content-analytics/
│   │   │   ├── research-papers/
│   │   │   ├── seo/
│   │   │   └── web-development/
│   │   ├── signup/         # Multi-step onboarding with OTP verification
│   │   ├── layout.tsx      # Root layout, fonts & theme provider
│   │   └── page.tsx        # Homepage with scroll-driven hero & services
│   ├── components/         # Reusable UI components & modals
│   │   ├── LoginModal.tsx  # Gated action & new visitor login popup
│   │   ├── Navbar.tsx      # Adaptive navigation bar & theme toggle
│   │   ├── Footer.tsx      # Company footer & copyright
│   │   ├── SoryatLogo.tsx  # Official adaptive logo component
│   │   └── ...
│   └── context/
│       └── AgencyContext.tsx # Currency, auth, and booking state
└── package.json
```

---

## License

© 2026 SORYAT DIGITAL EXCELLENCE. All rights reserved.
