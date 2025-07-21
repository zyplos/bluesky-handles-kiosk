import { PageButton } from "../Button";
import styles from "./styles.module.scss";

export interface HomeLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function HomeLayout({
  children,
  className,
  ...props
}: HomeLayoutProps) {
  return (
    <div
      id="root"
      className={`${styles.rootWrapper} ${className || ""}`}
      {...props}
    >
      <div className={styles.centeredContent}>{children}</div>

      <footer className={styles.footerInfo}>
        <PageButton href="/auth/signin">Claim a Bluesky Handle</PageButton>
      </footer>
    </div>
  );
}
