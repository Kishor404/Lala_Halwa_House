import React from 'react';
import './RIT_CSBS.css';
import male_profile from '../../Assets/Footer/male_profile.png';
import female_profile from '../../Assets/Footer/female_profile.png';

function RIT_CSBS() {
  const TeamMember = ({ name, role, profile }) => (
    <div className="rit-team-member">
        <div className="rit-avatar">
            <img src={profile} alt='profile'/>
        </div>
        <p className='rit-name'>{name}</p>
        <p className='rit-role'>{role}</p>
    </div>
  );

  const developers = [
    { name: 'Gopikaran R', role: 'Frontend Web Developer' },
    { name: 'Saravana Kumar J', role: 'Frontend Web Developer' },
    { name: 'Kishor T', role: 'Fullstack Developer\n( Team Lead )' },
    { name: 'Hari Krishna', role: 'Frontend Web Developer' },
    { name: 'Gokul Arunkumar', role: 'Frontend Web Developer' }
  ];

  const designers = [
    { name: 'Harini', role: 'Designer' },
    { name: 'Varshini P', role: 'Designer' },
    { name: 'Harsetha V', role: 'Designer' }
  ];

  return (
    <div className="rit-container">
      <p className='rit-clg-name'>Ramco Institute Of Technology</p>
      <p className='rit-dept-name'>Department Of Computer Science And Business Systems</p>

      <section>
        <p className="rit-section-title">Developers</p>
        <div className="rit-team-grid">
          {developers.map((dev, idx) => (
            <TeamMember key={idx} name={dev.name} role={dev.role} profile={male_profile}/>
          ))}
        </div>
        
      </section>

      <section>
        <p className="rit-section-title">Designers</p>
        <div className="rit-team-grid">
          {designers.map((designer, idx) => (
            <TeamMember key={idx} name={designer.name} role={designer.role} profile={female_profile}/>
          ))}
        </div>
      </section>
    </div>
  );
}

export default RIT_CSBS;
