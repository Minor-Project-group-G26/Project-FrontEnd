import React, {useState, useContext, useEffect} from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

const Sample = React.createContext(null)

function Testing1() {
    const [Data, setData] = useState("")
    useEffect(() => {
        console.log(Data)
    },[Data])
    return (
        <Sample.Provider value={{Data, setData}}>
            <Router>
                <Switch>
                    <Route component={Testing2} path="/1"/>

                    <Route component={Testing} path="/"/>
                </Switch>
            </Router>
        </Sample.Provider>
    )
}
function Testing() {
    const {Data, setData} = useContext(Sample)
    useEffect(() => {
    console.log(Data)
    setData("Ankur")
    })
    return (
        <div>
            {Data}
            <Link to="/1">Next</Link>
        </div>
    )
}
function Testing2() {
    const {Data, setData} = useContext(Sample)
    useEffect(() => {
    console.log(Data)
    })
    return (
        <div>
            {Data} 
        </div>
    )
}

export default Testing1
