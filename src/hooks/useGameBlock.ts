import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const useGameBlock = () => {
  const navigate = useNavigate();

  useEffect(() => {
    history.pushState(null, '', location.pathname);

    const handleClickBrowserBackBtn = () => {
      navigate('/topic');
    };

    window.addEventListener('popstate', handleClickBrowserBackBtn);

    return () => {
      window.removeEventListener('popstate', handleClickBrowserBackBtn);
    };
  }, [navigate]);
};

export default useGameBlock;
