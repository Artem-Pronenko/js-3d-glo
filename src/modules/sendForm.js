const sendForm = () => {
	const errorMessage = 'Что-то пошло не так...',
		loadMessage = 'Загрузка...',
		successMessage = 'Спасибо! Мы скоро с вами свяжемся!',
		form = document.querySelectorAll('form'),
		statusMessage = document.createElement('div');
	let dataWidth = 0, dataInterval;

	const dataAnimate = () => {
		dataInterval = requestAnimationFrame(dataAnimate);
		if (dataWidth < 350) {
			dataWidth += 5;
			statusMessage.style.width = dataWidth + 'px';
		} else {
			cancelAnimationFrame(dataInterval);
			return false;
		}
	};

	form.forEach(item => {
		item.addEventListener('submit', (event) => {
			processingForm(event, item)
		});
	});

	const processingForm = (event, item) => {
		event.preventDefault();
		document.body.appendChild(statusMessage);
		statusMessage.textContent = loadMessage;
		const formData = new FormData(item);
		let body = {};
		for (let value of formData.entries()) body[value[0]] = value[1];
		item.querySelectorAll('input').forEach(item => item.value = '');

		postData(body)
			.then((response) => {
				if (response.status !== 200) {
					throw new Error('status network not 200');
				}
				statusMessage.classList.add('show-modal-data');
				statusMessage.textContent = successMessage;
				dataInterval = requestAnimationFrame(dataAnimate)

			})
			.catch(error => {
				statusMessage.classList.add('show-modal-data');
				statusMessage.textContent = errorMessage;
				dataInterval = requestAnimationFrame(dataAnimate);
				console.log(error);
			})
			.finally(() => setTimeout(() => statusMessage.remove(), 6000))
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