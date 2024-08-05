import React, { useEffect } from 'react';

const HilltopAdsBanner = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "//neat-period.com/b/X.V/s-dhGDlJ0OY/WQdLi/YJWr5/u/ZDXlIS/Yeqmz9bu/ZXUnlJkEPrTUU_0-NNz/Mr0dN/DpgBtaNITuQy3pMxz/QL0SO/Qu";
    script.async = true;
    script.referrerPolicy = 'no-referrer-when-downgrade';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="hilltop-ads-banner"></div>;
};

export default HilltopAdsBanner;
