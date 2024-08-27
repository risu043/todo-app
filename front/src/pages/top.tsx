import {getCurrentUser, signOut} from "@/api/auth";
import {useNavigate} from "react-router-dom";
import {Tables} from "@/types/supabase";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {createTask, getTasks, updateTask, deleteTask} from "@/api/tasks";
import {Suspense, useState} from "react";

export function Top() {
  const {data: user} = useSuspenseQuery({
    queryKey: ["current_user"],
    queryFn: getCurrentUser,
  });

  const navigate = useNavigate();
  const signOutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      navigate("/sign-in");
    },
  });

  if (!user) {
    return <div>Unauthenticated</div>;
  }
  return (
    <div className="mx-auto max-w-3xl px-4">
      <header className="flex justify-between py-4">
        <span className="text-4xl">TODO APP</span>
        <div className="flex flex-col items-end">
          <span>{user.email}</span>
          <button onClick={() => signOutMutation.mutate()}>Sign out</button>
        </div>
      </header>
      <TaskForm />
      <Suspense>
        <TaskList />
      </Suspense>
    </div>
  );
}

function TaskList() {
  const {data: tasks} = useSuspenseQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  return (
    <ul>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

function TaskItem({task}: {task: Tables<"tasks">}) {
  const queryClient = useQueryClient();
  const updateTaskMutation = useMutation({
    mutationFn: () => updateTask(task.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: () => deleteTask(task.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
  return (
    <li className="flex justify-between items-center border-b py-6">
      <div>
        <button
          className={`inline-flex justify-center text-white w-6 h-6 rounded-full ${task.status === 0 ? "bg-slate-300" : "bg-orange-300"}`}
          onClick={
            task.status === 0 ? () => updateTaskMutation.mutate() : undefined
          }
        >
          ✓
        </button>
        <span
          className={`text-2xl ml-8 ${
            task.status == 1 ? "text-slate-400" : null
          }`}
        >
          {task.title}
        </span>
      </div>
      <button
        className="text-violet-500"
        onClick={() => deleteTaskMutation.mutate()}
      >
        delete
      </button>
    </li>
  );
}

function TaskForm() {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();
  const createTaskMutation = useMutation({
    mutationFn: (title: string) => createTask(title),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setTitle(e.target.value);
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    if (title === "") {
      return;
    }
    createTaskMutation.mutate(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="flex">
        <input
          name="title"
          value={title}
          className="grow h-12 p-4 border-solid border border-gray-300"
          placeholder="Add your new todo"
          onChange={handleTitleChange}
        />
        <button className="ml-4 h-12 w-12 bg-violet-500 text-white text-2xl">
          +
        </button>
      </div>
    </form>
  );
}
