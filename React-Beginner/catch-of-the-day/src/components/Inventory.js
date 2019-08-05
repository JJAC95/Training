import React from "react";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import PropTypes from "prop-types";
import Login from "./Login";
import firebase from "firebase";
import base, { firebaseApp } from "../base";
class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    loadSampleFishes: PropTypes.func,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func
  };

  state = {
    uid: null,
    owner: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async authData => {
    // look up current store in firebase database
    const store = await base.fetch(this.props.storeId, { context: this });
    // claim if theres no owner
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }
    // State of inventory component to reflect the current order.
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.id
    });
    console.log(authData);
  };
  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };
  logout = async () => {
    console.log("Logging Out!");
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>;
    // check if logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    //check if they are the owner
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          {" "}
          <p>sorry you are not the owner</p>
          {logout}
        </div>
      );
    }
    //if they are the owner then...

    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;
