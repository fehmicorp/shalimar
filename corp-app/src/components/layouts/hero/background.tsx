
import { assetsConfig } from "@/config/site";
import HLSPlayer from "@/providers/hls";

export default function HeroBackgroundSection() {
  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      <HLSPlayer
        source={assetsConfig.asset + "hero-video.m3u8"}
        fallbackSrc="/video.mp4"
        header={{
          [assetsConfig.accessTokenHeader]: assetsConfig.accessToken,
        }}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
      />
      <div className="pointer-events-none absolute inset-0 bg-black/10" />
    </div>
  );
}
