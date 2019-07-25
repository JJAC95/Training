import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };
  render() {
    return (
      <>
        <div className="catch-of-the-day">
          <div className="menu">
            <Header tagline="Freshly Caught Fish" />
          </div>

          <Order />
          <Inventory />
        </div>
      </>
    );
  }
}

export default App;
