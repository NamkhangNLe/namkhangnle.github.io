import React from 'react';
import Desktop from './components/Desktop/Desktop';
import { WindowProvider } from './context/WindowContext';

function App() {
  return (
    <WindowProvider>
      <Desktop />
    </WindowProvider>
  );
}

export default App;
