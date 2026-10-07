/* Реквизиты для оферты, политики и согласия — заполняются ТОЛЬКО здесь.
   status: "npd" — самозанятый (налог на профессиональный доход), "ip" — индивидуальный предприниматель. */
window.LEGAL = {
  status: "npd",
  fio: "Марданян Роман Ованесович", // Фамилия Имя Отчество полностью
  inn: "371122273306", // ИНН, 12 цифр
  ogrnip: "",       // только для ИП
  email: "romardanyan@gmail.com", // почта для обращений и претензий
  tg: "",           // Telegram для связи, например @username (пусто — строки с Telegram скрыты)
  edition: "6 октября 2026 г.",
};
(function () {
  var L = window.LEGAL, q = function (s) { return document.querySelectorAll(s); };
  var label = { fio: "ФИО", inn: "ИНН", ogrnip: "ОГРНИП", email: "e-mail", tg: "Telegram" };
  var val = {
    who: L.status === "ip" ? "индивидуальный предприниматель" : "плательщик налога на профессиональный доход (самозанятый)",
    whoShort: L.status === "ip" ? "ИП" : "самозанятый",
    edition: L.edition,
  };
  function fill() {
    q("[data-r]").forEach(function (el) {
      var k = el.getAttribute("data-r"), v = val[k] != null ? val[k] : L[k];
      if (v) { el.textContent = v; el.classList.remove("todo"); }
      else { el.textContent = "[" + (label[k] || k) + "]"; el.classList.add("todo"); }
    });
    q(".tbl").forEach(function (t) { var h = [].map.call(t.querySelectorAll("tr:first-child th"), function (x) { return x.textContent; });
      [].forEach.call(t.querySelectorAll("tr"), function (r) { [].forEach.call(r.querySelectorAll("td"), function (d, i) { if (h[i]) d.setAttribute("data-l", h[i]); }); }); });
    q(".tg-opt").forEach(function (el) { el.hidden = !L.tg; });
    q("[data-if-ip]").forEach(function (el) { el.hidden = L.status !== "ip"; });
    q("[data-if-npd]").forEach(function (el) { el.hidden = L.status === "ip"; });
    q("a[data-mail]").forEach(function (a) { if (L.email) a.href = "mailto:" + L.email; });
    q("a[data-tg]").forEach(function (a) { if (L.tg) a.href = "https://t.me/" + L.tg.replace(/^@/, ""); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fill); else fill();
  // тема как в приложении
  try { var t = localStorage.getItem("pj-theme"); if (t === "dark" || t === "light") document.documentElement.setAttribute("data-theme", t); } catch (e) {}
})();
