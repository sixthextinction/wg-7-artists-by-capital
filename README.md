# WunderGraph - TypeScript functions demo
- Uses WunderGraph's TypeScript Functions to show off a JOIN of 2 GraphQL queries that *can't* be done using just GraphQL.
- Search using ISO 3166 Alpha-2 Country codes. (e.g. England = "GB", Australia = "AU", Bulgaria = "BG")
- APIs JOINed :
  - **GraphQL Countries V2** to get capital by country code.
  - **GraphBrainz Musicbrainz wrapper** to search artists by capital (Lucene search syntax for `area`) 

# Getting Started

```shell
npm install && npm start
```
# Screenshot
![Screenshot](https://github.com/sixthextinction/wg-7-artists-by-capital/blob/main/wg-7-2.gif)

# Tech Stack
- NextJS 12
- WunderGraph
- TailwindCSS
