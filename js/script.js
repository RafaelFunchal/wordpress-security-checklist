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

    var langMenu = document.querySelector('[data-lang-menu]');
    if (langMenu) {
        var langBtn = langMenu.querySelector('.lang-menu__trigger');
        var mqHoverFine = window.matchMedia('(hover: hover)');

        function langMenuIsOpenVisually() {
            if (langMenu.classList.contains('lang-menu--open')) {
                return true;
            }
            try {
                if (langMenu.matches(':hover') || langMenu.matches(':focus-within')) {
                    return true;
                }
            } catch (err) {
                /* ignore */
            }
            return false;
        }

        function syncLangMenuExpanded() {
            if (!langBtn) {
                return;
            }
            langBtn.setAttribute('aria-expanded', langMenuIsOpenVisually() ? 'true' : 'false');
        }

        function closeLangMenu() {
            langMenu.classList.remove('lang-menu--open');
            syncLangMenuExpanded();
        }

        if (langBtn) {
            langBtn.addEventListener('click', function () {
                if (!mqHoverFine.matches) {
                    langMenu.classList.toggle('lang-menu--open');
                    syncLangMenuExpanded();
                }
            });
        }

        ['mouseenter', 'mouseleave', 'focusin', 'focusout'].forEach(function (ev) {
            langMenu.addEventListener(ev, function () {
                window.requestAnimationFrame(syncLangMenuExpanded);
            });
        });

        document.addEventListener('click', function (e) {
            if (!langMenu.contains(e.target)) {
                closeLangMenu();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeLangMenu();
                if (langBtn && langMenu.contains(document.activeElement)) {
                    langBtn.blur();
                }
            }
        });

        syncLangMenuExpanded();
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

    var checklistScope = (function () {
        var post = document.querySelector('.post--checklist');
        return post ? post.querySelector('.post-content') : null;
    }());

    var checklistStorageKey = checklistScope ? 'wsc-checklist:' + window.location.pathname : null;
    var CHECKLIST_STORAGE_VERSION = 2;

    function applyCheckboxState(checkbox, on) {
        checkbox.checked = on;
        if (checkbox.parentElement) {
            checkbox.parentElement.classList.toggle('checked', on);
        }
    }

    function initChecklistCheckDraw(scope) {
        if (!scope) {
            return;
        }
        var svgNS = 'http://www.w3.org/2000/svg';
        scope.querySelectorAll('label > input[type="checkbox"]').forEach(function (input) {
            var next = input.nextElementSibling;
            if (next && next.classList && next.classList.contains('check-draw')) {
                return;
            }
            var wrap = document.createElement('span');
            wrap.className = 'check-draw';
            wrap.setAttribute('aria-hidden', 'true');
            var svg = document.createElementNS(svgNS, 'svg');
            svg.setAttribute('class', 'check-draw-svg');
            svg.setAttribute('viewBox', '0 0 12 10');
            svg.setAttribute('aria-hidden', 'true');
            var pathEl = document.createElementNS(svgNS, 'path');
            pathEl.setAttribute('class', 'check-draw-stroke');
            pathEl.setAttribute('fill', 'none');
            pathEl.setAttribute('stroke', '#ffffff');
            pathEl.setAttribute('stroke-width', '2');
            pathEl.setAttribute('stroke-linecap', 'round');
            pathEl.setAttribute('stroke-linejoin', 'round');
            pathEl.setAttribute('d', 'M1.5 5.5 4.5 8.5 10.5 1.5');
            svg.appendChild(pathEl);
            wrap.appendChild(svg);
            if (input.parentNode) {
                input.parentNode.insertBefore(wrap, input.nextSibling);
            }
        });
        scope.classList.add('checklist-check-draw-enabled');
        window.requestAnimationFrame(function () {
            scope.querySelectorAll('.check-draw-stroke').forEach(function (pathEl) {
                var len = 0;
                try {
                    len = pathEl.getTotalLength();
                } catch (e) {
                    len = 0;
                }
                if (len > 0) {
                    pathEl.style.setProperty('--check-len', String(len));
                }
            });
        });
    }

    function syncChecklistDrawStaticAfterHydrate(scope) {
        if (!scope) {
            return;
        }
        scope.querySelectorAll('label > input[type="checkbox"]').forEach(function (cb) {
            var label = cb.parentElement;
            if (!label) {
                return;
            }
            if (cb.checked) {
                label.classList.add('check-draw-static');
            } else {
                label.classList.remove('check-draw-static');
            }
        });
    }

    function loadChecklistState() {
        if (!checklistStorageKey || !checklistScope) {
            return;
        }
        try {
            var raw = localStorage.getItem(checklistStorageKey);
            if (!raw) {
                return;
            }
            var parsed = JSON.parse(raw);
            var boxes = checklistScope.querySelectorAll('input[type="checkbox"]');

            if (Array.isArray(parsed)) {
                for (var i = 0; i < boxes.length; i++) {
                    var legacyOn = i < parsed.length && parsed[i] === true;
                    applyCheckboxState(boxes[i], legacyOn);
                }
                saveChecklistState();
                return;
            }

            var itemsMap = null;
            if (parsed && typeof parsed === 'object' && parsed.items && typeof parsed.items === 'object') {
                itemsMap = parsed.items;
            }
            if (!itemsMap) {
                return;
            }

            boxes.forEach(function (cb) {
                var id = cb.getAttribute('data-item-id');
                if (!id) {
                    return;
                }
                applyCheckboxState(cb, itemsMap[id] === true);
            });
        } catch (err) {
            /* ignore */
        }
    }

    function saveChecklistState() {
        if (!checklistStorageKey || !checklistScope) {
            return;
        }
        try {
            var boxes = checklistScope.querySelectorAll('input[type="checkbox"]');
            var items = {};
            boxes.forEach(function (cb) {
                var id = cb.getAttribute('data-item-id');
                if (!id) {
                    return;
                }
                if (cb.checked) {
                    items[id] = true;
                }
            });
            localStorage.setItem(
                checklistStorageKey,
                JSON.stringify({ v: CHECKLIST_STORAGE_VERSION, items: items })
            );
        } catch (err) {
            /* ignore */
        }
    }

    var checklistProgressRoot = document.getElementById('checklist-progress');
    var checklistProgressFill = document.getElementById('checklist-progress-fill');
    var checklistProgressPct = document.getElementById('checklist-progress-pct');
    var checklistProgressSlot = document.getElementById('checklist-progress-slot');
    var checklistProgressSpacer = document.getElementById('checklist-progress-spacer');
    var lastChecklistProgressPercent = -1;

    var progressPinRafScheduled = false;

    function scheduleChecklistProgressPinSync() {
        if (!checklistProgressSlot) {
            return;
        }
        if (progressPinRafScheduled) {
            return;
        }
        progressPinRafScheduled = true;
        requestAnimationFrame(function () {
            progressPinRafScheduled = false;
            syncChecklistProgressPinnedLayout();
        });
    }

    function syncChecklistProgressPinnedLayout() {
        if (!checklistProgressRoot || !checklistProgressSlot || !checklistProgressSpacer) {
            return;
        }
        var slotTop = checklistProgressSlot.getBoundingClientRect().top;
        var shouldPin = slotTop <= 0;
        var pinned = checklistProgressRoot.classList.contains('checklist-progress--pinned');

        if (shouldPin && !pinned) {
            var st = window.getComputedStyle(checklistProgressRoot);
            var mt = parseFloat(st.marginTop) || 0;
            var mb = parseFloat(st.marginBottom) || 0;
            var h = checklistProgressRoot.offsetHeight + mt + mb;
            checklistProgressSpacer.style.height = h + 'px';
            checklistProgressSpacer.classList.add('checklist-progress-spacer--active');
            checklistProgressRoot.classList.add('checklist-progress--pinned');
        } else if (!shouldPin && pinned) {
            checklistProgressRoot.classList.remove('checklist-progress--pinned');
            checklistProgressSpacer.classList.remove('checklist-progress-spacer--active');
            checklistProgressSpacer.style.height = '';
        }
    }

    function announceChecklistComplete() {
        var post = document.querySelector('.post--checklist');
        var el = document.getElementById('checklist-complete-announcer');
        if (!post || !el) {
            return;
        }
        var msg = post.getAttribute('data-checklist-complete-msg');
        if (!msg) {
            return;
        }
        el.textContent = msg;
        window.setTimeout(function () {
            el.textContent = '';
        }, 4500);
    }

    function playChecklistCelebrationSound(subtle) {
        try {
            var Ctx = window.AudioContext || window.webkitAudioContext;
            if (!Ctx) {
                return;
            }
            if (!window.__wscAudioCtx) {
                window.__wscAudioCtx = new Ctx();
            }
            var ctx = window.__wscAudioCtx;
            if (ctx.state === 'suspended') {
                ctx.resume();
            }

            var master = ctx.createGain();
            master.connect(ctx.destination);
            master.gain.value = subtle ? 0.04 : 0.065;

            var t0 = ctx.currentTime + 0.02;

            function playYayWhoop() {
                var osc = ctx.createOscillator();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(300, t0);
                osc.frequency.exponentialRampToValueAtTime(720, t0 + 0.1);
                osc.frequency.exponentialRampToValueAtTime(480, t0 + 0.12);
                osc.frequency.exponentialRampToValueAtTime(980, t0 + 0.28);

                var env = ctx.createGain();
                var hi = subtle ? 0.16 : 0.22;
                var mid = subtle ? 0.12 : 0.16;
                env.gain.setValueAtTime(0.0001, t0);
                env.gain.linearRampToValueAtTime(hi, t0 + 0.03);
                env.gain.exponentialRampToValueAtTime(mid, t0 + 0.11);
                env.gain.linearRampToValueAtTime(hi * 0.95, t0 + 0.14);
                env.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.34);

                osc.connect(env);
                env.connect(master);
                osc.start(t0);
                osc.stop(t0 + 0.36);
            }

            function scheduleClap(t, filterHz, peak) {
                var len = Math.floor(ctx.sampleRate * 0.1);
                var buf = ctx.createBuffer(1, len, ctx.sampleRate);
                var data = buf.getChannelData(0);
                var i;
                for (i = 0; i < len; i++) {
                    data[i] = Math.random() * 2 - 1;
                }
                var src = ctx.createBufferSource();
                src.buffer = buf;
                var bp = ctx.createBiquadFilter();
                bp.type = 'bandpass';
                bp.frequency.value = filterHz;
                bp.Q.value = 1.85;
                var hp = ctx.createBiquadFilter();
                hp.type = 'highpass';
                hp.frequency.value = 380;
                hp.Q.value = 0.7;
                var g = ctx.createGain();
                g.gain.setValueAtTime(0.0001, t);
                g.gain.linearRampToValueAtTime(peak, t + 0.0035);
                g.gain.exponentialRampToValueAtTime(0.0001, t + 0.085);
                src.connect(bp);
                bp.connect(hp);
                hp.connect(g);
                g.connect(master);
                src.start(t);
                src.stop(t + 0.1);
            }

            playYayWhoop();

            var clapPeaks = subtle ? [0.32, 0.28, 0.26] : [0.42, 0.38, 0.4, 0.36, 0.38];
            var clapStarts = subtle ? [0.22, 0.34, 0.46] : [0.2, 0.32, 0.44, 0.55, 0.66];
            var c;
            for (c = 0; c < clapStarts.length; c++) {
                scheduleClap(
                    t0 + clapStarts[c] + (Math.random() - 0.5) * 0.014,
                    880 + Math.random() * 900,
                    clapPeaks[c]
                );
            }
        } catch (err) {
            /* ignore */
        }
    }

    var CELEBRATION_ENABLED_KEY = 'wsc-celebration-enabled';

    function isCelebrationEnabled() {
        try {
            return localStorage.getItem(CELEBRATION_ENABLED_KEY) !== '0';
        } catch (e) {
            return true;
        }
    }

    function setCelebrationEnabled(enabled) {
        try {
            localStorage.setItem(CELEBRATION_ENABLED_KEY, enabled ? '1' : '0');
        } catch (err) {
            /* ignore */
        }
    }

    function syncCelebrationToggleButton() {
        var btn = document.getElementById('checklist-celebration-toggle');
        if (!btn) {
            return;
        }
        var on = isCelebrationEnabled();
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        var textOn = btn.querySelector('.checklist-celebration-toggle__text--on');
        var textOff = btn.querySelector('.checklist-celebration-toggle__text--off');
        if (textOn) {
            textOn.setAttribute('aria-hidden', on ? 'false' : 'true');
        }
        if (textOff) {
            textOff.setAttribute('aria-hidden', on ? 'true' : 'false');
        }
        btn.setAttribute(
            'aria-label',
            on ? btn.getAttribute('data-aria-on') || '' : btn.getAttribute('data-aria-off') || ''
        );
    }

    function triggerChecklistCompletionCelebration() {
        announceChecklistComplete();
        if (!checklistProgressRoot) {
            return;
        }
        if (!isCelebrationEnabled()) {
            return;
        }
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            playChecklistCelebrationSound(true);
            checklistProgressRoot.classList.add('checklist-progress--celebrate-quiet');
            window.setTimeout(function () {
                checklistProgressRoot.classList.remove('checklist-progress--celebrate-quiet');
            }, 2200);
            return;
        }

        playChecklistCelebrationSound(false);
        checklistProgressRoot.classList.add('checklist-progress--celebrate');
        window.setTimeout(function () {
            checklistProgressRoot.classList.remove('checklist-progress--celebrate');
        }, 2400);

        var host = document.createElement('div');
        host.className = 'checklist-celebration';
        host.setAttribute('aria-hidden', 'true');
        document.body.appendChild(host);

        function spawnConfettiBurst(cx, cy, count, largeBurst) {
            var i;
            for (i = 0; i < count; i++) {
                var piece = document.createElement('span');
                piece.className =
                    'checklist-celebration__piece' + (largeBurst ? ' checklist-celebration__piece--lg' : '');
                var angle = Math.random() * Math.PI * 2;
                var speed = largeBurst ? 170 + Math.random() * 440 : 120 + Math.random() * 320;
                var tx = Math.cos(angle) * speed;
                var ty = Math.sin(angle) * speed * 0.52 + (largeBurst ? 190 : 150) + Math.random() * (largeBurst ? 300 : 220);
                var rot = (Math.random() - 0.5) * (largeBurst ? 1080 : 900);
                var d = largeBurst ? 1.2 + Math.random() * 1.45 : 1.05 + Math.random() * 1.25;
                var delay = Math.random() * (largeBurst ? 0.28 : 0.22);
                var hue = Math.floor(Math.random() * 360);
                var sat = largeBurst ? 88 : 84;
                var light = largeBurst ? 58 : 56;
                piece.style.backgroundColor = 'hsl(' + hue + ', ' + sat + '%, ' + light + '%)';
                piece.style.setProperty('--cele-tx', tx + 'px');
                piece.style.setProperty('--cele-ty', ty + 'px');
                piece.style.setProperty('--cele-rot', rot + 'deg');
                piece.style.setProperty('--cele-dur', d + 's');
                piece.style.setProperty('--cele-delay', delay + 's');
                piece.style.left = cx + 'px';
                piece.style.top = cy + 'px';
                host.appendChild(piece);
            }
        }

        function burstFromBar() {
            var r = checklistProgressRoot.getBoundingClientRect();
            var cx = r.left + r.width / 2;
            var cy = r.top + r.height / 2;
            return { cx: cx, cy: cy };
        }

        var b0 = burstFromBar();
        spawnConfettiBurst(b0.cx, b0.cy, 360);

        window.setTimeout(function () {
            var b = burstFromBar();
            spawnConfettiBurst(b.cx, b.cy, 340);
        }, 90);

        window.setTimeout(function () {
            var b = burstFromBar();
            spawnConfettiBurst(b.cx, b.cy, 320);
        }, 185);

        window.setTimeout(function () {
            var b = burstFromBar();
            spawnConfettiBurst(b.cx, b.cy, 300);
        }, 285);

        window.setTimeout(function () {
            var b = burstFromBar();
            spawnConfettiBurst(b.cx, b.cy, 280);
        }, 395);

        window.setTimeout(function () {
            var b = burstFromBar();
            spawnConfettiBurst(b.cx, b.cy, 620, true);
        }, 520);

        window.setTimeout(function () {
            host.remove();
        }, 5600);
    }

    function updateChecklistProgress() {
        if (!checklistProgressRoot || !checklistScope) {
            return;
        }
        var boxes = checklistScope.querySelectorAll('input[type="checkbox"]');
        var total = boxes.length;
        var checked = 0;
        boxes.forEach(function (cb) {
            if (cb.checked) {
                checked += 1;
            }
        });
        var pct = total ? Math.round((checked / total) * 100) : 0;
        var prevPct = lastChecklistProgressPercent;
        var crossedComplete = prevPct >= 0 && prevPct < 100 && pct === 100;
        lastChecklistProgressPercent = pct;

        if (checklistProgressFill) {
            checklistProgressFill.style.width = pct + '%';
        }
        if (checklistProgressPct) {
            checklistProgressPct.textContent = pct + '%';
        }
        checklistProgressRoot.setAttribute('aria-valuenow', String(pct));
        checklistProgressRoot.setAttribute('aria-valuetext', pct + '%');
        if (crossedComplete) {
            triggerChecklistCompletionCelebration();
        }
        scheduleChecklistProgressPinSync();
    }

    if (checklistScope) {
        initChecklistCheckDraw(checklistScope);
        loadChecklistState();
        syncChecklistDrawStaticAfterHydrate(checklistScope);
    }

    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            if (checkbox.parentElement) {
                checkbox.parentElement.classList.toggle('checked', checkbox.checked);
                checkbox.parentElement.classList.remove('check-draw-static');
            }
            if (checklistScope && checklistScope.contains(checkbox)) {
                saveChecklistState();
                updateChecklistProgress();
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

    function syncChecklistScopeFromButtons() {
        if (!checklistScope) {
            return;
        }
        document.querySelectorAll('.items-counter').forEach(function (counter) {
            updateItemsCounter(counter);
        });
        saveChecklistState();
        updateChecklistProgress();
    }

    var checklistCheckAll = document.getElementById('checklist-check-all');
    if (checklistCheckAll && checklistScope) {
        checklistCheckAll.addEventListener('click', function () {
            checklistScope.querySelectorAll('input[type="checkbox"]').forEach(function (checkbox) {
                if (checkbox.checked) {
                    return;
                }
                applyCheckboxState(checkbox, true);
                if (checkbox.parentElement) {
                    checkbox.parentElement.classList.remove('check-draw-static');
                }
            });
            syncChecklistScopeFromButtons();
        });
    }

    var checklistUncheckAll = document.getElementById('checklist-uncheck-all');
    if (checklistUncheckAll && checklistScope) {
        checklistUncheckAll.addEventListener('click', function () {
            checklistScope.querySelectorAll('input[type="checkbox"]').forEach(function (checkbox) {
                if (!checkbox.checked) {
                    return;
                }
                applyCheckboxState(checkbox, false);
                if (checkbox.parentElement) {
                    checkbox.parentElement.classList.remove('check-draw-static');
                }
            });
            syncChecklistScopeFromButtons();
        });
    }

    var celebrationToggle = document.getElementById('checklist-celebration-toggle');
    if (celebrationToggle) {
        syncCelebrationToggleButton();
        celebrationToggle.addEventListener('click', function () {
            setCelebrationEnabled(!isCelebrationEnabled());
            syncCelebrationToggleButton();
        });
    }

    if (checklistProgressSlot) {
        window.addEventListener('scroll', scheduleChecklistProgressPinSync, { passive: true });
        window.addEventListener('resize', scheduleChecklistProgressPinSync);
    }

    (function initChecklistPdfExport() {
        var openBtn = document.getElementById('checklist-pdf-open');
        var modal = document.getElementById('checklist-pdf-modal');
        if (!openBtn || !modal) {
            return;
        }
        var input = document.getElementById('checklist-pdf-project-input');
        var submitBtn = document.getElementById('checklist-pdf-submit');
        var skipBtn = document.getElementById('checklist-pdf-skip');
        var closeBtn = document.getElementById('checklist-pdf-modal-close');
        var backdrop = modal.querySelector('[data-pdf-modal-dismiss]');

        var lastFocus = null;
        var printCleanupTimer = null;

        function clearPrintCleanupTimer() {
            if (printCleanupTimer) {
                window.clearTimeout(printCleanupTimer);
                printCleanupTimer = null;
            }
        }

        function endPrintSession() {
            document.body.classList.remove('wsc-print-checklist');
            clearPrintCleanupTimer();
        }

        window.addEventListener('afterprint', endPrintSession);

        if (window.matchMedia) {
            var mqPrint = window.matchMedia('print');
            function onPrintMediaChange() {
                if (!mqPrint.matches) {
                    endPrintSession();
                }
            }
            if (mqPrint.addEventListener) {
                mqPrint.addEventListener('change', onPrintMediaChange);
            } else if (mqPrint.addListener) {
                mqPrint.addListener(onPrintMediaChange);
            }
        }

        function getPdfModalFocusables() {
            var panel = modal.querySelector('.checklist-pdf-modal__panel');
            if (!panel) {
                return [];
            }
            var candidates = panel.querySelectorAll(
                'button:not([disabled]), a[href]:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
            return Array.prototype.slice.call(candidates).filter(function (el) {
                if (el.getAttribute('aria-hidden') === 'true') {
                    return false;
                }
                return el.offsetParent !== null || el.getClientRects().length > 0;
            });
        }

        function openModal() {
            lastFocus = document.activeElement;
            modal.removeAttribute('hidden');
            if (input) {
                input.value = '';
                window.setTimeout(function () {
                    input.focus();
                }, 0);
            }
            document.documentElement.classList.add('wsc-checklist-pdf-modal-open');
            document.addEventListener('keydown', onDocKeydown);
        }

        function closeModal() {
            modal.setAttribute('hidden', '');
            document.documentElement.classList.remove('wsc-checklist-pdf-modal-open');
            document.removeEventListener('keydown', onDocKeydown);
            if (lastFocus && typeof lastFocus.focus === 'function') {
                lastFocus.focus();
            }
        }

        function onDocKeydown(e) {
            if (modal.hasAttribute('hidden')) {
                return;
            }
            if (e.key === 'Escape') {
                e.preventDefault();
                closeModal();
                return;
            }
            if (e.key !== 'Tab') {
                return;
            }
            var list = getPdfModalFocusables();
            if (!list.length) {
                return;
            }
            var first = list[0];
            var last = list[list.length - 1];
            var active = document.activeElement;
            if (e.shiftKey) {
                if (active === first || !modal.contains(active)) {
                    e.preventDefault();
                    last.focus();
                }
            } else if (active === last) {
                e.preventDefault();
                first.focus();
            }
        }

        function resolvePrintDateLocale() {
            var cover = document.getElementById('checklist-print-cover');
            var fromAttr = cover && cover.getAttribute('data-intl-locale');
            if (fromAttr) {
                return fromAttr.trim();
            }
            var htmlLang = (document.documentElement.getAttribute('lang') || 'en').toLowerCase();
            if (htmlLang === 'br') {
                return 'pt-BR';
            }
            if (htmlLang === 'es' || htmlLang === 'ja' || htmlLang === 'en') {
                return htmlLang;
            }
            return 'en';
        }

        function formatGeneratedAt(date) {
            var d = date || new Date();
            var locale = resolvePrintDateLocale();
            var modern = { dateStyle: 'full', timeStyle: 'short' };
            var legacy = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
            };
            try {
                return new Intl.DateTimeFormat(locale, modern).format(d);
            } catch (err1) {
                try {
                    return new Intl.DateTimeFormat(locale, legacy).format(d);
                } catch (err2) {
                    try {
                        return d.toLocaleString(locale);
                    } catch (err3) {
                        return d.toLocaleString('en');
                    }
                }
            }
        }

        function populatePrintCover(projectNameTrimmed) {
            var urlEl = document.getElementById('checklist-print-url');
            var row = document.getElementById('checklist-print-project-row');
            var projectDd = document.getElementById('checklist-print-project');
            var pct = document.getElementById('checklist-print-pct');
            var timeEl = document.getElementById('checklist-print-time');
            var srcPct = document.getElementById('checklist-progress-pct');

            if (urlEl) {
                urlEl.textContent = window.location.href;
            }
            if (row && projectDd) {
                if (projectNameTrimmed) {
                    projectDd.textContent = projectNameTrimmed;
                    row.removeAttribute('hidden');
                } else {
                    projectDd.textContent = '';
                    row.setAttribute('hidden', '');
                }
            }
            if (pct && srcPct) {
                pct.textContent = srcPct.textContent;
            }
            if (timeEl) {
                var stamp = new Date();
                if (timeEl.tagName === 'TIME') {
                    timeEl.dateTime = stamp.toISOString();
                }
                timeEl.textContent = formatGeneratedAt(stamp);
            }
        }

        function startPrint(projectName) {
            var raw = projectName || '';
            var trimmed = raw.replace(/\s+/g, ' ').trim();
            populatePrintCover(trimmed);
            closeModal();
            document.body.classList.add('wsc-print-checklist');
            clearPrintCleanupTimer();
            printCleanupTimer = window.setTimeout(function () {
                endPrintSession();
            }, 2500);

            window.requestAnimationFrame(function () {
                window.requestAnimationFrame(function () {
                    window.print();
                });
            });
        }

        openBtn.addEventListener('click', function () {
            openModal();
        });

        if (backdrop) {
            backdrop.addEventListener('click', closeModal);
        }
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        if (skipBtn) {
            skipBtn.addEventListener('click', function () {
                startPrint('');
            });
        }
        if (submitBtn) {
            submitBtn.addEventListener('click', function () {
                startPrint(input ? input.value : '');
            });
        }
        if (input) {
            input.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    startPrint(input.value);
                }
            });
        }
    }());

    updateChecklistProgress();
    scheduleChecklistProgressPinSync();
});
