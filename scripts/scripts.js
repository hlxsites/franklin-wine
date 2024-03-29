/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { setLibs } from './utils.js';

// Add project-wide style path here.
const STYLES = '';

// Use '/libs' if your live site maps '/libs' to milo's origin.
const LIBS = '/libs';

// Add any config options.
const CONFIG = {
  // codeRoot: '',
  // contentRoot: '',
  // imsClientId: 'college',
  // geoRouting: 'off',
  // fallbackRouting: 'off',
  locales: {
    '': { ietf: 'en-US', tk: 'hah7vzn.css' },
    de: { ietf: 'de-DE', tk: 'hah7vzn.css' },
    kr: { ietf: 'ko-KR', tk: 'zfo3ouc' },
  },
};

// Load LCP image immediately
(async function loadLCPImage() {
  const lcpImg = document.querySelector('img');
  lcpImg?.removeAttribute('loading');
}());

/*
 * ------------------------------------------------------------
 * Edit below at your own risk
 * ------------------------------------------------------------
 */

const miloLibs = setLibs(LIBS);

function appendLink(path, rel, as) {
  const link = document.createElement('link');
  link.href = path;
  link.setAttribute('rel', rel);
  if (as) link.setAttribute('as', as);
  document.head.appendChild(link);
}

function preloadLCPBlock() {
  const [name] = document.body.querySelectorAll('main > div:first-child > div')?.classList;
  if (!name) return;

  const jsPath = `${miloLibs}/blocks/${name}/${name}.js`;
  const cssPath = `${miloLibs}/blocks/${name}/${name}.css`;

  appendLink(jsPath, 'modulepreload', 'script');
  appendLink(cssPath, 'stylesheet');
}

(function loadStyles() {
  const paths = [`${miloLibs}/styles/styles.css`];
  if (STYLES) { paths.push(STYLES); }
  paths.forEach((path) => { appendLink(path, 'stylesheet'); });
}());

(async function loadPage() {
  // preloadLCPBlock();
  const { loadArea, loadDelayed, setConfig } = await import(`${miloLibs}/utils/utils.js`);
  setConfig({ ...CONFIG, miloLibs });
  await loadArea();
  loadDelayed();
}());
