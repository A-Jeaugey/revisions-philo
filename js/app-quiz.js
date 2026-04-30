// =========================================================
// Quiz & flashcards & timeline
// =========================================================

App.routes.quiz = function(parts) {
  if (parts && parts[0]) return App.quizPlay(parseInt(parts[0]));
  const cards = window.QUIZZES.map(q => `
    <a class="quiz-card" href="#/quiz/${q.id}" style="text-decoration:none;color:inherit;">
      <div class="qc-num">QUIZ ${q.id.toString().padStart(2,'0')}</div>
      <h3>${q.title}</h3>
      <p>${q.description}</p>
      <div class="qc-foot">
        <span>${q.questions.length} questions</span>
        <span class="arrow">→</span>
      </div>
    </a>
  `).join('');
  App.render(`
    <div class="page-head">
      <div class="crumbs"><a href="#/">Accueil</a> · Quiz</div>
      <h1>Les <em style="color:var(--accent);">quiz</em></h1>
      <p class="lead">Un quiz par séquence, correction immédiate avec explication. Le bon entraînement avant l'épreuve.</p>
    </div>
    <div class="quiz-list">${cards}</div>
  `);
};

App.quizPlay = function(qid) {
  const quiz = window.QUIZZES.find(q => q.id === qid);
  if (!quiz) return App.routes.quiz();

  let idx = 0, answered = [], score = 0;

  const renderQ = () => {
    const q = quiz.questions[idx];
    const steps = quiz.questions.map((_, i) => {
      let cls = '';
      if (i < idx) cls = 'done';
      if (i === idx) cls = 'current';
      return `<div class="qp-step ${cls}"></div>`;
    }).join('');

    App.render(`
      <div class="quiz-stage">
        <div class="crumbs"><a href="#/quiz">Quiz</a> · Q${idx+1}/${quiz.questions.length} · <a href="./raw/quiz/${quiz.id}.md" style="color:var(--accent);">📝 lien partageable</a></div>
        <h2 style="font-family:var(--font-display);font-size:28px;margin-top:12px;color:var(--accent);">${quiz.title}</h2>
        <div class="quiz-progress" style="margin-top:32px;">${steps}</div>
        <div class="quiz-question">${q.q}</div>
        <div class="quiz-options" id="qopts">
          ${q.o.map((opt, i) => `
            <button class="quiz-option" data-i="${i}">
              <span class="opt-letter">${String.fromCharCode(65+i)}</span>
              <span>${opt}</span>
            </button>
          `).join('')}
        </div>
        <div id="explain"></div>
        <div class="quiz-foot">
          <a href="#/quiz" class="btn">Quitter</a>
          <button id="next-btn" class="btn btn-primary" disabled>Question suivante →</button>
        </div>
      </div>
    `);

    let chosen = null;
    document.querySelectorAll('.quiz-option').forEach(b => {
      b.addEventListener('click', () => {
        if (chosen !== null) return;
        chosen = +b.dataset.i;
        document.querySelectorAll('.quiz-option').forEach((bb, i) => {
          bb.classList.add('disabled');
          if (i === q.c) bb.classList.add('correct');
          else if (i === chosen) bb.classList.add('wrong');
        });
        if (chosen === q.c) score++;
        answered.push({ q: q.q, chosen, correct: q.c });
        document.getElementById('explain').innerHTML = `<div class="quiz-explain">${q.e}</div>`;
        document.getElementById('next-btn').disabled = false;
      });
    });

    document.getElementById('next-btn').addEventListener('click', () => {
      idx++;
      if (idx >= quiz.questions.length) renderResult();
      else renderQ();
    });
  };

  const renderResult = () => {
    const pct = Math.round(100 * score / quiz.questions.length);
    let verdict = "Il faut retravailler la séquence.";
    if (pct >= 90) verdict = "Excellent — tu maîtrises ta séquence.";
    else if (pct >= 70) verdict = "Bien joué. Encore un effort sur les détails.";
    else if (pct >= 50) verdict = "Solide base, mais des points à revoir.";

    App.utils.setProgress('quiz-' + quiz.id, { score, total: quiz.questions.length, pct, ts: Date.now() });

    App.render(`
      <div class="quiz-result">
        <div class="crumbs" style="text-align:center;"><a href="#/quiz">← Retour aux quiz</a></div>
        <div class="score" style="margin-top:32px;">${score}<span class="score-total">/${quiz.questions.length}</span></div>
        <div class="verdict">${verdict}</div>
        <div style="font-family:var(--font-mono);font-size:13px;color:var(--text-dim);margin-top:8px;">${pct}% de bonnes réponses</div>
        <div class="actions">
          <button class="btn btn-primary" id="restart">Recommencer</button>
          <a href="#/sequence/${quiz.id}" class="btn">Revoir la séquence</a>
          <a href="#/quiz" class="btn">Autre quiz</a>
        </div>
      </div>
    `);

    document.getElementById('restart').addEventListener('click', () => App.quizPlay(qid));
  };

  renderQ();
};

// =========================================================
// Flashcards
// =========================================================
App.routes.flashcards = function() {
  const decks = [
    { id: 'philos', label: 'Philosophes', build: () => App.data.philosophers.map(p => ({
      kind: p.country || '', q: p.name, a: `<b>${p.dates}</b><br/><br/>${p.thesis}<br/><br/><span style="font-size:13px;color:var(--text-dim);">${(p.keyIdeas||[]).join(' · ')}</span>`
    })) },
    { id: 'notions', label: 'Notions', build: () => App.data.notions.map(n => ({
      kind: 'Notion', q: n.name, a: n.long
    })) },
    { id: 'gloss', label: 'Définitions', build: () => App.data.glossary.map(g => ({
      kind: g.etym ? g.etym : 'Définition', q: g.term, a: g.def
    })) },
    { id: 'theses', label: 'Thèses-clés', build: () => [
      { kind:"Descartes", q:"« Je pense, donc je suis »", a:"Première certitude indubitable obtenue par le doute hyperbolique. Connaissance immédiate de moi en tant que <b>chose pensante</b>." },
      { kind:"Spinoza", q:"Le libre arbitre est…", a:"Une <b>illusion</b>. Métaphore de la pierre. Nous sommes conscients de nos désirs mais ignorants des causes qui nous déterminent." },
      { kind:"Sartre", q:"« L'existence précède l'essence »", a:"Pour l'homme uniquement. Contrairement à un objet fabriqué, l'homme se construit par ses choix. Il est <b>condamné à être libre</b>." },
      { kind:"Freud", q:"« Le moi n'est pas maître dans sa propre maison »", a:"Critique du primat de la conscience. La vie psychique est largement inconsciente : <b>Moi · Surmoi · Ça</b>." },
      { kind:"Kant", q:"« J'ai dû abolir le savoir pour y substituer la croyance »", a:"On ne peut connaître que les <b>phénomènes</b>, pas les <b>noumènes</b>. Dieu, l'âme, la liberté restent des postulats de la raison pratique." },
      { kind:"Pascal", q:"« Le cœur a ses raisons que la raison ne connaît point »", a:"Les premiers principes (axiomes, postulats) <b>se sentent</b>, ils ne se démontrent pas. Vérités du cœur." },
      { kind:"Popper", q:"Critère de scientificité", a:"La <b>falsifiabilité</b> : une théorie est scientifique si elle peut être réfutée par l'expérience. La psychanalyse échoue à ce critère." },
      { kind:"Bergson", q:"Pourquoi ne voyons-nous pas les choses mêmes ?", a:"Parce que notre perception est <b>utilitaire</b> et que le langage <b>généralise</b>. Seul l'<b>art</b> peut révéler l'individualité du réel." },
      { kind:"Saussure", q:"Le signe linguistique", a:"Union d'un <b>signifiant</b> (matériel : son, mot, geste) et d'un <b>signifié</b> (mental : concept). Le rapport est <b>arbitraire</b>." },
      { kind:"Kant", q:"Distinction beau / agréable", a:"L'<b>agréable</b> plaît particulièrement (chacun son goût). Le <b>beau</b> est subjectif mais prétend à l'universalité ; il est désintéressé et intellectuel." },
      { kind:"Hobbes", q:"L'état de nature selon Hobbes", a:"Une <b>guerre permanente de tous contre tous</b>. La vie y est brève, solitaire, misérable. Solution : transférer ses libertés à un souverain absolu (Léviathan)." },
      { kind:"Locke", q:"L'État libéral", a:"L'État doit être <b>constitutionnel</b>, <b>divisé</b>, <b>limité</b> et <b>responsable</b>. Il ne fait que protéger les droits naturels." },
      { kind:"Pascal", q:"Justice et force", a:"« La justice sans la force est <b>impuissante</b> ; la force sans la justice est <b>tyrannique</b>. »" },
      { kind:"Antigone", q:"Légalité vs légitimité", a:"Antigone incarne la <b>loi morale</b> (légitimité) ; Créon la <b>loi politique</b> (légalité). Conflit tragique entre conscience et État." },
      { kind:"Épicure", q:"L'ataraxie", a:"Bonheur = <b>absence de souffrance</b> physique et psychologique. Cherche les désirs naturels et nécessaires ; fuis les désirs irraisonnables (gloire, richesse)." },
      { kind:"Calliclès", q:"Le hédonisme radical", a:"Le bonheur = satisfaction <b>compulsive</b> de tous nos désirs. Vivre selon la nature. Vie comparée par Socrate au tonneau des Danaïdes." }
    ] }
  ];

  let deckId = 'philos';
  let cards = decks[0].build();
  let idx = 0, flipped = false;

  const render = () => {
    const c = cards[idx];
    App.render(`
      <div class="page-head">
        <div class="crumbs"><a href="#/">Accueil</a> · Flashcards</div>
        <h1>Les <em style="color:var(--accent);">flashcards</em></h1>
        <p class="lead">Mémorise par retournement. Choisis un paquet, clique sur la carte pour révéler la réponse.</p>
      </div>
      <div class="flash-stage">
        <div class="flash-deck-picker" id="dp">
          ${decks.map(d => `<button class="deck-pill ${d.id===deckId?'active':''}" data-id="${d.id}">${d.label} <span style="opacity:.6;">(${d.build().length})</span></button>`).join('')}
        </div>
        <div class="flashcard ${flipped?'flipped':''}" id="fc">
          <div class="flashcard-inner">
            <div class="flashcard-face flashcard-front">
              <div class="flashcard-kind">${c.kind || ''}</div>
              <div class="flashcard-q">${c.q}</div>
              <div class="flashcard-hint">cliquer pour retourner · ← → pour naviguer</div>
            </div>
            <div class="flashcard-face flashcard-back">
              <div class="flashcard-kind">${c.kind || ''}</div>
              <div class="flashcard-a">${c.a}</div>
              <div class="flashcard-hint">cliquer pour revenir</div>
            </div>
          </div>
        </div>
        <div class="flash-controls">
          <button class="btn" id="prev">← Précédent</button>
          <span class="flash-counter">${idx+1} / ${cards.length}</span>
          <button class="btn btn-primary" id="next">Suivant →</button>
        </div>
        <button class="btn" id="shuffle">🎲 Mélanger</button>
      </div>
    `);

    document.getElementById('fc').addEventListener('click', () => { flipped = !flipped; render(); });
    document.getElementById('prev').addEventListener('click', () => { idx = (idx-1+cards.length)%cards.length; flipped=false; render(); });
    document.getElementById('next').addEventListener('click', () => { idx = (idx+1)%cards.length; flipped=false; render(); });
    document.getElementById('shuffle').addEventListener('click', () => {
      cards = cards.slice().sort(() => Math.random()-.5);
      idx = 0; flipped = false; render();
    });
    document.querySelectorAll('#dp .deck-pill').forEach(b => {
      b.addEventListener('click', () => {
        deckId = b.dataset.id;
        cards = decks.find(d => d.id === deckId).build();
        idx = 0; flipped = false; render();
      });
    });
  };

  // Keyboard
  const keyHandler = (e) => {
    if (e.target.matches('input, textarea')) return;
    if (e.key === 'ArrowRight') { idx = (idx+1)%cards.length; flipped=false; render(); }
    if (e.key === 'ArrowLeft') { idx = (idx-1+cards.length)%cards.length; flipped=false; render(); }
    if (e.key === ' ') { e.preventDefault(); flipped = !flipped; render(); }
  };
  document.removeEventListener('keydown', App._fcKey || (()=>{}));
  App._fcKey = keyHandler;
  document.addEventListener('keydown', keyHandler);

  render();
};

// =========================================================
// Timeline
// =========================================================
App.routes.timeline = function() {
  const sorted = App.data.philosophers.slice().sort((a,b) => {
    const yearA = parseInt((a.dates.match(/-?\d{3,4}/) || [0])[0]) * (a.dates.includes('av.') ? -1 : 1);
    const yearB = parseInt((b.dates.match(/-?\d{3,4}/) || [0])[0]) * (b.dates.includes('av.') ? -1 : 1);
    return yearA - yearB;
  });

  const items = sorted.map(p => `
    <div class="tl-item">
      <div class="dot"></div>
      <a class="tl-card" href="#/philosophes/${p.id}" style="text-decoration:none;color:inherit;">
        <div class="tl-year">${p.dates}</div>
        <div class="tl-name">${p.name}</div>
        <div class="tl-desc">${(p.thesis||'').slice(0,90)}…</div>
      </a>
    </div>
  `).join('');

  App.render(`
    <div class="page-head">
      <div class="crumbs"><a href="#/">Accueil</a> · Frise</div>
      <h1>La <em style="color:var(--accent);">frise</em> philosophique</h1>
      <p class="lead">Plus de 2500 ans de pensée — d'Héraclite à Rawls.</p>
    </div>
    <div class="timeline">${items}</div>
  `);
};
