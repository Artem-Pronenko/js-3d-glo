const sendForm = () => {
	const errorMessage = 'Что-то пошло не так...',
		loadMessage = 'Загрузка...',
		successMessage = 'Спасибо! Мы скоро с вами свяжемся!',
		form = document.querySelectorAll('form'),
		statusMessage = document.createElement('div');

	form.forEach(item => {
		item.addEventListener('submit', (event) => {
			processingForm(event, item)
		});
	});

	const processingForm = (event, item) => {
		event.preventDefault();
		item.appendChild(statusMessage);
		statusMessage.textContent = loadMessage;
		statusMessage.style.color = '#fff';
		const formData = new FormData(item);
		let body = {};
		for (let value of formData.entries()) body[value[0]] = value[1];
		item.querySelectorAll('input').forEach(item => item.value = '');

		postData(body)
			.then((response) => {
				if (response.status !== 200) {
					throw new Error('status network not 200');
				}
				statusMessage.textContent = successMessage;
			})
			.catch(error => {
				statusMessage.textContent = errorMessage;
				console.log(error);
			})
	};

	const postData = (body) => {
		return fetch('./server.php', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(body)

		});

	};

};

export default sendForm;