// Séquence 2 — La vérité n'appartient-elle qu'aux domaines de la raison et de la science ?
window.SEQUENCE_2 = {
  id: 2,
  number: "II",
  slug: "verite-raison-science",
  title: "La vérité n'appartient-elle qu'aux domaines de la raison et de la science ?",
  short: "Doute, méthode, induction, falsifiabilité, vérités du cœur.",
  perspectives: ["La connaissance"],
  notions: ["Vérité","Raison","Science","Religion"],
  reperes: ["subjectif / objectif / intersubjectif","intuitif / discursif","persuader / convaincre","vrai / probable / certain","médiat / immédiat"],
  work: null,
  mdFile: "sequences/sequence_2_verite_raison_science.md",
  tint: "#7ed4c5",
  plan: [
    { t: "La raison seule peut nous conduire à la vérité", sub: ["La raison face aux obstacles à la vérité (Galilée)","L'exigence d'une méthode rationnelle (Descartes)","La maîtrise rationnelle de l'expérience (Torricelli)"] },
    { t: "Mais la raison se doit d'être raisonnable et reconnaître ses limites", sub: ["Limites des sciences formelles et naturelles (Hume)","Impossibilité de démontrer Dieu, l'âme, la liberté (Kant)","Limites des sciences humaines (Dilthey)"] },
    { t: "Il faut donc reconsidérer nos espoirs de vérité", sub: ["Théorie scientifique vraie = falsifiable (Popper)","Le rôle de l'imagination (Einstein)","Les vérités qui se sentent (Pascal)","La vérité esthétique (Bergson)"] }
  ],
  content: `
<h2 id="intro">Introduction</h2>

<h3>Définition de la vérité</h3>

<div class="doc">
  <h4>Distinction VRAI / RÉEL</h4>
  <ul>
    <li>« Je pense, donc je suis » (Descartes) → <strong>vrai</strong></li>
    <li>L'idée de Dieu → <strong>réel</strong></li>
    <li>2 + 5 = 7 → <strong>vrai</strong></li>
    <li>Les hallucinations → <strong>réel</strong></li>
  </ul>
  <p><strong>Réalité</strong> : ensemble des choses existantes (matérielles ou immatérielles, physiques ou psychiques).</p>
  <p><strong>Vérité</strong> : propriété de nos idées ou énoncés ; adéquation entre une idée/un énoncé et la réalité à laquelle elle se réfère.</p>
  <p><strong>Certitude</strong> : état de l'esprit qui sait posséder la vérité ; effet de la vérité sur le moi.</p>
</div>

<h3>Les obstacles à la vérité</h3>

<div class="doc">
  <h4>Distinction VÉRITÉ / OPINION / PRÉJUGÉ / CROYANCE / APPARENCE / HYPOTHÈSE</h4>
  <ul>
    <li>L'inconscient psychique (Freud) → <strong>Hypothèse</strong></li>
    <li>L'immortalité de l'âme → <strong>Croyance</strong></li>
    <li>Statistiquement, les femmes conduisent plus prudemment → <strong>Vérité</strong></li>
    <li>Les femmes sont moins rationnelles que les hommes → <strong>Préjugé</strong></li>
    <li>La relation avec un chien est plus intense qu'avec un homme → <strong>Opinion</strong></li>
    <li>L'immobilité de la Terre, les couleurs, les goûts → <strong>Apparence</strong></li>
    <li>Le théorème de Pythagore → <strong>Vérité</strong></li>
  </ul>
</div>

<p><strong>1ᵉʳ problème :</strong> Comment parvenir à la vérité ? Comment distinguer le vrai du faux ?</p>

<p><strong>Solution :</strong> identifier les <em>facultés de connaître</em>, leur pouvoir et leurs limites.</p>
<ol>
  <li><strong>La sensibilité</strong> : perception à travers les sens. <em>Problèmes :</em> les sens sont parfois trompeurs ; les sensations varient selon les individus.</li>
  <li><strong>L'imagination</strong> : faculté de former des images. <em>Problèmes :</em> elle peut être trop fantaisiste.</li>
  <li><strong>La raison</strong></li>
</ol>

<h3>La raison : définition, usages, pouvoirs</h3>

<p>Du latin <em>ratio</em> = le calcul, le raisonnement.</p>

<div class="encadre">
  <div class="encadre-block">
    <div class="label">Rationnel</div>
    <div class="vals">Usage <strong>théorique</strong> de la raison (connaissance). « La puissance de bien juger et de distinguer le vrai du faux. »</div>
  </div>
  <div class="encadre-block">
    <div class="label">Raisonnable</div>
    <div class="vals">Usage <strong>pratique</strong> : agir efficacement (morale, politique, bonheur, vie économique).</div>
  </div>
</div>

<p>La raison est une <strong>faculté maîtresse</strong> qui prend du recul par rapport aux sens et à l'imagination.</p>

<h3>La raison dans la science</h3>

<div class="callout def">
  <div class="callout-title">Science</div>
  <p>Ensemble de connaissances logiques et vérifiables acquises à travers l'observation, l'expérimentation et la démonstration.</p>
</div>

<p>Trois familles de sciences :</p>
<ol>
  <li><strong>Sciences formelles</strong> (logique, mathématiques) : purement rationnelles. Vérité <em>formelle</em>.</li>
  <li><strong>Sciences naturelles</strong> (physique, chimie, biologie) : vérité <em>matérielle</em>, lois nécessaires et universelles.</li>
  <li><strong>Sciences humaines et sociales</strong> (histoire, anthropologie, psychologie, sociologie) : « inexactes » non par leur méthode mais parce que l'homme ne s'inscrit pas dans un déterminisme naturel.</li>
</ol>

<h2 id="part-1">I. La raison seule peut nous conduire à la vérité</h2>

<h3 id="galilee">1. La raison face aux obstacles à la vérité</h3>

<div class="callout note">
  <div class="callout-title">Étude — Galilée ou l'amour de Dieu (téléfilm 2007)</div>
  <p>En 1633, Galilée comparaît devant le tribunal de l'Inquisition. Sur la question de la chute des corps, l'extrait met en lumière les <strong>obstacles épistémologiques</strong> (Bachelard) à la vérité.</p>
</div>

<ol>
  <li><strong>La théorie de l'époque :</strong> les corps tombent à des vitesses différentes selon leur poids.</li>
  <li><strong>Obstacles à la vérité :</strong> (1) l'évidence sensible, (2) l'argument d'autorité (Aristote).</li>
  <li><strong>Réfutation par Galilée :</strong> il fait tomber simultanément deux boîtes de masses différentes — elles atteignent le sol ensemble.</li>
  <li><strong>Réaction des savants :</strong> trouver une explication surnaturelle (« diablerie ») pour préserver le savoir établi.</li>
  <li><strong>Conciliation :</strong> Galilée explique que la différence vient de la <em>résistance de l'air</em>, non de la masse.</li>
  <li><strong>Vérité :</strong> il faut une théorie capable d'expliquer les phénomènes polémiques (inertie + gravitation).</li>
</ol>

<h3 id="descartes">2. L'exigence d'une méthode rationnelle (Descartes)</h3>

<h4>a) La source de la vérité et la cause de la fausseté</h4>

<blockquote>
  Le bon sens est la chose la mieux partagée […] la puissance de bien juger, et de distinguer le vrai d'avec le faux, qui est proprement ce qu'on nomme le bon sens ou la raison, est naturellement égale en tout homme.
  <cite>Descartes, Discours de la méthode</cite>
</blockquote>

<ul>
  <li>La raison est <strong>innée et universelle</strong>, possédée au même degré par tous.</li>
  <li>La diversité des opinions vient du fait que « nous conduisons nos pensées par diverses voies ».</li>
  <li>La raison ne mène à la vérité qu'à condition de <strong>savoir s'en servir</strong>.</li>
</ul>

<h4>b) Le doute méthodique</h4>

<p>Connaître, c'est connaître par la <strong>raison</strong> en adoptant une attitude <strong>sceptique</strong> à l'égard de ce qu'on croit spontanément. Il faut suspendre son jugement et adopter le <strong>doute comme méthode</strong>. Le doute cartésien n'est pas un but en lui-même : c'est un <strong>moyen</strong> pour fonder la vérité.</p>

<p>Finalité : parvenir à des <strong>vérités indubitables</strong> sur lesquelles rebâtir le savoir. Exemple : « Je pense donc je suis. »</p>

<h4>c) L'élargissement de la certitude mathématique</h4>

<blockquote>
  Ces longues chaînes de raisons, toutes simples et faciles, dont les géomètres ont coutume de se servir […] m'avaient donné occasion de m'imaginer que toutes les choses qui peuvent tomber sous la connaissance des hommes s'entresuivent en même façon.
  <cite>Descartes, Discours de la méthode, II</cite>
</blockquote>

<p>Les mathématiques reposent sur deux principes méthodiques infaillibles :</p>
<ul>
  <li><strong>L'intuition</strong> : connaissance immédiate d'une évidence indubitable. Les axiomes/postulats sont des évidences indémontrables.</li>
  <li><strong>La déduction</strong> : raisonnement où l'on tire des propositions particulières à partir de propositions générales, de manière nécessaire.</li>
</ul>

<div class="mindmap">
  <div class="mm-center">Progression cartésienne</div>
  <div class="mm-branches">
    <div class="mm-branch">
      <h4>Constat</h4>
      <ul><li>Faillibilité des sens</li><li>Incertitude des opinions</li><li>→ absence de certitude</li></ul>
    </div>
    <div class="mm-branch">
      <h4>Doute méthodique</h4>
      <ul><li>Douter de tout ce qui n'est pas certain</li><li>Doute hyperbolique : malin génie</li></ul>
    </div>
    <div class="mm-branch">
      <h4>Intuition</h4>
      <ul><li>1ʳᵉ vérité : « Je pense, je suis »</li><li>Je suis une chose pensante</li></ul>
    </div>
    <div class="mm-branch">
      <h4>Déduction</h4>
      <ul><li>2ᵉ : Existence de Dieu</li><li>3ᵉ : Garant de la vérité</li><li>4ᵉ : Connaissance de la nature possible</li></ul>
    </div>
  </div>
</div>

<h3 id="torricelli">3. La méthode expérimentale (Torricelli, 1643)</h3>

<div class="encadre">
  <div class="encadre-block"><div class="label">Sensible</div><div class="vals">PERCEVOIR : connaissance immédiate, comporte un risque d'illusion.</div></div>
  <div class="encadre-block"><div class="label">Vécue</div><div class="vals">ÊTRE EXPÉRIMENTÉ : savoir-faire accumulé, particulier et subjectif.</div></div>
  <div class="encadre-block"><div class="label">Scientifique</div><div class="vals">EXPÉRIMENTER : vérification d'hypothèse, construite par une raison active. ✓ Objective.</div></div>
</div>

<ol>
  <li><strong>Constat d'un fait polémique :</strong> à Florence, l'eau aspirée par pompe ne monte pas au-delà de 10,33 m. Contredit la théorie selon laquelle « il n'y a pas de vide dans la nature ».</li>
  <li><strong>Hypothèse :</strong> Torricelli suppose que le vide existe et que l'air pousse sur la surface de l'eau (pression atmosphérique).</li>
  <li><strong>Vérification expérimentale :</strong> avec un tube de mercure (13× plus dense), Torricelli observe que le mercure s'arrête à 76 cm. Au-dessus : du <strong>vide</strong>. Preuve du vide et de la pression atmosphérique.</li>
</ol>
`
};
