import { SignIn } from "../_component/Validation/SignIn";

export default function page() {
  return (
    <div className="flex justify-items-center items-center">
      <div className="w-[40%]">
        <SignIn />
      </div>

      <div className="w-[60%]">
        <img
          src="/assets/Login.jpg"
          alt="Login"
          className="rounded-xl mt-[230px]"
        />
      </div>
    </div>
  );
}
