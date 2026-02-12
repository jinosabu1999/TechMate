# TechMate Design Guide

## Visual Design System

### Color Palette

#### Primary Colors
```
Primary Blue:    #0050FF (RGB: 0, 80, 255)
Accent Cyan:     #00D4FF (RGB: 0, 212, 255)
```

#### Neutral Colors
```
Background:      #0D0D0D (Near Black)
Surface Dark:    #1A1A2E (Dark Slate)
Surface Light:   #404040 (Gray)
Text Primary:    #F2F2F2 (Off White)
Text Secondary:  #CCCCCC (Light Gray)
```

### Typography

#### Font Family
- **Primary**: Inter (400, 500, 600, 700, 800)
- **Monospace**: System monospace (for code/passwords)

#### Font Sizes & Styles
```
Heading 1 (Display):    3rem (48px)    font-bold
Heading 2 (Hero):       2.25rem (36px) font-bold
Heading 3 (Title):      1.875rem (30px) font-bold
Heading 4:              1.5rem (24px)  font-semibold
Body Large:             1.125rem (18px) font-medium
Body Regular:           1rem (16px)    font-normal
Body Small:             0.875rem (14px) font-normal
Caption:                0.75rem (12px) font-normal
```

#### Line Heights
- Headings: 1.2
- Body: 1.6
- Compact: 1.4

### Spacing Scale

```
0px    - 0
4px    - 1
8px    - 2
12px   - 3
16px   - 4 (standard)
20px   - 5
24px   - 6
32px   - 8
48px   - 12
64px   - 16
96px   - 24
```

### Border Radius

```
Small:   0.375rem (6px)
Regular: 0.5rem (8px)
Large:   0.75rem (12px)
Full:    9999px (circular)
```

### Shadows

```
Subtle:    0 1px 2px rgba(0,0,0,0.05)
Small:     0 1px 3px rgba(0,0,0,0.1)
Medium:    0 4px 6px rgba(0,0,0,0.1)
Large:     0 10px 15px rgba(0,0,0,0.1)
Glow:      0 0 20px rgba(0,80,255,0.2)
```

## Component Guidelines

### Buttons

#### Primary Button
- Background: Primary Blue (#0050FF)
- Text: White
- Padding: 10px 24px (height: 44px minimum)
- Border Radius: 8px
- Hover: Darken by 10%
- Active: Darken by 20%

#### Secondary Button
- Background: Surface Dark (#1A1A2E)
- Border: 1px solid #404040
- Text: Text Primary
- Hover: Lighten background

#### Ghost Button
- Background: Transparent
- Text: Text Primary
- Hover: Background #1A1A2E

### Forms

#### Input Fields
- Height: 40px (10px padding)
- Border: 1px solid #404040
- Background: #0D0D0D
- Border Radius: 8px
- Focus: 2px solid Primary Blue

#### Labels
- Font Size: 14px
- Font Weight: 500
- Color: Text Secondary
- Margin Bottom: 8px

### Cards

- Background: Surface Dark (#1A1A2E)
- Border: 1px solid #404040
- Border Radius: 8px
- Padding: 24px
- Shadow: Small shadow
- Hover: Slight glow effect

## Responsive Design

### Mobile (< 640px)
- Single column layout
- Stacked buttons and inputs
- Larger touch targets (minimum 44x44px)
- Increased padding and margins
- Font sizes remain readable

### Tablet (640px - 1024px)
- Two column layouts where appropriate
- Balanced padding
- Icons visible in navigation

### Desktop (> 1024px)
- Multi-column layouts
- Efficient use of space
- Full navigation visible

## Animation Guidelines

### Duration
- Fast: 150ms (micro interactions)
- Normal: 200ms (transitions)
- Slow: 300ms (major animations)

### Easing Functions
- Ease In: cubic-bezier(0.4, 0, 1, 1)
- Ease Out: cubic-bezier(0, 0, 0.2, 1)
- Ease In Out: cubic-bezier(0.4, 0, 0.2, 1)

### Common Animations
- Fade: opacity 200ms
- Scale: transform 200ms (1 to 1.05)
- Slide: transform 200ms
- Pulse: opacity loop 2s

## Accessibility

### Contrast Ratios
- Normal text: 4.5:1 minimum (WCAG AA)
- Large text: 3:1 minimum (WCAG AA)
- UI components: 3:1 minimum (WCAG AA)

### Focus Indicators
- Color: Accent Cyan (#00D4FF)
- Width: 2px
- Offset: 2px
- Visible on all interactive elements

### ARIA Labels
- Use descriptive labels on buttons
- Add `aria-label` on icon-only buttons
- Use `aria-describedby` for complex inputs
- Mark non-visible text with `sr-only`

## Usage Examples

### Creating a New Component

```tsx
'use client'

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function MyComponent() {
  return (
    <div className="card space-y-4">
      <div className="space-y-2">
        <Label>Input Label</Label>
        <Input placeholder="Enter text" />
      </div>
      <Button className="w-full">
        Action Button
      </Button>
    </div>
  )
}
```

### Common Class Patterns

```tsx
// Card styling
className="card"

// Spacing
className="space-y-4"        // Vertical spacing
className="flex gap-4"       // Horizontal spacing

// Text
className="text-lg font-semibold"
className="text-muted-foreground"

// Responsive
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"

// States
className="hover:bg-muted transition-colors"
```

## Dark Mode

All components are designed for dark mode first. Light mode support can be added by:

1. Setting a light theme in `tailwind.config.ts`
2. Adding light mode classes in `globals.css`
3. Using theme-aware color utilities

## Performance Tips

1. Use Tailwind utility classes (no custom CSS)
2. Lazy load components where possible
3. Memoize expensive computations
4. Use framer-motion for performant animations
5. Minimize re-renders with proper React patterns

---

For more information, see the main README.md and DESIGN_UPDATE.md files.
