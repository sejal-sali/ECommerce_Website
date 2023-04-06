import React from "react";
import { COLOURS } from "../../config/global_constants";

class ColourFilter extends React.Component {
  render() {
    return (
      <div className="widget color mb-50">
        <p className="widget-title2 mb-30">Colour</p>
        <div className="widget-desc">
          <ul className="d-flex">
            {this.props.uniqueColours.map((colour) =>
              !this.props.colours.includes(colour) ? (
                <li key={colour}>
                  <a style={{ backgroundColor: COLOURS[colour] }}></a>
                  <p onClick={this.props.onColourFilter}>{colour}</p>
                </li>
              ) : (
                <li key={colour}>
                  <a
                    style={{
                      backgroundColor: COLOURS[colour],
                      border: "2px solid black",
                    }}
                  ></a>
                  <p
                    style={{ color: "black", fontWeight: 600 }}
                    onClick={this.props.onColourFilter}
                  >
                    {colour}
                  </p>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default ColourFilter;
