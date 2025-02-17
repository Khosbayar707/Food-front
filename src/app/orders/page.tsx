import Sidebar from "../_component/AdminSidebar";
import { OrderTable } from "../Table/Order";

export default function Page() {
  return (
    <Sidebar>
      <OrderTable />
    </Sidebar>
  );
}
