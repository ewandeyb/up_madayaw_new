// components/OrganizationalChart.js
import React from 'react';

const officers = [
  {
    name: 'John Doe',
    title: 'President',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
  {
    name: 'John Doe',
    title: 'President',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
  {
    name: 'John Doe',
    title: 'President',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
  {
    name: 'John Doe',
    title: 'President',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
  {
    name: 'John Doe',
    title: 'President',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
  {
    name: 'John Doe',
    title: 'President',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
  {
    name: 'John Doe',
    title: 'President',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
  {
    name: 'John Doe',
    title: 'President',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
  // Add more officers as needed
];

const OrganizationalChart = () => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Organizational Chart</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {officers.map((officer, index) => (
            <div key={index} className="text-center">
              <img
                src={officer.photo}
                alt={officer.name}
                className="w-32 h-32 object-cover mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">{officer.name}</h3>
              <p className="text-gray-500">{officer.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrganizationalChart;