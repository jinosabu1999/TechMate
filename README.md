# TechMate - Multi-Tool Kit

TechMate is your tech-savvy, multi-purpose companion. A modern, responsive web application featuring a suite of utility tools for developers, designers, and tech enthusiasts.

## ✨ Features

- **Password Generator**: Create strong, secure passwords with customizable options
- **Voice Recorder & Transcriber**: Record audio and get instant speech-to-text transcriptions
- **Color Palette Generator**: Generate beautiful color palettes for design projects
- **Unit Converter**: Convert between different units (length, weight, temperature)

## 🎨 Design Highlights

- **Modern UI/UX**: Clean, professional design with smooth animations
- **Mobile-First**: Fully responsive design that works on all devices
- **Dark Theme**: Eye-friendly dark interface with accent colors
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Performance**: Optimized loading and smooth interactions

## 🚀 Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS 3
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme Management**: next-themes
- **State Management**: React Hooks

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🛠️ Installation

```bash
# Clone or install the project
git clone <repository>
cd techmate

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open browser
# Navigate to http://localhost:3000
```

## 📦 Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 📄 Project Structure

```
techmate/
├── app/
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── colors/page.tsx       # Color generator
│   ├── converter/page.tsx    # Unit converter
│   └── recorder/page.tsx     # Voice recorder
├── components/
│   ├── ui/                   # Reusable UI components
│   ├── layout.tsx            # Header layout
│   ├── tool-tabs.tsx         # Navigation tabs
│   ├── password-generator.tsx
│   ├── colors.tsx
│   ├── converter.tsx
│   └── recorder.tsx
├── lib/
│   └── utils.ts              # Utility functions
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies
```

## 🎯 Key Features by Page

### Password Generator (`/`)
- Adjustable password length (6-32 characters)
- Toggle character types (uppercase, lowercase, numbers, symbols)
- One-click copy to clipboard
- Real-time generation

### Color Palette (`/colors`)
- Generate 6 random colors instantly
- Copy individual hex codes
- View color harmony preview
- Smooth animations on hover

### Unit Converter (`/converter`)
- Convert between length, weight, and temperature
- Support for multiple units per category
- Real-time conversion results
- Swap units functionality

### Voice Recorder (`/recorder`)
- Record audio with microphone
- Real-time speech-to-text transcription
- View and manage transcript history
- Edit and delete saved transcripts

## 🎨 Color System

| Element | Color | Usage |
|---------|-------|-------|
| Primary | #0050FF | Main actions, active states |
| Accent | #00D4FF | Secondary highlights |
| Background | #0D0D0D | Main background |
| Secondary | #1A1A2E | Cards, containers |
| Foreground | #F2F2F2 | Text, foreground |

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels for screen readers
- Keyboard navigation support
- Focus indicators on interactive elements
- Color contrast compliance (WCAG AA)

## 🔄 Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Latest |
| Firefox | ✅ Latest |
| Safari | ✅ Latest |
| Edge | ✅ Latest |
| Mobile | ✅ iOS/Android |

## 📝 License

This project is open source and available under the MIT License.

## 🙌 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

---

**Built with ❤️ using modern web technologies**
