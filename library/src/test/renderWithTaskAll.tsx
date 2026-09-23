import * as React from "react";
import { render, type RenderOptions } from "@testing-library/react";

import { TaskAllProvider } from "../components/Provider/TaskAllProvider";

export function renderWithTaskAll(
  ui: React.ReactElement,
  options?: RenderOptions,
) {
  return render(
    <TaskAllProvider
      colorMode="light"
      brand="coral"
      density="default"
      shape="default"
    >
      {ui}
    </TaskAllProvider>,
    options,
  );
}
