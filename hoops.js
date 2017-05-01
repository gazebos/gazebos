(function () {
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

  function docParsed (resolve) {
    var listener = function () {
      if (document.readyState === 'interactive' || document.readyState === 'complete') {
        document.removeEventListener('readystatechange', listener);
        resolve(null, true);
      }
    };
    document.addEventListener('readystatechange', listener);
    listener();
  }

  function docLoaded () {
    var listener = function () {
      if (document.readyState === 'complete') {
        document.removeEventListener('readystatechange', listener);
        resolve(null, true);
      }
    };
    document.addEventListener('readystatechange', listener);
    listener();
  }

  function docContentLoaded () {
    var listener = function () {
      if (document.readyState === 'interactive' || document.readyState === 'complete') {
        document.removeEventListener('DOMContentLoaded', listener);
        resolve(null, true);
      }
    };
    document.addEventListener('DOMContentLoaded', listener);
    listener();
  }

  function tryUntilFound (functionToCall) {
    return docParsed(function (err, result) {
      if (err || !result) {
        return docLoaded(function (err, result) {
          if (err || !result) {
            return;
          }
          functionToCall();
        });
      }

      var done = functionToCall();
      if (!done) {
        return docContentLoaded(function (err, result) {
          if (err || !result) {
            return;
          }
          functionToCall();
        });
      }
    });
  };

  function autoEnterVR () {
    var scene = document.querySelector('a-scene');
    if (!scene) {
      return false;
    }
    if (scene.hasLoaded) {
      scene.enterVR();
    } else {
      scene.addEventListener('loaded', function () {
        scene.enterVR();
      });
    }
    return true;
  }

  tryUntilFound(autoEnterVR);

  window.addEventListener('click', function (evt) {
    var scene = document.querySelector('a-scene');
    if (!scene || !scene.is || !scene.is('vr-mode')) {
      return;
    }
    evt.preventDefault();
    go(1);
  });

  window.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    if (evt.keyCode === 37) {
      go(-1);
    } else if (evt.keyCode === 39) {
      go(1);
    }
  });
})();
