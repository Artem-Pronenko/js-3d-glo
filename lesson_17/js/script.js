//
'use strict';
window.addEventListener('DOMContentLoaded', () => {
	let timerHours = document.querySelector('#timer-hours'),
		timerMinutes = document.querySelector('#timer-minutes'),
		timerSeconds = document.querySelector('#timer-seconds'),
		timerData = '23 february 2020';

	// Добавления 0 в таймер если число имеет длинну 1
	function addZero(number) {
		number += '';
		return (number.length === 1) ? number = '0' + number : number;
	}

	function countTimer(deadline) {
		// если дедлайн истек - вывести 0
		function timeEnd(timer) {
			return (timer.timeRemaining < 0) ? {
				timeRemaining: timer.timeRemaining,
				hours: 0,
				minutes: 0,
				seconds: 0
			} : timer;
		}

		function getTimeRemaining() {
			let dateStop = new Date(deadline).getTime(),
				dateNow = new Date().getTime(),
				timeRemaining = (dateStop - dateNow) / 1000,
				seconds = Math.floor(timeRemaining % 60),
				minutes = Math.floor((timeRemaining / 60) % 60),
				hours = Math.floor(timeRemaining / 60 / 60);
			return timeEnd({timeRemaining, hours, minutes, seconds});
		}

		function updateClock() {
			const timer = getTimeRemaining();

			timerHours.textContent = addZero(timer.hours);
			timerMinutes.textContent = addZero(timer.minutes);
			timerSeconds.textContent = addZero(timer.seconds);

		}

		updateClock();
	}

	countTimer(timerData);
	setInterval(countTimer, 1000, timerData)

});


