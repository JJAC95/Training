import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyByDQD_hA56jP5DlHkf83mvfScS7UjEMYc",
  authDomain: "catchofthedayjackcornish-9341b.firebaseapp.com",
  databaseURL: "https://catchofthedayjackcornish-9341b.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
