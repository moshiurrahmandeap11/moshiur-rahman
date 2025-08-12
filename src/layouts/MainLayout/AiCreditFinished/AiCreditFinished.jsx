import React from "react";

const ApiCreditFinished = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center text-orange-400 p-6 select-none">
      <div className="text-6xl mb-6 animate-pulse">⚠️</div>
      <h1 className="text-3xl font-bold mb-4 animate-bounce">
        API Credit শেষ হয়ে গেছে!
      </h1>
      <p className="text-center max-w-md mb-8 text-gray-300">
        দুঃখিত, এখন আর চ্যাট করতে পারছিস না। একটু বিরতি নাও, পরে আবার চেষ্টা করো।
      </p>

      <div className="w-24 h-24 border-8 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default ApiCreditFinished;
