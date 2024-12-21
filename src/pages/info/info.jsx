import React, { useEffect, useState } from "react";
import left from "../../data/btnSelector/left.svg";
import { Link } from "react-router";
import defaultImage from "../../data/assets/PLaceHolder.jpeg";

const Info = ({ products }) => {
  const [user, setData] = useState([]);
  const [coment, setComent] = useState([]);
  const [comentAdd, setComentAdd] = useState(false);
  const [text, setText] = useState("");
  const [nick, setNick] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const maxItemsToShow = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * maxItemsToShow;
  const endIndex = startIndex + maxItemsToShow;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user[0].username,
          nick: user[0].nick,
          image: user[0].img,
          text,
        }),
      });
      const data = await response.json();
      console.log("Comment added:", data);
      setComentAdd(!comentAdd);
      setUsername("");
      setNick("");
      setText("");
      setImage("");
    } catch (error) {
      console.error("Comment failed:", error);
    }
  };

  const deleteComment = async (e) => {
    e.preventDefault();
    const commentId = e.target.commentId.value; // Получаем ID комментария из скрытого поля
    try {
      const response = await fetch(`http://localhost:3001/comments/${commentId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      console.log("Comment deleted:", data);
      setComent((prev) => prev.filter((comment) => comment.id !== commentId)); // Обновляем состояние
    } catch (error) {
      console.error("Comment failed:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3001/comments");
      const coment = await response.json();

      setComent(coment);
    }
    fetchData();
  }, [coment]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3001/user");
      const user = await response.json();

      setData(user);
    }
    fetchData();
  }, []);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (endIndex < coment.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  try {
    const regex = /(<([^>]+)>)/gi;
    const result = products.description.replace(regex, "");
    const imageUrl = products.image.replace("old-url.jpg", "new-url.jpg");
    return (
      <section className="info">
        <div className="container">
          <Link className="info__exit" to="/">
            <img src={left} />
            Назад
          </Link>
          <div className="info__head">
            <img
              src={imageUrl}
              onError={(e) => {
                e.target.src = defaultImage;
              }}
              alt="Title-img"
            />
            <div className="info__head-desc">
              <h3>{products.ru_name}</h3>
              <h2>Информация:</h2>
              <p>
                Тип: <span>{products.type}</span>
              </p>
              <p>
                Год: <span>{products.issue_year}</span>
              </p>
              <p>
                Жанр: <span>{products.genre}</span>
              </p>
            </div>
          </div>
          <div className="info__sinop">
            <h2>Синопсис</h2>
            <p>
              {(products.description = products.description.replace(regex, ""))}
            </p>
          </div>
          <div className="info__comments">
            <div className="info__comments-top">
              <h2>Топ комментарий</h2>
              <button
                onClick={() => setComentAdd(!comentAdd)}
                disabled={user.length === 0}
              >
                {user.length === 0
                  ? "нужно войти для оставления коментария"
                  : "добавить комментарий"}
              </button>
            </div>
            {coment.slice(startIndex, endIndex).map((user) => (
              <div key={user.id}>
                <form className="info__comments-com" onSubmit={deleteComment}>
                  <img src={user.image} alt="Photo" />
                  <div className="info__comments-com_texts">
                    <h2>
                      {user.name}, {user.nick}
                    </h2>
                    <p>{user.text}</p>
                  </div>
                  <input type="hidden" name="commentId" value={user.id} />
                  <input type="submit" value="Delete" />
                </form>
              </div>
            ))}
            {comentAdd && (
              <div className="info__comments-add">
                <div className="info__comments-add_main">
                  <form
                    id="lock"
                    onSubmit={handleSubmit}
                    className="info__comments-add_content"
                  >
                    <div className="info__comments-add_content-items">
                      <img src={user.map((item) => item.img)} alt="" />
                      <h2>
                        {user.map((user) => (
                          <div key={user.id}>
                            {user.username},<span>{user.nick}</span>
                            <input
                              name="nick"
                              type="hidden"
                              onChange={(e) => setNick(e.target.value)}
                              value={nick}
                            />
                            <input
                              name="username"
                              type="hidden"
                              onChange={(e) => setUsername(e.target.value)}
                              value={username}
                            />
                            <input
                              name="image"
                              type="hidden"
                              onChange={(e) => setImage(e.target.value)}
                              value={image}
                            />
                          </div>
                        ))}
                      </h2>
                    </div>
                    <div className="info__comments-add_content-ash">
                      <textarea
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        name="text"
                        cols="30"
                        rows="10"
                        placeholder="Добавьте комментарий"
                      ></textarea>
                      <button form="lock" type="submit">
                        Добавить
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            <div className="info__comments-paginate">
              <div className="info__comments-paginate_selectore">
                <button
                  className="info__comments-paginate_selectore-left"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  type="button"
                ></button>
                <span
                  style={{ display: `${currentPage !== 1 ? "block" : "none"}` }}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >{`${currentPage !== 1 ? currentPage - 1 : ""}`}</span>
                <span className="info__comments-paginate_selectore-active">
                  {currentPage}
                </span>
                <span
                  onClick={() => setCurrentPage(currentPage + 1)}
                  style={{
                    display: `${endIndex >= coment.length ? "none" : "block"}`,
                  }}
                >
                  {`${endIndex >= coment.length ? "" : currentPage + 1}`}
                </span>
                <span>...</span>
                <span>99+</span>
                <button
                  className="info__comments-paginate_selectore-right"
                  onClick={handleNextPage}
                  disabled={endIndex >= coment.length}
                  type="button"
                ></button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    return null;
  }
};

export default Info;
