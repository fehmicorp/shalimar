import Image from "next/image";

interface CenteredLogoDividerProps {
  className?: string;
}

export default function CenteredLogoDivider({ className = "" }: CenteredLogoDividerProps) {
  return (
    <div className={`relative flex items-end justify-center w-full ${className}`}>
      <div className="flex-grow h-[0.5px] bg-amber-500/60" />
      <div className="px-0 flex items-center justify-center shrink-0">
        <Image
          src="/logo.png" 
          alt="Logo"
          width={100}
          height={35}
          priority 
          className="h-6 sm:h-8 w-auto object-contain" 
        />
      </div>
      <div className="flex-grow h-[0.5px] bg-amber-500/60" />
    </div>
  );
}