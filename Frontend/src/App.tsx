import { useState } from "react";
import { getStressData } from "./services/stress";
import "./App.css";

function App() {
  const [stressLevel, setStressLevel] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = Object.fromEntries(new FormData(e.target));
    const data = await getStressData({ userData: dataToSend });
    console.log({ afterRequest: data });
  };

  return (
    <>
      <div className="app__wrapper">
        <form action="" className="form" onSubmit={handleSubmit}>
          <label htmlFor="Occupation_encoded">
            <span>Ocupación</span>
            <select name="Occupation_encoded" id="Occupation_encoded">
              <option value="0">Ciencia</option>
              <option value="1">Educacion</option>
              <option value="2">Finanzas</option>
              <option value="3">Recursos humanos</option>
              <option value="4">Ingenieria</option>
              <option value="5">Leyes</option>
              <option value="6">Salud</option>
              <option value="7">Tecnología</option>
              <option value="8">Ventas</option>
            </select>
          </label>
          <label htmlFor="Age">
            <span>Edad</span>
            <input type="number" id="Age" name="Age" />
          </label>
          <label htmlFor="Sleep Duration">
            <span>Horas de sueño(decimales)</span>
            <input type="number" id="Sleep Duration" name="Sleep Duration" />
          </label>
          <label htmlFor="Heart Rate">
            <span>Latidos por minuto</span>
            <input type="number" id="Heart Rate" name="Heart Rate" />
          </label>
          <label htmlFor="Daily Steps">
            <span>Pasos diarios</span>
            <input type="number" id="Daily Steps" name="Daily Steps" />
          </label>
          <label htmlFor="Gender_encoded">
            <span>Genero</span>
            <select name="Gender_encoded" id="Gender_encoded">
              <option value="0">Masculino</option>
              <option value="1">Femenino</option>
            </select>
          </label>
          <label htmlFor="BMI_category_encoded">
            <span>Indice de Masa Corporal</span>
            <select name="BMI_category_encoded" id="BMI_category_encoded">
              <option value="0">Normal</option>
              <option value="1">Sobrepeso</option>
              <option value="2">Obesidad</option>
            </select>
          </label>
          <button type="submit">Enviar</button>
        </form>

        <div>
          <strong>
            Tu nivel de estres es <span>{stressLevel}</span>
          </strong>
        </div>
      </div>
    </>
  );
}

export default App;
