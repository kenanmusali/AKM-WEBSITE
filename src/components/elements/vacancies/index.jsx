import React, { useState, useEffect } from 'react';
import ArrayData1Img from '../../../assets/svg/person.2.svg';
import ArrayData1Svg from '../../../assets/svg/calendar.svg';
import ArrayData0Svg from '../../../assets/svg/clock.svg';
import ArrayData2Svg from '../../../assets/svg/location.svg';
import ArrayData3Svg from '../../../assets/svg/suitcase.svg';
import SortColumnImage from '../../../assets/svg/slider.horizontal.below.rectangle.svg';
import SortRowImage from '../../../assets/svg/slider.horizontal.below.square.fill.and.square.svg';
import ClockImage from '../../../assets/svg/clock.arrow.circlepath.svg';
import CloseImage from '../../../assets/svg/close.bubble.svg';
import EyeImage from '../../../assets/svg/eye.svg';
import SearchImage from '../../../assets/svg/magnifyingglass.svg';

const Vacancies = () => {
    const [isColumnLayout, setIsColumnLayout] = useState(true);
    const [animationKey, setAnimationKey] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        profession: '',
        mobile: '',
        email: '',
        cv: null,
        cvText: '',
        linkedin: ''
    });

    const [isSortedByDate, setIsSortedByDate] = useState(false);
    const [displayedData, setDisplayedData] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [itemsToShow, setItemsToShow] = useState(10);
    const [jobDescriptions, setJobDescriptions] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [originalArrayData, setOriginalArrayData] = useState([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isCompactSortGroup, setIsCompactSortGroup] = useState(false); // NEW STATE FOR WIDTH TOGGLE

    // Fetch career data from GitHub
    useEffect(() => {
        const fetchCareerData = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/Absheron-Career-Portal/STORAGE/refs/heads/main/public/data/career.json');
                const data = await response.json();
                
                // Transform the data to match your component's structure
                const transformedData = data.map(item => ({
                    id: item.id,
                    EyeImage: EyeImage,
                    view: item.view?.toString() || '0',
                    image: ArrayData1Img,
                    title: item.title || '',
                    expireDateImage: ArrayData0Svg,
                    expireDate: item.expireDate || '',
                    dateImage: ArrayData1Svg,
                    date: item.date || '',
                    locationImage: ArrayData2Svg,
                    location: item.location || '',
                    type: item.type || '',
                    typeImage: ArrayData3Svg,
                    descriptionKey: item.description ? item.description.split('/').pop().replace('.txt', '') : '',
                    link: item.link || '#'
                }));

                setOriginalArrayData(transformedData);
                setDisplayedData(transformedData.slice(0, itemsToShow));
            } catch (error) {
                console.error('Error fetching career data:', error);
                setIsLoading(false);
            }
        };

        fetchCareerData();
    }, []);

    // Load job descriptions
    useEffect(() => {
        const loadJobDescriptions = async () => {
            if (originalArrayData.length === 0) return;

            try {
                const descriptions = {};

                for (const job of originalArrayData) {
                    try {
                        // Check job range to decide local or remote source
                        if (job.id >= 0 && job.id <= 10) {
                            // ✅ LOCAL LOAD (for 0–10)
                            if (job.descriptionKey) {
                                const response = await import(`../../../assets/docs/${job.descriptionKey}.txt`);
                                const text = await fetch(response.default).then(res => res.text());
                                descriptions[job.id] = text;
                            } else {
                                descriptions[job.id] = "Description not available.";
                            }
                        } else {
                            //  REMOTE LOAD (for 11, 12, 13, etc.)
                            let descriptionPath = job.descriptionKey;

                            // Handle specific edge cases for 11–13
                            if (job.id === 11) descriptionPath = 'logistikameneceri';
                            if (job.id === 12) descriptionPath = 'logistikasatismeneceri';
                            if (job.id === 13) descriptionPath = 'juyj';

                            const fileUrl = `https://raw.githubusercontent.com/Absheron-Career-Portal/STORAGE/refs/heads/main/public/docs/${descriptionPath}.txt`;
                            const response = await fetch(fileUrl);

                            if (response.ok) {
                                const text = await response.text();
                                descriptions[job.id] = text;
                            } else {
                                descriptions[job.id] = "Təsvir tapılmadı və ya mövcud deyil.";
                            }
                        }
                    } catch (error) {
                        console.error(`Error loading description for job ${job.id}:`, error);
                        descriptions[job.id] = "Təsvir yüklənərkən xəta baş verdi.";
                    }
                }

                setJobDescriptions(descriptions);
                setIsLoading(false);
            } catch (error) {
                console.error("Error loading job descriptions:", error);
                setIsLoading(false);
            }
        };

        loadJobDescriptions();
    }, [originalArrayData]);

    // Search functionality
    useEffect(() => {
        if (searchTerm.trim() === '') {
            // If search is empty, show normal data
            if (isSortedByDate) {
                const firstItem = originalArrayData.find(item => item.id === 0) || originalArrayData[0];
                const otherItems = originalArrayData.filter(item => item.id !== 0);
                
                const monthNames = {
                    'Yanvar': 1, 'Fevral': 2, 'Mart': 3, 'Aprel': 4, 'May': 5, 'Iyun': 6,
                    'Iyul': 7, 'Avqust': 8, 'Sentyabr': 9, 'Oktyabr': 10, 'Noyabr': 11, 'Dekabr': 12,
                    'January': 1, 'February': 2, 'March': 3, 'April': 4, 'Mays': 5, 'June': 6,
                    'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12
                };

                const sortedItems = [...otherItems].sort((a, b) => {
                    if (!a.date || !b.date) return 0;

                    const parseDate = (dateStr) => {
                        const parts = dateStr.replace(',', '').split(' ');
                        if (parts.length < 3) return new Date();
                        
                        const [day, monthStr, year] = parts;
                        const month = monthNames[monthStr];
                        return new Date(year, month - 1, day);
                    };

                    return parseDate(b.date) - parseDate(a.date);
                });

                const limitedSortedItems = showAll ? sortedItems : sortedItems.slice(0, itemsToShow - 1);
                setDisplayedData([firstItem, ...limitedSortedItems]);
            } else {
                setDisplayedData(showAll ? originalArrayData : originalArrayData.slice(0, itemsToShow));
            }
        } else {
            // If search term exists, filter data with proper null checking
            const filteredData = originalArrayData.filter(item => {
                const title = item.title || '';
                const location = item.location || '';
                const type = item.type || '';
                const searchLower = searchTerm.toLowerCase();
                
                return title.toLowerCase().includes(searchLower) ||
                       location.toLowerCase().includes(searchLower) ||
                       type.toLowerCase().includes(searchLower);
            });
            setDisplayedData(filteredData);
        }
        setAnimationKey(prevKey => prevKey + 1);
    }, [searchTerm, originalArrayData, isSortedByDate, showAll, itemsToShow]);

    const isJobExpired = (job) => {
        if (!job.expireDate) return false;

        const monthNames = {
            'Yanvar': 1, 'Fevral': 2, 'Mart': 3, 'Aprel': 4, 'May': 5, 'Iyun': 6,
            'Iyul': 7, 'Avqust': 8, 'Sentyabr': 9, 'Oktyabr': 10, 'Noyabr': 11, 'Dekabr': 12,
            'January': 1, 'February': 2, 'March': 3, 'April': 4, 'Mays': 5, 'June': 6,
            'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12
        };

        const parseDate = (dateStr) => {
            const parts = dateStr.replace(',', '').split(' ');
            if (parts.length < 3) return new Date();
            
            const [day, monthStr, year] = parts;
            const month = monthNames[monthStr];
            return new Date(year, month - 1, day);
        };

        const expireDate = parseDate(job.expireDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return expireDate < today;
    };

    useEffect(() => {
        if (showPopup) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showPopup]);

    // KEEP the existing layout toggle function
    const toggleLayout = () => {
        setIsColumnLayout(!isColumnLayout);
        setAnimationKey(prevKey => prevKey + 1);
    };

    // ADD new function for width toggle
    const toggleSortGroupWidth = () => {
        setIsCompactSortGroup(!isCompactSortGroup);
    };

    // MODIFIED: Now the first sort button does BOTH layout toggle AND width toggle
    const handleFirstSortClick = () => {
        toggleLayout(); // Keep the original layout toggle
        toggleSortGroupWidth(); // Add the new width toggle
    };

    const toggleSortByDate = () => {
        if (originalArrayData.length === 0) return;

        if (isSortedByDate) {
            setDisplayedData(originalArrayData.slice(0, itemsToShow));
            setIsSortedByDate(false);
        } else {
            const firstItem = originalArrayData.find(item => item.id === 0) || originalArrayData[0];
            const otherItems = originalArrayData.filter(item => item.id !== 0);

            const monthNames = {
                'Yanvar': 1, 'Fevral': 2, 'Mart': 3, 'Aprel': 4, 'May': 5, 'Iyun': 6,
                'Iyul': 7, 'Avqust': 8, 'Sentyabr': 9, 'Oktyabr': 10, 'Noyabr': 11, 'Dekabr': 12,
                'January': 1, 'February': 2, 'March': 3, 'April': 4, 'Mays': 5, 'June': 6,
                'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12
            };

            const sortedItems = [...otherItems].sort((a, b) => {
                if (!a.date || !b.date) return 0;

                const parseDate = (dateStr) => {
                    const parts = dateStr.replace(',', '').split(' ');
                    if (parts.length < 3) return new Date();
                    
                    const [day, monthStr, year] = parts;
                    const month = monthNames[monthStr];
                    return new Date(year, month - 1, day);
                };

                return parseDate(b.date) - parseDate(a.date);
            });

            const limitedSortedItems = showAll ? sortedItems : sortedItems.slice(0, itemsToShow - 1);
            setDisplayedData([firstItem, ...limitedSortedItems]);
            setIsSortedByDate(true);
        }
        setAnimationKey(prevKey => prevKey + 1);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (isSearchOpen) {
            setSearchTerm('');
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchClose = () => {
        setIsSearchOpen(false);
        setSearchTerm('');
    };

    const toggleShowAll = () => {
        if (originalArrayData.length === 0) return;

        if (showAll) {
            setDisplayedData(isSortedByDate ?
                [originalArrayData.find(item => item.id === 0) || originalArrayData[0], 
                 ...originalArrayData.filter(item => item.id !== 0)
                    .sort((a, b) => {
                        if (!isSortedByDate) return 0;

                        const monthNames = {
                            'Yanvar': 1, 'Fevral': 2, 'Mart': 3, 'Aprel': 4, 'May': 5, 'Iyun': 6,
                            'Iyul': 7, 'Avqust': 8, 'Sentyabr': 9, 'Oktyabr': 10, 'Noyabr': 11, 'Dekabr': 12,
                            'January': 1, 'February': 2, 'March': 3, 'April': 4, 'Mays': 5, 'June': 6,
                            'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12
                        };

                        const parseDate = (dateStr) => {
                            const parts = dateStr.replace(',', '').split(' ');
                            if (parts.length < 3) return new Date();
                            
                            const [day, monthStr, year] = parts;
                            const month = monthNames[monthStr];
                            return new Date(year, month - 1, day);
                        };

                        return parseDate(b.date) - parseDate(a.date);
                    }).slice(0, itemsToShow - 1)] :
                originalArrayData.slice(0, itemsToShow)
            );
        } else {
            setDisplayedData(isSortedByDate ?
                [originalArrayData.find(item => item.id === 0) || originalArrayData[0], 
                 ...originalArrayData.filter(item => item.id !== 0)
                    .sort((a, b) => {
                        if (!isSortedByDate) return 0;

                        const monthNames = {
                            'Yanvar': 1, 'Fevral': 2, 'Mart': 3, 'Aprel': 4, 'May': 5, 'Iyun': 6,
                            'Iyul': 7, 'Avqust': 8, 'Sentyabr': 9, 'Oktyabr': 10, 'Noyabr': 11, 'Dekabr': 12,
                            'January': 1, 'February': 2, 'March': 3, 'April': 4, 'Mays': 5, 'June': 6,
                            'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12
                        };

                        const parseDate = (dateStr) => {
                            const parts = dateStr.replace(',', '').split(' ');
                            if (parts.length < 3) return new Date();
                            
                            const [day, monthStr, year] = parts;
                            const month = monthNames[monthStr];
                            return new Date(year, month - 1, day);
                        };

                        return parseDate(b.date) - parseDate(a.date);
                    })] :
                originalArrayData
            );
        }
        setShowAll(!showAll);
        setAnimationKey(prevKey => prevKey + 1);
    };

    const handleApplyClick = (job) => {
        if (isJobExpired(job)) return;

        setSelectedJob(job);
        setShowPopup(true);
        setFormData({
            firstName: '',
            profession: '',
            mobile: '',
            email: '',
            cv: null,
            cvText: '',
            linkedin: ''
        });
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedJob(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            cv: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('jobId', selectedJob.id);
            formDataToSend.append('jobTitle', selectedJob.title);
            formDataToSend.append('firstName', formData.firstName);
            formDataToSend.append('profession', formData.profession);
            formDataToSend.append('mobile', formData.mobile);
            formDataToSend.append('linkedin', formData.linkedin);
            formDataToSend.append('email', formData.email);

            if (selectedJob.id === 0 && formData.cvText) {
                formDataToSend.append('cvText', formData.cvText);
            }

            if (formData.cv) {
                formDataToSend.append('cv', formData.cv);
            }

            const response = await fetch('http://localhost:5000/api/applications/submit', {
                method: 'POST',
                body: formDataToSend
            });

            const result = await response.json();

            if (result.success) {
                alert('Application submitted successfully!');
                handleClosePopup();
            } else {
                alert('Failed to submit application: ' + result.error);
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('An error occurred while submitting your application');
        }
    };

    if (isLoading) {
        return <div className="section-column">Loading job descriptions...</div>;
    }

    return (
        <div className="section-column">
            <p className='Title-Header'>Vakansiyalar</p>
            {/* ADD conditional class for width toggle */}
            <div className={`Section-Sort-Group ${isCompactSortGroup ? 'compact' : ''}`}>

                <div className="Section-Sort-Left">
                    {/* CHANGE onClick to handleFirstSortClick which does BOTH functions */}
                    <div className="Sorts animated-1" onClick={handleFirstSortClick}>
                        {isColumnLayout ? (
                            <img src={SortColumnImage} className='No-Select' alt="Column layout" />
                        ) : (
                            <img src={SortRowImage} className='No-Select' alt="Row layout" />
                        )}
                    </div>
                    <div
                        className={`Sorts animated-2 ${isSortedByDate ? 'active' : ''}`}
                        onClick={toggleSortByDate}
                    >
                        <img src={ClockImage} className='No-Select' alt="Sort by time" />
                    </div>
                    <div
                        className={`Sorts animated-3 ${isSearchOpen ? 'search-open' : ''}`}
                        onClick={toggleSearch}
                    >
                        <img src={SearchImage} className='No-Select' alt="Search" />
                        <textarea 
                            placeholder="Axtarış..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onClick={(e) => e.stopPropagation()}
                        />
                        {isSearchOpen && (
                            <div className="search-close-icon" onClick={handleSearchClose}>
                                {/* <img src={EyeImage} alt="Close search" /> */}
                            </div>
                        )}
                    </div>
                </div>
                <div className="Section-Sort-Right">
                    <div className="Sorts animated-2" onClick={toggleShowAll}>
                        <a>
                            <p>{showAll ? 'Daha az' : 'Daha çox'}</p>
                        </a>
                    </div>
                </div>
            </div>

            {/* Hide main content when popup is open */}
            {!showPopup && (
                <div className={`Section-Card-Grid-container ${isColumnLayout ? 'column-layout' : 'row-layout'}`}
                    key={animationKey} >
                    {displayedData.length > 0 ? (
                        displayedData.map((item) => {
                            const expired = isJobExpired(item);
                            return (
                                <div className={`Cards-grid Main-Button-Style Main-Card-grid ${isColumnLayout ? 'column-Cards-grid' : 'row-Cards-grid'} animated-${item.id + 1} ${expired ? 'expired-job' : ''}`}
                                    key={`${item.id}-${animationKey}`} >
                                    <div className={`Cards-Item-grid ${expired ? 'expired' : ''}`}>
                                        <span className='Cards-Item-Folder'>
                                            <p className='card-title-grid'>{item.title}</p>
                                            {item.date && (
                                                <div className="Cards-Item-Bio">
                                                    <img src={item.dateImage} className='No-Select' alt="Date" />
                                                    <p>{item.date}</p>
                                                </div>
                                            )}
                                            {item.location && (
                                                <div className="Cards-Item-Bio">
                                                    <img src={item.locationImage} className='No-Select' alt="Location" />
                                                    <p>{item.location}</p>
                                                </div>
                                            )}
                                        </span>
                                        <div className="Classic-Button">
                                            <a
                                                onClick={() => handleApplyClick(item)}
                                                className={expired ? 'expired-button' : ''}
                                            >
                                                {expired ? 'Müraciət dayandırılıb' : 'Müraciət et'}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="no-results">
                            <p>Heç bir nəticə tapılmadı</p>
                        </div>
                    )}
                </div>
            )}

            {/* Popup Form */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <button className="close-button" onClick={handleClosePopup}>
                            <img src={CloseImage} alt="Close" />
                        </button>
                        <div className="popup-container">
                            {/* Left side content */}
                            <div className="job-details">
                                {selectedJob.id === 0 ? (
                                    <>
                                        <h2>{selectedJob.title}</h2>
                                        <div className="general-cv-text" >
                                            <p style={{ whiteSpace: 'pre-line' }}>{jobDescriptions[selectedJob.id]}</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h2>{selectedJob.title}</h2>
                                        <div className="job-info">
                                            {selectedJob.expireDate && (
                                                <div className="info-item info-item-expire">
                                                    <img src={selectedJob.expireDateImage} alt="Expire Date" />
                                                    <span>Son tarix: {selectedJob.expireDate}</span>
                                                </div>
                                            )}
                                            <div className="info-item">
                                                <img src={selectedJob.dateImage} alt="Date" />
                                                <span>{selectedJob.date}</span>
                                            </div>

                                            <div className="info-item">
                                                <img src={selectedJob.locationImage} alt="Location" />
                                                <span>{selectedJob.location}</span>
                                            </div>
                                            {selectedJob.type && (
                                                <div className="info-item">
                                                    <img src={selectedJob.typeImage} alt="Job Type" />
                                                    <span>{selectedJob.type}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="job-description">
                                            <p style={{ whiteSpace: 'pre-line' }}>{jobDescriptions[selectedJob.id]}</p>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="application-form">
                                <h3>Müraciət Formu</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            placeholder='Adı, Soyadı'
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="tel"
                                            placeholder='Mobil nömrə (+994 00 000 00 00)'
                                            id="mobile"
                                            name="mobile"
                                            value={formData.mobile}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="url"
                                            placeholder='LinkedIn profil URL-nizi daxil edin (İstəyə bağlı)
'
                                            id="linkedin"
                                            name="linkedin"
                                            value={formData.linkedin}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    {selectedJob.id === 0 ? (
                                        <>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    placeholder='Müraciət etmək istədiyiniz peşə və ya sahə'
                                                    id="profession"
                                                    name="profession"
                                                    value={formData.profession}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>

                                        </>
                                    ) : null}

                                    <div className="form-group">
                                        <input
                                            type="email"
                                            placeholder='E-mail'
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="cv">{selectedJob.id === 0 ? '' : ''}</label>
                                        <input
                                            type="file"
                                            id="cv"
                                            name="cv"
                                            onChange={handleFileChange}
                                            accept=".pdf,.doc,.docx"
                                            required={selectedJob.id !== 0}
                                        />
                                        {selectedJob.id === 0 && (
                                            <p className="optional-text"></p>
                                        )}
                                    </div>
 
                                    {selectedJob.id === 0 && (
                                        <div className="form-group">
                                            <textarea
                                                id="cvText"
                                                placeholder="Qeyd etmək istədiyiniz digər məlumatlar:"
                                                name="cvText"
                                                value={formData.cvText}
                                                onChange={handleInputChange}
                                                rows={5}

                                            />
                                        </div>

                                    )}

                                    <button type="submit" className="Main-Button">Müraciəti göndər</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Vacancies;