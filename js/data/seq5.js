// Séquence 5 — Revient-il à l'État de décider de ce qui est juste ?
window.SEQUENCE_5 = {
  id: 5,
  number: "V",
  slug: "etat-justice",
  title: "Revient-il à l'État de décider de ce qui est juste ?",
  short: "Légalité, légitimité, contrat social, désobéissance.",
  perspectives: [],
  notions: ["Justice","État","Liberté","Devoir","Bonheur"],
  reperes: ["en fait / en droit","contrainte / obligation"],
  work: null,
  tint: "#7eb6d4",
  plan: [
    { t: "La justice et la morale ne sont pas des notions naturelles", sub: ["Pas de justice ni droit à l'état de nature (Rousseau)","Sociétés sauvages sans État (Clastres)","L'homme a besoin d'un maître (Kant)"] },
    { t: "Il revient à l'État de décider de ce qui est juste", sub: ["Légitimité du pouvoir : contrat social","Hobbes : pessimiste","Locke : optimiste","La justice repose sur la force (Pascal, Marx, Rawls)"] },
    { t: "La justice est aussi morale et relève de la conscience", sub: ["Conflit loi politique / loi morale (Antigone)","Désobéissance civile (Rawls)"] }
  ],
  content: `
<h2 id="intro">Introduction</h2>

<p>La justice est <strong>polysémique</strong> : à la fois ce qui est <strong>légal</strong> (conforme aux lois) et ce qui est <strong>moral</strong>, légitime, justifié.</p>

<p>Les hommes voudraient des lois qui reflètent ce qu'ils tiennent pour moral. Mais l'expérience montre que nous sommes <em>incapables</em> de parvenir à une conception commune de ce qui est moral. On délègue donc à l'<strong>État</strong> la tâche de décider de ce qui est juste.</p>

<p>Cette solution est problématique : elle réduit la <strong>justice à la légalité</strong>. Cela revient à considérer comme justes des situations ressenties comme injustes (inégalités sexuelles, ségrégation raciale, travail des enfants).</p>

<p>Comment régler ce conflit entre la <strong>légalité</strong> et les <strong>valeurs morales individuelles</strong> sans mettre en danger l'État (institutions législatives, judiciaires, exécutives, administratives, militaires) ?</p>

<h2 id="part-1">I. Justice et morale ne sont pas des notions naturelles</h2>

<p>Malgré l'ancienneté de l'<em>Homo sapiens</em>, les sociétés civiles n'existent que depuis quelques milliers d'années. Il existe encore des sociétés « sauvages » sans autorité politique. À quoi ressemble l'homme à l'<strong>état de nature</strong>, en dehors de son existence culturelle ?</p>

<div class="callout">
  <div class="callout-title">Distinction</div>
  <p>nature ≠ culture / état de nature ≠ état civil</p>
</div>

<h3 id="rousseau5">1. Justice et droit n'existent pas à l'état de nature (Rousseau)</h3>

<h4>a) L'état de nature : une notion problématique</h4>
<p>Difficile de « démêler ce qu'il y a de naturel et d'artificiel dans la nature actuelle de l'homme ». L'état de nature est « un état qui n'existe plus, qui n'a peut-être point existé, qui probablement n'existera jamais ». Grâce à la <strong>perfectibilité</strong>, l'homme est davantage un être de culture que de nature.</p>

<h4>b) L'homme naturel n'a ni les lumières ni les vices de l'homme civil</h4>
<p>L'homme naturel est un animal. Pas de valeurs morales (sincérité, respect, fidélité). Pas non plus les vices (jalousie, hypocrisie, avarice, domination). Le comportement vise la satisfaction des besoins primaires.</p>

<h4>c) L'homme naturel est asocial et amoral</h4>
<p>« Les seuls biens qu'il connaisse dans l'univers sont la nourriture, une femelle et le repos ; les seuls maux qu'il craigne sont la douleur et la faim. » Pas d'interdépendance entre les hommes. Il n'est ni bon ni méchant : juste un « animal borné ».</p>

<h4>d) L'homme naturel ne dispose que d'un sentiment naturel de pitié</h4>
<p>L'homme naturel ne connaît ni devoir ni justice. Il n'éprouve que l'<strong>amour de soi</strong> (souci de sa conservation), ce qui rend possible « la répugnance innée à voir souffrir son semblable ». La <strong>pitié</strong> est un sentiment naturel qui précède la moralité : « c'est elle qui, dans l'état de nature, tient lieu de lois, de mœurs et de vertu ».</p>

<h4>e) Avantages et désavantages</h4>
<p>L'état de nature semble idéal (paix, liberté, indépendance, innocence), mais ne peut pas durer. La perfectibilité éloigne l'homme de la nature ; vices et affaiblissement de la pitié rendent nécessaire la création d'un <strong>État</strong>.</p>

<h3 id="clastres5">2. Les sociétés sauvages n'ont ni État ni appareil judiciaire (Clastres)</h3>

<blockquote>
  Il n'y a pas de roi dans la tribu, mais un chef qui n'est pas un chef d'État. […] Le chef ne dispose d'aucune autorité, d'aucun pouvoir de coercition, d'aucun moyen de donner un ordre. […] L'espace de la chefferie n'est pas le lieu du pouvoir.
  <cite>Pierre Clastres</cite>
</blockquote>

<p>Le pouvoir du chef indien est un « pouvoir impuissant », « une chefferie sans autorité », « une fonction qui fonctionne à vide ». Il doit être :</p>
<ul>
  <li>Excellent <strong>orateur</strong> (apaiser les querelles « par la force du verbe »)</li>
  <li><strong>Généreux</strong> (donner ses richesses au peuple)</li>
  <li><strong>Faiseur de paix</strong> et chef de guerre</li>
</ul>

<p>En temps de paix, pas de force policière, pas de pouvoir judiciaire, exécutif ou législatif. Aucune sanction. Si le chef ne tient pas ses devoirs, le village l'<em>abandonne</em>.</p>

<p><strong>Problème :</strong> ces sociétés sont fragilisées par les sociétés politiques « civilisées ». L'autorité politique paraît importante pour <em>survivre</em>, mais pas <em>nécessaire</em>.</p>

<h3 id="kant5">3. L'homme est un animal ambivalent qui a besoin d'un maître (Kant)</h3>

<p>L'homme est un mixte entre raison et déraison, sagesse et démesure. Il n'est fait ni pour vivre seul, ni pour vivre avec ses semblables. <strong>Kant</strong> parle d'<strong>insociable sociabilité</strong>.</p>

<blockquote>
  Tant qu'il vit parmi des individus de son espèce, l'homme a besoin d'un maître ; sinon, il abuse à coup sûr de sa liberté à l'égard de ses semblables.
  <cite>Kant</cite>
</blockquote>

<p>L'homme « souhaite une loi qui limite la liberté de tous », mais « son penchant animal à l'égoïsme l'incite à se réserver un régime d'exception pour lui-même ». Difficulté : ce maître aura, à son tour, le même penchant animal.</p>

<h2 id="part-2">II. Il revient donc à l'État de décider de ce qui est juste</h2>

<p>Le politique (du grec <em>polis</em>, « cité ») est l'art de gouverner la cité dans l'intérêt général.</p>

<h3>1. La légitimité du pouvoir étatique : le contrat social</h3>

<p>Naturellement, les hommes naissent <strong>libres et égaux</strong>. L'état de nature se transforme progressivement en situation de conflit. Pour en sortir, les hommes concluent un <strong>contrat social</strong> : ils renoncent ensemble à une partie de leurs libertés naturelles, transférées à une autorité politique. Cette force commune représente l'État, qui :</p>
<ul>
  <li>assure la paix sociale</li>
  <li>protège les libertés individuelles</li>
  <li>réglemente les interactions humaines</li>
  <li>sanctionne les actions contraires à l'intérêt général</li>
</ul>

<h4>a) Perspective pessimiste (Hobbes)</h4>

<p>L'état de nature est un état de <strong>guerre permanente de tous contre tous</strong>. Pour Hobbes : « chacun jouit d'une liberté très entière, mais qui est infructueuse ». La vie y est <strong>brève, solitaire, misérable</strong>, menacée d'une mort violente.</p>

<p>Le seul moyen d'en sortir : un <strong>contrat social</strong> par lequel les hommes transfèrent leurs libertés à un <strong>souverain</strong> (roi, assemblée). Hobbes préfère la <strong>monarchie absolue</strong> : un pouvoir illimité capable de tenir les hommes en respect par la <strong>contrainte</strong>.</p>

<p>L'État est comparé à un <strong>Léviathan</strong> (monstre mythologique). Mais c'est un moindre mal. Le souverain est <em>au-dessus des lois</em> et il n'est pas possible de lui désobéir.</p>

<h4>b) Perspective optimiste (Locke)</h4>

<p>La pensée libérale propose une vision plus optimiste : le pouvoir politique est :</p>
<ul>
  <li><strong>Constitutionnel</strong> (encadré par des lois)</li>
  <li><strong>Divisé</strong> (séparation des pouvoirs)</li>
  <li><strong>Limité</strong> (protection des droits individuels)</li>
  <li><strong>Responsable devant les citoyens</strong></li>
</ul>

<p>Pour Locke, l'homme à l'état de nature est <strong>moral et rationnel</strong>, reconnaissant les droits naturels de l'autre (vie, propriété, liberté de poursuivre son bonheur). Mais sa façon de venger les innocents devient source de conflits. L'État est un <strong>arbitre impartial</strong> qui protège les droits naturels.</p>

<h3 id="pascal5">3. La justice repose sur la force de l'État</h3>

<blockquote>
  La justice sans la force est impuissante ; la force sans la justice est tyrannique.
  <cite>Blaise Pascal</cite>
</blockquote>

<p>Beaucoup respectent les lois par <strong>contrainte</strong>, non par obligation (limitations de vitesse). L'État détient « le <strong>monopole de la violence légitime</strong> » (Max Weber).</p>

<div class="encadre">
  <div class="encadre-block">
    <div class="label">Contrainte</div>
    <div class="vals">Force <strong>extérieure</strong> qui s'exerce sur soi pour obtenir un effet indépendant — souvent contraire — de la volonté.</div>
  </div>
  <div class="encadre-block">
    <div class="label">Obligation</div>
    <div class="vals">Action <strong>libre</strong>, consentement de la part de celui qui est obligé.</div>
  </div>
</div>

<h4>a) Le problème de la majorité (Tocqueville)</h4>
<p>La démocratie peut se transformer en <strong>tyrannie de la majorité</strong>, qui impose ses intérêts et préférences. Exemples : pays où l'homosexualité, l'athéisme, le féminisme, l'IVG sont pénalisés (parfois par la peine capitale).</p>

<h4>b) La force des plus forts économiquement (Marx)</h4>
<p>Pour Marx, la loi tire sa force d'un rapport de domination économique : ce sont les puissants qui exercent le pouvoir. Pas de justice sans <strong>justice sociale</strong>.</p>

<div class="encadre">
  <div class="encadre-block">
    <div class="label">En fait</div>
    <div class="vals">Ce qui est <em>effectif</em> actuellement.</div>
  </div>
  <div class="encadre-block">
    <div class="label">En droit</div>
    <div class="vals">Ce qui <em>doit être</em>, mais qui n'est pas nécessairement ou ne sera peut-être jamais.</div>
  </div>
</div>

<p>Pour Marx, la solution suppose la suppression de la propriété privée (<strong>communisme</strong>) — solution problématique.</p>

<h4>c) Égalité politique en droit / impuissance en fait (Rawls)</h4>
<p>En Europe occidentale, on ne peut plus dire que les lois protègent uniquement les intérêts capitalistes. Mais : <strong>en droit</strong> nous avons les mêmes droits politiques ; <strong>en fait</strong>, les inégalités sociales conduisent à des différences d'information, d'instruction, de capacité à proposer des idées. Le débat est monopolisé par les citoyens aisés (campagnes, presse, télévision, réseaux sociaux). Solution de Rawls : <strong>renforcement économique de la classe moyenne</strong>.</p>

<h2 id="part-3">III. La justice relève aussi de la conscience individuelle</h2>

<h3 id="antigone">1. Le conflit entre loi politique et loi morale (Antigone)</h3>

<p>Dans la pièce de <strong>Sophocle</strong>, le frère d'Antigone meurt en combattant sa propre cité. Le roi <strong>Créon</strong> interdit qu'on l'enterre. Antigone, éprise de justice, enfreint la loi et tente de l'enterrer. Elle est condamnée à mort, emmurée vivante.</p>

<div class="encadre">
  <div class="encadre-block">
    <div class="label">Antigone</div>
    <div class="vals">Le <strong>devoir moral</strong> (justice morale). <strong>Légitimité</strong>. Vertu intérieure.</div>
  </div>
  <div class="encadre-block">
    <div class="label">Créon</div>
    <div class="vals">La <strong>justice étatique</strong>. <strong>Légalité</strong>. Rétablir l'ordre, l'équilibre, l'harmonie de la cité.</div>
  </div>
</div>

<p>L'idéal serait de concilier les deux. Travail extrêmement difficile pour le législateur : un véritable travail d'<em>équilibriste</em>.</p>

<h3 id="rawls">2. La désobéissance civile (Rawls)</h3>

<blockquote>
  La désobéissance civile peut être définie comme un acte public, non-violent, décidé en conscience, mais politique, contraire à la loi et accompli le plus souvent pour amener un changement dans la loi ou bien dans la politique du gouvernement.
  <cite>John Rawls</cite>
</blockquote>

<p>Délicate dans le cas d'un État démocratique : opposition entre le <em>contenu</em> de la loi (qu'on rejette) et son <em>mode de production démocratique</em> (qu'on accepte). Que faire ? Il revient à chaque citoyen d'agir <strong>en son âme et conscience</strong>.</p>

<h2 id="conclusion">Conclusion</h2>

<p>Pour la vie en communauté, il revient principalement à l'<strong>État</strong> de décider de ce qui est juste — <em>à condition</em> que cette décision incite les citoyens à la <strong>vigilance</strong>, par la publicité des actions politiques.</p>

<p>En revanche, dans la sphère privée (fidélité, bienveillance, aider un voisin), il n'appartient pas à l'État de légiférer. L'<strong>action morale</strong> a lieu par <strong>obligation</strong> et non par <strong>contrainte</strong>.</p>
`
};
