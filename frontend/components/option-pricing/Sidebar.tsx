"use client";

import { Checkbox } from "@/components/ui/checkbox";

interface SidebarProps {
  checkboxes: { [key: string]: boolean };
  sidebarOpen: any;
  setCheckboxes: (value: any) => void;
}

export default function Sidebar({
  checkboxes,
  sidebarOpen,
  setCheckboxes,
}: SidebarProps) {
  const handleCheckboxChange = (name: keyof typeof checkboxes) => {
    setCheckboxes((prev: any) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <aside
      className={`bg-gray-100 ${sidebarOpen ? "w-64" : "w-0"} overflow-hidden`}
    >
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Options</h2>
        <div className="space-y-2">
          {Object.entries(checkboxes).map(([key, value]) => (
            <div key={key} className="flex items-center">
              <Checkbox
                id={key}
                checked={value}
                onCheckedChange={() =>
                  handleCheckboxChange(key as keyof typeof checkboxes)
                }
              />
              <label htmlFor={key} className="ml-2 text-sm font-medium">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
