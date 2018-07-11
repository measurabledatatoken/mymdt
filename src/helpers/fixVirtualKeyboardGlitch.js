export default function fixVirtualKeyboardGlitch() {
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    const getScrollingElement = function getScrollingElement() {
      return document.scrollingElement || document.documentElement;
    };
    let scrollTop = getScrollingElement().scrollTop;
    const handleScroll = function handleScroll() {
      const el = getScrollingElement();
      const nextScrollTop = el.scrollTop;
      if (nextScrollTop <= scrollTop) {
        // keyboard is hidden
        el.scrollTo(0, 0);
      }

      scrollTop = nextScrollTop;
    };
    window.addEventListener('scroll', handleScroll, false);
  }
}
