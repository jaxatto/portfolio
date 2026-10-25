# Resume source

`resume.html` + `resume.css` are the source. `build.mjs` renders them with headless Chrome into `Jax-Engel_Staff-Product-Designer_Resume_2026.pdf` (tagged PDF, title and author set).

```
cd resume
npm install   # once (puppeteer-core, pdf-lib)
npm run build
```

`resume.html` is the main resume. `resume-ats.html` is a copy for strict parsers without title descriptors, "Contract" and "(Hybrid)". Build it with `node build.mjs resume-ats` (output ends in `-ats.pdf`). Edit content in `resume.html`, then mirror the change in `resume-ats.html`. The PDF here is not the live one: copy it over `public/Jax-Engel_Staff-Product-Designer_Resume_2026.pdf` when Jax decides.

Design Engineer variants: `resume-de.html` (main style) and `resume-de-ats.html` (ATS style). Same experience, with a Design Engineer headline, an engineering-first summary and a reordered Skills list. Build with `node build.mjs resume-de` and `node build.mjs resume-de-ats`. Mirror content edits across all four files.
