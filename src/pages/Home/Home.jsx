import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Hero from '../../sections/Hero/Hero';
import MyPortfolio from '../../sections/MyPortfolio/MyPortfolio';
import Experience from '../../sections/Experience/Experience';
import Worked from '../../sections/Worked/Worked';
import Reviews from '../../sections/Reviews/Reviews';
import Certification from '../../sections/Certification/Certification';

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
<section id="hero" data-aos="fade-in">
  <Hero />
</section>

<section id="myportfolio" data-aos="fade-up">
  <MyPortfolio />
</section>

<section id="experience" data-aos="fade-up">
  <Experience />
</section>

<section id="worked" data-aos="fade-up">
  <Worked />
</section>

<section id="reviews" data-aos="fade-up">
  <Reviews />
</section>

<section id="certifications" data-aos="fade-up">
  <Certification />
</section>
    </div>
  );
};

export default Home;
