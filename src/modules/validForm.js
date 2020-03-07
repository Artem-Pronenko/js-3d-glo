const validForm = (input) => {
	input.forEach(item => {
		item.addEventListener('input', () => {
			const inputValue = item.value;
			if (item.classList.contains('form-phone')) {
				item.value = inputValue.replace(/^\+[^0-9]/, '');
			} else if (item.classList.contains('form-name') || item.classList.contains('mess')) {
				item.value = inputValue.replace(/[^а-яё ]/i, '');
			}
		});
	});

	// валидация калькулятора
	const calcItem = document.querySelectorAll('.calc-item');
	calcItem.forEach(item => {
		item.addEventListener('input', () => {
			const inputValue = item.value;
			item.value = inputValue.replace(/^\W/i, '');
		});
	});

};

export default validForm;