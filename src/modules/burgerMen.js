const burgerMen = () => {
	const body = document.body,
		menu = document.querySelector('menu'),
		toggleMenu = () => menu.classList.toggle('active-menu');

	body.addEventListener('click', ev => {
		const target = ev.target;
		if (target.matches('.close-btn, a, .menu') || target.closest('.menu')) {
			toggleMenu();
		} else if (!target.closest('menu') && menu.classList.contains('active-menu')) {
			toggleMenu();
		}
	});
};

export default burgerMen;