require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Path to your .npmrc file
const npmrcPath = path.join(__dirname, '.npmrc');

// Replace the placeholder with the actual environment variable value
const content = `//npm.pkg.github.com/:_authToken=${process.env._authToken}
@nosleepfullbuild:registry=https://npm.pkg.github.com
`;

// Write the content to .npmrc
fs.writeFileSync(npmrcPath, content);
console.log('.npmrc has been set up successfully.');
