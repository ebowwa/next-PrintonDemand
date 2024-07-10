import React, { ReactNode } from "react";

export interface ScrollingSvgProps {
    svgHeight: number;
    y1: number;
    y2: number;
  }
  export interface TracingBeamProps {
    children: ReactNode;
    className?: string;
  }