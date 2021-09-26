import Buildings from "./pages/Buildings/index";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NewBuilding from "./pages/NewBuilding";
import Apartments from "./pages/Apartments";
import NewApartment from "./pages/NewApartment";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Buildings} />
          <Route path="/buildings/new" exact component={NewBuilding} />
          <Route path="/buildings/:id" exact component={Apartments} />
          <Route path="/apartments/new/:id" exact component={NewApartment} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
