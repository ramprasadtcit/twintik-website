import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

console.log('main.tsx: Starting with routing...');

try {
  const rootElement = document.getElementById('root');
  console.log('main.tsx: Root element found:', !!rootElement);

  if (!rootElement) {
    throw new Error('Root element not found');
  }

  console.log('main.tsx: Creating React root...');
  const root = createRoot(rootElement);
  console.log('main.tsx: React root created successfully');

  console.log('main.tsx: Rendering App with BrowserRouter...');
  root.render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );

  console.log('main.tsx: App rendered successfully with routing');
} catch (error) {
  console.error('main.tsx: Error during app initialization:', error);

  // Fallback: try to show error in the DOM
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="
        min-height: 100vh;
        background-color: #dc2626;
        color: white;
        padding: 2rem;
        font-family: Arial, sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="max-width: 600px; text-align: center;">
          <h1 style="
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 1rem;
          ">
            🚨 ROUTING ERROR
          </h1>
          <p style="
            font-size: 1.125rem;
            margin-bottom: 2rem;
          ">
            BrowserRouter failed to initialize.
          </p>
          <div style="
            background-color: white;
            color: #dc2626;
            padding: 1.5rem;
            border-radius: 0.5rem;
            text-align: left;
          ">
            <h2 style="
              font-size: 1.25rem;
              font-weight: bold;
              margin-bottom: 1rem;
            ">
              Error Details
            </h2>
            <pre style="
              background-color: #f9fafb;
              padding: 1rem;
              border-radius: 0.25rem;
              overflow: auto;
              font-size: 0.875rem;
            ">
              ${error instanceof Error ? error.message : String(error)}
            </pre>
          </div>
        </div>
      </div>
    `;
  }
}
