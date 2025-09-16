
import "./App.css";
import PdpPage from "./components/PdpPage";
import { Provider } from "react-redux";
import store from "./store/store";


function App() {


  return (
    <>
      <Provider store={store}>   <PdpPage></PdpPage></Provider>

    </>
  );
}

export default App;
