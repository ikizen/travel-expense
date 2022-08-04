import "./App.css";

import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";

import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { SliderComponent } from "./components/slider";
import { HouseComponent } from "./components/house";
import { TransportComponent } from "./components/transport";
import { PlacesComponent } from "./components/places";

import { placeList } from "./data/place-list.js";
import { dayList } from "./data/day-list.js";
import { houseList } from "./data/house-list";
import { transportList } from "./data/transport-list";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import photoAlmaty from "./img/almaty2.jpg";
import photoAstana from "./img/astana.jpg";
import photoQaragandy from "./img/karaganda1.jpg";
import photoShymkent from "./img/shym.jpg";
import photoAqtau from "./img/aqtau.jpg";

import axios from "axios";
import { ClassNames } from "@emotion/react";

const BACKEND_URL = "http://localhost:8080/hotel";

// dialog card Material UI STARTS HERE
// это
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));
// и это - компоненты

// их нужно выносить за компонент, они у тебя были внутри компонента Apps
// так делать нельзя, потому что когда происходит ре-рендер эти компоненты рендерятся заново и таким образом у тебя "вспышки" в диалоге происходили
// реакт ререндерит когда меняется состояние - state. то есть каждый раз когда ты что то кликал и менял состояние эти два компонент Bootstrap Dialog & BootstrapDialogTitle рендерились заново
// понял о чем я? да
// вот return он только один может быть правильно? именно главный
// можно хоть сто ретёрнов сделать, но смотри - сработает только самый первый
const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    // вот так делать можно, делаешь conditional и если он исполняется - срабатывает этот return. если 5 > 6 === false - сработает следующий ретёрн
    if (5 > 6) {
        return <p>Жума лохстер</p>;
    }

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

// FUNCTION STARTS
function App() {
    //RETURN STARTS
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="cards" element={<Cards />} />
            </Routes>
        </>
    );
}
function Home() {
    return (
        <>
            <div className="homePage flex flex-col items-center	justify-center">
                <h1 className=" ">Saparǵa</h1>
                <Link to="/cards" className="go-to-cards flex flex-row">
                    <div className="pr-1">bagyt</div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <div className="pl-1">tańdańyz</div>
                </Link>
            </div>
        </>
    );
}

function Cards() {
    const [parsed, setParsed] = React.useState(0);
    const [house, setHouse] = React.useState(0);
    const [transport, setTransport] = React.useState(0);
    const [places, setPlaces] = React.useState(0);
    const [sum, setSum] = React.useState(0);
    const [sliderDay, setSliderDay] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        let sum =
            parseInt(house) * sliderDay +
            parseInt(transport) * sliderDay +
            places;
        setSum(sum);
    }, [house, sliderDay, transport, places]);

    React.useEffect(() => {
        axios.get(`${BACKEND_URL}`).then((response) => {
            parsed(response.data);
        });
        console.log(parsed);
    }, []);

    const handleChangeHouse = (event, newHouse) => {
        setHouse(newHouse);
        const value = event.target.value;
    };
    const handleChangeTransport = (event, newTransport) => {
        setTransport(newTransport);
        const value = event.target.value;
    };
    const handleChangeDay = (event, day) => {
        const value = event.target.value;
        setSliderDay(day);
    };
    const pickPlaces = (event, value) => {
        const placeValue = value
            .map((price) => price.value)
            .reduce((partialSum, a) => partialSum + a, 0);

        setPlaces(placeValue);
    };
    const openCard = () => {
        setOpen((prev) => !prev);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className="cardPage">
                <nav className="card-page-nav flex-1 flex justify-center pt-2 pb-2">
                    <Link className="flex flex-row" to="/">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        <div className="pl-2">Artqa</div>
                    </Link>
                </nav>
                <div className="flex flex-row justify-center flex-wrap">
                    <div className="qaragandy-card">
                        <Card
                            sx={{ maxWidth: 200 }}
                            onClick={handleClickOpen}
                            className="card"
                            elevation={6}
                            // onClickAway={handleClickAway}
                        >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="60"
                                    image={photoQaragandy}
                                    alt="Qaragandy Photo"
                                />
                                <CardContent
                                    className="card-content"
                                    sx={{
                                        backgroundColor: "#faf0d0",
                                        color: "#494c57",
                                        fontFamily: "Playfair Display",
                                    }}
                                >
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                        sx={{
                                            fontWeight: "bold",
                                            letterSpacing: 3,
                                            color: "#494c57",
                                        }}
                                    >
                                        Qaraǵandy
                                    </Typography>
                                    <Typography
                                        className="card-content-text"
                                        variant="body2"
                                        sx={{
                                            fontFamily: "Monospace",
                                        }}
                                    >
                                        Eń uly tulǵalardyn dúnıege kelgen jeri
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                        >
                            <BootstrapDialogTitle
                                id="customized-dialog-title"
                                className="card-opened"
                                onClose={handleClose}
                                sx={{
                                    backgroundColor: "#faf0d0",
                                    color: "#494c57",
                                }}
                            >
                                Almaty
                            </BootstrapDialogTitle>
                            <DialogContent
                                dividers
                                sx={{
                                    backgroundColor: "#faf0d0",
                                    color: "#494c57",
                                }}
                            >
                                <div className="card-function">
                                    <SliderComponent
                                        handleChange={handleChangeDay}
                                    />
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

                                    <div className="text-center mt-12 text-3xl">
                                        {sum}₸
                                    </div>
                                </div>
                            </DialogContent>
                            <DialogActions
                                sx={{
                                    backgroundColor: "#faf0d0",
                                    color: "#494c57",
                                }}
                            >
                                <Button
                                    autoFocus
                                    onClick={handleClose}
                                    sx={{
                                        backgroundColor: "#faf0d0",
                                        color: "#494c57",
                                    }}
                                >
                                    Jabý
                                </Button>
                            </DialogActions>
                        </BootstrapDialog>
                    </div>
                    <div className="almaty-card">
                        <Card
                            sx={{ maxWidth: 200 }}
                            onClick={handleClickOpen}
                            className="card"
                            elevation={6}
                            // onClickAway={handleClickAway}
                        >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="60"
                                    image={photoAlmaty}
                                    alt="Almaty Photo"
                                />
                                <CardContent
                                    className="card-content"
                                    sx={{
                                        backgroundColor: "#faf0d0",
                                        color: "#494c57",
                                        fontFamily: "Playfair Display",
                                    }}
                                >
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                        sx={{
                                            fontWeight: "bold",
                                            letterSpacing: 3,
                                            color: "#494c57",
                                        }}
                                    >
                                        Almaty
                                    </Typography>
                                    <Typography
                                        className="card-content-text"
                                        variant="body2"
                                        sx={{
                                            fontFamily: "Monospace",
                                        }}
                                    >
                                        Myń boıauly, korkem ári almaly qala
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                        >
                            <BootstrapDialogTitle
                                id="customized-dialog-title"
                                className="card-opened"
                                onClose={handleClose}
                                sx={{
                                    backgroundColor: "#faf0d0",
                                    color: "#494c57",
                                }}
                            >
                                Almaty
                            </BootstrapDialogTitle>
                            <DialogContent
                                dividers
                                sx={{
                                    backgroundColor: "#faf0d0",
                                    color: "#494c57",
                                }}
                            >
                                <div className="card-function">
                                    <SliderComponent
                                        handleChange={handleChangeDay}
                                    />
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

                                    <div className="text-center mt-12 text-3xl">
                                        {sum}₸
                                    </div>
                                </div>
                            </DialogContent>
                            <DialogActions
                                sx={{
                                    backgroundColor: "#faf0d0",
                                    color: "#494c57",
                                }}
                            >
                                <Button
                                    autoFocus
                                    onClick={handleClose}
                                    sx={{
                                        backgroundColor: "#faf0d0",
                                        color: "#494c57",
                                    }}
                                >
                                    Jabý
                                </Button>
                            </DialogActions>
                        </BootstrapDialog>
                    </div>
                    <div className="astana-card">
                        <Card
                            sx={{ maxWidth: 200 }}
                            onClick={handleClickOpen}
                            className="card"
                            elevation={6}
                            // onClickAway={handleClickAway}
                        >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="60"
                                    image={photoAstana}
                                    alt="Almaty Photo"
                                />
                                <CardContent
                                    className="card-content"
                                    sx={{
                                        backgroundColor: "#faf0d0",
                                        color: "#494c57",
                                        fontFamily: "Playfair Display",
                                    }}
                                >
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                        sx={{
                                            fontWeight: "bold",
                                            letterSpacing: 3,
                                            color: "#494c57",
                                        }}
                                    >
                                        Astana
                                    </Typography>
                                    <Typography
                                        className="card-content-text"
                                        variant="body2"
                                        sx={{
                                            fontFamily: "Monospace",
                                        }}
                                    >
                                        Qazaqstan Respýblıkasynyń astanasy
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                        >
                            <BootstrapDialogTitle
                                id="customized-dialog-title"
                                className="card-opened"
                                onClose={handleClose}
                                sx={{
                                    backgroundColor: "#faf0d0",
                                    color: "#494c57",
                                }}
                            >
                                Almaty
                            </BootstrapDialogTitle>
                            <DialogContent
                                dividers
                                sx={{
                                    backgroundColor: "#faf0d0",
                                    color: "#494c57",
                                }}
                            >
                                <div className="card-function">
                                    <SliderComponent
                                        handleChange={handleChangeDay}
                                    />
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

                                    <div className="text-center mt-12 text-3xl">
                                        {sum}₸
                                    </div>
                                </div>
                            </DialogContent>
                            <DialogActions
                                sx={{
                                    backgroundColor: "#faf0d0",
                                    color: "#494c57",
                                }}
                            >
                                <Button
                                    autoFocus
                                    onClick={handleClose}
                                    sx={{
                                        backgroundColor: "#faf0d0",
                                        color: "#494c57",
                                    }}
                                >
                                    Jabý
                                </Button>
                            </DialogActions>
                        </BootstrapDialog>
                    </div>
                    <div className="shymkent-card">
                        <Card
                            sx={{ maxWidth: 200 }}
                            onClick={handleClickOpen}
                            className="card"
                            elevation={6}
                            // onClickAway={handleClickAway}
                        >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="60"
                                    image={photoShymkent}
                                    alt="Almaty Photo"
                                />
                                <CardContent
                                    className="card-content"
                                    sx={{
                                        backgroundColor: "#faf0d0",
                                        color: "#494c57",
                                        fontFamily: "Playfair Display",
                                    }}
                                >
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                        sx={{
                                            fontWeight: "bold",
                                            letterSpacing: 3,
                                            color: "#494c57",
                                        }}
                                    >
                                        Shymkent
                                    </Typography>
                                    <Typography
                                        className="card-content-text"
                                        variant="body2"
                                        sx={{
                                            fontFamily: "Monospace",
                                        }}
                                    >
                                        Qazaq halqynyń dastýrlerin saqtap jurgen
                                        qala
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                        >
                            <BootstrapDialogTitle
                                id="customized-dialog-title"
                                className="card-opened"
                                onClose={handleClose}
                                sx={{
                                    backgroundColor: "#faf0d0",
                                    color: "#494c57",
                                }}
                            >
                                Almaty
                            </BootstrapDialogTitle>
                            <DialogContent
                                dividers
                                sx={{
                                    backgroundColor: "#faf0d0",
                                    color: "#494c57",
                                }}
                            >
                                <div className="card-function">
                                    <SliderComponent
                                        handleChange={handleChangeDay}
                                    />
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

                                    <div className="text-center mt-12 text-3xl">
                                        {sum}₸
                                    </div>
                                </div>
                            </DialogContent>
                            <DialogActions
                                sx={{
                                    backgroundColor: "#faf0d0",
                                    color: "#494c57",
                                }}
                            >
                                <Button
                                    autoFocus
                                    onClick={handleClose}
                                    sx={{
                                        backgroundColor: "#faf0d0",
                                        color: "#494c57",
                                    }}
                                >
                                    Jabý
                                </Button>
                            </DialogActions>
                        </BootstrapDialog>
                    </div>
                    <div className="aqtau-card">
                        <Card
                            sx={{ maxWidth: 200 }}
                            onClick={handleClickOpen}
                            className="card"
                            elevation={6}
                            // onClickAway={handleClickAway}
                        >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="60"
                                    image={photoAqtau}
                                    alt="Almaty Photo"
                                />
                                <CardContent
                                    className="card-content"
                                    sx={{
                                        backgroundColor: "#faf0d0",
                                        color: "#494c57",
                                        fontFamily: "Playfair Display",
                                    }}
                                >
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                        sx={{
                                            fontWeight: "bold",
                                            letterSpacing: 3,
                                            color: "#494c57",
                                        }}
                                    >
                                        Aqtau
                                    </Typography>
                                    <Typography
                                        className="card-content-text"
                                        variant="body2"
                                        sx={{
                                            fontFamily: "Monospace",
                                        }}
                                    >
                                        Baıtaq teńizge tıip turǵan qala
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                        >
                            <BootstrapDialogTitle
                                id="customized-dialog-title"
                                className="card-opened"
                                onClose={handleClose}
                                sx={{
                                    backgroundColor: "#faf0d0",
                                    color: "#494c57",
                                }}
                            >
                                Almaty
                            </BootstrapDialogTitle>
                            <DialogContent
                                dividers
                                sx={{
                                    backgroundColor: "#faf0d0",
                                    color: "#494c57",
                                }}
                            >
                                <div className="card-function">
                                    <SliderComponent
                                        handleChange={handleChangeDay}
                                    />
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

                                    <div className="text-center mt-12 text-3xl">
                                        {sum}₸
                                    </div>
                                </div>
                            </DialogContent>
                            <DialogActions
                                sx={{
                                    backgroundColor: "#faf0d0",
                                    color: "#494c57",
                                }}
                            >
                                <Button
                                    autoFocus
                                    onClick={handleClose}
                                    sx={{
                                        backgroundColor: "#faf0d0",
                                        color: "#494c57",
                                    }}
                                >
                                    Jabý
                                </Button>
                            </DialogActions>
                        </BootstrapDialog>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
