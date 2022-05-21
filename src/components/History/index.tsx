import { lchownSync } from "fs";
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

export default function History({list}:{list: any}) {
  console.log(list[0].city)
  if(list.length < 1) return null
  return (
    <div>
      <h2>Search History</h2>
      <hr />
      {
        list && list?.length > 0 &&
        list?.map((data: any, index: number) => (
          <p>{index + 1}. {data?.city}, {data?.country} {data?.date}</p>
        ))
      }
    </div>
  );
}
