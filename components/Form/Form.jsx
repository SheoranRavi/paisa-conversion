import Dropdown from "../Dropdown/Dropdown";
import Input from "../Input";
import styles from "./Form.module.css";
import { useState } from "react";

export default function Form(props) {
    const [inCurrencyValue, setInCurrencyValue] = useState(0);
    const [outCurrencyValue, setOutCurrencyValue] = useState(0);

    const options = ["USD", "INR"]
    console.log('forms styles: ', styles);
    return (
        <div>
            <div className={styles.formContainer}>
                <Dropdown name="inCurrency" options={options} defaultVal="INR"/>
                <Input name="inCurrencyValue" value={inCurrencyValue} />
                <Input name="outCurrencyValue" value={outCurrencyValue} />
                <Dropdown name="outCurrency" options={options} defaultVal="USD"/>
            </div>
        </div>
    )
}