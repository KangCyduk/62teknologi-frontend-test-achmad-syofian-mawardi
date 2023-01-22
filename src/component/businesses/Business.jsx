import React, { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../helpers/helpersApi";

function Business() {
  const navigate = useNavigate();
  const [business, setBusiness] = useState("");
  const [filter, setFilter] = useState("New York");
  const [searchTerm, setSearchTerm] = useState("");
  console.log(filter);

  useEffect(() => {
    fetchBusiness();
  }, [filter]);

  const handleDetail = (id) => {
    navigate(`/${id}`);
  };

  const fetchBusiness = async () => {
    let queryURL = `businesses/search?location=${filter}&sort_by=best_match&limit=20`;

    const { data } = await fetchData(queryURL);

    setBusiness(data?.businesses);
  };

  const columns = [
    {
      name: "Detail",
      selector: (row) => (
        <button
          onClick={() => handleDetail(row.id)}
          className="btn btn-warning"
        >
          Detail
        </button>
      ),
      sortable: true,
    },
    {
      name: "image",
      selector: (row) => (
        <img
          alt={row.image_url}
          src={`${row.image_url}`}
          className="rounded"
          width="30px"
        />
      ),
      sortable: true,
    },
    {
      name: "Alias",
      selector: (row) => row.alias,
      sortable: true,
    },
    {
      name: "name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Categories",
      selector: (row) =>
        row.categories?.map((row) => {
          return `Alias: ${row.alias} title: ${row.title}`;
        }),
      sortable: true,
    },
    {
      name: "Cordinates",
      selector: (row) =>
        `latitude: ${row.coordinates.latitude} title: ${row.coordinates.latitude}`,
      sortable: true,
    },
    {
      name: "display_phone",
      selector: (row) => row.display_phone,
      sortable: true,
    },
    {
      name: "distance",
      selector: (row) => row.distance,
      sortable: true,
    },

    {
      name: "is_closed",
      selector: (row) => (row.is_closed ? "is closed" : "is not closed"),
      sortable: true,
    },
    {
      name: "location",
      selector: (row) =>
        `address1: ${row.location.address1} address2: ${
          row.location.address2
        } address3: ${row.location.address3} city: ${
          row.location.city
        } country: ${row.location.country} ${row.location.display_address?.map(
          (row) => {
            return row;
          }
        )} state: ${row.location.state} zip_code: ${row.location.zip_code}`,
      sortable: true,
    },
    {
      name: "rating",
      selector: (row) => row.rating,
      sortable: true,
    },
    {
      name: "review_count",
      selector: (row) => row.review_count,
      sortable: true,
    },
    {
      name: "url",
      selector: (row) => row.url,
      sortable: true,
    },
  ];
  //   const abcfilter = () => {
  //     return columns.filter((val) => val.id === filter);
  //   };
  //   console.log(abcfilter());

  return (
    <Fragment>
      <div className="container">
        <div className="card" style={{ marginTop: "80px" }}>
          <div className="card-header">
            <div className="d-flex justify-content-between">
              <div>Business</div>
              <div>
                <input
                  type="text"
                  className="form-control"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* {columns?.map((row, key) => {
                  return (
                    <Form.Group key={key} className="mb-3" controlId={key}>
                      <Form.Check
                        onChange={() => setFilter([...filter, row.id])}
                        type="checkbox"
                        label={row.name}
                      />
                    </Form.Group>
                  );
                })} */}
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="form-group mb-3">
              <label htmlFor="location"> Filter By Location</label>
              <select
                onChange={(e) => setFilter(e.target.value)}
                className="form-control"
              >
                <option value="New York">Pilih Location</option>
                <option
                  selected={filter === "New York" ? true : false}
                  value="New York"
                >
                  New York
                </option>
                <option
                  selected={filter === "London" ? true : false}
                  value="London"
                >
                  London
                </option>
                <option
                  selected={filter === "Paris" ? true : false}
                  value="Paris"
                >
                  Paris
                </option>
              </select>
            </div>
            <DataTable
              columns={columns}
              data={
                business &&
                business?.filter((item) => {
                  if (searchTerm === "") {
                    return item;
                  } else if (
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return item;
                  }
                })
              }
              pagination
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Business;
