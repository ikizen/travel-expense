import "./App.css";

import * as React from "react";

import { SliderComponent } from "./components/slider";
import { HouseComponent } from "./components/house";
import { TransportComponent } from "./components/transport";
import { PlacesComponent } from "./components/places";

import { placeList } from "./data/place-list.js";
import { dayList } from "./data/day-list.js";
import { houseList } from "./data/house-list";
import { transportList } from "./data/transport-list";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import backgroundVideo from "./video/videoplayback.mp4";

import axios from "axios";
import { ClassNames } from "@emotion/react";

const BACKEND_URL = "http://localhost:8080/hotel";

// FUNCTION STARTS
function App() {
    // let hotelsAveragePrice = 0;
    const [parsed, setParsed] = React.useState(0);

    axios.get(`${BACKEND_URL}`).then((response) => {
        // console.log(response.data);
        parsed(response.data);

        // return response.data;
    });
    console.log(parsed);
    // console.log(hotelsAveragePrice);

    const [house, setHouse] = React.useState(0);
    const [transport, setTransport] = React.useState(0);
    const [places, setPlaces] = React.useState(0);
    const [sum, setSum] = React.useState(0);
    const [sliderDay, setSliderDay] = React.useState(0);

    React.useEffect(() => {
        let sum = (parseInt(house) + parseInt(transport)) * sliderDay + places;
        setSum(sum);
        // console.log(sum);
    }, [house, sliderDay, transport, places]);

    const handleChangeHouse = (event, newHouse) => {
        setHouse(newHouse);
        const value = event.target.value;
        // console.log(value);
    };

    const handleChangeTransport = (event, newTransport) => {
        setTransport(newTransport);
        const value = event.target.value;
        // console.log(value);
    };

    const handleChangePlaces = (event, newPlace) => {
        setPlaces(newPlace);
    };

    const handleChangeDay = (event, day) => {
        const value = event.target.value;
        // console.log(value);
        setSliderDay(day);
    };

    const handleResult = () => {
        console.log(`${handleChangeHouse} + ${handleChangeTransport}`);
    };

    const pickPlaces = (event, value) => {
        const placeValue = value
            .map((price) => price.value)
            .reduce((partialSum, a) => partialSum + a, 0);

        // console.log(placeValue);
        setPlaces(placeValue);
    };

    //RETURN STARTS
    return (
        <div className="flex flex-col">
            <div>
                <video autoPlay loop muted id="video" className="video">
                    <source src={backgroundVideo} type="video/mp4" />
                </video>
            </div>
            <div className="body">
                <SliderComponent handleChange={handleChangeDay} />
                <HouseComponent
                    handleChange={handleChangeHouse}
                    house={house}
                />

                <TransportComponent
                    handleChange={handleChangeTransport}
                    transport={transport}
                />

                <PlacesComponent
                    placeList={placeList}
                    pickPlaces={pickPlaces}
                />

                <div className="text-center mt-12 mb-12 text-3xl">{sum}₸</div>
            </div>
            {/* <Card sx={{ maxWidth: 245 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="100"
                        image="./img/almaty"
                        alt="Almaty Photo"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles,
                            with over 6,000 species
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card> */}
        </div>
    );
}

export default App;
