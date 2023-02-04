import { createOperation, z } from "../../generated/wundergraph.factory";

export default createOperation.query({
  input: z.object({
    country: z.string(),
  }),
  handler: async (ctx) => {
    const capitalResult = await ctx.internalClient.queries.CapitalByCountry({
      input: {
        countryCode: ctx.input.country.toUpperCase(),
      },
    });

    let areaInput;

    if (
      capitalResult &&
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

    const artistsResult = await ctx.internalClient.queries.ArtistsByArea({
      input: {
        query: `area:${areaInput}`,
      },
    });

    // Optionally, reject results which dont have details we need
    const filteredArtists =
      artistsResult.data?.graphbrainz_search?.artists?.edges?.filter(
        (object) => {
          if (object && object.node) {
            return (
              // object
              object.node.discogs && object.node.discogs.profile
              // && object.node.discogs.images &&
            );
          }
        }
      );

    return capitalResult &&
      capitalResult.data &&
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
