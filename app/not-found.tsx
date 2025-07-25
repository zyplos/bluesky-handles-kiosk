import { PageButton } from "@/components/Button";
import { MainLayout } from "@/components/MainLayout";

export default function NotFound() {
  return (
    <MainLayout hostname="">
      <div className="textContent">
        <h2>404</h2>
        <p>Couldn't find whatever it is you requested</p>
        <p>
          <PageButton href="/">Return Home</PageButton>
        </p>
      </div>
    </MainLayout>
  );
}
