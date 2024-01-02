import { useEffect, useState, useRef } from "react";
import styles from "./Input.module.css";
import 'font-awesome/css/font-awesome.css';

export default function Input(props) {
    const { value, name, isReadonly, handleValueChange } = props;
    const [currentValue, setCurrentValue] = useState(value);
    const inputRef = useRef(null);

    console.log('Input being rendered: ', name);

    const valueOnChange = function (e) {
        console.log("Input value has changed");
        changeValAndCompute(e.target.value);
    }

    const changeValAndCompute = function (value) {
        setCurrentValue(value);
        handleValueChange(value);
    }

    const clickPos = function () {
        let val = currentValue;
        if (typeof val === 'string') {
            val = parseInt(val, 10);
        }
        changeValAndCompute(val + 1);
    }

    const clickNeg = function () {
        changeValAndCompute(Math.max(0, currentValue - 1));
    }

    useEffect(() => {
        console.log('use effect running in the input comp');
        setCurrentValue(value);
    }, [value])

    return (
        <div className={styles.inputContainer}>
            <input
                className={styles.input}
                type="number" name={name}
                value={currentValue}
                onChange={valueOnChange}
                min={0}
                readOnly={isReadonly}
                ref={inputRef}>
            </input>
            {
                !isReadonly &&
                <div className={styles.btnContainer}>
                    <button className={styles.btn + ' ' + styles.btnUp} onClick={clickPos}><i className="fa">&#11165;</i></button>
                    <button className={styles.btn + ' ' + styles.btnDown} onClick={clickNeg}><i className="fa">&#11167;</i></button>
                </div>
            }
        </div>
    )
}