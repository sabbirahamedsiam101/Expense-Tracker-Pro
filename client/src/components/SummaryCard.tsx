
import React from 'react';

interface SummaryCardProps {
  title: string;
  amount: number;
  color: 'green' | 'red' | 'blue' | 'purple';
  icon?: React.ReactNode;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, color, icon }) => {
  const colorClasses = {
    green: 'bg-green-500 text-white',
    red: 'bg-red-500 text-white',
    blue: 'bg-blue-500 text-white',
    purple: 'bg-purple-500 text-white'
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-xs sm:text-sm font-medium text-gray-600 leading-tight">{title}</h3>
        {icon && (
          <div className={`p-1.5 sm:p-2 rounded-lg ${colorClasses[color]} flex-shrink-0`}>
            <div className="w-4 h-4 sm:w-6 sm:h-6 flex items-center justify-center">
              {icon}
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center">
        <span className={`text-lg sm:text-2xl font-bold ${
          amount < 0 ? 'text-red-600' : 'text-gray-900'
        } break-all`}>
          {formatAmount(amount)}
        </span>
      </div>
    </div>
  );
};

export default SummaryCard;
