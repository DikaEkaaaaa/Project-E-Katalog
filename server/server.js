import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import SiswaManager from './Database/Models/Siswa.js';

mongoose.connect('mongodb+srv://root:katalog123@cluster0.x4cq9fu.mongodb.net/?retryWrites=true&w=majority');
let url = bodyParser.urlencoded({
    extended: false,
    limit: '50mb'
});

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({
    limit: '50mb',
    extended: false
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));
app.use(express.json({ limit: '50mb' }));

app.get('/', async (req, res) => {
    let allData = await SiswaManager.find({});
    res.send(allData);
})

app.get('/upload-data', async (req, res) => {
    res.render('upload');
});

// post method
app.post('/upload-data', url, async (req, res) => {
    const {
        nama,
        foto,
        quote
    } = req.body;

    let user = await SiswaManager.findOne({ nama });
    if (user) {
        console.log('409')
        res.send({
            error: 409,
            message: 'Siswa sudah terdaftar dalam database'
        });
        return;
    }

    let allData = await SiswaManager.find({});

    let data = new SiswaManager({
        nama,
        foto,
        quote,
        id: allData.length+1
    });

    data.save(function (err, doc) {
        if (err) return console.error(err);
        console.log('Document saved');
    })
})

app.listen(3000, function () {
    console.log('Server Active');
})