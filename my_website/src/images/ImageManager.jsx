import { useEffect } from 'react';
import { allImagesToPreload } from './assets.jsx'; 

export function ImagePreloader() {

    

    useEffect(() => {
        // Check if array imported correctly
        if (!allImagesToPreload || !Array.isArray(allImagesToPreload)) {
            console.error("ImagePreloader: allImagesToPreload is missing or not an array");
            return;
        }

        allImagesToPreload.forEach((src, index) => {
            // Check if one of the images in the array is missing
            if (!src) {
                console.warn(`ImagePreloader: Missing image at index ${index} in your array`);
                return;
            }
            
            const img = new Image();
            img.src = src;
        });
    }, []);

    return null; 
}