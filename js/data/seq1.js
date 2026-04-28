// Séquence 1 — La conscience de soi garantit-elle la connaissance de soi ?
window.SEQUENCE_1 = {
  id: 1,
  number: "I",
  slug: "conscience-connaissance",
  title: "La conscience de soi garantit-elle la connaissance de soi ?",
  short: "Conscience, inconscient, liberté, temps : peut-on vraiment se connaître ?",
  perspectives: ["La connaissance", "La morale et la politique"],
  notions: ["CONSCIENCE","INCONSCIENT","LIBERTÉ","TEMPS","Vérité","Science"],
  reperes: ["médiat / immédiat","subjectif / objectif","intuitif / discursif","essentiel / accidentel"],
  work: "Rousseau, Discours sur l'origine et les fondements de l'inégalité parmi les hommes",
  tint: "#d4a85a",
  plan: [
    { t: "La connaissance de soi nécessite la conscience de soi", sub: ["« Je pense, je suis » : première certitude (DESCARTES)","La conscience de soi fonde l'unité de la personne (KANT)","L'homme est un « être pour soi » (HEGEL)"] },
    { t: "Le moi occulte", sub: ["Les « petites perceptions » inconscientes (LEIBNIZ)","L'illusion de libre arbitre (SPINOZA)","L'inconscient psychique (FREUD)"] },
    { t: "L'existence humaine, la liberté et le temps", sub: ["Qu'est-ce que le moi ? (PASCAL)","La perfectibilité (ROUSSEAU)","Le moi est un projet (SARTRE)"] }
  ],
  content: `
<h2 id="intro">Introduction</h2>

<div class="callout def">
  <div class="callout-title">Conscience</div>
  <p>Du latin <em>cum + scientia</em> = <strong>« accompagné de savoir »</strong>. Mais quel type de savoir ?</p>
  <ul>
    <li><strong>Conscience immédiate</strong> (spontanée) : tournée vers le monde extérieur. Faculté de se représenter parmi les choses. Ex. : « Je sais que Samuel est à côté de moi ».</li>
    <li><strong>Conscience réfléchie</strong> : tournée vers soi-même — vers ses pensées, actes, émotions. Elle implique un dédoublement entre un sujet (le moi qui pense) et un objet (le moi pensé). Elle fait de nous les <em>spectateurs de nous-mêmes</em>.</li>
  </ul>
</div>

<h3>Ouverture vers la problématisation</h3>
<p>Il est évident que la conscience de soi (réfléchie) est la condition <strong>nécessaire</strong> pour se connaître soi-même. Mais peut-on affirmer qu'elle <strong>englobe</strong> tout ce que je suis ? Nous sommes souvent surpris par nos propres pensées, actes, désirs. Cela nous amène à l'hypothèse d'une partie occulte : <strong>l'inconscient</strong>.</p>

<p>Une connaissance véritable de soi doit aussi être <strong>objective</strong>. Or notre représentation de nous-mêmes est influencée par la mauvaise foi et la subjectivité. De surcroît, notre identité n'est pas figée : elle se construit dans le <strong>temps</strong>.</p>

<div class="callout">
  <div class="callout-title">Vérité</div>
  <p>= la concordance entre ce qu'on pense ou dit et la réalité.</p>
</div>

<h2 id="part-1">I. La connaissance de soi nécessite la conscience de soi</h2>

<p>Contrairement aux animaux, l'homme a la capacité de se connaître lui-même parce qu'il est doué de <strong>conscience réfléchie</strong>, qui représente <em>le pouvoir de se penser soi-même</em>, d'avoir une connaissance <strong>immédiate</strong> de ses pensées, sentiments, émotions, perceptions, souvenirs, etc.</p>

<h3 id="descartes">1. « Je pense, je suis » : première certitude (Descartes)</h3>

<div class="author-card">
  <div class="ac-avatar">D</div>
  <div>
    <div class="ac-name">René Descartes</div>
    <div class="ac-meta">1596 – 1650 · France · <em>Méditations métaphysiques</em></div>
  </div>
</div>

<p>Paradoxalement, il est <strong>plus aisé de se connaître soi-même</strong> que le monde extérieur. Telle est la conclusion de Descartes après une entreprise de <strong>doute méthodique et hyperbolique</strong> envers tout ce qu'on pense savoir. Objectif : surmonter le scepticisme afin de fonder une nouvelle science sur des bases certaines.</p>

<h4>a) Le scepticisme</h4>

<div class="callout def">
  <div class="callout-title">Scepticisme</div>
  <p>Position philosophique selon laquelle la <strong>vérité</strong> est <em>inatteignable</em>.</p>
</div>

<p><strong>Arguments du scepticisme :</strong></p>
<ul>
  <li><strong>Les sens sont trompeurs.</strong> La finalité biologique de la perception n'est pas de percevoir le monde tel qu'il est, mais tel qu'il est utile à la survie. Exemples : couleurs, mouvement du soleil, immobilité de la Terre.</li>
  <li><strong>La raison n'est pas infaillible.</strong> Le géocentrisme était un système astronomique cohérent et efficace, mais fondé sur un jugement faux.</li>
</ul>

<p><strong>Solution sceptique :</strong> Douter de tout et ne rien tenir pour vrai.</p>

<h4>b) Le doute méthodique et hyperbolique</h4>

<div class="callout note">
  <div class="callout-title">Méthodique / Hyperbolique</div>
  <p><strong>Méthodique</strong> : qui sert de méthode. <strong>Hyperbolique</strong> : volontairement exagéré.</p>
</div>

<p>Pour surmonter le scepticisme, Descartes met en place le doute méthodique. Le but : <strong>la remise en question</strong> de tout afin de découvrir des <strong>certitudes indubitables</strong> sur lesquelles bâtir le système du savoir.</p>

<p><strong>Étapes du doute :</strong></p>
<ol>
  <li><strong>Le problème des sens</strong> : les sens sont parfois trompeurs.</li>
  <li><strong>L'hypothèse du rêve</strong> : on ne peut pas distinguer le rêve de la réalité.</li>
  <li><strong>L'hypothèse du Dieu trompeur</strong> : les vérités mathématiques elles-mêmes peuvent être truquées.</li>
  <li><strong>L'hypothèse du malin génie</strong> : un esprit puissant et trompeur me fait croire à l'existence des choses qui n'existent pas.</li>
</ol>

<h4>c) Le cogito : la certitude indubitable</h4>

<blockquote>
  Mais je me suis persuadé qu'il n'y avait rien du tout dans le monde […] ne me suis-je donc pas aussi persuadé que je n'étais point ? Non certes, j'étais sans doute, si je me suis persuadé […]. Il faut conclure et tenir pour constant que cette proposition : <em>Je suis, j'existe</em> est nécessairement vraie, toutes les fois que je la prononce ou que je la conçois en mon esprit.
  <cite>Descartes, Méditations métaphysiques</cite>
</blockquote>

<p>Descartes montre qu'on peut douter de tout, sauf de notre existence en tant que <strong>chose pensante</strong>. La conscience réfléchie nous conduit à <strong>notre première certitude</strong> : nous existons en tant qu'entités qui pensent.</p>

<p>Cette certitude est une <strong>connaissance immédiate</strong>, c'est ce qu'on appelle une <strong>intuition</strong> : une vérité qui s'impose à l'esprit sans démonstration.</p>

<p>Mais qu'est-ce qui m'<strong>individualise</strong> en tant qu'être pensant ? Ce qui fait mon individualité : <strong>mes</strong> idées, mes vécus, mes désirs, mes souvenirs.</p>

<h3 id="kant">2. La conscience de soi fonde l'unité de la personne (Kant)</h3>

<div class="author-card">
  <div class="ac-avatar">K</div>
  <div>
    <div class="ac-name">Emmanuel Kant</div>
    <div class="ac-meta">1724 – 1804 · Allemagne · <em>Anthropologie du point de vue pragmatique</em>, 1798</div>
  </div>
</div>

<blockquote>
  Posséder le Je dans sa représentation : ce pouvoir élève l'homme infiniment au-dessus de tous les autres êtres vivants sur la terre. Par-là, il est une personne ; et grâce à l'unité de la conscience dans tous les changements qui peuvent lui survenir, il est une seule et même personne […]. L'enfant qui sait déjà parler ne commence qu'assez tard à dire <em>Je</em> ; avant, il parle de soi à la troisième personne. Auparavant il ne faisait que se sentir ; maintenant il se pense.
  <cite>Kant</cite>
</blockquote>

<p>« Posséder le Je dans sa représentation » = la <strong>conscience réfléchie</strong>. Cette faculté consiste à se faire une image de soi en tant qu'être distinct. Elle n'admet pas de degrés : on la possède ou non.</p>

<p>Cette faculté donne à l'homme une <strong>supériorité infinie</strong> sur les animaux. Pour Kant, elle fonde la <strong>dignité humaine</strong> : on n'a pas le droit d'instrumentaliser les hommes (pas d'esclavage, pas de prostitution, pas de conditions de travail indignes).</p>

<div class="callout tip">
  <div class="callout-title">Passerelle</div>
  <p>Notion de <strong>devoir</strong> moral fondé sur la dignité humaine.</p>
</div>

<p>La conscience de soi est aussi le fondement de l'<strong>identité personnelle</strong> : il y a une « unité de la conscience » à travers tous les changements. Je suis « une seule et même personne » à travers le temps. Même l'enfant que j'étais à 6 ans, c'était moi.</p>

<h3 id="hegel">3. L'homme est un être pour soi (Hegel)</h3>
<p>Voir DS n°2 et 3.</p>

<div class="callout warn">
  <div class="callout-title">Transition</div>
  <p>Cette première partie nous a permis de comprendre que la conscience est <strong>nécessaire</strong> pour la connaissance de soi. Cependant, elle n'est pas <strong>suffisante</strong> : il y a beaucoup de choses qui définissent notre identité et dont on ne se rend même pas compte.</p>
</div>
`
};
