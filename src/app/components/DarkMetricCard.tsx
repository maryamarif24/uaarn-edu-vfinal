import React from 'react';

interface DarkMetricCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;

  badgeText?: string;
  monthlyIncrease?: string;
  buttonText: string;
  onButtonClick: () => void;
}

const DarkMetricCard: React.FC<DarkMetricCardProps> = ({
  value,
  label,
  icon,
  badgeText,
  monthlyIncrease,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="relative flex flex-col items-center justify-between p-8 bg-blue-700 border border-blue-600 rounded-2xl shadow-lg overflow-hidden h-96 w-full max-w-sm mx-auto transition duration-300 ">
      
      <div className="absolute inset-x-0 top-0 flex justify-between p-4 text-xs font-semibold">
        {badgeText && (
          <div className="bg-white text-slate-800 px-3 py-1 rounded-full shadow-lg">
            {badgeText}
          </div>
        )}
        {monthlyIncrease && (
          <div className="bg-white text-slate-800 px-3 py-1 rounded-full shadow-lg ml-auto">
            {monthlyIncrease}
          </div>
        )}
      </div>

      <div className="flex flex-col items-center mt-12">
        <div className="text-white text-4xl mb-6">
          {icon}
        </div>
        
        <p className="text-6xl font-extrabold text-white mb-2">{value}</p>
        
        <p className="text-lg text-blue-300 mt-7">{label}</p>
      </div>

      <button
        onClick={onButtonClick}
        className="w-full px-6 py-3 mt-4 text-sm font-semibold text-blue-600 bg-white rounded-lg transition duration-300  hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-900"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default DarkMetricCard;