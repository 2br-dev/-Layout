var p, heroes, authors, members, possibilities;
var observer;
var authorsTop, authorsBottom;
var membersTop, membersBottom;
var parallax;
var parallaxTrigger;
var parallaxAnimating;
var observer;
var parallaxObserver;


$(() => {
	$(window).on('scroll', enableParticles);
	$(window).scrollEnd(() => { 
		if(p && isVisible(document.querySelector('#canvas-wrapper')))
			p.start(); 
	});
	init();
	$('body').on('click', '#send', sendMessage);
});

function sendMessage(){

	let form = $(this).parents('form');
	let formData = $(form).serialize();
	let modal = M.Modal.getInstance(form);
	if(formData){
		M.toast({html: "Сообщение успешно отправлено!"});
		modal.close();
	}
}

function init(){

	$('.hyphen').hyphenate();
	initParticles();
	enableParticles();
	$('.lazy').lazy();
	$('.sidenav').sidenav();
	$('.modal').modal();

}

function enableParticles(){
	if(p)
		p.stop();

	// Heroes
	let heroes = document.querySelector('#heroes');
	if(heroes){
		heroes.setAttribute('class', 'grid-wrapper ' + (isVisible(heroes) ? 'visible' : 'invisible'));
	}

	// Authors
	let authors = document.querySelectorAll('.author');
	if(authors.length){
		authors.forEach(author => {
			setTimeout(() => {
				author.setAttribute('class', 'author ' + (isVisible(author) ? 'visible' : 'invisible'));
			}, 300);
		});
	}

	// Possibilities
	let possibilities = document.querySelectorAll('.possibility');
	if(possibilities.length){
		possibilities.forEach(possibility => {
			setTimeout(() => {
				possibility.setAttribute('class', 'possibility row flex ' + (isVisible(possibility) ? 'visible' : 'invisible'));
			}, 300);
		});
	}

	// Parallax
	let parallax = document.querySelector('.parallax');
	if(parallax){
		// if(isVisible(parallax))
			$('.parallax').parallax();
	}

	// Facts lazy
	let lazy = document.querySelectorAll('#facts .col .lazy');
	if(lazy.length){
		lazy.forEach(image => {
			let className = "";

			if(isInViewport(image)){
				className = 'lazy visible';
			}

			if(!isVisible(image)){
				className = 'lazy invisible'
			}

			image.setAttribute('class', 'lazy ' + className);
		})
	}
}

function initParticles(){
	
	var colorTop = Math2.rgbToHex('rgb(0,0,0)');

	var topImageMouseData = new ParticleData("/img/LogoDoMurashek_top.png", 5, .2, 0, colorTop, 2, .2, false);
	var topImageWaveData1 = new ParticleData("/img/LogoDoMurashek_top.png", 5, .2, 0, colorTop, 2, .2, false);
	var topImageWaveData2 = new ParticleData("/img/LogoDoMurashek_top.png", 5, .2, 0, colorTop, 2, .2, true);

	if($('#canvas-wrapper').length){

		p = new ParticlesApp(
			1750,
			330,
			'canvas', 
			'#canvas-wrapper',
			[topImageWaveData1, topImageWaveData2, topImageMouseData],
			null,
			null,
			100,
			10
		);

		setTimeout(() => {
			p.start();
		}, 200);
	}
}

$.fn.scrollEnd = function(callback, timeout) {          
	$(this).on('scroll', function(){
	  var $this = $(this);
	  if ($this.data('scrollTimeout')) {
		clearTimeout($this.data('scrollTimeout'));
	  }
	  $this.data('scrollTimeout', setTimeout(callback,timeout));
	});
};

  
$.fn.parallax=function(){
	return $(this).each(
		function(){

			let current = $(this).offset().top - $(window).scrollTop();
			let min = 0;
			let max = window.innerHeight - this.parentElement.offsetHeight;
			let percent = (current - max) / (min - max);
			let speed = 20;
			let ratio = window.innerWidth / window.innerHeight;
			let position = ((percent) * speed) - ((ratio - .5) * 10);

			$(this).css("transform","translateY( calc("+ position + "% - 60px))");
		}
	)
};

var isInViewport = function (elem) {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

function isVisible (ele) {
	const { top, bottom } = ele.getBoundingClientRect();
	const vHeight = (window.innerHeight || document.documentElement.clientHeight);
  
	return (
	  (top > 0 || bottom > 0) &&
	  top < vHeight
	);
  }