import React from 'react';
import {useDrop} from 'react-dnd';


const Containers = ({name, accept}) => {
 const [containerName, setContainerName] = React.useState(name) 
 const [backgroundColor, setBackgroundColor] = React.useState('blue') 
const [{canDrop, isOver, didDrop},drop] = useDrop(() =>({
accept:accept,
drop:(item,monitor) => {
    console.log(JSON.stringify(item));
    console.log(JSON.stringify(monitor.getDropResult()));
   setContainerName(item.name);
   setBackgroundColor('green');
return {name : item.name}
},
collect:(monitor) => ({
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    didDrop: monitor.didDrop()
}),
}))
const isActive = canDrop && isOver;

return (
<div ref={drop} style={{borderRadius:'50%', width:'4rem', height:'4rem',backgroundColor : backgroundColor,  textAlign:'center',verticalAlign:'middle',paddingTop:'12px'}} data-testid="dustbin" >
<center><h3 style = {{verticalAlign:'middle', alignContent:'center'}}>{containerName} </h3></center>
</div>

)
}

export default Containers;