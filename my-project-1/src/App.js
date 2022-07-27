import "./App.css";

import * as React from "react";

import { SliderComponent } from "./components/slider";
import { HouseComponent } from "./components/house";
import { TransportComponent } from "./components/transport";
import { PlacesComponent } from "./components/places";

import { placeList } from "./data/place-list.js";
import { dayList } from "./data/day-list.js";
import { houseList } from "./data/house-list";
import { transportList } from "./data/transport-list";

import backgroundVideo from "./video/videoplayback.mp4";

import axios from "axios";

const BACKEND_URL = "http://localhost:8080/hotel";

// FUNCTION STARTS
function App() {
    // let hotelsAveragePrice = 0;
    const [parsed, setParsed] = React.useState(0);

    axios.get(`${BACKEND_URL}`).then((response) => {
        // console.log(response.data);
        parsed(response.data);

        // return response.data;
    });
    console.log(parsed);
    // console.log(hotelsAveragePrice);

    const [house, setHouse] = React.useState(0);
    const [transport, setTransport] = React.useState(0);
    const [places, setPlaces] = React.useState(0);
    const [sum, setSum] = React.useState(0);
    const [sliderDay, setSliderDay] = React.useState(0);

    React.useEffect(() => {
        let sum = (parseInt(house) + parseInt(transport)) * sliderDay + places;
        setSum(sum);
        // console.log(sum);
    }, [house, sliderDay, transport, places]);

    const handleChangeHouse = (event, newHouse) => {
        setHouse(newHouse);
        const value = event.target.value;
        // console.log(value);
    };

    const handleChangeTransport = (event, newTransport) => {
        setTransport(newTransport);
        const value = event.target.value;
        // console.log(value);
    };

    const handleChangePlaces = (event, newPlace) => {
        setPlaces(newPlace);
    };

    const handleChangeDay = (event, day) => {
        const value = event.target.value;
        // console.log(value);
        setSliderDay(day);
    };

    const handleResult = () => {
        console.log(`${handleChangeHouse} + ${handleChangeTransport}`);
    };

    const pickPlaces = (event, value) => {
        const placeValue = value
            .map((price) => price.value)
            .reduce((partialSum, a) => partialSum + a, 0);

        // console.log(placeValue);
        setPlaces(placeValue);
    };

    //RETURN STARTS
    return (
        <>
            <video autoPlay loop muted id="video" className="video">
                <source src={backgroundVideo} type="video/mp4" />
            </video>
            <div className="body">
                <SliderComponent handleChange={handleChangeDay} />

                <HouseComponent
                    handleChange={handleChangeHouse}
                    house={house}
                />

                <TransportComponent
                    handleChange={handleChangeTransport}
                    transport={transport}
                />

                <PlacesComponent
                    placeList={placeList}
                    pickPlaces={pickPlaces}
                />

                <div className="text-center mt-12 mb-12 text-3xl">{sum}₸</div>
            </div>
        </>
    );
}

export default App;
