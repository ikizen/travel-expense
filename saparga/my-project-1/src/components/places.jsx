import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { REACT_APP_BACKEND_URL } from "../constants/constants";

export const PlacesComponent = ({ placeList, pickPlaces }) => {
    return (
        <>
            <div className="flex flex-row justify-center mt-6">
                <h2>Barý josparlarym</h2>
            </div>
            <div className="mt-12 flex justify-center">
                <Autocomplete
                    //className="mt-10 flex place-content-center	"
                    multiple
                    sx={{
                        borderColor: "#494c57",
                        backgroundColor: "#494c57",
                        color: "#494c57",
                    }}
                    limitTags={2}
                    id="multiple-limit-tags"
                    options={placeList}
                    onChange={pickPlaces}
                    getOptionLabel={(option) => option.name}
                    // defaultValue={[placeList[0]]}
                    renderInput={(params) => {
                        return (
                            <TextField
                                {...params}
                                label="Saıahat oryndary"
                                placeholder="Tańda"
                                // color="#494c57"
                                sx={{
                                    notchedOutline: {
                                        borderWidth: "1px",
                                        borderColor: "yellow !important",
                                    },
                                    "& .MuiFilledInput-input": {
                                        border: "1px solid orange",
                                        borderRadius: 1,
                                    },

                                    "& .MuiInputLabel-root": {
                                        color: "#494c57",
                                        borderColor: "#494c57",
                                    },

                                    // root: {
                                    //     color: "#494c57",
                                    //     height: 3,
                                    //     padding: "13px 0",
                                    //     borderColor: "#494c57",
                                    // },
                                    thumb: {
                                        color: "yellow",
                                        borderBlockColor: "#494c57",
                                        borderColor: "#494c57",
                                    },
                                    input: {
                                        color: "494c57",
                                        borderColor: "#494c57",
                                    },
                                    color: "#494c57",
                                    borderColor: "#494c57",
                                }}
                            />
                        );
                    }}
                    sx={{ width: "300px", borderColor: "#494c57" }}
                />
            </div>
        </>
    );
};
