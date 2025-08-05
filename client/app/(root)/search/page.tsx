import React from "react";

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  // console.log((await searchParams).query);

  const { query } = await searchParams;

  return <div>Search results of : {query}</div>;
}
