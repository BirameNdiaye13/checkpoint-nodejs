const http = require('http');
const fs = require('fs');
const generatePassword = require('generate-password');
var nodemailer = require('nodemailer');

const PORT = 3000;
const FILE_NAME = 'welcome.txt';
const FILE_CONTENT = 'Hello Node';

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>Hello Node!!!!</h1>\n');
  });

  server.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
    
    // Créer le fichier welcome.txt
    fs.writeFile(FILE_NAME, FILE_CONTENT, (err) => {
      if (err) throw err;
      console.log(`Le fichier ${FILE_NAME} a été créé avec succès!`);
    });
  });

  
// Lire le contenu du fichier hello.txt
fs.readFile(FILE_NAME, 'utf8', (err, data) => {
  if (err) {
    console.error(`Impossible de lire le fichier ${FILE_NAME}: ${err}`);
    return;
  }
  console.log(`Contenu de ${FILE_NAME}:`);
  console.log(data);
});

function generateRandomPassword() {
    // Configuration pour la génération du mot de passe
    const passwordOptions = {
      length: 12, // Longueur du mot de passe
      numbers: true, // Inclure des chiffres
      symbols: true, // Inclure des symboles
      uppercase: true, // Inclure des lettres majuscules
      excludeSimilarCharacters: true, // Exclure les caractères similaires (comme 'l' et '1')
    };
  
    // Générer le mot de passe
    const password = generatePassword.generate(passwordOptions);
  
    // Afficher le mot de passe dans la console
    console.log('Mot de passe généré:', password);
  }
  
  // Appeler la fonction pour générer un mot de passe aléatoire
  generateRandomPassword();

  // Configuration pour l'envoi d'e-mails
const transporter = nodemailer.createTransport({
    service: 'gmail', // Service de messagerie à utiliser
    auth: {
      user: 'votre_adresse_email@gmail.com', // Votre adresse e-mail
      pass: 'votre_mot_de_passe', // Votre mot de passe
    },
  });
  
  // Définir les détails de l'e-mail à envoyer
  const mailOptions = {
    from: 'votre_adresse_email@gmail.com', // Votre adresse e-mail
    to: 'destination@gmail.com', // Adresse e-mail de destination
    subject: 'Test d\'envoi d\'e-mail avec Nodemailer', // Sujet de l'e-mail
    text: 'Ceci est un test d\'envoi d\'e-mail avec Nodemailer depuis Node.js.', // Contenu de l'e-mail en texte brut
    html: '<p>Ceci est un <b>test</b> d\'envoi d\'e-mail avec <i>Nodemailer</i> depuis <strong>Node.js</strong>.</p>', // Contenu de l'e-mail en HTML
  };
  
  // Envoyer l'e-mail
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
    } else {
      console.log('E-mail envoyé avec succès :', info.response);
    }
  });