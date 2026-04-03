# Manash Hada Portfolio

A single-page cybersecurity portfolio built with Next.js App Router.

## Stack

- Next.js 15
- React 19
- Tailwind CSS 4 for global pipeline usage
- CSS Modules for the portfolio UI
- Jest + Testing Library for basic UI verification

## Structure

- `src/app`: app entrypoints and global styles
- `src/components/portfolio`: page sections, sticky nav, and reveal behavior
- `src/components/gallery`: gallery grid and lightbox behavior
- `src/content/portfolioContent.js`: centralized portfolio content
- `public/gallery`: project, event, and team imagery
- `public/fonts`: local typography assets
- `public/Manash Hada.pdf`: downloadable portfolio PDF

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run lint
npm test -- --runInBand
npm run build
```
