import mongoose from 'mongoose';
const {Schema,model} = mongoose;
const newsSchema = new Schema({
    img:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    paragraph:{
        type:String,
        required:true
    }
})
const News = new model('News',newsSchema);
export default News;
