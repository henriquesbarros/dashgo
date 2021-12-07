import { Flex, Button, Stack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import { Input } from '../components/Form/Input';

type SignInFormData = {
	email: string;
	password: string;
}

const signInFormSchema = yup.object().shape({
	email: yup.string().required('O e-mail é obrigatório!').email('Formato de e-mail inválido!'),
	password: yup.string().required('A senha é obrigatória!'),
});

export default function SignIn() {
	const { register, handleSubmit, formState } = useForm({
		resolver: yupResolver(signInFormSchema)
	});
	const { errors, isSubmitting } = formState;

	const handleSigIn: SubmitHandler<SignInFormData> = async (values) => {
		await new Promise(resolve => setTimeout(resolve, 2000));
	}

  return (
   <Flex 
    w="100vw" 
    h="100vh" 
    align="center" 
    justify="center"
  >
    <Flex
      as="form"
      w="100%"
      maxW={360}
      bg="gray.800"
      p="8"
      borderRadius={8}
      flexDirection="column"
			onSubmit={handleSubmit(handleSigIn)}
    >
      <Stack spacing="4">
        <Input 
					name="email" 
					label="E-mail" 
					type="email" 
					error={errors.email}
					{...register('email')}
				/>

        <Input 
					name="password" 
					label="Password" 
					type="password" 
					error={errors.password}
					{...register('password')}
				/>
      </Stack>

      <Button 
        type="submit"
        mt="6" 
        colorScheme="pink" 
        size="lg"
				isLoading={isSubmitting}
      >
        Entrar
      </Button>

    </Flex>
   </Flex>
  )
}
