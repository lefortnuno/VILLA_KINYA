import axios from "../../../api/axios";
import getDataUtilisateur from "../../../api/udata";
import { useState } from "react";
import { toast } from "react-toastify";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const URL_DE_BASE = `utilisateur/`;
const obligatoire = "obligatoire";
let isValidate = false;
let i = 0;

export default function ModalEdition(props) {
  //#region // MES VARIABLES
  const identifiant = props.children;
  const u_info = getDataUtilisateur();
  const [inputs, setInputs] = useState({
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
    observation: "",
  });
  const [erreurs, setErreurs] = useState([]);
  const [messages, setMessages] = useState({
    identification: obligatoire,
    cin: obligatoire,
    nom: obligatoire,
    prenom: obligatoire,
    dateNais: obligatoire,
    lieuNais: obligatoire,
    nomPere: obligatoire,
    nomMere: obligatoire,
    domicile: obligatoire,
    numTel: obligatoire,
    profession: obligatoire,
    attribut: obligatoire,
    statu: obligatoire,
    numUrg: obligatoire,
    email: obligatoire,
    img: obligatoire,
    fb: obligatoire,
    mdp: obligatoire,
    observation: obligatoire,
  });
  //#endregion

  //#region // RECUPERER UN Individu
  // FUNC POUR EVITER UNE BOUCLE INFINIE
  while (props.showEdit && i === 0) {
    if (i !== 0) {
      break;
    }
    getOneUser(identifiant);
    i = 1;
  }

  function getOneUser(xid) {
    axios.get(URL_DE_BASE + `${xid}`, u_info.opts).then(function (response) {
      setInputs(response.data[0]);
    });
  }
  //#endregion

  //#region // FONCTION DU BOUTTON ENREGISTRER
  const onSubmit = () => {
    axios
      .put(URL_DE_BASE + `admin/${identifiant}`, inputs, u_info.opts)
      .then(function (response) {
        console.log("response : ", response);
        if (response.status === 200) {
          if (response.data.success) {
            toast.success("Modificatoin Reussi.");
            onClose();
          } else {
            toast.warning(response.data.message);
          }
        } else {
          toast.error("Echec de la Modification!");
        }
      });
  };
  //#endregion

  //#region // HANDLE CHANGE FONCTION
  const handleChange = (event) => {
    isValidate = true;
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setInputs((values) => ({ ...values, [name]: value }));
    setErreurs((values) => ({ ...values, messageErreur: false }));
    setErreurs((values) => ({ ...values, [name]: false }));

    if (
      name === "identification" ||
      name === "profession" ||
      name === "fb" ||
      name === "nom" ||
      name === "prenom" ||
      name === "nomPere" ||
      name === "nomMere"
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

    if (name === "numTel") {
      if (value.length === 0) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: "Numéro de téléphone obligatoire",
        }));
      } else if (value.length < 10) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: "Numéro de téléphone trop court",
        }));
      } else if (value.length > 10) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: "Numéro de téléphone trop long",
        }));
      } else if (value.length === 10) {
        isValidate = true;
        setErreurs((values) => ({ ...values, [name]: false }));
        setMessages((values) => ({ ...values, [name]: "" }));
      } else {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: "Numéro de téléphone Obligatoire",
        }));
      }
    }
  };
  //#endregion

  //#region //VALIDATION FORMULAIRE
  const validation = (event) => {
    event.preventDefault();

    const inputsObligatoire = [
      "cin",
      "nom",
      "prenom",
      "nomPere",
      "nomMere",
      "numTel",
      "profession",
      "fb",
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

    console.log(" --------- ", isValidate, " --------------");
    if (isValidate) {
      onSubmit();
    } else {
      toast.warn(
        "Verifiez les champs et/ou modifier au moins une (01) information !"
      );
    }
  };
  //#endregion

  //#region // QUAND JE FERMER MON MODAL, CETTE FONCTIO EST APPELLER
  function onClose() {
    props.onHide();
    i = 0;

    const inputsArray = [
      "identification",
      "cin",
      "nom",
      "prenom",
      "dateNais",
      "lieuNais",
      "nomPere",
      "nomMere",
      "domicile",
      "numTel",
      "profession",
      "attribut",
      "statu",
      "numUrg",
      "email",
      "img",
      "fb",
      "mdp",
      "observation",
    ];

    inputsArray.forEach((element) => {
      inputs[element] = "";
      isValidate = false;
      setErreurs((values) => ({ ...values, [element]: false }));
    });
  }
  //#endregion

  return (
    <>
      <Modal
        size="md"
        show={props.showEdit}
        onHide={props.closeEditModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title className="text-primary h6 md-6">
            Modification de l'individu
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput4"
                >
                  <Form.Label>Identification :</Form.Label>
                  <Form.Control
                    type="text"
                    name="identification"
                    onChange={handleChange}
                    value={inputs.identification}
                    placeholder="Identification"
                    autoComplete="off"
                  />
                  <small className="text-danger d-block">
                    {erreurs.identification ? messages.identification : null}
                  </small>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput3"
                >
                  <Form.Label>Nom : </Form.Label>
                  <Form.Control
                    type="text"
                    name="nom"
                    onChange={handleChange}
                    value={inputs.nom}
                    placeholder="Complement d'information"
                    autoComplete="off"
                  />
                  <small className="text-danger d-block">
                    {erreurs.nom ? messages.nom : null}
                  </small>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput3"
                >
                  <Form.Label>Prénom : </Form.Label>
                  <Form.Control
                    type="text"
                    name="prenom"
                    onChange={handleChange}
                    value={inputs.prenom}
                    placeholder="Complement d'information"
                    autoComplete="off"
                  />
                  <small className="text-danger d-block">
                    {erreurs.prenom ? messages.prenom : null}
                  </small>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput3"
                >
                  <Form.Label>Nom du Père : </Form.Label>
                  <Form.Control
                    type="text"
                    name="nomPere"
                    onChange={handleChange}
                    value={inputs.nomPere}
                    placeholder="Nom du Père"
                    autoComplete="off"
                    // disabled={true}
                  />
                  <small className="text-danger d-block">
                    {erreurs.nomPere ? messages.nomPere : null}
                  </small>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput3"
                >
                  <Form.Label>Nom de la Mère : </Form.Label>
                  <Form.Control
                    type="text"
                    name="nomMere"
                    onChange={handleChange}
                    value={inputs.nomMere}
                    placeholder="Nom de la Mère "
                    autoComplete="off"
                  />
                  <small className="text-danger d-block">
                    {erreurs.nomMere ? messages.nomMere : null}
                  </small>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput3"
                >
                  <Form.Label>Téléphone : </Form.Label>
                  <Form.Control
                    type="text"
                    name="numTel"
                    onChange={handleChange}
                    value={inputs.numTel}
                    placeholder="Numéro de téléphonee ...."
                    autoComplete="off"
                  />
                  <small className="text-danger d-block">
                    {erreurs.numTel ? messages.numTel : null}
                  </small>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput3"
                >
                  <Form.Label>Profession : </Form.Label>
                  <Form.Control
                    type="text"
                    name="profession"
                    onChange={handleChange}
                    value={inputs.profession}
                    placeholder="Profession"
                    autoComplete="off"
                  />
                  <small className="text-danger d-block">
                    {erreurs.profession ? messages.profession : null}
                  </small>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput3"
                >
                  <Form.Label>Facebook : </Form.Label>
                  <Form.Control
                    type="text"
                    name="fb"
                    onChange={handleChange}
                    value={inputs.fb}
                    placeholder="Compte Facebook"
                    autoComplete="off"
                  />
                  <small className="text-danger d-block">
                    {erreurs.fb ? messages.fb : null}
                  </small>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Label>Numéro de CIN : </Form.Label>
                  <Form.Control
                    type="number"
                    name="cin"
                    onChange={handleChange}
                    value={inputs.cin}
                    placeholder="Numéro de Téléphone "
                    autoComplete="off"
                  />
                  <small className="text-danger d-block">
                    {erreurs.cin ? messages.cin : null}
                  </small>
                </Form.Group>
              </Col>
            </Row>
            <small className="text-danger d-block">
              {erreurs.messageErreur ? messages.messageErreur : null}
            </small>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={onClose}>
            Annuler
          </Button>

          <Button variant="success" onClick={validation}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
