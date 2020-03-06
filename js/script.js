//
'use strict';
window.addEventListener('DOMContentLoaded', () => {
	const timerHours = document.querySelector('#timer-hours'),
		timerMinutes = document.querySelector('#timer-minutes'),
		timerSeconds = document.querySelector('#timer-seconds'),
		timerData = '28 february 2020',
		btnMenu = document.querySelector('.menu'),
		body = document.body,
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


	// слайдер
	const slider = () => {
		const slide = document.querySelectorAll('.portfolio-item'),
			slider = document.querySelector('.portfolio-content');
		let currentSlide = 0, interval;

		const addDot = () => {
			const portfolioDots = document.querySelector('.portfolio-dots');
			for (let i = 0; i < slide.length; i++) {
				const dot = document.createElement('li');
				dot.classList.add('dot');
				portfolioDots.appendChild(dot);
			}
		};
		addDot();
		const dot = document.querySelectorAll('.dot');
		dot[0].classList.add('dot-active');

		const prevSlide = (element, index, strClass) => {
			element[index].classList.remove(strClass);
		};

		const nextSlide = (element, index, strClass) => {
			element[index].classList.add(strClass);
		};

		const autoPlaySlide = () => {
			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');
			currentSlide++;
			if (currentSlide >= slide.length) currentSlide = 0;
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		};

		const startSlide = (time = 2000) => {
			interval = setInterval(autoPlaySlide, time);
		};

		const stopSlide = () => {
			clearInterval(interval);
		};

		slider.addEventListener('click', evt => {
			const {target} = evt;

			if (!target.matches('.portfolio-btn, .dot')) return false;

			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');

			if (target.matches('#arrow-right')) {
				currentSlide++;
			} else if (target.matches('#arrow-left')) {
				currentSlide--;
			} else if (target.matches('.dot')) {
				dot.forEach((item, index) => {
					if (item === target) currentSlide = index;
				});
			}
			if (currentSlide >= slide.length) currentSlide = 0;
			if (currentSlide < 0) currentSlide = currentSlide = slide.length - 1;

			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');

		});

		slider.addEventListener('mouseover', event => {
			const {target} = event;
			if (target.matches('.portfolio-btn') || target.matches('.dot')) stopSlide();
		});
		slider.addEventListener('mouseout', event => {
			const {target} = event;
			if (target.matches('.portfolio-btn') || target.matches('.dot')) startSlide();
		});

		startSlide(2000);

	};
	slider();


	const changeImg = () => {
		const commandPhotos = document.querySelectorAll('.command__photo');
		let imgSrc;

		commandPhotos.forEach(item => {
			item.addEventListener('mouseover', () => {
				imgSrc = item.src;
				item.src = item.dataset.img;
			});
			item.addEventListener('mouseleave', () => item.src = imgSrc);
		});

	};
	changeImg();


	const validateCalc = () => {
		const calcItem = document.querySelectorAll('.calc-item');

		calcItem.forEach(item => {
			item.addEventListener('input', () => {
				const inputValue = item.value;
				item.value = inputValue.replace(/^\W/i, '');
			});
		});

	};
	validateCalc();

	// калькулятор
	const calc = (price = 100) => {
		const calcBlock = document.querySelector('.calc-block'),
			calcType = document.querySelector('.calc-type'),
			calcSquare = document.querySelector('.calc-square'),
			calcCount = document.querySelector('.calc-count'),
			calcDay = document.querySelector('.calc-day'),
			totalValue = document.querySelector('#total');
		let total = 0;
		const countSum = (newTotal) => {
			let
				countValue = 1,
				dayValue = 1;
			const typeValue = calcType.options[calcType.selectedIndex].value,
				squareValue = +calcSquare.value;

			if (calcCount.value > 1) countValue += (calcCount.value - 1) / 10;

			if (calcDay.value && calcDay.value < 5) {
				dayValue *= 2;
			} else if (calcDay.value && calcDay.value < 10) {
				dayValue *= 1.5;
			}

			if (typeValue && squareValue) total = Math.ceil(price * typeValue * squareValue * countValue * dayValue);

			setInterval(() => {
				if (newTotal < total) {
					newTotal++;
					totalValue.textContent = newTotal;
				} else if (newTotal > total) {
					newTotal--;
					totalValue.textContent = newTotal;
				}
			}, 0)
		};
		calcBlock.addEventListener('change', evt => {
			const {target} = evt;
			let newTotal = total;
			if (target === calcType || target === calcSquare ||
				target === calcCount || target === calcDay) {
				countSum(newTotal);
			}

		});

	};
	calc(100);


});


