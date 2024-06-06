"use client";

import { useState } from "react";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Spinner,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { VerticalDotsIcon } from "./icons";

import { Todo, FocusedTodoType, CustomModalType } from "@/types";
import CustomModal from "@/components/custom-modal";

const TodosTable = ({ todos }: { todos: Todo[] }) => {
  // 할일 추가 가능 여부
  const [todoAddEnable, setTodoAddEnable] = useState(false);

  // 입력된 할일
  const [newTodoInput, setNewTodoInput] = useState("");

  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const router = useRouter();

  // 띄우는 모달 상태
  const [currentModalData, setCurrentModalData] = useState<FocusedTodoType>({
    focusedTodo: null,
    modalType: "detail" as CustomModalType,
  });

  const addATodoHandler = async (title: string) => {
    if (!todoAddEnable) {
      return;
    }

    setTodoAddEnable(false);
    setIsLoading(true);

    await new Promise((f) => setTimeout(f, 600));

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
      method: "post",
      body: JSON.stringify({
        title: title,
      }),
      cache: "no-store",
    });
    setNewTodoInput("");
    router.refresh();
    setIsLoading(false);
    notifySuccessEvent("할일이 성공적으로 추가 되었음");
  };

  const updateATodoHandler = async (
    id: string,
    updatedTitle: string,
    updatedIsDone: boolean,
  ) => {
    setIsLoading(true);

    await new Promise((f) => setTimeout(f, 600));

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${id}`, {
      method: "post",
      body: JSON.stringify({
        title: updatedTitle,
        is_done: updatedIsDone,
      }),
      cache: "no-store",
    });
    router.refresh();
    setIsLoading(false);
    notifySuccessEvent("할일이 성공적으로 수정 되었음");
  };

  const deleteATodoHandler = async (id: string) => {
    setIsLoading(true);

    await new Promise((f) => setTimeout(f, 600));

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${id}`, {
      method: "delete",
      cache: "no-store",
    });
    router.refresh();
    setIsLoading(false);
    notifySuccessEvent("할일이 삭제되었음");
  };

  const disabledTodoAddButton = () => {
    return (
      <Popover placement="top" showArrow={true}>
        <PopoverTrigger>
          <Button className="h-14" color="default">
            추가
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            <div className="text-small font-bold">🙂</div>
            <div className="text-tiny">할일을 입력하세요</div>
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  const applyIsDoneUI = (isDone: boolean) =>
    isDone ? "line-through text-gray-900/50 dark:text-white/50" : "";

  const TodoRow = (aTodo: Todo) => {
    return (
      <TableRow key={aTodo.id}>
        <TableCell className={applyIsDoneUI(aTodo.is_done)}>
          {aTodo.id.slice(0, 4)}
        </TableCell>
        <TableCell className={applyIsDoneUI(aTodo.is_done)}>
          {aTodo.title}
        </TableCell>
        <TableCell>{aTodo.is_done ? "✔︎" : "✕"}</TableCell>
        <TableCell
          className={applyIsDoneUI(aTodo.is_done)}
        >{`${aTodo.created_at}`}</TableCell>
        <TableCell>
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                onAction={(key) => {
                  // console.log(`aTodo:id : ${aTodo.id} / key : ${key}`)
                  setCurrentModalData({
                    focusedTodo: aTodo,
                    modalType: key as CustomModalType,
                  });
                  onOpen();
                }}
              >
                <DropdownItem key="detail">상세보기</DropdownItem>
                <DropdownItem key="update">수정</DropdownItem>
                <DropdownItem key="delete">삭제</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </TableCell>
      </TableRow>
    );
  };

  const notifySuccessEvent = (msg: string) => toast.success(msg);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const ModalComponent = () => {
    return (
      <div>
        <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) =>
              currentModalData.focusedTodo && (
                <CustomModal
                  focusedTodo={currentModalData.focusedTodo}
                  modalType={currentModalData.modalType}
                  onClose={onClose}
                  onDelete={async (id) => {
                    await deleteATodoHandler(id);
                    onClose();
                  }}
                  onUpdate={async (id, title, isDone) => {
                    await updateATodoHandler(id, title, isDone);
                    onClose();
                  }}
                />
              )
            }
          </ModalContent>
        </Modal>
      </div>
    );
  };

  return (
    <div className="flex flex-col space-y-2">
      {ModalComponent()}
      <ToastContainer
        closeOnClick
        draggable
        pauseOnFocusLoss
        pauseOnHover
        autoClose={1800}
        hideProgressBar={false}
        newestOnTop={false}
        position="top-right"
        rtl={false}
        theme="dark"
      />
      <div className="flex flex-wrap w-full gap-4 md:flex-nowrap">
        <Input
          label="새로운 할일"
          type="text"
          value={newTodoInput}
          variant="bordered"
          onValueChange={(changedInput) => {
            setNewTodoInput(changedInput);
            setTodoAddEnable(changedInput.length > 0);
          }}
        />

        {todoAddEnable ? (
          <Button
            className="h-14"
            color="warning"
            onPress={async () => {
              await addATodoHandler(newTodoInput);
            }}
          >
            추가
          </Button>
        ) : (
          disabledTodoAddButton()
        )}
      </div>
      <div className="h-6">
        {isLoading && <Spinner color="warning" size="sm" />}
      </div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>아이디</TableColumn>
          <TableColumn>할일</TableColumn>
          <TableColumn>완료여부</TableColumn>
          <TableColumn>등록일</TableColumn>
          <TableColumn>액션</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"보여줄 데이터가 없습니다."}>
          {todos && todos.map((aTodo: Todo) => TodoRow(aTodo))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodosTable;
