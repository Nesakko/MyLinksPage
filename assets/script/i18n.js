/*
	Copyright © 2023 Nesakko
	This work is free. You can redistribute it and/or modify it under the terms of the Do What The Fuck You Want To Public License, Version 2, as published by Sam Hocevar. See the LICENCE file for more details.
*/

// To be honest, thanks AI for some help (for translation and part of the code) ^^'\

// Translation and language menu

document.addEventListener('DOMContentLoaded', function() {
	const selectedOption = document.getElementById('selectedL');
	const options = document.querySelector('.selLang');
  const dropLang = document.querySelector('.dropLang');

	const languageData = {
    bg: 'Български',
    br: 'Brezhoneg',
    ca: 'Català',
    cs: 'Čeština',
    da: 'Dansk',
    de: 'Deutsch',
    el: 'Ελληνικά',
    en: 'English',
    eo: 'Esperanto',
    es: 'Español',
    et: 'Eesti',
    fi: 'Suomi',
    fr: 'Français',
    hu: 'Magyar',
    jp: '日本語',
    ko: '한국어',
    lt: 'Lietuvių',
    nl: 'Nederlands',
    pl: 'Polski',
    pt: 'Português',
    ro: 'Română',
    ru: 'Русский',
    sv: 'Svenska',
    uk: 'Українська',
    zh: '中文'
	};

	function updateContent(data) {
    const elementsToTranslate = document.querySelectorAll('[data-i18n]');
    elementsToTranslate.forEach(element => {
      const key = element.dataset.i18n;
      if (data[key]) {
        element.textContent = data[key];
      }
    });
	}

	function loadLanguage(lang) {
    fetch(`./assets/i18n/${lang}.json`)
      .then(response => response.json())
      .then(data => {
        updateContent(data);
        localStorage.setItem('preferredLang', lang);
        document.documentElement.lang = lang;
      })
      .catch(error => console.error('Error fetching language file:', error));
	}

	function toggleOptions() {
    options.style.display = (options.style.display === 'block') ? 'none' : 'block';
	}

	dropLang.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleOptions();
	});

	options.addEventListener('click', function(e) {
    e.stopPropagation();
    if (e.target.classList.contains('optLang')) {
      const selectedLang = e.target.getAttribute('idLang');
      loadLanguage(selectedLang);
      localStorage.setItem('preferredLang', selectedLang);
      selectedOption.textContent = languageData[selectedLang];
      options.style.display = 'none';
    }
	});

  document.addEventListener('click', function() {
    if (options.style.display === 'block') {
      options.style.display = 'none';
    }
  })

	const userLang = navigator.language.substring(0, 2);
	const supportedLanguages = Object.keys(languageData);
	const preferredLang = supportedLanguages.includes(userLang) ? userLang : 'en';

	const storedLang = localStorage.getItem('preferredLang');
	loadLanguage(storedLang || preferredLang);
	selectedOption.textContent = languageData[storedLang] || languageData[preferredLang];
});
