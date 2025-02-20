import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    // Base styles that always apply
    const baseStyles = [
      'rounded-md',
      'font-medium',
      'transition-all',
      'duration-200',
      'focus:outline-none',
      'focus:ring-2',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed'
    ].join(' ');

    // Variant styles
    const variants = {
      primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
      secondary: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500',
      outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-indigo-500',
      ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-indigo-500',
    };

    // Size styles
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    // Combine classes in specific order (base -> variant -> size -> custom)
    const combinedClasses = [
      baseStyles,
      variants[variant],
      sizes[size],
      className // Custom classes come last to allow overrides
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        className={combinedClasses}
        {...props}
      >
        {children}
      </button>
    );
  }
);

CustomButton.displayName = 'Button';

export default CustomButton;