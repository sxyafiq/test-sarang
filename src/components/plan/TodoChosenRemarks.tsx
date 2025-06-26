"use client";

import { trpc } from "@/trpc/client";
import { useState } from "react";
import { Check } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface TodoChosenRemarksProps {
  id: string;
  tRemarks: string;
  tChecked: boolean;
}

const TodoChosenRemarks = ({
  id,
  tRemarks,
  tChecked,
}: TodoChosenRemarksProps) => {
  const [remarks, setRemarks] = useState(tRemarks);
  const [remarksButton, setRemarksButton] = useState("bg-emerald-200");

  const edit = trpc.editTodo.useMutation();

  function handleRemarksChange(event: {
    target: { value: React.SetStateAction<string> };
  }) {
    setRemarks(event.target.value);
    setRemarksButton("bg-amber-200 ease-in-out duration-300");
  }

  return (
    <>
      {tChecked === false ? (
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Remarks"
            value={remarks}
            onChange={(e) => handleRemarksChange(e)}
          />
          <Button
            variant="outline"
            size="icon"
            className={remarksButton}
            onClick={() => {
              edit.mutate({
                id: id,
                remarks: remarks,
              });
              setRemarksButton("bg-emerald-200 ease-in-out duration-300");
            }}
          >
            <Check className="h-4 px-2" />
          </Button>
        </div>
      ) : (
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Remarks"
            value={remarks}
            onChange={(e) => handleRemarksChange(e)}
            disabled
          />
          <Button
            variant="outline"
            size="icon"
            className="bg-slate-200"
            disabled
          >
            <Check className="h-4 px-2" />
          </Button>
        </div>
      )}
    </>
  );
};

export default TodoChosenRemarks;
