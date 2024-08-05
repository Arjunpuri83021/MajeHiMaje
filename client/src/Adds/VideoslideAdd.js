import { useEffect } from 'react';

const VideoSliderAd = () => {
  useEffect(() => {
    // Create a script element
    const script = document.createElement('script');
    script.src = "//shallowgift.com/dFm/F.zNdRGGlntlPg3opHvCbFmnVxJUZUDg0L1CNWDmcrz/NQDEka4RLPTAU/0wNizjMU0GOkT_kT";
    script.referrerPolicy = 'no-referrer-when-downgrade';
    script.async = true;
    
    // Insert the script into the document
    const lastScript = document.scripts[document.scripts.length - 1];
    lastScript.parentNode.insertBefore(script, lastScript);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return <div id="video-slider-ad-container"></div>;
};

export default VideoSliderAd;
