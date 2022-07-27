import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export const TransportComponent = ({ handleChange, transport }) => {
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
                    <ToggleButton value="1000">Bus 1k</ToggleButton>
                    <ToggleButton value="2000">Taxi 2k</ToggleButton>
                    <ToggleButton value="3000">Bus + Taxi 3k</ToggleButton>
                    <ToggleButton value="4000">Anytime 4k</ToggleButton>
                    <ToggleButton value="5000">Rent Car 5k</ToggleButton>
                </ToggleButtonGroup>
            </Box>
        </>
    );
};
