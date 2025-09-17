
import "./App.css";
import PdpPage from "./components/PdpPage";
import { Provider } from "react-redux";
import store from "./store/store";
import { useEffect } from "react";


function App() {
   

  return (
    <>
      <Provider store={store}>   <PdpPage></PdpPage></Provider>

    </>
  );
}

export default App;
