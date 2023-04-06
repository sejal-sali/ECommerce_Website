import React from "react";
import { Slider } from "@mui/material";

class PriceFilter extends React.Component {
  render() {
    return (
      <div className="widget price mb-50">
        <h6 className="widget-title mb-30">Filter by</h6>
        <p className="widget-title2 mb-30">Price</p>

        <div className="widget-desc">
          <div className="slider-range">
            <Slider
              getAriaLabel={() => "Minimum distance"}
              min={this.props.minPrice}
              max={this.props.maxPrice}
              valueLabelDisplay="auto"
              value={this.props.value}
              disableSwap
              onChange={this.props.onPriceFilter}
            />
            <span className="range-price">
              <span className="mt-1">Range:</span>
              <p>
                €{this.props.curMinPrice} - €{this.props.curMaxPrice}
              </p>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default PriceFilter;
