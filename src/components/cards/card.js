import React, { useContext, useEffect, useState } from "react";
import TextTruncate from "react-text-truncate";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { MakeAdd } from "../../redux/reducers/data";
import { CustomContext } from "../../utils/context";
import placeImg from "../../data/assets/PLaceHolder.jpeg";

const Card = ({ products }) => {
  const dispatch = useDispatch();
  const { endIndex, startIndex, searchQuery } = useContext(CustomContext);
  const [images, setImages] = useState({});

  const filteredProducts = products.data.filter(
    (product) =>
      product.ru_name.toLowerCase().includes(searchQuery.toLowerCase()) // Фильтруем по названию
  );

  useEffect(() => {
    const newImages = {};

    filteredProducts.forEach((product) => {
      const img = new Image();

      img.onload = () => {//создает новый image
        newImages[product.id] = product.image;
        setImages((prevImages) => ({
          ...prevImages,
          ...newImages,
        }));
      };

      img.onerror = () => {//при ошибке URL меняет на placeImg
        newImages[product.id] = placeImg;
        setImages((prevImages) => ({
          ...prevImages,
          ...newImages,
        }));
      };

      img.src = product.image; // Устанавливаем src для начала загрузки
    });
  }, [filteredProducts]); // Зависимость от filteredProducts

  return (
    <div className="card">
      {filteredProducts.slice(startIndex, endIndex).map((product) => {
        const imageSrc = images[product.id] || placeImg;

        return (
          <Link
            onClick={() => dispatch(MakeAdd("makeOrder", product))}//Link к странице информации
            to={`/Info`}
            className="card__block"
            style={{
              background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 5.73%, rgba(0, 0, 0, 0.5) 66.15%), url(${imageSrc}) center no-repeat`,
            }}
            key={product.id}
          >
            <div className="card__block-text">
              <h2>Год: {product.issue_year}</h2>
              <TextTruncate
                className="card__block-title"
                line={2.5}
                text={product.ru_name}
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Card;