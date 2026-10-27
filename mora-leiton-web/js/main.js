/* Mora Leiton Holding Jurídico — interacciones del sitio */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  /* Año actual en el pie */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* Menú móvil */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('menu-principal');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menú');
        toggle.focus();
      }
    });
  }

  /* Preguntas frecuentes */
  document.querySelectorAll('.faq__q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var answer = document.getElementById(btn.getAttribute('aria-controls'));
      btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      btn.querySelector('.faq__sign').textContent = expanded ? '+' : '−';
      if (answer) answer.hidden = expanded;
    });
  });

  /* Pestañas de áreas de práctica */
  var tablist = document.querySelector('[role="tablist"]');
  if (tablist) {
    var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
    var select = function (tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !on;
      });
      if (focus) tab.focus();
      if (history.replaceState) history.replaceState(null, '', '#' + tab.getAttribute('aria-controls'));
    };
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(tab, false); });
      tab.addEventListener('keydown', function (e) {
        var next = null;
        if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
        if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === 'Home') next = tabs[0];
        if (e.key === 'End') next = tabs[tabs.length - 1];
        if (next) { e.preventDefault(); select(next, true); }
      });
    });
    /* Abrir la pestaña indicada en la URL (p. ej. areas-de-practica.html#penal) */
    var fromHash = tabs.filter(function (t) { return '#' + t.getAttribute('aria-controls') === location.hash; })[0];
    select(fromHash || tabs[0], false);
  }

  /* Filtros de actualidad jurídica */
  var filters = document.querySelectorAll('[data-filter]');
  if (filters.length) {
    var items = document.querySelectorAll('[data-cat]');
    var count = document.querySelector('[data-count]');
    var apply = function (cat) {
      var n = 0;
      items.forEach(function (item) {
        var show = cat === 'all' || item.getAttribute('data-cat') === cat;
        item.hidden = !show;
        if (show) n++;
      });
      filters.forEach(function (f) { f.setAttribute('aria-pressed', f.getAttribute('data-filter') === cat ? 'true' : 'false'); });
      if (count) count.textContent = n === 1 ? '1 análisis' : n + ' análisis';
    };
    filters.forEach(function (f) {
      f.addEventListener('click', function () { apply(f.getAttribute('data-filter')); });
    });
    apply('all');
  }

  /* Formulario de contacto: abre WhatsApp con el mensaje armado.
     Si más adelante se conecta un servicio de formularios, reemplazar este bloque. */
  document.querySelectorAll('form[data-whatsapp]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var data = new FormData(form);
      var lines = [
        'Hola, quiero agendar una consulta.',
        'Nombre: ' + (data.get('nombre') || ''),
        'Teléfono: ' + (data.get('telefono') || '')
      ];
      if (data.get('correo')) lines.push('Correo: ' + data.get('correo'));
      if (data.get('area') && data.get('area') !== '') lines.push('Tema: ' + data.get('area'));
      if (data.get('mensaje')) lines.push('Caso: ' + data.get('mensaje'));
      var url = 'https://wa.me/' + form.getAttribute('data-whatsapp') + '?text=' + encodeURIComponent(lines.join('\n'));
      window.open(url, '_blank', 'noopener');
      var success = form.parentElement.querySelector('.form-success');
      if (success) {
        form.hidden = true;
        success.hidden = false;
        success.focus();
      }
    });
  });

  document.querySelectorAll('[data-form-reset]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var box = btn.closest('.form-box');
      var form = box.querySelector('form');
      form.reset();
      form.hidden = false;
      box.querySelector('.form-success').hidden = true;
      form.querySelector('input').focus();
    });
  });
})();
