//
'use strict';

function showData() {
	const data = new Date(),
		hours = data.getHours(),
		newYear = new Date(data.getFullYear() + 1, 0, 1, 0, 0, 0),
		out1 = document.querySelector('.out_1'),
		out2 = document.querySelector('.out_2'),
		out3 = document.querySelector('.out_3'),
		out4 = document.querySelector('.out_4'),
		weekday = data.toLocaleString("ru", {weekday: 'long'});
	// Добрый день (утро, вечер, ночь в зависимости от времени суток)
	if (hours >= 5 && hours <= 9)
		out1.textContent = `Доброе утро`;
	else if (hours >= 10 && hours <= 15)
		out1.textContent = `Добрый день`;
	else if (hours >= 16 && hours <= 18)
		out1.textContent = `Добрый вечер`;
	else {
		out1.textContent = `Доброй ночи`;
	}
	out2.textContent = `сегодня ${weekday}`;
	// Текущее время:12:05:15 PM
	out3.textContent = `Текущее время ${data.toLocaleTimeString('en')}`;
	// До нового года осталось 175 дней
	out4.textContent = `До нового года осталось ${Math.floor((newYear.getTime() - data.getTime()) / 86400000)} дней`;
}

showData();
setInterval(showData, 1000);






