// components/OrganizationalChart.tsx
import React from 'react';
import Image from "next/image";

const boardOfDirectors = [
  {
    name: 'Analiza S. Fulvadora',
    title: 'Director',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
  {
    name: 'Joan A. Garcia',
    title: 'Director',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
  {
    name: 'Micheal A. Gatela',
    title: 'Chairperson',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
  {
    name: 'Marilou O. Montiflor',
    title: 'Vice-Chair',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
  {
    name: 'Lynda A. Buenaobra',
    title: 'Director',
    photo: '/img/Buenaobra L. (1).png',
  },
];

const electionCommittee = [
  {
    name: 'Marievette V. Gatela',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
  {
    name: 'Michelle A. Panis',
    photo: '/img/Panis M..png',
  },
  {
    name: 'Coralyn C. Aborde',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
];

const auditInventoryComm = [
  {
    name: 'Emma Ruth B. Caalaman',
    photo: '/img/Caalaman.png',
  },
  {
    name: 'Florence F. Aquiatan',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
  {
    name: 'Arlene C. Gumapac',
    photo: '/img/Gumapac (1).png',
  },
];

const secretary = [
  {
    name: 'Ruelyn S. Peronilla',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
];

const treasurer = [
  {
    name: 'Annalyn Paz S. Pasaol',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
];

const educationTrainingComm = [
  {
    name: 'Jackie Lou J. Tagubase',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
  {
    name: 'Marilou O. Montiflor',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
  {
    name: 'Lavern Kaye Driz',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
];

const creditCommittee = [
  {
    name: 'Iraine Louella O. Rara',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
  {
    name: 'Annie D. Dismas',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
  {
    name: 'Meliza D. Bakong',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
];

const ethicsCommittee = [
  {
    name: 'Ma. Mae C. Aborde',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
  {
    name: 'Leo Manuel B. Estaña',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
  {
    name: 'Ana Sheila A. Sulimanan',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
];

const genderCommittee = [
  {
    name: 'Clint Joey Inson',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
  {
    name: 'Analiza S. Fulvadora',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
  {
    name: 'Analiza E. Macias',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
];

const mediationConciliationComm = [
  {
    name: 'Jennifer P. Fronteras',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
  {
    name: 'Dann Marie N. Del Mundo',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
  {
    name: 'Merlyn M. Pausanos',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
];

const hiredManagement = [
  {
    name: 'Marie Grace T. Aponte',
    title: 'Bookkeeper',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
  {
    name: 'Arlyn C. Denosta',
    title: 'Mgt. Officer',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
  {
    name: 'Jovely L. Amandoron',
    title: 'Office Staff',
    photo: '/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg',
  },
];

const OrganizationalChart = () => {
  return (
    <section className="py-8 bg-gradient-to-r from-[#B2B2B2] to-[#202020] dark:bg-gradient-to-r dark:from-[#FFFFFF] dark:to-[#8E8E8E]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-white dark:text-black">Organizational Chart</h2>
        <div className="flex flex-col border-2 p-6">
          <h1 className="text-2xl font-bold text-center mt-1 mb-12 text-white dark:text-black">Board of Directors</h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {boardOfDirectors.map((boardOfDirectors, index) => (
              <div key={index} className="text-center">
                <Image
                  src={boardOfDirectors.photo}
                  alt={boardOfDirectors.name}
                  className="w-32 h-32 object-cover mx-auto mb-4 border-2"
                  width={320} // Provide the width of the image
                  height={320} // You might also need to provide the height depending on your requirements
                />
                <h3 className="text-xl font-semibold text-white dark:text-black">{boardOfDirectors.name}</h3>
                <p className="text-white dark:text-black">{boardOfDirectors.title}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-around">
          <div className="flex flex-col w-full border-2 p-4">
            <h1 className="text-2xl font-bold text-center mt-3 mb-12 text-white dark:text-black">Audit & Inventory Comm.</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8">
              {auditInventoryComm.map((auditInventoryComm, index) => (
                <div key={index} className="text-center">
                  <Image
                    src={auditInventoryComm.photo}
                    alt={auditInventoryComm.name}
                    className="w-32 h-32 object-cover mx-auto mb-4 border-2"
                    width={320} // Provide the width of the image
                    height={320} // You might also need to provide the height depending on your requirements
                  />
                  <h3 className="text-xl font-semibold text-white dark:text-black">{auditInventoryComm.name}</h3>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-full border-2 p-4">
            <h1 className="text-2xl font-bold text-center mt-3 mb-12 text-white dark:text-black">Election Committee</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8">
              {electionCommittee.map((electionCommittee, index) => (
                <div key={index} className="text-center">
                  <Image
                    src={electionCommittee.photo}
                    alt={electionCommittee.name}
                    className="w-32 h-32 object-cover mx-auto mb-4 border-2"
                    width={320} // Provide the width of the image
                    height={320} // You might also need to provide the height depending on your requirements
                  />
                  <h3 className="text-xl font-semibold text-white dark:text-black">{electionCommittee.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-evenly">
          <div className="flex flex-col w-full border-2 p-4">
            <h1 className="text-2xl font-bold text-center mt-3 mb-10 text-white dark:text-black">Secretary</h1>
            {secretary.map((secretary, index) => (
              <div key={index} className="text-center">
                <Image
                  src={secretary.photo}
                  alt={secretary.name}
                  className="w-32 h-32 object-cover mx-auto mb-4 border-2"
                  width={320} // Provide the width of the image
                  height={320} // You might also need to provide the height depending on your requirements
                />
                <h3 className="text-xl font-semibold text-white dark:text-black">{secretary.name}</h3>
              </div>
            ))}
          </div>
          <div className="flex flex-col w-full border-2 p-4 ">
            <h1 className="text-2xl font-bold text-center mt-3 mb-10 text-white dark:text-black">Treasurer</h1>
            {treasurer.map((treasurer, index) => (
              <div key={index} className="text-center">
                <Image
                  src={treasurer.photo}
                  alt={treasurer.name}
                  className="w-32 h-32 object-cover mx-auto mb-4 border-2"
                  width={320} // Provide the width of the image
                  height={320} // You might also need to provide the height depending on your requirements
                />
                <h3 className="text-xl font-semibold text-white dark:text-black">{treasurer.name}</h3>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-around">
          <div className="flex flex-col w-full border-2 p-4">
            <h1 className="text-2xl font-bold text-center mt-3 mb-12 text-white dark:text-black">Education & Training Comm.</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8">
              {educationTrainingComm.map((educationTrainingComm, index) => (
                <div key={index} className="text-center">
                  <Image
                    src={educationTrainingComm.photo}
                    alt={educationTrainingComm.name}
                    className="w-32 h-32 object-cover mx-auto mb-4 border-2"
                    width={320} // Provide the width of the image
                    height={320} // You might also need to provide the height depending on your requirements
                  />
                  <h3 className="text-xl font-semibold text-white dark:text-black">{educationTrainingComm.name}</h3>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-full border-2 p-4">
            <h1 className="text-2xl font-bold text-center mt-3 mb-12 text-white dark:text-black">Credit Committee</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8">
              {creditCommittee.map((creditCommittee, index) => (
                <div key={index} className="text-center">
                  <Image
                    src={creditCommittee.photo}
                    alt={creditCommittee.name}
                    className="w-32 h-32 object-cover mx-auto mb-4 border-2"
                    width={320} // Provide the width of the image
                    height={320} // You might also need to provide the height depending on your requirements
                  />
                  <h3 className="text-xl font-semibold text-white dark:text-black">{creditCommittee.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-around">
          <div className="flex flex-col w-full border-2 p-4">
            <h1 className="text-2xl font-bold text-center mt-3 mb-12 text-white dark:text-black">Gender Committee</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8">
              {genderCommittee.map((genderCommittee, index) => (
                <div key={index} className="text-center">
                  <Image
                    src={genderCommittee.photo}
                    alt={genderCommittee.name}
                    className="w-32 h-32 object-cover mx-auto mb-4 border-2"
                    width={320} // Provide the width of the image
                    height={320} // You might also need to provide the height depending on your requirements
                  />
                  <h3 className="text-xl font-semibold text-white dark:text-black">{genderCommittee.name}</h3>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-full border-2 p-4">
            <h1 className="text-2xl font-bold text-center mt-3 mb-12 text-white dark:text-black">Ethics Committee</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8">
              {ethicsCommittee.map((ethicsCommittee, index) => (
                <div key={index} className="text-center">
                  <Image
                    src={ethicsCommittee.photo}
                    alt={ethicsCommittee.name}
                    className="w-32 h-32 object-cover mx-auto mb-4 border-2"
                    width={320} // Provide the width of the image
                    height={320} // You might also need to provide the height depending on your requirements
                  />
                  <h3 className="text-xl font-semibold text-white dark:text-black">{ethicsCommittee.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col border-2 p-4">
          <h1 className="text-2xl font-bold text-center mt-3 mb-12 text-white dark:text-black">Mediation & Conciliation Comm.</h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8 ">
            {mediationConciliationComm.map((mediationConciliationComm, index) => (
              <div key={index} className="text-center">
                <Image
                  src={mediationConciliationComm.photo}
                  alt={mediationConciliationComm.name}
                  className="w-32 h-32 object-cover mx-auto mb-4 border-2"
                  width={320} // Provide the width of the image
                  height={320} // You might also need to provide the height depending on your requirements
                />
                <h3 className="text-xl font-semibold text-white dark:text-black">{mediationConciliationComm.name}</h3>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col border-2 p-4">
          <h1 className="text-2xl font-bold text-center mt-3 mb-12 text-white dark:text-black">Hired Management</h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8">
            {hiredManagement.map((hiredManagement, index) => (
              <div key={index} className="text-center">
                <Image
                  src={hiredManagement.photo}
                  alt={hiredManagement.name}
                  className="w-32 h-32 object-cover mx-auto mb-4 border-2 "
                  width={320} // Provide the width of the image
                  height={320} // You might also need to provide the height depending on your requirements
                />
                <h3 className="text-xl font-semibold text-white dark:text-black">{hiredManagement.name}</h3>
                <p className="text-white dark:text-black">{hiredManagement.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrganizationalChart;