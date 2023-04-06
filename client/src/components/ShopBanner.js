import React from "react";

class ShopBanner extends React.Component {
  render() {
    return (
      <div className="breadcumb_area bg-img mb-10">
        <div className="align-items-center">
          <div className="col-12">
            <div className="page-title text-center">
              <h2>{this.props.title}</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShopBanner;
