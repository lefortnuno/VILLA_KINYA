const UtilisateurModel = require("../models/utilisateur.model");
const jwt = require("jsonwebtoken");

module.exports.checkUtilisateur = (req, res, next, myUserRole) => {
  const authorizationHeader = req.headers.authorization;
  // Supprimer le préfixe "Bearer" et obtenir le token
  const token = authorizationHeader.replace("Bearer ", "");
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.status(500).send({
          message: err,
          success: false,
        });
      } else {
        if (decodedToken) {
          const dtok = decodedToken.info[0];

          UtilisateurModel.getIdUtilisateur(dtok.id, (err, resultat) => {
            if (err) {
              res.status(500).send({
                message: err,
                success: false,
              });
            } else {
              if (
                resultat[0].attribut == myUserRole.admin ||
                resultat[0].attribut == myUserRole.client
              ) {
                next();
              } else {
                res.status(403).send({
                  message: ` Désolé, cher ${
                    resultat[0].attribut == 0 ? "ami" : "inconnu"
                  }, vous n’êtes pas autorisé à accéder à cette page !`,
                  success: false,
                });
              }
            }
          });
        } else {
          res.status(401).send({
            message: `Non autorisé ! Désolé, Impossible de décoder votre jeton/token !`,
            success: false,
          });
        }
      }
    });
  } else {
    res.status(401).send({
      message: `Non autorisé ! Désolé, Impossible de trouver votre jeton/token  !`,
      success: false,
    });
  }
};
