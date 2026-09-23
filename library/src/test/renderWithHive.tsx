import * as React from "react";
import { render, type RenderOptions } from "@testing-library/react";

import { HiveProvider } from "../components/Provider/HiveProvider";

export function renderWithHive(
  ui: React.ReactElement,
  options?: RenderOptions,
) {
  return render(
    <HiveProvider colorMode="light" brand="coral" density="default" shape="default">
      {ui}
    </HiveProvider>,
    options,
  );
}