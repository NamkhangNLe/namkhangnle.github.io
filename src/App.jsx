import React, { useEffect } from 'react';
import Desktop from './components/Desktop/Desktop';
import IPhone from './components/iPhone/IPhone';
import { WindowProvider, useWindowContext } from './context/WindowContext';
import { useIsMobile } from './utils/mobile';
import Blog from './components/Apps/Blog';
import Research from './components/Apps/Research';
import { posts } from './data/posts';
import { researchNotes } from './data/research';

// Deep link: on app mount, open the Blog app directly to the requested post,
// or the Research app directly to the requested note. Lives here (not in
// Desktop) so it works in both shells — the Mac desktop and the iPhone home
// screen both render open windows, so a ?post= / ?research= link lands
// inside the right app on any width.
function DeepLinkOpener() {
    const { openWindow } = useWindowContext();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const postId = params.get('post');
        if (postId && posts.some((p) => p.id === postId)) {
            openWindow('blog', 'Blog', <Blog initialPostId={postId} />, { w: 900, h: 600 });
        }
        const researchId = params.get('research');
        if (researchId && researchNotes.some((n) => n.id === researchId)) {
            openWindow('research', 'Research', <Research initialNoteId={researchId} />, { w: 900, h: 600 });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}

// Phones get the iPhone home screen; wider screens keep the Mac desktop
// exactly as it is. Same breakpoint the responsive code already uses
// (max-width: 767px, via useIsMobile).
function Shell() {
    const isMobile = useIsMobile();
    return isMobile ? <IPhone /> : <Desktop />;
}

function App() {
    return (
        <WindowProvider>
            <DeepLinkOpener />
            <Shell />
        </WindowProvider>
    );
}

export default App;
