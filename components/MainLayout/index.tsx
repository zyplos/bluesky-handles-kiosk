import styles from "./styles.module.scss";

export interface MainLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hostname: string;
}

export function MainLayout({
  children,
  className,
  hostname,
  ...props
}: MainLayoutProps) {
  return (
    <div
      id="root"
      className={`${styles.mainWrapper} ${className || ""}`}
      data-hostname={hostname}
      {...props}
    >
      <div className="responsiveCenteredContainer">{children}</div>
    </div>
  );
}
