"use client";

import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";

export const filmUrl =
  "https://www.apple.com/105/media/us/iphone-18-pro/2026/591df885-5ee2-4173-86e6-401021249f7c/films/product/iphone-18-pro-product-tpl-us-2026_16x9.m3u8";

export function FilmPlayer() {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (
      !Hls.isSupported() &&
      video.canPlayType("application/vnd.apple.mpegurl")
    ) {
      video.src = filmUrl;
      return;
    }
    if (!Hls.isSupported()) return;
    const hls = new Hls();
    hls.loadSource(filmUrl);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      void video.play().catch(() => {});
    });
    hls.on(Hls.Events.ERROR, (_event, data) => {
      if (data.fatal) setFailed(true);
    });
    return () => hls.destroy();
  }, []);
  return (
    <div className="film-player">
      <video
        ref={ref}
        controls
        autoPlay
        playsInline
        aria-label="iPhone 18 Pro film"
        onError={() => setFailed(true)}
      />
      {failed && <p>The original film could not be loaded in this browser.</p>}
      <a href={filmUrl}>Open the original film ↗</a>
    </div>
  );
}
