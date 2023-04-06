import React from "react";
import { Link } from "react-router-dom";
import { ACCESS_LEVEL_ADMIN } from "../../config/global_constants";

class TopBar extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-12">
          <div className="product-topbar d-flex align-items-center justify-content-between">
            <div className="total-products">
              {localStorage.accessLevel == ACCESS_LEVEL_ADMIN ? (
                <Link to="/addproduct">
                  <button className="btn btn-success">Add Product</button>
                </Link>
              ) : null}
            </div>

            <div className="product-sorting d-flex">
              <p>Sort by:</p>
              <form action="#" method="get">
                <select
                  name="select"
                  id="sortByselect"
                  onChange={this.props.onSort}
                >
                  <option value="">None</option>
                  <option value="nameAsc">Name: A-Z</option>
                  <option value="nameDesc">Name: Z-A</option>
                  <option value="priceAsc">Price: $-$$</option>
                  <option value="priceDesc">Price: $$-$</option>
                  <option value="stockAsc">Stock: low-high</option>
                  <option value="stockDesc">Stock: high-low</option>
                </select>
                <input type="submit" className="d-none" value="" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TopBar;
