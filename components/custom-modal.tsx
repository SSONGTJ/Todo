"use client"

import { useState } from "react"
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, Popover, PopoverTrigger, PopoverContent, Spinner, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Switch, CircularProgress} from "@nextui-org/react";
import {VerticalDotsIcon} from "./icons";
import {Todo, FocusedTodoType, CustomModalType} from "@/types"
import { useRouter } from "next/navigation"

const CustomModal = ({focusedTodo , modalType, onClose, onUpdate, onDelete}:{
    focusedTodo:Todo , modalType: CustomModalType,
    onClose: ()=>void,
    onUpdate: (id:string, title:string, isDone:boolean)=>void,
    onDelete: (id:string) => void
}) => {

    // 수정된 할일 여부 값
    const [isDone, setIsDone] = useState(focusedTodo.is_done);

    // 수정된 할일 내용 값
    const [updateTodoInput, setUpdateTodoInput] = useState<string>(focusedTodo.title);

    // 로딩 상태
    const [isLoading, setIsLoading] = useState(false);

    const DetailModal = (todo:Todo) => {
        return <>
            <ModalHeader className="flex flex-col gap-1">상세보기</ModalHeader>
            <ModalBody>
                <p><span className="font-bold">ID : </span>{focusedTodo.id}</p>
                <p><span className="font-bold">할일 내용 : </span>{focusedTodo.title}</p>
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
    }

    const UpdateModal = (todo:Todo) => {
        return <>
            <ModalHeader className="flex flex-col gap-1">할일 수정</ModalHeader>
              <ModalBody>
                <p><span className="font-bold">ID : </span>{focusedTodo.id}</p>
                <Input
                  autoFocus
                  label="할일 내용"
                  placeholder="할일을 입력해주세요"
                  variant="bordered"
                  isRequired
                  defaultValue={focusedTodo.title}
                  value={updateTodoInput}
                  onValueChange={setUpdateTodoInput}
                />

                <div className="flex space-x-2">
                <span className="font-bold">완료여부 : </span>
                    <Switch defaultSelected={focusedTodo.is_done}
                        isSelected={isDone}
                        onValueChange={setIsDone}
                        aria-label="Automatic updates"
                        color="warning"
                    />
                    {`${isDone ? "완료" : "미완료"}`}
                </div>

                <div className="flex space-x-2">
                <span className="font-bold">작성일 : </span>
                  <p>{`${focusedTodo.created_at}`}</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="warning" variant="flat" onPress={() => {
                    setIsLoading(true);
                    onUpdate(focusedTodo.id, updateTodoInput, isDone)
                }}>
                  {(isLoading) ? <CircularProgress
                  size="sm" color="warning" aria-label="Loading..." /> : "수정"}
                </Button>
                <Button color="default" onPress={onClose}>
                  닫기
                </Button>
              </ModalFooter>
        </>
    }

    const DeleteModal = (todo:Todo) => {
        return <>
            <ModalHeader className="flex flex-col gap-1">할일 삭제</ModalHeader>
            <ModalBody>
                <p><span className="font-bold">ID : </span>{focusedTodo.id}</p>
                <p><span className="font-bold">할일 내용 : </span>{focusedTodo.title}</p>
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
                <Button color="danger" variant="flat" onPress={() => {
                    setIsLoading(true);
                    onDelete(focusedTodo.id)
                }}>
                  {(isLoading) ? <CircularProgress
                  size="sm" color="danger" aria-label="Loading..." /> : "삭제"}
                </Button>
                <Button color="default" onPress={onClose}>
                  닫기
                </Button>
              </ModalFooter>
        </>
    }

    const getModal = (type:CustomModalType) => {
        switch(type) {
            case 'detail' : return DetailModal();
            case 'update' : return UpdateModal();
            case 'delete' : return DeleteModal();
            default:break;
        }
    }

    return (
        <>
            {getModal(modalType)}
        </>
    )
}

export default CustomModal;