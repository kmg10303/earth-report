import React, { Component, useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import axios from 'axios';
import { ChevronDownOutline } from 'react-ionicons'
import { ChevronUpOutline } from 'react-ionicons'
//import Dropdown from 'react-dropdown';
//import 'react-dropdown/style.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MenuIntroduction from './Dropdown'
import Tooltip from '@mui/material/Tooltip';

mapboxgl.accessToken = 'pk.eyJ1Ijoia21nMTAzMDMiLCJhIjoiY2xuemQ3dWRxMHNydzJxcXBrOWZkdWhvcSJ9.itjwMXMtjZeZJ8bbbwC3zw';

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [pastLat, setPastLat] = useState(-70.9);
  const [pastLng, setPastLng] = useState(42.35);
  const [zoom, setZoom] = useState(1);
  const [data, setData] = useState([]);
  const [boxData, setBoxData] = useState([]);
  const [globalData, setGlobalData] = useState([]);
  const url = 'http://10.147.17.24:8000/';
  const [health, setHealth] = useState(100);
  const threshold = .25;
  const [isShown, setIsShown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(true);
  const [manRelated, setManRelated] = useState(true);
  const [healthValue, setHealthValue] = useState(0)
  const [dataLoading, setDataLoading] = useState(true);
  const [greenLoading, setGreenLoading] = useState(true);

  const dateOptions = [
    1960, 1970, 1980, 1990, 2000, 2010, 2020, 'Today'
  ]
  const apiOptions = [
    60, 50, 40, 30, 20, 10, 0, 0
  ]
  const [dateValue, setDateValue] = useState("Today");
  const defaultOption = dateOptions[8];

  let display = "none";

  if (zoom > 3) {
    display = "block";
  }

  const colorRating = [
    "#77847", '#80AB82', '2#7DCD85'
  ]

  let currentRating = 0;

  if (health >= 80) {
    currentRating = colorRating[0];
  } if (health >= 90) {
    currentRating = colorRating[1];
  } if (health >= 95) {
    currentRating = colorRating[2];
  }

  const submitDate = (date) => {
    setDataLoading(true);
    setHealthValue(apiOptions[dateOptions.findIndex((element) => element == date)]);
    setDateValue(date);
    setGreenLoading(true);
  }

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/kmg10303/clo0truca00ax01oybpe80ztl',
      zoom: zoom
    });

    map.current.on('move', () => {
      setZoom(map.current.getZoom().toFixed(2));
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));

    });
  });

  useEffect(() => {
    if (!map.current) return; // initialize map only once
    axios.get(url + "health/?year_back=" + healthValue)
      .then(response => {
        setDataLoading(false);
        setHealth(response.data["health"]);
      })
      .catch(error => {
        console.error(error);
      });

    axios.get(url + "greenhouse/?year_back=" + healthValue)
      .then(response => {
        setGreenLoading(false);
        setGlobalData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [healthValue])

  useEffect(() => {
    if (!map.current) return; // initialize map only once
    axios.get(url + "health/")
      .then(response => {
        setHealth(response.data["health"]);
      })
      .catch(error => {
        console.error(error);
      });

    axios.get(url + "greenhouse/")
      .then(response => {
        setGlobalData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [])

  useEffect(() => {
    if (!map.current) return; // initialize map only once
    if (map.current.getZoom().toFixed(2) >= 8) {
      if (Math.abs(pastLng - map.current.getCenter().lng.toFixed(4) > threshold)) {
        setPastLng(map.current.getCenter().lng.toFixed(4));
      } else {
        setIsShown(false);
        setLoading(true);
      }

      if (Math.abs(pastLat - map.current.getCenter().lat.toFixed(4) > threshold)) {
        setPastLat(map.current.getCenter().lat.toFixed(4));
      }
    }
  }, [lng, lat]);


  useEffect(() => {
    if (!map.current) return; // initialize map only once
    if (map.current.getZoom().toFixed(2) >= 8) {
      axios.get(url + "coord/?latitude=" + map.current.getCenter().lat.toFixed(4) + "&longitude=" + map.current.getCenter().lng.toFixed(4) + "&radius=" + map.current.getZoom().toFixed(2))
        .then(response => {
          setData(response.data.man_related);
          setBoxData(response.data.box)
          console.log(response.data.box)
          setLoading(false);
          setIsShown(true);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [pastLng, pastLat])

  return (
    <div className="back">
      <div className="body">
        <link href='https://fonts.googleapis.com/css?family=Nunito' rel='stylesheet'></link>
        <div ref={mapContainer} className="map-container" />
        <div className="overlay-container">
          <div className="flex-container">
            <div className="flex-item left-box">
              <div className="flex-statistics">
                <h2>Statistics</h2>
              </div>
              <div className="stats">
                {
                  Object.keys(globalData).map((key, index) => {
                    return (
                      <>
                        <div className="stat">
                          <h1 className="stat-name">{key}</h1>
                          <div className="stat-info">
                            {!greenLoading && (
                              <h3 className="stat-number">{globalData[key]["value"]}</h3>
                            )}
                            {greenLoading && (
                              <div className="loading">...</div>
                            )}

                            <p className="stat-unit">{globalData[key]["unit"]}</p>
                          </div>
                        </div>
                      </>
                    )
                  }
                  )
                }
              </div>
            </div>
            <div className="flex-item"></div>
              <div className="flex-item space-holder">
                <h2>Total Health</h2>
                <p1>{dateValue} compared to 1950</p1>
                <div className="flex-progress">
                  <div className="progress-bar">
                    <div className="progress" style={{ width: health + "%", background: currentRating }}></div>
                  </div>
                  {!dataLoading && (
                    <div className="value"><h3>{health + "%"}</h3></div>
                  )}
                  {dataLoading && (
                    <div className="loading">...</div>
                  )}
                </div>
              </div>
            <div className="flex-item">
            <MenuIntroduction dateChange={submitDate} className="dropdown"/>
            </div>
            <div className="flex-item right-box">
              <div className="list-parent">
                {isShown && !loading && zoom >= 8 && (
                  <div className='background-block'>
                    {Object.keys(data).map((key, index) => {
                      return (
                        <>
                          <h3 className="data-header">{key}</h3>
                          {
                            Object.keys(data[key]).map((innerkey, innerindex) => {
                              return (
                                <>
                                  <div className="inrow">
                                    <Tooltip title={data[key][innerkey]["description"]} placement="left">
                                      <InfoOutlinedIcon fontSize="8px" />
                                    </Tooltip>
                                    <p className="data" key={innerindex}>{innerkey}: {data[key][innerkey]["value"]}</p>
                                  </div>
                                </>
                              )
                            })
                          }
                        </>
                      )
                    })}
                  </div>
                )}

              </div>

              {zoom <= 8 && (
                <div className="zoom-more">Zoom for more <br />information</div>
              )}
              {loading && zoom > 8 && (
                <div className="loading">Loading...</div>
              )}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
