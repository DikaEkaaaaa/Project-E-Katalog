import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import SiswaManager from './Database/Models/Siswa.js';
// set up csurf
// cookie
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
const csrfProtection = csurf({ cookie: true });

// mongoose.connect('mongodb+srv://root:katalog123@cluster0.x4cq9fu.mongodb.net/?retryWrites=true&w=majority');
let url = bodyParser.urlencoded({
    extended: false,
    limit: '50mb'
});

app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());

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
    res.render('index');
})

app.get('/upload-data', csrfProtection, async (req, res) => {
    res.render('upload', {
        csrfToken: req.csrfToken()
    });
});

// post method
app.post('/upload-data', csrfProtection, url, async (req, res) => {
    console.log(req);
    // const {
    //     nama,
    //     foto,
    //     quote
    // } = req.body;

    // let user = await SiswaManager.findOne({ nama });
    // if (user) {
    //     console.log('409')
    //     res.send({
    //         error: 409,
    //         message: 'Siswa sudah terdaftar dalam database'
    //     });
    //     return;
    // }

    // let allData = await SiswaManager.find({});

    // let data = new SiswaManager({
    //     nama,
    //     foto,
    //     quote,
    //     id: allData.length+1
    // });

    // data.save(function (err, doc) {
    //     if (err) return console.error(err);
    //     console.log('Document saved');
    // })
})

app.listen(3000, function () {
    console.log('Server Active');
})