import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";

export const SliderComponent = ({ handleChange }) => {
    function valuetext(value) {
        return `${value}`;
    }

    return (
        <>
            <h1 className="text-3xl font-bold text-center">Almaty Travel</h1>
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
