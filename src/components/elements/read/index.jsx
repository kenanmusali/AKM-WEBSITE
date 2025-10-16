import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArrayData1Img from '../../../assets/image/success/Group279.png';
import ArrayData1Svg from '../../../assets/svg/calendar.svg';
import ArrayData2Svg from '../../../assets/svg/landscape.crop.rectangle.svg';
import ChevronCircleTopActiveImg from '../../../assets/svg/chevron.circle.top.active.svg';
import ChevronCircleBottomActiveImg from '../../../assets/svg/chevron.circle.bottom.active.svg';
const Read = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch the main blog post
        const response = await fetch(`http://localhost:8080/api/blogs/${id}`);
        if (!response.ok) {
          throw new Error('Blog not found');
        }

        const result = await response.json();
        if (!result.success) {
          throw new Error(result.message || 'Failed to fetch blog');
        }

        const blogData = result.data;
        setBlog(blogData);

        // Fetch related blogs from the same category
        if (blogData.category) {
          const relatedResponse = await fetch(`http://localhost:8080/api/blogs/category/${blogData.category}`);
          if (relatedResponse.ok) {
            const relatedResult = await relatedResponse.json();
            if (relatedResult.success) {
              setRelatedBlogs(relatedResult.data.filter(b => b._id !== id));
            }
          }
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError(err.message);
        navigate('/not-found'); // Redirect if blog doesn't exist
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, navigate]);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime())
        ? 'Date not available'
        : date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
    } catch {
      return 'Date not available';
    }
  };

  if (loading) {
    return <div className="Panel Center-Objects">Loading...</div>;
  }

  if (error) {
    return <div className="Panel Center-Objects">Error: {error}</div>;
  }

  if (!blog) {
    return <div className="Panel Center-Objects">Blog not found</div>;
  }

  const getImageUrl = (path) => {
    if (!path) return null;
    const cleaned = path.replace(/^\/+/, '').replace(/^uploads\/+/, '');
    return `http://localhost:8080/uploads/${cleaned}`;
  };







  return (
    <div className="Panel Center-Objects">
      <div className="Panel-Group">




        <h1 className="Title-Header">{blog.title}</h1>


        <div className="Cards-Item">
          <div className="Cards-Item-Bio-Group">
            <div className="Cards-Item-Bio">
              <img src={ArrayData1Svg} alt="Calendar" />
              <p>{formatDate(blog.createdAt)}</p>
            </div>
            <div className="Cards-Item-Bio">
              <img src={ArrayData2Svg} alt="Gallery" />
              <p>{blog.images?.length || 0}</p>
            </div>
          </div>


          {/* Enhanced Image Gallery */}
          {blog.images && blog.images.length > 0 && (
            <div className="Cards-Item">
              <div className="image-gallery">
                {blog.images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={getImageUrl(image)}
                      alt={`${blog.title} - ${index + 1}`}

                      onError={(e) => {
                        e.target.src = ArrayData1Img;
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="Cards-Item">
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: blog.article }}
            />
          </div>
        </div>


      </div>



      <div className="Panel-Content">


        <div className="Card-Top No-Select">
          <button className="nav-button">
            <img
              src={ChevronCircleTopActiveImg}
              className="success-nav-icon"
            />
          </button>
        </div>

        {relatedBlogs.length > 0 && (
          <div className="read-card-group">


            {relatedBlogs.map(relatedBlog => (
              <div
                className="Cards Main-Card Mini-card"
                key={relatedBlog._id}
                onClick={() => navigate(`/blog/${relatedBlog._id}`)}
              >
                <div className="Cards-Item">
                  <img
                    src={getImageUrl(relatedBlog.images?.[0])}
                    alt={relatedBlog.title}
                    className="Section-Images"
                    onError={(e) => {
                      e.target.src = ArrayData1Img;
                    }}
                  />
                </div>

                <div className="Cards-Item">
                  <div className="Cards-Item-Bio-Group">
                    <div className="Cards-Item-Bio">
                      <img src={ArrayData1Svg} alt="Calendar" />
                      <p>{formatDate(relatedBlog.createdAt)}</p>
                    </div>
                    <div className="Cards-Item-Bio">
                      <img src={ArrayData2Svg} alt="Gallery" />
                      <p>{relatedBlog.images?.length || 0} </p>
                    </div>
                  </div>
                </div>
                <div className="Cards-Item">
                  <p className="card-title">{relatedBlog.title}</p>
                  <p className="card-description">{relatedBlog.description}</p>
                </div>
              </div>
            ))}


          </div>
        )}


        <div className="Card-Bottom No-Select">
          <button className="nav-button">
            <img
              src={ChevronCircleBottomActiveImg}
              className="success-nav-icon"
            />
          </button>
        </div>

      </div>
    </div>

  );
};

export default Read;