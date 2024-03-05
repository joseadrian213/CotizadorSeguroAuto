import { useState, createContext } from "react";
import {
  obtenerDiferenciaYear,
  calcularMarca,
  calcularPlan,
  formatearDinero,
} from "../helpers";
const CotizadorContext = createContext(); //Aqui ya se va tener un context creado

const CotizadorProvider = ({ children }) => {
  // Este componente utiliza el Contexto que hemos creado para proporcionar los datos que se pasen a él a todos los componentes hijos que estén dentro de él
  // const [modal,setModal]=useState(false)
  // const cambiarState=()=>{
  //     setModal(!modal)
  // }
  const [datos, setDatos] = useState({
    marca: "",
    year: "",
    plan: "",
  });
  const [error, setError] = useState("");
  const [resultado, setResultado] = useState(0);
  const [cargando, setCargando] = useState(0);

  const handleChangeDatos = (e) => {
    setDatos({
      //Cuando se trabaja con  objetos y quieres mantener el estado y no perder los demás valores debemos de copiar el objeto para poder mantener los valore4s y solo se modifique el valor que queremos modificar
      ...datos,
      [e.target.name]: e.target.value,
    });
  };
  const cotizarSeguro = () => {
    //Una base
    let resultado = 2000;
    //Diferencia de años
    const diferencia = obtenerDiferenciaYear(datos.year);

    //Hay que restar el 3% por cada año
    resultado -= (diferencia * 3 * resultado) / 100;

    //Europeo 30%
    //americano 15%
    //Asiatico 5%
    resultado *= calcularMarca(datos.marca);

    //Basico incrementa 20%
    // Compoleto 50%
    resultado *= calcularPlan(datos.plan);
    resultado = formatearDinero(resultado);
    setCargando(true);
    setTimeout(() => {

        setResultado(resultado);
        setCargando(false);

    }, 3000);
  };
  return (
    <CotizadorContext.Provider
      value={{
        //Aqui se declaran los valores a los que tengan acceso otros elementos de la aplicación
        // modal,
        // cambiarState
        datos,
        handleChangeDatos,
        error,
        setError,
        cotizarSeguro,
        resultado,
        cargando
      }}
    >
      {" "}
      {/* Cualquier componente hijo que se pase a CotizadorProvider tendrá acceso a los datos del Contexto.*/}
      {children}
    </CotizadorContext.Provider>
  );
};
export {
  CotizadorProvider, //El provider es de donde provienen los datos
};
export default CotizadorContext;
