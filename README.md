
# PosterForge

PosterForge is a lightweight poster-generation web app that uses Gemini APIs for image/asset generation and provides a simple workspace to compose and export posters.

> Tech Stack Used: TypeScript, Gemini API

## Quick Start

1. Verify Node:
<<<<<<< HEAD
=======

```powershell
node --version
npm --version
```

2. Create a local environment file

Create a file named `.env.local` in the project root and add your Gemini API key (or other environment variables). Example:

```text
# .env.local
GEMINI_API_KEY=your_real_gemini_api_key_here
```

3. Install dependencies

```powershell
npm install
```

4. Run the app in development mode

```powershell
npm run dev
```

Open http://localhost:5173 (or the port shown in your terminal) in your browser.

## What a collaborator should know

- The app expects `GEMINI_API_KEY` (or similarly-named keys) inside `.env.local` at runtime. Keep this file out of source control.
- Key frontend entry points:
   - `index.tsx` – app bootstrap
   - `App.tsx` – top-level layout
   - `components/Workspace.tsx` – main poster editor
   - `services/geminiService.ts` – Gemini API wrapper

## Environment variables

- `.env.local` (example)

```text
GEMINI_API_KEY=your_real_gemini_api_key_here
# Add other env values here if needed
```

Notes:
- Never commit `.env.local` to the repo.
- If you need to expose client-side variables, prefix them with `VITE_`.

## Contributing

1. Fork the repo and create a feature branch
2. Add tests or visual proof for UI changes when possible
3. Open a PR with a clear description of the change
>>>>>>> a2a6e2a (Image to Poster)

```powershell
node --version
npm --version
```

<<<<<<< HEAD
2. Create a local environment file

Create a file named `.env.local` in the project root and add your Gemini API key (or other environment variables). Example:

```text
# .env.local
GEMINI_API_KEY=your_real_gemini_api_key_here
```

3. Install dependencies

```powershell
npm install
```

4. Run the app in development mode

```powershell
npm run dev
```

Open http://localhost:5173 (or the port shown in your terminal) in your browser.

## What a collaborator should know

- The app expects `GEMINI_API_KEY` (or similarly-named keys) inside `.env.local` at runtime. Keep this file out of source control.
- Key frontend entry points:
   - `index.tsx` – app bootstrap
   - `App.tsx` – top-level layout
   - `components/Workspace.tsx` – main poster editor
   - `services/geminiService.ts` – Gemini API wrapper

## Environment variables

- `.env.local` (example)

```text
GEMINI_API_KEY=your_real_gemini_api_key_here
# Add other env values here if needed
```

Notes:
- Never commit `.env.local` to the repo.
- If you need to expose client-side variables, prefix them with `VITE_`.

## Contributing

1. Fork the repo and create a feature branch
2. Add tests or visual proof for UI changes when possible
3. Open a PR with a clear description of the change

--
## Our Team
<a href="https://github.com/Bhanu-partap-13/Poster-Forge/graphs/contributors">
<img src="https://contributors-img.web.app/image?repo=Bhanu-partap-13/Poster-Forge"/>

=======
>>>>>>> a2a6e2a (Image to Poster)
## License

This project does not include a license file by default. Add a `LICENSE` if you want to make the terms explicit.

---
<<<<<<< HEAD
=======

>>>>>>> 960a35e (improvements)
>>>>>>> a2a6e2a (Image to Poster)
