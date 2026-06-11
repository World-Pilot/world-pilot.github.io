const fs = require("fs");

const css = fs.readFileSync("styles.css", "utf8");

const expectedSnippets = [
  "--page-bg: #f5f7fb;",
  "--page-ink: #18212b;",
  "background: rgba(255, 255, 255, 0.88);",
  "background: linear-gradient(180deg, #f7f4ee 0%, #f4f7fb 34%, #eef2f8 100%);",
  "background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(244, 247, 251, 0.92));",
];

const missing = expectedSnippets.filter((snippet) => !css.includes(snippet));

if (missing.length > 0) {
  console.error("Missing expected light-theme CSS snippets:");
  missing.forEach((snippet) => console.error(`- ${snippet}`));
  process.exit(1);
}

console.log("Light theme CSS snippets verified.");
