"use client";

import SelectModel from "./SelectModel";

interface SidebarProps {
  model: string;
  setModel: (value: string) => void;
  sidebarOpen: any;
}

export default function Sidebar({
  sidebarOpen,
  model,
  setModel,
}: SidebarProps) {
  return (
    <aside
      className={`bg-gray-100 ${sidebarOpen ? "w-74" : "w-0"} overflow-hidden`}
    >
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Change Model</h2>
        <div className="space-y-2">
          <SelectModel model={model} setModel={setModel} />
        </div>
      </div>
    </aside>
  );
}
