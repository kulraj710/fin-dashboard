"use client";

import React, { useState } from 'react';

const DisplayBacktest = () => {
  const [htmlContent, setHtmlContent] = useState('');

  const runBacktest = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/backtest', {
        method: 'POST',
      });

      // Get the HTML content as text
      const htmlContent = await response.text();
      
      // Set the HTML content to the state
      setHtmlContent(htmlContent);
    } catch (error) {
      console.error('Error displaying the report:', error);
    }
  };

  return (
    <div>
      <button onClick={runBacktest}>Run Backtest and View Report</button>

      {/* Render the HTML inside an iframe */}
      {htmlContent && (
        <iframe
          srcDoc={htmlContent}  // Use srcDoc to embed HTML content directly
          title="Backtest Report"
          style={{
            width: '100%',
            height: '600px',
            border: '1px solid #ccc',
            marginTop: '20px'
          }}
        />
      )}
    </div>
  );
};

export default DisplayBacktest;