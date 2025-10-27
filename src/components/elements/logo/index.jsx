import React from 'react';
import Logo from '../../../assets/favicon/logoALMaze.svg';
import '../../../common/style/root.css';

const LogoMark = () => {
  const handleLogoClick = (e) => {
    e.preventDefault();
    
    const isHomepage = window.location.pathname === '/';
    
    // If already at top, refresh immediately
    if (window.pageYOffset === 0) {
      if (isHomepage) {
        window.location.reload();
      } else {
        window.location.href = '/';
      }
      return;
    }
    
    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Listen for scroll completion
    const checkScroll = () => {
      if (window.pageYOffset === 0) {
        window.removeEventListener('scroll', checkScroll);
        if (isHomepage) {
          window.location.reload();
        } else {
          window.location.href = '/';
        }
      }
    };
    
    // Check scroll position periodically
    window.addEventListener('scroll', checkScroll);
    
    // Fallback timeout in case scroll event doesn't fire
    setTimeout(() => {
      window.removeEventListener('scroll', checkScroll);
      if (window.pageYOffset === 0) {
        if (isHomepage) {
          window.location.reload();
        } else {
          window.location.href = '/';
        }
      }
    }, 1000);
  };

  return (
    <a
      href="/"
      className="Center-Objects No-Select"
      onClick={handleLogoClick}
    >
      <img
        src={Logo}
        className="Logo-Marks No-Select"
        alt="Logo"
      />
    </a>
  );
};

export default LogoMark;