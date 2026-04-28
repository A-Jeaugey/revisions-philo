// Questions de quiz par séquence
window.QUIZZES = [
  {
    id: 1,
    title: "Conscience et connaissance de soi",
    description: "Testez vos connaissances sur Descartes, Freud, Sartre…",
    questions: [
      { q: "Que signifie étymologiquement le mot 'conscience' ?", o: ["Pensée pure","Avec savoir (cum + scientia)","Connaissance de soi","Réflexion intérieure"], c: 1, e: "Du latin <b>cum</b> (avec) + <b>scientia</b> (savoir)." },
      { q: "Quelle est la première certitude indubitable selon Descartes ?", o: ["L'existence du monde","L'existence de Dieu","Je pense, donc je suis","Mes sens sont fiables"], c: 2, e: "Le cogito : « <b>Je suis, j'existe</b> » est nécessairement vrai chaque fois que je le pense." },
      { q: "Le doute hyperbolique cartésien est :", o: ["Un doute sceptique sans issue","Un doute volontairement exagéré","Un doute pratique","Un doute religieux"], c: 1, e: "Hyperbolique = volontairement exagéré, jusqu'à l'hypothèse du malin génie." },
      { q: "Qui est l'auteur des « petites perceptions » inconscientes ?", o: ["Descartes","Freud","Leibniz","Spinoza"], c: 2, e: "<b>Leibniz</b> dans ses <i>Nouveaux essais sur l'entendement humain</i> (1765)." },
      { q: "Selon Spinoza, le libre arbitre est :", o: ["Le fondement de la dignité","Une illusion","Donné par Dieu","Une certitude évidente"], c: 1, e: "Métaphore de la pierre : nous sommes conscients de nos désirs mais ignorants des causes." },
      { q: "Dans la deuxième topique de Freud, le ÇA est :", o: ["L'instance morale","Le moi conscient","Le pôle pulsionnel inconscient","Le préconscient"], c: 2, e: "Le ÇA est régi par le principe du plaisir (Éros + Thanatos)." },
      { q: "Pour Sartre, le moi est :", o: ["Une essence figée","Un projet","Une substance","Une illusion"], c: 1, e: "L'<b>existence précède l'essence</b> : l'homme se construit par ses choix." },
      { q: "Qui critique l'inconscient en parlant de « mauvaise foi » ?", o: ["Freud","Sartre","Hegel","Pascal"], c: 1, e: "Sartre considère que parler d'inconscient revient à fuir sa liberté et sa responsabilité." },
      { q: "Que représente la pitié selon Rousseau ?", o: ["Une vertu acquise","Un sentiment naturel","Une faiblesse","Un préjugé culturel"], c: 1, e: "La pitié naturelle « tient lieu de lois, de mœurs et de vertu » à l'état de nature." },
      { q: "« On ne peut pas descendre deux fois dans le même fleuve » est de :", o: ["Aristote","Héraclite","Platon","Augustin"], c: 1, e: "<b>Héraclite d'Éphèse</b>, sur le devenir continuel des choses." }
    ]
  },
  {
    id: 2,
    title: "Vérité, raison, science",
    description: "Descartes, Hume, Kant, Popper…",
    questions: [
      { q: "La vérité est :", o: ["Ce qui existe","L'adéquation entre ce qu'on pense et la réalité","Une croyance partagée","Une certitude absolue"], c: 1, e: "La vérité est une <b>propriété</b> de nos idées ou énoncés." },
      { q: "Quel critère de scientificité Popper propose-t-il ?", o: ["La vérification","La falsifiabilité","La cohérence","L'universalité"], c: 1, e: "Une théorie n'est scientifique que si elle peut être <b>réfutée</b> par l'expérience." },
      { q: "Une connaissance a priori est :", o: ["Antérieure dans le temps","Indépendante de l'expérience sensible","Issue des sens","Obtenue par déduction"], c: 1, e: "A priori = sans recours à l'expérience sensible (mathématiques)." },
      { q: "Le problème de l'induction est posé par :", o: ["Descartes","Hume","Kant","Galilée"], c: 1, e: "L'<b>induction</b> (du particulier au général) ne s'appuie que sur l'habitude." },
      { q: "Pour Kant, on ne peut connaître que :", o: ["Les noumènes","Les phénomènes","Dieu","Les choses en soi"], c: 1, e: "Phénomènes = choses telles qu'on les perçoit ; noumènes = choses en soi (inconnaissables)." },
      { q: "L'expérimentation de Torricelli prouve :", o: ["Le mouvement de la Terre","L'existence du vide","La gravité","Le géocentrisme"], c: 1, e: "Démonstration de l'existence du vide et de la pression atmosphérique." },
      { q: "Pour Pascal, les premiers principes sont connus par :", o: ["La raison seule","Le cœur","La déduction","L'expérience"], c: 1, e: "« Le cœur a ses raisons que la raison ne connaît point. »" },
      { q: "Selon Dilthey, les sciences humaines visent à :", o: ["Expliquer","Comprendre","Démontrer","Prédire"], c: 1, e: "Expliquer (sciences de la nature) vs <b>comprendre</b> (sciences humaines)." },
      { q: "Selon Einstein, les concepts physiques sont :", o: ["Donnés par la nature","Des créations libres de l'esprit","Des évidences","Des conventions sociales"], c: 1, e: "Métaphore de la montre fermée : l'imagination est incontournable en science." },
      { q: "Le scepticisme est :", o: ["Une certitude","La position selon laquelle la vérité est inatteignable","Une science","Une religion"], c: 1, e: "Les sceptiques doutent de tout et ne tiennent rien pour vrai." }
    ]
  },
  {
    id: 3,
    title: "Langage et pensée",
    description: "Descartes, Saussure, Bergson, Nietzsche…",
    questions: [
      { q: "Pour Descartes, quel est le seul signe assuré de la pensée ?", o: ["Le rire","La parole","Les émotions","Le rêve"], c: 1, e: "Les perroquets ont les organes mais ne pensent pas ce qu'ils disent." },
      { q: "Le signe linguistique se compose de :", o: ["Un mot et un son","Un signifiant et un signifié","Une cause et un effet","Une image et un texte"], c: 1, e: "Saussure : signifiant (matériel) + signifié (mental). Arbitraire." },
      { q: "Pour Hegel, le mot donne à la pensée :", o: ["Sa beauté","Son existence la plus haute et la plus vraie","Sa simplicité","Son universalité"], c: 1, e: "L'ineffable est la pensée obscure ; le mot la rend claire." },
      { q: "Selon Bergson, le langage :", o: ["Révèle l'individualité","Voile l'individualité des choses","Est inutile","Est universel"], c: 1, e: "Les mots sont généraux : ils ratent la singularité. Seul l'art y accède." },
      { q: "Pour Nietzsche, la conscience est :", o: ["La supériorité humaine","Une maladie","Une vertu","Un don divin"], c: 1, e: "Tout ce qui devient conscient devient « plat, inconsistant, généralisé »." },
      { q: "La pensée antéprédicative est :", o: ["Pré-conceptuelle, sans mots","Verbale","Logique","Mathématique"], c: 0, e: "C'est la pensée à l'état de fermentation, avant que les mots la mettent en forme." },
      { q: "Convaincre, c'est :", o: ["Faire appel aux émotions","Obtenir l'assentiment par des arguments rationnels","Imposer son opinion","Manipuler"], c: 1, e: "Convaincre (raison) ≠ persuader (sensibilité, préjugés) — utilisé en rhétorique." },
      { q: "Pour Platon, la pensée est :", o: ["Une intuition","Un dialogue intérieur de l'âme avec elle-même","Une émotion","Une perception"], c: 1, e: "Pensée et discours sont la même chose : l'un extérieur, l'autre intérieur." }
    ]
  },
  {
    id: 4,
    title: "Définir l'art",
    description: "Nietzsche, Kant, Arendt, Duchamp…",
    questions: [
      { q: "Pour Nietzsche, le génie est :", o: ["Un don divin","Le résultat d'un travail acharné","Une inspiration","Une nature"], c: 1, e: "Critique du culte du génie : « aucune activité n'est un miracle »." },
      { q: "Pour Arendt, les œuvres d'art sont :", o: ["Faites pour les hommes","Faites pour le monde, destinées à survivre","Des objets d'usage","Des biens de consommation"], c: 1, e: "Gratuité de l'art : sans fonction dans le processus vital de la société." },
      { q: "Selon Alain, l'artiste :", o: ["Suit un plan précis","Est aussi spectateur de son œuvre","Imite la nature","Reproduit des modèles"], c: 1, e: "« L'idée lui vient à mesure qu'il fait. » L'artisan, lui, suit un plan." },
      { q: "Pour Kant, le beau est :", o: ["Objectif","Subjectif mais universel","Relatif","Personnel"], c: 1, e: "« Le beau est ce qui plaît universellement et sans concept. »" },
      { q: "L'agréable, selon Kant :", o: ["Plaît à tous","Procure un plaisir sensoriel particulier","Est désintéressé","Est universel"], c: 1, e: "L'agréable dépend des goûts de chacun ; le beau prétend à l'universalité." },
      { q: "La Fontaine (1917) est de :", o: ["Picasso","Duchamp","Manzoni","Warhol"], c: 1, e: "Marcel Duchamp : un urinoir signé, exposé comme œuvre d'art (ready-made)." },
      { q: "La caractéristique universelle de l'art est, dans la conclusion de la séquence :", o: ["La beauté","Le génie","La défamiliarisation","La technique"], c: 2, e: "L'art rend les choses étranges pour court-circuiter le regard habituel." },
      { q: "Pour Aristote, l'art :", o: ["Crée la beauté","Permet de contempler ce qui dans la réalité serait pénible","Imite les dieux","Doit être utile"], c: 1, e: "Plaisir esthétique antique : contemplation de l'ordre, même dans le répugnant." }
    ]
  },
  {
    id: 5,
    title: "État et justice",
    description: "Hobbes, Locke, Rousseau, Marx, Rawls…",
    questions: [
      { q: "Le contrat social est :", o: ["Un contrat de travail","Un pacte par lequel les individus créent l'autorité politique","Un traité international","Une loi religieuse"], c: 1, e: "Les individus transfèrent une partie de leurs libertés à l'autorité commune." },
      { q: "Pour Hobbes, à l'état de nature, l'homme est :", o: ["Bon","Un loup pour l'homme","Solitaire et innocent","Rationnel et moral"], c: 1, e: "État de guerre permanente de tous contre tous. Vie « brève, solitaire, misérable »." },
      { q: "Pour Locke, l'État doit :", o: ["Avoir un pouvoir absolu","Être limité, constitutionnel et responsable","Imposer la morale","Supprimer la propriété"], c: 1, e: "Pensée libérale : l'État protège les droits naturels des individus." },
      { q: "L'« insociable sociabilité » est de :", o: ["Hobbes","Kant","Rousseau","Marx"], c: 1, e: "L'homme veut s'associer mais aussi tout diriger : il a besoin d'un maître." },
      { q: "Pour Rousseau, l'homme à l'état de nature est :", o: ["Méchant","Asocial et amoral","Rationnel","Politique"], c: 1, e: "Ni bon ni méchant, c'est un « animal borné » qui ne connaît que ses besoins primaires." },
      { q: "Pour Marx, la liberté en droit est :", o: ["Identique à la liberté en fait","Aliénable par la contrainte économique","Garantie par l'État","Naturelle"], c: 1, e: "Sans égalité sociale, la liberté reste théorique. Critique de l'idéologie bourgeoise." },
      { q: "L'État détient « le monopole de la violence légitime » selon :", o: ["Marx","Weber","Rawls","Tocqueville"], c: 1, e: "Max Weber, sociologue allemand." },
      { q: "Antigone incarne :", o: ["La loi politique","La loi morale contre la loi politique","La justice étatique","La désobéissance arbitraire"], c: 1, e: "Conflit légitimité (devoir moral) vs légalité (loi de Créon)." },
      { q: "La désobéissance civile selon Rawls est :", o: ["Violente et secrète","Publique, non-violente et politique","Égoïste","Religieuse"], c: 1, e: "Acte décidé en conscience pour amener un changement dans la loi." },
      { q: "La tyrannie de la majorité est dénoncée par :", o: ["Hobbes","Tocqueville","Rousseau","Marx"], c: 1, e: "La démocratie peut imposer ses valeurs et ses préférences à toute la société." }
    ]
  },
  {
    id: 6,
    title: "Devoir et bonheur",
    description: "Calliclès, Épicure, stoïcisme…",
    questions: [
      { q: "Quelle est la différence entre obligation et contrainte ?", o: ["Aucune","Obligation = libre, contrainte = extérieure","Obligation = forcée","Contrainte = morale"], c: 1, e: "L'obligation s'impose librement (morale) ; la contrainte est extérieure et forcée." },
      { q: "Pour Calliclès, le bonheur consiste à :", o: ["Maîtriser ses désirs","Satisfaire compulsivement tous ses désirs","Méditer","Aider les autres"], c: 1, e: "Hédonisme radical : « vivre selon la nature »." },
      { q: "Le sort des Danaïdes illustre :", o: ["Le devoir moral","La frustration de la vie immodérée","L'amour divin","Le travail"], c: 1, e: "Remplir des tonneaux sans fond = la vie des plaisirs sans cesse renouvelés." },
      { q: "Pour Épicure, le bonheur est :", o: ["Le plaisir intense","L'ataraxie","La gloire","La richesse"], c: 1, e: "Ataraxie = absence de souffrance physique et psychologique." },
      { q: "L'épicurisme est :", o: ["Un hédonisme radical","Un hédonisme modéré par la raison","Un ascétisme","Un stoïcisme"], c: 1, e: "Satisfaire seulement les désirs naturels et nécessaires." },
      { q: "Le stoïcisme propose :", o: ["D'agir sur le monde","D'agir sur soi-même","D'éviter le monde","De rechercher le plaisir"], c: 1, e: "Bonheur absolu, indépendant des circonstances extérieures." },
      { q: "L'étymologie de bonheur est :", o: ["Bon + heur (chance)","Bien + cœur","Bon + jour","Bien + heure"], c: 0, e: "« heur » = chance — d'où le problème : peut-il y avoir un devoir d'être heureux ?" }
    ]
  }
];
