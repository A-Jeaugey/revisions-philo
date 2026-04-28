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
  tint: "#7ed4c5",
  plan: [
    { t: "La raison seule peut nous conduire à la vérité", sub: ["La raison face aux obstacles à la vérité (Galilée)","L'exigence d'une méthode rationnelle (Descartes)","La maîtrise rationnelle de l'expérience (Torricelli)"] },
    { t: "Mais la raison se doit d'être raisonnable et reconnaître ses limites", sub: ["Limites des sciences formelles et naturelles (Hume)","Impossibilité de démontrer Dieu, l'âme, la liberté (Kant)","Limites des sciences humaines (Dilthey)"] },
    { t: "Il faut donc reconsidérer nos espoirs de vérité et les moyens d'y parvenir", sub: ["Théorie scientifique vraie = falsifiable (Popper)","Le rôle de l'imagination (Einstein)","Les vérités qui se sentent (Pascal)","La vérité esthétique (Bergson)"] }
  ],
  content: `
<h2 id="intro">INTRODUCTION : Analyse du sujet et problématisation</h2>

<h3>Définition de la VÉRITÉ</h3>

<h4>Distinction VRAI / RÉEL</h4>
<ol>
  <li>« Je pense, donc je suis » (Descartes) → <strong>vrai</strong></li>
  <li>L'idée de Dieu → <strong>réel</strong></li>
  <li>2 + 5 = 7 → <strong>vrai</strong></li>
  <li>Les hallucinations → <strong>réel</strong></li>
</ol>

<p>La <strong>RÉALITÉ</strong> désigne <strong>l'ensemble des choses existantes (matérielles ou immatérielles, physiques ou psychiques)</strong>.</p>

<p>La <strong>VÉRITÉ</strong> est <strong>une propriété de nos idées ou de nos énoncés : la vérité est l'adéquation entre une idée/un énoncé et la réalité à laquelle elle/il se réfère</strong>.</p>

<p>La <strong>CERTITUDE</strong> est l'état de l'esprit qui sait posséder la vérité ; autrement dit, l'effet de la vérité sur le moi.</p>

<h3>Les obstacles à la vérité</h3>

<h4>Distinction VÉRITÉ / OPINION / PRÉJUGÉ / CROYANCE / APPARENCE / HYPOTHÈSE</h4>
<ol>
  <li>L'inconscient psychique (Freud) → <strong>Hypothèse</strong></li>
  <li>L'immortalité de l'âme → <strong>Croyance</strong></li>
  <li>Statistiquement, les femmes conduisent plus prudemment que les hommes → <strong>Vérité</strong></li>
  <li>Les femmes sont moins rationnelles que les hommes → <strong>préjugé</strong></li>
  <li>La relation affective avec un chien est plus intense qu'avec un homme → <strong>opinion</strong></li>
  <li>L'immobilité de la Terre, les couleurs, les goûts, etc. → <strong>apparence</strong></li>
  <li>Le théorème de Pythagore → <strong>Vérité</strong></li>
</ol>

<div class="encadre">
  <div class="encadre-block"><div class="label">PRÉJUGÉ</div><div class="vals">Un jugement préconçu hérité du milieu social, culturel, religieux, etc. <em>(impersonnel)</em></div></div>
  <div class="encadre-block"><div class="label">OPINION</div><div class="vals">Un jugement qu'on porte sur qqc sans être nécessairement vrai. <em>(subjectif)</em></div></div>
  <div class="encadre-block"><div class="label">CROYANCE</div><div class="vals">Une idée qu'on tient pour vraie tout en sachant qu'elle n'est pas suffisamment fondée (croyance religieuse, hypothèse scientifique, une opinion quelconque).</div></div>
  <div class="encadre-block"><div class="label">APPARENCE</div><div class="vals">La manière dont qqc nous apparaît notamment à travers les sens.</div></div>
  <div class="encadre-block"><div class="label">VÉRITÉ</div><div class="vals">Un contenu de pensée dont la concordance avec la réalité à laquelle il se réfère est ou bien évidente ou bien prouvée par une observation, une expérimentation scientifique ou une déduction.</div></div>
</div>

<p>La vérité n'est pas donnée. Nous ne naissons et ne grandissons pas avec des jugements vrais. Bien au contraire, <strong>nous sommes plus enclins à tenir pour vrais des idées et des énoncés qui n'ont rien d'indubitable</strong> (c'est le cas des opinions, des croyances, des préjugés) <em>ou qui</em>, pire encore, <em>entravent la recherche de la vérité</em> (les erreurs, les illusions, les mensonges).</p>

<p><strong>1ᵉʳ PROBLÈME identifié :</strong> Comment parvenir à la vérité ? Comment distinguer le vrai du faux ?</p>

<p><strong>Solution :</strong> Identifier les <em>facultés de connaître</em>, leur pouvoir et leurs limites</p>

<ol>
  <li><strong>La sensibilité : la perception à travers les sens.</strong><br>
  <strong>Problèmes :</strong> Les sens sont parfois trompeurs : les sensations peuvent varier selon les individus.</li>
  <li><strong>L'imagination : la faculté que possède l'esprit de se représenter ou de former des images.</strong><br>
  <strong>Problèmes :</strong> Même si elle est incontournable dans la démarche scientifique (pour imaginer des hypothèses explicatives), cette faculté peut également s'avérer trop fantaisiste.</li>
  <li><strong>La Raison</strong></li>
</ol>

<h3>La RAISON : définition, usages, pouvoirs</h3>

<p>Le mot « raison » vient du latin <em>ratio</em>, qui signifie <strong>le calcul</strong> et, de manière dérivée et plus large, <strong>le raisonnement qui entre en jeu dans le calcul</strong>.</p>

<div class="encadre">
  <div class="encadre-block"><div class="label">RATIONNEL</div><div class="vals">L'adjectif <strong>RATIONNEL</strong> recouvre l'usage <strong>théorique</strong> de la raison (dans le domaine de la <strong>connaissance</strong>). C'est l'usage qui nous intéresse ici, <strong>la raison se définissant comme la faculté de connaître qui nous permet de procéder par méthode et selon les règles de la logique afin de distinguer le vrai du faux.</strong></div></div>
  <div class="encadre-block"><div class="label">RAISONNABLE</div><div class="vals">L'adjectif <strong>RAISONNABLE</strong> recouvre l'usage <strong>pratique</strong> de la raison, car la raison calculatrice permet d'agir efficacement selon le but envisagé (dans les domaines de <strong>la morale, de la politique, de la recherche du bonheur, dans la conduite de sa vie, dans la vie économique, etc.</strong>).</div></div>
</div>

<p>Les <strong>pouvoirs de la raison</strong> par rapport aux deux autres facultés de connaître (la sensibilité &amp; l'imagination) consistent <strong>dans le recul qu'elle permet par rapport aux données des sens et à l'activité de l'imagination. La raison est donc une faculté maîtresse.</strong></p>

<h3>La raison dans la science</h3>

<p>Il revient donc à la raison la tâche de construire un savoir véritable, d'où la place qu'elle occupe dans la démarche scientifique.</p>

<div class="callout def">
  <div class="callout-title">Science</div>
  <p>Ensemble de connaissances logiques et vérifiables acquises à travers l'observation, l'expérimentation et la démonstration.</p>
</div>

<p>La science n'est pas un système du savoir unitaire. En effet, les sciences se distinguent selon leur objet d'étude :</p>

<ol>
  <li>les <strong>sciences formelles</strong> (la <strong>logique</strong> et les <strong>mathématiques</strong>) qui sont purement <strong>rationnelles</strong>, car elles étudient <strong>des objets (formes géométriques possibles, relations entre les nombres, les conditions des raisonnements valides, etc.) sans se soucier de la réalité extérieure à l'esprit.</strong>
    <br>Mais, les sciences formelles ne visent qu'une <strong>vérité formelle</strong>, qui consiste dans la validité des raisonnements par rapport aux lois logiques de la pensée et aux axiomes et procédés de démonstration mathématiques. Ce n'est pas l'enjeu des sciences formelles de nous permettre d'atteindre une <strong>vérité matérielle (qui consiste dans l'adéquation entre les idées / énoncés et la réalité extérieure à eux).</strong></li>
  <li>les <strong>sciences naturelles</strong>, dites « exactes » ou <strong>expérimentales</strong>, car elles reposent sur <strong>l'expérimentation</strong> (physique, chimie, biologie, médecine, géologie, etc.). Ces sciences visent toutes à expliquer les phénomènes <strong>matériels</strong> à travers des lois <strong>NÉCESSAIRES</strong> et <strong>UNIVERSELLES</strong>.</li>
  <li>les « sciences » <strong>humaines et sociales</strong>, considérées « inexactes » (histoire, anthropologie, psychologie, sociologie, etc.), <strong>non pas à cause d'elles-mêmes</strong>, mais parce que <strong>leur objet d'étude (l'homme) ne s'inscrit pas dans un déterminisme naturel comme les choses de la nature. Il ne semble y avoir rien de nécessaire et d'universel dans le comportement humain.</strong></li>
</ol>

<p><strong>D'autres problèmes :</strong></p>

<p>Il faut donc nous interroger sur les possibilités et les limites du savoir dit objectif, c'est-à-dire du savoir qu'il est possible de démontrer comme c'est le cas en mathématiques, de vérifier expérimentalement comme dans les sciences de la nature, de contrôler par des procédures ou des méthodes précises comme dans les sciences humaines. Ces interrogations nous ramènent à nous intéresser aux limites mêmes de la raison et à la possibilité de parvenir à la vérité autrement que par une démarche rationnelle.</p>

<h2 id="part-1">I. La raison seule peut nous conduire à la vérité</h2>

<p>La raison est la seule faculté de connaître capable de surmonter les obstacles à la vérité, de proposer une construction méthodique du savoir et de concilier, dans le domaine des sciences naturelles, la théorie et l'expérience.</p>

<h3 id="galilee">1. La raison face aux obstacles à la vérité (travail sur une référence non-textuelle)</h3>

<p><strong>Extrait :</strong> <a href="https://www.youtube.com/watch?v=-crNe2PfOxI">https://www.youtube.com/watch?v=-crNe2PfOxI</a></p>

<p><strong>Intérêt philosophique :</strong> L'extrait reprend un événement historique majeur dans la relation entre la <strong>SCIENCE</strong> et la <strong>RELIGION</strong>. En 1633, le mathématicien et physicien italien Galileo <strong>GALILÉE</strong> (1564-1642) doit comparaître devant le tribunal de la redoutable Inquisition de l'Église catholique pour se défendre contre des accusations d'hérésie. L'enjeu est majeur, car <strong>GALILÉE</strong> risque une condamnation à mort sur le bûcher, à laquelle il échappera finalement (notamment grâce à son âge avancé, 70 ans, sa réputation et le soutien de ses amis les plus puissants) à condition d'abjurer une partie de ses théories scientifiques et de vivre dans une résidence surveillée jusqu'à la fin de sa vie.</p>

<p>Parmi les chefs d'accusation, il y a la défense de l'héliocentrisme et une nouvelle théorie scientifique concernant la chute des corps. L'extrait qui nous intéresse ici met en scène le dialogue entre Galilée et les membres <strong>savants</strong> de l'Inquisition concernant la chute des corps. Au-delà de la question de la relation entre la science et la religion, l'extrait nous invite à <strong>réfléchir sur les « obstacles épistémologiques »</strong> (selon l'expression de Gaston Bachelard) à la vérité.</p>

<p>Regardez l'extrait du film <em>Galilée ou l'amour de Dieu</em> (2007) mettant en scène un dialogue entre Galilée et les membres <strong>savants</strong> du tribunal de l'Inquisition. Répondez aux questions suivantes :</p>

<p><strong>1) Quelle était la théorie scientifique¹ de l'époque de Galilée concernant la chute des corps ?</strong><br>
On pensait que les corps tombaient à des vitesses différentes selon leur poids.</p>

<p><strong>2) Quels étaient les obstacles à la vérité dans la polémique concernant la chute des corps ?</strong></p>
<ol>
  <li>L'évidence sensible (ce qu'on perçoit par les sens).</li>
  <li>Un argument d'autorité (l'autorité scientifique d'Aristote).</li>
</ol>

<p><strong>3) Par quel moyen Galilée réfute-t-il les connaissances scientifiques en vigueur concernant la chute des corps ?</strong><br>
Il propose une expérience : il laisse chuter en même temps deux corps de masse très différente, une boîte de papier et une boîte de sable. Les deux corps atteignent le sol en même temps.</p>

<p><strong>4) Ce que Galilée <em>montre</em> devant les membres <em>savants</em> du tribunal de l'Inquisition est ce que Gaston BACHELARD appelle un fait « polémique », c'est-à-dire un phénomène naturel qui contredit les théories scientifiques en vigueur. Quelle est la réaction des membres <em>savants</em> du tribunal ?</strong><br>
L'attitude légitime du scientifique consiste à vouloir préserver le savoir scientifique en vigueur (qui a déjà fait ses preuves) et à trouver une explication pour le fait polémique. Ici, l'explication est d'ordre surnaturel (on parle de diablerie).</p>

<p><strong>5) Quelle est la démarche de Galilée pour concilier l'expérience d'Aristote et sa propre expérience concernant la chute des corps ?</strong><br>
Aristote avait justement observé que le gland tombe plus vite que la feuille de chêne, mais son explication était erronée. Galilée la remplace en affirmant que ce n'est pas la différence de masse qui fait que le gland et la feuille tombent à des vitesses différentes, mais la résistance de l'air, plus forte dans le cas de la feuille à cause de sa forme.</p>

<p><strong>6) Galilée apporte une nouvelle connaissance scientifique qui démontre la fausseté de ce que les physiciens ont pensé jusqu'alors sur la chute des corps. Selon cette nouvelle connaissance, la vitesse de la chute d'un corps ne dépend pas de sa masse. Qu'est-ce qui rend cette nouvelle connaissance rationnelle et digne d'être considérée vraie ?</strong><br>
Il ne suffit pas d'affirmer suite à des expériences que le poids n'a aucune influence sur la chute des corps. Il faut trouver une théorie scientifique capable d'expliquer des phénomènes polémiques (exemple : un éléphant et une figue tombent à la même vitesse). Pour faire cela, Galilée invoque l'action simultanée de 2 forces qui s'opposent : l'inertie et la force de gravitation.</p>

<p>¹ <strong>Théorie scientifique :</strong> <em>ensemble cohérent d'explications induites par l'accumulation d'observations ou de faits expérimentaux.</em></p>

<h3 id="descartes">2. L'exigence d'une méthode rationnelle d'acheminement vers la vérité</h3>

<h4>a) La source de la vérité et la cause de la fausseté (Descartes, <em>Discours de la méthode</em>, 1637)</h4>

<aside class="ann-manu">la raison</aside>

<blockquote>
  « Le bon sens est la chose la mieux partagée car chacun pense en être si bien pourvu, que même ceux qui sont les plus difficiles à contenter en toute autre chose, n'ont point coutume d'en désirer plus qu'ils en ont. En quoi il n'est pas vraisemblable que tous se trompent ; mais plutôt cela témoigne que la puissance de bien juger, et de distinguer le vrai d'avec le faux, qui est proprement ce qu'on nomme le bon sens ou la raison, est naturellement égale en tout homme ; et qu'ainsi la diversité de nos opinions ne vient pas de ce que les uns sont plus raisonnables que les autres, mais seulement de ce que nous conduisons nos pensées par diverses voies, et ne considérons pas les mêmes choses. Car ce n'est pas assez d'avoir l'esprit bon, mais le principal est de l'appliquer bien. »
</blockquote>

<ul>
  <li>« Le bon sens est la chose la mieux partagée » ; « le bon sens ou la raison, est naturellement égale en tout homme » → <strong>La raison est une faculté innée et universelle que les hommes possèdent tous au même degré.</strong></li>
  <li>« chacun pense en être si bien pourvu, que même ceux qui sont les plus difficiles à contenter en toute autre chose, n'ont point coutume d'en désirer plus qu'ils en ont ». → <strong>il y a des inégalités naturelles entre les hommes (intelligence, mémoire, constitution physique, etc.) Mais, la raison est une faculté qui n'a pas de degré d'existence.</strong></li>
  <li>Descartes définit la raison comme : « <strong>La puissance de bien juger, et de distinguer le vrai d'avec le faux</strong>. »</li>
  <li>La cause de la « diversité de nos opinions » vient du fait que : <strong>« Nous conduisons nos pensées par diverses voies, et ne considérons pas les mêmes choses. »</strong></li>
  <li>La raison peut nous conduire à la vérité, à condition de <strong>savoir s'en servir</strong>.</li>
  <li>Le <strong>PROBLEME IRRESOLU</strong> à la fin de cet extrait : <strong>Comment bien user de sa raison ? Quelle méthode utiliser pour bien réfléchir.</strong></li>
</ul>

<h4>b) La recherche des fondements du savoir à travers le DOUTE MÉTHODIQUE</h4>

<aside class="ann-manu">Travail à la maison corrigé en classe : Rappel du doute méthodique</aside>

<blockquote>
  « Il y a déjà quelque temps que je me suis aperçu que, dès mes premières années, j'avais reçu quantités de fausses opinions pour véritables, et que ce que j'ai depuis fondé sur des principes si mal assurés, ne pouvait être que fort douteux et incertain ; de façon qu'il me fallait entreprendre sérieusement une fois en ma vie de me défaire de toutes les opinions que j'avais reçues jusques alors en ma créance, et commencer tout de nouveau dès les fondements, si je voulais établir quelque chose de ferme et de constant dans les sciences. […]
  Maintenant donc que mon esprit est libre de tous soins, et que je me suis procuré un repos assuré dans une paisible solitude, je m'appliquerai sérieusement et avec liberté à détruire généralement toutes mes anciennes opinions. Or il ne sera pas nécessaire pour arriver à ce dessein, de prouver qu'elles sont toutes fausses, de quoi je ne viendrai jamais à bout ; mais d'autant que la raison me persuade déjà que je ne dois pas moins soigneusement m'empêcher de donner créance aux choses qui ne sont pas certaines et indubitables, qu'à celles qui nous paraissent manifestement être fausses, le moindre sujet de douter que j'y trouverai suffira pour me les faire toutes rejeter. Et pour cela il n'est pas besoin que je les examine chacune en particulier, ce qui serait un travail infini ; mais, parce que la ruine des fondements entraîne nécessairement avec soi tout le reste de l'édifice, je m'attaquerai d'abord aux principes sur lesquels toutes mes anciennes opinions étaient appuyées. »
  <cite>Descartes, <em>Méditations métaphysiques</em>, 1ʳᵉ Méditation, 1641</cite>
</blockquote>

<p><em>Vérifiez votre compréhension du texte en complétant cette explication avec les mots manquants.</em></p>

<p>Connaître n'est pas seulement connaître de manière empirique (c'est-à-dire par les sens) mais c'est connaître par la <strong>raison</strong> en adoptant une attitude <strong>sceptique</strong> à l'égard de ce que l'on croit spontanément. Selon Descartes, la recherche de la vérité s'effectue dans une aventure intellectuelle purement solitaire (méditation). Cette aventure, c'est l'expérience du <strong>doute</strong>. Cette expérience est nécessaire car nous devons nous arracher à la vie quotidienne pour <em><strong>tout repenser par ordre</strong></em>. En effet, le commencement de la vie ne coïncide pas avec le commencement de <strong>la connaissance</strong>. De l'enfance, nous héritons en premier lieu des <strong>opinions</strong> et des <strong>préjugés</strong>, c'est-à-dire des représentations qui ne nous appartiennent pas vraiment, sur lesquelles nous n'avons pas pu exercer notre <strong>raison</strong> et que nous considérons pourtant comme acquises. Il est nécessaire de rompre avec l'enfance pour fonder la <strong>vérité</strong> dans les sciences. Ainsi, il faut <strong>suspendre</strong> son jugement sur ce qui n'est que <strong>probable / incertain</strong> et renoncer aux opinions et préjugés. Pour cela il faut adopter <strong>le doute</strong> comme méthode. Toutefois cette entreprise ne consiste pas à ruiner la connaissance mais au contraire à utiliser le doute comme moyen pour la <strong>fonder</strong>. Le doute est animé par la volonté de <strong>savoir</strong> et d'attendre un véritable fondement pour les sciences. En ce sens, le doute cartésien se distingue du doute des sceptiques car il n'est pas un but en lui-même, il n'est qu'un <strong>moyen</strong>. Chez Descartes, le doute est rendu nécessaire par la diversité des opinions et la fausseté de certains jugements empiriques. En ce sens le doute porte d'abord sur la connaissance sensible. Il ne s'agit pas d'examiner une à une toutes les opinions mais selon la raison minimum de douter, il suffit qu'une connaissance sensible soit fausse pour penser que toute connaissance sensible ne soit pas nécessairement <strong>vraie</strong>. L'esprit doit user de sa propre <strong>liberté</strong> pour suspendre son jugement et ne pas donner son assentiment à ce qui est en nous sans être de nous. Le doute manifeste la volonté de ne plus être dépendant des connaissances héritées de l'enfance et des croyances issues de la précipitation. Il s'agit de montrer que ce que nous avons considéré comme vrai jusque-là résulte d'un acte de <strong>croyance</strong> et non d'une certitude <strong>fondée</strong>.</p>

<p>La finalité du doute méthodique est de parvenir aux <em>fondements du savoir</em>, c'est-à-dire à des <em>premières vérités indubitables</em> sur lesquelles l'on peut rebâtir le système du savoir. Un exemple d'une telle <em>vérité première que la raison ne peut que reconnaître comme évidente</em>, c'est la célèbre formule cartésienne : <strong>« Je pense donc je suis ».</strong></p>

<p><strong>Problème :</strong> le doute méthodique a pour finalité d'identifier des vérités qui sont indubitables, c'est-à-dire des vérités qu'il serait impossible de remettre en doute. En effet ce doute consiste à faire table rase de toutes les opinions qui sont manifestement fausses, mais aussi des opinions incertaines dont on ne sait pas si elles sont vraies ou fausses. Cette prudence méthodologique ne permet pas de distinguer le vrai du faux, mais elle a le mérite d'identifier ce qui est absolument indubitable, c'est-à-dire ce dont la vérité ne peut pas être remise en cause. Ces vérités indubitables obtenues grâce au doute serviront par la suite comme fondements à partir desquels on pourra démontrer d'autres vérités. Mais comment faut-il procéder pour obtenir d'autres vérités à partir de ces premières vérités indubitables ?</p>

<h4>c) L'élargissement de la certitude mathématique à l'ensemble du savoir</h4>

<blockquote>
  « Ces longues chaînes de raisons, toutes simples et faciles, dont les géomètres ont coutume de se servir pour parvenir à leurs plus difficiles démonstrations, m'avaient donné occasion de m'imaginer que toutes les choses qui peuvent tomber sous la connaissance des hommes s'entresuivent en même façon, et que, pourvu seulement qu'on s'abstienne d'en recevoir aucune pour vraie qui ne le soit, et qu'on garde toujours l'ordre qu'il faut pour les déduire les unes des autres, il n'y en peut avoir de si éloignées auxquelles enfin on ne parvienne, ni de si cachées qu'on ne découvre. Et je ne fus pas beaucoup en peine de chercher par lesquelles il était besoin de commencer : car je savais déjà que c'était par les plus simples et les plus aisées à connaître ; et, considérant qu'entre tous ceux qui ont ci-devant recherché la vérité dans les sciences, il n'y a eu que les seuls mathématiciens qui ont pu trouver quelques démonstrations, c'est-à-dire quelques raisons certaines et évidentes, je ne doutais point que ce ne fût par les mêmes qu'ils ont examinées ; bien que je n'en espérasse aucune autre utilité, sinon qu'elles accoutumeraient mon esprit à se repaître de vérités, et ne se contenter point de fausses raisons. »
  <cite>Descartes, <em>Discours de la méthode</em>, 1637, Partie II</cite>
</blockquote>

<p><strong>QUESTIONS :</strong></p>
<ol>
  <li>Quel jugement porte Descartes sur les mathématiciens ?</li>
  <li>Quels sont les principes méthodiques de la démonstration mathématique ?</li>
  <li>Quel intérêt trouve-t-il dans les mathématiques ?</li>
  <li>Comment peut-on progresser avec certitude dans la connaissance ?</li>
</ol>

<p><strong>1)</strong> Les mathématiques contiennent les méthodes les plus certaines pour construire un système du savoir. En effet, les mathématiques reposent sur deux principes méthodiques rationnels qui sont infaillibles :</p>
<ul>
  <li><strong>l'intuition</strong></li>
  <li><strong>la déduction</strong></li>
</ul>

<p><strong>L'intuition</strong> est une connaissance immédiate d'une évidence que la raison ne peut pas remettre en doute. Les évidences obtenues par l'intuition sont des vérités indémontrables que la raison reconnaît comme telle car il est impossible de concevoir sans contradiction leurs contraires.
Dans les mathématiques, les fondements, c'est-à-dire les vérités premières qu'on appelle « axiomes » et « postulats » sont des évidences rationnelles indémontrables.</p>

<p><strong>La déduction</strong> est une forme de raisonnement (raisonnement = cheminement de pensée) infaillible car elle consiste à conduire/tirer de manière nécessaire des propositions particulières à partir de propositions générales. L'infaillibilité de la déduction vient du fait que le cheminement déductif qui mène d'une proposition à l'autre est nécessaire, c'est-à-dire que ce cheminement ne peut pas être autrement.</p>

<p>Dans les mathématiques, les théorèmes sont tous obtenus par déduction à partir d'autres connaissances mathématiques, càd d'autres théorèmes. Cette chaîne déductive commence avec les vérités premières et continue jusqu'aux théorèmes mathématiques les plus compliqués.</p>

<p><em>[Schéma : un triangle dont la base contient « Vérités premières, axiomes + postulats » et qui s'élève en théorèmes successifs (théorème, théorème, théorème…). Sur le côté, une flèche verticale montante étiquetée « déduction », et une flèche horizontale étiquetée « intuition » à la base.]</em></p>

<p>La certitude rationnelle présente dans les mathématiques fait de cette science un modèle à suivre pour les autres sciences. C'est pour cela que Descartes envisage de rebâtir tout le système du savoir en imitant le modèle des mathématiques.</p>

<h4>Exemple cartésien de progression dans la connaissance</h4>

<div class="encadre">
  <div class="encadre-block"><div class="label">CONSTAT</div><div class="vals">Faillibilité de nos sens + Incertitude de nos opinions → ABSENCE DE CERTITUDE</div></div>
  <div class="encadre-block"><div class="label">DOUTE MÉTHODIQUE</div><div class="vals">• Douter de TOUT ce qui n'est pas certain, <em>afin de trouver des certitudes indubitables</em>.<br>• Radicalisation du doute (<strong>doute méthodique <em>et hyperbolique</em></strong>) : fiction du malin génie</div></div>
  <div class="encadre-block"><div class="label">INTUITION : <em>connaissance <strong>immédiate</strong> d'une évidence indubitable</em></div><div class="vals">→ <strong>1ʳᵉ VÉRITÉ :</strong> « Je pense, je suis » → je suis une <em>chose pensante</em><br><br><em>En tant que chose pensante, j'ai beaucoup d'idées, c.-à-d. des représentations mentales de choses dont l'existence n'est pas certaine (monde, autres hommes, ciel, etc.), car elles peuvent être des illusions suscitées par le malin génie. Parmi ces idées, il y en a une étonnante : <strong>l'idée d'un être infini et parfait</strong>.</em></div></div>
  <div class="encadre-block"><div class="label">DÉDUCTION : <em>raisonnement par lequel on tire une conclusion <strong>nécessaire</strong> à partir d'autres choses connues</em></div><div class="vals">→ <strong>2ᵉ VÉRITÉ : L'existence de Dieu</strong><br><br><em>L'idée d'un être infini et parfait ne peut venir ni de moi-même (car je suis imparfait, d'où le fait que je doute) ni d'un malin génie hypothétique (lui aussi imparfait vu qu'il me trompe). Une telle idée n'a pu être <strong>semée</strong> dans mon esprit que par un être infini et parfait, donc par Dieu.</em><br><br>→ <strong>3ᵉ VÉRITÉ : L'être parfait n'est pas trompeur, il est donc le garant :</strong><br>• de l'existence du monde matériel (y compris mon corps)<br>• de l'adéquation des lois (logiques et mathématiques) de la raison avec le réel<br>• de la permanence des lois de la nature (elles ne changent pas)<br><br>→ <strong>4ᵉ VÉRITÉ : la connaissance de la nature (la physique) est possible</strong></div></div>
</div>

<p><strong>Problème :</strong> Comment faire usage de la déduction en dehors des mathématiques, plus précisément dans les sciences de la nature ?</p>

<h3 id="torricelli">3. La maîtrise rationnelle de l'expérience : la méthode expérimentale</h3>

<p>La connaissance de la NATURE est possible dans la mesure où la SCIENCE moderne propose une méthode rationnelle de contrôle de l'expérience : <em>l'expérience scientifique</em> (ou expérimentation).</p>

<div class="encadre">
  <div class="encadre-block"><div class="label">Sensible</div><div class="vals">Connaissance immédiate du monde à travers nos cinq sens. <strong>PERCEVOIR</strong><br>Comporte un risque d'illusion.</div></div>
  <div class="encadre-block"><div class="label">Vécue</div><div class="vals">Savoir ou Savoir-faire accumulé au fil des ans à partir de notre vécu. <strong>ÊTRE EXPÉRIMENTÉ</strong><br>Particulière et subjective.</div></div>
  <div class="encadre-block"><div class="label">Scientifique</div><div class="vals">Vérification d'une hypothèse liée à une théorie. <strong>EXPÉRIMENTER</strong><br>Objective car construite par une raison active ✓</div></div>
</div>

<h4>Exemple : L'expérimentation de Torricelli (1643)</h4>

<p><strong>(1) CONSTAT D'UN FAIT POLÉMIQUE :</strong> Au XVIIᵉ siècle, les ingénieurs hydrauliques de Florence remarquent que <em>lorsqu'on tire l'eau des puits, par une pompe aspirante, l'eau ne monte pas plus de 10,33 mètres.</em></p>

<p>Ce phénomène <strong>contredit la théorie scientifique</strong> de l'époque selon laquelle <em>il n'y a pas de vide dans la nature</em>. Selon cette théorie, il suffisait d'aspirer l'air contenu dans un tuyau pour élever l'eau d'un puits.</p>

<p><strong>(2) PROPOSITION D'UNE HYPOTHÈSE POUR EXPLIQUER LE FAIT POLÉMIQUE :</strong> Le savant Torricelli <strong>suppose</strong> que <em>le vide est présent dans la nature et qu'une autre cause fait monter l'eau dans un tuyau : l'air qui pousse sur la surface de l'eau.</em></p>

<p>Au stade initial, <strong>l'hypothèse</strong> a le statut d'une <strong>croyance</strong>. La pression de l'air, on ne la voit pas, on la <strong>suppose</strong>. <strong>L'hypothèse scientifique</strong> est une <strong>explication provisoire</strong> inventée par le savant pour supprimer la contradiction observée. C'est une explication possible dont on ne sait pas si elle est vraie ou fausse.</p>

<p><strong>(3) VÉRIFICATION EXPÉRIMENTALE :</strong> Torricelli <strong>déduit</strong> toutes les conséquences qui résultent de son hypothèse et <strong>construit une expérience scientifique</strong> lui permettant de <strong>vérifier</strong> son hypothèse.</p>

<p>Il remplit de mercure (un liquide 13 fois plus dense que l'eau) un tube d'un mètre de long scellé à l'une de ses extrémités, bouche avec un doigt l'autre extrémité puis retourne ce tube sur une cuve contenant du mercure.</p>

<p><strong>Résultat :</strong> Le mercure descend un peu dans le tube et reste suspendu à la hauteur de 76 cm par rapport à la hauteur de la cuve. Au sommet du tube, il y a du vide. Torricelli vient de prouver l'existence du vide et de la pression atmosphérique.</p>

<p>La raison est apparue comme la seule faculté de connaître nous permettant de procéder de manière méthodique (à travers le doute méthodique, la déduction, l'expérimentation scientifique) afin de parvenir à la vérité. Néanmoins, nous devons nous interroger sur les limites de la connaissance rationnelle. En effet, qu'est-ce qui garantit la fiabilité de la raison qui prétend être le siège de la sensibilité et de l'imagination ?</p>
`
};
