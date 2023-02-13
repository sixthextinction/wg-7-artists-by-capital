import { createOperation, z } from "../../generated/wundergraph.factory";

// my types
import { Artist } from "../../../types/Artist";

export default createOperation.query({
  // Step 1 : Define input shape with zod
  input: z.object({
    country: z.string(),
  }),
  handler: async ({ input, operations }) => {
    // Step 2 : API call #1 to get capital by ISO-3166 code
    const capitalResult = await operations.query({
      operationName: "CapitalByCountry",
      input: {
        countryCode: input.country.toUpperCase(),
      },
    });

    let areaInput;

    if (
      capitalResult.data &&
      capitalResult.data.countries_country &&
      capitalResult.data.countries_country.capital
    ) {
      areaInput = capitalResult.data.countries_country.capital
        .normalize("NFD") // decompose the string into its individual Unicode code points
        .replace(/[\u0300-\u036f]/g, "") // Remove combining diacritical marks
        .replace(/[^\w\s]/gi, "") // Remove punctuation marks (e.g. "Washington, D.C.")
        .replace(/\s+/g, "+"); // Replace whitespaces for string encoding.
    }

    // Step 3 : API call #2 to get artists from that capital city
    const artistsResult = await operations.query({
      operationName: "ArtistsByArea",
      input: {
        query: `area:${areaInput}`,
      },
    });

    // Step 3B (Optional) : Filter out results which dont have the details we want.
    const filteredArtists =
      artistsResult.data?.graphbrainz_search?.artists?.edges?.filter(
        (object: Artist) => {
          if (object && object.node) {
            return (
              // object
              object.node.discogs && object.node.discogs.profile
              // && object.node.discogs.images
            );
          }
        }
      );

    // Step 4 : Return custom data!
    return capitalResult.data &&
      capitalResult.data.countries_country &&
      filteredArtists
      ? {
          success: true,
          country: capitalResult.data?.countries_country.name,
          capital: areaInput,
          artists: filteredArtists.slice(0, 6), // for our example, just get the first 6
        }
      : { success: false };
  },
});
