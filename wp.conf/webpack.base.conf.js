const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

const PATHS = {
    assetsDirName: "assets",
    distDirName: "dist",
    src: path.join(__dirname, "../src"),
    srcAssets: path.join(__dirname, "../src/assets"),
    dist: path.join(__dirname, "../dist"),
};

module.exports = {
    externals: {
        paths: PATHS,
    },
    entry: {
        app: PATHS.src,
        sudo: `${PATHS.src}/sudo.js`,
    },
    output: {
        filename: `${PATHS.assetsDirName}/js/[name].[hash].js`,
        path: PATHS.dist,
        publicPath: "/",
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    name: "vendor",
                    /* name(module, chunks, cacheGroupKey) {
                        const moduleFileName = module
                            .identifier()
                            .split("\\")
                            .reduceRight((item) => item);
                        const allChunksNames = chunks
                            .map((item) => item.name)
                            .join("~");
                        return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
                    }, */
                    chunks: "all",
                    enforce: true,
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: "/node_modules/",
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader", options: { sourceMap: true } },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader", options: { sourceMap: true } },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    { loader: "sass-loader", options: { sourceMap: true } },
                ],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: "file-loader",
                options: { name: "[name].[ext]" },
            },
            {
                test: /\.(woff(2)?\ttf|eot)$/,
                loader: "file-loader",
                options: { name: "[name].[ext]" },
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    loader: {
                        scss: "vue-style-loader!css-loader!sass-loader",
                    },
                },
            },
        ],
    },
    resolve: {
        alias: {
            "@assets": PATHS.srcAssets,
            "@": PATHS.src,
            vue$: "vue/dist/vue.js",
        },
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `${PATHS.assetsDirName}/css/[name].[hash].css`,
        }),
        new HtmlWebpackPlugin({
            hash: false,
            template: `${PATHS.srcAssets}/index.html`,
            filename: "./index.html",
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: `${PATHS.srcAssets}/img`,
                    to: `${PATHS.assetsDirName}/img`,
                },
                {
                    from: `${PATHS.srcAssets}/fonts`,
                    to: `${PATHS.assetsDirName}/fonts`,
                },
                { from: `${PATHS.srcAssets}/static`, to: "" },
            ],
        }),
    ],
};
