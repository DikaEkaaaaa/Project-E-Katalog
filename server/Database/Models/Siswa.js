import { model, Schema } from "mongoose";

const SiswaSchema = new Schema({
    nama: String,
    foto: String,
    quote: String,
    id: Number
});

let SiswaModel = model('Siswa', SiswaSchema);

export default SiswaModel;