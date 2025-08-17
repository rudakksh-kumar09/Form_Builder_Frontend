# Form_Bilder — Frontend (React + Vite)
Purpose
-------
Lightweight React frontend for the Form_Bilder project. Provides a Vite app with pages to build, view, and submit forms.
Quick start
-----------

1. Install dependencies:

	npm install
2. Start development server with hot reload:

	npm run dev

3. Build for production:
	npm run build

4. Preview the production build:

	npm run preview
Available scripts (from package.json)
- `dev` — start vite dev server
- `build` — build production assets
- `preview` — preview built site
- `lint` — run ESLint

Project layout
--------------
- `src/main.jsx` — app entry
- `src/App.jsx` — root component
- `src/pages/` — `FormBuilderPage.jsx`, `FormViewerPage.jsx`, `LoginPage.jsx`
- `public/` — static assets

Environment
-----------
`.env` is ignored by git (see `.gitignore`). Do not commit sensitive values. Add a `.env.example` with placeholder values if you need to share config.

Vercel / Production
-------------------
This project expects the backend API base URL in `import.meta.env.VITE_API_URL` (Vite env var). The production build uses the value in `.env.production` or the environment variables configured in your hosting provider.

The deployed backend for this frontend is:

	https://form-builder-zhxs.onrender.com

Files added for deployment:
- `.env.example` — shows the VITE_API_URL placeholder
- `.env.production` — sets VITE_API_URL for local production builds
- `vercel.json` — basic Vercel config that sets the `VITE_API_URL` env value during builds

Deploy to Vercel (quick):

1. Commit and push this repo to GitHub.
2. Import the repo into Vercel (https://vercel.com) and set the Project Root to the `frontend` folder if required.
3. In Vercel project settings, confirm the environment variable `VITE_API_URL` is set to `https://form-builder-zhxs.onrender.com` for Preview/Production.

Local production test:

1. Build locally: `npm run build`
2. Preview: `npm run preview` (will use `.env.production`)

Notes
-----
- Requires Node.js (recommend LTS).
- Backend API lives in `../server`.
