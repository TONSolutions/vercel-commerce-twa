"use client";

import { Content, List, Root, Trigger } from "@radix-ui/react-tabs";
import classNames from "classnames";
import { forwardRef } from "react";

const Tabs = Root;

const TabsList = forwardRef<
  React.ElementRef<typeof List>,
  React.ComponentPropsWithoutRef<typeof List>
>(({ className, ...props }, ref) => (
  <List
    ref={ref}
    className={classNames(
      "bg-muted text-muted-foreground inline-flex h-10 items-center justify-center rounded-xl p-1",
      className
    )}
    {...props}
  />
));

TabsList.displayName = List.displayName;

const TabsTrigger = forwardRef<
  React.ElementRef<typeof Trigger>,
  React.ComponentPropsWithoutRef<typeof Trigger>
>(({ className, ...props }, ref) => (
  <Trigger
    ref={ref}
    className={classNames(
      "ring-offset-background focus-visible:ring-ring data-[state=active]:text-foreground inline-flex items-center justify-center whitespace-nowrap rounded-xl px-3 py-1.5 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#fff] data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
));

TabsTrigger.displayName = Trigger.displayName;

const TabsContent = forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
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
