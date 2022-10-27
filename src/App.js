import { useSelector } from "react-redux";

import Login from "./components/Login";
import Page from "./components/Page";

const App = () => {
  const idToken = useSelector(state => state.authentication.idToken);

  return idToken === undefined ? <Login /> : <Page />;
};

export default App;