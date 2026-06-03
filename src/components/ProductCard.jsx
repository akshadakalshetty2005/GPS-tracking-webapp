import './ProductCard.css';

const ProductCard = ({ image, name, price, features, onBuy, onEnquiry }) => {
  return (
    <div className="product-card">
      <div className="product-card__image-wrap">
        <img src={image} alt={name} className="product-card__image" />
        <div className="product-card__badge">GPS Device</div>
      </div>
      <div className="product-card__body">
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__price">₹{price.toLocaleString('en-IN')}</p>
        <ul className="product-card__features">
          {features.map((feat, i) => (
            <li key={i}>
              <span className="product-card__check">✓</span>
              {feat}
            </li>
          ))}
        </ul>
      </div>
      <div className="product-card__footer">
        <button className="btn btn-primary product-card__btn" onClick={onBuy}>
          Buy Now
        </button>
        <button className="btn btn-outline product-card__btn" onClick={onEnquiry}>
          Enquiry
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
