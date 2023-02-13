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
    allowedOrigins: [process.env.NEXT_URL as string],
  },
  authentication: {
    tokenBased: {
      providers: [
        {
          userInfoEndpoint: `${process.env.NEXT_URL}/api/auth/sesssion`,
        },
      ],
    },
  },
  security: {
    enableGraphQLEndpoint: process.env.NODE_ENV !== "production",
  },
});
