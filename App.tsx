import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { OneLRPage } from './components/OneLRPage';
import { OneIPDPage } from './components/OneIPDPage';
import { OneICUPage } from './components/OneICUPage';
import { OneORPage } from './components/OneORPage';
import { WaitingPage } from './components/WaitingPage';
import { VisitPage } from './components/VisitPage';
import { HospitalPage } from './components/HospitalPage';
import { LR_DATA, IPD_DATA, ICU_DATA, WAITING_DATA, VISIT_DATA, OR_DATA, HOSPITAL_MASTER } from './constants';
import { Building2 } from 'lucide-react';
import { ViewType } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('hospital');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleMenuClick = (view: ViewType) => {
    setActiveView(view);
    closeSidebar();
  };

  const renderContent = () => {
    switch (activeView) {
      case 'hospital':
        return <HospitalPage data={HOSPITAL_MASTER} />;
      case 'onelr':
        return <OneLRPage data={LR_DATA} />;
      case 'oneor':
        return <OneORPage data={OR_DATA} />;
      case 'oneicu':
        return <OneICUPage data={ICU_DATA} />;
      case 'oneipd':
        return <OneIPDPage data={IPD_DATA} />;
      case 'waiting-daily':
      case 'waiting-weekly':
      case 'waiting-monthly':
      case 'waiting':
        return <WaitingPage data={WAITING_DATA} />;
      case 'opd-visit':
        return <VisitPage data={VISIT_DATA} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[50vh] text-gray-400">
             <Building2 className="w-16 h-16 mb-4 opacity-50" />
             <p className="text-lg">Select a menu item to view details</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 overflow-x-hidden">
      <Header onMenuToggle={toggleSidebar} activeView={activeView} />
      
      <div className="flex flex-1 relative overflow-hidden">
        <Sidebar 
          activeView={activeView} 
          onMenuClick={handleMenuClick} 
          isOpen={isSidebarOpen} 
          onClose={closeSidebar} 
        />
        
        <main className="flex-1 p-4 md:p-6 overflow-y-auto h-[calc(100vh-64px)] w-full">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;