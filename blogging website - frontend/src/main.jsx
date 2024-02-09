import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode> 
  <BrowserRouter>
  <App />
  </BrowserRouter>

  // </React.StrictMode>,
)


// Note : by comment React.StrictMode we store rending 2 time .
// because in Strict Mode react render every thing 2 time.