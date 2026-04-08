/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(160deg, hsl(201 100% 13%) 0%, hsl(220 40% 8%) 100%)',
          color: 'white',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ fontSize: 72, letterSpacing: '-2px' }}>Velorah</div>
        <div style={{ fontSize: 26, marginTop: 20, opacity: 0.75 }}>Where dreams rise through the silence.</div>
      </div>
    ),
    { ...size },
  );
}
