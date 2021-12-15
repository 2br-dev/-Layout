"use strict";

var p, heroes, authors, members, possibilities;
var observer;
var authorsTop, authorsBottom;
var membersTop, membersBottom;
var parallax;
var parallaxTrigger;
var parallaxAnimating;
var observer;
var parallaxObserver;
$(function () {
  $(window).on('scroll', enableParticles);
  $(window).scrollEnd(function () {
    if (p && isVisible(document.querySelector('#canvas-wrapper'))) p.start();
  });
  init();
  $('body').on('click', '#send', sendMessage);
});

function sendMessage() {
  var form = $(this).parents('form');
  var formData = $(form).serialize();
  var modal = M.Modal.getInstance(form);

  if (formData) {
    M.toast({
      html: "Сообщение успешно отправлено!"
    });
    modal.close();
  }
}

function init() {
  $('.hyphen').hyphenate();
  initParticles();
  enableParticles();
  $('.lazy').lazy();
  $('.sidenav').sidenav();
  $('.modal').modal();
}

function enableParticles() {
  if (p) p.stop(); // Heroes

  var heroes = document.querySelector('#heroes');

  if (heroes) {
    heroes.setAttribute('class', 'grid-wrapper ' + (isVisible(heroes) ? 'visible' : 'invisible'));
  } // Authors


  var authors = document.querySelectorAll('.author');

  if (authors.length) {
    authors.forEach(function (author) {
      setTimeout(function () {
        author.setAttribute('class', 'author ' + (isVisible(author) ? 'visible' : 'invisible'));
      }, 300);
    });
  } // Possibilities


  var possibilities = document.querySelectorAll('.possibility');

  if (possibilities.length) {
    possibilities.forEach(function (possibility) {
      setTimeout(function () {
        possibility.setAttribute('class', 'possibility row flex ' + (isVisible(possibility) ? 'visible' : 'invisible'));
      }, 300);
    });
  } // Parallax


  var parallax = document.querySelector('.parallax');

  if (parallax) {
    // if(isVisible(parallax))
    $('.parallax').parallax();
  } // Facts lazy


  var lazy = document.querySelectorAll('#facts .col .lazy');

  if (lazy.length) {
    lazy.forEach(function (image) {
      var className = "";

      if (isInViewport(image)) {
        className = 'lazy visible';
      }

      if (!isVisible(image)) {
        className = 'lazy invisible';
      }

      image.setAttribute('class', 'lazy ' + className);
    });
  }
}

function initParticles() {
  var colorTop = Math2.rgbToHex('rgb(0,0,0)');
  var topImageMouseData = new ParticleData("/img/LogoDoMurashek_top.png", 5, .2, 0, colorTop, 2, .2, false);
  var topImageWaveData1 = new ParticleData("/img/LogoDoMurashek_top.png", 5, .2, 0, colorTop, 2, .2, false);
  var topImageWaveData2 = new ParticleData("/img/LogoDoMurashek_top.png", 5, .2, 0, colorTop, 2, .2, true);

  if ($('#canvas-wrapper').length) {
    p = new ParticlesApp(1750, 330, 'canvas', '#canvas-wrapper', [topImageWaveData1, topImageWaveData2, topImageMouseData], null, null, 100, 10);
    setTimeout(function () {
      p.start();
    }, 200);
  }
}

$.fn.scrollEnd = function (callback, timeout) {
  $(this).on('scroll', function () {
    var $this = $(this);

    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }

    $this.data('scrollTimeout', setTimeout(callback, timeout));
  });
};

$.fn.parallax = function () {
  return $(this).each(function () {
    var current = $(this).offset().top - $(window).scrollTop();
    var min = 0;
    var max = window.innerHeight - this.parentElement.offsetHeight;
    var percent = (current - max) / (min - max);
    var speed = 20;
    var ratio = window.innerWidth / window.innerHeight;
    var position = percent * speed - (ratio - .5) * 10;
    $(this).css("transform", "translateY( calc(" + position + "% - 60px))");
  });
};

var isInViewport = function isInViewport(elem) {
  var bounding = elem.getBoundingClientRect();
  return bounding.top >= 0 && bounding.left >= 0 && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) && bounding.right <= (window.innerWidth || document.documentElement.clientWidth);
};

function isVisible(ele) {
  var _ele$getBoundingClien = ele.getBoundingClientRect(),
      top = _ele$getBoundingClien.top,
      bottom = _ele$getBoundingClien.bottom;

  var vHeight = window.innerHeight || document.documentElement.clientHeight;
  return (top > 0 || bottom > 0) && top < vHeight;
}
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var p; // Необходимые математические функции

var Math2 = {
  random: function random(t, n) {
    return Math.random() * (n - t) + t;
  },
  map: function map(t, n, r, a, o) {
    return (o - a) * ((t - n) / (r - n)) + a;
  },
  randomPlusMinus: function randomPlusMinus(t) {
    return t = t ? t : .5, Math.random() > t ? -1 : 1;
  },
  randomInt: function randomInt(t, n) {
    return n += 1, Math.floor(Math.random() * (n - t) + t);
  },
  randomBool: function randomBool(t) {
    return t = t ? t : .5, Math.random() < t ? !0 : !1;
  },
  degToRad: function degToRad(t) {
    return rad = t * Math.PI / 180, rad;
  },
  radToDeg: function radToDeg(t) {
    return rad = t * Math.PI / 180, rad;
  },
  rgbToHex: function rgbToHex(t) {
    function n(t) {
      return ("0" + parseInt(t).toString(16)).slice(-2);
    }

    t = t.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    var r = n(t[1]) + n(t[2]) + n(t[3]);
    return parseInt('0X' + r.toUpperCase());
  },
  distance: function distance(t, n, r, a) {
    return Math.sqrt((r - t) * (r - t) + (a - n) * (a - n));
  }
};

var ParticlesApp = /*#__PURE__*/function () {
  // Параметры, задаваемые настройками
  //Ширина холста
  //Высота холста
  //Контейнер
  //Прозрачность сцены
  //Цвет сцены (если не прозрачная)
  //Данные картинок (массив экземпляров класса ParticleData)
  //Радиус взаимодействия (px)
  // Умножитель скорости волны
  // Внутренние переменные
  //HTMLCanvasElement
  //PIXIRenderer
  //PIXIStage
  // Позиция "волны"
  // Расположение курсора
  // Масштаб

  /**
   * 
   * @param {*} canvasWidth Ширина холста
   * @param {*} canvasHeight Высота холста
   * @param {*} canvasID ID холста
   * @param {*} container селектор контейнера холста
   * @param {*} stageColor цвет сцены
   * @param {*} stageTransparent прозрачность сцены
   * @param {*} particleData данные картинок
   */
  function ParticlesApp(canvasWidth, canvasHeight, canvasID, container, _particleData) {
    var _this = this;

    var stageColor = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    var stageTransparent = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
    var interactionRadius = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 120;
    var waveSpeedMultiplier = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 5;

    _classCallCheck(this, ParticlesApp);

    _defineProperty(this, "canvasWidth", void 0);

    _defineProperty(this, "canvasHeight", void 0);

    _defineProperty(this, "container", void 0);

    _defineProperty(this, "stageTransparent", true);

    _defineProperty(this, "stageColor", 0XCCCCCC);

    _defineProperty(this, "particleData", []);

    _defineProperty(this, "interactionRadius", 120);

    _defineProperty(this, "waveSpeedMultiplier", void 0);

    _defineProperty(this, "canvasEl", void 0);

    _defineProperty(this, "renderer", void 0);

    _defineProperty(this, "stage", void 0);

    _defineProperty(this, "waveX", -400);

    _defineProperty(this, "mousePos", {
      x: 0,
      y: 0
    });

    _defineProperty(this, "scale", 1);

    _defineProperty(this, "isplaying", true);

    _defineProperty(this, "canvas_init", function () {
      _this.canvasEl = document.createElement('canvas'), {
        width: _this.canvasWidth,
        height: _this.canvasHeight
      };
      _this.renderer = new PIXI.autoDetectRenderer(_this.canvasWidth, _this.canvasHeight, {
        transparent: true
      });
      _this.container.appendChild(_this.renderer.view).id = _this.canvasID;
      _this.stage = new PIXI.Stage(_this.stageColor);
    });

    _defineProperty(this, "updateCursor", function (e) {
      e = e || window.event;
      var canvas = document.querySelector('#' + _this.canvasID);
      var rect = canvas.getBoundingClientRect();
      var percentX = e.pageX / (window.innerWidth - rect.left / 2);
      var percentY = e.pageY / (window.innerHeight - rect.top / 2);
      _this.mousePos = {
        x: _this.canvasWidth * percentX,
        y: _this.canvasHeight * percentY
      };
    });

    _defineProperty(this, "placeParticles", function (particleData) {
      var imageObj = new Image(); // Корректировка с учётом масштаба;

      var canvas = document.querySelector('#' + _this.canvasID);

      imageObj.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = this.base.canvasWidth;
        canvas.height = this.base.canvasHeight;
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height); // Отрисовка изображения

        context.drawImage(this.image, 0, 0, canvas.width, canvas.height); // Считывание данных холста

        var imageData = context.getImageData(0, 0, canvas.width, canvas.width);
        var data = imageData.data; // Цикл по точкам

        for (var i = 0; i < imageData.height; i += this.particleInfo.particleDensity) {
          for (var j = 0; j < imageData.width; j += this.particleInfo.particleDensity) {
            // Получение цвета пикселя
            var color = data[j * (imageData.width * 4) + i * 4 - 1];

            if (color === 255) {
              var p = this.base.particle(this.particleInfo.particleColor, this.particleInfo.particleAlphaAmplitude, this.particleInfo.particleRadiusAmplitude, this.particleInfo.movementRadius, this.particleInfo.movementSpeed);
              p.setPosition(i, j);
              this.particleInfo.particles.push(p);
              this.base.stage.addChild(p);
            }
          }
        }
      }.bind({
        base: _this,
        image: imageObj,
        particleInfo: particleData
      });

      imageObj.src = particleData.imageUrl;
    });

    _defineProperty(this, "particle", function (particleColor, particleAlphaAmplitude, particleRadiusAmplitude, movementRadius, movementSpeed) {
      var $this = new PIXI.Graphics();
      $this.beginFill(particleColor);
      var radius;
      $this.radius = radius = Math.random() * 3;
      $this.drawCircle(0, 0, radius);
      $this.size = radius;
      $this.movementRadius = movementRadius;
      $this.movementSpeed = movementSpeed;
      $this.x = -$this.width;
      $this.y = -$this.height;
      $this.free = false;
      $this.timer = Math2.randomInt(0, 100);
      $this.v = Math2.random(particleRadiusAmplitude, 1) * Math2.randomPlusMinus();
      $this.hovered = false;
      $this.alpha = Math2.randomInt(particleAlphaAmplitude, 100) / 100;

      $this.setPosition = function (x, y) {
        $this.x = x;
        $this.y = y;
      };

      return $this;
    });

    _defineProperty(this, "update", function () {
      if (!_this.isplaying) {
        return;
      }

      _this.renderer.render(_this.stage);

      _this.waveX += _this.waveSpeedMultiplier;

      if (_this.waveX >= 5000) {
        _this.waveX = -400;
      }

      _this.particleData.forEach(function (data) {
        data.particles.forEach(function (p) {
          var m = _this.mousePos;
          var ir = _this.interactionRadius;
          var coords;
          var fixedPos = {
            x: _this.waveX,
            y: _this.canvasHeight / 2
          };

          if (data.isInteractive) {
            coords = m;
          } else {
            coords = fixedPos;
          }

          p.scale.x = p.scale.y = Math.max(Math.min(4 - Math2.distance(p.x, p.y, coords.x, coords.y) / ir, ir), 1);
          p.x += Math.sin(p.timer * (1 * p.movementSpeed)) * (p.movementRadius * p.movementSpeed);
          p.y += Math.cos(p.timer * (1 * p.movementSpeed)) * (p.movementRadius * p.movementSpeed);
          p.timer += p.v;
        });
      });

      window.requestAnimationFrame(_this.update);
    });

    // Инициализация свойств
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.canvasID = canvasID;
    this.container = document.querySelector(container);
    this.stageTransparent = !stageTransparent ? this.stageTransparent : stageTransparent;
    this.stageColor = !stageColor ? this.stageColor : stageColor;
    this.particleData = !_particleData ? this.particleData : _particleData;
    this.interactionRadius = !interactionRadius ? this.interactionRadius : interactionRadius;
    this.waveSpeedMultiplier = waveSpeedMultiplier; // Запуск инициализации холста

    this.canvas_init();
    var canvasElement = document.querySelector('#' + this.canvasID);
    this.scale = canvasElement.clientWidth / this.canvasWidth;
    window.onmousemove = this.updateCursor;

    window.onresize = function () {
      _this.particleData.forEach(function (data) {
        while (_this.stage.children[0]) {
          _this.stage.removeChild(_this.stage.children[0]);
        }

        data.particles = [];
        var canvasElement = document.querySelector('#' + _this.canvasID);
        _this.scale = canvasElement.clientWidth / _this.canvasWidth;

        _this.placeParticles(data);
      });
    }; // Размещение изображения и частиц на нём


    this.particleData.forEach(function (data) {
      _this.placeParticles(data);
    });
    this.update();
  } // Инициализация холста


  _createClass(ParticlesApp, [{
    key: "stop",
    value: function stop() {
      this.isplaying = false;
    }
  }, {
    key: "start",
    value: function start() {
      this.isplaying = true;
      this.update();
    }
  }]);

  return ParticlesApp;
}();

var ParticleData = // Амплитуда радиуса (0….5…1)
//Цвет частиц
//Амплитуда прозрачности частиц (0…50…100)

/**
 * 
 * @imageUrl URL картинки
 * @particleDensity плотность частиц
 * @particleRadiusAmplitude амплитуда радиуса частиц
 * @particleAlphaAmplitude амплитуда прозрачности частиц
 * @particleColor цвет частиц
 * @movementRadius радиус окружности по которой идёт движение частиц
 * @movementSpeed скорость движения частиц
 * @isInteractive Интерактивность системы частиц
 */
function ParticleData(imageUrl, particleDensity, particleRadiusAmplitude, particleAlphaAmplitude, particleColor, movementRadius, movementSpeed) {
  var isInteractive = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;

  _classCallCheck(this, ParticleData);

  _defineProperty(this, "imageUrl", void 0);

  _defineProperty(this, "particleDensity", void 0);

  _defineProperty(this, "particleRadiusAmplitude", .5);

  _defineProperty(this, "particleColor", 0XFFFFFF);

  _defineProperty(this, "particleAlphaAmplitude", 0);

  _defineProperty(this, "imageData", void 0);

  _defineProperty(this, "particles", []);

  _defineProperty(this, "movementRadius", void 0);

  _defineProperty(this, "movementSpeed", void 0);

  _defineProperty(this, "isInteractive", void 0);

  this.imageUrl = imageUrl ? imageUrl : this.imageUrl;
  this.particleDensity = particleDensity ? particleDensity : this.particleDensity;
  this.particleRadiusAmplitude = particleRadiusAmplitude ? particleRadiusAmplitude : this.particleRadiusAmplitude;
  this.particleAlphaAmplitude = particleAlphaAmplitude ? particleAlphaAmplitude : this.particleAlphaAmplitude;
  this.particleColor = particleColor ? particleColor : this.particleColor;
  this.movementRadius = movementRadius ? movementRadius : this.movementRadius;
  this.movementSpeed = movementSpeed ? movementSpeed : this.movementSpeed;
  this.isInteractive = isInteractive;
};