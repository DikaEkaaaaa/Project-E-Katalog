import { Router } from "express";
import SiswaManager from "../Database/Models/Siswa.js";
import FotoSiswaModel from "../Database/Models/FotoSiswa.js";
const router = Router();

const ApiRouter = (csrfProtection, url) => {
  /**
   * @method GET
   * @route /api/siswa/foto
   * @description - Mengambil data foto siswa
   * @returns {object} - Foto siswa
   */
  router.get("/siswa/foto/:id", async (req, res) => {
    let data = await FotoSiswaModel.findOne({
      _id: req.params.id,
    }).catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ error: 500, message: "Terjadi kesalahan pada server" });
      return;
    });
    if (!data) return res.send({ error: 404, message: "Foto tidak ditemukan" });
    data.foto = data.foto.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
    let img = Buffer.from(data.foto, "base64");
    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": img.length,
    });

    res.end(img);
  });

  return router;
};

export default ApiRouter;
