import React, {useState, useEffect} from 'react';
import './CalculatorBase.css';
import {numbersAndSymbolsFirstColumn, symbolsSecondColumn} from "./Utils/ButtonsValues";

const styles = {
    buttonsSC: {
        width: '92%'
    }
};

const CalculatorBase = ({themeColor}) => {
    const [firstValue, setFirstValue] = useState('');
    const [secondValue, setSecondValue] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState(0);
    const [operator, setOperator] = useState('');
    const [fakeValueFormat, setFakeValueFormat] = useState();

    useEffect(() => {
        if (result !== 0) {
            setResult(result.toLocaleString());
        }
    }, [result]);

    useEffect(() => {
        setFirstValue(firstValue.toLocaleString());
    }, [firstValue])

    const handleButtonClick = (e) => {
        switch (e.currentTarget.attributes.type.nodeValue) {
            case 'number':
                if (showResult)
                    return;

                setFirstValue(firstValue + e.currentTarget.value);
                const digits = parseFloat(firstValue + e.currentTarget.value);
                setFakeValueFormat(digits.toLocaleString());
                break;

            case 'text':
                if (!firstValue && !operator && !secondValue && result)
                    return;

                if (firstValue.indexOf('.') === -1) {
                    setFirstValue(firstValue + e.currentTarget.value);
                }
                break;

            case 'operator':
                if (!firstValue)
                    return;

                if (showResult)
                    return;

                if (secondValue && operator && !firstValue)
                    return;

                if (firstValue && operator && secondValue) {
                    const firstV = parseFloat(secondValue);
                    const secondV = parseFloat(firstValue);
                    setOperator(e.currentTarget.value);
                    setSecondValue(handleOperation(operator, firstV, secondV));
                    setFirstValue('');
                    return;
                }

                setSecondValue(firstValue);
                setFirstValue('');
                setOperator(e.currentTarget.value);
                break;

            case 'result':
                if (result !== 0) {
                    return;
                }

                if (!secondValue && !operator) {
                    handleDeleteButton();
                    return;
                }

                if (secondValue && operator && !firstValue) {
                    handleDeleteButton();
                    return;
                }

                const firstV = parseFloat(secondValue);
                const secondV = parseFloat(firstValue);
                setShowResult(true);
                setResult(handleOperation(operator, firstV, secondV));
                setFirstValue('');
                setSecondValue('');
                setOperator('');
                break;

            case 'delete':
                handleDeleteButton();
                break;

            default:
                break;
        }
    };

    const handleDeleteButton = () => {
        setFirstValue('');
        setSecondValue('');
        setOperator('');
        setResult(0);
        setShowResult(false);
    };

    const handleOperation = (operator, firstVal, secondVal) => {
        switch (operator) {
            case '+':
                return (firstVal + secondVal);

            case '-':
                return (firstVal - secondVal);

            case 'x':
                return (firstVal * secondVal);

            case '/':
                return (firstVal / secondVal);

            case '%':
                return (firstVal % secondVal);

            default:
                return;
        }
    };

    return (
        <div className={themeColor ? 'CalculatorBase darkCalculatorBase' : 'CalculatorBase'}>
            <div className="displayContainer">
                <div className={themeColor ? 'display darkDisplay' : 'display'}>
                    {!firstValue ? result : fakeValueFormat}
                </div>
            </div>
            <div className="buttonsContainer">
                <div className="valueButtonsContainerFirstColumn">
                    {numbersAndSymbolsFirstColumn?.map((button, key) => {
                        if (button.type !== 'number' && button.type !== 'text' && button.type !== 'delete')
                            return (<button key={key}
                                            className={themeColor ? 'valueButton notNumber darkValueButton' : 'valueButton notNumber'}
                                            value={button.value}
                                            type={button.type}
                                            onClick={handleButtonClick}>{button.value}</button>);

                        if (button.type === 'delete')
                            return (<button key={key}
                                            className={themeColor ? 'valueButton notNumber darkValueButton darkDeleteButton' : 'deleteButton valueButton notNumber'}
                                            value={button.value}
                                            type={button.type}
                                            onClick={handleButtonClick}>{button.value}</button>);

                        return (<button key={key}
                                        className={themeColor ? 'valueButton darkValueButton' : 'valueButton'}
                                        value={button.value}
                                        type={button.type}
                                        onClick={handleButtonClick}>{button.value}</button>)
                    })}
                </div>
                <div className="valueButtonsContainerSecondColumn">
                    {symbolsSecondColumn?.map((button, key) => {
                        if (button.value === '+')
                            return (<button key={key}
                                            className={themeColor ? 'valueButton notNumber darkValueButton buttonPlusOperator' : 'valueButton notNumber buttonPlusOperator'}
                                            value={button.value}
                                            type={button.type}
                                            onClick={handleButtonClick}>{button.value}</button>);

                        return (<button key={key}
                                        style={styles.buttonsSC}
                                        className={themeColor ? 'valueButton notNumber darkValueButton darkDeleteButton' : 'deleteButton valueButton notNumber'}
                                        value={button.value}
                                        type={button.type}
                                        onClick={handleButtonClick}>{button.value}</button>);
                    })}
                </div>
            </div>
        </div>
    )
}

export default CalculatorBase;