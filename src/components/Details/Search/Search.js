import { useState } from "react";
import { Stack, Grid, Button, TextField, Box } from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars";
import { useSelector } from "react-redux";
import { getUser } from "../../../store/User/userSlice";

//
import ResultItem from "./ResultItem";

const SearchBar = ({ setSearchQuery }) => (
  <form>
    <TextField
      id="user-search-bar"
      fullWidth
      className="text"
      onInput={(e) => {
        setSearchQuery(e.target.value);
      }}
      label="Recommend To"
      variant="outlined"
      size="small"
    />
  </form>
);

const finder = (isubstring, data) => {
  const substring = isubstring.split(" ").join("").toLowerCase();
  if (!substring) {
    return [];
  }
  let matches = data.filter((username) =>
    username.split(" ").join("").toLowerCase().includes(substring)
  );

  return matches;
};

export default function SearchBox(props) {
  const tempUser = useSelector(getUser);
  const users = tempUser.circle;
  const [searchQuery, setSearchQuery] = useState("");

  let matches = finder(searchQuery, users);
  if (searchQuery.trim() === "") {
    matches = users;
  }
  // console.log(matches);
  const results = matches.map((user) => {
    // console.log(user);
    return (
      <ResultItem
        key={user}
        product={props.product}
        recommand
        username={user}
      />
    );
  });
  return (
    <Box p={1}>
      <Scrollbars
        style={{ height: 200 }}
        autoHide
        autoHideTimeout={0}
        autoHideDuration={200}
      >
        {results}
      </Scrollbars>
      <SearchBar
        pb={2}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </Box>
  );
}
