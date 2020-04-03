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

export default togglePopUp;