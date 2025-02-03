import { MainCategory } from "../_component/MainCategory";
import { MainSection } from "../_component/MainSection";

export default function MainPage() {
  return (
    <div className="bg-[#404040]">
      <div className="w-screen h-auto overflow-hidden">
        <img
          src="/assets/BG.jpg"
          alt="logo"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="bg-[#404040] w-screen h-auto">
        <MainCategory />
        <MainSection />
      </div>
    </div>
  );
}
