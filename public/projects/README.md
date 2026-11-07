# Project screenshots

Put real screenshots here, one folder per project slug:

    public/projects/<slug>/home.png

Then reference them in `src/content/projects.ts`, either as the card's
`cover` or under `caseStudy.screenshots`, with width, height and a
descriptive alt text. `npm test` fails if a referenced file is missing.
