import React from 'react';
import clsx from 'clsx';

export type MaterialIconName =
	| 'palette'
	| 'check'
	| 'light_mode'
	| 'dark_mode'
	| 'arrow_drop_down'
	| 'arrow_drop_up'
	| 'smart_toy'
	| 'arrow_outward'
	| 'download'
	| 'arrow_forward'
	| 'person';

export type IconProps = {
	name: MaterialIconName | string;
	filled?: boolean;
	className?: string;
} & React.HTMLAttributes<HTMLSpanElement>;

const Icon: React.FC<IconProps> = ({
	name,
	filled = false,
	className,
	...props
}) => {
	const iconClass = clsx(
		'material-symbols-rounded',
		{
			'icon-filled': filled || name === 'palette',
		},
		className,
	);

	return (
		<span aria-hidden="true" className={iconClass} {...props}>
			{name}
		</span>
	);
};

export default Icon;
