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

    var checklistScope = (function () {
        var btn = document.getElementById('checklist-reset');
        if (!btn) {
            return null;
        }
        var post = btn.closest('.post');
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
        btn.textContent = on ? btn.getAttribute('data-label-on') || 'On' : btn.getAttribute('data-label-off') || 'Off';
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

    var checklistReset = document.getElementById('checklist-reset');
    if (checklistReset) {
        checklistReset.addEventListener('click', function () {
            var post = checklistReset.closest('.post');
            var scope = post ? post.querySelector('.post-content') : null;
            if (!scope) {
                return;
            }
            scope.querySelectorAll('input[type="checkbox"]').forEach(function (checkbox) {
                if (!checkbox.checked) {
                    return;
                }
                checkbox.checked = false;
                if (checkbox.parentElement) {
                    checkbox.parentElement.classList.remove('checked');
                    checkbox.parentElement.classList.remove('check-draw-static');
                }
            });
            document.querySelectorAll('.items-counter').forEach(function (counter) {
                updateItemsCounter(counter);
            });
            saveChecklistState();
            updateChecklistProgress();
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

    updateChecklistProgress();
    scheduleChecklistProgressPinSync();
});
