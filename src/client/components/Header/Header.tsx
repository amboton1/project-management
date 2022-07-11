import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center bg-[#F7F8F9] pl-9 py-2">
        <img className='cursor-pointer' src={logo} alt="logo" onClick={() => navigate('/')} />
        <span className="text-3xl font-bold	ml-4">Project Management</span>
    </header>
  )
}

export default Header;
