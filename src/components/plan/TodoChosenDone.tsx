"use client";

import { trpc } from "@/trpc/client";
import React, { useState } from "react";
import { Checkbox } from "../ui/checkbox";

interface TodoChosenDoneProps {
  id: string;
  tChecked: boolean;
}

const TodoChosenDone = ({ id, tChecked }: TodoChosenDoneProps) => {
  const [checked, setChecked] = useState(tChecked);

  const edit = trpc.editTodo.useMutation();

  const editChecked = () => {
    if (checked) {
      setChecked(false);

      edit.mutate({
        id: id,
        check: false,
      });
    } else if (!checked) {
      setChecked(true);

      edit.mutate({
        id: id,
        check: true,
      });
    }
  };

  return <Checkbox checked={checked} onCheckedChange={editChecked} />;
};

export default TodoChosenDone;
