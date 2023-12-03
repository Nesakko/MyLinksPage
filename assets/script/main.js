document.addEventListener('DOMContentLoaded', function() {
  var switchElement = document.getElementById('toggleSwitch');
  var elements = document.querySelectorAll('.un');

  switchElement.addEventListener('change', function() {
    elements.forEach(function(element) {
      if (element.style.display === 'block') {
        element.style.display = 'none';
      } else {
        element.style.display = 'block';
      }
    });

    var switchState = switchElement.checked ? 'on' : 'off';
    localStorage.setItem('switchState', switchState);
  });

  var storedSwitchState = localStorage.getItem('switchState');
  if (storedSwitchState === 'on') {
    switchElement.checked = true;
    elements.forEach(function(element) {
    element.style.display = 'block';
  });
  }
});
