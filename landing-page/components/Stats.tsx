import React from "react";

const stats = [
  {
    number: 42,
    descripton: (
      <p className="text-sm text-[#524d4d] font-semibold">
        Our Active <br /> Users
      </p>
    ),
  },

  {
    number: 42,
    descripton: (
      <p className="text-sm text-[#524d4d] font-semibold">
        Our Active <br /> Users
      </p>
    ),
  },

  {
    number: 42,
    descripton: (
      <p className="text-sm text-[#524d4d] font-semibold">
        Our Active <br /> Users
      </p>
    ),
  },
];

const Stats = () => {
  return (
    <div className="flex gap-8 mt-16">
      {stats.map((item, index) => {
        return (
          <div key={index} className="flex items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-[rgba(255,255,255,85%)]">
                {item.number}K
              </h1>
            </div>
            {item.descripton}
          </div>
        );
      })}
    </div>
  );
};

export default Stats;
