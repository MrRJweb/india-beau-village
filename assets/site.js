/* India Beau Village — comportements du site (sans dépendances) */
(function(){
  "use strict";

  var LANG = (document.documentElement.lang || "fr").indexOf("en") === 0 ? "en" : "fr";
  var fmt = LANG === "en"
    ? function(p){ return "$" + p.toFixed(2); }
    : function(p){ return p.toFixed(2).replace(".", ",") + " $"; };
  var descOf = function(it){ return LANG === "en" ? (it.descEn || it.desc) : it.desc; };

  /* ---- Sélecteur « Commander » : fermer au clic extérieur / Échap ---- */
  document.addEventListener("click", function(e){
    document.querySelectorAll("details.dd[open]").forEach(function(dd){
      if(!dd.contains(e.target)) dd.removeAttribute("open");
    });
  });
  document.addEventListener("keydown", function(e){
    if(e.key === "Escape"){
      document.querySelectorAll("details.dd[open]").forEach(function(dd){ dd.removeAttribute("open"); });
    }
  });

  /* ---- Année du pied de page ---- */
  document.querySelectorAll("[data-year]").forEach(function(el){
    el.textContent = new Date().getFullYear();
  });

  if (typeof MENU === "undefined") return;

  var GROUPS = LANG === "en" ? [
    { id:"agneau", t:"Lamb",       sub:"lamb dishes" },
    { id:"poulet", t:"Chicken",    sub:"chicken dishes" },
    { id:"mer",    t:"Seafood",    sub:"shrimp & fish" },
    { id:"vege",   t:"Vegetarian", sub:"vegetarian mains" }
  ] : [
    { id:"agneau", t:"Agneau",       sub:"plats d'agneau" },
    { id:"poulet", t:"Poulet",       sub:"plats de poulet" },
    { id:"mer",    t:"Fruits de mer",sub:"crevettes & poissons" },
    { id:"vege",   t:"Végétarien",   sub:"plats végétariens" }
  ];
  var count = function(g){ return MENU.filter(function(i){ return i.group === g; }).length; };

  /* ---- Tuiles-compteurs (accueil et menu) — comptées depuis les données ---- */
  document.querySelectorAll("[data-tiles]").forEach(function(host){
    var link = host.getAttribute("data-tiles") === "link"; /* accueil → liens profonds */
    GROUPS.forEach(function(g){
      var n = count(g.id);
      var el = document.createElement(link ? "a" : "button");
      el.className = "tile";
      if(link){ el.href = "menu.html?f=" + g.id; }
      else { el.type = "button"; el.setAttribute("data-filter", g.id); el.setAttribute("aria-pressed","false"); }
      el.innerHTML = '<span class="n">' + n + '</span><span class="t">' + g.t + '</span><span class="sub">' + g.sub + '</span>';
      host.appendChild(el);
    });
  });

  /* ---- Plats signature (accueil) ---- */
  var sig = document.querySelector("[data-signature]");
  if (sig && typeof SIGNATURE !== "undefined"){
    SIGNATURE.forEach(function(en){
      var it = MENU.find(function(i){ return i.en === en; });
      if(!it) return;
      var li = document.createElement("li");
      li.className = "sig-item";
      li.innerHTML =
        '<div class="sig-line"><span class="name">' + it[LANG] + '</span>' +
        '<span class="lead" aria-hidden="true"></span>' +
        '<span class="price">' + fmt(it.price) + '</span></div>' +
        (descOf(it) ? '<p class="one">' + descOf(it) + '</p>' : '');
      sig.appendChild(li);
    });
  }

  /* ---- Le grand tableau ---- */
  var board = document.querySelector("#board");
  if (!board) return;

  var chipsHost  = document.querySelector("[data-chips]");
  var search     = document.querySelector("#board-search");
  var emptyMsg   = document.querySelector(".board-empty");
  var totalEl    = document.querySelector("[data-total]");
  if (totalEl) totalEl.textContent = MENU.length;

  /* Rendu des sections dans l'ordre du menu source */
  MENU_SECTIONS.forEach(function(sec){
    var items = MENU.filter(function(i){ return i.sec === sec.id; });
    if(!items.length) return;
    var s = document.createElement("section");
    s.className = "board-section";
    s.setAttribute("data-sec", sec.id);
    s.innerHTML = '<h2 id="sec-' + sec.id + '">' + sec[LANG] +
      ' <span class="en">' + (LANG === "en" ? sec.fr : sec.en) + '</span>' +
      ' <span class="cnt" data-cnt>' + items.length + '</span></h2>';
    items.forEach(function(it){
      var r = document.createElement("div");
      r.className = "row";
      r.setAttribute("data-group", it.group);
      r.setAttribute("data-q", (it.fr + " " + it.en).toLowerCase());
      r.innerHTML =
        '<div class="names"><span class="fr">' + it[LANG] + '</span>' +
        (it.veg ? '<span class="veg" title="' + (LANG === "en" ? "vegetarian" : "végétarien") + '">V</span>' : '') +
        ' <span class="en">' + (LANG === "en" ? it.fr : it.en) + '</span>' +
        (descOf(it) ? '<span class="desc">' + descOf(it) + '</span>' : '') + '</div>' +
        '<span class="lead" aria-hidden="true"></span>' +
        '<span class="price">' + fmt(it.price) + '</span>';
      s.appendChild(r);
    });
    board.appendChild(s);
  });

  /* Pastilles de sections (comptes réels) */
  if (chipsHost){
    var mk = function(label, val, n){
      var b = document.createElement("button");
      b.type = "button"; b.className = "chip";
      b.setAttribute("data-filter", val);
      b.setAttribute("aria-pressed", val === "all" ? "true" : "false");
      b.textContent = label + (n != null ? " · " + n : "");
      chipsHost.appendChild(b);
    };
    mk(LANG === "en" ? "All" : "Tout", "all", MENU.length);
    MENU_SECTIONS.forEach(function(sec){
      var n = MENU.filter(function(i){ return i.sec === sec.id; }).length;
      if(n) mk(sec[LANG], "sec:" + sec.id, n);
    });
  }

  var state = { filter:"all", q:"" };

  function apply(){
    var q = state.q.trim().toLowerCase();
    var shown = 0;
    document.querySelectorAll(".board-section").forEach(function(s){
      var secId = s.getAttribute("data-sec");
      var visible = 0;
      s.querySelectorAll(".row").forEach(function(r){
        var okF = state.filter === "all" ||
          (state.filter.indexOf("sec:") === 0 ? secId === state.filter.slice(4)
                                              : r.getAttribute("data-group") === state.filter);
        var okQ = !q || r.getAttribute("data-q").indexOf(q) !== -1;
        var on = okF && okQ;
        r.style.display = on ? "" : "none";
        if(on) visible++;
      });
      s.style.display = visible ? "" : "none";
      var c = s.querySelector("[data-cnt]"); if(c) c.textContent = visible;
      shown += visible;
    });
    if (emptyMsg) emptyMsg.style.display = shown ? "none" : "block";
    document.querySelectorAll("[data-filter]").forEach(function(b){
      b.setAttribute("aria-pressed", String(b.getAttribute("data-filter") === state.filter));
    });
  }

  document.addEventListener("click", function(e){
    var b = e.target.closest("[data-filter]");
    if(!b) return;
    var v = b.getAttribute("data-filter");
    state.filter = (state.filter === v && v !== "all") ? "all" : v;
    apply();
  });
  if (search) search.addEventListener("input", function(){ state.q = search.value; apply(); });

  /* Filtre en lien profond : menu.html?f=agneau|poulet|mer|vege */
  var f = new URLSearchParams(location.search).get("f");
  if (f && GROUPS.some(function(g){ return g.id === f; })){ state.filter = f; }
  apply();

  /* ---- JSON-LD du menu, généré depuis les mêmes données ---- */
  try{
    var ld = {
      "@context":"https://schema.org", "@type":"Menu",
      "name": LANG === "en" ? "The Big Board — India Beau Village" : "Le grand tableau — India Beau Village",
      "inLanguage": LANG === "en" ? "en-CA" : "fr-CA",
      "hasMenuSection": MENU_SECTIONS.map(function(sec){
        return {
          "@type":"MenuSection", "name": sec.fr + " / " + sec.en,
          "hasMenuItem": MENU.filter(function(i){ return i.sec === sec.id; }).map(function(i){
            return { "@type":"MenuItem", "name": i.fr + " / " + i.en,
                     "offers": { "@type":"Offer", "price": i.price.toFixed(2), "priceCurrency":"CAD" } };
          })
        };
      })
    };
    var tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.textContent = JSON.stringify(ld);
    document.head.appendChild(tag);
  }catch(e){ /* le tableau reste fonctionnel sans schéma */ }
})();
