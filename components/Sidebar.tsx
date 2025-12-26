import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Stethoscope, 
  BedDouble, 
  Clock, 
  ChevronDown, 
  Home,
  CalendarClock,
  CalendarDays,
  CalendarRange,
  Activity,
  HeartPulse,
  Users,
  X
} from 'lucide-react';
import { ViewType } from '../types';

interface SidebarProps {
  activeView: ViewType;
  onMenuClick: (view: ViewType) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onMenuClick, isOpen, onClose }) => {
  const [isPhitsanulokExpanded, setIsPhitsanulokExpanded] = useState(true);
  const [isOPDExpanded, setIsOPDExpanded] = useState(true);
  const [isWaitingSubMenuExpanded, setIsWaitingSubMenuExpanded] = useState(true);

  const isActive = (view: ViewType) => activeView === view || activeView.startsWith(view + '-');

  const getMenuItemClass = (view: ViewType, exact = false) => {
    const isItemActive = exact ? activeView === view : isActive(view);
    return isItemActive
      ? "flex items-center gap-3 px-3 py-3 md:py-2 text-blue-600 bg-blue-50 rounded cursor-pointer border-l-4 border-blue-500 transition-colors"
      : "flex items-center gap-3 px-3 py-3 md:py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded cursor-pointer border-l-4 border-transparent transition-colors";
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out transform
        md:relative md:translate-x-0 md:w-64 md:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between p-4 md:hidden border-b">
          <span className="font-bold text-blue-900">เมนูการใช้งาน</span>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-full pb-20 md:pb-4">
          <h3 className="text-blue-700 font-bold text-xs mb-4 tracking-wider uppercase">MENU</h3>
          
          {/* Main Group */}
          <div className="mb-4">
            <div 
              className="flex items-center justify-between px-2 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer group"
              onClick={() => setIsPhitsanulokExpanded(!isPhitsanulokExpanded)}
            >
              <div className="flex items-center gap-2 font-bold">
                <Home className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                <span className="text-sm">One Phitsanulok</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${isPhitsanulokExpanded ? '' : '-rotate-90'}`} />
            </div>

            {isPhitsanulokExpanded && (
              <div className="mt-1 ml-4 border-l border-gray-100 pl-2 space-y-1">
                <div 
                  className={getMenuItemClass('hospital')}
                  onClick={() => onMenuClick('hospital')}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="text-sm font-medium">Hospital</span>
                </div>
                
                <div 
                  className={getMenuItemClass('oneicu')}
                  onClick={() => onMenuClick('oneicu')}
                >
                  <HeartPulse className="w-4 h-4" />
                  <span className="text-sm font-medium">One ICU</span>
                </div>

                <div 
                  className={getMenuItemClass('oneor')}
                  onClick={() => onMenuClick('oneor')}
                >
                  <Activity className="w-4 h-4" />
                  <span className="text-sm font-medium">One OR</span>
                </div>

                <div 
                  className={getMenuItemClass('onelr')}
                  onClick={() => onMenuClick('onelr')}
                >
                  <Stethoscope className="w-4 h-4" />
                  <span className="text-sm font-medium">One LR</span>
                </div>

                <div 
                  className={getMenuItemClass('oneipd')}
                  onClick={() => onMenuClick('oneipd')}
                >
                  <BedDouble className="w-4 h-4" />
                  <span className="text-sm font-medium">One IPD</span>
                </div>
              </div>
            )}
          </div>

          {/* OPD Group */}
          <div className="mb-2">
             <div 
              className="flex items-center justify-between px-2 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer group"
              onClick={() => setIsOPDExpanded(!isOPDExpanded)}
            >
              <div className="flex items-center gap-2 font-bold">
                <Clock className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                <span className="text-sm">OPD</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${isOPDExpanded ? '' : '-rotate-90'}`} />
            </div>
            
            {isOPDExpanded && (
               <div className="mt-1 ml-4 border-l border-gray-100 pl-2 space-y-1">
                {/* Visits */}
                <div 
                  className={getMenuItemClass('opd-visit')}
                  onClick={() => onMenuClick('opd-visit')}
                >
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-medium">จำนวนผู้ป่วย (Visit)</span>
                </div>

                {/* Waiting Time Submenu */}
                <div className="pt-1">
                   <div 
                    className="flex items-center justify-between px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded cursor-pointer group"
                    onClick={() => setIsWaitingSubMenuExpanded(!isWaitingSubMenuExpanded)}
                  >
                     <div className="flex items-center gap-3">
                       <Clock className="w-4 h-4" />
                       <span className="text-sm font-medium">ระยะเวลารอคอย</span>
                     </div>
                     <ChevronDown className={`w-3 h-3 transition-transform ${isWaitingSubMenuExpanded ? '' : '-rotate-90'}`} />
                  </div>

                  {isWaitingSubMenuExpanded && (
                    <div className="mt-1 ml-4 border-l border-gray-100 pl-2 space-y-1">
                      <div 
                        className={getMenuItemClass('waiting-daily', true)}
                        onClick={() => onMenuClick('waiting-daily')}
                      >
                        <CalendarClock className="w-4 h-4" />
                        <span className="text-sm font-medium">รายวัน</span>
                      </div>
                      
                      <div 
                        className={getMenuItemClass('waiting-weekly', true)}
                        onClick={() => onMenuClick('waiting-weekly')}
                      >
                        <CalendarDays className="w-4 h-4" />
                        <span className="text-sm font-medium">รายสัปดาห์</span>
                      </div>

                       <div 
                        className={getMenuItemClass('waiting-monthly', true)}
                        onClick={() => onMenuClick('waiting-monthly')}
                      >
                        <CalendarRange className="w-4 h-4" />
                        <span className="text-sm font-medium">รายเดือน</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};