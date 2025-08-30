type Props = {
    placeholder: string
    value: string;
    error: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

}
const InputComponent = ({ placeholder, value, error, onChange }: Props) => {
    return (
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`w-full mb-3 p-2 rounded-lg border  bg-slate-900 text-white placeholder-slate-400 focus:outline-none
                ${error ? "border-red-500" : "border-slate-600"
                }`}
        />
    )
}
export default InputComponent