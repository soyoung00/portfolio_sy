import { useEffect, useRef, useState } from 'react';

function Menu({ setMode, mode }) {
  const [activeSection, setActiveSection] = useState('about');

  const isAnimating = useRef(false);

  const sectionIds = ['about', 'skill', 'project'];

  const isMobile = () => window.innerWidth <= 480;

  const moveToSection = (id) => {
    const section = document.getElementById(id);
    if (!section) return;

    setActiveSection(id);

    // if (isMobile()) {
    //   section.scrollIntoView({
    //     behavior: 'auto',
    //     block: 'start',
    //   });
    //   return; 
    // }

    // 기존 유지 (데스크탑용)
    isAnimating.current = true;

    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    setTimeout(() => {
      isAnimating.current = false;
    }, 900);
  };

  useEffect(() => {
    if (isMobile()) return;


    const handleWheel = (e) => {
      if (e.target.closest('.project-detail-wrap')) {
        return;
      }

      if (isAnimating.current) {
        e.preventDefault();
        return;
      }

      const currentIndex = sectionIds.indexOf(activeSection);
      if (currentIndex === -1) return;

      const goingDown = e.deltaY > 0;
      const goingUp = e.deltaY < 0;

      if (goingDown && currentIndex < sectionIds.length - 1) {
        e.preventDefault();
        moveToSection(sectionIds[currentIndex + 1]);
      }

      if (goingUp && currentIndex > 0) {
        e.preventDefault();
        moveToSection(sectionIds[currentIndex - 1]);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [activeSection]);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');

    const observer = new IntersectionObserver(
      (entries) => {
        if (isAnimating.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: isMobile() ? 0.25 : 0.55,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <aside className="sidebar">
      <div className="sidebar-menu">
        <button
          type="button"
          className={`side-btn ${activeSection === 'about' ? 'active' : ''}`}
          onClick={() => moveToSection('about')}
        >
          <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.0808 10.5708C12.0808 8.96873 12.7172 7.43233 13.85 6.29953C14.9828 5.16673 16.5192 4.53033 18.1212 4.53033C19.7232 4.53033 21.2596 5.16673 22.3924 6.29953C23.5252 7.43233 24.1616 8.96873 24.1616 10.5708C24.1616 12.1728 23.5252 13.7092 22.3924 14.842C21.2596 15.9748 19.7232 16.6112 18.1212 16.6112C16.5192 16.6112 14.9828 15.9748 13.85 14.842C12.7172 13.7092 12.0808 12.1728 12.0808 10.5708ZM12.0808 19.6314C10.0783 19.6314 8.15777 20.4269 6.74177 21.8429C5.32577 23.2589 4.53027 25.1794 4.53027 27.1819C4.53027 28.3834 5.00757 29.5357 5.85717 30.3853C6.70677 31.2349 7.85907 31.7122 9.06059 31.7122H27.1818C28.3834 31.7122 29.5357 31.2349 30.3853 30.3853C31.2349 29.5357 31.7122 28.3834 31.7122 27.1819C31.7122 25.1794 30.9167 23.2589 29.5007 21.8429C28.0847 20.4269 26.1642 19.6314 24.1616 19.6314H12.0808Z"
              fill="currentColor"
            />
          </svg>
        </button>

        <button
          type="button"
          className={`side-btn ${activeSection === 'skill' ? 'active' : ''}`}
          onClick={() => moveToSection('skill')}
        >
          <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.53061 4.53033H31.7125C32.113 4.53033 32.4971 4.68943 32.7803 4.97263C33.0635 5.25583 33.2226 5.63993 33.2226 6.04044V30.2021C33.2226 30.6026 33.0635 30.9867 32.7803 31.2699C32.4971 31.5531 32.113 31.7122 31.7125 31.7122H4.53061C4.13011 31.7122 3.74601 31.5531 3.46281 31.2699C3.17961 30.9867 3.02051 30.6026 3.02051 30.2021V6.04044C3.02051 5.63993 3.17961 5.25583 3.46281 4.97263C3.74601 4.68943 4.13011 4.53033 4.53061 4.53033ZM24.8642 23.461L30.2024 18.1213L24.8642 12.7815L22.7274 14.9199L25.9318 18.1213L22.7274 21.3242L24.8642 23.461ZM10.3113 18.1213L13.5157 14.9183L11.3804 12.7815L6.04072 18.1213L11.3804 23.461L13.5157 21.3227L10.3113 18.1213ZM16.9799 25.6718L22.4767 10.5708H19.2632L13.7664 25.6718H16.9799Z"
              fill="currentColor"
            />
          </svg>
        </button>

        <button
          type="button"
          className={`side-btn ${activeSection === 'project' ? 'active' : ''}`}
          onClick={() => moveToSection('project')}
        >
          <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.81886 29.5509C6.04368 29.5509 5.3803 29.2751 4.82875 28.7236C4.27719 28.172 4.00094 27.5082 4 26.732V9.81886C4 9.04368 4.27625 8.3803 4.82875 7.82875C5.38124 7.27719 6.04461 7.00094 6.81886 7H14.1127C14.4885 7 14.847 7.07047 15.1881 7.21141C15.5291 7.35236 15.8284 7.55203 16.0859 7.81042L18.0943 9.81886H29.3698C30.1449 9.81886 30.8088 10.0951 31.3613 10.6476C31.9138 11.2001 32.1896 11.8635 32.1886 12.6377V26.732C32.1886 27.5072 31.9128 28.1711 31.3613 28.7236C30.8097 29.2761 30.1459 29.5518 29.3698 29.5509H6.81886Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      <div className="sidebar-mode">
        <button type="button"
          className={`side-btn ${mode === 'light' ? 'active' : ''}`}
          onClick={() => setMode('light')}
        >
          <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.9263 23.7327C11.4366 22.243 10.6917 20.4416 10.6917 18.3287C10.6917 16.2158 11.4366 14.415 12.9263 12.9263C14.4161 11.4376 16.2169 10.6928 18.3287 10.6917C20.4406 10.6907 22.2419 11.4356 23.7327 12.9263C25.2234 14.4171 25.9678 16.2179 25.9657 18.3287C25.9637 20.4396 25.2188 22.2409 23.7312 23.7327C22.2435 25.2244 20.4427 25.9688 18.3287 25.9657C16.2148 25.9627 14.414 25.2178 12.9263 23.7312M7.63694 19.8561H1.52734V16.8013H7.63694V19.8561ZM35.1301 19.8561H29.0205V16.8013H35.1301V19.8561ZM16.8013 7.63694V1.52734H19.8561V7.63694H16.8013ZM16.8013 35.1301V29.0205H19.8561V35.1301H16.8013ZM9.7753 11.8373L5.91862 8.13335L8.09516 5.88043L11.7609 9.69893L9.7753 11.8373ZM28.5623 30.7771L24.8584 26.9204L26.8822 24.8202L30.7389 28.5241L28.5623 30.7771ZM24.8202 9.7753L28.5241 5.91862L30.7771 8.09516L26.9586 11.7609L24.8202 9.7753ZM5.88043 28.5623L9.73712 24.8584L11.8373 26.8822L8.13335 30.7389L5.88043 28.5623Z"
              fill="currentColor"
            />
          </svg>
        </button>

        <button type="button"
          className={`side-btn ${mode === 'dark' ? 'active' : ''}`}
          onClick={() => setMode('dark')}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.5317 30.6807C13.8549 30.6807 10.7445 29.4082 8.20038 26.8632C5.65631 24.3181 4.38379 21.2077 4.38281 17.5318C4.38281 14.1715 5.47856 11.2554 7.67004 8.78341C9.86153 6.31141 12.6618 4.86892 16.0707 4.45595C16.3873 4.40725 16.6673 4.45011 16.9108 4.58452C17.1543 4.71893 17.3491 4.89522 17.4952 5.1134C17.6413 5.33157 17.7207 5.58725 17.7333 5.88042C17.746 6.17359 17.6545 6.45361 17.4587 6.72049C17.0447 7.35358 16.734 8.0232 16.5266 8.72935C16.3191 9.4355 16.2159 10.1782 16.2168 10.9574C16.2168 13.1488 16.9839 15.0116 18.5179 16.5457C20.0519 18.0797 21.9147 18.8467 24.1062 18.8467C24.861 18.8467 25.61 18.7371 26.3532 18.518C27.0964 18.2988 27.7596 17.9945 28.3431 17.6049C28.6109 17.4344 28.8851 17.3555 29.1656 17.3682C29.4461 17.3809 29.6955 17.4476 29.9136 17.5683C30.1571 17.6901 30.3461 17.8727 30.4805 18.1162C30.6149 18.3597 30.6573 18.6519 30.6076 18.9928C30.2667 22.3531 28.8364 25.1412 26.3167 27.357C23.797 29.5728 20.8686 30.6807 17.5317 30.6807Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </aside>
  )
}

export default Menu
