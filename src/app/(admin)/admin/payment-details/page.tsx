"use client";

import ChartLoading from "@/src/components/UI/ChartLoading";
import { useGetAllPaymentsQuery } from "@/src/store/features/payment/paymentApi";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/table";
import moment from "moment";

const PaymentDetails = () => {
  const { data, isLoading } = useGetAllPaymentsQuery(undefined);
  const payments = data?.data || [];
  console.log(payments);

  return (
    <div>
      <h3 className="mb-5 text-center font-bold text-md">Payment details</h3>
      {isLoading ? (
        <ChartLoading />
      ) : (
        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Date</TableColumn>
            <TableColumn>transaction Id</TableColumn>
            <TableColumn>Amount</TableColumn>
          </TableHeader>
          <TableBody>
            {payments?.map((payment: any) => (
              <TableRow key={payment?._id}>
                <TableCell>{payment?.user?.name}</TableCell>
                <TableCell>
                  {moment(payment?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </TableCell>
                <TableCell>{payment?.transactionId}</TableCell>
                <TableCell>${payment?.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default PaymentDetails;
