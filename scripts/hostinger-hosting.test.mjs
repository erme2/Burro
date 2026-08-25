import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const readme = readFileSync('README.md', 'utf8');
const docs = readFileSync('docs/hostinger-hosting.md', 'utf8');
const htaccess = readFileSync('public/.htaccess', 'utf8');
const hostingerConfig = JSON.parse(readFileSync('docs/examples/latte-config.hostinger.json', 'utf8'));

assert.equal(existsSync('public/.htaccess'), true);
assert.match(htaccess, /RewriteEngine On/);
assert.match(htaccess, /RewriteCond %\{REQUEST_FILENAME\} -f \[OR\]/);
assert.match(htaccess, /RewriteCond %\{REQUEST_FILENAME\} -d/);
assert.match(htaccess, /RewriteRule \^ index\.html \[END\]/);
assert.match(htaccess, /latte-config\\.json/);
assert.match(htaccess, /max-age=31536000, immutable/);

assert.equal(hostingerConfig.paneBaseUrl, 'https://pane.erme2.com');
assert.equal(hostingerConfig.expectedOrigin, 'https://latte.erme2.com');
assert.equal(typeof hostingerConfig.expectedApplicationId, 'string');
assert.equal(typeof hostingerConfig.expectedOrganizationId, 'string');

assert.match(docs, /https:\/\/latte\.erme2\.com/);
assert.match(docs, /https:\/\/pane\.erme2\.com/);
assert.match(docs, /\/home\/u253124519\/domains\/erme2\.com\/public_html\/latte/);
assert.match(docs, /FRONTEND_URL=https:\/\/latte\.erme2\.com/);
assert.match(docs, /WORKOS_REDIRECT_URI=https:\/\/latte\.erme2\.com\/auth\/callback/);
assert.match(docs, /public assertion data/);
assert.match(docs, /must never contain passwords, API keys,\s+database credentials, WorkOS secrets, invitation tokens/);
assert.match(docs, /VITE_PANE_PROXY_\*/);
assert.match(docs, /copied into `dist\/` by Vite/);
assert.match(docs, /\/dashboard/);
assert.match(docs, /\/auth\/callback/);
assert.match(docs, /do not delete the `\/latte` directory/);

assert.match(readme, /Hostinger Alpha Hosting/);
