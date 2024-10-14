import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";

const MainInfo = ({ id }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const onSubmit = (data) => {

      }
  return (
    <form
      className="flex flex-col gap-4 w-full bg-gray-100 mt-2 rounded-lg p-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-3xl mb-2 font-bold">Main Info </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 mx-6 gap-4">
        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="business-unit" className="mb-1">
            Business Unit
          </Label>
          <Input
            id="business-unit"
            {...register("business_unit")}
            placeholder="Business Unit"
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="document-type" className="mb-1">
            Document Type
          </Label>
          <Input
            id="document-type"
            {...register("document_type", {
              required: "Document type is required",
            })}
            placeholder="Document Type"
            className="w-full"
          />
          {errors.document_type && (
            <span className="text-red-500 text-sm">
              {errors.document_type.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="document-no" className="mb-1">
            Document No
          </Label>
          <Input
            id="document-no"
            {...register("document_no")}
            placeholder="Document No"
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="total-contract-cost" className="mb-1">
            Total Contract Cost
          </Label>
          <Input
            id="total-contract-cost"
            type="number"
            {...register("total_contract_cost")}
            placeholder="Total Contract Cost"
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="parent-contractor" className="mb-1">
            Parent Contractor
          </Label>
          <Input
            id="parent-contractor"
            {...register("parent_contractor")}
            placeholder="Parent Contractor"
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="financial-year" className="mb-1">
            Financial Year
          </Label>
          <Input
            id="financial-year"
            type="date"
            {...register("financial_year")}
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="document-date" className="mb-1">
            Document Date
          </Label>
          <Input
            id="document-date"
            type="date"
            {...register("document_date")}
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="total-boq-amount" className="mb-1">
            Total BOQ Amount
          </Label>
          <Input
            id="total-boq-amount"
            type="number"
            {...register("total_boq_amount")}
            placeholder="Total BOQ Amount"
            className="w-full"
          />
        </div>
      </div>

      <Button type="submit" className="mt-4 self-center w-full md:w-[200px]">
        Submit
      </Button>
    </form>
  );
};

export default MainInfo;
