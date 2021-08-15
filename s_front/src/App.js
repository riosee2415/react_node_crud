import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

// Hook -> 컴포넌트가 리턴 되기 전에 실행되는 use* 함수들이,
// 변하면 안된다.

const App = () => {
  const [postsS, setPostsS] = useState([]);

  const [title, setTitle] = useState(``);
  const [content, setContnet] = useState(``);
  const [author, setAuthor] = useState(``);

  const [detailPost, setDetailPost] = useState(null);

  const titleValueCnage = (e) => {
    setTitle(e.target.value);
  };
  const contentValueCnage = (e) => {
    setContnet(e.target.value);
  };
  const authorValueCnage = (e) => {
    setAuthor(e.target.value);
  };

  const getAllPosts = async () => {
    const posts = await axios.get("http://localhost:7020/api/post/list");

    setPostsS(posts.data);
  };

  const detailClickHandler = useCallback((id) => async () => {
    const detailPost = await axios.get(
      `http://localhost:7020/api/post/detail/${id}`
    );

    setDetailPost(detailPost.data);
  });

  const createPostHandler = async () => {
    const createResult = await axios.post(
      "http://localhost:7020/api/post/create",
      {
        title,
        content,
        author,
      }
    );

    if (createResult) {
      setTitle(``);
      setContnet(``);
      setAuthor(``);

      alert("게시글 등록 성공!");
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div>
      {postsS.map((post, index) => (
        <section key={post.id} onClick={detailClickHandler(post.id)}>
          <span style={{ marginRight: `30px` }}>{post.id}</span>
          <span style={{ marginRight: `30px` }}>{post.title}</span>
          <span style={{ marginRight: `30px` }}>{post.author}</span>
          <span style={{ marginRight: `30px` }}>{post.createdAt}</span>
          <span style={{ marginRight: `30px` }}>{post.hit}</span>
          <hr />
          <br />
        </section>
      ))}

      <section>
        <div>
          <label>TITLE</label>
          <input
            type="text"
            placeholder="id..."
            value={title}
            onChange={titleValueCnage}
          />
        </div>

        <div>
          <label>CONTENT</label>
          <input
            type="text"
            placeholder="content..."
            value={content}
            onChange={contentValueCnage}
          />
        </div>

        <div>
          <label>AUTHOR</label>
          <input
            type="text"
            placeholder="author..."
            value={author}
            onChange={authorValueCnage}
          />
        </div>

        <button onClick={() => createPostHandler()}>CREATE</button>
      </section>

      {detailPost && (
        <div>
          <h4>{detailPost.id}</h4>
          <h4>{detailPost.title}</h4>
          <h4>{detailPost.createdAt}</h4>
          <h4>{detailPost.updatedAt}</h4>
          <h4>{detailPost.author}</h4>
          <h4>{detailPost.content}</h4>
        </div>
      )}
    </div>
  );
};

export default App;
