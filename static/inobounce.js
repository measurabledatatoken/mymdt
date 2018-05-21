/*! iNoBounce - v0.1.6
* https://github.com/lazd/iNoBounce/
* Copyright (c) 2013 Larry Davis <lazdnet@gmail.com>; Licensed BSD */
(function (global) {
  // Stores the Y position where the touch started
  let startY = 0;

  // Store enabled status
  let enabled = false;

  let supportsPassiveOption = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get() {
        supportsPassiveOption = true;
      },
    });
    window.addEventListener('test', null, opts);
  } catch (e) {}

  const handleTouchmove = function (evt) {
    // Get the element that was scrolled upon
    let el = evt.target;

    // Check all parent elements for scrollability
    while (el !== document.body && el !== document) {
      // Get some style properties
      const style = window.getComputedStyle(el);

      if (!style) {
        // If we've encountered an element we can't compute the style for, get out
        break;
      }

      // Ignore range input element
      if (el.nodeName === 'INPUT' && el.getAttribute('type') === 'range') {
        return;
      }

      const scrolling = style.getPropertyValue('-webkit-overflow-scrolling');
      const overflowY = style.getPropertyValue('overflow-y');
      const height = parseInt(style.getPropertyValue('height'), 10);

      // Determine if the element should scroll
      const isScrollable = scrolling === 'touch' && (overflowY === 'auto' || overflowY === 'scroll');
      const canScroll = el.scrollHeight > el.offsetHeight;

      if (isScrollable && canScroll) {
        // Get the current Y position of the touch
        const curY = evt.touches ? evt.touches[0].screenY : evt.screenY;

        // Determine if the user is trying to scroll past the top or bottom
        // In this case, the window will bounce, so we have to prevent scrolling completely
        const isAtTop = (startY <= curY && el.scrollTop === 0);
        const isAtBottom = (startY >= curY && el.scrollHeight - el.scrollTop === height);

        // Stop a bounce bug when at the bottom or top of the scrollable element
        if (isAtTop || isAtBottom) {
          evt.preventDefault();
        }

        // No need to continue up the DOM, we've done our job
        return;
      }

      // Test the next parent
      el = el.parentNode;
    }

    // Stop the bouncing -- no parents are scrollable
    evt.preventDefault();
  };

  const handleTouchstart = function (evt) {
    // Store the first Y position of the touch
    startY = evt.touches ? evt.touches[0].screenY : evt.screenY;
  };

  const enable = function () {
    // Listen to a couple key touch events
    window.addEventListener('touchstart', handleTouchstart, supportsPassiveOption ? { passive: false } : false);
    window.addEventListener('touchmove', handleTouchmove, supportsPassiveOption ? { passive: false } : false);
    enabled = true;
  };

  const disable = function () {
    // Stop listening
    window.removeEventListener('touchstart', handleTouchstart, false);
    window.removeEventListener('touchmove', handleTouchmove, false);
    enabled = false;
  };

  const isEnabled = function () {
    return enabled;
  };

  // Enable by default if the browser supports -webkit-overflow-scrolling
  // Test this by setting the property with JavaScript on an element that exists in the DOM
  // Then, see if the property is reflected in the computed style
  const testDiv = document.createElement('div');
  document.documentElement.appendChild(testDiv);
  testDiv.style.WebkitOverflowScrolling = 'touch';
  const scrollSupport = 'getComputedStyle' in window && window.getComputedStyle(testDiv)['-webkit-overflow-scrolling'] === 'touch';
  document.documentElement.removeChild(testDiv);

  if (scrollSupport) {
    enable();
  }

  // A module to support enabling/disabling iNoBounce
  const iNoBounce = {
    enable,
    disable,
    isEnabled,
  };

  if (typeof module !== 'undefined' && module.exports) {
    // Node.js Support
    module.exports = iNoBounce;
  }
  if (typeof global.define === 'function') {
    // AMD Support
    (function (define) {
      define('iNoBounce', [], () => iNoBounce);
    }(global.define));
  } else {
    // Browser support
    global.iNoBounce = iNoBounce;
  }
}(this));
