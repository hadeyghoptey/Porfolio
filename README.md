# Manash Hada Portfolio

Personal cybersecurity portfolio for Manash Hada, built with the Next.js App
Router. The site presents selected projects, credentials, gallery highlights,
contact links, and a downloadable portfolio PDF through a responsive interface.

## Tech Stack

- Next.js 15 and React 19
- CSS Modules for component-scoped interface styling
- Tailwind CSS 4 in the global styling pipeline
- Jest and Testing Library for UI regression coverage

## Project Structure

- `src/app`: App Router entry points, layouts, and global styles
- `src/components/portfolio`: portfolio sections, navigation, reveal behavior, and footer UI
- `src/components/gallery`: gallery grid and lightbox experience
- `src/content/portfolioContent.js`: centralized portfolio copy, links, and structured content
- `public/gallery`: project, team, event, and showcase imagery
- `public/fonts`: local font assets
- `public/Manash Hada.pdf`: downloadable portfolio PDF

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Available Scripts

- `npm run dev`: start the local development server
- `npm run build`: create a production build
- `npm run start`: serve the production build
- `npm run lint`: run ESLint
- `npm test`: run the Jest test suite

## Verification

Run these checks before publishing changes:

```bash
npm run lint
npm test -- --runInBand
npm run build
```
