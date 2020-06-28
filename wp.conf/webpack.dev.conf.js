const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWabpackConfig = require("./webpack.base.conf");

const devWabpackConfig = merge(baseWabpackConfig, {
    mode: "development",
    devtool: "#cheap-module-eval-source-map",
    devServer: {
        port: 8081,
        contentBase: baseWabpackConfig.externals.paths.dist,
        overlay: {
            warnings: false,
            errors: true,
        },
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: "[file].map",
        }),
    ],
});

module.exports = new Promise((resolve, rejects) => {
    resolve(devWabpackConfig);
});
