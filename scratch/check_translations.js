
const fs = require('fs');
const path = require('path');

const frPath = '/Users/abdelrahmanmassriattal/Documents/antigravity/devfest/translations/fr.js';
const enPath = '/Users/abdelrahmanmassriattal/Documents/antigravity/devfest/translations/en.js';
const htmlPath = '/Users/abdelrahmanmassriattal/Documents/antigravity/devfest/index.html';

function getNestedKeys(obj, prefix = '') {
    let keys = [];
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            keys = keys.concat(getNestedKeys(obj[key], prefix + key + '.'));
        } else {
            keys.push(prefix + key);
        }
    }
    return keys;
}

// Mock window object for the script
const window = {};
eval(fs.readFileSync(frPath, 'utf8'));
const frKeys = getNestedKeys(window.translations_fr);

eval(fs.readFileSync(enPath, 'utf8'));
const enKeys = getNestedKeys(window.translations_en);

const htmlContent = fs.readFileSync(htmlPath, 'utf8');
const i18nRegex = /data-i18n="([^"]+)"/g;
let match;
const htmlKeys = new Set();
while ((match = i18nRegex.exec(htmlContent)) !== null) {
    htmlKeys.add(match[1]);
}

console.log('--- Missing in fr.js ---');
for (const key of htmlKeys) {
    if (!frKeys.includes(key)) {
        console.log(key);
    }
}

console.log('\n--- Missing in en.js ---');
for (const key of htmlKeys) {
    if (!enKeys.includes(key)) {
        console.log(key);
    }
}

console.log('\n--- Unused in fr.js ---');
for (const key of frKeys) {
    if (!htmlKeys.has(key)) {
        console.log(key);
    }
}

console.log('\n--- Keys in fr.js but not in en.js ---');
for (const key of frKeys) {
    if (!enKeys.includes(key)) {
        console.log(key);
    }
}

console.log('\n--- Keys in en.js but not in fr.js ---');
for (const key of enKeys) {
    if (!frKeys.includes(key)) {
        console.log(key);
    }
}
