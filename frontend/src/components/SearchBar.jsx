import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="my-2 relative">
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
      </div>
      <input
        type="text"
        name="search"
        value={searchTerm}
        onChange={handleSearch}
        className="flex-1 w-full border-box p-2.5 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400"
        placeholder="Search for an artist"
        autoComplete="off"
      />
    </div>
  );
};

export default SearchBar;
