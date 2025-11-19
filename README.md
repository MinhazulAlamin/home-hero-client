# 🏡 HomeHero

## 📖 Description
**HomeHero** is a full-stack service booking platform where users can explore services, book appointments, and rate providers.  
It delivers a polished experience with responsive UI, instant feedback, and persistent rating/booking logic.  
The project is deployed with **Netlify (frontend)** and **Vercel (backend)**.

🔗 **Live Link:** [HomeHero](https://home-hero-a10.netlify.app)
---

---

## 🛠️ Technologies Used
- **Frontend:** React.js, Tailwind CSS, DaisyUI, Framer Motion  
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)  
- **Auth:** Firebase Authentication  
- **Deployment:** Netlify (client), Vercel (server)  
- **Notifications:** React Toastify, SweetAlert2  

---

## ✨ Features
- 🔐 User authentication (login/register with Firebase)  
- 📋 Service listing with filters (min/max price)  
- ⭐ Rating system (per-user rating persists independently of bookings)  
- 🛒 Booking system with cancel option  
- 🖼️ Responsive UI with loading spinners, skeleton loaders, and custom error pages  
- 🎨 Animated transitions with Framer Motion  
- 📢 Notifications with React Toastify & SweetAlert2  

---

## 📦 Dependencies
- `react`, `react-router-dom`  
- `tailwindcss`, `daisyui`  
- `framer-motion`  
- `react-toastify`, `sweetalert2`  
- `express`, `mongoose`  
- `firebase`  
- `cors`, `dotenv`  

---

## 🖥️ Run Locally
Clone the repo → `git clone https://github.com/your-username/homehero.git &&
cd homehero &&
npm install` → set up `.env` with `MONGO_URI`, `PORT`, `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN` → start frontend with `npm run dev` 
and backend with `npm start`.

---
