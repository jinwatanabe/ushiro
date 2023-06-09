import { FC, useState } from "react";
import { LogTable } from "../organizm/LogTable";
import { TechTable } from "../organizm/TechTable";

export const Home: FC = () => {
  const [activeTab, setActiveTab] = useState<"LogTable" | "TechTable">(
    "LogTable"
  );
  return (
    <div className="w-screen h-screen flex flex-col items-center p-10" data-theme="cupcake">
      <div className="tabs">
        <a
          onClick={() => {
            setActiveTab("LogTable");
          }}
          className={
            activeTab === "LogTable"
              ? "tab tab-lifted tab-active"
              : "tab tab-lifted"
          }
        >
          ふりかえりログ一覧
        </a>
        <a
          onClick={() => {
            setActiveTab("TechTable");
          }}
          className={
            activeTab === "TechTable"
              ? "tab tab-lifted tab-active"
              : "tab tab-lifted"
          }
        >
          ふりかえり手法一覧
        </a>
      </div>

      <div className="mt-5 w-10/12">
        {activeTab === "LogTable" ? (
          <LogTable></LogTable>
        ) : (
          <TechTable></TechTable>
        )}
      </div>
    </div>
  );
};
