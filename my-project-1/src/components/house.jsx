import Box from "@mui/material/Box";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import axios from "axios";
import React from "react";

const BACKEND_URL = "http://localhost:8080/hotel";
export const HouseComponent = ({ handleChange, house }) => {
    // const parsedHotel = 0;
    const [parsedHotel, setParsedHotel] = React.useState(0);
    axios.get(`${BACKEND_URL}`).then((response) => {
        console.log(response.data);
        setParsedHotel(response.data);
        // return parsedHotel + response.data;
        // return response.data;
    });
    // console.log(parsed);
    return (
        <>
            <div className="flex flex-row justify-between mt-6">
                <h2>Turatyn jerim</h2>
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
                    onChange={handleChange}
                >
                    <ToggleButton value="0">Dostarymda</ToggleButton>
                    <ToggleButton value={parsedHotel}>Qonaq úıde</ToggleButton>
                </ToggleButtonGroup>
            </Box>
        </>
    );
};
