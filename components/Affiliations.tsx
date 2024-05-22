// components/Affiliations.tsx
import React from 'react';

const affiliations = [
  {
    name: 'University of the Philippines Mindanao',
    logo: '/img/logo.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porta lorem mollis aliquam ut. Turpis massa tincidunt dui ut ornare lectus sit amet. Sed faucibus turpis in eu mi bibendum. In dictum non consectetur a erat. Dignissim enim sit amet venenatis urna cursus eget nunc scelerisque. Varius duis at consectetur lorem donec massa sapien faucibus. Sit amet venenatis urna cursus eget. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Sed velit dignissim sodales ut eu sem integer. Sed augue lacus viverra vitae congue eu consequat ac. Convallis posuere morbi leo urna molestie at elementum eu facilisis.',
  },
  {
    name: 'University of the Philippines Mindanao',
    logo: '/img/logo.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porta lorem mollis aliquam ut. Turpis massa tincidunt dui ut ornare lectus sit amet. Sed faucibus turpis in eu mi bibendum. In dictum non consectetur a erat. Dignissim enim sit amet venenatis urna cursus eget nunc scelerisque. Varius duis at consectetur lorem donec massa sapien faucibus. Sit amet venenatis urna cursus eget. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Sed velit dignissim sodales ut eu sem integer. Sed augue lacus viverra vitae congue eu consequat ac. Convallis posuere morbi leo urna molestie at elementum eu facilisis.',
  },
  {
    name: 'University of the Philippines Mindanao',
    logo: '/img/logo.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porta lorem mollis aliquam ut. Turpis massa tincidunt dui ut ornare lectus sit amet. Sed faucibus turpis in eu mi bibendum. In dictum non consectetur a erat. Dignissim enim sit amet venenatis urna cursus eget nunc scelerisque. Varius duis at consectetur lorem donec massa sapien faucibus. Sit amet venenatis urna cursus eget. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Sed velit dignissim sodales ut eu sem integer. Sed augue lacus viverra vitae congue eu consequat ac. Convallis posuere morbi leo urna molestie at elementum eu facilisis.',
  },
  // Add more affiliations as needed
];

const Affiliations = () => {
  return (
    <section className="py-8 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Affiliations</h2>
        <div className="space-y-8">
          {affiliations.map((affiliation, index) => (
            <div key={index} className="flex items-center gap-6 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
              <img
                src={affiliation.logo}
                alt={affiliation.name}
                className="w-30 h-24 object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 dark:text-gray-100">{affiliation.name}</h3>
                <p className="text-gray-500 dark:text-gray-400">{affiliation.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Affiliations;