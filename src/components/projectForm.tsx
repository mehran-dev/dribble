"use client";
import { SessionInterface } from "@/common.types";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import FormField from "./FormField";
import { categoryFilters } from "@/constants";
import CustomMenu from "./CustomMenu";
import Button from "./Button";

type Props = {
  type: "create" | "edit";
  session: SessionInterface;
};

export default function ProjectForm({ type, session }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    image: "",
    title: "",
    description: "",
    liveSiteUrl: "",
    githubUrl: "",
    category: "",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
    } catch (error) {}
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.includes("image")) {
      alert("please insert an image file ");
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      handleStateChange("image", result);
    };
  };

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prev) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="flexStart form ">
      <div className="flexStart form_image-container ">
        <label htmlFor="poster" className="flex-center form_image-label">
          {!form.image && "Choose a poster for your project "}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === "create"}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20"
            alt="Project poster "
            fill
          />
        )}
      </div>
      <FormField
        title="Title"
        state={form.title}
        placeholder="Flexible"
        setState={(value) => handleStateChange("title", value)}
      />
      <FormField
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkable developer projects "
        setState={(value) => handleStateChange("description", value)}
      />
      <FormField
        type="url"
        title="Website Url "
        state={form.liveSiteUrl}
        placeholder="https://www.jestmastery.pro"
        setState={(value) => handleStateChange("url", value)}
      />
      <FormField
        type="url"
        title="Github Url "
        state={form.githubUrl}
        placeholder="https://www.github.com/pro"
        setState={(value) => handleStateChange("githubUrl", value)}
      />
      <CustomMenu
        title={"Category"}
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />

      <div className="flexStart w-full">
        <Button
          type="submit"
          leftIcon={isSubmitting ? "" : "/plus.svg"}
          isSubmitting={isSubmitting}
        >
          Create
        </Button>
      </div>
    </form>
  );
}
