import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CustomContext = createContext();

const Context = (props) => {
  const [products, setProducts] = useState({ data: [], error: "" });
  const [profile, setProfile] = useState({ data: [], error: "" });
  const [registrate, setRegistrate] = useState("log");
  const [searchQuery, setSearchQuery] = useState("");
  const maxItemsToShow = 12;
  const [genre, setGenre] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1);
  const startIndex = (currentPage - 1) * maxItemsToShow;
  const endIndex = startIndex + maxItemsToShow;
  const [checkboxes, setCheckboxes] = useState({});

  const getProducts = () => {
    axios(
      `http://localhost:3001/manga?type=${genre}&search=${searchQuery}`
    )
      .then(({ data }) => setProducts({ ...products, data: data }))
      .catch((error) => setProducts({ ...products, error: error }));
  };

  // const getProfile = () => {
  //   axios(`http://localhost:3001/profile`)
  //     .then(({ data }) => setProfile({ ...profile, data: data }))
  //     .catch((error) => setProfile({ ...profile, error: error }));
  // };

  useEffect(() => {
    getProducts();
  }, [searchQuery]);

  // useEffect(() => {
  //   getProfile();
  // }, []);

  const changeGenre = (value) => {
    setGenre(value);
    setCheckboxes({ ...checkboxes, [value]: !checkboxes[value] });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (endIndex < products.data.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const value = {
    // getProfile,
    getProducts,
    setCheckboxes,
    handlePrevPage,
    handleNextPage,
    changeGenre,
    setSearchQuery,
    setRegistrate,
    setGenre,
    setPage,
    setProfile,
    setCurrentPage,
    currentPage,
    products,
    // profile,
    checkboxes,
    registrate,
    searchQuery,
    genre,
    startIndex,
    endIndex,
    page,
  };
  return (
    <CustomContext.Provider value={value}>
      {props.children}
    </CustomContext.Provider>
  );
};

export default Context;
