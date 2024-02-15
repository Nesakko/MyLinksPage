/*
  Copyright © 2023 Nesakko
  This work is free. You can redistribute it and/or modify it under the terms of the Do What The Fuck You Want To Public License, Version 2, as published by Sam Hocevar. See the LICENSE file for more details.
*/

// interactions and elements related to gamepad usage

const li = Array.from(document.querySelectorAll('.l a'));
const src = document.querySelector("src");
const ctrl = document.getElementById("ctrl");
let activeIndex = -1;
let btnP = false;
let ctrlA = true;
let prevAction = 0;
let actionInterval = 175;

window.addEventListener('gamepadconnected', (e) => {
  const gp = e.gamepad;
  if (gp.index === 0){
    window.requestAnimationFrame(checkGamepad);
  }
  console.info("Gamepad connected : " + gp.id);
  ctrl.innerHTML = '<p>Up/Down : Navigation</p><p>A : Open</p><p>X : Open in new tab</p><p>B : Cancel selection</p>';
});

window.addEventListener('gamepaddisconnected', (e) => {
  console.info('Gamepad disconnected');
  rmActive();
});

document.addEventListener('click', function() {
  rmActive();
  hideCTRL();
});

document.addEventListener('keydown', function(e) {
  if (e.defaultPrevented) { return }
  rmActive();
  hideCTRL();
});

// Gamepad controls 
function handleGamepadInput(e){
  const now = performance.now();
  const action = now - prevAction;

  if (action < actionInterval) {
    return;
  }

  const axes = e.gamepad.axes;
  const lY = axes[1];

  const b = e.gamepad.buttons;
  const up = b[12].pressed;
  const down = b[13].pressed;
  const A = b[0].pressed;
  const B = b[1].pressed;
  const X = b[2].pressed;
  const start = b[9].pressed;

  if (up) {navUp();}
  else if (lY < -0.33) {navUp();}
  else if (down){navDown();}
  else if (lY > 0.33) {navDown();}
  else if (A){openActive();}
  else if (B){rmActive();console.info("Selection canceled");}
  else if (X){newTab();console.info("Opened in new tab");}
  else if (start){getSource();}
  else {btnP = false;}

  prevAction = now;
}
// ----

function checkGamepad() {
  const gamepad = navigator.getGamepads()[0];
  if (gamepad){
    handleGamepadInput({ gamepad });}
  window.requestAnimationFrame(checkGamepad);
}

function setActive(index) {
  li.forEach((link, i) => {
    if (i === index) {
      link.focus();
      showCTRL();
    }
    else {
      link.classList.remove('active');
    }
  });
}

function rmActive() {
  for (let i = 0; i < li.length; i++) {
    li[i].classList.remove('active');
  }
}

function showCTRL(){
  ctrl.style.opacity= '1';
  ctrlA = true;
}

function hideCTRL(){
  ctrl.style.opacity= '0';
  ctrlA = false;
}

function navUp(){
    activeIndex = (activeIndex - 1 + li.length) % li.length;
    setActive(activeIndex);
    console.info(activeIndex);
}

function navDown(){
    activeIndex = (activeIndex + 1 ) % li.length;
    setActive(activeIndex);
    console.info(activeIndex);
}

function openActive(){
  if (!btnP){
    li[activeIndex].click();
    btnP = true;
  }
}

function getSource(){
  if (!btnP){
    const href = document.querySelector(".src").getAttribute('href');
    window.open(href);
    btnP = true;
  }
}

function newTab() {
  if (!btnP) {
    const href = li[activeIndex].getAttribute('href');
    window.open(href, '_blank');
    btnP = true;
  }
}
