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

export default changeImg;