import { useEffect, useState, useContext } from "react";

import Button from '@mui/material/Button'

import SkillDisplay from "../../components/SkillDisplay/SkillDisplay";
import CreateSkillModal from "../../components/CreateSkillModal/CreateSkillModal";


function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateSkill = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  useEffect(() => {

    }, []); 
  return (
    <>
    <section style={{height: '25dvh'}}>
      <Button variant="contained" color="primary" onClick={handleCreateSkill}>
        Create a New Skill
      </Button>
      <CreateSkillModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
    <SkillDisplay />
    </>
  );
}

export default LandingPage;