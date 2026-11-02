

export default function HeroBackgroundSection() {
    return (
        <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover scale-105"
            >
            <source src="/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    )
}