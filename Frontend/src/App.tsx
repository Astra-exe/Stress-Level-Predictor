import { useState } from "react";
import { getStressData } from "./services/stress";
import "./App.css";

function App() {
  const [stressLevel, setStressLevel] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await getStressData();
    console.log(data);
  };

  return (
    <>
      <div className="app__wrapper">
        <form action="" className="form" onSubmit={handleSubmit}>
          <label htmlFor="occupation">
            <span>Ocupación</span>
            <select name="occupation" id="occupation">
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
          <label htmlFor="age">
            <span>Edad</span>
            <input type="number" id="age" name="age" />
          </label>
          <label htmlFor="sleep">
            <span>Horas de sueño(decimales)</span>
            <input type="number" id="sleep" name="sleep" />
          </label>
          <label htmlFor="heartRate">
            <span>Latidos por minuto</span>
            <input type="number" id="heartRate" name="heartRate" />
          </label>
          <label htmlFor="dailySteps">
            <span>Pasos diarios</span>
            <input type="number" id="dailySteps" name="dailySteps" />
          </label>
          <label htmlFor="gender">
            <span>Genero</span>
            <select name="gender" id="gender">
              <option value="0">Masculino</option>
              <option value="1">Femenino</option>
            </select>
          </label>
          <label htmlFor="imc">
            <span>Indice de Masa Corporal</span>
            <select name="imc" id="imc">
              <option value="0">Normal</option>
              <option value="1">Sobrepeso</option>
              <option value="2">Obesidad</option>
            </select>
          </label>
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
