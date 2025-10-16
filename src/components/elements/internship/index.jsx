import React, { useState, useEffect } from 'react';
import ChevronCircleLeftActiveImg from '../../../assets/svg/chevron.circle.left.active.svg';
import ChevronCircleRightActiveImg from '../../../assets/svg/chevron.circle.right.active.svg';

const Internship = () => {
  const ArrayData = [
    { id: 0, title: 'Baş ofis', description: 'Azərbaycan Respublikası, Bakı şəhəri, AZ1063, Qaradağ rayonu, Lökbatan qəsəbəsi, Xocasən yolu 57' },
    { id: 1, title: 'Təlim və İnkişaf Mərkəzi', description: 'Azərbaycan Respublikası, Bakı şəhəri, AZ1063, Qaradağ rayonu, Lökbatan qəsəbəsi, Xocasən yolu 57' },
    { id: 2, title: 'İnsan Resursları Departamenti', description: 'Azərbaycan Respublikası, Bakı şəhəri, AZ1063, Qaradağ rayonu, Lökbatan qəsəbəsi, Xocasən yolu 57' },
    { id: 3, title: 'Logistika Əməliyyatları Sahəsi', description: 'Azərbaycan Respublikası, Bakı şəhəri, AZ1063, Qaradağ rayonu, Lökbatan qəsəbəsi, Xocasən yolu 57' },
    { id: 4, title: 'İnnovasiya və Texnologiyalar Şöbəsi', description: 'Azərbaycan Respublikası, Bakı şəhəri, AZ1063, Qaradağ rayonu, Lökbatan qəsəbəsi, Xocasən yolu 57' },
    { id: 5, title: 'Mentorluq və Karyera Dəstəyi Ofisi', description: 'Azərbaycan Respublikası, Bakı şəhəri, AZ1063, Qaradağ rayonu, Lökbatan qəsəbəsi, Xocasən yolu 57' },
    { id: 6, title: 'Logistika Təcrübə Sahəsi', description: 'Azərbaycan Respublikası, Bakı şəhəri, AZ1063, Qaradağ rayonu, Lökbatan qəsəbəsi, Xocasən yolu 57' },
    { id: 7, title: 'İdarəetmə və Planlaşdırma Bölməsi', description: 'Azərbaycan Respublikası, Bakı şəhəri, AZ1063, Qaradağ rayonu, Lökbatan qəsəbəsi, Xocasən yolu 57' },
    { id: 9, title: 'Layihə İcra Mərkəzi', description: 'Azərbaycan Respublikası, Bakı şəhəri, AZ1063, Qaradağ rayonu, Lökbatan qəsəbəsi, Xocasən yolu 57' },
    { id: 10, title: 'Analitika və Hesabatlıq Şöbəsi', description: 'Azərbaycan Respublikası, Bakı şəhəri, AZ1063, Qaradağ rayonu, Lökbatan qəsəbəsi, Xocasən yolu 57' },
    { id: 11, title: 'Stok və Anbar İdarəetməsi', description: 'Azərbaycan Respublikası, Bakı şəhəri, AZ1063, Qaradağ rayonu, Lökbatan qəsəbəsi, Xocasən yolu 57' },
    { id: 12, title: 'Təcrübəçilər üçün Qəbul və Tanışlıq Mərkəzi', description: 'Azərbaycan Respublikası, Bakı şəhəri, AZ1063, Qaradağ rayonu, Lökbatan qəsəbəsi, Xocasən yolu 57' },
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
      } else if (width < 1200) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(5);
      }

      setShouldHideNav(ArrayData.length === 5 && width >= 1200);
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

      <p className='Title-Header'>Internship</p>
      <p className='section-description'>By instilling the following principles in all our employees, we strive to make a positive contribution not only to their careers, but also to the development of the Logistics industry and society in our country.</p>

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

export default Internship;