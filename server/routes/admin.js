import { Router } from "express";
import SiswaManager from "../Database/Models/Siswa.js";
import FotoSiswaModel from "../Database/Models/FotoSiswa.js";
const router = Router();

const AdminRouter = (csrfProtection, url) => {
  router.get("/", async (req, res) => {
    return res.send("ok");
  });

  router.get("/upload-data", csrfProtection, async (req, res) => {
    res.render("admin/upload", {
      csrfToken: req.csrfToken(),
    });
  });

  /**
   * @method GET
   * @route /admin/daftar-siswa
   * @description - Menampilkan daftar siswa
   */
  router.get("/daftar-siswa", csrfProtection, async (req, res) => {
    let data = await SiswaManager.find({});

    res.render("admin/daftar-siswa", {
      data,
      csrfToken: req.csrfToken(),
    });
  });

  /**
   * @method DELETE
   * @route /admin/daftar-siswa
   * @description - Menghapus data siswa dari database
   * @param {string} id - ID siswa
   */
  router.delete("/daftar-siswa", csrfProtection, url, async (req, res) => {
    const { id } = req.body;

    let data = await SiswaManager.findOne({ id });
    if (!data) {
      res.send({
        error: 404,
        message: "Siswa tidak ditemukan",
      });
      return;
    }

    await FotoSiswaModel.deleteOne({ _id: data.foto });

    await SiswaManager.deleteOne({ id })
    .then((doc) => {
      res.send({
        status: 200,
        message: "Data berhasil dihapus",
      });
      return;
    });
  });

  /**
   * @method POST
   * @route /admin/upload-data
   * @description - Menambahkan data siswa ke database
   * @param {string} nama - Nama siswa
   * @param {string} foto - Foto siswa
   * @param {string} quote - Quote siswa
   *
   */
  router.post("/upload-data", csrfProtection, url, async (req, res) => {
    const { nama, foto, quote } = req.body;

    let user = await SiswaManager.findOne({ nama: nama.toLowerCase() });
    if (user) {
      console.log("409");
      res.send({
        error: 409,
        message: "Siswa sudah terdaftar dalam database",
      });
      return;
    }

    let time = Date.now();
    let allData = await SiswaManager.find({});

    let dataFoto = new FotoSiswaModel({
      foto,
    });

    await dataFoto.save();

    await SiswaManager.create({
      nama: nama.toLowerCase(),
      quote,
      foto: dataFoto._id,
      id: allData.length + 1,
    }).then((doc) => {
      console.log(
        `Data ${doc.nama} berhasil ditambahkan dalam ${Date.now() - time}ms`
      );
      res.status(200).send({
        status: 200,
        message: "Data berhasil ditambahkan",
      });
      return;
    });
  });

  return router;
};

export default AdminRouter;
