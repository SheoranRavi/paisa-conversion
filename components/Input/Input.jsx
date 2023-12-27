import { useEffect, useState } from "react";
import styles from "./Input.module.css";

export default function Input(props){
    const {value, name, isReadonly, handleValueChange} = props;
    const [currentValue, setCurrentValue] = useState(value);

    console.log('Input being rendered: ', name);

    const valueOnChange = function(e){
        console.log("Input value has changed");
        setCurrentValue(e.target.value);
        handleValueChange(e.target.value);
    }

    useEffect(() => {
        console.log('use effect running in the input comp');
        setCurrentValue(value);
    }, [value])

    return (
        <div>
            <input  className={styles.inputContainer} type="number" name={name} value={currentValue} onChange={valueOnChange} readOnly={isReadonly}></input>
        </div>
    )
}