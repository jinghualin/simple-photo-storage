import { Photo, PhotoModel } from "../models/photo";
import * as path from "path";
import { Request, Response, NextFunction} from "express";

export class PhotoController{

    // GET '/'
    public getList(req:Request, res:Response, next:NextFunction){
        Photo.find((err, photos) =>{
            if(err){
                return next(err);
            }
            res.render("index",{
                title: "Photo Storage",
                photos: photos
            });
        });
    }

    //GET '/upload'
    public getUpload(req:Request, res:Response){
        res.render("upload",{
            title: "Photo Upload"
        });
    }

    //POST '/upload'
    public postUpload(){
        return (req:Request, res:Response, next:NextFunction) => {
            let img = req.file;
            let name = req.body.name || img.originalname;

            const photo = new Photo({
                name: name,
                path: img.originalname
            });
            photo.save((err:any) => {
                if(err){
                    return next(err);
                }
                res.redirect("/");
            });
        }
    }

    //GET /photo/:id/view
    public getPhotoView(dir: string){
        return (req:Request, res:Response, next:NextFunction) => {
            let id = req.params.id;
            Photo.findById(id, (err, photo: PhotoModel) => {
                if(err){
                    return next(err);
                }
                let options = { root: dir };
                res.sendFile(photo.path, options);
            });
        }
    }


    //GET /photo/:id/download
    public downloadPhoto(dir:string){
        return (req:Request, res:Response, next:NextFunction) => {
            let id = req.params.id;
            Photo.findById(id, (err, photo: PhotoModel)=>{
                if(err){
                    return next(err);
                }
                let img = path.join(dir, photo.path);
                res.download(img);
            })
        }
    }
}