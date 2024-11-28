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
  const [images, setImages] = useState({}); // Хранит загруженные изображения
  const loadedImagesRef = React.useRef(new Set()); // Используем ref для хранения загруженных изображений

  const filteredProducts = products.data.filter(
    (product) =>
      product.ru_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const loadImage = (product) => {
      return new Promise((resolve) => {
        const img = new Image();

        img.onload = () => {
          setImages((prevImages) => ({
            ...prevImages,
            [product.id]: product.image,
          }));
          loadedImagesRef.current.add(product.id); // Добавляем в загруженные
          resolve();
        };

        img.onerror = () => {
          setImages((prevImages) => ({
            ...prevImages,
            [product.id]: placeImg,
          }));
          loadedImagesRef.current.add(product.id); // Добавляем в загруженные
          resolve();
        };

        img.src = product.image; // Начинаем загрузку
      });
    };

    const loadImages = async () => {
      const promises = filteredProducts.map((product) => {
        // Проверяем, загружено ли изображение
        if (!loadedImagesRef.current.has(product.id)) {
          return loadImage(product);
        }
        return Promise.resolve(); // Если загружено, возвращаем уже разрешенный промис
      });

      await Promise.all(promises); // Ждем завершения всех загрузок
    };

    loadImages();
  }, [filteredProducts]); // Зависимость только от filteredProducts

  return (
    <div className="card">
      {filteredProducts.slice(startIndex, endIndex).map((product) => {
        const imageSrc = images[product.id] || placeImg;

        return (
          <Link
            onClick={() => dispatch(MakeAdd("makeOrder", product))}
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