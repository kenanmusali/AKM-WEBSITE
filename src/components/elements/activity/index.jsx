import React, { useState, useEffect } from 'react';
import ChevronCircleLeftActiveImg from '../../../assets/svg/chevron.circle.left.active.svg';
import ChevronCircleRightActiveImg from '../../../assets/svg/chevron.circle.right.active.svg';
import CircleCloseImg from '../../../assets/svg/close.bubble.svg';
import xSocialImage from '../../../assets/svg/x.social.svg';
import igSocialImage from '../../../assets/svg/ig.social.svg';
import inSocialImage from '../../../assets/svg/in.social.svg';
import fbSocialImage from '../../../assets/svg/fb.social.svg';

const Activity = () => {
  const [ArrayData, setArrayData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [shouldHideNav, setShouldHideNav] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);


  const fixImageUrl = (url) => {
    if (!url) return '';
    

    if (url.startsWith('http')) {
      return url;
    }
    
   
    if (url.startsWith('/image/')) {
      const imagePath = url.substring(1); 
      return `https://raw.githubusercontent.com/Absheron-Career-Portal/STORAGE/refs/heads/main/public/${imagePath}`;
    }
    

    return url;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/Absheron-Career-Portal/STORAGE/refs/heads/main/public/data/activity.json');
        const data = await response.json();
        
 
        const fixedData = data.map(item => ({
          ...item,
          image: fixImageUrl(item.image),
          additionalImages: item.additionalImages ? item.additionalImages.map(img => fixImageUrl(img)) : [],
          dateImage: fixImageUrl(item.dateImage),
          linkImage: fixImageUrl(item.linkImage)
        }));
        
        setArrayData(fixedData); 
      } catch (error) {
        console.error('Error fetching activity data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 576) setItemsPerPage(1);
      else if (width < 768) setItemsPerPage(2);
      else if (width < 992) setItemsPerPage(3);
      else if (width < 1200) setItemsPerPage(4);
      else setItemsPerPage(6);

      setShouldHideNav(ArrayData.length === 6 && width >= 1200);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [ArrayData.length]);


  useEffect(() => {
    if (!isHovered && !shouldHideNav) {
      const interval = setInterval(() => goToNext(), 6000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, isHovered, itemsPerPage, shouldHideNav]);

  
  useEffect(() => {
    const aswContainer = document.querySelector('.asw-container');
    if (aswContainer) {
      aswContainer.style.display = expandedCard ? 'none' : '';
    }
  }, [expandedCard]);

  const goToPrev = () => {
    setCurrentIndex(prev => (prev === 0 ? ArrayData.length - itemsPerPage : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev >= ArrayData.length - itemsPerPage ? 0 : prev + 1));
  };

  const handleCardClick = (card) => {
    setExpandedCard(card);
    setSelectedImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseExpanded = () => {
    setExpandedCard(null);
    document.body.style.overflow = 'auto';
  };

  const handleNextImage = () => {
    if (expandedCard?.additionalImages) {
      setSelectedImageIndex(prev =>
        prev === expandedCard.additionalImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (expandedCard?.additionalImages) {
      setSelectedImageIndex(prev =>
        prev === 0 ? expandedCard.additionalImages.length - 1 : prev - 1
      );
    }
  };

  const visibleItems = ArrayData.slice(currentIndex, currentIndex + itemsPerPage);
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= ArrayData.length - itemsPerPage;

  return (
    <div
      className="section-column"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p className="Title-Header">Kariyera və KSM fəaliyyətlərimiz</p>

      <div className="Section-Card-Group">
        <div className="Card-Left No-Select">
          <button onClick={goToPrev} className="nav-button">
            <img src={ChevronCircleLeftActiveImg} alt="Previous" className="success-nav-icon" />
          </button>
        </div>

        <div className="Section-Card">
          {visibleItems.map((item) => (
            <div
              className="Cards Main-Card"
              key={item.id}
              onClick={() => handleCardClick(item)}
            >
              <div className="Cards-Item">
                <img 
                  src={item.image} 
                  className="No-Select Section-Images" 
                  alt={item.title}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                  }}
                />
              </div>
              <div className="Cards-Item">
                <div className="Cards-Item-Bio-Group">
                  <div className="Cards-Item-Bio">
                    {item.dateImage && <img src={item.dateImage} className="No-Select" alt="Date" />}
                    <p>{item.date}</p>
                  </div>
                  <div className="Cards-Item-Bio">
                    {/* {item.linkImage && <img src={item.linkImage} className="No-Select" alt="Images" />}
                    <p>{item.imageTotal}</p> */}
                  </div>
                </div>
              </div>
              <div className="Cards-Item">
                <p>{item.title}</p>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={`Card-Right ${shouldHideNav ? 'hide' : ''} No-Select`}>
          <button onClick={goToNext} className="nav-button">
            <img src={ChevronCircleRightActiveImg} alt="Next" className="success-nav-icon" />
          </button>
        </div>
      </div>

      {expandedCard && (
        <div className="expanded-card-overlay">
          <div className="expanded-card-content">
            <button className="close-expanded" onClick={handleCloseExpanded}>
              <img src={CircleCloseImg} alt="Close" />
            </button>

            <div className="expanded-card-main">
              <div className="expanded-card-image">
                <img
                  src={expandedCard.additionalImages[selectedImageIndex]}
                  alt={expandedCard.title}
                  className="expanded-card-image-main"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
                  }}
                />
                {expandedCard.additionalImages.length > 1 && (
                  <>
                    <button className="image-nav prev" onClick={handlePrevImage}>
                      <img src={ChevronCircleLeftActiveImg} alt="Previous" />
                    </button>
                    <button className="image-nav next" onClick={handleNextImage}>
                      <img src={ChevronCircleRightActiveImg} alt="Next" />
                    </button>
                  </>
                )}
              </div>

              <div className="expanded-card-details">
                <div className="expanded-card-header">
                  <h3>{expandedCard.title}</h3>
                  <div className="expanded-card-meta">
                    <div className="meta-item">
                      {expandedCard.dateImage && <img src={expandedCard.dateImage} alt="Date" />}
                      <span>{expandedCard.date}</span>
                    </div>
                    <div className="meta-item">
                      {expandedCard.linkImage && <img src={expandedCard.linkImage} alt="Images" />}
                      <span>{expandedCard.imageTotal}</span>
                    </div>
                  </div>
                </div>

                <div className="expanded-card-description">
                  <p>{expandedCard.extendedDescription}</p>
                </div>

                <div className="CardSocialCard">
                  <p>Yeniliklərə bağlı bizi sosial şəbəkələrdən izləyin:</p>
                  <div className="CardSocial">
                    <img src={igSocialImage} alt="Instagram" />
                    <img src={fbSocialImage} alt="Facebook" />
                    <img src={inSocialImage} alt="LinkedIn" />
                    <img src={xSocialImage} alt="X" />
                  </div>
                </div>

                {expandedCard.additionalImages.length > 1 && (
                  <div className="expanded-card-thumbnails">
                    {expandedCard.additionalImages.map((img, index) => (
                      <div
                        key={index}
                        className={`thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
                        onClick={() => setSelectedImageIndex(index)}
                      >
                        <img 
                          src={img} 
                          alt={`Thumbnail ${index + 1}`} 
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/100x75?text=Image+Not+Found';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activity;