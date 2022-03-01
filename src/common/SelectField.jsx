import { Select } from "@chakra-ui/react";

export const SelectField = ({ label, options, onChange }) => (
  <Select
    id={label}
    name={label}
    onChange={(e) => onChange(e)}
    style={{ textAlign: "center", color: "#FEFEFE" }}
  >
    {options?.map((option) => (
      <option key={option.id} value={option.id} style={{ color: "#000" }}>
        {option.name}
      </option>
    ))}
  </Select>
);
