# Terminal Portfolio

A modern, interactive terminal-style portfolio website built with Next.js and styled-components. Features a retro terminal interface with ASCII art, command-line navigation, and a responsive design that works seamlessly across all devices.

## Features

### Interactive Terminal
- **Command-line interface** with real-time input
- **Tab completion** for commands
- **Command history** navigation (↑/↓ arrow keys)
- **Auto-suggestions** as you type
- **Multiple commands** including help, about, skills, projects, gallery, and more

### Responsive Design
- Fully responsive across all screen sizes (mobile, tablet, desktop)
- Adaptive ASCII art for smaller screens
- Touch-friendly interface for mobile devices
- Optimized font sizes and spacing for different viewports

### Gallery System
- Interactive image gallery with modal view
- Keyboard navigation (arrow keys, ESC)
- Zoom functionality with mouse wheel
- Organized by date/month
- Smooth transitions and hover effects

### Available Commands

**Information:**
- `help` - List all available commands
- `about` - About me
- `skills` - Technical skills
- `experience` - Work experience
- `education` - Educational background
- `whoami` - Quick introduction

**Connect:**
- `socials` - Social media links
- `contact` - Contact information
- `resume` - Resume/CV info

**Portfolio:**
- `projects` - My projects
- `gallery` - View image gallery

**System:**
- `systeminfo` - Display browser, OS, screen resolution, timezone, device type
- `uptime` - Show terminal session uptime
- `stats` - Session statistics (visit count, commands executed)
- `version` - Website version and info

**Fun:**
- `randomquote` - Random inspirational quote
- `calendar` - Display current month calendar
- `motd` - Message of the day

**Utility:**
- `clear` - Clear terminal

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio-nextjs
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Customization

### Adding New Commands
Edit `src/components/data/commands.js` to add new commands:

```javascript
export const cmdMap = {
  yourcommand: {
    description: "Your command description",
    action: () => [
      "Line 1 of output",
      "Line 2 of output",
      // Add HTML for links/styling
    ],
  },
};
```

### Updating Gallery Images
Add images to `public/assets/` and update the `images` array in `src/components/Terminal.jsx`:

```javascript
const images = [
  {
    src: "assets/your-image.png",
    desc: "Image description",
    date: "YYYY-MM-DD",
    month: "Month Name",
  },
];
```

### Styling
- Colors are defined at the top of `src/components/Terminal.jsx`
- Global styles in `src/app/globals.css`
- Responsive breakpoints: 400px, 600px, 768px, 1024px

## Tech Stack

- **Framework**: Next.js 15.4.6
- **UI Library**: React 19.1.0
- **Styling**: styled-components 6.1.19
- **CSS Framework**: Tailwind CSS 4
- **Font**: Fira Code (monospace)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized for fast loading
- Smooth animations and transitions
- Efficient re-rendering
- Mobile-optimized assets

## Deploy on Vercel

The easiest way to deploy is using [Vercel](https://vercel.com/new):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repo-url>)

## License

MIT License - feel free to use this for your own portfolio!

## Author

**Manash Hada**
- GitHub: [@hadeyghoptey](https://github.com/hadeyghoptey)
- LinkedIn: [Manash Hada](https://www.linkedin.com/in/manash-hada-12694u/)
- Email: manashada@proton.me
