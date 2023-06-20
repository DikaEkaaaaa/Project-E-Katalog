import { model, Mongoose, Schema } from "mongoose";

const SiswaSchema = new Schema({
    nama: String,
    quote: String,
    foto: {
        type: Schema.Types.ObjectId,
        ref: 'FotoSiswa'
    },
    id: Number
});

let SiswaModel = model('Siswa', SiswaSchema);

export default SiswaModel;