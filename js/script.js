document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    function getStoredTheme() {
        try {
            var stored = localStorage.getItem('theme');
            if (stored === 'light' || stored === 'dark') {
                return stored;
            }
        } catch (e) {
            /* ignore */
        }
        return null;
    }

    function getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    function getEffectiveTheme() {
        var stored = getStoredTheme();
        if (stored) {
            return stored;
        }
        return getSystemTheme();
    }

    function applyThemeMode(mode) {
        if (mode !== 'light' && mode !== 'dark') {
            return;
        }
        try {
            document.documentElement.setAttribute('data-theme', mode);
            localStorage.setItem('theme', mode);
        } catch (err) {
            /* ignore */
        }
    }

    function syncThemeToggle(btn) {
        if (!btn) {
            return;
        }
        var effective = getEffectiveTheme();
        btn.setAttribute('data-mode', effective);
        var labelBase = btn.getAttribute('data-theme-label') || 'Theme';
        var tipLight = btn.getAttribute('data-tip-light') || 'Light';
        var tipDark = btn.getAttribute('data-tip-dark') || 'Dark';
        var tip = effective === 'dark' ? tipDark : tipLight;
        btn.setAttribute('aria-label', labelBase + ' — ' + tip);
        var toLight = btn.getAttribute('data-switch-to-light') || 'Switch to light theme';
        var toDark = btn.getAttribute('data-switch-to-dark') || 'Switch to dark theme';
        btn.setAttribute('title', effective === 'dark' ? toLight : toDark);
    }

    var themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        syncThemeToggle(themeToggle);
        themeToggle.addEventListener('click', function () {
            var next = getEffectiveTheme() === 'dark' ? 'light' : 'dark';
            applyThemeMode(next);
            syncThemeToggle(themeToggle);
        });

        var mq = window.matchMedia('(prefers-color-scheme: dark)');
        function onSchemeChange() {
            if (getStoredTheme() === null) {
                syncThemeToggle(themeToggle);
            }
        }
        if (mq.addEventListener) {
            mq.addEventListener('change', onSchemeChange);
        } else if (mq.addListener) {
            mq.addListener(onSchemeChange);
        }
    }

    var menuButton = document.querySelector('.menu-icon');
    var navTrigger = document.getElementById('site-nav-trigger');

    if (menuButton && navTrigger) {
        menuButton.addEventListener('click', function () {
            var isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', String(!isExpanded));
            navTrigger.classList.toggle('is-open', !isExpanded);
        });
    }

    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            if (checkbox.parentElement) {
                checkbox.parentElement.classList.toggle('checked', checkbox.checked);
            }
        });
    });

    document.querySelectorAll('.items-counter').forEach(function (counter) {
        updateItemsCounter(counter);

        var heading = counter.closest('h2');
        var list = heading ? heading.nextElementSibling : null;
        if (!list) {
            return;
        }

        list.querySelectorAll('input[type="checkbox"]').forEach(function (checkbox) {
            checkbox.addEventListener('change', function () {
                updateItemsCounter(counter);
            });
        });
    });

    function updateItemsCounter(element) {
        var heading = element.closest('h2');
        var list = heading ? heading.nextElementSibling : null;
        if (!list) {
            return;
        }

        var inputs = list.querySelectorAll('input[type="checkbox"]');
        var totalCount = inputs.length;
        var notCheckedCount = list.querySelectorAll('input[type="checkbox"]:not(:checked)').length;

        if (totalCount) {
            element.textContent = '(' + notCheckedCount + ')';
            element.classList.toggle('all-checked', notCheckedCount === 0);
        }
    }
});
