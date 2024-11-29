import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="flex items-center justify-center mb-6 px-4 sm:px-6 lg:px-8">
      <input
        type="text"
        value={query}
        onChange={handleSearchChange}
        placeholder="Pesquisar receitas..."
        className="border-2 text-zinc-800 border-gray-300 p-4 rounded-lg w-full lg:w-2/3 xl:w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-300"
      />
      <button
        type="submit"
        className="ml-4 bg-red-500 text-white p-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 ease-in-out"
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
