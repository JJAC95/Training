import React from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  myInput = React.createRef();
  static propTypes = {
    history: PropTypes.object
  };
  goToStore = event => {
    //stop form submitting
    event.preventDefault();
    //get the text from input
    const storeName = this.myInput.current.value;
    //go to /store/"value entered"
    this.props.history.push(`/store/${storeName}`);
  };
  render() {
    return (
      <>
        <form action="" className="store-selector" onSubmit={this.goToStore}>
          <h2>Please enter a Store</h2>
          <input
            ref={this.myInput}
            type="text"
            required
            placeholder="Store Name"
            defaultValue={getFunName()}
          />
          <button type="submit">Visit Store</button>
        </form>
      </>
    );
  }
}

export default StorePicker;
