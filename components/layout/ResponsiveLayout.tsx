import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type PolymorphicProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
};

export function ResponsiveContainer<T extends ElementType = "div">({
  as,
  children,
  className,
  fullWidth = false,
  ...props
}: PolymorphicProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof PolymorphicProps<T>> & {
    fullWidth?: boolean;
  }) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn(
        "w-full min-w-0 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-16",
        !fullWidth && "mx-auto max-w-[1440px]",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function ResponsiveSection<T extends ElementType = "section">({
  as,
  children,
  className,
  contained = true,
  fullWidth = false,
  ...props
}: PolymorphicProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof PolymorphicProps<T>> & {
    contained?: boolean;
    fullWidth?: boolean;
  }) {
  const Component = as ?? "section";
  const content = contained ? (
    <ResponsiveContainer fullWidth={fullWidth}>{children}</ResponsiveContainer>
  ) : (
    children
  );

  return (
    <Component
      className={cn("w-full min-w-0 py-[var(--section-space)]", className)}
      {...props}
    >
      {content}
    </Component>
  );
}

export function ResponsiveGrid<T extends ElementType = "div">({
  as,
  children,
  className,
  minItemWidth = "18rem",
  ...props
}: PolymorphicProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof PolymorphicProps<T>> & {
    minItemWidth?: string;
  }) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn(
        "grid min-w-0 gap-[var(--grid-gap)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,var(--grid-item-min)),1fr))]",
        className,
      )}
      style={{ "--grid-item-min": minItemWidth } as CSSProperties}
      {...props}
    >
      {children}
    </Component>
  );
}
