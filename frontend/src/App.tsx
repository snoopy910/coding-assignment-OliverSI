import { Button, ButtonGroup, Card, CardBody, CardHeader, Flex, FormControl, FormLabel, Heading, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, VStack, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [habits, setHabits] = useState<{ id: number, title: string, description: string }[]>([])
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("");

    useEffect(() => {
      (async () => {
        const response = await fetch("http://localhost:8000/habits")
        setHabits(await response.json())
      })()
    }, [])

  const handle_add_habit = async () => {
    await fetch("http://localhost:8000/habits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        description,
      })
    })
    const response = await fetch("http://localhost:8000/habits")
      setHabits(await response.json());
      setTitle("")
      setDescription("")
      onClose()
  }

  const handleDeleteClick = async (id: number) => {
    await fetch(`http://localhost:8000/habits/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    })
    const response = await fetch("http://localhost:8000/habits")
    setHabits(await response.json());
  }

  return <>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>新規追加</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>タイトル</FormLabel>
            <Input value={title} onChange={(event) => setTitle(event.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>説明</FormLabel>
            <Textarea value={description} onChange={(event) => setDescription(event.target.value)} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup spacing={3}>
            <Button colorScheme="blue" onClick={handle_add_habit}>
              追加
            </Button>
            <Button onClick={onClose}>
              キャンセル
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
    <VStack m={10}>
      <Heading mb={5}>Habit Reminder</Heading>
      {habits.map((habit) => <Card width={"100%"} mb={5}>
        <CardHeader pb={0}>
          <Flex>
            <Flex flex={1} alignItems={"center"}>
              <Heading size='md'>{habit.title}</Heading>
            </Flex>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<BsThreeDotsVertical />}
                variant={"ghost"}
              />
              <MenuList>
                <MenuItem onClick={() => handleDeleteClick(habit.id)}>削除</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </CardHeader>
        <CardBody pt={0}>
          {habit.description.split("\n").map(line => <p>{line}</p>)}
        </CardBody>
      </Card>)}
      <Button width={"100%"} onClick={onOpen}>習慣を追加する</Button>
    </VStack>
  </>;
}

export default App;
