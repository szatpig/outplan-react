// Created by szatpig at 2019/8/21.
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { override, fixBabelImports, addLessLoader,addWebpackAlias } = require('customize-cra');


const addCustomize = () => config =>{
    if (process.env.NODE_ENV === 'production'){
        config.devtool = false; //去掉map文件
        if (config.plugins) {
            config.plugins.push(new BundleAnalyzerPlugin());
        }
    }
    return config
}

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#4a8df1' }
    }),
    addWebpackAlias({
        '@': path.resolve(__dirname, 'src')
    }),
    addCustomize()
);