import {
  authProviders,
  configureWunderGraphApplication,
  cors,
  EnvironmentVariable,
  introspect,
  templates,
} from "@wundergraph/sdk";
import { NextJsTemplate } from "@wundergraph/nextjs/dist/template";
import server from "./wundergraph.server";
import operations from "./wundergraph.operations";

const spaceX = introspect.graphql({
  apiNamespace: "spacex",
  url: "https://spacex-api.fly.dev/graphql/",
});
const countries = introspect.graphql({
  apiNamespace: "countries",
  url: "https://countries.trevorblades.com/",
});

const graphbrainz = introspect.graphql({
  apiNamespace: "graphbrainz",
  url: "https://graphbrainz.fly.dev/",
});

// configureWunderGraph emits the configuration
configureWunderGraphApplication({
  apis: [spaceX, countries, graphbrainz],
  server,
  operations,
  codeGenerators: [
    {
      templates: [...templates.typescript.all],
    },
    {
      templates: [new NextJsTemplate()],
      path: "../components/generated",
    },
  ],
  cors: {
    ...cors.allowAll,
    allowedOrigins: [
      "http://localhost:3000",                                                            // dev
      "https://wg-7-artists-by-capital-frontend.vercel.app",                              // production
      "https://wg-7-artists-by-capital-frontend-git-nextauth-sixthextinction.vercel.app/" // preview
    ],
  },
  authentication: {
    tokenBased: {
      providers: [
        {
          userInfoEndpoint: "http://localhost:3000/api/auth/session",
        },
      ],
    },
  },
  security: {
    enableGraphQLEndpoint: process.env.NODE_ENV !== "production",
  },
});
