import React from "react";

const UnpackedClient = () => {
  const DATA = [
    {
      id: 1,
      user1: "John",
      user2: "Jane",
      weddingDate: "2025-02-12T01:57:45.271Z",
    },
    {
      id: 2,
      user1: "Shaheizy Ruslan",
      user2: "Ashika",
      weddingDate: "2026-02-01T01:57:45.271Z",
    },
    {
      id: 3,
      user1: "Nik",
      user2: "Jesseca",
      weddingDate: "2025-05-03T01:57:45.271Z",
    },
    {
      id: 4,
      user1: "Wan Hadif",
      user2: "Hani",
      weddingDate: "2025-07-12T01:57:45.271Z",
    },
    {
      id: 5,
      user1: "Syed Mokhzani",
      user2: "Zubaidah",
      weddingDate: "2025-09-04T01:57:45.271Z",
    },
    {
      id: 6,
      user1: "Muzammil",
      user2: "Janaky",
      weddingDate: "2025-10-06T01:57:45.271Z",
    },
    {
      id: 7,
      user1: "Ajwad",
      user2: "Nurin Fahmie",
      weddingDate: "2025-12-10T01:57:45.271Z",
    },
  ];

  function formatDate(string: string | number | Date) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    //@ts-ignore
    return new Date(string).toLocaleDateString([], options);
  }

  return (
    <div className="grid grid-cols-4 gap-5">
      {DATA.map((client) => (
        <div
          key={client.id}
          className="aspect-square rounded-lg bg-white border shadow-md flex flex-col justify-center items-center cursor-pointer hover:bg-slate-50"
        >
          <h1 className="text-sm tracking-tight font-bold">
            {client.user1} <span>&amp;</span> {client.user2}
          </h1>
          <p className="tracking-tight">{formatDate(client.weddingDate)}</p>
        </div>
      ))}
    </div>
  );
};

export default UnpackedClient;
