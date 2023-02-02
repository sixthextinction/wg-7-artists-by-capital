import { NextPage } from "next";
import React, { useState } from "react";
import { useQuery, withWunderGraph } from "../components/generated/nextjs";

const Home: NextPage = () => {
  const [query, setQuery] = useState<string>("NZ");
  const [searchInput, setSearchInput] = useState<string>("NZ");
  const { data, isLoading } = useQuery({
    operationName: "artists/get",
    input: {
      country: query,
    },
  });

  // event handlers
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // essentially "submit" a query
    setQuery(searchInput);
  };

  return (
    <div>
      <div className="overflow-x-auto overflow-y-auto max-w-5xl mx-auto px-4 py-2">
        <div className="w-full h-full">
          <form
            onSubmit={handleSubmit}
            className="w-full ml-3 max-w-4xl px-4 py-2"
          >
            <div className="flex border-b border-teal-500 py-2">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="appearance-none bg-transparent border-none w-full dark:text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
              />
              <button
                type="submit"
                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              >
                Submit
              </button>
            </div>
          </form>
          {isLoading ? (
            <div className="flex justify-content items-center">
              <p className="font-xl text-white"> Loading...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data?.artists?.map((artist) => (
                  <div
                    key={artist.node?.name}
                    className="bg-white p-6 rounded-lg shadow-lg"
                  >
                    <img
                      src={
                        artist.node?.discogs?.images[0]?.url ||
                        "https://via.placeholder.com/192"
                      }
                      alt={artist.node?.name}
                      title={artist.node?.name}
                      className="h-48 w-full object-cover"
                    />
                    <h2 className="text-lg font-medium mt-2 border-b-2  border-teal-500">
                      {artist.node?.name}
                    </h2>
                    <p className="text-gray-700 mt-2">
                      {artist.node?.discogs?.profile?.substring(0, 80) + "..."}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      {/* <pre className="text-white">{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

export default withWunderGraph(Home);
