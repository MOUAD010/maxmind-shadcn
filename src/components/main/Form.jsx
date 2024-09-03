import React, { useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import Post from "./Post";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MonthsPicker from "../ui/MonthsPicker";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import PagePreview from "./PagePreview";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
const Form = () => {
  const [showPost, setShowPost] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedPageId, setSelectedPageId] = useState("");

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
    formState: { errors },
  } = useForm({
    defaultValues: {
      selectedOption: "",
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const onSubmit = (data) => {
    const formattedStartDate = format(data.startDate, "yyyy-MM-01");
    const formattedEndDate = format(data.endDate, "yyyy-MM-30");

    const selectedData = {
      ...data,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };

    console.log(selectedData);

    setSelectedOptions(selectedData);
    setShowPost(true);
  };

  return (
    <div className="mt-8 mb-4">
      <div className="flex justify-center">
        <h1 className="uppercase text-2xl font-bold py-4">MaxMind</h1>
      </div>
      <div className="border-2 shadow-sm max-w-[1220px] py-8 px-2 mx-auto">
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
                    setSelectedPageId(value);
                  }}
                >
                  <SelectTrigger className="w-[400px]">
                    <SelectValue placeholder="Sélectionnez une page" />
                  </SelectTrigger>
                  <SelectContent>
                    {pages_name?.map((item) => (
                      <SelectItem
                        className="hover:bg-gray-400"
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

            <Dialog>
              <DialogTrigger
                className=" disabled:bg-slate-500 disabled:cursor-not-allowed text-sm text-white py-2 font-medium rounded-lg px-2 bg-[#0f172a]"
                disabled={!selectedPageId}
              >
                Informations sur la page
              </DialogTrigger>
              <DialogContent className="p-1">
                <PagePreview PageId={selectedPageId} />
              </DialogContent>
            </Dialog>
            {/* Start Date Picker */}
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <MonthsPicker
                  selectedDate={field.value}
                  onDateChange={field.onChange}
                />
              )}
            />

            {/* End Date Picker */}
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <MonthsPicker
                  selectedDate={field.value}
                  onDateChange={field.onChange}
                />
              )}
            />

            <Button type="submit" className=" w-40">
              Générer les données
            </Button>
          </div>

          <div className="flex justify-center gap-4">
            {errors.selectedOption && (
              <p className="text-red-500">{errors.selectedOption.message}</p>
            )}
            {errors.startDate && (
              <p className="text-red-500">{errors.startDate.message}</p>
            )}
            {errors.endDate && (
              <p className="text-red-500">{errors.endDate.message}</p>
            )}
          </div>
        </form>
      </div>

      {showPost && (
        <Post
          selectedPageId={selectedOptions.selectedOption}
          limit="100"
          from={selectedOptions.startDate}
          end={selectedOptions.endDate}
        />
      )}
    </div>
  );
};

export default Form;
