import React, { useContext } from "react";
import TextTruncate from "react-text-truncate";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { MakeAdd } from "../../redux/reducers/data";
import { CustomContext } from "../../utils/context";

const Card = ({ products }) => {
  const dispatch = useDispatch();
  const { endIndex, startIndex,searchQuery } = useContext(CustomContext);

  const filteredProducts = products.data.filter((product) =>
    product.ru_name.toLowerCase().includes(searchQuery.toLowerCase()) // Фильтруем по названию
  );

  return (
    <div className="card">
      {filteredProducts.slice(startIndex, endIndex).map((product) => (
        <Link
          onClick={() => dispatch(MakeAdd("makeOrder", product))}
          to={`/Info`}
          className="card__block"
          style={{
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 5.73%, rgba(0, 0, 0, 0.5) 66.15%),url(${product.image})center, no-repeat`,
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
      ))}
    </div>
  );
};

export default Card;
