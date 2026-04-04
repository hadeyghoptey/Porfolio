import PortfolioRoutePage from "@/components/portfolio/PortfolioRoutePage";

export const metadata = {
  title: "Portfolio | Manash Hada",
  description:
    "Experience, education, and downloadable portfolio summary for Manash Hada.",
};

export default function PortfolioRoute() {
  return (
    <PortfolioRoutePage
      currentPath="/portfolio"
      sections={["experience", "education", "portfolio"]}
      skipHref="#experience"
      skipLabel="experience"
    />
  );
}
