import React from 'react'
import './ChemistryGame.css';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Shapes from './Shapes.js'
import Carousels from './Carousel.js'
import ElementsTable from './ElementsTable.js'
import { useSelector, useDispatch } from 'react-redux'
import { increment, selectScore, initialize } from './ScoreSlice'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import congrats from '../../images/congratulations-7600.gif'
import Swal from "sweetalert2";



const ChemistryGame = () => {
    const score = useSelector(selectScore)
    const [result, setResult] = React.useState(5);
    const Dispatch = useDispatch();
    const period = React.useMemo(() => { return Date.now() + 20000 }, [])
    const counterRef = React.useRef();
    const [chemicalData, setChemicalData] = React.useState([['', '', 'H', '', ''], ['', '', 'LV', '', ''], ['H', 'LH', 'C', 'LH', 'H'], ['', '', 'LV', '', ''], ['', '', 'H', '', '']])
    const [question, setQuestion] = React.useState("Colorless gas produced by the decomposition of organic matter (plant and animal)")
    React.useEffect(() => {
        if (score === result) {
            Swal.fire({
                position: "middle-middle",
                icon: "success",
                title: "Right Response it is the molecule of Methane CH<sub>4</sub>",
                showConfirmButton: false,
                backdrop: `
rgba(0,0,123,0.4)
url(`+ congrats + `)
 center / cover
no-repeat
`,
                timer: 5000
            }).then(() => {
                Dispatch(initialize())
                setChemicalData([['', '', '', '', ''], ['H', 'LH', 'O', 'LH', 'H'], ['', '', '', '', '']])
                setQuestion('Colorless gas produced by the decomposition of organic matter (plant and animal)')
            })
        }
    }, [score])
    const onCompletePeriod = () => { }
    const onTickCounter = () => { }
    const onStopCounter = () => { }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="chemistry-game-container">
                <Row>
                    <Col xs={12}>
                        <div className="question-container">
                            <h3 className="question-text">{question}</h3>
                        </div>
                    </Col>
                </Row>
                
                <Row>
                    <Col xs={12}>
                        <div className="shapes-container">
                            <Shapes className="shape" Data={chemicalData} />
                        </div>
                    </Col>
                </Row>
                
                <Row>
                    <Col xs={12}>
                        <div className="carousel-container">
                            <Carousels />
                        </div>
                    </Col>
                </Row>
            </div>
        </DndProvider>
    );
    /* <Row >
     <ElementsTable />
 </Row>*/
}

export default ChemistryGame;
