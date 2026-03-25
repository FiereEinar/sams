import { useEffect, useState } from 'react';

type Props = {
  nextImportAt: string;
};

export default function ImportCooldown({ nextImportAt }: Props) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const target = new Date(nextImportAt);
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft('Cooldown expired. Refresh the page.');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`Next upload available in ${hours}h ${minutes}m.`);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [nextImportAt]);

  return (
    <div className="flex items-center gap-4 rounded-xl bg-blue-600 p-4 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/20">
        <span className="material-symbols-outlined animate-spin-pulse">hourglass_empty</span>
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold">Upload Cooldown Active</p>
        <p className="text-xs opacity-90">Basic plan tenants can upload a masterlist once every 24 hours. {timeLeft}</p>
      </div>
      {/* <button className="rounded-lg p-1 text-white transition-colors hover:bg-white/20">
        <span className="material-symbols-outlined">close</span>
      </button> */}
    </div>
  );
}
