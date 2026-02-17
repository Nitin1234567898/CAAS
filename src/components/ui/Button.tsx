import React from "react";
import StarBorder from "../StarBorder"; // adjust path if needed

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary";
    color?: string;     // passes to StarBorder
    speed?: string;     // animation speed
};

export default function Button({
    children,
    variant = "primary",
    className = "",
    color = "white",
    speed = "5s",
    ...props
}: ButtonProps) {
    return (
        <StarBorder
            as="button"
            color={color}
            speed={speed}
            className={`
        px-5 py-2
        transition-all duration-200
        active:scale-95 hover:scale-[1.02]
        ${variant === "primary"
                    ? "bg-white text-black"
                    : "bg-black text-white border border-white"
                }
        ${className}
      `}
            {...props}
        >
            {children}
        </StarBorder>
    );
}
