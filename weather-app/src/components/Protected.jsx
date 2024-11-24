import React, {useEffect, useRef, useState} from 'react'
import axios from 'axios'

function Protected({token}) {
    const isRun = useRef(false)
    const [data, setData] = useState(null)

    useEffect(() => {
        if (isRun.current) return;

        isRun.current = true;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        axios.get('/api/documents', config).then((res) => setData(res.data.data)).catch((error) => console.log(error.message));
    }, []);
  return data ? (
    <>
      {data.map((rec, i) => (
        <h3 key={i}>{rec}</h3>
      ))}
    </>
  ) : (
    <div>Protected</div>
  );
}

export default Protected