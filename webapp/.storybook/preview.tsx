import type { Decorator, Preview } from "@storybook/react";
import { TaskAllProvider } from "@taskall/react";

import "../../library/src/styles/index.css";

export const globalTypes = {
  colorMode: {
    name: "Color mode",
    description: "Light ou dark",
    toolbar: {
      icon: "circlehollow",
      items: [
        { value: "light", title: "Light", icon: "sun" },
        { value: "dark", title: "Dark", icon: "moon" },
      ],
      showName: true,
    },
  },
  brand: {
    name: "Brand",
    description: "Tema de marca",
    toolbar: {
      icon: "paintbrush",
      items: [
        { value: "coral", title: "Coral" },
        { value: "gestao", title: "Gestão" },
        { value: "estudantes", title: "Estudantes" },
        { value: "responsaveis", title: "Responsáveis" },
      ],
      showName: true,
    },
  },
  density: {
    name: "Density",
    description: "Densidade de espaçamento",
    toolbar: {
      icon: "sidebar",
      items: [
        { value: "compact", title: "Compact" },
        { value: "default", title: "Default" },
        { value: "expanded", title: "Expanded" },
      ],
      showName: true,
    },
  },
  shape: {
    name: "Shape",
    description: "Forma dos cantos",
    toolbar: {
      icon: "square",
      items: [
        { value: "sharp", title: "Sharp" },
        { value: "default", title: "Default" },
        { value: "rounded", title: "Rounded" },
      ],
      showName: true,
    },
  },
};

const withTaskAllProvider: Decorator = (Story, context) => {
  const { colorMode = "light", brand = "coral", density = "default", shape = "default" } =
    context.globals;
  return (
    <TaskAllProvider colorMode={colorMode} brand={brand} density={density} shape={shape}>
      <div style={{ padding: 24 }}>{Story()}</div>
    </TaskAllProvider>
  );
};

const preview: Preview = {
  decorators: [withTaskAllProvider],
  parameters: {
    layout: "fullscreen",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
  initialGlobals: {
    colorMode: "light",
    brand: "coral",
    density: "default",
    shape: "default",
  },
};

export default preview;