import { useState } from "react";

export default function useLocalStorage(key, value) {
    const [localValue, setLocalValue] = useState(() => {
        if (localStorage.getItem(key) !== null) {
            return JSON.parse(localStorage.getItem(key))
        }else{
            if(typeof value === "function"){
                return value()
            }else{
                return value
            }
        }
    })

    function setNewLocalValue(newLocalValue) {
        if (typeof newLocalValue === "function") {
            const newValue = newLocalValue(localValue)
            localStorage.setItem(key,JSON.stringify(newValue))
            setLocalValue(newValue)
            
        } else {
            localStorage.setItem(key, JSON.stringify(newLocalValue))
            setLocalValue(newLocalValue)
        }

    }

    return [localValue, setNewLocalValue]
}