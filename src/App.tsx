import { useState } from "react"
import Button from "./component/button"

type Operation = "+" | "-" | "x" | "÷"

function App() {
  const [screenValue, setScreenValue] = useState<number>(0)
  const [previewValue, setPreviewValue] = useState<null | number>(null)
  const [inMemoryOperation, setInMemoryOperation] = useState<null | Operation>()

  function screenValueManager({ number = 0, concatenate = true, clear}: {number?: number, concatenate?: boolean, clear?: boolean}) {
    if (clear) {
      setScreenValue(0)
      return
    }
    if (concatenate) {
      const concatenatedValue = screenValue.toString() + number.toString()
      setScreenValue(Number(concatenatedValue))
      return
    }
    setScreenValue(number)
  }
  function previewAndMemoryValueManager({ number = 0, operation, clear}: {number?: number, operation?: Operation, clear?: boolean}) {
    if (clear) {
      setPreviewValue(null)
      return
    }
    setPreviewValue(number)
    setInMemoryOperation(operation)
  }

  function writeNumberInScreen(number: string) {
    if (number === "0" && screenValue === 0) return
    screenValueManager({number: Number(number)})
  }

  function resolveInQueueOperation() {
    if (!previewValue) return
    switch (inMemoryOperation) {
      case "+":
        return previewValue + screenValue
      case "-":
        return previewValue - screenValue
      case "x":
        return previewValue * screenValue
      case "÷":
        return screenValue / previewValue
    }
  }

  function clearALl() {
    setInMemoryOperation(null)
    previewAndMemoryValueManager({clear: true})
    screenValueManager({clear: true})
  }

  function AddOperationInMemory(operation: string) {
    if (screenValue === 0) return
    const buttonOperation = operation as Operation
    const result = previewValue ? resolveInQueueOperation() : screenValue

    previewAndMemoryValueManager({number: result, operation: buttonOperation})
    screenValueManager({clear: true})
  }

  function resolveOperation() {
    if (screenValue === 0) return
    const result = resolveInQueueOperation()
    screenValueManager({number: result, concatenate: false})
    previewAndMemoryValueManager({clear: true})
  }

  return (
    <div className="h-screen w-screen bg-neutral-800 flex justify-center items-center">
        <div className="relative h-[450px] w-[400px] bg-neutral-800 p-4 flex flex-col rounded-2xl shadow shadow-neutral-400 border border-neutral-400 text-white">
            <label className="absolute right-5 top-2 font-bold text-[12px] w-fit">{previewValue ? previewValue.toString() + inMemoryOperation : ""}</label>
            <section className="h-14 w-full shadow-xs flex flex-col justify-center items-end pr-3 pt-1 rounded-2xl hover:border hover:border-white" onClick={async () => {navigator.clipboard.writeText(screenValue.toString()); alert("Valor copiado para area de transferencia")}}>
                <label className="h-full font-bold w-fit text-[30px] text-center">{screenValue.toString()}</label>
            </section>


            <section className="w-full h-[80%] p-2 grid grid-cols-3 gap-2">

              <Button buttonValue={"1"} onClick={writeNumberInScreen}/>
              <Button buttonValue={"2"} onClick={writeNumberInScreen}/>
              <Button buttonValue={"3"} onClick={writeNumberInScreen}/>
              <Button buttonValue={"4"} onClick={writeNumberInScreen}/>
              <Button buttonValue={"5"} onClick={writeNumberInScreen}/>
              <Button buttonValue={"6"} onClick={writeNumberInScreen}/>
              <Button buttonValue={"7"} onClick={writeNumberInScreen}/>
              <Button buttonValue={"8"} onClick={writeNumberInScreen}/>
              <Button buttonValue={"9"} onClick={writeNumberInScreen}/>
              <Button buttonValue={"-"} onClick={AddOperationInMemory}/>
              <Button buttonValue={"0"} onClick={writeNumberInScreen}/>
              <Button buttonValue={"x"} onClick={AddOperationInMemory}/>
              <Button buttonValue={"+"} onClick={AddOperationInMemory}/>
              <Button buttonValue={"÷"} onClick={AddOperationInMemory}/>
              <Button buttonValue={"C"} onClick={clearALl}/>
              <Button buttonValue={"="} onClick={resolveOperation} optionalStyle="col-span-3"/>
            </section>
        </div>
    </div>
  )
}

export default App
