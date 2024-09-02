import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import DatePicker from "@/components/ui/DatePicker";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import PagePreview from "./PagePreview";
import { CircleX } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Form = () => {
  const [showPost, setShowPost] = useState(false); // State to manage visibility
  const [selectedOptions, setSelectedOptions] = useState({}); // State to store selected option
  const [selectedPageId, setSelectedPageId] = useState(""); // State to store selected page ID

  const getPages = async () => {
    const response = await axios.post(
      "https://meta-api-eight.vercel.app/api/v1/accounts",
      { limit: "10", after: "", before: "" }
    );
    return response.data.data.data;
  };

  const { data: pages_name } = useQuery({
    queryKey: ["pages"],
    queryFn: getPages,
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      selectedOption: "",
      startDate: null,
      endDate: null,
      number: "0",
    },
  });

  const formatDate = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const onSubmit = (data) => {
    const formattedStartDate = formatDate(data.startDate);
    const formattedEndDate = formatDate(data.endDate);
    const selectedData = {
      ...data,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };
    console.log(selectedData);

    setSelectedOptions(selectedData); // Update selected option
    setShowPost(true); // Show Post component
  };

  // Watch for changes in startDate and update endDate
  const startDate = watch("startDate");

  useEffect(() => {
    if (startDate) {
      const today = new Date();
      setValue("endDate", today.toISOString().split("T")[0]); // Set endDate to today
    }
  }, [startDate, setValue]);

  return (
    <div className="mt-8 mb-4">
      <div className="flex justify-center">
        <h1 className="uppercase text-2xl font-bold py-4">MaxMind</h1>
      </div>
      <div className="border-2 shadow-lg max-w-[1220px] py-8 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex justify-center items-center space-x-2">
            <Controller
              name="selectedOption"
              rules={{ required: "Page Name is required" }}
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedPageId(value); // Update selectedPageId state
                  }}
                >
                  <SelectTrigger className="w-[440px]">
                    <SelectValue placeholder="Sélectionnez une page" />
                  </SelectTrigger>
                  <SelectContent>
                    {pages_name?.map((item) => (
                      <SelectItem
                        className=" hover:bg-gray-400"
                        key={item.id}
                        value={item.id}
                      >
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {/* {----Alert----} */}
            <AlertDialog className="p-0">
              <AlertDialogTrigger asChild>
                <Button disabled={!selectedPageId}>
                  Informations sur la page
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent className="p-2 max-w-3xl">
                <div className="flex justify-end">
                  <AlertDialogCancel className="border-none shadow-none p-0 m-0">
                    <CircleX className="w-6 h-6 cursor-pointer" />
                  </AlertDialogCancel>
                </div>
                <PagePreview PageId={selectedPageId} />
                <AlertDialogHeader>
                  <AlertDialogTitle></AlertDialogTitle>
                  <AlertDialogDescription></AlertDialogDescription>
                </AlertDialogHeader>
              </AlertDialogContent>
            </AlertDialog>

            <Controller
              name="startDate"
              control={control}
              rules={{ required: "Start date is required" }}
              render={({ field }) => (
                <DatePicker date={field.value} setDate={field.onChange} />
              )}
            />

            <Controller
              name="endDate"
              control={control}
              rules={{ required: "End date is required" }}
              render={({ field }) => (
                <DatePicker date={field.value} setDate={field.onChange} />
              )}
            />

            <Controller
              name="number"
              control={control}
              rules={{
                required: "Number of posts is required", // Required field validation
                validate: (value) =>
                  value > 0 || "The number must be a higher than 0", // Custom validation for positive numbers
              }}
              render={({ field }) => (
                <Input
                  type="number"
                  value={field.value}
                  onChange={field.onChange}
                  className="w-[140px]"
                  placeholder="Enter a number"
                />
              )}
            />
          </div>
          <div className=" flex justify-center gap-4">
            <div>
              {errors.selectedOption && (
                <p className="text-red-500">{errors.selectedOption.message}</p>
              )}
            </div>
            <div>
              {errors.startDate && (
                <p className="text-red-500">{errors.startDate.message}</p>
              )}
            </div>
            <div>
              {errors.endDate && (
                <p className="text-red-500">{errors.endDate.message}</p>
              )}
            </div>
            <div>
              {errors.number && (
                <p className="text-red-500">{errors.number.message}</p>
              )}
            </div>
            <div></div>
          </div>
          <div className="flex justify-center mt-4">
            <Button type="submit" className="max-w-[1010px] w-full">
              Générer les données
            </Button>
          </div>
        </form>
      </div>
      {showPost && (
        <Post
          selectedPageId={selectedOptions.selectedOption}
          limit={selectedOptions.number}
          from={selectedOptions.startDate}
          end={selectedOptions.endDate}
        />
      )}
    </div>
  );
};

export default Form;
