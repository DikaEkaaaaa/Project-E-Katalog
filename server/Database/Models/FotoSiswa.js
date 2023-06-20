import { model, Mongoose, Schema } from "mongoose";

const FotoSiswaSchema = new Schema({
  foto: String
});

let FotoSiswaModel = model("FotoSiswa", FotoSiswaSchema);

export default FotoSiswaModel;