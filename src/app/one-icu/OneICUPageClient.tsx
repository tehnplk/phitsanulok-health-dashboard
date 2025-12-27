"use client";

import React, { useState } from 'react';
import type { ICUData } from '@/lib/types';
import { HeartPulse, ChevronDown, ChevronUp, BedDouble, Clock } from 'lucide-react';
import { getOccupancyStatus } from '@/lib/utils';

interface OneICUPageProps {
  data: ICUData[];
}

const ICUCard: React.FC<{ data: ICUData }> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // Create a stable timestamp for the prototype
  const timestamp = new Date().toLocaleDateString('th-TH', { 
    day: 'numeric', 
    month: 'short', 
    year: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-fit transition-all hover:shadow-md">
      {/* Header - Crimson/Rose for Critical Care */}
      <div 
        className="bg-rose-50 px-4 py-4 border-b border-rose-100 flex items-center justify-between cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-rose-500 bg-opacity-10">
            <HeartPulse className="w-5 h-5 text-rose-600 shrink-0" />
          </div>
          <div>
            <h3 className="text-rose-900 font-bold text-sm md:text-base truncate">{data.name}</h3>
            <p className="text-[10px] text-rose-500 font-medium">Critical Care Units</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1">
             {data.wards.some(w => (w.usedBeds/w.totalBeds) >= 1) && (
               <span className="px-2 py-0.5 rounded bg-red-500 text-white text-[9px] font-bold animate-pulse">CRITICAL</span>
             )}
          </div>
          {isExpanded ? <ChevronUp className="w-5 h-5 text-rose-400" /> : <ChevronDown className="w-5 h-5 text-rose-400" />}
        </div>
      </div>

      {/* Table */}
      {isExpanded && (
        <div className="overflow-x-auto w-full flex-1">
          <table className="w-full text-[11px] md:text-sm text-left">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4 font-bold">ICU Ward</th>
                <th className="py-3 px-2 font-bold text-center">เตียง</th>
                <th className="py-3 px-2 font-bold text-center">ครองเตียง</th>
                <th className="py-3 px-2 font-bold text-center">ว่าง</th>
                <th className="py-3 px-4 font-bold text-right">ร้อยละ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.wards.map((ward, index) => {
                const diff = ward.totalBeds - ward.usedBeds;
                const percentage = ward.totalBeds > 0 ? (ward.usedBeds / ward.totalBeds) * 100 : 0;
                const status = getOccupancyStatus(percentage);

                return (
                  <tr key={index} className="hover:bg-rose-50/30 transition-colors">
                    <td className="py-3 px-4 text-gray-700 font-medium flex items-center gap-2">
                      <BedDouble className="w-4 h-4 text-rose-300 shrink-0" />
                      <span className="truncate">{ward.name}</span>
                    </td>
                    <td className="py-3 px-2 text-center text-gray-400 font-medium">{ward.totalBeds}</td>
                    <td className="py-3 px-2 text-center text-gray-900 font-black">{ward.usedBeds}</td>
                    <td className="py-3 px-2 text-center">
                      <span className={`inline-flex items-center justify-center min-w-[2.5rem] py-0.5 rounded-full text-[10px] font-black text-white ${diff <= 0 ? 'bg-red-500' : 'bg-emerald-500'}`}>
                        {diff}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col items-end gap-1">
                        <span className={`text-[10px] font-bold ${status.text}`}>
                          {percentage.toFixed(1)}%
                        </span>
                        <div className="w-full max-w-[60px] md:max-w-[80px] bg-gray-100 rounded-full h-1.5">
                          <div 
                            className={`h-full rounded-full ${status.color} transition-all duration-300`} 
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer */}
      <div className="bg-gray-50 px-3 py-2 border-t border-gray-100 flex justify-end items-center mt-auto">
        <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium">
          <Clock className="w-3 h-3" />
          <span>Last sync: {timestamp} น.</span>
        </div>
      </div>
    </div>
  );
};

const OneICUPageClient: React.FC<OneICUPageProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 pb-10">
      {data.map((hospital) => (
        <ICUCard key={hospital.id} data={hospital} />
      ))}
    </div>
  );
};

export default OneICUPageClient;