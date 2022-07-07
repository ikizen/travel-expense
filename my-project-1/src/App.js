import "./App.css";

import * as React from "react";

import Button from "@mui/material/Button";
// import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.get();

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

function valuetext(value) {
    return `${value}`;
}

function App() {
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
                <ButtonGroup
                    variant="outlined"
                    aria-label="outlined button group"
                    color="secondary"
                >
                    <Button>Free</Button>
                    <Button>Hotel</Button>
                    <Button>Rent house</Button>
                </ButtonGroup>
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
                <ButtonGroup
                    variant="outlined"
                    aria-label="outlined button group"
                    color="secondary"
                >
                    <Button>bus</Button>
                    <Button>taxi</Button>
                    <Button>bus + taxi</Button>
                    <Button>anytime</Button>
                    <Button>own car</Button>
                </ButtonGroup>
            </Box>
            <div className="flex flex-row justify-between mt-6">
                <h2>Планирую поситить..</h2>
                <h2>Planning to visit..</h2>
            </div>
            <div className="flex justify-center mt-6 mb-6">
                <TextField
                    id="filled-search"
                    label="Places, restaurants etc.."
                    type="search"
                    variant="filled"
                    color="secondary"
                />
            </div>
        </>
    );
}

export default App;
