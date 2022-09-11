import './team.scss';

import React from 'react'
import { globalUser } from '../../Context/HomeContext';
import TeamComponent from '../../component/TeamComponent/TeamComponent';

const Team = () => {
    const {isDark} = globalUser();
    document.title = "Team";
    localStorage.setItem("page","team/myTeam"); 
  return (
    <div className={`teamPage ${isDark ?'dark' : '' } `}>
        <TeamComponent/>
    </div>
  )
}

export default Team