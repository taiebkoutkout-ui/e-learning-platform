'use client';

import { useState, useEffect } from 'react';

interface TimeZone {
  name: string;
  offset: string;
  timezone: string;
}

const timeZones: TimeZone[] = [
  { name: 'New York', offset: 'America/New_York', timezone: 'EST/EDT' },
  { name: 'London', offset: 'Europe/London', timezone: 'GMT/BST' },
  { name: 'Paris', offset: 'Europe/Paris', timezone: 'CET/CEST' },
  { name: 'Dubai', offset: 'Asia/Dubai', timezone: 'GST' },
  { name: 'Tokyo', offset: 'Asia/Tokyo', timezone: 'JST' },
  { name: 'Sydney', offset: 'Australia/Sydney', timezone: 'AEDT/AEST' },
  { name: 'Los Angeles', offset: 'America/Los_Angeles', timezone: 'PST/PDT' },
  { name: 'Singapore', offset: 'Asia/Singapore', timezone: 'SGT' },
];

interface ClockState {
  [key: string]: {
    hours: string;
    minutes: string;
    seconds: string;
    ampm: string;
  };
}

export default function DigitalClock() {
  const [clocks, setClocks] = useState<ClockState>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateClocks = () => {
      const newClocks: ClockState = {};

      timeZones.forEach((tz) => {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: tz.offset,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });

        const parts = formatter.formatToParts(new Date());
        const time: ClockState[string] = {
          hours: '',
          minutes: '',
          seconds: '',
          ampm: '',
        };

        parts.forEach((part) => {
          if (part.type === 'hour') time.hours = part.value;
          if (part.type === 'minute') time.minutes = part.value;
          if (part.type === 'second') time.seconds = part.value;
          if (part.type === 'dayPeriod') time.ampm = part.value;
        });

        newClocks[tz.offset] = time;
      });

      setClocks(newClocks);
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-2">World Clock</h1>
          <p className="text-slate-300 text-lg">Current time across multiple time zones</p>
        </div>

        {/* Clock Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {timeZones.map((tz) => {
            const time = clocks[tz.offset];

            if (!time) return null;

            return (
              <div
                key={tz.offset}
                className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg p-6 shadow-2xl border border-slate-600 hover:border-blue-400 transition-all duration-300 hover:shadow-blue-500/20"
              >
                {/* City Name */}
                <h2 className="text-xl font-bold text-white mb-1">{tz.name}</h2>
                <p className="text-sm text-slate-400 mb-4">{tz.timezone}</p>

                {/* Digital Display */}
                <div className="bg-black rounded-lg p-4 mb-4 font-mono">
                  <div className="text-5xl text-green-400 font-bold text-center tracking-wider">
                    {time.hours}:{time.minutes}:{time.seconds}
                  </div>
                  <div className="text-center text-green-400 text-sm mt-2">
                    {time.ampm}
                  </div>
                </div>

                {/* Analog-style indicator */}
                <div className="w-full bg-slate-600 rounded-full h-1 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-cyan-400 h-full rounded-full transition-all duration-100"
                    style={{
                      width: `${((parseInt(time.hours) % 12) * 60 + parseInt(time.minutes)) / 7.2}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg p-6 border border-blue-700/50">
          <h3 className="text-white font-bold mb-2">💡 About This Clock</h3>
          <p className="text-slate-300 text-sm">
            This world clock displays real-time across 8 major time zones. Each clock updates every second and shows the exact time in that region using the timezone's local time format (12-hour with AM/PM).
          </p>
        </div>
      </div>
    </div>
  );
}
