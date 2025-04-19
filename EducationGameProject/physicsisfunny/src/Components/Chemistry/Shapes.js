import React from "react";
import { Rectangle, Circle, Ellipse, Line, Polyline, CornerBox, Triangle } from 'react-shapes';
import LineTo from 'react-lineto';
//import DataTable, { createTheme } from 'react-data-table-component';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Containers from './Container.js'

import 'bootstrap/dist/css/bootstrap.min.css';
const Shapes = ({Data}) => {


 


    return (
        <div>

           {Data && <Container >
                {
                    Data.map((obj) => {
                        return (

                            <Row>
                               {
                                obj.map((col) => {
                                    if (col !== null && col !== '') {
                                        
                                        if (col === 'LH') {
                                            return (<Col style={{padding:'0px',margin:'0px'}}><br/> <Rectangle  style={{ verticalAlign: 'middle' ,padding:'0px',margin:'0px'}} width='100%' height={10} fill={{ color: 'gray' }} /></Col>)
                                        }
                                        else if (col === 'LV') {
                                            return (<Col style={{padding:'0px',margin:'0px'}}><center> <Rectangle  style={{padding:'0px',margin:'0px'}} width={10} height={100} fill={{ color: 'gray' }} /></center> </Col>)
                                        }
                                        else {
                                            return (<Col style={{padding:'0px',margin:'0px'}}> <center><Containers style={{padding:'0px',margin:'0px'}} name='' accept={col} /></center> </Col>)
                                        }
                                    }
                                })
                               }

                            </Row>



                        );
                    })
                }
            </Container>}




        </div>)


}

export default Shapes;