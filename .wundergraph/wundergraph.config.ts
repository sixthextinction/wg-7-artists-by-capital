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
  apis: [countries, graphbrainz],
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
    allowedOrigins: ["http://localhost:3000"],
  },
  authentication: {
    tokenBased: {
      providers: [
        {
          userInfoEndpoint: `https://wg-7-artists-by-capital-v2.vercel.app/api/auth/session`,
        },
      ],
    },
  },
  security: {
    enableGraphQLEndpoint: process.env.NODE_ENV !== "production",
  },
});
