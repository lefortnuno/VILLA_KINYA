"use strict";
const Utilisateur = require("../models/utilisateur.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tmp = 6 * 24 * 60 * 60 * 1000;

const createToken = (info) => {
  return jwt.sign({ info }, process.env.TOKEN_SECRET, {
    expiresIn: tmp,
  });
};

module.exports.loginUtilisateur = (req, res) => {
  let { identification, mdp } = req.body;
  Utilisateur.loginUtilisateur({ identification }, (err, resp) => {
    if (!err) {
      if (resp.length != 0) {
        const pwd = resp[0].mdp;
        const validePwd = bcrypt.compareSync(mdp, pwd);

        if (validePwd) {
          const token = createToken(resp);
          res.send({
            token,
            success: true,
            user: resp,
            message: "Authentification réussie !",
          });
        } else {
          res.send({
            success: false,
            message: "Mot de passe incorrect !",
          });
        }
      } else {
        res.send({
          success: false,
          message: "Identification incorrect !",
        });
      }
    } else {
      res.send(err);
    }
  });
};

module.exports.addUtilisateur = (req, res) => {
  let {
    identification,
    cin,
    nom,
    prenom,
    dateNais,
    lieuNais,
    nomPere,
    nomMere,
    domicile,
    numTel,
    profession,
    numUrg,
    email,
    fb,
    mdp,
    observation,
  } = req.body;

  mdp = bcrypt.hashSync(mdp, 10);

  const newUtilisateur = {
    identification,
    cin,
    nom,
    prenom,
    dateNais,
    lieuNais,
    nomPere,
    nomMere,
    domicile,
    numTel,
    profession,
    numUrg,
    email,
    fb,
    mdp,
    observation,
  };

  Utilisateur.addUtilisateur(newUtilisateur, (err, resp) => {
    if (err) {
      res.send(err);
    } else {
      res.send(resp);
    }
  });
};

module.exports.getAllUtilisateurs = (req, res) => {
  Utilisateur.getAllUtilisateurs((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getIdUtilisateur = (req, res) => {
  Utilisateur.getIdUtilisateur(req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.updateUtilisateur = (req, res) => {
  const {
    identification,
    cin,
    nom,
    prenom,
    lieuNais,
    nomPere,
    nomMere,
    domicile,
    numTel,
    profession,
    numUrg,
    email,
    fb,
    observation,
  } = req.body;

  const newUtilisateur = {
    identification,
    cin,
    nom,
    prenom,
    lieuNais,
    nomPere,
    nomMere,
    domicile,
    numTel,
    profession,
    numUrg,
    email,
    fb,
    observation,
  };

  Utilisateur.updateUtilisateur(newUtilisateur, req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.updateUtilisateurByAdministrateur = (req, res) => {
  const {
    identification,
    cin,
    nom,
    prenom,
    lieuNais,
    nomPere,
    nomMere,
    domicile,
    numTel,
    profession,
    numUrg,
    email,
    fb,
    statu,
    attribut,
    observation,
  } = req.body;

  const newUtilisateur = {
    identification,
    cin,
    nom,
    prenom,
    lieuNais,
    nomPere,
    nomMere,
    domicile,
    numTel,
    profession,
    numUrg,
    email,
    fb,
    statu,
    attribut,
    observation,
  };

  Utilisateur.updateUtilisateur(newUtilisateur, req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.updateUtilisateurStatu = (req, res) => {
  const { statu } = req.body;

  const newUtilisateur = {
    statu,
  };

  Utilisateur.updateUtilisateurStatuAttribut(
    newUtilisateur,
    req.params.id,
    (err, resp) => {
      if (!err) {
        res.send(resp);
      } else {
        res.send(err);
      }
    }
  );
};

module.exports.updateUtilisateurAttribut = (req, res) => {
  const { attribut } = req.body;

  const newUtilisateur = {
    attribut,
  };

  Utilisateur.updateUtilisateurStatuAttribut(
    newUtilisateur,
    req.params.id,
    (err, resp) => {
      if (!err) {
        res.send(resp);
      } else {
        res.send(err);
      }
    }
  );
};

module.exports.deleteUtilisateur = (req, res) => {
  Utilisateur.deleteUtilisateur(req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.searchUtilisateur = (req, res) => {
  const { valeur } = req.body;  
  Utilisateur.searchUtilisateur({ valeur }, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getAttenteActivation = (req, res) => {
  Utilisateur.getAttenteActivation((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getAllAttenteActivation = (req, res) => {
  Utilisateur.getAllAttenteActivation((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};
