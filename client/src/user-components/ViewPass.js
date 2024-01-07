import { Alert, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function ViewPass() {

  const [viewMail, setViewMail] = useState("");
  const [status, setStatus] = useState("");
  const [viewStatusData, setViewStatusData] = useState([])
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [success, setSuccess] = useState(false)

  const handleView = () => {
    axios.get(`http://localhost:8080/getStatus/${viewMail}`)
      .then((res) => {
        setViewStatusData(res.data)
        setStatus(res.data.status)
      })
      .catch((err) => console.log(err))
  }

  console.log(viewStatusData)
  console.log(status)

  useEffect(() => {
    if (status === "pending") {
      setPending(true)
    }
    else if (status === "failed") {
      setFailed(true)
    } else if (status === "success") {
      setSuccess(true)
    }
  }, [status])



  return (
    <div>
      <Typography
        variant="h5"
        gutterBottom
        style={{
          fontSize: "20px",
          marginTop: "50px"
        }}
      >
        ENTER MAIL TO VIEW PASS
      </Typography>
      <TextField placeholder="enter mail" type="text" required onChange={(e) => setViewMail(e.target.value)}></TextField> <br />
      <Button variant="contained" color="inherit" onClick={handleView}>VIEW</Button>

      {
        pending && (
          <div>
            <h4>YOUR APPLICATION STILL PENDING</h4>
          </div>
        )
      }

      {
        failed && (
          <div>
            <h4>YOUR APPLICATION HAS REJECTER</h4>
            <h4>Please Re-apply</h4>
          </div>
        )
      }

      {
        success && (
          <div>
            <h4>YOUR APPLICATION SUCCESS</h4>
          </div>
        )
      }

    </div>
  );
}

export default ViewPass;
