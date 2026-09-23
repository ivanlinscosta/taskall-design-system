import * as React from "react";
import { Checkbox } from "@hive/react";

const classes = ["6º A", "6º B", "7º A", "8º B"];

export default function CheckboxSelectAll() {
  const [selected, setSelected] = React.useState<string[]>(["6º A"]);
  const allChecked = selected.length === classes.length;
  const someChecked = selected.length > 0 && !allChecked;

  return (
    <fieldset
      style={{
        margin: 0,
        padding: 0,
        border: 0,
        display: "grid",
        gap: "var(--hive-space-8)",
      }}
    >
      <legend
        style={{
          font: "var(--hive-font-label-m)",
          marginBottom: "var(--hive-space-8)",
        }}
      >
        Publicar para as turmas
      </legend>
      <Checkbox
        label="Todas as turmas"
        checked={allChecked}
        indeterminate={someChecked}
        onChange={() => setSelected(allChecked ? [] : classes)}
      />
      <div
        style={{
          display: "grid",
          gap: "var(--hive-space-8)",
          paddingLeft: "var(--hive-space-24)",
        }}
      >
        {classes.map((name) => (
          <Checkbox
            key={name}
            label={name}
            checked={selected.includes(name)}
            onChange={(event) =>
              setSelected((current) =>
                event.currentTarget.checked
                  ? [...current, name]
                  : current.filter((item) => item !== name),
              )
            }
          />
        ))}
      </div>
    </fieldset>
  );
}
