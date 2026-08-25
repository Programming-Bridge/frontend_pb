# 🌐 Programming Bridge — Frontend Web Application

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-State-764ABC?style=for-the-badge&logo=redux&logoColor=white)

**The official full-stack digital engineering studio frontend for Programming Bridge.**

[Live Demo](https://programmingbridge.com) • [Backend API Repo](https://github.com/Programming-Bridge/backend_pb) • [Contact Us](mailto:contact@programmingbridge.com)

</div>

---

## 📌 Overview

**Programming Bridge** frontend is a modern, high-performance web application built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Redux Toolkit**. It serves as the primary digital portal for Programming Bridge Agency — showcasing engineering capabilities, service offerings, client projects, interactive tech stack matrices, career opportunities, and direct client inquiry workflows.

---

## ✨ Key Features

- ⚡ **Next.js 15 & React 19:** Optimized Server Components (RSC) and Client Components for sub-second page loads and SEO.
- 🎨 **Dynamic Dark & Light Modes:** Sleek cyber/dark palette (`#0B0F12`, emerald `#00C466`, cyan `#38BDF8`) with persistent theme toggling.
- 🗃️ **Redux Toolkit Store:** Global state management for dynamic hero banners, services, projects, tech stacks, and UI modals.
- 📱 **Interactive Carousels & Sliders:** Custom responsive touch & drag carousels for Hero banners and Services cards.
- 💼 **Dynamic Careers & Job Application:** Interactive job board with modal-based resume & application submission.
- 📬 **Client Inquiries & Lead Capture:** Validated contact and project quotation forms integrated with backend API.
- 🛡️ **Strict TypeScript Architecture:** Strongly typed models, API response payloads, and component props.

---

## 🛠️ Technology Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | [Next.js 15 (App Router)](https://nextjs.org/) |
| **Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS Tokens |
| **State Management** | [Redux Toolkit](https://redux-toolkit.js.org/) & `react-redux` |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Theme Management** | `next-themes` |
| **HTTP Client** | Native Fetch / Axios |

---

## 📁 Directory Structure

```text
front_end_pb/
├── app/
│   ├── about/                   # About Us, Company details, Careers & Apply pages
│   ├── components/              # Modular UI Components
│   │   ├── common/              # Reusable SectionWrapper, SectionHeader, CalloutBanner
│   │   ├── HeroSection.tsx      # Dynamic Hero Banner Carousel
│   │   ├── ServicesSection.tsx  # Interactive Services Carousel & Cards
│   │   ├── TechStackSection.tsx # Technology Matrix & Filterable Grid
│   │   ├── ProjectsSection.tsx  # Featured Case Studies & Portfolio
│   │   ├── ContactSection.tsx   # Client Inquiry & Lead Capture Form
│   │   ├── Navbar.tsx           # Responsive Header & Navigation
│   │   └── Footer.tsx           # Agency Footer & Social Links
│   ├── contact/                 # Dedicated Contact page
│   ├── portfolio/               # Portfolio showcase page
│   ├── projects/                # Projects catalogue
│   ├── services/                # Dynamic service detail pages ([slug])
│   ├── globals.css              # Theme tokens & CSS variables
│   ├── layout.tsx               # Root Layout, Metadata & Theme Providers
│   └── page.tsx                 # Main Landing Page
├── lib/
│   ├── hooks/                   # Custom React Hooks (e.g. useCarousel)
│   └── store/                   # Redux Toolkit Slices & Store Configuration
│       ├── features/            # Banner, Service, Project, UI, Navbar slices
│       ├── hooks.ts             # Typed useAppDispatch & useAppSelector
│       └── store.ts             # Configured Redux Store
├── public/                      # Static assets, SVG icons, Favicons
└── package.json                 # Project dependencies and build scripts
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.18.0 or higher (v20+ recommended)
- **npm** / **pnpm** / **yarn**

### 2. Clone the Repository
```bash
git clone https://github.com/Programming-Bridge/frontend_pb.git
cd frontend_pb
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env.local` file in the root directory:

```env
# Backend API Base URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the local development server with hot-reload |
| `npm run build` | Compiles the production build |
| `npm run start` | Runs the compiled production server |
| `npm run lint` | Runs ESLint to check for code quality and syntax issues |

---

## 🔗 Connected Backend

This frontend consumes REST API endpoints from the **Programming Bridge Backend API**:
- **Backend Repo:** [Programming-Bridge/backend_pb](https://github.com/Programming-Bridge/backend_pb)

---

## 📄 License & Ownership

© 2026 **Programming Bridge Agency**. All Rights Reserved.  
Unauthorized copying or distribution of these files is strictly prohibited.
