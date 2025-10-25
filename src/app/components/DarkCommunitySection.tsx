import React from 'react';
import DarkMetricCard from './DarkMetricCard';
import { FaStar, FaUserAlt, FaDiscord } from 'react-icons/fa';

const DarkCommunitySection: React.FC = () => {
  const handleStarClick = () => console.log('Star on GitHub clicked');
  const handleRegisterClick = () => console.log('Register clicked');
  const handleDiscordClick = () => console.log('Join Discord clicked');

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8  text-blue-600">
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-12 max-w-5xl">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Join the <span className='text-blue-600'>Community</span>
          </h1>
          <p className="text-lg  text-slate-600">
            <span className="font-semibold">roadmap.sh</span> is the 6th most starred project on GitHub and is visited hundreds of thousands of developers every month.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <DarkMetricCard
            value="342K"
            label="GitHub Stars"
            icon={<FaStar />}
            badgeText="+Rank 6th out 28M+"
            monthlyIncrease="+50K every month"
            buttonText="Star us on GitHub"
            onButtonClick={handleStarClick}
          />

          <DarkMetricCard
            value="+2.1M"
            label="Registered Users"
            icon={<FaUserAlt />}
            badgeText="+90k"
            monthlyIncrease="every month"
            buttonText="Register yourself"
            onButtonClick={handleRegisterClick}
          />

          <DarkMetricCard
            value="41K"
            label="Discord Members"
            icon={<FaDiscord />}
            badgeText="+2k"
            monthlyIncrease="every month"
            buttonText="Join on Discord"
            onButtonClick={handleDiscordClick}
          />
        </div>
      </div>
    </div>
  );
};

export default DarkCommunitySection;