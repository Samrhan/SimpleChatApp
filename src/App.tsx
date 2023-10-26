
import './App.css'
import {EnvironmentContext} from './environment/environment.context.ts'
import {Portal} from "./components/Portal.tsx";
function App() {
  const apiUrl = import.meta.env.VITE_API_URL as string;
  const wsUrl = import.meta.env.VITE_WS_URL as string;
  return (
    <>
      <EnvironmentContext.Provider
          value={{ apiUrl, wsUrl }}
      >
       <Portal/>

      </EnvironmentContext.Provider>
    </>
  )
}

export default App
