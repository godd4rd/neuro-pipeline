# Neuro Pipeline - Project Context

## Overview
A pharmaceutical pipeline management dashboard for Johnson & Johnson, built as part of the SilverLine design system. The application visualizes drug development programmes across various therapy areas and pipeline stages.

## Tech Stack
- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS v4 (using `@import "tailwindcss"` syntax)
- **Charts:** Recharts
- **Routing:** React Router DOM v6
- **Build Tool:** Vite 7

## Design System

### Brand Colors
```css
--brand-red: #D21034      /* Primary brand color - J&J red */
--brand-blue: #001852     /* Secondary brand color */
```

### Accent Colors (Pipeline Stages)
```css
--stage-hit-id: #FF9B42      /* Orange */
--stage-htl: #4EA62F         /* Green */
--stage-lo: #009189          /* Teal */
--stage-llo: #0F68B2         /* Blue */
--stage-pre-clinical: #A12B92 /* Purple/Violet */
--stage-phase-1: #9E0000     /* Dark Red */
--stage-phase-2a: #BF1F1F    /* Red */
--stage-phase-2b: #984211    /* Brown */
--stage-phase-3: #0C394E     /* Dark Teal */
```

### Category Badge Colors
```css
oncology: #9E0000
into: #4EA62F
immunology: #009189
neuroscience: #A12B92
cardiopulmonary: #0F68B2
other: #FF9B42
```

### Therapy Area Colors (Pipeline Cards)
```css
yellow: #FCD34D
green: #86EFAC
purple: #C4B5FD
red: #FCA5A5
blue: #93C5FD
orange: #FDBA74
pink: #F9A8D4
teal: #5EEAD4
```

### Neutral Colors
```css
--neutral-black: #000000
--neutral-white: #FFFFFF
--neutral-warm-gray-50: #FAFAF9
--neutral-warm-gray-100: #F5F5F4
--neutral-warm-gray-200: #E7E5E4
--neutral-warm-gray-300: #D6D3D1
--neutral-warm-gray-500: #78716C
--neutral-warm-gray-700: #44403C
--neutral-warm-gray-900: #292524
```

### Typography
- **Font Family:** System UI stack (`system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`)
- **Base Size:** 14px
- **Headings:**
  - H1: 20-24px, font-weight 600
  - H3 (Card titles): 18px, font-weight 600
- **Body:** 13-14px
- **Small/Labels:** 10-12px, uppercase for labels

### Spacing
- Use Tailwind spacing utilities (p-2, p-4, p-6, gap-2, gap-4, gap-6)
- Standard padding for cards: `p-6`
- Grid gaps: `gap-6` for card grids, `gap-2` for pipeline grids

### Border Radius
- Cards: `rounded-lg` (8px)
- Buttons: `rounded-lg` or `rounded-full` for pills
- Badges: `rounded` (4px)

## File Structure
```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx       # Main navigation header
│   ├── ChartCard.jsx    # Bar chart card wrapper
│   ├── PipelineChart.jsx # Recharts bar chart
│   ├── PipelineCard.jsx  # Drug/programme card
│   ├── PipelineGrid.jsx  # Stage-based grid layout
│   ├── FilterSection.jsx # Filters and controls
│   └── TitleSection.jsx  # Page title component
├── pages/               # Route-level components
│   ├── Dashboard.jsx    # Main dashboard with charts
│   └── NeurosciencePipeline.jsx # Detail grid view
├── data/                # Static data and constants
│   ├── pipelineData.js  # Chart data and colors
│   └── neuroscienceData.js # Pipeline card data
├── App.jsx              # Router setup
├── main.jsx             # Entry point
└── index.css            # Global styles and CSS variables
```

## Component Patterns

### Card Components
- White background with `border border-gray-200`
- Consistent padding `p-6`
- Category badges positioned top-right with colored backgrounds
- Stats displayed as uppercase labels with bold values

### Charts
- Use Recharts `ResponsiveContainer` with explicit height
- Internal programmes: Red (#9E0000)
- External programmes: Blue (#0F68B2)
- X-axis labels at 45° angle for stage names
- No vertical grid lines, only horizontal dashed

### Navigation
- Header with brand logo, nav tabs, and user avatar
- Active tab: dark background (#292524) with white text
- Back links in brand red with left arrow icon

### Interactive Elements
- Buttons: Brand red background for primary actions
- Toggle switches: Green (#22C55E) when active, gray when off
- Hover states: Use `transition-colors` or `transition-all`

## Coding Conventions

### React
- Functional components with hooks
- Props destructuring at component level
- Default exports for components
- Named exports for data/utilities

### Styling
- Prefer Tailwind utility classes over custom CSS
- Use CSS variables for brand colors (defined in index.css)
- Inline styles only for dynamic values (e.g., border colors from data)

### Data
- Keep mock data in `/src/data/` directory
- Export constants in SCREAMING_SNAKE_CASE
- Export data objects in camelCase

## Routes
- `/` - Main dashboard with bar chart overview
- `/neuroscience` - Neuroscience pipeline detail view

## Git Workflow
- Commit after each significant iteration
- Use descriptive commit messages
- Include `Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>` in commits

## Deployment (REQUIRED)

**IMPORTANT: After completing any code changes, ALWAYS perform these steps:**

1. **Commit changes to git:**
   ```bash
   git add <changed-files>
   git commit -m "Description of changes

   Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
   ```

2. **Push to GitHub:**
   ```bash
   git push origin main
   ```

Deployment happens automatically via GitHub Actions when you push to main. The workflow:
- Builds the project
- Deploys to GitHub Pages
- Runs a smoke test to verify the deployment

**Live Site:** https://godd4rd.github.io/neuro-pipeline/

These steps must be completed for every change to ensure the live site is updated.

## Figma Reference
- Design file: SilverLine
- Node: 4907-75854 (Dashboard view)
