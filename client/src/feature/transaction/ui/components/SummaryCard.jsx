import React, { useContext } from "react";
import { MyStore } from "../../../../app/context/MyContext";

const SummaryCard = ({
  title,
  value,
  icon: Icon,
  iconBg,
  iconColor,
  valueColor = "text-[#101b32]",
  showCurrency = true,
}) => {
  const { user } = useContext(MyStore);

  return (
    <div className="bg-white border border-[#dfe5ed] rounded-2xl p-5 shadow-sm">
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}
      >
        <Icon size={21} className={iconColor} />
      </div>

      <p className="text-sm text-[#63708a] mt-4">{title}</p>

      <h2 className={`text-2xl font-bold mt-1 ${valueColor}`}>
        {showCurrency && `${user?.currency || "$"}`}
        {value.toLocaleString("en-IN")}
      </h2>
    </div>
  );
};

export default SummaryCard;
