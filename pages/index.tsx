import { Loading } from '../components/Loading';
import { NextPage } from "next";
import React, { useState } from "react";
import ArtistCard from "../components/ArtistCard";
import CountryInputForm from "../components/CountryInputForm";
import { useQuery, withWunderGraph } from "../components/generated/nextjs";

const Home: NextPage = () => {
  const [query, setQuery] = useState<string>("GB");
  const [searchInput, setSearchInput] = useState<string>("GB");
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
          <CountryInputForm
            handleSubmit={handleSubmit}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />

          {isLoading ? (
            <Loading     />
          ) : data?.success ? (
            <>
              <div className="flex items-center justify-center w-full">
                {data?.capital ? (
                  <>
                    <p className="py-2 text-xl text-white">
                      Showing artists from{" "}
                      <strong className="text-teal-500 tracking-tight">
                        {data.capital}
                      </strong>
                      , {data.country}
                    </p>
                  </>
                ) : (
                  <></>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data?.artists?.map((artist) => (
                  <ArtistCard
                    name={artist.node?.name}
                    imageUrl={artist.node?.discogs?.images[0]?.url}
                    profile={artist.node?.discogs?.profile}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-content items-center">
                <p className="text-xl text-white">
                  {`No results found for input`}{" "}
                  <strong className="text-teal-500 tracking-tight">{`${query}`}</strong>
                </p>
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
