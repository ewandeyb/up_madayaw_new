// components/Updates.tsx
import React from 'react';

const updates = [
  {
    name: 'Launching',
    picture: '/img/Launching Pubmat Final.png',
    description: 'Launching of the AgriFood Systems Analytics Laboratory on September 7, 2023, 3:00 PM to 4:00 PM, via Zoom. The Laboratory is established to harness data analytics to facilitate informed decision-making, risk mitigation, supply chain optimization, and the promotion of sustainable agriculture. This is jointly initiated by the faculty and researchers of the School of Management and College of Science and Mathematics from the University of the Philippines Mindanao. Its first project is “Developing a multi-criteria adoptability index for identifying and prioritizing micronutrient-rich neglected and underutilized crops”, an entry to the Harvest for Health (H4H) Crop Challenge, and is funded by the Foundation for Food and Agricultural Research (FFAR) with additional support from the UPSTREAM Foundation Inc.',
  },
  {
    name: 'Launching',
    picture: '/img/Launching Pubmat Final.png',
    description: 'Launching of the AgriFood Systems Analytics Laboratory on September 7, 2023, 3:00 PM to 4:00 PM, via Zoom. The Laboratory is established to harness data analytics to facilitate informed decision-making, risk mitigation, supply chain optimization, and the promotion of sustainable agriculture. This is jointly initiated by the faculty and researchers of the School of Management and College of Science and Mathematics from the University of the Philippines Mindanao. Its first project is “Developing a multi-criteria adoptability index for identifying and prioritizing micronutrient-rich neglected and underutilized crops”, an entry to the Harvest for Health (H4H) Crop Challenge, and is funded by the Foundation for Food and Agricultural Research (FFAR) with additional support from the UPSTREAM Foundation Inc.',
  },
  {
    name: 'Launching',
    picture: '/img/Launching Pubmat Final.png',
    description: 'Launching of the AgriFood Systems Analytics Laboratory on September 7, 2023, 3:00 PM to 4:00 PM, via Zoom. The Laboratory is established to harness data analytics to facilitate informed decision-making, risk mitigation, supply chain optimization, and the promotion of sustainable agriculture. This is jointly initiated by the faculty and researchers of the School of Management and College of Science and Mathematics from the University of the Philippines Mindanao. Its first project is “Developing a multi-criteria adoptability index for identifying and prioritizing micronutrient-rich neglected and underutilized crops”, an entry to the Harvest for Health (H4H) Crop Challenge, and is funded by the Foundation for Food and Agricultural Research (FFAR) with additional support from the UPSTREAM Foundation Inc.',
  },
  // Add more updates as needed
];

const Updates = () => {
  return (
    <section className="bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-10">Latest Updates</h2>
        <div className="space-y-8">
          {updates.map((updates, index) => (
            <div key={index} className="flex items-center gap-6 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
              <img
                src={updates.picture}
                alt={updates.name}
                className="w-[400px] h-[410px] object-cover"
              />
              <div>
                <h3 className="text-3xl font-semibold text-gray-900 mb-3 dark:text-gray-100">{updates.name}</h3>
                <p className="text-gray-500 dark:text-gray-400">{updates.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Updates;