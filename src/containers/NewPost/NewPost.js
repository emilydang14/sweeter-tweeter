import React, { useState } from "react";
import classes from "./NewPost.module.css";
import { connect } from "react-redux";
//
import { storage } from "../../firebase/firebase";
import database from "../../firebase/firebase";
import firebase from "firebase";
//
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
//
const NewPost = (props) => {
  const [newCaption, setNewCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const chooseFileHanlder = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const submitHandler = () => {
    storage
      .ref(`images/${image.name}`)
      .put(image)
      .on(
        "state_change",
        (snapshot) => {
          //progress function
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (err) => {
          //error
          console.log(err);
          alert(err.message);
        },
        async () => {
          //upload completed
          await storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              //post image to firestore database
              database.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                post: {
                  date: Date.now(),
                  caption: newCaption,
                  img: url,
                },
                postAuthor: {
                  ava: props.user.picture,
                  name: props.user.name,
                },
              });
              setProgress(0);
              setNewCaption("");
              setImage(null);
            });
        }
      );
  };
  return (
    <div className={classes.NewPost}>
      {progress > 0 && progress <= 100 ? (
        <>
          <Spinner />
          {"Upload Progress "}
          {progress}
          {"%"}{" "}
        </>
      ) : (
        <>
          <div>
            <input type="file" onChange={chooseFileHanlder} accept="image/*" />
          </div>
          <div className={classes.NewPost_creating}>
            <textarea
              className={classes.NewPost_captionInput_input}
              maxLength={300}
              placeholder="What's on your mind?..."
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
            />
            <Button name="Tweet" shape="oval" onClick={submitHandler} />
          </div>
        </>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
