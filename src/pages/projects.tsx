import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_PROJECTS, OPEN_PROJECTS } from 'src/redux/actions/actions';

const Projects: React.FC = () => {
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: OPEN_PROJECTS });
    return () => dispatch({ type: CLOSE_PROJECTS })
  }, []);

  return (
    <div className='flex-full'>
      <div>

      </div>
    </div>
  );
};

export default Projects;