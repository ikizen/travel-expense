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

import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import backgroundVideo from "./video/videoplayback.mp4";
import photoAlmaty from "./img/almaty2.jpg";

import axios from "axios";
import { ClassNames } from "@emotion/react";

const BACKEND_URL = "http://localhost:8080/hotel";

// FUNCTION STARTS
function App() {
    const [parsed, setParsed] = React.useState(0);

    axios.get(`${BACKEND_URL}`).then((response) => {
        parsed(response.data);
    });
    console.log(parsed);

    const [house, setHouse] = React.useState(0);
    const [transport, setTransport] = React.useState(0);
    const [places, setPlaces] = React.useState(0);
    const [sum, setSum] = React.useState(0);
    const [sliderDay, setSliderDay] = React.useState(0);

    React.useEffect(() => {
        let sum = (parseInt(house) + parseInt(transport)) * sliderDay + places;
        setSum(sum);
    }, [house, sliderDay, transport, places]);

    const handleChangeHouse = (event, newHouse) => {
        setHouse(newHouse);
        const value = event.target.value;
    };

    const handleChangeTransport = (event, newTransport) => {
        setTransport(newTransport);
        const value = event.target.value;
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

    const [open, setOpen] = React.useState(false);
    const openCard = () => {
        // console.log("Opening card");
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    const styles = {
        position: "absolute",
        top: 28,
        right: 0,
        left: 0,
        zIndex: 1,
        border: "1px solid",
        p: 1,
        bgcolor: "background.paper",
    };

    //RETURN STARTS
    return (
        <>
            {/* <div>
                <video autoPlay loop muted id="video" className="video">
                    <source src={backgroundVideo} type="video/mp4" />
                </video>
            </div> */}
            {/* <div className="body">
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

                <div className="text-center mt-12 text-3xl">{sum}₸</div>
            </div> */}

            <Card
                sx={{ maxWidth: 200 }}
                onClick={openCard}
                className="card"
                elevation={4}
                onClickAway={handleClickAway}
            >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="60"
                        image={photoAlmaty}
                        alt="Almaty Photo"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Almaty
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            One of the most beautiful cities in Kazakhstan
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            {/* <ClickAwayListener onClickAway={handleClickAway}> */}
            <Box sx={{ position: "relative" }}>
                <button type="button" onClick={openCard}>
                    Open menu dropdown
                </button>
                {open ? (
                    <Box sx={styles}>
                        Click me, I will stay visible until you click outside.
                    </Box>
                ) : null}
            </Box>
            {/* </ClickAwayListener> */}
        </>
    );
}

export default App;
