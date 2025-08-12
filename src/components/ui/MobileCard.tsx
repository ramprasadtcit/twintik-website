import React from 'react';

interface MobileCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const MobileCard: React.FC<MobileCardProps> = ({
  children,
  className = '',
  onClick,
  disabled = false
}) => {
  const baseClasses = 'bg-white rounded-xl shadow-sm border border-gray-200 p-4';
  const interactiveClasses = onClick && !disabled ? 'cursor-pointer hover:shadow-md transition-shadow' : '';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  const Component = onClick ? 'button' : 'div';
  
  return (
    <Component
      className={`${baseClasses} ${interactiveClasses} ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Component>
  );
};

export default MobileCard;
