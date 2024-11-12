import React, { useEffect, useState } from "react";
import MyInput from "./MyInput";
import Select from "@mui/material/Select";
import { FormControl, MenuItem } from "@mui/material";
import { months } from "../utils/utility";
import MyCheckBox from "./MyCheckBox";
import MyButton from "./MyButton";

const genderIds = [1, 2, 3, 4, 5];
function Step3({ alreadySelectedData, nextClicked }) {
  const [data, setData] = useState(null);
  const [checked, setChecked] = useState(0);

  const handleChange = (event) => {
    setData({ ...data, month: event.target.value });
  };
  const handleNameChange = (event) => {
    setData({ ...data, name: event.target.value });
  };
  const handleYearChange = (event) => {
    setData({ ...data, year: event.target.value });
  };
  const handleDayChange = (event) => {
    setData({ ...data, day: event.target.value });
  };

  useEffect(() => {
    const selectedData = {
      name: alreadySelectedData.name,
      day: alreadySelectedData.day,
      month: alreadySelectedData.month,
      year: alreadySelectedData.year,
      gender: alreadySelectedData.gender,
    };
    setData(selectedData);
    setChecked(selectedData?.gender);
  }, [alreadySelectedData]);

  const getMonthInput = () => {
    return (
      <FormControl fullWidth style={{ margin: "0px 20px" }}>
        <Select
          inputProps={{ "aria-label": "Without label" }}
          value={data?.month ?? ""}
          displayEmpty
          onChange={handleChange}
          sx={{
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1ed760", // Green border when clicked
            },
            "& .MuiSvgIcon-root": {
              color: "#1ed760", // Green color for dropdown icon
            },
            color: "#fff",
            border: "1px solid rgba(255, 255, 255, 0.532)",
          }}
        >
          <MenuItem value="">
            <span>Month</span>
          </MenuItem>
          {months.map((month) => (
            <MenuItem key={month} value={month}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };
  const handleCheckboxChange = (id) => {
    setChecked(id);
    setData({ ...data, gender: id });
  };
  const getCheckBoxUI = () => {
    var checkboxTitle = "Prefer not to say";

    return (
      <div style={{ width: "300px", margin: "0px 0px 20px 0px" }}>
        <div>
          <h4 style={{ margin: "5px 0px" }}>Gender</h4>
          <span style={{ fontSize: "14px", color: "grey", fontWeight: "800" }}>
            We use your gender to help personalize our content recommendations
            and ads for you.
          </span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
          {genderIds.map((e) => {
            switch (e) {
              case 1:
                checkboxTitle = "Man";
                break;
              case 2:
                checkboxTitle = "Woman";
                break;
              case 3:
                checkboxTitle = "Non-binary";
                break;
              case 4:
                checkboxTitle = "Something else";
                break;
              case 5:
                checkboxTitle = "Prefer not to say";
                break;

              default:
                break;
            }
            return (
              <div
                key={e}
                style={{ marginRight: "10px", marginBottom: "10px" }}
              >
                <MyCheckBox
                  id={e}
                  handleChange={handleCheckboxChange}
                  isChecked={checked === e}
                />
                <span
                  style={{
                    marginLeft: "10px",
                    fontSize: "14px",
                    fontWeight: "700",
                  }}
                >
                  {checkboxTitle}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  return (
    <div style={{ marginTop: "20px" }}>
      <div>
        <div style={{ marginBottom: "-10px" }}>
          <h4 style={{ margin: "5px 0px" }}>Name</h4>
          <span style={{ fontSize: "14px", color: "grey", fontWeight: "800" }}>
            This name will appear on your profile
          </span>
        </div>
        <MyInput onChange={handleNameChange} value={data?.name} />
      </div>
      <div>
        <div style={{ margin: "20px 0px" }}>
          <h4 style={{ margin: "5px 0px" }}>Date of birth</h4>
          <span style={{ fontSize: "14px", color: "grey", fontWeight: "800" }}>
            Why do we need your date of birth?
          </span>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "-30px" }}
        >
          <MyInput
            value={data?.year}
            placeholder={"yyyy"}
            width={"80px"}
            onChange={handleYearChange}
          />

          {getMonthInput()}

          <MyInput
            value={data?.day}
            placeholder={"dd"}
            width={"60px"}
            onChange={handleDayChange}
          />
        </div>
      </div>
      {/* checkbox section */}
      {getCheckBoxUI()}
      <MyButton
        label={"Next"}
        onClick={() => nextClicked(data)}
        isDisabled={
          data?.name?.length > 0 &&
          data?.day?.length > 0 &&
          data?.month?.length > 0 &&
          data?.year?.length > 0 &&
          checked > 0
            ? false
            : true
        }
      />
    </div>
  );
}

export default Step3;
