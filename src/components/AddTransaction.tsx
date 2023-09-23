import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  SelectItem,
  Input,
} from "@nextui-org/react";
import { useState } from "react";

const options = [
  { id: 0, value: "Income" },
  { id: 1, value: "Expense" },
];

export default function AddTransaction({
  addTransaction,
}: {
  addTransaction: (tx: {}) => void;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState(0);

  function handleClick() {
    const tx:Transaction = { type, amount };
    console.log(tx);
    addTransaction(tx)
  }

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Add Expense
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Expense
              </ModalHeader>
              <ModalBody>
                <Input
                  type="number"
                  endContent={""}
                  label="Amount"
                  variant="faded"
                  value={amount.toString()}
                  onChange={(e) => setAmount(parseInt(e.target.value))}
                />
                <Select
                  label="Type of Transaction"
                  variant="faded"
                  value={type}
                  onChange={(e) => setType(parseInt(e.target.value))}
                >
                  {options.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.value}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleClick}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
