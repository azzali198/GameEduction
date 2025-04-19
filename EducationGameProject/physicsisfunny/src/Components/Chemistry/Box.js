import React from 'react';
import {useDrag} from 'react-dnd';
import {Rectangle, Circle, Ellipse, Line, Polyline, CornerBox, Triangle} from 'react-shapes';
import { useSelector, useDispatch } from 'react-redux'
import {increment, selectScore} from './ScoreSlice'

const Box = ({name, type}) => {
 const Dispatch = useDispatch();
const [{isDragging},drag] = useDrag(() => ({
type: type,
item: {name},
end: (item,monitor) => {
const dropResult = monitor.getDropResult();
if(item && dropResult && monitor.didDrop())
{
   // alert(`You dropped ${item.name} into ${dropResult.name}`)
    dropResult.name = item.name;
    Dispatch(increment())
}
},
collect:(monitor) => ({
    isDragging: monitor.isDragging(),
    handlerId: monitor.getHandlerId()
})
}));
const opacity = isDragging ? 0.4 : 1;
return (
    <div ref={drag} style={{border:'1px solid black',borderRadius:'50%',opacity:opacity,width:'4rem',height:'4rem', textAlign:'center', margin:'0px',paddingTop:'12px'}} data-testid={`box`} >
        <center> <h3 style={{verticalAlign:'middle'}}>{name}</h3></center> 
          
    </div>
)


}

export default Box;