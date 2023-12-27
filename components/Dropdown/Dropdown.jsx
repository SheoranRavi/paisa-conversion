import { useState, useEffect } from "react";
import styles from "./Dropdown.module.css";

export default function Dropdown(props){
    let {options, name, defaultVal, handleChange} = props;
    const [renderCount, setRenderCount] = useState(0);

    console.log('Dropdown being rendered: ', name);
    // sort the options array so that default val comes first and everything else remains in place.
    const sortOptions = function(){
        let idx = options.indexOf(defaultVal);
        if(idx === -1)
            return;
        options = options.filter((item) => item !== defaultVal);
        options.unshift(defaultVal);
    }

    const handleOptionChange = function(e){
        console.log('Option changed: ', e.target.value);
        let eventArgs = {
            currencySelected: e.target.value,
            name: name
        };
        handleChange(eventArgs);
    }

    useEffect(() => {
        sortOptions();
        setRenderCount(renderCount+1);
    }, [])

    sortOptions();

    return(
        <div className={styles.dropdownContainer}>
            <select name={name} className={styles.select} onChange={handleOptionChange}>
                {
                    options.map(item => {
                        return (<option value={item} key={item}>
                            {item}
                        </option>)
                    })
                }
            </select>
        </div>
    )
}