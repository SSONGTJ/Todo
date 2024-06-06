"use client";

import { useState } from "react";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  Input,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Switch,
  CircularProgress,
} from "@nextui-org/react";

import { Todo, CustomModalType } from "@/types";

const CustomModal = ({
  focusedTodo,
  modalType,
  onClose,
  onUpdate,
  onDelete,
}: {
  focusedTodo: Todo;
  modalType: CustomModalType;
  onClose: () => void;
  onUpdate: (id: string, title: string, isDone: boolean) => void;
  onDelete: (id: string) => void;
}) => {
  // 수정된 할일 여부 값
  const [isDone, setIsDone] = useState(focusedTodo.is_done);

  // 수정된 할일 내용 값
  const [updateTodoInput, setUpdateTodoInput] = useState<string>(
    focusedTodo.title,
  );

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);

  const DetailModal = () => {
    return (
      <>
        <ModalHeader className="flex flex-col gap-1">상세보기</ModalHeader>
        <ModalBody>
          <p>
            <span className="font-bold">ID : </span>
            {focusedTodo.id}
          </p>
          <p>
            <span className="font-bold">할일 내용 : </span>
            {focusedTodo.title}
          </p>
          <div className="flex space-x-2">
            <span className="font-bold">완료 여부 : </span>
            {`${isDone ? "완료" : "미완료"}`}
          </div>

          <div className="flex space-x-2">
            <span className="font-bold">작성일 : </span>
            <p>{`${focusedTodo.created_at}`}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="default" onPress={onClose}>
            닫기
          </Button>
        </ModalFooter>
      </>
    );
  };

  const UpdateModal = () => {
    return (
      <>
        <ModalHeader className="flex flex-col gap-1">할일 수정</ModalHeader>
        <ModalBody>
          <p>
            <span className="font-bold">ID : </span>
            {focusedTodo.id}
          </p>
          <Input
            isRequired
            defaultValue={focusedTodo.title}
            label="할일 내용"
            placeholder="할일을 입력해주세요"
            value={updateTodoInput}
            variant="bordered"
            onValueChange={setUpdateTodoInput}
          />

          <div className="flex space-x-2">
            <span className="font-bold">완료여부 : </span>
            <Switch
              aria-label="Automatic updates"
              color="warning"
              defaultSelected={focusedTodo.is_done}
              isSelected={isDone}
              onValueChange={setIsDone}
            />
            {`${isDone ? "완료" : "미완료"}`}
          </div>

          <div className="flex space-x-2">
            <span className="font-bold">작성일 : </span>
            <p>{`${focusedTodo.created_at}`}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="warning"
            variant="flat"
            onPress={() => {
              setIsLoading(true);
              onUpdate(focusedTodo.id, updateTodoInput, isDone);
            }}
          >
            {isLoading ? (
              <CircularProgress
                aria-label="Loading..."
                color="warning"
                size="sm"
              />
            ) : (
              "수정"
            )}
          </Button>
          <Button color="default" onPress={onClose}>
            닫기
          </Button>
        </ModalFooter>
      </>
    );
  };

  const DeleteModal = () => {
    return (
      <>
        <ModalHeader className="flex flex-col gap-1">할일 삭제</ModalHeader>
        <ModalBody>
          <p>
            <span className="font-bold">ID : </span>
            {focusedTodo.id}
          </p>
          <p>
            <span className="font-bold">할일 내용 : </span>
            {focusedTodo.title}
          </p>
          <div className="flex space-x-2">
            <span className="font-bold">완료 여부 : </span>
            {`${isDone ? "완료" : "미완료"}`}
          </div>

          <div className="flex space-x-2">
            <span className="font-bold">작성일 : </span>
            <p>{`${focusedTodo.created_at}`}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={() => {
              setIsLoading(true);
              onDelete(focusedTodo.id);
            }}
          >
            {isLoading ? (
              <CircularProgress
                aria-label="Loading..."
                color="danger"
                size="sm"
              />
            ) : (
              "삭제"
            )}
          </Button>
          <Button color="default" onPress={onClose}>
            닫기
          </Button>
        </ModalFooter>
      </>
    );
  };

  const getModal = (type: CustomModalType) => {
    switch (type) {
      case "detail":
        return DetailModal();
      case "update":
        return UpdateModal();
      case "delete":
        return DeleteModal();
      default:
        break;
    }
  };

  return <>{getModal(modalType)}</>;
};

export default CustomModal;
