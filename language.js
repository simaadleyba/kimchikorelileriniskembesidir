(function () {
  const supportedLanguages = new Set(["en", "tr", "cn"]);
  const storageKey = "siteLanguage";
  const sharedCopy = {
    en: {
      "nav.latest": "LATEST",
      "nav.archive": "ARCHIVE",
      "nav.contact": "CONTACT",
      "nav.aria": "Primary navigation",
      "language.aria": "Language selector"
    },
    tr: {
      "nav.latest": "SON YAZI",
      "nav.archive": "ARŞİV",
      "nav.contact": "İLETİŞİM",
      "nav.aria": "Ana menü",
      "language.aria": "Dil seçimi"
    },
    cn: {
      "nav.latest": "最新",
      "nav.archive": "归档",
      "nav.contact": "联系",
      "nav.aria": "主导航",
      "language.aria": "语言选择"
    }
  };

  function getStoredLanguage() {
    try {
      const stored = window.localStorage.getItem(storageKey);
      return supportedLanguages.has(stored) ? stored : null;
    } catch (_error) {
      return null;
    }
  }

  function storeLanguage(language) {
    try {
      window.localStorage.setItem(storageKey, language);
    } catch (_error) {
      // The URL still preserves the choice when storage is unavailable.
    }
  }

  function getInitialLanguage() {
    const params = new URLSearchParams(window.location.search);
    if (params.has("lang")) {
      const requested = params.get("lang");
      return supportedLanguages.has(requested) ? requested : "en";
    }
    return getStoredLanguage() || "en";
  }

  function setDocumentLanguage(language) {
    document.documentElement.lang = language === "cn" ? "zh-CN" : language;
    document.body.dataset.currentLang = language;
  }

  function setCurrentUrlLanguage(language) {
    const url = new URL(window.location.href);
    if (language === "en") {
      url.searchParams.delete("lang");
    } else {
      url.searchParams.set("lang", language);
    }
    window.history.replaceState({}, "", url.pathname + url.search + url.hash);
  }

  function applyCopy(language, pageCopy) {
    const copy = Object.assign({}, sharedCopy[language], pageCopy[language] || {});
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = copy[element.dataset.i18n];
      if (typeof value === "string") element.textContent = value;
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      const value = copy[element.dataset.i18nAriaLabel];
      if (typeof value === "string") element.setAttribute("aria-label", value);
    });
  }

  function updateLanguageButtons(language) {
    document.querySelectorAll("[data-lang-switch]").forEach((button) => {
      const selected = button.dataset.langSwitch === language;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  }

  function updateLocalizedLinks(language) {
    document.querySelectorAll("[data-language-link]").forEach((link) => {
      if (!link.dataset.languageBaseHref) {
        link.dataset.languageBaseHref = link.getAttribute("href");
      }
      const baseHref = link.dataset.languageBaseHref;
      if (!baseHref || baseHref.startsWith("#") || baseHref.startsWith("mailto:")) return;

      const url = new URL(baseHref, window.location.href);
      if (url.origin !== window.location.origin || url.pathname.endsWith(".pdf")) return;
      if (language === "en") {
        url.searchParams.delete("lang");
      } else {
        url.searchParams.set("lang", language);
      }
      link.setAttribute("href", url.pathname + url.search + url.hash);
    });
  }

  function init(options) {
    const pageCopy = options.copy || {};
    const render = typeof options.render === "function" ? options.render : function () {};
    let currentLanguage = "en";

    function applyLanguage(nextLanguage) {
      const language = supportedLanguages.has(nextLanguage) ? nextLanguage : "en";
      render(language);
      setDocumentLanguage(language);
      applyCopy(language, pageCopy);
      updateLanguageButtons(language);
      storeLanguage(language);
      setCurrentUrlLanguage(language);
      updateLocalizedLinks(language);
      currentLanguage = language;
      return language;
    }

    document.querySelectorAll("[data-lang-switch]").forEach((button) => {
      button.addEventListener("click", function () {
        applyLanguage(button.dataset.langSwitch);
      });
    });

    applyLanguage(getInitialLanguage());
    return {
      get language() {
        return currentLanguage;
      },
      setLanguage: applyLanguage
    };
  }

  window.SiteLanguage = { init: init };
})();
