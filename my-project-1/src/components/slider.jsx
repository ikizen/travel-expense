import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";

export const SliderComponent = ({ handleChange }) => {
    function valuetext(value) {
        return `${value}`;
    }

    return (
        <>
            <h1 className="card-header text-3xl font-bold text-center">
                Tıisti nusqalardy tańdańyz
            </h1>
            <div className="flex flex-row justify-center mt-6"></div>
            <div className="flex flex-row justify-end mt-6">
                <h2>Almatyda qansha kún bolasyz?</h2>
            </div>
            <div className="flex justify-center mt-6">
                <Box sx={{ width: 300 }}>
                    <Typography id="slider" gutterBottom>
                        Kúnder
                    </Typography>
                    <Slider
                        // color="#b1ddc6 "
                        aria-label="Days"
                        defaultValue={1}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={0}
                        max={10}
                        //marks={sliderDay}
                        onChange={handleChange}
                        sx={{
                            color: "#494c57",
                            // height: 3,
                            // padding: "13px 0",
                        }}
                    />
                </Box>
            </div>
        </>
    );
};
