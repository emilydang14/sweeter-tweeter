import React, { useEffect, useState } from "react";
import classes from "./Posts.module.css";
import { connect } from "react-redux";
//
import database from "../../firebase/firebase";

//
import Post from "./Post/Post";

//
const Posts = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    database
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ post_id: doc.id, ...doc.data() }))
        );
      });
  }, []);

  return posts.length >= 1 ? (
    <div className={classes.Posts}>
      {/* commentsArr,postAuthor_ava, postAuthor_name,post_img, post_caption, */}
      {/* newComt_input_onChange,newComt_input_value, onComment_submit_onClick */}
      {posts.map((post) => {
        const DATE_OPTIONS = {
          year: "numeric",
          month: "short",
          day: "numeric",
        };
        const date = new Date(post.post.date).toLocaleDateString(
          "en-US",
          DATE_OPTIONS
        );
        return (
          <Post
            postID={post.post_id}
            key={post.post_id}
            postAuthor_name={post.postAuthor.name}
            postAuthor_ava={post.postAuthor.ava}
            post_date={date}
            post_img={post.post.img}
            post_caption={post.post.caption}
          />
        );
      })}
    </div>
  ) : (
    <div style={{ margin: "30px 0" }}>
      <h2 style={{ textAlign: "center" }}>No post to show</h2>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.user !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
