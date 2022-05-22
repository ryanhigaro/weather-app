import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import { Button, ListGroup } from "react-bootstrap";
import { FormField } from "../_types";
import styles from "./History.module.css";
import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { capitalize } from "../_utils";

export default function History({
  historyList,
  formValue,
  handleDelete,
  handleSearch,
}: {
  historyList: any;
  formValue: FormField;
  handleDelete: (index: any) => void;
  handleSearch: (values: FormField) => void;
}) {
  const [filteredList, setFilteredList] = useState<any>([]);

  useEffect(() => {
    // Filter out search result with the same city
    formValue.city.length > 0
      ? setFilteredList(
          _.filter(historyList, {
            city: formValue.city.toLowerCase(),
          })
        )
      : setFilteredList(historyList);
  }, [formValue.city.length, historyList]);

  function renderList() {
    return (
      <ListGroup as="ol">
        {filteredList &&
          filteredList?.length > 0 &&
          filteredList?.map((data: any, index: number) => (
            <ListGroup.Item className={styles.listItem} as="li" key={index}>
              <span>
                {index + 1}. {capitalize(data?.city)},{" "}
                {data?.country.toUpperCase()}
              </span>
              <span className={styles.btnGroup}>
                <span className={styles.date}>{data?.date}</span>
                <Button
                  variant="secondary"
                  onClick={() =>
                    handleSearch({ city: data?.city, country: data?.country })
                  }
                >
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
                <Button variant="danger" onClick={() => handleDelete(index)}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </span>
            </ListGroup.Item>
          ))}
      </ListGroup>
    );
  }

  return (
    <div>
      <h2>Search History</h2>
      <hr />
      {!filteredList?.length ? (
        <p className={styles.noRecordText}>No Record(s)</p>
      ) : (
        renderList()
      )}
    </div>
  );
}
