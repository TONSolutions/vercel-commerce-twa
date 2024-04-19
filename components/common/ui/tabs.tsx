"use client";

import { Content, List, Root, Trigger } from "@radix-ui/react-tabs";
import classNames from "classnames";
import { forwardRef } from "react";

import type { TabsTriggerProps } from "@radix-ui/react-tabs";
import type {
  ComponentPropsWithoutRef,
  ElementRef,
  ForwardRefExoticComponent,
  RefAttributes
} from "react";

const Tabs = Root;

const TabsList = forwardRef<ElementRef<typeof List>, ComponentPropsWithoutRef<typeof List>>(
  ({ className, ...props }, ref) => (
    <List
      ref={ref}
      className={classNames(
        "bg-muted text-muted-foreground inline-flex h-10 items-center justify-center rounded-xl p-1",
        className
      )}
      {...props}
    />
  )
);

TabsList.displayName = List.displayName;

type TabsTriggerElemProps = ForwardRefExoticComponent<
  TabsTriggerProps & {
    variant?: "outlined" | "tabs";
  } & RefAttributes<HTMLButtonElement>
>;

const TabsTrigger = forwardRef<
  ElementRef<TabsTriggerElemProps>,
  ComponentPropsWithoutRef<TabsTriggerElemProps>
>(({ className, variant = "tabs", ...props }, ref) => (
  <Trigger
    ref={ref}
    className={classNames(
      "inline-flex items-center justify-center whitespace-nowrap  px-3 py-1.5 text-sm font-semibold transition-all",
      {
        "ring-offset-background focus-visible:ring-ring data-[state=active]:text-foreground rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#fff] data-[state=active]:shadow-sm":
          variant === "tabs",
        "relative border-none bg-none data-[state=active]:text-[#007AFF] data-[state=inactive]:text-[#8E8E93] data-[state=active]:after:absolute data-[state=active]:after:bottom-[-4px] data-[state=active]:after:left-0 data-[state=active]:after:h-[2px] data-[state=active]:after:w-full data-[state=active]:after:bg-[#007AFF]":
          variant === "outlined"
      },
      className
    )}
    {...props}
  />
));

TabsTrigger.displayName = Trigger.displayName;

const TabsContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, ref) => (
  <Content
    ref={ref}
    className={classNames(
      "ring-offset-background focus-visible:ring-ring mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));

TabsContent.displayName = Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
