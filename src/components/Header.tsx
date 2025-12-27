'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { Menu, Home, ChevronDown, LayoutDashboard, Stethoscope, Activity, BedDouble, Clock, HeartPulse, Users } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  pathname: string;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, pathname }) => {
  const lastSync = useMemo(
    () =>
      new Date().toLocaleString('th-TH', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    []
  );

  const pageInfo = useMemo(() => {
    if (pathname.startsWith('/hospital')) {
      return { title: 'Hospital', icon: <LayoutDashboard className="w-5 h-5 md:w-6 md:h-6" /> };
    }
    if (pathname.startsWith('/one-lr')) {
      return { title: 'One LR', icon: <Stethoscope className="w-5 h-5 md:w-6 md:h-6" /> };
    }
    if (pathname.startsWith('/one-or')) {
      return { title: 'One OR', icon: <Activity className="w-5 h-5 md:w-6 md:h-6" /> };
    }
    if (pathname.startsWith('/one-icu')) {
      return { title: 'One ICU', icon: <HeartPulse className="w-5 h-5 md:w-6 md:h-6" /> };
    }
    if (pathname.startsWith('/one-ipd')) {
      return { title: 'One IPD', icon: <BedDouble className="w-5 h-5 md:w-6 md:h-6" /> };
    }
    if (pathname.startsWith('/opd-visit')) {
      return { title: 'OPD Visit', icon: <Users className="w-5 h-5 md:w-6 md:h-6" /> };
    }
    if (pathname.startsWith('/waiting')) {
      if (pathname.includes('weekly')) return { title: 'OPD (รายสัปดาห์)', icon: <Clock className="w-5 h-5 md:w-6 md:h-6" /> };
      if (pathname.includes('monthly')) return { title: 'OPD (รายเดือน)', icon: <Clock className="w-5 h-5 md:w-6 md:h-6" /> };
      return { title: 'OPD (รายวัน)', icon: <Clock className="w-5 h-5 md:w-6 md:h-6" /> };
    }
    return { title: 'หน้าหลัก', icon: <Home className="w-5 h-5 md:w-6 md:h-6" /> };
  }, [pathname]);

  const subtitle = `ข้อมูล Real Time (last sync ${lastSync})`;

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sticky top-0 z-40 shadow-sm">
      <div className="flex items-center gap-2 md:gap-4 overflow-hidden flex-1 mr-2">
        <button
          className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 md:hidden shrink-0"
          onClick={onMenuToggle}
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="hidden md:flex items-center gap-2 shrink-0">
          <Image
            src="/logo.png"
            alt="Logo"
            width={48}
            height={48}
            sizes="(min-width: 768px) 48px, 40px"
            className="w-10 h-10 md:w-12 md:h-12 object-contain shrink-0 drop-shadow-sm"
            priority
          />
          <div className="hidden lg:flex flex-col">
            <h1 className="text-sm md:text-lg font-bold text-blue-900 leading-tight">พิษณุโลก</h1>
            <span className="text-[10px] md:text-xs text-green-700 font-semibold">One Province One Hospital</span>
          </div>
        </div>

        <div className="hidden md:block h-8 w-px bg-gray-200 mx-1 md:mx-2 shrink-0"></div>

        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
            {pageInfo.icon}
          </div>
          <div className="flex flex-col justify-center overflow-hidden">
            <h2 className="font-bold text-blue-900 text-sm md:text-base leading-tight truncate">{pageInfo.title}</h2>
            <p className="text-[10px] text-gray-500 hidden md:block leading-tight truncate">{subtitle}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded-full transition-colors">
          <span className="text-xs md:text-sm font-semibold text-gray-700">Provider</span>
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
            <Image
              src="/nurse.png"
              alt="Nurse avatar"
              width={40}
              height={40}
              sizes="40px"
              className="w-full h-full object-cover"
              priority={false}
            />
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </header>
  );
};