import React from "react";
import { Menu } from "@headlessui/react";
import Image from "next/image";

type Props = {
  title: string;
  state: string;
  filters: Array<string>;
  setState: (value: string) => void;
};

export default function CustomMenu({ title, state, filters, setState }: Props) {
  return (
    <div className="flexStart flex-col w-full gap-7 relative ">
      <label htmlFor={title} className="w-full text-gray-100 ">
        {title}
      </label>
      <Menu as="div" className={" relative self-start"}>
        <div>
          <Menu.Button className={"flexCenter custom_menu-btn"}>
            {state || "Select a category "}
            <Image
              src={"/arrow-down.svg"}
              width={10}
              height={5}
              alt="Arrow down"
            />
          </Menu.Button>
          <Menu.Items className={"flexStart custom_menu-items"}>
            {filters.map((tag) => {
              return (
                <Menu.Item key={tag}>
                  <button
                    type="button"
                    value={tag}
                    className="custom_menu-item"
                    onClick={(e) => setState(e.currentTarget.value)}
                  >
                    {tag}
                  </button>
                </Menu.Item>
              );
            })}
          </Menu.Items>
        </div>
      </Menu>
    </div>
  );
}
