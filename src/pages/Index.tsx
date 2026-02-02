import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import HowItWorks from '@/components/home/HowItWorks';
import StreamsPreview from '@/components/home/StreamsPreview';

const Index: React.FC = () => {
  return (
    <Layout>
      <HeroSection />
      <HowItWorks />
      <StreamsPreview />
    </Layout>
  );
};

export default Index;
