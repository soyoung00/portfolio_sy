import React from 'react'

function ProjectDetail({ setOpenPopup, selectedProject, openIndex, setOpenIndex }) {

    return (
        <div className="project-detail-wrap">
        <div className='project-detail show'>

            <button type="button" onClick={() => setOpenPopup(false)}>×</button>

            <div className='all'>
                <div className="detail-header">

                    <h3>{selectedProject.title}</h3>

                    <div className="detail-top">

                        <div className="detail-links">
                            {selectedProject.links.liveUrl && (
                                <a href={selectedProject.links.liveUrl} target="_blank" rel="noreferrer" className="link-item">
                                    <div className="icon-circle">
                                        <img src="/img/icon_link.png" alt="배포링크" />
                                    </div>
                                    <span>배포링크</span>
                                </a>
                            )}
                            {selectedProject.links.gitUrl && (
                                <a href={selectedProject.links.gitUrl} target="_blank" rel="noreferrer" className="link-item">
                                    <div className="icon-circle">
                                        <img src="/img/icon_github_detail.png" alt="github" />
                                    </div>
                                    <span>github</span>
                                </a>
                            )}
                        </div>

                        <div className='detail-thumbnail'>
                            <div className="detail-preview">
                                <img src={selectedProject.description2.img} alt="미리보기" />
                            </div>
                            <div className="detail-meta">
                                <span>{selectedProject.summary.date}</span>
                                <span>|</span>
                                <span>{selectedProject.summary.type}</span>
                                <span>|</span>
                                <span>{selectedProject.summary.team}</span>
                            </div>
                        </div>

                    </div>



                    <p className="detail-desc"
                        dangerouslySetInnerHTML={{
                            __html: selectedProject.description2.content
                        }}
                    />

                </div>

                <div className="detail-divider"></div>

                <div className='detail-content'>
                    <div>
                        <h2>사용 기술</h2>

                        <div className='detail-icon'>
                            {selectedProject.techStack.map(function (item, i) {
                                return (
                                    <div key={i}><img src={item.icon} /></div>
                                )
                            })}
                        </div>
                    </div>

                    <div>
                        <h2>작업 기여도</h2>
                        <div className='accordion-list'>
                            {selectedProject.contributions.map(function (item, index) {
                                const isOpen = openIndex === index;

                                return (
                                    <div className="accordion-item" key={index}>
                                        <div
                                            className="accordion-header"
                                            onClick={() => setOpenIndex(isOpen ? null : index)}
                                        >
                                            <span>{isOpen ? '▼' : '▶'}</span>
                                            <span>{item.title}</span>
                                        </div>

                                        <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
                                            <div className="accordion-inner">
                                                {item.items}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {selectedProject.troubleshooting && (

                        <div>
                            <h2>트러블 슈팅</h2>
                            {selectedProject.troubleshooting.map(function (item, index) {

                                return (
                                    <div className='detail-trouble' key={index}>
                                        <div>
                                        <img src={'/img/icon_section.png'} className='icon_section' />
                                        <h2>{item.title}</h2>
                                        </div>
                                        <div>
                                            <span><img src={item.img} /></span>
                                            <ul>
                                                {item.content.map(function (list, j) {

                                                    return (
                                                        <li key={j}>
                                                            <img src={'/img/icon_check.png'} className='icon_checkbox' />
                                                            {list}
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}


                </div>
            </div>
        </div>

        </div>
    )
}

export default ProjectDetail