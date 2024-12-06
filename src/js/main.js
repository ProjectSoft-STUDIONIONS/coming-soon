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
	});
	init();
}());
/**
<a href="https://github.com/ProjectSoft-STUDIONIONS/radioApp-lite/releases/latest/download/YourRadioLightSetup.exe" download="YourRadioLightSetup.exe" target="_blank">
	<img src="https://img.shields.io/github/downloads/ProjectSoft-STUDIONIONS/radioApp-lite/total?style=for-the-badge&amp;color=%2397ca00&amp;label=СКАЧАТЬ" alt="Download YourRadioLightSetup.exe">
</a>
**/