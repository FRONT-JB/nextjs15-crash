"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function SearchBar() {
  const { push } = useRouter();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = () => {
    if (!searchTerm) return;

    push(`/search?q=${searchTerm}`);
  };

  return (
    <div>
      <input value={searchTerm} onChange={handleSearchTermChange} />

      <button onClick={handleSubmit}>검색</button>
    </div>
  );
}
