/* eslint-disable no-restricted-globals */

export default () => {
  self.addEventListener("message", e => {
    // console.log(e.data);
    // const uri = encodeURIComponent(
    //   "https://sipub.coordinador.cl/api/v1/vistas/infotecnica/barras/con_costos_marginales_reales"
    // );
    //   fetch(e.data.uri)
    //     .then(res => {
    //       // console.log("res: ", res.body);
    //       return res.json();
    //     })
    //     .then(data => {
    //       console.log("data: ", data);
    //     });
    // });
    // console.log("123123");
    self.postMessage(e.data);
  });
};
