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

export default slider;