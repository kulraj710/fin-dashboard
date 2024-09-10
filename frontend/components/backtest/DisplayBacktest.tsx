"use client";
import React, { useEffect } from 'react';

const DisplayBacktest = () => {
  
  useEffect(() => {
    // Fetch the URL of the generated HTML from Flask
    fetch('http://localhost:5000/api/backtest')
      .then((response) => response.json())
      .then((data) => {
        // Open the plot in a new tab
        window.open(data.url, '_blank');
      })
      .catch((error) => console.error('Error fetching the plot URL', error));
  }, []);

  return (
    <div>
      <p>Plot is opening in a new tab...</p>
    </div>
  );
};

export default DisplayBacktest;


// import React, { useState } from 'react';

// const DisplayBacktest = () => {
//   const [htmlContent, setHtmlContent] = useState('');

//   const runBacktest = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/backtest', {
//         method: 'POST',
//       });

//       // Get the HTML content as text
//       const htmlContent = await response.text();
      
//       // Set the HTML content to the state
//       setHtmlContent(htmlContent);
//     } catch (error) {
//       console.error('Error displaying the report:', error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={runBacktest}>Run Backtest and View Report</button>

//       {/* Render the HTML inside an iframe */}
//       {htmlContent && (
//         <iframe
//           srcDoc={htmlContent}  // Use srcDoc to embed HTML content directly
//           title="Backtest Report"
//           style={{
//             width: '100%',
//             height: '600px',
//             border: '1px solid #ccc',
//             marginTop: '20px'
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default DisplayBacktest;