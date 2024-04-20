import Footer from './Footer'
import './Header.css'
import { useNavigate } from 'react-router-dom';

function Header() {

let navigate = useNavigate();

return (
    <>
      <div className='area'>
        <div className='logo'>
          <div>
            <h1 onClick={()=>{navigate('/Instagram-Clone-Coding/')}}>Pilstagram</h1>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default Header