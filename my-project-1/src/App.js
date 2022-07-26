import "./App.css";

import * as React from "react";
// import useState from "react";

// import Button from "@mui/material/Button";
// import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
// import ButtonGroup from "@mui/material/ButtonGroup";
// import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { placeList } from "./data/place-list.js";
import { dayList } from "./data/day-list.js";
import { houseList } from "./data/house-list";
import { transportList } from "./data/transport-list";

import axios from "axios";

const BACKEND_URL = "http://localhost:8080/hotel";

function App() {
    axios.get(`${BACKEND_URL}`).then((response) => {
        console.log(response);
    });

    const [sliderDay, setSliderDay] = React.useState(0);
    const [house, setHouse] = React.useState(0);
    const [transport, setTransport] = React.useState(0);
    const [places, setPlaces] = React.useState(0);
    const [sum, setSum] = React.useState(0);
    // const [input, setInput] = React.useState("input");

    React.useEffect(() => {
        let sum = (parseInt(house) + parseInt(transport)) * sliderDay + places;
        setSum(sum);
        console.log(sum);
    }, [house, sliderDay, transport, places]);

    const handleChangeDay = (event, day) => {
        const value = event.target.value;
        console.log(value);
        setSliderDay(day);
    };

    const handleChangeHouse = (event, newHouse) => {
        setHouse(newHouse);
        const value = event.target.value;
        console.log(value);
    };

    const handleChangeTransport = (event, newTransport) => {
        setTransport(newTransport);
        const value = event.target.value;
        console.log(value);
    };

    const handleChangePlaces = (event, newPlace) => {
        setPlaces(newPlace);
    };

    function valuetext(value) {
        return `${value}`;
    }

    const handleResult = () => {
        console.log(`${handleChangeHouse} + ${handleChangeTransport}`);
    };

    const pickPlaces = (event, value) => {
        const placeValue = value
            .map((price) => price.value)
            .reduce((partialSum, a) => partialSum + a, 0);

        console.log(placeValue);
        setPlaces(placeValue);
    };

    //ToDo:
    return (
        <>
            <h1 className="text-3xl font-bold text-center mt-16">
                Almaty Travel
            </h1>
            <div className="flex flex-row justify-between mt-6">
                <h2>Выберай подходяший варианты</h2>
                <h2>Choose the appropriate options</h2>
            </div>
            <div className="flex flex-row justify-between mt-6">
                <h2>..дней в Алмате</h2>
                <h2>..days in Almaty</h2>
            </div>
            <div className="flex justify-center mt-6">
                <Box sx={{ width: 300 }}>
                    <Typography id="slider" gutterBottom>
                        Days/Дни
                    </Typography>
                    <Slider
                        color="secondary"
                        aria-label="Days"
                        defaultValue={0}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={0}
                        max={10}
                        //marks={sliderDay}
                        onChange={handleChangeDay}
                    />
                </Box>
            </div>
            <div className="flex flex-row justify-between mt-6">
                <h2>Буду жить в..</h2>
                <h2>Will live in..</h2>
            </div>
            <Box
                className="mt-6"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    "& > *": {
                        m: 1,
                    },
                }}
            >
                <ToggleButtonGroup
                    color="secondary"
                    value={house}
                    exclusive
                    onChange={handleChangeHouse}
                >
                    <ToggleButton value="0">Free</ToggleButton>
                    <ToggleButton value="5000">Hotel 5k</ToggleButton>
                    <ToggleButton value="20000">Rent House 20k</ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <div className="flex flex-row justify-between mt-6">
                <h2>Передвижение..</h2>
                <h2>Transport..</h2>
            </div>
            <Box
                className="mt-6"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    "& > *": {
                        m: 1,
                    },
                }}
            >
                <ToggleButtonGroup
                    color="secondary"
                    value={transport}
                    exclusive
                    onChange={handleChangeTransport}
                >
                    <ToggleButton value="1000">Bus 1k</ToggleButton>
                    <ToggleButton value="2000">Taxi 2k</ToggleButton>
                    <ToggleButton value="3000">Bus + Taxi 3k</ToggleButton>
                    <ToggleButton value="4000">Anytime 4k</ToggleButton>
                    <ToggleButton value="5000">Rent Car 5k</ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <div className="flex flex-row justify-between mt-6">
                <h2>Планирую поситить..</h2>
                <h2>Planning to visit..</h2>
            </div>
            <div className="mt-12 flex justify-center">
                <Autocomplete
                    //className="mt-10 flex place-content-center	"
                    multiple
                    limitTags={2}
                    id="multiple-limit-tags"
                    options={placeList}
                    onChange={pickPlaces}
                    getOptionLabel={(option) => option.name}
                    // defaultValue={[placeList[0]]}
                    renderInput={(params) => {
                        return (
                            <TextField
                                {...params}
                                color="secondary"
                                label="limitTags"
                                placeholder="Favorites"
                            />
                        );
                    }}
                    sx={{ width: "250px" }}
                />
            </div>
            <div className="text-center mt-12 mb-12 text-3xl">{sum}₸</div>
        </>
    );
}

export default App;
