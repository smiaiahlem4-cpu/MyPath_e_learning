
const COURSES = [
  {
    id: 'dotnet', type: 'ecrit', title: 'Microsoft .NET', img: 'microsoft_net.jpg',
    intro: "Découvrez la plateforme .NET et le langage C# pour créer des applications web et console.",
    goals: ["Comprendre ce que sont .NET et C#", "Créer et lancer un projet console", "Utiliser variables, conditions et boucles"],
    sections: [
      { h: "Qu'est-ce que .NET ?", t: ".NET est une plateforme gratuite de Microsoft pour créer des applications web, mobiles, de bureau et des API. Son langage principal est C#." },
      { h: "Créer un projet", t: "Une fois le SDK installé, trois commandes suffisent pour créer et lancer une application console.",
        code: "dotnet new console -n MonApp\ncd MonApp\ndotnet run" },
      { h: "Un premier programme C#", t: "Ce programme affiche trois fois un message avec une boucle for.",
        code: "string nom = \"Sara\";\nfor (int i = 1; i <= 3; i++)\n{\n    Console.WriteLine($\"Bonjour {nom} ({i})\");\n}" }
    ],
    summary: [".NET est une plateforme, C# est son langage principal.", "La commande dotnet crée, compile et lance les projets.", "C# utilise des variables typées, des conditions et des boucles."]
  },
  {
    id: 'react', type: 'video', youtube: 'dGMWsXyA37U', title: 'React', img: 'image-react.jpg',
    intro: "Découvrez React : composants, props et état pour construire des interfaces dynamiques."
  },
  {
    id: 'sql', type: 'ecrit', title: 'SQL', img: 'sql.jpg',
    intro: "Apprenez à interroger et modifier une base de données relationnelle avec SQL.",
    goals: ["Lire des données avec SELECT", "Ajouter, modifier et supprimer des lignes", "Relier deux tables avec JOIN"],
    sections: [
      { h: "Lire des données", t: "SELECT choisit les colonnes, WHERE filtre les lignes et ORDER BY les trie.",
        code: "SELECT nom, ville\nFROM etudiants\nWHERE ville = 'Tunis'\nORDER BY nom;" },
      { h: "Modifier des données", t: "Trois commandes permettent d'ajouter, de changer et de supprimer des lignes.",
        code: "INSERT INTO etudiants (nom, ville) VALUES ('Sara', 'Bizerte');\nUPDATE etudiants SET ville = 'Tunis' WHERE nom = 'Sara';\nDELETE FROM etudiants WHERE nom = 'Sara';" },
      { h: "Relier les tables", t: "JOIN combine les lignes de deux tables grâce à une colonne commune.",
        code: "SELECT e.nom, c.titre\nFROM etudiants e\nJOIN inscriptions i ON i.etudiant_id = e.id\nJOIN cours c ON c.id = i.cours_id;" }
    ],
    summary: ["SELECT lit les données, WHERE filtre, ORDER BY trie.", "INSERT, UPDATE et DELETE modifient les données (toujours avec WHERE pour UPDATE et DELETE).", "JOIN relie plusieurs tables."]
  },
  {
    id: 'ml', type: 'video', youtube: 'LowBV-EpNNY', title: 'Machine Learning', img: 'Machine-Learning.webp',
    intro: "Les bases du Machine Learning : apprendre à une machine à partir de données."
  },
  {
    id: 'spring', type: 'ecrit', title: 'Spring Framework', img: 'spring.jpg',
    intro: "Spring simplifie la création d'applications et d'API en Java.",
    goals: ["Comprendre le rôle de Spring Boot", "Créer un contrôleur REST", "Découvrir l'injection de dépendances"],
    sections: [
      { h: "Qu'est-ce que Spring ?", t: "Spring est un framework Java. Spring Boot le configure automatiquement pour démarrer un projet en quelques minutes." },
      { h: "Un premier contrôleur", t: "Cette classe expose l'adresse /bonjour qui renvoie un texte.",
        code: "@RestController\npublic class BonjourController {\n    @GetMapping(\"/bonjour\")\n    public String bonjour() {\n        return \"Bonjour MyPath\";\n    }\n}" },
      { h: "L'injection de dépendances", t: "Spring crée les objets et les fournit aux classes qui en ont besoin, au lieu de les créer avec new.",
        code: "@Service\npublic class CoursService { }\n\n@RestController\npublic class CoursController {\n    private final CoursService service;\n    public CoursController(CoursService service) {\n        this.service = service;\n    }\n}" }
    ],
    summary: ["Spring Boot démarre rapidement une application Java.", "@RestController et @GetMapping créent des routes.", "L'injection de dépendances est gérée par Spring."]
  },
  {
    id: 'htmlcss', type: 'ecrit', title: 'HTML/CSS', img: 'html-css.jpg',
    intro: "HTML structure une page web, CSS la met en forme. Voici les bases des deux langages.",
    goals: ["Écrire la structure d'une page HTML5", "Appliquer des styles avec CSS", "Mettre en page avec Flexbox"],
    sections: [
      { h: "HTML structure la page", t: "Un document HTML contient un head (informations) et un body (contenu visible).",
        code: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Ma page</title>\n</head>\n<body>\n  <h1>Bonjour</h1>\n  <p>Mon premier paragraphe.</p>\n</body>\n</html>" },
      { h: "CSS met en forme", t: "Une règle CSS associe un sélecteur à des propriétés (couleur, taille, marges).",
        code: "h1 {\n  color: #1E1B5C;\n}\n.card {\n  padding: 12px;\n  border-radius: 10px;\n}" },
      { h: "Flexbox et media queries", t: "Flexbox aligne les éléments et les media queries adaptent la page aux petits écrans.",
        code: ".navbar {\n  display: flex;\n  align-items: center;\n}\n@media (max-width: 600px) {\n  .navbar { flex-direction: column; }\n}" }
    ],
    summary: ["HTML décrit le contenu, CSS décrit l'apparence.", "Les balises sémantiques (header, nav, main, footer) rendent la page claire.", "Flexbox, Grid et les media queries rendent la page responsive."]
  },
  {
    id: 'dl', type: 'video', youtube: 'DsXJpFz5hqQ', title: 'Deep Learning', img: 'Deep_Learning.jpg',
    intro: "Comprenez comment fonctionnent les réseaux de neurones profonds."
  },
  {
    id: 'express', type: 'ecrit', title: 'Express.js', img: 'express.jpg',
    intro: "Express est un framework minimaliste pour créer des serveurs web avec Node.js.",
    goals: ["Installer Express", "Créer un serveur minimal", "Définir des routes"],
    sections: [
      { h: "Installation", t: "Dans un dossier de projet, initialisez npm puis installez Express.",
        code: "npm init -y\nnpm install express" },
      { h: "Un serveur minimal", t: "Ce fichier démarre un serveur sur le port 3000.",
        code: "const express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => {\n  res.send('Bonjour MyPath');\n});\n\napp.listen(3000);" },
      { h: "Les routes", t: "Chaque route associe une méthode HTTP et une adresse à une fonction.",
        code: "app.get('/cours', (req, res) => {\n  res.json([{ id: 1, titre: 'HTML' }]);\n});\n\napp.post('/cours', (req, res) => {\n  res.status(201).send('Cours ajouté');\n});" }
    ],
    summary: ["Express se installe avec npm.", "app.get et app.post créent des routes.", "res.send et res.json renvoient la réponse."]
  },
  {
    id: 'genai', type: 'video', youtube: '7K3SDXqq_Ok', title: 'Generative AI', img: 'generative-AI.jpg',
    intro: "Découvrez les modèles d'IA qui génèrent du texte, des images et du code."
  },
  {
    id: 'cloud', type: 'ecrit', title: 'Cloud computing', img: 'cloud.jpg',
    intro: "Le cloud permet d'utiliser des serveurs, du stockage et des services via Internet.",
    goals: ["Définir le cloud computing", "Distinguer IaaS, PaaS et SaaS", "Connaître les avantages et les précautions"],
    sections: [
      { h: "Qu'est-ce que le cloud ?", t: "Au lieu d'acheter et d'entretenir ses propres serveurs, on loue des ressources chez un fournisseur (AWS, Azure, Google Cloud) et on paie selon l'usage." },
      { h: "Les trois modèles de service", t: "IaaS fournit l'infrastructure (machines virtuelles, réseau). PaaS fournit une plateforme pour déployer son code. SaaS fournit une application prête à l'emploi, comme une messagerie en ligne." },
      { h: "Avantages et précautions", t: "Le cloud offre de la souplesse, une mise en route rapide et des sauvegardes. Il faut toutefois surveiller les coûts, la sécurité des accès et la localisation des données." }
    ],
    summary: ["Le cloud = des ressources informatiques louées à la demande.", "IaaS, PaaS et SaaS se distinguent par ce que le fournisseur gère.", "Surveillez les coûts et la sécurité."]
  },
  {
    id: 'cyber', type: 'ecrit', title: 'Cyber Security', img: 'cyber-security.jpg',
    intro: "Apprenez les bases pour protéger vos comptes, vos appareils et vos données.",
    goals: ["Reconnaître les menaces courantes", "Adopter les bons réflexes", "Protéger ses comptes"],
    sections: [
      { h: "Les menaces courantes", t: "Le phishing imite un message officiel pour voler vos identifiants. Les logiciels malveillants (virus, rançongiciels) s'installent à votre insu. Les mots de passe faibles ou réutilisés facilitent le piratage." },
      { h: "Les bons réflexes", t: "Vérifiez l'expéditeur et l'adresse d'un lien avant de cliquer. Mettez à jour vos appareils et vos applications. Téléchargez les logiciels uniquement depuis des sources officielles." },
      { h: "Protéger ses comptes", t: "Utilisez un mot de passe long et unique pour chaque compte, idéalement avec un gestionnaire de mots de passe, et activez la double authentification partout où c'est possible." }
    ],
    summary: ["Méfiez-vous des messages qui demandent d'agir vite.", "Mettez tout à jour régulièrement.", "Mot de passe unique + double authentification."]
  },
  {
    id: 'angular', type: 'ecrit', title: 'Angular Framework', img: 'angular-framework-jupiter-vidya.jpg',
    intro: "Angular est un framework TypeScript pour créer des applications web structurées.",
    goals: ["Comprendre ce qu'est un composant", "Afficher des données dans un template", "Utiliser un service"],
    sections: [
      { h: "Les composants", t: "Une application Angular est un assemblage de composants. Chacun a une classe TypeScript et un template HTML.",
        code: "@Component({\n  selector: 'app-cours',\n  templateUrl: './cours.component.html'\n})\nexport class CoursComponent {\n  titre = 'Angular';\n}" },
      { h: "Le template", t: "Les doubles accolades affichent une donnée et *ngFor répète un élément.",
        code: "<h2>{{ titre }}</h2>\n<ul>\n  <li *ngFor=\"let c of cours\">{{ c }}</li>\n</ul>" },
      { h: "Les services", t: "Un service contient la logique partagée entre plusieurs composants.",
        code: "@Injectable({ providedIn: 'root' })\nexport class CoursService {\n  liste() {\n    return ['HTML', 'CSS', 'JavaScript'];\n  }\n}" }
    ],
    summary: ["Un composant = une classe + un template.", "{{ }} affiche une donnée, *ngFor répète un élément.", "Les services partagent la logique."]
  },
  {
    id: 'python', type: 'video', youtube: 'NiBOYFPdAs0', title: 'Python', img: 'python.jpg',
    intro: "Apprenez Python, un langage simple et puissant pour débuter la programmation."
  },
  {
    id: 'javascript', type: 'video', youtube: 'ldxt9FNUc50', title: 'JavaScript', img: 'javascript.jpg',
    intro: "Rendez vos pages interactives : variables, fonctions et événements."
  },
  {
    id: 'node', type: 'video', youtube: 'X_LqBv0R46M', title: 'Node.js', img: 'nodejs.jpg',
    intro: "Utilisez JavaScript côté serveur avec Node.js."
  },
  {
    id: 'java', type: 'ecrit', title: 'Java', img: 'java.jpg',
    intro: "Java est un langage orienté objet très utilisé en entreprise et sur Android.",
    goals: ["Écrire et lancer un premier programme", "Créer une classe et des objets", "Utiliser les conditions et les boucles"],
    sections: [
      { h: "Premier programme", t: "Tout programme Java démarre dans la méthode main.",
        code: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Bonjour MyPath\");\n    }\n}" },
      { h: "Classes et objets", t: "Une classe décrit un modèle, un objet en est une instance.",
        code: "public class Etudiant {\n    private String nom;\n\n    public Etudiant(String nom) {\n        this.nom = nom;\n    }\n\n    public String getNom() {\n        return nom;\n    }\n}" },
      { h: "Conditions et boucles", t: "if choisit une branche, for répète un bloc.",
        code: "int note = 15;\nif (note >= 10) {\n    System.out.println(\"Admis\");\n}\nfor (int i = 0; i < 3; i++) {\n    System.out.println(i);\n}" }
    ],
    summary: ["Le point d'entrée est la méthode main.", "Une classe est un modèle, un objet est une instance.", "if, else et for contrôlent l'exécution."]
  },
  {
    id: 'docker', type: 'video', youtube: '-5HkwHWiS3M', title: 'Docker', img: 'docker.jpg',
    intro: "Empaquetez vos applications dans des conteneurs portables avec Docker."
  },
  {
    id: 'git', type: 'ecrit', title: 'Git & GitHub', img: 'git-github.jpg',
    intro: "Git garde l'historique de votre code et GitHub permet de le partager et d'y collaborer.",
    goals: ["Créer un dépôt et enregistrer des modifications", "Travailler avec des branches", "Envoyer son code sur GitHub"],
    sections: [
      { h: "Enregistrer des modifications", t: "Un commit est une photo de votre projet à un instant donné.",
        code: "git init\ngit add .\ngit commit -m \"Premier commit\"" },
      { h: "Les branches", t: "Une branche permet de travailler sur une fonctionnalité sans toucher à la version principale.",
        code: "git switch -c ma-fonctionnalite\ngit add .\ngit commit -m \"Ajout de la fonctionnalité\"\ngit switch main\ngit merge ma-fonctionnalite" },
      { h: "Partager sur GitHub", t: "Après avoir créé un dépôt sur GitHub, reliez-le à votre projet puis envoyez votre code.",
        code: "git remote add origin https://github.com/votre-compte/mon-projet.git\ngit push -u origin main" }
    ],
    summary: ["git add + git commit enregistrent une version.", "Les branches isolent le travail en cours.", "git push envoie le code sur GitHub."]
  },
  {
    id: 'devops', type: 'video', youtube: 'nmUBSX6BEak', title: 'DevOps', img: 'devops.jpg',
    intro: "Réunissez développement et exploitation pour livrer plus vite et plus sûrement."
  },
  {
    id: 'data', type: 'video', youtube: 'LwkWwxg10IU', title: 'Data Science', img: 'data-science.jpg',
    intro: "Apprenez à transformer des données en informations utiles."
  }
];
