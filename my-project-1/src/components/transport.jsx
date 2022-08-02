import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import axios from "axios";
import React from "react";

const backEndURL_TAXI = "http://localhost:8080/transport";
const backEndURL_ANYTIME = "http://localhost:8080/anytime";

export const TransportComponent = ({ handleChange, transport }) => {
    const [parsedTaxi, setParsedTaxi] = React.useState(0);
    axios.get(`${backEndURL_TAXI}`).then((response) => {
        console.log(response.data);
        setParsedTaxi(response.data);
        // return parsedTaxi + response.data;
        // return response.data;
    });

    // export const AnytimeComponent = ({ handleChange, anytime }) => {
    //     const [parsedAnytime, setParsedAnytime] = React.useState(0);
    //     axios.get(`${backEndURL_ANYTIME}`).then((response) => {
    //         console.log(response.data);
    //         setParsedAnytime(response.data);
    //         // return parsedTaxi + response.data;
    //         // return response.data;
    //     });

    return (
        <>
            <div className="flex flex-row justify-between mt-6">
                <h2>Tasmaldaýym</h2>
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
                    onChange={handleChange}
                >
                    <ToggleButton value="800">Avtobýs</ToggleButton>
                    <ToggleButton value={parsedTaxi}>Taksı</ToggleButton>
                    <ToggleButton value="3000">Avtobýs + Taksı</ToggleButton>
                    <ToggleButton value="10500">Anytime</ToggleButton>
                    {/* 10.500 тенге в день  */}
                    {/* <ToggleButton value="5000">Аренда машины</ToggleButton> */}
                </ToggleButtonGroup>
            </Box>
        </>
    );
};
