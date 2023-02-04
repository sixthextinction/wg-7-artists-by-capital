import { Loading } from "../components/Loading";
import { NextPage } from "next";
import React, { useState } from "react";
import ArtistCard from "../components/ArtistCard";
import CountryInputForm from "../components/CountryInputForm";
// import { useQuery, withWunderGraph } from "../components/generated/nextjs";
import { useQuery, withWunderGraph } from "../lib/wundergraph";

import { useSession, signIn } from "next-auth/react";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const [query, setQuery] = useState<string>("GB");
  const [searchInput, setSearchInput] = useState<string>("GB");
  const { data, isLoading } = useQuery({
    operationName: "artists/get",
    input: {
      country: query,
    },
    enabled: !!session, // only run the query once we are logged in
  });

  // event handlers
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // essentially "submit" a query
    setQuery(searchInput);
  };
  if (session) {
    return (
      <div>
        <Navbar />
        <div className="overflow-x-auto overflow-y-auto max-w-5xl mx-auto px-4 py-2">
          <div className="w-full h-full">
            <CountryInputForm
              handleSubmit={handleSubmit}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />

            {/* <Loading /> */}

            {isLoading ? (
              <Loading />
            ) : data?.success ? (
              <>
                <div className="flex items-center justify-center w-full">
                  {data?.capital ? (
                    <>
                      <p className="py-2 mb-2 text-xl text-white">
                        Showing artists from{" "}
                        <strong className="text-teal-500 tracking-tight">
                          {data.capital.replace(/\+/g, " ")}
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
                      name={artist.node?.name || ""}
                      imageUrl={artist.node?.discogs?.images[0]?.url || ""}
                      profile={artist.node?.discogs?.profile || ""}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-content items-center mt-[40%]">
                  <p className="mx-auto text-xl text-white">
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
  } else {
    return (
      <div className="overflow-x-auto overflow-y-auto max-w-5xl mx-auto px-4 py-2">
        <div className="flex flex-col items-center justify-center h-screen w-full ">
          <span className="text-4xl text-white">Hi. </span>
          <span className="text-lg text-white">
            You need to be signed in to see this.{" "}
          </span>

          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white my-4 py-1 px-2 rounded text-md "
            onClick={() => signIn()}
          >
            Sign in
          </button>
        </div>
      </div>
    );
  }
};

export default withWunderGraph(Home);
