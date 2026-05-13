import { useEffect, useRef, useState } from 'react';
import './css/app.css';

import Project from './comp/Project';
import data from './skill-list.json';
import Menu from './comp/Menu';

function App() {
  const [mode, setMode] = useState('light');


  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('parksoyoung9750@gmail.com');
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1200);
  };

  return (
    <div className={`main ${mode == 'dark' ? 'dark' : ''}`}>

      <Menu setMode={setMode} mode={mode} />

      <section id="about" className="about-me">
        <div className="bg-text">Front-end</div>
        <figure>
          <div className='intro-text'>
            <h2>백엔드에서 프론트까지,</h2>
            <p>박소영</p>
            <h2>입니다.</h2>
          </div>
          <figcaption>
            백엔드 개발자로 데이터 처리와 개발, 유지보수를 경험했습니다. <br />
            이를 기반으로 디자인을 구현까지 연결하는 프론트엔드 개발로 확장했으며, <br />
            현재는 백엔드 이해를 갖춘 프론트엔드 개발자로 성장하고 있습니다.
          </figcaption>
        </figure>

        {mode == 'light' ?
          <div className='profile-img'>
            <img src='/img/basic-profile-light.png' className='basic-img' />
            <img src='/img/smile-profile-light.png' className='hover-img' />
            <button className='email-bubble'>
              {copied ? '복사 완료!' : 'parksoyoung9750@gmail.com'}

              <img
                src='/img/copy.png'
                onClick={copyEmail}
                className='copy-icon'
              />
            </button>


            <div className='hover-guide'>
              <img src='/img/cursor.png' />
            </div>
          </div>
          :
          <div className='profile-img'>
            <img src='/img/basic-profile.png' className='basic-img' />
            <img src='/img/smile-profile.png' className='hover-img' />
            <button className={`email-bubble  ${mode === 'dark' ? 'dark' : ''}`}>
              {copied ? '복사 완료!' : 'parksoyoung9750@gmail.com'}

              <img
                src='/img/copy-dark.png'
                onClick={copyEmail}
                className='copy-icon'
              />
            </button>


            <div className='hover-guide'>
              <img src='/img/cursor-dark.png' />
            </div>
          </div>

        }

      </section>

      <section id="skill" className="experience-skill">
        <div className="title-wrap">
          <span className="bg-text">Experience & Skill</span>
          <h2>EXPERIENCE & SKILL</h2>
        </div>

        <div className="area">
          <div className="experience">
            <p>
              <img src={mode == 'light' ? '/img/experience.png' : '/img/experience_fff.png'} alt="" />
            </p>
            <div className="career-item">
              <div>
                <h3>미래능력개발교육원</h3>
                <p>JAVA 웹개발 프로그래밍 교육</p>
                <span>2020.07 - 2021.02</span>
              </div>
              <div>
                <h3>Jager</h3>
                <p>백엔드 웹개발 및 유지보수</p>
                <span>2022.04- 2024.07</span>
              </div>
              <div>
                <h3>Coupang</h3>
                <p>데이터 검증 및 상품 매칭</p>
                <span>2024.09 - 2025.12</span>
              </div>
              <div>
                <h3>KD아카데미</h3>
                <p>UX UI 디자인 & 프론트엔드개발</p>
                <span>2026.01 - 2026.06</span>
              </div>
            </div>
          </div>

          <div className="skill">
            <div className="skill-group">
              <h3>
                Web Development
                <br />
                Frontend & Backend
              </h3>
              <div className="skill-grid">
                {data.skillList.webDevelopment.map(function (item, i) {
                  return (
                    <div key={i}>
                      <div className="skill-box">
                        <img src={item.icon} alt="" />
                      </div>
                      <div className="skill-text">{item.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="skill-group">
              <h3>Design & AI</h3>
              <div className="skill-grid">
                {data.skillList.design.map(function (item, i) {
                  return (
                    <div key={i}>
                      <div className="skill-box">
                        <img src={item.icon} alt="" />
                      </div>
                      <div className="skill-text">{item.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="skill-group">
              <h3>Collaboration</h3>
              <div className="skill-grid">
                <div>
                  <div className="skill-box">
                    <img src={data.skillList.collaboration.icon} alt="" />
                  </div>
                  <div className="skill-text">{data.skillList.collaboration.label}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="project">
        <Project />
      </section>
    </div>
  );
}

export default App;