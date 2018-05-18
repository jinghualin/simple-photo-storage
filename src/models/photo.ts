import * as mongoose from "mongoose";
import * as bluebird from "bluebird";

mongoose.connect("mongodb://localhost/photo").then(()=>{

}).catch((err)=>{
    console.log(err);
});
(<any>mongoose).Promise = bluebird;

export type PhotoModel = mongoose.Document & {
    name: string,
    path: string
}
const photoSchema = new mongoose.Schema({
    name: {type: String},
    path: {type: String}
}, { timestamps: true});

export const Photo = mongoose.model("Photo", photoSchema);
