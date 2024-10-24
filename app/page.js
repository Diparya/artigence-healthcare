'use client'
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import OpenSeadragon from 'openseadragon';

const Home = () => {
  const viewerRef = useRef(null);
  const navigatorRef = useRef(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize main viewer (Zoomed-in view)
      const viewer = OpenSeadragon({
        element: viewerRef.current,
        tileSources: {
          type: 'image',
          url: '/images/wsi.png', // Path to your static image
        },
        prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
        showNavigator: true,
        navigatorId: 'navigator-container',
        navigatorPosition: 'ABSOLUTE',
      });
    }

    // Update the date and time every second
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Function to format the date and time
  const formatDate = (date) => {
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6 flex flex-col items-center"
      style={{ backgroundImage: 'url(images/cell-slide.jpg)' }} // Path to the background image
    >
      {/* Header Section */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center text-black">
        <h1 className="text-xl sm:text-2xl font-bold">Artigence Healthcare</h1>
        <p className="text-sm sm:text-md font-bold">{formatDate(currentDateTime)}</p>
      </div>

      {/* Main Layout Section */}
      <div className="flex flex-col lg:flex-row w-full mt-6 space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Left Panel: Findings */}
        <div className="w-full lg:w-1/4 bg-transparent p-4 shadow-lg rounded-lg">
          {/* Findings table (RBC, WBC, Platelets) */}
          <div className="mb-4">
            <table className="w-full text-left table-fixed border-collapse">
              <thead>
                <tr className="bg-gray-200 text-black">
                  <th className="border p-2">RCB</th>
                  <th className="border p-2">Count</th>
                  <th className="border p-2">Percentage</th>
                </tr>
              </thead>
              <tbody className="text-black">
                <tr>
                  <td className="border p-2">Angled Cells</td>
                  <td className="border p-2">222</td>
                  <td className="border p-2">67%</td>
                </tr>
                <tr>
                  <td className="border p-2">Burr Cells</td>
                  <td className="border p-2">87</td>
                  <td className="border p-2">34%</td>
                </tr>
              </tbody>
            </table>

            {/* Additional tables... */}
          </div>
        </div>

        {/* Center Panel: WSI Zoomed View */}
        <div className="w-full lg:w-2/4 bg-black flex items-center justify-center p-4 shadow-md rounded-lg">
          <div
            id="openseadragon-viewer"
            ref={viewerRef}
            className="w-full h-64 lg:h-96 bg-gray-200"
          >
            {/* OpenSeadragon will render the zoomed-in view here */}
          </div>
        </div>

        {/* Right Panel: Hub with Navigator */}
        <div className="w-full lg:w-1/4 bg-transparent p-4 shadow-md rounded-lg flex flex-col items-center">
          <h2 className="text-lg font-bold mb-4 text-black">Zoomed Out View (Hub)</h2>
          <div
            id="navigator-container"
            ref={navigatorRef}
            className="w-full h-48 rounded-md bg-black"
          >
            {/* Navigator will be rendered here */}
          </div>
          <div className="text-black flex flex-col mt-4">
            <h1>Patient ID: </h1>
            <h1>Blood: </h1>
          </div>
        </div>
      </div>

      {/* Report Button */}
      <div className="mt-8 w-full flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-5">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
          Report
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
          Share
        </button>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });
