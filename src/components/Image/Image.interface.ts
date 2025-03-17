import React, { ReactElement } from "react";
import { SvgProps } from "react-native-svg";

export interface ImageProps {
    svg: React.ComponentType<SvgProps> | ReactElement;
    imgWidth: string | number;
    imgHeight: string | number;
    viewBox?: string;
}