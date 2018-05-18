import * as express from "express";
import * as multer from "multer";
import * as path from "path";
import {PhotoController} from "./controllers/photo";
import * as morgan from "morgan";


const storage  = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "public/photos");
    },
    filename: (req, file, cb ) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
});

const app = express();

app.set("port", process.env.PORT || 3000 );

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.set("photos", path.join(__dirname, "../public", "photos"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 }));
const photoController = new PhotoController();
app.get("/", photoController.getList);
app.get("/upload", photoController.getUpload);
app.post("/upload", upload.single("file"), photoController.postUpload());
app.get("/photo/:id/view", photoController.getPhotoView(app.get("photos")));
app.get("/photo/:id/download", photoController.downloadPhoto(app.get("photos")));

app.listen(app.get("port"),()=>{
    console.log(`Server is running on port ${app.get("port")}`);
});

