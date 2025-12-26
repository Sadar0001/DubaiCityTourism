import HeroSection from "../components/HeroSection";
import TopExperiences from "../components/TopExperiences";
import Corousal from "../components/corousal/Corousal";
import InfoSection from "../components/InfoSection";
import StoriesMain from "../components/stories/StoriesMain";

function HomePage() {
  return (
    <div className="space-y-8 pb-10">
      <HeroSection />
      <TopExperiences />
      <Corousal />
      <InfoSection />
      <StoriesMain />
    </div>
  );
}

export default HomePage;
