import React from "react";
import ProductBox from "./ProductBox";
import { EmojiFrown } from "react-bootstrap-icons";
import OutOfStockProductBox from "./OutOfStockProductBox";

class ProductsDisplay extends React.Component {
  render() {
    return (
      <div className="row1">
        {this.props.products.length > 0 ? (
          this.props.products.map((product) =>
            product.stock > 0 ? (
              <ProductBox key={product._id} product={product} />
            ) : null
          )
        ) : (
          <div className="container text-center">
            
            <h3 className="mt-3 ">No products found</h3>
          </div>
        )}

        {this.props.products.length > 0
          ? this.props.products.map((product) =>
              product.stock <= 0 ? (
                <OutOfStockProductBox key={product._id} product={product} />
              ) : null
            )
          : null}
      </div>
    );
  }
}

export default ProductsDisplay;
