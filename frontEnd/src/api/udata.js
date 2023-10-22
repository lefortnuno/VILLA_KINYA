export default function getDataUtilisateur() {
  const u_info = {
    u_token: localStorage.token,
    u_id: localStorage.id,
    u_identification: localStorage.identification,
    u_attribut: localStorage.attribut,
    u_nom: localStorage.nom,
    u_prenom: localStorage.prenom,
    u_statu: localStorage.statu,
    u_numTel: localStorage.numTel,
    u_img: localStorage.img,
    u_cin: localStorage.cin,
  };

  const headOpts = {
    opts: {
      headers: {
        Authorization: u_info.u_token,
      },
    },
  };

  let u_data = Object.assign({}, u_info);
  u_data = Object.assign(u_data, headOpts);

  return u_data;
}
