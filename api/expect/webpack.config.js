import Dotenv from 'dotenv-webpack'
import crypto from 'crypto-browserify';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

export default {
    
    target : "node",
    resolve:{
        fallback:{
            crypto: false 
        }
    }
    
    

}