import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import Link, { type LinkProps } from "next/link";
import clsx from "clsx";
import styles from "./styles.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  outlined?: boolean;
  small?: boolean;
  variant?: "alt";
}

export function Button({
  className,
  children,
  outlined = false,
  small = false,
  variant,
  ...props
}: ButtonProps) {
  return (
    <>
      <button
        type="button"
        className={clsx(
          styles.button,
          outlined && styles.outlined,
          small && styles.small,
          variant && styles[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    </>
  );
}

//

interface PageButtonProps
  extends LinkProps,
    React.HTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  className?: string;
}

export function PageButton({
  href,
  className,
  children,
  style,
  ...props
}: PageButtonProps) {
  return (
    <>
      <Link href={href} className={clsx(styles.button, className)} {...props}>
        {children}
      </Link>
    </>
  );
}

//

interface NewTabButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

export function NewTabButton({
  href,
  className,
  children,
  ...props
}: NewTabButtonProps) {
  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={clsx(className, styles.button)}
        {...props}
      >
        {children}
      </a>
    </>
  );
}
