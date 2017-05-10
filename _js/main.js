(function () {
  'use strict';
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

  function go (increment) {
    num = setNum(increment);
    window.location.href = './' + num + '.html';
  }

  function docParsed (cb) {
    var listener = function () {
      if (document.readyState === 'interactive' || document.readyState === 'complete') {
        document.removeEventListener('readystatechange', listener);
        cb(null, true);
      }
    };
    document.addEventListener('readystatechange', listener);
    listener();
  }

  function docLoaded (cb) {
    var listener = function () {
      if (document.readyState === 'complete') {
        document.removeEventListener('readystatechange', listener);
        cb(null, true);
      }
    };
    document.addEventListener('readystatechange', listener);
    listener();
  }

  function docContentLoaded (cb) {
    var listener = function () {
      if (document.readyState === 'interactive' || document.readyState === 'complete') {
        document.removeEventListener('DOMContentLoaded', listener);
        cb(null, true);
      }
    };
    document.addEventListener('DOMContentLoaded', listener);
    listener();
  }

  function tryUntilFound (cb) {
    return docParsed(function (err, result) {
      if (err || !result) {
        return docLoaded(function (err, result) {
          if (err || !result) {
            return;
          }
          cb();
        });
      }

      var done = cb();
      if (!done) {
        return docContentLoaded(function (err, result) {
          if (err || !result) {
            return;
          }
          cb();
        });
      }
    });
  }

  function autoEnterVR (cb) {
    var scene = document.querySelector('a-scene');
    if (!scene) {
      return false;
    }
    if (scene.hasLoaded) {
      loaded();
    } else {
      scene.addEventListener('loaded', loaded);
    }
    return true;
    function loaded () {
      scene.enterVR().then(function () {
        if (cb && typeof cb === 'function') {
          cb(null, scene);
        }
      }).catch(function (err) {
        if (cb && typeof cb === 'function') {
          cb(err, scene);
        } else {
          console.warn(err);
        }
      });
    }
  }

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

  tryUntilFound(function () {
    return autoEnterVR(function (err, scene) {
      if (err) {
        console.warn(err);
      }

      sounds = new Sounds({
        scene: scene
      });
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
    'ArrowRight': 37,
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
})();
