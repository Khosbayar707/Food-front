// pages/index.tsx (or any page where you want to use the layout)
import { Category } from "../_component/Category";
import Layout from "../_component/Layout";
import { Section } from "../_component/Section";

export default function Page() {
  return (
    <Layout>
      <Category />
      <Section />
    </Layout>
  );
}
