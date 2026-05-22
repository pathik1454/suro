# Surendra & Co. | Volvo 9600 XL Landing Page

A premium, responsive, single-page interactive landing site for the **Volvo 9600 XL Premium Sleeper Coach**, built for Surendra & Co., master coachbuilders in Ahmedabad. Designed with a high-end, continuous cinematic aesthetic, this project abandons traditional scrolling in favor of a 3D WebGL-style timeline and glassmorphic HUD overlays.

## ✨ Key Features

- **Master Narrative Timeline**: A single global orchestrator controls the entire scrolling experience, perfectly syncing a 732-frame 3D bus assembly sequence to the user's scrollbar.
- **Glassmorphic HUD Overlays**: All foreground content uses heavy frosted glass (`backdrop-blur-2xl`), allowing the continuous background bus assembly animation to remain visible at all times.
- **Interactive Bus Layouts**: Information cards (Craftsmanship specs & Bento Grid) are structurally mapped via CSS Grid to match the side-profile of a bus. As the user scrolls, these entire "bus layouts" traverse horizontally across the screen like a vehicle driving past.
- **Serverless Backend**: Secure Next.js API routes handle form submissions without needing a dedicated backend server, lazily loading database credentials to support preview deployments.
- **Data Persistence**: Lead generation data is securely stored in a Supabase PostgreSQL database.
- **Automated Email Notifications**: Real-time email alerts triggered by the Resend API upon successful lead submission.

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [GSAP](https://gsap.com/) & HTML5 Canvas
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database**: [Supabase](https://supabase.com/)
- **Emails**: [Resend](https://resend.com/)

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js (v18+) and npm/yarn/pnpm installed.

### 1. Clone the repository and install dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root of the project and add the following keys. You will need to obtain these from your Supabase and Resend dashboards:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
RESEND_API_KEY=your_resend_api_key
```

*(Note: The application will still build and run without these keys; the contact form will simply return a mock success response for UI testing).*

### 3. Database Setup

Run the provided `supabase_setup.sql` script in your Supabase SQL Editor to initialize the necessary table (`contacts`) for the lead generation form.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to experience the cinematic scroll timeline.

## 📁 Project Structure

- `app/`: Next.js App Router pages (`page.tsx`) and API routes (`api/contact/route.ts`).
- `components/MasterNarrative.tsx`: The single massive GSAP orchestrator that controls the canvas drawing, 3D timelines, and HUD traversal logic.
- `components/ConversionSection.tsx`: The final contact form section.
- `components/LenisProvider.tsx`: Global smooth-scrolling wrapper.
- `public/assets/`: The 732 frames required for the Volvo 9600 3D assembly sequence.

## 📜 License

This project is intended for demonstration purposes. All Volvo trademarks and imagery belong to their respective owners.
