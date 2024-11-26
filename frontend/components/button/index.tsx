interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
}

export function Button({ title, ...props }: ButtonProps) {
    return (
        <button
            {...props}
            className="px-4 py-3 bg-black text-white text-sm font-semibold rounded w-fit mt-6"
        >
            {title}
        </button>
    )

}