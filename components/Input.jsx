export default function Input(props){
    const {isOutput, value, name} = props;

    const valueOnChange = function(e){
        console.log("Input value has changed");
    }
    return (
        <div>
            <input type="text" name={name} value={value} onChange={valueOnChange}></input>
        </div>
    )
}