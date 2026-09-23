import * as React from "react";
import { Button, Checkbox, Dropdown, TextInput } from "@hive/react";

import type {
  ErasedControl,
  PlaygroundSpec,
  PlaygroundValue,
  PlaygroundValues,
} from "../lib/doc";
import { CodeBlock } from "./CodeBlock";
import { DemoSurface } from "./DemoSurface";
import styles from "./Playground.module.css";

type PlaygroundProps = {
  spec: PlaygroundSpec;
  values: PlaygroundValues;
  onChange: (values: PlaygroundValues) => void;
};

function ControlField({
  name,
  control,
  value,
  onChange,
}: {
  name: string;
  control: ErasedControl;
  value: PlaygroundValue | undefined;
  onChange: (value: PlaygroundValue) => void;
}) {
  const label = control.label ?? name;
  const id = React.useId();

  switch (control.type) {
    case "boolean":
      return (
        <Checkbox
          label={<code className={styles.propName}>{label}</code>}
          checked={value === true}
          onChange={(event) => onChange(event.currentTarget.checked)}
        />
      );
    case "select":
      return (
        <Dropdown
          size="small"
          label={label}
          options={control.options.map((option) => ({
            value: option,
            label: option,
          }))}
          value={String(value ?? "")}
          onValueChange={onChange}
        />
      );
    case "text":
      return (
        <TextInput
          size="small"
          label={label}
          value={String(value ?? "")}
          onChange={(event) => onChange(event.currentTarget.value)}
        />
      );
    case "number":
      return (
        <div className={styles.range}>
          <label htmlFor={id} className={styles.rangeLabel}>
            {label}
            <output htmlFor={id} className={styles.rangeValue}>
              {String(value ?? control.min)}
            </output>
          </label>
          <input
            id={id}
            type="range"
            min={control.min}
            max={control.max}
            step={control.step ?? 1}
            value={Number(value ?? control.min)}
            onChange={(event) => onChange(Number(event.currentTarget.value))}
            className={styles.rangeInput}
          />
        </div>
      );
  }
}

/** Demo interativa com controle de props (equivalente aos controls do Storybook). */
export function Playground({ spec, values, onChange }: PlaygroundProps) {
  const code = spec.code(values);

  return (
    <div className={styles.playground}>
      <div className={styles.stage}>
        <DemoSurface
          className={styles.preview}
          label="Pré-visualização do playground"
        >
          {spec.render(values)}
        </DemoSurface>
        <fieldset className={styles.controls}>
          <legend className={styles.legend}>Props</legend>
          {Object.entries(spec.controls).map(([name, control]) => (
            <ControlField
              key={name}
              name={name}
              control={control}
              value={values[name]}
              onChange={(value) => onChange({ ...values, [name]: value })}
            />
          ))}
          <Button
            size="small"
            tone="neutral"
            visualStyle="outline"
            onClick={() => onChange(spec.initial)}
          >
            Restaurar
          </Button>
        </fieldset>
      </div>
      <CodeBlock code={code} caption="Código gerado" className={styles.code} />
    </div>
  );
}
