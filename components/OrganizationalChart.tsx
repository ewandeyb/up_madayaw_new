// components/OrganizationalChart.tsx
import React from 'react';
import Image from "next/image";

const officers = [
  {
    name: 'John Doe',
    title: 'President',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
    college: 'School of Management',
    email: 'johndoe@up.edu.ph',
    googleScholar: 'https://scholar.google.com/citations?user=XXXXX'
  },
  {
    name: 'John Doe',
    title: 'President',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
    college: 'School of Management',
    email: 'johndoe@up.edu.ph',
    googleScholar: 'https://scholar.google.com/citations?user=XXXXX'
  },
  {
    name: 'John Doe',
    title: 'President',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
    college: 'School of Management',
    email: 'johndoe@up.edu.ph',
    googleScholar: 'https://scholar.google.com/citations?user=XXXXX'
  },
  {
    name: 'John Doe',
    title: 'President',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
    college: 'School of Management',
    email: 'johndoe@up.edu.ph',
    googleScholar: 'https://scholar.google.com/citations?user=XXXXX'
  },
  {
    name: 'John Doe',
    title: 'President',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
    college: 'School of Management',
    email: 'johndoe@up.edu.ph',
    googleScholar: 'https://scholar.google.com/citations?user=XXXXX'
  },
  {
    name: 'John Doe',
    title: 'President',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
    college: 'School of Management',
    email: 'johndoe@up.edu.ph',
    googleScholar: 'https://scholar.google.com/citations?user=XXXXX'
  },
  {
    name: 'John Doe',
    title: 'President',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
    college: 'School of Management',
    email: 'johndoe@up.edu.ph',
    googleScholar: 'https://scholar.google.com/citations?user=XXXXX'
  },
  {
    name: 'John Doe',
    title: 'President',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
    college: 'School of Management',
    email: 'johndoe@up.edu.ph',
    googleScholar: 'https://scholar.google.com/citations?user=XXXXX'
  },
  // Add more officers as needed
];

const OrganizationalChart = () => {
  return (
    <section className="py-8 bg-gradient-to-r from-[#B2B2B2] to-[#202020] dark:bg-gradient-to-r dark:from-[#FFFFFF] dark:to-[#8E8E8E]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white dark:text-black">Organizational Chart</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {officers.map((officer, index) => (
            <div key={index} className="text-center">
              <Image
                src={officer.photo}
                alt={officer.name}
                className="w-32 h-32 object-cover mx-auto mb-4"
                width={320} // Provide the width of the image
                height={320} // You might also need to provide the height depending on your requirements
              />
              <h3 className="text-xl font-semibold text-white dark:text-black">{officer.name}</h3>
              <p className="text-white dark:text-black">{officer.title}</p>
              <p className="text-white dark:text-black">{officer.college}</p>
              <a href={`mailto:${officer.email}`} className="text-blue-300 underline dark:text-blue-800 underline">{officer.email}</a>
              <p className="text-gray-500">
                <a href={officer.googleScholar} target="_blank" rel="noopener noreferrer" className="text-white underline dark:text-black underline">
                  {officer.name} - Google Scholar
                </a>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrganizationalChart;