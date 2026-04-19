# CareerFlow NextGen

**Your All-in-One AI-Powered Career Development Platform**

CareerFlow NextGen is a cutting-edge platform designed to accelerate your career growth. By combining advanced AI career guidance, an intelligent ATS-friendly resume builder, and robust mentorship connections, we help you navigate your professional journey with clarity and confidence.

![CareerFlow Hero](https://via.placeholder.com/1200x600?text=CareerFlow+NextGen+Preview)

## 🚀 Features

### 🤖 AI Career Co-Pilot (Sancara AI)
A 24/7 personalized career assistant powered by advanced AI.
- **Smart Chat Interface:** Ask questions about interview prep, career transitions, or skill development.
- **Session History:** Access past conversations from the sidebar.
- **PDF Export:** Download your coaching sessions for offline reference.
- **Customizable Experience:** Adjust animation speed and interaction settings.

### 📄 Intelligent Resume Builder
Build professional, job-winning resumes in minutes.
- **Step-by-Step Wizard:** Guided process for Stream, Degree, Job Role, Experience, and more.
- **ATS Optimization:** Get instant feedback to ensure your resume passes Applicant Tracking Systems.
- **Multiple Streams:** Specialized templates for Engineering, Design, Business, and more.
- **Real-time Preview:** See changes individually as you edit.
- **PDF Export:** Download high-quality, print-ready resumes.

### 👥 Mentorship & Networking
- **Vetted Mentors:** Connect with industry experts who have been where you want to go.
- **Community Events:** Join workshops, webinars, and networking sessions.

### 📊 Smart Dashboard
- **Progress Tracking:** Visualize your achievements and milestones.
- **Job Matching:** Find opportunities aligned with your profile.
- **Skill Assessment:** Interactive evaluations to identify strengths and growth areas.

### 🎨 Premium Design System
- **Dynamic Theming:** Choose from themes like "Calm Blue", "Teal Focus", "Clean Modern", and "Warm Sand".
- **Glassmorphism:** Modern "Royal Glass" UI with smooth gradients and transparency.
- **Responsive:** Fully optimized for desktop, tablet, and mobile devices.
- **Dark Mode:** specific overrides for a seamless dark theme experience.

## 🛠️ Tech Stack

- **Frontend Framework:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, shadcn-ui, Framer Motion
- **Backend & Auth:** Firebase (Authentication, Firestore)
- **AI Integration:** Google Cloud Speech / AI Models
- **State Management:** React Context (Theme, Resume Data)
- **Utilities:** PDF Generation (`jspdf`), Form Validation (`zod`, `react-hook-form`)

## 📦 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v18+)
- npm or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/careerflow-nextgen.git
   cd careerflow-nextgen
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add your Firebase and API keys:
   ```env
   VITE_FIREBASE_API_KEY=your_key
   VITE_FIREBASE_AUTH_DOMAIN=your_domain
   VITE_FIREBASE_PROJECT_ID=your_id
   # ... other config
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

## 📂 Project Structure

```
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── chat/         # AI Assistant components
│   │   ├── resume-builder/ # Resume builder steps
│   │   └── ui/           # shadcn-ui primitives
│   ├── pages/            # Main application pages
│   ├── lib/              # Utilities and Context providers
│   ├── hooks/            # Custom React hooks
│   └── assets/           # Static assets (images, fonts)
├── public/               # Public assets (SVGs, favors)
└── ...config files
```

## 🤝 Contributing

We welcome contributions! Please see `CONTRIBUTING.md` for details on how to get started.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by the CareerFlow Team**
