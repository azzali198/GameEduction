import React, {useState} from 'react';
import WheelComponent from 'react-wheel-of-prizes';


const SpinningWheel = ({isDisplayed, onFinishing}) => {
    const modalStyles = "fixed top-20  w-full h-full flex items-center justify-center";
    const modalContentStyles = "absolute bg-white text-card-foreground p-6 rounded-lg shadow-lg";
    const modalTitleStyles = "text-2xl font-bold mb-4 text-blue-600"; // Google Blue color
    const modalTextStyles = "mb-4 text-blue-600";
    const closeButtonStyles = "bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/80";
    const segments = [
        "⓪ Modern Physics",
        "① Mechanics",
        "② Relativity",
        "③ Thermodynamics",
        "④ Optic",
        "⑤ Electromagnetism"
      ]; 


      const segColors = [ '#EE4040',
        '#F0CF50',
        '#815CD1',
        '#3DA5E0',
        '#34A24F',
        '#F9AA1F',
        '#EC3F3F',
        '#FF9000',
        '#F0CF50',
        '#815CD1',
        '#3DA5E0',
        '#34A24F',
        '#F9AA1F',
        '#EC3F3F',
        '#FF9000'];
      const onFinished = (winner) => {
        console.log(winner);
      };
    
      return (
        <div className={modalStyles} style={{paddingLeft:'20%'}}>
            <WheelComponent 
                  segments={segments}
                  segColors={segColors}
                  onFinished= {(win) => {onFinishing(win)}}
                  primaryColor="black"
                  contrastColor="white"
                  buttonText="Choose"
                  isOnlyOnce={false}
                  size={250}
                  upDuration={200}
                  downDuration={800}
                  fontFamily="Arial"
                />
          </div>
       
      );
 
    






}


export default SpinningWheel