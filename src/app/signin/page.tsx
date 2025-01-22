import { Signin } from "../_component/Validation/SignIn";

export default function Page() {
  return (
    <div className="flex justify-items-center items-center">
      <div className="w-[30%]">
        <Signin />
      </div>

      <div className="w-[70%]">
        <img
          src="/assets/Login.jpg"
          alt="Login"
          className="rounded-xl mt-[50px] ml-[40px] w-[95%] h-auto"
        />
      </div>
    </div>
  );
}
