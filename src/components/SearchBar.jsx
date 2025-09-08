import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-6">
      <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
        Sök i artiklar
      </label>

      <div className="relative max-w-xl">
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Skriv t.ex. history, love, crime…"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />

        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100"
            aria-label="Rensa sökfält"
            title="Rensa"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;


