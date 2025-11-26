
type Props = {
    buttonValue: string,
    optionalStyle?: string,
    onClick: (value: string) => void
}

function Button({buttonValue, optionalStyle, onClick}: Props) {
    return (
        <button onClick={() => {onClick(buttonValue)}} className={`select-none hover:scale-105 active:scale-99 transition-all hover:cursor-pointer text-black bg-neutral-200 hover:bg-neutral-300 border shadow-2xl font-bold rounded-md text-2xl ${optionalStyle ? optionalStyle : undefined }`}>
            {buttonValue}
        </button>
    )
}

export default Button