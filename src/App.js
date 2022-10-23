import { useSelector } from "react-redux";

import Login from "./components/Login";
import Landing from "./components/Landing";

const App = () => {
  const idToken = useSelector(state => state.authentication.idToken);

  return idToken === undefined ? <Login /> : <Landing />;
};

export default App;