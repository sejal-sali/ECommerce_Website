import React, { Component } from "react";
import ShopGrid from "../components/ProductArea/ShopGrid";
import ShopBanner from "../components/ShopBanner";
import SideBar from "../components/ShopSideBar/SideBar";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants.js";
import { Spinner } from "react-bootstrap";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      category: "all items",
      value: [],
      minPrice: 1,
      maxPrice: 100,
      uniqueCategories: [],
      colours: [],
      uniqueColours: [],
      searchQuery: "",
      sort: "",
      loading: true,
    };
  }

  componentDidMount() {
    this.getAllItems();
  }

  getAllItems = (e) => {
    let url = `${SERVER_HOST}/products?`;

    if (this.state.sort === "nameAsc") {
      url += `&sortBy=productName&orderBy=1`;
    } else if (this.state.sort === "nameDesc") {
      url += `&sortBy=productName&orderBy=-1`;
    } else if (this.state.sort === "priceAsc") {
      url += `&sortBy=price&orderBy=1`;
    } else if (this.state.sort === "priceDesc") {
      url += `&sortBy=price&orderBy=-1`;
    } else if (this.state.sort === "stockAsc") {
      url += `&sortBy=stock&orderBy=1`;
    } else if (this.state.sort === "stockDesc") {
      url += `&sortBy=stock&orderBy=-1`;
    }

    axios
      .get(url)
      .then((res) => {
        console.log("Products read");
        this.setState({ products: res.data });
        this.setState({ category: "all items" });
        const maxPrice = Math.max.apply(
          Math,
          this.state.products.map((p) => p.price)
        );
        const minPrice = Math.min.apply(
          Math,
          this.state.products.map((p) => p.price)
        );

        this.setState({ minPrice: minPrice });
        this.setState({ maxPrice: maxPrice });
        this.setState({ value: [minPrice, maxPrice] });

        const productCategories = this.state.products.map(
          (product) => product.categories
        );

        this.setState({
          uniqueCategories: [...new Set(productCategories.flat(1))].sort(),
        });

        const productColours = this.state.products.map(
          (product) => product.colours
        );

        this.setState({
          uniqueColours: [...new Set(productColours.flat(1))].sort(),
        });

        this.setState({ loading: false });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  fetchItems(url) {
    axios
      .get(url)
      .then((res) => {
        console.log("Records read");
        this.setState({
          products: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  handleCategoryFilter = (e) => {
    let url = `${SERVER_HOST}/products?categories=${e.target.textContent.toLowerCase()}`;

    this.setState({ category: e.target.textContent });

    if (this.state.sort === "nameAsc") {
      url += `&sortBy=productName&orderBy=1`;
    } else if (this.state.sort === "nameDesc") {
      url += `&sortBy=productName&orderBy=-1`;
    } else if (this.state.sort === "priceAsc") {
      url += `&sortBy=price&orderBy=1`;
    } else if (this.state.sort === "priceDesc") {
      url += `&sortBy=price&orderBy=-1`;
    } else if (this.state.sort === "stockAsc") {
      url += `&sortBy=stock&orderBy=1`;
    } else if (this.state.sort === "stockDesc") {
      url += `&sortBy=stock&orderBy=-1`;
    }

    this.fetchItems(url);
  };

  handlePriceFilter = (e, newVal) => {
    this.setState({ value: newVal });

    let url = `${SERVER_HOST}/products?`;
    if (this.state.category !== "all items") {
      url += `categories=${this.state.category.toLowerCase()}&minprice=${
        this.state.value[0]
      }&maxprice=${this.state.value[1]}`;

      this.state.colours.forEach((colour) => {
        url += `&colours=${colour}`;
      });
    } else {
      url += `&minprice=${this.state.value[0]}&maxprice=${this.state.value[1]}`;
      this.state.colours.forEach((colour) => {
        url += `&colours=${colour}`;
      });
    }

    if (this.state.sort === "nameAsc") {
      url += `&sortBy=productName&orderBy=1`;
    } else if (this.state.sort === "nameDesc") {
      url += `&sortBy=productName&orderBy=-1`;
    } else if (this.state.sort === "priceAsc") {
      url += `&sortBy=price&orderBy=1`;
    } else if (this.state.sort === "priceDesc") {
      url += `&sortBy=price&orderBy=-1`;
    } else if (this.state.sort === "stockAsc") {
      url += `&sortBy=stock&orderBy=1`;
    } else if (this.state.sort === "stockDesc") {
      url += `&sortBy=stock&orderBy=-1`;
    }

    this.fetchItems(url);
  };

  handleColoursFilter = (e) => {
    if (!this.state.colours.includes(e.target.textContent)) {
      this.state.colours.push(e.target.textContent);
    } else {
      let index = this.state.colours.indexOf(e.target.textContent);
      this.state.colours.splice(index, 1);
    }

    let url = `${SERVER_HOST}/products?`;
    if (this.state.category !== "all items") {
      url += `categories=${this.state.category.toLowerCase()}&minprice=${
        this.state.value[0]
      }&maxprice=${this.state.value[1]}`;
      this.state.colours.forEach((colour) => {
        url += `&colours=${colour}`;
      });
    } else {
      url += `&minprice=${this.state.value[0]}&maxprice=${this.state.value[1]}`;
      this.state.colours.forEach((colour) => {
        url += `&colours=${colour}`;
      });
    }

    if (this.state.sort === "nameAsc") {
      url += `&sortBy=productName&orderBy=1`;
    } else if (this.state.sort === "nameDesc") {
      url += `&sortBy=productName&orderBy=-1`;
    } else if (this.state.sort === "priceAsc") {
      url += `&sortBy=price&orderBy=1`;
    } else if (this.state.sort === "priceDesc") {
      url += `&sortBy=price&orderBy=-1`;
    } else if (this.state.sort === "stockAsc") {
      url += `&sortBy=stock&orderBy=1`;
    } else if (this.state.sort === "stockDesc") {
      url += `&sortBy=stock&orderBy=-1`;
    }

    this.fetchItems(url);
  };

  handleSearch = (e) => {
    this.setState({ searchQuery: e.target.value });
    let url = `${SERVER_HOST}/products?`;

    if (this.state.category !== "all items") {
      url += `categories=${this.state.category.toLowerCase()}&q=${
        e.target.value
      }&minprice=${this.state.value[0]}&maxprice=${this.state.value[1]}`;
      this.state.colours.forEach((colour) => {
        url += `&colours=${colour}`;
      });
    } else {
      url += `q=${e.target.value}&minprice=${this.state.value[0]}&maxprice=${this.state.value[1]}`;
      this.state.colours.forEach((colour) => {
        url += `&colours=${colour}`;
      });
    }

    if (this.state.sort === "nameAsc") {
      url += `&sortBy=productName&orderBy=1`;
    } else if (this.state.sort === "nameDesc") {
      url += `&sortBy=productName&orderBy=-1`;
    } else if (this.state.sort === "priceAsc") {
      url += `&sortBy=price&orderBy=1`;
    } else if (this.state.sort === "priceDesc") {
      url += `&sortBy=price&orderBy=-1`;
    } else if (this.state.sort === "stockAsc") {
      url += `&sortBy=stock&orderBy=1`;
    } else if (this.state.sort === "stockDesc") {
      url += `&sortBy=stock&orderBy=-1`;
    }

    this.fetchItems(url);
  };

  handleSort = (e) => {
    let url = `${SERVER_HOST}/products?`;

    if (this.state.category !== "all items") {
      url += `categories=${this.state.category.toLowerCase()}&productName=${
        this.state.searchQuery
      }&minprice=${this.state.value[0]}&maxprice=${this.state.value[1]}`;
      this.state.colours.forEach((colour) => {
        url += `&colours=${colour}`;
      });
    } else {
      url += `productName=${this.state.searchQuery}&minprice=${this.state.value[0]}&maxprice=${this.state.value[1]}`;
      this.state.colours.forEach((colour) => {
        url += `&colours=${colour}`;
      });
    }

    if (e.target.value === "nameAsc") {
      url += `&sortBy=productName&orderBy=1`;
      this.setState({ sort: e.target.value });
    } else if (e.target.value === "nameDesc") {
      url += `&sortBy=productName&orderBy=-1`;
      this.setState({ sort: e.target.value });
    } else if (e.target.value === "priceAsc") {
      url += `&sortBy=price&orderBy=1`;
      this.setState({ sort: e.target.value });
    } else if (e.target.value === "priceDesc") {
      url += `&sortBy=price&orderBy=-1`;
      this.setState({ sort: e.target.value });
    } else if (e.target.value === "stockAsc") {
      url += `&sortBy=stock&orderBy=1`;
      this.setState({ sort: e.target.value });
    } else if (e.target.value === "stockDesc") {
      url += `&sortBy=stock&orderBy=-1`;
      this.setState({ sort: e.target.value });
    } else {
      this.setState({ sort: "" });
    }

    this.fetchItems(url);
  };

  render() {
    return this.state.loading ? (
      <Spinner animation="border" role="status">
        <span className="visually-hidden"></span>
      </Spinner>
    ) : (
      <main>
        <ShopBanner title={this.state.category} />
        <section>
          <div className="container mt-50">
            <div className="mainarea">
              
              <ShopGrid
                products={this.state.products}
                onSort={this.handleSort}
              />

             

              </div>
              <div className="sidebar">
             <SideBar
                onFilter={this.handleCategoryFilter}
                getAllItems={this.getAllItems}
                onPriceFilter={this.handlePriceFilter}
                value={this.state.value}
                minPrice={this.state.minPrice}
                maxPrice={this.state.maxPrice}
                curMinPrice={this.state.value[0]}
                curMaxPrice={this.state.value[1]}
                uniqueCategories={this.state.uniqueCategories}
                onColourFilter={this.handleColoursFilter}
                uniqueColours={this.state.uniqueColours}
                colours={this.state.colours}
                onSearch={this.handleSearch}
                curCategory={this.state.category}
              />
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default Shop;
