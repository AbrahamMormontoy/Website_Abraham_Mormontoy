import { useEffect } from 'react';
import { allImagesToPreload } from './assets.jsx'; 

export function ImagePreloader() {

    

    useEffect(() => {
        // SAFETY CHECK 1: Did the array import correctly?
        if (!allImagesToPreload || !Array.isArray(allImagesToPreload)) {
            console.error("ImagePreloader: allImagesToPreload is missing or not an array!");
            return;
        }

        allImagesToPreload.forEach((src, index) => {
            // SAFETY CHECK 2: Is one of the images inside the array missing?
            if (!src) {
                console.warn(`ImagePreloader: Missing image at index ${index} in your array!`);
                return;
            }
            
            const img = new Image();
            img.src = src;
        });
    }, []);

    return null; 
}