/* MyDSM website: shows the current version on the download button and builds the emoticon browser. */
'use strict';
(function () {
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };

  // current version + exact installer link, straight from the update feed (falls back to the stable link)
  fetch('https://api.milorp.app/updates/latest.json', { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (j) {
      if (!j || !/^\d+\.\d+\.\d+$/.test(j.version || '')) return;
      document.getElementById('dl-meta').textContent = 'Version ' + j.version + ' for Windows 10 and 11 · free';
      document.getElementById('ver').textContent = j.version;
      var u = j.platforms && j.platforms['windows-x86_64'] && j.platforms['windows-x86_64'].url;
      if (u && /^https:\/\/api\.milorp\.app\/updates\/[\w.-]+\.exe$/.test(u)) document.getElementById('dl').href = u;
    })
    .catch(function () {});

  // emoticon browser
  var list = window.EMO_LIST || [], tabs = [['faces', 'Faces'], ['love', 'Love & party'], ['things', 'Things'], ['nature', 'Nature']];
  var tabsEl = document.getElementById('emotabs'), grid = document.getElementById('emogrid'), hint = document.getElementById('emohint');
  if (!list.length || !tabsEl) return;
  var cur = 'faces';
  function draw() {
    tabsEl.innerHTML = tabs.map(function (t) { return '<button type="button" class="emotab' + (t[0] === cur ? ' sel' : '') + '" data-tab="' + t[0] + '">' + esc(t[1]) + ' (' + list.filter(function (e) { return e.cat === t[0]; }).length + ')</button>'; }).join('');
    grid.innerHTML = list.filter(function (e) { return e.cat === cur; }).map(function (e) {
      return '<button type="button" class="emocell" data-code="' + esc(e.codes.join('  or  ')) + '" data-name="' + esc(e.name) + '" title="' + esc(e.name + '  ' + e.codes[0]) + '"><img src="emo/' + esc(e.file) + '.png" alt="' + esc(e.name) + '" width="32" height="32" loading="lazy"></button>';
    }).join('');
  }
  function show(el) { if (el) hint.innerHTML = '<b>' + esc(el.getAttribute('data-name')) + '</b>: type <code>' + esc(el.getAttribute('data-code')).replace(/  or  /g, '</code> or <code>') + '</code>'; }
  tabsEl.addEventListener('click', function (e) { var t = e.target.closest('[data-tab]'); if (t) { cur = t.getAttribute('data-tab'); draw(); } });
  grid.addEventListener('mouseover', function (e) { show(e.target.closest('.emocell')); });
  grid.addEventListener('focusin', function (e) { show(e.target.closest('.emocell')); });
  draw();
})();
