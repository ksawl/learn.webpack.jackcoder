const merge = require("webpack-merge");
const baseWabpackConfig = require("./webpack.base.conf");

const buildWabpackConfig = merge(baseWabpackConfig, {
    mode: "production",
});

module.exports = new Promise((resolve, rejects) => {
    resolve(buildWabpackConfig);
});
