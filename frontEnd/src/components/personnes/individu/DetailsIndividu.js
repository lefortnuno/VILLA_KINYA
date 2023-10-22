import axios from "../../../api/axios";
import getDataUtilisateur from "../../../api/udata";
import { libraryList, AjoutLibrary } from "../../../api/file.js";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import HeaderContext from "../../../contexts/header/header.context";
import FooterContext from "../../../contexts/footer/footer.context";
import SidebarContext from "../../../contexts/sidebar/sidebar.context";

import { BsReplyFill, BsSearch } from "react-icons/bs";

const base = `utilisateur`;
const URL_DE_BASE = base + `/`;

export default function DetailsIndividu() {
  const { cin } = useParams();
  const navigate = useNavigate();
  const u_info = getDataUtilisateur();

  //#region //------------DONNEE UTILISATEUR------------
  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    getOneUser();
  }, []);
  //#endregion

  //#region // RECUPERER UN INDIVIDU
  function getOneUser() {
    axios.get(URL_DE_BASE + `${cin}`, u_info.opts).then(function (response) {
      setInputs(response.data[0]);
      console.log("response : ", response.data[0]);
    });
  }
  //#endregion

  //#region //------------MODAL EDIT UTILISATEUR------------
  const [numCompteEdit, setNumCompteEdit] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const showEditModal = (numCompte) => {
    setNumCompteEdit(numCompte);
    setShowEdit(true);
  };
  const closeEditModal = () => {
    getOneUser();
    setShowEdit(false);
  };
  //#endregion

  const handlePage = () => {
    navigate("/individu/");
  };

  const fontWeight = {
    fontWeight: "bold",
  };

  return (
    <>
      {libraryList.forEach((x) => AjoutLibrary(x))}
      <div className="wrapper">
        <HeaderContext>
          <form className="navbar-left navbar-form nav-search mr-md-3">
            <div className="input-group">
              <input
                type="text"
                name="searchValue"
                placeholder="Rechercher ...."
                className="form-control"
                autoComplete="off"
              />
              <div className="input-group-append">
                <span className="input-group-text">
                  <i className="la la-search search-icon"></i>
                </span>
              </div>
            </div>
          </form>
        </HeaderContext>
        <SidebarContext />

        <div className="main-panel">
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="card col-12">
                  <div className="card-header">
                    <h4 className="card-title">
                      <BsReplyFill
                        onClick={handlePage}
                        className="text-danger"
                        style={{ cursor: "pointer" }}
                      />
                      Détails sur l'{base} : '{inputs.identification}'
                    </h4>
                    <p className="card-category"> </p>
                  </div>
                  <div className="card-body">
                    {inputs ? (
                      <div className="row">
                        <div className="col-md-2 form-row">
                          <div className="form-group">
                            <span>
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  `/picture/pdp/DSC_0101.JPG`
                                }
                                style={{ width: "100%", borderRadius: "1%" }}
                                alt="pdp"
                              />
                            </span>
                          </div>
                        </div>

                        <div className="col-md-10 form-row">
                          <div className="form-group">
                            <label style={fontWeight}>Numéro de CIN :</label>
                            <span> {inputs.cin} </span>
                          </div>

                          <div className="form-group">
                            <label style={fontWeight}>Nom : </label>
                            <span> {inputs.nom} </span>
                          </div>

                          <div className="form-group">
                            <label style={fontWeight}>Prénom :</label>
                            <span> {inputs.prenom} </span>
                          </div>

                          <div className="form-group">
                            <label style={fontWeight}>
                              Numéro de téléphone :
                            </label>
                            <span> {inputs.numTel} </span>
                          </div>

                          <div className="form-group">
                            <label style={fontWeight}>Numéro d'urgence :</label>
                            <span> {inputs.numUrg} </span>
                          </div>

                          <div className="form-group">
                            <label style={fontWeight}>
                              Date de naissance :
                            </label>
                            <span> {inputs.dateNais} </span>
                          </div>

                          <div className="form-group">
                            <label style={fontWeight}>
                              Lieu de naissance :
                            </label>
                            <span> {inputs.lieuNais} </span>
                          </div>

                          <div className="form-group">
                            <label style={fontWeight}>
                              Adress du domicile :
                            </label>
                            <span> {inputs.domicile} </span>
                          </div>

                          <div className="form-group">
                            <label style={fontWeight}>Adress Email :</label>
                            <span> {inputs.email} </span>
                          </div>

                          <div className="form-group">
                            <label style={fontWeight}>Profession :</label>
                            <span> {inputs.profession} </span>
                          </div>

                          <div className="form-group">
                            <label style={fontWeight}>Fils de :</label>
                            <span> {inputs.nomPere} </span>
                          </div>

                          <div className="form-group">
                            <label style={fontWeight}>et de :</label>
                            <span> {inputs.nomMere} </span>
                          </div>

                          <div className="form-group">
                            <label style={fontWeight}>Rôle :</label>
                            <span>
                              {inputs.attribut == 1
                                ? " Administrateur"
                                : " Usager"}
                            </span>
                          </div>

                          <div className="form-group">
                            <label style={fontWeight}>Etat du Compte :</label>
                            <span>
                              {inputs.statu == 1 ? " Activé" : " En veille"}
                            </span>
                          </div>

                          <div className="form-group">
                            <label style={fontWeight}>Facebook :</label>
                            <span> {inputs.fb} </span>
                          </div>

                          <div className="form-group">
                            <label style={fontWeight}>Note :</label>
                            <span> {inputs.observation} </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="grid-row">
                          <div className="colmun colmun-left">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                `/picture/pageNotFound/404 2.png`
                              }
                              alt="image-left"
                            />
                            <h1 className="px-spc-b-20">
                              Veuillez vous reconnecter au serveur.
                            </h1>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <FooterContext />
        </div>
      </div>
    </>
  );
}
