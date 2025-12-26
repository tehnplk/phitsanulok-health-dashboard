import React, { useState } from 'react';
import { LRData } from '../types';
import { Bed, Activity, AlertCircle, ArchiveX, Baby, Building2, ChevronDown, ChevronUp, LucideIcon, Clock } from 'lucide-react';

interface OneLRPageProps {
  data: LRData[];
}

interface StatusRowProps {
  icon: LucideIcon;
  label: string;
  count: number;
  colorClass: string;
  bgClass?: string;
}

// Helper Component for Status Row
const StatusRow: React.FC<StatusRowProps> = ({ icon: Icon, label, count, colorClass, bgClass }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors px-1">
    <div className={`flex items-center gap-2 font-medium text-sm ${colorClass}`}>
      <Icon className={`w-4 h-4 ${colorClass}`} />
      <span>{label}</span>
    </div>
    {count > 0 && (
      <span className={`${bgClass || 'bg-gray-100'} text-white text-xs font-bold px-2.5 py-0.5 rounded-full min-w-[1.5rem] text-center shadow-sm`}>
        {count}
      </span>
    )}
  </div>
);

const LRCard: React.FC<{ data: LRData }> = ({ data }) => {
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow h-fit flex flex-col">
      {/* Card Header */}
      <div 
        className="p-4 border-b border-gray-100 flex items-center justify-between cursor-pointer bg-white group hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1 flex items-center gap-3">
          <div className="bg-blue-50 p-2 rounded-lg">
             <Building2 className="w-5 h-5 text-blue-500" />
          </div>
          <div>
             <h3 className="text-gray-800 font-bold text-sm md:text-base leading-tight group-hover:text-blue-700 transition-colors">
              {data.name}
            </h3>
            {!data.hasPatients && <p className="text-[10px] text-gray-400">ไม่มีเคสในขณะนี้</p>}
          </div>
        </div>
        <div className="text-gray-300 group-hover:text-gray-500 transition-colors">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </div>

      {/* Card Content */}
      {isExpanded && (
        <div className="p-4 pt-2 flex-1">
          {!data.hasPatients ? (
            <div className="mt-2 border border-dashed border-gray-200 bg-gray-50/50 rounded-lg p-6 flex flex-col items-center justify-center gap-2 text-gray-400 text-sm">
              <ArchiveX className="w-8 h-8 opacity-20" />
              <span className="font-light">ไม่มีข้อมูลผู้ป่วย</span>
            </div>
          ) : (
            <div className="space-y-1">
              <StatusRow 
                icon={Bed} 
                label="รอคลอด" 
                count={data.status.waiting} 
                colorClass="text-blue-600" 
                bgClass="bg-blue-500" 
              />
              <StatusRow 
                icon={Baby} 
                label="คลอดปกติ" 
                count={data.status.normal} 
                colorClass="text-emerald-600" 
                bgClass="bg-emerald-500" 
              />
              <StatusRow 
                icon={Activity} 
                label="คลอดผิดปกติ" 
                count={data.status.abnormal} 
                colorClass="text-orange-500" 
                bgClass="bg-orange-500" 
              />
              <StatusRow 
                icon={AlertCircle} 
                label="แท้ง" 
                count={data.status.miscarriage} 
                colorClass="text-rose-500" 
                bgClass="bg-rose-500" 
              />
               <StatusRow 
                icon={ArchiveX} 
                label="ไม่คลอด" 
                count={data.status.notDelivered} 
                colorClass="text-gray-500" 
                bgClass="bg-gray-500" 
              />
            </div>
          )}
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

export const OneLRPage: React.FC<OneLRPageProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-10">
      {data.map((hospital) => (
        <LRCard key={hospital.id} data={hospital} />
      ))}
    </div>
  );
};