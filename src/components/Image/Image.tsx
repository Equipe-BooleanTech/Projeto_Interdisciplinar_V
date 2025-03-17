import React from "react";
import Svg from "react-native-svg";
import { ImageProps } from "./Image.interface";

const Image = ({ svg: SvgComponent, imgWidth, imgHeight, viewBox }: ImageProps) => {
    // If SvgComponent is a component (function), render it properly
    if (typeof SvgComponent === 'function') {
        return <SvgComponent width={imgWidth} height={imgHeight} viewBox={viewBox} />;
    }
    
    // If it's already a rendered element, wrap it in Svg
    return (
        <Svg width={imgWidth} height={imgHeight} viewBox={viewBox}>
            {SvgComponent}
        </Svg>
    );
};

export default Image;