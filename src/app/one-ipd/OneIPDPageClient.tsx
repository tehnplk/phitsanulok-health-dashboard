"use client";

import React, { useState } from 'react';
import type { IPDData } from '@/lib/types';
import { BedDouble, Building2, ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { getOccupancyStatus } from '@/lib/utils';

interface OneIPDPageProps {
  data: IPDData[];
}

const IPDCard: React.FC<{ data: IPDData }> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // Total summary for hospital
  const totalBeds = data.wards.reduce((sum, w) => sum + w.totalBeds, 0);
  const usedBeds = data.wards.reduce((sum, w) => sum + w.usedBeds, 0);
  const totalPercentage = totalBeds > 0 ? (usedBeds / totalBeds) * 100 : 0;
  const summaryStatus = getOccupancyStatus(totalPercentage);

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
      {/* Header */}
      <div 
        className={`${summaryStatus.color.replace('500', '50').replace('400', '50')} px-4 py-4 border-b border-gray-100 flex items-center justify-between cursor-pointer group`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${summaryStatus.color} bg-opacity-10`}>
            <Building2 className={`w-5 h-5 ${summaryStatus.text}`} />
          </div>
          <div>
            <h3 className="text-gray-900 font-bold text-sm md:text-base">{data.name}</h3>
            <p className="text-[10px] md:text-xs text-gray-500 font-medium">รวม {usedBeds}/{totalBeds} เตียง ({totalPercentage.toFixed(1)}%)</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${summaryStatus.color} text-white`}>
            {summaryStatus.label}
          </span>
          {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
        </div>
      </div>

      {/* Ward List */}
      {isExpanded && (
        <div className="overflow-x-auto w-full flex-1">
          <table className="w-full text-[11px] md:text-sm text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4 font-bold">ชื่อวอร์ด</th>
                <th className="py-3 px-2 font-bold text-center">เตียง</th>
                <th className="py-3 px-2 font-bold text-center">ครองเตียง</th>
                <th className="py-3 px-2 font-bold text-center">ว่าง</th>
                <th className="py-3 px-4 font-bold text-right">สถานะ (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.wards.map((ward, index) => {
                const diff = ward.totalBeds - ward.usedBeds;
                const percentage = ward.totalBeds > 0 ? (ward.usedBeds / ward.totalBeds) * 100 : 0;
                const status = getOccupancyStatus(percentage);

                return (
                  <tr key={index} className="hover:bg-blue-50/30 transition-colors">
                    <td className="py-3 px-4 text-gray-700 font-medium flex items-center gap-2">
                      <BedDouble className="w-4 h-4 text-gray-300 shrink-0" />
                      <span className="truncate max-w-[120px] md:max-w-none">{ward.name}</span>
                    </td>
                    <td className="py-3 px-2 text-center text-gray-400">{ward.totalBeds}</td>
                    <td className="py-3 px-2 text-center text-gray-900 font-bold">{ward.usedBeds}</td>
                    <td className="py-3 px-2 text-center">
                      <span className={`inline-block w-8 py-0.5 rounded-full text-[10px] font-bold ${diff < 0 ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                        {diff}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col items-end gap-1">
                        <span className={`text-[10px] font-bold ${status.text}`}>
                          {percentage.toFixed(0)}%
                        </span>
                        <div className="w-full max-w-[60px] md:max-w-[80px] bg-gray-100 rounded-full h-1.5">
                          <div 
                            className={`h-full rounded-full ${status.color} transition-all duration-500`} 
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

const OneIPDPageClient: React.FC<OneIPDPageProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 pb-10">
      {data.map((hospital) => (
        <IPDCard key={hospital.id} data={hospital} />
      ))}
    </div>
  );
};

export default OneIPDPageClient;