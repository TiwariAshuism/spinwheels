import fs from "fs";

const html = fs.readFileSync(
  "C:/Users/Ashu/Downloads/spinwheels-website/spinwheels-website/index.html",
  "utf8",
);
const match = html.match(/<style>([\s\S]*?)<\/style>/);
if (!match) throw new Error("styles not found");

let css = match[1];
css = css.replace(/'IBM Plex Sans'/g, "var(--font-body), sans-serif");
css = css.replace(/'Space Grotesk'/g, "var(--font-display), sans-serif");

const root = `:root {
  --teal-dark: #1B3B36;
  --teal-deep: #122824;
  --teal-mid: #173832;
  --yellow: #FFC93C;
  --yellow-deep: #E6B32E;
  --bg: #EEF0E7;
  --bg-card: #FFFFFF;
  --trust-green: #2F8F6B;
  --ink: #142420;
  --muted: #55655F;
  --line: #DCE0D4;
  --white: #FFFFFF;
  --text-on-dark: #FFFFFF;
  --text-muted-on-dark: #C9D6CE;
  --text-accent-on-dark: #9FC9BB;
  --surface-overlay: rgba(255, 255, 255, 0.06);
  --surface-overlay-border: rgba(255, 255, 255, 0.12);
  --danger: #C0392B;
  --maxw: 1140px;
  --font-display: var(--font-space-grotesk);
  --font-body: var(--font-ibm-plex-sans);
}`;

css = css.replace(/:root\s*\{[\s\S]*?\}/, root);

const swaps = [
  ["color: #fff", "color: var(--text-on-dark)"],
  ["color: #FFF", "color: var(--text-on-dark)"],
  ["color: #C9D6CE", "color: var(--text-muted-on-dark)"],
  ["color: #9FC9BB", "color: var(--text-accent-on-dark)"],
  ["color: #EEF0E7", "color: var(--bg)"],
  ["color: #122824", "color: var(--teal-deep)"],
  ["background: #fff", "background: var(--white)"],
  ["background:#fff", "background: var(--white)"],
];

for (const [from, to] of swaps) {
  css = css.split(from).join(to);
}

const app = fs.readFileSync("apps/web/src/app/globals.css", "utf8");
fs.writeFileSync("apps/web/src/app/globals.css", `${css.trim()}\n\n${app.trim()}\n`);
