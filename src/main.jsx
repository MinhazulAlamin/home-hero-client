import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';


import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Routes';
import AuthProvider from './context/AuthProvider';
import ThemeProvider from './context/ThemeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <>
          <RouterProvider router={router} />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
