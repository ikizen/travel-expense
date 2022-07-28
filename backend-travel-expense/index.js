import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cheer from "cheerio";
import cors from "cors";
import cron from "node-cron";
// import { find } from "cheerio/lib/api/traversing";
//import { children } from "cheerio/lib/api/traversing.js";

const app = express();
const port = 8080;
const urlHotel =
    "https://www.tripadvisor.com/Hotels-g298251-Almaty-Hotels.html";

const urlTaxi = "https://www.numbeo.com/taxi-fare/in/Almaty";

let hotelResult;
let transportTaxiResult;
cron.schedule("* * * * * *", function () {
    // "* */10 * * * *"
    // Task to do
    console.log("Cron schedule is working)))");
    const hotel = axios(urlHotel)
        .then((response) => {
            const html = response.data;
            const $ = cheer.load(html);
            const array = [];
            const sepNov = $(".page")
                .children(".delineation")
                .children("#MAINWRAP")
                .children("#MAIN")
                .children("#BODYCON")
                .children(".bodycon_main")
                .children(".relWrap")
                .children("#taplc_cupid_pricing_trends_0")
                .children("#component_5")
                .find("div")
                .first()
                .children(".ui_section")
                .children("div:nth-child(7)")
                .children(".OPtaC")
                .children(".cmvHE")
                .children(".orWuf")
                .children(".HxUSW")
                .children("div:nth-child(2)")
                .html();

            const marMay = $(".page")
                .children(".delineation")
                .children("#MAINWRAP")
                .children("#MAIN")
                .children("#BODYCON")
                .children(".bodycon_main")
                .children(".relWrap")
                .children("#taplc_cupid_pricing_trends_0")
                .children("#component_5")
                .find("div")
                .first()
                .children(".ui_section")
                .children(".MqYSb")
                .children(".OPtaC")
                .children(".cmvHE")
                .children(".orWuf")
                .children(".HxUSW")
                .children("div:nth-child(2)")
                .html();

            const reg = /\d+/g;
            let result1 = sepNov.match(reg);
            let result2 = marMay.match(reg);
            const resultSepNov = result1[0] + result1[1];
            const resultMarMay = result2[0] + result2[1];
            array.push(resultSepNov, resultMarMay);

            const resultResult =
                (parseInt(resultMarMay) + parseInt(resultSepNov)) / 2;
            console.log(resultResult);
            hotelResult = resultResult;
        })
        .catch((err) => console.log(`Error happened in PORT ${port}`));
    // const taxi = axios(urlTaxi).then((response) => {
    //     const html = response.data;
    //     const $ = cheer.load(html);
    //     const arrayTaxi = [];
    //     const taxi = $(".innerWidth")
    //         .children(".standard_margin")
    //         .first()
    //         .find("tbody")
    //         .children(".tr_standard")
    //         .children("td:nth-child(2)")
    //         .html();
    //     console.log(taxi);
    //     transportTaxiResult = taxi;
    //     arrayTaxi.push(taxi);
});

app.use(cors());

app.get("/hotel", (req, res) => {
    // res.send({ message: "We did it!" });
    res.status(200).json(hotelResult);
});

// app.get("/transport", (req, res) => {
//     res.status(200).json(transportTaxiResult);
// });

app.listen(port, () => console.log(`Server is working on PORT ${port}`));
