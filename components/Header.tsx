import React from 'react';
import { Menu, Home, User, ChevronDown, LayoutDashboard, Stethoscope, Activity, BedDouble, Clock, HeartPulse, Users } from 'lucide-react';
import { ViewType } from '../types';

interface HeaderProps {
  onMenuToggle: () => void;
  activeView: ViewType;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, activeView }) => {
  
  // Format current date/time for "last sync"
  const lastSync = new Date().toLocaleString('th-TH', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  const realTimeSubtitle = `ข้อมูล Real Time (last sync ${lastSync})`;

  const getPageInfo = () => {
    switch (activeView) {
      case 'hospital':
        return { 
          title: 'Hospital', 
          subtitle: realTimeSubtitle,
          icon: <LayoutDashboard className="w-5 h-5 md:w-6 md:h-6" />
        };
      case 'onelr':
        return { 
          title: 'One LR', 
          subtitle: realTimeSubtitle,
          icon: <Stethoscope className="w-5 h-5 md:w-6 md:h-6" />
        };
      case 'oneor':
        return { 
          title: 'One OR', 
          subtitle: realTimeSubtitle,
          icon: <Activity className="w-5 h-5 md:w-6 md:h-6" />
        };
      case 'oneicu':
        return { 
          title: 'One ICU', 
          subtitle: realTimeSubtitle,
          icon: <HeartPulse className="w-5 h-5 md:w-6 md:h-6" />
        };
      case 'oneipd':
        return { 
          title: 'One IPD', 
          subtitle: realTimeSubtitle,
          icon: <BedDouble className="w-5 h-5 md:w-6 md:h-6" />
        };
      case 'opd-visit':
        return { 
          title: 'OPD Visit', 
          subtitle: realTimeSubtitle,
          icon: <Users className="w-5 h-5 md:w-6 md:h-6" />
        };
      case 'waiting-daily':
        return { 
          title: 'OPD (รายวัน)', 
          subtitle: realTimeSubtitle,
          icon: <Clock className="w-5 h-5 md:w-6 md:h-6" />
        };
      case 'waiting-weekly':
        return { 
          title: 'OPD (รายสัปดาห์)', 
          subtitle: realTimeSubtitle,
          icon: <Clock className="w-5 h-5 md:w-6 md:h-6" />
        };
      case 'waiting-monthly':
        return { 
          title: 'OPD (รายเดือน)', 
          subtitle: realTimeSubtitle,
          icon: <Clock className="w-5 h-5 md:w-6 md:h-6" />
        };
      case 'waiting':
        return { 
          title: 'OPD', 
          subtitle: realTimeSubtitle,
          icon: <Clock className="w-5 h-5 md:w-6 md:h-6" />
        };
      default:
        return { 
          title: 'หน้าหลัก', 
          subtitle: 'ระบบสารสนเทศสุขภาพ',
          icon: <Home className="w-5 h-5 md:w-6 md:h-6" />
        };
    }
  };

  const pageInfo = getPageInfo();

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sticky top-0 z-40 shadow-sm">
      <div className="flex items-center gap-2 md:gap-4 overflow-hidden flex-1 mr-2">
        <button 
          className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 md:hidden shrink-0"
          onClick={onMenuToggle}
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2 shrink-0">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="w-10 h-10 md:w-12 md:h-12 object-contain shrink-0 drop-shadow-sm" 
          />
          <div className="hidden lg:flex flex-col">
            <h1 className="text-sm md:text-lg font-bold text-blue-900 leading-tight">
              พิษณุโลก
            </h1>
            <span className="text-[10px] md:text-xs text-green-700 font-semibold">One Province One Hospital</span>
          </div>
        </div>

        <div className="h-8 w-px bg-gray-200 mx-1 md:mx-2 shrink-0"></div>

        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
            {pageInfo.icon}
          </div>
          <div className="flex flex-col justify-center overflow-hidden">
            <h2 className="font-bold text-blue-900 text-sm md:text-base leading-tight truncate">
              {pageInfo.title}
            </h2>
            <p className="text-[10px] text-gray-500 hidden md:block leading-tight truncate">
              {pageInfo.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        <div className="text-right hidden md:block">
          <span className="block text-sm font-medium text-gray-600">Guest User</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:bg-gray-50 p-1 rounded-full transition-colors">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
             <img src="https://picsum.photos/100/100" alt="User" className="w-full h-full object-cover" />
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </header>
  );
};