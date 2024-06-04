"use client"

import { useState } from "react"
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, Popover, PopoverTrigger, PopoverContent, Spinner, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import {VerticalDotsIcon} from "./icons";
import {Todo, FocusedTodoType, CustomModalType} from "@/types"
import { useRouter } from "next/navigation"

const CustomModal = ({focusedTodo , modalType, onClose}:{focusedTodo:Todo , modalType: CustomModalType, onClose: ()=>void}) => {
    return (
        <>
            <ModalHeader className="flex flex-col gap-1">{modalType}</ModalHeader>
            <ModalBody>
                <p> 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nullam pulvinar risus non risus hendrerit venenatis.
                Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                닫기
                </Button>
                <Button color="primary" onPress={onClose}>
                액션
                </Button>
            </ModalFooter>
        </>
    )
}

export default CustomModal