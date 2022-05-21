import _ from "lodash";
import React, { useEffect, useState } from "react";
import { FormField } from "../../_types";
import styles from "./index.module.css";

export default function History({
  historyList,
  formValue,
}: {
  historyList: any;
  formValue: FormField;
}) {
  const [filteredList, setFilteredList] = useState<any>([]);

  useEffect(() => {
    formValue.city.length > 0 || formValue.country.length > 0
      ? setFilteredList(
          _.filter(historyList, {
            city: formValue.city.toLowerCase(),
            country: formValue.country.toLowerCase(),
          })
        )
      : setFilteredList(historyList);
  }, [formValue.city.length, formValue.country.length, historyList]);

  if (historyList.length < 1) return null;
  return (
    <div>
      <h2>Search History</h2>
      <hr />
      {filteredList &&
        filteredList?.length > 0 &&
        filteredList?.map((data: any, index: number) => (
          <>
            <p>
              {index + 1}. {data?.city}, {data?.country} {data?.date}
            </p>
            <button>Search</button>
            <button>delete</button>
          </>
        ))}
    </div>
  );
}
