import './Product.css';

function Product(props) {
  return (
    <div className="product-main">
        <img src={props.link} alt="Product" className="product-image"/>
        <p>{props.name}</p>
        <p>{(props.type === "USD")?"$ "+props.cost:"Rs. "+props.cost}</p>
    </div>
  );
}

export default Product;