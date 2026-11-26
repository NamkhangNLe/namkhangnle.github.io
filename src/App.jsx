import React from 'react';
import Desktop from './components/Desktop/Desktop';
import IPhone from './components/iPhone/IPhone';
import { WindowProvider } from './context/WindowContext';
import { useIsMobile } from './utils/mobile';

function App() {
    const isMobile = useIsMobile();
    return (
        <WindowProvider>
            {isMobile ? <IPhone /> : <Desktop />}
        </WindowProvider>
    );
}

export default App;
