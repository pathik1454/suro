# Surendra & Co. UI Documentation: Landing Page

This document provides a comprehensive, detail-oriented breakdown of the entire user interface for the Surendra & Co. landing page. The application is built using Next.js, React, Tailwind CSS, and GSAP for scroll-tied cinematic animations.

## 1. Global Architecture & Canvas Background
The backbone of the entire page is a fixed, full-screen HTML5 `<canvas>`.
- **Image Sequence:** It scrubs through 732 frames (`/assets/ezgif-frame-XXX.jpg`) as the user scrolls down the page. 
- **Overlay:** A subtle dark overlay (`bg-[#0A0F1A]/30`) sits on top of the canvas to ensure that glassmorphic text and HUD elements remain highly legible.
- **Scroll Trigger:** The entire `<main>` wrapper acts as the GSAP scroll trigger for the frame scrubbing.

## 2. Loading State
Before the sequence frames load enough to provide a seamless experience, a loading screen is displayed.
- **Background:** Solid dark `#0A0F1A`.
- **Spinner:** A 16x16 `w-16 h-16` rounded full circle with a 2px border. The border color is partially transparent gold (`#D4AF37]/20`), and the top border is solid gold (`#D4AF37`), animating in a spin.
- **Text:** "ASSEMBLING TIMELINE" displayed below the spinner in uppercase, heavily tracked (`tracking-[0.3em]`), gold (`#D4AF37]/60`) text.

## 3. Navigation Bar (Header)
A fixed, `z-50` header at the top of the viewport.
- **Left Side (Brand):**
  - **Logo:** A 40x40px (`w-10 h-10`) glassmorphic rounded square (`bg-white/5`, backdrop-blur) containing the Surendra & Co. logo image (`/Logo.png`).
  - **Brand Name:** "SURENDRA & CO." displayed in white/80, bold, tracking-wider text (hidden on small screens, visible on medium+ screens).
- **Right Side (CTA):**
  - **Button:** "START YOUR BUILD". A rounded pill button with gold border (`border-[#D4AF37]/30`) and transparent gold background (`bg-[#D4AF37]/10`). It includes a backdrop blur and a glowing drop shadow. Hovering increases background opacity and border opacity. Clicking smooth-scrolls to the contact section at the bottom.

## 4. Intro Overlay Section
The first viewable content overlaying the starting frames of the canvas.
- **Height:** 150vh, keeping the content centered.
- **Subheading:** "MASTER COACHBUILDERS" in uppercase, gold (`#D4AF37`), tracking-[0.5em], with a drop shadow.
- **Main Heading:** "CRAFTED." An enormous (`text-[12vw]`), ultra-black font in white/80. It uses a mix-blend overlay and drop-shadow to seamlessly blend with the canvas behind it.
- **Animation:** As the user scrolls, this text scales up (to 1.5x) and fades out smoothly.

## 5. Craftsmanship HUD (Bus Layout Traversal)
A 400vh tall scrolling section where four informational cards slide horizontally into view, hold, and then slide out. The cards are arranged in a grid mimicking the shape of a bus.
- **Container Animation:** Enters from `150vw` (right), holds center, exits to `-150vw` (left).
- **Card Styling (Common):** Glassmorphic panels (`bg-white/5`, backdrop blur, white/10 borders), heavy rounded corners, and drop shadows. Each card has a colored top accent line.
- **Card 1: Handcrafted Luxury (Front)**
  - Position: Left side spanning two rows. Heavy rounded top-left and bottom-left corners.
  - Accent Color: Amber (`#F59E0B`). Large "01" text.
  - Description: Highlights Italian-grade upholstery, mood lighting, and climate zones.
- **Card 2: Bespoke Architecture (Roof)**
  - Position: Top right spanning two columns. Heavy rounded top-right corner.
  - Accent Color: Purple (`#8B5CF6`). Large "02" text.
  - Description: Custom-engineered floor plans, acoustic isolation.
- **Card 3: Unyielding Framework (Chassis)**
  - Position: Bottom middle. Rounded bottom corners.
  - Accent Color: Gold (`#D4AF37`). Large "03" text.
  - Description: High-tensile steel framework.
- **Card 4: Seamless Integration (Engine)**
  - Position: Bottom right. Heavy rounded bottom-right corner.
  - Accent Color: Cyan (`#06B6D4`). Large "04" text.
  - Description: Volvo B11R chassis fusion, 430HP engine.

## 6. Specifications Bento Grid
Another 400vh tall scrolling section. Individual glassmorphic elements "fly in" from off-screen in 3D space, assemble into a grid (again, roughly shaped like a bus profile), and eventually scale up and fade out towards the camera.
- **Section Title:** Centered above the grid. "SPECIFICATIONS" in small cyan text, followed by a massive "Built Different." heading in white.
- **Bento Pieces (Desktop):**
  - **Engine Block:** "Volvo B11R 430 HP". Contains a cyan Gauge icon. Cyan gradient overlay.
  - **Quote Block:** "We don't build coaches. We engineer experiences." (Italicized, gold gradient).
  - **Interior Block:** "40 Premium Berths". Contains a purple Users icon and purple gradient.
  - **Legacy Wheel:** "25+ Years". Circular bottom.
  - **Safety Block:** "AIS 052 Fully Compliant". Contains a Shield icon.
  - **Delivery Wheel:** "500 Coaches". Circular bottom.
  - **Revenue Block:** "800 Cr Revenue". Rounded bottom-right.
- **Mobile Fallback:** Instead of the complex grid, mobile users see a vertically stacked set of clean glassmorphic cards summarizing the B11R engine, 40 berths, legacy, and delivery stats.

## 7. Conversion Section ("Start Your Build")
Located at the bottom of the page (`mt-[20vh]`), overlaying a solid dark background (`#0A0F1A]/80`) with heavy backdrop blur to transition out of the canvas sequence.
- **Ambient Lighting:** Large blurred orbs (one gold, one cyan) float softly in the background.
- **Left Column (Copy):**
  - Subheading: "COMMISSION" (Gold, heavily tracked).
  - Main Heading: "Start Your Build." (White, with "Build." featuring a gold text gradient).
  - Description: A paragraph explaining the commission process.
  - Trust Badges: "Custom-Built", "Durable", "Premium" separated by gold bullet dots.
- **Right Column (Contact Form):**
  - Container: A heavy glassmorphic card with 3xl rounded corners.
  - Fields: Floating label inputs for "Full Name", "Work Email", "Company", and a text area for "Requirements".
  - Submit Button: A massive gold button (`#D4AF37`) transitioning to a brighter gold on hover.
  - **Form States:**
    - Idle: Displays "Request Consultation" and a Send icon.
    - Loading: Displays a spinning loader.
    - Success: Displays "Sent Successfully" and a CheckCircle icon, along with a green success message below.
    - Error: Shows "Try Again" and an error message below in red.

## 8. Footer
The very bottom of the page, featuring a deep dark background (`#060810`) and a top gold gradient border line.
- **Brand Column:** Logo box mirroring the navbar, company name, "Coach Body Builders" subtitle with a briefcase icon. A short descriptive paragraph.
- **Contact Column:** Phone number (+91 98250 39111) and Email, featuring interactive rounded icons that turn gold on hover.
- **Location Column:** Full physical address with an interactive map pin icon.
- **Bottom Bar:** Copyright year, and links for "Privacy Policy" and "Terms of Service".
