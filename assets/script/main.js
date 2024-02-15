/*
  Copyright © 2023 Nesakko
  This work is free. You can redistribute it and/or modify it under the terms of the Do What The Fuck You Want To Public License, Version 2, as published by Sam Hocevar. See the LICENSE file for more details.
*/

// General stuff, which we could call something like "main" ¯\_(ツ)_/¯

document.addEventListener('DOMContentLoaded', function() {
  const switchElement = document.getElementById('toggleSwitch');
  const elements = document.querySelectorAll('.un');

  switchElement.addEventListener('change', function() {
    elements.forEach(function(element) {
      if (element.style.display === 'block') {
        element.style.display = 'none';
      } else {
        element.style.display = 'block';
      }
    });

    const linkSwitch = switchElement.checked ? 'on' : 'off';
    localStorage.setItem('linkSwitch', linkSwitch);
  });

  const storedlinkSwitch = localStorage.getItem('linkSwitch');
  if (storedlinkSwitch === 'on') {
    switchElement.checked = true;
    elements.forEach(function(element) {
    element.style.display = 'block';
  });
  }
});
