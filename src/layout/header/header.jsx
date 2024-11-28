import { useContext, useEffect, useState } from "react";
import logo from "../../data/headerLogo/Logo.png";
import { CustomContext } from "../../utils/context";
import { Link } from "react-router";

const Head = () => {
  const [active, setActive] = useState(false);
  const [exitStates, setExitStates] = useState({});
  const { setSearchQuery, setRegistrate, searchQuery } =
    useContext(CustomContext);
  const [user, setData] = useState([]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleExit = (userId) => {
    setExitStates((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3001/user");
      const user = await response.json();

      setData(user);
    }
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/user/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setData((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } else {
        console.log(`User ${userId} has been deleted`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <section className="header">
      <div className="header_container">
        <ul className="header_ul">
          <li className="header_ul_li">
            <div className="header_ul_li-logo">
              <img className="header_ul_li-logo_img" src={logo} alt="logo" />
              <div className="header_ul_li-logo_title">
                <h2>MangoRead</h2>
                <p>Читай мангу с нами</p>
              </div>
            </div>
          </li>
          <li className="header_ul_li">
            <form
              className="header_ul_li-search"
              onSubmit={(e) => e.preventDefault()}
            >
              <label
                className={`header_ul_li-search_loupe ${
                  active ? "active" : ""
                }`}
                htmlFor="search"
              >
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.9 20.8L13.3 15.2C12.8 15.6 12.225 15.9167 11.575 16.15C10.925 16.3833 10.2333 16.5 9.5 16.5C7.68333 16.5 6.146 15.871 4.888 14.613C3.62933 13.3543 3 11.8167 3 10C3 8.18333 3.62933 6.64567 4.888 5.387C6.146 4.129 7.68333 3.5 9.5 3.5C11.3167 3.5 12.8543 4.129 14.113 5.387C15.371 6.64567 16 8.18333 16 10C16 10.7333 15.8833 11.425 15.65 12.075C15.4167 12.725 15.1 13.3 14.7 13.8L20.325 19.425C20.5083 19.6083 20.6 19.8333 20.6 20.1C20.6 20.3667 20.5 20.6 20.3 20.8C20.1167 20.9833 19.8833 21.075 19.6 21.075C19.3167 21.075 19.0833 20.9833 18.9 20.8ZM9.5 14.5C10.75 14.5 11.8127 14.0627 12.688 13.188C13.5627 12.3127 14 11.25 14 10C14 8.75 13.5627 7.68733 12.688 6.812C11.8127 5.93733 10.75 5.5 9.5 5.5C8.25 5.5 7.18733 5.93733 6.312 6.812C5.43733 7.68733 5 8.75 5 10C5 11.25 5.43733 12.3127 6.312 13.188C7.18733 14.0627 8.25 14.5 9.5 14.5Z"
                    fill="black"
                  />
                </svg>
              </label>
              <input
                onFocus={() => setActive(true)}
                onBlur={() => setActive(false)}
                onChange={handleSearch}
                value={searchQuery}
                id="search"
                type="text"
                style={{ paddingLeft: `${active ? "16px" : "50px"}` }}
                placeholder="Введите текст"
              />
            </form>
          </li>
          {user.length === 0 && (
            <li className="header_ul_li">
              <div className="header_ul_li-logout">
                <button
                  type="button"
                  onClick={() => setRegistrate("log")}
                  className="header_ul_li-logout_in"
                >
                  <Link to="/registrate">ВОЙТИ</Link>
                </button>
                <button
                  type="button"
                  className="header_ul_li-logout_out"
                  onClick={() => setRegistrate("reg")}
                >
                  <Link to="/registrate">РЕГИСТРАЦИЯ</Link>
                </button>
              </div>
            </li>
          )}

          {user.length > 0 &&
            user.map((user) => (
              <li key={user.id}>
                <div key={user.id} className="header_ul_li-user">
                  <span className="header_ul_li-user_name">
                    {user.username}
                  </span>
                  <img
                    className="header_ul_li-user_avatar"
                    src={user.img}
                    alt="user-avatar"
                  />
                  <a
                    href="#"
                    onClick={() => toggleExit(user.id)}
                    style={{
                      transform: `${
                        exitStates[user.id] ? "rotate( 90deg)" : "rotate(0)"
                      }`,
                    }}
                  ></a>
                  <form
                    style={{
                      display: `${exitStates[user.id] ? "block" : "none"}`,
                    }}
                  >
                    <button type="button" onClick={() => deleteUser(user.id)}>
                      Выход
                    </button>
                  </form>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Head;
