import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import axios from "axios";
import React from "react";

const backEndURL_TAXI = "http://localhost:8080/transport";

export const TransportComponent = ({ handleChange, transport }) => {
    const [parsedTaxi, setParsedTaxi] = React.useState(0);
    axios.get(`${backEndURL_TAXI}`).then((response) => {
        console.log(response.data);
        setParsedTaxi(response.data);
        // return parsedTaxi + response.data;
        // return response.data;
    });
    return (
        <>
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
                    onChange={handleChange}
                >
                    <ToggleButton value="800">Автобус</ToggleButton>
                    <ToggleButton value={parsedTaxi}>Такси</ToggleButton>
                    <ToggleButton value="3000">Автобус + Такси</ToggleButton>
                    <ToggleButton value="4000">Anytime</ToggleButton>
                    <ToggleButton value="5000">Аренда машины</ToggleButton>
                </ToggleButtonGroup>
            </Box>
        </>
    );
};
