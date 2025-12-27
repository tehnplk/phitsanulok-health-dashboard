"use client";

import React from 'react';
import type { WaitingData } from '@/lib/types';
import { HospitalSizeLevel } from '@/lib/types';
import { Building2 } from 'lucide-react';

interface WaitingPageProps {
  data: WaitingData[];
}

const ThresholdBadge: React.FC<{ label: string; color: string }> = ({ label, color }) => (
  <span className={`${color} text-white text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded shadow-sm mx-0.5 md:mx-1 shrink-0`}>
    {label}
  </span>
);

const WaitingPageClient: React.FC<WaitingPageProps> = ({ data }) => {
  
  const getStatusColor = (level: HospitalSizeLevel, minutes: number) => {
    let redThreshold, orangeThreshold;

    // S, A Level (Regional/Center)
    if (level === HospitalSizeLevel.S || level === HospitalSizeLevel.A) {
      redThreshold = 180;
      orangeThreshold = 120;
    } 
    // M1, M2, F1 (General/Large Community)
    else if (level === HospitalSizeLevel.M1 || level === HospitalSizeLevel.M2 || level === HospitalSizeLevel.F1) {
       redThreshold = 120;
       orangeThreshold = 90;
    } 
    // F2, F3, P (Medium/Small Community)
    else {
       redThreshold = 90;
       orangeThreshold = 60;
    }

    if (minutes > redThreshold) return 'bg-[#FF3B30]';
    if (minutes > orangeThreshold) return 'bg-[#FF9500]';
    return 'bg-[#34C759]';
  };

  const dates = data[0]?.data || [];

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {/* Legend */}
        <div className="p-4 md:p-6 bg-gray-50 border-b border-gray-100 space-y-3">
           <div className="flex flex-wrap items-center gap-y-2 text-[11px] md:text-sm text-gray-700">
             <div className="w-2 h-2 rounded-full bg-blue-700 mr-2 shrink-0"></div>
             <span className="font-bold mr-1 shrink-0">ทั่วไป (S, A):</span>
             <span className="mr-2">≤ 120 นาที | </span>
             <div className="flex items-center">
               <ThresholdBadge label="> 180" color="bg-[#FF3B30]" />
               <ThresholdBadge label="> 120" color="bg-[#FF9500]" />
               <ThresholdBadge label="≤ 120" color="bg-[#34C759]" />
             </div>
           </div>
           
           <div className="flex flex-wrap items-center gap-y-2 text-[11px] md:text-sm text-gray-700">
             <div className="w-2 h-2 rounded-full bg-green-600 mr-2 shrink-0"></div>
             <span className="font-bold mr-1 shrink-0">ชุมชน (M, F1):</span>
             <span className="mr-2">≤ 90 นาที | </span>
             <div className="flex items-center">
               <ThresholdBadge label="> 120" color="bg-[#FF3B30]" />
               <ThresholdBadge label="> 90" color="bg-[#FF9500]" />
               <ThresholdBadge label="≤ 90" color="bg-[#34C759]" />
             </div>
           </div>

            <div className="flex flex-wrap items-center gap-y-2 text-[11px] md:text-sm text-gray-700">
             <div className="w-2 h-2 rounded-full bg-gray-600 mr-2 shrink-0"></div>
             <span className="font-bold mr-1 shrink-0">ชุมชนขนาดเล็ก (F2, F3):</span>
             <span className="mr-2">≤ 60 นาที | </span>
             <div className="flex items-center">
               <ThresholdBadge label="> 90" color="bg-[#FF3B30]" />
               <ThresholdBadge label="> 60" color="bg-[#FF9500]" />
               <ThresholdBadge label="≤ 60" color="bg-[#34C759]" />
             </div>
           </div>
        </div>

        {/* Scrollable Table Wrapper */}
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr className="bg-white">
                <th className="sticky left-0 z-10 bg-white text-left py-4 px-4 font-semibold text-gray-600 border-b border-gray-100 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                  รายชื่อ รพ.
                </th>
                {dates.map((d, i) => (
                  <th key={i} className="px-2 pb-4 pt-4 border-b border-gray-100">
                    <div className="bg-blue-600 text-white py-1.5 px-2 rounded-md text-center min-w-[90px] shadow-sm">
                      <div className="text-[10px] md:text-xs opacity-90">{d.dayName}</div>
                      <div className="text-xs md:text-sm font-bold">{d.date}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.map((hospital) => (
                <tr key={hospital.id} className="group hover:bg-gray-50 transition-colors">
                  <td className="sticky left-0 z-10 bg-white group-hover:bg-gray-50 py-4 px-4 border-r border-gray-50 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="text-gray-700 font-medium text-xs md:text-sm whitespace-nowrap">{hospital.name}</span>
                    </div>
                  </td>
                  {hospital.data.map((day, index) => (
                    <td key={index} className="px-2 py-3 text-center">
                      <span className={`inline-block min-w-[70px] md:min-w-[85px] py-1.5 rounded-md text-white text-[10px] md:text-xs font-bold shadow-sm ${getStatusColor(hospital.sizeLevel, day.minutes)}`}>
                        {day.minutes} นาที
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WaitingPageClient;