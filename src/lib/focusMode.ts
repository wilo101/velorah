/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const ATTR = 'data-velorah-focus';

export function getFocusMode(): boolean {
  return document.documentElement.getAttribute(ATTR) === 'true';
}

export function setFocusMode(on: boolean): void {
  document.documentElement.setAttribute(ATTR, on ? 'true' : 'false');
  try {
    localStorage.setItem('velorah:focus-mode', on ? '1' : '0');
  } catch {
    /* private mode */
  }
}

export function loadFocusModeFromStorage(): void {
  try {
    if (localStorage.getItem('velorah:focus-mode') === '1') {
      setFocusMode(true);
    }
  } catch {
    /* ignore */
  }
}
