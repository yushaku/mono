import React from "react";

const loading = () => {
  return (
    <ul className="flex flex-wrap w-full justify-between gap-y-3">
      {[1, 2, 3, 4].map((num) => {
        return (
          <li key={num} className="w-1/3">
            <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-300 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-300 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-300 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default loading;
