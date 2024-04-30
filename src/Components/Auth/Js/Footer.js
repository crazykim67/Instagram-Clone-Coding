import '../Css/Footer.css';
import Introduce from '../../../introduce.js';
import { useState } from 'react';

function Footer(){
  
  let [introduce] = useState(Introduce);

  return(
    <div className='authFooter'>
      <div className='baseDiv overflowVis'>
        <div className='introduceArea overflowVis'>

          <div className='introduce overflowVis'>
            {
              introduce.map((a, i) => {
                return(
                <div key={i} className='introduce-li overflowVis'>
                  <a>
                    <span className='info-li'>
                      {a.name}
                    </span>
                  </a>
                </div>
                )
              })
            }
          </div>

          <div className='info overflowVis'>
            <div className='infoDiv overflowVis'>
              <span className='info-li'>
                © 2024 Pilnstagram from Meta
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Footer
