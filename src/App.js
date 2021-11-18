import "./App.css";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//comps
import Header from "./comps/Header/Header";
//pages
import Home from "./pages/Home";
import Coin from "./pages/Coin";
import AlertMessage from "./comps/Alert";
import { useGlobalContext } from "./context";

function App() {
  const { alert } = useGlobalContext();
  return (
    <div>
      <BrowserRouter>
        <Header />
        {alert?.open && <AlertMessage />}
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/coins/:id" element={<Coin />} />
          <Route
            path="*"
            element={
              <main
                style={{
                  padding: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "80vh",
                }}
              >
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
