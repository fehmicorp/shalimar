
"use client";

import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";

interface HLSPlayerProps {
  source: string;
  fallbackSrc: string;
  header?: Record<string, string>;
  className?: string;
}

type PlaybackSource = "primary" | "fallback";

export default function HLSPlayer({
  source,
  fallbackSrc,
  header,
  className = "",
}: HLSPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  const activeSourceRef = useRef<PlaybackSource>("primary");
  const fallbackAttemptedRef = useRef(false);
  const activeUrlRef = useRef("");

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let disposed = false;
    let hls: Hls | null = null;

    activeSourceRef.current = "primary";
    fallbackAttemptedRef.current = false;
    activeUrlRef.current = source;

    setIsLoaded(false);
    setHasError(false);

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;
    video.autoplay = true;
    video.preload = "auto";

    const cleanupHls = () => {
      if (hls) {
        hls.destroy();
        hls = null;
        hlsRef.current = null;
      }
    };

    const playVideo = () => {
      if (disposed) return;

      video.play().catch(() => {
        // Autoplay may be restricted by the browser.
      });
    };

    const isHlsSource = (url: string) => {
      try {
        return new URL(url, window.location.href)
          .pathname.toLowerCase()
          .endsWith(".m3u8");
      } catch {
        return url.toLowerCase().includes(".m3u8");
      }
    };

    const switchToFallback = () => {
      if (
        disposed ||
        fallbackAttemptedRef.current ||
        activeSourceRef.current === "fallback"
      ) {
        return;
      }

      if (!fallbackSrc || fallbackSrc === source) {
        setHasError(true);
        return;
      }

      fallbackAttemptedRef.current = true;
      activeSourceRef.current = "fallback";

      setIsLoaded(false);
      setHasError(false);

      // Fallback loads without custom headers.
      loadSource(fallbackSrc, false);
    };

    const loadSource = (url: string, useHeaders: boolean) => {
      if (disposed) return;

      cleanupHls();

      activeUrlRef.current = url;

      video.pause();
      video.removeAttribute("src");
      video.load();

      const isHls = isHlsSource(url);

      // HLS.js playback
      if (isHls && Hls.isSupported()) {
        const instance = new Hls({
          enableWorker: true,
          lowLatencyMode: false,
          backBufferLength: 30,
          maxBufferLength: 30,

          // Headers are applied only to the primary HLS source.
          xhrSetup: (xhr) => {
            if (useHeaders && header) {
              Object.entries(header).forEach(([key, value]) => {
                xhr.setRequestHeader(key, value);
              });
            }
          },
        });

        hls = instance;
        hlsRef.current = instance;

        instance.on(Hls.Events.ERROR, (_event, data) => {
          if (disposed || !data.fatal) return;

          if (activeSourceRef.current === "primary") {
            switchToFallback();
          } else {
            setIsLoaded(false);
            setHasError(true);
            cleanupHls();
          }
        });

        instance.loadSource(url);
        instance.attachMedia(video);

        return;
      }

      // Native HLS playback (Safari / iOS).
      // Native video requests cannot use hls.js xhrSetup headers.
      if (
        isHls &&
        video.canPlayType("application/vnd.apple.mpegurl")
      ) {
        video.src = url;
        video.load();
        return;
      }

      // MP4 / WebM playback — no custom headers.
      video.src = url;
      video.load();
    };

    const handleCanPlay = () => {
      if (disposed) return;

      setIsLoaded(true);
      setHasError(false);
      playVideo();
    };

    const handleError = () => {
      if (disposed) return;

      // Ignore delayed errors belonging to a previous source.
      const currentSrc = video.currentSrc;

      if (
        currentSrc &&
        !currentSrc.endsWith(activeUrlRef.current)
      ) {
        return;
      }

      if (activeSourceRef.current === "primary") {
        switchToFallback();
      } else {
        setIsLoaded(false);
        setHasError(true);
      }
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);

    // Primary source uses custom headers.
    loadSource(source, true);

    return () => {
      disposed = true;

      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);

      cleanupHls();

      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [source, fallbackSrc, header]);

  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-[#07090e] ${className}`}
    >
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-10 bg-[#07090e]" />
      )}

      {!hasError && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {hasError && (
        <div className="absolute inset-0 bg-[#07090e]" />
      )}
    </div>
  );
}
