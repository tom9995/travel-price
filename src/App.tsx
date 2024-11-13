import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Top from "./components/top/Top";
import ListDetails from "./components/list/listDetails/ListDetails";
import List from "./components/list/List";
import Signup from "./components/signup/Signup";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <Router basename={import.meta.env.DEV ? "/" : "/travel-price"}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Top />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/list" element={<List />} />
            <Route path="/listDetails" element={<ListDetails />} />
            <Route />
          </Routes>
        </BrowserRouter>
      </Router>
    </>
  );
}

export default App;
