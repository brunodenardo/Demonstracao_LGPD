interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export function Input({ label, type, name, value, onChange, ...rest }: InputProps) {
    return (
        <div className="flex gap-6 items-end py-2">
            <label
                htmlFor={name}
                className="text-base font-light text-zinc-700 min-w-36"
            >
                {label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="min-w-80 w-full border-b border-zinc-300"
                {...rest}
            />
        </div>
    )
}