'use strict';
const timerData = '6 March 2020';

import countTimer from './modules/countTimer';
import burgerMen from './modules/burgerMen';
import togglePopUp from './modules/togglePopUp';
import anchorScroll from './modules/anchorScroll';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changeImg from './modules/changeImg';
import validForm from './modules/validForm';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

countTimer(timerData);
setInterval(countTimer, 1000, timerData);

// меню
burgerMen();

// popup
togglePopUp();
// Плавная прокрутка
anchorScroll();
// табы
tabs();
// слайдер
slider();
changeImg();

validForm(document.querySelectorAll('.form-phone'));
validForm(document.querySelectorAll('.form-name'));
validForm(document.querySelectorAll('.mess'));
// калькулятор

calc(100);

sendForm();
