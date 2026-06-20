# Astrofied Gemstones

A brand-new, standalone, responsive microsite for prescribing certified natural gemstones based on customer astrology prescriptions.

> [!NOTE]
> This is a fully standalone microsite and is completely independent of the main Astrofied consultation project. It features its own styles, layout, order form, and payment flows.

## Tech Stack
* **Vite + React** (JavaScript)
* **Custom Vanilla CSS Variables** for branding colors/transitions
* **Framer Motion** for smooth section animations and idle loops
* **Lucide React** for icons
* **QRcode.react** for dynamic client-side UPI QR code generation

## Installation & Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environmental Variables**:
   * Copy the `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   * Set up your Google Apps Script Web App by following the guide in [SETUP.md](./SETUP.md).
   * Update the `VITE_GOOGLE_SCRIPT_URL` value inside `.env` with your script endpoint.

3. **Run Locally**:
   Runs the development server on `localhost:5000`:
   ```bash
   npm run dev
   ```

4. **Production Build**:
   Build the optimized production static bundle in the `dist` directory:
   ```bash
   npm run build
   ```

5. **Preview Production Build**:
   ```bash
   npm run preview
   ```
