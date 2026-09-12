import React, { act } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ChemistryGame from './ChemistryGame';
import scoreReducer from './ScoreSlice';

jest.mock('../../services/importChemistryXmlService', () => ({
    getChemistryQuestionsCount: async () => ({ data: 10 }),
    getChemistryQuestionByIndex: async () => ({ data: {
        Definition: 'Place scandium', ChemicalData: 'Sc,Sc', RightResponse: 2,
    } }),
}));
jest.mock('../../services/score', () => ({ addConnection: jest.fn() }));
jest.mock('react-tooltip/dist/react-tooltip.css', () => ({}));
jest.mock('react-tooltip', () => ({ Tooltip: () => null }));
jest.mock('sweetalert2', () => ({ fire: jest.fn(), close: jest.fn() }));
jest.mock('../IntroductionChemistryPopup/ChemistryGameIntroPopup', () => () => null);

const originalElementsFromPoint = document.elementsFromPoint;
const originalElementFromPoint = document.elementFromPoint;
const originalWidth = window.innerWidth;

afterEach(() => {
    document.elementsFromPoint = originalElementsFromPoint;
    document.elementFromPoint = originalElementFromPoint;
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: originalWidth });
});

test.each(['touch', 'mouse'])('%s drag works after resizing to mobile and scores only matching drops', async (input) => {
    const store = configureStore({ reducer: { score: scoreReducer } });
    await act(async () => {
        render(<Provider store={store}><ChemistryGame /></Provider>);
    });
    const targets = await screen.findAllByTestId('dustbin');
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 375 });
    fireEvent(window, new Event('resize'));

    const drag = (symbol) => {
        const source = screen.getAllByTestId('box').find(box => box.textContent === symbol);
        document.elementsFromPoint = () => [targets[0]];
        document.elementFromPoint = () => targets[0];
        const touch = (x, y) => ({ identifier: 1, target: source, clientX: x, clientY: y });
        if (input === 'touch') {
            fireEvent.touchStart(source, { touches: [touch(50, 300)], targetTouches: [touch(50, 300)] });
            fireEvent.touchMove(source, { touches: [touch(60, 290)], targetTouches: [touch(60, 290)] });
            fireEvent.touchMove(source, { touches: [touch(80, 100)], targetTouches: [touch(80, 100)] });
        } else {
            fireEvent.mouseDown(source, { button: 0, buttons: 1, clientX: 50, clientY: 300 });
            fireEvent.mouseMove(targets[0], { buttons: 1, clientX: 60, clientY: 290 });
            fireEvent.mouseMove(targets[0], { buttons: 1, clientX: 80, clientY: 100 });
        }
        expect(document.querySelector('.element-drag-preview').textContent).toBe(symbol);
        if (input === 'touch') {
            fireEvent.touchEnd(source, { touches: [], targetTouches: [], changedTouches: [touch(80, 100)] });
        } else {
            fireEvent.mouseUp(targets[0], { button: 0, buttons: 0, clientX: 80, clientY: 100 });
        }
        expect(document.querySelector('.element-drag-preview')).toBeNull();
    };

    drag('Ti');
    expect(store.getState().score.value).toBe(0);
    expect(targets[0].textContent.trim()).toBe('');
    drag('Sc');
    expect(targets[0].textContent.trim()).toBe('Sc');
    expect(store.getState().score.value).toBe(1);
    drag('Sc');
    expect(store.getState().score.value).toBe(1);
});
