import PortfolioPage from "./[lang]/page";
import LangLayout from "./[lang]/layout";

export default function RootPage() {
  return (
    <LangLayout params={Promise.resolve({ lang: "en" })}>
      <PortfolioPage />
    </LangLayout>
  );
}
