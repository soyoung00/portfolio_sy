import React from 'react'
import { useState, useEffect } from 'react';
import data from '../projects.json';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ProjectDetail from './ProjectDetail';
import { Pagination } from 'swiper/modules';

function Project() {
    const [openPopup, setOpenPopup] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [openIndex, setOpenIndex] = useState(null);

    useEffect(() => {
        if (openPopup) {
            const scrollY = window.scrollY;

            document.body.dataset.scrollY = String(scrollY);
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
        } else {
            const savedScrollY = document.body.dataset.scrollY || '0';

            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.width = '';
            document.body.style.overflow = '';

            window.scrollTo({
                top: parseInt(savedScrollY, 10),
                behavior: 'auto',
            });
        }

        return () => {
            if (!openPopup) return;

            const savedScrollY = document.body.dataset.scrollY || '0';

            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.width = '';
            document.body.style.overflow = '';

            window.scrollTo({
                top: parseInt(savedScrollY, 10),
                behavior: 'auto',
            });
        };
    }, [openPopup]);

    return (
        <section className='project'>
            <div className="title-wrap project-text">
                <span className="bg-text">Project</span>
                <h2>PROJECT</h2>
            </div>

            <div className='project-list'>
                <Swiper
                    slidesPerView={3.2}
                    spaceBetween={18}
                    centeredSlides={false}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1.1,
                            spaceBetween: 12,
                        },
                        481: {
                            slidesPerView: 1.4,
                            spaceBetween: 14,
                        },
                        768: {
                            slidesPerView: 2.5,
                            spaceBetween: 16,
                        },
                        1024: {
                            slidesPerView: 3.2,
                            spaceBetween: 18,
                        },
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {data.projects.map(function (item) {
                        return (
                            <SwiperSlide key={item.id}>
                                <article className="project-card">
                                    <div className="thumb">
                                        <img src={item.thumbnail} alt="" />
                                    </div>

                                    <div className="card-overlay">
                                        <strong>{item.title}</strong>
                                        <p>{item.summary.team}</p>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedProject(item);
                                                setOpenPopup(true);
                                            }}
                                        >
                                            자세히 보기
                                        </button>
                                    </div>

                                    <div className="card-body">
                                        <h3>{item.title}</h3>
                                        <p>{item.description1}</p>
                                        <span>{item.summary.date}</span>
                                    </div>
                                </article>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>

            {openPopup === true && (
                <ProjectDetail
                    setOpenPopup={setOpenPopup}
                    selectedProject={selectedProject}
                    openIndex={openIndex}
                    setOpenIndex={setOpenIndex}
                />
            )}
        </section>
    );
}

export default Project