import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {signIn} from "@/api/auth";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const signInMutation = useMutation({
    mutationFn: () => signIn(email, password),
    onSuccess: () => {
      navigate("/");
    },
    onError: error => {
      setErrorMessage(error.message);
    },
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInMutation.mutate();
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col w-96 m-auto gap-y-8"
      >
        <div className="flex flex-col">
          <label className="text-lg">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="p-2 border border-slate-300"
            data-test="input-email"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="p-2 border border-slate-300"
            data-test="input-password"
          />
        </div>
        {errorMessage && <div className="text-red-400">{errorMessage}</div>}
        <button
          type="submit"
          className="p-2 text-white bg-violet-600"
          data-test="button-submit"
        >
          Sign in
        </button>
        <div className="flex justify-end">
          <Link to="/sign-up">Go to sign up page</Link>
        </div>
      </form>
    </div>
  );
};
