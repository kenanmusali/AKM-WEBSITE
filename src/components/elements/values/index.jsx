import React, { useState, useEffect } from 'react';
import ChevronCircleLeftActiveImg from '../../../assets/svg/chevron.circle.left.active.svg';
import ChevronCircleRightActiveImg from '../../../assets/svg/chevron.circle.right.active.svg';

import ArrayData1Img from '../../../assets/svg/checkmark.shield.svg';
import ArrayData2Img from '../../../assets/svg/brain.svg';
import ArrayData3Img from '../../../assets/svg/megaphone.svg';
import ArrayData4Img from '../../../assets/svg/graduationcap.svg';
import ArrayData5Img from '../../../assets/svg/lock.svg';
import ArrayData6Img from '../../../assets/svg/leaf.svg';
import ArrayData7Img from '../../../assets/svg/pin.svg';


const Values = () => {
  const ArrayData = [

  { id: 0, image: ArrayData1Img, title: 'Quality', description: 'Services are delivered with exceptional standards and meticulous attention to detail.' },
  { id: 1, image: ArrayData2Img, title: 'Innovation', description: 'New ideas and advanced technologies are embraced to ensure forward-thinking solutions.' },
  { id: 2, image: ArrayData3Img, title: 'Honesty', description: 'Every interaction is built on transparency, truthfulness, and ethical behavior.' },
  { id: 3, image: ArrayData4Img, title: 'Professionalism', description: 'Work is conducted with respect, efficiency, and unwavering dedication to standards.' },
  { id: 4, image: ArrayData5Img, title: 'Security', description: 'Client data and processes are protected through strict and reliable safeguards.' },
  { id: 5, image: ArrayData6Img, title: 'Environmental Care', description: 'Operations are designed to minimize environmental impact and promote sustainability.' },
  { id: 6, image: ArrayData7Img, title: 'Accountability', description: 'Commitments are honored with full responsibility for outcomes and actions.' },




  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [shouldHideNav, setShouldHideNav] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 576) {
        setItemsPerPage(1);
      } else if (width < 768) {
        setItemsPerPage(2);
      } else if (width < 992) {
        setItemsPerPage(3);
      } else if (width < 1040) {
        setItemsPerPage(4);
      } else if (width < 1100) {
        setItemsPerPage(5);
      } else if (width < 1200) {
        setItemsPerPage(6);
      } else {
        setItemsPerPage(7);
      }


      setShouldHideNav(ArrayData.length === 7 && width >= 1200);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [ArrayData.length]);

  useEffect(() => {
    if (!isHovered && !shouldHideNav) {
      const interval = setInterval(() => {
        goToNext();
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, isHovered, itemsPerPage, shouldHideNav]);

  const goToPrev = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? ArrayData.length - itemsPerPage : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex =>
      prevIndex >= ArrayData.length - itemsPerPage ? 0 : prevIndex + 1
    );
  };

  const visibleItems = ArrayData.slice(currentIndex, currentIndex + itemsPerPage);
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= ArrayData.length - itemsPerPage;

  return (
    <div className="section-column" onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>

      <p className='Title-Header'>Our values</p>
      <p className='section-description'>By instilling the following principles in all our employees, we strive to contribute positively not only to career development but also to the growth of the logistics industry and society in our country.</p>

      <div className="Section-Card-Group">
        <div className={`Card-Left ${shouldHideNav ? 'hide' : ''} No-Select`}>
          <button onClick={goToPrev} className="nav-button">
            <img
              src={isAtStart ? ChevronCircleLeftActiveImg : ChevronCircleLeftActiveImg}
              alt="Previous"
              className="success-nav-icon"
            />
          </button>
        </div>

        <div className="Section-Card">
          {visibleItems.map((item) => (
            <div className="Cards Main-Card" key={item.id}>
              <div className="Cards-Item">
                <img src={item.image} className='No-Select Section-Icons' />
                <p>{item.title}</p>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={`Card-Right ${shouldHideNav ? 'hide' : ''} No-Select`}>
          <button onClick={goToNext} className="nav-button">
            <img
              src={isAtEnd ? ChevronCircleRightActiveImg : ChevronCircleRightActiveImg}
              alt="Next"
              className="success-nav-icon"
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Values;