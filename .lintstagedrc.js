const path = require("path");

const buildEslintCommand = (filenames) => [
  `prettier --write ${filenames.join(" ")}`,
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`,
];

module.exports = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],
};
