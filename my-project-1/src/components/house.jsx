import Box from "@mui/material/Box";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

export const HouseComponent = ({ handleChange, house }) => {
    return (
        <>
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
                    onChange={handleChange}
                >
                    <ToggleButton value="0">Free</ToggleButton>
                    <ToggleButton value="5000">Hotel 5k</ToggleButton>
                    <ToggleButton value="20000">Rent House 20k</ToggleButton>
                </ToggleButtonGroup>
            </Box>
        </>
    );
};
