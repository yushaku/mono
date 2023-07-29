import React from "react";

function LoadingPage() {
  return (
    <section className="grid grid-cols-1 gap-x-10 px-6 md:grid-cols-2 md:px-3 lg:grid-cols-3 lg:p-0 animate-pulse">
      <div className="md:col-span-2 animate-pulse">
        <div className="w-[700px] h-[500px] block"></div>
      </div>
    </section>
  );
}

export default LoadingPage;
