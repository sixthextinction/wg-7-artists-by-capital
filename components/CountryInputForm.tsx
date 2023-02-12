import React from "react";

type Props = {
  handleSubmit: (event: React.FormEvent) => void;
  searchInput: string;
  setSearchInput: (searchInput: string) => void;
};

const CountryInputForm = (props: Props) => {
  return (
    <>
      <form onSubmit={props.handleSubmit} className="w-full ml-3 max-w-4xl px-4 ">
        <div className="flex border-b border-teal-500 py-2">
          <input
            type="text"
            value={props.searchInput}
            onChange={(e) => props.setSearchInput(e.target.value)}
            className="appearance-none bg-transparent border-none w-full dark:text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
          />
          <button
            type="submit"
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          >
            Search
          </button>
        </div>
      </form>
    </>
  );
};

export default CountryInputForm;
