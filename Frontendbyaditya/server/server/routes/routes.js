const express = require("express");
const app = express();
const db = require("../db/db");
const router = express.Router();
const bodyparser= require('body-parser');
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());

router.get("/", async (req, res, next) => {
    //res.json({test:'test'});
    try {
        let results = await db.all();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get("/:identifier", async (req, res, next) => {
    //res.json({test:'test'});
    try {
        let results = await db.all();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post("/", async (req, res, next) => {
    //res.json({test:'test'});
    //console.log(req)
    var ti =req.body.totalItems;
    var k =req.body.kind;
        var i =req.body.items[0].id;
        var pc =req.body.items[0].volumeInfo.pageCount;
        var d =req.body.items[0].volumeInfo.description;
        var tt =req.body.items[0].volumeInfo.title;
        var a =req.body.items[0].volumeInfo.authors[0];
        var il =req.body.items[0].volumeInfo.infoLink;
        var identi =req.body.items[0].volumeInfo.industryIdentifiers[0].identifier;
        console.log(ti,k,i,pc,d,tt,a,il,identi);
        
    try {
        let results = await db.add(ti,k,i,pc,d,tt,a,il,identi);
        res.json(results);
        //console.log(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;
