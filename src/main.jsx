import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
//import ToolList from './ToolList.jsx'
//import ToolForm from './ToolForm.jsx'
import './index.css';
import './custom.css';
import './App.css';
import './login.css';
import './ToolStatus.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
