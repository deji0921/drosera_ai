# Drosera Questions

A Next.js application for managing and displaying questions, featuring AI chat integration and a modern UI.

## Features
- Display and manage questions
- AI chat functionality (API route)
- Custom UI components (Input, Question, QuickQuestionTab)
- Asset management (logo)
- Modular data and font management

## Project Structure
```
next-env.d.ts
next.config.js
package.json
postcss.config.mjs
tsconfig.json
app/
  globals.css
  layout.tsx
  page.tsx
  api/
    ai-chat/
      route.ts
  assets/
    drosera-logo.png
  components/
    Input.tsx
    Question.tsx
    QuickQuestionTab.tsx
  data/
    questions.ts
  ui/
    fonts.ts
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
```bash
npm install
```

### Running the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Scripts
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server

## Customization
- Add questions in `app/data/questions.ts`
- Update UI components in `app/components/`
- Modify API logic in `app/api/ai-chat/route.ts`

## License
MIT
