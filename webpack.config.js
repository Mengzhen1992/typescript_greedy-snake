// import a package
const path = require('path');
// import html plugin
const HTMLWebpackPlugin = require('html-webpack-plugin');
// import clean plugin
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

// all configuration information in webpack should be written in module.exports
module.exports = {
    // specify the entry file
    entry: "./src/index.ts",

    // specify the directory where the package file is located 
    output: {
        // specify the directory of the package file
        path: path.resolve(__dirname, "dist"),
        // files of packed files
        filename: "bundle.js",
        // tell webpack not to use arrow functions
        environment: {
            arrowFunction: false
        }
    },

    // specify the module to be used when webpack is packaged
    module: {
        // specifies the rules to load
        rules: [
            {
                // test specifies the file in which the rule takes effect
                test: /\.ts$/,
                // loader to use
                use: [
                    //configure babel
                    {
                      //specified loader
                      loader: "babel-loader",
                      //set up babel
                      options: {
                          // set up a predefined environment
                          presets:[
                              [
                                  // plugins for specific environments
                                  "@babel/preset-env",
                                  // configuration information
                                  {   
                                      // target browsers to be compatible
                                      targets: {
                                          "chrome": "88",
                                          "ie":"11"
                                      },
                                      // specify the version of corejs
                                      "corejs":"3",
                                      // "usage" using corejs means loading on demand
                                      "useBuiltIns":"usage"
                        
                                  }
                              ]
                          ]
                      }
                    },
                    "ts-loader"
                ],
                // files to exclude
                exclude: /node-modules/
            },

            // set the processing of less files, the ones written below in use are executed first
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    // import postcss
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions:{
                                plugins:[
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers:"last 2 versions"
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },

    // configure the Webpack plugin
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            // title: "custom title"
            template: "./src/index.html"
        }),
    ],

    // used to set the reference module
    resolve: {
        extensions: [".ts", ".js"]
    },

    mode: "production"
}