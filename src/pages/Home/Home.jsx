import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Hero from '../../sections/Hero/Hero';
import MyPortfolio from '../../sections/MyPortfolio/MyPortfolio';
import Experience from '../../sections/Experience/Experience';
import Worked from '../../sections/Worked/Worked';

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <div>
      <section data-aos="fade-in">
        <Hero />
      </section>

      <section data-aos="fade-up">
        <MyPortfolio />
      </section>
      <section data-aos="fade-up">
        <Experience></Experience>
      </section>
      <section data-aos="fade-up">
        <Worked></Worked>
      </section>
    </div>
  );
};

export default Home;
