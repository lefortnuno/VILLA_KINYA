let dbConn = require("../config/db");

//#region IDENTATION DE CODE
//#endregion

let Utilisateur = function (utilisateur) {
  this.id = utilisateur.id;
  this.identification = utilisateur.identification;
  this.cin = utilisateur.cin;
  this.nom = utilisateur.nom;
  this.prenom = utilisateur.prenom;
  this.dateNais = utilisateur.dateNais;
  this.lieuNais = utilisateur.lieuNais;
  this.nomPere = utilisateur.nomPere;
  this.nomMere = utilisateur.nomMere;
  this.domicile = utilisateur.domicile;
  this.numTel = utilisateur.numTel;
  this.profession = utilisateur.profession;
  this.attribut = utilisateur.attribut;
  this.statu = utilisateur.statu;
  this.numUrg = utilisateur.numUrg;
  this.email = utilisateur.email;
  this.img = utilisateur.img;
  this.fb = utilisateur.fb;
  this.mdp = utilisateur.mdp;
  this.observation = utilisateur.observation;
};

const REQUETE_BASIQUE = `SELECT * FROM USERS WHERE identification = ? OR CIN = ? `;

const REQUETE_ADVANCER = `SELECT id, identification, cin, nom, prenom, dateNais, lieuNais, nomPere, nomMere, domicile, numTel, profession, attribut, statu, numUrg, email, img, fb, mdp, observation FROM USERS `;
const ORDER_BY = ` ORDER BY id DESC `;

const NOTIFICATION_COMPTE = `SELECT count(id) as attenteActivation FROM users WHERE statu = 0 `;

Utilisateur.loginUtilisateur = (values, result) => {
  const requete = ` WHERE (identification=? AND statu=1)`;
  dbConn.query(
    REQUETE_ADVANCER + requete,
    [values.identification, values.mdp],
    (err, res) => {
      if (!err) {
        result(null, res);
      } else {
        result(err, null);
      }
    }
  );
};

Utilisateur.addUtilisateur = (newUtilisateur, result) => {
  dbConn.query(
    REQUETE_BASIQUE,
    [newUtilisateur.identification, newUtilisateur.cin],
    (err, data) => {
      if (err) {
        result(err, null);
        return 0;
      }
      if (data.length) {
        result(null, {
          success: true,
          message: "L'utilisateur existe déjà !",
        });
        return 0;
      }

      dbConn.query("INSERT INTO users SET ?", newUtilisateur, (err, res) => {
        if (!err) {
          result(null, { success: true, message: "ajouter avec succès !" });
        } else {
          result(err, null);
        }
      });
    }
  );
};

Utilisateur.getAllUtilisateurs = (result) => {
  dbConn.query(REQUETE_ADVANCER + ORDER_BY, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Utilisateur.getIdUtilisateur = (id, result) => {
  dbConn.query(REQUETE_ADVANCER + ` WHERE id = ?`, id, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      if (res.length !== 0) {
        result(null, res);
      } else {
        result(null, { success: false, message: "id introuvable!" });
      }
    }
  });
};

Utilisateur.updateUtilisateur = (newUtilisateur, id, result) => {
  dbConn.query(REQUETE_ADVANCER + ` WHERE id = ?`, id, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      if (res.length !== 0) {
        dbConn.query(
          REQUETE_BASIQUE,
          [newUtilisateur.identification, newUtilisateur.cin],
          (err, data) => {
            if (err) {
              result(err, null);
              return 0;
            }

            if (
              res[0].identification == newUtilisateur.identification ||
              res[0].cin == newUtilisateur.cin
            ) {
              dbConn.query(
                `UPDATE users SET ? WHERE id = ${id}`,
                newUtilisateur,
                function (err, res) {
                  if (err) {
                    result(err, null);
                  } else {
                    result(null, { success: true, message: "Reussi" });
                  }
                }
              );
            } else {
              if (data.length) {
                result(null, {
                  success: true,
                  message: "L'utilisateur existe déjà !",
                });
                return 0;
              }
              dbConn.query(
                `UPDATE users SET ? WHERE id = ${id}`,
                newUtilisateur,
                function (err, res) {
                  if (err) {
                    result(err, null);
                  } else {
                    result(null, { success: true, message: "Reussi" });
                  }
                }
              );
            }
          }
        );
      } else {
        result(null, { success: false, message: "id introuvable!" });
      }
    }
  });
};

Utilisateur.updateUtilisateurStatuAttribut = (newUtilisateur, id, result) => {
  dbConn.query(REQUETE_ADVANCER + ` WHERE id = ?`, id, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      if (res.length !== 0) {
        dbConn.query(
          `UPDATE users SET ? WHERE id = ${id}`,
          newUtilisateur,
          function (err, res) {
            if (err) {
              result(err, null);
            } else {
              result(null, { success: true, message: "Reussi" });
            }
          }
        );
      } else {
        result(null, { success: false, message: "id introuvable!" });
      }
    }
  });
};

Utilisateur.deleteUtilisateur = (id, result) => {
  Utilisateur.getIdUtilisateur(id, (err, resAttribut) => {
    //Nous gererons la suppression par un admin seulement du cote du frontEnd
    if (
      (resAttribut && resAttribut[0].attribut == 0) ||
      resAttribut[0].attribut == 1
    ) {
      dbConn.query(`DELETE FROM users WHERE id = ${id}`, function (err, res) {
        if (err) {
          result(err, null);
        } else {
          result(null, { success: true });
        }
      });
    } else {
      result(null, {
        success: false,
        message: `Echec du suppression ! user attribute : ${
          resAttribut[0].attribut == 0 ? "client" : "!Admin"
        }`,
      });
    }
  });
};

Utilisateur.searchUtilisateur = (valeur, result) => {
  dbConn.query(
    REQUETE_ADVANCER +
      `WHERE (nom LIKE '%${valeur.valeur}%' OR prenom LIKE '%${valeur.valeur}%')` +
      ORDER_BY,
    (err, res) => {
      if (err) {
        result({ err, message: "erreur !", success: false }, null);
      } else {
        if (res.length !== 0) {
          result(null, { res, message: "trouvable !", success: true });
        } else {
          result(null, { res, message: "Introuvable !", success: false });
        }
      }
    }
  );
};

Utilisateur.getAttenteActivation = (result) => {
  dbConn.query(NOTIFICATION_COMPTE, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Utilisateur.getAllAttenteActivation = (result) => {
  dbConn.query(
    REQUETE_ADVANCER + ` WHERE statu = 0 ` + ORDER_BY,
    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Utilisateur;
