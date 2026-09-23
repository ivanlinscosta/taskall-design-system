import {
  Bell,
  Calendar,
  Home,
  Settings,
  Slot,
  SlotGroup,
} from "@taskall/react";

const icons = [Home, Calendar, Bell, Settings];

export default function SlotGroupOrientation() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "start",
        gap: "var(--taskall-space-48)",
      }}
    >
      {(["horizontal", "vertical"] as const).map((orientation) => (
        <SlotGroup
          key={orientation}
          orientation={orientation}
          ariaLabel={`Grupo ${orientation}`}
        >
          {icons.map((Icon, index) => (
            <Slot key={index} size="lg">
              <Icon size={20} aria-hidden="true" />
            </Slot>
          ))}
        </SlotGroup>
      ))}
    </div>
  );
}
