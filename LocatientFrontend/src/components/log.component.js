import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { logDataState } from "../atom";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";

const Logs = () => {
  const [logs, setLogs] = useRecoilState(logDataState);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    if (logs && logs.logs) {
      const tempRows = logs.logs.map((row, index) => {
        return {
          id: index,
          loggingTime: new Date(Date.parse(row.loggingTime)).toLocaleString(
            "en-GB",
            { timeZone: "UTC" }
          ),
          nhsid: row.nhsid,
          firstname: row.firstname,
          lastname: row.lastname,
          roomName: row.roomName,
          level: row.level,
        };
      });
      const tempColumns = [
        { field: "loggingTime", headerName: "Time", minWidth: 160, flex: 3 },
        { field: "nhsid", headerName: "ID", minWidth: 120, flex: 2 },
        { field: "firstname", headerName: "Firstname", minWidth: 120, flex: 2 },

        { field: "lastname", headerName: "Lastname", minWidth: 120, flex: 2 },
        { field: "roomName", headerName: "Room Name", minWidth: 160, flex: 3 },
        { field: "level", headerName: "Floor", minWidth: 50, flex: 1 },
      ];
      setRows(tempRows);
      setColumns(tempColumns);
    }
  }, [logs]);

  const [clock, setClock] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setClock(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div>
      <div className="clamp">
        <div className="single">
          <Clock value={clock} />
        </div>
      </div>
      <div className="spacing"></div>
      <div className="title-clamp">
        <div className="page-title">Logging History</div>
      </div>

      <div className="spacing"></div>
      <div className="single">
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </div>
      <div className="spacing"></div>
      <div className="spacing"></div>
    </div>
  );
};

export default Logs;
