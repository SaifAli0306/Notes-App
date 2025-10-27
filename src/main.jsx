import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './store.js'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}> 
    <App  />
     <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: '#646cff',
          color: '#fff',
          borderRadius: '8px',
          padding: '10px 16px',
        },
      }}
    />
    </Provider>
  </StrictMode>,
)
