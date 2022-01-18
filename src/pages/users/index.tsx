import { useState } from 'react';
import Link from 'next/link';
import { 
  Box, 
  Flex, 
  Heading, 
  Button, 
  Icon, 
  Table, 
  Thead, 
  Tr, 
  Th, 
  Checkbox, 
  Tbody, 
  Td, 
  Text,
	useBreakpointValue, 
	Spinner
} from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";

import { useUsers } from '../../services/hooks/useUsers';

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { SideBar } from "../../components/SideBar";

export default function UserList() {
	const [page, setPage] = useState(1);
	const { data, isLoading, isFetching, error } = useUsers(page);

	const isWideVersion = useBreakpointValue({
		base: false,
		lg: true
	});

	return (
		<Box>
			<Header />
			<Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
				<SideBar />

				<Box flex="1" borderRadius={8} bg="gray.800" p="8">
					<Flex mb="8" justify="space-between" align="center">
						<Heading size="lg" fontWeight="normal">
							Usuários
							{ !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4"/> }
						</Heading>

						<Link href="users/create" passHref>
							<Button 
								as="a" 
								size="sm" 
								fontSize="sm" 
								colorScheme="pink"
								leftIcon={<Icon as={RiAddLine} fontSize="20"/>}
							>
								Criar novo usuário
							</Button>
						</Link>
					</Flex>

					{ isLoading ? (
						<Flex justify="center">
							<Spinner />
						</Flex>
					) : error ? (
						<Flex justify="center">
							<Text>Falha ao obter dados dos usuários.</Text>
						</Flex>
					) : (
						<>
							<Table colorScheme="whiteAlpha">
								<Thead>
									<Tr>
										<Th px={["4", "4", "6"]} color="gray.300" width="8">
											<Checkbox colorScheme="pink" />
										</Th>
										<Th>Usuário</Th>
										{ isWideVersion && <Th>Data de cadastro</Th> }
									</Tr>
								</Thead>

								<Tbody>
									{data.users.map(({ id, name, email, createdAt }) => {
										return (
											<Tr key={id}>
												<Td px={["4", "4", "6"]}>
													<Checkbox colorScheme="pink" />
												</Td>
												<Td>
													<Box>
														<Text fontWeight="bold">{name}</Text>
														<Text fontSize="sm" color="gray.300">{email}</Text>
													</Box>
												</Td>
												{ isWideVersion && <Td>{createdAt}</Td> }
											</Tr>
										);
									})}
								</Tbody>
							</Table>

							<Pagination 
								totalCountOfRegisters={data.totalCount}
								currentPage={page}
								onPageChange={setPage}
							/>
						</>
					)}
				</Box>
			</Flex>
		</Box>
	);
}