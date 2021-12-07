import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FormLabel, FormControl, Input as ChakraInput, InputProps as CharkraInputProps } from '@chakra-ui/react';

interface InputProps extends CharkraInputProps{
    name: string;
    label?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> 
	= ({ name, label, ...rest }: InputProps, ref) => {
    return (
        <FormControl>
          { !!label && <FormLabel htmlFor={name}>{label}</FormLabel> }
          <ChakraInput 
            name={name} 
            id={name} 
            type="email" 
            focusBorderColor="pink.500"
            bgColor="gray.900"
            variant="filled"
            _hover={{
                bgColor: 'gray.900'
            }}
            size="lg"
						ref={ref}
            {...rest}
          />
        </FormControl>
    );
}

export const Input = forwardRef(InputBase);