(!function(){
	const ge = function(element) {
			return document.querySelector(element) || !1;
		},
		hourEl = ge('.hour svg'),
		minuteEl = ge('.minute svg'),
		secondEl = ge('.second svg'),
		preloader = ge('body .preloader'),
		init = function() {
			setInterval(ticktack, 50);
		},
		ticktack = function() {
			let date = new Date(),
				hour = date.getHours() % 12,
				minute = date.getMinutes(),
				second = date.getSeconds(),
				milisecond = date.getMilliseconds(),
				rotateHour = ((hour * 360) / 12) + ((minute * 30) / 60),
				rotateMinute = ((minute * 360) / 60) + ((second * 6) / 60),
				roteteSecond = ((second * 360) / 60) + ((milisecond * 6) / 1000);
			hourEl.style["transform"]   = 'rotate(' + rotateHour   + 'deg)';
			minuteEl.style["transform"] = 'rotate(' + rotateMinute + 'deg)';
			secondEl.style["transform"] = 'rotate(' + roteteSecond + 'deg)';
		};
	window.addEventListener('load', function(e) {
		preloader.classList.add('loading');
		setTimeout(() => {
			ge('body').classList.remove('load');
		}, 2000);
	});
	init();
}());