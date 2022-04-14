import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import axios from "axios";
import { url } from "../../config";

import UserResultItem from "../User/UserMinibar";
import ProductResultItem from "./ProductResultItem";
import { useSelector } from "react-redux";

// const users = [
//   { name: "safvan khalifa", username: "khsafvan" },
//   { name: "lukman", username: "khlukman" },
//   { name: "test1", username: "khtest" },
//   { name: "subhan", username: "khsubhan" },

//   { name: "test4", username: "4tester" },
// ];
let value;
let prev = "";
const SearchBar = ({ setLoading, setSearchQuery, search }) => (
  <TextField
    id="universal-search-bar"
    fullWidth
    value={value}
    className="text"
    onChange={(e) => {
      if (prev !== e.target.value) {
        setSearchQuery(e.target.value);
        value = e.target.value;
        prev = e.target.value;
        setLoading(true);
        const validTime = setTimeout(() => {
          setLoading(false);
          return () => {
            clearTimeout(validTime);
          };
        }, 1000);
      }
    }}
    label="Search"
    variant="outlined"
    size="small"
  />
);

const getMatchedUsers = async (currSearchQuery) => {
  if (!currSearchQuery) {
    return [];
  }
  const { data } = await axios.get(`${url}/search/user/${currSearchQuery}`);

  return data || [];
};
const productFinder = (isubstring, data) => {
  const substring = isubstring.split(" ").join("").toLowerCase();
  if (!substring) {
    return [];
  }
  if (!data) {
    return [];
  }
  const matches = data.filter((obj) => {
    if (
      obj.name.split(" ").join("").toLowerCase().includes(substring) ||
      obj.product_name.split(" ").join("").toLowerCase().includes(substring) ||
      obj.model.split(" ").join("").toLowerCase().includes(substring)
    ) {
      return true;
    } else {
      return false;
    }
  });
  console.log(matches, data);
  return matches;
};

export default function SearchBox(props) {
  let results;
  const products = useSelector((state) => state.products.discover);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const isEmpty = searchQuery.trim() === "";
  if (isEmpty) {
    results = [];
  }
  useEffect(async () => {
    const value = await getMatchedUsers(searchQuery);
    setUsers(value);
  }, [searchQuery]);
  if (!isEmpty) {
    const prodResults = productFinder(searchQuery, products).map((user, i) => {
      return (
        <ProductResultItem
          handleCloseNavMenu={props.handleCloseNavMenu}
          key={"resultProduct" + i}
          user={user}
        />
      );
    });
    const userResults = users.map((user, i) => {
      return (
        <UserResultItem
          handleCloseNavMenu={props.handleCloseNavMenu}
          key={"resultUser" + i}
          user={user}
        />
      );
    });
    results = [...userResults, ...prodResults];
  }
  useEffect(() => {
    props.changeResult(results);
  }, [searchQuery]);

  return (
    <SearchBar
      pb={2}
      setLoading={props.setLoading}
      search={props.search}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
}
