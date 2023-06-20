import { model, Mongoose, Schema } from "mongoose";

const SiswaSchema = new Schema({
    nama: String,
    quote: String,
    foto: Schema.Types.ObjectId,
    id: Number
});

let SiswaModel = model('Siswa', SiswaSchema);

export default SiswaModel;