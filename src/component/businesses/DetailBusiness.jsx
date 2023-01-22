import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { fetchData } from "../../helpers/helpersApi";

function DetailBusiness() {
  const params = useParams();
  const [detail, setDetail] = useState("");
  const [listDetail, setListDetail] = useState([]);
  //   console.log(params.id);

  useEffect(() => {
    fetchDetailBusiness();
    fetchListReviewBusiness();
  }, []);

  const fetchDetailBusiness = async () => {
    let queryURL = `businesses/${params.id}`;

    const { data } = await fetchData(queryURL);

    setDetail(data);
    // console.log(data);
  };

  const fetchListReviewBusiness = async () => {
    let queryURL = `businesses/${params.id}/reviews?limit=20&sort_by=yelp_sort`;

    const { data } = await fetchData(queryURL)

    setListDetail(data?.reviews);
    // console.log(listDetail);
  };
  return (
    <Fragment>
      <div className="container" style={{ padding: "20px" }}>
        <div className="card" style={{ marginTop: "80px" }}>
          <div className="card-header">
            <div className="d-flex justify-content-between">
              <div>Detail</div>
              <div>
                <Link to="/" className="btn btn-danger btn-sm">
                  Back
                </Link>
              </div>
            </div>
          </div>
          <div className="card-body m-0 p-0">
            <div
              className="mb-3 abch"
              style={{ 
                // maxWidth: "445px", 
                margin: 0
              }}
            >
              <h2 className="text-center pt-2 pb-2">{detail?.name}</h2>
              <Carousel showStatus={false} showThumbs={false} autoPlay={true} infiniteLoop={true} 
                swipeable={true}
              >
                {detail?.photos?.map((row, key) => {
                  return (
                    <Fragment key={key}>
                      <div>
                        <img
                          // width="300px"
                          height="300px"
                          src={`${row}`}
                          alt="a"
                        />
                      </div>
                    </Fragment>
                  );
                })}
              </Carousel>
            </div>
            <table className="table w-100 mb-0">
              <thead>
                <tr>
                  <td>
                    rating <span style={{ float: "right" }}>:</span>
                  </td>
                  <th>{detail?.rating}</th>
                </tr>
                <tr>
                  <td>
                    Maps <span style={{ float: "right" }}>:</span>
                  </td>
                  <th>
                    <a
                      clasasName="btn btn-primary"
                      target="_blank"
                      rel="noreferrer"
                      href={`https://www.google.com/maps/search/${detail?.coordinates?.latitude},+${detail?.coordinates?.longitude}/@${detail?.coordinates?.latitude},${detail?.coordinates?.longitude}z`}
                    >
                      Show{" "}
                    </a>
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
        <div className="row">
          {listDetail?.map((row, key) => {
            return (
              <div key={key} className="col-lg-4 col-md-4 col-sm-12 col-xl-4">
                <div className="card mt-2">
                  <div className="card-header">List review</div>
                  <div className="card-body">
                    <div className="text-center">
                      <img
                        className="rounded-circle mt-2 mb-2"
                        width="60px"
                        height="60px"
                        src={`${row.user.image_url}`}
                        alt={row.user.name}
                      />
                    </div>
                    <table className="table">
                      <thead>
                        <tr>
                          <td>
                            Name <span style={{ float: "right" }}>:</span>
                          </td>
                          <th>{row.user.name}</th>
                        </tr>
                        <tr>
                          <td>
                            Rating <span style={{ float: "right" }}>:</span>
                          </td>
                          <th>{row.rating}</th>
                        </tr>
                      </thead>
                    </table>
                    <div className="card-footer" style={{ padding: "15px" }}>
                      <div>
                        <b>Comment:</b>
                      </div>
                      <p> {row.text}</p>
                      <div className="w-100">
                        <a
                          className="btn btn-primary btn-sm w-100"
                          href={`${row.url}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Link
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
}

export default DetailBusiness;
