import {Outlet} from 'react-router-dom'

function About(){
  return(
    <div>
      회사정보임~
      <Outlet></Outlet>
    </div>
  )
}

export default About;