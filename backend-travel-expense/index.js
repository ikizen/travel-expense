import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cheer from "cheerio";
import cors from "cors";
import cron from "node-cron";
//import { children } from "cheerio/lib/api/traversing.js";

const app = express();
const port = 8080;
const url = "https://www.tripadvisor.com/Hotels-g298251-Almaty-Hotels.html";

let smth;
cron.schedule("* */10 * * * *", function () {
    // Task to do
    console.log("111");
    const po = axios(url)
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
            smth = resultResult;
        })
        .catch((err) => console.log(`Error happened in PORT ${port}`));
});

// let smth = [{ name: "Aidyn", company: "Janat" }];

app.use(cors());

app.get("/hotel", (req, res) => {
    // res.send({ message: "We did it!" });
    res.status(200).json(smth);
});

app.listen(port, () => console.log(`Server is working on PORT ${port}`));
