import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function Table() {
  return (
    <Table className="bg-white border">
      <TableCaption>A list of all orders.</TableCaption>
      <TableHeader>
        <TableHead>Orders</TableHead>
        <TableRow>
          <TableHead>№</TableHead>
          <TableHead className="w-[100px]">Customer</TableHead>
          <TableHead>Food</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Total</TableHead>
          <TableHead className="text-center">Delivery Address</TableHead>
          <TableHead className="text-right">Delivery state</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="border">
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell className="font-medium">Test@gmail.com</TableCell>
          <TableCell>2 foods</TableCell>
          <TableCell>2024/12/20</TableCell>
          <TableCell className="text-right">39.00 $</TableCell>
          <TableCell className="text-center">
            2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen
          </TableCell>
          <TableCell className="text-right">Pending</TableCell>
        </TableRow>
      </TableBody>
      <TableBody className="border">
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell className="font-medium">Test@gmail.com</TableCell>
          <TableCell>2 foods</TableCell>
          <TableCell>2024/12/20</TableCell>
          <TableCell className="text-right">39.00 $</TableCell>
          <TableCell className="text-center">
            2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen
          </TableCell>
          <TableCell className="text-right">Pending</TableCell>
        </TableRow>
      </TableBody>
      <TableBody className="border">
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell className="font-medium">Test@gmail.com</TableCell>
          <TableCell>2 foods</TableCell>
          <TableCell>2024/12/20</TableCell>
          <TableCell className="text-right">39.00 $</TableCell>
          <TableCell className="text-center">
            2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen
          </TableCell>
          <TableCell className="text-right">Pending</TableCell>
        </TableRow>
      </TableBody>
      <TableBody className="border">
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell className="font-medium">Test@gmail.com</TableCell>
          <TableCell>2 foods</TableCell>
          <TableCell>2024/12/20</TableCell>
          <TableCell className="text-right">39.00 $</TableCell>
          <TableCell className="text-center">
            2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen
          </TableCell>
          <TableCell className="text-right">Pending</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
