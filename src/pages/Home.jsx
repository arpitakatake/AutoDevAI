import React from 'react';
import Hero from '../components/Hero.jsx';
import Workflow from '../components/Workflow.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import WhyAutoDevAI from '../components/WhyAutoDevAI.jsx';
import About from '../components/About.jsx';
import CTA from '../components/CTA.jsx';

export default function Home() {
  return (
    <main className="landing-page-main">
      <Hero />
      <Workflow />
      <HowItWorks />
      <WhyAutoDevAI />
      <About />
      <CTA />
    </main>
  );
}
