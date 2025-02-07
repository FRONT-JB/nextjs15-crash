"use client";

import { ChangeEvent, useState } from "react";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input value={searchTerm} onChange={handleSearchTermChange} />

      <button>검색</button>
    </div>
  );
}
