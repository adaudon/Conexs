import { Alert, Button, TextField } from "@mui/material";
import { useState } from "react";
// import React from "react";

type Molecule3DProps = {
    moleculedata: string,
    setmoleculeData: (moleculedata: string)=> void
}

function MoleculeDataTextArea(props: Molecule3DProps) {
    const initialSetup = props.moleculedata.split("\n")
    
    const [atoms, setAtoms] = useState<number>(Number(initialSetup[0]))
    const [comment, setComment] = useState<string>(initialSetup[1])
    const [data, setData] = useState<string>(initialSetup.slice(2,).join("\n"))
    const [error, setError] = useState<string[]>([""])
    const [isError, setIsError] = useState<boolean>(false)
    
    function validateMoleculeData(data:string):string {
        const a = data.split("\n")
        let errorList = ""

        for (let index = 0; index < a.length; index++) {
            const b = a[index].split(/\b\s+/)
            if (b.length!=4) {
                errorList = errorList + "Wrong number of items on line " + (index + 1) + "\n"
                setIsError(true)
            }
            if (!/^[a-zA-Z]+$/.test(b[0])) {
                errorList = errorList + "Invalid chemical on line " + (index + 1) + "\n"
                setIsError(true)
            }
            if (!/^[+-]?[0-9]{1,}(?:\.[0-9]{1,})?$/.test(b[1]) ||
                !/^[+-]?[0-9]{1,}(?:\.[0-9]{1,})?$/.test(b[2]) ||
                !/^[+-]?[0-9]{1,}(?:\.[0-9]{1,})?$/.test(b[3])) {
                errorList = errorList + "Invalid number on line " + (index + 1) + "\n"
                setIsError(true)
            }
        }
        return errorList;
    }

    function renderMolecule() {
        const errors = validateMoleculeData(data)
        if (errors == "") {
            setIsError(false)
            props.setmoleculeData(atoms + "\n" + comment + "\n" + data)
        } else {
            const temp = errors.split("\n");
            temp.length = temp.length -1
            setError(temp)}
    }

    return (
        <>
        <TextField
            id="atomBox"
            label="Atoms"
            value={atoms}
            sx={{m: 2, width: "64px"}}
            disabled
        />
        <TextField
            id="Comment/Lattice"
            label="Comment/Lattice"
            value={comment}
            sx={{m: 2, width: "calc(100% - 128px)"}}
            onChange={(e) => setComment(e.target.value)}
        />
        <TextField
            id="datafilebox"
            label="Molecule Data"
            multiline
            rows={20}
            value={data}
            sx={{m: 2, width: "100%"}}
            onChange={(e) => {
                setAtoms(e.target.value.split("\n").length)
                setData(e.target.value)
            }}
        />
        <Button
            variant="contained"
            sx={{m: 2, width: "100%"}}
            onClick={renderMolecule}
        >Render</Button>
        {isError ? <Alert
            variant="filled"
            sx={{m: 2, width: "100%"}}
            severity="error">
                <ul style={{padding: 0}}>
                    {error.map((data, index) => {return <li key={index} style={{listStyle: "none"}}>{data}</li>})}
                </ul>
        </Alert> : <></>}
      </>
)}

export default MoleculeDataTextArea;