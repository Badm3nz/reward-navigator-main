
import React from 'react';
import { Gift } from 'lucide-react';

const RedeemButton = () => {
  return (
    <button 
      className="md-fab"
      aria-label="Redeem rewards"
    >
      <Gift size={20} className="sm:size-24" />
    </button>
  );
};

export default RedeemButton;
