import React, { useState } from 'react';

const Projects: React.FC = () => {
  const [page, setPage] = useState(1);

  return (
    <div className='flex-full'>
      <p>PROJECTS</p>
    </div>
  );
};

export default Projects;