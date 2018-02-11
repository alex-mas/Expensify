const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = (env, argv)=>{
  const isProduction = env === 'production';
  const CSSExtract = new ExtractTextPlugin('styles.css');

  return {
    //entry point of application
    entry: './server/src/app.js',
    //settings of output file, that is, path where it will be located and filename
    output: {
      path: path.join(__dirname, '/server/public/dist'),
      filename: 'app.js'
    },
    //sort of modifications we can apply to files processed by webpack conditionally
    module: {
      //conditional rules
      rules: [{
        //apply babel loader on javascript files excluding those at node modules
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },{
        test: /\.s?css$/,
        //When we need to use multiple loaders we can specify use property inside the rule object of rules array
        use: CSSExtract.extract({
          use: [
           {
             loader: 'css-loader',
             options: {
               sourceMap: true
             }
           },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }],
      
      
    },
    plugins: [
      CSSExtract
    ],
    //source map options that traduce to diferent levels of hints on when exceptions occur and things like that
    devtool: isProduction ? 'source-map':'inline-source-map'
  };
  
};