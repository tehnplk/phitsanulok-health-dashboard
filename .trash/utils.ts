// Utility functions for calculation and formatting

export const getOccupancyStatus = (percentage: number) => {
  if (percentage > 100) return { color: 'bg-red-500', text: 'text-red-600', label: 'Over' };
  if (percentage >= 90) return { color: 'bg-orange-500', text: 'text-orange-600', label: 'Full' };
  if (percentage >= 75) return { color: 'bg-amber-400', text: 'text-amber-600', label: 'Warn' };
  return { color: 'bg-emerald-400', text: 'text-emerald-600', label: 'OK' };
};

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat('th-TH').format(num);
};

export const generateMockDates = (days: number) => {
  const dates = [];
  const today = new Date();
  
  const thaiDays = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'];

  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - (days - 1 - i));
    
    // Convert to Thai Buddhist Year
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = (d.getFullYear() + 543);
    
    dates.push({
      date: `${day}/${month}/${year}`,
      dayName: thaiDays[d.getDay()]
    });
  }
  return dates;
};