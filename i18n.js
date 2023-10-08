// Languages selector and translation stuff

document.addEventListener('DOMContentLoaded', function() {
  const langSelector = document.getElementById('ls');

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
    fetch(`i18n/${lang}.json`)
      .then(response => response.json())
      .then(data => {
        updateContent(data);
        localStorage.setItem('preferredLang', lang);
        document.documentElement.lang = lang;
      })
      .catch(error => console.error('Error fetching language file:', error));
}

  langSelector.addEventListener('change', function() {
    const selectedLang = this.value;
    loadLanguage(selectedLang);
  });

  const userLang = navigator.language.substring(0, 2);
  const supportedLanguages = ['en', 'fr', 'es', 'pt', 'ru', 'jp', 'eo', 'br', 'nl', 'de', 'zh', 'sv', 'pl', 'cs', 'hu', 'da', 'uk', 'ca', 'el', 'fi', 'bg', 'ro', 'lt', 'et', 'ko'];
  const preferredLang = supportedLanguages.includes(userLang) ? userLang : 'en'; 

  loadLanguage(preferredLang);
  langSelector.value = preferredLang;

});
