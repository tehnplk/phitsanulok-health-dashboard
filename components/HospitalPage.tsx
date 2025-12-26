import React, { useState, useEffect, useRef } from 'react';
import { HospitalMaster, HospitalSapLevel, HospitalSizeLevel } from '../types';
import { Layers, Ruler, Map as MapIcon, ExternalLink, MapPin, Navigation } from 'lucide-react';
import L from 'leaflet';

interface HospitalPageProps {
  data: HospitalMaster[];
}

type TabType = 'SAP' | 'SIZE' | 'MAP';

interface LevelConfig {
  gradient: string;
  border: string;
  text: string;
  tagText: string;
}

// Configuration for SAP Level visualization (Monochromatic Indigo: Dark -> Light)
const SAP_LEVEL_CONFIG: Record<HospitalSapLevel, LevelConfig> = {
  [HospitalSapLevel.P_PLUS]: { 
    gradient: 'bg-gradient-to-r from-indigo-950 to-indigo-900', 
    border: 'border-indigo-950',
    text: 'text-white',
    tagText: 'text-indigo-900'
  },
  [HospitalSapLevel.P]: { 
    gradient: 'bg-gradient-to-r from-indigo-900 to-indigo-800', 
    border: 'border-indigo-900',
    text: 'text-white',
    tagText: 'text-indigo-900'
  },
  [HospitalSapLevel.A_PLUS]: { 
    gradient: 'bg-gradient-to-r from-indigo-800 to-indigo-700', 
    border: 'border-indigo-800',
    text: 'text-white',
    tagText: 'text-indigo-800'
  },
  [HospitalSapLevel.A]: { 
    gradient: 'bg-gradient-to-r from-indigo-700 to-indigo-600', 
    border: 'border-indigo-700',
    text: 'text-white',
    tagText: 'text-indigo-700'
  },
  [HospitalSapLevel.S_PLUS]: { 
    gradient: 'bg-gradient-to-r from-indigo-600 to-indigo-500', 
    border: 'border-indigo-600',
    text: 'text-white',
    tagText: 'text-indigo-600'
  },
  [HospitalSapLevel.S]: { 
    gradient: 'bg-gradient-to-r from-indigo-500 to-indigo-400', 
    border: 'border-indigo-500',
    text: 'text-white',
    tagText: 'text-indigo-500'
  }
};

// Configuration for SIZE Level visualization (Monochromatic Purple: Dark -> Light)
const SIZE_LEVEL_CONFIG: Record<HospitalSizeLevel, LevelConfig> = {
  [HospitalSizeLevel.A]: { 
    gradient: 'bg-gradient-to-r from-purple-950 to-purple-900', 
    border: 'border-purple-950',
    text: 'text-white',
    tagText: 'text-purple-900'
  },
  [HospitalSizeLevel.S]: { 
    gradient: 'bg-gradient-to-r from-purple-900 to-purple-800', 
    border: 'border-purple-900',
    text: 'text-white',
    tagText: 'text-purple-900'
  },
  [HospitalSizeLevel.M1]: { 
    gradient: 'bg-gradient-to-r from-purple-800 to-purple-700', 
    border: 'border-purple-800',
    text: 'text-white',
    tagText: 'text-purple-800'
  },
  [HospitalSizeLevel.M2]: { 
    gradient: 'bg-gradient-to-r from-purple-700 to-purple-600', 
    border: 'border-purple-700',
    text: 'text-white',
    tagText: 'text-purple-700'
  },
  [HospitalSizeLevel.F1]: { 
    gradient: 'bg-gradient-to-r from-purple-600 to-purple-500', 
    border: 'border-purple-600',
    text: 'text-white',
    tagText: 'text-purple-600'
  },
  [HospitalSizeLevel.F2]: { 
    gradient: 'bg-gradient-to-r from-purple-500 to-purple-400', 
    border: 'border-purple-500',
    text: 'text-white',
    tagText: 'text-purple-500'
  },
  [HospitalSizeLevel.F3]: { 
    gradient: 'bg-gradient-to-r from-purple-400 to-purple-300', 
    border: 'border-purple-400',
    text: 'text-white',
    tagText: 'text-purple-400'
  },
  [HospitalSizeLevel.P]: { 
    gradient: 'bg-gradient-to-r from-gray-600 to-gray-500', 
    border: 'border-gray-600',
    text: 'text-white',
    tagText: 'text-gray-600'
  }
};

export const HospitalPage: React.FC<HospitalPageProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<TabType>('SAP');
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Define Sort Orders (High to Low)
  const sapOrder = [
    HospitalSapLevel.P_PLUS,
    HospitalSapLevel.P,
    HospitalSapLevel.A_PLUS,
    HospitalSapLevel.A,
    HospitalSapLevel.S_PLUS,
    HospitalSapLevel.S,
  ];

  const sizeOrder = [
    HospitalSizeLevel.A,
    HospitalSizeLevel.S,
    HospitalSizeLevel.M1,
    HospitalSizeLevel.M2,
    HospitalSizeLevel.F1,
    HospitalSizeLevel.F2,
    HospitalSizeLevel.F3,
    HospitalSizeLevel.P,
  ];

  // Initialize Map
  useEffect(() => {
    if (activeTab === 'MAP' && mapContainerRef.current && !mapInstanceRef.current) {
        // Center on Phitsanulok approximate center
        const map = L.map(mapContainerRef.current).setView([16.95, 100.5], 9);

        // Base Layers
        const streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });

        const satelliteMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        });

        // Add default layer
        streetMap.addTo(map);

        // Add Layer Control
        L.control.layers({
          "แผนที่ทั่วไป": streetMap,
          "ภาพดาวเทียม": satelliteMap
        }).addTo(map);

        // Custom Red Cross Icon
        const hospitalIcon = L.divIcon({
            className: 'bg-transparent border-none',
            html: `
              <div style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3)); display: flex; justify-content: center; align-items: center;">
                 <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <!-- White Pin Body -->
                    <path d="M20 0C8.954 0 0 8.954 0 20C0 35 20 40 20 40C20 40 40 35 40 20C40 8.954 31.046 0 20 0Z" fill="white"/>
                    <!-- Red Stroke (Optional, makes it pop) -->
                    <path d="M20 0.5C9.23 0.5 0.5 9.23 0.5 20C0.5 34.5 19.5 39.5 20 39.5C20.5 39.5 39.5 34.5 39.5 20C39.5 9.23 30.77 0.5 20 0.5Z" stroke="#DC2626" stroke-width="1" stroke-opacity="0.2"/>
                    <!-- Red Cross -->
                    <rect x="17" y="8" width="6" height="24" rx="1" fill="#DC2626"/>
                    <rect x="8" y="17" width="24" height="6" rx="1" fill="#DC2626"/>
                 </svg>
              </div>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -42]
        });

        // Add Markers
        data.forEach(h => {
            if (h.lat && h.lng) {
                L.marker([h.lat, h.lng], { icon: hospitalIcon })
                 .addTo(map)
                 .bindPopup(`
                    <div class="font-sans">
                        <h3 class="font-bold text-sm text-gray-800 border-b border-gray-100 pb-1 mb-1">${h.name}</h3>
                        <p class="text-xs text-gray-500 m-0">Code: ${h.code}</p>
                        <div class="mt-2 flex gap-1">
                          <span class="text-[10px] bg-indigo-50 text-indigo-700 px-1 py-0.5 rounded font-bold border border-indigo-100">SAP ${h.sapLevel}</span>
                          <span class="text-[10px] bg-purple-50 text-purple-700 px-1 py-0.5 rounded font-bold border border-purple-100">SIZE ${h.sizeLevel}</span>
                        </div>
                    </div>
                 `);
            }
        });

        mapInstanceRef.current = map;
    }

    // Cleanup function
    return () => {
        if (activeTab !== 'MAP' && mapInstanceRef.current) {
            mapInstanceRef.current.remove();
            mapInstanceRef.current = null;
        }
    };
  }, [activeTab, data]);

  const handleFocusHospital = (lat?: number, lng?: number) => {
    if (mapInstanceRef.current && lat && lng) {
        mapInstanceRef.current.flyTo([lat, lng], 13, {
            duration: 1.5
        });
    }
  };

  const renderContent = () => {
    if (activeTab === 'MAP') {
        return (
            <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-200px)] min-h-[500px]">
                {/* Leaflet Map Container - Moved to Left */}
                <div className="w-full lg:w-3/4 bg-gray-100 rounded-xl overflow-hidden shadow-sm border border-gray-100 relative group z-0">
                    <div ref={mapContainerRef} className="w-full h-full z-0" style={{ minHeight: '400px' }} />
                </div>

                {/* List View - Moved to Right */}
                <div className="w-full lg:w-1/4 bg-white rounded-xl shadow-sm border border-gray-100 overflow-y-auto flex flex-col">
                    <div className="divide-y divide-gray-50 overflow-y-auto">
                        {data.map(h => (
                            <div 
                                key={h.id} 
                                className="p-3 hover:bg-emerald-50/30 transition-colors cursor-pointer group"
                                onClick={() => handleFocusHospital(h.lat, h.lng)}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-bold text-gray-800 text-sm group-hover:text-emerald-700 truncate">{h.name}</h4>
                                    <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded border border-gray-200 ml-2 shrink-0">{h.code}</span>
                                </div>
                                
                                <div className="flex flex-wrap items-center justify-between gap-y-2 mt-2">
                                    <div className="flex gap-1 text-[9px] md:text-[10px]">
                                        <span className="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded font-medium border border-indigo-100 whitespace-nowrap">SAP: {h.sapLevel}</span>
                                        <span className="bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded font-medium border border-purple-100 whitespace-nowrap">SIZE: {h.sizeLevel}</span>
                                    </div>
                                    <a 
                                        href={`https://www.google.com/maps/dir/?api=1&destination=${h.lat},${h.lng}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 hover:border-emerald-500 hover:text-emerald-600 text-gray-600 text-[10px] rounded-md shadow-sm transition-all"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                     >
                                        <Navigation className="w-3 h-3" />
                                        <span>นำทาง</span>
                                     </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    if (activeTab === 'SAP') {
      return (
        <div className="space-y-4">
          {sapOrder.map((level) => {
            const hospitals = data.filter(h => h.sapLevel === level);
            if (hospitals.length === 0) return null; // Skip empty levels

            const config = SAP_LEVEL_CONFIG[level];
            
            return (
              <div key={level} className="flex flex-col md:flex-row gap-2 md:gap-4 min-h-[90px]">
                {/* Left Column: Summary Card */}
                <div className={`${config.gradient} ${config.text} w-full md:w-64 rounded-xl shadow-md flex items-center px-6 py-4 shrink-0 relative overflow-hidden`}>
                   <div className="z-10 relative w-full flex justify-between md:block items-center">
                    <div className="text-[10px] md:text-xs font-bold opacity-70 uppercase tracking-wider mb-0 md:mb-1">SAP Level</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl md:text-4xl font-black tracking-tight">{level}</span>
                      <span className="text-xs md:text-sm opacity-90 font-medium">({hospitals.length} แห่ง)</span>
                    </div>
                  </div>
                  {/* Decorative Circle */}
                  <div className="absolute -right-6 -bottom-10 w-32 h-32 rounded-full bg-white opacity-10 blur-xl"></div>
                  <div className="absolute -left-6 -top-10 w-24 h-24 rounded-full bg-black opacity-5 blur-xl"></div>
                </div>

                {/* Right Column: Hospital List */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 content-center">
                  {hospitals.map((hosp) => (
                    <div key={hosp.id} className={`bg-white ${config.border} border-l-[6px] px-4 py-3 rounded-lg shadow-sm border-y border-r border-gray-100 flex justify-between items-center transition-all hover:shadow-md hover:-translate-y-0.5 group`}>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm md:text-base text-gray-800 group-hover:text-indigo-700 transition-colors">{hosp.name}</span>
                        <span className="text-[10px] text-gray-400 font-light">CODE: {hosp.code}</span>
                      </div>
                      <div className={`bg-gray-50 ${config.tagText} px-2.5 py-1 rounded text-[11px] font-bold border border-gray-100 shadow-sm`}>
                        SIZE: {hosp.sizeLevel}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="space-y-4">
          {sizeOrder.map((level) => {
            const hospitals = data.filter(h => h.sizeLevel === level);
             if (hospitals.length === 0) return null; 

            const config = SIZE_LEVEL_CONFIG[level];
            
            return (
               <div key={level} className="flex flex-col md:flex-row gap-2 md:gap-4 min-h-[90px]">
                {/* Left Column: Summary Card */}
                <div className={`${config.gradient} ${config.text} w-full md:w-64 rounded-xl shadow-md flex items-center px-6 py-4 shrink-0 relative overflow-hidden`}>
                   <div className="z-10 relative w-full flex justify-between md:block items-center">
                    <div className="text-[10px] md:text-xs font-bold opacity-70 uppercase tracking-wider mb-0 md:mb-1">Size Level</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl md:text-4xl font-black tracking-tight">{level}</span>
                      <span className="text-xs md:text-sm opacity-90 font-medium">({hospitals.length} แห่ง)</span>
                    </div>
                  </div>
                  {/* Decorative Circle */}
                  <div className="absolute -right-6 -bottom-10 w-32 h-32 rounded-full bg-white opacity-10 blur-xl"></div>
                   <div className="absolute -left-6 -top-10 w-24 h-24 rounded-full bg-black opacity-5 blur-xl"></div>
                </div>

                {/* Right Column: Hospital List */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 content-center">
                  {hospitals.map((hosp) => (
                    <div key={hosp.id} className={`bg-white ${config.border} border-l-[6px] px-4 py-3 rounded-lg shadow-sm border-y border-r border-gray-100 flex justify-between items-center transition-all hover:shadow-md hover:-translate-y-0.5 group`}>
                       <div className="flex flex-col">
                        <span className="font-bold text-sm md:text-base text-gray-800 group-hover:text-purple-700 transition-colors">{hosp.name}</span>
                        <span className="text-[10px] text-gray-400 font-light">CODE: {hosp.code}</span>
                      </div>
                      <div className={`bg-gray-50 ${config.tagText} px-2.5 py-1 rounded text-[11px] font-bold border border-gray-100 shadow-sm`}>
                        SAP: {hosp.sapLevel}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          {activeTab === 'SAP' && (
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Layers className="w-6 h-6 text-indigo-600" />
            </div>
          )}
          {activeTab === 'SIZE' && (
             <div className="p-2 bg-purple-50 rounded-lg">
              <Ruler className="w-6 h-6 text-purple-600" />
            </div>
          )}
          {activeTab === 'MAP' && (
             <div className="p-2 bg-emerald-50 rounded-lg">
              <MapIcon className="w-6 h-6 text-emerald-600" />
            </div>
          )}
          <span>
            {activeTab === 'MAP' ? 'แผนที่และที่ตั้ง' : <>จำนวนโรงพยาบาลแบ่งตามระดับ <span className={activeTab === 'SAP' ? 'text-indigo-600' : 'text-purple-600'}>{activeTab}</span></>}
          </span>
        </h2>
        
        {/* Tab Switcher */}
        <div className="bg-gray-100 p-1 rounded-lg flex w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setActiveTab('SAP')}
            className={`flex-1 sm:flex-none px-4 md:px-6 py-2 rounded-md text-sm font-bold transition-all duration-200 whitespace-nowrap ${
              activeTab === 'SAP' 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            SAP Level
          </button>
          <button
            onClick={() => setActiveTab('SIZE')}
            className={`flex-1 sm:flex-none px-4 md:px-6 py-2 rounded-md text-sm font-bold transition-all duration-200 whitespace-nowrap ${
              activeTab === 'SIZE' 
                ? 'bg-white text-purple-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Size Level
          </button>
           <button
            onClick={() => setActiveTab('MAP')}
            className={`flex-1 sm:flex-none px-4 md:px-6 py-2 rounded-md text-sm font-bold transition-all duration-200 whitespace-nowrap ${
              activeTab === 'MAP' 
                ? 'bg-white text-emerald-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            MAP
          </button>
        </div>
      </div>
      
      {renderContent()}
    </div>
  );
};