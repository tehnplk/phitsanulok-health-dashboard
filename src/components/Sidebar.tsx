"use client";

import React, { useState } from 'react';
import Link from 'next/link';
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
  X,
} from 'lucide-react';

interface SidebarProps {
  pathname: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ pathname, isOpen, onClose }) => {
  const [isPhitsanulokExpanded, setIsPhitsanulokExpanded] = useState(true);
  const [isOPDExpanded, setIsOPDExpanded] = useState(true);
  const [isWaitingSubMenuExpanded, setIsWaitingSubMenuExpanded] = useState(true);

  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname.startsWith(href);

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
                <Link href="/hospital" onClick={onClose} className={`${
                  isActive('/hospital')
                    ? 'text-blue-600 bg-blue-50 border-blue-500'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                } flex items-center gap-3 px-3 py-3 md:py-2 rounded cursor-pointer border-l-4 transition-colors`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="text-sm font-medium">Hospital</span>
                </Link>
                
                <Link href="/one-icu" onClick={onClose} className={`${
                  isActive('/one-icu')
                    ? 'text-blue-600 bg-blue-50 border-blue-500'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                } flex items-center gap-3 px-3 py-3 md:py-2 rounded cursor-pointer border-l-4 transition-colors`}
                >
                  <HeartPulse className="w-4 h-4" />
                  <span className="text-sm font-medium">One ICU</span>
                </Link>

                <Link href="/one-or" onClick={onClose} className={`${
                  isActive('/one-or')
                    ? 'text-blue-600 bg-blue-50 border-blue-500'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                } flex items-center gap-3 px-3 py-3 md:py-2 rounded cursor-pointer border-l-4 transition-colors`}
                >
                  <Activity className="w-4 h-4" />
                  <span className="text-sm font-medium">One OR</span>
                </Link>

                <Link href="/one-lr" onClick={onClose} className={`${
                  isActive('/one-lr')
                    ? 'text-blue-600 bg-blue-50 border-blue-500'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                } flex items-center gap-3 px-3 py-3 md:py-2 rounded cursor-pointer border-l-4 transition-colors`}
                >
                  <Stethoscope className="w-4 h-4" />
                  <span className="text-sm font-medium">One LR</span>
                </Link>

                <Link href="/one-ipd" onClick={onClose} className={`${
                  isActive('/one-ipd')
                    ? 'text-blue-600 bg-blue-50 border-blue-500'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                } flex items-center gap-3 px-3 py-3 md:py-2 rounded cursor-pointer border-l-4 transition-colors`}
                >
                  <BedDouble className="w-4 h-4" />
                  <span className="text-sm font-medium">One IPD</span>
                </Link>
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
                <Link
                  href="/opd-visit"
                  onClick={onClose}
                  className={`${
                    isActive('/opd-visit')
                      ? 'text-blue-600 bg-blue-50 border-blue-500'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  } flex items-center gap-3 px-3 py-3 md:py-2 rounded cursor-pointer border-l-4 transition-colors`}
                >
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-medium">จำนวนผู้ป่วย (Visit)</span>
                </Link>

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
                      <Link
                        href="/waiting/daily"
                        className={`${
                          isActive('/waiting/daily', true)
                            ? 'text-blue-600 bg-blue-50 border-blue-500'
                            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                        } flex items-center gap-3 px-3 py-3 md:py-2 rounded cursor-pointer border-l-4 transition-colors`}
                        onClick={onClose}
                      >
                        <CalendarClock className="w-4 h-4" />
                        <span className="text-sm font-medium">รายวัน</span>
                      </Link>
                      
                      <Link
                        href="/waiting/weekly"
                        className={`${
                          isActive('/waiting/weekly', true)
                            ? 'text-blue-600 bg-blue-50 border-blue-500'
                            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                        } flex items-center gap-3 px-3 py-3 md:py-2 rounded cursor-pointer border-l-4 transition-colors`}
                        onClick={onClose}
                      >
                        <CalendarDays className="w-4 h-4" />
                        <span className="text-sm font-medium">รายสัปดาห์</span>
                      </Link>

                       <Link
                        href="/waiting/monthly"
                        className={`${
                          isActive('/waiting/monthly', true)
                            ? 'text-blue-600 bg-blue-50 border-blue-500'
                            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                        } flex items-center gap-3 px-3 py-3 md:py-2 rounded cursor-pointer border-l-4 transition-colors`}
                        onClick={onClose}
                      >
                        <CalendarRange className="w-4 h-4" />
                        <span className="text-sm font-medium">รายเดือน</span>
                      </Link>
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