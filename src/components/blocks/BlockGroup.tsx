import type React from "react";

type LayoutMode = "row" | "column";

interface BlockGroupProps {
  children: React.ReactNode;
  mode: LayoutMode;
}

const BlockGroup: React.FC<BlockGroupProps> = ({
  children,
  mode,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: mode == "row" ? "row" : "column",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
};

export default BlockGroup;
