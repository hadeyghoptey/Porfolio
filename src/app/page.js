import HomeFirstLoadGate from "@/components/portfolio/HomeFirstLoadGate";
import PortfolioPage from "@/components/portfolio/PortfolioPage";

export default function Home() {
  return (
    <HomeFirstLoadGate>
      <PortfolioPage />
    </HomeFirstLoadGate>
  );
}
