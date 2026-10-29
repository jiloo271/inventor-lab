/* Inventor Lab – script.js */
(function () {
  'use strict';

  var doc = document;

  // ปีใน footer
  var yearEl = doc.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // เมนูมือถือ
  var toggle = doc.getElementById('navToggle');
  var menu = doc.getElementById('navMenu');

  function setMenu(open) {
    if (!toggle || !menu) return;
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
    doc.addEventListener('click', function (e) {
      if (!e.target.closest('.nav')) setMenu(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 820) setMenu(false);
    });
  }

  // แถบความคืบหน้าการเลื่อน + ไฮไลต์เมนูที่กำลังดู
  var bar = doc.getElementById('progress');
  var links = Array.prototype.slice.call(doc.querySelectorAll('.nav-menu a'));
  var sections = links
    .map(function (a) { return doc.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  function onScroll() {
    var h = doc.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    if (bar) bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';

    var y = h.scrollTop + 120;
    var current = null;
    sections.forEach(function (s) { if (s.offsetTop <= y) current = s.id; });
    links.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // แอนิเมชันตอนเลื่อนถึง
  var reveals = doc.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('visible');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  // กรองโปรเจกต์ตามสถานะ
  var filters = doc.querySelectorAll('.filter');
  var cards = doc.querySelectorAll('#cards .card');
  var emptyMsg = doc.getElementById('emptyMsg');

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-filter');
      var shown = 0;
      filters.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      cards.forEach(function (c) {
        var match = f === 'all' || c.getAttribute('data-status') === f;
        c.classList.toggle('is-hidden', !match);
        if (match) { shown++; c.classList.add('visible'); }
      });
      if (emptyMsg) emptyMsg.hidden = shown !== 0;
    });
  });

  // ปุ่มรายละเอียดสถานะในการ์ด
  doc.querySelectorAll('.card-more').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var note = btn.parentElement.querySelector('.card-note');
      if (!note) return;
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      note.hidden = open;
      btn.textContent = open ? 'รายละเอียดสถานะ' : 'ซ่อนรายละเอียด';
    });
  });

  // ปุ่มคัดลอก
  var copyBtn = doc.getElementById('copyBtn');
  var copyStatus = doc.getElementById('copyStatus');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var text = copyBtn.getAttribute('data-copy') || '';
      function done(ok) {
        if (copyStatus) {
          copyStatus.textContent = ok ? 'คัดลอกแล้ว ✓' : 'คัดลอกไม่ได้ ลองคัดลอกด้วยตนเอง';
          setTimeout(function () { copyStatus.textContent = ''; }, 2500);
        }
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
      } else {
        var ta = doc.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        doc.body.appendChild(ta);
        ta.select();
        var ok = false;
        try { ok = doc.execCommand('copy'); } catch (err) { ok = false; }
        doc.body.removeChild(ta);
        done(ok);
      }
    });
  }
})();
