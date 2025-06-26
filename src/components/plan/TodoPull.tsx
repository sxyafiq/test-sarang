"use client";

import { trpc } from "@/trpc/client";
import { Todo } from "@/payload-types";
import TodoEdit from "./TodoEdit";
import TodoReq from "./TodoReq";

interface TodoPullProp {
  planId: string;
}

const TodoPull = ({ planId }: TodoPullProp) => {
  const results = trpc.getTodo.useQuery({
    planId: planId,
  });

  return (
    <div className="w-full grid grid-col-1 gap-4">
      <TodoReq id={planId} Todo={"Get Wedding Rings"} />
      {results.data
        ? results.data.docs.map((todo: Todo) =>
            todo.todo !== "Get Wedding Rings" ? (
              <TodoEdit
                key={todo.id}
                todoId={todo.id}
                //@ts-ignore
                id={planId}
                pTodo={todo.todo}
                pDate={todo.date}
                pChecked={todo.done}
                pRemarks={todo.remarks || ""}
              />
            ) : null
          )
        : null}
    </div>
  );
};

export default TodoPull;
