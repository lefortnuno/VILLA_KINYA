const router = require("express").Router();
const utilisateurController = require("../controllers/utilisateur.controller");
const admin = require("../middlewares/admin.middleware");
const client = require("../middlewares/client.middleware");

router.post("/seConnecter", utilisateurController.loginUtilisateur);
router.post("/", admin.checkUtilisateur, utilisateurController.addUtilisateur);
router.post(
  "/recherche",
  // admin.checkUtilisateur,
  utilisateurController.searchUtilisateur
);

router.get(
  "/",
  admin.checkUtilisateur,
  utilisateurController.getAllUtilisateurs
);
router.get(
  "/:id",
  client.checkUtilisateur,
  utilisateurController.getIdUtilisateur
);
router.get(
  "/attenteActivation",
  admin.checkUtilisateur,
  utilisateurController.getAttenteActivation
);
router.get(
  "/liseAttenteActivation",
  admin.checkUtilisateur,
  utilisateurController.getAllAttenteActivation
);

router.put(
  "/:id",
  client.checkUtilisateur,
  utilisateurController.updateUtilisateur
);
router.put(
  "/admin/:id",
  admin.checkUtilisateur,
  utilisateurController.updateUtilisateurByAdministrateur
);
router.put(
  "/statu/:id",
  admin.checkUtilisateur,
  utilisateurController.updateUtilisateurStatu
);
router.put(
  "/attribut/:id",
  admin.checkUtilisateur,
  utilisateurController.updateUtilisateurAttribut
);

router.delete(
  "/:id",
  admin.checkUtilisateur,
  utilisateurController.deleteUtilisateur
);

module.exports = router;
