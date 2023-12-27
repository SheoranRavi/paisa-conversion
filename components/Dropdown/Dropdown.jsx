import { useState, useEffect } from "react";
import styles from "./Dropdown.module.css";

export default function Dropdown(props){
    let {options, name, defaultVal, handleChange} = props;
    const [renderCount, setRenderCount] = useState(0);

    console.log('options in dropdown: ', options);
    // sort the options array so that default val comes first and everything else remains in place.
    const sortOptions = function(){
        let idx = options.indexOf(defaultVal);
        console.log('idx of def val', idx);
        if(idx === -1)
            return;
        options = options.filter((item) => item !== defaultVal);
        options.unshift(defaultVal);
    }

    const handleOptionChange = function(e){
        console.log('Option changed: ', e.target.value);
        handleChange(e.target.value);
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
                        console.log("item is: ", item);
                        return (<option value={item} key={item}>
                            {item}
                        </option>)
                    })
                }
            </select>
        </div>
    )
}