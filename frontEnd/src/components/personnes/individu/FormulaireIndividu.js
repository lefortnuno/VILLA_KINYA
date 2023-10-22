import axios from "../../../api/axios";
import verifDiffDate from "../../../api/verifDate";

import { useState } from "react";

import getDataUtilisateur from "../../../api/udata";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BsReplyFill } from "react-icons/bs";

const URL_DE_BASE = `utilisateur/`;
let isValidate = false;

export default function FormulaireNouveauIndividu() {
  //#region // MES VARIABLES
  const u_info = getDataUtilisateur();
  const navigate = useNavigate();
  const dateAujourdHui = new Date();
  const mesInputs = {
    identification: "",
    cin: "",
    nom: "",
    prenom: "",
    dateNais: "",
    lieuNais: "",
    nomPere: "",
    nomMere: "",
    domicile: "",
    numTel: "",
    profession: "",
    attribut: "",
    statu: "",
    numUrg: "",
    email: "",
    img: "",
    fb: "",
    mdp: "",
    confirmationMdp: "",
    observation: "",
  };

  const [inputs, setInputs] = useState(mesInputs);

  const [erreurs, setErreurs] = useState([]);
  const [messages, setMessages] = useState(mesInputs);
  //#endregion

  //#region // HANDLE CHANGE FONCTION
  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setInputs((values) => ({ ...values, [name]: value }));
    setErreurs((values) => ({ ...values, messageErreur: false }));
    setErreurs((values) => ({ ...values, [name]: false }));
    setErreurs((values) => ({ ...values, messageErreur: false }));

    if (
      name === "profession" ||
      name === "fb" ||
      name === "nom" ||
      name === "prenom" ||
      name === "nomPere" ||
      name === "nomMere" ||
      name === "email" ||
      name === "domicile" ||
      name === "lieuNais" ||
      name === "observation" ||
      name === "img"
    ) {
      if (value.length === 0) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: [name] + " obligatoire",
        }));
      } else if (value.length < 1) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: [name] + " trop court",
        }));
      } else if (value.length > 250) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: [name] + " trop long",
        }));
      } else {
        isValidate = true;
        setErreurs((values) => ({ ...values, [name]: false }));
        setMessages((values) => ({ ...values, [name]: "" }));
      }
    }

    if (name === "numTel" || name === "numUrg") {
      if (value.length === 0) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: [name] + " obligatoire",
        }));
      } else if (value.length < 10) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: [name] + " trop court",
        }));
      } else if (value.length > 10) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: [name] + " trop long",
        }));
      } else {
        isValidate = true;
        setErreurs((values) => ({ ...values, [name]: false }));
        setMessages((values) => ({ ...values, [name]: "" }));
      }
    }

    if (name === "cin") {
      if (value.length === 0) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: "Numéro de CIN obligatoire",
        }));
      } else if (value.length < 12) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: "Numéro de CIN trop court",
        }));
      } else if (value.length > 12) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: "Numéro de CIN trop long",
        }));
      } else if (value.length === 12) {
        isValidate = true;
        setErreurs((values) => ({ ...values, [name]: false }));
        setMessages((values) => ({ ...values, [name]: "" }));
      } else {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: "Numéro de CIN Obligatoire",
        }));
      }
    }

    if (name === "identification" || name === "mdp") {
      if (value.length === 0) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: [name] + " obligatoire",
        }));
      } else if (value.length < 4) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: [name] + " trop court",
        }));
      } else if (value.length > 21) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: [name] + " trop long",
        }));
      } else {
        isValidate = true;
        setErreurs((values) => ({ ...values, [name]: false }));
        setMessages((values) => ({ ...values, [name]: "" }));
      }
    }

    if (name === "dateNais") {
      setErreurs((values) => ({ ...values, dateNaiss: false }));
    }

    if (name === "confirmationMdp") {
      if (value !== inputs.mdp) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: " Les mot de pass ne correspondent pas",
        }));
      } else {
        isValidate = true;
        setErreurs((values) => ({ ...values, [name]: false }));
        setMessages((values) => ({ ...values, [name]: "" }));
      }
    }

    if (name === "mdp") {
      setErreurs((values) => ({ ...values, confirmationMdp: false }));
      setMessages((values) => ({ ...values, confirmationMdp: "" }));
    }
  };
  //#endregion

  //#region //VALIDATION FORMULAIRE
  const validation = (event) => {
    event.preventDefault();
    const inputsObligatoire = [
      "identification",
      "cin",
      "nom",
      "prenom",
      "lieuNais",
      "nomPere",
      "nomMere",
      "domicile",
      "numTel",
      "profession",
      "numUrg",
      "email",
      "fb",
      "mdp",
      "confirmationMdp",
    ];

    inputsObligatoire.forEach((element) => {
      if (element === "cin" && inputs[element]) {
        if (inputs[element].length !== 12) {
          setErreurs((values) => ({ ...values, [element]: true }));
          setMessages((values) => ({
            ...values,
            [element]: "champ " + [element] + "  anormale",
          }));
          isValidate = false;
        }
      }

      if (element === "numTel" && inputs[element]) {
        if (inputs[element].length !== 10) {
          setErreurs((values) => ({ ...values, [element]: true }));
          setMessages((values) => ({
            ...values,
            [element]: "champ " + [element] + "  anormale",
          }));
          isValidate = false;
        }
      }

      if (!inputs[element]) {
        setErreurs((values) => ({ ...values, [element]: true }));
        setMessages((values) => ({
          ...values,
          [element]: "champ " + [element] + "  obligatoire",
        }));
        isValidate = false;
      }
    });

    if (inputs.dateNais) {
      const t_dateN = new Date(inputs.dateNais);
      const t_date = new Date();

      const r_date = verifDiffDate(t_dateN, t_date);
      if (r_date.year < 8 || r_date.year > 110) {
        isValidate = false;
        setErreurs((values) => ({ ...values, dateNais: true }));
        setMessages((values) => ({
          ...values,
          dateNais: "Date de naissance anormale",
        }));
      }
    }
    console.log(" --------- ", isValidate, " --------------");
    if (isValidate) {
      onSubmit();
    } else {
      toast.warn("Verifier les champs!");
    }
  };
  //#endregion

  //#region // FONCTION DU BOUTTON ENREGISTRER
  const onSubmit = () => {
    axios
      .post(URL_DE_BASE, inputs, u_info.opts)
      .then(function (response) {
        if (response.status === 200) {
          if (response.data.success) {
            toast.success("Ajout Reussi.");

            onClose();
          } else {
            setErreurs((values) => ({ ...values, messageErreur: true }));
            setMessages((values) => ({
              ...values,
              messageErreur:
                "--- Ajout non effectuer! Numéro de CIN et/ou Identifiant déjà enregistrer! ---",
            }));
            toast.error(response.data.message);
          }
        } else {
          toast.error("Echec de l'Ajout!");
        }
      })
      .catch((e) => {
        if (e.response.status === 403) {
          toast.error("Vous n'etes pas autoriser à ajouter un individu!");
        }
      });
  };
  //#endregion

  //#region // QUAND JE FERMER MON MODAL, CETTE FONCTIO EST APPELLER
  function onClose() {
    const inputsArray = Object.keys(inputs);

    inputsArray.forEach((element) => {
      inputs[element] = "";
      isValidate = false;
      setErreurs((values) => ({ ...values, [element]: false }));
    });

    navigate("/individu/");
  }
  //#endregion

  //#region // RENDU HTML ----
  return (
    <>
      <form>
        <div className="form first">
          <div className="details personal">
            <div className="fields">
              <div className="input-field">
                <label>Numéro de CIN :</label>
                <input
                  type="number"
                  min="1"
                  name="cin"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Entrez le numéro de CIN"
                />
                <small className="text-danger d-block">
                  {erreurs.cin ? messages.cin : null}
                </small>
              </div>

              <div className="input-field">
                <label>Identification : </label>
                <input
                  type="text"
                  name="identification"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Identification de l'individu"
                />
                <small className="text-danger d-block">
                  {erreurs.identification ? messages.identification : null}
                </small>
              </div>

              <div className="input-field">
                <label>Nom : </label>
                <input
                  type="text"
                  name="nom"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Nom de l'individu"
                />
                <small className="text-danger d-block">
                  {erreurs.nom ? messages.nom : null}
                </small>
              </div>

              <div className="input-field">
                <label>Prénom : </label>
                <input
                  type="text"
                  name="prenom"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Prénom de l'individu"
                />
                <small className="text-danger d-block">
                  {erreurs.prenom ? messages.prenom : null}
                </small>
              </div>

              <div className="input-field">
                <label>Date de naissance :</label>
                <input
                  type="date"
                  name="dateNais"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder=""
                />
                <small className="text-danger d-block">
                  {erreurs.dateNais ? messages.dateNais : null}
                </small>
              </div>

              <div className="input-field">
                <label>Lieu de naissance: </label>
                <input
                  type="text"
                  name="lieuNais"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Lieu de naissance"
                />
                <small className="text-danger d-block">
                  {erreurs.lieuNais ? messages.lieuNais : null}
                </small>
              </div>

              <div className="input-field">
                <label>Nom du Père: </label>
                <input
                  type="text"
                  name="nomPere"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Nom du Père"
                />
                <small className="text-danger d-block">
                  {erreurs.nomPere ? messages.nomPere : null}
                </small>
              </div>

              <div className="input-field">
                <label>Nom de la Mère : </label>
                <input
                  type="text"
                  name="nomMere"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Nom de la Mère"
                />
                <small className="text-danger d-block">
                  {erreurs.nomMere ? messages.nomMere : null}
                </small>
              </div>

              <div className="input-field">
                <label>Numéro de téléphone : </label>
                <input
                  type="number"
                  min="1"
                  name="numTel"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="+261 "
                />
                <small className="text-danger d-block">
                  {erreurs.numTel ? messages.numTel : null}
                </small>
              </div>

              <div className="input-field">
                <label>Numéro d'urgence : </label>
                <input
                  type="number"
                  min="1"
                  name="numUrg"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="+261 "
                />
                <small className="text-danger d-block">
                  {erreurs.numUrg ? messages.numUrg : null}
                </small>
              </div>

              <div className="input-field">
                <label>Adresse du domicile : </label>
                <input
                  type="text"
                  name="domicile"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Adresse du domicile"
                />
                <small className="text-danger d-block">
                  {erreurs.domicile ? messages.domicile : null}
                </small>
              </div>

              <div className="input-field">
                <label>Adresse Email : </label>
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Adresse du domicile"
                />
                <small className="text-danger d-block">
                  {erreurs.email ? messages.email : null}
                </small>
              </div>

              <div className="input-field">
                <label>Profession : </label>
                <input
                  type="text"
                  name="profession"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Profession exercer"
                />
                <small className="text-danger d-block">
                  {erreurs.profession ? messages.profession : null}
                </small>
              </div>

              <div className="input-field">
                <label>Facebook : </label>
                <input
                  type="text"
                  name="fb"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Profession exercer"
                />
                <small className="text-danger d-block">
                  {erreurs.fb ? messages.fb : null}
                </small>
              </div>

              <div className="input-field">
                <label>Mot de passe : </label>
                <input
                  type="password"
                  name="mdp"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Entrez votre mot de passe"
                />
                <small className="text-danger d-block">
                  {erreurs.mdp ? messages.mdp : null}
                </small>
              </div>

              <div className="input-field">
                <label>Confirmez mot de passe : </label>
                <input
                  type="password"
                  name="confirmationMdp"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Confirmez votre mot de passe"
                />
                <small className="text-danger d-block">
                  {erreurs.confirmationMdp ? messages.confirmationMdp : null}
                </small>
              </div>

              <div className="input-field">
                <label>Observation :</label>
                <textarea
                  as="text"
                  name="observation"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Une observation à ajouter ? exemple : ''individu tres menacant et insistant, ....'' "
                />
                <small className="text-danger d-block">
                  {erreurs.observation ? messages.observation : null}
                </small>
              </div>
            </div>
            {erreurs.messageErreur ? (
              <span className="text-danger text-center d-block">
                {messages.messageErreur}
              </span>
            ) : null}

            <div className="buttons">
              <div className="backBtn btn btn-danger" onClick={onClose}>
                <BsReplyFill />
                <span className="btnText"> Annuler</span>
              </div>

              <button className="btn btn-success" onClick={validation}>
                <span className="btnText"> Enregistrer</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
  //#endregion
}
