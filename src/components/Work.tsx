import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

type Project = {
  title: string;
  category: string;
  tools: string;
  image: string;
  link: string;
};

const projects: Project[] = [
  {
    title: "ShopNest",
    category: "Full-Stack MERN E-Commerce Platform",
    tools:
      "MERN Stack, Redux Toolkit, Razorpay, Cloudinary, JWT Authentication",
    image: "/images/shopnest.png",
    link: "https://shopnest-ecom-mern-pkyy.onrender.com/",
  },

  {
    title: "FIN-AI",
    category: "AI-Powered Financial Assistant",
    tools: "MERN Stack, AI Integration, Financial Data Analysis",
    image: "/images/fin-ai.png",
    link: "https://fin-ai0.vercel.app",
  },
  {
    title: "Study Shield",
    category: "Educational Platform",
    tools: "React, Node.js, MongoDB, Authentication",
    image: "/images/StudyShield.png",
    link: "https://study-shield-ypi1.vercel.app/",
  },
  {
    title: "AI Lie Detector",
    category: "AI-Based Truth Detection System",
    tools: "React, Node.js, Express, AI Analysis",
    image: "/images/AI-Lie-Detector.png",
    link: "https://lie-detector-six.vercel.app/",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      window.setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating],
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>

          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={project.title}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>

                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">{project.category}</p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                      </div>
                    </div>

                    <div className="carousel-image-wrapper">
                      <WorkImage
                        image={project.image}
                        alt={project.title}
                        link={project.link}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${
                  index === currentIndex ? "carousel-dot-active" : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
