import React, { useContext, useEffect, useState } from "react";
import X from "../../data/assets/X.svg";
import { Link } from "react-router";
import { CustomContext } from "../../utils/context";

const Registrate = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const { registrate, setRegistrate } = useContext(CustomContext);
  const [username, setUsername] = useState("");
  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  const [img, setImg] = useState("");
  const [ user, setData] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUsername("");
    setNick("");
    setPassword("");
    setImg("");
    try {
      const response = await fetch("http://localhost:3001/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, nick, password, img: imgUrl }),
      });
      const data = await response.json();
      console.log("Registration successful:", data);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  const handleImgChange = (event) => {
    const file = event.target.files[0];
    setSelectedImg(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgUrl(reader.result);
    };
    setImg(file.name);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3001/user");
      const user = await response.json();

      setData(user);
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    if (user.length === 1) {
      window.location.href = '/';
    }
  }, [user]);

  return (
    <section className="registrate">
      <div className="registrate__main">
        <div className="registrate__content">
          <div className="registrate__content-x">
            <Link to="/">
              <img src={X} alt="X" />
            </Link>
          </div>
          <div className="registrate__content-log">
            <p onClick={() => setRegistrate("log")}>Вход</p>
            <p onClick={() => setRegistrate("reg")}>Регистрация</p>
          </div>
          {registrate == "reg" && (
            <form onSubmit={handleSubmit}>
              <div className="registrate__content-img">
                {selectedImg && (
                  <img src={URL.createObjectURL(selectedImg)} alt="asasas" />
                )}
                <label>
                  <input
                    type="file"
                    placeholder="Выберите фото"
                    onChange={handleImgChange}
                    required
                  />
                  <span>ДОБАВИТЬ ФОТО</span>
                </label>
              </div>
              <div className="registrate__content-form">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Nickname"
                  value={nick}
                  onChange={(e) => setNick(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit">регистрация</button>
              </div>
            </form>
          )}
          {registrate == "log"&& (
            <form>
              <div
                style={{ marginTop: "45px" }}
                className="registrate__content-form"
              >
                <input
                  type="text"
                  placeholder="Username"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                />
                <button type="submit">Вход</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Registrate;


// {
//     "id":1,
//     "img":"https://avatars.mds.yandex.net/i?id=00516fa167500087cc7b2ca9238a66ea57fe7d67-10780278-images-thumbs&n=13",
//     "username":"darwin",
//     "password":"sdadad",
//     "nick":"lock"
//   }
  