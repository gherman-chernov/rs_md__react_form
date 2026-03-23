import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import React from 'react';

class ErrorBoundary extends React.Component<{ children: React.ReactNode, fallback: React.ReactNode }, {hasError: boolean}> {
  constructor(props:{ children: React.ReactNode, fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
 
    return { hasError: error != null };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(error, info);
  }

  render() {
    /*if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }*/

    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={<div>Something went wrong.</div>}>
    <App />
    </ErrorBoundary>
  </StrictMode>,
)
