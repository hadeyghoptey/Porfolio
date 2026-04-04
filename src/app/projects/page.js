import PortfolioRoutePage from "@/components/portfolio/PortfolioRoutePage";

export const metadata = {
  title: "Projects | Manash Hada",
  description:
    "Projects and technical stack for Manash Hada across offensive security workflows, scripting, hardware, and web delivery.",
};

export default function ProjectsRoute() {
  return (
    <PortfolioRoutePage
      currentPath="/projects"
      sections={["projects", "stack"]}
      skipHref="#projects"
      skipLabel="projects"
    />
  );
}
