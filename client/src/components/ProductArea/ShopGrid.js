import React from "react";
import TopBar from "./TopBar";
import ProductsDisplay from "./ProductsDisplay";

class ShopGrid extends React.Component {
  render() {
    return (
      <div className="col-12 col-md-8 col-lg-9">
        <div className="shop_grid_product_area ml-5 mr-5">
          <TopBar onSort={this.props.onSort} />
          <ProductsDisplay products={this.props.products} />
        </div>
      </div>
    );
  }
}

export default ShopGrid;
