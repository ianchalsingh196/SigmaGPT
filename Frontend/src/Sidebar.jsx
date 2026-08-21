import React from 'react'
import "./Sidebar.css";
function Sidebar() {
  return (
    <section className='sidebar'>
      {/* New Chat Button */}
      <button>
        <img src='src/assets/blacklogo.png' alt='gpt logo' className='logo'></img>
        <span><i className="fa-solid fa-pen-to-square"></i></span>
      </button>
      {/* History */}

      <ul className='history'>
        <li>thread 1</li>
        <li>thread 2</li>
        <li>thread 3</li>
      </ul>

      {/* sign */}
      <div className="sign">
        <p>By ApnaCollege &hearts; </p>
      </div>
    </section>
  )
}

export default Sidebar;
