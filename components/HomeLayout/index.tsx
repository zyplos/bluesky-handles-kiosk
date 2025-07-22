import styles from "./styles.module.scss";

export interface HomeLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hostname: string;
}

export function HomeLayout({
  children,
  className,
  hostname,
  ...props
}: HomeLayoutProps) {
  return (
    <div
      id="root"
      className={`${styles.rootWrapper} ${className || ""}`}
      data-hostname={hostname}
      {...props}
    >
      {children}
    </div>
  );
}

//

export function CenteredContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${styles.centeredContent} ${className || ""}`} {...props}>
      {children}
    </div>
  );
}

//

export function FooterContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <footer className={`${styles.footerInfo} ${className || ""}`} {...props}>
      {children}
    </footer>
  );
}
