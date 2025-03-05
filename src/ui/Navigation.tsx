import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <StyledWrapper>
      <nav className="nav-container">
        <button 
          className={location.pathname === '/anime' ? 'active' : ''} 
          onClick={() => handleNavigation('/anime')}
        >
          Все аниме
        </button>
        
        <button 
          className={location.pathname === '/genres' ? 'active' : ''} 
          onClick={() => handleNavigation('/genres')}
        >
          Жанры
        </button>
        
        <button 
          className={location.pathname === '/franchises' ? 'active' : ''} 
          onClick={() => handleNavigation('/franchises')}
        >
          Франшизы
        </button>
      </nav>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .nav-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-left: 0.5rem;
  }

  button {
    background: none;
    border: none;
    padding: 1rem;
    color: #808191;
    cursor: pointer;
    text-align: left;
    transition: color 0.3s ease;

    &:hover {
      color: #6C5DD3;
    }

    &.active {
      color: #6C5DD3;
    }
  }
`;

export default Navigation;
