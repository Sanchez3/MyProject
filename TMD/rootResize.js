  var noChangeCountToEnd = 100,
      noEndTimeout = 1000,
      startR = false;

  function rootResize() {
      var wFsize;
      var _w, _h;
      //bug 
      // var wWidth = (screen.width > 0) ? (window.innerWidth >= screen.width || window.innerWidth === 0) ? screen.width :
      //     window.innerWidth : window.innerWidth;
      var wWidth = window.innerWidth;
      var wHeight = window.innerHeight;
      wFsize = wWidth / 7.5;
      document.getElementsByTagName('html')[0].style.fontSize = wFsize + 'px';
      if (startR) {

          if (wWidth > wHeight) {
              _h = wWidth;
              _w = wHeight;
              TweenMax.set(document.getElementsByClassName('all-wrapper')[0], { transformOrigin: '0% 0% 0', rotation: -90, width: _w, height: _h, y: _w });
          } else {

              _h = wHeight;
              _w = wWidth;
              TweenMax.set(document.getElementsByClassName('all-wrapper')[0], { transformOrigin: '0% 0% 0', rotation: 0, width: _w, height: _h, y: 0 });
          }

      } else {
          if (wWidth > wHeight) {
              _h = wWidth;
              _w = wHeight;
              TweenMax.set(document.getElementsByClassName('all-wrapper')[0], { transformOrigin: '0% 0% 0', rotation: -90, width: _w, height: _h, y: _w });
          }
      }

  }
  //first resize
  rootResize();
  //orientationchange resize
  window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
      var interval,
          timeout,
          end,
          lastInnerWidth,
          lastInnerHeight,
          noChangeCount;
      end = function() {
          // "orientationchangeend"
          clearInterval(interval);
          clearTimeout(timeout);
          interval = null;
          timeout = null;
          startR = true;
          rootResize();
      };
      interval = setInterval(function() {
          if (window.innerWidth === lastInnerWidth && window.innerHeight === lastInnerHeight) {
              noChangeCount++;
              if (noChangeCount === noChangeCountToEnd) {
                  // The interval resolved the issue first.
                  end();
              }
          } else {
              lastInnerWidth = window.innerWidth;
              lastInnerHeight = window.innerHeight;
              noChangeCount = 0;
          }
      });
      timeout = setTimeout(function() {
          // The timeout happened first.
          end();
      }, noEndTimeout);
  });