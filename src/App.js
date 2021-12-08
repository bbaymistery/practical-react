import "./global.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//components
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import Home from "./components/Home";
import ProductDetail from "./components/PrdocutDetail/ProductDetail";
import MainCart from "./components/CartContainer/MainCart";
import ProductListMainPage from "./components/ProductList/ProductListMainPage";
function App() {
  return (
    <div className="wrapper">
      {/* <div className="section-center"> */}
      <BrowserRouter>
        <SideBar />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<MainCart />} />
          <Route path="/products" element={<ProductListMainPage />} />
        </Routes>
      </BrowserRouter>
      {/* </div> */}
    </div>
  );
}

export default App;
