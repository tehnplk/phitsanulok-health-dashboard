import React, { useState } from 'react';
import { ORData } from '../types';
import { Activity, Clock, AlertTriangle, CheckCircle2, Building2, ChevronDown, ChevronUp } from 'lucide-react';

interface OneORPageProps {
  data: ORData[];
}

const ORCard: React.FC<{ data: ORData }> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const occupancy = (data.activeSurgeries / data.totalRooms) * 100;
  
  // Create a stable timestamp for the prototype
  const timestamp = new Date().toLocaleDateString('th-TH', { 
    day: 'numeric', 
    month: 'short', 
    year: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow h-fit flex flex-col">
      {/* Header */}
      <div 
        className="bg-indigo-50 px-4 py-3 border-b border-indigo-100 flex items-center justify-between cursor-pointer hover:bg-indigo-100/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-indigo-600" />
          <h3 className="text-indigo-900 font-bold text-lg">{data.name}</h3>
        </div>
        <div className="flex items-center gap-3">
          <div className={`px-2 py-0.5 rounded-full text-xs font-bold ${data.availableRooms > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {data.availableRooms > 0 ? 'Available' : 'Full'}
          </div>
          <div className="text-indigo-600">
             {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 flex-1">
          {/* Main Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-indigo-50/50 p-3 rounded-lg border border-indigo-100">
              <span className="text-xs text-indigo-600 font-semibold uppercase block mb-1">Active Surgeries</span>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-indigo-900">{data.activeSurgeries}</span>
                <div className="flex items-center gap-1 text-indigo-500 mb-1">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                  <span className="text-xs font-medium">In Progress</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
              <span className="text-xs text-gray-500 font-semibold uppercase block mb-1">Total Rooms</span>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-gray-800">{data.totalRooms}</span>
                <span className="text-xs text-gray-400 mb-1">Suites</span>
              </div>
            </div>
          </div>

          {/* Breakdown List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>Scheduled Today</span>
              </div>
              <span className="font-bold text-gray-800">{data.scheduledToday}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span>Emergency Cases</span>
              </div>
              <span className="font-bold text-red-600">{data.emergencyCases}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Available Rooms</span>
              </div>
              <span className={`font-bold ${data.availableRooms > 0 ? 'text-emerald-600' : 'text-gray-400'}`}>
                {data.availableRooms}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-500 uppercase">Room Utilization</span>
              <span className="text-xs font-bold text-indigo-600">{occupancy.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${occupancy > 90 ? 'bg-red-500' : 'bg-indigo-500'}`}
                style={{ width: `${Math.min(occupancy, 100)}%` }}
              ></div>
            </div>
          </div>
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

export const OneORPage: React.FC<OneORPageProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {data.map((orData) => (
        <ORCard key={orData.id} data={orData} />
      ))}
    </div>
  );
};