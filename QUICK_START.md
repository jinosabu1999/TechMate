# TechMate - Quick Start Guide

## 🚀 Get Running in 2 Minutes

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Start Development Server
```bash
pnpm dev
```

### 3. Open in Browser
```
http://localhost:3000
```

---

## 📱 What You'll See

### Homepage (`/`)
**Password Generator**
- Generate secure passwords
- Customize length (6-32 chars)
- Toggle character types
- Copy to clipboard

### Colors (`/colors`)
**Color Palette Generator**
- Generate 6 random colors
- Copy hex codes
- View harmony preview
- Perfect for design

### Converter (`/converter`)
**Unit Converter**
- Convert length, weight, temp
- Real-time results
- Swap units easily

### Recorder (`/recorder`)
**Voice Transcriber**
- Record audio
- Get instant transcription
- Manage history
- Edit transcripts

---

## 🎨 Design Features

✅ **Dark Theme** - Easy on the eyes
✅ **Responsive** - Works on all devices
✅ **Modern UI** - Professional look
✅ **Smooth Animations** - Delightful interactions
✅ **Accessible** - Keyboard & screen reader friendly

---

## 🛠️ Commands

| Command | Action |
|---------|--------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start dev server |
| `pnpm build` | Build for production |
| `pnpm start` | Run production build |
| `pnpm lint` | Run ESLint |

---

## 📁 Important Files

- `/app/page.tsx` - Home page
- `/components/layout.tsx` - Header & layout
- `/components/tool-tabs.tsx` - Navigation
- `/app/globals.css` - Styles & colors
- `tailwind.config.ts` - Theme config

---

## 🎯 Browse the App

| Page | URL | Feature |
|------|-----|---------|
| Home | `/` | Password Generator |
| Colors | `/colors` | Palette Generator |
| Converter | `/converter` | Unit Converter |
| Recorder | `/recorder` | Voice Recorder |

---

## 🔧 Customize

### Change Colors
Edit `app/globals.css` (lines 5-17):
```css
--primary: 217 100% 50%;      /* Blue */
--accent: 169 100% 47%;       /* Cyan */
```

### Change Logo
Edit `components/layout.tsx` (line 12):
```tsx
<Sparkles className="h-5 w-5" /> {/* Change icon */}
```

### Change Title
Edit `components/layout.tsx` (line 14):
```tsx
<h1>TechMate</h1> {/* Change title */}
```

---

## 📚 Documentation

- **README.md** - Full overview
- **DESIGN_GUIDE.md** - Design system
- **DESIGN_UPDATE.md** - What's new
- **MODERNIZATION_COMPLETE.md** - Complete summary

---

## 🌐 Browser Support

- Chrome ✅
- Firefox ✅
- Safari ✅
- Edge ✅
- Mobile ✅

---

## 📊 Project Stats

- **Responsive Breakpoints**: 3 (mobile, tablet, desktop)
- **UI Components**: 11
- **Pages**: 4
- **Color Palette**: 5 colors
- **Animations**: Smooth & performant
- **Accessibility**: WCAG AA

---

## ⚡ Quick Tips

1. **Dark Mode** - Click the moon icon in header
2. **Copy Passwords** - One-click copy with feedback
3. **Generate Colors** - Click refresh to get new palette
4. **Convert Units** - Click swap arrow to swap units
5. **Record Voice** - Allow microphone permission first

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
pnpm dev -- -p 3001
```

### Dependencies Not Installing
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Clear Cache
```bash
rm -rf .next
pnpm dev
```

---

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [Framer Motion](https://www.framer.com/motion)

---

## 🎉 You're All Set!

TechMate is ready to use. Enjoy the modern, responsive experience!

**Questions?** Check the README.md or DESIGN_GUIDE.md for more info.
