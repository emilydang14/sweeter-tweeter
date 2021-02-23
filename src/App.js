import "./App.css";
import { connect } from "react-redux";
//Firebase Firestore, Google Authentication with Firebase
//Material UI, CSS Modules
//BEM naming system
import Header from "./containers/Header/Header";
import Homepage from "./containers/Homepage/Homepage";
import Posts from "./containers/Posts/Posts";
import NewPost from "./containers/NewPost/NewPost";
const App = (props) => {
  return (
    <div className="App">
      <Header />
      <Homepage />
      {props.isAuth ? (
        <>
          <NewPost />
          <Posts />
        </>
      ) : null}
      <a
        style={{ textDecoration: "none", textAlign: "center" }}
        href="https://emilydang.dev/"
      >
        <p>Emily Dang © 2021</p>
      </a>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.user !== null,
  };
};

export default connect(mapStateToProps, null)(App);
