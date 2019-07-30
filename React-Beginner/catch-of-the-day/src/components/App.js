import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };
  componentDidMount() {
    const params = this.props.match.params;
    //reinstate local storage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }
  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // take a copy of existing state
    const fishes = { ...this.state.fishes };
    //add new fish to fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // set the new fishes object to state
    this.setState({
      fishes: fishes
    });
  };

  updateFish = (key, updatedFish) => {
    // take a copy of the current state
    const fishes = { ...this.state.fishes };
    //update the state
    fishes[key] = updatedFish;
    // set to state
    this.setState({ fishes: fishes });
  };

  deleteFish = key => {
    // take a copy of the current state
    const fishes = { ...this.state.fishes };
    // remove the state
    fishes[key] = null;
    // set to state
    this.setState({ fishes: fishes });
  };
  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };
  addToOrder = key => {
    //copy state
    const order = { ...this.state.order };
    //add or update order
    order[key] = order[key] + 1 || 1;
    //setState to update order state
    this.setState({ order });
  };
  deleteOrder = key => {
    //copy state
    const order = { ...this.state.order };
    //add or update order
    delete order[key];
    //setState to update order state
    this.setState({ order });
  };

  render() {
    return (
      <>
        <div className="catch-of-the-day">
          <div className="menu">
            <Header tagline="Freshly Caught Fish" />
            <ul className="fishes">
              {Object.keys(this.state.fishes).map(key => (
                <Fish
                  key={key}
                  index={key}
                  details={this.state.fishes[key]}
                  addToOrder={this.addToOrder}
                />
              ))}
            </ul>
          </div>

          <Order
            index={Object.keys(this.state.order)}
            fishes={this.state.fishes}
            order={this.state.order}
            deleteOrder={this.deleteOrder}
          />
          <Inventory
            addFish={this.addFish}
            deleteFish={this.deleteFish}
            updateFish={this.updateFish}
            loadSampleFishes={this.loadSampleFishes}
            fishes={this.state.fishes}
          />
        </div>
      </>
    );
  }
}

export default App;
