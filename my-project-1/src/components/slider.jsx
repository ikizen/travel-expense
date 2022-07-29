import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";

export const SliderComponent = ({ handleChange }) => {
    function valuetext(value) {
        return `${value}`;
    }

    return (
        <>
            <h1 className="text-3xl font-bold text-center">City Travel</h1>
            <div className="flex flex-row justify-between mt-6">
                <h2>Выбери подходяшие варианты</h2>
                <h2>Choose your own options</h2>
            </div>
            <div className="flex flex-row justify-between mt-6">
                <h2>Количество дней ...</h2>
                <h2>Number of days ...</h2>
            </div>
            <div className="flex justify-center mt-6">
                <Box sx={{ width: 300 }}>
                    <Typography id="slider" gutterBottom>
                        Days/Дни
                    </Typography>
                    <Slider
                        color="secondary"
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
                    />
                </Box>
            </div>
        </>
    );
};
