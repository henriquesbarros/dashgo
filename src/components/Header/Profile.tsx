import { Flex, Text, Box, Avatar } from '@chakra-ui/react';

interface ProfileProps {
	showProfileData?: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
	return (
		<Flex align="center">
			{showProfileData && (
				<Box mr="4" textAlign="right">
					<Text>Henrique Barros</Text>
					<Text color="gray.300" fontSize="small">
						henriquesbarroshs@gmail.com
					</Text>
				</Box>
			)}

			<Avatar 
				size="md" 
				name="Henrique Barros" 
				src="https://github.com/henriquesbarros.png"
			/>
		</Flex>
	);
}