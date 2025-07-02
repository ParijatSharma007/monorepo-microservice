import { createRoot } from "react-dom/client";
import "./style.css";
import typescriptLogo from "/typescript.svg";
import { Counter, Header } from "@repo/ui";
import FabricComponent from "./components/FabricComponent";


const App = () => (
  <div>
    <FabricComponent/>
  </div>
);

createRoot(document.getElementById("app")!).render(<App />);
