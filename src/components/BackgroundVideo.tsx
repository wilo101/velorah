/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useState } from 'react';

const DEFAULT_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4';

/** Optional local override: place `hero.mp4` in `public/` and set VITE_HERO_VIDEO_URL=/hero.mp4 */
function videoSrc(): string {
  const fromEnv = import.meta.env.VITE_HERO_VIDEO_URL?.trim();
  if (fromEnv) return fromEnv;
  return DEFAULT_SRC;
}

export function BackgroundVideo() {
  const [ok, setOk] = useState(true);
  const src = videoSrc();

  const onError = useCallback(() => {
    setOk(false);
  }, []);

  return (
    <>
      {ok ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="velorah-bg-media fixed inset-0 w-full h-full object-cover z-0 opacity-60 transition-opacity duration-500"
          onError={onError}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <div
          className="velorah-bg-media fixed inset-0 z-0 opacity-90 transition-opacity duration-500"
          style={{
            background:
              'radial-gradient(ellipse 120% 80% at 50% 20%, hsl(201 90% 22%) 0%, hsl(201 100% 8%) 45%, hsl(220 40% 6%) 100%)',
          }}
          aria-hidden
        />
      )}
    </>
  );
}
