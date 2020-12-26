interface CreateRgbaColorProps {
	/** The amount of red, a value between 0 and 255 */
	red: number;
	/** The amount of green, a value between 0 and 255 */
	green: number;
	/** The amount of blue, a value between 0 and 255 */
	blue: number;
	/** The amount of alpha channel, a value between 0 and 1 */
	alpha?: number;
}

export const createRgbaColor = ({ red, green, blue, alpha = 1 }: CreateRgbaColorProps) => {
	// Ensure colour is within the boundaries of RGBA
	if (red > 255) red = 255;
	if (red < 0) red = 0;

	if (green > 255) green = 255;
	if (green < 0) green = 0;

	if (blue > 255) blue = 255;
	if (blue < 0) blue = 0;

	if (alpha > 1) alpha = 1;
	if (alpha < 0) alpha = 0;

	return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};
