# Resume source

`resume.html` + `resume.css` are the source. `build.mjs` renders them with headless Chrome into `Jax-Engel_Staff-Product-Designer_Resume_2026.pdf` (tagged PDF, title and author set).

```
cd resume
npm install   # once (puppeteer-core, pdf-lib)
npm run build
```

Edit content in `resume.html` only. The PDF here is not the live one: copy it over `public/Jax-Engel_Staff-Product-Designer_Resume_2026.pdf` when Jax decides.
