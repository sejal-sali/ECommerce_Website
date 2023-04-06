import React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

class SearchBar extends React.Component {
  render() {
    return (
      <div className="widget price mb-50">
        <h6 className="widget-title mb-30">Search</h6>
        <InputGroup className="mb-3" >
          <FormControl
            placeholder="Search for product"
            aria-describedby="basic-addon2"
            onChange={this.props.onSearch}
          />
          <InputGroup.Text variant="outline-secondary" id="button-addon2">
            <Search />
          </InputGroup.Text>
        </InputGroup>
      </div>
    );
  }
}

export default SearchBar;
