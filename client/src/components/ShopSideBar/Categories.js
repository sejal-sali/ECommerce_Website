import React from "react";

class Categories extends React.Component {
  render() {
    return (
      <div className="widget catagory mb-50">
        <h6 className="widget-title mb-30" role="button">
          Categories
        </h6>

        <div className="catagories-menu">
          <ul id="menu-content2" className="menu-content collapse show">
            {this.props.curCategory !== "all items" ? (
              <li style={{ color: "#787878" }}>
                <a onClick={this.props.getAllItems}>all items</a>
              </li>
            ) : (
              <li>
                <a style={{ fontWeight: 700 }} onClick={this.props.getAllItems}>
                  all items
                </a>
              </li>
            )}
            {this.props.uniqueCategories.map((category) =>
              this.props.curCategory !== category ? (
                <li style={{ color: "#787878" }} key={category}>
                  <a onClick={this.props.onFilter}>{category}</a>
                </li>
              ) : (
                <li key={category}>
                  <a style={{ fontWeight: 700 }} onClick={this.props.onFilter}>
                    {category}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default Categories;
