import React, { useEffect, useRef, useState } from "react";
import { Box, TextField } from "@mui/material";

interface IProps {
  handleChange: (data: string) => void;
  error: boolean;
  count: number;
}

function isValidNumber(str: string): boolean {
  return !isNaN(Number(str)) && str.trim() !== "";
}

const PinInput: React.FC<IProps> = ({ error, count, handleChange }) => {
  const [value, setValue] = useState<string[]>(Array(count).fill(""));
  console.log(value, "haha");
  const inputRefs = useRef<Array<HTMLInputElement>>([]);

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  //handle the patse input command
  const handlePaste = (
    e: React.ClipboardEvent<HTMLDivElement>,
    index: number
  ) => {
    e.stopPropagation();
    e.preventDefault();
    const data = e.clipboardData.getData("text");

    const strArray: string[] = data.split("").filter((v) => /\d/.test(v));
    console.log(strArray.length, index + count, "haha");
    if (index + count > strArray.length) {
      strArray.forEach((v, ind) => {
        if (inputRefs?.current?.[ind]) {
          inputRefs.current[ind + index]!.value = v;
        }
      });
    } else {
      focusInput(index + count);
    }
  };

  //blur the fields
  const handleBur = () => {
    for (let i = 0; i < inputRefs.current.length; i++) {
      inputRefs.current[i]?.blur();
    }
  };
  //focus on next input on complete
  const focusNextInput = (index: number) => {
    console.log("called next input haha");
    if (!inputRefs.current[index]?.value) return;
    if (inputRefs.current[index].value) console.log("called next input haha1");
    if (!inputRefs?.current?.[index]?.value) return;
    if (inputRefs?.current?.[index]?.value == null) return;
    if (!isValidNumber(inputRefs?.current?.[index]?.value)) {
      inputRefs.current[index].value = "";
      return;
    }
    const tempValue = [...value];
    if (inputRefs?.current?.[index].value.length >= 2) {
      let val = inputRefs.current[index]?.value;
      console.log("hahha");
      tempValue[index] = inputRefs.current?.[index]?.value.split("").pop();
      inputRefs.current[index].value = inputRefs.current?.[index]?.value
        ?.split("")
        .pop();
      setValue([...tempValue]);
      focusInput(index + 1);
    } else {
      console.log("called next input haha 1 and 1");
      console.log(inputRefs.current[index]?.value, "haha");
      if (!inputRefs.current[index]?.value) return;

      console.log("haha called next3");

      if (inputRefs.current?.[index]?.value) {
        tempValue[index] = inputRefs.current?.[index]?.value;
        setValue([...tempValue]);
        focusInput(index + 1);
      }
    }
  };

  //handle on last input field
  const handleLast = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const tempValue = [...value];
    if (inputRefs.current[index]?.value.length >= 2) {
      tempValue[index] = inputRefs.current?.[index]?.value.split("").pop();
      inputRefs.current[index].value = inputRefs.current?.[index]?.value
        ?.split("")
        .pop();
      setValue([...tempValue]);
    } else {
      tempValue[index] = inputRefs.current?.[index]?.value;
      setValue([...tempValue]);
    }
    handleBur();
  };

  useEffect(() => {
    handleChange(value.join(""));
  }, [value]);

  return (
    <>
      <Box
        sx={{
          width: "90%",
          m: "auto!important",
          display: "grid",
          gridTemplateColumns: "repeat(6,1fr)",
          placeItems: "center",
          gap: "10px",
          maxWidth: "400px",
        }}
      >
        {Array(count)
          .fill("")
          .map((_, index) => {
            return (
              <TextField
                sx={{ width: "fit-content" }}
                type="text"
                error={error}
                onChange={(e) => {
                  index == count - 1 ? handleLast(index, e) : undefined;
                }}
                inputRef={(el) => (inputRefs.current[index] = el)}
                onPaste={(e) => {
                  e.preventDefault();
                  handlePaste(e, index);
                }}
                onKeyUp={
                  () => {
                    if (index < count - 1) {
                      focusNextInput(index);
                    }
                  }
                  // index < count - 1 ? focusNextInput(index, e) : undefined
                }
              />
            );
          })}
      </Box>
    </>
  );
};

export default PinInput;
