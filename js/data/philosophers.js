// Philosophes étudiés
window.PHILOSOPHERS = [
  {
    id: "socrate", name: "Socrate", initials: "S",
    dates: "v. 470 – 399 av. J.-C.", country: "Grèce antique",
    thesis: "Reconnaître son ignorance pour philosopher. La vie immodérée est comparable au tonneau des Danaïdes.",
    tags: ["bonheur","vertu","vie examinée"],
    sequences: [6],
    keyIdeas: ["« Connais-toi toi-même »", "Méthode dialectique", "Critique de l'hédonisme"]
  },
  {
    id: "platon", name: "Platon", initials: "P",
    dates: "v. 428 – 348 av. J.-C.", country: "Grèce antique",
    thesis: "La pensée est le dialogue intérieur et silencieux de l'âme avec elle-même.",
    tags: ["langage","pensée","dialogue"],
    sequences: [3,6],
    keyIdeas: ["Théorie des Idées", "Pensée = discours intérieur", "Critique de Calliclès"]
  },
  {
    id: "aristote", name: "Aristote", initials: "A",
    dates: "384 – 322 av. J.-C.", country: "Grèce antique",
    thesis: "Le temps est « le nombre du mouvement selon l'avant et l'après ». Le beau est l'ordre.",
    tags: ["temps","beau","logique"],
    sequences: [1,2,4],
    keyIdeas: ["Définition du temps", "L'art comme imitation", "Causalité"]
  },
  {
    id: "epicure", name: "Épicure", initials: "É",
    dates: "341 – 270 av. J.-C.", country: "Grèce antique",
    thesis: "Le bonheur réside dans l'ataraxie : absence de souffrance physique et psychologique.",
    tags: ["bonheur","plaisir","ataraxie"],
    sequences: [6],
    keyIdeas: ["Hédonisme modéré", "Distinguer désirs naturels et vains", "Vie tranquille"]
  },
  {
    id: "augustin", name: "Saint Augustin", initials: "A",
    dates: "354 – 430", country: "Empire romain",
    thesis: "« Si personne ne m'interroge [sur le temps], je le sais ; si je veux répondre, je l'ignore. »",
    tags: ["temps","conscience"],
    sequences: [1],
    keyIdeas: ["Méditation sur le temps", "Mémoire et anticipation"]
  },
  {
    id: "heraclite", name: "Héraclite d'Éphèse", initials: "H",
    dates: "v. 500 av. J.-C.", country: "Grèce antique",
    thesis: "« Toutes choses coulent ». On ne descend pas deux fois dans le même fleuve.",
    tags: ["temps","devenir"],
    sequences: [1],
    keyIdeas: ["Devenir continuel", "Métaphore du fleuve"]
  },
  {
    id: "descartes", name: "René Descartes", initials: "D",
    dates: "1596 – 1650", country: "France",
    thesis: "« Je pense, donc je suis » — première certitude indubitable obtenue par le doute.",
    tags: ["cogito","doute","raison"],
    sequences: [1,2,3],
    keyIdeas: ["Doute hyperbolique", "Cogito ergo sum", "Distinction âme/corps", "Méthode rationnelle"]
  },
  {
    id: "pascal", name: "Blaise Pascal", initials: "P",
    dates: "1623 – 1662", country: "France",
    thesis: "« Le cœur a ses raisons que la raison ne connaît point. » Le moi est indéfinissable.",
    tags: ["coeur","vérité","moi"],
    sequences: [1,2,5],
    keyIdeas: ["Vérités du cœur", "Moi indéfinissable", "Justice sans force = impuissante"]
  },
  {
    id: "spinoza", name: "Baruch Spinoza", initials: "S",
    dates: "1632 – 1677", country: "Pays-Bas",
    thesis: "Le libre arbitre est une illusion : nous sommes conscients de nos désirs mais ignorants des causes qui nous déterminent.",
    tags: ["liberté","déterminisme","conscience"],
    sequences: [1],
    keyIdeas: ["Critique du libre arbitre", "Métaphore de la pierre", "Liberté éclairée par la raison"]
  },
  {
    id: "leibniz", name: "G. W. Leibniz", initials: "L",
    dates: "1646 – 1716", country: "Allemagne",
    thesis: "Il existe « mille petites perceptions » inconscientes qui composent nos perceptions conscientes.",
    tags: ["inconscient","perception"],
    sequences: [1],
    keyIdeas: ["Petites perceptions", "Métaphore du bruit de la mer", "Perception/aperception"]
  },
  {
    id: "locke", name: "John Locke", initials: "L",
    dates: "1632 – 1704", country: "Angleterre",
    thesis: "L'homme à l'état de nature est moral et rationnel. L'État doit protéger les droits naturels.",
    tags: ["état","contrat","libéralisme"],
    sequences: [5],
    keyIdeas: ["Pensée libérale", "Droits naturels", "État limité et constitutionnel"]
  },
  {
    id: "hobbes", name: "Thomas Hobbes", initials: "H",
    dates: "1588 – 1679", country: "Angleterre",
    thesis: "L'homme est un loup pour l'homme. L'état de nature est une guerre permanente.",
    tags: ["état","contrat","léviathan"],
    sequences: [5],
    keyIdeas: ["Léviathan", "Contrat social absolu", "Souverain illimité"]
  },
  {
    id: "rousseau", name: "Jean-Jacques Rousseau", initials: "R",
    dates: "1712 – 1778", country: "Suisse / France",
    thesis: "L'homme est perfectible. À l'état de nature, il n'a ni les vices ni les vertus de l'homme civil.",
    tags: ["nature","perfectibilité","langage"],
    sequences: [1,3,5],
    keyIdeas: ["Perfectibilité", "État de nature", "Pitié naturelle", "Idées générales et langage"]
  },
  {
    id: "hume", name: "David Hume", initials: "H",
    dates: "1711 – 1776", country: "Écosse",
    thesis: "Les certitudes sur les faits naturels reposent sur l'habitude et la croyance, non sur la raison.",
    tags: ["induction","empirisme","croyance"],
    sequences: [2],
    keyIdeas: ["Problème de l'induction", "Vérités formelles vs matérielles", "Critique de la causalité"]
  },
  {
    id: "kant", name: "Emmanuel Kant", initials: "K",
    dates: "1724 – 1804", country: "Allemagne",
    thesis: "« J'ai dû abolir le savoir pour y substituer la croyance. » L'homme est une personne, doté de dignité.",
    tags: ["raison","liberté","beau","morale"],
    sequences: [1,2,4,5],
    keyIdeas: ["Distinction phénomène/noumène", "Postulats de la raison pratique", "Insociable sociabilité", "Génie artistique", "Beau universel sans concept"]
  },
  {
    id: "hegel", name: "G. W. F. Hegel", initials: "H",
    dates: "1770 – 1831", country: "Allemagne",
    thesis: "L'homme est un être pour soi. « Le mot donne à la pensée son existence la plus haute et la plus vraie. »",
    tags: ["conscience","langage","dialectique"],
    sequences: [1,3],
    keyIdeas: ["Être en soi / pour soi", "Langage et pensée", "Dialectique"]
  },
  {
    id: "tocqueville", name: "Alexis de Tocqueville", initials: "T",
    dates: "1805 – 1859", country: "France",
    thesis: "La démocratie peut se transformer en tyrannie de la majorité.",
    tags: ["démocratie","politique"],
    sequences: [5],
    keyIdeas: ["Tyrannie de la majorité", "Égalité démocratique"]
  },
  {
    id: "marx", name: "Karl Marx", initials: "M",
    dates: "1818 – 1883", country: "Allemagne",
    thesis: "Pas de justice sans justice sociale. La liberté en droit n'est pas la liberté en fait.",
    tags: ["justice","économie","domination"],
    sequences: [5],
    keyIdeas: ["Critique de l'idéologie bourgeoise", "Justice sociale", "Liberté en fait"]
  },
  {
    id: "nietzsche", name: "Friedrich Nietzsche", initials: "N",
    dates: "1844 – 1900", country: "Allemagne",
    thesis: "La conscience est une maladie : tout ce qui devient conscient devient plat. Le génie n'est qu'un travail.",
    tags: ["conscience","langage","art"],
    sequences: [3,4],
    keyIdeas: ["Critique du génie", "Conscience comme maladie", "Travail de l'artiste"]
  },
  {
    id: "freud", name: "Sigmund Freud", initials: "F",
    dates: "1856 – 1939", country: "Autriche",
    thesis: "Le moi n'est pas maître dans sa propre maison : l'inconscient détermine notre vie psychique.",
    tags: ["inconscient","psychanalyse"],
    sequences: [1,3],
    keyIdeas: ["Topiques de l'esprit (Moi/Surmoi/Ça)", "Iceberg", "Cure psychanalytique", "Éros & Thanatos", "Refoulement"]
  },
  {
    id: "bergson", name: "Henri Bergson", initials: "B",
    dates: "1859 – 1941", country: "France",
    thesis: "Notre langage et notre perception nous voilent l'individualité des choses. L'art seul nous y donne accès.",
    tags: ["langage","art","perception"],
    sequences: [3,4],
    keyIdeas: ["Voile du langage", "Perception utilitaire", "L'artiste révèle le réel"]
  },
  {
    id: "saussure", name: "Ferdinand de Saussure", initials: "S",
    dates: "1857 – 1913", country: "Suisse",
    thesis: "La langue découpe simultanément la masse des sons et la masse des idées : elle est cartographie.",
    tags: ["langage","linguistique"],
    sequences: [3],
    keyIdeas: ["Signifiant / signifié", "Arbitraire du signe", "Cartographie de la langue"]
  },
  {
    id: "chomsky", name: "Noam Chomsky", initials: "C",
    dates: "1928 –", country: "États-Unis",
    thesis: "Tout locuteur peut produire et comprendre des phrases inédites : le langage est créatif.",
    tags: ["langage","linguistique"],
    sequences: [3],
    keyIdeas: ["Grammaire générative", "Créativité du langage"]
  },
  {
    id: "alain", name: "Alain (É. Chartier)", initials: "A",
    dates: "1868 – 1951", country: "France",
    thesis: "L'artiste, contrairement à l'artisan, est aussi spectateur de son œuvre en train de naître.",
    tags: ["art","artisanat"],
    sequences: [4],
    keyIdeas: ["Distinction artiste/artisan", "Idée vient à l'artiste en faisant"]
  },
  {
    id: "arendt", name: "Hannah Arendt", initials: "A",
    dates: "1906 – 1975", country: "Allemagne / USA",
    thesis: "Les œuvres d'art ne sont pas faites pour les hommes mais pour le monde, destinées à survivre aux générations.",
    tags: ["art","durée"],
    sequences: [4],
    keyIdeas: ["Gratuité de l'art", "Durabilité des œuvres"]
  },
  {
    id: "duchamp", name: "Marcel Duchamp", initials: "D",
    dates: "1887 – 1968", country: "France",
    thesis: "Un objet d'usage devient œuvre d'art lorsqu'il est retiré de sa fonction utilitaire (Fontaine, 1917).",
    tags: ["art","ready-made"],
    sequences: [4],
    keyIdeas: ["Ready-made", "Fontaine (1917)", "Remise en question de l'art"]
  },
  {
    id: "sartre", name: "Jean-Paul Sartre", initials: "S",
    dates: "1905 – 1980", country: "France",
    thesis: "L'existence précède l'essence. L'homme est condamné à être libre. Pas d'inconscient mais de la mauvaise foi.",
    tags: ["liberté","existence","mauvaise foi"],
    sequences: [1,3],
    keyIdeas: ["Existentialisme", "Mauvaise foi", "Le moi est un projet", "Critique de Freud"]
  },
  {
    id: "popper", name: "Karl Popper", initials: "P",
    dates: "1902 – 1994", country: "Autriche / GB",
    thesis: "Une théorie n'est scientifique que si elle est falsifiable.",
    tags: ["science","réfutabilité"],
    sequences: [1,2],
    keyIdeas: ["Critère de falsifiabilité", "Critique de la psychanalyse", "Conjectures et réfutations"]
  },
  {
    id: "einstein", name: "Albert Einstein", initials: "E",
    dates: "1879 – 1955", country: "Allemagne / USA",
    thesis: "Les concepts physiques sont des créations libres de l'esprit humain.",
    tags: ["science","imagination"],
    sequences: [2],
    keyIdeas: ["Imagination scientifique", "Métaphore de la montre fermée"]
  },
  {
    id: "dilthey", name: "Wilhelm Dilthey", initials: "D",
    dates: "1833 – 1911", country: "Allemagne",
    thesis: "Les sciences de la nature expliquent ; les sciences de l'homme comprennent.",
    tags: ["sciences humaines","interprétation"],
    sequences: [2],
    keyIdeas: ["Expliquer / comprendre", "Méthode interprétative"]
  },
  {
    id: "galilee", name: "Galilée", initials: "G",
    dates: "1564 – 1642", country: "Italie",
    thesis: "La chute des corps ne dépend pas de leur poids — opposition à Aristote et à l'Inquisition.",
    tags: ["science","révolution"],
    sequences: [2],
    keyIdeas: ["Méthode expérimentale", "Héliocentrisme", "Conflit science / religion"]
  },
  {
    id: "torricelli", name: "Evangelista Torricelli", initials: "T",
    dates: "1608 – 1647", country: "Italie",
    thesis: "Démonstration expérimentale de l'existence du vide et de la pression atmosphérique.",
    tags: ["science","expérimentation"],
    sequences: [2],
    keyIdeas: ["Expérience du baromètre", "Méthode hypothético-déductive"]
  },
  {
    id: "weber", name: "Max Weber", initials: "W",
    dates: "1864 – 1920", country: "Allemagne",
    thesis: "L'État détient « le monopole de la violence légitime ».",
    tags: ["état","sociologie"],
    sequences: [5],
    keyIdeas: ["Monopole de la violence", "Légitimité étatique"]
  },
  {
    id: "rawls", name: "John Rawls", initials: "R",
    dates: "1921 – 2002", country: "États-Unis",
    thesis: "La désobéissance civile est un acte public, non-violent et politique. Les inégalités sociales menacent la démocratie.",
    tags: ["justice","démocratie"],
    sequences: [5],
    keyIdeas: ["Désobéissance civile", "Théorie de la justice", "Renforcement de la classe moyenne"]
  },
  {
    id: "sophocle", name: "Sophocle (Antigone)", initials: "S",
    dates: "v. 496 – 406 av. J.-C.", country: "Grèce antique",
    thesis: "Antigone incarne le conflit entre la loi morale (légitimité) et la loi politique (légalité).",
    tags: ["justice","tragédie"],
    sequences: [5],
    keyIdeas: ["Antigone vs Créon", "Légalité / légitimité", "Désobéissance morale"]
  },
  {
    id: "clastres", name: "Pierre Clastres", initials: "C",
    dates: "1934 – 1977", country: "France",
    thesis: "Les sociétés primitives ont un chef sans pouvoir : « pouvoir impuissant », chefferie sans coercition.",
    tags: ["anthropologie","politique"],
    sequences: [5],
    keyIdeas: ["Société contre l'État", "Chef sans pouvoir"]
  },
  {
    id: "callicles", name: "Calliclès", initials: "C",
    dates: "personnage de Platon", country: "Grèce antique",
    thesis: "Le bonheur consiste dans la satisfaction compulsive de tous nos désirs (hédonisme radical).",
    tags: ["hédonisme","plaisir"],
    sequences: [6],
    keyIdeas: ["Hédonisme radical", "Vivre selon la nature", "Critique des conventions morales"]
  }
];
