import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css'; // You can add global CSS here if needed
import App from './App'; // Import your main App component
// import reportWebVitals from './reportWebVitals'; // (Optional)

ReactDOM.render(
    <App />,
  document.getElementById('root') // This connects the 'root' div in index.html to your React app
);

// Optional: For measuring performance (can be omitted if not needed)
// reportWebVitals();
