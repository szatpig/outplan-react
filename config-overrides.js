// Created by szatpig at 2019/8/21.
const path = require('path')
const { override, fixBabelImports, addLessLoader,addWebpackAlias } = require('customize-cra');

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
    })
);