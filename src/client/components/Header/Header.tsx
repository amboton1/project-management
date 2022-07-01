import logo from '../assets/logo.png'

const Header = () => {
  return (
    <header className="flex items-center bg-[#F7F8F9] pl-9 py-2">
        <img src={logo} alt="logo" />
        <span className="text-3xl font-bold	ml-4">Project Management</span>
    </header>
  )
}

export default Header;
