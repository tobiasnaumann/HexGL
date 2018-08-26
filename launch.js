
var hexGlStartGame = (function() {
  var $, a, defaultControls, getWebGL, hasWebGL, init, s, u, _fn, _i, _len;

  $ = function(_) {
    return document.getElementById(_);
  };

  init = function(controlType, quality, hud, godmode) {
    var hexGL, progressbar;
    hexGL = new bkcore.hexgl.HexGL({
      document: document,
      width: window.innerWidth,
      height: window.innerHeight,
      container: $('main'),
      overlay: $('overlay'),
      gameover: $('step-5'),
      quality: quality,
      difficulty: 0,
      hud: hud === 1,
      controlType: controlType,
      godmode: godmode,
      track: 'Cityscape'
    });
    window.hexGL = hexGL;
    progressbar = $('progressbar');
    return hexGL.load({
      onLoad: function() {
        console.log('LOADED.');
        hexGL.init();
        $('step-3').style.display = 'none';
        $('step-4').style.display = 'block';
        return hexGL.start();
      },
      onError: function(s) {
        return console.error("Error loading " + s + ".");
      },
      onProgress: function(p, t, n) {
        console.log("LOADED " + t + " : " + n + " ( " + p.loaded + " / " + p.total + " ).");
        return progressbar.style.width = "" + (p.loaded / p.total * 100) + "%";
      }
    });
  };

    hello.remoteEvents.on('hexglplay', function() {
        if ($('step-2').style.display === 'block') {
            $('step-2').style.display = 'none';
            $('step-3').style.display = 'block';
            return init(1, 3, 1, 1);
        }
    });

    hello.remoteEvents.on('hexglrestart', function() {
        return window.location.reload();
    });

  hasWebGL = function() {
    var canvas, gl;
    gl = null;
    canvas = document.createElement('canvas');
    try {
      gl = canvas.getContext("webgl");
    } catch (_error) {}
    if (gl == null) {
      try {
        gl = canvas.getContext("experimental-webgl");
      } catch (_error) {}
    }
    return gl != null;
  };

  if (!hasWebGL()) {
    getWebGL = $('start');
    getWebGL.innerHTML = 'WebGL is not supported!';
    getWebGL.onclick = function() {
      return window.location.href = 'http://get.webgl.org/';
    };
  } else {
      hello.remoteEvents.on('hexglplay', function() {
          if ($('step-1').offsetParent !== null) {
              $('step-1').style.display = 'none';
              $('step-2').style.display = 'block';
              return $('step-2').style.backgroundImage = "url(hexgl/css/help-" + 1 + ".png)";
          }
      });
  }

}).bind(this);
