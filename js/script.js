//
'use strict';
window.addEventListener('DOMContentLoaded', () => {
	const timerHours = document.querySelector('#timer-hours'),
		timerMinutes = document.querySelector('#timer-minutes'),
		timerSeconds = document.querySelector('#timer-seconds'),
		timerData = '27 february 2020',
		btnMenu = document.querySelector('.menu'),
		body = document.getElementsByTagName('body')[0],
		menu = document.querySelector('menu');


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
	setInterval(countTimer, 1000, timerData);

	// меню
	const toggleMenu = () => menu.classList.toggle('active-menu');

	// 														Обязательное
	// menu.addEventListener('click', evt => {
	// 	let {target} = evt;
	// 	target.classList.contains('close-btn') ? toggleMenu() : false;
	// 	target.tagName === 'A' ? toggleMenu() : false;
	// });

	// btnMenu.addEventListener('click', toggleMenu);

	//																	Усложненное
	body.addEventListener('click', ev => {
		const target = ev.target;

      if (target.matches('.close-btn, a, .menu') || target.closest('.menu')) {
			toggleMenu();
      } else if (!target.closest('menu') && menu.classList.contains('active-menu')) {
			toggleMenu();
		}
		
	});
	


	// popup
	const togglePopUp = () => {
		const popup = document.querySelector('.popup'),
			popupBtn = document.querySelectorAll('.popup-btn'),
			popupContent = document.querySelector('.popup-content');
		const animationPopUp = () => {
			if (window.innerWidth > 768) {
				popupContent.style.transition = 'opacity .4s';
				popupContent.style.opacity = '0';

				setTimeout(() => popupContent.style.opacity = '1', 10);
			}
		};

		popupBtn.forEach(item => item.addEventListener('click', () => {
			popup.style.display = 'block';
			animationPopUp();
		}));

		popup.addEventListener('click', evt => {
			let {target} = evt;

			if (target.classList.contains('popup-close')) {
				popup.style.display = 'none';
			} else {
				target = target.closest('.popup-content');
				!target ? popup.style.display = 'none' : false;
			}

		});

	};
	togglePopUp();

	// Плавная прокрутка
	const anchors = document.querySelectorAll('a[href^="#"]');
	for (let anchor of anchors) {
		anchor.addEventListener('click', e => {
			e.preventDefault();
			const blockId = anchor.getAttribute('href');
			document.querySelector('' + blockId).scrollIntoView({behavior: 'smooth', block: "start"});
		});
	}

	// табы
	const tabs = () => {
		const tabHeader = document.querySelector('.service-header'),
			tab = tabHeader.querySelectorAll('.service-header-tab'),
			tabContent = document.querySelectorAll('.service-tab');

		const toggleTabContent = index => {
			for (let i = 0; i < tabContent.length; i++) {
				if (index === i) {
					tab[i].classList.add('active');
					tabContent[i].classList.remove('d-none');
				} else {
					tab[i].classList.remove('active');
					tabContent[i].classList.add('d-none');
				}
			}
		};

		tabHeader.addEventListener('click', evt => {
			let {target} = evt;
			target = target.closest('.service-header-tab');

			if (target.classList.contains('service-header-tab')) {
				tab.forEach((item, i) => {
					if (target === item) {
						toggleTabContent(i);
					}
				});
			}

		});


	};
	tabs();


});


