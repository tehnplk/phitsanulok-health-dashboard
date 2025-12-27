"use client";

import React from 'react';
import type { VisitData } from '@/lib/types';
import { Building2 } from 'lucide-react';

interface VisitPageProps {
  data: VisitData[];
}

const VisitPageClient: React.FC<VisitPageProps> = ({ data }) => {
  const dates = data[0]?.data || [];

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {/* Header/Legend area can go here if needed */}
        <div className="p-4 bg-blue-50 border-b border-blue-100">
           <span className="text-blue-800 font-bold text-sm">ตารางแสดงจำนวนผู้ป่วยนอก (Visit) รายวัน</span>
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
                      <span className="inline-block min-w-[70px] md:min-w-[85px] py-1.5 rounded-md text-blue-700 bg-blue-50 text-[10px] md:text-xs font-bold shadow-sm border border-blue-100">
                        {day.count.toLocaleString()} คน
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

export default VisitPageClient;