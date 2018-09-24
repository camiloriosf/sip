//@flow

const uri = "https://sipub.coordinador.cl/api/v1/";

export const apiConstants = {
  API_URL: `http://localhost:8080/api/${window.encodeURIComponent(uri)}`,
  COSTOS_MARGINALES_REALES: window.encodeURIComponent(
    "recursos/costos_marginales_reales?barra_mnemotecnico__in=BA02T002SE032T002&fecha__gte=2016-01-01&fecha__lte=2018-09-23"
  ),
  BARRAS_COSTOS: window.encodeURIComponent(
    "vistas/infotecnica/barras/con_costos_marginales_reales"
  )
};
