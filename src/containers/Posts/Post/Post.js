import React, { useState, useEffect } from "react";
import classes from "./Post.module.css";
import { connect } from "react-redux";
//
import Button from "../../../components/UI/Button/Button";
import database from "../../../firebase/firebase";
import firebase from "firebase";
//
const Comts = ({ comts }) => {
  return comts ? (
    <div className={classes.Post_comts}>
      {comts.map((comt) => (
        <div key={comt.timestamp} className={classes.Post_comt}>
          <div className={classes.Post_author_info_ava}>
            <img
              className={classes.Post_author_info_ava_img}
              src={comt.img}
              alt=""
            />
            <p>{comt.name}</p>
          </div>
          <p style={{ fontWeight: "400" }}>{comt.comment}</p>
        </div>
      ))}
    </div>
  ) : (
    <p>No Comments</p>
  );
};
const Post = ({
  postID,
  postAuthor_ava,
  postAuthor_name,
  post_img,
  post_caption,
  post_date,
  user,
}) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const submitCommentHandler = async (id) => {
    await database.collection("posts").doc(id).collection("comments").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      comment: comment,
      img: user.picture,
      name: user.name,
    });
    setComment("");
  };
  const comment_onKeyDownHandler = (e, id) => {
    if (e.keyCode === 13) {
      submitCommentHandler(id);
    }
  };
  useEffect(() => {
    let unsubscribe;
    if (postID) {
      unsubscribe = database
        .collection("posts")
        .doc(postID)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        });
    }
    return () => unsubscribe();
  }, [postID]);

  //
  return (
    <div className={classes.Post}>
      <div className={classes.Post_author_info}>
        <div className={classes.Post_author_info_ava}>
          <img
            className={classes.Post_author_info_ava_img}
            src={postAuthor_ava}
            alt=""
          />
          <p>{postAuthor_name}</p>
        </div>
        <p>{post_date}</p>
      </div>

      <div className={classes.Post_img_container}>
        {post_img && (
          <img className={classes.Post_img_img} src={post_img} alt="picture" />
        )}
      </div>
      <div className={classes.Post_caption}>
        <p>{post_caption}</p>
      </div>
      {comments && <p>{comments.length} comments</p>}
      <Comts comts={comments} />

      {/* This need to work on: how to pass the value of input and enter
       to comt or click button to comt */}
      <div className={classes.Post_newComt}>
        <input
          className={classes.Post_newComt_input}
          type="text"
          placeholder="Write something ..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => comment_onKeyDownHandler(e, postID)}
          maxLength="200"
        >
          {/*Post new comt contains max characters?*/}
        </input>
        <div className={classes.Post_newComt_btn}>
          <Button
            name="Post"
            shape="round_small"
            onClick={() => submitCommentHandler(postID)}
            disabled={!comment}
          />
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Post);
