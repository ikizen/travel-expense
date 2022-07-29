import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export const PlacesComponent = ({ placeList, pickPlaces }) => {
    return (
        <>
            <div className="flex flex-row justify-between mt-6">
                <h2>Планирую посетить..</h2>
                <h2>Planning to visit..</h2>
            </div>
            <div className="mt-12 flex justify-center">
                <Autocomplete
                    //className="mt-10 flex place-content-center	"
                    multiple
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
                                color="secondary"
                                label="Места"
                                placeholder="Выбирай"
                            />
                        );
                    }}
                    sx={{ width: "300px" }}
                />
            </div>
        </>
    );
};
