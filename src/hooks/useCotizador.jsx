import { useContext } from "react";
import CotizadorContext from "../context/CotizadorProvider";
//Creamos el hook para evitar estar accediendo todo el tiempo al context repitiendo constantemente codigo 
const useCotizador=() => {
    return useContext(CotizadorContext)
}
export default useCotizador