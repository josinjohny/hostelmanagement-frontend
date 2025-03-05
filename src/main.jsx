import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import './bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import ContextShare from './context/contextShare.jsx';  // ✅ Import ContextShare

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ContextShare>  {/* ✅ Wrap App with ContextShare */}
        <App />
      </ContextShare>
    </BrowserRouter>
  </StrictMode>,
);
