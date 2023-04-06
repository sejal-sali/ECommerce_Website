import React from "react";
import Categories from "./Categories";
import ColourFilter from "./ColourFilter";
import PriceFilter from "./PriceFilter";
import SearchBar from "./SearchBar";

class SideBar extends React.Component {
  render() {
    return (
      <div className="col-12 col-md-4 col-lg-3">
        <div className="shop_sidebar_area ml-3 mr-3">
          <SearchBar onSearch={this.props.onSearch} query={this.props.query} />
          <Categories
            onFilter={this.props.onFilter}
            getAllItems={this.props.getAllItems}
            uniqueCategories={this.props.uniqueCategories}
            curCategory={this.props.curCategory}
          />
          <PriceFilter
            value={this.props.value}
            onPriceFilter={this.props.onPriceFilter}
            minPrice={this.props.minPrice}
            maxPrice={this.props.maxPrice}
            curMinPrice={this.props.curMinPrice}
            curMaxPrice={this.props.curMaxPrice}
          />
          <ColourFilter
            onColourFilter={this.props.onColourFilter}
            uniqueColours={this.props.uniqueColours}
            colours={this.props.colours}
          />
        </div>
      </div>
    );
  }
}

export default SideBar;
