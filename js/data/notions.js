// Les grandes notions du programme
window.NOTIONS = [
  {
    id: "conscience",
    name: "Conscience",
    glyph: "C",
    short: "Du latin cum + scientia. Faculté de se représenter le monde et soi-même.",
    long: "La conscience se distingue en conscience immédiate (tournée vers le monde) et conscience réfléchie (tournée vers soi). Cette dernière permet le dédoublement entre un sujet pensant et un objet pensé, faisant de l'homme un spectateur de lui-même.",
    sequences: [1,3],
    keyAuthors: ["descartes","kant","hegel","sartre"]
  },
  {
    id: "inconscient",
    name: "Inconscient",
    glyph: "I",
    short: "Ensemble des contenus psychiques qui échappent à la conscience.",
    long: "Hypothèse formulée par Freud (1856-1939) pour expliquer les rêves, lapsus, actes manqués et troubles psychiques. Distinguer inconscient et inconscience. Critiqué par Sartre (mauvaise foi) et Popper (non falsifiable).",
    sequences: [1,3],
    keyAuthors: ["leibniz","freud","sartre"]
  },
  {
    id: "liberte",
    name: "Liberté",
    glyph: "L",
    short: "Capacité de se déterminer soi-même.",
    long: "Le libre arbitre traditionnel (Descartes) est critiqué par Spinoza : nous sommes conscients de nos désirs mais ignorants des causes. Pour Sartre, l'homme est condamné à être libre. La liberté politique se distingue de la liberté intérieure.",
    sequences: [1,5],
    keyAuthors: ["descartes","spinoza","kant","sartre","marx"]
  },
  {
    id: "temps",
    name: "Temps",
    glyph: "T",
    short: "Nombre du mouvement selon l'avant et l'après (Aristote).",
    long: "Difficile à définir (Augustin). Le temps caractérise le devenir des choses (Héraclite). Pour Sartre, l'existence se construit dans le temps : l'homme est un projet qui se réifie à la mort.",
    sequences: [1],
    keyAuthors: ["aristote","augustin","heraclite","sartre"]
  },
  {
    id: "verite",
    name: "Vérité",
    glyph: "V",
    short: "Adéquation entre la pensée/le langage et la réalité.",
    long: "À distinguer de la réalité, de la croyance, de l'opinion, du préjugé. Recherchée par la raison et la science, elle a aussi des formes non rationnelles : vérités du cœur (Pascal), vérités esthétiques (Bergson).",
    sequences: [2],
    keyAuthors: ["descartes","hume","kant","popper","pascal"]
  },
  {
    id: "raison",
    name: "Raison",
    glyph: "R",
    short: "Faculté de penser logiquement et de distinguer le vrai du faux.",
    long: "La raison rationnelle (théorique) et raisonnable (pratique). Universellement partagée (Descartes), elle doit reconnaître ses limites (Kant). À elle seule elle ne peut démontrer Dieu, l'âme, la liberté.",
    sequences: [2],
    keyAuthors: ["descartes","hume","kant"]
  },
  {
    id: "science",
    name: "Science",
    glyph: "S",
    short: "Connaissances logiques et vérifiables (observation, expérimentation, démonstration).",
    long: "Sciences formelles (logique, mathématiques) → vérité formelle. Sciences naturelles → expérimentation. Sciences humaines → interprétation (Dilthey). Critère de falsifiabilité (Popper).",
    sequences: [1,2],
    keyAuthors: ["galilee","descartes","hume","popper","einstein","dilthey"]
  },
  {
    id: "religion",
    name: "Religion",
    glyph: "R",
    short: "Domaine de la croyance, distinct de la science.",
    long: "Pour Pascal, c'est le cœur qui sent Dieu, non la raison. Pour Kant, l'existence de Dieu n'est pas démontrable mais reste un postulat de la raison pratique. Conflit historique science/religion (Galilée).",
    sequences: [2],
    keyAuthors: ["pascal","kant","galilee"]
  },
  {
    id: "langage",
    name: "Langage",
    glyph: "L",
    short: "Faculté humaine d'exprimer des pensées par des signes.",
    long: "À distinguer du langage animal (instinctif). Le signe linguistique unit signifiant et signifié (Saussure). Le langage configure la pensée (Hegel) mais voile l'individualité (Bergson). Convaincre vs persuader.",
    sequences: [3],
    keyAuthors: ["descartes","saussure","chomsky","hegel","bergson","nietzsche"]
  },
  {
    id: "art",
    name: "Art",
    glyph: "A",
    short: "Activité visant à défamiliariser notre regard sur les choses.",
    long: "Du latin ars (savoir-faire). L'art se distingue du travail par la gratuité (Arendt). Beau ≠ agréable (Kant). L'art contemporain (Duchamp) remet en question les caractéristiques traditionnelles.",
    sequences: [4],
    keyAuthors: ["aristote","kant","nietzsche","alain","arendt","bergson","duchamp"]
  },
  {
    id: "travail",
    name: "Travail",
    glyph: "T",
    short: "Activité par laquelle l'homme transforme la matière.",
    long: "L'œuvre d'art est le résultat d'un travail acharné (Nietzsche). Mais le travail seul ne suffit pas pour faire un artiste : il faut un « tour de main » singulier, une originalité.",
    sequences: [4],
    keyAuthors: ["nietzsche","alain"]
  },
  {
    id: "technique",
    name: "Technique",
    glyph: "T",
    short: "Savoir-faire permettant de produire des objets utiles.",
    long: "Du grec technè. L'artiste maîtrise une technique mais en fait un usage original. L'artisan suit un plan (idée précède exécution) ; l'artiste découvre l'œuvre en la faisant (Alain).",
    sequences: [4],
    keyAuthors: ["alain","kant"]
  },
  {
    id: "nature",
    name: "Nature",
    glyph: "N",
    short: "Ce qui n'est pas culturel, ce qui est inné ou spontané.",
    long: "S'oppose à culture. L'état de nature (Rousseau, Hobbes, Locke) est l'homme avant la société civile. Pour Kant, à travers le génie, la nature donne ses règles à l'art.",
    sequences: [4,5,6],
    keyAuthors: ["rousseau","hobbes","locke","kant"]
  },
  {
    id: "justice",
    name: "Justice",
    glyph: "J",
    short: "Notion polysémique : légalité ou légitimité.",
    long: "Conformité à la loi (légalité) ou conformité à la morale (légitimité). Conflit incarné par Antigone (Sophocle). La justice repose sur la force de l'État (Pascal). Justice sociale (Marx, Rawls).",
    sequences: [5],
    keyAuthors: ["sophocle","pascal","marx","rawls","weber"]
  },
  {
    id: "etat",
    name: "État",
    glyph: "É",
    short: "Institutions assurant le fonctionnement d'une société.",
    long: "Né d'un contrat social (Hobbes, Locke, Rousseau). Détient le monopole de la violence légitime (Weber). Peut être absolu (Léviathan de Hobbes) ou limité (libéralisme de Locke).",
    sequences: [5],
    keyAuthors: ["hobbes","locke","rousseau","weber","kant","marx","clastres"]
  },
  {
    id: "devoir",
    name: "Devoir",
    glyph: "D",
    short: "Obligation morale qu'on s'impose librement.",
    long: "Le devoir relève de l'obligation (libre) et non de la contrainte (imposée). Désintéressé, il implique souvent un sacrifice. Question : peut-on avoir un devoir d'être heureux ?",
    sequences: [5,6],
    keyAuthors: ["kant"]
  },
  {
    id: "bonheur",
    name: "Bonheur",
    glyph: "B",
    short: "État de satisfaction durable, absence de souffrance.",
    long: "Bon + heur (chance). Hédonisme radical (Calliclès) → Danaïdes. Hédonisme modéré (Épicure) → ataraxie. Stoïcisme → bonheur absolu par la connaissance des causes.",
    sequences: [6],
    keyAuthors: ["socrate","platon","callicles","epicure"]
  }
];
