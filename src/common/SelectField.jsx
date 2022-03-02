import { Select } from "@chakra-ui/react";

export const SelectField = ({ label, options, onChange }) => (
  <Select
    defaultValue={label}
    id={label}
    name={label}
    color="gray.50"
    onChange={(e) => onChange(e)}
    style={{ textAlign: "center", textTransform: "capitalize" }}
  >
    <option value={label} disabled>
      {label}
    </option>
    {options?.map((option) => (
      <option key={option.id} value={option.id} style={{ color: "#000" }}>
        {option.name}
      </option>
    ))}
  </Select>
);
