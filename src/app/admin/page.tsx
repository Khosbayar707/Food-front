"use client";

import { Category } from "../_component/Category";
import Layout from "../_component/Layout";
import { Pfp } from "../_component/pfp";
import { Section } from "../_component/Section";
// type Props = {
//   searchParams: Promise<{ category: string }>;
// };

// type Foods = {
//   _id: string;
//   foodName: string;
//   price: string;
//   image: string;
//   ingredients: string;
//   category: string;
// };

// export default async function Page(props: Props) {
// const { category } = await props.searchParams;
// console.log(category);
// const [foods, setFoods] = useState<Foods[]>([]);

// async function getFood() {
//   const response = await fetch(`http://localhost:8000/food/${category}`);
//   const data = await response.json();
//   setFoods(data);
// }
// useEffect(() => {
//   getFood();
// }, [foods]);
export default function Page() {
  return (
    <Layout>
      <Pfp />
      <Category />
      {/* {!category ? <Section /> : <div></div>} */}
      <Section />
    </Layout>
  );
}
