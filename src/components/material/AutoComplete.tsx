import { createRgbaColor } from '#utils/createRgbaColor';
import useStateWithCallback from '#utils/useStateWithCallbackLazy';
import Grid from '@material-ui/core/Grid';
import { enUS } from '@material-ui/core/locale';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TextField, { TextFieldProps as MUITextFieldProps } from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MAutoComplete, { AutocompleteProps as MAutocompleteProps } from '@material-ui/lab/Autocomplete';
import { Primitive, toTitleCase } from '@sapphire/utilities';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import clsx from 'clsx';
import React, { ChangeEvent, memo, ReactElement, useEffect, useState } from 'react';

export interface GroupableAutoCompleteOption {
	label: string;
	groupName: string;
	color: string;
}

interface AutoCompleteProps<T extends GroupableAutoCompleteOption>
	extends Omit<MAutocompleteProps<T, false, boolean, false>, 'renderInput' | 'options' | 'onChange'> {
	/**
	 * The options that can be selected from
	 */
	options: T[];
	/**
	 * The default value for the search field.
	 * @default null
	 */
	defaultSearchValue?: T | null;
	/**
	 * Whether this input is disabled
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Resets the current value to the [[defaultSearchValue]]
	 */
	triggerValueReset?: Primitive;
	/**
	 * Additional props applied to the input TextField
	 * @remark Put props like `error`, `helperText`, `required` and `autofocus` here!
	 * @default undefined
	 */
	TextFieldProps?: MUITextFieldProps;
	/**
	 * Method to trigger when a change is registered of the selection
	 * @param newOption The newly selected option
	 */
	handleChange(newOption: T): void;
}

const useStyles = makeStyles(() =>
	createStyles({
		disabledTextField: {
			backgroundColor: createRgbaColor({ red: 242, green: 242, blue: 242 })
		}
	})
);

function AutoComplete<T extends GroupableAutoCompleteOption>({
	TextFieldProps,
	defaultSearchValue = null,
	disabled = false,
	triggerValueReset,
	handleChange,
	options,
	placeholder,
	...props
}: AutoCompleteProps<T>): ReactElement<AutoCompleteProps<T>> {
	const [value, setValue] = useStateWithCallback<T | null>(defaultSearchValue);
	const [inputValue, setInputValue] = useState(defaultSearchValue?.label ?? '');
	const classes = useStyles();

	const handleAfterStateChange = (newOption: T | null) => {
		if (newOption) {
			handleChange(newOption);
		}
	};

	const handleLocalChange = (newOption: T | null) => {
		setValue(newOption, () => handleAfterStateChange(newOption));
	};

	const contains = (toMatch: string, matchAgainst: string): boolean => {
		return toMatch.toLowerCase().includes(matchAgainst.toLowerCase());
	};

	useEffect(() => {
		if (triggerValueReset !== undefined) {
			setValue(defaultSearchValue);
			setInputValue(defaultSearchValue?.label ?? '');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [triggerValueReset]);

	return (
		<MAutoComplete
			filterOptions={(opts, { inputValue: textFieldValue, getOptionLabel }) =>
				opts.filter((opt) => contains(getOptionLabel(opt), textFieldValue))
			}
			groupBy={(option) => option.groupName}
			getOptionLabel={(option) => toTitleCase(option.label)}
			getOptionSelected={(option, currentValue) => option.label === currentValue.label}
			options={options}
			value={value}
			autoComplete={true}
			autoHighlight={true}
			includeInputInList={true}
			disabled={disabled}
			onChange={(_event: ChangeEvent<unknown>, newValue: T | null) => handleLocalChange(newValue)}
			onInputChange={(_event: ChangeEvent<unknown>, newInputValue) => setInputValue(newInputValue)}
			noOptionsText={inputValue ? enUS.props?.MuiAutocomplete?.noOptionsText ?? 'No options' : `Search...`}
			renderInput={(params) => (
				<TextField
					{...TextFieldProps}
					{...params}
					classes={{
						...TextFieldProps?.classes,
						root: clsx(
							{
								[classes.disabledTextField]: disabled
							},
							TextFieldProps?.classes?.root
						)
					}}
					placeholder={placeholder}
					variant={TextFieldProps?.variant ?? 'outlined'}
					fullWidth={TextFieldProps?.fullWidth ?? true}
					label={undefined}
					InputProps={{
						...TextFieldProps?.InputProps,
						...params.InputProps,
						style: {
							...TextFieldProps?.InputProps?.style,
							paddingTop: 0,
							paddingBottom: 0
						}
					}}
				/>
			)}
			renderOption={(option) => {
				const { label } = option;
				const matches = match(label, inputValue);
				const parts = parse(label, matches);

				return (
					<Grid container={true} alignItems="center" alignContent="flex-start" justify="flex-start">
						<Grid item={true} xs={12}>
							{parts.map((part, index) => (
								<Typography
									variant="body1"
									component="span"
									key={index}
									style={{ fontWeight: part.highlight ? 700 : 400, color: option.color }}
								>
									{part.text.startsWith('@') ? part.text : toTitleCase(part.text)}
								</Typography>
							))}
						</Grid>
					</Grid>
				);
			}}
			{...props}
		/>
	);
}

export default memo(AutoComplete);

declare module 'react' {
	function memo<A, B>(Component: (props: A) => B): (props: A) => ReactElement | null;
}
