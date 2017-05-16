(function () {
  'use strict';

  var serviceWorkerEnabled = false;
  if (serviceWorkerEnabled &&
      window.location.host === 'gazebos.io' &&
      ('serviceWorker' in navigator)) {
    navigator.serviceWorker.register('/sw.js');
  }

  var num = getNum() || -1;

  function getNum () {
    var num = window.location.pathname.replace(/[^\d]/g, '');
    try {
      num = parseInt(num, 10);
    } catch (e) {
      return;
    }
    return num;
  }

  function setNum (increment) {
    var num = getNum();
    num += increment || 0;
    return num;
  }

  var prev;
  var next;

  window.addEventListener('DOMContentLoaded', function () {
    prev = document.head.querySelector('link[rel~="prev"]');
    next = document.head.querySelector('link[rel~="next"]');
  });

  function go (increment) {
    if (typeof increment === 'number') {
      if (prev && increment === -1) {
        window.location.href = prev.getAttribute('href');
        return;
      }
      if (next && increment === 1) {
        window.location.href = next.getAttribute('href');
        return;
      }
    }
    if (typeof increment === 'string') {
      if (increment === 'prev') {
        window.location.href = prev.getAttribute('href');
        return;
      }
      if (increment === 'next') {
        window.location.href = next.getAttribute('href');
        return;
      }
    }
    num = setNum(increment);
    window.location.href = './' + num + '.html';
  }

  var scene;

  var sceneReady = new Promise(function (resolve, reject) {
    scene = document.querySelector('a-scene');

    if (scene) {
      resolve(scene);
      return;
    }

    if (!scene) {
      document.addEventListener('readystatechange', sceneFound);

      setTimeout(function () {
        sceneFound(true);
      }, 5000);
    }

    function sceneFound (didTimeout) {
      scene = document.querySelector('a-scene');
      if (didTimeout || scene) {
        document.removeEventListener('readystatechange', sceneFound);
        if (scene.hasLoaded) {
          resolve(scene);
        } else {
          scene.addEventListener('loaded', function () {
            resolve(scene);
          });
        }
      }
    }
  });

  var sounds;
  var supports = {};
  supports.iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
  supports.cardboard = supports.iOS || (!('vrDisplays' in navigator) && !('vr' in navigator) && navigator.platform.indexOf('Android') > -1);

  // if (supports.cardboard) {
  //   window.addEventListener('click', function (evt) {
  //     var scene = document.querySelector('a-scene');
  //     if (!scene || !scene.is || !scene.is('vr-mode')) {
  //       return;
  //     }
  //     evt.preventDefault();
  //     go(1);
  //   });
  // }

  sceneReady.then(function (scene) {
    console.log('Scene loaded');

    sounds = new Sounds({
      scene: scene
    });

    var mousedownX = 0;
    var mouseupX = 0;
    var phiStart = 0;

    var bg = scene.querySelector('a-sky, a-videosphere');
    if (bg && !scene.isMobile) {
      if (('requestAnimationFrame' in window) && 'performance' in window) {
        window.requestAnimationFrame(draw);
        var timeBefore = window.performance.now();
      }
    }

    function draw () {
      phiStart = (window.performance.now() - timeBefore) / 6 * Math.PI / 180;
      // if (mousedownX < mouseupX) {
      //   phiStart *= -1;
      // }
      bg.setAttribute('phi-start', phiStart);
      if (mousedownX || mouseupX) {
        return;
      }
      window.requestAnimationFrame(draw);
    }

    window.addEventListener('mousedown', function (evt) {
      mousedownX = evt.pageX;
    });

    window.addEventListener('mouseup', function (evt) {
      mouseupX = evt.pageX;
    });
  });

  function toArray (obj) {
    return Array.prototype.slice.apply(obj);
  }

  function $ (selector, parent) {
    parent = parent || document;
    return parent.querySelector(selector);
  }

  function $$ (selector, parent) {
    parent = parent || document;
    return toArray(parent.querySelectorAll(selector));
  }

  function Sounds (opts) {
    opts = opts || {};
    opts.muted = 'muted' in opts ? opts.muted : false;
    opts.scene = opts.scene || $('a-scene');

    var self = this;
    self.muted = false;
    self.scene = self.scene;

    self.toggle = function () {
      if (self.muted) {
        self.play();
      } else {
        self.stop();
      }
    };

    self.playEl = function (el) {
      el.components.sound.sound.preload = el.components.sound.sound._preload;
      el.components.sound.sound.autoplay = el.components.sound.sound._autoplay;
      el.components.sound.sound.src = el.components.sound.sound._src;
      el.components.sound.sound.muted = el.components.sound.sound._muted;
      el.components.sound.play();
    };

    self.stopEl = function (el) {
      el.components.sound.pause();
      el.components.sound.sound._preload = el.components.sound.sound._preload;
      el.components.sound.sound._autoplay = el.components.sound.sound._autoplay;
      el.components.sound.sound._muted = el.components.sound.sound._muted;
      el.components.sound.sound._src = el.components.sound.sound.src;
      el.components.sound.sound.preload = false;
      el.components.sound.sound.autoplay = false;
      el.components.sound.sound.muted = true;
      el.components.sound.sound.src = '';
    };

    self.play = function () {
      self.muted = false;
      self.remember();
      $$('[sound]', self.scene).forEach(self.playEl);
      $$('audio').forEach(function (el) {
        el.setAttribute('data-original-muted', el.getAttribute('muted'));
        el.muted = false;
      });
    };

    self.stop = function () {
      self.muted = true;
      self.remember();
      $$('[sound]', self.scene).forEach(self.stopEl);
      $$('audio').forEach(function (el) {
        el.muted = true;
        el.setAttribute('muted', el.getAttribute('data-original-muted'));
      });
    };

    self.remember = function () {
      try {
        window.localStorage.audioMuted = self.muted ? 'true' : 'false';
      } catch (e) {
      }
    };

    self.muteOnLoad = function () {
      try {
        return window.localStorage.audioMuted === 'true';
      } catch (e) {
        return null;
      }
    };

    if (self.muteOnLoad()) {
      self.stop();
    }
  }

  var keys = {
    'ArrowLeft': 37,
    'ArrowRight': 39,
    's': 83
  };

  window.addEventListener('keydown', function (evt) {
    if (evt.target !== document.body) {
      return;
    }
    if (evt.keyCode === keys.ArrowLeft) {
      evt.preventDefault();
      go(-1);
    } else if (evt.keyCode === keys.ArrowRight) {
      evt.preventDefault();
      go(1);
    } else if (evt.keyCode === keys.s) {
      evt.preventDefault();
      sounds.toggle();
    }
  });

  if ('ontouchstart' in window) {
    var lastClick = 0;
    // NOTE: iOS does not emit `dblclick` so this handles double clicks.
    window.addEventListener('click', function (evt) {
      if (evt.target && evt.target.matches && evt.target.matches('button, div')) {
        return;
      }
      if (lastClick && Date.now() - lastClick < 500) {
        loadNextScene();
        return;
      }
      lastClick = Date.now();
    });
  }

  function loadNextScene () {
    if (scene && scene.is && scene.is('vr-mode')) {
      go(1);
      evt.preventDefault();
    }
  }

  function playVideoOnClick (selector) {
    var el = document.querySelector(selector);

    if (el) {
      addListener();
    } else {
      window.addEventListener('load', addListener);
    }

    function addListener () {
      el = document.querySelector(selector);

      if (!el) {
        return;
      }

      if (el.paused) {
        window.addEventListener('click', handleFirstClick);
      }

      function handleFirstClick () {
        try {
          if (el.muted) {
            delete el.muted;
          }
          if (el.paused) {
            el.play();
          }
        } catch (e) {
        }

        removeHandleFirstClick();
      }

      function removeHandleFirstClick () {
        window.removeEventListener('click', handleFirstClick);
      }
    }
  }

  playVideoOnClick('video');
  playVideoOnClick('audio');
})();
