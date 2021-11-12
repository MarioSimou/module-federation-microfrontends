const { withFederatedSidecar } = require("@module-federation/nextjs-mf");

module.exports = withFederatedSidecar({
  name: "product",
  filename: "static/chunks/remoteEntry.js",
  exposes: {
    "./components/ProductDetails": "./src/components/ProductDetails.tsx",
  },
  shared: {
    react: {
      // Notice shared are NOT eager here.
      requiredVersion: false,
      singleton: true,
    },
  },
})({
  webpack5: true,
  webpack(config, options) {
    const { webpack } = options;
    config.experiments = { topLevelAwait: true };

    config.module.rules.push({
      test: /_app.[jt]sx/,
      loader: "@module-federation/nextjs-mf/lib/federation-loader.js",
    });

    config.output.publicPath = "auto";
    config.plugins.push(
      new webpack.container.ModuleFederationPlugin({
        remoteType: "var",
        remotes: {
          footer: "footer@http://localhost:3000/footer.js",
          header: "header@http://localhost:3000/header.js",
        },
        shared: {
          "@module-federation/nextjs-mf/lib/noop": {
            eager: false,
          },
          react: {
            singleton: true,
            eager: true,
            requiredVersion: false,
          },
        },
      })
    );

    // if (isServer) {
    //   // ignore it on SSR, realistically you probably wont be SSRing Fmodules, without paid support from @ScriptedAlchemy
    //   Object.assign(config.resolve.alias, {
    //     product: false,
    //   });
    // } else {
    //   config.output.publicPath = "auto";
    //   config.plugins.push(
    //     new webpack.container.ModuleFederationPlugin({
    //       remoteType: "var",
    //       // remotes: {
    //       //   home: "home",
    //       //   shop: "shop",
    //       //   checkout: "checkout",
    //       // },
    //       shared: {
    //         "@module-federation/nextjs-mf/lib/noop": {
    //           eager: false,
    //         },
    //         react: {
    //           singleton: true,
    //           eager: true,
    //           requiredVersion: false,
    //         },
    //       },
    //     })
    //   );
    // }

    
    return config;
  },
});