//@flow

const uri = "https://sipub.coordinador.cl/api/v1/";

export const apiConstants = {
  API_URL: `http://localhost:8080/api/${window.encodeURIComponent(uri)}`,
  COSTOS_MARGINALES_REALES: window.encodeURIComponent(
    "recursos/costos_marginales_reales"
  ),
  BARRAS_COSTOS: window.encodeURIComponent(
    "vistas/infotecnica/barras/con_costos_marginales_reales"
  )
};
