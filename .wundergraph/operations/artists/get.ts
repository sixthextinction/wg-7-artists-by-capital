import { createOperation, z } from "../../generated/wundergraph.factory";

export default createOperation.query({
  input: z.object({
    country: z.string(),
  }),
  handler: async (ctx) => {
    const capitalResult = await ctx.internalClient.queries.CapitalByCountry({
      input: {
        countryCode: ctx.input.country,
      },
    });

    const areaInput = capitalResult.data?.countries_country.capital || "London";

    const artistsResult = await ctx.internalClient.queries.ArtistsByArea({
      input: {
        query: `area:${areaInput}`,
      },
    });

    // reject results which dont have at least a bio
    const filteredArtists =
      artistsResult.data?.graphbrainz_search?.artists?.edges?.filter(
        (object) =>
          object.node.discogs &&
        //   object.node.discogs.images &&
          object.node.discogs.profile
      );

    return {
      country: capitalResult.data?.countries_country.name,
      capital: areaInput,
      artists: filteredArtists.slice(0, 6), // for our example, just get the first 6
    };
  },
});
