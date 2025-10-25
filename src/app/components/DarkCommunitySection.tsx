import React from 'react';
import Image from 'next/image';

const DarkCommunitySection: React.FC = () => {
  const handleStarClick = () => console.log('Star on GitHub clicked');
  const handleRegisterClick = () => console.log('Register clicked');
  const handleDiscordClick = () => console.log('Join Discord clicked');

  return (
    <div className="min-h-screen bg-slate-100 py-16 px-4 sm:px-6 lg:px-8  text-blue-600">
      <div className="w-full mx-auto">
        
        <header className="mb-12 w-full text-center">
          <h1 className="text-5xl font-sans font-bold text-slate-900 mb-4">
            Join the <span className='text-blue-600'>Community</span>
          </h1>
          <p className="text-lg  text-slate-600 mt-7">
            <a href='/'><span className="font-semibold hover:text-blue-600">UAARN </span></a>is the trusted website for learners.
          </p>
        </header>

        <div className='flex w-full items-center justify-between px-45'>
          <div className='flex border-r border-l border-slate-400 py-5 px-10 h-65'>
            <div className='text-center'>
                <p className='font-sans text-xl font-bold'>Among 1% of Top Developers</p>
                <p className='text-5xl mt-5 font-extrabold text-black'>487</p>
                <p>Stars on GitHub</p>
                <div className='flex items-center justify-between px-3 mt-5'>
                  <a href="https://github.com/maryamarif24">
                    <Image
                      src="/PFP-01.jpg"
                      alt=''
                      width={70}
                      height={70}
                      className='rounded-full'
                    />
                  </a>
                  <a href="https://github.com/TahirahWebDev">
                    <Image
                      src="/tahirah.jpg"
                      alt=''
                      width={70}
                      height={70}
                      className='rounded-full'
                    />
                  </a>
                  <a href="https://github.com/Mehak-Akram">
                    <Image
                      src="/mehak.jpg"
                      alt=''
                      width={70}
                      height={70}
                      className='rounded-full'
                    />
                  </a>
                </div>
            </div>
          </div>
          
          <div className='border-r border-slate-400 py-5 px-20 h-65 justify-between items-center'>
            <div className='text-center'>
              <p className='font-sans text-xl font-bold'>+1.2K Satisfied Users</p>
              <p className='text-5xl mt-5 font-extrabold text-black'>1.2K</p>
              <p>Registered Users</p>
            </div>
            <div className='border bg-blue-600 px-5 py-2 mt-5 text-center text-2xl font-sans rounded-2xl text-white'>
              <a href="/sign-in">
                Register Yourself
              </a>
            </div>
          </div>

          <div className='py-5 px-15 h-65 justify-between items-center border-r border-slate-400'>
            <div className='text-center'>
              <p className='font-sans text-xl font-bold'>+1K Linkedin Followers</p>
              <p className='text-5xl mt-5 font-extrabold text-black'>1.2K</p>
              <p>LinkedIn Followers</p>
            </div>
            <div className='border bg-blue-600 px-5 py-2 mt-5 text-center text-2xl font-sans rounded-2xl text-white'>
              <a href="https://www.linkedin.com/company/nexa-agent/">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DarkCommunitySection;