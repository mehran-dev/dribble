import React from "react";

type Props = {};

export default function Home({}: Props) {
  return (
    <div>
      Home
      <section className="flex-start flex-col paddings mb-16">
        <h1 className="">Categories </h1>
        <h1 className="">Posts</h1>
        <h1>Load more </h1>
      </section>
    </div>
  );
}
