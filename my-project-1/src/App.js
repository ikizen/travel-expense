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

const days = [
    {
        value: 1,
        label: "1",
    },
    {
        value: 3,
        label: "3",
    },
    {
        value: 5,
        label: "5",
    },
    {
        value: 7,
        label: "7",
    },
    {
        value: 10,
        label: "10",
    },
];

function App() {
    const [house, setHouse] = React.useState("house");
    const [transport, setTransport] = React.useState("transport");
    const [places, setPlaces] = React.useState("places");
    // const [input, setInput] = React.useState("input");

    const handleChangeHouse = (event, newHouse) => {
        const value = event.target.value;
        console.log(value);
        setHouse(value);
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
                        defaultValue={3}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={1}
                        max={10}
                        marks={days}
                        onChange={(event) => console.log(event.target.value)}
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
                    <ToggleButton value="free">Free</ToggleButton>
                    <ToggleButton value="hotel">Hotel</ToggleButton>
                    <ToggleButton value="renthouse">Rent House</ToggleButton>
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
                    <ToggleButton value="bus">Bus</ToggleButton>
                    <ToggleButton value="taxi">Taxi</ToggleButton>
                    <ToggleButton value="bustaxi">Bus + Taxi</ToggleButton>
                    <ToggleButton value="anytime">Anytime</ToggleButton>
                    <ToggleButton value="car">Rent Car</ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <div className="flex flex-row justify-between mt-6">
                <h2>Планирую поситить..</h2>
                <h2>Planning to visit..</h2>
            </div>
        </>
    );
}

export default App;
