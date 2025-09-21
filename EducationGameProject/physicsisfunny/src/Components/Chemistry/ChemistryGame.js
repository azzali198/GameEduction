import React from 'react'
import './ChemistryGame.css';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Shapes from './Shapes.js'
import Carousels from './Carousel.js'
import ElementsTable from './ElementsTable.js'
import { useSelector, useDispatch } from 'react-redux'
import { increment, selectScore, initialize,clearDropResults } from './ScoreSlice'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import congrats from '../../images/congratulations-7600.gif'
import Swal from "sweetalert2";
import { getChemistryQuestionsCount, getChemistryQuestionByIndex } from '../../services/importChemistryXmlService';
import ChemistryGameIntroPopup from '../IntroductionChemistryPopup/ChemistryGameIntroPopup';


const ChemistryGame = () => {
    const score = useSelector(selectScore)
    const [result, setResult] = React.useState(1);
    const Dispatch = useDispatch();
    const period = React.useMemo(() => { return Date.now() + 20000 }, [])
    const counterRef = React.useRef();
    const [questionsCount, setQuestionsCount] = React.useState(0);
    const [question, setQuestion] = React.useState("");
    const [chemicalData, setChemicalData] = React.useState([]);
    const [title, setTitle] = React.useState("");
    const [questionsIndex, setQuestionsIndex] = React.useState([]);
    const [showIntro, setShowIntro] = React.useState(true);

    // Fetch a chemistry question by index (example: index 0)
    const fetchAndSetRandomQuestion = async () => {

        let randomIndex;
        const response = await getChemistryQuestionsCount();
        setQuestionsCount(response.data);
        do {
            randomIndex = Math.floor(Math.random() * response.data);
        } while (questionsIndex.includes(randomIndex) && questionsIndex.length < response.data);

        if (questionsIndex.length < response.data) {
            setQuestionsIndex([...questionsIndex, randomIndex]);
            const response = await getChemistryQuestionByIndex(randomIndex);
            if (response.data) {
                setQuestion(response.data.Definition || "");
                var chemData = [];
                response.data.ChemicalData.split(';').map(row => chemData.push(row.split(',')));
                setResult(response.data.RightResponse || 0);
                setChemicalData(chemData);
                // Replace /sub with <sub> and sub/ with </sub> in ResponseText
                const formattedResponseText = response.data.ResponseText
                    .replace(/\/sub/g, '<sub>')
                    .replace(/sub\//g, '</sub>');
                setTitle(formattedResponseText || "");
            }
        }

        else {
            alert(questionsIndex.length + " " + questionsCount);
            Swal.fire({
                icon: 'info',
                title: 'Game Over',
                text: 'All questions have been answered!',
                confirmButtonText: 'OK'
            });
            return;
        }
    };

    React.useEffect(() => {
        // fetchAndSetRandomQuestion();
    }, [questionsIndex]);

    React.useEffect(() => {
        if (score === 0) {
            fetchAndSetRandomQuestion();
        }

        if (score === result) {
            Swal.fire({
                position: "middle-middle",
                icon: "success",
                title: title,
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
                Dispatch(clearDropResults());
                fetchAndSetRandomQuestion()
            })
        }
    }, [score])
    const onCompletePeriod = () => { }
    const onTickCounter = () => { }
    const onStopCounter = () => { }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="chemistry-game-container">
                {showIntro && <ChemistryGameIntroPopup onClose={() => setShowIntro(false)} />}
                <Row>
                    <Col xs={12}>
                        <div className="question-container">
                            <h4 className="question-text">{question}</h4>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12}>
                        <div
                            className="shapes-container"
                        >
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
