"use client";

import ChartLoading from "@/src/components/UI/ChartLoading";
import {
  useCreateCategoryMutation,
  useGetCategoryQuery
} from "@/src/store/features/category/categoryApi";
import { TError } from "@/src/types/global.Type";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/table";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Category = () => {
  const { data, isLoading } = useGetCategoryQuery(undefined);
  const [createCategory, { isLoading: isCategoryLoading, isError, error }] =
    useCreateCategoryMutation();
  const [categoryInputData, setCategoryInputData] = useState("");
  const categories = data?.data || [];

  useEffect(() => {
    if (isError) {
      toast.error((error as TError)?.data?.message);
    }
  }, [isError, error]);

  const handleCategoryAdd = async () => {
    if (!categoryInputData) {
      toast.error("Category name cannot be empty");
      return;
    }
    try {
      await createCategory({ name: categoryInputData }).unwrap();
      toast.success("Category added successfully");
      setCategoryInputData(""); // Clear input after successful addition
    } catch (err) {
      toast.error((err as TError)?.data?.message);
    }
  };

  return (
    <div>
      <h3 className="mb-5 text-center font-bold text-md">Payment details</h3>

      <Input
        placeholder="Category Name"
        value={categoryInputData}
        onChange={(e) => setCategoryInputData(e.target.value)}
      />
      <Button
        className="my-2"
        isLoading={isCategoryLoading}
        disabled={isCategoryLoading}
        onClick={handleCategoryAdd}
      >
        Add Category
      </Button>

      {isLoading ? (
        <ChartLoading />
      ) : (
        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Name</TableColumn>
          </TableHeader>
          <TableBody>
            {categories?.map((category: any) => (
              <TableRow key={category?._id}>
                <TableCell>{category?.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Category;
